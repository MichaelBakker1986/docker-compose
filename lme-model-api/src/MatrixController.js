const AceEditor = require('./ace_editor_api').AceEditor

function MatrixController($scope, $http, matrixManager, opts) {
    this.$scope = $scope
    this.$http = $http
    this.matrixManager = matrixManager
    $scope.matrix_tables = matrixManager.matrix;

    this.matrix_editor = new AceEditor("matrix_editor", opts);
}

MatrixController.prototype.registerEditorToClickNames = function(fflEditor, user_session, register) {
    this.matrix_editor.registerEditorToClickNames(this.matrix_editor, fflEditor, user_session, register)
}
MatrixController.prototype.updateMatrix = function(model_name) {
    /**
     * Excel file->json via server
     */
    const $scope = this.$scope;
    const matrixManager = this.matrixManager;
    const matrix_editor = this.matrix_editor
    $.getJSON("readExcel/" + model_name, function(data) {
        //used by the LME
        MATRIX_VALUES = data;
        $scope.$apply(function() {
            matrixManager.setMatrices(data)
            matrix_editor.aceEditor.setValue(matrixManager.toFatrix())
        })

    }).fail(function(err) {
        console.error(err)
    })
}

module.exports = MatrixController