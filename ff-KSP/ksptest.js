/**
 * KSP test cases
 */
global.loglevel = 'debug'
var FormulaService = require('../ff-fes/fesjs/FormulaService')
var WorkBook = require('../ff-fes/fesjs/JSWorkBook')
var FESContext = require('../ff-fes/fesjs/fescontext')
var log = require('ff-log')

var assert = require('assert')
require('../ff-math/ff-math')
var fesjsApi = require('../ff-fes/ff-fes').fesjs;
var JUNIT = require('../ff-fes/test/JUNIT');
fesjsApi.addFunctions(require('../ff-formulajs/ff-formulajs').formulajs);
//add excel-lookup, MatrixLookup
fesjsApi.addFunctions(require('../ff-fes-xlsx/ff-fes-xlsx').xlsxLookup);

var wbTest = new WorkBook(new FESContext());
assert('aIFRS-EUa'.indexOf('IFRS-EU') > 0)
wbTest.createFormula("'IFRS-EU'", 'FES_LAYOUT')
wbTest.createFormula("Pos('IFRS-EU',FES_LAYOUT)", "POS_LAYOUT");
assert(wbTest.get('POS_LAYOUT') === 0)
wbTest.set('FES_LAYOUT', 'IFRS-TEST')
assert(wbTest.get('POS_LAYOUT') === -1)
wbTest.set('FES_LAYOUT', 'FRS-EU')
assert(wbTest.get('POS_LAYOUT') === 1)
wbTest.createFormula("If(Pos('IFRS-EU','IFRS-EU')>0,1,2)", "KSP_POSTEST");
assert(wbTest.get('KSP_POSTEST') === 2)
wbTest.createFormula("If(Pos('IFRS-EU',FES_LAYOUT)>0,1,2)", "KSP_POSTEST");
wbTest.set('FES_LAYOUT', 'FRS-EU')
assert(wbTest.get('KSP_POSTEST') === 1)
wbTest.createFormula("If(Pos('IFRS-EU',FES_LAYOUT)>0,1,If(Pos('IFRS-PL',FES_LAYOUT)>0,48,If(Pos('IFRS-Intl',FES_LAYOUT)>0,2,0)))", "FES_LAYOUTNR");
assert(wbTest.get('FES_LAYOUTNR') === 1)
wbTest.set('FES_LAYOUT', 'FRS-PL')
assert(wbTest.get('FES_LAYOUTNR') === 48)
wbTest.set('FES_LAYOUT', 'FRS-Intl')
assert(wbTest.get('FES_LAYOUTNR') === 2)

var testVariables = {
    NEW_FES_LAYOUT: true,
    NEW_POS_LAYOUT: true,
    NEW_KSP_POSTEST: true,
    NEW_FES_LAYOUTNR: true,
    KSP_FES_LAYOUTNR: true,//default value?
    KSP_FES_EXCHANGE_RATES: true,
    KSP_FES_LAYOUT: true,
    KSP_FES_FLATINPUT: true,
    KSP_FES_PROJECTION_PROFILE: true,
    KSP_FES_COLUMN_ORDER: true,
    KSP_FES_COLUMN_VISIBLE: true,
    KSP_FES_STARTDATEPERIOD: true,
    KSP_FES_ENDDATEPERIOD: true,
    KSP_FES_BASECURRENCYPERIOD: true,
    KSP_FES_COLUMNTYPE: true,//choices tested in LAYOUTNR
    KSP_RootSub1: true,
    KSP_FPS_VAR_Naam: true,
    KSP_FPS_VAR_Relatienummer: true,
    KSP_FPS_VAR_KVKnr: true,
    KSP_FPS_VAR_Rechtsvorm_nr: true,
    KSP_FPS_VAR_Rechtsvorm_omschr: true,
    KSP_FPS_VAR_BIK_CODE: true,
    KSP_FPS_VAR_BIK_Omschr: true,
    KSP_FPS_VAR_GridId: true,
    KSP_FPS_VAR_Accountmanager: true,
    KSP_FPS_VAR_Kantoor: true,
    KSP_FPS_VAR_Straat: true,
    KSP_FPS_VAR_Housenumber: true,
    KSP_FPS_VAR_Postcode: true,
    KSP_FPS_VAR_Woonplaats: true,
    KSP_FPS_VAR_Provincie: true,
    KSP_FPS_VAR_Land: true,
    KSP_FPS_VAR_BvDID: true,
    KSP_FPS_VAR_Telefoon: true,
    KSP_FPS_FINAN_USER_ROLES: true,
    KSP_FPS_FINAN_USER: true,
    KSP_FPS_VAR_Emailadres: true,
    KSP_RootSub2: true,
    KSP_Q_MAP00_INTROMEMO: true,
    KSP_MultiplierOutOfSchoolCare: true,
    KSP_CombinationDiscountPercentage: true,
    KSP_DecreasingPercentage:true
}
var testedformulas = {
    "'Restricties'": true,
    "EvaluateAsString('')": true,
    "'Restricties tekst'": true,
    "'Knock-out tekst'": true,
    "'Knock-out(s)'": true,
    "'undefined'": true,
    undefined: true,
    "'TEST'": true,
    "'None'": true,
    "'01.27.000.000'": true,
    6.8: true,
    80: true,
    180: true,
    230: true,
    0: true,
    1: true,
    1.4: true,
    .7: true,
    2: true,
    7.18: true,
    6.69: true,
    5.75: true,
    1142: true,
    0.06159: true,
    .06159: true,
    0.0675: true,
    .0675: true,
    1559: true,
    4895: true,
    1043: true,
    1376: true,
    20109: true,
    2778: true
}
var wbKSP = new WorkBook(new FESContext());
wbKSP.doImport(JUNIT.getFile('../../ff-KSP/resources/KSP.ffl'), 'ffl')
var untestedformulas = 0;
var totalformulas = 0;
FormulaService.visitFormulas(function (formula) {
    totalformulas++;
    var variableName = formula.name.replace(/(_value$|_title$|_choices$|_locked$|_visible$)/gmi, '');
    if (formula.name.match(/_title$/gmi)) {
        return;
    }
    if (formula.name.match(/_choices$/gmi)) {
        return;
    }
    if (!testVariables[variableName]) {
        if (!testedformulas[formula.original]) {
            untestedformulas++;
            log.debug('[%s][%s][%s][%s]', variableName, formula.name, formula.original, formula.parsed)
        }
    }
})
log.info('KSP untested formulas:[%s/%s]', untestedformulas, totalformulas)
wbKSP.set('FES_LAYOUT', 'FRS-PL')
var layoutNR = wbKSP.get('FES_LAYOUTNR');
var layoutNRChoice = wbKSP.get('FES_LAYOUTNR', 'choices').filter(function (choice) {
    return parseInt(choice.name) === layoutNR;
});
assert(layoutNRChoice[0].value === ' Polish');
var kspqrestricties01 = wbKSP.get('Q_RESTRICTIES_01');
assert(kspqrestricties01 == "");
assert(wbKSP.get('CombinationDiscountPercentage') == .06159);
assert(wbKSP.get('DecreasingPercentage') == 0.0675);
log.info('done')