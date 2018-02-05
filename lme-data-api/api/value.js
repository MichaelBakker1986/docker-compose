const MatrixStore = require('../MatrixStore').MatrixStore;
const log = require('log6')
const LMECalculationFacade = require('../FinancialModelLoader').LMECalculationFacade

module.exports.setup = function(app) {
    var ds = new MatrixStore();
    app.use(function(req, res, next) {
        res.on('finish', function() {
            console.info(res.body)
        });
        next()
    })
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

                success(LMECalculationFacade.getValue(context, variablename, columncontext, value, undefined))
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
                let result;
                var context = ds.getOrCreate(req.params.id);
                if (req.originalUrl.endsWith('Container')) {
                    context.columns = 1;
                    result = LMECalculationFacade.getObjectValues(context, "LGD_LGDCalculationOutputContainer", undefined);
                } else {
                    const body = req.body;
                    context.columns = 17;
                    //resolve context key to stored values
                    //set all values in the context.
                    for (var q in body) {
                        for (var c in body[q]) {
                            if (typeof(body[q][c]) != 'object') {
                                LMECalculationFacade.getValue(context, "KSP_" + c, 0, body[q][c], undefined)
                            }
                        }
                    }

                    result = LMECalculationFacade.getObjectValues(context, "KSP_Q_MAP06", undefined);
                }
                success(result)
            } catch (err) {
                fail(err);
            }
        }).then(function(answer) {
            res.json(answer)
        }).catch(function(err) {
            res.json(err.toString())
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
    app.get('*/id/:id/figure/:figureName', defaultResponse);
    app.post('*/id/:id/figure/:figureName/value/:value', defaultResponse);
    app.post('*/id/:id/figure/:figureName', defaultPostResponse);
    app.post('*/figure/:figureName', defaultPostResponse);


};
