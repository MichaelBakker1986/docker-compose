var express = require('express');
var app = express();
var request = require('request');
var port = 8081;
app.get('/update', function(req, res) {
    request.post({
            url: 'https://topicus.hipchat.com/v2/room/4235024/notification?auth_token=Y9wJuWSkGbOJb5eMiT7GhCtchoQIsjSY9XRF1voW',
            json: {
                "color": "green",
                "message": "<a href='http://blfif-tv-tr03.finance.lab:8080/public/index.html'>DEMO</a> (yey)",
                "notify": false,
                "message_format": "text"
            }
        },
        function(err, res, body) {
            if (err) {
                return console.info(err)
            }
            console.info(body)
        }
    )
    //https://topicus.hipchat.com/v2/room/4152124/notification?auth_token=Q5buzgT0rw4jICoa3Hd4xo3IPTp0xURsevNwK6wI
    //curl -d '{"color":"green","message":"My first notification (yey)","notify":false,"message_format":"text"}' -H 'Content-Type: application/json' https://topicus.hipchat.com/v2/room/4152124/notification?auth_token=Q5buzgT0rw4jICoa3Hd4xo3IPTp0xURsevNwK6wI
    //do update here
    var exec = require('child_process').exec;
    exec('git pull', function(err, response) {
        if (err) throw err
        console.info('Excecuted git pull [' + response + ']')
    })
    res.end('succes');
});
app.listen(port, function() {
    console.log('Update server running on ' + port + '...');
});