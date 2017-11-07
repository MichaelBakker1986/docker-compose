var express = require('express');
var request = require('request');
var proxy = require('express-http-proxy');
var browserify = require('browserify-middleware');

var app = express();
var port = 8084;
var serveStatic = require('serve-static');
var compression = require('compression')
app.use(require('express-favicon')());
//proxy forward to 8080 rest-api
app.use('/id/:id/web.js', browserify(__dirname + '/../../lme-model-api/src/excelModelIDE.js', {
    cache: true,
    gzip: true,
    insertGlobals: true,
    debug: false,
    minify: true,
    precompile: true
}));
app.get('/models', proxy('http://' + require('os').hostname() + ':8080/models'));
app.post('/id/:id/saveFFL_LME', proxy('http://' + require('os').hostname() + ':8080/id/:id/saveFFL_LME', {limit: '50mb'}));
app.get('/ide.js', proxy('http://' + require('os').hostname() + ':8080/ide.js', {limit: '50mb'}));
app.get('/branches', proxy('http://' + require('os').hostname() + ':8080/branches'));
app.get('/id/:id/transformFFL_LME/:model', proxy('http://' + require('os').hostname() + ':8080/id/:id/transformFFL_LME/:model'));
app.use(compression())
app.use('/id/:id/', serveStatic(__dirname + "/"));
app.use('/id/:id/', serveStatic(__dirname + "/../ExcelIDE/"));
app.use('/id/:id/', serveStatic(__dirname + "/../../lme-model-api/bower_components/"));
app.use('/id/:id/', serveStatic(__dirname + "/../../lme-model-api/public/"));
app.use('/id/:id/', serveStatic(__dirname + "/../../lme-model-tests/plugins/"));
app.use('/resources/', serveStatic(__dirname + "/../../ff-ssh-git/resources/"));

app.listen(port, function() {
    require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        const domain = add + ':' + port;
        console.info(
            '<span>IDE apps: </span><a href="http://' + domain + '/id/DEMO/ideplus.html">IDE DEMO Application</a><span> | </span>' +
            '<a href="http://' + domain + '/id/DEMO/excelIDE.html">ExcelIDE application</a>'
        );
    })
});