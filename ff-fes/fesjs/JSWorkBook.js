/*
 This class should have less business logic,
 Its the state wrapper around the stateless FESFacade
 Remove All dependencies besides FESFacade,ff-log. Even XAxis should be inside the Context Object
 */

//remove UIService dependency
var UIService = require('./UIService');
//remove FunctionMap dependency
var FunctionMap = require('./FunctionMap');
var FESFacade = require('./FESFacade');
var bootstrap = require('./formula-bootstrap');
var AST = require('ast-node-utils').ast;
var log = require('ff-log')
var time = require('./XAxis')

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
    //default timeunit
    this.xaxis = time.bkyr.columns[0]
}

JSWorkBook.prototype.doImport = function (data, parserType) {
    if (data === undefined) {
        console.info('no file specified')
        return;
    }
    var solution = FESFacade.findParser(parserType).parse(data, this);
    this.modelName = solution.getName().toUpperCase();
    this.modelName = solution.getName().toUpperCase();
    log.debug('Update model [' + solution.getName() + ']');
    UIService.bulkInsert(solution);
    //only get the formulas for Current Model
    var formulas = this.produceSolution().formulas;
    //FESFacade.updateModelMetaData(solution.getModelMetaData());
    FunctionMap.initFormulaBootstrap(bootstrap.parseAsFormula, formulas, false);
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
//validate current solution
//Only generic models will be validated once they are imported
//Generic problems can be resolved in the same manner
//returns a FeedBack object
function validate() {
    var validateResponse = {
        succes: [],
        error: []
    };
    var context = this.context;
    var workbook = this;
    var formulas = FESFacade.produceSolution().formulas;

    function formulaFixer(elem) {
        //TODO: use timeout, this monte carlo is blocking UI thread
        try {
            //workbook.statelessGetValue()
            FunctionMap.apiGet(elem, resolveX(workbook, 0), 0, 0, context.getValues());
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
                                FunctionMap.initFormulaBootstrap(bootstrap.parseAsFormula, [elem], true);
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

                        console.info('Loop detected for [' + elem.name + '], Making string formula ' + elem.original + "\n"
                            + "DEPS[" + deps.length + "][" + deps + "]\nREFS[" + refs.length + "]:[" + refs + "]"
                        )
                        elem.parsed = undefined;
                        elem.body = AST.STRING(elem.original);
                        //YES we have to do this two times, known BUG, we have to call rebuild, updateValueMap, rebuild
                        FunctionMap.initFormulaBootstrap(bootstrap.parseAsFormula, [elem], false);
                        FESFacade.updateValueMap(context.getValues());
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
    var parser = FESFacade.findParser(parserType);
    if (parser === undefined) {
        throw Error('No such parser found:[' + parserType + ']');
    }
    return parser.deParse(rowId, this);
}
JSWorkBook.prototype.getNode = function (name) {
    return this.getStatelessNode(this.modelName + "_" + name);
}
JSWorkBook.prototype.getStatelessNode = function (name) {
    return UIService.fetch(name + "_value");
}
//some functions we directly pass trough
JSWorkBook.prototype.get = function (row, col, x) {
    var xas = resolveX(this, x);
    return FESFacade.statelessGetValue(this.context, this.modelName + '_' + row, col, xas)
};
function resolveX(wb, x) {
    return x ? wb.xaxis[x] : wb.xaxis[0];
}
JSWorkBook.prototype.statelessGetValue = function (row, col, x) {
    var xas = resolveX(this, x);
    return FESFacade.statelessGetValue(this.context, row, col, xas)
};
JSWorkBook.prototype.updateValueMap = function () {
    FESFacade.updateValueMap(this.context.values);
};
JSWorkBook.prototype.set = function (row, value, col, x) {
    if (!this.context) {
        throw Error();
    }
    var xas = resolveX(this, x);
    return FESFacade.statelessSetValue(this.context, this.modelName + '_' + row, value, col, xas);
}
JSWorkBook.prototype.statelessSetValue = function (row, value, col, x) {
    var xas = resolveX(this, x);
    return FESFacade.statelessSetValue(this.context, row, value, col, xas);
}
JSWorkBook.prototype.getStatelessVariable = FESFacade.getStatelessVariable;
//fix missing variables
JSWorkBook.prototype.fixAll = fixAll
//should return the solution instead. So its deprecated
JSWorkBook.prototype.getRootNode = function () {
    return UIService.getRootNode(this.modelName);
};
JSWorkBook.prototype.visit = UIService.visit;
JSWorkBook.prototype.validate = validate;
JSWorkBook.prototype.createFormula = function (formulaAsString, rowId, colId) {
    FESFacade.createFormulaAndStructure(this.modelName, formulaAsString, rowId, colId || 'value');
    this.updateValueMap();
}
JSWorkBook.prototype.gatherProperties = function (rowId) {
    var formulaProperties = {};
    for (var key in this.properties) {
        var formula = FESFacade.getFormula(rowId, key);
        if (formula !== undefined && formula.original !== undefined && formula.original !== null && formula.original !== '') {
            formulaProperties[key] = formula.original;
        }
    }
    return formulaProperties;
}
JSWorkBook.prototype.getFormula = FESFacade.getFormula;
JSWorkBook.prototype.produceSolution = function () {
    return FESFacade.produceSolution(this.modelName);
};
JSWorkBook.prototype.properties = FESFacade.properties;
JSWorkBook.prototype.getAllValues = function () {
    //we cannot just return everything here, Because for now all formula's have a user-entered value cache.
    //Also Functions themSelves are bound to this object.
    //So we have to strip them out here.
    //should be part of the apiGet, to query all *_value functions. or *_validation etc.
    var docValues = this.context.values;
    var values = [];
    for (var formulaId in docValues) {
        var cachevalues = docValues[formulaId];
        if (cachevalues) {
            var formula = FESFacade.findFormulaByIndex(formulaId);
            var formulaName = formula === undefined ? formulaId : formula.name;
            for (var cachedValue in cachevalues)
                values.push({
                    varName: formulaName,
                    colId: cachedValue,
                    value: cachevalues[cachedValue],
                    formulaId: formulaId
                });
        }
    }
    return values;
};
module.exports = JSWorkBook;