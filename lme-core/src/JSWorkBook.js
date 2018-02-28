/*
 This class should have less business logic,
 Its the state wrapper around the stateless ValueFacade
 Remove All dependencies besides ValueFacade,log6. Even XAxis should be inside the Context Object
 */

const SolutionFacade = require('./SolutionFacade');
const FormulaService = require('./FormulaService');
const PropertiesAssembler = require('./PropertiesAssembler');
const ValueFacade = require('./ValueFacade');
const AST = require('../../ast-node-utils').ast;
const log = require('log6')
const YAxis = require('./YAxis')

//user friendly API
//importSolution(data,'type') : Solution          ; See Solution class for definiton
//export('type')        : Object            ; raw type undefined output. When calling this read the header of the parser to get more information
//set(rowId,value <,property> <,context>)   ; value can be anything see "get" function
// --optional property (default='value')
// --optional context  Time/FormulaSet -Matrix (default=0)

//get(rowId <,property> <,context>) : Object; has the range from a char or PDF base64String till any possible Object with functions
// --optional property (default='value')
// --optional context Time/FormulaSet -Matrix (default=0)

function JSWorkBook(context, XAxis, interval, opts) {
    this.indexer = null;//preserved to store the indexer
    this.context = context;
    this.offset = 0;
    //default modelname
    this.modelName = 'NEW';
    this.model_version = '';
    //tuple axis
    this.yaxis = YAxis;
    this.y = YAxis[0].parent

    //time axis, we looking at bookyears at the moment
    if (XAxis) {
        this.viewmodes = XAxis;
        this.xaxis = this.viewmodes.viewmodes[interval || 'bkyr'].columns[0]
    } else {
        const by = require('./XAxis');
        this.viewmodes = new by();
        this.xaxis = this.viewmodes.viewmodes['bkyr'].columns[0]
    }

    if (opts) for (var key in opts) this[key] = opts[key]
}

