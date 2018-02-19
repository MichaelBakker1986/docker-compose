define('ace/mode/ffl', function(require, exports, module) {

    var oop = require("ace/lib/oop");
    var TextMode = require("ace/mode/text").Mode;
    var ExampleHighlightRules = require("ace/mode/ffl_highlight_rules").ExampleHighlightRules;
    var CStyleFoldMode = require("ace/mode/folding/cstyle").FoldMode;
    var Mode = function() {
        this.HighlightRules = ExampleHighlightRules;
        this.keywordMapper = ExampleHighlightRules.keywordMapper;
        this.foldingRules = new CStyleFoldMode();
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
                    next : start
                };
            };
            DocCommentHighlightRules.getEndRule = function(start) {
                return {
                    token: "comment.doc", // closing comment
                    regex: "\\*\\/",
                    next : start
                };
            };
        }
        oop.inherits(DocCommentHighlightRules, TextHighlightRules);
        var ExampleHighlightRules = function() {
            var keywordMapper = this.createKeywordMapper({
                "variable.language": "unscalable|scorecard|model|matrix|boolean|radio|root|uses|refers|to|date|On|Off|fileupload|document|column|flow|balance|select|number|invisible|currency|AMMOUNT|memo|SumFor|MinMax|Now|Round|HSUM|DateToDay|Val|OnNA|SubStr|TupleMax|String|ForAll|TupleSum|If|Pos|Length|EvaluateAsString|Str|MatrixLookup|OnER|Min|ValueT|Count|SelectDescendants|TSUM|DataAvailable|InputRequired|Max|Case",
                "keyword"          : "Implies|top_separator|options_trend|BaseModel|options_notrend|link|bottom_separator|required|display_options|fixed_decimals|aggregation|variable|tuple|formula|formula_notrend|formula_trend|datatype|choices|locked|visible|title|data_options|pattern|range|frequency|datatype|displaytype|options|options_title|top_blanklines|ffl_version|version|valid|hint",
                "comment"          : "#|Memo1",
                "storage.type"     : "&",
                "support.function" : "+|-|=|none|and|or|entered|visible",
                "constant.language": "NA|TupleIndex|T|X|0|1|2|3|4|5|6|7|8|9|."
            }, "text", true);
            this.keywordMapper = keywordMapper;
            this.keywordRule = {
                regex  : "\\w+",
                onMatch: function() {
                    return "text"
                }
            }
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
                        defaultToken   : "comment.doc",
                        caseInsensitive: true
                    }, {
                        token: "string",
                        start: '"',
                        end  : '"',
                        next : [{ token: "language.escape", regex: /\\[tn"\\]/ }]
                    },
                    this.keywordRule
                ]
            };
            this.setKeywords = function(kwMap) {
                this.keywordRule.onMatch = this.createKeywordMapper(kwMap, "identifier")
            }

            this.addRules(new DocCommentHighlightRules().getRules(), "comment-");
            this.addRules(new TextHighlightRules().getRules(), "defaultrules-");
            this.normalizeRules()
        }

        oop.inherits(ExampleHighlightRules, TextHighlightRules);

        exports.ExampleHighlightRules = ExampleHighlightRules;
    }
);

/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

