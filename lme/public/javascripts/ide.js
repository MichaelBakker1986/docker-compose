function aceEdit() {

    $.getJSON("/stash/projects/FF/repos/finanfinancials/branches?limit=1000", function(data, status, xhr) {
        var all = []
        for (var key in data.values) {
            all.push(data.values[key].id)
        }
        $("#tags").autocomplete({
            source: all
        });
    })
    $.getJSON("/stash2/projects/FF/repos/finanfinancials/branches?limit=1000", function(data, status, xhr) {
        $("#models").autocomplete({
            source: data
        });
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
        enableLiveAutocompletion: false
    });
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

    var modelName = window.location.search.split('model=')[1] || 'KSP';
    xhr.open('GET', '/json/' + modelName + '.ffl');
    xhr.send();
    $('#save-model').click(function() {
        $.post("/DEMO/saveFFL_LME", {
            model: 'KSP',
            data: editor.getSession().getValue()
        }, function(data) {
            console.info('send complete');
        });
    })
}

if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', aceEdit);
} else {
    setTimeout(function() {
        'use strict';
        aceEdit();
    }, 500);
}
