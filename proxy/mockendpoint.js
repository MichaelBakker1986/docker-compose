var port = 7080;
var host = process.env.HOST || '127.0.0.1';
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
    app.all('*', function(req, res, next) {
        res.end(req.originalUrl)
    })
    console.info('Listening on ' + domain)
});
