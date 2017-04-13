require('./exchange_modules/ffl/fflparser');//just let it inject into the GenericModelFile
require('./exchange_modules/presentation/presentation');//just let it inject into the GenericModelFile
var log = require('ff-log')
var JSWorkBook = require('./fesjs/JSWorkBook');
var FESContext = require('./fesjs/fescontext');
function FESApi() {
}

FESApi.prototype.init = function (data) {
    var wb = new JSWorkBook(new FESContext());
    wb.doImport(data, 'ffl');
    var validate = wb.validate();
    wb.fixAll();
    var validateFeedback = wb.validate();
    if (validateFeedback.valid) {
        //valid
        log.debug('Initialized model [' + wb.modelName + ']');
    } else {
        log.error(validateFeedback)
        throw Error('unable to initialize')
    }
    return wb.getRootNode().solutionName;
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
    var wb = new JSWorkBook(fesContext)
    wb.columns = context.columns || 17;
    wb.properties = context.properties || wb.properties;
    //prepare the workbook and context to match current appscope
    wb.updateValueMap()
    if (value !== undefined) {
        //possible ?quick-fix? to change choice values into number value
        var variable = wb.getStatelessVariable(rowId, 'value');
        if (variable && variable.delegate && variable.delegate.displaytype === 'select') {
            var choices = wb.statelessGetValue(rowId, 'choices');
            var choiceValue = choices.lookup('value', value);
            if (choiceValue === undefined) {
                log.warn('Could not find [%s] choice [%s] in %s. using [%s] to be value', rowId, value, JSON.stringify(choices), value)
            } else {
                value = isNaN(choiceValue.name) ? choiceValue.name : parseInt(choiceValue.name);
            }
        }
        wb.statelessSetValue(rowId, value, 'value', columncontext)
        return getEntry(wb, rowId, columncontext)
    } else {
        var values = [];
        wb.visit(wb.getStatelessNode(rowId), function (node) {
            values.push(getEntry(wb, node.solutionName + '_' + node.rowId, columncontext))
        });
        return values;
    }
}
function getEntry(workbook, rowId, columncontext) {
    var data = [];
    var start = columncontext;
    var end = columncontext == 0 ? columncontext + workbook.columns : columncontext;
    var variable = workbook.getStatelessVariable(rowId, 'value');
    //quick-fix for document variables;
    //TODO: all warnings for calls with document frequencies and columncontext>0 is useless
    if (variable.delegate.frequency === 'document') {
        end = 0;
    }
    for (var x = start; x <= end; x++) {
        data[x] = {};
        for (var type in workbook.properties) {
            data[x][type] = workbook.statelessGetValue(rowId, type, x);
            data[x].column = x;
            data[x].variable = variable.rowId;
        }
    }
    return data;
}
exports.fesjs = FESApi.prototype