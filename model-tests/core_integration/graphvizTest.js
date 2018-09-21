/**
 * file creator, not tested every cycle.
 *
 * @type {ok}
 */
import { ok }                        from 'assert'
import LMEFacade, {
	Context,
	ENCODING,
	FormulaService,
	SolutionFacade,
	ValueFacade,
	WebExportParser,
	WorkBook
}                                    from '../../lme-core/index'
import { RegisterPlainFFLDecorator } from '../../ffl/index'
import fflMath                       from '../../math/ffl-math'
import formulaJs                     from '../../formulajs-connect/formulajs'
import excel_connect                 from '../../excel-connect/excel-connect'

import { debug, info } from 'log6'

import { readFileSync, writeFile } from 'fs'

LMEFacade.registerParser(WebExportParser, RegisterPlainFFLDecorator)
LMEFacade.addFunctions(fflMath, formulaJs, excel_connect)
const path = '/../URA/'
const modelname = 'URA'
const fflTestModels = [path + modelname]
const onlyValue = true

const createRow = (rowId) => `\r\n ${rowId} [shape=record, label="${rowId}"];`
const createGraph = (middle) => `digraph G { \r\nrankdir="LR" ${middle} \r\n}`
const correctFileName = (name) => name.replace(/^[^_]+_([\w]*)_\w+$/gmi, '$1')

fflTestModels.forEach(fflModelName => {
	const data = readFileSync(`${__dirname + fflModelName}.ffl`, ENCODING)
	const wb = new WorkBook(new Context)

	wb.importFFL(data)
	wb.validateImportedSolution()
	wb.fixProblemsInImportedSolution()
	ok(wb.validateImportedSolution().valid)
	wb.export('webexport')

	let graphvizModelTree = ''
	let depVariableNames_with_formulas = ''
	let depVariableNames = ''

	ValueFacade.visit(wb.getSolutionNode(`${modelname}_root`), function(child) {
		graphvizModelTree += createRow(child.rowId)
		graphvizModelTree += `\r\n${child.parentrowId} -> ${child.rowId};`
	}, 0)

	const variableNames = new Set()

	wb.solution.formulas.forEach(formulaId => {
		const formula = SolutionFacade.fetchFormulaByIndex(formulaId)
		if (onlyValue && formula.name.endsWith('_valid')) return
		if (Object.keys(formula.deps).length > 0) {
			variableNames.add(correctFileName(formula.name))
		}
		Object.keys(formula.deps).forEach(dep => {
			if (onlyValue && !dep.endsWith('_value')) return
			depVariableNames_with_formulas += `\r\n${correctFileName(formula.name)} -> ${correctFileName(dep)}[label="${formula.original}"];`
			depVariableNames += `\r\n${correctFileName(formula.name)} -> ${correctFileName(dep)};`
		})
	})
	variableNames.forEach(name => {
		depVariableNames_with_formulas += createRow(name)
		depVariableNames += createRow(name)
	})
	let formulaInfo = {}
	FormulaService.visitFormulas(formula => formulaInfo[formula.name] = formula)
	createFile(wb, '_dependencies.json', JSON.stringify(formulaInfo, null, 2))
	createFile(wb, '_modelTree.txt', createGraph(graphvizModelTree))
	createFile(wb, '_dependencies.txt', createGraph(depVariableNames))
	createFile(wb, '_dependencies_with_formulas.txt', createGraph(depVariableNames_with_formulas))
})

function createFile(wb, fileName, graph) {
	const fullFileName = `../resources/${wb.getSolutionName()}${fileName}`
	writeFile(fullFileName, graph, err => {
		if (err) return debug(err)
		info(`[${fullFileName}] saved!`)
	})
}

info('test fflExport succeed')