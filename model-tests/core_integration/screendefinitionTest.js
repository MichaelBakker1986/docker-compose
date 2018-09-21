import { debug, trace, TRACE }    from 'log6'
import { notStrictEqual, ok }     from 'assert'
import api, { Context, WorkBook } from '../../lme-core/index'
import data                       from '../../lme-core/resources/scorecardtemplate.json'
import ScreenDefinitionParser     from '../../lme-core/exchange_modules/screendefinition/screendefparser'

api.registerParser(ScreenDefinitionParser)
const wb = new WorkBook(new Context)

const arraysEqual = (a, b) => {
	if (a === b) return true
	if (a == null) {
		if (b == null) return true
		return b.length === 0
	}
	if (b == null) {
		if (a == null) return true
		return a.length === 0
	}
	return a.length === b.length
}

ok(arraysEqual(undefined, undefined))
ok(arraysEqual(null, undefined))
ok(arraysEqual(undefined, null))
ok(arraysEqual([], null))
ok(arraysEqual(undefined, []))
ok(!arraysEqual([1, 2], [1]))

function validateTree(expected, actual, expectedChildrenProperty, actualChildrenProperty, equalsFunction) {
	ok(equalsFunction(expected, actual))
	const expectedChildren = expected[expectedChildrenProperty]
	const actualChildren = actual[actualChildrenProperty]
	//if (!arraysEqual(expectedChildren, actualChildren)) throw Error(`${JSON.stringify(expectedChildren)} is not ${actualChildren}`)
	if (expectedChildren != null && actualChildren != null) {
		for (let i = 0; i < expectedChildren.length; i++) {
			validateTree(expectedChildren[i], actualChildren[i], expectedChildrenProperty, actualChildrenProperty, equalsFunction)
		}
	}
}

wb.importSolution(JSON.stringify(data, null, 2), 'screendefinition')
ok(wb.validateImportedSolution().valid)
const screenDefinitionExport = wb.export('screendefinition')
notStrictEqual(screenDefinitionExport, undefined)
notStrictEqual(screenDefinitionExport, null)
const actual = JSON.parse(wb.export('screendefinition'))
const expected = JSON.parse(JSON.stringify(data, null, 2))
validateTree(expected, actual, 'children', 'children', (expected, actual) => {
	//since variableName is optional, but leading in screenDefinition
	return actual.name === expected.variableName || expected.name
})
if (TRACE) trace(screenDefinitionExport)
debug(`success model [${wb.getSolutionName()}]`)