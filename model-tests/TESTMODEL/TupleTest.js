require('../../lme-core/exchange_modules/presentation/webexport');
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator');
XMLHttpRequest = require("xhr2").XMLHttpRequest;
var excelPlugin = require('../../excel-connect').xlsxLookup;
const LME = require('../../lme-model-api/src/lme');
const Context = require('../../lme-core/src/Context');
const log = require('log6');
const fs = require('fs');
const assert = require('assert');
const TUPLETEST = new LME();
const context = new Context();
context.columnSize = 1;
context.columns = ['value']
TUPLETEST.lme.context = context


TUPLETEST.addFunctions(excelPlugin);
let mvoFLLFile = fs.readFileSync(__dirname + '/TupleTest.ffl', 'utf8');
TUPLETEST.importFFL(mvoFLLFile);
let nodes = TUPLETEST.exportWebModel().nodes;
//TUPLETEST.lme.set('Tuple', 'test', 'value', 0, 1)

TUPLETEST.lme.set('Tuple', 'test', 'value', 0, 1)

const [Tuple] = [nodes.Tuple_0];
//Tuple.add()
nodes = TUPLETEST.exportWebModel().nodes;
var arr = []
for (var node in nodes) {
    arr[nodes[node].order_id] = nodes[node].id
}
console.info(arr)
/*

 1000 TupleDef [+]
 2000 TupleChild_01
 3000 TupleChild_02

 1001 TupleDef [+]
 2001
 3001
 */




