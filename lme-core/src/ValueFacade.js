/**
 * Bridge between FormulaService,PropertiesAssembler and FunctionMap
 */
import { DEBUG, trace, TRACE, warn }                             from 'log6'
import PropertiesAssembler                                       from './PropertiesAssembler'
import FunctionMap                                               from './FunctionMap'
import FormulaService                                            from './FormulaService'
import { DOCUMENT, LOCKED, NUMBER, STRING_TYPE, VALUE, VISIBLE } from './Constants'

const ValueFacade = {}

if (Error.prototype.stack === undefined)
	Error.prototype.stack = ''

/**
 * For small arrays, lets say until 1000, elements. There is no need to map by name.
 * Just iterate the shabang and test the property
 */
if (!String.prototype.lookup) {
	Array.prototype.lookup = function(property, name) {
		for (let i = 0; i < this.length; i++) {
			if (this[i][property] === name) return this[i]
		}
		return undefined
	}
}
if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position) {
		position = position || 0
		return this.substr(position, searchString.length) === searchString
	}
}
if (!String.prototype.endsWith) {
	String.prototype.endsWith = function(suffix) {
		return this.indexOf(suffix, this.length - suffix.length) !== -1
	}
}
if (!String.prototype.trim) {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '')
	}
}

function findFormula(uiModel) {
	if (uiModel === undefined) return undefined
	return FormulaService.findFormulaByIndex(uiModel.ref)
}

const fetchSolutionNode = (row, col) => PropertiesAssembler.fetch(row + '_' + col)

ValueFacade.validChoice = (choices, row, userValue) => {
	userValue = userValue === true ? '1' : userValue === false ? '0' : userValue
	return (choices.lookup(VALUE, String(userValue)) || choices.lookup('name', String(userValue)))
}
ValueFacade.putSolutionPropertyValue = function(context, row, value, col, xas, yas) {
	const rowId = row + '_' + (col || VALUE)
	const localFormula = findFormula(PropertiesAssembler.fetch(rowId))
	//because only Formula's are known here, we cannot give away variable name here.
	if (localFormula === undefined) throw Error('Cannot find variable')
	if (TRACE) trace('Set value row:[%s] x:[%s] y:[%s] value:[%s]', rowId, xas.hash, yas.hash, value)
	context.calc_count++
	context.audit.push({
		saveToken: context.saveToken,
		hash     : xas.hash + yas.hash + 0,
		formulaId: localFormula.id || localFormula.index
	})
	let userValue = value
	const variable = fetchSolutionNode(row, (col || VALUE))
	if (variable.displaytype === 'radio' || variable.displaytype === 'select') {
		if (userValue != null) {
			const choices = ValueFacade.fetchSolutionPropertyValue(context, row, 'choices', xas, yas)
			const lookup_value = ValueFacade.validChoice(choices, row, userValue)
			if (DEBUG && lookup_value == null) warn(`Invalid choice-value set for ${row} [${userValue}]`)
			userValue = lookup_value ? lookup_value.name : null
			if (!isNaN(userValue)) {
				userValue = parseFloat(userValue)
			}
		}
	}
	if (variable.frequency === DOCUMENT) xas = xas.doc
	//NULL values are allowed, and should not be parsed into a real data type.
	if (userValue != null) {
		if (variable.datatype === NUMBER) {
			userValue = Number(userValue)
		} else if (variable.datatype === STRING_TYPE) {
			userValue = String(userValue)
		} else if (variable.datatype === 'boolean') {
			userValue = Boolean(userValue)
		}
	}
	FunctionMap.apiSet(localFormula, xas, yas, 0, userValue, context.getValues())
}
/**
 * Generic default values, formatter transformers
 * TODO: introduce data-masks to keep these checks quick
 * - every variable has one mask, this one includes display and data types.
 */
