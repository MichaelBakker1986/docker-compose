/**
 * While calculating in front-end.
 * There is a need to store/retrieve values entered by the client
 */
var uuid = require('uuid4');
var log = require('ff-log')
const Figure = require('./Figure');

const MatrixStore = require('../MatrixStore').MatrixStore;
module.exports.setup = function(app) {
    var ds = new MatrixStore();
    /**
     * Retrieve entered values supplied by the client
     */
    Figure.orm.then((data) => {
    }).catch((err) => {
        throw Error('Fail db init', err)
    });


    function goDo(promise, req, res) {
        //TODO: move logic to the matrixStore, not pairing with rest-api now
        promise.then(function(dbData) {
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
                    id: dbParentRow.uuid,
                    create_date: dbParentRow.create_time.getTime()
                })
            }
            res.json({
                status: 'succes',
                id: req.params.id,
                parents: parents,
                values: values
            })
        }).catch((err) => {
            if (log.DEBUG) log.warn('error while resolving figures:', err)
            req.json({
                id: req.params.id,
                status: 'fail',
                message: err.toString(),
                values: []
            })
        })
    }

    app.get('*/scenario/:ids', function(req, res) {
        goDo(new Figure.Figures().getScenarioFigures(req.params.ids.split(',')), req, res);
    });
    app.get('*/id/:userId/data/:id', function(req, res) {
        if (req.params.id.indexOf(',') > -1) {
            goDo(new Figure.Figures().getScenarioFigures(req.params.id.split(',')), req, res);
        } else {
            goDo(new Figure.Figures().getFigures(req.params.id), req, res)
        }
    });
    /**
     * Store entered values supplied by the client
     */
    app.post('*/id/:userId/data/:id', function(req, res) {
        var now = new Date();
        let newChildId = uuid()
        var parentUuid = req.params.id;
        var dbData = []
        for (var i = 0; i < req.body.data.length; i++) {
            var entry = req.body.data[i]
            dbData.push([newChildId, entry.varName, entry.colId, entry.value])
        }
        new Figure.Figures().insertFigures(parentUuid, newChildId, dbData, now).then(function(data) {
            res.json({
                status: 'succes',
                saveToken: newChildId
            })
        }).catch((err) => {
            if (log.DEBUG) log.warn('error while inserting figures:', err)
            res.json({
                status: 'fail',
                message: err.toString()
            })
        })
    });
};