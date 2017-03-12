var logger = require('ff-log')
var formulaJs = require('formulajs')
var entries = {};
for (functionName in formulaJs) {
    entries[functionName] = function () {
        return 1;
    }
}
logger.debug('Init functions [%s]', entries)
//bind functions to formula-bootstrap.js ..
exports.formulajs = {
    name: 'formulaJs',
    entries: entries
}