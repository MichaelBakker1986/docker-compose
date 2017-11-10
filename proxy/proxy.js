var port = 7080;
var express = require('express');
var http = require('http')
var app = express();
var hostname = require('os').hostname();
app.use(require('express-favicon')());
var proxy = require('http-proxy-middleware');
var express_proxy = require('express-http-proxy');
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
app.use(require('cors')())
app.set('port', port)
app.use(methodOverride())
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

app.listen(80, () => {
    require('dns').lookup(hostname, (err, add, fam) => {
        let domain = 'http://' + add + ':' + port + '/';
        app.use('*/showcase', proxy({target: 'http://' + add + ':8083', changeOrigin: true}));
        app.post('*/saveFFL_LME', express_proxy('http://' + add + ':8080', {limit: '50mb'}));
        app.post('*/preview', express_proxy('http://' + add + ':8080', {limit: '50mb'}));
        app.use('*/ide/*', proxy({
            toProxy: true,
            target: 'http://' + add + ':8083',
            changeOrigin: false,
            pathRewrite: {
                '/ide/': '/'
            }
        }));
        app.use('*/models', proxy({target: 'http://' + add + ':8080', changeOrigin: true}));
        app.use('*/branches', proxy({target: 'http://' + add + ':8080', changeOrigin: true}));
        app.use('*/data', proxy({target: 'http://' + add + ':8085', changeOrigin: true}));
        app.use('*/resources', proxy({target: 'http://' + add + ':8083', changeOrigin: true}));
    })
});// Listen for the `error` event on `proxy`.
