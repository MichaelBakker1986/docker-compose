global.DEBUGMODUS = true;
const log = require('log6')
const DebugManager = require('../../lme-core/exchange_modules/ffl/DebugManager').DebugManager
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator')
require('../../lme-core/exchange_modules/presentation/webexport');
const debugManager = new DebugManager()
global.debug = function(name) {
    debugManager.addStep(name)
}
let ffl = require('fs').readFileSync('./KSP.ffl', 'utf8')
var excelPlugin = require('../../excel-connect/excel-connect').xlsxLookup;
const LME = require('../../lme-model-api/src/lme');
const MVO = new LME();
MVO.addFunctions(excelPlugin);
MVO.importFFL(ffl);
const nodes = MVO.exportWebModel().no;
log.info(nodes.Q_MAP01_WARNING.value)
log.info(debugManager.active)
debugManager.initVariables(ffl)
log.info(debugManager.getCurrentLine())