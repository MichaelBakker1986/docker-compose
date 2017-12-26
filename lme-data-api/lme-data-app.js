const port = 8085;
const host = process.env.HOST || 'localhost';
const request = require('request-promise-json');
const domain = 'http://' + host + ':' + port + '/';
const proxyhost = process.env.PROXY_HOST || 7080
const express = require('express');
const log = require('ff-log');
const app = express();

app.set('port', port)
app.set('host', host)
app.use(require('cors')())
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'})); // To support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // To support URL-encoded bodies
    extended: true
}));
//routes
require('./api/store').setup(app)
require('./api/value').setup(app)
require('./api/api-def').setup(app)

app.listen(port, () => {
    console.info('<span>LME DATA: </span><a href="' + domain + 'docs/?url=%2Fapi-docs#!/default/value">data-api</a>\n');
    //talk with the proxy
    const routes = ['*/data-docs*']
    app._router.stack.forEach(function(r) {
        if (r.route && r.route.path) {
            routes.push(r.route.path)
        }
    })
    request.get('http://' + host + ':' + proxyhost + '/register/service/model-api/' + host + '/' + port + '/' + routes.join(',')).then(function(data) {
        if (log.DEBUG) log.debug(data);
    }).catch(function(err) {
        log.error('Failed to register ', err);
    });
});