var UIModel = require('./uimodel');
var FunctionMap = require('./FunctionMap');
var GenericModelFile = require('./GenericModelFile');
var bootstrap = require('./formula-bootstrap');
var AST = require('./AST');
var log = require('ff-log')

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
    this.modelName = 'NEW';
}
JSWorkBook.prototype.doImport = function (data, parserType) {
    if (data === undefined) {
        console.info('no file specified')
        return;
    }
    var solution = GenericModelFile.findParser(parserType).parse(data, this);
    this.modelName = solution.getName().toUpperCase();
    log.debug('Update model [' + solution.getName() + ']');
    UIModel.bulkInsert(solution);
    //only get the formulas for Current Model
    var formulas = this.produceSolution().formulas;
    //GenericModelFile.updateModelMetaData(solution.getModelMetaData());
    FunctionMap.init(bootstrap.parseAsFormula, formulas, false);
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
    var formulas = GenericModelFile.produceSolution().formulas;

    function formulaFixer(elem) {
        //TODO: use timeout, this monte carlo is blocking UI thread
        try {
            //workbook.statelessGetValue()
            FunctionMap.apiGet(elem, GenericModelFile.x, 0, 0, context.getValues());
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
                                // workbook.createFormula(1,variableName) This is also calling UpdateValueMap() (so its calling it two times)
                                GenericModelFile.createFormula(1, variableName);
                                //YES we have to do this two times, known BUG, we have to call rebuild, updateValueMap, rebuild
                                FunctionMap.init(bootstrap.parseAsFormula, [elem], true);
                                workbook.updateValueMap();
                                //     workbook.statelessGetValue()
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
                        FunctionMap.init(bootstrap.parseAsFormula, [elem], false);
                        GenericModelFile.updateValueMap(context.getValues());
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
    var parser = GenericModelFile.findParser(parserType);
    if (parser === undefined) {
        throw Error('No such parser found:[' + parserType + ']');
    }
    return parser.deParse(rowId, this);
}
JSWorkBook.prototype.setXasStart = function (year) {
    GenericModelFile.setXasStart(year);
}
JSWorkBook.prototype.getNode = function (name) {
    return UIModel.fetch(this.modelName + "_" + name + "_value");
}
JSWorkBook.prototype.getStatelessNode = function (name) {
    return UIModel.fetch(name + "_value");
}
//some functions we directly pass trough
JSWorkBook.prototype.get = function (row, col, x) {
    return this.statelessGetValue(this.modelName + '_' + row, col, x)
};
JSWorkBook.prototype.statelessGetValue = function (row, col, x) {
    return GenericModelFile.statelessGetValue(this.context, row, col, x)
};
JSWorkBook.prototype.updateValueMap = function () {
    GenericModelFile.updateValueMap(this.context.values);
};
JSWorkBook.prototype.set = function (row, value, col, x) {
    if (!this.context) {
        throw Error();
    }
    return GenericModelFile.statelessSetValue(this.context, this.modelName + '_' + row, value, col, x);
}
JSWorkBook.prototype.statelessSetValue = GenericModelFile.statelessSetValue;
JSWorkBook.prototype.getStatelessVariable = GenericModelFile.getStatelessVariable;
//fix missing variables
JSWorkBook.prototype.fixAll = fixAll
//should return the solution instead. So its deprecated
JSWorkBook.prototype.getRootNode = function () {
    return UIModel.getRootNode(this.modelName);
};
JSWorkBook.prototype.visit = UIModel.visit;
JSWorkBook.prototype.validate = validate;
JSWorkBook.prototype.createFormula = function (formulaAsString, rowId, colId) {
    GenericModelFile.createFormula(this.modelName, formulaAsString, rowId, colId);
    this.updateValueMap();
}
JSWorkBook.prototype.gatherProperties = function (rowId) {
    var formulaProperties = {};
    for (var key in this.properties) {
        var formula = GenericModelFile.getFormula(rowId, key);
        if (formula !== undefined && formula.original !== undefined && formula.original !== null && formula.original !== '') {
            formulaProperties[key] = formula.original;
        }
    }
    return formulaProperties;
}
JSWorkBook.prototype.getFormula = GenericModelFile.getFormula;
JSWorkBook.prototype.produceSolution = function () {
    return GenericModelFile.produceSolution(this.modelName);
};
JSWorkBook.prototype.properties = GenericModelFile.properties;
JSWorkBook.prototype.getAllValues = function () {
    if (!this.context.values) {
        throw Error();
    }
    //we cannot just return everything here, Because for now all formula's have a user-entered value cache.
    //Also Functions themSelves are bound to this object.
    //So we have to strip them out here.
    //should be part of the apiGet, to query all *_value functions. or *_validation etc.
    var docValues = this.context.values;
    var values = [];
    for (var formulaId in docValues) {
        var cachevalues = docValues[formulaId];
        if (cachevalues) {
            var formula = GenericModelFile.findFormulaByIndex(formulaId);
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