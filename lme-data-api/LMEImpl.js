const log = require('ff-log')
const lmeAPI = require('../lme-core').fesjs;
lmeAPI.addFunctions(require('../math').mathJs);
lmeAPI.addFunctions(require('../formulajs-connect').formulajs);
const LMEFacade = require('../lme-core/src/FESFacade');
const SolutionFacade = require('../lme-core/src/SolutionFacade');
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
    const indexer = lmeModel.indexer
    const names = indexer.getIndex('name')
    for (var name in names) {
        apidef.parameters.FigureName.enum.push(modelname + '_' + name)
    }
    if (modelname !== 'KSP') {
        return;
    }

    /**
     * Update API-definition with variable names
     */
    const inputNodes = indexer.find('displaytype', 'Input')
    let endPointname;

    for (var i = 0; i < inputNodes.length; i++) {
        var node = inputNodes[i];
        endPointname = node[indexer.schemaIndexes.name]
        const operation = "/id/{id}/figure/" + endPointname;
        const schema = lmeModel.export('swagger', {
            rowId: endPointname,
            type: 'input'
        });
        if (!apidef.paths[operation]) {
            apidef.paths[operation] = {
                "post": {
                    "summary": endPointname,
                    "operationId": endPointname,
                    "consumes": [
                        "application/json"
                    ],
                    "produces": [
                        "application/json"
                    ],
                    "parameters": [
                        {
                            "$ref": "#/parameters/ContextId"
                        },
                        {
                            "$ref": "#/parameters/Times"
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Success",
                            "schema": {}
                        }
                    }
                }
            }
        }
        apidef.paths[operation].post.parameters.push({
            "name": endPointname,
            "in": "body",
            "description": "",
            "required": false,
            "schema": schema
        })
    }
    const outputNodes = indexer.find('displaytype', 'Output')
    var output = {}
    for (var i = 0; i < outputNodes.length; i++) {
        var node = outputNodes[i];
        const swaggerSchema = lmeModel.export('swagger', {
            rowId: node[indexer.schemaIndexes.name],
            type: 'output'
        });

        apidef.paths["/id/{id}/figure/" + endPointname].post.responses["200"] = {
            "description": "Success",
            "schema": {
                "type": "array",
                "items": swaggerSchema
            }
        }
    }
}
/**
 * Add modules
 *    - Matrix
 *    - FormulaJS
 *    - Lme-Math
 */

var excelPlugin = require('../excel-connect').xlsxLookup;
excelPlugin.initComplete('KSP').then(function(matrix) {
    SolutionFacade.initVariables([{name: 'MATRIX_VALUES', expression: matrix}])
    modelService.initializeModels();
})
lmeAPI.addFunctions(excelPlugin);
exports.lmeAPI = lmeAPI