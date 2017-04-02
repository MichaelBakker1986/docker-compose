var parsers = {};
function ParserService() {
}
ParserService.prototype.addParser = function (parser) {
    parsers[parser.name] = parser;
}
//looks a lot like JSWorkBook.doImport, only does not support the ABN way
//this method only recieves GenericModels so we dont have to check Type
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