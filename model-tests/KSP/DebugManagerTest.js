global.DEBUGMODUS = true;
const log = require('ff-log')
const DebugManager = require('../../lme-core/exchange_modules/ffl2/DebugManager').DebugManager
require('../../lme-core/exchange_modules/ffl2/RegisterPlainFFLDecorator')
require('../../lme-core/exchange_modules/presentation/webexport');
const debugManager = new DebugManager()
global.debug = function(name) {
    debugManager.addStep(name)
}
let ffl = require('fs').readFileSync('./KSP.ffl', 'utf-8')
var excelPlugin = require('../../excel-connect/excel-connect').xlsxLookup;
const LME = require('../../lme-model-api/src/lme');
const MVO = new LME();
MVO.addFunctions(excelPlugin);
MVO.importFFL2BackwardsCompatible(ffl);
const nodes = MVO.exportWebModel().nodes;
log.info(nodes.Q_MAP01_WARNING.value)
log.info(debugManager.active)
debugManager.initVariables(ffl)
log.info(debugManager.getCurrentLine())