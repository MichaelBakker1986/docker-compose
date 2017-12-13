const log = require('ff-log')
const lmeAPI = require('../lme-core').fesjs;
lmeAPI.addFunctions(require('../math').mathJs);
lmeAPI.addFunctions(require('../formulajs-connect').formulajs);
const LMEFacade = require('../lme-core/src/FESFacade');
const ModelListener = require('../git-connect').ModelListener;
const modelService = new ModelListener();
const modelNames = []
const apidef = require(__dirname + '/api/swaggerDef.json');
var lastModelName;// = modelNames[0]
if (!global.MatrixLookup) {
    MatrixLookup = function() {
        return 1;
    }
}
if (!global.MATRIX_VALUES) {
    MATRIX_VALUES = {}
}
modelService.onNewModel = function(model, path) {
    let modelName = lmeAPI.init(model);
    modelNames.push(modelName);
    lastModelName = modelName;

    /**
     * Update API-definition with variable names
     */
    LMEFacade.findAllInSolution(modelName, function(node) {
        //PROTOTYPE SWAGGER-DEF GENERATE!
        if (node.solutionName == 'KSP') {
            if (node.colId === 'value') {
                if (node.nodes.length > 1) {
                    const params = [{
                        "$ref": "#/parameters/ContextId"
                    }, {
                        "$ref": "#/parameters/FigureName"
                    }]
                    for (var i = 0; i < node.nodes.length; i++) {
                        params.push({
                            "name": node.nodes[i].rowId,
                            "required": true,
                            "type": "string"
                        })
                    }
                    apidef.paths["/id/{id}/" + node.rowId] = {
                        "post": {
                            "summary": "Get all values traversing down the Figure tree from given {figureName} in context {id}.",
                            "operationId": "figure",
                            "produces": [
                                "application/json"
                            ],
                            "parameters": params,
                            "responses": {
                                "200": {
                                    "description": "OK",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/definitions/Value"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //console.info(node.nodes)
                }
            }
        }
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

var excelPlugin = require('../excel-connect').xlsxLookup;
excelPlugin.initComplete('KSP').then(function() {
    modelService.initializeModels();
})
lmeAPI.addFunctions(excelPlugin);
exports.lmeAPI = lmeAPI