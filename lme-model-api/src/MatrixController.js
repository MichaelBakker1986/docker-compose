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
MatrixController.prototype.refresh = function() {
    var annotations = []
    annotations.push({
        row: 0,
        column: 0,
        text: 'Named tables found in matrix file', // Or the Json reply from the parser
        type: 'info'
    })
    this.matrix_editor.setAnnotations(annotations);
}
MatrixController.prototype.updateMatrix = function(model_name) {
    /**
     * Excel file->json via server
     */
    const self = this;
    const $scope = this.$scope;
    $.getJSON("readExcel/" + model_name, function(data) {
        //used by the LME
        MATRIX_VALUES = data;
        self.matrixManager.setMatrices(data)
        $scope.$apply(function() {
            self.matrix_editor.aceEditor.setValue(self.matrixManager.toFatrix())
        })
    }).fail(function(err) {
        console.error(err)
    })
}

module.exports = MatrixController