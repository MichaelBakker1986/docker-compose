var parser = require('./archive/ffl/fflparser.js');//just let it inject into the GenericModelFile
require('./archive/exchange_modules/presentation/presentation.js');//just let it inject into the GenericModelFile
var logger = require('ff-log')
var WorkBook = require('./archive/fesjs/JSWorkBook.js');
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
var value = function (rowId, value) {
    if (value !== undefined) {
        wb.set(rowId, value)
        return getEntry(rowId)
    } else {
        var values = [];
        wb.visit(wb.getNode(rowId), function (node) {
            values.push(getEntry(node.rowId))
        });
        return values;
    }
}
var properties = ['value', 'title', 'locked', 'visible', 'required'];
function getEntry(rowId) {
    var data = [];
    for (var x = 0; x < 2; x++) {
        data[x] = {};
        for (var i = 0; i < properties.length; i++) {
            var type = properties[i];
            data[x][type] = wb.get(rowId, type, x);
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