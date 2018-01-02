/**
 * The server will not update from remote in developer mode.
 * @type {number}
 */
const port = 8081;
const host = process.env.HOST || '127.0.0.1'
const internal_proxy_port = process.env.INTERNAL_PROXY_PORT || 7081
const domain = process.env.DOMAIN || ('http://' + host + ':' + internal_proxy_port + '/id/guest');
const developer = (host === 'localhost' || host === '127.0.0.1');

const express = require('express');
const now = require("performance-now")
const request = require('request-promise-json');
const app = express();
const path = require('path')

const exec = require('child-process-promise').exec;
const spawn = require('child_process').spawn;
let busyRedeploying = false;
const childProcesses = {}

const debug = process.env.NODE_ENV !== 'production';
const HipchatConnect = require('./Hipchat-connect')

function spawnChildProcess(appname, args) {
    const childProcess = spawn('node', [appname], {maxBuffer: 1024 * 500, capture: ['stdout', 'stderr']})

    childProcesses[appname] = childProcess;
    childProcess.stdout.on('data', (data) => {
        log(data.toString(), 'green');
    });
    childProcess.stderr.on('data', (data) => {
        log(data.toString(), 'red');
    });
    childProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

function redeploy() {
    log('Tests passed deploying stack ');
    for (var key in childProcesses) {
        childProcesses[key].kill('SIGKILL')
        spawnChildProcess(key)
    }
    busyRedeploying = false;
}

function pullBranchAndRedeploy() {
    return new Promise((fulfill, reject) => {
        if (busyRedeploying) {
            reject('Busy restarting.');
        } else {
            let start = now();
            busyRedeploying = true;
            //npm install && bower install
            const command = developer ? 'echo developer test message' : 'git clean -f -x && git stash save --keep-index && git pull && cd .. && npm install && npm test';
            exec(command).then((result) => {
                redeploy()
                fulfill('Successful redeploy stack in [' + (now() - start).toFixed(3) + ']ms');
            }).catch((err) => {
                log('Tests failed, reinstalling modules and try again.', 'green');
                exec('cd .. && npm install && npm test').then((result) => {
                    redeploy()
                    fulfill('Successful redeploy stack in [' + (now() - start).toFixed(3) + ']ms');
                }).catch((err) => {
                    busyRedeploying = false;
                    log(err.toString(), 'red');
                    reject('Fail restarting ' + err)
                });
            });
        }
    });
}

app.get('*/update/git/notifyCommit', (req, res) => {
    pullBranchAndRedeploy().then((result) => {
        res.end(result.toString());
    }).catch((err) => {
        res.end(err.toString());
    })
});

app.get('*/hasUpdates', (req, res) => {
    checkForUpdates().then((result) => {
        res.end(result.toString());
    }).catch((err) => {
        res.end(err.toString());
    })
});

function checkForUpdates() {
    return new Promise((fulfill, reject) => {
        if (developer) return fulfill({hasChanges: false})
        var command = 'git remote update && git status -uno'
        //'git diff --stat origin/master';
        exec(command).then((result) => {
            var hasChanges = result.stdout.indexOf('Your branch is behind') > -1;
            if (hasChanges) {
                exec('git diff --stat origin/master').then((result) => {
                    fulfill(JSON.stringify({
                        hasChanges: hasChanges,
                        changes: result.stdout.toString()
                    }))
                })
            } else {
                fulfill(JSON.stringify({
                    hasChanges: hasChanges,
                    changes: result.stdout.toString()
                }))
            }
        }).catch((err) => {
            log(err.toString(), 'red')
            reject('Fail restarting ' + err.toString())
        });
    });
}


function testAndDeploy() {
    if (!developer) log('Running integration tests on server ' + host, 'info')
    var start = now();
    const command = developer ? 'echo test message' : 'cd .. && npm install && npm test'
    exec(command).then(function(result) {

        spawnChildProcess(path.resolve(__dirname + '/../proxy'))
        spawnChildProcess(path.resolve(__dirname + '/../proxy/SecurityPortal'))
        spawnChildProcess(path.resolve(__dirname + '/../lme-model-api'))
        spawnChildProcess(path.resolve(__dirname + '/../demo-apps'))
        spawnChildProcess(path.resolve(__dirname + '/../lme-data-api'))
        registerToProxy()
        log('Successful deploy application ' + host + ' in ' + ((now() - start) / 1000).toFixed(3) + 's');
    }).catch(function(err) {
        log('Tests failed after reinstalling modules. NOT deploying stack..', 'red');
        log(err.toString(), 'red');
    });
}

function registerToProxy() {
    //just delay the action...
    setTimeout(function() {
        const routes = []
        app._router.stack.forEach(function(r) {
            if (r.route && r.route.path) {
                routes.push(r.route.path)
            }
        })
        request.get('http://' + host + ':' + internal_proxy_port + '/register/service/update-api/' + host + '/' + port + '/' + routes.join(',')).then(function(data) {
            if (log.DEBUG) log.debug(data);
        }).catch(function(err) {
            log.error('Failed to register ', err);
        });
    }, 10000)
}

app.listen(port, () => {
    if (developer) registerToProxy()
    log('<span>Auto update </span><a href="http://' + domain + '/update/git/notifyCommit">server</a><span> deployed</span>');
});

function log(message, level) {
    HipchatConnect.log(message, level)
}

testAndDeploy();