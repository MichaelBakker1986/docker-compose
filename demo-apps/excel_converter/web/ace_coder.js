import ace           from 'brace';
import log           from 'log6'
import "es6-string-polyfills"
import 'brace/theme/tomorrow'
import "brace/ext/language_tools"
import "brace/ext/searchbox"
import ls            from 'local-storage'
import { Register }  from "ffl-pack/Register"
import { Formatter } from "ffl-pack/FFLFormatter"
import localstore    from "lme-local-storage"

const user_session = {
    'fflModelPath': 'SCORECARDTESTMODEL',
    'author'      : 'michael.bakker'
}
localstore(user_session)

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

    load() {
        this.editors[0].getSession().setValue(ls.get('ffl') || '')
        this.editors[1].getSession().setValue(ls.get('audit') || '')
        this.editors[2].getSession().setValue(ls.get('raw') || '')
    }

    save() {
        ls.set('ffl', this.editors[0].getSession().getValue())
        ls.set('audit', this.editors[1].getSession().getValue())
        ls.set('raw', this.editors[2].getSession().getValue())
    }

    setFFL(ffl) {
        this.editors[0].getSession().setValue(ffl);
        this.save();
    }

    setAudit(audit) {
        this.editors[1].getSession().setValue(audit);
        this.save();
    }

    setRaw(raw) {

        this.editors[2].getSession().setValue(raw);
        this.save();
    }
}

const register = new Register();
global.register = register
$.get('VASTGOED.ffl').then((data) => {

    const formatter = new Formatter(register, data);
    formatter.parseProperties()

    //differ.getEditors().right.getSession().setValue(register.getAll('name').join('\n'))
})

const editor = ace.edit('left_editor');
const editors = new IDE()

initEditor(editor)
const right_editor = ace.edit('right_top_editor');
const right_bottom_editor = ace.edit('right_bottom_editor');
right_editor.setOption("readOnly", true)
initEditor(right_editor)
initEditor(right_bottom_editor)
editors.load()

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
                const names = register.getAll('name')
                const errors = result.register.filter(el => names.indexOf(el) !== -1).map(el => el + ' not found in VASTGOED.ffl')
                editors.setRaw('Names found in ffl file: \n' + names.join('\n') + '\nNames not found in ffl file: \n' + errors.join('\n'))
                Pace.stop()
            }
        };
        fd.append("presentation", file);
        return xhr.send(fd);
    })
}

window.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.shiftKey) return;
    if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
        e.preventDefault();
        editor.execCommand("find")
    }
    else if ((e.ctrlKey && e.keyCode === 82)) {
        e.preventDefault();
        editor.execCommand("replace")
    }
})
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

log.info(editors.toString())
global.session = user_session
export { editors, ls }
