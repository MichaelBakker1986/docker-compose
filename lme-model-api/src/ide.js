import { AceEditor }                                                 from './ace_editor_api'
import { ChangeManager, RegisterPlainFFLDecorator, RegisterToFFL }   from '../../ffl/index'
import { LmeAPI }                                                    from './lme'
import FFLController                                                 from './FFLController'
import DebugController                                               from './DebugController'
import { MatrixController }                                          from './MatrixController'
/** * editor variable is set to the window. */
import { LocalStorage }                                              from './LocalStoreMagic'
import { JBehaveController }                                         from './JBehaveController'
import MatrixManager                                                 from '../../excel-connect/MatrixManager'
import api, { FFL_VERSION_PROPERTY_NAME, Register, WebExportParser } from '../../lme-core/index'
import fflMath                                                       from '../../math/ffl-math'
import formulaJs                                                     from '../../formulajs-connect/formulajs'

import { VersionController } from './versionController'

api.addFunctions(fflMath, formulaJs)
api.registerParser(RegisterPlainFFLDecorator, WebExportParser)
let params = window.location.href.split('#')
if (params.length === 1) window.location.href = '#SCORECARDTESTMODEL&DEMO&6'
params = window.location.href.split('#')[1].split('&')

const user_session = {
	disablePreviewButton: true,
	fflModelPath        : () => params[0] || 'SCORECARDTESTMODEL',
	page                : 'scorecard',
	fflModel            : '',
	column_size         : 6,
	version             : '0.0.8',
	model_version       : '0.1',
	author              : 'topicus.nl',
	model_history       : [],
	user                : {
		name: params[1] || 'DEMO'
	},
	messages            : {
		data: [
			{ text: 'Scorecard converter!' },
			{ text: 'Implement refersTo generic!\nrefersTo STEP01\nrefersTo numberVariable</br>Multi dimensional is a Step and a Tuple' },
			{ text: 'Make bigdata analyses from all models to find generics' }
		]
	}
}
global['session'] = new LocalStorage(user_session)

