require('../../lme-core/exchange_modules/presentation/webexport_with_template');
XMLHttpRequest = require("xhr2").XMLHttpRequest;
var excelPlugin = require('../../excel-connect').xlsxLookup;
const LME = require('../../lme-model-api/src/lme');
const ChangeManager = require('../../lme-core/exchange_modules/ffl2/ChangeManager').ChangeManager
const Register = require('../../lme-core/exchange_modules/ffl2/Register').Register
const RegisterToFFL = require('../../lme-core/exchange_modules/ffl2/RegisterToFFL').RegisterToFFL
const log = require('ff-log');
const fs = require('fs');
const assert = require('assert');
const MVO = new LME();
MVO.addFunctions(excelPlugin);
let mvoFLLFile = fs.readFileSync(__dirname + '/HYPOTHEEK.ffl', 'utf8');
MVO.importFFL(mvoFLLFile);
const nodes = MVO.exportWebModel()
MVO.lme.fixProblemsInImportedSolution()


const register = new Register();
const changeManager = new ChangeManager(register)
changeManager.updateCursor(mvoFLLFile, {row: 40, col: 0})
assert(changeManager.currentVariableName == 'Q_MAP01_WARNING')
changeManager.updateCursor(mvoFLLFile, {row: 40, col: 0})
assert(changeManager.currentVariableName == 'Q_MAP01_WARNING')
