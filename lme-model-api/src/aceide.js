/**
 * editor variable is set to the window.
 */
var ConvertEvaluateAsString = require('../../model-tests/plugins/ConvertEvaluateAsString').ConvertEvaluateAsString
var AmpersandConverter = require('../../model-tests/plugins/AmpersandConverter').AmpersandConverter
var ScorecardQ_caseFix = require('../../model-tests/plugins/ScorecardQ_caseFix').ScorecardQCaseFix
var V05CaseFix = require('../../model-tests/plugins/V05CaseFix').V05CaseFix
var EconomicEditorView = require('../../model-tests/EconomicEditorView').EconomicEditorView
var StoryParser = require('../../model-tests/StoryParser').StoryParser

var editor;//ace-ide editor
var fflModel = '';
var params = window.location.href.split('#')
if (params.length == 1) window.location.href = '#MVO&DEMO'
var params = window.location.href.split('#')[1].split('&')
let windowModelName = params[0] || 'MVO';
let userID = params[1] || 'DEMO'
var saveToken = userID;

function savFflModel() {
    Pace.track(function() {
        $.post("saveFFL_LME", {
            model: $("#models").val(),
            data: editor.getSession().getValue()
        }, function(data) {
            alert('Model [' + $("#models").val() + '] is updated');
            $('#preview-model').show()
        });
    });
}

function setValue(fflModel) {
    if (ConvertEvaluateAsString.on) {
        fflModel = ConvertEvaluateAsString.parse(fflModel);
    }
    if (AmpersandConverter.on) {
        fflModel = AmpersandConverter.parse(fflModel);
    }
    if (ScorecardQ_caseFix.on) {
        fflModel = ScorecardQ_caseFix.parse(fflModel);
    }
    if (V05CaseFix.on) {
        fflModel = V05CaseFix.parse(fflModel);
    }
    if (EconomicEditorView.on) {
        fflModel = EconomicEditorView.parse(fflModel);
    }
    editor.setValue(fflModel);
}

function scrollTop() {
    editor.scrollToLine(1, true, true, function() {
    });
    editor.gotoLine(1, 1, true);
    editor.selection.moveTo(0, 0)
}

