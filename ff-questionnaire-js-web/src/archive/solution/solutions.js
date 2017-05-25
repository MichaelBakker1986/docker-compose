var APP = require('../app.js');
APP.pages.push({name: 'Solutions', order: 4, icon: 'fa-files-o', path: '/src/archive/solution/solution.html'});
var JSWorkBook = require('../fesjs/JSWorkBook.js')
var wb = new JSWorkBook();
APP.controller('choose', ['$timeout', '$scope', '$http', '$location', function ($timeout, $scope, $http, $location)
{
    $scope.changeUiModel = function (uimodel)
    {
        if (uimodel.template)
        {
            var solution = uimodel.produce();
            $scope.switchModel(solution);
            $scope.switchPage('UI Elements');
        }
        else
        {
            console.time('capture');
            var httpPromise = $http.get($scope.apiPath + 'SOLUTION/' + uimodel.name.toUpperCase());
            httpPromise.success(function (data)
            {
                console.timeEnd('capture');
                console.time('capture');
                $scope.switchModel(data);
                console.timeEnd('capture');
                console.time('capture');
                $scope.switchPage('Questionnaire');
                console.timeEnd('capture');
            });
        }
    }
}]);