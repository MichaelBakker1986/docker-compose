/**
 * Load FFL models, update Dynamic Swagger docs
 * TODO: concat the matrix files into one
 * TODO: ModelName to Entrypoints mapping
 */
const LMEFacade = require('../lme-core').LMEFacade;
LMEFacade.addFunctions(require('../math').mathJs);
LMEFacade.addFunctions(require('../formulajs-connect').formulajs);
const SolutionFacade = require('../lme-core/src/SolutionFacade');
require('../lme-core/exchange_modules/swagger/swaggerParser');
const ModelListener = require('../git-connect').ModelListener;
const modelLoadListener = new ModelListener();
const APIDefinition = require(__dirname + '/api/AuthenticatedSwaggerDefinition.json');
const log = require('log6')

modelLoadListener.addListener(function(fflModelData, path) {
    const lmeModel = LMEFacade.initializeFFlModelData(fflModelData, path);
    const modelname = lmeModel.modelName;
    const indexer = lmeModel.indexer
    const names = indexer.getIndex('name')

    for (var name in names) APIDefinition.parameters.FigureName.enum.push(modelname + '_' + name)
    /**
     * Update API-definition with variable names
     * Is only used for KSP
     * TODO: make more generic solution
     */

    const outputNodes = indexer.find('displaytype', 'Output').concat(indexer.find('data_options', 'Output'))
    if (outputNodes.length > 0) {
        let endPointname;
        const inputNodes = indexer.find('displaytype', 'Input').concat(indexer.find('data_options', 'Input'))
        if (outputNodes.length != inputNodes.length) {
            log.warn('invalid in and output-nodes ')
            return;
        }
        for (var i = 0; i < outputNodes.length; i++) {
            var outputNode = outputNodes[i];
            var inputNode = inputNodes[i];
            endPointname = outputNode[indexer.schemaIndexes.name]
            const operation = "/figure/" + endPointname;
            const schema = lmeModel.export('swagger', {
                rowId: inputNode[indexer.schemaIndexes.name],
                type: 'input'
            });
            if (!APIDefinition.paths[operation]) {
                APIDefinition.paths[operation] = {
                    "post": {
                        "summary": endPointname,
                        "operationId": endPointname,
                        "consumes": [
                            "application/json"
                        ],
                        "produces": [
                            "application/json"
                        ],
                        "parameters": [],
                        "responses": {
                            "200": {
                                "description": "Success",
                                "schema": {}
                            }
                        }
                    }
                }
            }
            APIDefinition.paths[operation].post.parameters.push({
                "name": endPointname,
                "in": "body",
                "description": "",
                "required": false,
                "schema": schema
            })
        }
        for (var i = 0; i < outputNodes.length; i++) {
            var node = outputNodes[i];
            const swaggerSchema = lmeModel.export('swagger', {
                rowId: node[indexer.schemaIndexes.name],
                type: 'output'
            });
            APIDefinition.paths["/figure/" + endPointname].post.responses["200"] = {
                "description": "Success",
                "schema": swaggerSchema
            }
        }
    }
})
/**
 * Add modules
 *    - Matrix
 *    - FormulaJS
 *    - Lme-Math
 */
var excelPlugin = require('../excel-connect').xlsxLookup;
excelPlugin.initComplete('KSP').then(function(matrix) {
    SolutionFacade.initVariables([{name: 'MATRIX_VALUES', expression: matrix}])
    modelLoadListener.initializeModels();
}).catch(function(err) {
    log.error(err)
})
LMEFacade.addFunctions(excelPlugin);
exports.ModelLoader = modelLoadListener
exports.LMECalculationFacade = LMEFacade