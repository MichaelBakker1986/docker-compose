import ace           from 'brace';
import 'brace/theme/clouds_midnight'
import "es6-string-polyfills"
import "brace/ext/language_tools"
import "brace/ext/searchbox"
import ls            from 'local-storage'
import { Register }  from "ffl-pack/Register"
import { Formatter } from "ffl-pack/FFLFormatter"
import 'source-map-support/register'

const user_session = {
    'fflModelPath': 'SCORECARDTESTMODEL',
    'author'      : 'michael.bakker'
}
for (var key in user_session) {
    Object.defineProperty(user_session, key, function() {
        const akey = key;
        ls.set(key, ls.get(akey) || user_session[akey])
        return {
            get: () => ls.get(akey),
            set: (v) => ls.set(akey, v)
        }
    }());
}

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

        const self = this;

        function change_handle() {

            const header = "model VASTGOED uses BaseModel\n{\nroot\n{\n" + self.editors[0].getSession().getValue() + "\n}\n}"
            const register = new Register();

            const formatter = new Formatter(register, header);
            try {
                self.setAudit('Parsing ' + header.length + " characters")
                /*formatter.extractHeader();
                formatter.extractConstants();
                formatter.extractComments();
                formatter.removeWhite();
                formatter.extractVars();*/
                formatter.walk(function(name, b) {
                    self.appendAudit(name + " " + b)
                })
                formatter.parseProperties()
                self.appendAudit(Object.keys(register.getNames('name')).join('\n'))
                // formatter.prettyFormatFFL()
            } catch (err) {
                self.appendAudit(err.toString())
                self.editors[1].session.setAnnotations([{
                    row   : 0,
                    column: 0,
                    text  : err.toString(), // Or the Json reply from the parser
                    type  : 'error' // also warning and information
                }])

            }
        }

        const silent_ace_commands = new Set();
        ['selectwordleft', 'gotolineend'/*END*/, 'gotolinestart'/*HOME*/, 'gotopagedown', 'gotopageup', 'Esc', 'Down',
            'overwrite'/*INSERT*/, 'gotowordright', 'gotowordleft', 'copy', 'selectright', 'selectleft',
            'replace', 'find', 'addCursorAbove', 'selectup', 'selectdown', 'scrollup', 'scrolldown', 'golinedown', 'golineup',
            'selectwordright', 'gotoleft', 'singleSelection', 'selectMoreAfter', 'selectMoreBefore', 'golineup', 'gotoright'
        ].forEach((el) => silent_ace_commands.add(el))
        const changing_ace_commands = new Set();
        ['movelinesdown', 'backspace', 'undo', 'insertstring', 'removeline'].forEach((el) => changing_ace_commands.add(el))
        const fflEditor = this.editors[0]
        fflEditor.commands.on("afterExec", function(e) {
            if (!silent_ace_commands.has(e.command.name)) {
                //rather white-list actions.
                if (!changing_ace_commands.has(e.command.name)) console.info(e.command)
                //check if the line being changed is valid.
                change_handle()
                var annotations = [];
                const lines_size = fflEditor.session.getValue().split('\n').length
                for (var i = 0; i < lines_size; i++) {
                    annotations.push({
                        row   : i,
                        column: 0,
                        text  : 'Test', // Or the Json reply from the parser
                        type  : 'info' // also warning and information
                    })
                }
                fflEditor.session.setAnnotations(annotations)
            } else {

            }
        });
    }

    save() {
        ls.set('ffl', this.editors[0].getSession().getValue())
        ls.set('audit', this.editors[1].getSession().getValue())
    }

    appendAudit(audit) {
        const session = this.editors[1].getSession()
        session.insert({
            row   : session.getLength(),
            column: 0
        }, "\n" + audit)
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

    execCommand(command) {
        this.editors[0].execCommand(command)
    }
}

const editor = ace.edit('left_editor');
const right_editor = ace.edit('right_top_editor');
const editors = new IDE()
initEditor(editor)
initEditor(right_editor)
editors.load()

window.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.shiftKey) return;
    if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
        e.preventDefault();
        editors.execCommand("find")
    }
    else if ((e.ctrlKey && e.keyCode === 82)) {
        e.preventDefault();
        editors.execCommand("replace")
    }
})

function initEditor(editor) {
    editor.$blockScrolling = Infinity
    editor.setTheme("ace/theme/clouds_midnight");
    editor.setBehavioursEnabled(true);
    editor.setOptions({
        showFoldWidgets: true,
        minLines       : 10
    });
    editor.getSession().setValue('..')
    editor.resize(true)
    editors.addEditor(editor)
}

/*$(document).ready(function() {

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
})*/

global.IDE = editors
exports.IDE = global.IDE