define("ace/mode/folding/cstyle", function(require, exports, module) {
    "use strict";

    var oop = require("../../lib/oop");
    var Range = require("../../range").Range;
    var BaseFoldMode = require("./fold_mode").FoldMode;

    var FoldMode = exports.FoldMode = function(commentRegex) {
        if (commentRegex) {
            this.foldingStartMarker = new RegExp(
                this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
            );
            this.foldingStopMarker = new RegExp(
                this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
            );
        }
    };
    oop.inherits(FoldMode, BaseFoldMode);

    (function() {

        this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;
        this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;
        this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/;
        this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
        this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;

        //prevent naming conflict with any modes that inherit from cstyle and override this (like csharp)
        this._getFoldWidgetBase = this.getFoldWidget;

        /**
         * Gets fold widget with some non-standard extras:
         *
         * @example lineCommentRegionStart
         *      //#region [optional description]
         *
         * @example blockCommentRegionStart
         *      /*#region [optional description] *[/]
         *
         * @example tripleStarFoldingSection
         *      /*** this folds even though 1 line because it has 3 stars ***[/]
         *
         * @note the pound symbol for region tags is optional
         */
        this.getFoldWidget = function(session, foldStyle, row) {
            var line = session.getLine(row);

            if (this.singleLineBlockCommentRe.test(line)) {
                // No widget for single line block comment unless region or triple star
                if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                    return "";
            }

            var fw = this._getFoldWidgetBase(session, foldStyle, row);

            if (!fw && this.startRegionRe.test(line))
                return "start"; // lineCommentRegionStart

            return fw;
        };

        this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
            var line = session.getLine(row);

            if (this.startRegionRe.test(line))
                return this.getCommentRegionBlock(session, line, row);

            var match = line.match(this.foldingStartMarker);
            if (match) {
                var i = match.index;

                if (match[1])
                    return this.openingBracketBlock(session, match[1], row, i);

                var range = session.getCommentFoldRange(row, i + match[0].length, 1);

                if (range && !range.isMultiLine()) {
                    if (forceMultiline) {
                        range = this.getSectionRange(session, row);
                    } else if (foldStyle != "all")
                        range = null;
                }

                return range;
            }

            if (foldStyle === "markbegin")
                return;

            var match = line.match(this.foldingStopMarker);
            if (match) {
                var i = match.index + match[0].length;

                if (match[1])
                    return this.closingBracketBlock(session, match[1], row, i);

                return session.getCommentFoldRange(row, i, -1);
            }
        };

        this.getSectionRange = function(session, row) {
            var line = session.getLine(row);
            var startIndent = line.search(/\S/);
            var startRow = row;
            var startColumn = line.length;
            row = row + 1;
            var endRow = row;
            var maxRow = session.getLength();
            while (++row < maxRow) {
                line = session.getLine(row);
                var indent = line.search(/\S/);
                if (indent === -1)
                    continue;
                if (startIndent > indent)
                    break;
                var subRange = this.getFoldWidgetRange(session, "all", row);

                if (subRange) {
                    if (subRange.start.row <= startRow) {
                        break;
                    } else if (subRange.isMultiLine()) {
                        row = subRange.end.row;
                    } else if (startIndent == indent) {
                        break;
                    }
                }
                endRow = row;
            }

            return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
        };

        /**
         * gets comment region block with end region assumed to be start of comment in any cstyle mode or SQL mode (--) which inherits from this.
         * There may optionally be a pound symbol before the region/endregion statement
         */
        this.getCommentRegionBlock = function(session, line, row) {
            var startColumn = line.search(/\s*$/);
            var maxRow = session.getLength();
            var startRow = row;

            var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
            var depth = 1;
            while (++row < maxRow) {
                line = session.getLine(row);
                var m = re.exec(line);
                if (!m) continue;
                if (m[1]) depth--;
                else depth++;

                if (!depth) break;
            }

            var endRow = row;
            if (endRow > startRow) {
                return new Range(startRow, startColumn, endRow, line.length);
            }
        };

    }).call(FoldMode.prototype);

});

