const port = 8085;
const host = process.env.HOST || '127.0.0.1';
const request = require('request-promise-json');
const domain = process.env.DOMAIN || host + ':' + port
const internal_proxy_port = process.env.INTERNAL_PROXY_PORT || 7081

const express = require('express');
const log = require('log6');
const app = express();
const https = require('https');

app.set('port', port)
app.set('host', host)
app.set('domain', domain)
app.use(require('cors')())
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'})); // To support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // To support URL-encoded bodies
    extended: true
}));

//var privateKey = fs.readFileSync('privatekey.pem');
//var certificate = fs.readFileSync('certificate.pem');
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
    request.get('http://' + host + ':' + internal_proxy_port + '/register/service/model-api/' + host + '/' + port + '/' + routes.join(',')).then(function(data) {
        if (log.DEBUG) log.debug(data);
    }).catch(function(err) {
        log.error('Failed to register ', err);
    });
});