var express = require('express');
var request = require('request');
var app = express();
var port = 8084;
var serveStatic = require('serve-static');
var compression = require('compression')
app.use(require('express-favicon')());
app.use(compression())
app.use(serveStatic(__dirname + "/"));
app.listen(port, function() {
    require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        console.info('<a href="http://' + add + ':' + port + '/index2.html">AdminLTE demo Application</a><span> up.</span>');
    })
});