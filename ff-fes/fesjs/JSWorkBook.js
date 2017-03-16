var UIModel = require('./uimodel');
var FunctionMap = require('./FunctionMap');
var GenericModelFile = require('./GenericModelFile');
var values = GenericModelFile.docValues;
var bootstrap = require('./formula-bootstrap');
var AST = require('./AST');
var esprima = require('esprima');
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

function JSWorkBook() {
}
JSWorkBook.prototype.doImport = function (data, parserType) {
    if (data === undefined) {
        console.info('no file specified')
        return;
    }
    var solution = GenericModelFile.findParser(parserType).parse(data);
    log.debug('Update model [' + solution.getName() + ']');
    UIModel.bulkInsert(solution);
    //only get the formulas for Current Model
    var    formulas = GenericModelFile.produceSolution().formulas;
    GenericModelFile.updateModelMetaData(solution.getModelMetaData());
    FunctionMap.init(bootstrap.parseAsFormula, formulas, false);
    GenericModelFile.updateValueMap(values);
}
//if it is possible to fix missing functions
//fix loops in the solution. we try it
function fixAll() {
    var attempt = 0;
    var feedback = validate();
    while (!feedback.valid && attempt < 20) {
        feedback.error.forEach(function (item) {
            if (item.canFix) {
                item.fix();
            }
        });
        feedback = validate();
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

    var formulas = GenericModelFile.produceSolution().formulas;
    formulas.forEach(function (elem) {
        //TODO: use timeout, this monte carlo is blocking UI thread
        try {
            FunctionMap.apiGet(elem, GenericModelFile.x, 0, 0, values);
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
                            console.info(elem.name + ":" + 'Fix for [' + variableName + '] in solution:' + UIModel.getCurrentModelName() + ":" + elem.original)

                            //TODO: just create a DUMMY formula, returning 1;
                            GenericModelFile.createFormula(1, variableName);
                            //YES we have to do this two times, known BUG, we have to call rebuild, updateValueMap, rebuild
                            FunctionMap.init(bootstrap.parseAsFormula, [elem], true);
                            GenericModelFile.updateValueMap(values);
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
                        GenericModelFile.updateValueMap(values);
                    }
                };
            }
            else {
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
    });
    validateResponse.valid = validateResponse.error.length === 0 ? true : false;
    validateResponse.fixAll = fixAll;
    return validateResponse;
};
JSWorkBook.prototype.export = function (parserType, rowId) {
    var parser = GenericModelFile.findParser(parserType);
    if (parser === undefined) {
        throw Error('No such parser found:[' + parserType + ']');
    }
    return parser.deParse(rowId);
}
JSWorkBook.prototype.setXasStart = function (year) {
    GenericModelFile.setXasStart(year);
}
JSWorkBook.prototype.getModelMetaData = function () {
    return GenericModelFile.variableSchema;
}
JSWorkBook.prototype.getNode = function (name) {
    return UIModel.fetch(UIModel.getCurrentModelName() + "_" + name + "_value");
}
JSWorkBook.prototype.getStatelessNode = function (name) {
    return UIModel.fetch(name + "_value");
}
//some functions we directly pass trough
JSWorkBook.prototype.get = GenericModelFile.getValue;
JSWorkBook.prototype.statelessGetValue = GenericModelFile.statelessGetValue;
JSWorkBook.prototype.updateValueMap = GenericModelFile.updateValueMap;
JSWorkBook.prototype.set = GenericModelFile.setValue;
JSWorkBook.prototype.statelessSetValue = GenericModelFile.statelessSetValue;
JSWorkBook.prototype.getStatelessVariable = GenericModelFile.getStatelessVariable;
//fix missing variables
JSWorkBook.prototype.fixAll = fixAll
//should return the solution instead. So its deprecated
JSWorkBook.prototype.getSolutionName = UIModel.getCurrentModelName;
JSWorkBook.prototype.getRootNode = UIModel.getRootNode;
JSWorkBook.prototype.visit = UIModel.visit;
JSWorkBook.prototype.validate = validate;
JSWorkBook.prototype.createFormula = GenericModelFile.createFormula
JSWorkBook.prototype.getFormula = GenericModelFile.getFormula;
JSWorkBook.prototype.produceSolution = GenericModelFile.produceSolution;
JSWorkBook.prototype.properties = GenericModelFile.properties;

module.exports = JSWorkBook;