require('../../ff-fes/exchange_modules/presentation/webexport');
var modelAPI = require('../src/lme')
var log = require('ff-log')
var assert = require('assert');
var newModel = new modelAPI();
newModel.importLME(require('../public/json/KSP_canvas.json'));
let nodes = newModel.exportWebModel().nodes;
for (var node in nodes) {
    var n = nodes[node];
    log.info(node + ":" + n.value);
    log.info(node + ":" + n.title);
    log.info(node + ":" + n.required);
    log.info(node + ":" + n.visible);
}

assert.equal(nodes.IncomeParent02.locked, false);
nodes.IncomeParent01.value = 300;//a100052
assert.equal(nodes.IncomeParent01.value, 300);//a100009 =
assert.equal(nodes.IncomeParent02.locked, true);//a100009 =
nodes.IncomeParent01.value = 200;

assert.equal(nodes.IncomeParent02.locked, false);
