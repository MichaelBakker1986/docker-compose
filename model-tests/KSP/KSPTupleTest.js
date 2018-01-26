require('../../lme-core/exchange_modules/presentation/webexport');
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator');
var excelPlugin = require('../../excel-connect').xlsxLookup;
const LME = require('../../lme-model-api/src/lme');
const log = require('log6');
const fs = require('fs');
const assert = require('assert');
const MVO = new LME();
MVO.addFunctions(excelPlugin);
const mvoFLLFile = fs.readFileSync(__dirname + '/KSP.ffl', 'utf8');
require('../EconomicEditorView').EconomicEditorView.parse(mvoFLLFile)
MVO.importFFL(mvoFLLFile);
const nodes = MVO.exportWebModel().nodes;
assert(MVO.lme.fixProblemsInImportedSolution())



