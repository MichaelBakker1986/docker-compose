var assert = require('assert');
var log = require('ff-log')
require('../exchange_modules/ffl2/RegisterPlainFFLDecorator');
require('../exchange_modules/swagger/swaggerParser');
require('../../math/ff-math');
PPMT = function() {
    return 1;
}
var WorkBook = require('../src/JSWorkBook');
var JUNIT = require('./JUNIT');
var FESContext = require('../src/fescontext')
var fflTestModels = ['KSP'];

for (var i = 0; i < fflTestModels.length; i++) {
    var fflModelName = fflTestModels[i];
    var data = JUNIT.getFile(fflModelName + '.ffl');
    var wb = new WorkBook(new FESContext());
    wb.importSolution(data, 'ffl2_backwards');
    var swaggerDefinition = wb.export('swagger', {
        rowId: 'Q_MAP01',
        type: 'input'
    })

    var result = {
        "name": "request",
        "in": "body",
        "description": "",
        "required": false,
        "schema": swaggerDefinition
    }
    var swaggerDefinitionOutput = wb.export('swagger', {
        rowId: 'Q_MAP06',
        type: 'output'
    })
    var outputResult = {
        "type": "array",
        "items": swaggerDefinitionOutput
    }
    log.info(JSON.stringify(outputResult, null, 2))
}