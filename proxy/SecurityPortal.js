/**
 * Request gateway
 * Delegates Authentication to {Authentication.js}
 * Delegates Authorization to ACL {Authorization.js}
 * (!) when running in developer mode. add to hosts file. (its registered as facebook-app known host.
 *        127.0.0.1  kspapp.local.com
 *     -- https://stackoverflow.com/questions/2459728/how-to-test-facebook-connect-locally
 */
const exposed_authentication_port = process.env.EXPOSED_AUTHENTICATION_PORT || 8091;
const internal_proxy_port = process.env.INTERNAL_PROXY_PORT || 7081
const internalRedirectUrl = "http://127.0.0.1:" + internal_proxy_port;

const domain = process.env.DOMAIN || 'appmodel.org'

const express = require('express');
const httpProxy = require('http-proxy');
var nofavicon = require("express-no-favicons")
const Authorization = require('./Authorization').Authorization
const Authentication = require('./Authentication')
const auth = new Authorization();
const log = require('log6')
const proxy = httpProxy.createProxyServer({});
const app = express();
const bodyParser = require('body-parser')
const staticresources = {
    'css': true,
    'js': true,
    'jpg': true,
    'woff2': true,
    'woff': true,
    'ttf': true
}
app.use(nofavicon());
app.use(require('cors')())
app.use(require('morgan')(':remote-addr - :status :method :url :res[content-length] b - :response-time[0] ms', {
    skip: function(req, res) {
        const r = req.originalUrl.split('?')[0].split('.');
        return staticresources[r[r.length - 1]] || false;
    }
}));
app.use(require('cookie-parser')());
app.use(require('express-session')({secret: 'elm a1tm', resave: true, saveUninitialized: true}));
const idProvider = new Authentication(app);
app.get('/fail', (req, res) => {
    res.status(401).send('Unauthorized facebook user');
});
app.get('/whoami', (req, res) => {
    res.status(200).send(req.isAuthenticated() ? (req.user.displayName + ',' + req.user.id) : 'guest')
})
/**
 * proxy every request
 */
app.all('*', function(req, res, next) {
        /**
         * There is two kinds of allowed requests,
         * 1) authenticated and authorized
         * 2) anonymous and no authorized required
         */
        const absoluteUrl = req.originalUrl.split('?')[0];
        const host = req.headers.host;
        if (auth.isAnonymous(absoluteUrl) || req.isAuthenticated()) {
            //TODO: sessionID is fine to use, but all more fine grained privileges should be created for new users to keep separated state
            const userId = req.user ? req.user.id : 'guest';//req.sessionID;//
            if (req.user && req.user._fresh) {//guest users are initially added.
                auth.registerUser(userId)
                req.user._fresh = false;
            }
            auth.isAuthorizedToView(userId, absoluteUrl, function(err, authresponse) {
                if (log.DEBUG) log.debug("User " + userId + " is " + (authresponse ? "not" : "") + " allowed to view " + absoluteUrl)
                if (authresponse) {
                    proxy.web(req, res, {
                        target: internalRedirectUrl + '/id/' + userId + req.originalUrl,
                        changeOrigin: true,
                        limit: '50mb',
                        ignorePath: true
                    });
                } else {
                    res.status(401).send('Unauthorized facebook user [' + (req.user ? req.user.displayName : 'guest') + ']');
                }
            })
        } else {
            idProvider.resolveId("http://" + domain + req.params["0"])(req, res, next);
        }
    }
)

/**
 * Hook on proxy response,
 * when the response includes the x-auth-id header.
 * The secure internal system implies the requester owns the new hash.
 */
proxy.on('proxyRes', (res) => {
    if (res.headers['x-auth-id']) auth.addModelInstancePrivileges(res.req.path.split('/')[2], res.headers['x-auth-id'])
});

app.listen(exposed_authentication_port, () => {
    log.info('<a href="http://' + domain + '/">AUTH Server</a><span> deployed.</span>');
});