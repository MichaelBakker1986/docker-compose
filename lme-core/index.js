/**
 * user friendly API
 * TODO: Move tuple related work to FESFacade
 * just let it inject into the FESFacade
 */
import { Context }                           from './src/Context'
import { AuditTrail }                        from './src/AuditTrail'
import { JSWorkBook as WorkBook }            from './src/JSWorkBook'
import JSVisitor                             from './src/JSVisitor'
import { Register }                          from './src/Register'
import FormulaService                        from './src/FormulaService'
import ValueFacade                           from './src/ValueFacade'
import PropertiesAssembler                   from './src/PropertiesAssembler'
import YAxis                                 from './src/YAxis'
import XAxis                                 from './src/XAxis'
import resources                             from './resources/CustomImport.json'
import TimeAxis                              from './src/TimeAxis'
import SolutionFacade                        from './src/SolutionFacade'
import JSONParser                            from './exchange_modules/jsonvalues/jsonvalues'
import WebExportParser                       from './exchange_modules/presentation/webexport'
import LMEParser                             from './exchange_modules/lme/lmeparser'
import { debug, DEBUG, error, trace, TRACE } from 'log6'
import {
	COLUMN,
	DETAIL_INTERVAL,
	DOCUMENT,
	DISPLAY_TYPE,
	ENCODING,
	FUNCTION_TYPE,
	FFL_VERSION_PROPERTY_NAME,
	INPUT_NODE_TYPE,
	LOCKED,
	NUMBER,
	OBJECT_TYPE,
	OUTPUT_NODE_TYPE,
	STRING_TYPE,
	TITLE,
	VALUE,
	VISIBLE
}                                            from './src/Constants'

function LMEFacade() {
}

LMEFacade.prototype.initializeFFlModelData = function(data, path) {
	let JSWorkBook
	if (path.includes('KSP')) {//KSP is only model with the 18year TimeModel, need 1 more example to generalize.
		JSWorkBook = new WorkBook(new Context())
	} else {
		JSWorkBook = new WorkBook(new Context(), new TimeAxis(resources), DETAIL_INTERVAL)
	}
	JSWorkBook.importFFL(data)
	JSWorkBook.validateImportedSolution()
	JSWorkBook.fixProblemsInImportedSolution()
	const validateFeedback = JSWorkBook.validateImportedSolution()
	if (validateFeedback.valid) {
		if (DEBUG) debug(`Initialized model [${JSWorkBook.getSolutionName()}]`)
	} else {
		if (DEBUG) error(validateFeedback)
		throw Error(`Unable to initialize model ${JSWorkBook.getSolutionName()}`)
	}
	return JSWorkBook
}
/**
 * TODO: Inject this functions into the FunctionMap instead of global.
 */
LMEFacade.prototype.registerParser = function() {
	for (let i = 0; i < arguments.length; i++) SolutionFacade.addParser(arguments[i])
}
LMEFacade.prototype.addFunctions = function() {
	for (let i = 0; i < arguments.length; i++) {
		const plugin = arguments[i]
		Object.assign(global, plugin.entries)
		/*Object.keys(plugin.entries).forEach(function_name => {
		 global[function_name] = plugin.entries[function_name]
		 })*/
		if (TRACE) trace(`Added fes-plugin [${plugin.name}] functions [${Object.keys(plugin.entries)}]`)
	}
}
/**
 * rowId - VariableName
 * @Optional value - new value
 * TODO: move to tupleDefinition to support multiple tuple definition/tuple in tuple
 */
// Convert tuple index to tuple number

LMEFacade.prototype.getValue = function(context, rowId, column_context = 0, value, tuple_index) {
	const fesContext = new Context()
	fesContext._values = context.values
	const JSWorkBook = new WorkBook(fesContext)
	JSWorkBook.columns = context.columns || 2
	JSWorkBook.properties = context.properties || JSWorkBook.properties
	//prepare the workbook and context to match current appscope
	if (!context.isset) {
		JSWorkBook.updateValues()
		context.isset = true
	}
	if (tuple_index != null) {
		tuple_index = JSWorkBook.tupleIndexForName(rowId, tuple_index)
		if (tuple_index === -1) tuple_index = JSWorkBook.insertTuple(rowId, tuple_index)
	}
	if (value !== undefined) {
		//choice(select) requests
		JSWorkBook.setSolutionPropertyValue(rowId, value, 'value', column_context, tuple_index)
		return []
	} else {
		//getValue
		const values = []
		const rootNode = JSWorkBook.getSolutionNode(rowId)
		if (rootNode) {
			JSWorkBook.walkProperties(rootNode, function(node, type, depth, yax) {
				values.push(getEntry(JSWorkBook, `${node.solutionName}_${node.rowId}`, column_context, yax))
			}, JSWorkBook.resolveY(tuple_index), null, 0)
		} else {
			values.push({ variable: rowId })
		}
		return values
	}
}

