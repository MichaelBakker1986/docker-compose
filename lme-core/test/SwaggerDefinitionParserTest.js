const assert = require('assert');
require('../exchange_modules/ffl2/RegisterPlainFFLDecorator');
require('../exchange_modules/swagger/swaggerParser');
require('../../math/ff-math');
PPMT = function() {
    return 1;
}
const WorkBook = require('../src/JSWorkBook');
const Context = require('../src/Context')
const fflTestModels = ['KSP'];
const fs = require('fs')

for (var i = 0; i < fflTestModels.length; i++) {
    var fflModelName = fflTestModels[i];
    var data = fs.readFileSync(__dirname + '/../resources/' + fflModelName + '.ffl', 'utf8');
    var wb = new WorkBook(new Context());
    wb.importSolution(data, 'ffl');
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
    assert(JSON.stringify(outputResult, null, 2).length == 5623)
}