process.loglevel = "info";
global.loglevel = "info";
require('../../../ff-fes/exchange_modules/lme/lmeparser');
var modelengine = require('./lme');
const lme = require('../../../ff-V05/V05');
MatrixLookup = function() {
    return 1;
}
let returnData = require('../json/V05_canvas.json');
modelengine.importSolution(returnData, "lme");
LME = lme;
module.exports = lme;
