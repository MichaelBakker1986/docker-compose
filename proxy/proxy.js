/**
 * JSON parsing does not work here yet, it will modify the proxy requests
 * Just a dynamic reverse proxy
 */
const port = 7080;
const host = process.env.HOST || 'localhost';
const domain = 'http://' + host + ':' + port + '/';
const express = require('express');
const app = express();
const proxy = require('http-proxy-middleware');
const log = require('ff-log')
app.use(require('express-favicon')());
app.use(require('cors')())
app.set('port', port)
app.set('host', host)
app.use(require('method-override')())
app.use(errorHandler)
app.use(clientErrorHandler)

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.render('error', {error: err})
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({error: 'Something failed!'})
    } else {
        next(err)
    }
}

/**
 * Services register to to the proxy
 * Telling this proxy where to point certain adresses
 * Last argument is used for the route.
 * Only one route can be registered at a time.
 * If ever want to register multiple endpoints, use a separator in the last argument
 * This should also be able to generate a report of the services
 */
app.get('/register/service/:name/:host/:port/*', function(req, res) {
    const routes = (req.params['1'] || req.params['0']).split(',');
    const name = req.params.name;
    const targetProxyHost = req.params.host;
    const targetProxyPort = req.params.port;
    for (var i = 0; i < routes.length; i++) {
        const route = routes[i]
        app[req.params.type || 'all'](route, proxy({
            target: 'http://' + targetProxyHost + ':' + targetProxyPort,
            changeOrigin: true,
            logLevel: 'debug',
            limit: '50mb'
        }));
    }
    log.info('service registered [' + name + '] http://' + host + ':' + port + '/' + routes + '] ~ > ' + ' http://' + targetProxyHost + ':' + targetProxyPort)
    res.send('ok')
})

app.listen(port, () => {
});