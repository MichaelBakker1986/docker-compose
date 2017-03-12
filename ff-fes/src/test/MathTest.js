global.loglevel = 'debug'
var assert = require('assert')
var parser = require('../archive/ffl/fflparser.js');//just let it inject into the GenericModelFile
var WorkBook = require('../archive/fesjs/JSWorkBook.js');
var JUNIT = require('./JUNIT.js');
var logger = require('ff-log');
var wb = new WorkBook();
//var kspModel = JUNIT.getFile('KSP.ffl');
//wb.doImport(kspModel, 'ffl');

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
wb.createFormula("Pos('abcd','cd')", 'POS')
assert.equal(wb.get('POS'), 2);

/**
 * test DataAvailable function
 */
wb.createFormula('defaults', 'abc12')
wb.createFormula("DataAvailable(abc12)", 'DATAAVAILABLE')
assert.equal(wb.get('DATAAVAILABLE'), false);
wb.set('abc12', 'anyValue');
assert.equal(wb.get('DATAAVAILABLE'), true);

/**
 - Use function [Count]
 - Use function [MatrixLookup]
 - Use function [SelectDescendants]
 */