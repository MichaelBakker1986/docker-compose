global.IDE_DEBUGMODUS = true
const log = require('log6')
const assert = require('assert')
if (log.DEBUG) log.debug('Start FFLScorecardIndexerTest.js')
const LME = require('../../lme-model-api/src/lme')
const Register = require('../../lme-core/exchange_modules/ffl/Register').Register
const Context = require('../../lme-core/src/Context')
const DebugManager = require('../../lme-core/exchange_modules/ffl/DebugManager').DebugManager
const modelRegister = new Register();
const RegisterToFFL = require('../../lme-core/exchange_modules/ffl/RegisterToFFL').RegisterToFFL
require('../../lme-core/exchange_modules/ffl/RegisterToLMEParser')

const ScorecardTool = require('../../lme-core/exchange_modules/ffl/ScorecardTool').ScorecardTool
const Formatter = require('../../lme-core/exchange_modules/ffl/FFLFormatter').Formatter
const modelName = 'MVO';

const ffl = require('fs').readFileSync(__dirname + '/../' + modelName + '/' + modelName + '.ffl', 'utf8')
try {
    const formatter = new Formatter(modelRegister, ffl);
    formatter.parseProperties()

    new RegisterToFFL(modelRegister).toGeneratedFFL("Q_ROOT", modelName).join('\n');
    const indexer = new ScorecardTool().parse(ffl)
    const scorecarddata = modelRegister.header + '{\n' + new RegisterToFFL(indexer).toGeneratedFFL(undefined, modelName).join('\n');
    const context = new Context();
    const lme = new LME(null, context);
    lme.importFFL(scorecarddata)
    const debugManager = new DebugManager(modelRegister, context.audittrail);

    assert.ok(debugManager.monteCarlo(modelName).valid);

} catch (err) {
    log.error(err)
    process.exit(1)
}