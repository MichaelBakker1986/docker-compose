var angular = require('angular')
require('../../ff-fes/exchange_modules/presentation/webexport');
var LmeModel = require('./lme')
var model = new LmeModel()
model.importLME(JSON_MODEL);
LME = model.exportWebModel();
angular.module('lmeapp', []).controller('lmeController', function($scope) {
    $scope.MODEL = LME;
    var nodes = LME.nodes;
    for (var n in nodes) {
        $scope[n] = nodes[n];
    }
});