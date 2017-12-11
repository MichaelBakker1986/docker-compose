require('../../lme-core/exchange_modules/presentation/webexport_with_template');
XMLHttpRequest = require("xhr2").XMLHttpRequest;
var excelPlugin = require('../../excel-connect').xlsxLookup;
const LME = require('../../lme-model-api/src/lme');
const ChangeManager = require('../../lme-core/exchange_modules/ffl2/ChangeManager').ChangeManager
const Register = require('../../lme-core/exchange_modules/ffl2/Register').Register
require('../../lme-core/exchange_modules/ffl2/RegisterPlainFFLDecorator')
const log = require('ff-log');
const assert = require('assert');
const HYPOTHEEK = new LME();
HYPOTHEEK.addFunctions(excelPlugin);
let HYPOTHEEKFFLFile = require('fs').readFileSync(__dirname + '/HYPOTHEEK.ffl', 'utf8');
HYPOTHEEK.importFFL2Backwards(HYPOTHEEKFFLFile);
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

