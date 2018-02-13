function MatrixController($scope, $http, matrixManager) {
    this.$scope = $scope
    this.$http = $http
    this.matrixManager = matrixManager
    $scope.matrix_tables = matrixManager.matrix;
}

MatrixController.prototype.updateMatrix = function(model_name) {
    /**
     * Excel file->json via server
     */
    const $scope = this.$scope;
    const matrixManager = this.matrixManager;
    $.getJSON("readExcel/" + model_name, function(data) {
        //used by the LME
        MATRIX_VALUES = data;
        $scope.$apply(function() {
            matrixManager.setMatrices(data)
        })

    }).fail(function(err) {
        console.error(err)
    })
}

module.exports = MatrixController