/**
 * Bridge between excel files and LME
 */
const Excel = require('exceljs');
const log = require('ff-log');
const Promise = require('promise')
const workbook = new Excel.Workbook();
const fs = require('fs');

const loadExcelFile = function(excelFileName) {
    return new Promise(function(succes, fail) {
        //check if an file exists
        const xlsxPath = __dirname + '/../git-connect/resources/' + excelFileName + '.xlsx';
        if (!fs.existsSync(xlsxPath)) {
            succes(null)
        } else {
            Promise.all([workbook.xlsx.readFile(xlsxPath).then(readFunction)]).then(function(ok) {
                var totalMatrix = {};
                for (var excelFileIndex = 0; excelFileIndex < ok.length; excelFileIndex++) {
                    var excelFile = ok[excelFileIndex];
                    for (let tableName in excelFile) {
                        totalMatrix[tableName] = excelFile[tableName]
                    }
                }
                succes(totalMatrix);
            }).catch(function(err) {
                fail(err)
            });
        }
    });
}

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
    const yAsNames = {};
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


/**
 * MATRIX_VALUES is global declared with table names.
 * See @FormulaService
 */
function doMatrixLookup(xlsfileName, tableName, row, col) {
    if (log.TRACE)
        if (!MATRIX_VALUES[tableName]) log.trace('Defined matrix name not found [%s]:[%s:%s]', tableName, row, col);
    const table = MATRIX_VALUES[tableName];
    if (table && table.xasValues && table.xasValues[row] && table.xasValues[row][col] !== undefined) {
        if (log.TRACE) log.trace('Matrix call [%s]:[%s:%s] xlsxValue:[%s]', tableName, row, col, table.xasValues[row][col]);
        return table.xasValues[row][col];
    } else if (table && table.xasValues) {
        let lastidx = null;
        for (var key in table.xasValues) {
            if (key <= row) {
                lastidx = key;
            } else {
                break;
            }
        }
        if (lastidx) return table.xasValues[lastidx][col];
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
    initComplete: loadExcelFile
}