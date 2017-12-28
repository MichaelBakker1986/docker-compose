var tracer = require('tracer');
var format = "HH.MM.ssl";
var logLevel = process.env.ENV || 'info';
var levels = {
    debug: {
        DEBUG: true,
        TRACE: false,
        INFO: true
    },
    info: {
        DEBUG: false,
        TRACE: false,
        INFO: true
    },
    error: {
        DEBUG: false,
        TRACE: false,
        INFO: false,
        WARN: false
    },
    trace: {
        DEBUG: true,
        TRACE: true,
        INFO: true
    }
}
var console = tracer.colorConsole({
    format: "{{timestamp}} ({{file}}:{{line}}) \t- {{message}}",
    dateformat: format,
    level: logLevel
});
console.DEBUG = levels[logLevel].DEBUG;
console.INFO = levels[logLevel].INFO;
console.TRACE = levels[logLevel].TRACE;
module.exports = console;
exports = console;