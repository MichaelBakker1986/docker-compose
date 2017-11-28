var assert = require('assert')

var WorkBook = require('../src/JSWorkBook')
var FESContext = require('../src/fescontext')
require('../../math')
var fesjsApi = require('../').fesjs;
var JUNIT = require('./JUNIT')
fesjsApi.addFunctions(require('../../formulajs-connect').formulajs);
var excelPlugin = require('../../excel-connect').xlsxLookup;
fesjsApi.addFunctions(excelPlugin);
var wb = new WorkBook(new FESContext());
wb.importSolution(JUNIT.getFile('../../lme-model-tests/resources/KSP.ffl'), 'ffl');

// Tuple 1
wb.set('NrOfDaysChildcareWeek', 5, 'value', 0, 3);
wb.set('NrOfDaysCOutOfSchoolCareWeek', 2, 'value', 0, 3);
assert(wb.get('NrOfDaysChildcareWeek','value', 0, 3) ===  5);
assert(wb.get('NrOfDaysChildcareMonth','value', 0, 3) ===  210);
assert(wb.get('NrOfDaysCOutOfSchoolCareWeek','value', 0, 3) ===  2);
assert(wb.get('NrOfDaysOutOfSchoolCareMonth','value', 0, 3) ===  36);

// Tuple 2
wb.set('NrOfDaysChildcareWeek', 2, 'value', 0, 6);
wb.set('NrOfDaysCOutOfSchoolCareWeek', 4, 'value', 0, 6);
assert(wb.get('NrOfDaysChildcareWeek','value', 0, 6) ===  2);
assert(wb.get('NrOfDaysChildcareMonth','value', 0, 6) ===  84);
assert(wb.get('NrOfDaysCOutOfSchoolCareWeek','value', 0, 6) ===  4);
assert(wb.get('NrOfDaysOutOfSchoolCareMonth','value', 0, 6) ===  72);

// Tuple 3
wb.set('NrOfDaysChildcareWeek', 3, 'value', 4, 7);
wb.set('NrOfDaysCOutOfSchoolCareWeek', 3, 'value', 4, 7);
assert(wb.get('NrOfDaysChildcareWeek','value', 4, 7) ===  3);
assert(wb.get('NrOfDaysChildcareMonth','value', 4, 7) ===  126);
assert(wb.get('NrOfDaysCOutOfSchoolCareWeek','value', 4, 7) ===  3);
assert(wb.get('NrOfDaysOutOfSchoolCareMonth','value', 4, 7) ===  54);

