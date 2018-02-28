define("ace/snippets/text", ["require", "exports", "module"], function(require, exports, module) {
    "use strict";

    exports.snippetText = undefined;
    exports.scope = "text";

});

define('ace/mode/ffl', function(require, exports, module) {

    var oop = require("ace/lib/oop");
    var TextMode = require("ace/mode/text").Mode;
    var FFLHighlightRules = require("ace/mode/ffl_highlight_rules").FFLHighlightRules;
    var CStyleFoldMode = require("ace/mode/folding/cstyle").FoldMode;
    var Mode = function(keywordmap) {
        this.HighlightRules = FFLHighlightRules;
        FFLHighlightRules.prototype.keywords = keywordmap
        this.keywordMapper = FFLHighlightRules.keywordMapper;
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
        var FFLHighlightRules = function() {
            var keywordMapper = this.createKeywordMapper(this.keywords, "text", true);
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
                        token: ["constant.language", "keyword"],
                        regex: "\\d+\\b"
                    }, // ### Header -> constant(###), keyword( Header)
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

            this.addRules(new TextHighlightRules().getRules(), "defaultrules-");
            this.normalizeRules()
        }
        oop.inherits(FFLHighlightRules, TextHighlightRules);

        exports.FFLHighlightRules = FFLHighlightRules;
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

    function TokenTooltip(editor, register, workbook, formulaInfo, RegisterFormulaBuilder) {
        if (editor.tokenTooltip) return;
        Tooltip.call(this, editor.container);
        editor.tokenTooltip = this;
        this.editor = editor;
        this.workbook = workbook
        this.RegisterFormulaBuilder = RegisterFormulaBuilder
        this.register = register;
        this.formulaInfo = formulaInfo
        this.formulaRegex = new RegExp(formulaInfo.mathDefinitions().join('|'), "g")

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
        var formula_builder;
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
                const names = this.register.getIndex('name');
                if (wordMapSize !== this.register.i.length) {
                    wordMapSize = this.register.i.length
                    const variableNames = Object.keys(names);
                    variableNames.sort(function(a, b) {
                        // ASC  -> a.length - b.length
                        // DESC -> b.length - a.length
                        return b.length - a.length;
                    });
                    regex = new RegExp(variableNames.join("|"), 'g')
                    formula_builder = new this.RegisterFormulaBuilder(this.register)
                }
                const match = this.getMatchAround(regex, session.getLine(docPos.row), col);// "\nInformation about the formula\n"; + token//+)
                var otherMath = null;
                if (!match) otherMath = this.getMatchAround(this.formulaRegex, session.getLine(docPos.row), col);
                if (match && names[match.value]) {
                    const variable_name = match.value;
                    //variable info
                    const node = names[variable_name];
                    const workbook = this.workbook;
                    const display = node[this.register.schemaIndexes.title] || variable_name
                    // const formula = node[this.register.schemaIndexes.formula_trend] || node[this.register.schemaIndexes.formula]
                    const dependencies = workbook.getDependencies(variable_name)
                    var frequency = node[this.register.schemaIndexes.frequency] || 'column'
                    var datatype = node[this.register.schemaIndexes.datatype] || 'number'
                    var formula = this.register.translateKeys((formula_builder.buildFFLFormula(node, datatype == 'number' && frequency == 'column')) || '')
                    const prep = []
                    var lastIndent = 0
                    formula = formula.replace(/,/g, function($1, $2, $3) {
                        if (lastIndent == 0) lastIndent = $2
                        prep.length = lastIndent
                        return ',\n' + prep.join(' ')
                    })

                    const entered = workbook.get(variable_name, 'entered')
                    var value;
                    try {
                        value = (entered ? '@' : '') + OnNA(workbook.get(variable_name, 'value'), "NA")
                    } catch (err) {
                        value = 'ERR:' + err.toString()
                    }
                    const prefix = [];
                    const deplength = 60
                    const dep_ammount_in_row = 2
                    this.setText(variable_name + ":" + display + '\n\n' + value + '=\n' + formula + '\n\n' + dependencies.map(function(el, idx) {
                        if (el.length == 0) return '';
                        return (idx == 0 ? 'dependencies:\n\n' : 'references:\n\n') + el.filter(function(el) {
                            return !el.indexOf('__SMT') > -1
                        }).map(function(el, idx2) {
                            const parts = el.split('_').slice(1)
                            const lastpart = parts.pop()

                            const dep_var_name = parts.join('_');
                            var dep_value;
                            try {
                                const entered = workbook.get(dep_var_name, 'entered')
                                dep_value = (entered ? '!' : '') + OnNAIfNumber(workbook.get(dep_var_name, lastpart), 'NA')
                            } catch (err) {
                                dep_value = 'ERR:' + err.toString()
                            }

                            const total = dep_var_name + (lastpart == 'value' ? '' : '.' + lastpart) + "=" + dep_value;

                            prefix.length = Math.max(deplength - String(total).length, 0);
                            return (String(total).slice(0, deplength - 1) + prefix.join(' ')) + ((idx2 + 1) % dep_ammount_in_row == 0 ? '\n' : '')

                        }).join('')
                    }).join('\n\n'));
                    this.width = this.getWidth();
                    this.height = this.getHeight();
                    this.tokenText = variable_name + " :\n" + display;

                } else if (otherMath) {
                    //FinanMath functions info
                    //if otherMath.value == If(a,b,c) lets Extract the Abstract-Tree
                    const workbook = this.workbook;

                    const lookupFunction = this.formulaInfo.lookupFunction(otherMath.value, session.getLine(docPos.row), otherMath.start);
                    const eval_parts = this.formulaInfo.extractParts(workbook, lookupFunction)

                    const displayValue = eval_parts.join('\n') + "\n\nAbout:\n\n" + lookupFunction.lines.join('\n')
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
        //this.setAttribute('class', 'seecoderun_tooltip');
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