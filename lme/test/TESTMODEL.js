require('../../ff-fes/exchange_modules/presentation/webexport');
const modelAPI = require('../src/lme');
const log = require('ff-log');
const fs = require('fs');
const assert = require('assert');
const newModel = new modelAPI();
/**
 * FFL->LME->WebExport
 */
newModel.importFFL("" + fs.readFileSync(__dirname + '/TESTMODEL.ffl'));
fs.writeFileSync(__dirname + '/TESTMODEL.json', newModel.exportLME());
const nodes = newModel.exportWebModel().nodes;
/**
 * Declare variables
 */
const [VariableOne, VariableTwo, Total] = [nodes.VariableOne, nodes.VariableTwo, nodes.Total];
const [VariableOneFormula, VariableTwoFormula, TotalFormula] = [nodes.VariableOne.node.delegate.formula, nodes.VariableTwo.node.delegate.formula, nodes.Total.node.delegate.formula];

log.debug("Test formula [" + VariableOneFormula + "]")
assert.equal(VariableOne.value, 101, "default value is 101. Found [" + VariableOne.value + ']');
log.debug("Test formula [" + VariableTwoFormula + "]")
assert.equal(VariableTwo.value, 102, "default value is 102");
log.debug("Test formula [" + TotalFormula + "]")
//101+102=203
assert.equal(Total.value, 203, "default value is 102. but is [" + Total.value + "][" + VariableOne.parsed + "]");
VariableOne.value = 200;
//200+102=302
assert.equal(Total.value, 302);
//200+200=400
VariableTwo.value = 200;
assert.equal(Total.value, 400);
assert.equal(VariableTwo.visible, true, "visible: VariableOne <> 100");
VariableOne.value = 100;
assert.equal(VariableTwo.visible, false, "visible: VariableOne <> 100");
assert.equal(VariableOne.required, true, "inputRequired: 1");
//Total now is 400
assert.equal(VariableTwo.required, false, "inputRequired: Total > 1000;");
Total.value = 1001;
assert.equal(VariableTwo.required, true, "inputRequired: Total > 1000;");
Total.value = null;
//Total now is 400
assert.equal(VariableTwo.required, false, "inputRequired: Total > 1000;");
VariableOne.value = 900;
assert.equal(VariableTwo.required, true, "inputRequired: Total > 1000;" + Total.value);
log.info('Tests passed')