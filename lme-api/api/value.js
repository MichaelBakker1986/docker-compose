const MatrixStore = require('../MatrixStore').MatrixStore;
const log = require('ff-log')
const lmeAPI = require('../LMEImpl').lmeAPI


module.exports.setup = function(app) {
    var ds = new MatrixStore();

    function defaultResponse(req, res) {
        var context = ds.getOrCreate(req.params.contextid);
        res.header("Access-Control-Allow-Origin", "*");
        //handle request Async by default, create Promise, result when done.
        new Promise(function(success, fail) {
            try {
                //resolve context key to stored values
                var columncontext = parseInt(req.params.columncontext || "0");
                var tupleindex = req.params.tupleindex;
                var variablename = req.params.variable === '{variable}' ? undefined : req.params.variable;
                success(lmeAPI.fesGetValue(context, variablename, columncontext, undefined, undefined))
                //req.params.variable, parseInt(columncontext), req.params.value ));
            } catch (err) {
                fail(err);
            }
        }).then(function(answer) {
            res.json(answer)
        }).catch(function(err) {
            log.error(err);
        });
        /* apiimpl.prototype.value = function(contextKey, variable, columncontext, value, tupleindex) {

             //all values are strings when entering, wen it can be parsed to a number, we will parse it.

             // Check if value is maybe a tupleindex
             if (value != undefined && tupleindex == undefined && isNaN(value)) {
                 tupleindex = value;
                 value = undefined;
             }

             var value = isNaN(value) ? value : parseFloat(value)
             var result = fesjsApi.fesGetValue(context, prefixVariable(variable), columncontext, value, tupleindex);
             return result;
         }*/
        /*  res.json(context)*/
    }

    /**
     * UserName/value/MaxNrCompensatedHoursOutofSchoolCare/101
     * @:context       - (any context to identify the process  username/processid/requestId
     * @:function      - (value to get and set values)
     * @:variable      - (account e.g. CREDIT / DEBIT / Q_ROOT)
     * @:columncontext - (index in a range for corresponding request)
     * @:tupleindex    - (string name of tuple object)
     * @:value         - (new user value)
     */
    /*app.get('/:context/value', respond);*/

    /*app.get('/:context/:function/:variable', respond);
    app.get('/:context/:function', respond);
    app.get('/:context/:function/:variable/:value', respond);
    app.get('/:context/:function/:variable/:columncontext/:value', respond);
    app.get('/:context/:function/:variable/:columncontext/:tupleindex/:value', respond);*/
    app.get('/:contextid/value/:variable', defaultResponse);
    app.get('/:contextid/value', defaultResponse);
};

function prefixVariable(variableName) {
    if (variableName === undefined) {
        return undefined;
    }
    for (var i = 0; i < modelNames.length; i++) {
        var modelPrefix = modelNames[i];
        if (variableName.startsWith(modelPrefix + '_')) {
            return variableName;
        }
    }
    return modelNames[0] + '_' + variableName;
}

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