/**
 * While calculating in front-end.
 * There is a need to store/retrieve values entered by the client
 */
var uuid = require('uuid4');
const MatrixStore = require('../MatrixStore').MatrixStore;
module.exports.setup = function(app) {
    var ds = new MatrixStore();
    /**
     * Retrieve entered values supplied by the client
     */
    app.get('/id/:id', function(req, res) {
        let entry = ds.getOrCreate(req.params.id);
        if (entry.parent) {
            ds.loadParents(ds.getOrCreate(entry.parent), entry)
        }
        res.json(entry)
    });
    /**
     * Store entered values supplied by the client
     */
    app.post('/id/:id', function(req, res) {
        //resolve all entered values
        var parent = ds.getOrCreate(req.params.id)
        let newChild = ds.getOrCreate(uuid());
        newChild.parent = parent.id;
        for (var i = 0; i < req.body.data.length; i++) {
            var entry = req.body.data[i]
            newChild[entry.varName] = entry
        }
        res.json({
            saveToken: newChild.id
        })
    });
};