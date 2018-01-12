/*
 This class should have less business logic,
 Its the state wrapper around the stateless ValueFacade
 Remove All dependencies besides ValueFacade,log6. Even XAxis should be inside the Context Object
 */

const SolutionFacade = require('./SolutionFacade');
const ValueFacade = require('./ValueFacade');
const AST = require('../../ast-node-utils').ast;
const log = require('log6')
const YAxis = require('./YAxis')

//user friendly stable API
//importSolution(data,'type') : Solution          ; See Solution class for definiton
//export('type')        : Object            ; raw type undefined output. When calling this read the header of the parser to get more information
//set(rowId,value <,property> <,context>)   ; value can be anything see "get" function
// --optional property (default='value')
// --optional context  Time/FormulaSet -Matrix (default=0)

//get(rowId <,property> <,context>) : Object; has the range from a char or PDF base64String till any possible Object with functions
// --optional property (default='value')
// --optional context Time/FormulaSet -Matrix (default=0)

function JSWorkBook(context, XAxis, type) {
    this.indexer = null;//preserved to store the indexer
    XAxis = XAxis || require('./XAxis')
    this.context = context;
    this.offset = 0;
    //default modelname
    this.modelName = 'NEW';
    //tuple axis
    this.yaxis = YAxis;
    //time axis, we looking at bookyears at the moment
    this.xaxis = XAxis[type || 'bkyr'].columns[0]
}

JSWorkBook.prototype.setColumnOffset = function(delta) {
    let newOffset = this.offset
    if (delta == 'next') newOffset++
    else if (delta == 'previous') newOffset--
    newOffset = Math.min(this.xaxis.length - 6, Math.max(0, newOffset))
    if (newOffset != this.offset) {
        this.offset = newOffset
        this.context.calc_count++;
    }
}
JSWorkBook.prototype.getTimeViews = function() {
    return this.xaxis;
}
JSWorkBook.prototype.importSolution = function(data, parserType) {
    var solution = SolutionFacade.importSolutionData(data, parserType, this);
    this.solution = solution;
    this.modelName = solution.getName();
    this.updateValues();
}
JSWorkBook.prototype.getSolutionName = function() {
    return this.modelName;
}
//if it is possible to fix missing functions
//fix loops in the solution. we try it
function fixAll() {
    var attempt = 0;
    var workbook = this;
    var feedback = workbook.validateImportedSolution();
    while (!feedback.valid && attempt < 20) {
        feedback.error.forEach(function(item) {
            if (item.canFix) {
                item.fix();
            }
        });
        feedback = workbook.validateImportedSolution();
        attempt++;
    }
    return feedback;
};

/**
 * validateImportedSolution current solution
 * validation is done once they are imported
 * Generic problems can be resolved in the same manner
 * returns a FeedBack object
 * TODO: extract validator.
 */
var mostcommon = {}

function logErrorWithVariableName(variableName, workbook, formulaInfo, e) {
    return function() {
        try {
            log.debug(variableName + " : " + 'Fix for [' + variableName + '] in solution: ' + workbook.getSolutionName() + " : " + formulaInfo.original + ' message:[' + e + ']')
            workbook.createFormula(1, variableName);
        } catch (err) {
            log.error('Fatal error in variable [' + variableName + ']', err);
        }
    }
}

