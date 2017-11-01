const Promise = require('promise')
const log = require('ff-log')
const MatrixStore = require('./MatrixStore').MatrixStore
const ds = new MatrixStore();
const fesjsApi = require('../ff-fes').fesjs;
const ModelListener = require('../ff-ssh-git').ModelListener;
const modelService = new ModelListener();
const modelNames = []

var lastModelName;// = modelNames[0]
modelService.onNewModel = function(model) {
    modelNames.push(fesjsApi.init(model));
    lastModelName = modelNames[0];
}

fesjsApi.addFunctions(require('../ff-math/ff-math').mathJs);
fesjsApi.addFunctions(require('../ff-formulajs/ff-formulajs').formulajs);

//add excel-lookup, MatrixLookup
var excelPlugin = require('../ff-fes-xlsx/ff-fes-xlsx').xlsxLookup;
excelPlugin.initComplete.then(function() {
    modelService.initializeModels();
})
fesjsApi.addFunctions(excelPlugin);
exports.lmeAPI = fesjsApi