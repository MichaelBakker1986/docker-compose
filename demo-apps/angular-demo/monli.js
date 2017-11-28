angular
    .module('angapp', [])
    .controller('lmeController', function($scope, $http) {
        $http.get('id/DEMO/resources/KSP.js').then(function(data) {
            eval(data.data)
            var LME = LMEMETA.exportWebModel();
            for (var name in LME.nodes) {
                $scope[name] = LME.nodes[name]
            }
            $scope.name = LME.name
        }).catch(function(err) {
            console.error("failed loading " + err);
        });
    });