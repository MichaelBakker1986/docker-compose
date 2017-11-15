angular
    .module('angapp', ['angular.filter'])
    .directive('ngBindAttrs', function() {

        /* $('[data-toggle="popover"]').popover({trigger: 'hover'});*/
        return function(scope, element, attrs) {
            scope.$watch(attrs.ngBindAttrs, function(value) {
                angular.forEach(value, function(value, key) {
                    attrs.$set(key, value);
                })
            }, true)
        }
    })
    .directive('highchartsColumn', function($parse) {
        'use strict';
        return {
            restrict: 'E',
            template: '<div></div>',
            link: function(scope, element, attrs) {
                attrs.chart = new Highcharts.chart(element[0], {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: attrs.title
                    },
                    dataLabels: {
                        enabled: true
                    }
                });

                let listener = function() {
                    const categories = attrs.series ? attrs.series[0] : [];
                    let series = attrs.series ? attrs.series[1] : [];

                    for (var i = 0; i < series.length; i++) {
                        if (attrs.chart.series[i]) {
                            attrs.chart.series[i].setData([series[i]], true);
                        } else {
                            attrs.chart.addSeries(series[i]);
                        }
                    }

                    if (i < attrs.chart.series.length - 1) {
                        var seriesLength = attrs.chart.series.length - 1;
                        for (var j = seriesLength; j > i; j--) {
                            attrs.chart.series[j].remove();
                        }
                    }
                    if (attrs.chart.xAxis.length === 0) {
                        attrs.chart.addAxis(categories);
                    } else {
                        attrs.chart.xAxis[0].setCategories(categories, true);
                    }
                };
                scope.$watch(function() {
                    return attrs.series;
                }, listener);
                listener()
            }
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
        /*  $('body').popover({
              selector: '[data-toggle="popover"]'
          });*/
    }).controller('timelineController', function($scope, $http, $rootScope) {
    $scope.timeline_items = [
        {
            type: 'label',
            css: 'time-label',
            text: '10 Feb. 2014',
            labelclass: 'bg-red'
        },
        {
            type: 'event',
            eventclass: 'fa fa-envelope bg-blue',
            css: ''
        },
        {
            type: 'event',
            eventclass: 'fa fa-user bg-aqua',
            css: ''
        },
        {
            type: 'event',
            eventclass: 'fa fa-comments bg-yellow',
            css: ''
        },
        {
            type: 'event',
            eventclass: 'fa fa-camera bg-purple',
            css: ''
        },
        {
            type: 'event',
            eventclass: 'fa fa-video-camera bg-maroo',
            css: ''
        },
        {
            type: 'event',
            eventclass: 'fa fa-clock-o bg-gray',
            css: ''
        },
        {
            type: 'label',
            css: 'time-label',
            text: '3 Jan. 2014',
            labelclass: 'bg-green'
        }]
    var params = window.location.href.split('#')[1].split('&')
    var model = params[0] || 'MVO';
    let hash = params[1] || 'DEMO';
    $http.get('/id/' + hash + '/data').then(function(data) {
        var timeline_items = [];
        /*   timeline_items.push({
               type: 'label',
               css: 'time-label',
               text: '10 Feb. 2014',
               labelclass: 'bg-red'
           })*/
        /*  timeline_items.push({
              type: 'label',
              labelclass: 'bg-green',
              sha1: data.data.id,
              data: data.data,
              text: '3 Jan. 2014',
              css: 'time-label',
          })*/
        for (var key in data.data.parents) {
            timeline_items.push({
                type: 'event',
                eventclass: data.data.id == key ? 'fa fa-file-text-o bg-gray' : 'fa fa-pencil-square-o bg-yellow',
                sha1: key,
                data: data.data.parents[key],
                css: ''
            })
        }
        //fa fa-clock-o
        if (timeline_items.length > 0) {
            timeline_items[0].eventclass = 'fa fa-file-o bg-gray'
            timeline_items.reverse();
        }
        $scope.timeline_items = timeline_items;
    });
    $scope.clicktimeline = function(timeline_item) {
        window.location.href = '#' + model + '&' + timeline_item.sha1
        LMEMETA.loadData(function(response) {
            $rootScope.$digest()
        })
    }
})