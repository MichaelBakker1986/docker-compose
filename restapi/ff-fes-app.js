process.loglevel = 'info'
var log = require('ff-log');
log.info('Startup ff-restapi')
var restify = require('restify');
var apiimpl = require('./apiimpl');
var DBConn = require('./DBConnector')
var Promise = require('promise')
var Respond = new apiimpl(DBConn);

/**
 * server:port to -> @apiimpl  Generic pass-through REST-api
 * Generic error handling
 * Generic request logging
 * Generic async pattern
 */
function respond(req, res, next) {
    //handle request Async by default, create Promise, result when done.
    log.info('Call context:[%s] function[%s] variable[%s] columncontext[%s] data[%s]', req.params.context, req.params.function, req.params.variable, req.params.columncontext, req.params.value, req.params.tupleindex)
    new Promise(function(success, fail) {
        try {
            //resolve context key to stored values
            var columncontext = req.params.columncontext || "0";
            success(Respond[req.params.function](req.params.context, req.params.variable, parseInt(columncontext), req.params.value, req.params.tupleindex));
        } catch (err) {
            fail(err);
        }
    }).then(function(answer) {
        log.info('End call succes context:[%s] function[%s] variable[%s] columncontext[%s] data[%s]', req.params.context, req.params.function, req.params.variable, req.params.columncontext, req.params.value)
        res.send(answer)
    }).catch(function(err) {
        res.send('Program error. [' + err.message + ']');
        log.error('Call context fail:[%s] function[%s] variable[%s] columncontext[%s] data[%s]', req.params.context, req.params.function, req.params.variable, req.params.columncontext, req.params.value)
        log.error("trace", err);
    });
    //not part of the Async pattern
    next();
}
var server = restify.createServer({
    formatters: {
        'application/json': function(req, res, body, cb) {
            res.setHeader('Content-Type', 'application/json');
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Credentials", "true");
            var stringify = JSON.stringify(body, null, 2);
            res.setHeader('Content-Length', Buffer.byteLength(stringify));
            return cb(null, stringify);
        }
    },
    name: 'ff-restapi'
});
/**
 * UserName/value/MaxNrCompensatedHoursOutofSchoolCare/101
 * @:context       - (any context to identify the process  username/processid/requestId
 * @:function      - (value to get and set values)
 * @:variable      - (account e.g. CREDIT / DEBIT / Q_ROOT)
 * @:columncontext - (index in a range for corresponding request)
 * @:tupleindex    - (string name of tuple object)
 * @:value         - (new user value)
 */
//Adana Twins - Strange (Acid Pauli & NU Remix) (Official Video) | Exploited
server.get('/:context/:function/:variable', respond);
server.get('/:context/:function', respond);
server.get('/:context/:function/:variable/:value', respond);
server.get('/:context/:function/:variable/:columncontext/:value', respond);
server.get('/:context/:function/:variable/:columncontext/:tupleindex/:value', respond);
var port = process.argv[2] || 9001;
server.pre(restify.pre.userAgentConnection());
server.listen(port, function() {
    log.info('Server startup [' + server.name + ']' + server.server._connectionKey);
    log.info('Test path: [%s]', 'http://localhost:' + port + '/user1/value/?var=KSP_Q_ROOT&Incomplete')
    log.info('Test path: [%s]', 'http://localhost:' + port + '/user1/value/KSP_Q_ROOT/Complete')
    log.info('Test path: [%s]', 'http://localhost:' + port + '/user2/value/KSP_Q_ROOT/110')
    log.info('Test path: [%s]', 'http://localhost:' + port + '/user1/value/KSP_ChildcareContribution/1/200')
    log.info('Test path: [%s]', 'http://localhost:' + port + '/user1/value/KSP_ChildcareContribution')
    log.info('Test path: [%s]', 'http://localhost:' + port + '/user1/context')
    log.info('Test path: [%s]', 'http://localhost:' + port + '/user1/value/KSP_Child/0/0/Jip')
    log.info('Test path: [%s]', 'http://localhost:' + port + '/user1/value/KSP_ChildGender/0/0/Boy')
    log.info('Test path: [%s]', 'http://localhost:' + port + '/user1/value/KSP_Child/0/1/Janneke')
    log.info('Test path: [%s]', 'http://localhost:' + port + '/user1/value/KSP_ChildGender/0/1/Girl')
});


//variable/QRoot/tuple/0/column/2017
