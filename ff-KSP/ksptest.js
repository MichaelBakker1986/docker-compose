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
    KSP_Q_MAP00_WARNING: true,
    KSP_Q_MAP00_INFO: true,
    KSP_Q_MAP00_VALIDATION: true,
    KSP_Q_MAP00_HINT: true,
    KSP_Q_MAP00_INTROMEMO: true,
    KSP_Q_MAP00_INTRO: true,
    KSP_Q_MAP00: true,
    KSP_FES_VIEWCURRENCYPERIOD: true,
    KSP_Q_MAP01_HINT: true,
    KSP_IncomeSection: true,
    KSP_IncomeParent01: true,
    KSP_WorkingHoursWeeklyOfLeastWorkingParent: true,
    KSP_Child: true,
    KSP_HULPVARS: true,
    KSP_Q_RESTRICTIES: true,
    KSP_Q_WARNING_GLOBAL: true,
    KSP_ModelType: true,
    KSP_ModelVersion: true,
    KSP_Q_STATUS_STARTED_BY_NAME: true,
    KSP_Q_STATUS_STARTED_ON: true,
    KSP_Q_STATUS_STARTED_BY: true,
    KSP_Q_STATUS_FINAL_BY: true,
    KSP_Q_STATUS_FINAL_ON: true,
    KSP_Q_RESULTSUB1: true,
    KSP_HourlyFeeChildCare: true,
    KSP_ChildGender: true,
    KSP_IncomeParent02: true,
    CostsUnspecified: true,
    KSP_Memo1: true,
    KSP_Situation: true,
    KSP_Q_MAP06_PARAGRAAF09SUB2: true,
    KSP_Q_MAP06_PARAGRAAF09SUB3: true,
    KSP_Q_MAP06_PARAGRAAF09SUB4: true,
    KSP_Q_MAP06_PARAGRAAF09SUB5: true,
    KSP_Q_MAP06_PARAGRAAF09SUB6: true,
    KSP_Q_MAP06_PARAGRAAF09: true,
    KSP_Q_MAP06_HULPVARIABELEN: true,
    KSP_Q_RESTRICTIES_02: true,
    KSP_Q_WARNING_01: true,
    KSP_Q_FINAL_REPORT_VISIBLE: true,
    KSP_Q_MAKE_FINAL_VISIBLE: true,
    KSP_Q_CONCEPT_REPORT_VISIBLE: true,
    KSP_Q_NEXT_BUTTON_VISIBLE: true,
    KSP_Q_PREVIOUS_BUTTON_VISIBLE: true,
    KSP_MatrixVersion: true,
    KSP_Q_STATUS_FINAL_BY_NAME: true,
    KSP_Q_MAP06SUB5: true,
    KSP_ChildCareCosts: true,
    KSP_TotalYearlyBalance: true,
    KSP_TotalMonthlyBalanceAverage: true,
    KSP_Q_MAP06SUB5SUB3: true,
    KSP_TotalYearlyIncome: true,
    KSP_CombinationDiscountOverview: true,
    KSP_ChildcareBudgetOverview: true,
    KSP_ChildCarePremiumOverview: true,
    KSP_ChildBenefits: true,
    KSP_Q_MAP06SUB5SUB2: true,
    KSP_TotalYearlyCosts: true,
    KSP_CostsUnspecifiedOverview: true,
    KSP_CostsForSecondaryEducation: true,
    KSP_CostsForPrimaryEducation: true,
    KSP_CostsForOutOfSchoolCare: true,
    KSP_DrivingLicense: true,
    KSP_MobilePhone: true,
    KSP_Transport: true,
    KSP_Contributions: true,
    KSP_Allowance: true,
    KSP_Inventory: true,
    KSP_Hairdresser: true,
    KSP_ActualPersonalCareCosts: true,
    KSP_ActualClothingCosts: true
}
var wbKSP = new WorkBook(new FESContext());
wbKSP.doImport(JUNIT.getFile('../../ff-KSP/resources/KSP.ffl'), 'ffl')
FormulaService.visitFormulas(function (formula) {
    var variableName = formula.name.replace(/(_value$|_title$|_choices$|_locked$|_visible$)/gmi, '');
    //if (!testVariables[variableName]) {
        log.debug('[%s][%s][%s][%s]', variableName, formula.name, formula.original, formula.parsed)
    //}
})
wbKSP.set('FES_LAYOUT', 'FRS-PL')
var layoutNR = wbKSP.get('FES_LAYOUTNR');
var layoutNRChoice = wbKSP.get('FES_LAYOUTNR', 'choices').filter(function (choice) {
    return parseInt(choice.name) === layoutNR;
});
assert(layoutNRChoice[0].value === ' Polish');

log.info('done')