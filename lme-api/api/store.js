/**
 * While calculating in front-end.
 * There is a need to store/retrieve values entered by the client
 */
const MatrixStore = require('../MatrixStore').MatrixStore;
module.exports.setup = function(app) {
    var ds = new MatrixStore();
    /**
     * Retrieve entered values supplied by the client
     */
    app.get('/id/:id', function(req, res) {
        res.json(ds.getOrCreate(req.params.id))
    });
    /**
     * Store entered values supplied by the client
     */
    app.post('/id/:id', function(req, res) {
        //resolve all entered values
        res.json({
            saveToken: 1234
        })
    });
};