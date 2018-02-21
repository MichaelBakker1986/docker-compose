/**
 *  * (!) TODO Convert into JBehave TEST
 * KSP test cases
 * some if statements are not parsed correctly (if/If), changes are made within the KSP.ffl file
 * formulas containing ":" are not parsed correctly, changes are made within KSP.ffl file
 * This looks a lot, but its centainly not much testing going on here.
 */

require('./totalyearlycosttest')
var FormulaService = require('../../lme-core/src/FormulaService')
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator')
var WorkBook = require('../../lme-core/src/JSWorkBook')
var Context = require('../../lme-core/src/Context')
var log = require('log6')
var assert = require('assert')
require('../../math')
var LMEFacade = require('../../lme-core').LMEFacade;
var fs = require('fs');
LMEFacade.addFunctions(require('../../formulajs-connect').formulajs);
//add excel-lookup, MatrixLookup
var excelPlugin = require('../../excel-connect');
LMEFacade.addFunctions(excelPlugin);
var wbTest = new WorkBook(new Context());


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

function modelVariableName(name) {
    return name.replace(/(^KSP_)/gmi, '').replace(/_value$/gmi, '');
}

var wbKSP = new WorkBook(new Context());
wbKSP.importSolution(fs.readFileSync(__dirname + '/KSP.ffl', 'utf8'), 'ffl')
var untestedformulas = 0;
var totalformulas = 0;
var formulas = {}
FormulaService.visitFormulas(function(formula) {
    totalformulas++;

    var variableName = formula.name.replace(/(_value$|_title$|_choices$|_locked$|_visible$)/gmi, '');
    if (formula.name.match(/_title$/gmi)) {
        return;
    }
    if (formula.name.match(/_choices$/gmi)) {
        return;
    }
    if (formula.name.match(/_value/gmi)) {
        formulas[modelVariableName(formula.name)] = formula;
    }
    if (!testVariables[variableName]) {
        if (!testedformulas[formula.original]) {
            untestedformulas++;
            if (log.TRACE) log.trace('[%s][%s][%s][%s]', variableName.replace(/(^KSP_)/gmi, ''), formula.name, formula.original, formula.parsed)
        }
    }
})
if (log.DEBUG) log.debug('KSP untested formulas:[%s/%s]', untestedformulas, totalformulas)
wbKSP.set('FES_LAYOUT', 'IIFRS-PL')
var layoutNR = wbKSP.get('FES_LAYOUTNR');
var layoutNRChoice = wbKSP.get('FES_LAYOUTNR', 'choices')
assert.equal(layoutNR, 'Polish');
assert.equal(wbKSP.get('Q_RESTRICTIES_01'), "");
assert.equal(wbKSP.get('CombinationDiscountPercentage'), .062);
assert.equal(wbKSP.get('DecreasingPercentage'), 0.07);
assert.equal(wbKSP.get('Age'), 0);
assert.equal(wbKSP.get('Age', 'value', 4), 4);
assert.equal(wbKSP.get('TestT'), 1);
assert.equal(wbKSP.get('Furniture'), 1800);
assert.equal(wbKSP.get('Furniture', 'value', 4), 0);
assert.equal(wbKSP.get('DEBUG'), 0);
wbKSP.set('Memo1', 'a_Negro_a')
assert((Pos('Negro', 'a_Negro_a') > 0 ? 1 : 0), 1);
assert(wbKSP.get('Q_RESTRICTIES') === '');
assert(wbKSP.get('Q_RESTRICTIES_01') === '');
assert(wbKSP.get('Q_RESTRICTIESTXT') === '');
assert(wbKSP.get('Q_WARNING_01') === '');
assert(wbKSP.get('Q_WARNING_GLOBALTXT') === '');
assert(wbKSP.get('Q_MAP01') == "Incomplete");
assert(wbKSP.get('Q_ROOT') === "Incomplete");
assert(wbKSP.get('Q_WARNING_GLOBAL') == '');
assert(wbKSP.get('Q_RESULT') == 'Deze vragenlijst is definitief gemaakt.[br][/br]');
assert(wbKSP.get('Q_MAP06', 'visible') == true);
assert(wbKSP.get('Q_MAP06') == "Incomplete");
var pad = '            ';
wbKSP.get('CostsYearFiveSixSeven', 'value', 12)

function testVariable(variableName, level, column) {
    var indent = pad.substring(0, level);
    var result = {};
    var formula = formulas[variableName];
    var values = [];
    if (log.TRACE) log.trace(values + indent + '[%s][%s]=[%s]', variableName, wbKSP.get(variableName, 'value', column), formula.original)
    for (var dependencyname in formula.deps) {
        var modelVarName = modelVariableName(dependencyname);
        testVariable(modelVarName, level + 1, column)
    }
}

for (var i = 0; i < 18; i++) {
    testVariable('ActualChildCareCosts', 1, i);
}
