'use strict';

var _index = require('../lme-core/index');

function MatrixManager() {
    this.register = {};
    this.matrix = [];
}

/*
 * Language used by the editor
 */
/**
 * Do data-manupulations over the result of excel-connect.
 */
MatrixManager.prototype.toFatrix = function () {
    var register = new _index.Register(['table', 'row', 'col', 'value']);
    for (var i = 0; i < this.matrix.length; i++) {
        var table = this.matrix[i];
        var table_name = table.name;
        for (var row in table.xasValues) {
            for (var col in table.xasValues[row]) {
                register.addRow([table_name, row, col, table.xasValues[row][col]]);
            }
        }
    }
    var output = [['TableName', 'RowName', 'ColumnID', 'Value']];
    for (var i = 0; i < register.i.length; i++) {
        var obj = register.i[i];
        output.push([obj[0], obj[1], obj[2], obj[3]]);
    }
    output = output.map(function (el) {
        return el.map(function (innerEl) {
            var prefix = [];
            prefix.length = Math.max(30 - String(innerEl).length, 0);
            return innerEl + prefix.join(' ');
        }).join("|");
    });
    return output.join('\n');
};
MatrixManager.prototype.setMatrices = function (matrixArg) {
    this.matrix.length = 0;
    this.register = {};
    for (var table_name in matrixArg) {
        this.register[table_name] = matrixArg[table_name];
        this.matrix.push(matrixArg[table_name]);
    }
};
module.exports = MatrixManager;