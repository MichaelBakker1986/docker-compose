const assert = require('assert'), WorkBook = require('../src/JSWorkBook'), Context = require('../src/Context');
require('../../math')
const wb = new WorkBook(new Context());

assert('aIFRS-EUa'.indexOf('IFRS-EU') > 0)
wb.createFormula("'IFRS-EU'", 'FES_LAYOUT')
wb.createFormula("Pos('IFRS-EU',FES_LAYOUT)", "POS_LAYOUT");
assert(wb.get('POS_LAYOUT') === 0)
wb.set('FES_LAYOUT', 'IFRS-TEST')
assert(wb.get('POS_LAYOUT') === -1)
wb.set('FES_LAYOUT', 'IFRS-EU')
assert(wb.get('POS_LAYOUT') === 0, 'actual:' + wb.get('POS_LAYOUT'))
wb.createFormula("If(Pos('IFRS-EU','IFRS-EU')>0,1,2)", "KSP_POSTEST");
assert(wb.get('KSP_POSTEST') === 2)
wb.createFormula("If(Pos('IFRS-EU',FES_LAYOUT)>0,1,2)", "KSP_POSTEST");
wb.set('FES_LAYOUT', 'IIFRS-EU')
assert(wb.get('KSP_POSTEST') === 1)
wb.createFormula("If(Pos('IFRS-EU',FES_LAYOUT)>0,1,If(Pos('IFRS-PL',FES_LAYOUT)>0,48,If(Pos('IFRS-Intl',FES_LAYOUT)>0,2,0)))", "FES_LAYOUTNR");
assert(wb.get('FES_LAYOUTNR') === 1)
wb.set('FES_LAYOUT', 'IIFRS-PL')
assert(wb.get('FES_LAYOUTNR') === 48)
wb.set('FES_LAYOUT', 'IIFRS-Intl')
assert(wb.get('FES_LAYOUTNR') === 2)

wb.createFormula("KSP_POSTEST[doc]", 'DOCUMENT_VALUE_TEST')
//this value should be ignored when calling KSP_POSTEST[doc]
var testValueBefore = wb.get('DOCUMENT_VALUE_TEST')
wb.set('KSP_POSTEST', 100, 'value', 4)
assert(wb.get('DOCUMENT_VALUE_TEST') === testValueBefore)