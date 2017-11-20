let modelName;
let hash;

function redefineParaments() {
    var params = window.location.href.split('#')
    if (params.length == 1) window.location.href = '#MVO&DEMO'
    var params = window.location.href.split('#')[1].split('&')
    modelName = params[0] || 'MVO';
    hash = params[1] || 'DEMO';
}
redefineParaments()

angular
    .module('angapp', ['angular.filter', "highcharts-ng"])
    .filter("filterByPrefix", function() {
        return function(nodes, search) {
            if (!search) return []
            return nodes.filter(function(item) {
                return item.path.contains('.' + search.id);
            });
        };
    })
    .controller('lmeController', function($scope, $http, $rootScope) {
        $scope.changeSearch = function(node) {
            $scope.search = node
        }
        $scope.saveData = function() {
            Pace.start();
            LMEMETA.persistData(function(response) {
                $scope.$broadcast('someEvent', [1, 2, 3]);
                $scope.$digest()
            });
        }
        $http.get('resources/' + modelName + '.js').then(function(data) {
            eval(data.data)
            //after this we can import the user-data....
            LMEMETA.importWebModel('Q_ROOT')
            LME = LMEMETA.exportWebModel();
            $scope.LME_MODEL = LME.nodes
            $scope.name = LME.name
            $scope.LMEMETA = LMEMETA;

            //TODO: find a way in FFL to make this generic...
            if (modelName.indexOf('V05') > -1) {
                $scope.nav = LME.nodes.Q_ROOT_VALUATION.children
                $scope.search = LME.nodes.Q_ROOT_VALUATION
            } else {
                $scope.nav = (LME.nodes.Q_ROOT || LME.nodes.root).children
                $scope.search = (LME.nodes.Q_ROOT || LME.nodes.root).children[0]
            }

            LMEMETA.loadData(function(response) {
                $scope.$digest()
            })
        }).catch(function(err) {
            console.error("failed loading " + err);
        });
        $(window).bind('keydown', function(event) {
            if (event.ctrlKey || event.metaKey) {
                switch (String.fromCharCode(event.which).toLowerCase()) {
                    case 's':
                        event.preventDefault();
                        $scope.saveData();
                        break;
                }
            }
        });
        $('body').popover({
            selector: '[data-toggle="popover"]'
        });
    })
    .controller('timelineController', function($scope, $http, $rootScope) {
        $scope.timeline_items = [];
        $scope.rebuildTimeline = function() {
            $http.get('/id/' + hash + '/data').then(function(data) {
                var timeline_items = [];
                var now = new Date().getTime();
                for (var parentIndex = 0; parentIndex < data.data.parents.length; parentIndex++) {
                    var parent = data.data.parents[parentIndex];
                    if (data.data.id == parent.id) {
                        continue;
                    }
                    timeline_items.push({
                        enabled: true,
                        type: 'event',
                        ago: moment(parent.create_date).fromNow(),
                        eventclass: data.data.id == parent.id ? 'fa fa-file-text-o bg-gray' : 'fa fa-pencil-square-o bg-yellow',
                        sha1: parent.id,
                        data: parent,
                        css: ''
                    })
                }
                timeline_items.push({
                    enabled: true,
                    type: 'event',
                    ago: moment(new Date().getTime()).fromNow(),
                    eventclass: 'fa fa-file-text-o bg-gray',
                    sha1: hash,
                    data: {},
                    css: ''
                })
                if (timeline_items.length > 0) {
                    timeline_items[0].eventclass = 'fa fa-file-o bg-gray'
                    timeline_items.reverse();
                }
                $scope.timeline_items = timeline_items;
            });
        }
        $scope.clicktimeline = function(timeline_item) {
            timeline_item.enabled = !timeline_item.enabled;
            var allitems = [];
            for (var i = 0; i < $scope.timeline_items.length; i++) {
                var ti = $scope.timeline_items[i];
                if (ti.enabled) {
                    allitems.push(ti.sha1)
                }
            }
            var requestString = allitems.join(',');
            window.location.href = '#' + modelName + '&' + requestString
            LMEMETA.loadData(function(response) {
                $rootScope.$digest()
            })
        }
        $scope.$on('someEvent', function(event, mass) {
            redifineParaments();
            $scope.rebuildTimeline();
        });
        $scope.rebuildTimeline();
    })