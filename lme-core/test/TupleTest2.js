require('../exchange_modules/presentation/webexport');
require('../exchange_modules/ffl/RegisterPlainFFLDecorator');
const LME = require('../../lme-model-api/src/lme');
const Context = require('../src/Context');
const log = require('log6');
const fs = require('fs');
const assert = require('assert');
const YAxis = require('../src/YAxis');
//We add custom TimeAxis because we are going to extend columns here to the max to test the 10bit into tuple range
const defaultImport = require('../resources/CustomImport.json')
const TUPLETEST = new LME(defaultImport, new Context({columnSize: 1, columns: ['value']}));
const workbook = TUPLETEST.lme;
TUPLETEST.importFFL(fs.readFileSync(__dirname + '/TupleTest.ffl', 'utf8'));
const rootVariable = workbook.getRootSolutionProperty()
workbook.set('Tuple', '123', 'value', 0, YAxis[1])
assert.equal(workbook.maxTupleCountForRow(workbook.findNode('Tuple'), YAxis[0].parent), 1)
workbook.set('NestedTuple', '123', 'value', 0, YAxis[1].deeper[0])
assert.equal(workbook.maxTupleCountForRow(workbook.findNode('NestedTuple'), YAxis[0].deeper[0]), -1, 'There is a Tuple instance on 1,0 but not on 0,0')
assert.equal(workbook.maxTupleCountForRow(workbook.findNode('NestedTuple'), YAxis[1].deeper[0]), 0, ' We just added a nested tuple instance here')
assert.equal(workbook.maxTupleCountForRow(workbook.findNode('NestedTuple'), YAxis[2].deeper[0]), -1, 'No instance here')
assert.equal(workbook.maxTupleCountForRow(workbook.findNode('NestedTuple'), YAxis[3].deeper[0]), -1)
assert.equal(workbook.maxTupleCountForRow(workbook.findNode('NestedTuple'), YAxis[4].deeper[0]), -1)
assert.equal(workbook.maxTupleCountForRow(workbook.findNode('Tuple'), YAxis[0].deeper[0]), -1, 'No Instance here')
assert.equal(workbook.maxTupleCountForRow(workbook.findNode('Tuple'), YAxis[1].deeper[0]), 0, 'there is an instance here')
workbook.set('Tuple', '123', 'value', 0, YAxis[1].deeper[0])
assert.equal(workbook.maxTupleCountForRow(workbook.findNode('Tuple'), YAxis[1]), 0)
assert.equal(workbook.maxTupleCountForRow(workbook.findNode('NestedTuple'), YAxis[2].deeper[2]), -1)
//its strange to see why the first tuple shows 3nested instances also
workbook.walkProperties(rootVariable, function(node, yax, treeDepth, y) {
    log.info(y.display + " ".repeat(treeDepth) + node.rowId)
}, YAxis[0].parent, null, 0)
