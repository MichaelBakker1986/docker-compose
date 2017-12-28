//create an angular application
var angularApplication = angular.module('angularapp', ['angular.filter']);

//create an angular controller
angularApplication.controller('myController', function($scope, $http, $interval) {
    $.getScript('resources/MVO.js').then(function(data) {
        //create a tree from current loaded model
        //tell angular to apply model nodes to the controller $scope
        $scope.LME_MODEL = LME.nodes;
        LMEMETA.loadData(function(response) {
            $scope.$digest()
        })
        $scope.initChart();

    }).catch(function(err) {
        console.error('failed to load model: ' + err.toString());
    });

    $scope.showHint = function(show, question, event) {

        if (question.hint != undefined) {
            $scope.popOverHint = {
                visible: show,
                message: question.hint,
                top: angular.element(event.target).prop('offsetTop') + 30 + 'px',
                left: angular.element(event.target).prop('offsetLeft') + 'px'
            }
        }
    };
    $scope.showJson = function(question) {
        output(syntaxHighlight(question));
    }
    $scope.changeSearch = function(node) {
        $scope.search = node.path + '.' + node.id
    }

    $scope.initChart = function() {

        var dataList = ['Q_MAP01_SCORE01', 'Q_MAP02_SCORE01', 'Q_MAP03_SCORE01', 'Q_MAP04_SCORE01'];

        var serieData = new Array();
        var categorieLabels = new Array();
        for (i = 0; i < dataList.length; i++) {
            var varName = dataList[i];
            serieData.push(LME.nodes[varName].value);
            categorieLabels.push(LME.nodes[varName].title);
        }
        var chart = {
            series: [{
                name: 'Jij',
                data: serieData
            }],
            xAxis: {
                categories: categorieLabels
            }
        }

        chartSpider(chart);
    }

    $interval(callAtInterval, 1000);

    function callAtInterval() {
        var dataList = ['Q_MAP01_SCORE01', 'Q_MAP02_SCORE01', 'Q_MAP03_SCORE01', 'Q_MAP04_SCORE01'];
        var serieData = new Array();
        for (i = 0; i < dataList.length; i++) {
            var varName = dataList[i];
            serieData.push(LME.nodes[varName].value);
        }

        var chart = $('#container1').highcharts();
        chart.series[0].setData(serieData, true);
    }

    $scope.saveData = function(e) {
        LMEMETA.persistData()
    }
});

var chart;

function chartSpider(json) {

    chart = Highcharts.chart('container1', {

        chart: {
            polar: true,
            type: 'line'
        },

        title: {
            text: 'Resultaat',
            x: -80
        },

        pane: {
            size: '80%'
        },

        xAxis: {
            categories: json.xAxis.categories,
            tickmarkPlacement: 'on',
            lineWidth: 0
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },

        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
        },

        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 70,
            layout: 'vertical'
        },

        series: [{
            name: json.series[0].name,
            data: json.series[0].data,
            pointPlacement: 'on'
        }, {
            name: 'Gemiddeld',
            data: [75, 60, 55, 70],
            pointPlacement: 'on'
        }]
    });
}


function output(inp) {
    document.getElementById('prestuff').innerHTML = inp;
}

function syntaxHighlight(json) {
    var json = JSON.stringify(json, undefined, 4);
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}