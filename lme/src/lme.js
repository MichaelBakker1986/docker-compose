Error.prototype.stack = Error.prototype.stack || "";
process.loglevel = "info";
global.loglevel = "info";
MatrixLookup = function() {
    return 1;
}
require('../../ff-fes/exchange_modules/lme/lmeparser');

function LME() {
    this.lme = require('../../ff-V05/V05');
}

LME.prototype.exportLME = function() {
    return this.lme.export('lme')
}
LME.prototype.importLME = function(json) {
    this.lme.importSolution(json, 'lme')
}
LME.prototype.importFFL = function(ffl) {
    this.lme.importSolution(ffl, 'ffl')
}
LME.prototype.exportFFL = function(ffl) {
    return this.lme.export('ffl')
}
LME.prototype.exportPresentation = function() {
    return this.lme.export('presentation')
}
module.exports = LME;