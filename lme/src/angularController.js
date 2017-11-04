var angular = require('angular')
require('../../ff-fes/exchange_modules/presentation/webexport');
var LmeModel = require('./lme')
LMEMETA = new LmeModel()
LMEMETA.importLME(JSON_MODEL);
LME = LMEMETA.exportWebModel();
angular.module('lmeapp', []).controller('lmeController', function($scope) {
    $scope.MODEL = LMEMETA;
    var nodes = LME.nodes;
    for (var n in nodes) {
        $scope[n] = nodes[n];
    }
});