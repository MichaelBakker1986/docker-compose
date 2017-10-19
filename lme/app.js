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
var lmeAPI = require('./src/lme')
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(require('express-favicon')());
var stash = require('./public/stash');
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
        res.end('ERROR: ' + err);
    }
});
app.get('/:id/transformFFL_LME/*', (req, res) => {
    var modelName = req.originalUrl.substring(req.originalUrl.indexOf('transformFFL_LME/') + 17);
    var includeModule = '/public/json/' + modelName + '_canvas.json';
    let options = {
        insertGlobals: true,
        insertGlobalVars: {
            JSON_MODEL: (file, dir) => {
                return (file.endsWith('output.js')) ? "require('" + '..' + includeModule + "')" : 'undefined';
            }
        },
        gzip: true, minify: true,
        insertGlobals: true,
        debug: false
    };
    let b = browser(options);
    b.add(__dirname + '/src/output.js');
    b.add(__dirname + includeModule);
    b.transform(fastjson);
    res.header("Access-Control-Allow-Origin", "*");
    b.bundle().pipe(res);
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
        console.info('<a href="' + domain + 'index.html">DEMO application</a><span> up.</span>\n' +
            '<a href="' + domain + 'DEMO/transformFFL_LME/KSP">JS API</a>\n' +
            '<a href="' + domain + 'stash/projects/FF/repos/finanfinancials/branches?limit=1000">JSON API (branches)</a>\n' +
            '<a href="' + domain + 'stash2/models">JSON API (models)</a>\n' +
            '<a href="' + domain + 'ide.html">IDE application</a><span> up.</span>');
    })
});