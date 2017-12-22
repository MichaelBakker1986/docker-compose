const port = 8081;
const express = require('express');
const host = process.env.HOST || 'localhost'
var now = require("performance-now")
const app = express();
const path = require('path')
const httpServer = require('http').createServer(app);
const request = require('request');
const exec = require('child-process-promise').exec;
const spawn = require('child_process').spawn;
let busy = false;
var childProcesses = {}
const developer = (host === 'localhost');
var debug = process.env.NODE_ENV !== 'production';

function spawnChild(appname, args) {
    const childProcess = spawn('node', [appname], {capture: ['stdout', 'stderr']})

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

function reDeploy() {
    log('Tests passed deploying stack ');
    for (var key in childProcesses) {
        childProcesses[key].kill('SIGKILL')
        spawnChild(key)
    }
    busy = false;
}

function update() {
    return new Promise((fulfill, reject) => {
        if (busy) {
            reject('Busy restarting.');
        } else {
            var start = now();
            busy = true;
            //npm install && bower install
            var command = developer ? 'echo a' : 'git clean -f -x && git stash save --keep-index && git pull && cd .. && npm install && npm test';
            exec(command).then((result) => {
                reDeploy()
                fulfill('Successful redeploy stack in [' + (now() - start).toFixed(3) + ']ms');
            }).catch((err) => {
                log('Tests failed, reinstalling modules and try again.', 'green');
                exec('cd .. && npm install && npm test').then(function(result) {
                    reDeploy()
                    fulfill('Successful redeploy stack in [' + (now() - start).toFixed(3) + ']ms');
                }).catch((err) => {
                    busy = false;
                    log(err.toString(), 'red');
                    reject('Fail restarting ' + err)
                });
            });
        }
    });
}

app.get('*/update/git/notifyCommit', function(req, res) {
    update().then((result) => {
        res.end(result.toString());
    }).catch((err) => {
        res.end(err.toString());
    })
});

app.get('*/hasUpdates', function(req, res) {
    checkForUpdates().then((result) => {
        res.end(result.toString());
    }).catch((err) => {
        res.end(err.toString());
    })
});

function checkForUpdates() {
    return new Promise((fulfill, reject) => {
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

function send(text, level) {
    request.post({
            url: 'https://topicus.hipchat.com/v2/room/4235024/notification?auth_token=' + process.env.HIPCHAT_API_KEY,
            json: {
                "color": level,
                "message": "[" + host + "] " + text
            }
        }, (err, res, body) => {
            console.info(err ? "" + err : 'Hipchat post ok')
        }
    )
}

httpServer.listen(port, () => {
    log('<span>Auto update </span><a href="http://' + host + ":" + port + '/update/git/notifyCommit' + '">server</a><span> deployed</span>');
});

function testAndDeploy() {
    log('Running integration tests on server ' + host, 'info')
    var start = now();
    const command = developer ? 'echo a' : 'cd .. && npm install && npm test'
    exec(command).then(function(result) {
        log('Successful deploy application ' + host + ' in ' + ((now() - start) / 1000).toFixed(3) + 's');
        spawnChild(path.resolve(__dirname + '/../proxy'))
        spawnChild(path.resolve(__dirname + '/../demo-apps'))
        spawnChild(path.resolve(__dirname + '/../lme-model-api'))
        spawnChild(path.resolve(__dirname + '/../lme-data-api'))
    }).catch(function(err) {
        log('Tests failed after reinstalling modules. NOT deploying stack..', 'red');
        log(err.toString(), 'red');
    });
}

testAndDeploy();

function log(message, levelArg) {
    if (message && !developer) {
        send(message, levelArg || 'green');
    }
    console.info(message);
}

exports.send = send;