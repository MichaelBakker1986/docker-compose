var express = require('express');
const exec = require('child-process-promise').exec;
var port = 8080;
var app = express();
var log = require('ff-log')
var browserify = require('browserify-middleware');
app.use(require('express-favicon')());
var bodyParser = require('body-parser')
var expressStaticGzip = require("express-static-gzip");
app.use('/id/:id/transformFFL_LME/', expressStaticGzip(__dirname + "/../git-connect/resources/"));
app.use('/resources/', expressStaticGzip(__dirname + "/../git-connect/resources/"));
app.use(expressStaticGzip(__dirname + "/../git-connect/resources/"));
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
    app.use('*/engineonly.js', browserify(__dirname + '/src/LME_FFL_FrontendModelEngine.js', {
    gzip: true,
    insertGlobals: true,
    debug: false
}));
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
app.use('*/ui_showcase.js', browserify(__dirname + '/src/uishowcase.js', {
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
        //res.json({status: 'fail', reason: err.toString()});
        res.status(500).send(err.toString());
    })
});
app.get('*/tmp_model/:model', (req, res) => {
    var name = req.params.model;
    return exec('node ' + __dirname + '/src/exportLME_FFL.js ' + name).then((result) => {
        var readStream = require('fs').createReadStream(__dirname + '/../git-connect/resources/' + name + '.js');
        readStream.pipe(res);
    }).catch((err) => {
        res.status(500).send(err.toString())
    })
});

require('./api-def').setup(app)

app.listen(port, () => {
    require('dns').lookup(require('os').hostname(), (err, add, fam) => {
        let domain = 'http://' + add + ':' + port + '/';
        console.info('<span>LME model: </span><a href="' + domain + 'docs">model-api</a>')
    })
});