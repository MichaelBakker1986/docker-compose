/*
 register/resolve echange modules e.g. ffl,screendefinition,presentation
 TODO: rename into exchangeModulesSerivce
 */
var parsers = {};
function ParserService() {
}
ParserService.prototype.addParser = function (parser) {
    parsers[parser.name] = parser;
}
/*Class Parser
 {
 name: String,
 headerName: String,
 parse: Function(Context) : Solution
 deParse: Function() : Export
 }
 */
ParserService.prototype.getParsers = function () {
    var result = [];
    for (var key in parsers) {
        result.push(parsers[key]);
    }
    return result;
}
ParserService.prototype.findParser = function (parserName) {
    return parsers[parserName];
}
module.exports = ParserService.prototype;