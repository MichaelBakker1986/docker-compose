//create an angular application
var angularApplication = angular.module('angularapp', ['angular.filter']);

//create an angular controller
angularApplication.controller('myController', function($scope, $http, $interval) {
    var url = '/DEMO/transformFFL_LME/';
    $http.get(url + 'MVO.js').then(function(data) {
        //load sync dynamic javascript file
        eval(data.data)
        //create a tree from current loaded model
        //tell angular to apply model nodes to the controller $scope
        $scope.LME_MODEL = LME.nodes;


        LMEMETA.importData('[{"varName":"Q_MAP01_VRAAG01","colId":"2","value":1,"formulaId":"100101"},{"varName":"Q_MAP01_VRAAG01_MEMO","colId":"2","value":"asfasfasf","formulaId":"100106"},{"varName":"Q_MAP01_VRAAG02","colId":"2","value":0,"formulaId":"100110"},{"varName":"Q_MAP01_VRAAG03","colId":"2","value":0,"formulaId":"100118"},{"varName":"Q_MAP01_VRAAG04","colId":"2","value":1,"formulaId":"100125"},{"varName":"Q_MAP01_VRAAG04_MEMO","colId":"2","value":"asfasfasf","formulaId":"100127"},{"varName":"Q_MAP01_VRAAG05","colId":"2","value":0,"formulaId":"100132"},{"varName":"Q_MAP01_VRAAG06","colId":"2","value":1,"formulaId":"100138"},{"varName":"Q_MAP01_VRAAG06_MEMO","colId":"2","value":"asfasfa","formulaId":"100140"},{"varName":"Q_MAP01_VRAAG07","colId":"2","value":0,"formulaId":"100145"},{"varName":"Q_MAP01_VRAAG07_MEMO","colId":"2","value":"asfasfasf","formulaId":"100148"},{"varName":"Q_MAP01_VRAAG08","colId":"2","value":0,"formulaId":"100151"},{"varName":"Q_MAP01_VRAAG09","colId":"2","value":1,"formulaId":"100158"},{"varName":"Q_MAP01_VRAAG09_MEMO","colId":"2","value":"afsafas","formulaId":"100162"},{"varName":"Q_MAP01_VRAAG10","colId":"2","value":0,"formulaId":"100165"},{"varName":"Q_MAP01_VRAAG11","colId":"2","value":1,"formulaId":"100172"},{"varName":"Q_MAP01_VRAAG11_MEMO","colId":"2","value":"asfasf","formulaId":"100175"},{"varName":"Q_MAP01_VRAAG12","colId":"2","value":1,"formulaId":"100178"},{"varName":"Q_MAP01_VRAAG12_MEMO","colId":"2","value":"afsasfa","formulaId":"100180"},{"varName":"Q_MAP01_VRAAG13","colId":"2","value":0,"formulaId":"100185"},{"varName":"Q_MAP01_VRAAG14","colId":"2","value":0,"formulaId":"100191"},{"varName":"Q_MAP02_VRAAG01","colId":"2","value":1,"formulaId":"100231"},{"varName":"Q_MAP02_VRAAG01_MEMO","colId":"2","value":"asfasfa","formulaId":"100235"},{"varName":"Q_MAP02_VRAAG02","colId":"2","value":0,"formulaId":"100238"},{"varName":"Q_MAP03_VRAAG01","colId":"2","value":0,"formulaId":"100303"},{"varName":"Q_MAP03_VRAAG02","colId":"2","value":0,"formulaId":"100310"},{"varName":"Q_MAP03_VRAAG03","colId":"2","value":0,"formulaId":"100316"},{"varName":"Q_MAP03_VRAAG04","colId":"2","value":0,"formulaId":"100321"},{"varName":"Q_MAP03_VRAAG05","colId":"2","value":0,"formulaId":"100327"},{"varName":"Q_MAP03_VRAAG06","colId":"2","value":1,"formulaId":"100333"},{"varName":"Q_MAP03_VRAAG06_MEMO","colId":"2","value":"asfasf","formulaId":"100335"},{"varName":"Q_MAP03_VRAAG07","colId":"2","value":1,"formulaId":"100339"},{"varName":"Q_MAP03_VRAAG08","colId":"2","value":0,"formulaId":"100345"},{"varName":"Q_MAP03_VRAAG09","colId":"2","value":0,"formulaId":"100351"},{"varName":"Q_MAP03_VRAAG10","colId":"2","value":1,"formulaId":"100357"},{"varName":"Q_MAP03_VRAAG10_MEMO","colId":"2","value":"sfasfasfa","formulaId":"100359"},{"varName":"Q_MAP03_VRAAG11","colId":"2","value":0,"formulaId":"100363"},{"varName":"Q_MAP03_VRAAG12","colId":"2","value":1,"formulaId":"100369"},{"varName":"Q_MAP03_VRAAG12_MEMO","colId":"2","value":"asfasfa","formulaId":"100371"},{"varName":"Q_MAP03_VRAAG13","colId":"2","value":0,"formulaId":"100375"},{"varName":"Q_MAP03_VRAAG14","colId":"2","value":1,"formulaId":"100381"},{"varName":"Q_MAP03_VRAAG14_MEMO","colId":"2","value":"afsasfasf","formulaId":"100383"},{"varName":"Q_MAP04_VRAAG01","colId":"2","value":0,"formulaId":"100416"},{"varName":"Q_MAP04_VRAAG02","colId":"2","value":0,"formulaId":"100423"},{"varName":"Q_MAP04_VRAAG03","colId":"2","value":1,"formulaId":"100428"},{"varName":"Q_MAP04_VRAAG03_MEMO","colId":"2","value":"sfasf","formulaId":"100430"},{"varName":"Q_MAP04_VRAAG04","colId":"2","value":1,"formulaId":"100433"},{"varName":"Q_MAP04_VRAAG04_MEMO","colId":"2","value":"asfasfa","formulaId":"100435"},{"varName":"Q_MAP04_VRAAG05","colId":"2","value":0,"formulaId":"100445"},{"varName":"Q_MAP04_VRAAG06","colId":"2","value":1,"formulaId":"100451"},{"varName":"Q_MAP04_VRAAG06_MEMO","colId":"2","value":"asfasf","formulaId":"100453"},{"varName":"Q_MAP04_VRAAG07","colId":"2","value":0,"formulaId":"100456"},{"varName":"Q_MAP04_VRAAG08","colId":"2","value":0,"formulaId":"100461"},{"varName":"Q_MAP04_VRAAG09","colId":"2","value":1,"formulaId":"100469"},{"varName":"Q_MAP04_VRAAG09_MEMO","colId":"2","value":"asfasf","formulaId":"100472"},{"varName":"Q_MAP04_VRAAG10","colId":"2","value":0,"formulaId":"100475"},{"varName":"Q_MAP04_VRAAG11","colId":"2","value":1,"formulaId":"100480"},{"varName":"Q_MAP04_VRAAG11_MEMO","colId":"2","value":"asfasf","formulaId":"100482"},{"varName":"Q_MAP04_VRAAG12","colId":"2","value":0,"formulaId":"100485"}]');

        $scope.initChart();

    }).catch(function(err) {
        console.info(err);
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

    var saveToken = 'DEMO';
    var modelName = 'MVO';
    $scope.saveData = function(e) {
        $http.post('/id/' + saveToken, {
            data: LMEMETA.exportData()
        }).then(function(data) {
            saveToken = data.data.saveToken;
            window.location.href = '#' + modelName + '&' + saveToken;
            alert('Success saved data' + JSON.stringify(data))
        }).catch(function(err) {
            alert('Cannot save data to from [' + '/id/' + saveToken + ']');
            console.error(err)
        })
    }
});

var chart;

function chartSpider(json) {

    console.log(json.series[0].data);
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