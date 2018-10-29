'use strict';

var cov_voirihup3 = function () {
	var path = 'C:\\Users\\michael\\Documents\\lme\\lme-model-api\\index.js',
	    hash = '0311da39c48511cb266df1ec33837fc00fa4fc56',
	    Function = function () {}.constructor,
	    global = new Function('return this')(),
	    gcv = '__coverage__',
	    coverageData = {
		path: 'C:\\Users\\michael\\Documents\\lme\\lme-model-api\\index.js',
		statementMap: {},
		fnMap: {},
		branchMap: {},
		s: {},
		f: {},
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
exports.LmeAPI = undefined;

var _lme = require('./src/lme');

exports.LmeAPI = _lme.LmeAPI;