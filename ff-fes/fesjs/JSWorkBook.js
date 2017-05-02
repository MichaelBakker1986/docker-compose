/*
 This class should have less business logic,
 Its the state wrapper around the stateless FESFacade
 Remove All dependencies besides FESFacade,ff-log. Even XAxis should be inside the Context Object
 */

var SolutionFacade = require('./SolutionFacade');
var FESFacade = require('./FESFacade');
var AST = require('ast-node-utils').ast;
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
    this.context = context;
    //default modelname
    this.modelName = 'NEW';
    //tuple axis
    this.yaxis = YAxis;
    //time axis, we looking at bookyears at the moment
    this.xaxis = XAxis.bkyr.columns[0]
}

JSWorkBook.prototype.importSolution = function (data, parserType) {
    var solution = SolutionFacade.importSolutionData(data, parserType, this);
    //TODO: getSolutionName() should return this.solution.getName();
    //or Don't use JSWorkBook for solution imports at all.
    this.solution = solution;
    this.modelName = solution.getName();
    this.updateValues();
}
JSWorkBook.prototype.getSolutionName = function () {
    return this.modelName;
}
//if it is possible to fix missing functions
//fix loops in the solution. we try it
function fixAll() {
    var attempt = 0;
    var workbook = this;
    var feedback = workbook.validateImportedSolution();
    while (!feedback.valid && attempt < 20) {
        feedback.error.forEach(function (item) {
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
                        fix: function () {
                            try {
                                log.debug(formulaInfo.name + " : " + 'Fix for [' + variableName + '] in solution: ' + workbook.getSolutionName() + " : " + formulaInfo.original + ' message:[' + e + ']')
                                workbook.createFormula(1, variableName);
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
                        var deps = Object.keys(formulaInfo.deps);
                        var refs = Object.keys(formulaInfo.refs);
                        log.warn('Loop detected for [' + formulaInfo.name + '], Making string formula ' + formulaInfo.original + "\n"
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
                log.warn('unable to fix problem' + e)
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
    validateResponse.valid = validateResponse.error.length === 0 ? true : false;
    validateResponse.fixProblemsInImportedSolution = fixAll;
    return validateResponse;
};
/**
 * Visit imported Formula's
 */
JSWorkBook.prototype.visitSolutionFormulas = function (visitor) {
    return this.solution.formulas.forEach(visitor);
}
JSWorkBook.prototype.export = function (parserType, rowId) {
    return SolutionFacade.exportSolution(parserType, rowId, this);
}
JSWorkBook.prototype.getNode = function (name) {
    return this.getSolutionNode(this.getSolutionName() + "_" + name);
}
JSWorkBook.prototype.getSolutionNode = function (name) {
    return FESFacade.fetchSolutionNode(name, 'value')
};

function resolveX(wb, x) {
    return x ? wb.xaxis[x] : wb.xaxis[0];
}
function resolveY(wb, y) {
    return wb.yaxis[y || 0];
}
JSWorkBook.prototype.get = function (row, col, x, y) {
    return this.getSolutionPropertyValue(this.getSolutionName() + '_' + row, col, x, y);
};
JSWorkBook.prototype.getSolutionPropertyValue = function (row, col, x, y) {

    // TODO Als y niet '0' of leeg is: Ben jij wel lid van een tuple?

    var xas = resolveX(this, x);
    var yas = resolveY(this, y)
    return FESFacade.fetchSolutionProperyValue(this.context, row, col, xas, yas)
};

JSWorkBook.prototype.set = function (row, value, col, x, y) {
    return this.setSolutionPropertyValue(this.getSolutionName() + '_' + row, value, col, x, y);
}
JSWorkBook.prototype.setSolutionPropertyValue = function (row, value, col, x, y) {

    // TODO Als y niet '0' of leeg is: Ben jij wel lid van een tuple?

    var xas = resolveX(this, x);
    var yas = resolveY(this, y);
    return FESFacade.putSolutionPropertyValue(this.context, row, value, col, xas, yas);
}
JSWorkBook.prototype.updateValues = function () {
    FESFacade.updateValueMap(this.context.values);
};
JSWorkBook.prototype.fixProblemsInImportedSolution = fixAll
//should return the solution instead. So its deprecated
JSWorkBook.prototype.getRootSolutionProperty = function () {
    return FESFacade.fetchRootSolutionProperty(this.getSolutionName());
};
JSWorkBook.prototype.visit = FESFacade.visit;
JSWorkBook.prototype.validateImportedSolution = validateImportedSolution;
JSWorkBook.prototype.createFormula = function (formulaAsString, rowId, colId, tuple) {
    SolutionFacade.createFormulaAndStructure(this.getSolutionName(), formulaAsString, rowId, colId || 'value');
    var orCreateProperty = SolutionFacade.getOrCreateProperty(this.getSolutionName(), rowId, colId || 'value');
    orCreateProperty.tuple = tuple;
    this.updateValues();
}
JSWorkBook.prototype.properties = SolutionFacade.properties;
JSWorkBook.prototype.getAllValues = function () {
    return FESFacade.getAllValues(this.context.values);
};
module.exports = JSWorkBook;