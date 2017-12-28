require('../../lme-core/exchange_modules/presentation/webexport');
XMLHttpRequest = require("xhr2").XMLHttpRequest;
var excelPlugin = require('../../excel-connect').xlsxLookup;
const LME = require('../../lme-model-api/src/lme');
const ChangeManager = require('../../lme-core/exchange_modules/ffl/ChangeManager').ChangeManager
const Register = require('../../lme-core/exchange_modules/ffl/Register').Register
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator')
const log = require('log6');
const assert = require('assert');
const HYPOTHEEK = new LME();
HYPOTHEEK.addFunctions(excelPlugin);
let HYPOTHEEKFFLFile = require('fs').readFileSync(__dirname + '/HYPOTHEEK.ffl', 'utf8');
HYPOTHEEK.importFFL2BackwardsCompatible(HYPOTHEEKFFLFile);
const nodes = HYPOTHEEK.exportWebModel().nodes
HYPOTHEEK.lme.fixProblemsInImportedSolution()
const register = new Register();
const changeManager = new ChangeManager(register)
changeManager.updateCursor(HYPOTHEEKFFLFile, {row: 40, col: 0})
assert(changeManager.currentVariableName == 'Q_MAP01_WARNING')
changeManager.updateCursor(HYPOTHEEKFFLFile, {row: 40, col: 0})
assert(changeManager.currentVariableName == 'Q_MAP01_WARNING')
assert(nodes.Partner01Geslacht.value == undefined)
nodes.Partner01Geslacht.value = "Vrouw"
assert(nodes.Partner01Geslacht.value == "Vrouw")

