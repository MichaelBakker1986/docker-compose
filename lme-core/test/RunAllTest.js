/*
 * There is no way to clear State, every doImport will contribute to static state
 */
process.alltest = true;
var log = require('ff-log')
var performceTestStartTime = new Date().getTime();
var tests = [
    './MathTest',
    './xaxisTest',
    './fflexportTest',//.FFL Language
    './screendefinitionTest',//.screen definition
    './jsonValuesTest',
    './tupleTest',
    './apiTest',
    './TrendNoTrendTest',
    './CaseTest',
    './RegisterTest',
    './FinChoiceTest',
    './SwaggerDefinitionParserTest',
    './TupleSumTest',
    './TupleIndexConverterTest',
    './TimeTest'
];
var testResults = [];
var failure = [];
for (var i = 0; i < tests.length; i++) {

    var testName = tests[i];
    var startTime = new Date().getTime();
    testResults.push([testName, startTime, 'start']);
    try {
        require(testName);
    }
    catch (e) {
        failure.push(e);
        log.error(testName);
        log.log(e.stack);
    }
    var endTime = new Date().getTime();

    for (var j = 0; j < failure.length; j++) {
        var obj = failure[j];
        log.error(obj);
        testResults.push([testName, obj]);
    }
    testResults.push([testName, endTime, 'end', (endTime - startTime)]);
}
var totalTestTime = (new Date().getTime() - performceTestStartTime);
testResults.push(['performceTest', 'total', totalTestTime]);

testResults.forEach(function(testResult) {
    log.debug(testResult)
})
if (totalTestTime > 3500) {
    log.error('Total time exceeded')
}
if (failure.length > 0) {
    log.error('A test failed' + failure)
    throw Error('A test failed', failure);
}
else {
    log.info('All test success in ' + totalTestTime + 'ms')
}
module.exports = {
    results: testResults
}