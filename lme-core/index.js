/**
 * user friendly API
 * TODO: Move tuple related work to FESFacade
 */
require("./exchange_modules/ffl/fflparser");//just let it inject into the FESFacade
require("./exchange_modules/ffl2/RegisterToLMEParser");//just let it inject into the FESFacade
require("./exchange_modules/ffl2/RegisterPlainFFLDecorator");//just let it inject into the FESFacade
var log = require("ff-log");
var WorkBook = require("./src/JSWorkBook");
var Context = require("./src/Context");
var TupleIndexConverter = require("./src/TupleIndexConverter");

function LMEService() {
}

LMEService.prototype.initializeFFlModelData = function(data) {
    var JSWorkBook = new WorkBook(new Context());
    JSWorkBook.importSolution(data, "ffl2_backwards");
    var validate = JSWorkBook.validateImportedSolution();
    JSWorkBook.fixProblemsInImportedSolution();
    var validateFeedback = JSWorkBook.validateImportedSolution();
    if (validateFeedback.valid) {
        //valid
        if (log.DEBUG) log.debug("Initialized model [" + JSWorkBook.getSolutionName() + "]");
    } else {
        if (log.DEBUG) log.error(validateFeedback);
        throw Error("unable to initialize");
    }
    return JSWorkBook;
};
LMEService.prototype.addFunctions = function(plugin) {
    var functions = [];
    for (var functionName in plugin.entries) {
        functions.push(functionName);
        global[functionName] = plugin.entries[functionName];
    }
    if (log.DEBUG) log.debug('Added fes-plugin [%s] functions [%s]', plugin.name, functions);
};
/**
 * rowId - VariableName
 * @Optional value - new value
 * TODO: move to tupleDefinition to support multiple tuple definition/tuple in tuple
 */
// Convert tuple index to tuple number
LMEService.prototype.getValue = function(context, rowId, columncontext, value, tupleindex, columns) {
    columncontext = columncontext || 0;
    columns = columns || 1;
    if (tupleindex !== undefined) {
        tupleindex = TupleIndexConverter.getIndexNumber(context, tupleindex);
    }
    var fesContext = new Context();
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

LMEService.prototype.getObjectValues = function(context, rowId, tupleindex) {
    if (tupleindex !== undefined) {
        tupleindex = TupleIndexConverter.getIndexNumber(context, tupleindex);
    }
    var fesContext = new Context();
    fesContext.values = context.values;
    var JSWorkBook = new WorkBook(fesContext);
    JSWorkBook.columns = context.columns || 2;
    JSWorkBook.properties = context.properties || JSWorkBook.properties;
    const values = [];
    var rootNode = JSWorkBook.getSolutionNode(rowId);
    const flattenValues = {}
    if (rootNode) {

        JSWorkBook.visitProperties(rootNode, function(node, yax) {
            const nodeName = node.rowId;
            const parentName = node.parentName.split("_").slice(0, -1).join("_")
            const columns = node.frequency == 'document' ? 0 : context.columns;
            for (var i = 0; i <= columns; i++) {
                const appendix = columns == 0 ? "" : "$" + i
                flattenValues[node.rowId + appendix] = {
                    parent: parentName + appendix,
                    name: nodeName,
                    value: getValueObject(JSWorkBook, node.solutionName + "_" + node.rowId, i, yax),
                    data: []
                }
            }
        })
        //reassemble results
        for (var key in flattenValues) {
            if (flattenValues[flattenValues[key].parent]) {
                flattenValues[flattenValues[key].parent][flattenValues[key].name] = (flattenValues[key].value)
            } else {
                //array variants
                const parentName = flattenValues[key].parent.split("$")[0];
                if (flattenValues[parentName]) {
                    flattenValues[parentName].data.push(flattenValues[key])
                } else {
                    console.info('root:' + key)
                }
            }
        }
        for (var key in flattenValues) {
            delete flattenValues[key].parent
            delete flattenValues[key].name
            if (flattenValues[key].data.length == 0) delete flattenValues[key].data
        }
    } else {
        values.push({
            variable: rowId
        });
    }
    return flattenValues[rowId.split("_").slice(1).join("_")];
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
exports.CalculationFacade = LMEService.prototype;
