const log = require('ff-log')
const lmeAPI = require('../ff-fes').fesjs;
const LMEFacade = require('../ff-fes/fesjs/FESFacade');
const ModelListener = require('../ff-ssh-git').ModelListener;
const modelService = new ModelListener();
const modelNames = []
const apidef = require(__dirname + '/api/swaggerDef.json');
var lastModelName;// = modelNames[0]
modelService.onNewModel = function(model) {
    let modelName = lmeAPI.init(model);
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
lmeAPI.addFunctions(require('../ff-math/ff-math').mathJs);
lmeAPI.addFunctions(require('../ff-formulajs/ff-formulajs').formulajs);
var excelPlugin = require('../ff-fes-xlsx/ff-fes-xlsx').xlsxLookup;
excelPlugin.initComplete.then(function() {
    modelService.initializeModels();
})
lmeAPI.addFunctions(excelPlugin);
exports.lmeAPI = lmeAPI