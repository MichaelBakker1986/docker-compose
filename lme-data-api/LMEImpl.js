const log = require('ff-log')
const lmeAPI = require('../lme-core').fesjs;
lmeAPI.addFunctions(require('../math').mathJs);
lmeAPI.addFunctions(require('../formulajs-connect').formulajs);
const LMEFacade = require('../lme-core/src/FESFacade');
require('../lme-core/exchange_modules/swagger/swaggerParser');
const WorkBook = require('../lme-core/src/JSWorkBook');
const FESContext = require('../lme-core/src/fescontext');
const ModelListener = require('../git-connect').ModelListener;
const modelService = new ModelListener();
const modelNames = []
const apidef = require(__dirname + '/api/swaggerDef.json');

var lastModelName;// = modelNames[0]
modelService.onNewModel = function(model, path) {
    const lmeModel = lmeAPI.init(model);
    const modelname = lmeModel.modelName;
    modelNames.push(modelname);
    lastModelName = lmeModel;

    //apidef.parameters.FigureName.enum.push(modelname + '_' + node.rowId)
    if (modelname !== 'KSP') {
        return;
    }
    const indexer = lmeModel.indexer
    /**
     * Update API-definition with variable names
     */
    const inputNodes = indexer.find('displaytype', 'Input')
    for (var i = 0; i < inputNodes.length; i++) {
        var node = inputNodes[i];
        apidef.paths["/id/{id}/figure/{figureName}"].post.parameters[0].schema = lmeModel.export('swagger', node[indexer.schemaIndexes.name])
    }
    const outputNodes = indexer.find('displaytype', 'Output')
    var output = {}
    for (var i = 0; i < outputNodes.length; i++) {
        var node = outputNodes[i];
        apidef.paths["/id/{id}/figure/{figureName}"].post.responses["200"].schema = lmeModel.export('swagger', node[indexer.schemaIndexes.name])
    }
}
/**
 * Add modules
 *    - Matrix
 *    - FormulaJS
 *    - Lme-Math
 */

var excelPlugin = require('../excel-connect').xlsxLookup;
excelPlugin.initComplete('KSP').then(function() {
    modelService.initializeModels();
})
lmeAPI.addFunctions(excelPlugin);
exports.lmeAPI = lmeAPI