const exposed_authentication_port = process.env.EXPOSED_AUTHENTICATION_PORT || 8091;
const domain = process.env.DOMAIN || 'appmodel.org'
var express = require('express');
var app = express();
/**
 * WERKT...
 * @type {socialLoginClass}
 */
var socialLoginClass = require("social-login");
var socialLogin = new socialLoginClass({
    //    returnRaw: true,
    app: app,    // ExpressJS instance
    url: "http://" + domain,  // Your root url
    onAuth: function(req, type, uniqueProperty, accessToken, refreshToken, profile, done) {

        // This is the centralized method that is called when the user is logged in using any of the supported social site.
        // Setup once and you're done.
        done(null, profile);   // Return the user and continue
        /* findOrCreate({
             profile: profile,        // Profile is the user's profile, already filtered to return only the parts that matter (no HTTP response code and that kind of useless data)
             property: uniqueProperty, // What property in the data is unique: id, ID, name, ...
             type: type            // What type of login that is: facebook, foursquare, google, ...
         }, function(user) {
             done(null, user);   // Return the user and continue
         });*/
    }
});
// Setup the various services:
socialLogin.use({
    facebook: {
        settings: {
            clientID: "180467995863988",
            clientSecret: "b10828749578d1bd1402e8c57b72b01d"
        },
        url: {
            auth: "/auth/facebook",           // The URL to use to login (<a href="/auth/facebook">Login with facebook</a>).
            callback: "/",  // The Oauth callback url as specified in your facebook app's settings
            success: "/interest",                        // Where to redirect the user once he's logged in
            fail: '/auth/facebook/fail'       // Where to redirect the user if the login failed or was canceled.
        }
    }
});
app.get('/auth/facebook', function(req, res) {
    res.end('<html><body><a href="/auth/facebook">Login with facebook</a></body></html>')
})
app.get('/interest', function(req, res) {
    res.end('interest' + res.user)
});

app.listen(exposed_authentication_port, function() {
    console.log('<a href="http://' + host + ':' + exposed_authentication_port + '/auth/facebook">AUTH Server</a><span> deployed.</span>');
});