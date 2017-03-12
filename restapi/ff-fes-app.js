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
    new Promise(function (success, err) {
        try {
            success(Respond[req.params.function](req.params.data, req.params.value));
        } catch (err) {
            err(err);
        }
    }).then(function (answer) {
        log.info('promise succes')
        res.send(answer)
    }).catch(function (err) {
        res.send('Program error');
        log.error('Output error', err)
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
server.get('/:function/:data', respond);
server.get('/:function/:data/:value', respond);

server.listen(9001, function () {
    log.info('Server startup [' + server.name + ']' + server.server._connectionKey);
});