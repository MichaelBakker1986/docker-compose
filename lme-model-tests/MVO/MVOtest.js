require('../../ff-fes/exchange_modules/presentation/webexport');
var excelPlugin = require('../../ff-fes-xlsx/ff-fes-xlsx').xlsxLookup;
const LME = require('../../lme/src/lme');
const log = require('ff-log');
const fs = require('fs');
const assert = require('assert');
const MVO = new LME();
MVO.addFunctions(excelPlugin);
/* FFL->LME->WebExport */
MVO.importFFL("" + fs.readFileSync(__dirname + '/MVO.ffl'));
fs.writeFileSync(__dirname + '/MVO.json', MVO.exportLME());
const nodes = MVO.exportWebModel().nodes;

const [Q_Map03] = [nodes.Q_Map03];