angular.module('lmeapp').controller('ideController', function($scope, $http) {
    LMEMETA.loadData(function() {
    });
    $scope.fflmode = true;
    $scope.currentView = 'FFLModelEditorView';
    $scope.session = {
        disablePreviewButton: true,
        fflModelPath: windowModelName,
        user: {
            name: userID
        },
        messages: {
            data: [
                {text: 'Scorecard converter!'},
                {text: 'Implement refersTo generic!\nrefersTo STEP01\nrefersTo numberVariable</br>Multi dimentional is a Step and a Tuple'},
                {text: 'Make bigdata analyses from all models to find generics'}
            ]
        }
    }
    $scope.runJBehaveTest = function() {
        var annotations = []
        let storyParser = new StoryParser(editor.session.getValue());
        storyParser.message = function(event) {
            annotations.push({
                row: event.line,
                column: 0,
                text: event.result.message, // Or the Json reply from the parser
                type: event.result.status // also warning and information
            })
            editor.session.setAnnotations(annotations);
        }
        storyParser.then = function(event) {
            $scope.session.messages.data.push({
                text: 'jBehave tests done ' + storyParser.results.rate().toFixed(1) + '% passed'
            })
        }
        storyParser.start();
        storyParser.call();
    }
    $scope.saveFFLModel = function() {
        Pace.track(function() {
            $scope.saveFeedback = "Customizing " + $scope.session.fflModelPath + " …"
            $scope.saveFeedbackTitle = "Working on it..."
            $.post("saveFFL_LME", {
                model: $scope.session.fflModelPath,
                data: editor.getSession().getValue()
            }, function(data) {
                $scope.$apply(function() {
                    $scope.saveFeedbackTitle = "Finished"
                    $scope.saveFeedback = 'Done work..'
                    $scope.session.disablePreviewButton = false;
                })
            });
        });
    }
    $scope.goToPreviewPage = function() {
        $scope.session.disablePreviewButton = true;
        window.open('/id/' + userID + '/grid_bootstrap.html#' + $scope.session.fflModelPath + '&' + userID)
    }
    $scope.sneakPreviewModel = function() {
        Pace.track(function() {
            $.post("preview", {
                model: $scope.session.fflModelPath,
                data: editor.getSession().getValue()
            }, function(data) {
                window.open('/id/' + userID + '/grid_bootstrap.html#' + data.link + '&' + userID);
            });
        });
    }

    $scope.toggleAceEditorMode = function() {
        $scope.fflmode = !$scope.fflmode;
        EconomicEditorView.on = !EconomicEditorView.on;
        setValue(fflModel)
        scrollTop()
    }
});
//LME-Model stuff
$(document).ready(function() {


    $.getJSON("/branches", function(data, status, xhr) {
        $("#tags").autocomplete({source: data});
    })
    $(".toggle-expand-btn").click(function(e) {
        $(this).closest('.content .box').toggleClass('panel-fullscreen');
    });
    $(".data-story").click(function(e) {
        $.get("resources/MVO.story", function(data, status, xhr) {
            editor.session.setValue(data)
        })
    });

    $(".toggle-properties-btn").click(function(e) {
        EconomicEditorView.properties = !EconomicEditorView.properties;
        setValue(fflModel)
        scrollTop()
    });

    $(".data-toggle-ide").click(function(e) {
        editor.setValue(fflModel);
        scrollTop()
    });
    $(".toggle-debug-btn").click(function(e) {

        var iRowPosition = editor.selection.getCursor().row;
        var wholelinetxt = editor.session.getLine(iRowPosition);

        var customPosition = {
            row: iRowPosition,
            column: 500
        };

        var text = '\t\t\t//*' + LME.nodes[wholelinetxt.replace(/variable (\w)/, '$1').trim()].value + "*//";
        editor.session.insert(customPosition, text);
    });

    function handleModelChange() {
        Pace.track(function() {
            var modelName = $("#models").val();
            var xhr = new XMLHttpRequest();
            xhr.addEventListener('progress', function(e) {
                editor.setValue('Loading data: ' + e.loaded + ' of ' + (e.total || 'unknown') + ' bytes...');
            });
            xhr.addEventListener('load', function(e) {
                fflModel = this.responseText;
                setValue(fflModel)

                scrollTop();
            });
            xhr.open('GET', 'resources/' + modelName + '.ffl');
            return xhr.send();
        });
    }

    $.getJSON("/models", function(data, status, xhr) {
        $("#models").autocomplete({
            source: data,
            change: handleModelChange
        });
    })
    handleModelChange(windowModelName)
    editor = ace.edit("editor");
    var langTools = ace.require("ace/ext/language_tools");
    editor.session.setMode("ace/mode/ffl");
    editor.setTheme("ace/theme/tomorrow");
    editor.resize(true)
    editor.setBehavioursEnabled(true);
    // enable autocompletion and snippets
    editor.setOptions({
        enableBasicAutocompletion: true,
        /*   enableSnippets: true,*/
        enableLiveAutocompletion: true,
        showFoldWidgets: true,
        maxLines: 40,

    });
    editor.$blockScrolling = Infinity

    $(window).bind('keydown', function(evt) {
        if (evt.ctrlKey || evt.metaKey) {
            switch (String.fromCharCode(evt.which).toLowerCase()) {
                case 's':
                    evt.preventDefault();
                    savFflModel()
                    break;
                case 'p':
                    evt.preventDefault();
                    previewModel()
                    break;
            }
        } else {
            switch (evt.keyCode) {
                case 117://F6
                    evt.preventDefault();
                    $('#models').select()
                    $('#models').focus()
                    break;
            }
        }
    });
});