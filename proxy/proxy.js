var port = 7080;
var host = process.env.HOST || 'localhost';
const domain = 'http://' + host + ':' + port + '/';
const express = require('express');
const app = express();
const proxy = require('http-proxy-middleware');
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

app.listen(port, () => {
    app.use('*/showcase', proxy({target: 'http://' + host + ':8083', changeOrigin: true}));
    app.all('*/ide/*', proxy({
        toProxy: true,
        target: 'http://' + host + ':8083',
        changeOrigin: false,
        pathRewrite: {
            '/ide/': '/'
        }
    }));
    app.use('*/ui/*', proxy({
        toProxy: true,
        target: 'http://' + host + ':8083',
        changeOrigin: false,
        pathRewrite: {
            '/ui/': '/'
        }
    }));
    app.use('*/models', proxy({target: 'http://' + host + ':8080', changeOrigin: true}));
    app.use('*/branches', proxy({target: 'http://' + host + ':8080', changeOrigin: true}));
    app.all('*/data', proxy({target: 'http://' + host + ':8085', changeOrigin: true}));
    app.use('*/resources/*', proxy({target: 'http://' + host + ':8083', changeOrigin: true}));
});
