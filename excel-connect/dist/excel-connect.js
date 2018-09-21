'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _log = require('log6');

var _log2 = _interopRequireDefault(_log);

var _exceljs = require('exceljs');

var _exceljs2 = _interopRequireDefault(_exceljs);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_resources_map = __dirname + '/../git-connect/resources/'; /**
                                                                       * Bridge between excel files and LME
                                                                       * The MatrixLookup function is found in math
                                                                       */

var ExcelConnect = function () {
	function ExcelConnect() {
		(0, _classCallCheck3.default)(this, ExcelConnect);

		this.name = 'xlsx-lookup';
		this.entries = {};
	}

	(0, _createClass3.default)(ExcelConnect, [{
		key: 'loadExcelFile',
		value: function loadExcelFile(excelFileName, fullPath) {
			var self = this;
			return new _promise2.default(function (success, fail) {
				//check if an file exists
				var folder = fullPath || default_resources_map;
				var files = _fs2.default.readdirSync(folder);
				var fileNames = [];
				for (var i = 0; i < files.length; i++) {
					var full_path = _path2.default.resolve(_path2.default.join(folder, files[i]));
					var filename = full_path.replace(/\(\w+\)/gmi, '');
					if (_path2.default.extname(filename) === '.xlsx' && _path2.default.parse(filename).name === excelFileName) {
						fileNames.push(full_path);
						if (_log2.default.DEBUG) _log2.default.debug('Found excel file: ', full_path);
					}
				}
				_promise2.default.all(fileNames.map(function (filename) {
					return new _promise2.default(function (success, fail) {
						new _exceljs2.default.Workbook().xlsx.readFile(filename).then(function (data) {
							success(self.readFunction(data));
						}).catch(function (err) {
							fail('Error reading XLSX ' + filename + ' for ' + excelFileName, err.toString());
						});
					});
				})).then(function (ok) {
					var totalMatrix = {};
					for (var excelFileIndex = 0; excelFileIndex < ok.length; excelFileIndex++) {
						var excelFile = ok[excelFileIndex];
						for (var tableName in excelFile) {
							totalMatrix[tableName] = excelFile[tableName];
						}
					}
					success(totalMatrix);
				}).catch(function (err) {
					fail(err);
				});
			});
		}
	}, {
		key: 'getDefinedNames',
		value: function getDefinedNames(wb) {
			var names = {};
			var matrixMap = wb._definedNames.matrixMap;
			for (var name in matrixMap) {
				//checks concerning assumptions made during creating code.
				var matrixMapDefinedName = matrixMap[name];
				if (!matrixMapDefinedName) {
					_log2.default.warn('invalid named range [%s]', name);
					continue;
				}
				if (!matrixMapDefinedName.sheets) {
					_log2.default.warn('invalid named range sheets [%s]', name);
					continue;
				}
				var matrixMapDefinedNamesSheetKeys = Object.keys(matrixMapDefinedName.sheets);
				if (matrixMapDefinedNamesSheetKeys.length > 1) {
					_log2.default.warn('invalid named range sheet count [%s]', name);
					continue;
				}
				var sheetName = matrixMapDefinedNamesSheetKeys[0];
				names[name] = {
					name: name,
					sheet: wb.getWorksheet(sheetName),
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

	}, {
		key: 'findStart',
		value: function findStart(range) {
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
			};
		}
	}, {
		key: 'getCellValueFromRangeCell',
		value: function getCellValueFromRangeCell(range, rangeCell) {
			return range.sheet.getCell(rangeCell.address).value;
		}
	}, {
		key: 'findYasNames',
		value: function findYasNames(range, bounds) {
			var yAsNames = {};
			for (var y = bounds.yStart; y < range.ranges.length; y++) {
				yAsNames[this.getCellValueFromRangeCell(range, range.ranges[y][bounds.xStart])] = range.ranges[y][bounds.xStart];
			}
			return yAsNames;
		}
	}, {
		key: 'findXasValues',
		value: function findXasValues(range, yasNames, bounds) {
			var xAsValues = {};
			for (var y = bounds.yStart; y < range.ranges.length; y++) {
				var currentXAs = {};
				xAsValues[this.getCellValueFromRangeCell(range, range.ranges[y][bounds.xStart])] = currentXAs;
				for (var x = bounds.xStart; x < range.ranges[y].length; x++) {
					var cellAdress = range.ranges[y][x];
					currentXAs[x - bounds.xStart] = this.getCellValueFromRangeCell(range, cellAdress);
				}
			}
			return xAsValues;
		}
	}, {
		key: 'readFunction',
		value: function readFunction(wb) {
			var matrix = {};
			var definedNames = this.getDefinedNames(wb);
			for (var definedName in definedNames) {
				var range = definedNames[definedName];
				var bounds = this.findStart(range);
				var yasNames = this.findYasNames(range, bounds);
				var xasValues = this.findXasValues(range, yasNames, bounds);
				var sorted = [];
				for (var key in xasValues) {
					sorted.push(key);
				}matrix[definedName] = {
					name: range.name,
					table: {},
					bounds: bounds,
					yasNames: yasNames,
					x_sort: sorted,
					xasValues: xasValues
				};
				for (var key in xasValues) {
					matrix[definedName].x = [];
					for (var keyX in xasValues[key]) {
						matrix[definedName].x.push(keyX);
					}
				}
			}
			// use workbook
			// This variable should be available in the client.
			return matrix;
		}
	}]);
	return ExcelConnect;
}();

module.exports = new ExcelConnect();