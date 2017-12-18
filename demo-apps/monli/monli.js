angular
    .module('angapp', ["highcharts-ng"])
    .controller('lmeController', function($scope, $http) {
        $scope.changeChoice = function(variable, value) {
            variable.value = value.name
        }

        $.getScript('resources/KSP.js', function(data, textStatus, jqxhr) {
            eval(data.data)
            var LME = LMEMETA.exportWebModel();
            for (var name in LME.nodes) {
                $scope[name] = LME.nodes[name]
            }
            $scope.name = LME.name
        }).catch(function(err) {
            console.error("failed loading " + err.toString());
        });
        $('body').popover({
            selector: '[data-toggle="popover"]'
        });
    });