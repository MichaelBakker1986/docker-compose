function aceEdit() {

    $.getJSON("/branches", function(data, status, xhr) {
        $("#tags").autocomplete({
            source: data
        });
    })
    var windowModelName = window.location.search.split('model=')[1] || 'KSP';

    function handleModelChange() {
        var modelName = $("#models").val();
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('progress', function(e) {
            editor.setValue('Loading data: ' + e.loaded + ' of ' + (e.total || 'unknown') + ' bytes...');
        });
        xhr.addEventListener('load', function(e) {
            editor.setValue(this.responseText);
            editor.scrollToLine(1, true, true, function() {
            });
            editor.gotoLine(1, 1, true);
        });


        xhr.open('GET', '/json/' + modelName + '.ffl');
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
    var editor = ace.edit("editor");
    var langTools = ace.require("ace/ext/language_tools");
    editor.session.setMode("ace/mode/ffl");
    editor.setTheme("ace/theme/tomorrow");
    editor.resize(true)
// enable autocompletion and snippets
    editor.setOptions({
        enableBasicAutocompletion: true,
        /*   enableSnippets: true,*/
        enableLiveAutocompletion: true,
        maxLines: 40
    });

    function gotoPreview() {
        window.location = 'http://' + window.location.hostname + ':8083/#model=' + $("#models").val()
    }

    function saveDocument() {
        $.post("/DEMO/saveFFL_LME", {
            model: $("#models").val(),
            data: editor.getSession().getValue()
        }, function(data) {
            alert('Model [' + windowModelName + '] is updated');
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
}

if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', aceEdit);
} else {
    setTimeout(function() {
        'use strict';
        aceEdit();
    }, 500);
}
