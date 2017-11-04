var express = require('express');
var request = require('request');

var fs = require('fs')
var port = 8083;
var serveStatic = require('serve-static');
var compression = require('compression')
var app = express();
app.use(require('express-favicon')());
app.use(require('cors')());
app.use(compression())
app.use(serveStatic(__dirname + "/public/"));
app.use('/showcase', serveStatic(__dirname + "/../showcase/"));
app.use(serveStatic(__dirname + "/CONFIGURATION/"));
app.use(serveStatic(__dirname + "/bower_components/"));
app.use(serveStatic(__dirname + "/../adminlte/dist/"));

app.get('/id/:id', function(req, res) {
    request.get('http://' + require('os').hostname() + ':8085/id/' + req.params.id).on('error', (err) => {
        res.send(err.toString())
    }).pipe(res)
});
app.get('/:id/transformFFL_LME/*', function(req, res) {
    let modelName = req.originalUrl.substring(req.originalUrl.indexOf('transformFFL_LME/') + 17);
    request.get('http://' + require('os').hostname() + ':8080/DEMO/transformFFL_LME/' + modelName).on('error', (err) => {
        res.send(err.toString())
    }).pipe(res)
});
app.listen(port, function() {
    require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        console.info(
            '<a href="http://' + add + ':' + port + '/#model=KSP">Angular Grid example</a><span>|</span>\n' +
            '<a href="http://' + add + ':' + port + '/basic_example.html">Most Basic Angular example</a><span>|</span>\n' +
            '<a href="http://' + add + ':' + port + '/showcase/">Showcase example</a><span>|</span>\n' +
            '<a href="http://' + add + ':' + port + '/basic_example.html">Extended controller Angular example</a>'
        )
    })
});