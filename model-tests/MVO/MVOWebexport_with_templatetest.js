require('../../ff-fes/exchange_modules/presentation/webexport_with_template');
var excelPlugin = require('../../ff-fes-xlsx/ff-fes-xlsx').xlsxLookup;
const LME = require('../../lme-model-api/src/lme');
const log = require('ff-log');
const fs = require('fs');
const assert = require('assert');
const MVO = new LME();
MVO.addFunctions(excelPlugin);
/* FFL->LME->WebExport */
MVO.importFFL("" + fs.readFileSync(__dirname + '/MVO.ffl'));
fs.writeFileSync(__dirname + '/MVO.json', MVO.exportLME());

MVO.importWebModel('MVO_Q_MAP01_INFO\nMVO_Q_MAP02_INFO')
const nodes = MVO.exportWebModel().nodes;
console.info(nodes)


