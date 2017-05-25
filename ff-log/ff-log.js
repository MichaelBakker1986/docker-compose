var tracer = require('tracer');
var format = "HH.MM.ssl";
var logLevel = process.loglevel || 'debug';
var levels = {
    debug: {
        DEBUG: true,
        TRACE: true,
        INFO: false
    },
    info: {
        DEBUG: false,
        TRACE: false,
        INFO: true
    },
    trace: {
        DEBUG: true,
        TRACE: true,
        INFO: true
    }
}
var console = tracer.console({
    format: "{{timestamp}} ({{file}}:{{line}}) \t- {{message}}",
    dateformat: format,
    level: logLevel
});
console.DEBUG = levels[logLevel].DEBUG;
console.INFO = levels[logLevel].INFO;
console.TRACE = levels[logLevel].TRACE;
module.exports = console;
exports = console;