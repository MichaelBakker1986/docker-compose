/*
 * Never include this in frond-end-dist for evaluation purpose
 * lme.js is the front-end opponent
 */
require('../lme-core/exchange_modules/presentation/webexport');
const FormulaService = require('../lme-core/fesjs/FormulaService');
var esprima = require('esprima')
var escodegen = require('escodegen')
var excelPlugin = require('../ff-fes-xlsx/ff-fes-xlsx').xlsxLookup;
const LME = require('../lme-model-api/src/lme');
const log = require('ff-log');
const fs = require('fs');
const assert = require('assert');
const model = new LME();
model.addFunctions(excelPlugin);


function importModel(name) {
    model.importFFL(fs.readFileSync(__dirname + '/' + name + '.ffl', "utf8"));
}

LME.prototype.visitFormulas = FormulaService.visitFormulas
LME.prototype.maxDependencies = function() {
    var bestMatchingDependency, max = -1;
    FormulaService.visitFormulas((formula) => {
        //tempOutput += formula.fflname + '=' + formula.original + ';\n';
        var depsSize = Object.keys(formula.deps).length;
        if (max < depsSize) {
            max = depsSize;
            log.debug(formula.name + ":" + depsSize)
            bestMatchingDependency = formula;
        }
    })
    return bestMatchingDependency;
}

function readFileSync(name) {
    return fs.readFileSync(name, 'utf8')
}

module.exports = [assert, importModel, model, log, readFileSync, fs.writeFileSync];
