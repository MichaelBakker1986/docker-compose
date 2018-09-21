'use strict';

require('../exchange_modules/presentation/webexport');
require('../exchange_modules/ffl/RegisterPlainFFLDecorator');
var LME = require('../../lme-model-api/src/lme');
var Context = require('../src/Context');
var fs = require('fs');
var assert = require('assert');
var log = require('log6');
var defaultImport = require('../resources/CustomImport.json');
var TUPLETEST = new LME(defaultImport, new Context({ columnSize: 1, columns: ['value'] }));
var workbook = TUPLETEST.lme;
TUPLETEST.importFFL(fs.readFileSync(__dirname + '/TupleTest.ffl', 'utf8'));
var webExport = workbook.export('webexport');
var hashchars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
//here we are going to add Tuples like its done in the JBehave stories.
assert.equal(webExport.rows[0].add().display, '0000');
//TODO: webExport.nodes[Name].add(y) (Nodes should just represent the Blueprint then t(0,0,0) always
assert.equal(webExport.rows[0].add().display, '1000');

webExport.sort();
var nTupleDef = webExport.rows[3];
assert.equal(nTupleDef.add().display, '1000');
webExport.sort();
assert.equal(nTupleDef.add().display, '1100');
webExport.sort();
assert.equal(nTupleDef.add().display, '1200');
webExport.sort();
//reproduces same problem.
for (var i = 0; i < webExport.rows.length; i++) {
    var obj = webExport.rows[i];
    log.info(obj.order_id + " ".repeat(obj.depth) + obj.id);
}