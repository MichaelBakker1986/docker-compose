require('../../lme-core/exchange_modules/presentation/webexport');
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator');
const LME = require('../../lme-model-api/src/lme');
const log = require('log6');
const fs = require('fs');
const assert = require('assert');

const excelPlugin = require('../../excel-connect').xlsxLookup;
const SCORECARDTESTMODEL = new LME();
SCORECARDTESTMODEL.addFunctions(excelPlugin);
excelPlugin.initComplete('SCORECARDTESTMODEL').then(function(matrix) {
    SCORECARDTESTMODEL.importFFL2BackwardsCompatible(fs.readFileSync(__dirname + '/SCORECARDTESTMODEL.ffl', 'utf8'));
    const nodes = SCORECARDTESTMODEL.exportWebModel().nodes;
    assert(SCORECARDTESTMODEL.lme.validateImportedSolution())
}).catch((err) => {
    log.error(err)
    process.exit(1);
})


