var Promise = require('promise')
var log = require('ff-log')
var DBConnector;

const MatrixStore = require('./MatrixStore').MatrixStore
const ds = new MatrixStore();

var fesjsApi = require('../ff-fes').fesjs;
var ModelListener = require('../ff-ssh-git').ModelListener;
var modelService = new ModelListener();
var modelNames = []
var modelName;// = modelNames[0]
//register a listener before initializing the process
modelService.onNewModel = function(model) {
    modelNames.push(fesjsApi.init(model));
    modelName = modelNames[0];
}

fesjsApi.addFunctions(require('../ff-math/ff-math').mathJs);
//add excel functions, PPMT, IGG etc...
fesjsApi.addFunctions(require('../ff-formulajs/ff-formulajs').formulajs);

//add excel-lookup, MatrixLookup
var excelPlugin = require('../ff-fes-xlsx/ff-fes-xlsx').xlsxLookup;
excelPlugin.initComplete.then(function() {
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
