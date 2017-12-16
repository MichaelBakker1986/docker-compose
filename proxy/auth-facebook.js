var express = require('express');
var request = require('request')
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var port = 8091;
var host = "94.213.30.5";
const domain = 'appmodel.nl'
passport.use(new Strategy({
        clientID: '180467995863988',
        clientSecret: 'b10828749578d1bd1402e8c57b72b01d'
    },
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }));
passport.serializeUser(function(user, cb) {
    cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});
var app = express();
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('express-session')({secret: 'keyboard ca1t', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/fail', function(req, res) {
    res.json({faillogin: req.user});
});
app.all('*', function(req, res, next) {
        if (req.isAuthenticated()) {
            req.pipe(request("http://localhost:" + 7080 + req.originalUrl)).pipe(res);
        } else {
            passport.authenticate('facebook', {
                failureRedirect: '/fail',
                callbackURL: "http://" + domain + req.originalUrl
            })(req, res, next);
        }
    },
    function(reqFromFacebook, res) {
        reqFromFacebook.pipe(request("http://localhost:" + 7080 + reqFromFacebook.params["0"])).pipe(res);
    }
)
app.listen(port, function() {
    console.log('<a href="http://' + domain + '/">AUTH Server</a><span> deployed.</span>');
    console.log('<a href="http://' + domain + '/login/facebook">AUTH Server</a><span> deployed.</span>');
    console.log('<a href="http://' + domain + '/profile">AUTH Server</a><span> deployed.</span>');
    console.log('<a href="http://' + domain + '/id/DEMO/ui/grid_example.html#MVO&DEMO">AUTH Server</a><span> deployed.</span>');
});