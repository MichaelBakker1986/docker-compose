'use strict';

var cov_1hz34kdyd4 = function () {
	var path = 'C:\\Users\\michael\\Documents\\lme\\lme-core\\src\\ParserService.js',
	    hash = '3d2db3a3b39fa73ff27f09e40d0ddfd5bdebbd43',
	    Function = function () {}.constructor,
	    global = new Function('return this')(),
	    gcv = '__coverage__',
	    coverageData = {
		path: 'C:\\Users\\michael\\Documents\\lme\\lme-core\\src\\ParserService.js',
		statementMap: {
			'0': {
				start: {
					line: 14,
					column: 16
				},
				end: {
					line: 14,
					column: 18
				}
			},
			'1': {
				start: {
					line: 19,
					column: 2
				},
				end: {
					line: 19,
					column: 92
				}
			},
			'2': {
				start: {
					line: 19,
					column: 37
				},
				end: {
					line: 19,
					column: 92
				}
			},
			'3': {
				start: {
					line: 20,
					column: 2
				},
				end: {
					line: 20,
					column: 56
				}
			},
			'4': {
				start: {
					line: 20,
					column: 13
				},
				end: {
					line: 20,
					column: 56
				}
			},
			'5': {
				start: {
					line: 21,
					column: 2
				},
				end: {
					line: 21,
					column: 31
				}
			},
			'6': {
				start: {
					line: 25,
					column: 2
				},
				end: {
					line: 25,
					column: 63
				}
			},
			'7': {
				start: {
					line: 25,
					column: 41
				},
				end: {
					line: 25,
					column: 62
				}
			},
			'8': {
				start: {
					line: 29,
					column: 2
				},
				end: {
					line: 29,
					column: 28
				}
			}
		},
		fnMap: {
			'0': {
				name: '(anonymous_0)',
				decl: {
					start: {
						line: 18,
						column: 1
					},
					end: {
						line: 18,
						column: 2
					}
				},
				loc: {
					start: {
						line: 18,
						column: 26
					},
					end: {
						line: 22,
						column: 2
					}
				},
				line: 18
			},
			'1': {
				name: '(anonymous_1)',
				decl: {
					start: {
						line: 24,
						column: 1
					},
					end: {
						line: 24,
						column: 2
					}
				},
				loc: {
					start: {
						line: 24,
						column: 36
					},
					end: {
						line: 26,
						column: 2
					}
				},
				line: 24
			},
			'2': {
				name: '(anonymous_2)',
				decl: {
					start: {
						line: 25,
						column: 31
					},
					end: {
						line: 25,
						column: 32
					}
				},
				loc: {
					start: {
						line: 25,
						column: 41
					},
					end: {
						line: 25,
						column: 62
					}
				},
				line: 25
			},
			'3': {
				name: '(anonymous_3)',
				decl: {
					start: {
						line: 28,
						column: 1
					},
					end: {
						line: 28,
						column: 2
					}
				},
				loc: {
					start: {
						line: 28,
						column: 31
					},
					end: {
						line: 30,
						column: 2
					}
				},
				line: 28
			}
		},
		branchMap: {
			'0': {
				loc: {
					start: {
						line: 19,
						column: 2
					},
					end: {
						line: 19,
						column: 92
					}
				},
				type: 'if',
				locations: [{
					start: {
						line: 19,
						column: 2
					},
					end: {
						line: 19,
						column: 92
					}
				}, {
					start: {
						line: 19,
						column: 2
					},
					end: {
						line: 19,
						column: 92
					}
				}],
				line: 19
			},
			'1': {
				loc: {
					start: {
						line: 19,
						column: 6
					},
					end: {
						line: 19,
						column: 35
					}
				},
				type: 'binary-expr',
				locations: [{
					start: {
						line: 19,
						column: 6
					},
					end: {
						line: 19,
						column: 13
					}
				}, {
					start: {
						line: 19,
						column: 17
					},
					end: {
						line: 19,
						column: 35
					}
				}],
				line: 19
			},
			'2': {
				loc: {
					start: {
						line: 20,
						column: 2
					},
					end: {
						line: 20,
						column: 56
					}
				},
				type: 'if',
				locations: [{
					start: {
						line: 20,
						column: 2
					},
					end: {
						line: 20,
						column: 56
					}
				}, {
					start: {
						line: 20,
						column: 2
					},
					end: {
						line: 20,
						column: 56
					}
				}],
				line: 20
			}
		},
		s: {
			'0': 0,
			'1': 0,
			'2': 0,
			'3': 0,
			'4': 0,
			'5': 0,
			'6': 0,
			'7': 0,
			'8': 0
		},
		f: {
			'0': 0,
			'1': 0,
			'2': 0,
			'3': 0
		},
		b: {
			'0': [0, 0],
			'1': [0, 0],
			'2': [0, 0]
		},
		_coverageSchema: 'd34fc3e6b8297bcde183f5492bcb8fcb36775295'
	},
	    coverage = global[gcv] || (global[gcv] = {});

	if (coverage[path] && coverage[path].hash === hash) {
		return coverage[path];
	}

	coverageData.hash = hash;
	return coverage[path] = coverageData;
}(); /*
      register/resolve exchange modules e.g. ffl,screen_definition,presentation
      */
/*Class Parser
 {
 name: String,
 headerName: String,
 parse: Function(Context) : Solution
 deParse: Function() : Export
 }
 */


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _log = require('log6');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parsers = (cov_1hz34kdyd4.s[0]++, {});

var ParserService = function () {
	function ParserService() {
		(0, _classCallCheck3.default)(this, ParserService);
	}

	(0, _createClass3.default)(ParserService, null, [{
		key: 'addParser',
		value: function addParser(parser) {
			cov_1hz34kdyd4.f[0]++;
			cov_1hz34kdyd4.s[1]++;

			if ((cov_1hz34kdyd4.b[1][0]++, !parser) || (cov_1hz34kdyd4.b[1][1]++, !parser.headername)) {
					cov_1hz34kdyd4.b[0][0]++;
					cov_1hz34kdyd4.s[2]++;
					throw Error('Invalid parser ' + JSON.stringify(parser));
				} else {
				cov_1hz34kdyd4.b[0][1]++;
			}cov_1hz34kdyd4.s[3]++;
			if (_log.DEBUG) {
					cov_1hz34kdyd4.b[2][0]++;
					cov_1hz34kdyd4.s[4]++;
					(0, _log.debug)('Adding parser ' + parser.headername);
				} else {
				cov_1hz34kdyd4.b[2][1]++;
			}cov_1hz34kdyd4.s[5]++;
			parsers[parser.name] = parser;
		}
	}, {
		key: 'visitParsers',
		value: function visitParsers(visitFunction) {
			cov_1hz34kdyd4.f[1]++;
			cov_1hz34kdyd4.s[6]++;

			Object.keys(parsers).forEach(function (parser) {
				cov_1hz34kdyd4.f[2]++;
				cov_1hz34kdyd4.s[7]++;
				return visitFunction(parser);
			});
		}
	}, {
		key: 'findParser',
		value: function findParser(parserName) {
			cov_1hz34kdyd4.f[3]++;
			cov_1hz34kdyd4.s[8]++;

			return parsers[parserName];
		}
	}]);
	return ParserService;
}();

exports.default = ParserService;