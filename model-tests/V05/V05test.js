global.IDE_DEBUGMODUS = true
const [assert, importModel, LME, log, readFileSync, writeFileSync] = require('../ModelFacade')

const DebugManager = require('../../lme-core/exchange_modules/ffl/DebugManager').DebugManager
const Register = require('../../lme-core/exchange_modules/ffl/Register').Register

let V05ffl = readFileSync(__dirname + '/V05_realtuple.ffl');

//some case-bugfixes
V05ffl = V05ffl.replace(/amount/gmi, 'Amount')
V05ffl = V05ffl.replace(/Bookvalue/gmi, 'BookValue')
V05ffl = V05ffl.replace(/GoodWill/gmi, 'GoodWill')
V05ffl = V05ffl.replace(/DiscountRateTaxShieldBasis/gmi, 'DiscountRateTaxShieldBasis')
V05ffl = V05ffl.replace(/krWirtschaftlichesEigenKapitalRating/gmi, 'krWirtschaftlichesEigenKapitalRating')
V05ffl = V05ffl.replace(/OtherTransitionalAssets/gmi, 'OtherTransitionalAssets')
V05ffl = V05ffl.replace(/LiquidVATonCashExpenses/gmi, 'LiquidVATOnCashExpenses')

require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator')

const register = new Register();
LME.importFFL({
    register: register,
    raw     : V05ffl
});
new DebugManager(register, LME.lme.context.audittrail).monteCarlo('V05')
//LME.lme.context.audittrail.printErrors()