LMEFacade.prototype.getObjectValues = function(context, rowId, tuple_index) {
	const fesContext = new Context()
	const JSWorkBook = new WorkBook(fesContext)
	JSWorkBook.importValues(context.values)
	JSWorkBook.columns = context.columns || 2
	JSWorkBook.properties = context.properties || JSWorkBook.properties
	if (!context.isset) {
		JSWorkBook.updateValues()
		context.isset = true
	}
	if (tuple_index != null) {
		tuple_index = JSWorkBook.tupleIndexForName(rowId, tuple_index)
		if (tuple_index === -1) if (DEBUG) debug(`tuple id = ${JSWorkBook.insertTuple(rowId, tuple_index)}`)
	}
	const rootNode = JSWorkBook.getSolutionNode(rowId)
	const flattenValues = {}
	if (rootNode) {
		JSWorkBook.visitProperties(rootNode, function(node, type, innerTreeDepth, yax) {
			const nodeName = node.rowId
			const parentName = node.parentName.split('_').slice(0, -1).join('_')
			const columns = node.frequency === 'document' ? 0 : context.columns
			for (let i = 0; i <= columns; i++) {
				const appendix = columns === 0 ? '' : `$${i}`
				flattenValues[node.rowId + appendix] = {
					parent: parentName + appendix,
					name  : nodeName,
					value : getValueObject(JSWorkBook, node.solutionName + '_' + node.rowId, i, yax),
					data  : []
				}
			}
		}, JSWorkBook.resolveY(0).parent, null, 0)
		//reassemble results
		Object.keys(flattenValues).forEach(key => {
			if (flattenValues[flattenValues[key].parent]) {
				flattenValues[flattenValues[key].parent][flattenValues[key].name] = (flattenValues[key].value)
			} else {
				//array variants
				const parentName = flattenValues[key].parent.split('$')[0]
				if (flattenValues[parentName]) {
					flattenValues[parentName].data.push(flattenValues[key])
				}
			}
		})

		Object.keys(flattenValues).forEach(key => {
			delete flattenValues[key].parent
			delete flattenValues[key].name
			if (flattenValues[key].data.length === 0) delete flattenValues[key].data
		})
	}
	/**
	 * Values are not bound.
	 */
	return flattenValues[rowId.split('_').slice(1).join('_')]
}

function getValueObject(workbook, rowId, column_context, yAxis) {
	const dataEntry = {}
	Object.keys(workbook.properties).forEach(type => {
		dataEntry[type] = workbook.getSolutionPropertyValue(rowId, type, column_context, yAxis)
	})
	return dataEntry
}

/**
 * Given properties in workbook return all values for given columns
 * @param workbook
 * @param rowId
 * @param column_context
 * @param yAxis
 * @returns {Array}
 */
function getEntry(workbook, rowId, column_context, yAxis) {
	let outputData = []
	const columnStart = column_context
	let columnEnd = workbook.columns
	const variable = workbook.getSolutionNode(rowId, 'value')

	if (variable && variable.frequency === 'document') {
		columnEnd = columnStart
	}
	/*
	 let tupleStart = 0
	 let tupleEnd = 0
	 */

	// If frequency = column: return multiple columns
	for (let xAxisCounter = columnStart; xAxisCounter <= columnEnd; xAxisCounter++) {
		let dataEntry = {}
		outputData.push(dataEntry)

		// For properties of the variable
		Object.keys(workbook.properties).forEach(type => {
			dataEntry[type] = workbook.getSolutionPropertyValue(rowId, type, xAxisCounter, yAxis)

			if (columnStart !== columnEnd || columnStart > 0) {
				dataEntry.column = xAxisCounter
			}
			dataEntry.variable = variable.rowId
			if (variable.tuple) {
				dataEntry.tupleIndex = yAxis.index
			}
			dataEntry.hash = yAxis.hash + xAxisCounter + 0
		})
	}
	//if there is only one column, the exported value is not presented to be an array
	if (columnStart === columnEnd) {
		outputData = outputData[0]
	}
	return outputData
}

export {
	Context,
	WorkBook,
	SolutionFacade,
	JSONParser,
	LMEParser,
	WebExportParser,
	YAxis,
	ValueFacade,
	PropertiesAssembler,
	FormulaService,
	JSVisitor,
	TimeAxis,
	XAxis,
	Register,
	resources,
	AuditTrail,
	DOCUMENT,
	VALUE,
	VISIBLE,
	LOCKED,
	DETAIL_INTERVAL,
	NUMBER,
	FFL_VERSION_PROPERTY_NAME,
	COLUMN,
	TITLE,
	OBJECT_TYPE,
	DISPLAY_TYPE,
	FUNCTION_TYPE,
	STRING_TYPE,
	OUTPUT_NODE_TYPE,
	INPUT_NODE_TYPE,
	ENCODING
}
export default LMEFacade.prototype