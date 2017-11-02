angular.module('lmeapp').controller('extendedController', function($scope) {
    $scope.showTitle = function(figure) {
        alert(figure.title)
    }
    $scope.TEST = "Extended Controller"
});


console.log(LME.nodes.Q_MAP01_VRAAG01);
