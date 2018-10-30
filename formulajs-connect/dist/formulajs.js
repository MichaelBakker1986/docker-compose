'use strict';

var cov_1axbif5cdy = function () {
	var path = 'C:\\Users\\mbakk\\Documents\\fesjs\\formulajs-connect\\formulajs.js',
	    hash = '65ed38e70d854970477bd7c61789ea18f25b108c',
	    Function = function () {}.constructor,
	    global = new Function('return this')(),
	    gcv = '__coverage__',
	    coverageData = {
		path: 'C:\\Users\\mbakk\\Documents\\fesjs\\formulajs-connect\\formulajs.js',
		statementMap: {
			'0': {
				start: {
					line: 7,
					column: 16
				},
				end: {
					line: 7,
					column: 18
				}
			},
			'1': {
				start: {
					line: 8,
					column: 13
				},
				end: {
					line: 8,
					column: 24
				}
			},
			'2': {
				start: {
					line: 10,
					column: 0
				},
				end: {
					line: 19,
					column: 2
				}
			},
			'3': {
				start: {
					line: 11,
					column: 1
				},
				end: {
					line: 18,
					column: 2
				}
			},
			'4': {
				start: {
					line: 12,
					column: 2
				},
				end: {
					line: 12,
					column: 81
				}
			},
			'5': {
				start: {
					line: 12,
					column: 13
				},
				end: {
					line: 12,
					column: 81
				}
			},
			'6': {
				start: {
					line: 14,
					column: 6
				},
				end: {
					line: 18,
					column: 2
				}
			},
			'7': {
				start: {
					line: 15,
					column: 2
				},
				end: {
					line: 15,
					column: 70
				}
			},
			'8': {
				start: {
					line: 15,
					column: 13
				},
				end: {
					line: 15,
					column: 70
				}
			},
			'9': {
				start: {
					line: 17,
					column: 2
				},
				end: {
					line: 17,
					column: 49
				}
			}
		},
		fnMap: {
			'0': {
				name: '(anonymous_0)',
				decl: {
					start: {
						line: 10,
						column: 31
					},
					end: {
						line: 10,
						column: 32
					}
				},
				loc: {
					start: {
						line: 10,
						column: 47
					},
					end: {
						line: 19,
						column: 1
					}
				},
				line: 10
			}
		},
		branchMap: {
			'0': {
				loc: {
					start: {
						line: 11,
						column: 1
					},
					end: {
						line: 18,
						column: 2
					}
				},
				type: 'if',
				locations: [{
					start: {
						line: 11,
						column: 1
					},
					end: {
						line: 18,
						column: 2
					}
				}, {
					start: {
						line: 11,
						column: 1
					},
					end: {
						line: 18,
						column: 2
					}
				}],
				line: 11
			},
			'1': {
				loc: {
					start: {
						line: 12,
						column: 2
					},
					end: {
						line: 12,
						column: 81
					}
				},
				type: 'if',
				locations: [{
					start: {
						line: 12,
						column: 2
					},
					end: {
						line: 12,
						column: 81
					}
				}, {
					start: {
						line: 12,
						column: 2
					},
					end: {
						line: 12,
						column: 81
					}
				}],
				line: 12
			},
			'2': {
				loc: {
					start: {
						line: 14,
						column: 6
					},
					end: {
						line: 18,
						column: 2
					}
				},
				type: 'if',
				locations: [{
					start: {
						line: 14,
						column: 6
					},
					end: {
						line: 18,
						column: 2
					}
				}, {
					start: {
						line: 14,
						column: 6
					},
					end: {
						line: 18,
						column: 2
					}
				}],
				line: 14
			},
			'3': {
				loc: {
					start: {
						line: 15,
						column: 2
					},
					end: {
						line: 15,
						column: 70
					}
				},
				type: 'if',
				locations: [{
					start: {
						line: 15,
						column: 2
					},
					end: {
						line: 15,
						column: 70
					}
				}, {
					start: {
						line: 15,
						column: 2
					},
					end: {
						line: 15,
						column: 70
					}
				}],
				line: 15
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
			'8': 0,
			'9': 0
		},
		f: {
			'0': 0
		},
		b: {
			'0': [0, 0],
			'1': [0, 0],
			'2': [0, 0],
			'3': [0, 0]
		},
		_coverageSchema: 'd34fc3e6b8297bcde183f5492bcb8fcb36775295'
	},
	    coverage = global[gcv] || (global[gcv] = {});

	if (coverage[path] && coverage[path].hash === hash) {
		return coverage[path];
	}

	coverageData.hash = hash;
	return coverage[path] = coverageData;
}(); /**
      * bridge between formula-js and lme
      */


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.entries = exports.name = undefined;

var _log = require('log6');

var _formulajs = require('@handsontable/formulajs');

var formulaJs = _interopRequireWildcard(_formulajs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var entries = (cov_1axbif5cdy.s[0]++, {});
var name = (cov_1axbif5cdy.s[1]++, 'formulaJs');

cov_1axbif5cdy.s[2]++;
Object.keys(formulaJs).forEach(function (functionName) {
	cov_1axbif5cdy.f[0]++;
	cov_1axbif5cdy.s[3]++;

	if (functionName === 'NA') {
		cov_1axbif5cdy.b[0][0]++;
		cov_1axbif5cdy.s[4]++;

		if (_log.DEBUG) {
				cov_1axbif5cdy.b[1][0]++;
				cov_1axbif5cdy.s[5]++;
				return (0, _log.debug)('FFL parser uses this function to be a VARIABLE 1e-10');
			} else {
			cov_1axbif5cdy.b[1][1]++;
		}
	} else {
			cov_1axbif5cdy.b[0][1]++;
			cov_1axbif5cdy.s[6]++;
			if (global.hasOwnProperty(functionName)) {
				cov_1axbif5cdy.b[2][0]++;
				cov_1axbif5cdy.s[7]++;

				if (_log.DEBUG) {
						cov_1axbif5cdy.b[3][0]++;
						cov_1axbif5cdy.s[8]++;
						(0, _log.debug)('global function already used : [' + functionName + ']');
					} else {
					cov_1axbif5cdy.b[3][1]++;
				}
			} else {
				cov_1axbif5cdy.b[2][1]++;
				cov_1axbif5cdy.s[9]++;

				entries[functionName] = formulaJs[functionName];
			}
		}
});
exports.name = name;
exports.entries = entries;
exports.default = { name: name, entries: entries };