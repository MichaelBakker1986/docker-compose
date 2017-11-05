/**
 * Bridge between excel files and FESJS
 */
//TODO: find out if this is the best xlsx tool to find the tables..
var Excel = require('exceljs');
var log = require('ff-log');
var Promise = require('promise')
var matrix = {};
var workbook = new Excel.Workbook();
var fileName = __dirname + '/resources/ScorecardKSP1.xlsx';
var fileName2 = __dirname + '/resources/AAB_Parameters.xlsx';
var succes;
var initComplete = new Promise(function(succesArg) {
    succes = succesArg;
}, function() {
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
                    var value = getCellValueFromRangeCell(range, namedRangeAdressCell);
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

var sync = true;

function readFunction(wb) {
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
        //log.debug(matrix[definedName])
        //log.debug('found named range:[%s]', range.name)
        //printValues(range)
    }
    // use workbook
    succes(matrix);
}

Promise.all([workbook.xlsx.readFile(fileName).then(readFunction), workbook.xlsx.readFile(fileName2).then(readFunction)]).then(function(ok) {
    sync = false;
}).catch(function(err) {
        log.info(err);
        sync = false;
    }
);
while (sync) {
    require('deasync').sleep(100);
}
var entries = {
    'MatrixLookup': function(xlsfileName, tableName, row, col) {
        if (!matrix[tableName]) {
            if (log.TRACE) log.trace('Defined matrix name not found [%s]:[%s:%s]', tableName, row, col);

        }
        if (matrix[tableName] && matrix[tableName].xasValues && matrix[tableName].xasValues[row] && matrix[tableName].xasValues[row][col]) {
            if (log.TRACE) log.trace('Matrix call [%s]:[%s:%s] xlsxValue:[%s]', tableName, row, col, matrix[tableName].xasValues[row][col]);
            return matrix[tableName].xasValues[row][col];
        }
        return NA;
    }
};
entries.Matrixlookup = entries.MatrixLookup;
MatrixLookup = entries.MatrixLookup
exports.xlsxLookup = {
    name: 'xlsx-lookup',
    entries: entries,
    initComplete: initComplete
}