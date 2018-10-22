'use strict';

var cov_27n4467418 = function () {
	var path = 'C:\\Users\\michael\\Documents\\lme\\health-check\\trader-connector\\HealthCare.js',
	    hash = 'a749c865b1510246890cde102a203a60bf71b0fb',
	    Function = function () {}.constructor,
	    global = new Function('return this')(),
	    gcv = '__coverage__',
	    coverageData = {
		path: 'C:\\Users\\michael\\Documents\\lme\\health-check\\trader-connector\\HealthCare.js',
		statementMap: {
			'0': {
				start: {
					line: 8,
					column: 2
				},
				end: {
					line: 11,
					column: 27
				}
			}
		},
		fnMap: {
			'0': {
				name: '(anonymous_0)',
				decl: {
					start: {
						line: 4,
						column: 1
					},
					end: {
						line: 4,
						column: 2
					}
				},
				loc: {
					start: {
						line: 4,
						column: 15
					},
					end: {
						line: 5,
						column: 2
					}
				},
				line: 4
			},
			'1': {
				name: '(anonymous_1)',
				decl: {
					start: {
						line: 7,
						column: 1
					},
					end: {
						line: 7,
						column: 2
					}
				},
				loc: {
					start: {
						line: 7,
						column: 36
					},
					end: {
						line: 12,
						column: 2
					}
				},
				line: 7
			}
		},
		branchMap: {
			'0': {
				loc: {
					start: {
						line: 8,
						column: 23
					},
					end: {
						line: 8,
						column: 52
					}
				},
				type: 'binary-expr',
				locations: [{
					start: {
						line: 8,
						column: 23
					},
					end: {
						line: 8,
						column: 47
					}
				}, {
					start: {
						line: 8,
						column: 51
					},
					end: {
						line: 8,
						column: 52
					}
				}],
				line: 8
			}
		},
		s: {
			'0': 0
		},
		f: {
			'0': 0,
			'1': 0
		},
		b: {
			'0': [0, 0]
		},
		_coverageSchema: '43e27e138ebf9cfc5966b082cf9a028302ed4184'
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
exports.HealthCare = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _TraderConnect = require('./TraderConnect');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HealthCare = exports.HealthCare = function () {
	function HealthCare() {
		(0, _classCallCheck3.default)(this, HealthCare);
		cov_27n4467418.f[0]++;
	}

	(0, _createClass3.default)(HealthCare, null, [{
		key: 'raw',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(last_create_time) {
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								cov_27n4467418.f[1]++;
								cov_27n4467418.s[0]++;
								return _context.abrupt('return', _TraderConnect.audit.between((cov_27n4467418.b[0][0]++, Number(last_create_time)) || (cov_27n4467418.b[0][1]++, 0), _TraderConnect.r.maxval, {
									leftBound: 'open',
									index: 'create_time'
								}).orderBy('create_time'));

							case 3:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function raw(_x) {
				return _ref.apply(this, arguments);
			}

			return raw;
		}()
	}]);
	return HealthCare;
}();