const port = 8006;
const host = process.env.HOST || '127.0.0.1';
const internal_proxy_port = process.env.EXPOSED_AUTHENTICATION_PORT || 7080
const proxy = require('http-proxy-middleware');

const express = require('express');
const app = express();
const https = require('https');

app.set('port', port)
app.set('host', host)

app.use(require('cors')())
app.use(require('morgan')(':remote-addr - :status :method :url :res[content-length] b - :response-time[0] ms'));

app.listen(port, () => {
    app.post('/id/:id/figure/KinderSpaarPlan', proxy({
        target: 'http://127.0.0.1:' + internal_proxy_port,
        changeOrigin: true,
        logLevel: 'debug',
        limit: '50mb',
        pathRewrite: {
            '^/id/321321/': '/'
        }
    }));
})
