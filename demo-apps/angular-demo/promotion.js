angular
    .module('angapp', ['angular.filter', "highcharts-ng"])
    .controller('promotionController', function($scope, $http, $rootScope) {
        $scope.widgets = [
            {name: 'IDE', description: 'IDE DEMO Application', href: 'ide.html'},
            {name: 'STUDIEKOSTEN', description: 'Monli Hoeveel kost een studie?', href: 'HoeveelKostEenStudie.html'},
            {name: 'MVO', description: 'MVO Bootstrap', href: 'scorecard.html#MVO'},
            {name: 'SCORECARDTESTMODEL', description: 'SCORECARDTESTMODEL', href: 'scorecard.html#SCORECARDTESTMODEL'},
            {name: 'SHOWCASE', description: 'Showcase example', href: 'showcase.html'},
            /* {name: 'DESIGNER', description: 'Designer ide', href: 'ui_designer.html'},*/
            {name: 'BASICS', description: 'Most Basic Angular example', href: 'basic_example.html'},
            {name: 'BASICS 2', description: 'Extended controller Angular example', href: 'extended_controller.html'},
            {name: 'KINDKOSTEN', description: 'Monli Wat kost een kind?', href: 'WatKostEenKind.html'},
            {name: 'COMPONENTS', description: 'UI Components Showcase', href: 'uishowcase.html'},
            {name: 'DOCUMENTATION', description: 'LME Documentation', href: 'https://confluence.topicus.nl/display/IN4J/LME+dashboard'},
            {name: 'DATA-API', description: 'DATA-REST-API Documentation', href: 'data-docs/?url=%2Fdata-api-docs#!/default/KinderSpaarPlan'},
            {name: 'MODEL-API', description: 'MODEL-REST-API Documentation', href: 'model-docs/?url=%2Fmodel-api-docs'}
        ]
    })