//default test message
var browserify = require('browserify-middleware');
var express = require('express');
var app = express();
var port = 8080;
var serveStatic = require('serve-static');
var compression = require('compression')
var browser = require('browserify');
var fastjson = require('browserify-fastjson');
app.use(require('express-favicon')());
browserify.settings({
    transform: [fastjson]
})
app.use(compression())
app.get('/:id/create', function(req, res) {
    /**
     * Create identified compiled js file
     */
    var b = browser({
        insertGlobals: true,
        debug: false
    });
    b.add(__dirname + '/public/javascripts/output.js');
    b.transform(fastjson);
    b.bundle().pipe(res);
});
app.use('/:id/web.js', browserify(__dirname + '/public/javascripts/main.js', {
    cache: true,
    gzip: true,
    insertGlobals: true,
    debug: false,
    minify: true,
    precompile: true
}));
app.use(serveStatic(__dirname));
app.listen(port, function() {
    require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        console.log('<a href="http://' + add + ':' + port + '/public/index.html">DEMO Server</a><span> deployed (test5).</span>');
    })
});