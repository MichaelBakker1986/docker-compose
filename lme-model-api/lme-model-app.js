var express = require('express');
var port = 8080;
var app = express();
var log = require('ff-log')
var browserify = require('browserify-middleware');
app.use(require('express-favicon')());
var bodyParser = require('body-parser')
var expressStaticGzip = require("express-static-gzip");
app.use('/:id/transformFFL_LME/', expressStaticGzip(__dirname + "/../ff-ssh-git/resources/"));
app.use('/resources/', expressStaticGzip(__dirname + "/../ff-ssh-git/resources/"));
app.use(expressStaticGzip(__dirname + "/../ff-ssh-git/resources/"));
app.use(expressStaticGzip("bower_components/"));
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
app.post('/:id/saveFFL_LME', (req, res) => {
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
app.use('/:id/ide.js', browserify(__dirname + '/src/aceModelIDE.js', {
    gzip: true,
    insertGlobals: true,
    debug: false
}));

require('./api-def').setup(app)

app.listen(port, () => {
    require('dns').lookup(require('os').hostname(), (err, add, fam) => {
        let domain = 'http://' + add + ':' + port + '/';
        console.info('<span>LME model: </span><a href="' + domain + 'docs">model-api</a>')
    })
});