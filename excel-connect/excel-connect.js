/**
 * Bridge between excel files and LME
 * The MatrixLookup function is found in math
 */
const fs                   = require('fs'),
      Excel                = require('exceljs'),
      Promise              = require('promise'),
      path                 = require('path'),
      log                  = require('log6'),
      default_resouces_map = __dirname + '/../git-connect/resources/'

class ExcelConnect {
    constructor() {
        this.name = 'xlsx-lookup'
        this.entries = {}
    }

    loadExcelFile(excelFileName, fullPath) {
        const self = this;
        return new Promise(function(succes, fail) {
            //check if an file exists
            const folder = fullPath || default_resouces_map;
            const files = fs.readdirSync(folder);
            const matcher = new RegExp('/|\\\\' + excelFileName + '(\\(\\w*\\))?\.xlsx', 'i');
            const fileNames = []
            for (var i = 0; i < files.length; i++) {
                const filename = path.resolve(path.join(folder, files[i]));
                if (matcher.test(filename)) {
                    fileNames.push(filename)
                    if (log.DEBUG) log.debug('Found excel file: ', filename);
                }
            }
            Promise.all(fileNames.map(function(filename) {
                return new Promise(function(succes, fail) {
                    new Excel.Workbook().xlsx.readFile(filename).then(function(data) {
                        succes(self.readFunction(data))
                    }).catch(function(err) {
                        fail('Error reading XLSX ' + filename + ' for ' + excelFileName, err.toString())
                    })
                })
            })).then((ok) => {
                const totalMatrix = {};
                for (var excelFileIndex = 0; excelFileIndex < ok.length; excelFileIndex++) {
                    const excelFile = ok[excelFileIndex];
                    for (let tableName in excelFile) {
                        totalMatrix[tableName] = excelFile[tableName]
                    }
                }
                succes(totalMatrix);
            }).catch(function(err) {
                fail(err)
            });
        });
    }

    getDefinedNames(wb) {
        const names = {};
        const matrixMap = wb._definedNames.matrixMap;
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
            const matrixMapDefinedNamesSheetKeys = Object.keys(matrixMapDefinedName.sheets);
            if (matrixMapDefinedNamesSheetKeys.length > 1) {
                log.warn('invalid named range sheet count [%s]', name);
                continue;
            }
            const sheetName = matrixMapDefinedNamesSheetKeys[0];
            names[name] = {
                name  : name,
                sheet : wb.getWorksheet(sheetName),
                ranges: matrixMapDefinedName.sheets[sheetName]
            };
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
    findStart(range) {
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

    getCellValueFromRangeCell(range, rangeCell) {
        return range.sheet.getCell(rangeCell.address).value;
    }

    findYasNames(range, bounds) {
        const yAsNames = {};
        for (var y = bounds.yStart; y < range.ranges.length; y++) {
            yAsNames[this.getCellValueFromRangeCell(range, range.ranges[y][bounds.xStart])] = range.ranges[y][bounds.xStart];
        }
        return yAsNames
    }

    findXasValues(range, yasNames, bounds) {
        var xAsValues = {};
        for (var y = bounds.yStart; y < range.ranges.length; y++) {
            var currentXAs = {};
            xAsValues[this.getCellValueFromRangeCell(range, range.ranges[y][bounds.xStart])] = currentXAs
            for (var x = bounds.xStart; x < range.ranges[y].length; x++) {
                var cellAdress = range.ranges[y][x];
                currentXAs[x - bounds.xStart] = this.getCellValueFromRangeCell(range, cellAdress);
            }
        }
        return xAsValues;
    }

    readFunction(wb) {
        var matrix = {};
        var definedNames = this.getDefinedNames(wb);
        for (var definedName in definedNames) {
            var range = definedNames[definedName];
            var bounds = this.findStart(range);
            var yasNames = this.findYasNames(range, bounds);
            var xasValues = this.findXasValues(range, yasNames, bounds);
            const sorted = []
            for (var key in xasValues) sorted.push(key)
            matrix[definedName] = {
                name     : range.name,
                table    : {},
                bounds   : bounds,
                yasNames : yasNames,
                x_sort   : sorted,
                xasValues: xasValues
            };
            for (var key in xasValues) {
                matrix[definedName].x = []
                for (var keyX in xasValues[key]) matrix[definedName].x.push(keyX)
            }
        }
        // use workbook
        // This variable should be available in the client.
        return matrix
    }
}
module.exports = new ExcelConnect()