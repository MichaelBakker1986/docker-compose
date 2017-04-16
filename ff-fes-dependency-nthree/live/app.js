global.loglevel = 'info'
var log = require('ff-log');
var restify = require('restify');
var serveStatic = require('serve-static-restify')
var documentation = require('../documentation/fesjs-documentation')

function respond(req, res, next) {
    try {
        documentation.createGraph().then(function (dotGraph) {
            res.send(dotGraph)
        });
    } catch (err) {
        res.send("Internal error")
    }
    //not part of the Async pattern
    next();
}
var server = restify.createServer({
    name: 'ff-documentation'
});
server.get('/documentation', respond);
server.pre(serveStatic(__dirname + '/../documentation/'))
server.listen(9002, function () {
    log.info('Server startup [' + server.name + ']' + server.server._connectionKey);
    log.info('Test path: [%s]', 'http://localhost:9002/documentation')
});


