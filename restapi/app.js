var tracer = require('ff-log');
tracer.log('Startup')
var restify = require('restify');
var apiimpl = require('./apiimpl');
var DBConn = require('./DBConnector')
var Respond = new apiimpl(DBConn);

function respond(req, res, next) {

    Respond[req.params.function](req.params.data, req.params.value)
        .then(function (records) {
            tracer.log('promise succes')
            res.send(records)
        }).catch(function (err) {
        res.send('Program error');
        tracer.error('Output error', err)
    });
    next();
}

var server = restify.createServer({
    formatters: {
        'application/json': function (req, res, body, cb) {
            res.setHeader('Content-Type', 'application/json');
            return cb(null, JSON.stringify(body, null, 2));
        }
    }
});
server.get('/:function/:data', respond);
server.get('/:function/:data/:value', respond);

server.listen(9000, function () {
    tracer.log('%s listening at %s', server.name, server.url);
});