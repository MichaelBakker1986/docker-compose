var Promise = require('promise')
var log = require('ff-log')
var gitconnector = require('../ff-ssh-git/gitconnector')
var DBConnector;
var apiimpl = function (DBConnectorArg) {
    DBConnector = DBConnectorArg;
}
var fesjsApi = require('../ff-fes/ff-fes').fesjs;
var ModelListener = require('../ff-ssh-git/gitconnector').ModelListener;
var modelService = new ModelListener();
var modelNames = []
var modelName;// = modelNames[0]
//register a listener before initializing the process
modelService.onNewModel = function (model) {
    modelNames.push(fesjsApi.init(model));
    modelName = modelNames[0];
}

fesjsApi.addFunctions(require('../ff-math/ff-math').mathJs);
//add excel functions, PPMT, IGG etc...
fesjsApi.addFunctions(require('../ff-formulajs/ff-formulajs').formulajs);

//add excel-lookup, MatrixLookup
var excelPlugin = require('../ff-fes-xlsx/ff-fes-xlsx').xlsxLookup;
excelPlugin.initComplete.then(function () {
    modelService.initializeModels();
})
fesjsApi.addFunctions(excelPlugin);

function prefixVariable(variableName) {
    if (variableName === undefined) {
        return undefined;
    }
    for (var i = 0; i < modelNames.length; i++) {
        var modelPrefix = modelNames[i];
        if (variableName.startsWith(modelPrefix + '_')) {
            return variableName;
        }
    }
    return modelNames[0] + '_' + variableName;
}
apiimpl.prototype.value = function (contextKey, variable, columncontext, value) {
    var context = DBConnector.getUserContext(contextKey);
    //all values are strings when entering, wen it can be parsed to a number, we will parse it.
    var value = isNaN(value) ? value : parseFloat(value)
    var result = fesjsApi.fesGetValue(context, prefixVariable(variable), columncontext, value);
    return result;
}
apiimpl.prototype.context = function (contextKey, variable, columncontext, value) {
    var context = DBConnector.getUserContext(contextKey);
    var result = fesjsApi.fesGetValue(context, prefixVariable(variable), columncontext, value);
    if (variable) {
        context[variable] = value
    }
    return context;
}
apiimpl.prototype.getFFl = function (data) {
    return new Promise(function (success, err) {
        DBConnector('SELECT property,content FROM k3_files where type = "ffl" order by modified limit 1').then(function (result) {
            var bufferBase64 = new Buffer(result.data[0].content, 'binary').toString('utf-8');
            //result.data = undefined;
            //result.entry = bufferBase64;
            success({
                entry: data,
                data: bufferBase64
            })
        }).catch(function (err) {
            info.error("ERROR", err);
        });
    })
}
module.exports = apiimpl;