import AceDiff       from 'ace-diff';
import ls            from 'local-storage'
import log           from 'log6'
import { Register }  from "ffl-pack/Register"
import { Formatter } from "ffl-pack/FFLFormatter"

var differ = new AceDiff({
    element: '.acediff',
    left   : {
        content: 'your first file content here',
    },
    right  : {
        content: 'your second file content here',
    },
});
global.differ = differ;
const fflfile = $.get('VASTGOED.ffl').then((data) => {
    const register = new Register();
    const formatter = new Formatter(register, data);
    formatter.parseProperties()
    differ.getEditors().right.getSession().setValue(register.getAll('name').join('\n'))
})

// optionally, include CSS, or use your own

class ExcelSession {
    constructor(opts) {
        this.data = "";
        for (var key in opts) if (!this[key]) this[key] = opts[key]
    }

    toString() {
        return this;
    }
}

//$.get('http://blfif-cv-lme01.finance.lab/resources/VASTGOED.ffl')

const session = new ExcelSession(ls("session"))
for (var key in localStorage) {
    session[key] = localStorage[key]
}
log.info(session.toString())
//log.info(editors.toString())
global.session = session
exports = session