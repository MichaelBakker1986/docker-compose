//Ace is a browser code editor, its the (Ace) right on the bottom of the page
/*function aceEditor()
 {
 var editor = ace.edit("ace_editor");
 ace.require("ace/ext/language_tools");
 ace.require("ace/ext/beautify");
 //ace.require("ace/mode/javascript");
 ace.require("ace/mode/json");
 editor.$blockScrolling = Infinity;
 editor.getSession().setMode("ace/mode/json");
 editor.getSession().setTabSize(2);
 editor.getSession().setUseWrapMode(false);
 editor.setOptions({
 showGutter: true,
 enableBasicAutocompletion: false,
 enableSnippets: true,
 enableLiveAutocompletion: true
 });
 return editor;
 }*/

/*var langTools = ace.require("ace/ext/language_tools");
 var editor = ace.edit("editor");*/

var APP = require('../app.js');
var FESFacade = require('../fesjs/FESFacade');
var JSWorkBook = require('../fesjs/JSWorkBook.js');
var wb = new JSWorkBook();
APP.controller('code_editor', ['$timeout', '$scope', '$http', '$location', '$rootScope', function ($timeout, $scope, $http, $location)
{
    for (var key in $location.search())
    {
        $scope[key] = $location.search()[key];
    }
    $scope.aceOn = $scope.aceOn !== undefined ? $scope.aceOn : undefined;
    var _session;
    var editor;
    $scope.aceLoaded = function (_editor)
    {
        var langTools = ace.require("ace/ext/language_tools");
        /*   ace.require("ace/ext/beautify");*/
        /*ace.require("ace/mode/javascript");*/
        ace.require("ace/mode/json");
        editor = _editor;
        // Editor part
        _session = _editor.getSession();

        var _renderer = _editor.renderer;

        // Options
        _editor.$blockScrolling = Infinity
        /*  _editor.setReadOnly(true);*/
        _editor.setOptions({
            showGutter: true,
            enableBasicAutocompletion: false,
            enableSnippets: true,
            enableLiveAutocompletion: true
        });
        _session.setMode("ace/mode/json");
        _session.setUseWrapMode(false);
        _session.setUndoManager(new ace.UndoManager());

        var rhymeCompleter = {
            getCompletions: function (editor, session, pos, prefix, callback)
            {
                if (prefix.length === 0)
                {
                    callback(null, []);
                    return
                }
                callback(null, [{"name": "flow", "score": 300, "flags": "bc", "syllables": "1"}]);
            }
        }
        langTools.addCompleter(rhymeCompleter);

        // Events
        _editor.on("changeSession", function ()
        {
        });

        _session.on("change", function ()
        {
        });
    };
    $scope.saveChanges = function ()
    {
        var present = $scope.$parent.presentation
        if (present.isLeaf())
        {
            wb.doImport(editor.getValue(), FESFacade.settings.defaultoutput);
            present.update(FESFacade.updateAll);
        }
        else
        {
            console.info('cannot save current state')
        }
    }
    $scope.enableAce = function (shouldBeOn, rowId)
    {
        $scope.aceOn = shouldBeOn
        $location.search('aceOn', shouldBeOn === false || shouldBeOn === undefined ? undefined : true);
        if ($scope.aceOn)
        {
            $('body').addClass('editor')
            if (editor)
            {
                editor.setValue(wb.export(FESFacade.settings.defaultoutput, rowId));
            }
        }
        else
        {
            $('body').removeClass('editor')
        }
    }
    $scope.$on('myCustomEvent', function (event, data)
    {
        $scope.enableAce($scope.aceOn, data);
    });
    $scope.toggleAce = function ()
    {
        $scope.aceOn = !$scope.aceOn;
        $scope.enableAce($scope.aceOn);
    }

    if ($scope.aceOn)
    {
        $('body').toggleClass('editor')
    }
}]);
