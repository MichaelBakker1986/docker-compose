var express = require('express');
var port = 8080;
var app = express();
var log = require('ff-log')
var browserify = require('browserify-middleware');
app.use(require('express-favicon')());
var bodyParser = require('body-parser')
var expressStaticGzip = require("express-static-gzip");
app.use('/id/:id/transformFFL_LME/', expressStaticGzip(__dirname + "/../ff-ssh-git/resources/"));
app.use('/resources/', expressStaticGzip(__dirname + "/../ff-ssh-git/resources/"));
app.use(expressStaticGzip(__dirname + "/../ff-ssh-git/resources/"));
app.use(require('compression')())
app.use(require('cors')())
app.set('port', port)
app.use(bodyParser.json({limit: '50mb'}));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true,
    limit: '50mb'
}));
var stash = require('./src/stash').Stash;

browserify.settings({
    transform: [require('browserify-fastjson')]
})
app.use('*/excelide.js', browserify(__dirname + '/src/excelide.js', {
    cache: true,
    gzip: true,
    insertGlobals: true,
    debug: false,
    minify: true,
    precompile: true
}));
app.use('*/aceide.js', browserify(__dirname + '/src/aceide.js', {
    gzip: true,
    insertGlobals: true,
    debug: false
}));
app.post('*/preview', (req, res) => {
    stash.preview(req.body.model, req.body.data).then((data) => {
        res.json({status: 'ok', link: data});
    }).catch((err) => {
        log.debug('Failed to write ' + req.body.model + '.ffl file.', err)
        res.json({status: 'fail', reason: err.toString()});
    })
});
app.post('*/saveFFL_LME', (req, res) => {
    stash.commit(req.body.model, req.body.data).then((data) => {
        res.json({status: 'ok'});
    }).catch((err) => {
        log.debug('Failed to write ' + req.body.model + '.ffl file.', err)
        res.json({status: 'fail', reason: err.toString()});
    })
});
app.get('/branches', (req, res) => {
    stash.branches().then((data) => {
        res.json(data);
    }).catch((err) => {
        log.debug('Failed to lookup branches:[' + err + ']')
        res.json([]);
    })
});
app.get('/models', (req, res) => {
    stash.models('master', 'ffl').then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({status: 'fail', reason: err.toString()});
    })
});
var exportedLME;
app.get('/tmp_model', (req, res) => {
    var browser = require('browserify');
    var fs = require('fs')
    var name = 'MVO';

    if (!exportedLME) {
        var lmeAPI = require(__dirname + '/src/lme.js')
        LME = new lmeAPI()
        LME.importFFL(fs.readFileSync(__dirname + '/../ff-ssh-git/resources/' + name + '.ffl', 'utf8'));
        exportedLME = LME.exportLME();
    }
    let options = {
        insertGlobals: true,
        insertGlobalVars: {
            JSON_MODEL: (file, dir) => {
                return (file.endsWith('lmeAPIWrapper.js')) ? exportedLME : 'undefined';
            }
        },
        gzip: true,
        minify: true,
        insertGlobals: true,
        debug: false
    };
    let b = browser(options).ignore('escodegen').ignore('esprima');
    b.add(__dirname + '/src/lmeAPIWrapper.js');
    //b.transform('uglifyify', {global: true}) (will minify, but takes long)
    b.transform(require('browserify-fastjson'));
    b.bundle().pipe(res);
});

require('./api-def').setup(app)

app.listen(port, () => {
    require('dns').lookup(require('os').hostname(), (err, add, fam) => {
        let domain = 'http://' + add + ':' + port + '/';
        console.info('<span>LME model: </span><a href="' + domain + 'docs">model-api</a>')
    })
});