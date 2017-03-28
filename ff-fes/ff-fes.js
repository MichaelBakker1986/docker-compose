require('./exchange_modules/ffl/fflparser');//just let it inject into the GenericModelFile
require('./exchange_modules/presentation/presentation');//just let it inject into the GenericModelFile
var logger = require('ff-log')
var JSWorkBook = require('./fesjs/JSWorkBook');
var FESContext = require('./fesjs/fescontext');

var init = function (data) {
    var wb = new JSWorkBook(new FESContext());
    wb.doImport(data, 'ffl');
    var validate = wb.validate();
    wb.fixAll();
    if (wb.validate().valid) {
        //valid
        logger.debug('Initialized model [' + wb.getRootNode().solutionName + ']');
    } else {
        throw Error('unable to initialize')
    }
}
var addFunctions = function (plugin) {
    var functions = [];
    for (functionName in plugin.entries) {
        functions.push(functionName)
        global[functionName] = plugin.entries[functionName]
    }
    logger.info('Added fes-plugin [%s] functions [%s]', plugin.name, functions)
}

/**
 * rowId - VariableName
 * @Optional value - new value
 */
var value = function (context, rowId, columncontext, value) {
    var fesContext = new FESContext();
    fesContext.values = context.values;
    var wb = new JSWorkBook(fesContext)
    wb.updateValueMap(context.values)
    if (value !== undefined) {
        wb.statelessSetValue(context, rowId, value, 'value', columncontext)
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
    var end = columncontext == 0 ? columncontext + 1 : columncontext;
    for (var x = start; x <= end; x++) {
        data[x] = {};
        for (var type in workbook.properties) {
            data[x][type] = workbook.statelessGetValue(workbook.context, rowId, type, x);
            data[x].column = x;
            data[x].variable = workbook.getStatelessVariable(rowId, 'value').rowId;
        }
    }
    return data;
}
exports.fesjs = {
    init: init,
    value: value,
    addFunctions: addFunctions
}