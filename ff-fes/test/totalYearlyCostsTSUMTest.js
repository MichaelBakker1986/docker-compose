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

// List of all children to be tested
var children = [
    // Child 1
    {
        "ChildGender": 0,
        "NrOfDaysChildcareWeek": 2,
        "NrOfDaysOutOfSchoolCareWeek": 3,
        "SecondaryEducationProfile": 1,
        "TotalYearlyCosts": [
            12711.65, // 1
            10911.65, // 2
            10981.65, // 3
            8498.65,  // 4
            9149.90,  // 5
            9149.90,  // 6
            9149.90,  // 7
            9149.90,  // 8
            9149.90,  // 9
            9540.45,  // 10
            9660.45,  // 11
            6080.05,  // 12
            6458.05,  // 13
            6494.05,  // 14
            7069.20,  // 15
            7081.20,  // 16
            7593.20,  // 17
            9129.20   // 18
        ]
    },
    // Child 2
    {
        "ChildGender": 1,
        "NrOfDaysChildcareWeek": 4,
        "NrOfDaysOutOfSchoolCareWeek": 4,
        "SecondaryEducationProfile": 3,
        "TotalYearlyCosts": [
            19566.05, // 1
            17766.05, // 2
            17836.05, // 3
            9967.45,  // 4
            10618.70, // 5
            10618.70, // 6
            10618.70, // 7
            10618.70, // 8
            10618.70, // 9
            11009.25, // 10
            11129.25, // 11
            5709.05,  // 12
            6087.05,  // 13
            6123.05,  // 14
            6486.50,  // 15
            6498.50,  // 16
            7010.50,  // 17
            8546.50   // 18
        ]
    },
    // Child 3
    {
        "ChildGender": 0,
        "NrOfDaysChildcareWeek": 1,
        "NrOfDaysOutOfSchoolCareWeek": 1,
        "SecondaryEducationProfile": 2,
        "TotalYearlyCosts": [
            9284.45, // 1
            7484.45, // 2
            7554.45, // 3
            5561.05,  // 4
            6212.30, // 5
            6212.30, // 6
            6212.30, // 7
            6212.30, // 8
            6212.30, // 9
            6602.85, // 10
            6722.85, // 11
            5709.05,  // 12
            6087.05,  // 13
            6123.05,  // 14
            6698.20,  // 15
            6710.20,  // 16
            7222.20,  // 17
            8758.20   // 18
        ]
    }
];

var totalYearlyCosts = [
    41562.15,   // 1
    36162.15,   // 2
    36372.15,   // 3
    24027.15,   // 4
    25980.90,   // 5
    25980.90,   // 6
    25980.90,   // 7
    25980.90,   // 8
    25980.90,   // 9
    27152.55,   // 10
    27512.55,   // 11
    17498.15,   // 12
    18632.15,   // 13
    18740.15,   // 14
    20253.90,   // 15
    20289.90,   // 16
    21825.90,   // 17
    26433.90    // 18
];

for (var i = 0; i < children.length; i++) {
    // Setting the variables
    wb.set('ChildGender', children[i].ChildGender, 'value', 0, i);
    wb.set('NrOfDaysChildcareWeek', children[i].NrOfDaysChildcareWeek, 'value', 0, i);
    wb.set('NrOfDaysOutOfSchoolCareWeek', children[i].NrOfDaysOutOfSchoolCareWeek, 'value', 0, i);
    wb.set('SecondaryEducationProfile', children[i].SecondaryEducationProfile, 'value', 0, i);

    // Testing all the TotalYearlyCostsChild columns
    for (var j = 0; j < children[i].TotalYearlyCosts.length; j++) {
        assert(parseFloat(wb.get('TotalYearlyCostsChild', 'value', j, i)) == children[i].TotalYearlyCosts[j]);
    }
}

// TotalYearlyCosts test
// for(var i=0; i<totalYearlyCosts.length; i++)
// {
//     assert(parseFloat(wb.get('TotalYearlyCosts', 'value', i, 0)).toFixed(2) == totalYearlyCosts[i]);
// }
//TotalYearlyCosts test
for (var i = 0; i < totalYearlyCosts.length; i++) {
    // assert(parseFloat(wb.get('TotalYearlyCosts', 'value', i, 0)).toFixed(2) == totalYearlyCosts[i]);
}
