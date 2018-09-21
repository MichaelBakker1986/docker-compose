/*
 First, most basic export of values
 Just calling getAllValues() internally to export
 */
import { NUMBER, PropertiesAssembler, SolutionFacade } from '../../index'

const jsonValues = {
	headername: 'jsonvalues',
	name      : 'jsonvalues',
	parseData : function(data, workbook) {
		updateValues(data, workbook.context)
		return SolutionFacade.createSolution(workbook.getSolutionName())
	},
	deParse   : function(rowId, workbook) {
		const allValues = workbook.getAllChangedValues()
		//clean up the audit while de-parsing.
		allValues.forEach((single_value) => {
			if (single_value.varName.endsWith('_title')) single_value.varName = correctPropertyName(single_value.varName)
			else single_value.varName = correctFileName(single_value.varName)
		})
		return allValues
	}
}

const correctPropertyName = (name) => name.replace(/^([^_]+_[\w]*_\w+)$/gmi, '$1')
const correctFileName = (name) => name.replace(/^([^_]+_[\w]*)_\w+$/gmi, '$1')

/**
 * values are directly injected into the context, not through the API
 * They will not be saved in the audit.
 */
function updateValues(data, context) {
	const docValues = context.getValues()
	for (let key in docValues) if (!isNaN(key)) docValues[key] = {}

	for (let key in data.values) {
		const value = data.values[key]
		let [nodeId, nodeColId] = key.split('#')[0]

		if (!nodeId.endsWith('_value')) {
			nodeId = `${nodeId}_value`
		}
		const fetch = PropertiesAssembler.fetch(nodeId)
		//we don't have to import values for variables we don't use.
		if (fetch) {
			let enteredValue = value.value
			if (fetch.datatype === NUMBER) {
				enteredValue = enteredValue == null ? null : Number(enteredValue)
			}
			docValues[fetch.ref][parseInt(nodeColId)] = enteredValue
		}
	}
}

export default jsonValues