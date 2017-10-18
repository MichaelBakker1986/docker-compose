var express = require('express');
var app = express();
var httpServer = require('http').createServer(app);
var request = require('request');
var port = 8081;
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var server;
var busy = false;
var child;
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

function spawnChild() {
    child = spawn('node', ['app.js']);
    child.on('exit', function() {
        console.info('Appserver down')
    });
    child.stdout.on('data', function(data) {
        log('' + data, 'info');
    });
    child.stderr.on('data', function(data) {
        log('' + data, 'error');
    });
}

app.get('/update/git/notifyCommit', (req, res) => {
    try {
        if (busy) {
            res.end('Busy restarting');
            return;
        }
        busy = true;
        res.end('Succes restarting');
        exec('git reset --hard origin/master', function(err, response) {
            if (err) throw err
            exec('git pull && npm install', function(err, response) {
                if (err) throw err
                log('<span>Restarting server</span>');
                if (child) {
                    child.kill('SIGINT');
                }
                spawnChild();
                busy = false;
            })
        })
    } catch (err) {
        busy = false;
        log('Fail [' + err + ']')
    }
});

function send(text, level) {
    request.post({
            url: 'https://topicus.hipchat.com/v2/room/4235024/notification?auth_token=Y9wJuWSkGbOJb5eMiT7GhCtchoQIsjSY9XRF1voW',
            json: {
                "color": 'green',
                "message": text
            }
        },
        (err, res, body) => {
            if (err) {
                return console.info('error:' + res)
            }
            console.info('Hipchat post ok')
        }
    )
}

httpServer.listen(port, () => {
    require('dns').lookup(require('os').hostname(), (err, add, fam) => {
        log('<span>Auto update </span><a href="http://' + add + ":" + port + '/update/git/notifyCommit' + '">server</a><span> deployed</span>');
    })
});
spawnChild();
function log(message, levelArg) {
    if (message) {
        send(message, 'info');
    }
    console.info(message);
}