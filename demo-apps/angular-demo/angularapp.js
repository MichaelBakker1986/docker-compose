var express = require('express');
var request = require('request');
var port = 8083;
var serveStatic = require('serve-static');
var compression = require('compression')
var app = express();
app.use(require('express-favicon')());
app.use(compression())
app.use(serveStatic(__dirname + "/public/"));
app.use(serveStatic(__dirname + "/bower_components/"));
app.listen(port, function() {
    require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        console.info('<a href="http://' + add + ':' + port + '/#model=KSP">Angular demo Application</a><span> up.</span>');
    })
});