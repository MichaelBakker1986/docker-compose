/*'<span>DEMO apps: </span>\n' +
/!*    '<a href="http://' + domain + '/id/DEMO/datagraph.html">Data graph</a>\n' +*!/
'<br><span>IDE apps: </span>\n' +
'<a href="http://' + domain + '/id/DEMO/aceide.html">IDE DEMO Application</a><span> | </span>\n'*/
angular
    .module('angapp', ['angular.filter', "highcharts-ng"])
    .controller('promotionController', function($scope, $http, $rootScope) {
        $scope.widgets = [
            {name: 'IDE', description: 'IDE DEMO Application', href: 'aceide.html'},
            {name: 'STUDIEKOSTEN', description: 'Monli Hoeveel kost een studie?', href: 'HoeveelKostEenStudie.html'},
            {name: 'MVO', description: 'MVO Bootstrap', href: 'scorecard.html'},
            {name: 'SHOWCASE', description: 'Showcase example', href: 'showcase.html'},
            /* {name: 'DESIGNER', description: 'Designer ide', href: 'ui_designer.html'},*/
            {name: 'BASICS', description: 'Most Basic Angular example', href: 'basic_example.html'},
            {name: 'BASICS 2', description: 'Extended controller Angular example', href: 'extended_controller.html'},
            {name: 'KINDKOSTEN', description: 'Monli Wat kost een kind?', href: 'WatKostEenKind.html'},
            {name: 'COMPONENTS', description: 'UI Components Showcase', href: 'uishowcase.html'},
            {name: 'DOCUMENTATION', description: 'LME Documentation', href: 'https://confluence.topicus.nl/display/IN4J/LME+lifecycle'},
            {name: 'DATA-API', description: 'DATA-REST-API Documentation', href: 'data-docs'},
            {name: 'MODEL-API', description: 'MODEL-REST-API Documentation', href: 'model-docs'}
        ]
    })