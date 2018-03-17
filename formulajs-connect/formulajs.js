/**
 * bridge between formulajs and fesjs
 */
const logger = require('log6')
const formulaJs = require('formulajs')
const entries = {};
for (var functionName in formulaJs) {
    //FFL parser uses this function to be a VARIABLE 1e-10
    if (functionName == 'NA') {
        continue;
    }
    if (global[functionName] !== undefined) {
        if (logger.DEBUG) logger.debug('global function already used : [' + functionName + ']')
        continue;
    }
    entries[functionName] = formulaJs[functionName]
}
exports.formulajs = {
    name: 'formulaJs',
    entries: entries
}