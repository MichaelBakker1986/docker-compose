import { AceEditor } from './ace_editor_api'

function MatrixController($scope, $http, matrixManager, opts) {
	this.$scope = $scope
	this.$http = $http
	this.matrixManager = matrixManager
	$scope.matrix_tables = matrixManager.matrix
	this.matrix_editor = new AceEditor('matrix_editor', opts)
}

MatrixController.prototype.registerEditorToClickNames = function(fflEditor, user_session, register, workbook) {
	this.matrix_editor.registerEditorToClickNames(this.matrix_editor, fflEditor, user_session, register, workbook)
}
MatrixController.prototype.refresh = function() {
	var annotations = []
	annotations.push({
		row   : 0,
		column: 0,
		text  : 'Named tables found in matrix file', // Or the Json reply from the parser
		type  : 'info'
	})
	this.matrix_editor.setAnnotations(annotations)
}
MatrixController.prototype.updateMatrix = function(model_name) {
	/**
	 * Excel file->json via server
	 */
	const self = this
	const $scope = this.$scope
	$.getJSON('readExcel/' + model_name, function(data) {
		//TODO: change to default funtions in the FunctionMap
		global.MATRIX_VALUES = data
		self.matrixManager.setMatrices(data)
		$scope.$apply(function() {
			self.matrix_editor.aceEditor.setValue(self.matrixManager.toFatrix())
			self.matrix_editor.scrollTop()
		})
	}).fail(function(err) {
		console.error('Error reading excel file ' + model_name, err)
	})
}

export { MatrixController }