define("hoverlink", [], function(require, exports, module) {
    "use strict";

    var oop = require("ace/lib/oop");
    var event = require("ace/lib/event");
    var Range = require("ace/range").Range;
    var EventEmitter = require("ace/lib/event_emitter").EventEmitter;

    var HoverLink = function(editor, register) {
        if (editor.hoverLink)
            return;
        editor.hoverLink = this;
        this.editor = editor;
        this.register = register;

        this.update = this.update.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onClick = this.onClick.bind(this);
        event.addListener(editor.renderer.scroller, "mousemove", this.onMouseMove);
        event.addListener(editor.renderer.content, "mouseout", this.onMouseOut);
        event.addListener(editor.renderer.content, "click", this.onClick);
    };

    (function() {
        oop.implement(this, EventEmitter);

        this.token = {};
        this.range = new Range();

        this.update = function() {
            this.$timer = null;
            var editor = this.editor;
            var renderer = editor.renderer;

            var canvasPos = renderer.scroller.getBoundingClientRect();
            var offset = (this.x + renderer.scrollLeft - canvasPos.left - renderer.$padding) / renderer.characterWidth;
            var row = Math.floor((this.y + renderer.scrollTop - canvasPos.top) / renderer.lineHeight);
            var col = Math.round(offset);

            var screenPos = { row: row, column: col, side: offset - col > 0 ? 1 : -1 };
            var session = editor.session;
            var docPos = session.screenToDocumentPosition(screenPos.row, screenPos.column);

            var selectionRange = editor.selection.getRange();
            if (!selectionRange.isEmpty()) {
                if (selectionRange.start.row <= row && selectionRange.end.row >= row)
                    return this.clear();
            }

            var line = editor.session.getLine(docPos.row);
            if (docPos.column == line.length) {
                var clippedPos = editor.session.documentToScreenPosition(docPos.row, docPos.column);
                if (clippedPos.column != screenPos.column) {
                    return this.clear();
                }
            }

            var token = this.findLink(docPos.row, docPos.column);
            this.link = token;
            if (!token) {
                return this.clear();
            }
            this.isOpen = true
            editor.renderer.setCursorStyle("pointer");

            session.removeMarker(this.marker);

            this.range = new Range(token.row, token.start, token.row, token.start + token.value.length);
            this.marker = session.addMarker(this.range, "ace_link_marker", "text", true);
        };

        this.clear = function() {
            if (this.isOpen) {
                this.link = null;
                this.editor.session.removeMarker(this.marker);
                this.editor.renderer.setCursorStyle("");
                this.isOpen = false;
            }
        };

        this.getMatchAround = function(regExp, string, col) {
            var match;
            if (!regExp) return match;
            regExp.lastIndex = 0;
            string.replace(regExp, function(str) {
                var offset = arguments[arguments.length - 2];
                var length = str.length;
                if (offset <= col && offset + length >= col)
                    match = {
                        start: offset,
                        value: str
                    };
            });

            return match;
        };

        this.onClick = function() {
            if (this.link) {
                this.link.editor = this.editor;
                this._signal("open", this.link);
                this.clear()
            }
        };

        var wordMapSize = 0;
        var regex;
        this.findLink = function(row, column) {
            var editor = this.editor;
            var session = editor.session;
            var line = session.getLine(row);

            if (wordMapSize !== this.register.i.length) {
                wordMapSize = this.register.i.length
                const variableNames = Object.keys(this.register.getIndex('name'));
                variableNames.sort(function(a, b) {
                    // ASC  -> a.length - b.length
                    // DESC -> b.length - a.length
                    return b.length - a.length;
                });
                regex = new RegExp(variableNames.join("|"), 'gi')
            }
            var match = this.getMatchAround(regex, line, column);
            if (!match) return;
            match.row = row;
            return match;
        };

        this.onMouseMove = function(e) {
            if (this.editor.$mouseHandler.isMousePressed) {
                if (!this.editor.selection.isEmpty())
                    this.clear();
                return;
            }
            this.x = e.clientX;
            this.y = e.clientY;
            this.update();
        };

        this.onMouseOut = function(e) {
            this.clear();
        };

        this.destroy = function() {
            this.onMouseOut();
            event.removeListener(this.editor.renderer.scroller, "mousemove", this.onMouseMove);
            event.removeListener(this.editor.renderer.content, "mouseout", this.onMouseOut);
            delete this.editor.hoverLink;
        };

    }).call(HoverLink.prototype);

    exports.HoverLink = HoverLink;

});

/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

