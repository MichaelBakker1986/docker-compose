var parser = require('./exchange_modules/ffl/fflparser.js');//just let it inject into the GenericModelFile
require('./exchange_modules/presentation/presentation.js');//just let it inject into the GenericModelFile
var logger = require('ff-log')
var WorkBook = require('./fesjs/JSWorkBook.js');
var wb = new WorkBook();
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
        wb.visit(wb.getNode(rowId), function (node) {
            values.push(getEntry(context, node.rowId, columncontext))
        });
        return values;
    }
}
var properties = ['value', 'title', 'locked', 'visible', 'required'];
function getEntry(context, rowId, columncontext) {
    var data = [];
    var start = columncontext;
    var end = columncontext == 0 ? columncontext + 3 : columncontext;
    for (var x = start; x <= end; x++) {
        data[x] = {};
        for (var i = 0; i < properties.length; i++) {
            var type = properties[i];
            data[x][type] = wb.statelessGetValue(context, rowId, type, x);
            data[x].column = x;
            data[x].row = rowId;
        }
    }
    return data;
}
module.exports = {
    init: init,
    value: value,
    addFunctions: addFunctions
}
exports = {
    init: init,
    value: value,
    addFunctions: addFunctions
}