import { XMLHttpRequest } from 'xhr2'
import '../../lme-core/exchange_modules/presentation/webexport'

import excelPlugin from '../../excel-connect'
import LME         from '../../lme-model-api/src/lme'

global.XMLHttpRequest = XMLHttpRequest
const ChangeManager = require('../../lme-core/exchange_modules/ffl/ChangeManager').ChangeManager
const Register = require('../../lme-core/exchange_modules/ffl/Register').Register
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator')
const log = require('log6')
const assert = require('assert')
const HYPOTHEEK = new LME()
HYPOTHEEK.addFunctions(excelPlugin)
let HYPOTHEEKFFLFile = require('fs').readFileSync(__dirname + '/HYPOTHEEK.ffl', 'utf8')
HYPOTHEEK.importFFL(HYPOTHEEKFFLFile)
const nodes = HYPOTHEEK.exportWebModel().no
HYPOTHEEK.lme.fixProblemsInImportedSolution()
const register = new Register()
const changeManager = new ChangeManager(register)
changeManager.updateCursor(HYPOTHEEKFFLFile, { row: 40, col: 0 })
assert.equal(changeManager.currentVariableName, 'Q_MAP01_INFO')
changeManager.updateCursor(HYPOTHEEKFFLFile, { row: 40, col: 0 })
assert.equal(changeManager.currentVariableName, 'Q_MAP01_INFO')
assert.equal(nodes.Partner01Geslacht.value, NA)
nodes.Partner01Geslacht.value = 'Vrouw'
assert(nodes.Partner01Geslacht.value == 'Vrouw')

