var port = 8083;
var proxy = require('express-http-proxy');
var compression = require('compression')
var expressStaticGzip = require("express-static-gzip");
var browserify = require('browserify-middleware');
var app = require('express')();
app.use('/favicon.ico', require('express-favicon')(__dirname + '/public/favicon.png'));
app.use(require('cors')());
app.use(compression())
app.use('/id/:id/', expressStaticGzip(__dirname + "/public/"));
app.use('/id/:id/showcase', expressStaticGzip(__dirname + "/../showcase/"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/bower_components/"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/../adminlte/dist/"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/../data-graph/"));
app.use('/id/:id/css', expressStaticGzip(__dirname + "/node_modules/gitgraph.js/build/"));
app.use('/id/:id/lmegraph.js', browserify(__dirname + '/../data-graph/datagraph.js', {
    gzip: true,
    insertGlobals: true,
    debug: false
}));
//proxies
app.get('/id/:id/data', proxy('http://' + require('os').hostname() + ':8085/id/:id/data'));
app.post('/id/:id/data', proxy('http://' + require('os').hostname() + ':8085/id/:id/data'));
app.get('/id/:id/transformFFL_LME/:model', proxy('http://' + require('os').hostname() + ':8080/id/:id/transformFFL_LME/:model'));
app.listen(port, function() {
    require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        console.info('<span>DEMO apps: </span>' +
            '<a href="http://' + add + ':' + port + '/id/DEMO/#MVO&DEMO">Angular Grid example</a><span> | </span>\n' +
            '<a href="http://' + add + ':' + port + '/id/DEMO/basic_example.html">Most Basic Angular example</a><span> | </span>\n' +
            '<a href="http://' + add + ':' + port + '/id/DEMO/showcase/">Showcase example</a><span> | </span>\n' +
            '<a href="http://' + add + ':' + port + '/id/DEMO/basic_example.html">Extended controller Angular example</a><span> | </span>\n' +
            '<a href="http://' + add + ':' + port + '/id/DEMO/datagraph.html">Data graph</a>'
        )
    })
});