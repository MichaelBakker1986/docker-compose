const MatrixStore = require('../MatrixStore').MatrixStore;
module.exports.setup = function(app) {
    var ds = new MatrixStore();
    app.get('/id/:id/', function(req, res) {
        res.json(ds.getOrCreate(req.params.id))
    });
};