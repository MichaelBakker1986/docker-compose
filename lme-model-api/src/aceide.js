/**
 * editor variable is set to the window.
 */
var ConvertEvaluateAsString = require('../../model-tests/plugins/ConvertEvaluateAsString').ConvertEvaluateAsString
var AmpersandConverter = require('../../model-tests/plugins/AmpersandConverter').AmpersandConverter
var ScorecardQ_caseFix = require('../../model-tests/plugins/ScorecardQ_caseFix').ScorecardQCaseFix
var V05CaseFix = require('../../model-tests/plugins/V05CaseFix').V05CaseFix
var EconomicEditorView = require('../../model-tests/EconomicEditorView').EconomicEditorView
var StoryParser = require('../../model-tests/StoryParser').StoryParser
var fflModel = '';
var params = window.location.href.split('#')
if (params.length == 1) window.location.href = '#MVO&DEMO'
var params = window.location.href.split('#')[1].split('&')
let windowModelName = params[0] || 'MVO';
let userID = params[1] || 'DEMO'
var saveToken = userID;


angular.module('lmeapp').controller('ideController', function($scope, $http) {
    LMEMETA.loadData(function() {
    });
    $scope.saveData = function() {
        LMEMETA.persistData(function(response) {
        })
    }
    $scope.session = {
        user: {
            name: userID
        },
        messages: {
            data: []
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
});
//LME-Model stuff
$(document).ready(function() {


    $("#models").val(windowModelName)

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
    $(".toggle-info-btn").click(function(e) {
        EconomicEditorView.on = !EconomicEditorView.on;

        editor.setOption("maxLines", EconomicEditorView.on ? Infinity : 58);

        setValue(fflModel)
        scrollTop()
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

    Range = ace.require("ace/range").Range;
    var allLines = [];

    var startFold = 1;
    var lastFold = 1;

    function scrollTop() {
        editor.scrollToLine(1, true, true, function() {
        });
        editor.gotoLine(1, 1, true);
        editor.selection.moveTo(0, 0)
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

    function gotoPreview() {
        window.open('http://' + window.location.hostname + ':8083/id/' + userID + '/grid_bootstrap.html#' + $("#models").val() + '&' + userID)
    }

    function previewModel() {
        Pace.track(function() {
            $.post("preview", {
                model: $("#models").val(),
                data: editor.getSession().getValue()
            }, function(data) {
                window.open('http://' + window.location.hostname + ':8083/id/' + userID + '/grid_bootstrap.html#' + data.link + '&' + userID);
            });
        });
    }

    $(".toggle-temp_preview-btn").click(function(e) {
        Pace.track(function() {
            previewModel();
        });
    });

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

    $(window).bind('keydown', function(event) {
        if (event.ctrlKey || event.metaKey) {
            switch (String.fromCharCode(event.which).toLowerCase()) {
                case 's':
                    event.preventDefault();
                    savFflModel()
                    break;
            }
        }
    });
    $('#preview-model').click(gotoPreview);
    $('#save-model').click(savFflModel);
    $('#preview-model').hide()
});