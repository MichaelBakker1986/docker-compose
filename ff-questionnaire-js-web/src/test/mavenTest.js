var JUNIT = require('./JUNIT.js');
var JSWorkBook = require('../archive/fesjs/JSWorkBook.js');
require('../archive/exchange_modules/pom/pomparser.js');//let it inject
var assert = require('assert');
var data = JUNIT.getFile('financials_maven.json');
var wb = new JSWorkBook();
wb.doImport(data, 'maven');
wb.validate();
wb.fixAll();
assert.ok(wb.validate().valid);

console.info('Success finished test maven')