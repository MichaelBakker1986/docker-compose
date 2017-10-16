var express = require('express');
var app = express();
var httpServer = require('http').createServer(app);
var request = require('request');
var port = 8081;
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var server;
var busy = false;
var childprocess;
//Ok, ik ga dus de app.js stoppen. een nieuwe staten als child, daarna mezelf stoppen
app.get('/update', function(req, res) {
    try {
        if (busy) {
            res.end('budy');
            return;
        }
        busy = true;
        res.end('succes');
        console.info('Called update')
        //git reset --hard origin/master
        exec('echo "a", function(err, response) {
            if (err) throw err
            //  send("<span>Git update</span>")
            //do update here
            exec('git pull', function(err, response) {
                if (err) throw err
                console.info('Excecuted git pull [' + response + ']')
                // send("<span>Restart server</span>");
                childprocess.kill('SIGINT');
                childprocess = spawn('node app', function(err, response) {
                    if (err) throw err
                    console.info('Killed all node processes [' + response + ']')
                    //send("<span>Killed all node processes</span>")
                    busy = false;
                });
            })
        })
    } catch (err) {
        busy = false;
        httpServer.listen(port, function() {
            console.log('Update server running on ' + port + '...');
        });
    }
});

function send(text) {
    request.post({
            url: 'https://topicus.hipchat.com/v2/room/4235024/notification?auth_token=Y9wJuWSkGbOJb5eMiT7GhCtchoQIsjSY9XRF1voW',
            json: {
                "color": "green",
                "message": text
            }
        },
        function(err, res, body) {
            if (err) {
                return console.info(err)
            }
            console.info(body)
        }
    )
}

httpServer.listen(port, function() {
    console.log('Update server running on ' + port + '...');
});