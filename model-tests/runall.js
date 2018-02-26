/**
 * Find all *.test in model-test
 * Run them all in separate processes.
 * (!) don't call this class Test, it will be cyclic.
 **/
const FileWalker = require('../git-connect/FileWalker'),
      exec       = require('child-process-promise').exec,
      log        = require('log6'),
      path       = require('path')

const modelTests = new FileWalker(__dirname + '/', ['*Test*', '*/*Test*', '*/*/*Test*', '*/*/*/*Test*', '*/*/*/*/*Test*'], '.js');
modelTests.walk(function(file_path) {
    if (file_path.indexOf('node_modules') > -1) return [file_path, true, 'Skipped']  //exclude 3rd party.
    if (log.DEBUG) log.debug('exec[' + file_path + ']')
    return exec('node "' + file_path + '"').then(function(result) {
        //check outputs
        if (result.stderr) return [file_path, false, result.stderr]
        else return [file_path, true, result.stdout]
    }).catch(function(err) {
        return [file_path, false, err.toString()]
    })
}, true).then(function(results) {
    var all_succes = true;
    //check results
    for (var i = 0; i < results.length; i++) {
        const result = results[i];
        if (!result[1]) all_succes = false
        if (log.DEBUG) log.debug(result[0] + '-' + result[1] + ' because ' + result[2])
    }
    if (!all_succes) {
        log.error('At least one test failes in model-tests')
        for (var i = 0; i < results.length; i++) {
            const result = results[i];
            if (!result[1]) log.error(result[0] + ' failed. Because ' + result[2])
        }
        process.exit(1)
    } else {
        log.info('All tests succes in model-tests')
    }
})