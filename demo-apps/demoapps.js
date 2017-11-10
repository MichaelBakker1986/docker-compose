var port = 8083;
var proxy = require('express-http-proxy');
var compression = require('compression')
var expressStaticGzip = require("express-static-gzip");
var browserify = require('browserify-middleware');
var nofavicon = require("express-no-favicons")
var app = require('express')();
app.use(nofavicon());
app.use(require('cors')());
app.use(compression())
app.use('/id/:id/', expressStaticGzip(__dirname + "/angular-demo/"));
app.use('/', expressStaticGzip(__dirname + "/"));

//showcase proxies
app.use('/id/:id/showcase', expressStaticGzip(__dirname + "/showcase/"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/angular-demo/bower_components/"));

//graph
app.use('/id/:id/', expressStaticGzip(__dirname + "/data-graph/"));
app.use('/id/:id/css', expressStaticGzip(__dirname + "/node_modules/gitgraph.js/build/"));
app.use('/id/:id/dataTreeGraph.js', browserify(__dirname + '/data-graph/dataTreeGraph.js', {
    gzip: true,
    insertGlobals: true,
    debug: false
}));
//proxies
app.get('/id/:id/data', proxy('http://' + require('os').hostname() + ':8085/id/:id/data'));
app.post('/id/:id/data', proxy('http://' + require('os').hostname() + ':8085/id/:id/data'));
app.use('/id/:id/resources/', expressStaticGzip(__dirname + "/../ff-ssh-git/resources/"));

//IDE proxies
app.get('*/excelide.js', proxy('http://' + require('os').hostname() + ':8080', {limit: '50mb'}))
app.get('*/aceide.js', proxy('http://' + require('os').hostname() + ':8080', {limit: '50mb'}))
app.post('*/saveFFL_LME', proxy('http://' + require('os').hostname() + ':8080', {limit: '50mb'}));
app.post('*/preview', proxy('http://' + require('os').hostname() + ':8080', {limit: '50mb'}));
app.get('/models', proxy('http://' + require('os').hostname() + ':8080/models'));
app.get('/branches', proxy('http://' + require('os').hostname() + ':8080/branches'));
app.use('/id/:id/', expressStaticGzip(__dirname + "/lme-ide/"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/lme-ide/dist/"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/lme-ide/bower_components/"));


app.listen(port, function() {
    require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        var domain = add + ':' + port;
        console.info(
            '<span>DEMO apps: </span>\n' +
            '<a href="http://' + domain + '/id/DEMO/grid_example.html#MVO&DEMO">Angular Grid example</a><span> | </span>\n' +
            '<a href="http://' + domain + '/id/DEMO/basic_example.html">Most Basic Angular example</a><span> | </span>\n' +
            '<a href="http://' + domain + '/id/DEMO/showcase/showcase.html">Showcase example</a><span> | </span>\n' +
            '<a href="http://' + domain + '/id/DEMO/basic_example.html">Extended controller Angular example</a><span> | </span>\n' +
            '<a href="http://' + domain + '/id/DEMO/datagraph.html">Data graph</a>\n' +
            '<br><span>IDE apps: </span>\n' +
            '<a href="http://' + domain + '/id/DEMO/aceide.html">IDE DEMO Application</a><span> | </span>\n' +
            '<a href="http://' + domain + '/id/DEMO/excelide.html">ExcelIDE application</a>'
        )
    })
});