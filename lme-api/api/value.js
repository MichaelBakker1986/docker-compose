const MatrixStore = require('../MatrixStore').MatrixStore;
module.exports.setup = function(app) {

    var ds = new MatrixStore();
    /**
     * @swagger
     * /value/matrix/:matrixId:
     *   get:
     *      summary: Login with username and password
     *      notes: Returns a user based on username
     *      responseClass: User
     *      nickname: login
     *      consumes:
     *        - text/html
     *      produces:
     *        - application/json
     *      parameters:
     *        - name: matrixId
     *          description: Your matrixId
     *          paramType: query
     *          required: true
     *          dataType: string
     */
    app.get('/value/matrix/:matrixId', function(req, res) {

        var context = ds.getOrCreate(req.params.matrixId);

       /* apiimpl.prototype.value = function(contextKey, variable, columncontext, value, tupleindex) {

            //all values are strings when entering, wen it can be parsed to a number, we will parse it.

            // Check if value is maybe a tupleindex
            if (value != undefined && tupleindex == undefined && isNaN(value)) {
                tupleindex = value;
                value = undefined;
            }

            var value = isNaN(value) ? value : parseFloat(value)
            var result = fesjsApi.fesGetValue(context, prefixVariable(variable), columncontext, value, tupleindex);
            return result;
        }*/
        res.json(context)
    });
};