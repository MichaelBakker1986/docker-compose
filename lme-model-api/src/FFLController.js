//just an dummy-template to quickly create a model
import EconomicEditorView               from '../../model-tests/EconomicEditorView'
import $                                from 'jquery'
import { FFLToRegister, ScorecardTool } from '../../ffl/index'

const newModelTemplate =
	      'model $1 uses BaseModel\n' +
	      '{\n' +
	      ' version: "1.0";\n' +
	      ' variable Q_ROOT\n' +
	      ' {\n' +
	      '  title: "Stap 1";\n' +
	      '  displaytype: scorecard;\n' +
	      '  variable Q_MAP01\n' +
	      '  {\n' +
	      '   title: "Stap 1";\n' +
	      '   hint: "Informatie over de stap";\n' +
	      '   variable Q_MAP01_VRAAG0\n' +
	      '   {\n' +
	      '    title: "TestVraag";\n' +
	      '    frequency: document;\n' +
	      '    datatype: number;\n' +
	      '    formula: 100+100;\n' +
	      '   }\n' +
	      '  }\n' +
	      ' }\n' +
	      '}'

function FFLController($scope, $http, fflEditor, user_session, changeManager, register, modelEngine) {
	this.register = register
	this.$scope = $scope
	this.$http = $http
	this.fflEditor = fflEditor
	this.user_session = user_session
	this.changeManager = changeManager

	$.get(`resources/${user_session.fflModelPath}.ffl`, data => {
		console.info('Loaded engine')
		fflEditor.setValue(data)
		$scope.reloadFFL()
		//Also tell the auto-complete manager to initiate
		changeManager.updateCursor(fflEditor.getValue(), 0)
	}).fail((err, ev, message) => {
		if (err.readyState === 0) {
			console.info('Failed to load')
		} else {
			console.info(`Error while parsing model data: resources/${user_session.fflModelPath}.js:[${message.toString()}]`)
		}
	})
	fflEditor.aceEditor.on('mousedown', () => $scope.changeView('FFLModelEditorView'))
	$scope.reloadFFL = function() {
		//Hello engine-only
		modelEngine.importFFL(fflEditor.getValue())
		const LME = modelEngine.exportWebModel()
		$scope.LME_MODEL = LME.nodes
		$scope.name = LME.name

		modelEngine.loadData(() => $scope.$digest())
	}
	$('.data-toggle-ide').on('click', () => $scope.changeView('FFLModelEditorView'))
	$scope.saveFFLModel = function() {
		const type = '.ffl'
		Pace.track(function() {
			$scope.saveFeedback = 'Customizing ' + $scope.session.fflModelPath + '… '
			$scope.saveFeedbackTitle = 'Working on it... '
			const data = fflEditor.getValue()
			$.post('saveFFLModel/' + $scope.session.fflModelPath, {
				data, type
			}, function(data) {
				$scope.$apply(function() {
					$scope.saveFeedbackTitle = 'Finished'
					$scope.saveFeedback = data.status === 'fail' ? 'Failed compiling model:' + data.reason : 'Done work.'
					$scope.downloadJsLink = 'resources/' + $scope.session.fflModelPath + '.js'
					$scope.session.disablePreviewButton = false
					if (data.status === 'success') {
						window.open(`${$scope.session.page}.html#${$scope.session.fflModelPath}&${$scope.session.userID}`)
						$('#modal-success').modal('hide')
					}
				})
			})
		})
	}
	$scope.toggleFormatter = function() {
		const cursor = fflEditor.getCursor()
		user_session.fflModel = new FFLToRegister(register, fflEditor.getValue()).toString()
		fflEditor.setParsedValue(user_session.fflModel)
		fflEditor.aceEditor.gotoLine(cursor.row + 1, cursor.column)
	}
	$scope.toggleWrapLines = () => $scope.toggleFormatter()
	$scope.toggleProperties = function() {
		EconomicEditorView.properties = !EconomicEditorView.properties
		fflEditor.setParsedValue(user_session.fflModel)
		fflEditor.scrollTop()
	}
	$scope.toggleScorecardTool = function() {
		const cursor = fflEditor.getCursor()
		user_session.fflModel = ScorecardTool.parse(fflEditor.getValue())
		fflEditor.setParsedValue(user_session.fflModel)
		fflEditor.aceEditor.gotoLine(cursor.row + 1, cursor.column)
	}
	$scope.toggleAceEditorMode = function() {
		$scope.fflmode = !$scope.fflmode
		EconomicEditorView.on = !EconomicEditorView.on
		fflEditor.setParsedValue(user_session.fflModel)
	}
	fflEditor.aceEditor.on('change', function(e) {
		const fflAnnotations = []
		$scope.changeView('FFLModelEditorView')

		if (fflEditor.aceEditor.curOp && fflEditor.aceEditor.curOp.command.name) {
			// reindex(Math.min(e.start.row, e.end.row), Math.max(e.start.row, e.end.row))
			fflAnnotations.push({
				row   : e.start.row,
				column: 0,
				text  : 'Changed', // Or the Json reply from the parser
				type  : 'info' // also warning and information
			})
			fflEditor.setAnnotations(fflAnnotations)
		}
	})
	/**
	 * TODO: make functionality for single formula recompilation
	 * Every keystroke from the ACE-IDE will pass here
	 */
	const silent_ace_commands = new Set();
	['selectwordleft', 'gotolineend'/*END*/, 'gotolinestart'/*HOME*/, 'gotopagedown', 'gotopageup', 'Esc', 'Down',
		'overwrite'/*INSERT*/, 'gotowordright', 'gotowordleft', 'copy', 'selectright', 'selectleft',
		'replace', 'find', 'addCursorAbove', 'selectup', 'selectdown', 'scrollup', 'scrolldown', 'golinedown', 'golineup',
		'selectwordright', 'gotoleft', 'singleSelection', 'selectMoreAfter', 'selectMoreBefore', 'golineup', 'gotoright'
	].forEach(function(el) {
		silent_ace_commands.add(el)
	})
	const changing_ace_commands = new Set();
	['movelinesdown', 'backspace', 'undo', 'insertstring', 'removeline'].forEach(function(el) {
		changing_ace_commands.add(el)
	})
	fflEditor.aceEditor.commands.on('afterExec', function(e) {
		var changingValue = false
		$scope.changeView('FFLModelEditorView')
		if (!silent_ace_commands.has(e.command.name)) {
			//rather white-list actions.
			if (!changing_ace_commands.has(e.command.name)) console.info(e.command)

			//check if the line being changed is valid.
			if (changeManager.validCurrentLine(fflEditor.getCurrentLine(), fflEditor.getNextLine())) {
				changingValue = true
				changeManager.setModelChanged()
			}
		}
		changeManager.updateCursor(fflEditor.getValue(), fflEditor.getCursor())
		var annotations = []
		$scope.$apply(function() {
			$scope.error = changeManager.error
			$scope.activeVariable = changeManager.currentVariable

			if ($scope.currentView === 'FFLModelEditorView') $scope.togglePropertiesSidebar(true)
			if (changingValue) {
				//only reload the variable
				//get FFL String of current variable
				//   const fflData = new RegisterToFFL(register).toGeneratedFFL(changeManager.currentVariableName, user_session.fflModelPath, true).join('\n');
				//modelEngine.importFFL(fflData)
				$scope.runJBehaveTest()
			}

			if (changeManager.warnings.length > 0) console.info('There are warnings:' + JSON.stringify(changeManager.warnings))
		})
		if (changeManager.warnings.length > 0) {
			for (var i = 0; i < changeManager.warnings.length; i++) {
				var warning = changeManager.warnings[i]
				for (var j = 0; j < changeManager.warnings[i].pos.length; j++) {
					var obj = changeManager.warnings[i].pos[j]
					annotations.push({
						row   : user_session.fflModel.substring(0, obj.char).split('\n').length,
						column: 0,
						text  : warning.message, // Or the Json reply from the parser
						type  : 'error' // also warning and information
					})
				}
			}

		}
		fflEditor.setAnnotations(annotations)
	})
}

FFLController.prototype.updateFFLModel = function(model_name) {
	const self = this
	Pace.track(function() {
		window.location.href = '#' + model_name + '&' + self.user_session.user.name + '&' + 6
		var xhr = new XMLHttpRequest()
		xhr.addEventListener('progress', function(e) {
			self.fflEditor.setValue('Loading data: ' + e.loaded + ' of ' + (e.total || 'unknown') + ' bytes...')
		})
		xhr.addEventListener('load', function(e) {
			if (this.responseText.startsWith('<!DOCTYPE html>')) {
				self.user_session.fflModel = newModelTemplate.replace('$1', model_name)
			} else {
				self.user_session.fflModel = this.responseText
			}
			self.fflEditor.setParsedValue(self.user_session.fflModel)
			self.changeManager.setModelChanged()
			self.register.clean()
			const formatter = new FFLToRegister(self.register, self.user_session.fflModel)
			formatter.parseProperties()

			self.fflEditor.scrollTop()
		})
		xhr.open('GET', `resources/${model_name}.ffl`)
		return xhr.send()
	})

}

export default FFLController