/**
 * KSP test cases
 * some if statements are not parsed correctly (if/If), changes are made within the KSP.ffl file
 * formulas containing ":" are not parsed correctly, changes are made within KSP.ffl file
 *
 */
const fs = require('fs')
const LMEapi = require('../../lme-model-api/src/lme');
require('../../lme-core/exchange_modules/ffl2/RegisterPlainFFLDecorator');
require('../../lme-core/exchange_modules/presentation/webexport_with_template');
require('../../lme-core/exchange_modules/screendefinition/screendefparser');
const log = require('ff-log')
const model = new LMEapi();
const assert = require('assert')
var excelPlugin = require('../../excel-connect').xlsxLookup;
model.addFunctions(excelPlugin);
excelPlugin.initComplete('KSP').then(function(matrix) {
    model.importFFL2BackwardsCompatible(fs.readFileSync(__dirname + '/KSP.ffl', 'utf8'))
    const index = model.lme.indexer
    const nodes = model.exportWebModel().nodes
    
    /*    nodes.ValueExtraMonth.value = 10;
        nodes.IncomeParent01.value = 1;
        console.info(nodes.YearlyIncomeParent01.value)
        nodes.IncomeParent01.value = 1;

        nodes.ValueExtraMonth.value = 20;*/
    /*    nodes.IncomeParent01.value = 100;
        nodes.ValueExtraMonth.value = 100;
        nodes.ExtraMonthParent01.value = "Nee";
        assert(nodes.ValueExtraMonth.value == 100)
        nodes.ExtraMonthParent01.value = "Ja";
        assert(nodes.ValueExtraMonth.value == nodes.IncomeParent01.value)
        assert(nodes.YearlyIncomeParent01.value == (nodes.IncomeParent01.value * 12 * 1.08) + nodes.ValueExtraMonth.value)
        nodes.ValueExtraMonth.value = 0;
        console.info(nodes.YearlyIncomeParent01.value)
        nodes.SecondaryEducationProfile.value = 2;
        console.info(nodes.CostsYearOneFour.value)*/
}).catch(function(err) {
    log.error(err)
    process.exit(1);
})