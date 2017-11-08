/**
 * Identification module, not working yet
 */
//var ip = require('ip')
//var session = require('express-session')
var port = 8091;
var host = "94.213.30.5";
var express = require('express');
var app = express();
var log = require('ff-log')
app.get('/favicon.ico', require('express-favicon')());
/*
app.use(require('morgan')('combined'));
*/
var passport = require('passport');
//var request = require('request');
/*var bodyParser = require('body-parser')
app.use(bodyParser.json({limit: '50mb'}));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true,
    limit: '50mb'
}));*/
/*var cookieParser = require('cookie-parser')
app.use(cookieParser())
var methodOverride = require('method-override')
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(session(
    {secret: 'my_precious'}
))*/
var FacebookStrategy = require('passport-facebook').Strategy;
/*var Strategy = require('passport-facebook').Strategy;
passport.use(new Strategy({
        clientID: '182771215625837',
        clientSecret: 'c0755a0a4c3e73103e4abe09e3bf8acd',
        enableProof: true
    },
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    })
);*/
//app.get('/login', passport.authenticate('facebook'));
/*app.get('/favicon.ico', function(req, res, next) {
    res.end('');
});*/

passport.use(new FacebookStrategy({
        clientID: '182771215625837',
        clientSecret: 'c0755a0a4c3e73103e4abe09e3bf8acd',
        callbackURL: "http://" + host + ":" + port,
    }, function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));// serialize and deserialize
app.use(passport.initialize());
app.use(passport.session());
app.use('/login', function(res, req, next) {
  //  req.end('login')
});// test authentication
/*
app.use('/interest', function(res, req, next) {
    req.end('interest' + req.user)
});
*/

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    next();//res.redirect('/login');
}

app.use('/auth/facebook', function(req, res, next) {
    passport.authenticate('facebook', {
            session: true, failureRedirect: '/test',
            callbackURL: "/test",
            scope: ['email']
        }
    )(req, res, next)
}, function(reqFromFacebook, res) {
    res.send('test')
});
app.use('/test',
    ensureAuthenticated,
    function(req, res) {
        // do something with req.user
        res.send(req.user ? 200 : 401);
    }
);
/*app.use('*', function(req, res, next) {
    console.info(req.originalUrl)
    passport.authenticate('facebook', {
        failureRedirect: '/login',
        callbackURL: "http://" + host + ":" + port,
        session: true,
        scope: []
    })(req, res, next);
}, function(reqFromFacebook, res) {
    res.end('test')
    /!*var url = "http://localhost:" + 8080 + reqFromFacebook._parsedUrl.pathname.substring('/id'.length);
    log.info('forward proxy: ' + url + "@" + reqFromFacebook.user.id)
    delete reqFromFacebook.body;
    reqFromFacebook.pipe(request(url)).pipe(res);*!/
});*/
app.listen(port, function() {
    require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        console.log('<a href="http://94.213.30.5:8091/auth/facebook">AUTH Server</a><span> deployed.</span>');
    })
});