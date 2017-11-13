/**
 * This test will take a jBehave test, execute it. Store it to data-api, retrieve saved data and validate it.
 * Repeat this until the server breaks.
 * For now we take MVO story.
 */
const exec = require('child-process-promise').exec;
const now = require('performance-now')
const log = require('ff-log')

function call(batchId) {
    return exec('node LoadTestClientEnvironment.js MVO ' + __dirname + '/../../model-tests/MVO/mvo.story').then(function(res) {
        log.debug(batchId + ':' + res.stdout)
    })
}

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

function doBatch(batchId) {
    if (batchId == 10000) {
        return;
    }
    var promises = [];
    for (var batchSizeIndex = 0; batchSizeIndex < 5; batchSizeIndex++) {
        promises.push(call(batchId + "_" + batchSizeIndex))
    }
    var start = now();
    Promise.all(promises).then((res) => {
        log.info('batch done in ' + (now() - start).toFixed())
        sleep(1000).then(data => doBatch(batchId + 1))
    })
}

doBatch(1)
