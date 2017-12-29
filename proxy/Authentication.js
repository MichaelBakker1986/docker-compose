const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const domain = 'http://127.0.0.1:8091'
const host = process.env.HOST || '127.0.0.1'
const developer = false;//(host === 'localhost' || host === '127.0.0.1');

class Authentication {
    constructor(app) {

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
        app.use(passport.initialize());
        app.use(passport.session());

    }

    resolveId(targetUrl) {
        return passport.authenticate('facebook', {
            failureRedirect: '/fail',
            redirect_uri: targetUrl,
            successRedirect: targetUrl,
            callbackURL: targetUrl,
            passReqToCallback: true
        })
    }
}

class MockAuthentication {
    constructor(app) {

        passport.use(new LocalStrategy({
                clientID: '180467995863988',
                clientSecret: 'b10828749578d1bd1402e8c57b72b01d',
                callbackURL: "http://" + domain,
                passReqToCallback: true
            },
            function(req, username, password, done) {
                req.url = req.params["0"];
                req.orginalUrl = req.params["0"];
                const user = {
                    id: username,
                    displayName: username
                }
                return done(null, user);
            }
        ));
        passport.serializeUser(function(user, cb) {
            cb(null, user);
        });
        passport.deserializeUser(function(obj, cb) {
            cb(null, obj);
        });
        app.use(passport.initialize());
        app.use(passport.session());
    }

    resolveId(targetUrl) {
        return passport.authenticate('local', {
            failureRedirect: '/fail',
            redirect_uri: targetUrl,
            successRedirect: targetUrl,
            callbackURL: targetUrl,
            passReqToCallback: true
        })
    }
}

module.exports = developer ? MockAuthentication : Authentication