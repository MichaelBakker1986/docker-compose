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
    app.get('/id/:id/data', function(req, res) {
        //TODO: move logic to the matrixStore, not pairing with rest-api now
        new Figure.Figures().getFigures(req.params.id).then(function(data) {
            //TODO: use array.map....
            var values = {}
            for (var i = 0; i < data[0].length; i++) {
                var obj = data[0][i];
                var hash = obj.var + "#" + obj.col;
                values[hash] = {
                    value: obj.val
                }
            }
            //TODO: use array.map....
            var parents = {}
            for (var i = 0; i < data[1].length; i++) {
                var obj = data[1][i];
                var hash = obj.var + "#" + obj.col;
                parents[obj.uuid_parent] = new Date().getTime()
            }
            res.json({
                id: req.params.id,
                parents: parents,
                values: values
            })
        }).catch((err) => {
            console.err(err)
        })
    });
    /**
     * Store entered values supplied by the client
     */
    app.post('/id/:id/data', function(req, res) {

        var now = new Date().getTime();
        let newChildId = uuid()
        var dbData = {
            child: newChildId,
            values: []
        }
        for (var i = 0; i < req.body.data.length; i++) {
            var entry = req.body.data[i]
            entry.savetime = now;
            dbData.values.push([newChildId, entry.varName, entry.colId, entry.value])
        }
        new Figure.Figures().insertFigures(req.params.id, dbData).then(function(data) {
            // res.json(data)
            console.info(data)
        }).catch((err) => {
            console.error(err)
        })

        res.json({
            saveToken: newChildId
        })
    });
};