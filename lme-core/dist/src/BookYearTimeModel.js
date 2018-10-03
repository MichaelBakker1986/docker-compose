'use strict';

var cov_1so9hbx985 = function () {
	var path = 'C:\\Users\\mbakk\\Documents\\fesjs\\lme-core\\src\\BookYearTimeModel.js',
	    hash = '1f8363339c63024092ac1e3f60505379b02e64b3',
	    Function = function () {}.constructor,
	    global = new Function('return this')(),
	    gcv = '__coverage__',
	    coverageData = {
		path: 'C:\\Users\\mbakk\\Documents\\fesjs\\lme-core\\src\\BookYearTimeModel.js',
		statementMap: {
			'0': {
				start: {
					line: 2,
					column: 1
				},
				end: {
					line: 81,
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
						line: 82,
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
	cov_1so9hbx985.f[0]++;
	cov_1so9hbx985.s[0]++;

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
				'children': [],
				'name': 'bkyr',
				'size': 1
			}],
			'idx': 20,
			'name': 'all',
			'no': 0,
			'period': [{
				'formulasetId': 0,
				'hash': 0,
				'idx': 19
			}, {
				'formulasetId': 1,
				'hash': 1,
				'idx': 20
			}],
			'size': 20
		},
		'navalue': 1e-100,
		'nestedTupleMultiplier': 'undefined',
		'time': {
			'columnMultiplier': 1,
			'columnSize': 20,
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
				'name': 'Not_USED'
			}]
		},
		'tupleMultiplier': 32768
	};
};