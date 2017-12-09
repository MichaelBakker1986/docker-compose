global.DEBUGMODUS = true;
const DebugManager = require('../../lme-core/exchange_modules/ffl2/DebugManager').DebugManager
require('../../lme-core/exchange_modules/presentation/webexport_with_template');
const debugManager = new DebugManager()
global.debug = function(name) {
    debugManager.addStep(name)
}
let ffl = require('fs').readFileSync('./KSP.ffl', 'utf-8')
var excelPlugin = require('../../excel-connect/excel-connect').xlsxLookup;
const LME = require('../../lme-model-api/src/lme');

const MVO = new LME();
MVO.addFunctions(excelPlugin);
MVO.importFFL(ffl);
const nodes = MVO.exportWebModel().nodes;
console.info(nodes.Q_MAP01_WARNING.value)
console.info(debugManager.active)
debugManager.initVariables(ffl)
console.info(debugManager.getCurrentLine())
