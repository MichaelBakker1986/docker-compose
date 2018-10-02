/**
 * Solution encapsulation
 * FormulaId '0' is not a valid ID!
 */
import * as esprima        from 'esprima'
import FormulaBootstrap    from './FormulaBootstrap'
import ParserService       from './ParserService'
import FormulaService      from './FormulaService'
import FunctionMap         from './FunctionMap'
import PropertiesAssembler from './PropertiesAssembler'
import Solution            from './Solution'

const properties = {
	value        : 0,
	visible      : 1,
	required     : 2,
	locked       : 3,
	entered      : 4,
	validation   : 5,
	title        : 6,
	validateInput: 7,
	choices      : 8,
	hint         : 9,
	_testh       : 10
}
const functions = {}
const getFunctions = () => functions
const addVariables = FormulaService.addVariables
const initVariables = FormulaService.initVariables
const fetchFormulaByIndex = FormulaService.findFormulaByIndex

class SolutionFacade {
	static createSolution(solutionName) {
		return new Solution(PropertiesAssembler.createRootNode(solutionName).solutionName)
	}

	static importSolutionData(data, parserType, workbook) {
		const foundParser = ParserService.findParser(parserType)
		if (foundParser == null) throw Error(`Parser for type '${parserType}' is not found. You have to include it in the startup script (require/import)`)
		const solution = foundParser.parseData(data, workbook)
		PropertiesAssembler.bulkInsert(solution)
		SolutionFacade.initFormulaBootstrap(solution.getFormulaKeys(), false, workbook.context.ma, workbook.context.audittrail)
		return solution
	}

	static exportSolution(parserType, rowId, workbook) {
		const parser = ParserService.findParser(parserType)
		if (parser == null) throw Error(`No such parser found:[${parserType}]`)
		return parser.deParse(rowId, workbook)
	}

	static initFormulaBootstrap(formulas, resetParsedFormula, ma, audittrail) {
		for (let i = 0; i < formulas.length; i++) {
			const formulaInfo = FormulaService.findFormulaByIndex(formulas[i])
			if (resetParsedFormula) formulaInfo.parsed = undefined//explicitly reset parsed. (The formula-bootstrap) will skip parsed formulas
			if (formulaInfo.parsed == null) FormulaBootstrap.parseAsFormula(formulaInfo)
			FunctionMap.initializeFormula(formulaInfo, ma, audittrail)
		}
	}

	/*
	 *return given properties from a formula
	 */
	static gatherFormulaProperties(modelName, properties, rowId) {
		const formulaProperties = {}
		Object.keys(properties).forEach(prop_name => {
			const formula = FormulaService.findFormulaByIndex(PropertiesAssembler.getOrCreateProperty(modelName, rowId, prop_name).ref)
			if (formula !== undefined && formula.original !== undefined && formula.original !== null && formula.original !== '') {
				formulaProperties[prop_name] = formula.original
			}
		})
		return formulaProperties
	}

	/**
	 * Called from JSWorkBook
	 * Initializes Solution if not exists
	 * Creates Formula/Property if not exists
	 * Initialize FunctionMap
	 */
	static createFormulaAndStructure(solutionName, formulaAsString, rowId, colId, displaytype, frequency, ma, audittrail, self_body, parent_id) {
		//create a formula for the element
		const ast = esprima.parse(formulaAsString)
		//create Solution if not exists.
		const solution = SolutionFacade.createSolution(solutionName)
		//integrate Property with Formula
		SolutionFacade.createUIFormulaLink(solution, rowId, colId, ast.body[0].expression, displaytype, frequency, self_body, parent_id)
		//integrate one formula from just created Solution
		SolutionFacade.initFormulaBootstrap(solution.getFormulaKeys(), false, ma, audittrail)
	}

	/**
	 * Called by parsers
	 */
	static createUIFormulaLink(solution, rowId, colId, body, displaytype, frequency, self_body, parent_id, ip_protected) {
		//by default only value properties can be user entered
		//in simple (LOCKED = (colId !== 'value'))
		const property = PropertiesAssembler.getOrCreateProperty(solution.name, rowId, colId)
		if (rowId !== 'root' && colId === 'value') property.parentName = parent_id ? parent_id + '_value' : 'root_value'
		if (displaytype) property.displaytype = displaytype
		const formulaId = FormulaService.addModelFormula(property, solution.name, rowId, colId, ['value', 'title'].indexOf(colId) === -1, body, frequency, self_body, ip_protected)
		solution.createNode(formulaId, displaytype, property)
		return property
	}

	static addFormulaDependency(formulaInfo, name, propertyName) {
		const property = PropertiesAssembler.getOrCreateProperty(formulaInfo.name.split('_')[0], name, propertyName || 'value')
		FormulaService.addFormulaDependency(formulaInfo, property.ref, property.name)
		return property
	}

	/*static getOrCreateProperty = PropertiesAssembler.getOrCreateProperty
	 static contains = PropertiesAssembler.contains
	 static getFunctions = getFunctions
	 static addParser = ParserService.addParser
	 static visitParsers = ParserService.visitParsers
	 static properties = properties
	 static functions = functions
	 static addVariables = addVariables
	 static initVariables = initVariables
	 static fetchFormulaByIndex = fetchFormulaByIndex*/
}

SolutionFacade.getOrCreateProperty = PropertiesAssembler.getOrCreateProperty
SolutionFacade.contains = PropertiesAssembler.contains
SolutionFacade.getFunctions = getFunctions
SolutionFacade.addParser = ParserService.addParser
SolutionFacade.visitParsers = ParserService.visitParsers
SolutionFacade.properties = properties
SolutionFacade.functions = functions
SolutionFacade.addVariables = addVariables
SolutionFacade.initVariables = initVariables
SolutionFacade.fetchFormulaByIndex = fetchFormulaByIndex
FormulaBootstrap.initStateBootstrap(SolutionFacade)
export default SolutionFacade