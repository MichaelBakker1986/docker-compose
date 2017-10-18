var express = require('express');
var app = express();
var port = 8083;
var serveStatic = require('serve-static');
var compression = require('compression')
app.use(serveStatic(__dirname + "/public/"));
app.use(serveStatic(__dirname + "/bower_components/"));
app.use(require('express-favicon')());
app.listen(port, function() {
    require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        console.log('<a href="http://' + add + ':' + port + '/index.html">Angular DEMO Server</a><span> deployed.</span>');
    })
});