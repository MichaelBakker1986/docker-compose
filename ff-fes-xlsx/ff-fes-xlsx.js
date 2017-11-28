/**
 * Bridge between excel files and LME
 */
var Excel = require('exceljs');
var log = require('ff-log');
var Promise = require('promise')
var workbook = new Excel.Workbook();
var fileName = __dirname + '/resources/ScorecardKSP1.xlsx';
let succes;
var initComplete = new Promise(function(succesArg) {
    succes = succesArg;
}, function(err) {
    log.error(err)
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

/**
 * Resultaat na parsen van excel.
 * rangenaam: {
 *   var1: {
 *      0 : value
 *      1 : value
 *   }
 *   var2:{
 *      0 : value
 *      1 : value
 *   }
 * }
 */
function findStart(range) {
    var yAs = -1;
    var xAs = -1;
    for (var y = 0; y < range.ranges.length; y++) {
        if (range.ranges[y]) {
            yAs = y;
            for (var x = 0; x < range.ranges[y].length; x++) {
                if (range.ranges[y][x]) {
                    xAs = x;
                    break;
                }
            }
            break;
        }
    }
    return {
        xStart: xAs,
        yStart: yAs
    }
}

function getCellValueFromRangeCell(range, rangeCell) {
    return range.sheet.getCell(rangeCell.address).value;
}

function findYasNames(range, bounds) {
    var yAsNames = {};
    for (var y = bounds.yStart; y < range.ranges.length; y++) {
        yAsNames[getCellValueFromRangeCell(range, range.ranges[y][bounds.xStart])] = range.ranges[y][bounds.xStart];
    }
    return yAsNames
}

function findXasValues(range, yasNames, bounds) {
    var xAsValues = {};
    for (var y = bounds.yStart; y < range.ranges.length; y++) {
        var currentXAs = {};
        xAsValues[getCellValueFromRangeCell(range, range.ranges[y][bounds.xStart])] = currentXAs
        for (var x = bounds.xStart; x < range.ranges[y].length; x++) {
            var cellAdress = range.ranges[y][x];
            currentXAs[x - bounds.xStart] = getCellValueFromRangeCell(range, cellAdress);
        }
    }
    return xAsValues;
}

function readFunction(wb) {
    var matrix = {};
    var definedNames = getDefinedNames(wb);
    for (definedName in definedNames) {
        var range = definedNames[definedName];
        var bounds = findStart(range);
        var yasNames = findYasNames(range, bounds);
        var xasValues = findXasValues(range, yasNames, bounds);
        matrix[definedName] = {
            name: range.name,
            table: {},
            bounds: bounds,
            yasNames: yasNames,
            xasValues: xasValues
        };
    }
    // use workbook
    // This variable should be available in the client.
   return matrix
}
//workbook.xlsx.readFile(fileName2).then(readFunction)
Promise.all([workbook.xlsx.readFile(fileName).then(readFunction)]).then(function(ok) {
   var totalMatrix = {};
    for (var excelFileIndex = 0; excelFileIndex < ok.length; excelFileIndex++) {
        var excelFile = ok[excelFileIndex];
        for (let tableName in excelFile){
            totalMatrix[tableName] = excelFile[tableName]
        }
    }
    succes(totalMatrix);
}).catch(function(err) {
    log.error(err);
});

/**
 * MATRIX_VALUES is global declared with table names.
 * See @FormulaService
 */
function doMatrixLookup(xlsfileName, tableName, row, col) {
    if (log.TRACE)
        if (!MATRIX_VALUES[tableName]) log.trace('Defined matrix name not found [%s]:[%s:%s]', tableName, row, col);
    var table = MATRIX_VALUES[tableName];
    if (table && table.xasValues && table.xasValues[row] && table.xasValues[row][col]) {
        if (log.TRACE) log.trace('Matrix call [%s]:[%s:%s] xlsxValue:[%s]', tableName, row, col, table.xasValues[row][col]);
        return table.xasValues[row][col];
    }
    return NA;
}

var entries = {
    'MatrixLookup': doMatrixLookup
};
entries.Matrixlookup = entries.MatrixLookup;
MatrixLookup = entries.MatrixLookup
exports.xlsxLookup = {
    name: 'xlsx-lookup',
    entries: entries,
    initComplete: initComplete
}