var APP = require('../app.js');
//don't use these private classes, use JSWorkBook instead
var FESFacade = require('../fesjs/FESFacade');
APP.pages.push({name: 'UI Elements', title: 'Schermpje bouwen', order: 3, icon: 'fa-wrench', path: '/src/archive/formbuilder/formbuilder.html'});
/*APP.additionalbuttons.push({
 name: 'save',
 icon: 'fa-save',
 page: 'UI Elements',
 action: function ($scope)
 {
 uiSaveFunction();
 }
 });*/
APP.additionalbuttons.push({
    name: 'UIEditor',
    icon: 'fa fa-wrench fa-fw',
    page: 'UI Elements',
    action: function ($scope)
    {
        sidebarShow();
        $scope.switchPage('UI Elements')
    }
});
var variableSchema = {

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
var logger = require('tracer').console({level: 'info'});
var uiSaveFunction;
//so this is the new interface, JSWorkBook
var JSWorkBook = require('../../archive/fesjs/JSWorkBook.js');
var workBook = new JSWorkBook();
var exportPresentation = workBook.export('presentation');
//var rightViewTree = workBook.export('presentation').tree;

var present = exportPresentation.tree;
APP.controller('formbuilder', ['$timeout', '$scope', '$http', '$location', function ($timeout, $scope, $http, $location)
{
    present.update({visible: true, title: true, required: true, locked: true});
    //rightViewTree.update({visible: true, title: true, required: true, locked: true});
    $scope.presentation = present;
    //  $scope.rightTree = rightViewTree;
    $scope.mySchema = FESFacade.variableSchema;
    /*                $scope.$watch('myStartVal.' + key, function (newValue, oldValue)
     {
     logger.info('selectedItem has changed[' + $scope.myStartVal.rowId + '[' + key + ']', newValue ? newValue.rowId : null, oldValue ? oldValue.rowId : null);
     }, true);*/
    $scope.propertyEditorChange = function (test)
    {
        var node = present.getNode($scope.myStartVal.rowId)
        var uinode = workBook.getNode($scope.myStartVal.rowId)
        for (var key in test)
        {
            uinode[key] = test[key];
        }
        node.parent().update({visible: true, title: true, required: true, locked: true, choices: true});
    }
    //  interested in the structure
    $scope.setNode = function (node)
    {
        //actually just selecting a Node to be editied, with a lot of technical dept:P
        if ($scope.myStartVal.rowId === node.rowId)
        {
            node = {};
        }
        $timeout(function ()
        {
            $scope.mySchema.title = node.rowId;
            var newVar = $scope.myStartVal;
            for (var key in  newVar)
            {
                delete newVar[key];
            }
            for (var key in node)
            {
                if (node[key] !== undefined && typeof node[key] !== 'object' && typeof node[key] !== 'function' && !key.startsWith('_'))
                {
                    newVar[key] = node[key];
                }
            }
        });
    }
    //the property editor start value
    $scope.myStartVal = {};
    $timeout(function ()
    {
        $scope.entireTree = present;
    });
    $scope.uiModelTree = {
        accept: function (sourceNodeScope, destNodesScope, destIndex)
        {
            return true;
        },
        dropped: function (event)
        {
            //if element was not moved, use click event
            if (event.source.index == event.dest.index)
            {
                var node = event.source.nodeScope.$modelValue;
            }
            else
            {
                var node = event.source.nodeScope.$modelValue;
                present.update({title: true});
                console.info('Dropped')
            }
        }
    };
    uiSaveFunction = function ()
    {
        var Solution = FESFacade.produceSolution();
        console.info('save model' + $scope.apiPath + 'UPDATE/SOLUTION/')
        console.info(Solution)
        var httpPromise = $http.post($scope.apiPath + 'FORMULA/', Solution.formulas);
        $scope.$parent.$parent.myPromise = httpPromise;
        httpPromise.success(function (formulas)
        {
            FESFacade.mergeFormulas(formulas);

            workBook.doImport($scope.docValues, 'jsonvalues');

            return $http.post($scope.apiPath + 'SOLUTION/', {
                name: Solution.name,
                nodes: Solution.nodes
            });
        }).then(function (data)
        {
            return $http.post($scope.apiPath + 'FORMULA/', Solution.formulas);
        }).then(function successCallback(response)
        {
            FESFacade.updateValueMap($scope.docValues);
            console.info(response);
        }, function errorCallback(response)
        {
            console.error(response)
        });
    };
    $scope.saveUIModel = uiSaveFunction;

}]);