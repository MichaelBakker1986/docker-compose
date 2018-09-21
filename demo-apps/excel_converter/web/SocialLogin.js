var sociallogin = require('sociallogin');

exports.setup = function* (passportModule) {
    // Initialise package
    // Add Strategies function call
    sociallogin.addPassportStategies(passportModule, {
        facebook: {
            clientID    : process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_SECRET
        }
    }, function addUser(providerId, providerName, displayName, emailAddress, username, passportDone) {
        User.findOne({
            'providerId'  : providerId,
            'providerName': providerName
        }, function(err, user) {
            if (err) {
                return passportDone(err);
            }
            if (!user) {
                user = new User({
                    name        : displayName,
                    username    : username || emailAddress.split('@')[0],
                    providerName: providerName,
                    providerId  : providerId,
                    email       : emailAddress,
                    roles       : ['authenticated']
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return passportDone(err, user);
                });
            } else {
                return passportDone(err, user);
            }
        });
    }, siteUrl);

    /** userAuthenticationCallback(providerId,providerName,displayName,emailAddress,username,passportDone) - callback function that gives user information to register or login a user . Implement your own based on the user needed for your application.
     // providerId - the unique identifier based on the oauth provider
     // providerName - the provider name based on the above list e.g google
     // displayName - display name from the provider (might be undefined)
     // emailAddress - email address from the provider (might be undefined)
     // username - username from the provider (might be undefined)
     // passportDone(err,user) - passportJS function that you need to call when the user is created or when an error occured
     e.g*/

    /** siteUrl - the website url and protocol (https is recomended) that uses this plugin e.g https://sociallogin.heroku.com

     // Add authentication urls
     sociallogin.addAuthenticationUrls(passportModule, expressModule,signInController, authenticationController, failureRedirectUrl, config);
     * passportModule - an instance of the passportJS module
     * expressModule - an instance of the express app
     * signInController(req,res) - check if user is authenticated and redirect
     e.g
     function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.redirect('#!/login');
};
     * authenticationController(req,res) - authenticated user callback
     function(req, res) {
    res.redirect('/');
};
     * failureRedirectUrl - url to redirect to if authentication fails
     e.g '#!/login'
     * config - a json object that holds the configured providers and their credentials. Same as above

     // Add urls for provider specific authentication to your views. All the configured providers will be accessible with your applicationUrl/oauth/providerName
     e.g
     <a href="/auth/yahoo" class="button">
     <span>Log In With Yahoo</span>
     </a>*/
}