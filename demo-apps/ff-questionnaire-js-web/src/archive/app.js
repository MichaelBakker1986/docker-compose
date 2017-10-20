/**
 * The angular app.
 * still have to find a way to not inject UI.TREE in constrcution time.
 * ui.tree -> view a tree structure
 * cgBusy -> (bysydecorator)
 */
var APP = angular.module('app', ['ui.tree', 'ngAria', 'ngAnimate', 'ngMaterial', 'cgBusy', 'ui.ace', 'angular-json-editor'])
    .config(function (JSONEditorProvider)
    {
        JSONEditorProvider.configure({
            defaults: {
                options: {
                    disable_edit_json: true,
                    disable_collapse: true,
                    disable_properties: true,
                    required_by_default: true,
                    no_additional_properties: true,
                    iconlib: 'fontawesome4',
                    theme: 'bootstrap3'
                }
            }
        });
    });

APP.additionalbuttons = [];
APP.pages = [];
/*
 * very generic directive
 * to use the ng-bind for the same as bindattrs
 */
APP.directive('ngBindAttrs', function ()
{
    return function (scope, element, attrs)
    {
        scope.$watch(attrs.ngBindAttrs, function (value)
        {
            angular.forEach(value, function (value, key)
            {
                attrs.$set(key, value);
            })
        }, true)
    }
});
APP.directive("ngFileSelect", function ()
{
    return {
        link: function ($scope, el)
        {
            el.bind("change", function (e)
            {
                $scope.file = (e.srcElement || e.target).files[0];
                $scope.saveFile($scope.importtype, $scope.file);
            });
        }
    };
});
APP.config(['$compileProvider', function ($compileProvider)
{
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
}]);
module.exports = APP;