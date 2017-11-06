/**
 * Identification module, not working yet
 */
var ip = require('ip')
var port = 8082;
var express = require('express');
var app = express();
var log = require('ff-log')
app.use(require('express-favicon')());
app.use(require('morgan')('combined'));
var passport = require('passport');
var request = require('request');
var serveStatic = require('serve-static');
var Strategy = require('passport-facebook').Strategy;
passport.use(new Strategy({
        clientID: '182771215625837',
        clientSecret: 'c0755a0a4c3e73103e4abe09e3bf8acd',
        enableProof: true
    },
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    })
);
app.get('/login', passport.authenticate('facebook'));
app.use(serveStatic(__dirname));
app.use('/id/*', function(req, res, next) {
    console.info(req.originalUrl)
    passport.authenticate('facebook', {
        failureRedirect: '/login',
        callbackURL: "http://localhost:" + 8082 + req.originalUrl,
        session: false,
        scope: []
    })(req, res, next);
}, function(reqFromFacebook, res) {
    var url = "http://localhost:" + 8080 + reqFromFacebook._parsedUrl.pathname.substring('/id'.length);
    log.info('forward proxy: ' + url + "@" + reqFromFacebook.user.id)
    delete reqFromFacebook.body;
    reqFromFacebook.pipe(request(url)).pipe(res);
});
app.listen(port, function() {
    require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        console.log('<a href="http://' + add + ':' + port + '/public/index.html">AUTH Server</a><span> deployed.</span>');
    })
});