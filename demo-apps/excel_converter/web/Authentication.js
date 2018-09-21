const passport = require('passport');
const FaceBookStrategy = require('passport-facebook').Strategy;
const FB_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID
const FACEBOOK_SECRET = process.env.FACEBOOK_SECRET
const domain = process.env.DOMAIN || "http://94.213.30.5:8082"

class Authentication {
    constructor(app) {

        passport.use(new FaceBookStrategy({
                clientID         : FB_CLIENT_ID,
                clientSecret     : FACEBOOK_SECRET,
                redirect_uri     : domain,
                passReqToCallback: true
            },
            function(req, refreshToken, accessToken, profile, cb) {
                profile._fresh = true;
                req.url = req.params["0"];
                req.orginalUrl = req.params["0"];
                return cb(null, profile);
            }));
        passport.serializeUser((user, cb) => cb(null, user));
        passport.deserializeUser((obj, cb) => cb(null, obj));
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