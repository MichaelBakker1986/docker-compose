/**
 * KSP test cases
 * some if statements are not parsed correctly (if/If), changes are made within the KSP.ffl file
 * formulas containing ":" are not parsed correctly, changes are made within KSP.ffl file
 *
 */
const fs = require('fs')
const LMEapi = require('../../lme-model-api/src/lme');
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator');
require('../../lme-core/exchange_modules/presentation/webexport');
require('../../lme-core/exchange_modules/screendefinition/screendefparser');
const log = require('log6')
const model = new LMEapi();
const assert = require('assert')
var excelPlugin = require('../../excel-connect').xlsxLookup;
model.addFunctions(excelPlugin);
excelPlugin.initComplete('KSP').then(function(matrix) {
    model.importFFL(fs.readFileSync(__dirname + '/KSP.ffl', 'utf8'))
    const index = model.lme.indexer
    const nodes = model.exportWebModel().nodes

}).catch(function(err) {
    log.error(err)
    process.exit(1);
})