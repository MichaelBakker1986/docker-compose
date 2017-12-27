/**
 * KSP Specific end-point
 */
const port = process.env.KSP_APP_PORT || 8006;
const host = process.env.KSP_APP_HOST || 'localhost';
const domain = process.env.KSP_APP_DOMAIN || host + ':' + port
const https = require('https');
const express = require('express');
const app = express();
const fs = require('fs')
const bodyParser = require('body-parser');

//var privateKey = fs.readFileSync('privatekey.pem');
//var certificate = fs.readFileSync('certificate.pem');

app.set('port', port)
app.set('host', host)
app.set('domain', domain)
app.use(require('cors')())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-prettify')({query: 'pretty'}));
//routes
require('./api/value').setup(app)
require('./api/api-def').setup(app)

app.listen(port, function() {
    console.info('<span>LME DATA: </span><a href="http://' + domain + '/docs/?url=%2Fapi-docs#!/default/value">data-api</a>\n');
});
exports.app = app;