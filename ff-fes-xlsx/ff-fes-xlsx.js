var logger = require('ff-log')
var formulaJs = require('formulajs')
var entries = [];
for (functionName in formulaJs) {
    entries.push(functionName)
}
logger.debug('Init functions [%s]', entries)
//bind functions to formula-bootstrap.js ..
exports.formulajs = {
    name: 'formulaJs',
    entries: entries
}