/**
 * Request gateway
 * Delegates Authentication to {Authentication.js}
 * Delegates Authorization to ACL {Authorization.js}
 * TODO: Bypass all authorization and identification in developer mode
 */
const exposed_authentication_port = process.env.EXPOSED_AUTHENTICATION_PORT || 8091;
const internal_proxy_port = process.env.INTERNAL_PROXY_PORT || 7081
const internalRedirectUrl = "http://127.0.0.1:" + internal_proxy_port;

const domain = process.env.DOMAIN || 'appmodel.org'

const express = require('express');
const httpProxy = require('http-proxy');
const Authorization = require('./Authorization').Authorization
const Authentication = require('./Authentication')
const auth = new Authorization();
const log = require('log6')
const proxy = httpProxy.createProxyServer({});
const app = express();
const bodyParser = require('body-parser');

app.use(require('cors')())
//if (log.DEBUG)
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('express-session')({secret: 'elm a1tm', resave: true, saveUninitialized: true}));
const idProvider = new Authentication(app);
app.get('/fail', (req, res) => {
    res.status(401).send('Unauthorized facebook user');
});
/**
 * proxy every request
 */
app.all('*', function(req, res, next) {
        /**
         * Bypass facebook authentication because topicus-internal network can not allow incoming requests.
         *
         * There is two kinds of allowed requests,
         * 1) authenticated and authorized
         * 2) anonymous and no authorized required
         */
        if (auth.isAnonymous(req.originalUrl) || req.isAuthenticated()) {
            //TODO: sessionID is fine to use, but all more fine grained privileges should be created for new users to keep separated state
            const userId = req.user ? req.user.id : 'guest';//req.sessionID;//
            auth.isAuthorizedToView(userId, req.originalUrl, function(err, authresponse) {
                if (authresponse) {
                    if (log.DEBUG) log.debug("User " + userId + " is allowed to view " + req.originalUrl)
                    proxy.web(req, res, {
                        target: internalRedirectUrl + '/id/' + userId + req.originalUrl,
                        changeOrigin: true,
                        limit: '50mb',
                        ignorePath: true
                    });
                } else {
                    if (log.DEBUG) log.debug("User " + userId + " is not allowed to view " + req.originalUrl)
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