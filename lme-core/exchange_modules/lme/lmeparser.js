import { DEBUG, info }     from 'log6'
import FunctionMap         from '../../src/FunctionMap'
import PropertiesAssembler from '../../src/PropertiesAssembler'
import SolutionFacade      from '../../src/SolutionFacade'
import FormulaService      from '../../src/FormulaService'

const known_widths = new Set(['locked', 'visible', 'entered'])
const unwantedKeys = new Set(['delegate', 'ast', 'body'])
const hidden_keys = new Set(['original', 'parsed'])
const correctFileName = (name) => name.split('_').slice(1, -1).join('_')
const variableName = (name) => name.split('_').slice(1).join('_')

function FormulaInfo(dataArg, schema, modelName) {
	let i
	this.name = modelName
	this.formulas = []
	this.variables = []
	const self = this
	this.data = dataArg
	const data = []
	this.nodes = []
	const forms = {}
	FormulaService.visitFormulas(formula => {
		formula.id = formula.id || formula.index
		forms[formula.name] = formula
		self.addFormula(formula)
	})
	const names = {}

	const modelNamePrefix = `${modelName}_`
	for (i = 0; i < this.formulas.length; i++) {
		const formula = this.formulas[i]
		const name = correctFileName(formula.name)
		if (names[name] === undefined) {
			names[name] = true
			if (formula.ipprotected) {
				info(`formula is ipProtected${JSON.stringify(formula)}`)
				data.push([name, (forms[modelNamePrefix + name + '_title'] || { original: null }).original, null, null, null, null, null, null, null, null])
			} else {
				const title = forms[modelNamePrefix + name + '_title'] || { original: null }
				const hint = forms[modelNamePrefix + name + '_hint'] || { original: '' }
				const visible = forms[modelNamePrefix + name + '_visible'] || { original: false }
				const valid = forms[modelNamePrefix + name + '_valid'] || { original: false }
				const value = forms[modelNamePrefix + name + '_value'] || { original: '' }
				const formula_trend = forms[modelNamePrefix + name + '_trend'] || { original: '' }
				const formula_notrend = forms[`${modelNamePrefix + name}_notrend`] || { original: '' }
				const locked = forms[modelNamePrefix + name + '_locked'] || { original: false }
				const choices = forms[modelNamePrefix + name + '_choices'] || { original: null }
				//looks a lot like the Register.js functionality
				data.push([name, title.original, value.original, formula_trend.original, formula_notrend.original, visible.original, locked.original, choices.original, hint.original, valid.original])
			}
		}
	}
	const types = ['name', 'title', 'value', 'notrend', 'trend', 'visible', 'locked', 'choices', 'hint', 'valid']
	//this.formulas = undefined;
	this.meta = { view: { columns: [] } }
	let counter = 0
	for (i = 0; i < types.length; i++) {
		const type = types[i]
		self.meta.view.columns.push({
			'width'         : known_widths.has(type) ? undefined : 50,
			'name'          : type,
			'dataTypeName'  : 'text',
			'fieldName'     : type,
			'position'      : counter++,
			'renderTypeName': 'text'
		})
	}
}

FormulaInfo.prototype.setSchema = function(schema) { this.schema = schema}
FormulaInfo.prototype.addFormula = function(formula) {
	formula.fflname = variableName(formula.name)
	if (!formula.ipprotected)
		this.formulas.push(formula)
	else {
		this.formulas.push(JSON.parse(JSON.stringify(formula, (k, v) => hidden_keys.has(k) ? undefined : v)))
	}
}

const LMEParser = {
	name      : 'lme',
	headername: '.finance lme',
	parseData : function(data, workbook) {
		const solution = SolutionFacade.createSolution(data.name)
		solution.nodes = data.nodes
		if (data.variables) FormulaService.initVariables(data.variables)
		PropertiesAssembler.bulkInsert(solution)
		//Probably for formula-information
		FormulaService.bulkInsertFormula(data.formulas)
		for (let i = 0; i < data.formulas.length; i++) FunctionMap.initializeFormula(data.formulas[i], workbook.context.ma, workbook.context.audittrail)
		if (DEBUG) info(`Done import ${data.name}`)
		return solution
	},
	deParse   : function(rowId, workbook) {
		const modelName = workbook.getSolutionName()
		const info = new FormulaInfo({}, {}, modelName)
		PropertiesAssembler.findAllInSolution(modelName, property => info.nodes.push(property))
		FormulaService.getVariables(variable => info.variables.push(variable))
		return JSON.stringify(info, (key, value) => unwantedKeys.has(key) ? undefined : value, 0)
	}
}
export default LMEParser