const MatrixStore = require('../MatrixStore').MatrixStore;
const log = require('log6')
const ModelLoader = require('../FinancialModelLoader');
const LMECalculationFacade = ModelLoader.LMECalculationFacade

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
                const body = req.body;
                let result;
                var context = ds.getOrCreate(req.params.id);
                var modelPrefix = req.originalUrl.endsWith('TupleRestTestInput') ? 'TUPLERESTMODEL_' : req.originalUrl.endsWith('Container') ? 'LGD_' : "KSP_";
                //This is very very basic, rewrite required.
                for (var q in body) {
                    for (var c in body[q]) {
                        if (typeof(body[q][c]) != 'object') {
                            LMECalculationFacade.getValue(context, modelPrefix + c, 0, body[q][c], undefined)
                        }
                    }
                }
                if (req.originalUrl.endsWith('Container')) {
                    context.columns = 1;
                    result = LMECalculationFacade.getObjectValues(context, "LGD_LGDCalculationOutputContainer", undefined);
                }
                else if (req.originalUrl.endsWith('TupleRestTestInput')) {
                    context.columns = 1;
                    result = LMECalculationFacade.getObjectValues(context, "TUPLERESTMODEL_TupleRestTestOutput", undefined);
                } else {
                    context.columns = 17;
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

    app.get('*/id/:id/newModel', function(req, res) {
        ModelLoader.ModelLoader.onNewModel(require('fs').readFileSync('C:/stack/lme/git-connect/resources/LGD.ffl', 'utf-8'), 'C:/stack/lme/git-connect/resources/LGD.ffl')
        res.json({'status': 'ok'})
    })
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
