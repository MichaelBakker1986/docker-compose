var WorkBook = require('../fesjs/JSWorkBook')
var FESContext = require('../fesjs/fescontext')
var log = require('ff-log')
var assert = require('assert')
require('../../ff-math/ff-math')
var fesjsApi = require('../ff-fes').fesjs;
var JUNIT = require('./JUNIT');
fesjsApi.addFunctions(require('../../ff-formulajs/ff-formulajs').formulajs);
//add excel-lookup, MatrixLookup
var excelPlugin = require('../../ff-fes-xlsx/ff-fes-xlsx').xlsxLookup;
fesjsApi.addFunctions(excelPlugin);

var wb = new WorkBook(new FESContext());
wb.importSolution(JUNIT.getFile('../../ff-ssh-git/resources/FFL/KSP.ffl'), 'ffl');

excelPlugin.initComplete.then(function () {


    // Child 1
    wb.set('ChildGender', 0, 'value', 0, 0);
    wb.set('NrOfDaysChildcareWeek', 2, 'value', 0, 0);
    wb.set('NrOfDaysOutOfSchoolCareWeek', 3, 'value', 0, 0);
    wb.set('SecondaryEducationProfile', 1, 'value', 0, 0);

    assert(parseFloat(wb.get('TotalYearlyCostsChild', 'value', 0, 0)).toFixed(2) == 12711.65);
    assert(parseFloat(wb.get('TotalYearlyCostsChild', 'value', 1, 0)).toFixed(2) == 10911.65);

}).catch(function(err){
    log.error(err)
    assert(false, err)
});