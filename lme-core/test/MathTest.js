var assert = require('assert')
var WorkBook = require('../src/JSWorkBook');
var api = require('..').LMEFacade;
require('../../math')
var Context = require('../src/Context');
var wb = new WorkBook(new Context());
wb.updateValues();

wb.createFormula('abra', 'abc12a')
wb.createFormula('abc12a.entered', 'DATAAVAILABLE2')
assert.equal(wb.get('DATAAVAILABLE2'), false);
wb.set('abc12a', 'anyValue');
assert.equal(wb.get('DATAAVAILABLE2'), true);
wb.createFormula('DataEntered(abc12a)', 'DT_ENTERED')
assert.equal(wb.get('DT_ENTERED'), true);

wb.createFormula("0", 'caseselect');
wb.createFormula('Case(caseselect,[0, 576 || 1, 906 || 2, 535 || 3, 535])', 'CaseTestVariable')
assert(wb.get('CaseTestVariable'), 576);

wb.createFormula("123", 'caseselectWithVariableReference');
wb.createFormula('Case(caseselect,[0, 576 || 1, caseselectWithVariableReference +100 || 2, 535 || 3, 535])', 'CaseTestVariableWithReference')
assert(wb.get('CaseTestVariableWithReference'), 223);

wb.createFormula('1+1', 'A', 'A')
assert.equal(wb.get('A', 'A'), 2);

/**
 * test If function
 */
wb.createFormula('If(true,1,2)', 'IFTRUE')
wb.createFormula('If(false,1,2)', 'IFFALSE')
assert.equal(wb.get('IFTRUE'), 1);
assert.equal(wb.get('IFFALSE'), 2);

/**
 * test Length function
 */
wb.createFormula('Length("abc")', 'LENGTH3')
assert.equal(wb.get('LENGTH3'), 3);

/**
 * test Str function
 */
wb.createFormula('Str(1)', 'STR')
assert.equal(wb.get('STR'), '1');

/**
 * test InputRequired function
 */
wb.createFormula('true', 'INPUTREQUIRED', 'required')
assert.equal(wb.get('INPUTREQUIRED', 'required'), true);
wb.createFormula('InputRequired(INPUTREQUIRED)', 'CallInputRquired')
assert.equal(wb.get('CallInputRquired'), true);

/**
 * test Min,Max function
 */
wb.createFormula('Min(3,1)', 'MATHMIN')
assert.equal(wb.get('MATHMIN'), 1);
wb.createFormula('Max(3,1)', 'MATHMAX')
assert.equal(wb.get('MATHMAX'), 3);

/**
 * test EvaluateAsString function
 */
wb.createFormula('EvaluateAsString(12)', 'EVALUATEASSTRING')
assert.equal(wb.get('EVALUATEASSTRING'), '12');

/**
 * test Round function
 */
wb.createFormula('Round(12.05,1)', 'ROUND')
wb.createFormula('Round(12.6,0)', 'ROUND2')
assert.equal(wb.get('ROUND'), 12.1);
assert.equal(wb.get('ROUND2'), 13);

/**
 * test OnER function
 */
wb.createFormula('OnER("ab",2)', 'ONERRCALL')
assert.equal(wb.get('ONERRCALL'), 2);

/**
 * test Pos function
 */
wb.createFormula("Pos('cd','abcd')", 'POS')
assert.equal(wb.get('POS'), 2);

/**
 *  test DataAvailable function
 */
wb.createFormula('defaults', 'abc12')
wb.createFormula('DataAvailable(abc12)', 'DATAAVAILABLE')
assert.equal(wb.get('DATAAVAILABLE'), false);
wb.set('abc12', 'anyValue');
assert.equal(wb.get('DATAAVAILABLE'), true);

wb.createFormula("0", 'caseselectWithColon');
let caseTest = 'Case(caseselectWithColon,[0, 576 || 1, 906 || 2, 535 || 3, 535])';
wb.createFormula(caseTest, 'caseselectWithColonVariable')
assert(wb.get('caseselectWithColonVariable'), 576);

wb.createFormula("100+Tsy", "TSY_TEST")
assert.equal(wb.get('TSY_TEST'), 101)

wb.createFormula("''", "CHOICE_TEST")
wb.createFormula("[{'name':' 0','value':'VWO'},{'name':'1','value':'VMBO-MBO'},{'name':'2','value':'VMBO-HAVO'},{'name':'3','value':'HAVO'}]", "CHOICE_TEST", "choices")
var fesGetValue = api.getValue({
    properties: {
        choices: true,
        value  : true
    },
    columns   : 1,
    values    : []
}, 'NEW_CHOICE_TEST', 0);

wb.createFormula("OnZero(0,2)", "ONZERO_TEST")
assert.equal(wb.get('ONZERO_TEST'), 2)
wb.createFormula("OnZero(NA,2)", "ONZERO_TESTNA")
assert.equal(wb.get('ONZERO_TESTNA'), NA)

wb.createFormula("MinMax(100,110,200,NA)", "MINMAX_VALUEBOTTOM")
assert.equal(wb.get('MINMAX_VALUEBOTTOM'), 110)
wb.createFormula("MinMax(300,110,200,NA)", "MINMAX_VALUETOP")
assert.equal(wb.get('MINMAX_VALUETOP'), 200)
wb.createFormula("MinMax('a',110,200,300)", "MINMAX_VALUE_FALLBACK")
assert.equal(wb.get('MINMAX_VALUE_FALLBACK'), 300)

wb.createFormula("DMYtoDate(10,11,2020)", "DMYTest")
const daysInMillis = ((1000 * 3600) * 24);
assert.equal(Math.round(wb.get('DMYTest').getTime() / daysInMillis), Math.round(new Date(2020, 10, 10).getTime() / daysInMillis))

/**
 * Lets make sure NA stays NA when performing arithmetic actions
 */
assert.equal(OnNA(NA, 'NA'), 'NA')
assert.equal(OnNA(-NA, 'NA'), 'NA')
assert.equal(OnNA(100 * -NA, 'NA'), 'NA')
assert.equal(OnNA(-100 * -NA, 'NA'), 'NA')
assert.equal(OnNA((NA * NA * 9), 'NA'), 'NA')
assert.equal(OnNA(NA / -2, 'NA'), 'NA')
assert.equal(OnNA(NA + NA, 'NA'), 'NA')

wb.createFormula("Exp(5)", "EXPTEST")
assert.equal(wb.get('EXPTEST'), Math.exp(5))

/*wb.createFormula("Count(x,String(x),x)", "TestCount")
log.info(wb.get("TestCount"))*/
/**
 - Use function [Count]
 - Use function [SelectDescendants]
 */