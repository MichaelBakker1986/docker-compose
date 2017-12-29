let modelName;
let hash;

function redefineParaments() {
    var params = window.location.href.split('#')
    if (params.length == 1) window.location.href = '#SCORECARDTESTMODEL&DEMO'
    var params = window.location.href.split('#')[1].split('&')
    modelName = params[0] || 'SCORECARDTESTMODEL';
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
            if (node.visible && node.children.length > 0) {
                $scope.search = node
            }
        }
        $scope.setColumnOffset = function(delta) {
            LMEMETA.setColumnOffset(delta)
        }
        $scope.addTuple = function(variable) {
            variable.add()
        }
        $scope.saveData = function() {
            Pace.start();
            LMEMETA.persistData(function(response) {
                $scope.$broadcast('someEvent', [1, 2, 3]);
                $scope.$digest()
            });
        }

        $.getScript('resources/' + modelName + '.js', function(data, textStatus, jqxhr) {
            //after this we can import the user-data....
            $scope.LME_MODEL = LME.nodes
            $scope.timeviews = LMEMETA.getTimeViews()
            $scope.name = LME.name
            $scope.LMEMETA = LME;

            for (var name in LME.nodes) {
                if (LME.nodes[name].type == 'scorecard') {
                    $scope.nav = LME.nodes[name].children
                    $scope.search = LME.nodes[name].children[0]
                }
            }
            $scope.hasChanges = function() {
                return LMEMETA.hasChanges()
            }
            LMEMETA.loadData(function(response) {
                $scope.$digest()
            })
        })
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
        $scope.timeline_items = [];
        $scope.rebuildTimeline = function() {
            $http.get('data/' + hash).then(function(data) {
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
            LMEMETA.loadData(function(response) {
                $rootScope.$digest()
            }, requestString)
        }
        $scope.$on('someEvent', function(event, mass) {
            redefineParaments();
            $scope.rebuildTimeline();
        });
        $scope.rebuildTimeline();
    })