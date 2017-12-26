var express = require('express');
var request = require('request')
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var port = 8091;//process.env.FACEBOOK_PROXY_PORT || 8091;
const internalRedirectUrl = "http://localhost:" + 7080;
const domain = 'appmodel.org'
passport.use(new Strategy({
        clientID: '180467995863988',
        clientSecret: 'b10828749578d1bd1402e8c57b72b01d',
        callbackURL: "http://" + domain,
        passReqToCallback: true
    },
    function(req, refreshToken, accessToken, profile, cb) {
        req.url = req.params["0"];
        req.orginalUrl = req.params["0"];
        return cb(null, profile);
    }));
passport.serializeUser(function(user, cb) {
    cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});
var app = express();
const bodyParser = require('body-parser');
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'})); // To support JSON-encoded bodies
app.use(require('express-session')({secret: 'keyboard ca1t', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/fail', function(req, res) {
    res.status(400).send('Unauthorized facebook user');
    res.sendStatus(401);
});
app.all('*', function(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.id == 1683958891676092 || req.user.id == 1747137275360424) {
                proxy.web(req, res, {
                    target: internalRedirectUrl + '/id/' + req.user.id + req.originalUrl,
                    changeOrigin: true,
                    toProxy: true,
                    limit: '50mb',
                    ignorePath: true
                });
            } else {
                res.send(400, 'Unauthorized facebook user [' + req.user.name + ']');
                res.send(401);
            }
        } else {
            const targetUrl = "http://" + domain + req.params["0"];
            passport.authenticate('facebook', {
                failureRedirect: '/fail',
                redirect_uri: targetUrl,
                successRedirect: targetUrl,
                callbackURL: targetUrl,
                passReqToCallback: true
            })(req, res, next);
        }
    }
)
app.listen(port, function() {
    console.log('<a href="http://' + domain + '/">AUTH Server</a><span> deployed.</span>');
});