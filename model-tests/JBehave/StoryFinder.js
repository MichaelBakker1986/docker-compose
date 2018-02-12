/**
 * Find all .story in model-tests
 * Match them with a *.ffl model-file
 * Call the JBehaveStoryParser to execute vs Financial Model File
 */
const Walker = require('../../git-connect/FileWalker').FileWalker
const walker = new Walker(__dirname + '/../', ['*', '*/*', '*/*/*', '*/*/*/*', '*/*/*/*'], '.story');
const walker2 = new Walker(__dirname + '/../../lme-core/', ['*', '*/*', '*/*/*', '*/*/*/*', '*/*/*/*'], '.story');
const fs = require('fs')
const path = require('path')
const log = require('log6')
const exec = require('child-process-promise').exec;

const visit = function(file) {
    fs.exists(file.replace(/(\(\w+\))?\.story/gm, '.ffl'), function(exists) {
            if (exists) {
                const fflFile = file.replace(/(\(\w+\))?\.story/gm, '.ffl');
                const jbehaveStoryFile = file;
                const modelName = path.basename(fflFile).replace('.ffl', '')

                const command = 'node ' + __dirname + '/StoryExecutor.js ' + [modelName, fflFile, jbehaveStoryFile].join(' ');
                exec(command).then((result) => {
                    log.info('Success story ' + file)
                }).catch((err) => {
                    log.error('Fail story ' + err.toString())
                });
            } else {
                log.info('Story has no matching ffl file [' + file + ']')
            }
        }
    )
};
walker.walk(visit, true)
walker2.walk(visit, true)