var log = require('ff-log');
log.log('Startup ff-restapi')
var restify = require('restify');
var apiimpl = require('./apiimpl');
var DBConn = require('./DBConnector')
var Respond = new apiimpl(DBConn);

function respond(req, res, next) {

    Respond[req.params.function](req.params.data, req.params.value)
        .then(function (records) {
            log.log('promise succes')
            res.send(records)
        }).catch(function (err) {
        res.send('Program error');
        log.error('Output error', err)
    });
    next();
}

var server = restify.createServer({
    formatters: {
        'application/json': function (req, res, body, cb) {
            res.setHeader('Content-Type', 'application/json');
            return cb(null, JSON.stringify(body, null, 2));
        }
    },
    name: 'ff-api'
});
server.get('/:function/:data', respond);
server.get('/:function/:data/:value', respond);

server.listen(9000, function () {
    log.log('Server startup [' + server.name + ']');
});