const port = process.env.PORT || 8084;
const host = process.env.HOST || '127.0.0.1'
const welcome = process.env.WELCOME || 'index.html'
const hipchat = require('lme-hipchat-connect')
const validate_page = require('./web/validation_page')
const production = process.env.NODE_ENV == 'production';
const babelify = require('babelify')
require('babel-preset-env')
require('babel-preset-es2015')
require('babel-preset-stage-2')
require('es6-string-polyfills')

const browserify = require('browserify-middleware');
browserify.settings({
    transform: [[babelify, {
        presets           : ['env', 'es2015', 'stage-2', 'es6-string-polyfills'],
        sourceMapsAbsolute: true
    }]]
})

const excel_api = require('../../excel-connect/ExcelToRegister')
const domain = process.env.DOMAIN || (host + ':' + port + '/');
const app = require('express')();
const fileUpload = require('express-fileupload');
app.use(fileUpload());
const browser_opts = {
    cache        : production,
    gzip         : production,
    insertGlobals: true,
    debug        : production,
    minify       : production,
    precompile   : production
}

require('./web/SocialLogin').setup(app)
app.get('/app.js', browserify(__dirname + '/web/uiapp.js', browser_opts));
app.get('/diff.js', browserify(__dirname + '/web/diff.js', browser_opts));
app.get('/validator.js', browserify(__dirname + '/web/validator.js', browser_opts));
app.get('/', (req, res) => res.sendFile(__dirname + '/web/' + welcome));
app.get('/testfile.xlsx', (req, res) => res.sendFile(__dirname + '/resources/MagixIdea.xlsx'));
app.get('/background.jpg', (req, res) => res.sendFile(__dirname + '/web/background.jpg'));
app.get('/background2.jpg', (req, res) => res.sendFile(__dirname + '/web/background2.jpg'));
app.get('/VASTGOED.ffl', (req, res) => res.sendFile(__dirname + '/resources/VASTGOED.ffl'));
app.get('/diff.html', (req, res) => res.sendFile(__dirname + '/web/diff.html'));
app.get('/validate.html', (req, res) => res.send(validate_page.page));
app.get('/index.html', (req, res) => res.sendFile(__dirname + '/web/index.html'));
app.get('/converter.html', (req, res) => res.sendFile(__dirname + '/web/index.html'));
let excel_file_mod = 0;
app.post('/upload', (req, res) => {
    if (!req.files) return res.status(400).send('No files were uploaded.');
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.presentation;
    const path = './excel_file' + (excel_file_mod++ % 10) + ".xlsx";
    sampleFile.mv(path, (err) => {
        if (err) return res.status(500).send(err);
        excel_api(path, {
            root_name              : 'Q_ROOT',
            name                   : 'VASTGOED',
            presentation_sheet_name: 'Presentation',
            columns                : ["rownumber", "description", "level", "name", "*", "*", "required", "visible"]
        }).then(result => res.end(JSON.stringify({
            audit   : result.audit,
            register: result.register,
            ffl     : result.ffl.join('\n')
        })))
    })
});
app.listen(port, () => {
    hipchat.log('<span>' + (production ? 'Production' : 'Develop') + ' converter server </span><a href="http://' + domain + 'index.html">server</a><span> deployed</span>')
    hipchat.log('<span>' + (production ? 'Production' : 'Develop') + ' validator server </span><a href="http://' + domain + 'validate.html">server</a><span> deployed</span>')
})