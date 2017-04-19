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
ParserService.prototype.visitParsers = function (visitFunction) {
    for (var key in parsers) {
        visitFunction(parsers[key]);
    }
}
ParserService.prototype.findParser = function (parserName) {
    return parsers[parserName];
V}
module.exports = ParserService.prototype;