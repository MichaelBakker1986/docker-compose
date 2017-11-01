var http = require('http');
const app = require('express')();
const swaggerUi = require('swaggerize-ui');
var swaggerJSDoc = require('swagger-jsdoc');
var pretty = require('express-prettify');
const port = 8085;
app.set('json spaces', 4);
var log = require('ff-log');
var fs = require('fs')
var apiimpl = require('./apiimpl');
var Promise = require('promise')
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // To support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // To support URL-encoded bodies
    extended: true,
}));
require('./api/store').setup(app)
app.use('/docs', swaggerUi({
    docs: '/api-docs' // from the express route above.
}));

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


/*var server = restify.createServer({
    /!*formatters: {
        'application/json': function(req, res, body, cb) {
            res.setHeader('Content-Type', 'application/json');
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Credentials", "true");
            //var stringify = JSON.stringify(body, null, 2);
            // res.setHeader('Content-Length', Buffer.byteLength(stringify));
            // return cb(null, stringify);
        }
    },*!/
    name: 'ff-restapi'
});*/


// swagger definition
var swaggerDefinition = {
    info: {
        title: 'Node Swagger API',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:' + port,
    basePath: '/',
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./api/*.js'],
};
// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
// serve swagger
app.get('/api-docs', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.json(swaggerSpec);
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
/**
 * @swagger
 * /:context/:function/:variable:
 *   get:
 *     tags:
 *       - Puppies
 *     description: Returns all puppies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of puppies
 *         schema:
 *           $ref: '#/definitions/Puppy'
 */
app.get('/:context/:function/:variable', respond);
app.get('/:context/:function', respond);
app.get('/:context/:function/:variable/:value', respond);
app.get('/:context/:function/:variable/:columncontext/:value', respond);
app.get('/:context/:function/:variable/:columncontext/:tupleindex/:value', respond);
//server.pre(restify.pre.userAgentConnection());
app.use(pretty({query: 'pretty'}));
app.listen(port, function() {
    require('dns').lookup(require('os').hostname(), (err, add, fam) => {
        let domain = 'http://' + add + ':' + port + '/';
        console.info('<a href="' + domain + 'docs">Swagger API docs</a><span> up.</span></br>\n')
    })
    //app.swagger.api.host = 'localhost:' + port;
    //log.info('Server startup [' + server.name + ']' + server.server._connectionKey);
    /*    log.info('Test path: [%s]', 'http://localhost:' + port + '/docs')
        log.info('Test path: [%s]', 'http://localhost:' + port + '/api-docs')
        log.info('Test path: [%s]', 'http://localhost:' + port + '/user1/value/?var=KSP_Q_ROOT&Incomplete')
        log.info('Test path: [%s]', 'http://localhost:' + port + '/user1/value/KSP_Q_ROOT/Complete')
        log.info('Test path: [%s]', 'http://localhost:' + port + '/user2/value/KSP_Q_ROOT/110')
        log.info('Test path: [%s]', 'http://localhost:' + port + '/user1/value/KSP_ChildcareContribution/1/200')
        log.info('Test path: [%s]', 'http://localhost:' + port + '/user1/value/KSP_ChildcareContribution')
        log.info('Test path: [%s]', 'http://localhost:' + port + '/user1/context')
        log.info('Test path: [%s]', 'http://localhost:' + port + '/user1/value/KSP_Child/0/0/Jip')
        log.info('Test path: [%s]', 'http://localhost:' + port + '/user1/value/KSP_ChildGender/0/0/Boy')
        log.info('Test path: [%s]', 'http://localhost:' + port + '/user1/value/KSP_Child/0/1/Janneke')
        log.info('Test path: [%s]', 'http://localhost:' + port + '/user1/value/KSP_ChildGender/0/1/Girl')*/
});