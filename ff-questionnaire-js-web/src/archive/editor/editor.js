var APP = require('../app.js');

var FESFacade = require('../../../../ff-fes/fesjs/FESFacade');
var SolutionFacade = require('../../../../ff-fes/fesjs/SolutionFacade');
var JSWorkBook = require('../fesjs/JSWorkBook.js');
var formulaBootstrap = require('../fesjs/formula-bootstrap.js');
var FunctionMap = require('../fesjs/FunctionMap.js');
var esprima = require('esprima');
var UIModel = require('../clientscorecard/uimodel.js');
var pivot = require('./Pivot.js');
var validUrl = require('./Validators.js');
var AST = require('../fesjs/AST.js');
APP.pages.push({name: 'Editor', icon: 'fa-table', path: '/src/archive/editor/editor.html', sidebarhide: true});
/*APP.additionalbuttons.push({
 name: 'save',
 icon: 'fa-save',
 page: 'Editor',
 action: function ($scope)
 {
 saveFunction();
 }
 });*/
APP.additionalbuttons.push({
    name: 'Editor',
    icon: 'fa fa-table fa-fw',
    page: 'Editor',
    action: function ($scope)
    {
        sidebarHide();
        $scope.switchPage('Editor')
    }
});
APP.filter('rowId', function ()
{
    return function (items)
    {
        var filtered = [];
        for (var i = 0; i < items.length; i++)
        {
            var item = items[i];
            filtered.push(item);
        }
        return filtered;
    };
});
//consider using other names
var displaytypes = ['select', 'PropertyType', 'ActionType', 'AmountAnswerType', 'MemoAnswerType', 'DateAnswerType', 'TextAnswerType', 'BooleanAnswerType', 'StringAnswerType', 'undefined'];
//part of the FESFacade
var editColumns = [
    {colId: 'title', icon: 'fa-info-circle', displayText: 'title'},
    {colId: 'visible', icon: 'fa-eye', displayText: 'visible'},
    {colId: 'required', icon: 'fa-exclamation-circle', displayText: 'required'},
    {colId: 'validateInput', icon: 'fa-check-circle-o', displayText: 'validate input'},
    {colId: 'value', icon: 'fa-edit', displayText: 'value'},
    {colId: 'locked', icon: 'fa-lock', displayText: 'locked'},
    {colId: 'validation', icon: 'fa-check-square-o', displayText: 'validation'},
    {colId: '_g', icon: '', displayText: ' '},
    {colId: '_h', icon: '', displayText: ' '}
];
var saveFunction;
var rows = [];
var wb = new JSWorkBook();
APP.controller('editor', ['$timeout', '$scope', '$http', '$location', function ($timeout, $scope, $http, $location)
{
    function updateRows()
    {
        rows.length = 0;
        Array.prototype.push.apply(rows, $scope.presentation == undefined ? [] : $scope.presentation.getAllChildren());
        $timeout(function ()
        {
            $scope.rows = rows;
        });
    }

    $scope.$on('myCustomEvent', function (event, data)
    {
        updateRows();
    });
    updateRows();

    saveFunction = function ()
    {
        console.info('save model' + $scope.apiPath + 'FORMULA/' + 1)
        var httpPromise = $http.post($scope.apiPath + 'FORMULA/' + 1, SolutionFacade.produceSolution().formulas);

        $scope.myPromise = httpPromise;
        $timeout(function ()
        {
            $scope.myPromise = httpPromise;
        });
        httpPromise.then(function successCallback(response)
        {
            console.info(response);
        }, function errorCallback(response)
        {
            console.error(response)
        });
    }
    sidebarHide();//just temporally fix, should be more angular'ish
    $scope.sheets = [{id: '', index: 3}];
    $scope.sheet = {id: $scope.sheets[0].id};
    $scope.vals = {};
    $scope.cols = editColumns;
    $scope.answertypes = displaytypes;
    $scope.convert = function (row)
    {
        return row.rowId;
    }
    /**
     * Dynamic modify refName single formula
     */
    $scope.updateFormula = function (row, col, formulaUI)
    {
        if (row === undefined || col === undefined)
        {
            console.info(row + ":" + col);
            throw Error('Invalid params');
        }
        var refName = row + "_" + col;
        if (validUrl(formulaUI.original))
        {
            $http.get(formulaUI.original).success(function (data)
            {
                /* //want to see all cols needed, rows needed..
                 //metadata is printed..
                 var metaData = pivot(data);
                 console.info(metaData)
                 var aditional = $scope.rows;
                 for (var i = 0; i < metaData.count; i++)
                 {
                 var colId = 0;
                 var obj = data[metaData.path][i];
                 for (var key in metaData.properties)
                 {
                 var f = FESFacade.addLink($scope.sheet.id + aditional[i], $scope.cols[colId], true, AST.STRING(obj[key].toString()));
                 FunctionMap.rebuild(FESFacade, aditional[i] + "_" + $scope.cols[colId], f);
                 colId++
                 }
                 }*/
                throw Error('not working anymore')
            });
        }
        else
        {
            try
            {
                console.info('row: ' + row + "  col : " + col)

                var uiCell = UIModel.getUI(row, col, true);
                if (col === 'tuple')
                {
                    var tupleTuple = UIModel.getUI(row, 'value', true);
                    tupleTuple.tuple = true;
                    return;
                }
                uiCell.displayAs = uiCell.displayAs || 'PropertyType';

                FESFacade.createFormula(formulaUI.original, row, col);

                formulaUI.valid = true;
            }
            catch (e)
            {
                console.error(e);
                formulaUI.valid = false;
            }
        }
    };
    $scope.print = function (value, row, col)
    {
        var uiCell = UIModel.getUI(row, col, true);
        $timeout(function ()
        {
            $scope.focussedId = row + "_" + col;
            console.info($scope.focussedId)
            $scope.SelectedComponent = {
                ui: uiCell,
                row: row,
                col: col,
                formula: FESFacade.getFormula(row, col)
            }
            if (uiCell.displayAs !== 'AmountAnswerType')
            {
                var $formulaInput = $('#formulaInput');
                $formulaInput.focus();
                $formulaInput.select();
            }
        });
    }


    /**
     * Properties, read-only types
     */
    $scope.apiGet = function (row, col)
    {
        var formula = FESFacade.getFormula(row, col);
        if (formula === undefined)
        {
            FESFacade.addLink(row, col, true, undefined);
        }
        else
        {
            return wb.get(row, col);
        }
    };
    /**
     * for other input types Support default values
     * Move this entire thing, used by editor only?
     */
    $scope.apiGetSet = function (rowId, row, colId)
    {
        var formula = FESFacade.getFormula(rowId, colId);

        if (row.rowId === undefined || (row.rowId !== rowId))
        {
            row.rowId = rowId;
            //angular watches these members, dont set them unless needed
            var inputValue = wb.get(rowId, colId);
            if (inputValue != row.inputValue)
            {
                row.inputValue = inputValue;
            }
            row.oldValue = row.inputValue;
        }
        else if (row.oldValue !== row.inputValue)
        {
            //!isNaN(row.inputValue)
            if (row.inputValue !== null && row.inputValue !== undefined && row.inputValue !== '')
            {
                $scope.exportValue(rowId, row, colId, row.inputValue)

                row.inputValue = wb.get(rowId, colId);
                row.oldValue = row.inputValue;
            }
        }
        else
        {
            if (formula !== undefined)
            {
                //angular watches these members, dont set them unless needed
                var inputValue = wb.get(rowId, colId);
                if (inputValue != row.inputValue)
                {
                    row.inputValue = inputValue;
                }
            }
            row.oldValue = row.inputValue;
        }
    };
}]);