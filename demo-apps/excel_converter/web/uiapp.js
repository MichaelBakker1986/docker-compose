import { editors } from './ace_coder'
import ls          from 'local-storage'
import log         from 'log6'

class ExcelSession {
    constructor(opts) {
        this.data = "";
        for (var key in opts) if (!this[key]) this[key] = opts[key]
    }

    toString() {
        return this;
    }
}

const session = new ExcelSession(ls("session"))
for (var key in localStorage) {
    session[key] = localStorage[key]
}
log.info(session.toString())
log.info(editors.toString())
global.session = session
exports = session