/*
 This class should have less business logic,
 Its the state wrapper around the stateless FESFacade
 Remove All dependencies besides FESFacade,ff-log. Even XAxis should be inside the Context Object
 */

var SolutionFacade = require('./SolutionFacade');
var FESFacade = require('./FESFacade');
var AST = require('../../ast-node-utils').ast;
var log = require('ff-log')
var XAxis = require('./XAxis')
var YAxis = require('./YAxis')

//user friendly stable API
//importSolution(data,'type') : Solution          ; See Solution class for definiton
//export('type')        : Object            ; raw type undefined output. When calling this read the header of the parser to get more information
//set(rowId,value <,property> <,context>)   ; value can be anything see "get" function
// --optional property (default='value')
// --optional context  Time/FormulaSet -Matrix (default=0)

//get(rowId <,property> <,context>) : Object; has the range from a char or PDF base64String till any possible Object with functions
// --optional property (default='value')
// --optional context Time/FormulaSet -Matrix (default=0)

function JSWorkBook(context) {
    this.indexer = null;//preserved to store the indexer
    this.context = context;
    this.offset = 0;
    //default modelname
    this.modelName = 'NEW';
    //tuple axis
    this.yaxis = YAxis;
    //time axis, we looking at bookyears at the moment
    this.xaxis = XAxis.bkyr.columns[0]
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

function logErrorWithVariableName(variableName, workbook, formulaInfo) {
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
            FESFacade.apiGetValue(formulaInfo, resolveX(workbook, 0), resolveY(workbook, 0), 0, context.getValues());
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
                        fix: logErrorWithVariableName(variableName, workbook, formulaInfo)
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
                                FESFacade.apiGetValue(dependencyInfo, resolveX(workbook, 0), resolveY(workbook, 0), 0, context.getValues());
                            } catch (e) {
                                // log.error(e)
                                //NOOP
                                mostcommon[formulaInfo.name] = isNaN(mostcommon[formulaInfo.name]) ? 1 : mostcommon[formulaInfo.name] + 1
                            }
                        })
                        log.debug('Loop detected for [' + formulaInfo.name + '], Making string formula ' + formulaInfo.original + "\n"
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
                            FESFacade.apiGetValue(dependencyInfo, resolveX(workbook, 0), resolveY(workbook, 0), 0, context.getValues());
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
    return FESFacade.fetchSolutionNode(name, 'value')
};
JSWorkBook.prototype.fetchSolutionNode = FESFacade.fetchSolutionNode

function resolveX(wb, x) {
    return x ? wb.xaxis[x] : wb.xaxis[0];
}

function resolveY(wb, y) {
    var yAxis = y || 0;
    return isNaN(yAxis) ? yAxis : wb.yaxis[yAxis];
}

JSWorkBook.prototype.get = function(row, col, x, y) {
    x = x + this.offset;
    return this.getSolutionPropertyValue(this.getSolutionName() + '_' + row, col, x, y);
};
JSWorkBook.prototype.getSolutionPropertyValue = function(row, col, x, y) {
    var xas = resolveX(this, x);
    var yas = resolveY(this, y)
    return FESFacade.fetchSolutionPropertyValue(this.context, row, col, xas, yas)
};

JSWorkBook.prototype.set = function(row, value, col, x, y) {
    x = x + this.offset;
    return this.setSolutionPropertyValue(this.getSolutionName() + '_' + row, value, col, x, y);
}
JSWorkBook.prototype.setSolutionPropertyValue = function(row, value, col, x, y) {
    var xas = resolveX(this, x);
    var yas = resolveY(this, y);
    return FESFacade.putSolutionPropertyValue(this.context, row, value, col, xas, yas);
}
JSWorkBook.prototype.updateValues = function() {
    FESFacade.updateValueMap(this.context.values);
};
JSWorkBook.prototype.fixProblemsInImportedSolution = fixAll
//should return the solution instead. So its deprecated
JSWorkBook.prototype.getRootSolutionProperty = function() {
    return FESFacade.fetchRootSolutionProperty(this.getSolutionName());
};

function maxTupleCountForRow(wb, node) {
    if (!node.tuple) {
        return 0;
    }
    var tupleDefinition = node.tupleDefinition ? node : wb.getSolutionNode(node.solutionName + '_' + node.tupleDefinitionName)
    var allrefIdes = [];
    if (tupleDefinition.ref) {
        allrefIdes.push('' + tupleDefinition.ref)
    }
    for (var i = 0; i < tupleDefinition.nodes.length; i++) {
        var tupleChild = tupleDefinition.nodes[i];
        var items = wb.getSolutionNode(node.solutionName + '_' + tupleChild.rowId).ref;
        if (items) {
            allrefIdes.push('' + items);
        }
    }
    return TINSTANCECOUNT(allrefIdes, wb.context.values);
}

JSWorkBook.prototype.tupleIndexForName = function(node, name) {
    var wb = this;
    //if not tuple, index always 0
    if (!node.tuple) {
        return 0;
    }
    var tupleDefinition = node.tupleDefinition ? node : wb.getSolutionNode(node.tupleDefinitionName)
    FESFacade.visit(tupleDefinition, function(child, depth) {
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
    FESFacade.visit(startProperty, function(node, treeDepth) {
        //for max tuplecount in current node loop visitor node
        var maxTupleCountForTupleDefinition = maxTupleCountForRow(wb, node);
        for (var tupleCounter = 0; tupleCounter <= maxTupleCountForTupleDefinition; tupleCounter++) {
            visitor(node, resolveY(wb, tupleCounter), treeDepth)
        }
        //tuple add function
        if (node.tupleDefinition) {
            visitor(node, resolveY(wb, 0), treeDepth)
        }
    });
}
JSWorkBook.prototype.validateImportedSolution = validateImportedSolution;
JSWorkBook.prototype.createFormula = function(formulaAsString, rowId, colId, tuple, frequency) {
    SolutionFacade.createFormulaAndStructure(this.getSolutionName(), formulaAsString, rowId, colId || 'value');
    var orCreateProperty = SolutionFacade.getOrCreateProperty(this.getSolutionName(), rowId, colId || 'value');
    orCreateProperty.tuple = tuple;
    orCreateProperty.frequency = frequency;
    this.updateValues();
}
JSWorkBook.prototype.properties = SolutionFacade.properties;
JSWorkBook.prototype.getAllChangedValues = function() {
    var formulaIds = [];
    for (var i = 0; i < this.context.audit.length; i++) {
        var audit = this.context.audit[i];
        if (audit.saveToken == this.context.saveToken) {
            formulaIds.push(audit.formulaId)
        }
    }
    return FESFacade.getValuesFromFormulaIds(formulaIds, this.context.values);
}
JSWorkBook.prototype.getAllValues = function() {
    return FESFacade.getAllValues(this.context.values);
};
module.exports = JSWorkBook;