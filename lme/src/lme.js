Error.prototype.stack = Error.prototype.stack || "";
MatrixLookup = function() {
    return 1;
}
require('../../ff-fes/exchange_modules/lme/lmeparser');
require('../../ff-math/ff-math');
var fesjsApi = require('../../ff-fes/ff-fes').fesjs;
fesjsApi.addFunctions(require("../../ff-formulajs/ff-formulajs").formulajs);

function LME() {
    let FESContext = require('../../ff-fes/fesjs/fescontext');
    let WorkBook = require('../../ff-fes/fesjs/JSWorkBook');
    this.lme = new WorkBook(new FESContext());
}

LME.prototype.exportLME = function() {
    return this.lme.export('lme')
}
LME.prototype.importLME = function(json) {
    this.lme.importSolution(json, 'lme')
}
LME.prototype.exportJavaScript = function() {
    return this.lme.export('js');
}
LME.prototype.importFFL = function(ffl) {
    this.lme.importSolution(ffl, 'ffl')
}
LME.prototype.exportFFL = function() {
    return this.lme.export('ffl')
}
LME.prototype.exportPresentation = function() {
    return this.lme.export('presentation')
}
LME.prototype.exportWebModel = function() {
    return this.lme.export('webexport')
}
module.exports = LME;