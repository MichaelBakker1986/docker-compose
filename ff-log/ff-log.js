var tracer = require('tracer');
var console = tracer.console({
    format: "{{timestamp}} ({{file}}:{{line}}) \t- {{message}}",
    dateformat: "HHMM.ssl"
});
module.exports = console;
exports = console;