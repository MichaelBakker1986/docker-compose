'use strict';

var assert = require('assert');
var log = require('log6');
require('../exchange_modules/ffl/RegisterPlainFFLDecorator');
require('../exchange_modules/ffl/RegisterToFFL');
require('../../math/ff-math');
var WorkBook = require('../src/JSWorkBook');
var Context = require('../src/Context');
var fflModelName = 'deps';

var data = require('fs').readFileSync(__dirname + '/../resources/' + fflModelName + '.ffl', 'utf8');
var wb = new WorkBook(new Context());
wb.importFFL(data);

log.info(wb.getDependencies('DepHost'));
log.info(wb.getDependencies('ReferencedVar'));