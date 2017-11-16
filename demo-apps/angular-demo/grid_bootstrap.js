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
    .controller('lmeController', function($scope, $http, $timeout) {
        var params = window.location.href.split('#')
        if (params.length == 1) window.location.href = '#MVO&DEMO'
        var params = window.location.href.split('#')[1].split('&')
        let modelName = params[0] || 'MVO';

        $scope.changeSearch = function(node) {
            $scope.search = node
        }

        function persist() {
            Pace.start();
            LMEMETA.persistData(function(response) {
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
            $scope.saveData = persist

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
                        persist();
                        break;
                }
            }
        });
        $('body').popover({
            selector: '[data-toggle="popover"]'
        });
    }).controller('timelineController', function($scope, $http, $rootScope) {
    $scope.timeline_items = [];
    var params = window.location.href.split('#')[1].split('&')
    var model = params[0] || 'MVO';
    let hash = params[1] || 'DEMO';
    $http.get('/id/' + hash + '/data').then(function(data) {
        var timeline_items = [];
        var now = new Date().getTime();
        for (var parentIndex = 0; parentIndex < data.data.parents.length; parentIndex++) {
            var parent = data.data.parents[parentIndex];
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
        if (timeline_items.length > 0) {
            timeline_items[0].eventclass = 'fa fa-file-o bg-gray'
            timeline_items.reverse();
        }
        $scope.timeline_items = timeline_items;
    });

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
        window.location.href = '#' + model + '&' + requestString
        LMEMETA.loadData(function(response) {
            $rootScope.$digest()
        })
    }
})