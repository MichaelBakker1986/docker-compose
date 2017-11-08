var port = 8083;
var proxy = require('express-http-proxy');
var compression = require('compression')
var expressStaticGzip = require("express-static-gzip");
var browserify = require('browserify-middleware');
var app = require('express')();
app.use('/favicon.ico', require('express-favicon')(__dirname + '/favicon.png'));
app.use(require('cors')());
app.use(compression())
app.use('/id/:id/', expressStaticGzip(__dirname + "/angular-demo/public/"));
app.use('/id/:id/showcase', expressStaticGzip(__dirname + "/showcase/"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/angular-demo/bower_components/"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/adminlte/dist/"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/data-graph/"));
app.use('/id/:id/css', expressStaticGzip(__dirname + "/node_modules/gitgraph.js/build/"));
app.use('/id/:id/lmegraph.js', browserify(__dirname + '/data-graph/datagraph.js', {
    gzip: true,
    insertGlobals: true,
    debug: false
}));
//proxies
app.get('/id/:id/data', proxy('http://' + require('os').hostname() + ':8085/id/:id/data'));
app.post('/id/:id/data', proxy('http://' + require('os').hostname() + ':8085/id/:id/data'));
app.get('/id/:id/transformFFL_LME/:model', proxy('http://' + require('os').hostname() + ':8080/id/:id/transformFFL_LME/:model'));

//IDE proxies
app.get('/id/:id/excelIDE.js', proxy('http://' + require('os').hostname() + ':8080/id/:id/excelIDE.js', {limit: '50mb'}))
app.get('/id/:id/aceModelIDE.js', proxy('http://' + require('os').hostname() + ':8080/id/:id/aceModelIDE.js', {limit: '50mb'}))
app.post('/id/:id/saveFFL_LME', proxy('http://' + require('os').hostname() + ':8080/id/:id/saveFFL_LME', {limit: '50mb'}));
app.get('/models', proxy('http://' + require('os').hostname() + ':8080/models'));
app.get('/branches', proxy('http://' + require('os').hostname() + ':8080/branches'));
app.use('/id/:id/', expressStaticGzip(__dirname + "/adminlte/"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/adminlte/bower_components/"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/ExcelIDE/"));
app.use('/resources/', expressStaticGzip(__dirname + "/../ff-ssh-git/resources/"));

app.listen(port, function() {
    require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        var domain = add + ':' + port;
        console.info(
            '<span>DEMO apps: </span>\n' +
            '<a href="http://' + domain + '/id/DEMO/grid_example.html#MVO&DEMO">Angular Grid example</a><span> | </span>\n' +
            '<a href="http://' + domain + '/id/DEMO/basic_example.html">Most Basic Angular example</a><span> | </span>\n' +
            '<a href="http://' + domain + '/id/DEMO/showcase/">Showcase example</a><span> | </span>\n' +
            '<a href="http://' + domain + '/id/DEMO/basic_example.html">Extended controller Angular example</a><span> | </span>\n' +
            '<a href="http://' + domain + '/id/DEMO/datagraph.html">Data graph</a>\n' +
            '<br><span>IDE apps: </span>\n' +
            '<a href="http://' + domain + '/id/DEMO/aceModelIDE.html">IDE DEMO Application</a><span> | </span>\n' +
            '<a href="http://' + domain + '/id/DEMO/excelIDE.html">ExcelIDE application</a>'
        )
    })
});