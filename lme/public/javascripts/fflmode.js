define('ace/mode/ffl', function(require, exports, module) {

    var oop = require("ace/lib/oop");
    var TextMode = require("ace/mode/text").Mode;
    var ExampleHighlightRules = require("ace/mode/ffl_highlight_rules").ExampleHighlightRules;

    var Mode = function() {
        this.HighlightRules = ExampleHighlightRules;
    };
    oop.inherits(Mode, TextMode);

    (function() {
        // Extra logic goes here. (see below)
    }).call(Mode.prototype);

    exports.Mode = Mode;
});

define('ace/mode/ffl_highlight_rules', function(require, exports, module) {

        var oop = require("ace/lib/oop");
        var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;
        var DocCommentHighlightRules = function() {

            DocCommentHighlightRules.getTagRule = function(start) {
                return {
                    token: "comment.doc.tag.storage.type",
                    regex: "\\b(?:TODO|FIXME|XXX|HACK)\\b"
                };
            };
            DocCommentHighlightRules.getStartRule = function(start) {
                return {
                    token: "comment.doc", // doc comment
                    regex: "\\/\\*(?=\\*)",
                    next: start
                };
            };
            DocCommentHighlightRules.getEndRule = function(start) {
                return {
                    token: "comment.doc", // closing comment
                    regex: "\\*\\/",
                    next: start
                };
            };
        }
        oop.inherits(DocCommentHighlightRules, TextHighlightRules);
        var ExampleHighlightRules = function() {
            var keywordMapper = this.createKeywordMapper({
                "variable.language": "SumFor|MinMax|Now|Round|DateToDay|Val|OnNA|SubStr|TupleMax|String|ForAll|TupleSum|If|Pos|Length|EvaluateAsString|Str|MatrixLookup|OnER|Min|ValueT|Count|SelectDescendants|TSUM|DataAvailable|InputRequired|Max|Case",
                "keyword": "Implies|variable|tuple|formula|and|or|formula_notrend|formula_trend",
                "comment": "#",
                "storage.type": "&",
                "support.function": "+",
                "constant.language": "NA|T|X|0|1|2|3|4|5|6|7|8|9|."
            }, "text", true);

            this.$rules = {
                "start": [
                    {
                        regex: "\\w+\\b",
                        token: keywordMapper
                    }, {
                        token: "comment.doc.tag.storage.type",
                        regex: "\\b(?:TODO|FIXME|XXX|HACK)\\b"
                    },
                    {
                        defaultToken: "comment.doc",
                        caseInsensitive: true
                    }
                ]
            };

            this.addRules(new DocCommentHighlightRules().getRules(), "comment-");
            this.addRules(new TextHighlightRules().getRules(), "defaultrules-");
            this.normalizeRules()
        }

        oop.inherits(ExampleHighlightRules, TextHighlightRules);

        exports.ExampleHighlightRules = ExampleHighlightRules;
    }
);



