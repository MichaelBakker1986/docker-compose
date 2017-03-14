var logger = require('ff-log')
var formulaJs = require('formulajs')
var entries = {};
for (functionName in formulaJs) {
    entries[functionName] = formulaJs[functionName]
}
logger.debug('Init functions [%s]', Object.keys(entries))
//bind functions to formula-bootstrap.js ..
exports.formulajs = {
    name: 'formulaJs',
    entries: entries
}