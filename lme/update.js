const port = 8081;
const express = require('express');
var now = require("performance-now")
const app = express();
const httpServer = require('http').createServer(app);
const request = require('request');
const exec = require('child-process-promise').exec;
const spawn = require('child-process-promise').spawn;
let busy = false;
var childProcesses = {}
const hostname = require('os').hostname();
const developer = hostname === 'michael';
const levels = {
    info: {
        level: 'info',
        color: 'green'
    },
    error: {
        levels: 'error',
        color: 'red'
    }
}

function spawnChild(appname, args) {
    var promise = spawn('node', [appname + '.js'], {capture: ['stdout', 'stderr']})
    var childProcess = promise.childProcess;
    childProcesses[appname] = childProcess;
    childProcess.stdout.on('data', function(data) {
        log(data.toString(), 'green');
    });
    childProcess.stderr.on('data', function(data) {
        log(data.toString(), 'red');
    });
    promise.then(function() {
        console.info('done');
    }).catch(function(err) {
        //console.error('ERROR: ', err);
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
            var command = developer ? 'echo a' : 'git reset --hard origin/master && git pull && cd .. && npm install && npm test';
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

app.get('/update/git/notifyCommit', function(req, res) {
    update().then((result) => {
        res.end("" + result);
    }).catch((err) => {
        res.end("" + err);
    })
});

function send(text, level) {
    request.post({
            url: 'https://topicus.hipchat.com/v2/room/4235024/notification?auth_token=' + process.env.HIPCHAT_API_KEY,
            json: {
                "color": level,
                "message": text
            }
        }, (err, res, body) => {
            console.info(err ? "" + err : 'Hipchat post ok')
        }
    )
}

httpServer.listen(port, () => {
    require('dns').lookup(hostname, (err, add, fam) => {
        log('<span>Auto update </span><a href="http://' + add + ":" + port + '/update/git/notifyCommit' + '">server</a><span> deployed</span>');
    })
});

function testAndDeploy() {
    log('Running tests.', 'info')
    var start = now();
    const command = 'cd .. && npm install && npm test'
    exec(command).then(function(result) {
        log('Successful deploy stack in [' + (now() - start).toFixed(3) + ']ms');
        //start sub processes
        spawnChild('../demo-apps/angular-demo/angularapp')
        spawnChild('../demo-apps/adminlte/ltelite')
        spawnChild('lme-model-app')
        spawnChild('../lme-data-api/lme-data-app')

    }).catch(function(err) {
        log('Tests failed after reinstalling modules. NOT deploying stack..', 'red');
        log(err.toString(), 'red');
    });
}

testAndDeploy();

function log(message, levelArg) {
    if (message && hostname !== 'michael') {
        send(message, levelArg || 'green');
    }
    console.info(message);
}

exports.send = send;