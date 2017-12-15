const MatrixStore = require('../MatrixStore').MatrixStore;
const log = require('ff-log')
const lmeAPI = require('../LMEImpl').lmeAPI


module.exports.setup = function(app) {
    var ds = new MatrixStore();

    function defaultResponse(req, res) {
        //handle request Async by default, create Promise, result when done.
        new Promise(function(success, fail) {
            try {
                var context = ds.getOrCreate(req.params.id);
                //resolve context key to stored values
                var columncontext = parseInt(req.params.columncontext || "0");
                var tupleindex = req.params.tupleindex;
                var variablename = req.params.figureName === '{variable}' ? undefined : req.params.figureName;
                var value = isNaN(req.params.value) ? req.params.value : parseFloat(req.params.value)

                success(lmeAPI.fesGetValue(context, variablename, columncontext, value, undefined))
            } catch (err) {
                fail(err);
            }
        }).then(function(answer) {
            res.json(answer)
        }).catch(function(err) {
            log.error(err);
        });
    }

    //should return 17 columns
    function defaultPostResponse(req, res) {
        //handle request Async by default, create Promise, result when done.
        new Promise(function(success, fail) {
            try {
                const body = req.body;
                //resolve context key to stored values
                var columncontext = parseInt(req.params.columncontext || "0");
                var context = ds.getOrCreate(req.params.id);
                for (var q in body) {
                    for (var c in body[q]) {
                        if (typeof(body[q][c]) != 'object') {
                            lmeAPI.fesGetValue(context, "KSP_" + c, columncontext, body[q][c], undefined)
                        }
                    }
                }

                var tupleindex = req.params.tupleindex;
                var variablename = req.params.figureName === '{variable}' ? undefined : req.params.figureName;
                var value = isNaN(req.params.value) ? req.params.value : parseFloat(req.params.value)

                success(lmeAPI.fesGetValue(context, "KSP_" + variablename, 17, value, undefined))
            } catch (err) {
                fail(err);
            }
        }).then(function(answer) {
            res.json(answer)
        }).catch(function(err) {
            log.error(err);
        });
    }

    /**
     * UserName/value/MaxNrCompensatedHoursOutofSchoolCare/101
     * @:id            - (any context to identify the process  username/processid/requestId
     * @:figure        - (figure e.g. CREDIT / DEBIT / Q_ROOT)
     * @:columncontext - (index in a range for corresponding request)
     * @:tupleindex    - (string name of tuple object)
     * @:value         - (new user value)
     */
    app.get('/id/:id/figure/:figureName', defaultResponse);
    app.post('/id/:id/figure/:figureName/value/:value', defaultResponse);
    app.post('/id/:id/figure/:figureName', defaultPostResponse);
};