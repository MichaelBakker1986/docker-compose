import { StoryParser } from './StoryParser'

const newStoryTemplate =
	      '{model_name} Score Basic\n' +
	      '@Author {author_name}\n' +
	      '@themes {model_name} Score basic\n' +
	      '\n' +
	      'Scenario: Verify {model_name} Score calculations\n' +
	      'Given a document of the model type {model_name}'

function JBehaveController($scope, $http, modelEngine, right_editor, user_session) {
	this.$scope = $scope
	this.$http = $http
	this.user_session = user_session
	this.modelEngine = modelEngine
	const self = this
	this.right_editor = right_editor

	$scope.saveJBehaveStory = function() {
		const type = '.story'
		Pace.track(function() {
			$scope.saveFeedback = `Saving story ${$scope.session.fflModelPath}… `
			$scope.saveFeedbackTitle = 'Working on it... '
			var data = right_editor.getValue()
			$.post(`saveJBehaveStory/${$scope.session.fflModelPath}`, {
				data: data,
				type: type
			}, function(data) {
				$scope.$apply(function() {
					$scope.saveFeedbackTitle = 'Finished'
					$scope.saveFeedback = data.status === 'fail' ? 'Failed saving story :' + data.reason : 'Done work.'
					$scope.downloadJsLink = 'resources/' + $scope.session.fflModelPath + '.story'
					$scope.session.disablePreviewButton = false
					if (data.status === 'success') {
						$('#modal-success').modal('hide')
					}
				})
			})
		})
	}
	$('.data-story').click(() => {
		self.updateStory(self.user_session.fflModelPath)
	})
	$scope.runJBehaveTest = function() {
		const annotations = []
		const workbook = modelEngine.lme
		workbook.clearValues()//Quick-fix to clear state, we should just create a copy of the current one.
		const storyParser = new StoryParser(self.right_editor.getValue(), self.user_session.fflModelPath + '.story', workbook)
		storyParser.message = function(event) {
			annotations.push({
				row   : event.line - 1,
				column: 0,
				text  : event.result.message, // Or the Json reply from the parser
				type  : event.result.status === 'fail' || event.result.status === 'error' ? 'error' : 'info' // also warning and information
			})
			right_editor.setAnnotations(annotations)
		}
		storyParser.then = function() {
			$scope.session.messages.data.push({
				text: 'jBehave tests done ' + storyParser.results.rate().toFixed(1) + '% passed'
			})
		}
		storyParser.start()
		storyParser.call()
	}
}

JBehaveController.prototype.updateStory = function(model_name) {
	const self = this
	$.get('resources/' + model_name + '.story', function(data, status, xhr) {
		self.right_editor.setValue(data)
	}).fail(function(err) {
		if (err.status == 404) {
			self.right_editor.setValue(newStoryTemplate.replace(/{model_name}/g, model_name).replace(/{author_name}/g, self.user_session.user.name))
		} else {
			self.right_editor.setValue(err.statusText)
		}
	})
}

export { JBehaveController }