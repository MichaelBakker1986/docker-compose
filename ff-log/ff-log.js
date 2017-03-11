var tracer = require('tracer');
var format = "HH.MM.ssl";
var console = tracer.console({
    format: "{{timestamp}} ({{file}}:{{line}}) \t- {{message}}",
    dateformat: format
});
module.exports = console;
exports = console;