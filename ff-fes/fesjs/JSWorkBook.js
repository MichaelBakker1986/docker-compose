/*
 This class should have less business logic,
 Its the state wrapper around the stateless FESFacade
 Remove All dependencies besides FESFacade,ff-log. Even XAxis should be inside the Context Object
 */

var FESFacade = require('./FESFacade');
var SolutionFacade = require('./SolutionFacade');
var AST = require('ast-node-utils').ast;
var log = require('ff-log')
var XAxis = require('./XAxis')
var YAxis = require('./YAxis')

//user friendly stable API
//doImport(data,'type') : Solution          ; See Solution class for definiton
//export('type')        : Object            ; raw type undefined output. When calling this read the header of the parser to get more information
//set(rowId,value <,property> <,context>)   ; value can be anything see "get" function
// --optional property (default='value')
// --optional context  Time/FormulaSet -Matrix (default=0)

//get(rowId <,property> <,context>) : Object; has the range from a char or PDF base64String till any possible Object with functions
// --optional property (default='value')
// --optional context Time/FormulaSet -Matrix (default=0)

function JSWorkBook(context) {
    this.context = context;
    //default modelname
    this.modelName = 'NEW';
    //tuple axis
    this.yaxis = YAxis;
    //time axis, we looking at bookyears at the moment
    this.xaxis = XAxis.bkyr.columns[0]
}

JSWorkBook.prototype.doImport = function (data, parserType) {
    var solution = SolutionFacade.importSolution(data, parserType, this);
    this.modelName = solution.getName();
    this.updateValueMap();
}
//if it is possible to fix missing functions
//fix loops in the solution. we try it
function fixAll() {
    var attempt = 0;
    var workbook = this;
    var feedback = workbook.validate();
    while (!feedback.valid && attempt < 20) {
        feedback.error.forEach(function (item) {
            if (item.canFix) {
                item.fix();
            }
        });
        feedback = workbook.validate();
        attempt++;
    }
    return feedback;
};
/**
 * validate current solution
 *Only generic models will be validated once they are imported
 *Generic problems can be resolved in the same manner
 *returns a FeedBack object
 * TODO: extract validator.
 */
function validate() {
    var validateResponse = {
        succes: [],
        error: []
    };
    var context = this.context;
    var workbook = this;
    var formulas = SolutionFacade.produceSolution(this.modelName).formulas;

    function formulaFixer(elem) {
        //TODO: use timeout, this monte carlo is blocking UI thread
        try {
            FESFacade.apiGet(elem, resolveX(workbook, 0), resolveY(workbook, 0), 0, context.getValues());
            validateResponse.succes.push(elem.name);
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
                        fix: function () {
                            try {
                                log.debug(elem.name + " : " + 'Fix for [' + variableName + '] in solution: ' + workbook.modelName + " : " + elem.original + ' message:[' + e + ']')
                                //TODO: just create a DUMMY formula, returning 1;
                                workbook.createFormula(1, variableName);
                                //YES we have to do this two times, known BUG, we have to call rebuild, updateValueMap, rebuild
                                SolutionFacade.initFormulaBootstrap([elem], true);
                                workbook.updateValueMap();
                            } catch (err) {
                                log.error('Fatal error', err);
                            }
                        }
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
                    fix: function () {
                        var deps = Object.keys(elem.deps);
                        var refs = Object.keys(elem.refs);
                        log.warn('Loop detected for [' + elem.name + '], Making string formula ' + elem.original + "\n"
                            + "DEPS[" + deps.length + "][" + deps + "]\nREFS[" + refs.length + "]:[" + refs + "]"
                        )
                        elem.parsed = undefined;
                        elem.body = AST.STRING(elem.original);
                        //YES we have to do this two times, known BUG, we have to call rebuild, updateValueMap, rebuild
                        SolutionFacade.initFormulaBootstrap([elem], false);
                        workbook.updateValueMap();
                    }
                };
            }
            else {
                log.warn('unable to fix problem' + e)
                fix = {
                    canFix: false
                }
            }

            //filter Exceptions not worth viewing e.g. Duplicates
            if (!fix.hide) {
                fix.formulaName = elem.name;
                fix.reason = e.message;
                validateResponse.error.push(fix);
            }
        }
    };
    formulas.forEach(formulaFixer);
    validateResponse.valid = validateResponse.error.length === 0 ? true : false;
    validateResponse.fixAll = fixAll;
    return validateResponse;
};
JSWorkBook.prototype.export = function (parserType, rowId) {
    return SolutionFacade.exportSolution(parserType, rowId, this);
}
JSWorkBook.prototype.getNode = function (name) {
    return this.getStatelessNode(this.modelName + "_" + name);
}
JSWorkBook.prototype.getStatelessNode = function (name) {
    return FESFacade.getStatelessVariable(name, "value");
}
JSWorkBook.prototype.getStatelessVariable = FESFacade.getStatelessVariable;

function resolveX(wb, x) {
    return x ? wb.xaxis[x] : wb.xaxis[0];
}
function resolveY(wb, y) {
    return wb.yaxis[y || 0];
}
//some functions we directly pass trough
JSWorkBook.prototype.get = function (row, col, x, y) {
    var xas = resolveX(this, x);
    var yas = resolveY(this, y);
    return FESFacade.statelessGetValue(this.context, this.modelName + '_' + row, col, xas, yas)
};
JSWorkBook.prototype.statelessGetValue = function (row, col, x, y) {
    var xas = resolveX(this, x);
    var yas = resolveY(this, y)
    return FESFacade.statelessGetValue(this.context, row, col, xas, yas)
};

JSWorkBook.prototype.set = function (row, value, col, x, y) {
    var xas = resolveX(this, x);
    var yas = resolveY(this, y)
    return FESFacade.statelessSetValue(this.context, this.modelName + '_' + row, value, col, xas, yas);
}
JSWorkBook.prototype.statelessSetValue = function (row, value, col, x, y) {
    var xas = resolveX(this, x);
    var yas = resolveY(this, y);
    return FESFacade.statelessSetValue(this.context, row, value, col, xas, yas);
}
JSWorkBook.prototype.updateValueMap = function () {
    FESFacade.updateValueMap(this.context.values);
};
JSWorkBook.prototype.fixAll = fixAll
//should return the solution instead. So its deprecated
JSWorkBook.prototype.getRootNode = function () {
    return FESFacade.getRootNode(this.modelName);
};
JSWorkBook.prototype.visit = FESFacade.visit;
JSWorkBook.prototype.validate = validate;
JSWorkBook.prototype.createFormula = function (formulaAsString, rowId, colId) {
    SolutionFacade.createFormulaAndStructure(this.modelName, formulaAsString, rowId, colId || 'value');
    this.updateValueMap();
}
JSWorkBook.prototype.produceSolution = function () {
    return SolutionFacade.produceSolution(this.modelName);
};
JSWorkBook.prototype.properties = SolutionFacade.properties;
JSWorkBook.prototype.getAllValues = function () {
    return FESFacade.getAllValues(this.context.values);
};
module.exports = JSWorkBook;