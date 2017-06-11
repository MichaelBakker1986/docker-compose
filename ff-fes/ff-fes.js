/* jshint node: true */
/**
 * user friendly API
 */
require("./exchange_modules/ffl/fflparser");//just let it inject into the FESFacade
//require('./exchange_modules/presentation/presentation');//just let it inject into the FESFacade
var log = require("ff-log");
var WorkBook = require("./fesjs/JSWorkBook");
var FESContext = require("./fesjs/fescontext");
var TupleIndexConverter = require("./fesjs/TupleIndexConverter");

function FESApi() {
}

FESApi.prototype.init = function(data) {
    var JSWorkBook = new WorkBook(new FESContext());
    JSWorkBook.importSolution(data, "ffl");
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
    return JSWorkBook.getRootSolutionProperty().solutionName;
};
FESApi.prototype.addFunctions = function(plugin) {
    var functions = [];
    for (var functionName in plugin.entries) {
        functions.push(functionName);
        global[functionName] = plugin.entries[functionName];
    }
    log.info('Added fes-plugin [%s] functions [%s]', plugin.name, functions);
};
/**
 * rowId - VariableName
 * @Optional value - new value
 * TODO: move to tupleDefinition to support multiple tuple definition/tuple in tuple
 */
// Convert tuple index to tuple number
FESApi.prototype.fesGetValue = function(context, rowId, columncontext, value, tupleindex) {
    columncontext = columncontext || 0;
    if (tupleindex !== undefined) {
        tupleindex = TupleIndexConverter.getIndexNumber(context, tupleindex);
    }
    var fesContext = new FESContext();
    fesContext.values = context.values;
    var JSWorkBook = new WorkBook(fesContext);
    JSWorkBook.columns = context.columns || 17;
    JSWorkBook.properties = context.properties || JSWorkBook.properties;
    //prepare the workbook and context to match current appscope
    JSWorkBook.updateValues();
    //setvalue
    if (value !== undefined) {
        //choice(select) requests
        var variable = JSWorkBook.getSolutionNode(rowId, 'value');
        if (variable && variable.displayAs === 'select') {
            var choices = JSWorkBook.getSolutionPropertyValue(rowId, 'choices');
            var choiceValue = choices.lookup('value', value);
            if (choiceValue === undefined) {
                log.warn('Could not find [%s] choice [%s] in %s. using [%s] to be value', rowId, value, JSON.stringify(choices), value);
            } else {
                value = isNaN(choiceValue.name) ? choiceValue.name : parseInt(choiceValue.name);
            }
        }
        JSWorkBook.setSolutionPropertyValue(rowId, value, 'value', columncontext, tupleindex);

        var values = [];
        var rootNode = JSWorkBook.getSolutionNode(rowId);

        JSWorkBook.visitProperties(rootNode, function(node, yax) {
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
    /*
     if (variable && variable.frequency === 'document') {
     outputData = outputData[0];
     }*/
    return outputData;
}
exports.fesjs = FESApi.prototype;
