import esprima                                   from 'esprima'
import { debug, DEBUG, TRACE, trace }            from 'log6'
import { AST }                                   from 'ast-node-utils'
import { RegisterToFFL }                         from './RegisterToFFL'
import { RegisterFormulaBuilder }                from './RegisterFormulaBuilder'
import finFormula                                from './FinFormula'
import { COLUMN, NUMBER, SolutionFacade, VALUE } from '../lme-core/index'

/**
 * ffl parsing, supports refers-to, modifiers. internationalization. v1:{@fflV2parser.js} field-validations
 *
 *  Quicker, cleaner, flexible, less data-loss                w
 *   1) Indexing makes lookup's while processing data more efficient and use less code.
 *   2) Prefer ["a","b"].join('') above "a" + "b" its way quicker.
 *   3) The indexer has removed parsing abnormalities with property_name " visible" etc.. Makes the code more clean
 *   4) Own char-interpreter was more complex than recursive regex-replace.
 *
 * TODO: load property names in DB which directly correspond, fix defaults while saving.
 * TODO: some exotic choices not work correctly
 */
function RegisterToLMEParser() {
}

RegisterToLMEParser.prototype.name = 'ffl2'
RegisterToLMEParser.prototype.headername = '.finance ffl2'
RegisterToLMEParser.prototype.walk = function(node, depth, visitor) {
	visitor(node, depth)
	const children = node[this.childIndex]
	for (let i = 0; i < children.length; i++) {
		this.walk(children[i], depth + 1, visitor)
	}
}
RegisterToLMEParser.prototype.deParse = function(data, workbook) {
	if (!workbook.indexer) return null
	return new RegisterToFFL(workbook.indexer).toGeneratedFFL({ rootVariableName: workbook.modelName })
}
RegisterToLMEParser.prototype.parseData = function(data, workbook) {
	const indexer = data
	workbook.indexer = indexer

	const self = this
	const fflRegister = new RegisterToFFL(indexer)
	const register = data.getIndex('name')
	const rfb = new RegisterFormulaBuilder(indexer)
	const modelName = workbook.modelName || indexer.name
	const solution = SolutionFacade.createSolution(modelName || 'NEW')
	const nameIndex = indexer.schemaIndexes.name
	const tupleIndex = indexer.schemaIndexes.tuple
	const validIndex = indexer.schemaIndexes.valid
	const displayOptionsIndex = indexer.schemaIndexes.display_options
	const dataOptionsIndex = indexer.schemaIndexes.data_options
	const lengthIndex = indexer.schemaIndexes.length
	const patternIndex = indexer.schemaIndexes.pattern
	const titleIndex = indexer.schemaIndexes.title
	const referstoIndex = indexer.schemaIndexes.refersto
	const displayTypeIndex = indexer.schemaIndexes.displaytype
	const frequencyIndex = indexer.schemaIndexes.frequency
	const versionIndex = indexer.schemaIndexes.version
	const dataTypeIndex = indexer.schemaIndexes.datatype
	const rangeIndex = indexer.schemaIndexes.range
	const ipprotectedIndex = indexer.schemaIndexes.ipprotected
	const modifierIndex = indexer.schemaIndexes.modifier
	const decimalsIndex = indexer.schemaIndexes.fixed_decimals
	const parentNameIndex = indexer.schemaIndexes.parentId
	const visibleIndex = indexer.schemaIndexes.visible

	this.childIndex = indexer.schemaIndexes.children
	const choiceIndex = indexer.schemaIndexes.choices

	this.formulaIndexes = []
	const formulaIndexes = this.formulaIndexes
	const formulas = ['valid', 'hint', 'locked', 'visible', 'required', 'choices']
	for (let i = 0; i < formulas.length; i++) {
		//test if the formula is in the model at all
		if (data.schemaIndexes[formulas[i]] != null) this.formulaIndexes.push(data.schemaIndexes[formulas[i]])
	}

	const tuples = []
	/*  var default_frequency = NUMBER
	 if (register.root) {
	 default_frequency = register.root[frequencyIndex] || NUMBER
	 }*/
	const rootNode = register.root || indexer.i[0]
	workbook.model_version = rootNode ? rootNode[versionIndex] : ''
	this.walk(rootNode, 3, function(node, depth) {
		if (depth < tuples.length) {
			tuples.length = depth
			while (tuples.length > 0 && !tuples[depth - 1]) tuples.length--
		}
		const nodeName = node[nameIndex]
		rfb.inherit(node)
		let displaytype = node[displayTypeIndex] || NUMBER

		let data_type = node[dataTypeIndex] || NUMBER
		let frequency = node[frequencyIndex] || COLUMN
		let display_options = node[displayOptionsIndex]
		const title = node[titleIndex] || '"' + nodeName + '"'
		const data_options = node[dataOptionsIndex]
		const ipprotected = node[ipprotectedIndex] || false
		//TODO: paragraph when no children.
		//TODO: else column frequency..
		/*
		 * Don't forget reference variables
		 * Don't forget num(1,2) datatype parsing. (fixed_decimals)
		 * Don't forget unscalable number
		 * Choice -> " and " <- fix
		 * merge display options and displaytype.
		 */
		if (node[tupleIndex]) {
			displaytype = 'paragraph'
		}
		if (displaytype === 'paragraph') {
			data_type = 'string'
			frequency = 'none'
		}
		// expecting an parentName..
		let parentId = node[parentNameIndex] ? indexer.i[node[parentNameIndex]][nameIndex] : null
		//if (parentId == 'root') parentId = undefined;

		/**
		 * number:2 means: number with 2 fixed decimals
		 */
		let fixed_decimals = node[decimalsIndex]
		let startDecimalsIndex
		if ((fixed_decimals == null) && (startDecimalsIndex = displaytype.indexOf('(')) > -1) {
			fixed_decimals = displaytype.substr(startDecimalsIndex).slice(1, -1)
			displaytype = displaytype.substr(0, startDecimalsIndex)
		}
		/**
		 * This is where formula-sets are combined.
		 * if the node has and trend and nottrend formula, the target formula will be x.trend ? node.formula_trend : valueFormula
		 * Of course this will be for every formulaset that exists in the node
		 * Document formulaset is nottrend, formula = nottrend
		 * This way it would also be possible to have and formulaset 'orange', 'document' and trend formulasets
		 */
		const valueFormula = rfb.buildFFLFormula(node, frequency === COLUMN && data_type === NUMBER)

		if (node[modifierIndex] && node[modifierIndex].indexOf('=') > -1) display_options = 'displayAsSummation'

		//if column && number.. (aggregate)
		/**
		 * optional displaytype =select.
		 * Having the choice member is enough
		 */
		if (node[choiceIndex] || displaytype === 'select') {
			if (displaytype === 'date') {
				//NO-OP (for now..., the choices are used to format the date-picker.
			}
			else if (!node[choiceIndex]) {
				if (DEBUG) debug(`Row [${nodeName}] is displaytype [select], but does not have choices`)
			} else if (node[choiceIndex].split('|').length === 2) {
				displaytype = 'radio'
			} else {
				displaytype = 'select'
				if (TRACE) trace(`[${nodeName}] ${node.choices}`)
			}
		}

		//TODO: quick-fix move into IDE ScorecardTool-addon
		if (nodeName.match(/MAP[0-9,A-z]+_(VALIDATION|INFO|HINT|WARNING)$/i)) {
			if (fflRegister.defaultValues[fflRegister.visibleIndex][node[fflRegister.visibleIndex]]) {
				node[fflRegister.visibleIndex] = 'Length(' + nodeName + ')'
				frequency = 'none'
				node[frequencyIndex] = 'none'
			}
			displaytype = 'string'
			node[displayOptionsIndex] = nodeName.split('_').pop().toLowerCase()
		} else if (nodeName.match(/MAP[0-9,A-z]+_PARAGRAAF[0-9]+$/i)) {
			node[frequencyIndex] = 'none'
			frequency = 'none'
			displaytype = 'paragraph'
		}

		//we also check nodeName here. With root { .. there are two root nodes, one wihout name.
		if (!node[validIndex] && nodeName) {
			//valid formula's (this will become more complex soon valid(list<predicate,message>) now predicate,message
			//info: patternIndex is language-specific (f.e. email- regular expression)
			const validFormulas = []
			//pattern is optional
			if (patternIndex && node[patternIndex]) validFormulas.push('REGEXPMATCH(' + node[patternIndex] + ',' + nodeName + ')')
			//length is optional
			if (lengthIndex && node[lengthIndex]) validFormulas.push('Length(' + nodeName + ') ' + node[lengthIndex])
			//range is optional
			if (rangeIndex && node[rangeIndex]) validFormulas.push('(' + node[rangeIndex].replace(/(>|>=|<|<=)/gi, nodeName + ' $1') + ')')
			if (data_type === NUMBER) validFormulas.push('not isNaN(OnNA(' + nodeName + ',null))')
			//its also only interesting when its a required field and entered
			// or when its entered and required
			//' + node[nameIndex] + '.required &&
			//valid formulas are only interesting when entered OR required
			if (validFormulas.length > 0) node[validIndex] = `If(${validFormulas.join(' And ')},"","Enter valid input.")`
		}

		const uiNode = SolutionFacade.createUIFormulaLink(solution, nodeName, VALUE, self.parseFFLFormula(indexer, valueFormula, nodeName, VALUE, data_type, workbook.context), displaytype, frequency, null, parentId, ipprotected)

		//hierarchical visibility
		const visibleFormula = node[fflRegister.visibleIndex]
		if (parentId) {
			node[fflRegister.visibleIndex] = fflRegister.defaultValues[visibleIndex][visibleFormula] ? `${parentId}.visible` : `${parentId}.visible and ${visibleFormula}`
		}

		if (fixed_decimals) uiNode.decimals = parseInt(fixed_decimals)
		if (display_options) uiNode.display_options = display_options
		if (data_options) uiNode.data_options = data_options

		//should not be needed...
		uiNode.frequency = frequency

		/**
		 * Tuple properties
		 */
		if (node[tupleIndex] || tuples.length > 0) {
			uiNode.tuple = true
			uiNode.nestedTupleDepth = 0
			for (let i = 0; i < tuples.length; i++)
				if (tuples[i]) uiNode.nestedTupleDepth++
			if (node[tupleIndex]) {
				uiNode.tupleDefinition = true
				uiNode.data_type = 'string' //Will story string-based values (Jan,Piet,123Jaar,Etc..)
				if (tuples.length > 0) {
					uiNode.tupleDefinitionName = tuples[tuples.length - 1].rowId
					uiNode.tupleProperty = true
				}
				tuples[depth] = uiNode
			} else {
				uiNode.tupleDefinitionName = tuples[tuples.length - 1].rowId
				uiNode.tupleProperty = true
			}
		}

		if (node[fflRegister.options_titleIndex] === 'locked') uiNode.title_locked = true

		uiNode.data_type = data_type

		SolutionFacade.createUIFormulaLink(solution, nodeName, 'title', self.parseFFLFormula(indexer, title, nodeName, 'title', null, workbook.context), undefined, frequency, null, null)

		for (var i = 0; i < formulaIndexes.length; i++) {
			const index = formulaIndexes[i]
			if (node[index]) {
				if (!fflRegister.defaultValues[index] || !fflRegister.defaultValues[index][node[index]]) {
					SolutionFacade.createUIFormulaLink(solution, nodeName, indexer.schema[index], self.parseFFLFormula(indexer, node[index], nodeName, indexer.schema[index], null, workbook.context), undefined, frequency, null, null)
				}
			}
		}
	})
	//think about formula-sets, same ritual as trend + nottrend formulasets
	return solution
}

RegisterToLMEParser.prototype.parseFFLFormula = function(indexer, formula, nodeName, col, type, context) {
	if (!formula) return type === 'string' ? AST.STRING('') : type === NUMBER ? {
		'type': 'Identifier',
		'name': 'NA'
	} : {
		'type': 'Identifier',
		'name': 'null'
	}
	let fin_parse = col === 'choices' ? finFormula.finChoice(formula) : finFormula.parseFormula(formula)
	//allow multi-language here
	fin_parse = indexer.translateKeys(fin_parse)
	let formulaReturn = 'undefined'
	try {
		formulaReturn = esprima.parse(fin_parse).body[0].expression
	}
	catch (e) {
		if (DEBUG) debug(`unable to parse [${fin_parse}] returning it as String value [${nodeName}] : ${col}`, e)
		formulaReturn = AST.STRING(fin_parse)
		if (global.IDE_DEBUGMODUS) context.audittrail.addRow(['MODEL', 'ERROR', nodeName, col, '', '', '', e.toString(), formula, null, fin_parse])
	}
	return formulaReturn
}
//SolutionFacade.addParser(RegisterToLMEParser.prototype)
export default RegisterToLMEParser