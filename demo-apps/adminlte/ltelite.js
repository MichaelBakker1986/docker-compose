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
app.get('/models', proxy('http://' + require('os').hostname() + ':8080/models'));
app.post('/:id/saveFFL_LME', proxy('http://' + require('os').hostname() + ':8080/:id/saveFFL_LME', {limit: '50mb'}));
app.get('/branches', proxy('http://' + require('os').hostname() + ':8080/branches'));
app.get('/:id/ide.js', proxy('http://' + require('os').hostname() + ':8080/:id/ide.js'));
app.get('/:id/transformFFL_LME/:model', proxy('http://' + require('os').hostname() + ':8080/:id/transformFFL_LME/:model'));
app.use(compression())
app.use(serveStatic(__dirname + "/"));
app.use(serveStatic(__dirname + "/../ExcelIDE/"));
app.use(serveStatic(__dirname + "/../../lme/bower_components/"));
app.use(serveStatic(__dirname + "/../../lme/public/"));
app.use(serveStatic(__dirname + "/../../lme-model-tests/plugins/"));
app.use('/resources/', serveStatic(__dirname + "/../../ff-ssh-git/resources/"));
app.use('/:id/web.js', browserify(__dirname + '/../../lme/src/excelModelIDE.js', {
    cache: true,
    gzip: true,
    insertGlobals: true,
    debug: false,
    minify: true,
    precompile: true
}));
app.listen(port, function() {
    require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        const domain = add + ':' + port;
        console.info(
            '<a href="http://' + domain + '/ideplus.html">IDE DEMO Application</a><span> | </span>' +
            '<a href="http://' + domain + '/excelIDE.html">ExcelIDE application</a>'
        );
    })
});