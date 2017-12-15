var assert = require('assert');
var log = require('ff-log')
require('../exchange_modules/ffl2/RegisterPlainFFLDecorator');
require('../exchange_modules/swagger/swaggerParser');
require('../../math/ff-math');
var WorkBook = require('../src/JSWorkBook');
var JUNIT = require('./JUNIT');
var FESContext = require('../src/fescontext')
var fflTestModels = ['SCORECARDTESTMODEL'];

for (var i = 0; i < fflTestModels.length; i++) {
    var fflModelName = fflTestModels[i];
    var data = JUNIT.getFile(fflModelName + '.ffl');
    var wb = new WorkBook(new FESContext());
    wb.importSolution(data, 'ffl2_backwards');
    var swaggerDefinition = wb.export('swagger', 'Q_Map01')
    log.info(JSON.stringify(swaggerDefinition,null, 2))
}