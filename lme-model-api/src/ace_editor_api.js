const ConvertEvaluateAsString = require('../../model-tests/plugins/ConvertEvaluateAsString').ConvertEvaluateAsString
const AmpersandConverter = require('../../model-tests/plugins/AmpersandConverter').AmpersandConverter
const ScorecardQ_caseFix = require('../../model-tests/plugins/ScorecardQ_caseFix').ScorecardQCaseFix
const V05CaseFix = require('../../model-tests/plugins/V05CaseFix').V05CaseFix
const EconomicEditorView = require('../../model-tests/EconomicEditorView').EconomicEditorView
const FormulaInformation = require('./FormulaInformation')

function AceEditor(id, opts) {
    opts = opts || {}
    this.fflModel = "";
    this.halfHeight = false;
    if (opts.halfHeight) this.halfHeight = opts.halfHeight;
    const aceEditor = ace.edit(id);
    edit = aceEditor;//quick response front-end
    const langTools = ace.require("ace/ext/language_tools");
    this.langTools = langTools;
    aceEditor.session.setMode("ace/mode/ffl");
    aceEditor.setTheme("ace/theme/tomorrow");
    aceEditor.setBehavioursEnabled(true);
    // enable autocompletion and snippets
    aceEditor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion : true,
        enableSnippets           : true,
        showFoldWidgets          : true
    });
    /*
        var snippetManager = ace.require("ace/snippets").snippetManager;
        snippetManager.insertSnippet(aceEditor, "test124");*/
    aceEditor.setAutoScrollEditorIntoView(true);
    aceEditor.setOption("maxLines", 60);
    aceEditor.$blockScrolling = Infinity
    aceEditor.resize(true)
    const maxLines = (this.halfHeight ? 0.5 : 1) * (41 + (($(window).height() - 730) / 17));
    $(window).resize(function() {
        aceEditor.setOption("maxLines", maxLines);
        aceEditor.resize()
    });
    aceEditor.setOption("maxLines", maxLines);
    aceEditor.resize()

    this.aceEditor = aceEditor;
    const wordMap = [
        {
            "word":
            "model {model_name} uses BaseModel \n" +
            "{\n" +
            "\n" +
            "}\n"
        },
        {
            "word":
                "When {variable_name}(tuple) is set to {value}\n"
        }
    ]

    this.addCompleter(function(editor, session, pos, prefix, callback) {
        if (prefix.length === 0) {
            callback(null, []);
            return
        }
        callback(null, wordMap.map(function(ea) {
            return { name: ea.word, value: ea.word, meta: "optional text" }
        }));
    })
}

AceEditor.prototype.getCursor = function() {
    return this.aceEditor.selection.getCursor();
}
AceEditor.prototype.addCompleter = function(callback) {
    var modelNamesCompleter = {
        getCompletions: callback
    }
    this.langTools.addCompleter(modelNamesCompleter);
}
AceEditor.prototype.setAnnotations = function(annotations) {
    this.aceEditor.session.setAnnotations(annotations)
}
AceEditor.prototype.setParsedValue = function(value) {
    var fflModel = value;
    if (ConvertEvaluateAsString.on) fflModel = ConvertEvaluateAsString.parse(fflModel);
    if (AmpersandConverter.on) fflModel = AmpersandConverter.parse(fflModel);
    if (ScorecardQ_caseFix.on) fflModel = ScorecardQ_caseFix.parse(fflModel);
    if (V05CaseFix.on) fflModel = V05CaseFix.parse(fflModel);
    if (EconomicEditorView.on) fflModel = EconomicEditorView.parse(fflModel);
    this.fflModel = fflModel;
    this.setValue(fflModel)
}
AceEditor.prototype.setValue = function(value) {
    this.aceEditor.session.setValue(value)
}
AceEditor.prototype.getCurrentLine = function() {
    return this.aceEditor.session.getLine(this.getCursor().row);
}
AceEditor.prototype.getNextLine = function() {
    return this.aceEditor.session.getLine(this.getCursor().row + 1);
}
AceEditor.prototype.getValue = function() {
    return this.aceEditor.session.getValue()
}
AceEditor.prototype.scrollTop = function() {

    this.aceEditor.scrollToLine(1, true, true, function() {
    });
    this.aceEditor.gotoLine(1, 1, true);
    this.aceEditor.selection.moveTo(0, 0)
}
AceEditor.prototype.registerEditorToClickNames = function(selected_editor, fflEditor, user_session, register, workbook) {
    var HoverLink = ace.require("hoverlink").HoverLink
    var TokenTooltip = ace.require("token_tooltip").TokenTooltip

    selected_editor.aceEditor.hoverLink = new HoverLink(selected_editor.aceEditor, register, workbook);
    selected_editor.aceEditor.hoverLink.on("open", function(link) {
        const startLookIndex = user_session.fflModel.search(new RegExp("(variable|tuple)\\s*\\+?\\-?\\=?" + link.value + "\s*$", "gmi"));
        //(!) its the real LineNumber - Delta on page
        const lineNumber = user_session.fflModel.substring(0, startLookIndex).split('\n').length
        fflEditor.scrollToLine(lineNumber)
    })
    selected_editor.aceEditor.TokenTooltip = new TokenTooltip(selected_editor.aceEditor, register, workbook, FormulaInformation);
}
AceEditor.prototype.scrollToLine = function(lineNumber) {
    this.aceEditor.scrollToLine(lineNumber, true, true, function() {
    });
    this.aceEditor.gotoLine(lineNumber, 20, true);
}
exports.AceEditor = AceEditor;