//TODO: find out if this is the best xlsx tool to find the tables..
var XLSX = require('xlsx')
var workbook = XLSX.readFile('./resources/ScorecardKSP.xls');
var entries = {
    'MatrixLookup': function (xlsfileName, tableName, row, col) {

        //write logic to find the table in sheet etc...
        return 1;
    }
};
entries.Matrixlookup = entries.MatrixLookup;
exports.xlsxLookup = {
    name: 'xlsx-lookup',
    entries: entries
}