function validateImportedSolution() {
    var validateResponse = {
        succes: [],
        error: []
    };
    var context = this.context;
    var workbook = this;

    function formulaFixer(elemId) {
        var formulaInfo = SolutionFacade.fetchFormulaByIndex(elemId)
        //TODO: use timeout, this monte carlo is blocking UI thread
        try {
            //iterate all formula-sets to test 100%
            ValueFacade.apiGetValue(formulaInfo, workbook.resolveX(0), resolveY(workbook, 0), 0, context.getValues());
            validateResponse.succes.push(formulaInfo.name);
        }
        catch (e) {
            var fix;
            if (e.name === 'ReferenceError') {
                var variableName = e.message.split(' ')[0];
                //it could occur same problem is found multiple times. Strip those errors
                if (!validateResponse.error.lookup('variableName', variableName)) {
                    fix = {
                        canFix: true,
                        variableName: variableName,
                        fixMessage: 'Add',
                        fix: logErrorWithVariableName(variableName, workbook, formulaInfo, e)
                    };
                }
                else {
                    fix = {
                        hide: true
                    }
                }
            }
            else if (e.name === 'RangeError') {
                //we should Isolate the most offending formula here instead of all
                //make a graph of the loops, resolve the deepest one, only add this one.
                fix = {
                    canFix: true,
                    fixMessage: 'Remove formula',
                    fix: function() {
                        var deps = Object.keys(formulaInfo.deps);
                        var refs = Object.keys(formulaInfo.refs);

                        formulaInfo.formulaDependencys.forEach(function(dependency) {
                            const dependencyInfo = SolutionFacade.fetchFormulaByIndex(dependency.refId);
                            try {
                                ValueFacade.apiGetValue(dependencyInfo, workbook.resolveX(0), resolveY(workbook, 0), 0, context.getValues());
                            } catch (e) {
                                // log.error(e)
                                //NOOP
                                mostcommon[formulaInfo.name] = isNaN(mostcommon[formulaInfo.name]) ? 1 : mostcommon[formulaInfo.name] + 1
                            }
                        })
                        if (log.DEBUG) log.debug('Loop detected for [' + formulaInfo.name + '], Making string formula ' + formulaInfo.original + "\n"
                            + "DEPS[" + deps.length + "][" + deps + "]\nREFS[" + refs.length + "]:[" + refs + "]"
                        )
                        formulaInfo.parsed = undefined;
                        formulaInfo.body = AST.STRING(formulaInfo.original);
                        //YES we have to do this two times, known BUG, we have to call rebuild, updateValueMap, rebuild
                        SolutionFacade.initFormulaBootstrap([elemId], false);
                        workbook.updateValues();
                    }
                };
            }
            else {
                //try underlying formulas
                formulaInfo.formulaDependencys.forEach(function(dependency) {
                    if (dependency.association === 'deps') {
                        const dependencyInfo = SolutionFacade.fetchFormulaByIndex(dependency.refId);
                        try {
                            ValueFacade.apiGetValue(dependencyInfo, workbook.resolveX(0), resolveY(workbook, 0), 0, context.getValues());
                        } catch (e) {
                            log.error(e)
                            //NOOP
                        }
                    }
                })
                log.error(e)
                log.warn('unable to fix problem in ' + formulaInfo.original + ' fail:' + e)
                log.warn(formulaInfo);
                fix = {
                    canFix: false
                }
            }
            //filter Exceptions not worth viewing e.g. Duplicates
            if (!fix.hide) {
                fix.formulaName = formulaInfo.name;
                fix.reason = e.message;
                validateResponse.error.push(fix);
            }
        }
    };
    this.visitSolutionFormulas(formulaFixer);
    validateResponse.valid = validateResponse.error.length === 0;
    validateResponse.fixProblemsInImportedSolution = fixAll;
    validateResponse.more = mostcommon;
    return validateResponse;
};
/**
 * Visit imported Formula's
 */
JSWorkBook.prototype.visitSolutionFormulas = function(visitor) {
    return this.solution.formulas.forEach(visitor);
}
JSWorkBook.prototype.export = function(parserType, rowId) {
    return SolutionFacade.exportSolution(parserType, rowId, this);
}
JSWorkBook.prototype.getNode = function(name) {
    return this.getSolutionNode(this.getSolutionName() + "_" + name);
}
JSWorkBook.prototype.getSolutionNode = function(name) {
    return ValueFacade.fetchSolutionNode(name, 'value')
};
JSWorkBook.prototype.fetchSolutionNode = ValueFacade.fetchSolutionNode

JSWorkBook.prototype.resolveX = function(x) {
    return x ? this.xaxis[x + this.offset] : this.xaxis[this.offset];
}
JSWorkBook.prototype.resolveY = function(idx) {
    return resolveY(this, idx)
}

function resolveY(wb, y) {
    var yAxis = y || 0;
    return isNaN(yAxis) ? yAxis : wb.yaxis[yAxis];
}

JSWorkBook.prototype.get = function(row, col, x, y) {
    return this.getSolutionPropertyValue(this.getSolutionName() + '_' + row, col, x, y);
};
JSWorkBook.prototype.getSolutionPropertyValue = function(row, col, x, y) {
    var xas = this.resolveX(x);
    var yas = resolveY(this, y)
    return ValueFacade.fetchSolutionPropertyValue(this.context, row, col, xas, yas)
};

JSWorkBook.prototype.set = function(row, value, col, x, y) {
    return this.setSolutionPropertyValue(this.getSolutionName() + '_' + row, value, col, x, y);
}
JSWorkBook.prototype.setSolutionPropertyValue = function(row, value, col, x, y) {
    var xas = this.resolveX(x);
    var yas = resolveY(this, y);
    return ValueFacade.putSolutionPropertyValue(this.context, row, value, col, xas, yas);
}
JSWorkBook.prototype.updateValues = function() {
    ValueFacade.updateValueMap(this.context.values);
};
JSWorkBook.prototype.fixProblemsInImportedSolution = fixAll
//should return the solution instead. So its deprecated
JSWorkBook.prototype.getRootSolutionProperty = function() {
    return ValueFacade.fetchRootSolutionProperty(this.getSolutionName());
};
JSWorkBook.prototype.maxTupleCountForRow = function(node) {
    if (!node.tuple) {
        return 0;
    }
    if (node.nestedTupleDepth > 0) return -2//no support for nested tuples yet.
    var tupleDefinition = node.tupleDefinition ? node : this.getSolutionNode(node.solutionName + '_' + node.tupleDefinitionName)
    var allrefIdes = [];
    if (tupleDefinition.ref) {
        allrefIdes.push('' + tupleDefinition.ref)
    }
    for (var i = 0; i < tupleDefinition.nodes.length; i++) {
        var tupleChild = tupleDefinition.nodes[i];
        var items = this.getSolutionNode(node.solutionName + '_' + tupleChild.rowId).ref;
        if (items) {
            allrefIdes.push('' + items);
        }
    }
    return TINSTANCECOUNT(allrefIdes, this.context.values);
}

