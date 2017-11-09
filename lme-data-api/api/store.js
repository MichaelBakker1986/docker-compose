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

        new Figure.Figures().getFigures(req.params.id).then(function(data) {
            // res.json(data)
        }).catch((err) => {
            console.err(err)
        })

        /*Figure.Figures.findAsync({}).then((data) => {
            log.debug(JSON.stringify(data))
        }).catch((err) => {
            throw Error('Fail db lookup', err)
        })*/
        let entry = ds.getOrCreate(req.params.id);
        if (entry.parent) {
            ds.loadParents(ds.getOrCreate(entry.parent), entry)
        }
        res.json(entry)
    });
    /**
     * Store entered values supplied by the client
     */
    app.post('/id/:id/data', function(req, res) {
        //resolve all entered values
        var now = new Date().getTime();

        var parent = ds.getOrCreate(req.params.id)
        let newChild = ds.getOrCreate(uuid());
        var dbData = [];
        newChild.parent = parent.id;
        for (var i = 0; i < req.body.data.length; i++) {
            var entry = req.body.data[i]
            entry.savetime = now;
            newChild.values[entry.varName + "#" + entry.colId] = entry
            dbData.push([newChild.id, entry.varName, entry.colId, entry.value])
        }
        new Figure.Figures().insertFigures(req.params.id, dbData).then(function(data) {
            // res.json(data)
            console.info(data)
        }).catch((err) => {
            console.err(err)
        })

        res.json({
            saveToken: newChild.id
        })
    });
};