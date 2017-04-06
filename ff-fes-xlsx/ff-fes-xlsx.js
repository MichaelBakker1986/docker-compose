//TODO: find out if this is the best xlsx tool to find the tables..
var XLSX = require('xlsx')
var Excel = require('exceljs');
var log = require('ff-log');
var workbook = XLSX.readFile(__dirname + '/resources/ScorecardKSP.xls');
var namedRanges = workbook.Custprops.DocParts;
log.trace(namedRanges);
for (var sheetName in workbook.Sheets) {
    var sheet = workbook.Sheets[sheetName];
    for (var cellName in sheet) {
        log.trace(sheet[cellName].v)
        if (sheet[cellName].v === 'ZoekenNumeriek') {
            log.trace('test');
        }
    }
}

var workbook = new Excel.Workbook();
var fileName = __dirname + '\\resources\\ScorecardKSP1.xlsx';
workbook.xlsx.readFile(fileName)
    .then(function (wb) {
        var worksheet = wb._worksheets[1];
        log.trace(worksheet.getCell("B4"));
        // use workbook
    }).catch(function (err) {
    log.info(err);
});

for (var i = 0; i < namedRanges.length; i++) {
    var obj = namedRanges[i];
}
//if (ixfe == 62 // table)
var entries = {
    'MatrixLookup': function (xlsfileName, tableName, row, col) {

        //write logic to find the table in sheet etc...
        return 'matrix' + row + ":" + col;
    }
};
entries.Matrixlookup = entries.MatrixLookup;
exports.xlsxLookup = {
    name: 'xlsx-lookup',
    entries: entries
}