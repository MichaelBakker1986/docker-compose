var express = require('express');
var app = express();
var request = require('request');
var port = 8081;
var exec = require('child_process').exec;
var server;
//Ok, ik ga dus de app.js stoppen. een nieuwe staten als child, daarna mezelf stoppen
app.get('/update', function(req, res) {
    res.end('succes');
    console.info('Called update')
    //pkill -f node
    exec('git reset --hard origin/master', function(err, response) {
        if (err) throw err
        send("<span>Git update</span>")
        //do update here
        exec('git pull', function(err, response) {
            if (err) throw err
            console.info('Excecuted git pull [' + response + ']')
            send("<span>Restart server</span>");
            server.close();
            send("<span>Closed appserver</span>");
            exec('node update', function(err, response) {
                if (err) throw err
                console.info('Killed all node processes [' + response + ']')
                process.kill();
                send("<span>Killed all node processes</span>")
            })
        })
    })
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

server = app.listen(port, function() {
    console.log('Update server running on ' + port + '...');
});