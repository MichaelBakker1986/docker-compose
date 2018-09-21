"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 register/resolve exchange modules e.g. ffl,screen_definition,presentation
 */
/*Class Parser
 {
 name: String,
 headerName: String,
 parse: Function(Context) : Solution
 deParse: Function() : Export
 }
 */
var parsers = {};

var ParserService = function () {
  function ParserService() {
    (0, _classCallCheck3.default)(this, ParserService);
  }

  (0, _createClass3.default)(ParserService, [{
    key: "addParser",
    value: function addParser(parser) {
      parsers[parser.name] = parser;
    }
  }, {
    key: "visitParsers",
    value: function visitParsers(visitFunction) {
      Object.keys(parsers).forEach(function (parser) {
        return visitFunction(parser);
      });
    }
  }, {
    key: "findParser",
    value: function findParser(parserName) {
      return parsers[parserName];
    }
  }]);
  return ParserService;
}();

exports.default = new ParserService();