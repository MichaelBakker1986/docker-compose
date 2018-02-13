/**
 * Do data-manupulations over the result of excel-connect.
 */
function MatrixManager() {
    this.register = {};
    this.matrix = [];
}

/*
 * Language used by the editor
 */
MatrixManager.prototype.toFatrix = function() {
    return JSON.stringify(this.matrix, null, 2);
}
MatrixManager.prototype.setMatrices = function(matrixArg) {
    this.matrix.length = 0;
    this.register = {}
    for (var table_name in matrixArg) {
        this.register[table_name] = matrixArg[table_name]
        this.matrix.push(matrixArg[table_name])
    }
}
exports.MatrixManager = MatrixManager;