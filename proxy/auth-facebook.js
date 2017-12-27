/**
 * Request gateway
 * Delegates Authentication to {Authentication.js}
 * Delegates Authorization to ACL {Authorization.js}
 */
const express = require('express');
const httpProxy = require('http-proxy');
const Authorization = require('./Authorization').Authorization
const Authentication = require('./Authentication').Authentication
const auth = new Authorization();

const proxy = httpProxy.createProxyServer({});
const port = process.env.FACEBOOK_PROXY_PORT || 8091;
const internalRedirectUrl = "http://localhost:" + 7080;
const domain = 'appmodel.org'


var app = express();
const bodyParser = require('body-parser');
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
/*app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'})); // To support JSON-encoded bodies*/
app.use(require('express-session')({secret: 'elm a1tm', resave: true, saveUninitialized: true}));

const idProvider = new Authentication(app);

app.get('/fail', function(req, res) {
    res.status(401).send('Unauthorized facebook user');
});

/**
 * Hook on proxy response, when the response includes the x-auth-id header. The secure internal system implies the requester owns the new hash.
 */
proxy.on('proxyRes', function(res) {
    if (res.headers['x-auth-id']) {
        const id = res.req.path.split('/')[2]
        const authkey = res.headers['x-auth-id']
        auth.addModelInstancePrivileges(id, authkey)
    }
});

app.all('*', function(req, res, next) {
        //Bypass facebook authentication because topicus-internal network can not allow incoming requests.
        if (true || req.isAuthenticated()) {
            //TODO: sessionID is fine to use, but all more fine grained privileges should be created for new users to keep separated state
            const userId = req.user ? req.user.id : 'guest';//req.sessionID;//
            auth.isAuthorizedToView(userId, req.originalUrl, function(err, authresponse) {
                if (authresponse) {
                    console.log("User " + userId + " is allowed to view " + req.originalUrl)
                    proxy.web(req, res, {
                        target: internalRedirectUrl + '/id/' + userId + req.originalUrl,
                        changeOrigin: true,
                        /*toProxy: true,*/
                        limit: '50mb',
                        ignorePath: true
                    });
                } else {
                    console.warn("User " + userId + " is not allowed to view " + req.originalUrl)
                    res.status(401).send('Unauthorized facebook user [' + (req.user ? req.user.displayName : 'guest') + ']');
                }
            })
        } else {
            idProvider("http://" + domain + req.params["0"])(req, res, next);
        }
    }
)
app.listen(port, function() {
    console.log('<a href="http://' + domain + '/">AUTH Server</a><span> deployed.</span>');
});