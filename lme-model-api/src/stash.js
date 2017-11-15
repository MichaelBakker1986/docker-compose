const exec = require('child-process-promise').exec;
const log = require('ff-log');
const dns = require('dns');
const hostname = require('os').hostname();
const develop = hostname == 'michael';
let host;
//make git ls-files-root alias
exec('git config --global alias.ls-files-root "! git ls-files"')
const write = require('fs-writefile-promise/lib/node7')
const uuid = require('uuid4');

class Stash {
    constructor() {
        dns.lookup(hostname, (err, add, fam) => {
            host = add;
        })
    }

    preview(name, data, lme) {

        var tempHash = '_tmp_' + uuid() + "_" + name;
        return write(__dirname + '/../../ff-ssh-git/resources/' + tempHash + '.ffl', data)
            .then(function(filename) {
                return exec('node ' + __dirname + '/exportLME_FFL.js ' + tempHash).then((result) => {
                    let userID = uuid();
                    console.info('<span>Temporally model update:</span><a href="http://' + host + ':8083/id/' + userID + '/grid_example.html#' + tempHash + '&' + userID + '">' + name + '</a><span></span>');
                    return tempHash;
                }).catch((err) => {
                    throw Error('Failed to write or compile javascript', err);
                })
            }).catch(function(err) {
                throw Error('Failed to write file to resources folder', err);
            })
    }

    commit(name, data, lme) {
        //transform ffl to JSON canvas file
        return Promise.all([write(__dirname + '/../../ff-ssh-git/resources/' + name + '.ffl', data)])
            .then(function(filename) {
                return Promise.all([exec('node ' + __dirname + '/exportLME_FFL.js ' + name), exec('node ' + __dirname + '/exportLME_FFL_angular.js ' + name)]).then((result) => {
                    let userID = uuid();
                    if (develop) {
                        console.info('<span>ffl model update:</span><a href="http://' + host + ':8083/id/' + userID + '/#' + name + '&' + userID + '">' + name + '</a><span></span>');
                        log.info("DEMO user modified model file: [" + filename + "]. Begin pushing to repository.") //=> '/tmp/foo'
                        return "develop mode";
                    }
                    let command = 'git pull &&  git commit -a -m "Update ' + name + ' by DEMO" && git push && git rev-parse HEAD';
                    return exec(command).then((ok) => {
                        var output = ok.stdout.split('\n');
                        const stashCommit = '<a href="https://stash.topicus.nl/projects/FF/repos/fesjs/commits/' + output[output.length - 2] + '"> DIFF </a>'

                        console.info('<a href="http://' + host + ':8083/id/' + userID + '#' + name + '&' + userID + '"> ' + name + ' </a><span> Updated </span>' + stashCommit + '<span> By DEMO</span>');
                    }).catch((err) => {
                        throw Error('GIT commit failed while pushing file to repository:', err)
                    })
                }).catch((err) => {
                    throw Error('Failed to write or compile javascript', err);
                })
            }).catch(function(err) {
                throw Error('Failed to write file to resources folder', err);
            })
    }

    models(branch, path) {
        let command = develop ? "git ls-files-root *." + path : "git checkout " + branch + " -q && git pull -q && git ls-files-root *." + path;
        //log.info("Do command: [" + command + "]");
        return exec(command)
            .then(function(result) {
                return result.stdout.split('\n');
            }).catch(function(err) {
                if (err.code === 1) {
                    log.debug('while requesting ffl-models, cannot connect to remote git, falling back to local')
                    return exec("git ls-files-root *." + path).then((result) => {
                        return result.stdout.split('\n');
                    }).catch((err) => {
                        throw Error('Cannot list files at all', err)
                    })
                } else {
                    throw Error('Failed to read local models.', err)
                }
            });
    }

    branches() {
        let command = develop ? "git branch" : "git ls-remote --heads";
        //log.info("Do command: [" + command + "]");
        return exec(command)
            .then(function(result) {
                //split results with tabs and newlines, extract only the branchnames
                return result.stdout.split(/\t|\n/).filter((element, index, array) => {
                    return (index % 2 !== 0);
                });
            }).catch(function(err) {
                if (err.code === 128) {
                    log.debug('while requesting remote branches, cannot connect to remote git, falling back to local')
                    return exec('git branch').then((result) => {
                        return result.stdout.split(/\t|\n/).filter((element, index, array) => {
                            return (index % 2 === 0);
                        });
                    }).catch((err) => {
                        throw Error('Cannot resolve branches at all', err)
                    });
                } else {
                    throw Error('Failed to resolve branches.', err.toString())
                }
            });
    }
}

exports.Stash = new Stash();