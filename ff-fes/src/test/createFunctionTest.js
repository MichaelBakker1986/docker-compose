//make sure we cal always start from scratch
//Just add a function, call it, resolve it
//
var assert = require('assert');
var model = require('../archive/fesjs/GenericModelFile.js');

model.createFormula('1+1', 'A', 'A')
assert.equal(model.getValue('A', 'A'), 2);
