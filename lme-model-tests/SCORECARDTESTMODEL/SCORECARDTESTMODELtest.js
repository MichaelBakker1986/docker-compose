require('../../ff-fes/exchange_modules/presentation/webexport');
const LME = require('../../lme/src/lme');
const log = require('ff-log');
const fs = require('fs');
const assert = require('assert');
const SCORECARDTESTMODEL = new LME();
/* FFL->LME->WebExport */
SCORECARDTESTMODEL.importFFL("" + fs.readFileSync(__dirname + '/SCORECARDTESTMODEL.ffl'));
fs.writeFileSync(__dirname + '/SCORECARDTESTMODEL.json', SCORECARDTESTMODEL.exportLME());
const nodes = SCORECARDTESTMODEL.exportWebModel().nodes;
SCORECARDTESTMODEL.lme.validateImportedSolution()
const [Q_Map03] = [nodes.Q_Map03];
