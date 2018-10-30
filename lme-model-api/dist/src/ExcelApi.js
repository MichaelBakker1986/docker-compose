'use strict';

var cov_scfqsqi10 = function () {
	var path = 'C:\\Users\\mbakk\\Documents\\fesjs\\lme-model-api\\src\\ExcelApi.js',
	    hash = '2f50f701c8bf2017f2b091b4c92b1779ff0d12a1',
	    Function = function () {}.constructor,
	    global = new Function('return this')(),
	    gcv = '__coverage__',
	    coverageData = {
		path: 'C:\\Users\\mbakk\\Documents\\fesjs\\lme-model-api\\src\\ExcelApi.js',
		statementMap: {
			'0': {
				start: {
					line: 8,
					column: 16
				},
				end: {
					line: 8,
					column: 40
				}
			},
			'1': {
				start: {
					line: 11,
					column: 21
				},
				end: {
					line: 11,
					column: 73
				}
			},
			'2': {
				start: {
					line: 12,
					column: 2
				},
				end: {
					line: 12,
					column: 71
				}
			},
			'3': {
				start: {
					line: 13,
					column: 2
				},
				end: {
					line: 13,
					column: 19
				}
			},
			'4': {
				start: {
					line: 17,
					column: 0
				},
				end: {
					line: 17,
					column: 25
				}
			}
		},
		fnMap: {
			'0': {
				name: '(anonymous_0)',
				decl: {
					start: {
						line: 8,
						column: 1
					},
					end: {
						line: 8,
						column: 2
					}
				},
				loc: {
					start: {
						line: 8,
						column: 15
					},
					end: {
						line: 8,
						column: 41
					}
				},
				line: 8
			},
			'1': {
				name: '(anonymous_1)',
				decl: {
					start: {
						line: 10,
						column: 1
					},
					end: {
						line: 10,
						column: 2
					}
				},
				loc: {
					start: {
						line: 10,
						column: 53
					},
					end: {
						line: 14,
						column: 2
					}
				},
				line: 10
			}
		},
		branchMap: {},
		s: {
			'0': 0,
			'1': 0,
			'2': 0,
			'3': 0,
			'4': 0
		},
		f: {
			'0': 0,
			'1': 0
		},
		b: {},
		_coverageSchema: 'd34fc3e6b8297bcde183f5492bcb8fcb36775295'
	},
	    coverage = global[gcv] || (global[gcv] = {});

	if (coverage[path] && coverage[path].hash === hash) {
		return coverage[path];
	}

	coverageData.hash = hash;
	return coverage[path] = coverageData;
}();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _excelConnect = require('../../excel-connect/excel-connect');

var _excelConnect2 = _interopRequireDefault(_excelConnect);

var _index = require('../../lme-core/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Helper class for test-purposes
 */
var ExcelApi = function () {
	function ExcelApi() {
		(0, _classCallCheck3.default)(this, ExcelApi);
		cov_scfqsqi10.f[0]++;
		cov_scfqsqi10.s[0]++;
		throw Error('Singleton');
	}

	(0, _createClass3.default)(ExcelApi, null, [{
		key: 'loadExcelFile',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(excelFileName, fullPath) {
				var expression;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								cov_scfqsqi10.f[1]++;
								cov_scfqsqi10.s[1]++;
								_context.next = 4;
								return _excelConnect2.default.loadExcelFile(excelFileName, fullPath);

							case 4:
								expression = _context.sent;
								cov_scfqsqi10.s[2]++;

								_index.SolutionFacade.initVariables([{ name: 'MATRIX_VALUES', expression: expression }]);
								cov_scfqsqi10.s[3]++;
								return _context.abrupt('return', expression);

							case 9:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function loadExcelFile(_x, _x2) {
				return _ref.apply(this, arguments);
			}

			return loadExcelFile;
		}()
	}]);
	return ExcelApi;
}();

cov_scfqsqi10.s[4]++;


_index2.default.addFunctions(_excelConnect2.default);
exports.default = ExcelApi;