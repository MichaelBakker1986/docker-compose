/**
 * user friendly API
 */
require('./exchange_modules/ffl/fflparser');//just let it inject into the FESFacade
require('./exchange_modules/presentation/presentation');//just let it inject into the FESFacade
var log = require('ff-log')
var WorkBook = require('./fesjs/JSWorkBook');
var FESContext = require('./fesjs/fescontext');
function FESApi() {
}
FESApi.prototype.init = function (data) {
    var JSWorkBook = new WorkBook(new FESContext());
    JSWorkBook.doImport(data, 'ffl');
    var validate = JSWorkBook.validate();
    JSWorkBook.fixAll();
    var validateFeedback = JSWorkBook.validate();
    if (validateFeedback.valid) {
        //valid
        log.debug('Initialized model [' + JSWorkBook.modelName + ']');
    } else {
        log.error(validateFeedback)
        throw Error('unable to initialize')
    }
    return JSWorkBook.getRootNode().solutionName;
}
FESApi.prototype.addFunctions = function (plugin) {
    var functions = [];
    for (functionName in plugin.entries) {
        functions.push(functionName)
        global[functionName] = plugin.entries[functionName]
    }
    log.info('Added fes-plugin [%s] functions [%s]', plugin.name, functions)
}

/**
 * rowId - VariableName
 * @Optional value - new value
 */
FESApi.prototype.fesGetValue = function (context, rowId, columncontext, value) {
    var fesContext = new FESContext();
    fesContext.values = context.values;
    var JSWorkBook = new WorkBook(fesContext)
    JSWorkBook.columns = context.columns || 17;
    JSWorkBook.properties = context.properties || JSWorkBook.properties;
    //prepare the workbook and context to match current appscope
    JSWorkBook.updateValueMap()
    if (value !== undefined) {
        //choice(select) requests
        //possible ?quick-fix? to change choice values into number value
        var variable = JSWorkBook.getStatelessVariable(rowId, 'value');
        if (variable && variable.displayAs === 'select') {
            var choices = JSWorkBook.statelessGetValue(rowId, 'choices');
            var choiceValue = choices.lookup('value', value);
            if (choiceValue === undefined) {
                log.warn('Could not find [%s] choice [%s] in %s. using [%s] to be value', rowId, value, JSON.stringify(choices), value)
            } else {
                value = isNaN(choiceValue.name) ? choiceValue.name : parseInt(choiceValue.name);
            }
        }
        JSWorkBook.statelessSetValue(rowId, value, 'value', columncontext, 0)
        return getEntry(JSWorkBook, rowId, columncontext)
    } else {
        var values = [];
        JSWorkBook.visit(JSWorkBook.getStatelessNode(rowId), function (node) {
            values.push(getEntry(JSWorkBook, node.solutionName + '_' + node.rowId, columncontext))
        });
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
function getEntry(workbook, rowId, columncontext) {
    var data = [];
    var start = columncontext;
    var end = columncontext == 0 ? columncontext + workbook.columns : columncontext;
    var variable = workbook.getStatelessVariable(rowId, 'value');
    //quick-fix for document variables;
    //TODO: all warnings for calls with document frequencies and columncontext>0 is useless
    if (variable.delegate && variable.delegate.frequency === 'document') {
        end = 0;
    }
    for (var x = start; x <= end; x++) {
        data[x] = {};
        for (var type in workbook.properties) {
            data[x][type] = workbook.statelessGetValue(rowId, type, x, 0);
            data[x].column = x;
            data[x].variable = variable.rowId;
        }
    }
    return data;
}
exports.fesjs = FESApi.prototype