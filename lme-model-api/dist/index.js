'use strict';

var cov_2be0d32h2r = function () {
	var path = 'C:\\Users\\mbakk\\Documents\\fesjs\\lme-model-api\\index.js',
	    hash = 'db8b9149e5ff9d5aa75d7a4193e602632f00d77c',
	    Function = function () {}.constructor,
	    global = new Function('return this')(),
	    gcv = '__coverage__',
	    coverageData = {
		path: 'C:\\Users\\mbakk\\Documents\\fesjs\\lme-model-api\\index.js',
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