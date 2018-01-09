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
const nodes = TUPLETEST.exportWebModel().nodes;

const [Tuple] = [nodes.Tuple_add_tuple_1];
Tuple.add()
Tuple.add()
console.info(nodes)




