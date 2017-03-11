var APP = require('../app.js');
var GenericModelFile = require('../fesjs/GenericModelFile.js');
APP.pages.push({name: 'Variables', title: 'Variables', order: 9, icon: 'fa-cubes', path: '/src/archive/variables/variables.html'});
APP.additionalbuttons.push({
    name: 'Variables',
    icon: 'fa fa-cubes fa-fw',
    page: 'Variables',
    action: function ($scope)
    {
        sidebarShow();
        $scope.switchPage('Variables')
    }
});
var logger = require('tracer').console({level: 'info'});
var JSWorkBook = require('../../archive/fesjs/JSWorkBook.js');
var wb = new JSWorkBook();

var updateAll = GenericModelFile.updateAll;
APP.controller('mdtTable', ['$timeout', '$scope', '$http', '$location', '$mdToast', function ($timeout, $scope, $http, $location)
{
    $scope.rows = GenericModelFile.present.getRowList();
    $scope.schema = GenericModelFile.variableSchema;
    /*var vm = this;
     vm.dtOptions = DTOptionsBuilder
     .withScroller()
     .withOption('deferRender', true)
     .withOption('scrollY', 200);
     */
    $scope.variableSchema = {

        title: ' ',
        "properties": {
            "rowId": {
                "readonly": true,
                "title": "Variable name",
                "type": "string"
            },
            "displayAs": {
                "title": "DisplayType",
                "type": "string",
                "enum": ['SectionType', 'ListAnswerType', 'PropertyType', 'ActionType', 'AmountAnswerType', 'MemoAnswerType', 'DateAnswerType', 'TextAnswerType', 'BooleanAnswerType', 'StringAnswerType', 'undefined'],
                "default": "TextAnswerType"
            },
            "frequency": {
                "title": "Frequency",
                "uniqueItems": true,
                "type": "string",
                "enum": [
                    "document",
                    "timeline",
                    "column",
                    "formulaset",
                    "columnset"
                ],
                "default": "document"
            },
            "Formulas": {
                "title": "Formulas",
                "type": "array",
                "uniqueItems": true,
                "format": "table",
                "items": {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string",
                            "enum": [
                                "Trend",
                                "NoTrend",
                                "title",
                                "visible",
                                "locked",
                                "required",
                                "validaton"
                            ],
                            "default": "document"
                        },
                        "formula": {
                            "type": "string"
                        }
                    }
                }
            },
            "tuple": {
                "title": "Tuple",
                "description": "Tuple definition",
                "type": "boolean",
                "format": "checkbox"
            },
            "Locked": {
                "title": "Locked",
                "type": "boolean",
                "format": "checkbox"
            },
            "Required": {
                "title": "Required",
                "type": "boolean",
                "format": "checkbox"
            },
            "Visible": {
                "title": "Visible",
                "type": "boolean",
                "format": "checkbox"
            },

            "DefaultValue": {
                "title": "Default value",
                "type": "string"
            }
        }
    };

    function updateRows()
    {
        $timeout(function ()
        {
        });
    }

    $scope.$on('myCustomEvent', function (event, data)
    {
        GenericModelFile.present.update(updateAll);
    });
    updateRows();
}])
;