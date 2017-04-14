var APP = require('../app.js');
var JSWorkBook = require('../fesjs/JSWorkBook.js');
var UIModel = require('../clientscorecard/uimodel.js');
var FESFacade = require('../fesjs/FESFacade');
var logger = require('tracer').console({level: 'info'});
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
    action: function ($scope)
    {
        sidebarShow();
        $scope.switchPage('Import')
    }
});
APP.controller('exchange', ['$timeout', '$scope', '$http', '$location', '$window', function ($timeout, $scope, $http, $location, $window)
{
    var wb = new JSWorkBook();
    $scope.importTypes = FESFacade.getParsers();
    $scope.createDownload = function (type)
    {
        var parser = FESFacade.findParser(type);
        var data = parser.deParse();
        if (parser.exportAsObject)
        {
            data = JSON.stringify(data, null, 2);
        }
        var blob = new Blob([data], {type: 'text/plain'});
        console.info((parser.extension || parser.name));
        $scope.filename = UIModel.getCurrentModelName() + '.' + (parser.extension || parser.name);
        var url = $window.URL || $window.webkitURL;
        $scope.fileUrl = url.createObjectURL(blob);
        console.info($scope.fileUrl)
    }
    $scope.fixError = function (importtype, error)
    {
        error.fix();
        var feedback = wb.validate();
        //TODO: in this file, i have this block three times.. FIX IT
        $timeout(function ()
        {
            if (feedback.valid)
            {
                $scope.switchPage('UI Elements');
            }
            importtype.importFeedback = feedback;
        });
    }
    $scope.fixAll = function (importtype)
    {
        var feedback = importtype.importFeedback.fixAll();
        //TODO: in this file, i have this block three times.. FIX IT
        $timeout(function ()
        {
            if (feedback.valid)
            {
                $scope.rootNodePath(UIModel.getRootNode().rowId);
                $scope.switchPage('UI Elements');
            }
            importtype.importFeedback = feedback;

        });
    }
    $scope.saveFile = function (importType, file)
    {
        var r = new FileReader();
        r.onload = function (e)
        {
            var contents = e.target.result;

            var ful;
            $scope.$root.myPromise = new Promise(function (fulfill, reject)
            {
                ful = fulfill;
            });
            wb.doImport(contents, importType.name);
            logger.info('import done.. performing monte carlo simulation')
            var feedback = wb.validate();

            //display Errors on page
            importType.importFeedback = feedback;
            $timeout(function ()
            {
                $scope.$root.model = UIModel.getCurrentModelName();
            })
            //  $scope.switchModel(wb.solution)
            $scope.uimodelroot.nodes = UIModel.getRootNode().nodes;

            //TODO: in this file, i have this block three times.. FIX IT
            $timeout(function ()
            {
                $location.search('model', UIModel.getCurrentModelName());
                if (feedback.valid)
                {
                    $scope.rootNodePath(UIModel.getRootNode().rowId);
                    $scope.switchPage('UI Elements');
                }
            });
            ful('ok');
        };
        r.readAsText(file);
    }
}]);