JSWorkBook.prototype.setColumnOffset = function(delta) {
    var newOffset = this.offset
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
/**
 * workbook modelName is preferred to data modelName
 */
JSWorkBook.prototype.importFFL = function(data) {
    this.importSolution(data, 'ffl')
}
JSWorkBook.prototype.importSolution = function(data, parserType) {
    var solution = SolutionFacade.importSolutionData(data, parserType, this);
    this.solution = solution;
    this.modelName = solution.name;
    this.updateValues();
}
JSWorkBook.prototype.getSolutionName = function() {
    return this.modelName;
}

/**
 * Try to do: Monte-Carlos simulation
 * https://nl.wikipedia.org/wiki/Monte-Carlosimulatie
 * if it is possible to fix missing functions
 * TRY fix infinite loops in the solution, breaking down chains.
 */
function fixAll() {
    var attempt = 0;
    const workbook = this;
    var feedback = workbook.validateImportedSolution();
    while (!feedback.valid && attempt < 2) {
        feedback.error.forEach(function(item) {
            if (item.canFix) item.fix();
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

function fixForReferenceError(variableName, workbook, formulaInfo, e) {
    return function() {
        try {
            log.info(variableName + " : " + 'Fix for [' + variableName + '] in solution: ' + workbook.getSolutionName() + " : " + formulaInfo.original + ' message:[' + e + ']')
            //So we fix the ReferenceError
            workbook.createFormula("1", variableName, 'value', false, 'document');
            //re-init the formula
            //and dependencies which could cause the exception to happen.
            for (var i = 0; i < formulaInfo.formulaDependencys.length; i++) {
                var dependency = formulaInfo.formulaDependencys[i];
                if (dependency.association == 'deps') {
                    const depFormula = SolutionFacade.fetchFormulaByIndex(dependency.refId)
                    fixForReferenceError(variableName, workbook, depFormula, e)()
                    //   SolutionFacade.initFormulaBootstrap([dependency.refId], true);
                }
            }
            SolutionFacade.initFormulaBootstrap([formulaInfo.id || formulaInfo.index], true, workbook.context.ma, workbook.context.audittrail);

        } catch (err) {
            log.error('Fatal error in variable [' + variableName + ']', err);
        }
    }
}

/**
 * TODO: this function only, is enough to extract into Validation.js
 * Try to do: Monte-Carlos simulation
 *  - TODO: add trend-notrend x-input values.
 *
 * https://nl.wikipedia.org/wiki/Monte-Carlosimulatie
 * if it is possible to fix missing functions
 * TRY fix infinite loops in the solution, breaking down chains.
 *  -- When ReferenceError: Create new VARIABLE matching, remove original formula
 *  -- When RangeError:
 *  --- lookup most significant part in loop, disable formula, transform into String formula. try again
 *
 *  Test all variables for feedback.
 *
 */
/**
 * Visit imported Formula's
 */
JSWorkBook.prototype.visitSolutionFormulas = function(visitor) {
    return this.solution.formulas.forEach(visitor);
}
JSWorkBook.prototype.exportWebModel = function(rowId) {
    return this.export('webexport', rowId)
}
JSWorkBook.prototype.export = function(parserType, rowId) {
    return SolutionFacade.exportSolution(parserType, rowId, this);
}
JSWorkBook.prototype.getNode = function(name, col) {
    return this.getSolutionNode(this.getSolutionName() + "_" + name, col);
}
JSWorkBook.prototype.getSolutionNode = function(name, col) {
    return ValueFacade.fetchSolutionNode(name, col || 'value')
};
JSWorkBook.prototype.findNode = function(name) {
    return ValueFacade.fetchSolutionNode(this.modelName + "_" + name, 'value')
};
JSWorkBook.prototype.fetchSolutionNode = ValueFacade.fetchSolutionNode

JSWorkBook.prototype.resolveX = function(x) {
    return x ? this.xaxis[x + this.offset] : this.xaxis[this.offset];
}
JSWorkBook.prototype.resolveY = function(idx) {
    if (idx == null) return this.y
    return resolveY(this, idx)
}
/**
 * Gets/Creates a named tuple list.
 * Ok so now we have to do this for nested tuples too.
 * Lets make sure the NestedTuple exist with corresponding tupleIndexNames
 */
JSWorkBook.prototype.resolveYas = function(variableName, note) {
    var yas = this.resolveY(undefined);
    if (note) {
        const indexes = note.slice(1, -1).split(',')
        for (var i = 0; i < indexes.length; i++) {
            const tempIndex = this.tupleIndexForName(this.modelName + '_' + variableName, indexes[i], yas, indexes.length - i)
            if (tempIndex == -1) yas = this.addTuple(variableName, indexes[i], yas)
            else yas = yas.deeper[tempIndex]
        }
    }
    return yas;
}
JSWorkBook.prototype.getDependencies = function(variableName, col) {
    const node = this.getNode(variableName, col)
    const formula = FormulaService.findFormulaByIndex(node.ref)
    return [Object.keys(formula.deps), Object.keys(formula.refs)]
}

function resolveY(wb, y) {
    var yAxis = y || 0;
    return isNaN(yAxis) ? yAxis : wb.yaxis[yAxis];
}

JSWorkBook.prototype.get = function(row, col, x, y) {
    return this.getSolutionPropertyValue(this.modelName + '_' + row, col, x, y);
};
JSWorkBook.prototype.getSolutionPropertyValue = function(row, col, x, y) {
    var xas = this.resolveX(x);
    var yas = this.resolveY(y)
    return ValueFacade.fetchSolutionPropertyValue(this.context, row, col, xas, yas)
};

JSWorkBook.prototype.set = function(row, value, col, x, y) {
    return this.setSolutionPropertyValue(this.modelName + '_' + row, value, col, x, y);
}
JSWorkBook.prototype.setSolutionPropertyValue = function(row, value, col, x, y) {
    const xas = this.resolveX(x);
    const yas = this.resolveY(y);
    return ValueFacade.putSolutionPropertyValue(this.context, row, value, col, xas, yas);
}
JSWorkBook.prototype.importValues = function(values) {
    for (var key in values) {
        this.context._values[key] = values[key]
    }
}
JSWorkBook.prototype.updateValues = function() {
    ValueFacade.updateValueMap(this.context.getValues());
};
JSWorkBook.prototype.fixProblemsInImportedSolution = fixAll
//should return the solution instead. So its deprecated
JSWorkBook.prototype.getRootSolutionProperty = function() {
    return ValueFacade.fetchRootSolutionProperty(this.getSolutionName());
};
/**
 * Does not fix invalid request doing a 2-tuple node-lookup with a 3/1-tuple yas.
 */
JSWorkBook.prototype.maxTupleCountForRow = function(node, yas) {
    if (!node.tuple) return -1;
    yas = this.resolveY(yas)
    var tupleDefinition = node.tupleDefinition ? node : this.getSolutionNode(node.solutionName + '_' + node.tupleDefinitionName)
    var allrefIdes = [];
    PropertiesAssembler.visitProperty(tupleDefinition, function(child, depth) {
        if (child.ref) allrefIdes.push(String(child.ref))
    }, 0)
    return TINSTANCECOUNT(allrefIdes, this.context.getValues(), yas);
}
/**
 * TODO: enforce unique name per nodeName/yas.
 */
JSWorkBook.prototype.insertTuple = function(nodeName, name, yas) {
    const node = ValueFacade.fetchSolutionNode(nodeName, 'value')
    const tupleDefinition = node.tuple ? node.tupleDefinition ? node : this.getSolutionNode(node.solutionName + '_' + node.tupleDefinitionName) : node
    //THIS IS quick-fix, it should never call insertTuple on a non-tuple
    //if (!tupleDefinition) throw Error('Cannot add tuple of non-existing tuple' + nodeName)
    yas = this.resolveY(yas)//this makes it complex, since parent is used for the 0-tuple.
    const tupleCount = this.maxTupleCountForRow(tupleDefinition, yas)
    const deeperYaxis = yas.deeper[tupleCount + 1];
    this.set(tupleDefinition.rowId, name || ('value' + tupleCount), 'value', undefined, deeperYaxis)
    return deeperYaxis;
}
JSWorkBook.prototype.addTuple = function(nodeName, name, yas) {
    return this.insertTuple(this.modelName + '_' + nodeName, name, yas)
}
/**
 * Creating a tuple-instance is done by placing a name in the TupleDefinition
 * These can be found with this method later on
 * (i) there is no support by duplicate names per Tuple
 */
JSWorkBook.prototype.tupleIndexForName = function(nodeName, name, yas, delta) {
    const node = ValueFacade.fetchSolutionNode(nodeName, 'value')
    if (!node.tuple) return -1;
    yas = this.resolveY(yas)
    var tupleDefinition = node.tupleDefinition ? node : this.getSolutionNode(node.solutionName + '_' + node.tupleDefinitionName)
    if (delta >= 2) tupleDefinition = tupleDefinition.tupleDefinitionName ? this.getSolutionNode(tupleDefinition.solutionName + '_' + tupleDefinition.tupleDefinitionName) : tupleDefinition
    if (delta >= 3) tupleDefinition = tupleDefinition.tupleDefinitionName ? this.getSolutionNode(tupleDefinition.solutionName + '_' + tupleDefinition.tupleDefinitionName) : tupleDefinition
    const values = this.context.getValues()[String(tupleDefinition.ref)];
    for (var key in values) {
        if (name == values[key]) {
            if (log.DEBUG) log.debug('Found ' + key + '' + values[key])
            return REVERSEYAXIS(parseInt(key), yas);
        }
    }
    return -1;
}
/**
 * Copy-paste from walkproperties. (Without [+]tupleD)
 */
JSWorkBook.prototype.visitProperties = function(node, visitor, y, type, treeDepth) {
    const wb = this;
    const itarfunction = function(treeNode, innerTreeDepth) {
        //instance is only for the first call
        //we must be recursive since Tuple in tuple
        if (treeNode.tupleDefinition) {
            if (type !== treeNode.rowId) {
                const maxTupleCountForTupleDefenition = wb.maxTupleCountForRow(treeNode, y);
                for (var t = 0; t <= maxTupleCountForTupleDefenition; t++) {
                    wb.visitProperties(treeNode, visitor, y.deeper[t], treeNode.rowId, innerTreeDepth)
                }
                itarfunction.stop = true;
            } else {
                visitor(treeNode, 'instance', innerTreeDepth, y)
            }
        } else {
            //because of this check, the nested tuple-property will not be displayed.
            visitor(treeNode, 'instance_no_td', innerTreeDepth, y)
        }
    };
    ValueFacade.visit(node, itarfunction, treeDepth);
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
*
*  Because this method is called in relative situations, within treedepths and tuple nesting, these two arguments are required
*
 */
JSWorkBook.prototype.walkProperties = function(node, visitor, y, type, treeDepth) {
    const wb = this;
    const itarfunction = function(treeNode, innerTreeDepth) {
        //instance is only for the first call
        //we must be recursive since Tuple in tuple
        if (treeNode.tupleDefinition) {
            if (type !== treeNode.rowId) {
                const maxTupleCountForTupleDefenition = wb.maxTupleCountForRow(treeNode, y);
                for (var t = 0; t <= maxTupleCountForTupleDefenition; t++) {
                    wb.walkProperties(treeNode, visitor, y.deeper[t], treeNode.rowId, innerTreeDepth)
                }
                visitor(treeNode, 'new', innerTreeDepth, y)    //tuple_add call
                itarfunction.stop = true;
            } else {
                visitor(treeNode, 'instance', innerTreeDepth, y)
            }
        } else {
            //because of this check, the nested tuple-property will not be displayed.
            visitor(treeNode, 'instance_no_td', innerTreeDepth, y)
        }
    };
    ValueFacade.visit(node, itarfunction, treeDepth);
}
JSWorkBook.prototype.validateImportedSolution = function() {
    var validateResponse = {
        succes: [],
        error : []
    };
    const context = this.context;
    const workbook = this;

    function formulaFixer(elemId) {
        const formulaInfo = SolutionFacade.fetchFormulaByIndex(elemId)
        try {
            //iterate all formula-sets to test 100% Trend,NoTrend
            ValueFacade.apiGetValue(formulaInfo, workbook.resolveX(0), resolveY(workbook, 0), 0, context.getValues(), workbook.context.ma, workbook.context.audittrail);
            validateResponse.succes.push(formulaInfo.name);
        }
        catch (e) {
            var fix;
            if (e.name === 'ReferenceError') {
                const variableName = e.message.split(' ')[0];
                //it could occur same problem is found multiple times. Strip those errors
                if (!validateResponse.error.lookup('variableName', variableName)) {
                    fix = {
                        canFix      : true,
                        variableName: variableName,
                        fixMessage  : 'Add',
                        fix         : fixForReferenceError(variableName, workbook, formulaInfo, e)
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
                    canFix    : true,
                    fixMessage: 'Remove formula',
                    fix       : function() {
                        var deps = Object.keys(formulaInfo.deps);
                        var refs = Object.keys(formulaInfo.refs);
                        for (var i = 0; i < formulaInfo.formulaDependencys.length; i++) {
                            const dependency = formulaInfo.formulaDependencys[i];
                            const dependencyInfo = SolutionFacade.fetchFormulaByIndex(dependency.refId);
                            try {
                                ValueFacade.apiGetValue(dependencyInfo, workbook.resolveX(0), resolveY(workbook, 0), 0, context.getValues());
                            } catch (e) {
                                // log.error(e)
                                //NOOP
                                mostcommon[formulaInfo.name] = isNaN(mostcommon[formulaInfo.name]) ? 1 : mostcommon[formulaInfo.name] + 1
                            }
                        }
                        if (log.DEBUG) log.debug('Loop detected for [' + formulaInfo.name + '], Making string formula ' + formulaInfo.original + "\n"
                            + "DEPS[" + deps.length + "][" + deps + "]\nREFS[" + refs.length + "]:[" + refs + "]"
                        )
                        formulaInfo.parsed = undefined;
                        formulaInfo.body = AST.STRING(formulaInfo.original);
                        //YES we have to do this two times, known BUG, we have to call rebuild, updateValueMap, rebuild
                        SolutionFacade.initFormulaBootstrap([elemId], false, workbook.context.ma, workbook.context.audittrail);
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
JSWorkBook.prototype.createFormula = function(formulaAsString, rowId, colId, tuple, frequency, displaytype, self_body) {
    SolutionFacade.createFormulaAndStructure(this.getSolutionName(), formulaAsString, rowId, colId || 'value', displaytype, frequency || 'none', this.context.ma, this.context.audittrail, self_body);
    const node = SolutionFacade.getOrCreateProperty(this.getSolutionName(), rowId, colId || 'value');
    if (tuple) {
        node.tuple = tuple;
        node.tupleDefinition = true;
        node.nestedTupleDepth = 0;
        node.tupleDefinitionName = rowId;
    }
    node.frequency = frequency;
    this.updateValues();
}
JSWorkBook.prototype.clearValues = function() {
    this.context.clear()
}
JSWorkBook.prototype.isValidInput = function(rowId, columnId, yas, value) {
    var choices;
    if (choices = this.get(rowId, 'choices')) {
        return ValueFacade.validChoice(choices, rowId, value) != null ? '' : 'Invalid choice value ' + value + '. Choose from ' + choices.map(function(el) {
            return el.value + '|' + el.name;
        }).join('|');
    } else {
        return this.get(rowId, 'valid', columnId, yas)
    }
}
JSWorkBook.prototype.properties = SolutionFacade.properties;
JSWorkBook.prototype.getAllChangedValues = function() {
    const formulaIds = [];
    const formulaIdMap = {}
    for (var i = 0; i < this.context.audit.length; i++) {
        const audit = this.context.audit[i];
        if (audit.saveToken == this.context.saveToken && !formulaIdMap[audit.formulaId]) {
            formulaIdMap[audit.formulaId] = true;
            formulaIds.push(audit.formulaId)
        }
    }
    return ValueFacade.getValuesFromFormulaIds(formulaIds, this.context.getValues());
}
JSWorkBook.prototype.getAllValues = function() {
    return ValueFacade.getAllValues(this.context.getValues());
};
module.exports = JSWorkBook;