var express = require('express');
var app = express();
var httpServer = require('http').createServer(app);
var request = require('request');
var port = 8081;
var exec = require('child-process-promise').exec;
var spawn = require('child-process-promise').spawn;
var busy = false;
var childProcesses = {}
var hostname = require('os').hostname();
var developer = hostname === 'michael';
var levels = {
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
            var command = developer ? 'echo a' : 'git reset --hard origin/master && git pull && npm install && bower install';
            exec(command).then((result) => {
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
    request.post({
            url: 'https://topicus.hipchat.com/v2/room/4235024/notification?auth_token=Y9wJuWSkGbOJb5eMiT7GhCtchoQIsjSY9XRF1voW',
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
//start sub processes
spawnChild('../demo-apps/angular-demo/angularapp')
spawnChild('app')

function log(message, levelArg) {
    if (message && hostname !== 'michael') {
        send(message, 'info');
    }
    console.info(message);
}