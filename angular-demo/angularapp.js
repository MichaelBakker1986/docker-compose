var express = require('express');
var request = require('request');
var app = express();
var port = 8083;
var serveStatic = require('serve-static');
var compression = require('compression')
app.use(serveStatic(__dirname + "/public/"));
app.use(serveStatic(__dirname + "/bower_components/"));
app.use(require('express-favicon')());
app.listen(port, function() {
    require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        let message = '<a href="http://' + add + ':' + port + '/index.html">Angular DEMO Server</a><span> deployed.</span>';
        request.post({
            url: 'https://topicus.hipchat.com/v2/room/4235024/notification?auth_token=Y9wJuWSkGbOJb5eMiT7GhCtchoQIsjSY9XRF1voW',
            json: {
                "color": 'green',
                "message": message
            }
        })
        console.log(message);
    })
});