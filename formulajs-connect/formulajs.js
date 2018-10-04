/**
 * bridge between formula-js and lme
 */
import { debug, DEBUG } from 'log6'
import * as formulaJs   from '@handsontable/formulajs'

const entries = {}
const name = 'formulaJs'

Object.keys(formulaJs).forEach(functionName => {
	if (functionName === 'NA') if (DEBUG) return debug('FFL parser uses this function to be a VARIABLE 1e-10')
	else if (global.hasOwnProperty(functionName)) if (DEBUG) debug(`global function already used : [${functionName}]`)
	else entries[functionName] = formulaJs[functionName]
})
export { name, entries }
export default { name, entries }
