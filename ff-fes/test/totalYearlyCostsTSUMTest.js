var assert = require('assert')

var WorkBook = require('../fesjs/JSWorkBook')
var FESContext = require('../fesjs/fescontext')
require('../../ff-math/ff-math')
var fesjsApi = require('../ff-fes').fesjs;
var JUNIT = require('./JUNIT')
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

    var result = wb.get('TotalYearlyCostsChild', 'value', 0, 0);
    assert(wb.get('TotalYearlyCostsChild', 'value', 0, 0) == 11231231232);

}).catch(function (err) {
    log.error(err)
    assert(false, err)
})