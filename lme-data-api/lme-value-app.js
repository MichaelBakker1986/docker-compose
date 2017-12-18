const port = process.env.KSP_APP_PORT || 8006;
const host = process.env.KSP_APP_HOST;
const domain = process.env.KSP_APP_DOMAIN

const domain = 'http://' + host + ':' + port + '/';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.set('port', port)
app.set('host', host)
app.set('domain', domain)

const pretty = require('express-prettify');
app.use(require('cors')())
app.use(bodyParser.json()); // To support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // To support URL-encoded bodies
    extended: true,
}));
app.use(pretty({query: 'pretty'}));
//routes
require('./api/value').setup(app)
require('./api/api-def').setup(app)

app.listen(port, function() {
    console.info('<span>LME DATA: </span><a href="' + domain + 'docs/?url=%2Fapi-docs#!/default/value">data-api</a>\n');
});