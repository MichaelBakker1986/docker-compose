var request = require('request')
var rp = require('request-promise');
var rpJSON = require('request-promise-json');
var exec = require('child-process-promise').exec;
var log = require('ff-log');
var browser = require('browserify');
var fastjson = require('browserify-fastjson');
var fs = require('fs')
var develop = require('os').hostname() == 'michael';
//make git ls-files-root alias
exec('git config --global alias.ls-files-root "! git ls-files"')
const write = require('fs-writefile-promise/lib/node7')

class Stash {

    commit(name, data, lme) {
        //transform ffl to JSON canvas file
        return Promise.all([write('./public/json/' + name + '.ffl', data)])
            .then(function(filename) {
                return Promise.all([exec('node src/exportLME_FFL.js ' + name), exec('node src/exportLME_FFL_angular.js ' + name)]).then((result) => {
                    if (develop) {
                        log.info("DEMO user modified model file: [" + filename + "]. Begin pushing to repository.") //=> '/tmp/foo'
                        return "develop mode";
                    }
                    let command = "git pull &&  git add . && git commit -m changeByDEMO && git push";
                    return exec(command).then((ok) => {
                        log.info("GIT commit success while pushing file to repository: " + filename)
                    }).catch((err) => {
                        log.error("GIT commit failed while pushing file to repository: [" + err + "]")
                    })
                }).catch((err) => {
                    log.error('fail' + err.toString())
                })
            }).catch(function(err) {
                log.error(err)
            })
    }

    models(branch, path) {
        let command = "git checkout " + branch + " -q && git pull -q && git ls-files-root *." + path;
        //log.info("Do command: [" + command + "]");
        return exec(command)
            .then(function(result) {
                return result.stdout.split('\n');
            }).catch(function(err) {
                if (err.code === 1) {
                    log.warn('while requesting ffl-models, cannot connect to remote git, falling back to local')
                    return exec("git ls-files-root *." + path).then((result) => {
                        return result.stdout.split('\n');
                    }).catch((err) => {
                        log.warn('Cannot list files at all')
                        return "";
                    })
                } else {
                    log.error('ERROR: ', err);
                    return "";
                }
            });
    }

    branches() {
        let command = "git ls-remote --heads";
        //log.info("Do command: [" + command + "]");
        return exec(command)
            .then(function(result) {
                //split results with tabs and newlines, extract only the branchnames
                return result.stdout.split(/\t|\n/).filter((element, index, array) => {
                    return (index % 2 !== 0);
                });
            }).catch(function(err) {
                if (err.code === 128) {
                    log.warn('while requesting remote branches, cannot connect to remote git, falling back to local')
                    return exec('git branch').then((result) => {
                        return result.stdout.split(/\t|\n/).filter((element, index, array) => {
                            return (index % 2 === 0);
                        });
                    }).catch((err) => {
                        log.warn('Cannot resolve branches at all')
                        return ""
                    });
                } else {
                    log.error('ERROR: ', err);
                }
                return [];
            });
    }
}

module.exports = Stash.prototype;