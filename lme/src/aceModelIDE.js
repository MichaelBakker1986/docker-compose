/**
 * editor variable is set to the window.
 */
$(document).ready(function() {
    var ConvertEvaluateAsString = require('../../lme-model-tests/plugins/ConvertEvaluateAsString').ConvertEvaluateAsString
    var AmpersandConverter = require('../../lme-model-tests/plugins/AmpersandConverter').AmpersandConverter
    var ScorecardQ_caseFix = require('../../lme-model-tests/plugins/ScorecardQ_caseFix').ScorecardQCaseFix
    var V05CaseFix = require('../../lme-model-tests/plugins/V05CaseFix').V05CaseFix
    $.getJSON("/branches", function(data, status, xhr) {
        $("#tags").autocomplete({source: data});
    })
    $(".toggle-expand-btn").click(function(e) {
        $(this).closest('.content .box').toggleClass('panel-fullscreen');
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
    var windowModelName = window.location.href.split('#model=')[1] || 'KSP';
    var Range = ace.require("ace/range").Range;
    var allLines = [];
    var fflModel;
    var startFold = 1;
    var lastFold = 1;

    function addFolds(idx) {
        if (allLines.length > idx) {
            var line = allLines[idx];
            if (line.match(/^\s*formula/)) {
                if (startFold + 1 < idx && lastFold + 1 < startFold) {
                    editor.session.addFold("", new Range(lastFold + 1, 0, startFold, 0))
                    editor.session.addFold("", new Range(startFold + 1, 0, idx, 0))
                }
                lastFold = idx
            } else if (line.match(/^\s*(variable|tuple)/)) {
                startFold = idx
            }

            setTimeout(function() {
                addFolds(idx + 1)
            }, 0)
        } else {
            editor.session.addFold("", new Range(startFold, 0, allLines.length, 0))
        }
    }

    function handleModelChange() {
        var modelName = $("#models").val();
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('progress', function(e) {
            editor.setValue('Loading data: ' + e.loaded + ' of ' + (e.total || 'unknown') + ' bytes...');
        });
        xhr.addEventListener('load', function(e) {
            fflModel = this.responseText;
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
            editor.setValue(fflModel);
            allLines = fflModel.split('\n');
            /* editor.session.removeFolds(0, true)
             setTimeout(function() {
                 addFolds(0)
             }, 1)*/

            editor.scrollToLine(1, true, true, function() {
            });
            editor.gotoLine(1, 1, true);

        });
        xhr.open('GET', '/resources/' + modelName + '.ffl');
        xhr.send();
    }

    $.getJSON("/models", function(data, status, xhr) {
        $("#models").autocomplete({
            source: data,
            change: handleModelChange
        });
        $("#models").val(windowModelName)
        handleModelChange(windowModelName)
    })
    editor = ace.edit("editor");
    var langTools = ace.require("ace/ext/language_tools");
    editor.session.setMode("ace/mode/ffl");
    editor.setTheme("ace/theme/tomorrow");
    editor.resize(true)
    // enable autocompletion and snippets
    editor.setOptions({
        enableBasicAutocompletion: true,
        /*   enableSnippets: true,*/
        enableLiveAutocompletion: true,
        maxLines: 44
    });

    function gotoPreview() {
        window.location = 'http://' + window.location.hostname + ':8083/#model=' + $("#models").val()
    }

    function saveDocument() {
        $.post("/DEMO/saveFFL_LME", {
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