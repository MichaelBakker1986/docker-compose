var express       = require('express'),
    mongodb       = require('mongodb'),
    passport      = require('passport'),
    node_acl      = require('acl'),
    app           = express(),
    localStrategy = require('passport-local').Strategy,
    acl;
var r = require('rethinkdbdash')({ host: '185.205.210.59', port: 28015 })
var RethinkDBBackend = require('acl-backend-rethinkdb')

var options = {
    db         : 'ffl',
    host       : '185.205.210.59',
    useSingle  : true,
    ensureTable: true
}

// Some test data. Get this from your database.
var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' },
    { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];
// Setup express
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true, limit: '50mb' }));
app.use(require('method-override')());
app.use(require('cookie-session')({ secret: 'Example' }));
// Initialize Passport. Also use passport.session() middleware, to support
// persistent login sessions.
app.use(passport.initialize());
app.use(passport.session());

// Error handling
app.use(function(error, request, response, next) {
    if (!error) return next()
    response.send(error.msg, error.errorCode);
});

authentication_setup();
authorization_setup()

function authentication_setup() {
    // Setup session support
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => find_user_by_id(id, (error, user) => done(error, user)));

    // Setup strategy (local in this case)
    passport.use(new localStrategy(
        function(username, password, done) {
            process.nextTick(function() {
                find_by_username(username, function(error, user) {
                    if (error) return done(error);
                    if (!user) return done(null, false, { message: 'Unknown user ' + username });
                    if (user.password != password) return done(null, false, { message: 'Invalid password' });
                    // Authenticated
                    return done(null, user);
                });
            });
        }
    ));
}

function authorization_setup(error, db) {
    var mongoBackend = new RethinkDBBackend(r, options)
    acl = new node_acl(mongoBackend, { debug: (msg) => console.log('-DEBUG-', msg) });
    set_roles();
    set_routes();
}

function set_roles() {
    acl.allow([
        {
            roles : 'admin',
            allows: [
                { resources: '/secret', permissions: '*' }
            ]
        }, {
            roles : 'user',
            allows: [
                { resources: '/secret', permissions: 'get' }
            ]
        }, {
            roles : 'guest',
            allows: []
        }
    ]);
    // Inherit roles
    //  Every user is allowed to do what guests do
    //  Every admin is allowed to do what users do
    acl.addRoleParents('user', 'guest');
    acl.addRoleParents('admin', 'user');
    for (var i = 0; i < 1200; i++) {
        acl.allow('admin', '/atest123-' + i, 'VIEW');
    }
}

// Defining routes ( resources )
function set_routes() {
    // Check your current user and roles
    app.get('/status', function(request, response) {
        acl.userRoles(get_user_id(request, response), function(error, roles) {
            response.send('User: ' + JSON.stringify(request.user) + ' Roles: ' + JSON.stringify(roles));
        });
    });
    // Only for users and higher
    app.get('/secret',
        // Actual auth middleware
        [authenticated, acl.middleware(1, get_user_id)],
        function(request, response) {
            response.send('Welcome Sir!');
        }
    );
    // Logging out the current user
    app.get('/logout', function(request, response) {
        request.logout();
        response.send('Logged out!');
    });
    // Logging in a user
    //  http://localhost:3500/login?username=bob&password=secret
    app.get('/login',
        passport.authenticate('local', {}),
        function(request, response) {
            response.send('Logged in!');
        }
    );
    // Setting a new role
    app.get('/allow/:user/:role', function(request, response, next) {
        acl.addUserRoles(request.params.user, request.params.role);
        response.send(request.params.user + ' is a ' + request.params.role);
    });
    // Unsetting a role
    app.get('/disallow/:user/:role', function(request, response, next) {
        acl.removeUserRoles(request.params.user, request.params.role);
        response.send(request.params.user + ' is not a ' + request.params.role + ' anymore.');
    });
}

// This gets the ID from currently logged in user
function get_user_id(request, response) {
    // Since numbers are not supported by node_acl in this case, convert
    //  them to strings, so we can use IDs nonetheless.
    return request.user && request.user.id.toString() || false;
}

// Helper used in session setup by passport
function find_user_by_id(id, callback) {
    var index = id - 1;
    if (users[index]) {
        callback(null, users[index]);
    } else {
        var error = new Error('User does not exist.');
        error.status = 404;
        callback(error);
    }
}

// Helper used in the local strategy setup by passport
function find_by_username(username, callback) {
    var usersLength = users.length, i;
    for (i = 0; i < usersLength; i++) {
        var user = users[i];
        if (user.username === username) return callback(null, user)
    }
    return callback(null, null);
}

// Authentication middleware for passport
function authenticated(request, response, next) {
    if (request.isAuthenticated()) return next();
    response.send(401, 'User not authenticated');
}

const port = 3500;
app.listen(3500, () => console.log('http://localhost:' + port));