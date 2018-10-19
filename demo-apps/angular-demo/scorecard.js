let modelName
let hash
let columnSize = 6

function redefineParameters() {
	if (window.location.href.split('#').length === 1) window.location.href = '#SCORECARDTESTMODEL&DEMO&6'
	const params = window.location.href.split('#')[1].split('&')
	modelName = params[0] || 'SCORECARDTESTMODEL'
	columnSize = params.length > 2 ? parseInt(params[2] || '6') : 6
	columnSize = isNaN(columnSize) ? 6 : columnSize
	hash = params[1] || 'DEMO'
}

redefineParameters()

angular.module('angapp', ['angular.filter', 'highcharts-ng'])
.filter('filterByPrefix', function() {
	return function(nodes, search) {
		if (!search) return []
		return nodes.filter((item) => item.path.contains(`.${search.id}`))
	}
})
.controller('lmeController', function($scope, $http) {

	$scope.changeSearch = (node) => {
		if (node.visible && node.children.length > 0) {
			$scope.search = node
		}
	}
	$scope.setColumnOffset = (delta) => {
		LMEMETA.setColumnOffset(delta)
	}
	$scope.addTuple = (variable) => {
		variable.add()
	}
	$scope.saveData = () => {
		Pace.start()
		LMEMETA.persistData(() => {
			$scope.$broadcast('someEvent', [1, 2, 3])
			$scope.$digest()
		})
	}

	$.getScript(`resources/${modelName}.js`, () => {
		//after this we can import the user-data....
		LMEMETA.lme.context.columnSize = columnSize
		LME = LMEMETA.exportWebModel()

		$scope.LME_MODEL = LME.rows
		$scope.timeviews = LMEMETA.getTimeViews()
		$scope.name = LME.name
		$scope.LMEMETA = LME

		const scorecard = LME.findScorecardTypes()[0]
		if (scorecard == null) {
			$scope.nav = []
			$scope.search = {
				title: 'No scorecard',
				hint : `Nothing to question in ${LME.name}\n.Add a displaytype/display_options=scorecard`
			}
		} else {
			$scope.nav = scorecard.children
			$scope.search = scorecard.children[0]
		}
		$scope.hasChanges = function() {
			return LMEMETA.hasChanges()
		}
		LMEMETA.loadData(() => {
			$scope.$digest()
		})
	})
	$(window).bind('keydown', function(event) {
		if (event.ctrlKey || event.metaKey) {
			switch (String.fromCharCode(event.which).toLowerCase()) {
			case 's':
				event.preventDefault()
				$scope.saveData()
				break
			}
		}
	})
	$('body').popover({
		selector: '[data-toggle="popover"]'
	})
	$scope.shareData = function() {
		$http.get('shareData/' + hash).then(() => {
			alert('data shared: ' + window.location.href)
		}).catch(function(err) {
			console.error('Error while sharing data:', err)
		})
	}
	/*   $('#startYear').datepicker({
	 /!*    format: "yyyy",*!/
	 /!*      viewMode: "years",
	 minViewMode: "years",*!/
	 changeMonth: false,
	 changeYear: true,
	 showButtonPanel: false,
	 dateFormat: 'yy',
	 onClose: function(dateText, inst) {
	 var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
	 var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
	 $scope.columnoffset = year - 2017;
	 $(this).datepicker('setDate', new Date(year, month, 1));
	 }
	 });*/
})
.controller('timelineController', function($scope, $http, $rootScope) {
	$scope.timeline_items = []
	$scope.rebuildTimeline = function() {
		$http.get('data/' + hash).then(function(data) {
			const timeline_items = []
			for (let parentIndex = 0; parentIndex < data.data.parents.length; parentIndex++) {
				const parent = data.data.parents[parentIndex]
				if (data.data.id === parent.id) {
					continue
				}
				timeline_items.push({
					enabled   : true,
					type      : 'event',
					ago       : moment(parent.create_date).fromNow(),
					eventclass: data.data.id === parent.id ? 'fa fa-file-text-o bg-gray' : 'fa fa-pencil-square-o bg-yellow',
					sha1      : parent.id,
					data      : parent,
					css       : ''
				})
			}
			timeline_items.push({
				enabled   : true,
				type      : 'event',
				ago       : moment(new Date().getTime()).fromNow(),
				eventclass: 'fa fa-file-text-o bg-gray',
				sha1      : hash,
				data      : {},
				css       : ''
			})
			if (timeline_items.length > 0) {
				timeline_items[0].eventclass = 'fa fa-file-o bg-gray'
				timeline_items.reverse()
			}
			$scope.timeline_items = timeline_items
		})
	}
	$scope.clicktimeline = function(timeline_item) {
		timeline_item.enabled = !timeline_item.enabled
		const all_items = []
		for (let i = 0; i < $scope.timeline_items.length; i++) {
			const ti = $scope.timeline_items[i]
			if (ti.enabled) {
				all_items.push(ti.sha1)
			}
		}
		const requestString = all_items.join(',')
		LMEMETA.loadData(() => {
			$rootScope.$digest()
		}, requestString)
	}
	$scope.$on('someEvent', () => {
		redefineParameters()
		$scope.rebuildTimeline()
	})
	$scope.rebuildTimeline()
})