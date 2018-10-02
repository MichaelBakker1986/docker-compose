'use strict';

var cov_12qwcjf81u = function () {
	var path = 'C:\\Users\\mbakk\\Documents\\fesjs\\lme-core\\src\\CustomImport.js',
	    hash = '6262976a1cfd1167ff67f0e64186887e75a06859',
	    Function = function () {}.constructor,
	    global = new Function('return this')(),
	    gcv = '__coverage__',
	    coverageData = {
		path: 'C:\\Users\\mbakk\\Documents\\fesjs\\lme-core\\src\\CustomImport.js',
		statementMap: {
			'0': {
				start: {
					line: 2,
					column: 1
				},
				end: {
					line: 112,
					column: 2
				}
			}
		},
		fnMap: {
			'0': {
				name: '(anonymous_0)',
				decl: {
					start: {
						line: 1,
						column: 15
					},
					end: {
						line: 1,
						column: 16
					}
				},
				loc: {
					start: {
						line: 1,
						column: 26
					},
					end: {
						line: 113,
						column: 1
					}
				},
				line: 1
			}
		},
		branchMap: {},
		s: {
			'0': 0
		},
		f: {
			'0': 0
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

exports.default = function () {
	cov_12qwcjf81u.f[0]++;
	cov_12qwcjf81u.s[0]++;

	return {
		'formulasets': [{
			'formulasetId': 0,
			'name': 'notrend'
		}, {
			'formulasetId': 1,
			'name': 'trend'
		}, {
			'formulasetId': 2,
			'name': 'user'
		}, {
			'formulasetId': 3,
			'name': 'sector'
		}, {
			'formulasetId': 4,
			'name': 'aggregation'
		}],
		'layout': {
			'children': [{
				'children': [{
					'children': [{
						'children': [{
							'children': [],
							'name': 'detl',
							'size': 1
						}],
						'name': 'qurt',
						'size': 4
					}],
					'name': 'half',
					'size': 9
				}],
				'name': 'bkyr',
				'size': 19
			}],
			'children13period': [{
				'children': [{
					'children': [],
					'name': 'detl',
					'size': 1
				}],
				'name': 'bkyr',
				'size': 13
			}],
			'idx': 400,
			'name': 'all',
			'no': 0,
			'period': [{
				'formulasetId': 0,
				'hash': 0,
				'idx': 19
			}, {
				'formulasetId': 1,
				'hash': 1,
				'idx': 400
			}],
			'size': 400
		},
		'navalue': 1e-10,
		'nestedTupleMultiplier': 'undefined',
		'time': {
			'columnMultiplier': 1,
			'columnSize': 400,
			'columns': [{
				'index': 0,
				'name': 'jan/p1'
			}, {
				'index': 1,
				'name': 'fes/p2'
			}, {
				'index': 2,
				'name': 'mar/p3'
			}],
			'periodMultiplier': 1,
			'periodSize': 2,
			'timelineMultiplier': 256,
			'timelineSize': 1,
			'timelines': [{
				'index': 0,
				'name': 'ExpertOptie-level5'
			}]
		},
		'tupleMultiplier': 32768
	};
};