var APP = require('../archive/app.js');
var JSWorkBook = require('../archive/fesjs/JSWorkBook.js');
APP.pages.push({name: 'Timeline', title: 'Verleden', icon: 'fa-history', path: '/src/form/timeline.html'});
APP.controller('timeline', ['$timeout', '$scope', '$http', '$location', function ($timeout, $scope, $http, $location)
{
    var workBook = new JSWorkBook();
    $scope.journals = [{
        status: 'fa-check',
        info: 'success',
        title: 'Created document',
        year: 2013, x: 0
    }, {
        status: 'fa-credit-card',
        info: 'warning',
        title: 'Incomplete',
        year: 2014,
        x: 1
    }, {
        status: 'fa-bomb',
        info: 'danger',
        title: 'Inbalanced',
        year: 2015,
        x: 2
    }, {
        status: 'fa-save',
        info: '',
        title: 'Saved',
        year: 2016,
        x: 3
    }, {
        status: 'fa-graduation-cap',
        info: 'success',
        title: 'Balanced',
        year: 2017,
        x: 4
    }]

    $scope.switchPeriod = function (journal)
    {
        workBook.setXasStart(journal.x);
        $scope.switchPage('Questionnaire')
    }
}]);