/**
 * user friendly API
 */
require('./exchange_modules/ffl/fflparser');//just let it inject into the FESFacade
//require('./exchange_modules/presentation/presentation');//just let it inject into the FESFacade
var log = require('ff-log')
var WorkBook = require('./fesjs/JSWorkBook');
var FESContext = require('./fesjs/fescontext');
var TupleIndexConverter = require('./fesjs/TupleIndexConverter');

function FESApi() {
}

FESApi.prototype.init = function (data) {
    var JSWorkBook = new WorkBook(new FESContext());
    JSWorkBook.importSolution(data, 'ffl');
    var validate = JSWorkBook.validateImportedSolution();
    JSWorkBook.fixProblemsInImportedSolution();
    var validateFeedback = JSWorkBook.validateImportedSolution();
    if (validateFeedback.valid) {
        //valid
        log.debug('Initialized model [' + JSWorkBook.getSolutionName() + ']');
    } else {
        log.error(validateFeedback)
        throw Error('unable to initialize')
    }
    return JSWorkBook.getRootSolutionProperty().solutionName;
}
FESApi.prototype.addFunctions = function (plugin) {
    var functions = [];
    for (var functionName in plugin.entries) {
        functions.push(functionName)
        global[functionName] = plugin.entries[functionName]
    }
    log.info('Added fes-plugin [%s] functions [%s]', plugin.name, functions)
}

/**
 * rowId - VariableName
 * @Optional value - new value
 */
FESApi.prototype.fesGetValue = function (context, rowId, columncontext, value, tupleindex) {

    // Convert tuple index to tuple number
    if (tupleindex !== undefined) {
        tupleindex = TupleIndexConverter.getIndexNumber(context, tupleindex);
    }
    var maxTupleCount = 0;
    for (var key in context.values) {
        var obj = context.values[key];
        maxTupleCount = Math.max(maxTupleCount, TINSTANCECOUNT(context.values, key));
    }
    var fesContext = new FESContext();
    fesContext.values = context.values;
    var JSWorkBook = new WorkBook(fesContext)
    // Workbook property for 'TupleIndex'
    JSWorkBook.columns = context.columns || 17;
    JSWorkBook.properties = context.properties || JSWorkBook.properties;
    //prepare the workbook and context to match current appscope
    JSWorkBook.updateValues()
    if (value !== undefined) {
        //choice(select) requests
        //possible ?quick-fix? to change choice values into number value
        var variable = JSWorkBook.getSolutionNode(rowId, 'value');
        if (variable && variable.displayAs === 'select') {
            var choices = JSWorkBook.getSolutionPropertyValue(rowId, 'choices');
            var choiceValue = choices.lookup('value', value);
            if (choiceValue === undefined) {
                log.warn('Could not find [%s] choice [%s] in %s. using [%s] to be value', rowId, value, JSON.stringify(choices), value)
            } else {
                value = isNaN(choiceValue.name) ? choiceValue.name : parseInt(choiceValue.name);
            }
        }
        JSWorkBook.setSolutionPropertyValue(rowId, value, 'value', columncontext, tupleindex)
        return getEntry(JSWorkBook, rowId, columncontext, tupleindex, maxTupleCount)
    } else {
        var values = [];
        var rootNode = JSWorkBook.getSolutionNode(rowId);
        if (rootNode) {
            JSWorkBook.visit(rootNode, function (node) {
                values.push(getEntry(JSWorkBook, node.solutionName + '_' + node.rowId, columncontext, tupleindex, maxTupleCount))
            });
        } else {
            values.push({
                variable: rowId
            })
        }
        return values;
    }
}
/**
 * Given properties in workbook return all values for given columns
 * @param workbook
 * @param rowId
 * @param columncontext
 * @returns {Array}
 */
function getEntry(workbook, rowId, columncontext, tupleindex, maxTupleCount) {
    var outputData = [];
    var columnStart = 0;
    var columnEnd = workbook.columns;
    var variable = workbook.getSolutionNode(rowId, 'value');

    //quick-fix for document variables;
    //TODO: all warnings for calls with document frequencies and columncontext>0 is useless
    if (variable && variable.delegate && variable.delegate.frequency === 'document') {
        columnEnd = 0;
    }
    var tupleStart = 0;
    var tupleEnd = 0;
    if (variable.tupleDefinition) {
        tupleEnd = maxTupleCount;
        log.info('requested tupledefinition iterate [%s]times ', maxTupleCount)
    }
    for (var yAxisCounter = tupleStart; yAxisCounter <= tupleEnd; yAxisCounter++) {
        outputData[yAxisCounter] = [];
        var tupleData = outputData[yAxisCounter];
        for (var xAxisCounter = columnStart; xAxisCounter <= columnEnd; xAxisCounter++) {
            tupleData[xAxisCounter] = {};
            for (var type in workbook.properties) {
                tupleData[xAxisCounter][type] = workbook.getSolutionPropertyValue(rowId, type, xAxisCounter, yAxisCounter);
                if (columnStart !== columnEnd) {
                    tupleData[xAxisCounter].column = xAxisCounter;
                }
                tupleData[xAxisCounter].variable = variable.rowId;
                if (tupleStart !== tupleEnd) {
                    tupleData[xAxisCounter].tupleIndex = yAxisCounter;
                }
            }
        }
        //if there is only one column, the exported value is not presented to be an array
        if (columnStart == columnEnd) {
            tupleData = tupleData[0]
        }
    }
    //if there is only one tuple, the exported value is not presented to be an array
    if (tupleStart == tupleEnd) {
        outputData = outputData[0]
    }
    return outputData;
}
exports.fesjs = FESApi.prototype