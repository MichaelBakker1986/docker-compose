//global.IDE_DEBUGMODUS = true
const [assert, importModel, LME, log, readFileSync, writeFileSync] = require('../ModelFacade')

const DebugManager = require('../../lme-core/exchange_modules/ffl/DebugManager').DebugManager
const Register = require('../../lme-core/exchange_modules/ffl/Register').Register
const Formatter = require('../../lme-core/exchange_modules/ffl/FFLFormatter').Formatter

let V05ffl = readFileSync(__dirname + '/V05_realtuple.ffl');

//some case-bugfixes
V05ffl = V05ffl.replace(/amount/gmi, 'Amount')
V05ffl = V05ffl.replace(/Bookvalue/gmi, 'BookValue')
V05ffl = V05ffl.replace(/GoodWill/gmi, 'GoodWill')
V05ffl = V05ffl.replace(/DiscountRateTaxShieldBasis/gmi, 'DiscountRateTaxShieldBasis')
V05ffl = V05ffl.replace(/krWirtschaftlichesEigenKapitalRating/gmi, 'krWirtschaftlichesEigenKapitalRating')
V05ffl = V05ffl.replace(/OtherTransitionalAssets/gmi, 'OtherTransitionalAssets')
V05ffl = V05ffl.replace(/LiquidVATonCashExpenses/gmi, 'LiquidVATOnCashExpenses')

const raw_register = new Register();
const formatterTry1 = new Formatter(raw_register, V05ffl);
formatterTry1.parseProperties()

const child_index = raw_register.schemaIndexes.children
const formula_index = raw_register.schemaIndexes.formula
raw_register.removeColumn('children')
raw_register.removeColumn('desc')
raw_register.removeColumn('end')
raw_register.removeColumn('start')
raw_register.removeColumn('version')
raw_register.removeColumn('index')
raw_register.removeColumn('parentId')
raw_register.removeColumn('treeindex')
raw_register.removeColumn('link')
raw_register.flush()

const schema = raw_register.schema.join(';')

//const csvout = raw_register.schema.map(col => [col].concat(raw_register.getAll(col).map(ff => raw_register.translateKeys(String(ff))).join(';'))).join('\n')
const csvout = raw_register.i.map((row, index) => row.map((item, colid) => raw_register.translateKeys(String(item))).join(';')).join('\n')
//join('\n')
console.info(JSON.stringify(raw_register.getAll('frequency')))

require('fs').writeFileSync('./raw_v05.csv', schema + '\n' + csvout, 'utf8');
return
//require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator')
/*

const register = new Register();
LME.importFFL({
    register: register,
    raw     : V05ffl
});
*/

//require('fs').writeFile('./test', JSON.stringify(names))
//console.info(LME.lme.get('LossesCarriedForward'))

//new DebugManager(register, LME.lme.context.audittrail).monteCarlo('V05')
//LME.lme.context.audittrail.printErrors()