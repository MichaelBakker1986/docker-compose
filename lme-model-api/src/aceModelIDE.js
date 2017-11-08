/**
 * editor variable is set to the window.
 */

angular.module('lmeapp').controller('ideController', function($scope, $http) {
    LMEMETA.loadData();
    $scope.saveData = function() {
        LMEMETA.persistData()
    }
});
//LME-Model stuff
$(document).ready(function() {
    var ConvertEvaluateAsString = require('../../model-tests/plugins/ConvertEvaluateAsString').ConvertEvaluateAsString
    var AmpersandConverter = require('../../model-tests/plugins/AmpersandConverter').AmpersandConverter
    var ScorecardQ_caseFix = require('../../model-tests/plugins/ScorecardQ_caseFix').ScorecardQCaseFix
    var V05CaseFix = require('../../model-tests/plugins/V05CaseFix').V05CaseFix
    var MVOeditorShow = require('../../model-tests/MVO/MVOeditorShow').MVOeditorShow
    var fflModel;

    var params = window.location.href.split('#')
    if (params.length == 1) window.location.href = '#MVO&DEMO'
    var params = window.location.href.split('#')[1].split('&')
    let windowModelName = params[0] || 'MVO';
    let userID = params[1] || 'DEMO'
    var saveToken = userID;

    $("#models").val(windowModelName)

    $.getJSON("/branches", function(data, status, xhr) {
        $("#tags").autocomplete({source: data});
    })
    $(".toggle-expand-btn").click(function(e) {
        $(this).closest('.content .box').toggleClass('panel-fullscreen');
    });
    $(".toggle-info-btn").click(function(e) {
        MVOeditorShow.on = !MVOeditorShow.on;

        editor.setOption("maxLines", MVOeditorShow.on ? Infinity : 58);

        setValue(fflModel)
        scrollTop()
    });
    $(".toggle-properties-btn").click(function(e) {
        MVOeditorShow.properties = !MVOeditorShow.properties;
        setValue(fflModel)
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
        if (MVOeditorShow.on) {
            fflModel = MVOeditorShow.parse(fflModel);
        }
        editor.setValue(fflModel);
    }

    function handleModelChange() {
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
        xhr.send();
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
        maxLines: 67
    });


    function gotoPreview() {
        window.location = 'http://' + window.location.hostname + ':8083/id/' + userID + '/grid_example.html#' + $("#models").val() + '&' + userID
    }

    function previewModel() {
        $.post("preview", {
            model: $("#models").val(),
            data: editor.getSession().getValue()
        }, function(data) {
            var url = 'http://' + window.location.hostname + ':8083/id/' + userID + '/grid_example.html#' + data.link + '&' + userID;
            window.open(url);
        });
    }

    $(".toggle-temp_preview-btn").click(function(e) {

        previewModel();
    });

    function saveDocument() {
        $.post("saveFFL_LME", {
            model: $("#models").val(),
            data: editor.getSession().getValue()
        }, function(data) {
            alert('Model [' + $("#models").val() + '] is updated');
            $('#preview-model').show()
        });
    }

    $(window).bind('keydown', function(event) {
        if (event.ctrlKey || event.metaKey) {
            switch (String.fromCharCode(event.which).toLowerCase()) {
                case 's':
                    event.preventDefault();
                    saveDocument()
                    break;
            }
        }
    });
    $('#preview-model').click(gotoPreview);
    $('#save-model').click(saveDocument);
    $('#preview-model').hide()
});