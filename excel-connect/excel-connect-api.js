const express = require('express');
const log = require('ff-log')
const port = 8086;
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs');
app.use(require('compression')())
app.use(require('cors')())
app.set('port', port)
app.use(bodyParser.json({limit: '50mb'}));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true,
    limit: '50mb'
}));

const fileUpload = require('express-fileupload');

// default options
app.use(fileUpload());
const path = require('path')
app.get('*/excel/:model', function(req, res) {
    const modelName = req.params.model;
    fs.exists(__dirname + '/../git-connect/resources/' + modelName + '.xlsx', function(result, err) {
        const targetFilePath = __dirname + '/../git-connect/resources/' + modelName + '.xlsx';
        const sampleFilePath = __dirname + '/resources/SAMPLE.xlsx';
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

app.listen(port, () => {
    require('dns').lookup(require('os').hostname(), (err, add, fam) => {
        let domain = 'http://' + add + ':' + port + '/';
        console.info('<span>excel api: </span><a href="' + domain + 'docs">excel api docs</a>')
    })
});