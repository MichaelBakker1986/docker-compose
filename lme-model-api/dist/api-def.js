'use strict';

var cov_14y7u6djkv = function () {
	var path = 'C:\\Users\\michael\\Documents\\lme\\lme-model-api\\api-def.js',
	    hash = 'fd078c31a52f6d832fc5532b0a2b504c360b5b3b',
	    Function = function () {}.constructor,
	    global = new Function('return this')(),
	    gcv = '__coverage__',
	    coverageData = {
		path: 'C:\\Users\\michael\\Documents\\lme\\lme-model-api\\api-def.js',
		statementMap: {
			'0': {
				start: {
					line: 1,
					column: 21
				},
				end: {
					line: 10,
					column: 1
				}
			},
			'1': {
				start: {
					line: 3,
					column: 1
				},
				end: {
					line: 9,
					column: 3
				}
			},
			'2': {
				start: {
					line: 4,
					column: 13
				},
				end: {
					line: 4,
					column: 28
				}
			},
			'3': {
				start: {
					line: 5,
					column: 13
				},
				end: {
					line: 5,
					column: 28
				}
			},
			'4': {
				start: {
					line: 6,
					column: 20
				},
				end: {
					line: 6,
					column: 55
				}
			},
			'5': {
				start: {
					line: 7,
					column: 2
				},
				end: {
					line: 7,
					column: 38
				}
			},
			'6': {
				start: {
					line: 8,
					column: 2
				},
				end: {
					line: 8,
					column: 23
				}
			}
		},
		fnMap: {
			'0': {
				name: '(anonymous_0)',
				decl: {
					start: {
						line: 1,
						column: 21
					},
					end: {
						line: 1,
						column: 22
					}
				},
				loc: {
					start: {
						line: 1,
						column: 35
					},
					end: {
						line: 10,
						column: 1
					}
				},
				line: 1
			},
			'1': {
				name: '(anonymous_1)',
				decl: {
					start: {
						line: 3,
						column: 29
					},
					end: {
						line: 3,
						column: 30
					}
				},
				loc: {
					start: {
						line: 3,
						column: 43
					},
					end: {
						line: 9,
						column: 2
					}
				},
				line: 3
			}
		},
		branchMap: {},
		s: {
			'0': 0,
			'1': 0,
			'2': 0,
			'3': 0,
			'4': 0,
			'5': 0,
			'6': 0
		},
		f: {
			'0': 0,
			'1': 0
		},
		b: {},
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
cov_14y7u6djkv.s[0]++;
var setup = exports.setup = function setup(app) {
	cov_14y7u6djkv.f[0]++;
	cov_14y7u6djkv.s[1]++;

	// swagger definition
	app.get('*/model-api-docs', function (req, res) {
		cov_14y7u6djkv.f[1]++;

		var port = (cov_14y7u6djkv.s[2]++, app.get('port'));
		var host = (cov_14y7u6djkv.s[3]++, app.get('host'));
		var swaggerData = (cov_14y7u6djkv.s[4]++, require(__dirname + '/apidef.json'));
		cov_14y7u6djkv.s[5]++;
		swaggerData.host = host + ':' + port;
		cov_14y7u6djkv.s[6]++;
		res.json(swaggerData);
	});
};