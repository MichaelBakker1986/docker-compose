require('../../lme-core/exchange_modules/presentation/webexport_with_template');
XMLHttpRequest = require("xhr2").XMLHttpRequest;
var excelPlugin = require('../../excel-connect').xlsxLookup;
const LME = require('../../lme-model-api/src/lme');
const log = require('ff-log');
const fs = require('fs');
const assert = require('assert');
const MVO = new LME();
MVO.addFunctions(excelPlugin);
let mvoFLLFile = fs.readFileSync(__dirname + '/MVO.ffl', 'utf8');
require('../EconomicEditorView').EconomicEditorView.parse(mvoFLLFile)
MVO.importFFL(mvoFLLFile);
const nodes = MVO.exportWebModel().nodes;


const [Q_MAP01_VRAAG01_MEMO, FES_LAYOUTNR, RootSub1, FES_COLUMN_VISIBLE] = [nodes.Q_MAP01_VRAAG01_MEMO, nodes.FES_LAYOUTNR, nodes.RootSub1, nodes.FES_COLUMN_VISIBLE];
const [Q_MAP01, Q_MAP01_ENTEREDREQUIREDVARS, Q_MAP01_REQUIREDVARS, Q_MAP01_PARAGRAAF00, Q_MAP01_VRAAG01] = [nodes.Q_MAP01, nodes.Q_MAP01_ENTEREDREQUIREDVARS, nodes.Q_MAP01_REQUIREDVARS, nodes.Q_MAP01_PARAGRAAF00, nodes.Q_MAP01_VRAAG01];
assert(Q_MAP01.value == undefined)
Q_MAP01.value = Q_MAP01.choices[0].value
assert(Q_MAP01.value == "Onvolledig ingevuld.")
Q_MAP01.value = Q_MAP01.choices[1].value
assert(Q_MAP01.value == "Volledig ingevuld.")
Q_MAP01.value = null;

//basic model tests.
assert(!Q_MAP01_VRAAG01_MEMO.visible)
var choices = nodes.Q_MAP01_VRAAG01.choices
Q_MAP01_VRAAG01.value = choices[1].value
assert(Q_MAP01_VRAAG01_MEMO.visible)
var choices = nodes.Q_MAP02_VRAAG01.choices
nodes.Q_MAP02_VRAAG01.value = choices[1].value
assert(nodes.Q_MAP02_VRAAG01.value == choices[1].value)
nodes.Q_MAP02_VRAAG01.value = choices[0].value
MVO.lme.fixProblemsInImportedSolution()



