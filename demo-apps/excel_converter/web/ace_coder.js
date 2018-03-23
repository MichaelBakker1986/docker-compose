import ace from 'brace';
import 'brace/theme/tomorrow'
import "brace/ext/language_tools"

class IDE {
    constructor() {
        this.editors = []
    }

    addEditor(editor) {
        this.editors.push(editor)
    }

    setMaxLines(lines) {
        this.editors.forEach(e => {
            e.setOption("maxLines", Math.max(lines, 1))
            e.setOption("minLines", Math.max(lines, 1) - 1)
            e.resize();
        })
    }

    setFFL(ffl) {
        this.editors[0].getSession().setValue(ffl);
    }

    setAudit(audit) {
        this.editors[1].getSession().setValue(audit);
    }

    setRaw(raw) {
        this.editors[2].getSession().setValue(raw);
    }
}

const editor = ace.edit('left_editor');
const editors = new IDE()
initEditor(editor)
const right_editor = ace.edit('right_top_editor');
const right_bottom_editor = ace.edit('right_bottom_editor');
right_editor.setOption("readOnly", true)
initEditor(right_editor)
initEditor(right_bottom_editor)

function initEditor(editor) {
    editor.$blockScrolling = Infinity
    editor.setTheme("ace/theme/tomorrow");
    editor.setBehavioursEnabled(true);
    editor.setOptions({
        showFoldWidgets: true,
        minLines       : 10
    });
    editor.getSession().setValue('..')
    editor.resize(true)
    editors.addEditor(editor)
}

function uploadFile(file) {
    Pace.track(function() {
        var url = 'upload';
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        xhr.open("POST", url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const result = JSON.parse(xhr.responseText)
                editors.setFFL(result.ffl)
                editors.setAudit(result.audit.join('\n'))
                editors.setRaw(result.register.join('\n'))
                Pace.stop()
            }
        };
        fd.append("presentation", file);
        return xhr.send(fd);
    })
}

const uploadfiles = document.querySelector('#uploadfiles');
uploadfiles.addEventListener('change', function() {
    var files = this.files;
    for (var i = 0; i < files.length; i++) {
        uploadFile(this.files[i]); // call the function to upload the file
    }
}, false);

$(document).ready(function() {

    var heightUpdateFunction = function() {
        const editor_height = $('#editor-section').height();
        const lines = (editor_height - editor.renderer.scrollBar.getWidth()) / parseFloat(editor.renderer.lineHeight);
        editors.setMaxLines(Math.max(lines, 1))
    };

    editor.getSession().on('change', resize);

    $(window).resize(resize);
    let resizeTO;

    function resize() {
        heightUpdateFunction();
        if (resizeTO) clearTimeout(resizeTO);
        resizeTO = setTimeout(heightUpdateFunction, 450);
    }

    resize()
})
global.IDE = editors
exports.IDE = global.IDE
export { editors }
