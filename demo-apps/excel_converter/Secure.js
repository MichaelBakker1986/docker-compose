var express = require('express');
var passport = require('passport');

var FacebookTokenStrategy = require('passport-facebook');

//CORS middleware  In my configuration the client is running localhost:4200
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
}

passport.use(new FacebookTokenStrategy({
    access_token: '180467995863988|mk3D4ccNbGMindOxcKsIzw9H74E',
    clientID    : process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
}, function(accessToken, refreshToken, profile, done) {
    let user = {
        'email': profile.emails[0].value,
        'name' : profile.name.givenName + ' ' + profile.name.familyName,
        'id'   : profile.id,
        'token': accessToken
    };
    console.info('u', user)

    // You can perform any necessary actions with your user at this point,
    // e.g. internal verification against a users table,
    // creating new user entries, etc.

    return done(null, user); // the user object we just made gets passed to the route's controller as `req.user`

}));

// Create a new Express application.
var app = express();

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
/*
app.use(require('express-session')({ secret: 'elm a1tm', resave: true, saveUninitialized: true }));
*/

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(allowCrossDomain);

// Initialize Passport and restore authentication state, if any, from the
// session.
/*passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));
app.use(passport.initialize());
app.use(passport.session());*/
//  For my app I plan to make this the GraphQL end-point
app.get(
    "/protected",
    passport.authenticate('facebook', { session: false }),
    function(err, user, info) {
        console.log('insde endpoint', user, req.isAuthenticated());
        //console.log('error', err, 'user', user, 'info', info);
        if (err) {
            if (err.oauthError) {
                var oauthError = JSON.parse(err.oauthError.data);
                res.status(401).send(oauthError.error.message);
            } else {
                res.send(err);
            }
        } else {
            // do the logic of actual end point here.
            res.send(user);
        }
    }
);
console.log('running on port 3000');
app.listen(3000);