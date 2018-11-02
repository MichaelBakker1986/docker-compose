import moment from 'moment'
import 'gitgraph.js'

const template = new GitGraph.Template({
	colors: ['#979797', '#008fb5', '#f1c109'],
	branch: {
		spacingY     : 0,
		lineWidth    : 10,
		spacingX     : 12,
		labelRotation: 0
	},
	commit: {
		shouldDisplayTooltipsInCompactMode: true,
		tooltipHTMLFormatter              : function(commit) {
			return '' + commit.sha1 + '' + ': ' + commit.message
		},
		spacingY                          : 40,
		spacingX                          : 0,
		dot                               : {
			color      : 'white',
			size       : 7,
			strokeWidth: 7
		},
		message                           : {
			displayAuthor: false,
			displayBranch: false,
			displayHash  : false,
			font         : 'normal 10pt Arial'
		}
	}
})

export class VersionController {
	constructor($scope, user_session, fflController) {
		$scope.updateModelChanges = function() {
			const gitgraph = new GitGraph({
				initCommitOffsetX: 10,
				template         : template,
				orientation      : 'vertical-reverse',
				mode             : 'extended'
			})
			gitgraph.canvas.addEventListener('commit:mouseover', function(event) {
				console.log('You\'re over a commit.', event.data)
				this.style.cursor = 'pointer'
			})
			$.get(`modelChanges/${user_session.fflModelPath}`, ({ history = {}, ffl }) => {
				const { auth_id, id, path, time } = history
				path.unshift([{ time, uuid: id, auth_id }])
				const history_el = path.map(([commit]) => ({
					type       : 'event',
					create_time: moment(commit.time).fromNow(),
					commit
				}))

				const master = gitgraph.branch('master')
				history_el.forEach(commit => {
					console.info(commit)
					master.commit({
						message: commit.create_time,
						sha1   : commit.uuid,
						onClick: function(commit) {
							$.get(`modelChanges/${user_session.fflModelPath}`, ({ history = {}, ffl }) => {
								fflController.updateInternalModel(ffl)
							})
							/*window.location.href = `#${model}&${commit.sha1}`*/
							/*LMEMETA.loadData(function(response) {
							 $rootScope.$digest()
							 })*/
						}
					})
				})
				//$scope.$apply(() => $scope.model_history = history)
			}).fail((err) => {
				console.error(`Error while reading model changes. ${err}`)
			})
		}
	}
}