/**
 * KSP test cases
 * some if statements are not parsed correctly (if/If), changes are made within the KSP.ffl file
 * formulas containing ":" are not parsed correctly, changes are made within KSP.ffl file
 *
 */
const fs = require('fs')
const LMEapi = require('../../lme-model-api/src/lme');
require('../../lme-core/exchange_modules/ffl2/RegisterPlainFFLDecorator');
const model = new LMEapi();
var excelPlugin = require('../../excel-connect').xlsxLookup;
model.addFunctions(excelPlugin);
excelPlugin.initComplete().then(function(matrix) {
    model.importFFL2BackwardsCompatible(fs.readFileSync(__dirname + '/KSP.ffl', 'utf8'))
}).catch(function(err) {
    throw err
})