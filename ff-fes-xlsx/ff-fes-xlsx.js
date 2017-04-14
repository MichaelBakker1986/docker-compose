/**
 * Bridge between excel files and FESJS
 */
//TODO: find out if this is the best xlsx tool to find the tables..
var Excel = require('exceljs');
var log = require('ff-log');
var Promise = require('promise')
var matrix = {};
var workbook = new Excel.Workbook();
var fileName = __dirname + '\\resources\\ScorecardKSP1.xlsx';
var succes;
var initComplete = new Promise(function (succesArg) {
    succes = succesArg;
}, function () {
});
function getDefinedNames(wb) {
    var names = {};
    var matrixMap = wb._definedNames.matrixMap;
    for (var name in matrixMap) {
        //checks concerning assumptions made during creating code.
        var matrixMapDefinedName = matrixMap[name];
        if (!matrixMapDefinedName) {
            log.warn('invalid named range [%s]', name);
            continue;
        }
        if (!matrixMapDefinedName.sheets) {
            log.warn('invalid named range sheets [%s]', name);
            continue;
        }
        var matrixMapDefinedNamesSheetKeys = Object.keys(matrixMapDefinedName.sheets);
        if (matrixMapDefinedNamesSheetKeys.length > 1) {
            log.warn('invalid named range sheet count [%s]', name);
            continue;
        }
        var sheetName = matrixMapDefinedNamesSheetKeys[0];
        names[name] = {name: name, sheet: wb.getWorksheet(sheetName), ranges: matrixMapDefinedName.sheets[sheetName]};
    }
    return names;
}

function printValues(range) {
    var namedRangeSheet = range.ranges;
    for (var i = 0; i < namedRangeSheet.length; i++) {
        var obj1 = namedRangeSheet[i];
        if (obj1 !== undefined) {
            log.trace('[%s]row:[%s]', i, i)
            for (var columnId = 0; columnId < obj1.length; columnId++) {
                var namedRangeAdressCell = obj1[columnId];
                if (namedRangeAdressCell !== undefined) {
                    var value = range.sheet.getCell(namedRangeAdressCell.address).value;
                    if (value !== null && value !== undefined) {
                        log.trace('[%s]:[%s]', columnId, namedRangeAdressCell);
                        matrix[range.name].table[namedRangeAdressCell.row + '_' + namedRangeAdressCell.col] = value
                        log.trace('found excel value: %s [%s:%s]=[%s]', range.name, range.sheet.name, namedRangeAdressCell.address, value)
                    }
                }
            }
        }
    }
}
workbook.xlsx.readFile(fileName)
    .then(function (wb) {
        var definedNames = getDefinedNames(wb);
        for (definedName in definedNames) {
            matrix[definedName] = {
                table: {}
            };
            var range = definedNames[definedName];
            log.debug('found named range:[%s]', range.name)
            printValues(range)
        }
        // use workbook
        succes(matrix);
    }).catch(function (err) {
    log.info(err);
});

var entries = {
    'MatrixLookup': function (xlsfileName, tableName, row, col) {
        if (!matrix[tableName]) {
            log.warn('Defined name not found [%s]:[%s:%s]', tableName, row, col);
        } else {
            var table = matrix[tableName].table
            log.debug('Matrix call [%s]:[%s:%s] tablevalue:[%s]', tableName, row, col, table[row + '_' + col]);
        }

        //write logic to find the table in sheet etc...
        return NA;
    }
};

entries.Matrixlookup = entries.MatrixLookup;
exports.xlsxLookup = {
    name: 'xlsx-lookup',
    entries: entries,
    initComplete: initComplete
}