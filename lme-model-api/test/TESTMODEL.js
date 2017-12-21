require('../../lme-core/exchange_modules/presentation/webexport');
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator');
const modelAPI = require('../src/lme');
const log = require('ff-log');
const fs = require('fs');
const assert = require('assert');
const newModel = new modelAPI();
assert.ok((1 || false));
assert.ok(!(null == 'true'));
assert.ok(!(undefined == 'true'));
Number.prototype.countDecimals = function() {
    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0;
}
/**
 * FFL->LME->WebExport
 */
newModel.importFFL2BackwardsCompatible(fs.readFileSync(__dirname + '/TESTMODEL.ffl', 'utf8'));
const nodes = newModel.exportWebModel().nodes;
/**
 * Declare variables
 */
const [VariableOne, VariableTwo, Total, OneFixedDecimal, ZeroFixedDecimal, EvaluateStringTitle, DataEntered] = [nodes.VariableOne, nodes.VariableTwo, nodes.Total, nodes.OneFixedDecimal, nodes.ZeroFixedDecimal, nodes.EvaluateStringTitle, nodes.DataEntered];

assert.equal(VariableOne.value, 101, "default value is 101. Found [" + VariableOne.value + ']');
assert.equal(VariableTwo.value, 102, "default value is 102");
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
assert.equal(OneFixedDecimal.value.countDecimals(), 1);
assert.equal(ZeroFixedDecimal.value.countDecimals(), 0);
assert.equal(EvaluateStringTitle.title, Total.title, 'Testing EvaluateStringTitle.title failed. ["' + EvaluateStringTitle.title + '"], it should be the same as Total.title ["' + Total.title + '"] ["' + EvaluateStringTitle.title + " == " + Total.title + '"]')
assert.ok(VariableOne.entered)
assert.ok(!Total.entered)
let exportData = newModel.exportData();
log.debug(exportData)
newModel.importData([{
    "varName": "TESTMODEL_VariableOne",
    "colId": "2",
    "value": 1000,
    "formulaId": "100004"
}])
let exportDataAfter = newModel.exportData();
log.debug('Tests passed');