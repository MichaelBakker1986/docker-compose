process.loglevel = 'debug'
var log = require('ff-log');
log.info('Startup ff-restapi')
var restify = require('restify');
var apiimpl = require('./apiimpl');
var DBConn = require('./DBConnector')
var Promise = require('promise')
var Respond = new apiimpl(DBConn);

/**
 * server:port to -> @apiimpl  Generic pass-through REST-api
 */
function respond(req, res, next) {
    //handle request Async by default, create Promise, result when done.
    log.info('Call context:[%s] function[%s] variable[%s] data[%s]', req.params.context, req.params.function, req.params.variable, req.params.value)
    new Promise(function (success, fail) {
        try {
            //resolve context key to stored values
            success(Respond[req.params.function](req.params.context, req.params.variable, req.params.value));
        } catch (err) {
            fail(err);
        }
    }).then(function (answer) {
        log.info('End call succes context:[%s] function[%s] variable[%s] data[%s]', req.params.context, req.params.function, req.params.variable, req.params.value)
        res.send(answer)
    }).catch(function (err) {
        res.send('Program error.');
        log.error('Call context fail:[%s] function[%s] variable[%s] data[%s]', req.params.context, req.params.function, req.params.variable, req.params.value)
        log.error("trace", err);
    });
    //not part of the Async pattern
    next();
}
var server = restify.createServer({
    formatters: {
        'application/json': function (req, res, body, cb) {
            res.setHeader('Content-Type', 'application/json');
            return cb(null, JSON.stringify(body, null, 2));
        }
    },
    name: 'ff-restapi'
});
server.get('/:context/:function/:variable', respond);
server.get('/:context/:function/:variable/:value', respond);

server.listen(9001, function () {
    log.info('Server startup [' + server.name + ']' + server.server._connectionKey);
    log.info('Test path: [%s]', 'http://localhost:9001/user1/value/Q_ROOT')
    log.info('Test path: [%s]', 'http://localhost:9001/user1/value/Q_ROOT/100')
});