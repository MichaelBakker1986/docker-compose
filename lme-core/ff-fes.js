/* jshint node: true */
/**
 * user friendly API
 */
require("./exchange_modules/ffl/fflparser");//just let it inject into the FESFacade
require("./exchange_modules/ffl2/RegisterToLMEParser");//just let it inject into the FESFacade
require("./exchange_modules/ffl2/RegisterPlainFFLDecorator");//just let it inject into the FESFacade
//require('./exchange_modules/presentation/presentation');//just let it inject into the FESFacade
var log = require("ff-log");
var WorkBook = require("./src/JSWorkBook");
var FESContext = require("./src/fescontext");
var TupleIndexConverter = require("./src/TupleIndexConverter");

function FESApi() {
}

FESApi.prototype.init = function(data) {
    var JSWorkBook = new WorkBook(new FESContext());
    JSWorkBook.importSolution(data, "ffl2_backwards");
    var validate = JSWorkBook.validateImportedSolution();
    JSWorkBook.fixProblemsInImportedSolution();
    var validateFeedback = JSWorkBook.validateImportedSolution();
    if (validateFeedback.valid) {
        //valid
        log.debug("Initialized model [" + JSWorkBook.getSolutionName() + "]");
    } else {
        log.error(validateFeedback);
        throw Error("unable to initialize");
    }
    return JSWorkBook;
};
FESApi.prototype.addFunctions = function(plugin) {
    var functions = [];
    for (var functionName in plugin.entries) {
        functions.push(functionName);
        global[functionName] = plugin.entries[functionName];
    }
    log.debug('Added fes-plugin [%s] functions [%s]', plugin.name, functions);
};
/**
 * rowId - VariableName
 * @Optional value - new value
 * TODO: move to tupleDefinition to support multiple tuple definition/tuple in tuple
 */
// Convert tuple index to tuple number
FESApi.prototype.fesGetValue = function(context, rowId, columncontext, value, tupleindex, columns) {
    columncontext = columncontext || 0;
    columns = columns || 1;
    if (tupleindex !== undefined) {
        tupleindex = TupleIndexConverter.getIndexNumber(context, tupleindex);
    }
    var fesContext = new FESContext();
    fesContext.values = context.values;
    var JSWorkBook = new WorkBook(fesContext);
    JSWorkBook.columns = context.columns || 2;
    JSWorkBook.properties = context.properties || JSWorkBook.properties;
    //prepare the workbook and context to match current appscope
    JSWorkBook.updateValues();
    //setvalue
    if (value !== undefined) {
        //choice(select) requests
        JSWorkBook.setSolutionPropertyValue(rowId, value, 'value', columncontext, tupleindex);

        var values = [];
        var rootNode = JSWorkBook.getSolutionNode(rowId);

        JSWorkBook.visitProperties(rootNode, function(node, yax, treeDepth) {
            values = values.concat(getEntry(JSWorkBook, node.solutionName + '_' + node.rowId, columncontext, yax));
        }, 0);
        return values;
    } else {
        //getValue
        var values = [];
        var rootNode = JSWorkBook.getSolutionNode(rowId);
        if (rootNode) {
            JSWorkBook.visitProperties(rootNode, function(node, yax) {
                values.push(getEntry(JSWorkBook, node.solutionName + '_' + node.rowId, columncontext, yax));
            });
        } else {
            values.push({
                variable: rowId
            });
        }
        return values;
    }
};

FESApi.prototype.getObjectValues = function(context, rowId, columncontext, value, tupleindex, columns) {
    columncontext = columncontext || 0;
    columns = columns || 1;
    if (tupleindex !== undefined) {
        tupleindex = TupleIndexConverter.getIndexNumber(context, tupleindex);
    }
    var fesContext = new FESContext();
    fesContext.values = context.values;
    var JSWorkBook = new WorkBook(fesContext);
    JSWorkBook.columns = context.columns || 2;
    JSWorkBook.properties = context.properties || JSWorkBook.properties;
    //getValue
    const values = [];
    var rootNode = JSWorkBook.getSolutionNode(rowId);
    if (rootNode) {
        for (var i = 0; i < 17; i++) {
            const result = {}
            JSWorkBook.visitProperties(rootNode, function(node, yax) {
                const nodeName = node.solutionName + '_' + node.rowId;
                result[node.rowId] = getValueObject(JSWorkBook, nodeName, i, yax)
            });
            values.push(result)
        }
    } else {
        values.push({
            variable: rowId
        });
    }
    return values;
}

function getValueObject(workbook, rowId, columncontext, yAxis) {
    const dataEnty = {}
    for (var type in workbook.properties) {
        dataEnty[type] = workbook.getSolutionPropertyValue(rowId, type, columncontext, yAxis);
    }
    return dataEnty;
}

/**
 * Given properties in workbook return all values for given columns
 * @param workbook
 * @param rowId
 * @param columncontext
 * @returns {Array}
 */
function getEntry(workbook, rowId, columncontext, yAxis) {
    var outputData = [];
    var columnStart = columncontext;
    var columnEnd = workbook.columns;
    var variable = workbook.getSolutionNode(rowId, 'value');

    if (variable && variable.frequency === 'document') {
        columnEnd = columnStart;
    }
    var tupleStart = 0;
    var tupleEnd = 0;

    // If frequency = column: return multiple columns
    for (var xAxisCounter = columnStart; xAxisCounter <= columnEnd; xAxisCounter++) {
        var dataEnty = {};
        outputData.push(dataEnty);

        // For properties of the variable
        for (var type in workbook.properties) {
            dataEnty[type] = workbook.getSolutionPropertyValue(rowId, type, xAxisCounter, yAxis);

            if (columnStart !== columnEnd || columnStart > 0) {
                dataEnty.column = xAxisCounter;
            }
            dataEnty.variable = variable.rowId;
            if (variable.tuple) {
                dataEnty.tupleIndex = yAxis.index;
            }
            dataEnty.hash = yAxis.hash + xAxisCounter + 0;
        }
    }
    //if there is only one column, the exported value is not presented to be an array
    if (columnStart == columnEnd) {
        outputData = outputData[0];
    }
    return outputData;
}

exports.JSWorkbook = WorkBook;
exports.LMEContext = WorkBook;
exports.fesjs = FESApi.prototype;
