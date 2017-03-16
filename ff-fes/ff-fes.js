require('./exchange_modules/ffl/fflparser');//just let it inject into the GenericModelFile
require('./exchange_modules/presentation/presentation');//just let it inject into the GenericModelFile
var logger = require('ff-log')
var wb = require('./fesjs/JSWorkBook').prototype;
var init = function (data) {
    wb.doImport(data, 'ffl');
    var validate = wb.validate();
    validate.fixAll();
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
    wb.updateValueMap(context.values)
    if (value !== undefined) {
        wb.statelessSetValue(context, rowId, value, 'value', columncontext)
        return getEntry(context, rowId, columncontext)
    } else {
        var values = [];
        wb.visit(wb.getStatelessNode(rowId), function (node) {
            values.push(getEntry(context, node.solutionName + '_' + node.rowId, columncontext))
        });
        return values;
    }
}
function getEntry(context, rowId, columncontext) {
    var data = [];
    var start = columncontext;
    var end = columncontext == 0 ? columncontext + 1 : columncontext;
    for (var x = start; x <= end; x++) {
        data[x] = {};
        for (var type in wb.properties) {
            data[x][type] = wb.statelessGetValue(context, rowId, type, x);
            data[x].column = x;
            data[x].variable = wb.getStatelessVariable(rowId, 'value').rowId;
        }
    }
    return data;
}
exports.fesjs = {
    init: init,
    value: value,
    addFunctions: addFunctions
}