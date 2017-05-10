global.loglevel = 'debug'
var assert = require('assert')
var parser = require('../exchange_modules/ffl/fflparser');//just let it inject into the FESFacade
var WorkBook = require('../fesjs/JSWorkBook');
var JSMATH = require('../../ff-math')
var JUNIT = require('./JUNIT');
var logger = require('ff-log');
var FESContext = require('../fesjs/fescontext');
var wb = new WorkBook(new FESContext());
wb.updateValues();
//var kspModel = JUNIT.getFile('KSP.ffl');
//wb.importSolution(kspModel, 'ffl');

wb.createFormula("0", 'caseselect');
wb.createFormula('Case(caseselect,[0, 576 || 1, 906 || 2, 535 || 3, 535])', 'CaseTestVariable')
assert(wb.get('CaseTestVariable'), 576);

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
 * test DataAvailable function
 */
wb.createFormula('defaults', 'abc12')
wb.createFormula("DataAvailable(abc12)", 'DATAAVAILABLE')
assert.equal(wb.get('DATAAVAILABLE'), false);
wb.set('abc12', 'anyValue');
assert.equal(wb.get('DATAAVAILABLE'), true);


//wb.createFormula('SelectDescendants(Q_MAP01,Q_MAP01_HULPVARIABELEN),InputRequired(X))','SELECTDECENDANTS')

/**
 - Use function [Count]
 - Use function [SelectDescendants]
 - Use function [MatrixLookup], seperate project - use js-xlsx https://github.com/SheetJS/js-xlsx
 */