
const express = require('express');
const pretty = require('express-prettify');
const bodyParser = require('body-parser');
const log = require('log6');

const hostname = require('os').hostname();
const port = process.env.PORT || 1337;
const app = express();

//process.env.FIGURE_DB_STRING='postgresql://postgres:postgres@db:5432/lme';

app.set('port', port)
app.use(require('cors')())
app.use(bodyParser.json()); // To support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // To support URL-encoded bodies
    extended: true,
}));
app.use(pretty({ query: 'pretty' }));
//routes
require('lme-data-app/api/value').setup(app);
require('lme-data-app/api/api-def').setup(app);

app.listen(port, function () {
    require('dns').lookup(hostname, (err, add, fam) => {
        let domain = 'http://' + add + ':' + port + '/';
        console.info('<span>LME DATA: </span><a href="' + domain + 'docs/?url=%2Fapi-docs#!/default/value">data-api</a>\n');
    })
});