JSWorkBook.prototype.tupleIndexForName = function(node, name) {
    var wb = this;
    //if not tuple, index always 0
    if (!node.tuple) {
        return 0;
    }
    var tupleDefinition = node.tupleDefinition ? node : wb.getSolutionNode(node.tupleDefinitionName)
    ValueFacade.visit(tupleDefinition, function(child, depth) {
        if (child.tuple) {
            maxTupleCount = Math.max(maxTupleCount, TINSTANCECOUNT(wb.context.values, child.ref));
        }
    });
    return maxTupleCount;
}
/**
 * Add tuple- iterations while iterating properties
 */
JSWorkBook.prototype.visitProperties = function(startProperty, visitor, y) {
    var yax = resolveY(this, y)
    var wb = this;
    ValueFacade.visit(startProperty, function(node, treeDepth, natural_orderid) {
        //for max tuplecount in current node loop visitor node
        var maxTupleCountForTupleDefinition = wb.maxTupleCountForRow(node);
        for (var tupleCounter = 0; tupleCounter <= maxTupleCountForTupleDefinition; tupleCounter++) {
            visitor(node, resolveY(wb, tupleCounter), treeDepth, natural_orderid + tupleCounter * 1000)
        }
        //tuple add function
        if (node.tupleDefinition) {
            visitor(node, resolveY(wb, 0), treeDepth, natural_orderid)
        }
    }, yax);
}
/*
* TupleDefinition[2]
*  TupleProperty_A/TupleDefinition[2]
*   TupleProperty_B
*  =>
*  0_0_TD
*  0_0_TP_A
*  0_0_TP_B
*  0_1_TP_A
*  0_1_TP_B
*  1_0_TD
*  1_0_TP_A
*  1_0_TP_B
*  1_1_TP_A
*  1_1_TP_B
 */
JSWorkBook.prototype.walkProperties = function(node, visitor, y, type, treeDepth) {
    const wb = this;
    ValueFacade.visit(node, function(treeNode, innerTreeDepth) {
        if (treeNode.tupleDefinition) {
            if (!type) {
                const maxTupleCountForTupleDefenition = wb.maxTupleCountForRow(treeNode, y);
                for (var t = 0; t <= maxTupleCountForTupleDefenition; t++) {
                    wb.walkProperties(treeNode, visitor, y.deeper[t], 'instance', innerTreeDepth)
                }
                if (maxTupleCountForTupleDefenition != -2)
                    visitor(treeNode, 'new', innerTreeDepth, y)
                //tuple_add call
                visitor.stop = true;
            } else if (type == 'instance') {
                visitor(treeNode, y, innerTreeDepth, y)
            }
        } else {
            if (type == 'instance' || !treeNode.tuple)
                if (!(treeNode.nestedTupleDepth > 1))
                    visitor(treeNode, y, innerTreeDepth, y)
        }
    }, treeDepth);
}
JSWorkBook.prototype.validateImportedSolution = validateImportedSolution;
JSWorkBook.prototype.createFormula = function(formulaAsString, rowId, colId, tuple, frequency, displaytype) {
    SolutionFacade.createFormulaAndStructure(this.getSolutionName(), formulaAsString, rowId, colId || 'value', displaytype, frequency || 'none');
    var orCreateProperty = SolutionFacade.getOrCreateProperty(this.getSolutionName(), rowId, colId || 'value');
    orCreateProperty.tuple = tuple;
    orCreateProperty.frequency = frequency;
    this.updateValues();
}
JSWorkBook.prototype.properties = SolutionFacade.properties;
JSWorkBook.prototype.getAllChangedValues = function() {
    var formulaIds = [];
    const formulaIdMap = {}
    for (var i = 0; i < this.context.audit.length; i++) {
        var audit = this.context.audit[i];
        if (audit.saveToken == this.context.saveToken && !formulaIdMap[audit.formulaId]) {
            formulaIdMap[audit.formulaId] = true;
            formulaIds.push(audit.formulaId)
        }
    }
    return ValueFacade.getValuesFromFormulaIds(formulaIds, this.context.values);
}
JSWorkBook.prototype.getAllValues = function() {
    return ValueFacade.getAllValues(this.context.values);
};
module.exports = JSWorkBook;