const passport = require('passport');
const FaceBookStrategy = require('passport-facebook').Strategy;

class Authentication {
    constructor(app) {

        passport.use(new FaceBookStrategy({
                clientID         : '180467995863988',
                clientSecret     : 'b10828749578d1bd1402e8c57b72b01d',
                redirect_uri     : "http://94.213.30.5:8082",
                passReqToCallback: true
            },
            function(req, refreshToken, accessToken, profile, cb) {
                profile._fresh = true;
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
            failureRedirect  : '/fail',
            redirect_uri     : targetUrl,
            successRedirect  : targetUrl,
            callbackURL      : targetUrl,
            passReqToCallback: true
        })
    }
}

module.exports = Authentication