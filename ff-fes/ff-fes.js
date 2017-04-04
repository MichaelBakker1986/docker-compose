require('./exchange_modules/ffl/fflparser');//just let it inject into the GenericModelFile
require('./exchange_modules/presentation/presentation');//just let it inject into the GenericModelFile
var logger = require('ff-log')
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
        logger.debug('Initialized model [' + wb.modelName + ']');
    } else {
        logger.error(validateFeedback)
        throw Error('unable to initialize')
    }
    return wb.getRootNode().solutionName;
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
var fesGetValue = function (context, rowId, columncontext, value) {
    var fesContext = new FESContext();
    fesContext.values = context.values;
    var wb = new JSWorkBook(fesContext)
    //prepare the workbook and context to match current appscope
    wb.updateValueMap()
    if (value !== undefined) {
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
    var end = columncontext == 0 ? columncontext + 1 : columncontext;
    for (var x = start; x <= end; x++) {
        data[x] = {};
        for (var type in workbook.properties) {
            data[x][type] = workbook.statelessGetValue(rowId, type, x);
            data[x].column = x;
            data[x].variable = workbook.getStatelessVariable(rowId, 'value').rowId;
        }
    }
    return data;
}
exports.fesjs = {
    init: FESApi.prototype.init,
    fesGetValue: fesGetValue,
    addFunctions: addFunctions
}