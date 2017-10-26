var express = require('express');
var request = require('request');
var proxy = require('express-http-proxy');

var app = express();
var port = 8084;
var serveStatic = require('serve-static');
var compression = require('compression')
app.use(require('express-favicon')());
//proxy forward to 8080 rest-api
app.get('/models', proxy('http://' + require('os').hostname() + ':8080/models'));
app.get('/branches', proxy('http://' + require('os').hostname() + ':8080/branches'));
app.use(compression())
app.use(serveStatic(__dirname + "/"));
app.use(serveStatic(__dirname + "/../../lme/bower_components/"));
app.use(serveStatic(__dirname + "/../../lme/public/"));
app.listen(port, function() {
    require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        console.info('<a href="http://' + add + ':' + port + '/ideplus.html">IDE DEMO Application</a><span> up.</span>');
    })
});