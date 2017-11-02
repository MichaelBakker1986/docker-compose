const log = require('ff-log')
const MatrixStore = require('./MatrixStore').MatrixStore
const ds = new MatrixStore();
const fesjsApi = require('../ff-fes').fesjs;
const LMEFacade = require('../ff-fes/fesjs/FESFacade');
const ModelListener = require('../ff-ssh-git').ModelListener;
const modelService = new ModelListener();
const modelNames = []
const apidef = require(__dirname + '/swaggerDef.json');
var lastModelName;// = modelNames[0]
modelService.onNewModel = function(model) {
    let modelName = fesjsApi.init(model);
    modelNames.push(modelName);
    lastModelName = modelName;
    LMEFacade.findAllInSolution(modelName, function(node) {
        if (node.colId === 'value') {
            apidef.parameters.VariableName.enum.push(node.solutionName + '_' + node.rowId)
        }
    })
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