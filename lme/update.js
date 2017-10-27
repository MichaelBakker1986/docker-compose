const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const request = require('request');
const port = 8081;
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
    var promise = spawn('node', [appname + '.js'])
    var childProcess = promise.childProcess;
    childProcesses[appname] = childProcess;
    childProcess.stdout.on('data', function(data) {
        log('' + data, 'info');
    });
    childProcess.stderr.on('data', function(data) {
        log('' + data, 'error');
    });
    childProcess.on('exit', function() {
        return '';
    });
    promise.then(() => {
        console.info('done');
    }).catch(function(err) {
        //console.error('ERROR: ', err);
    });
}


function update() {
    return new Promise((fulfill, reject) => {
        if (busy) {
            reject('Busy restarting');
        } else {
            busy = true;
            //npm install && bower install
            var command = developer ? 'echo a' : 'git reset --hard origin/master && git pull && cd .. && npm test';
            exec(command).then((result) => {
                log(result.stdout)
                for (var key in childProcesses) {
                    childProcesses[key].kill('SIGKILL')
                    spawnChild(key)
                }
                busy = false;
                fulfill('Succes restarting');
            }).catch((err) => {
                busy = false;
                log('Fail [' + err + ']')
                reject('Fail restarting ' + err)
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
    //Y9wJuWSkGbOJb5eMiT7GhCtchoQIsjSY9XRF1voW
    request.post({
            url: 'https://topicus.hipchat.com/v2/room/4235024/notification?auth_token=' + process.env.HIPCHAT_API_KEY,
            json: {
                "color": 'green',
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
    const command = 'cd .. && npm install && npm test'
    exec(command).then((data) => {
        console.info(data.stdout)
        log('Tests passed deploying stack ');
        //start sub processes
        spawnChild('../demo-apps/angular-demo/angularapp')
        spawnChild('../demo-apps/adminlte/ltelite')
        spawnChild('app')

    }).catch(function(err) {
        log('Tests failed NOT deploying stack, and here the very readable Error. .');
        log(err);
    });
}

testAndDeploy();

function log(message, levelArg) {
    if (message && hostname !== 'michael') {
        send(message, 'info');
    }
    console.info(message);
}