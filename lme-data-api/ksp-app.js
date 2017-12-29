const port = 8006;
const host = process.env.HOST || '127.0.0.1';
const internal_proxy_port = process.env.INTERNAL_PROXY_PORT || 7081
const domain = process.env.DOMAIN || (host + ':' + internal_proxy_port + "/id/guest")
const proxy = require('http-proxy-middleware');

const express = require('express');
const app = express();
const https = require('https');

app.set('port', port)
app.set('host', host)
app.set('domain', domain)
app.use(require('cors')())
app.use(require('morgan')(':remote-addr - :status :method :url :res[content-length] b - :response-time[0] ms'));

app.listen(port, () => {
    app.get('/id/:id/figure/KinderSpaarPlan', proxy({
        target: 'http://127.0.0.1:' + internal_proxy_port,
        changeOrigin: true,
        logLevel: 'debug',
        limit: '50mb',
        pathRewrite: {
            '^/id/321321/': '/'
        }
    }));
})
