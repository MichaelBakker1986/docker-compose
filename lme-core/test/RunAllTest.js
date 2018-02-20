/*
 * (i)(!) There is no way to clear State, every doImport will contribute to static state
 */
process.alltest = true;
const log = require('log6')
const performceTestStartTime = new Date().getTime();
const tests = [
    './MathTest',
    './xaxisTest',
    './FormulaSetTest',
    './fflexportTest',//.FFL Language
    './screendefinitionTest',//.screen definition
    './webexportTest',
    './jsonValuesTest',
    './APIIntegrationTest',
    './CaseTest',
    './RegisterTest',
    './FinChoiceTest',
    './SwaggerDefinitionParserTest',
    './TimeTest',
    './BasicOperationsTest',
    './ChangeManagerTest',
    './TupleTests'//should include all Tuple logic tests.
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
        log.error('Error in file:' + testName, e);
    }
    var endTime = new Date().getTime();

    for (var j = 0; j < failure.length; j++) {
        var obj = failure[j];
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
    process.exit(1);
}
else {
    log.info('All test success in ' + totalTestTime + 'ms')
}
module.exports = {
    results: testResults
}