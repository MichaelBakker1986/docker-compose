var express = require('express');
var app = express();
var port = 8081;
app.get('/update', function(req, res) {
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