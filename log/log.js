const tracer = require('tracer');
const format = "HH.MM.ssl";
const logLevel = process.env.ENV || 'info';
const levels = {
    debug: {
        DEBUG: true,
        TRACE: false,
        INFO : true
    },
    info : {
        DEBUG: false,
        TRACE: false,
        INFO : true
    },
    error: {
        DEBUG: false,
        TRACE: false,
        INFO : false,
        WARN : false
    },
    trace: {
        DEBUG: true,
        TRACE: true,
        INFO : true
    }
}
const console = tracer.colorConsole({
    format    : "{{timestamp}} ({{file}}:{{line}}) \t- {{message}}",
    dateformat: format,
    level     : logLevel
});
console.DEBUG = levels[logLevel].DEBUG;
console.INFO = levels[logLevel].INFO;
console.TRACE = levels[logLevel].TRACE;
module.exports = console;
exports = console;