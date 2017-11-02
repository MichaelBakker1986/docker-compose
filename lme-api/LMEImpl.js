const log = require('ff-log')
const fesjsApi = require('../ff-fes').fesjs;
const LMEFacade = require('../ff-fes/fesjs/FESFacade');
const ModelListener = require('../ff-ssh-git').ModelListener;
const modelService = new ModelListener();
const modelNames = []
const apidef = require(__dirname + '/api/swaggerDef.json');
var lastModelName;// = modelNames[0]
modelService.onNewModel = function(model) {
    let modelName = fesjsApi.init(model);
    modelNames.push(modelName);
    lastModelName = modelName;

    /**
     * Update API-definition with variable names
     */
    LMEFacade.findAllInSolution(modelName, function(node) {
        if (node.colId === 'value') {
            apidef.parameters.FigureName.enum.push(node.solutionName + '_' + node.rowId)
        }
    })
}
/**
 * Add modules
 *    - Matrix
 *    - FormulaJS
 *    - Lme-Math
 */
fesjsApi.addFunctions(require('../ff-math/ff-math').mathJs);
fesjsApi.addFunctions(require('../ff-formulajs/ff-formulajs').formulajs);
var excelPlugin = require('../ff-fes-xlsx/ff-fes-xlsx').xlsxLookup;
excelPlugin.initComplete.then(function() {
    modelService.initializeModels();
})
fesjsApi.addFunctions(excelPlugin);

exports.lmeAPI = fesjsApi