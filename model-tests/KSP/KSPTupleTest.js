require('../../lme-core/exchange_modules/presentation/webexport_with_template');
XMLHttpRequest = require("xhr2").XMLHttpRequest;
var excelPlugin = require('../../excel-connect').xlsxLookup;
const LME = require('../../lme-model-api/src/lme');
const log = require('ff-log');
const fs = require('fs');
const assert = require('assert');
const MVO = new LME();
MVO.addFunctions(excelPlugin);
let mvoFLLFile = fs.readFileSync(__dirname + '/../../git-connect/resources/KSP.ffl', 'utf8');
require('../EconomicEditorView').EconomicEditorView.parse(mvoFLLFile)
MVO.importFFL(mvoFLLFile);
const nodes = MVO.exportWebModel().nodes;
for (var key in nodes){
    console.info(key)
}
MVO.lme.fixProblemsInImportedSolution()
const [Child] = [nodes.Child];
console.info(Child)




