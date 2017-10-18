//default test message
var browserify = require('browserify-middleware');
var express = require('express');
var app = express();
var port = 8080;
var serveStatic = require('serve-static');
var compression = require('compression')
var browser = require('browserify');
var fastjson = require('browserify-fastjson');
var static = require('static-nocase')

app.use(require('express-favicon')());
var stash = require('./public/stash');
browserify.settings({
    transform: [fastjson]
})
app.use(compression())
app.get('/:id/create', function(req, res) {
    /**
     * Create identified compiled js file
     */
    res.header("Access-Control-Allow-Origin", "*");
    var b = browser({
        insertGlobals: true,
        debug: false
    });
    b.add(__dirname + '/public/javascripts/output.js');
    b.transform(fastjson);
    b.bundle().pipe(res);
});
app.get('/stash/*', function(req, res) {
    stash.api(req.originalUrl.substr(7)).then((data) => {
        res.end(data);
    }).catch((err) => {
        res.end("" + err);
    })
});
app.get('/stash2/*', function(req, res) {
    stash.models('master', 'ffl').then((data) => {
        res.end(JSON.stringify(data));
    }).catch((err) => {
        res.end("" + err)
    })
});
app.use('/:id/web.js', browserify(__dirname + '/public/javascripts/main.js', {
    cache: true,
    gzip: true,
    insertGlobals: true,
    debug: false,
    minify: true,
    precompile: true
}));
app.use(static(__dirname + '/public/'))
app.use(serveStatic(__dirname + "/bower_components/"));
app.listen(port, function() {
    require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        console.log('<a href="http://' + add + ':' + port + '/index.html">DEMO application</a><span> up.</span>');
        console.log('<a href="http://' + add + ':' + port + '/ide.html">IDE application</a><span> up.</span>');
    })
});