'use strict';

var cov_1axbif5cdy = function () {
	var path = 'C:\\Users\\mbakk\\Documents\\fesjs\\formulajs-connect\\formulajs.js',
	    hash = '2b5d6b76fa053940bae86cd23d467f590bd145ab',
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
					line: 14,
					column: 2
				}
			},
			'3': {
				start: {
					line: 11,
					column: 1
				},
				end: {
					line: 13,
					column: 53
				}
			},
			'4': {
				start: {
					line: 11,
					column: 28
				},
				end: {
					line: 13,
					column: 53
				}
			},
			'5': {
				start: {
					line: 11,
					column: 39
				},
				end: {
					line: 11,
					column: 107
				}
			},
			'6': {
				start: {
					line: 12,
					column: 6
				},
				end: {
					line: 13,
					column: 53
				}
			},
			'7': {
				start: {
					line: 12,
					column: 47
				},
				end: {
					line: 13,
					column: 53
				}
			},
			'8': {
				start: {
					line: 12,
					column: 58
				},
				end: {
					line: 12,
					column: 115
				}
			},
			'9': {
				start: {
					line: 13,
					column: 6
				},
				end: {
					line: 13,
					column: 53
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
						line: 14,
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
						line: 13,
						column: 53
					}
				},
				type: 'if',
				locations: [{
					start: {
						line: 11,
						column: 1
					},
					end: {
						line: 13,
						column: 53
					}
				}, {
					start: {
						line: 11,
						column: 1
					},
					end: {
						line: 13,
						column: 53
					}
				}],
				line: 11
			},
			'1': {
				loc: {
					start: {
						line: 11,
						column: 28
					},
					end: {
						line: 13,
						column: 53
					}
				},
				type: 'if',
				locations: [{
					start: {
						line: 11,
						column: 28
					},
					end: {
						line: 13,
						column: 53
					}
				}, {
					start: {
						line: 11,
						column: 28
					},
					end: {
						line: 13,
						column: 53
					}
				}],
				line: 11
			},
			'2': {
				loc: {
					start: {
						line: 12,
						column: 6
					},
					end: {
						line: 13,
						column: 53
					}
				},
				type: 'if',
				locations: [{
					start: {
						line: 12,
						column: 6
					},
					end: {
						line: 13,
						column: 53
					}
				}, {
					start: {
						line: 12,
						column: 6
					},
					end: {
						line: 13,
						column: 53
					}
				}],
				line: 12
			},
			'3': {
				loc: {
					start: {
						line: 12,
						column: 47
					},
					end: {
						line: 13,
						column: 53
					}
				},
				type: 'if',
				locations: [{
					start: {
						line: 12,
						column: 47
					},
					end: {
						line: 13,
						column: 53
					}
				}, {
					start: {
						line: 12,
						column: 47
					},
					end: {
						line: 13,
						column: 53
					}
				}],
				line: 12
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
									cov_1axbif5cdy.s[9]++;
									entries[functionName] = formulaJs[functionName];
								}
						} else {
						cov_1axbif5cdy.b[2][1]++;
					}
				}
		} else {
		cov_1axbif5cdy.b[0][1]++;
	}
});
exports.name = name;
exports.entries = entries;
exports.default = { name: name, entries: entries };