ValueFacade.fetchSolutionPropertyValue = function(context, row, col, xas, yas) {
	const colType = col || VALUE
	if (colType === 'entered') {
		//kinda copy-paste, find way to refactor. there is no real enteredValue formula.
		//retrieve the 'value' formula, check if there is an entered value
		const variable = fetchSolutionNode(row, VALUE)
		const localFormula = findFormula(variable)
		if (localFormula === undefined) {
			return false
		}
		const id = localFormula.id || localFormula.index
		const hash = xas.hash + yas.hash + 0
		return context.getValues()[id][hash] != null
	} else if (colType === 'original') {
		const variable = fetchSolutionNode(row, VALUE)
		const localFormula = findFormula(variable)
		return localFormula.original
	}
	if (colType === VALUE && row === 'KSP2_TotalGrossCostsChildTillEighteen') {
		var rt = 21
	}
	const variable = fetchSolutionNode(row, colType)
	const localFormula = findFormula(variable)
	let returnValue
	if (localFormula === undefined) returnValue = context.propertyDefaults[colType]
	else {
		if (variable.frequency === DOCUMENT) xas = xas.doc
		returnValue = FunctionMap.apiGet(localFormula, xas, yas, 0, context.getValues(), context.ma, context.audittrail)
	}
	if (variable) {
		if (colType === VALUE) {
			if (variable.displaytype === 'radio' || variable.displaytype === 'select') {
				if (returnValue != null) {
					const choices = ValueFacade.fetchSolutionPropertyValue(context, row, 'choices', xas, yas)
					returnValue = returnValue === true ? '1' : returnValue === false ? '0' : returnValue
					const choicesLookup = choices.lookup('name', String(returnValue))
					returnValue = choicesLookup ? choicesLookup.value : returnValue
				}
			} else {
				if (variable.decimals !== undefined) {
					if (variable.datatype === 'matrix') {
						for (let i = 0; i < returnValue.length; i++) {
							const innerx = returnValue[i]
							if (!isNaN(innerx)) {
								const level = Math.pow(10, variable.decimals)
								returnValue[i] = (Math.round(innerx * level) / level)
							}
							for (let y = 0; y < returnValue[i].length; y++) {
								const innery = returnValue[i][y]
								if (!isNaN(innery)) {
									const level = Math.pow(10, variable.decimals)
									returnValue[i][y] = (Math.round(innery * level) / level)
								}
							}
						}
					}
					else if (!isNaN(returnValue)) {
						const level = Math.pow(10, variable.decimals)
						returnValue = (Math.round(returnValue * level) / level)
					}
				}
				if (variable.datatype === NUMBER) returnValue = OnNA(returnValue, 0)
				if (variable.displaytype === 'piechart') returnValue = PIECHART(returnValue)
			}
			if (variable.displaytype === 'date') returnValue = new Date(returnValue)
		}
		else if (colType === LOCKED) return Boolean(returnValue)
		else if (colType === VISIBLE) return Boolean(returnValue)
	}
	return returnValue
}
ValueFacade.fetchRootSolutionProperty = PropertiesAssembler.getRootProperty
ValueFacade.fetchSolutionNode = fetchSolutionNode
ValueFacade.apiGetValue = FunctionMap.apiGet
ValueFacade.getAllValues = function(docValues) {
	return this.getValuesFromFormulaIds(Object.keys(docValues), docValues)
}
ValueFacade.getValuesFromFormulaIds = function(keys, docValues) {
	//we cannot just return everything here, Because for now all formula's have a user-entered value cache.
	//Also Functions themSelves are bound to this object.
	//So we have to strip them out here.
	//should be part of the apiGet, to query all *_value functions. or *_validation etc.
	const values = []
	for (let i = 0; i < keys.length; i++) {
		const formulaId = keys[i]
		const cached_values = docValues[formulaId]
		if (cached_values) {
			const formula = FormulaService.findFormulaByIndex(formulaId)
			const formulaName = formula === undefined ? formulaId : formula.name

			for (let cached_value in cached_values)
				values.push({
					varName: formulaName,
					colId  : cached_value,
					value  : cached_values[cached_value]
				})
		}
	}
	return values
}
//when new formula's arrive, we have to update the user-entered map so we don't get NPE
ValueFacade.updateValueMap = values => {
	FormulaService.visitFormulas(formula => {
		//later will add values['_'+key] for the cache
		//for unlocked add values[key] here will user entered values stay
		if (formula.type === 'noCacheUnlocked') {
			let id = formula.id || formula.index
			if (!values[id]) values[id] = {}
		}
	})
}
ValueFacade.visit = PropertiesAssembler.visitProperty
ValueFacade.visitChildren = PropertiesAssembler.visitChildren
ValueFacade.findAllInSolution = PropertiesAssembler.findAllInSolution

export default ValueFacade