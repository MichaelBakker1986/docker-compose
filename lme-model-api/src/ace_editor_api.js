import EconomicEditorView                          from '../../model-tests/EconomicEditorView'
import { ConvertEvaluateAsString }                 from '../../model-tests/plugins/ConvertEvaluateAsString'
import { AmpersandConverter }                      from '../../model-tests/plugins/AmpersandConverter'
import { ScorecardQCaseFix as ScorecardQ_caseFix } from '../../model-tests/plugins/ScorecardQ_caseFix'
import { V05CaseFix }                              from '../../model-tests/plugins/V05CaseFix'
import FormulaInformationManager                   from './FormulaInformationManager'
import { RegisterFormulaBuilder }                  from '../../ffl/index'

function AceEditor(id, opts) {
	opts = opts || {}
	this.fflModel = ''
	this.halfHeight = false
	if (opts.halfHeight) this.halfHeight = opts.halfHeight
	const aceEditor = ace.edit(id)
	global.edit = aceEditor//quick response front-end
	const langTools = ace.require('ace/ext/language_tools')
	this.langTools = langTools
	const FFLMode = ace.require('ace/mode/ffl').Mode
	aceEditor.session.setMode(new FFLMode(FormulaInformationManager.highlights))

	aceEditor.setTheme('ace/theme/tomorrow')
	aceEditor.setBehavioursEnabled(true)
	// enable autocompletion and snippets
	aceEditor.setOptions({
		enableBasicAutocompletion: true,
		enableLiveAutocompletion : true,
		enableSnippets           : true,
		showFoldWidgets          : true
	})
	aceEditor.setAutoScrollEditorIntoView(true)
	aceEditor.$blockScrolling = Infinity

	aceEditor.setOption('minLines', 1)
	aceEditor.setOption('maxLines', 1)
	aceEditor.resize()
	aceEditor.resize(true)

	this.aceEditor = aceEditor
	const wordMap = [
		{
			'word':
				'model {model_name} uses BaseModel \n' +
				'{\n' +
				'\n' +
				'}\n'
		},
		{
			'word':
				'When {variable_name}(tuple) is set to {value}\n'
		}
	]

	this.addCompleter(function(editor, session, pos, prefix, callback) {
		if (prefix.length === 0) {
			callback(null, [])
			return
		}
		callback(null, wordMap.map(function(ea) {
			return { name: ea.word, value: ea.word, meta: 'optional text' }
		}))
	})
}

AceEditor.prototype.initResize = function() {

	const editor = this.aceEditor
	const split_vertically = this.halfHeight
	var heightUpdateFunction = function() {

		// http://stackoverflow.com/questions/11584061/
		var newHeight =
			    editor.getSession().getScreenLength()
			    * editor.renderer.lineHeight
			    + editor.renderer.scrollBar.getWidth()
		const editor_height = $('.content-wrapper').height() - (split_vertically ? 20 : 10)
		const lines = (editor_height - editor.renderer.scrollBar.getWidth()) / editor.renderer.lineHeight
		editor.setOption('maxLines', (Math.max(lines, 2) / (split_vertically ? 2.0 : 1.0)))
		editor.setOption('minLines', Math.max(lines, 1) / ((split_vertically ? 2.0 : 1.0) / 2.0))
		editor.resize()
	}
	// Set initial size to match initial content
	heightUpdateFunction()

	// Whenever a change happens inside the ACE editor, update
	// the size again
	editor.getSession().on('change', heightUpdateFunction)

	$(window).resize(function() {
		$(window).trigger('zoom')
	})
	$(window).on('zoom', function() {
		console.log('zoom', window.devicePixelRatio)
		heightUpdateFunction()
	})
	let resizeTO
	$(window).resize(function() {
		if (resizeTO) clearTimeout(resizeTO)
		resizeTO = setTimeout(function() {
			$(this).trigger('resizeEnd')
		}, 200)
	})
	$(window).bind('resizeEnd', heightUpdateFunction)
}
AceEditor.prototype.getCursor = function() {
	return this.aceEditor.selection.getCursor()
}
AceEditor.prototype.addCompleter = function(callback) {
	var modelNamesCompleter = {
		getCompletions: callback
	}
	this.langTools.addCompleter(modelNamesCompleter)
}
AceEditor.prototype.setAnnotations = function(annotations) {
	this.aceEditor.session.setAnnotations(annotations)
}
AceEditor.prototype.setParsedValue = function(value) {
	var fflModel = value
	if (ConvertEvaluateAsString.on) fflModel = ConvertEvaluateAsString.parse(fflModel)
	if (AmpersandConverter.on) fflModel = AmpersandConverter.parse(fflModel)
	if (ScorecardQ_caseFix.on) fflModel = ScorecardQ_caseFix.parse(fflModel)
	if (V05CaseFix.on) fflModel = V05CaseFix.parse(fflModel)
	if (EconomicEditorView.on) fflModel = EconomicEditorView.parse(fflModel)
	this.fflModel = fflModel
	this.setValue(fflModel)
}
AceEditor.prototype.setValue = function(value) {
	this.aceEditor.session.setValue(value)
}
AceEditor.prototype.getCurrentLine = function() {
	return this.aceEditor.session.getLine(this.getCursor().row)
}
AceEditor.prototype.getNextLine = function() {
	return this.aceEditor.session.getLine(this.getCursor().row + 1)
}
AceEditor.prototype.getValue = function() {
	return this.aceEditor.session.getValue()
}
AceEditor.prototype.scrollTop = function() {

	this.aceEditor.scrollToLine(1, true, true, function() {
	})
	this.aceEditor.gotoLine(1, 1, true)
	this.aceEditor.selection.moveTo(0, 0)
}
AceEditor.prototype.registerEditorToClickNames = function(selected_editor, fflEditor, user_session, register, workbook) {
	var HoverLink = ace.require('hoverlink').HoverLink
	var TokenTooltip = ace.require('token_tooltip').TokenTooltip

	selected_editor.aceEditor.hoverLink = new HoverLink(selected_editor.aceEditor, register, workbook)
	selected_editor.aceEditor.hoverLink.on('open', function(link) {
		const startLookIndex = user_session.fflModel.search(new RegExp('(variable|tuple)\\s*\\+?\\-?\\=?' + link.value + '\s*$', 'gmi'))
		//(!) its the real LineNumber - Delta on page
		const lineNumber = user_session.fflModel.substring(0, startLookIndex).split('\n').length
		fflEditor.scrollToLine(lineNumber)
	})
	selected_editor.aceEditor.TokenTooltip = new TokenTooltip(selected_editor.aceEditor, register, workbook, FormulaInformationManager, RegisterFormulaBuilder)
}
AceEditor.prototype.scrollToLine = function(lineNumber) {
	this.aceEditor.scrollToLine(lineNumber, true, true, function() {
	})
	this.aceEditor.gotoLine(lineNumber, 20, true)
}
export { AceEditor }