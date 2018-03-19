const exec = require('child-process-promise').exec;
const host = process.env.HOST || '127.0.0.1'
const internal_proxy_port = process.env.INTERNAL_PROXY_PORT || 7081
const port = 8080;
const request = require('request-promise-json');
const domain = process.env.INTERNAL_PROXY_PORT || ('http://' + host + ':' + internal_proxy_port + '/id/guest');

const express = require('express');
const app = express();
const log = require('log6')
const browserify = require('browserify-middleware');
const babelify = require('babelify')
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
app.use(bodyParser.json({ limit: '50mb' }));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true,
    limit   : '50mb'
}));
const stash = require('./src/stash').Stash;
const DBModel = require('../git-connect/ModelAssembler');
const ExcelConnect = require('../excel-connect/');
const fileUpload = require('express-fileupload');
const DockerImageBuilder = require('../docker-connect/DockerImageBuilder')
const fs = require('fs')
browserify.settings({

    transform: [
        require('browserify-fastjson'),
        [babelify, { presets: ['env'] }]
    ]
})
app.get('*/excelide.js', browserify(__dirname + '/src/excelide.js', {
    cache        : true,
    gzip         : true,
    insertGlobals: true,
    debug        : false,
    minify       : true,
    precompile   : true
}));
app.get('*/ide.js', browserify(__dirname + '/src/ide.js', {
    gzip         : true,
    insertGlobals: true,
    debug        : false
}));
app.get('*/ui_showcase.js', browserify(__dirname + '/src/uishowcase.js', {
    gzip         : true,
    insertGlobals: true,
    debug        : false
}));
app.post('*/:user_id/preview/:model_name', (req, res) => {
    const model_name = req.params.model_name;
    const user_id = req.params.user_id;
    stash.preview(user_id, model_name, req.body.data).then((data) => {
        res.set('x-auth-id', data + ".ffl");
        res.json({ status: 'ok', link: data });
    }).catch((err) => {
        log.debug('Failed to write ' + model_name + '.ffl file.', err)
        res.json({ status: 'fail', reason: err.toString() });
    })
});
app.get('*/model', (req, res) => {
    var name = req.query.model;
    DBModel.getModel(name).then((data) => {
        res.json({ status: 'success', data: data });
    }).catch((err) => {
        log.debug('Failed to fetch model from database', err)
        res.json({ status: 'fail', reason: err.toString() });
    })
});
app.get('*/modelChanges/:model_name', (req, res) => {
    const model_name = req.params.model_name;
    DBModel.getFFLModelPropertyChanges(model_name).then((data) => {
        res.json({ status: 'success', data: data });
    }).catch((err) => {
        log.debug('Failed to fetch model changes from database', err)
        res.json({ status: 'fail', reason: err.toString() });
    })
});
app.post('*/:user_id/saveFFLModel/:model_name', (req, res) => {
    const model_name = req.params.model_name;
    const user_id = req.params.user_id;
    stash.commit(user_id, model_name, req.body.data, req.body.type).then((data) => {
        res.json({ status: 'ok' });
    }).catch((err) => {
        log.debug('Failed to write ' + model_name + '.ffl file.', err)
        res.json({ status: 'fail', message: 'Failed to write ' + model_name + '.ffl', reason: err.toString() });
    })
});
app.post('*/:user_id/saveJBehaveStory/:model_name', (req, res) => {
    const model_name = req.params.model_name;
    const user_id = req.params.user_id;
    stash.commitJBehaveFile(user_id, model_name, req.body.data, req.body.type).then((data) => {
        res.json({ status: 'ok' });
    }).catch((err) => {
        log.debug('Failed to write ' + model_name + '.ffl file.', err)
        res.json({ status: 'fail', message: 'Failed to write ' + model_name + '.ffl', reason: err.toString() });
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
            // failing resutls.
            // fs.createReadStream(sampleFilePath).pipe(fs.createWriteStream(targetFilePath));
            res.sendFile(path.resolve(sampleFilePath));
        } else {
            res.sendFile(path.resolve(targetFilePath));
        }
    })
})
app.post('*/upload', function(req, res) {
    log.info('upload')
    res.status(200).json({ status: 'ok' })
})

app.get('*/readExcel/:model', function(req, res) {
    const modelName = req.params.model;
    ExcelConnect.loadExcelFile(modelName).then(function(matrix) {
        res.json(matrix)
    }).catch(function(err) {
        return res.status(400).json({ status: 'fail', reason: err.toString() });
    })
})
/**
 * Test the distribution
 * Stash all given data.
 * Tag the version
 * Build image
 * Publish to nexus
 */
app.post('*/:user_id/publishDockerImage/:model_name', function(req, res) {
    const model_name = req.params.model_name;
    const user_id = req.params.user_id;

    stash.commitJBehaveFile(user_id, model_name, req.body.story, null).then((data) => {
        ExcelConnect.loadExcelFile(model_name).then(function(matrix) {
            stash.commit(user_id, model_name, req.body.fflData, null).then((data) => {
                new DockerImageBuilder(model_name, null, null, null).buildDockerImage()
                return res.json({
                    version   : 1,
                    status    : 'ok',
                    model_name: model_name
                })
            }).catch((err) => {
                log.debug('Failed to write ' + model_name + '.ffl file.', err)
                return res.json({
                    status : 'fail',
                    message: 'Failed to write ' + model_name + '.ffl',
                    reason : err.toString()
                });
            })
        }).catch(function(err) {
            return res.status(400).json({ status: 'fail', reason: err.toString() });
        })
    }).catch((err) => {
        log.debug('Failed to write ' + model_name + '.ffl file.', err.toString())
        return res.json({ status: 'fail', message: 'Failed to write ' + model_name + '.ffl', reason: err.toString() });
    })
})
/** * TODO: add commit to stash */
app.post('*/excel/:model', function(req, res) {
    const modelName = req.params.model;
    if (!req.files) {
        log.debug('Failed to write ' + modelName + '.xlsx file.', err)
        return res.status(400).json({ status: 'fail', reason: 'No files were uploaded.' });
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let excelfile = req.files.excelfile;

    // Use the mv() method to place the file somewhere on your server
    excelfile.mv(__dirname + '/../git-connect/resources/' + modelName + '.xlsx', function(err) {
        if (err) {
            log.debug('Failed to write ' + modelName + '.xlsx file.', err)
            return res.status(400).json({ status: 'fail', reason: 'No files were uploaded.' });
        }
        res.json({ status: 'ok' });
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
    request.get('http://' + host + ':' + internal_proxy_port + '/register/service/model-api/' + host + '/' + port + '/' + routes.join(',')).then(function(data) {
        if (log.DEBUG) log.debug(data);
    }).catch(function(err) {
        log.error('Failed to register ', err);
    });
});