angular.module('lmeapp', ['angular.filter'])
.controller('ideController', function($scope, $http) {
	const modelEngine = new LmeAPI(undefined, undefined, undefined, { user_session: user_session })
	$scope.LMEMETA = modelEngine
	global.LME = modelEngine
	modelEngine.loadData((response) => {})
	const matrixManager = new MatrixManager()
	const matrixController = new MatrixController($scope, $http, matrixManager, { halfHeight: true })
	new DebugController($scope, $http)

	$scope.session = user_session
	const register = new Register()
	$scope.register = register

	const right_editor = new AceEditor('right_editor', { halfHeight: true })
	const jBehaveController = new JBehaveController($scope, $http, modelEngine, right_editor, user_session)
	const changeManager = new ChangeManager(register)
	$scope.fflmode = true
	$scope.currentView = 'FFLModelEditorView'
	$scope.fflType = '.ffl'
	let currentIndexer = new RegisterToFFL(register)
	const fflEditor = new AceEditor('editor')
	fflEditor.initResize()
	const fflController = new FFLController($scope, $http, fflEditor, user_session, changeManager, register, modelEngine)
	new VersionController($scope, user_session, fflController)

	const workbook = modelEngine.lme
	right_editor.registerEditorToClickNames(right_editor, fflEditor, user_session, register, workbook)
	right_editor.initResize()
	fflEditor.registerEditorToClickNames(fflEditor, fflEditor, user_session, register, workbook)
	matrixController.registerEditorToClickNames(fflEditor, user_session, register, workbook)
	matrixController.matrix_editor.initResize()
	$(document).ajaxError(function(event, jqxhr, settings, thrownError) {
		console.warn('error while getting [' + settings.url + ']', thrownError)
	})
	let sidebaropen = false
	let hideSideBar = true
	$scope.publishDockerImage = function() {
		Pace.track(function() {
			$.post(`publishDockerImage/${$scope.session.fflModelPath}`, {
				story        : right_editor.getValue(),
				model_version: 4,
				matrix       : matrixManager.toFatrix(),
				fflData      : fflEditor.getValue()
			}, function(data) {
				console.info('Finished publishing docker image.')
				alert(`Finished publishing docker image. ${$scope.session.fflModelPath}`)
			})
		})
	}
	$scope.toggleSideBarUsed = function() {
		hideSideBar = !hideSideBar
		$scope.togglePropertiesSidebar(hideSideBar)
	}
	$scope.togglePropertiesSidebar = function(open) {
		if (hideSideBar && !sidebaropen) return
		if (hideSideBar && sidebaropen) {
			sidebaropen = !sidebaropen
			$('#pagewrapper').toggleClass('control-sidebar-open')
			$('#sidebar').toggleClass('control-sidebar')
		} else {
			if (sidebaropen && open) return
			if ($scope.activeVariable.length === 0 && !sidebaropen) return
			sidebaropen = !sidebaropen
			$('#pagewrapper').toggleClass('control-sidebar-open')
			$('#sidebar').toggleClass('control-sidebar')
		}
		if (!sidebaropen) $('#sidebar').hide()
		else $('#sidebar').show()
	}
	$scope.dbModelConvert = function() {
		$scope.fflType = '.ffl'
		Pace.track(function() {
			$.getJSON(`model?model=${user_session.fflModelPath}`, function() {
				currentIndexer = new RegisterToFFL(register)
				const lines = currentIndexer.toGeneratedCommaSeperated()
				fflEditor.setValue(lines)
			}).fail(function() {
				console.info('Model get fail')
			})
		})
	}
	$scope.saveFileInView = function() {
		if ($scope.currentView === 'FFLModelEditorView') fflController.saveFFLModel($scope, $scope.session)
		else if ($scope.currentView === 'jbehaveView') $scope.saveJBehaveStory()
	}
	$scope.goToPreviewPage = function() {
		$scope.session.disablePreviewButton = true
		$scope.downloadJsLink = null
		window.open(`${$scope.session.page}.html#${$scope.session.fflModelPath}&${user_session.user.name}&${user_session.column_size}`)
		$('#modal-success').modal('toggle')
	}

	$scope.sneakPreviewModel = function() {
		Pace.track(() => {
			$.post('preview/' + $scope.session.fflModelPath, {
				data: fflEditor.getValue()
			}, (data) => window.open(`${$scope.session.page}.html#${data.link}&${user_session.user.name}&${user_session.column_size}`))
		})
	}

	$scope.previewRestApi = () => {
		$scope.reloadFFL()
		const model_version = register.getValue('root', FFL_VERSION_PROPERTY_NAME)
		Pace.track(() => {
			$.post('preview/' + $scope.session.fflModelPath, {
				data: fflEditor.getValue()
			}, () => window.open(`/swagger/?url=/${$scope.session.fflModelPath}/0.${model_version}/`))
		})
	}

	$scope.hasChanges = false
	$scope.changes = ''

	/*$http.get('hasUpdates').then(function(data) {
	 $scope.hasChanges = data.data.hasChanges
	 $scope.changes = data.data.changes
	 }).catch(function(err) {
	 $scope.hasChanges = ''
	 $scope.changes = undefined
	 })*/
	$scope.gotoUpdateScreen = () => $scope.changeView('updateView')
	$scope.update = async () => {
		try {
			const { data } = await $http.get('hasUpdates')
			$scope.hasChanges = data.hasChanges
			$scope.changes = data.changes
			if ($scope.hasChanges) {
				try {
					await $http.get('/update/git/notifyCommit')
					location.reload()
				} catch (err) {
					$scope.changes = err.toString()
					location.reload()
				}
			}
		} catch (err) {
			$scope.changes = err.toString()
			location.reload()
		}
	}
	/*** Auto-complete for JBehave view **/
	$scope.changedView = function() {
		if ($scope.currentView === 'jbehaveView') {
			console.info('Changed to JBEHAVE VIEW')
			const names = register.getIndex('name')
			const wordMap = []
			for (var name in names) {
				wordMap.push(
					{ 'word': name }
				)
			}
			fflEditor.addCompleter(function(editor, session, pos, prefix, callback) {
				if (prefix.length === 0) {
					callback(null, [])
					return
				}
				callback(null, wordMap.map((ea) => ({ name: ea.word, value: ea.word, meta: 'optional text' })))
			})
			$scope.reloadFFL()
			$scope.runJBehaveTest()
			matrixController.refresh()
		}
	}
	$('.toggle-expand-btn').click(function() {
		$(this).closest('.content .box').toggleClass('panel-fullscreen')
	})

	function handleModelChange() {
		fflController.updateFFLModel(user_session.fflModelPath)
		jBehaveController.updateStory(user_session.fflModelPath)
		$scope.updateModelChanges()
		matrixController.updateMatrix(user_session.fflModelPath)
	}

	$.getJSON('models', function(data) {
		$('#models').autocomplete({
			source   : data,
			autoFocus: true,
			change   : () => {
				user_session.fflModelPath = $('#models').val()
				handleModelChange()
			}
		})
	}).fail(() => {
		$('#models').autocomplete({
			source   : [],
			autoFocus: true,
			change   : () => {
				user_session.fflModelPath = $('#models').val()
				handleModelChange()
			}
		})
	})
	$('#models').keydown(function(event) {
		if (event.keyCode === 13) {
			event.preventDefault()
			handleModelChange()
			return false
		}
	})
	$scope.activeVariable = []
	$scope.schema = register.schema
	right_editor.aceEditor.on('mousedown', function() {
		$scope.changeView('jbehaveView')
		if (register.changes.length > 0) {
			console.info('Changes been made')
			register.changes.length = 0
			$scope.reloadFFL()
		}
		$scope.runJBehaveTest()
	})
	/* This watches the propertiesView on the right side of the page.*/
	$scope.$watch(function(scope) {
			if (scope.register.changes.length > 0) {
				console.info('Register changes')
				scope.register.changes.length = 0
				const newValue = scope.register.header + '{\n' + new RegisterToFFL(scope.register).toGeneratedFFL({
					rootVariableName: user_session.fflModelPath,
					auto_join       : true
				})
				fflEditor.setValue(newValue)
			}
			return scope.register.changes
		},
		function() {
			//Hook for changes in the UI
			//NO-OP
		}
	)
	$scope.togglePropertiesSidebar()
	handleModelChange()
	$scope.isOpen = function(node, closed_nodes) {
		var path = node.path.split('.')
		for (var i = 0; i < path.length; i++) {
			if (closed_nodes[path[i]] === true) return false
		}
		return true
	}
	$scope.showNode = function(node) {
		$scope.changeView('FFLModelEditorView')
		console.info('Looking at node ' + node)
		fflEditor.setValue(new RegisterToFFL(register).toGeneratedFFL({ rootVariableName: node.id, auto_join: true }))
	}
	$scope.changeView = function(viewName) {
		if ($scope.currentView !== viewName) {
			console.info('Switched to ' + viewName)
			$scope.currentView = viewName
			$scope.changedView()
		}
	}
	/*** Every keystroke from the JBehaveView will pass here */
	right_editor.aceEditor.commands.on('afterExec', () => $scope.runJBehaveTest())
	window.addEventListener('keydown', function(e) {
		if (e.ctrlKey && e.shiftKey) return
		if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
			e.preventDefault()
			fflEditor.aceEditor.execCommand('find')
		}
		else if ((e.ctrlKey && e.keyCode === 82)) {
			e.preventDefault()
			fflEditor.aceEditor.execCommand('replace')
		}
	})
	$(window).bind('keydown', function(evt) {
		if (evt.ctrlKey || evt.metaKey) {
			switch (String.fromCharCode(evt.which).toLowerCase()) {
			case 's':
				evt.preventDefault()
				$('#saveFileInView').click()
				break
			case 'f':
				if (evt.shiftKey) {
					evt.preventDefault()
					$scope.toggleFormatter()
				}
				break
			case 'p':
				evt.preventDefault()
				$scope.sneakPreviewModel()
				break
			}
		} else {
			switch (evt.keyCode) {
			case 117://F6
				evt.preventDefault()
				const model_field = $('#models')
				model_field.select()
				model_field.focus()
				break
			}
		}
	})
})
