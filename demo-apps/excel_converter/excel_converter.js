const port = process.env.PORT || 8084;
const host = process.env.HOST || '127.0.0.1'
const production = process.env.NODE_ENV == 'production';
const babelify = require('babelify')
require('babel-preset-env')
const browserify = require('browserify-middleware');
browserify.settings({ transform: [[babelify, { presets: ['env'] }]] })

const excel_api = require('../../excel-connect/ExcelToRegister')
const domain = process.env.DOMAIN || (host + ':' + port + '/');
const app = require('express')();
const fileUpload = require('express-fileupload');
app.use(fileUpload());
//app.get('/app.js', (req, res) => res.sendFile(__dirname + '/uiapp.js'));
app.get('/app.js', browserify(__dirname + '/web/uiapp.js', {
    cache        : production,
    gzip         : production,
    insertGlobals: true,
    debug        : production,
    minify       : production,
    precompile   : production
}));
app.get('/', (req, res) => res.sendFile(__dirname + '/web/index.html'));
app.get('/testfile.xlsx', (req, res) => res.sendFile(__dirname + '/resources/MagixIdea.xlsx'));
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
app.listen(port, () => console.info('<span>' + (production ? 'Production' : 'Develop') + ' server </span><a href="http://' + domain + '">server</a><span> deployed</span>'));