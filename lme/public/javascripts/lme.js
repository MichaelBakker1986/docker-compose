Error.prototype.stack = Error.prototype.stack || "";
process.loglevel = "info";
global.loglevel = "info";
require('../../../ff-fes/exchange_modules/lme/lmeparser');
const lme = require('../../../ff-V05/V05');
MatrixLookup = function() {
    return 1;
}
LME = lme;
module.exports = lme;
