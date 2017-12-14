const log = require('ff-log')
const lmeAPI = require('../lme-core').fesjs;
lmeAPI.addFunctions(require('../math').mathJs);
lmeAPI.addFunctions(require('../formulajs-connect').formulajs);
const LMEFacade = require('../lme-core/src/FESFacade');
const WorkBook = require('../lme-core/src/JSWorkBook');
const FESContext = require('../lme-core/src/fescontext');
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

    if (modelName !== 'KSP') {
        return;
    }

    var JSWorkBook = new WorkBook(new FESContext());
    JSWorkBook.modelName = "KSP"
    JSWorkBook.updateValues();
    /**
     * Update API-definition with variable names
     */
    LMEFacade.findAllInSolution(modelName, function(node) {
        //PROTOTYPE SWAGGER-DEF GENERATE!
        if (node.solutionName == 'KSP') {
            if (node.colId === 'value') {
                if (node.nodes.length > 1) {
                    let params = [{
                        "$ref": "#/parameters/ContextId"
                    }]
                    let param = params;
                    /*     if (node.tupleDefinition) {
                             param = []
                             params.push({
                                 type: "array",
                                 items: param
                             })

                         }*/
                    for (var i = 0; i < node.nodes.length; i++) {
                        const n = JSWorkBook.getNode(node.nodes[i].rowId)
                        param.push({
                            "name": n.rowId,
                            "required": true,
                            "in": "query",
                            "type": n.datatype == 'percentage' ? 'number' : n.datatype,
                            "description": JSWorkBook.get(n.rowId, 'title')
                        })
                    }

                    apidef.paths["/id/{id}/figure/" + node.rowId] = {
                        "post": {
                            "summary": JSWorkBook.get(node.rowId, 'title'),
                            "operationId": node.rowId,
                            "produces": [
                                "application/json"
                            ],
                            "parameters": params,
                            "responses": {
                                "200": {
                                    "description": "OK",
                                    "content": {
                                        "application/json": {
                                            "type": "array",
                                            "schema": {
                                                "$ref": "#/definitions/Value"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
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