'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.results = undefined;

var _log = require('log6');

var _glob = require('glob');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var excluded_tests = new Set([]); /*
                                   * (i)(!) There is no way to clear State, every doImport will contribute to static state
                                   */

process.alltest = true;
var results = [],
    failures = [],
    performanceTestStartTime = new Date().getTime();

var test_files = _glob.glob.sync('**/*[T|t]est.js');
test_files.filter(function (test) {
	return !excluded_tests.has(test);
}).forEach(function (testName) {
	var startTime = new Date().getTime();
	results.push([testName, startTime, 'start']);
	try {
		require(_path2.default.join(__dirname, testName));
	} catch (e) {
		failures.push(e);
		(0, _log.error)('Error in file:' + testName + '\nDoes the file exist?', e);
	}
	var endTime = new Date().getTime();
	failures.forEach(function (failure) {
		return results.push([testName, failure]);
	});
	results.push([testName, endTime, 'end', endTime - startTime]);
});
var totalTestTime = new Date().getTime() - performanceTestStartTime;
results.push(['performanceTest', 'total', totalTestTime]);

results.forEach(function (testResult) {
	return (0, _log.debug)(testResult);
});
if (totalTestTime > 9500) (0, _log.error)('Total time exceeded');
if (failures.length > 0) {
	(0, _log.error)('A test failed' + failures);
	process.exit(1);
} else (0, _log.info)('All test success in ' + totalTestTime + 'ms');

module.exports = { results: results };
exports.results = results;