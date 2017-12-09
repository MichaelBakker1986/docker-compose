require('../../lme-core/exchange_modules/presentation/webexport_with_template');
require('../../lme-core/exchange_modules/ffl2/RegisterToLMEParser');
XMLHttpRequest = require("xhr2").XMLHttpRequest;
var excelPlugin = require('../../excel-connect').xlsxLookup;
const LME = require('../../lme-model-api/src/lme');
const log = require('ff-log');
const fs = require('fs');
const assert = require('assert');
const TUPLETEST = new LME();
TUPLETEST.addFunctions(excelPlugin);
let mvoFLLFile = fs.readFileSync(__dirname + '/TupleTest.ffl', 'utf8');
TUPLETEST.importFFL(mvoFLLFile);
const nodes = TUPLETEST.exportWebModel().nodes;

const [Tuple] = [nodes.Tuple];
Tuple.add()
Tuple.add()
console.info(Tuple)




