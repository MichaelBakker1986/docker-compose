/**
 * bridge between formulajs and fesjs
 */
var logger = require('ff-log')
var formulaJs = require('formulajs')
var entries = {};
for (functionName in formulaJs) {
    //FFL parser uses this function to be a VARIABLE 1e-10
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