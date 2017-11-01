var http = require('http');
let express = require('express');
const app = express();
const swaggerUi = require('swaggerize-ui');
var pretty = require('express-prettify');
const port = 8085;
var log = require('ff-log');
var fs = require('fs')
var Promise = require('promise')
var bodyParser = require('body-parser');
const hostname = require('os').hostname();
app.use(bodyParser.json()); // To support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // To support URL-encoded bodies
    extended: true,
}));
app.use(pretty({query: 'pretty'}));
//routes
require('./api/store').setup(app)
require('./api/value').setup(app)

//swagger
app.use('/docs', swaggerUi({
    docs: '/api-docs?abc=1' // from the express route above.
}));
// swagger definition
app.get('/api-docs', function(req, res) {
    let swaggerData = require(__dirname + '/swaggerDef.json');
    require('dns').lookup(hostname, (err, add, fam) => {
        swaggerData.host = add + ':' + port;
        res.json(swaggerData)
    })
});
app.listen(port, function() {
    require('dns').lookup(hostname, (err, add, fam) => {
        let domain = 'http://' + add + ':' + port + '/';
        console.info('<a href="' + domain + 'docs/?url=%2Fapi-docs#!/default/value">Swagger API docs</a><span> up.</span></br>\n');
    })
});