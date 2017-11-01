const MatrixStore = require('../MatrixStore').MatrixStore;
module.exports.setup = function(app) {

    var ds = new MatrixStore();
    /**
     * @swagger
     * /matrix:
     *   get:
     *     description: Return a Matrix
     *     responses:
     *       200:
     *         description: { matrixid: id , { matrixinfo } }
     *     parameters:
     *         name: matrixId
     *         description: MatrixID
     *         required: true
     *         dataType: string
     */
    app.get('/matrix/:matrixId', function(req, res) {
        res.json(ds.getOrCreate(req.params.matrixId))
    });
};