const log = require('log6')
const assert = require('assert')
try {
    if (log.DEBUG) log.debug('Start FFLScorecardIndexerTest.js')
    const LME = require('../../lme-model-api/src/lme')
    const Register = require('../../lme-core/exchange_modules/ffl/Register').Register
    const modelRegister = new Register();
    const RegisterToFFL = require('../../lme-core/exchange_modules/ffl/RegisterToFFL').RegisterToFFL
    require('../../lme-core/exchange_modules/ffl/RegisterToLMEParser')
    const ScorecardTool = require('../../lme-core/exchange_modules/ffl/ScorecardTool').ScorecardTool
    const Formatter = require('../../lme-core/exchange_modules/ffl/FFLFormatter').Formatter
    const ffl = require('fs').readFileSync(__dirname + '/../MVO/MVO.ffl', 'utf-8')
    var now = require('performance-now')
    var formatter = new Formatter(modelRegister, ffl);
    formatter.parseProperties()
    let start = now()
    const data = new RegisterToFFL(modelRegister).toGeneratedFFL("Q_ROOT", 'MVO').join('\n');
    const indexer = new ScorecardTool().parse(ffl)
    const scorecarddata = modelRegister.header + '{\n' + new RegisterToFFL(indexer).toGeneratedFFL(undefined, 'MVO').join('\n');
    const lme = new LME();
    lme.lme.modelName = "MVO"
    lme.importFFL(scorecarddata)
    var validate = lme.lme.validateImportedSolution();
    lme.lme.fixProblemsInImportedSolution();
    assert.ok(lme.lme.validateImportedSolution().valid);

} catch (err) {
    log.error(err)
    process.exit(1)
}