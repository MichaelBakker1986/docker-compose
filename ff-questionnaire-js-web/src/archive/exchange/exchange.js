var APP = require('../app.js');
var JSWorkBook = require('../uiWorkbook');
var logger = require('ff-log');
APP.pages.push(
    {
        name: 'Import',
        title: 'Uitwissellen',
        order: 3,
        icon: 'fa-exchange',
        path: '/src/archive/exchange/exchange.html'
    }
);
APP.additionalbuttons.push({
    name: 'Import',
    icon: 'fa-exchange',
    page: 'Import',
    action: function ($scope) {
        sidebarShow();
        $scope.switchPage('Import')
    }
});
APP.controller('exchange', ['$timeout', '$scope', '$http', '$location', '$window', function ($timeout, $scope, $http, $location, $window) {

    $scope.importTypes = JSWorkBook.getParsers();
    $scope.createDownload = function (type) {
        var parser = JSWorkBook.findParser(type);
        var data = parser.deParse();
        if (parser.exportAsObject) {
            data = JSON.stringify(data, null, 2);
        }
        var blob = new Blob([data], {type: 'text/plain'});
        logger.info((parser.extension || parser.name));
        $scope.filename = JSWorkBook.getCurrentModelName() + '.' + (parser.extension || parser.name);
        var url = $window.URL || $window.webkitURL;
        $scope.fileUrl = url.createObjectURL(blob);
        logger.info($scope.fileUrl)
    }
    $scope.fixError = function (importtype, error) {
        error.fix();
        var feedback = JSWorkBook.validateImportedSolution();
        //TODO: in this file, i have this block three times.. FIX IT
        $timeout(function () {
            if (feedback.valid) {
                $scope.switchPage('UI Elements');
            }
            importtype.importFeedback = feedback;
        });
    }
    $scope.fixProblemsInImportedSolution = function (importtype) {
        var feedback = importtype.importFeedback.fixProblemsInImportedSolution();
        //TODO: in this file, i have this block three times.. FIX IT
        $timeout(function () {
            if (feedback.valid) {
                $scope.rootNodePath(JSWorkBook.getRootSolutionProperty().rowId);
                $scope.switchPage('UI Elements');
            }
            importtype.importFeedback = feedback;

        });
    }
    $scope.saveFile = function (importType, file) {
        var r = new FileReader();
        r.onload = function (e) {
            var contents = e.target.result;

            var ful;
            $scope.$root.myPromise = new Promise(function (fulfill, reject) {
                ful = fulfill;
            });
            JSWorkBook.importSolution(contents, importType.name);
            logger.info('import done.. performing monte carlo simulation')
            var feedback = JSWorkBook.validateImportedSolution();

            //display Errors on page
            importType.importFeedback = feedback;
            $timeout(function () {
                $scope.$root.model = JSWorkBook.getCurrentModelName();
            })
            //  $scope.switchModel(JSWorkBook.solution)
            $scope.uimodelroot.nodes = JSWorkBook.getRootSolutionProperty().nodes;

            //TODO: in this file, i have this block three times.. FIX IT
            $timeout(function () {
                $location.search('model', JSWorkBook.getCurrentModelName());
                if (feedback.valid) {
                    $scope.rootNodePath(JSWorkBook.getRootSolutionProperty().rowId);
                    $scope.switchPage('UI Elements');
                }
            });
            ful('ok');
        };
        r.readAsText(file);
    }
}]);