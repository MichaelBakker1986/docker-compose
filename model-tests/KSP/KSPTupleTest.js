require('../../lme-core/exchange_modules/presentation/webexport');
require('../../lme-core/exchange_modules/ffl2/RegisterPlainFFLDecorator');
XMLHttpRequest = require("xhr2").XMLHttpRequest;
var excelPlugin = require('../../excel-connect').xlsxLookup;
const LME = require('../../lme-model-api/src/lme');
const log = require('ff-log');
const fs = require('fs');
const assert = require('assert');
const MVO = new LME();
MVO.addFunctions(excelPlugin);
let mvoFLLFile = fs.readFileSync(__dirname + '/KSP.ffl', 'utf8');
require('../EconomicEditorView').EconomicEditorView.parse(mvoFLLFile)
MVO.importFFL2BackwardsCompatible(mvoFLLFile);
const nodes = MVO.exportWebModel().nodes;
MVO.lme.fixProblemsInImportedSolution()



