require('../archive/exchange_modules/abn/ABNParser.js');//just let it inject into the FESFacade
var WorkBook = require('../archive/fesjs/JSWorkBook.js');
var FESFacade = require('../archive/fesjs/FESFacade');
var JUNIT = require('./JUNIT.js');
var assert = require('assert');
var esprima = require('esprima');

var data = JUNIT.getFile('RISK.json');

var wb = new WorkBook();
wb.doImport(data, 'ABN');
assert.ok(wb.validate().valid); 
var riskExport = wb.export('ABN');
//debug
//console.info(exports.stringify());
console.info('Test RiskExport success')

