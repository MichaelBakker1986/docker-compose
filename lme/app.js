//default test message
var browserify = require('browserify-middleware');
var express = require('express');
var port = 8080;
var serveStatic = require('serve-static');
var compression = require('compression')
var browser = require('browserify');
var fastjson = require('browserify-fastjson');
var static = require('static-nocase')
var lmeAPI = require('./src/lme')
var app = express();
app.use(require('express-favicon')());
var fs = require('fs')
var bodyParser = require('body-parser')
app.use(bodyParser.json({limit: '5mb'}));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true,
    limit: '50mb'
}));


var stash = require('./src/stash');
browserify.settings({
    transform: [fastjson]
})
app.use(compression())
/**
 * Create identified compiled js file.
 */
app.post('/:id/saveFFL_LME', (req, res) => {
    try {
        let lmeAPiImpl = new lmeAPI();
        lmeAPiImpl.importFFL(req.body.data);
        var lme = lmeAPiImpl.exportLME();

        stash.commit(req.body.model, req.body.data, lme)

        res.end('done');
    } catch (err) {
        console.error(err)
        res.end('ERROR: ' + err);
    }
});
app.get('/:id/transformFFL_LME/*', (req, res) => {
    var modelName = req.originalUrl.substring(req.originalUrl.indexOf('transformFFL_LME/') + 17);
    var ffl = fs.createReadStream(__dirname + '/public/json/' + modelName + '.js')
    res.header("Access-Control-Allow-Origin", "*");
    ffl.pipe(res);
})

app.get('/branches', (req, res) => {
    stash.branches().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.end("" + err);
    })
});
app.get('/models', (req, res) => {
    stash.models('master', 'ffl').then((data) => {
        res.json(data);
    }).catch((err) => {
        res.end("" + err)
    })
});
app.use('/:id/web.js', browserify(__dirname + '/src/main.js', {
    cache: true,
    gzip: true,
    insertGlobals: true,
    debug: false,
    minify: true,
    precompile: true
}));
app.use(static(__dirname + '/public/'))
app.use(serveStatic(__dirname + "/bower_components/"));
app.listen(port, () => {
    require('dns').lookup(require('os').hostname(), (err, add, fam) => {
        let domain = 'http://' + add + ':' + port + '/';
        console.info('<a href="' + domain + 'index.html">DEMO application</a><span> up.</span></br>\n' +
            '<a href="' + domain + 'DEMO/transformFFL_LME/KSP">JS API</a></br>\n' +
            '<a href="' + domain + 'branches">JSON API (branches)</a></br>\n' +
            '<a href="' + domain + 'models">JSON API (models)</a></br>\n' +
            '<a href="' + domain + 'ide.html">SIMPLE IDE application</a><span> up.</span>');
    })
});