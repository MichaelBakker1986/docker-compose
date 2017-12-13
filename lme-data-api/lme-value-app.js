const port = process.env.PORT;
const host = process.env.HOST;
const domain = 'http://' + host + ':' + port + '/';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.set('port', port)
app.set('host', host)
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