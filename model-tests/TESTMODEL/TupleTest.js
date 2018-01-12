require('../../lme-core/exchange_modules/presentation/webexport');
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator');
const LME = require('../../lme-model-api/src/lme');
const Context = require('../../lme-core/src/Context');
const ValueFacade = require('../../lme-core/src/ValueFacade');
const log = require('log6');
const fs = require('fs');
const assert = require('assert');
const YAxis = require('../../lme-core/src/YAxis');
const TUPLETEST = new LME();
const context = new Context();
context.columnSize = 1;
context.columns = ['value']
TUPLETEST.lme.context = context
const workbook = TUPLETEST.lme;
TUPLETEST.importFFL(fs.readFileSync(__dirname + '/TupleTest.ffl', 'utf8'));
const rootVariable = workbook.getRootSolutionProperty()
const yAxis = YAxis[0].parent;
//workbook.set('TupleVar1', 'test', 'value', 0, YAxis[1])
const val = workbook.export('webexport')
let called = 0;
workbook.walkProperties(rootVariable, function(node, yax, treeDepth, y) {
    called++;
    console.info(" ".repeat(treeDepth) + y.hash + "_" + y.index + "_" + node.name)
}, yAxis, null, 0)
assert(called == 2, 'Should be called for root_value and Tuple_value')
val.nodes.Tuple.add()
workbook.walkProperties(rootVariable, function(node, yax, treeDepth, y) {
    called++;
    console.info(" ".repeat(treeDepth) + y.hash + "_" + y.index + "_" + node.name)
}, yAxis, null, 0)