define("token_tooltip", [], function(require, exports, module) {
    "use strict";

    var dom = require("ace/lib/dom");
    var oop = require("ace/lib/oop");
    var event = require("ace/lib/event");
    var Range = require("ace/range").Range;
    var Tooltip = require("ace/tooltip").Tooltip;

    function TokenTooltip(editor, register, workbook) {
        if (editor.tokenTooltip) return;
        Tooltip.call(this, editor.container);
        editor.tokenTooltip = this;
        this.editor = editor;
        this.workbook = workbook
        this.register = register;

        this.update = this.update.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        event.addListener(editor.renderer.scroller, "mousemove", this.onMouseMove);
        event.addListener(editor.renderer.content, "mouseout", this.onMouseOut);
    }

    oop.inherits(TokenTooltip, Tooltip);

    (function() {
        this.token = {};
        this.range = new Range();
        this.getMatchAround = function(regExp, string, col) {
            var match;
            if (!regExp) return;
            regExp.lastIndex = 0;
            string.replace(regExp, function(str) {
                var offset = arguments[arguments.length - 2];
                var length = str.length;
                if (offset <= col && offset + length >= col)
                    match = {
                        start: offset,
                        value: str
                    };
            });

            return match;
        };
        var wordMapSize = 0;
        var regex = new RegExp([].join('|'), "gi");
        const formulaInfo = {
            flow             : 'Flow is a quantity which is measured with reference to a period of time.\n' +
            'Thus, flows are defined with reference to a specific period (length of time),\n' +
            ' e.g., hours, days, weeks, months or years. It has time dimension.\n' +
            ' National income is a flow. It describes and measures flow of goods and services which\n' +
            ' become available to a country during a year.\n Similarly, all other economic variables which have time dimension,\n' +
            ' i.e., whose magnitude can be measured over a period of time are called flow variables.\n' +
            ' For instance, income of a person is a flow which is earned during a week or a month or any other period.\n' +
            ' Likewise, investment (i.e., addition to the stock of capital) is a flow as it pertains to a period of time.',
            balance          : 'Balance Variables:\n' +
            'A stock is a quantity which is measurable at a particular point of time, e.g., 4 p.m.,\n' +
            ' 1st January, Monday, 2010, etc. Capital is a stock variable.\n' +
            ' On a particular date (say, 1st April, 2011), a country owns and commands stock of machines,\n' +
            ' buildings, accessories, raw materials, etc. It is stock of capital.\n' +
            ' Like a balance-sheet, a stock has a reference to a particular date on which it shows stock position.\n' +
            ' Clearly, a stock has no time dimension (length of time) as against a flow which has time dimension.',
            TSUM             : 'TSUM(variable_name)\nSUM of TupleInstances given name',
            MAX              : 'MAX(n1,n2)\nReturn maximum value of value n1 or n2',
            MIN              : 'MIN(n1,n2)\nReturn minimum value of value n1 or n2',
            OnER             : 'OnER(expression,error_value)',
            OnZero           : 'OnZero(value,alternative)',
            Or               : 'Abstract A Or B\nExample: 1>2 Or 2>1=True',
            And              : 'Abstract A And B\nExample: 1>2 And 2>1=False',
            document         : 'One value per context in time.\nCan have multiple values in Tuple dimension',
            column           : 'One value per time_unit in context.\nCan have multiple values in Tuple dimension',
            string           : 'Is a datatype',
            number           : 'Is a datatype. And the default one.',
            unscalable       : 'While scaling don\'t scale this variable',
            afterinput       : 'Is not supported in lme.\n FFL is descriptive\n' +
            'One of the benefits of using descriptive language is that it helps the writer to convey the meaning behind the text.\n' +
            ' By using descriptive language, the writer can describe exactly how a setting looks,\n' +
            ' how a character behaves or what action is taking place. The benefit for the reader is the ability\n' +
            ' to more clearly visualize what is being described.',
            Execute          : 'This is not supported in lme. FFL is a descriptive language',
            memo             : 'displaytype: Textarea',
            String           : 'Convert any to String\nExample\nString(1)',
            If               : 'Abstract:\nIf(expression,default,alternative)\nExample: If(2>1,100,200)=100',
            TsY              : 'Amount of times current period fits in a bookyear',
            FirstUC          : 'FirstUpperCase \nExample FirstUC("hoi")',
            Pos              : 'Position \nExample Pos("hoi","o")==2',
            MatrixLookup     : 'Example:\n  MatrixLookup(a,named_table,row_name,column_name)',
            SelectDescendants: 'Abstract:\n  Count(X,{variable_name},{lambda})\nExample:\n' +
            '  Count(X,SelectDescendants(Q_MAP01, Q_MAP01_HULPVARIABELEN),InputRequired(X))',
            Count            : 'Example:\n  Count(X,SelectDescendants(Q_MAP01, Q_MAP01_HULPVARIABELEN),InputRequired(X))',
            Case             : 'Example:\n  Case(1,[1:100|2:200])==100',
            SubStr           : 'Example:\n  SubStr("Hoi",2)==i',
            InputRequired    : 'Example:\n  Count(X,SelectDescendants(Q_MAP01, Q_MAP01_HULPVARIABELEN),InputRequired(X))',
            DataAvailable    : 'Example:\n  DataAvailable(VARIABLE)',
            Visible          : 'Example Visible(Q_ROOT)',
            GetTitle         : 'Example GetTitle(Q_ROOT)',
            title            : 'Specify the dynamic title for a given variable',
            formula          : 'Specify the dynamic formula for a given variable',
            variable         : 'Describes a new variable',
            options_trend    : 'locked,visible',
            options_notrend  : 'locked,visible',
            date             : 'Is a datatype',
            select           : 'displaytype select\nDescribes a choice type. Visualized a dropdown|select.\nWhen choices:0:No|1:Yes it implies a radio',
            On               : 'Synonym to 1, true, True',
            True             : 'Synonym to 1, true, True',
            Off              : 'Synonym to 0, false, False',
            False            : 'Synonym to 0, false, False',
            'choices:'       : 'Specify the choices for a given variable\nImplies displaytype: select\nExample: "0:No|1:Yes"\n' +
            'Example: "High|Low|None"',
            "hint:"          : 'Specify the dynamic hint formula for a given variable',
            ValueT           : 'Convert a period into a time-index',
            "aggregation:"   : 'A number can be aggregated over time.\nOptions:flow|balance\nDefaults to balance',
            "locked:"        : 'Describes if a variable can be changed by input.\nValid values:On|Off|0|1 or a custom formula',
            "refers to"      : "Inheritance in FFL",
            "visible:"       : 'Describes if a variable can be seen.\nValid values:On|Off|0|1 or a custom formula',
            "required:"      : 'Describes if a variable is mandatory.\nValid values:On|Off|0|1 or a custom formula',
            "frequency:"     : 'The frequency a variable-value is repeated over time.\nOptions:[document|column|timeline|none]' +
            '\nDefaults to column',
            "datatype:"      : 'Datatype for the variable:\nOptions:[number|string|boolean|currency|matrix|none]\nDefaults to number',
            "options_title:" : 'Descibes if a title can be changed by user.\nOptions: locked|unlocked.\n Defaults to unlocked',
            "fixed_decimals:": 'a number or currency datatype can be restricted to an ammount of decimals shown.',
            "displaytype:"   : 'Displaytype for the variable:\n' +
            'Options:[default|radio|select|string|currency|paragraph|customwidget|date|memo|percentage|piechart|polarchart|scorecard]\n' +
            'currency(2) implies fixed_decimals: 2\n' +
            'Defaults to default',
        }
        const definitions = Object.keys(formulaInfo);
        definitions.sort(function(a, b) {
            // ASC  -> a.length - b.length
            // DESC -> b.length - a.length
            return b.length - a.length;
        });
        var formulaRegex = new RegExp(definitions.join('|'), "g")

        this.update = function() {
            this.$timer = null;

            var r = this.editor.renderer;
            if (this.lastT - (r.timeStamp || 0) > 1000) {
                r.rect = null;
                r.timeStamp = this.lastT;
                this.maxHeight = window.innerHeight;
                this.maxWidth = window.innerWidth;
            }

            var canvasPos = r.rect || (r.rect = r.scroller.getBoundingClientRect());
            var offset = (this.x + r.scrollLeft - canvasPos.left - r.$padding) / r.characterWidth;
            var row = Math.floor((this.y + r.scrollTop - canvasPos.top) / r.lineHeight);
            var col = Math.round(offset);

            var screenPos = { row: row, column: col, side: offset - col > 0 ? 1 : -1 };
            var session = this.editor.session;
            var docPos = session.screenToDocumentPosition(screenPos.row, screenPos.column);
            var token = session.getTokenAt(docPos.row, docPos.column);

            if (!token && !session.getLine(docPos.row)) {
                token = {
                    type : "",
                    value: "",
                    state: session.bgTokenizer.getState(0)
                };
            }
            if (!token) {
                session.removeMarker(this.marker);
                this.hide();
                return;
            }

            var tokenText = token.type;
            if (token.state)
                tokenText += "|" + token.state;
            if (token.merge)
                tokenText += "\n  merge";
            if (token.stateTransitions)
                tokenText += "\n  " + token.stateTransitions.join("\n  ");

            if (this.tokenText != tokenText) {
                //TODO: convert into callback!
                if (wordMapSize !== this.register.i.length) {
                    wordMapSize = this.register.i.length
                    const variableNames = Object.keys(this.register.getIndex('name'));
                    variableNames.sort(function(a, b) {
                        // ASC  -> a.length - b.length
                        // DESC -> b.length - a.length
                        return b.length - a.length;
                    });
                    regex = new RegExp(variableNames.join("|"), 'g')
                }
                const match = this.getMatchAround(regex, session.getLine(docPos.row), col);// "\nInformation about the formula\n"; + token//+)
                var otherMath = null;
                if (!match) otherMath = this.getMatchAround(formulaRegex, session.getLine(docPos.row), col);

                if (match && this.register.getIndex('name')[match.value]) {
                    const variable_name = match.value;
                    //variable info
                    const nodes = this.register.getIndex('name')[variable_name];
                    const display = nodes[this.register.schemaIndexes.title]
                    // const formula = nodes[this.register.schemaIndexes.formula_trend] || nodes[this.register.schemaIndexes.formula]
                    const dependencies = this.workbook.getDependencies(variable_name)
                    const formula = this.workbook.get(variable_name, 'original')
                    this.setText(variable_name + ":" + display + '\nformula:\n ' + formula + '\n' + dependencies.map(function(el, idx) {
                        return (idx == 0 ? 'references:\n ' : 'dependencies:\n ') + el.map(function(el, idx2) {
                            const parts = el.split('_').slice(1)
                            const lastpart = parts.pop()
                            return parts.join('_') + (lastpart == 'value' ? '' : '.' + lastpart) + (idx2 % 4 == 1 ? '\n' : '')
                        }).join(', ')
                    }).join('\n'));
                    this.width = this.getWidth();
                    this.height = this.getHeight();
                    this.tokenText = variable_name + " :\n" + display;

                } else if (otherMath) {
                    //FinanMath functions info
                    const displayValue = otherMath.value + ":\n" + formulaInfo[otherMath.value];
                    this.setText(displayValue);
                    this.width = this.getWidth();
                    this.height = this.getHeight();
                    this.tokenText = displayValue;

                } else {
                    this.setText(null);
                    this.tokenText = null;
                    this.hide();
                    return;
                }
            }

            this.show(null, this.x, this.y);

            this.token = token;
            session.removeMarker(this.marker);
            this.range = new Range(docPos.row, token.start, docPos.row, token.start + token.value.length);
            this.marker = session.addMarker(this.range, "ace_bracket", "text");
        };

        this.onMouseMove = function(e) {
            this.x = e.clientX;
            this.y = e.clientY;
            if (this.isOpen) {
                this.lastT = e.timeStamp;
                this.setPosition(this.x, this.y);
            }
            if (!this.$timer)
                this.$timer = setTimeout(this.update, 100);
        };

        this.onMouseOut = function(e) {
            if (e && e.currentTarget.contains(e.relatedTarget))
                return;
            this.hide();
            this.editor.session.removeMarker(this.marker);
            this.$timer = clearTimeout(this.$timer);
        };

        this.setPosition = function(x, y) {
            if (x + 10 + this.width > this.maxWidth)
                x = window.innerWidth - this.width - 10;
            if (y > window.innerHeight * 0.75 || y + 20 + this.height > this.maxHeight)
                y = y - this.height - 30;

            Tooltip.prototype.setPosition.call(this, x + 10, y + 20);
        };

        this.destroy = function() {
            this.onMouseOut();
            event.removeListener(this.editor.renderer.scroller, "mousemove", this.onMouseMove);
            event.removeListener(this.editor.renderer.content, "mouseout", this.onMouseOut);
            delete this.editor.tokenTooltip;
        };

    }).call(TokenTooltip.prototype);

    exports.TokenTooltip = TokenTooltip;

});