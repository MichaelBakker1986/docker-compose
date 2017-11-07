var port = 8083;
var proxy = require('express-http-proxy');
var compression = require('compression')
var expressStaticGzip = require("express-static-gzip");
var browserify = require('browserify-middleware');
var app = require('express')();
app.use(require('express-favicon')());
app.use(require('cors')());
app.use(compression())
app.use(expressStaticGzip(__dirname + "/public/"));
app.use('/showcase', expressStaticGzip(__dirname + "/../showcase/"));
app.use(expressStaticGzip(__dirname + "/bower_components/"));
app.use(expressStaticGzip(__dirname + "/../adminlte/dist/"));
app.use('/:id/', expressStaticGzip(__dirname + "/../data-graph/"));
app.use('/:id/css', expressStaticGzip(__dirname + "/node_modules/gitgraph.js/build/"));
app.use('/:id/lmegraph.js', browserify(__dirname + '/../data-graph/datagraph.js', {
    gzip: true,
    insertGlobals: true,
    debug: false
}));
//proxies
app.get('/id/:id', proxy('http://' + require('os').hostname() + ':8085/id/:id'));
app.post('/id/:id', proxy('http://' + require('os').hostname() + ':8085/id/:id'));
app.get('/:id/transformFFL_LME/:model', proxy('http://' + require('os').hostname() + ':8080/:id/transformFFL_LME/:model'));
app.listen(port, function() {
    require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        console.info(
            '<a href="http://' + add + ':' + port + '/#MVO&DEMO">Angular Grid example</a><span>|</span>\n' +
            '<a href="http://' + add + ':' + port + '/basic_example.html">Most Basic Angular example</a><span>|</span>\n' +
            '<a href="http://' + add + ':' + port + '/showcase/">Showcase example</a><span>|</span>\n' +
            '<a href="http://' + add + ':' + port + '/basic_example.html">Extended controller Angular example</a>'
        )
    })
});