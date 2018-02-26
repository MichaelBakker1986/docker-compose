const log           = require('log6'),
      BookYearTime  = require('../src/XAxis'),
      assert        = require('assert'),
      defaultImport = require('../resources/CustomImport.json'),
      MonthTime     = require('../src/TimeAxis');

const bookYearXaxis = new BookYearTime();
const monthlyTime = new MonthTime(defaultImport)

assert.equal(bookYearXaxis.viewmodes.bkyr.cols.length, 19, 'We use 40columns for now but found' + bookYearXaxis.viewmodes.bkyr.cols.length)
assert.equal(monthlyTime.viewmodes.detl.cols.length, 252, 'We use 252 detail columns for months ')