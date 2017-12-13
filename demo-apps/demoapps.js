var port = 8083;
const host = process.env.HOST || 'localhost'
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
app.use('/id/:id/', expressStaticGzip(__dirname + "/data-graph/"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/showcase/"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/monli/"));
app.use('/', expressStaticGzip(__dirname + "/node_modules/"));
app.use('/', expressStaticGzip(__dirname + "/"));

//showcase proxies
app.use('/id/:id/showcase', expressStaticGzip(__dirname + "/showcase/"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/node_modules/ace-builds/src-min/"));
app.use('/', expressStaticGzip(__dirname + "/angular-demo/"));
app.use('/', expressStaticGzip(__dirname + "/monli/"));

//Update proxies
app.get('/update/git/notifyCommit', proxy('http://' + host + ':8081/update/git/notifyCommit'));
app.get('/hasUpdates', proxy('http://' + host + ':8081/hasUpdates'));

//proxies
app.get('/id/:id/data', proxy('http://' + host + ':8085/id/:id/data'));
app.post('/id/:id/data', proxy('http://' + host + ':8085/id/:id/data'));
app.use('/id/:id/resources/', expressStaticGzip(__dirname + "/../git-connect/resources/"));

app.get('*/data-docs', function(req, res) {
    res.redirect('http://' + host + ':8085/docs/?url=%2Fapi-docs%3Fabc%3D1#/default/idRetrieveFigures');
});
app.get('*/model-docs', function(req, res) {
    res.redirect('http://' + host + ':8080/docs/?url=%2Fapi-docs#/default/idRetrieveModels');
});
//IDE proxies
app.get('*/excel/*', proxy('http://' + host + ':8080', {limit: '50mb'}))
app.get('*/excelide.js', proxy('http://' + host + ':8080', {limit: '50mb'}))
app.get('*/model', proxy('http://' + host + ':8080', {limit: '50mb'}))
app.get('*/ui_showcase.js', proxy('http://' + host + ':8080', {limit: '50mb'}))
app.get('*/engineonly.js', proxy('http://' + host + ':8080', {limit: '50mb'}))
app.get('*/tmp_model/*', proxy('http://' + host + ':8080', {limit: '50mb'}))
app.get('*/aceide.js', proxy('http://' + host + ':8080', {limit: '50mb'}))
app.post('*/saveFFL_LME', proxy('http://' + host + ':8080', {limit: '50mb'}));
app.post('*/preview', proxy('http://' + host + ':8080', {limit: '50mb'}));
app.get('/models', proxy('http://' + host + ':8080/models'));
app.get('/branches', proxy('http://' + host + ':8080/branches'));
app.use('/id/:id/', expressStaticGzip(__dirname + "/lme-ide/"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/lme-ide/dist/"));

app.listen(port, function() {
    var domain = host + ':' + port;
    console.info(
        '<span>DEMO apps: </span>\n' +
        '<a href="http://' + domain + '/id/DEMO/grid_bootstrap.html#MVO&DEMO">Bootstrap Grid example</a><span> | </span>\n' +
        /*    '<a href="http://' + domain + '/id/DEMO/ui_designer.html#MVO&DEMO">Designer ide</a><span> | </span>\n' +*/
        '<a href="http://' + domain + '/id/DEMO/basic_example.html">Most Basic Angular example</a><span> | </span>\n' +
        '<a href="http://' + domain + '/id/DEMO/showcase/showcase.html">Showcase example</a><span> | </span>\n' +
        '<a href="http://' + domain + '/id/DEMO/uishowcase.html">UI Showcase example</a><span> | </span>\n' +
        '<a href="http://' + domain + '/id/SlimmeOuder/HoeveelKostEenStudie.html">Monli Hoeveel kost een studie?</a><span> | </span>\n' +
        '<a href="http://' + domain + '/id/SlimmeOuder/WatKostEenKind.html">Monli Wat kost een kind</a><span> | </span>\n' +
        '<a href="http://' + domain + '/id/DEMO/basic_example.html">Extended controller Angular example</a><span> | </span>\n' +
        /*    '<a href="http://' + domain + '/id/DEMO/datagraph.html">Data graph</a>\n' +*/
        '<br><span>IDE apps: </span>\n' +
        '<a href="http://' + domain + '/id/DEMO/aceide.html">IDE DEMO Application</a><span> | </span>\n'
    )
});