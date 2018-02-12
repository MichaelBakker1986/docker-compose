/*
 * Ensure basic ROOT node visible etc
 * This will test the UI to render basic root variable
 */
require('../../lme-core/exchange_modules/presentation/webexport');
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator');
const LME = require('../../lme-model-api/src/lme');
const assert = require('assert');
const Context = require('../../lme-core/src/Context'),
    Register = require('../../lme-core/exchange_modules/ffl/Register').Register;
const context = new Context({columnSize: 1, columns: ['value', 'visible']});

const wb = new LME(null, context)

//const wb = new WorkBook(context);
const register = new Register();
wb.importFFL({
    register: register,
    raw: require('fs').readFileSync(__dirname + '/SCORECARDBASICS.ffl', 'utf8')
});
const webExport = wb.exportWebModel();
const rows = webExport.rows;
const scorecards = webExport.findScorecardTypes();
assert.equal(scorecards.length, 1, 'The basic example has 1 scorecard type')
assert.equal(scorecards[0].id, 'Q_ROOT', "The basic demo has variable name Q_ROOT")
assert.equal(scorecards[0].visible, true, "The root node in the basic test is visible")
assert.equal(scorecards[0].children[0].visible, true, "The first map node in the basic test is visible")
assert.equal(scorecards[0].children[1].visible, true, "The second map node in the basic test is visible")
assert.equal(scorecards[0].children.length, 2, "The basic has 2 children")
webExport.sort()
assert.equal(rows.length, 3);
assert.ok(rows[0].visible)
wb.lme.validateImportedSolution()