/**
 * KSP test cases
 * some if statements are not parsed correctly (if/If), changes are made within the KSP.ffl file
 * formulas containing ":" are not parsed correctly, changes are made within KSP.ffl file
 *
 */
global.loglevel = 'info'
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
wbTest.set('FES_LAYOUT', 'IFRS-EU')
assert(wbTest.get('POS_LAYOUT') === 0, 'actual:' + wbTest.get('POS_LAYOUT'))
wbTest.createFormula("If(Pos('IFRS-EU','IFRS-EU')>0,1,2)", "KSP_POSTEST");
assert(wbTest.get('KSP_POSTEST') === 2)
wbTest.createFormula("If(Pos('IFRS-EU',FES_LAYOUT)>0,1,2)", "KSP_POSTEST");
wbTest.set('FES_LAYOUT', 'IIFRS-EU')
assert(wbTest.get('KSP_POSTEST') === 1)
wbTest.createFormula("If(Pos('IFRS-EU',FES_LAYOUT)>0,1,If(Pos('IFRS-PL',FES_LAYOUT)>0,48,If(Pos('IFRS-Intl',FES_LAYOUT)>0,2,0)))", "FES_LAYOUTNR");
assert(wbTest.get('FES_LAYOUTNR') === 1)
wbTest.set('FES_LAYOUT', 'IIFRS-PL')
assert(wbTest.get('FES_LAYOUTNR') === 48)
wbTest.set('FES_LAYOUT', 'IIFRS-Intl')
assert(wbTest.get('FES_LAYOUTNR') === 2)

wbTest.createFormula("KSP_POSTEST[doc]", 'DOCUMENT_VALUE_TEST')
//this value should be ignored when calling KSP_POSTEST[doc]
var testValueBefore = wbTest.get('DOCUMENT_VALUE_TEST')
wbTest.set('KSP_POSTEST', 100, 'value', 4)
assert(wbTest.get('DOCUMENT_VALUE_TEST') === testValueBefore)

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
    KSP_DecreasingPercentage: true
}
var testedformulas = {
    "'Restricties'": true,
    "DEBUG==1": true,
    "Q_MAP01": true,
    "Q_MAP06": true,
    "Q_ROOT==1": true,
    "Q_MAP06_ENTEREDREQUIREDVARS==Q_MAP06_REQUIREDVARS": true,
    "EvaluateAsString(If(Length(Q_WARNING_GLOBALTXT[doc])>0,'[br][/br]Er zijn knockouts van toepassing'+Q_WARNING_GLOBALTXT,''))": true,
    "EvaluateAsString(If(Q_ROOT[doc]==0,'Nog niet alle vragen zijn ingevuld.[br][/br]','Deze vragenlijst is definitief gemaakt.[br][/br]')+Q_RESTRICTIES[doc]+Q_WARNING_GLOBAL[doc])": true,
    "If(Q_MAP01[doc]==1||Length(Q_WARNING_GLOBALTXT[doc])>0,1,0)": true,
    "EvaluateAsString(If(Length(Q_WARNING_01[doc])>0,'[br][/br]'+Q_WARNING_01[doc],''))": true,
    "EvaluateAsString(If(Length(Q_RESTRICTIESTXT[doc])>0,'[br][/br]De volgende variabelen zijn niet correct gevuld'+Q_RESTRICTIESTXT,''))": true,
    "EvaluateAsString(If(Length(Q_RESTRICTIES_01[doc])>0,'[br][/br]'+Q_RESTRICTIES_01[doc],''))": true,
    "If(Pos('Negro',Memo1)>0,1,0)": true,//KSP_DEBUG
    "EvaluateAsString('')": true,
    "KSP_POSTEST[doc]": true,
    "ValueT(T)": true,
    "ValueT(T)-1": true,
    "If(ValueT(T)==1,1800,0)": true,
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
            log.info('[%s][%s][%s][%s]', variableName, formula.name, formula.original, formula.parsed)
        }
    }
})
log.info('KSP untested formulas:[%s/%s]', untestedformulas, totalformulas)
wbKSP.set('FES_LAYOUT', 'IIFRS-PL')
var layoutNR = wbKSP.get('FES_LAYOUTNR');
var layoutNRChoice = wbKSP.get('FES_LAYOUTNR', 'choices').filter(function (choice) {
    return parseInt(choice.name) === layoutNR;
});
assert(layoutNRChoice[0].value === ' Polish');
assert(wbKSP.get('Q_RESTRICTIES_01') == "");
assert(wbKSP.get('CombinationDiscountPercentage') == .06159);
assert(wbKSP.get('DecreasingPercentage') == 0.0675);
assert(wbKSP.get('Age') == 0);
assert(wbKSP.get('Age', 'value', 4) == 4);
assert(wbKSP.get('TestT') === 1);
assert(wbKSP.get('Furniture') == 1800);
assert(wbKSP.get('Furniture', 'value', 4) == 0);
assert(wbKSP.get('DEBUG') == 0);
wbKSP.set('Memo1', 'a_Negro_a')
assert(wbKSP.get('DEBUG') == 1);
assert(If(Pos('Negro', 'a_Negro_a') > 0, 1, 0) == 1);
assert(wbKSP.get('Q_RESTRICTIES') === '');
assert(wbKSP.get('Q_RESTRICTIES_01') === '');
assert(wbKSP.get('Q_RESTRICTIESTXT') === '');
assert(wbKSP.get('Q_WARNING_01') === '');
assert(wbKSP.get('Q_WARNING_GLOBALTXT') === '');
assert(wbKSP.get('Q_MAP01') == 1);
assert(wbKSP.get('Q_ROOT') === 1);
assert(wbKSP.get('Q_WARNING_GLOBAL') == '');
assert(wbKSP.get('Q_RESULT') == 'Deze vragenlijst is definitief gemaakt.[br][/br]');
assert(wbKSP.get('Q_MAP06', 'visible') == true);
assert(wbKSP.get('Q_MAP06') == true);
assert(wbKSP.get('Q_MAP06_STATUS') == wbKSP.get('Q_MAP06') == true);
var testVariable = wbKSP.get('Q_MAP06_ENTEREDREQUIREDVARS');
var testVariable2 = wbKSP.get('Q_MAP06_REQUIREDVARS');

log.info('done')