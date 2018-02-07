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
                "variable.language": "unscalable|scorecard|model|boolean|radio|root|uses|refers|to|document|column|flow|balance|select|number|invisible|currency|AMMOUNT|memo|SumFor|MinMax|Now|Round|HSUM|DateToDay|Val|OnNA|SubStr|TupleMax|String|ForAll|TupleSum|If|Pos|Length|EvaluateAsString|Str|MatrixLookup|OnER|Min|ValueT|Count|SelectDescendants|TSUM|DataAvailable|InputRequired|Max|Case",
                "keyword": "Implies|top_separator|options_trend|BaseModel|options_notrend|link|bottom_separator|required|display_options|fixed_decimals|aggregation|variable|tuple|formula|formula_notrend|formula_trend|datatype|choices|locked|visible|title|data_options|pattern|range|frequency|datatype|displaytype|options|options_title|top_blanklines|ffl_version|version|valid|hint",
                "comment": "#|Memo1",
                "storage.type": "&",
                "support.function": "+|-|=|none|and|or|entered|visible",
                "constant.language": "NA|TupleIndex|T|X|0|1|2|3|4|5|6|7|8|9|."
            }, "text", true);
            this.keywordMapper = keywordMapper;
            this.keywordRule = {
                regex: "\\w+",
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
                        defaultToken: "comment.doc",
                        caseInsensitive: true
                    }, {
                        token: "string",
                        start: '"',
                        end: '"',
                        next: [{token: "language.escape", regex: /\\[tn"\\]/}]
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

    var HoverLink = function(editor) {
        if (editor.hoverLink)
            return;
        editor.hoverLink = this;
        this.editor = editor;

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

            var screenPos = {row: row, column: col, side: offset - col > 0 ? 1 : -1};
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

        this.findLink = function(row, column) {
            var editor = this.editor;
            var session = editor.session;
            var line = session.getLine(row);
///https?:\/\/[^\s"']+/g
            var match = this.getMatchAround(/(Discount|RecoveryValue|OtherRank)/gi, line, column);
            if (!match)
                return;

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