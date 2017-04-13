//we have to add the DB tests asap, they are already failing.
//There is no way to clear State, every doImport will contribute to static state
//By design all imports should be put into the same stack, they transparently can inter exchange
//UnloadSolution could be a response
process.alltest = true;
process.loglevel = 'info'
var log = require('ff-log')
var performceTestStartTime = new Date().getTime();
console.time('performance')
var tests = [
    './MathTest.js',//TODO: make integration tests
    './brackParsingTest.js',
    './fflexportTest.js',//.FFL Language
    './fflImportTest.js',//.FFL Language
    './screendefinitionTest.js',//.screen definition
    './uimodelTest.js',//internal logic test, uimodel.js is somewhat unstable, since developed mainly for UI
    './NodeTest.js',
    './jsonValuesTest.js',
    './presentationTest.js'
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

testResults.forEach(function (testResult) {
    log.info(testResult)
})
if (totalTestTime > 910) {
    log.error('Total time exceeded')
}
if (failure.length > 0) {
    log.error('A test failed')
}
else {
    log.info('All test success')
}
console.timeEnd('performance')
module.exports = {
    results: testResults
}