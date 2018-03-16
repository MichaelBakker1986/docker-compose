/**
 * TODO: this class requires Unit-tests for internal logic. The lack of array.map is noticeable
 * While calculating in front-end.
 * There is a need to store/retrieve values entered by the client
 */
const uuid = require('uuid4');
const log = require('log6')
const dbConnectString = process.env.FIGURE_DB_STRING;// || "postgresql://postgres:postgres@127.0.0.1:5432/lme";
const Figure = require('./Figure');
const MatrixStore = require('../MatrixStore').MatrixStore;
const ModelLoader = require('../FinancialModelLoader');
const LMEFacade = ModelLoader.LMEFacade
require('../../lme-core/exchange_modules/jsonvalues/jsonvalues');
const WorkBook = require("../../lme-core/src/JSWorkBook");
const Context = require("../../lme-core/src/Context");

module.exports.setup = function(app) {
    if (!dbConnectString) return;//early exit (no db)
    var ds = new MatrixStore();
    /**
     * Retrieve entered values supplied by the client
     */
    Figure.orm.then((data) => {
    }).catch((err) => {
        throw Error('Fail db initializeFFlModelData', err)
    });

    function fetchDatabaseFigures(promise, req, res) {
        //TODO: move logic to the matrixStore, not pairing with rest-api now
        return promise.then(function(dbData) {
            //TODO: use array.map....
            var values = {}
            for (var i = 0; i < dbData[0].length; i++) {
                var obj = dbData[0][i];
                var hash = obj.var + "#" + obj.col;
                values[hash] = {
                    value: obj.val
                }
            }
            //TODO: use array.map....
            var parents = []
            for (var dbParentsIndex = 0; dbParentsIndex < dbData[1].length; dbParentsIndex++) {
                var dbParentRow = dbData[1][dbParentsIndex];
                parents.push({
                    id         : dbParentRow.uuid,
                    create_date: dbParentRow.create_time.getTime()
                })
            }
            return {
                status : 'succes',
                id     : req.params.id,
                parents: parents,
                values : values
            }
        }).catch((err) => {
            if (log.DEBUG) log.warn('error while resolving figures:', err)
            return {
                id     : req.params.id,
                status : 'fail',
                message: err.toString(),
                values : []
            }
        })
    }

    app.get('*/scenario/:ids', function(req, res) {
        fetchDatabaseFigures(new Figure.Figures().getScenarioFigures(req.params.ids.split(',')), req, res).then(function(result) {
            res.json(result)
        });
    });
    app.get('*/id/:userId/data/:id', function(req, res) {
        if (req.params.id.indexOf(',') > -1) {
            fetchDatabaseFigures(new Figure.Figures().getScenarioFigures(req.params.id.split(',')), req, res).then(function(result) {
                res.json(result)
            });
        } else {
            fetchDatabaseFigures(new Figure.Figures().getFigures(req.params.id), req, res).then(function(result) {

                //TODO: Dive into back-end protected-formula
                /* const wb = new WorkBook(new Context(), null, null, { modelName: 'FyndooCreditRating' })
                 wb.importSolution(result.values, 'jsonvalues')
                 wb.set('krZValue', wb.get('krZValue'))
                 wb.set('krPD', wb.get('krPD'))
                 const jsonValuesExport = wb.export('jsonvalues');
                 for (var i = 0; i < jsonValuesExport.length; i++) {
                     const exportValue = jsonValuesExport[i];
                     result.values[exportValue.varName + '#' + exportValue.colId] = {
                         value: exportValue.value
                     }
                 }*/
                res.json(result)
            });
        }
    });
    /**
     * Quick solution to test if share-data works
     */
    app.get('*/id/:userId/shareData/:token', function(req, res) {
        res.set('x-share-id', req.params.token);
        res.json({
            status: 'success'
        })
    })
    /**
     * Store entered values supplied by the client
     */
    app.post('*/id/:userId/saveUserData/:token', function(req, res) {
        const now = new Date();
        const newChildId = uuid()
        const parentUuid = req.params.token;
        const dbData = []
        for (var i = 0; i < req.body.data.length; i++) {
            var entry = req.body.data[i]

            // /TODO: Dive into back-end protected-formula
            if (entry.varName == 'FYNDOOCREDITRATING_krPD' || entry.varName == 'FYNDOOCREDITRATING_krZValue') continue

            dbData.push([newChildId, entry.varName, entry.colId, entry.value])
        }
        new Figure.Figures().insertFigures(parentUuid, newChildId, dbData, now).then(function(data) {
            //tell the response a new hash should be added to the current user calling this method.
            res.set('x-auth-id', newChildId);
            res.json({
                status   : 'success',
                saveToken: newChildId
                //here we going to inject protected-calculated values
                //  values   : LMEFacade.getObjectValues(new Context(), "FyndooCreditRating", undefined)
            })
        }).catch((err) => {
            if (log.DEBUG) log.warn('Error while inserting figures:', err)
            res.json({
                status : 'fail',
                message: err.toString()
            })
        })
    });
};