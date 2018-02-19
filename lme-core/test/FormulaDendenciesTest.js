const assert = require('assert');
const log = require('log6')
require('../exchange_modules/ffl/RegisterPlainFFLDecorator');
require('../exchange_modules/ffl/RegisterToFFL');
require('../../math/ff-math');
const WorkBook = require('../src/JSWorkBook');
const Context = require('../src/Context')
const fflModelName = 'deps';

const data = require('fs').readFileSync(__dirname + '/../resources/' + fflModelName + '.ffl', 'utf8')
const wb = new WorkBook(new Context());
wb.importFFL(data);

log.info(wb.getDependencies('DepHost'))
log.info(wb.getDependencies('ReferencedVar'))