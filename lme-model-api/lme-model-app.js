const exec = require('child-process-promise').exec;
const host = process.env.HOST || 'localhost'
const proxyhost = process.env.PROXY_HOST || 7080
const port = 8080;
const request = require('request-promise-json');
const domain = 'http://' + host + ':' + port + '/';
const express = require('express');
const app = express();
const log = require('ff-log')
const browserify = require('browserify-middleware');
app.use(require('express-favicon')());
const bodyParser = require('body-parser')
const expressStaticGzip = require("express-static-gzip");
app.use('/id/:id/transformFFL_LME/', expressStaticGzip(__dirname + "/../git-connect/resources/"));
app.use('/resources/', expressStaticGzip(__dirname + "/../git-connect/resources/"));
app.use(expressStaticGzip(__dirname + "/../git-connect/resources/"));
app.use(require('compression')())
app.use(require('cors')())
app.set('port', port)
app.set('host', host)
app.use(bodyParser.json({limit: '50mb'}));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true,
    limit: '50mb'
}));
const stash = require('./src/stash').Stash;
const DBModel = require('../git-connect/ModelAssembler');
const fileUpload = require('express-fileupload');
const fs = require('fs')
browserify.settings({
    transform: [require('browserify-fastjson')]
})
app.get('*/engineonly.js', browserify(__dirname + '/src/LME_FFL_FrontendModelEngine.js', {
    gzip: true,
    insertGlobals: true,
    debug: false
}));
app.get('*/excelide.js', browserify(__dirname + '/src/excelide.js', {
    cache: true,
    gzip: true,
    insertGlobals: true,
    debug: false,
    minify: true,
    precompile: true
}));
app.get('*/aceide.js', browserify(__dirname + '/src/aceide.js', {
    gzip: true,
    insertGlobals: true,
    debug: false
}));
app.get('*/ui_showcase.js', browserify(__dirname + '/src/uishowcase.js', {
    gzip: true,
    insertGlobals: true,
    debug: false
}));
app.post('*/preview/:model_name', (req, res) => {
    const model_name = req.params.model_name;
    stash.preview(model_name, req.body.data).then((data) => {
        res.json({status: 'ok', link: data});
    }).catch((err) => {
        log.debug('Failed to write ' + model_name + '.ffl file.', err)
        res.json({status: 'fail', reason: err.toString()});
    })
});
app.get('*/model', (req, res) => {
    var name = req.query.model;
    DBModel.getModel(name).then((data) => {
        res.json({status: 'success', data: data});
    }).catch((err) => {
        log.debug('Failed to fetch model from database', err)
        res.json({status: 'fail', reason: err.toString()});
    })
});
app.post('*/saveFFLModel/:model_name', (req, res) => {
    const model_name = req.params.model_name;
    stash.commit(model_name, req.body.data, req.body.type).then((data) => {
        res.json({status: 'ok'});
    }).catch((err) => {
        log.debug('Failed to write ' + model_name + '.ffl file.', err)
        res.json({status: 'fail', message: 'Failed to write ' + model_name + '.ffl', reason: err.toString()});
    })
});
app.get('*/branches', (req, res) => {
    stash.branches().then((data) => {
        res.json(data);
    }).catch((err) => {
        log.debug('Failed to lookup branches:[' + err + ']')
        res.json([]);
    })
});
app.get('*/models', (req, res) => {
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


// default options
app.use(fileUpload());
const path = require('path')
app.get('*/excel/:model', function(req, res) {
    const modelName = req.params.model;
    fs.exists(__dirname + '/../git-connect/resources/' + modelName + '.xlsx', function(result, err) {
        const targetFilePath = __dirname + '/../git-connect/resources/' + modelName + '.xlsx';
        const sampleFilePath = __dirname + '/../git-connect/SAMPLE.xlsx';
        if (!result) {
            fs.createReadStream(sampleFilePath).pipe(fs.createWriteStream(targetFilePath));
            res.sendFile(path.resolve(sampleFilePath));
        } else {
            res.sendFile(path.resolve(targetFilePath));
        }
    })
})
app.post('*/excel/:model', function(req, res) {
    const modelName = req.params.model;
    if (!req.files) {
        log.debug('Failed to write ' + modelName + '.xlsx file.', err)
        return res.status(400).json({status: 'fail', reason: 'No files were uploaded.'});
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let excelfile = req.files.excelfile;

    // Use the mv() method to place the file somewhere on your server
    excelfile.mv(__dirname + '/../git-connect/resources/' + modelName + '.xlsx', function(err) {
        if (err) {
            log.debug('Failed to write ' + modelName + '.xlsx file.', err)
            return res.status(400).json({status: 'fail', reason: 'No files were uploaded.'});
        }
        res.json({status: 'ok'});
    });
});
require('./api-def').setup(app)

app.listen(port, (application) => {
    //talk with the proxy
    const routes = ['*/model-docs*']
    app._router.stack.forEach(function(r) {
        if (r.route && r.route.path) {
            routes.push(r.route.path)
        }
    })
    request.get('http://' + host + ':' + proxyhost + '/register/service/model-api/' + host + '/' + port + '/' + routes.join(',')).then(function(data) {
        if (log.DEBUG) log.debug(data);
    }).catch(function(err) {
        log.error('Failed to register ', err);
    });
});