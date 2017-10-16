//default test message
var browserify = require('browserify-middleware');
var express = require('express');
var app = express();
var port = 8080;
var serveStatic = require('serve-static');
var favicon = require('serve-favicon')
var compression = require('compression')
var browser = require('browserify');
var fastjson = require('browserify-fastjson');

var githubAuth = require('github-auth');
var config = {
    team: 'lme',
    organization: 'lme',
    autologin: true, // This automatically redirects you to github to login.
    hideAuthInternals: true // After authentication this redirects to original url but without query parameters 'code' and 'state'.
};
var gh = githubAuth('Iv1.eba2e3eea8f35f4d', '71bb2fb50341910f4497acbbf44a8cb25a17a825', config);
app.use(gh.authenticate);

browserify.settings({
    transform: [fastjson]
})
app.use(compression())

app.get('/create', function(req, res) {
    var b = browser({
        insertGlobals: true,
        debug: false
    });
    b.add(__dirname + '/public/javascripts/output.js');
    b.transform(fastjson);
    b.bundle().pipe(res);
});

app.use('/web.js', browserify(__dirname + '/public/javascripts/main.js', {
    cache: true,
    gzip: true,
    insertGlobals: true,
    debug: false,
    minify: true,
    precompile: true
}));
app.use(serveStatic(__dirname)).listen(port, function() {
    require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        console.log('<a href="http://' + add + ':' + port + '/public/index.html">DEMO Server</a><span> deployed (test2).</span>');
    })
});