const port = process.env.PORT;
let express = require('express');
const app = express();
var pretty = require('express-prettify');
var log = require('ff-log');
var bodyParser = require('body-parser');
const hostname = require('os').hostname();
app.set('port', port)
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
    require('dns').lookup(hostname, (err, add, fam) => {
        let domain = 'http://' + add + ':' + port + '/';
        console.info('<span>LME DATA: </span><a href="' + domain + 'docs/?url=%2Fapi-docs#!/default/value">data-api</a>\n');
    })
});