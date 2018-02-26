global.DEBUGMODUS = true;
const log = require('log6')
const DebugManager = require('../../lme-core/exchange_modules/ffl/DebugManager').DebugManager
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator')
require('../../lme-core/exchange_modules/presentation/webexport');
const debugManager = new DebugManager()
global.debug = function(name) {
    debugManager.addStep(name)
}
let ffl = require('fs').readFileSync(__dirname + '/KSP.ffl', 'utf8')
var excelPlugin = require('../../excel-connect/excel-connect');
const LME = require('../../lme-model-api/src/lme');
const MVO = new LME();
MVO.addFunctions(excelPlugin);
MVO.importFFL(ffl);
const nodes = MVO.exportWebModel().no;
log.debug(nodes.Q_MAP01_WARNING.value)
log.debug(debugManager.active)
debugManager.initVariables(ffl)