/**
 * file creator, not tested every cycle.
 *
 * @type {ok}
 */
import LMEFacade, { Context, ENCODING, FormulaService, Register, SolutionFacade, WorkBook } from '../../lme-core/index'
import * as formulaJs
                                                                                            from '../../formulajs-connect/formulajs'
import assert                                                                               from 'assert'
import fs                                                                                   from 'fs'
import log                                                                                  from 'log6'
import excel_connect
                                                                                            from '../../excel-connect/excel-connect'
import { DebugManager, RegisterPlainFFLDecorator }                                          from '../../ffl/index'
import '../../lme-core/exchange_modules/presentation/webexport'
import '../../lme-core/exchange_modules/lme/lmeparser'
import * as fflMath                                                                         from '../../math/ffl-math'

LMEFacade.registerParser(RegisterPlainFFLDecorator)
LMEFacade.addFunctions(fflMath)
LMEFacade.addFunctions(formulaJs)
LMEFacade.addFunctions(excel_connect)
const fflTestModels = ['/../KSP/KSP']

const correctFileName = (name) => name.replace(/^[^_]+_([\w]*)_\w+$/gmi, '$1')

for (let i = 0; i < fflTestModels.length; i++) {
	const fflModelName = fflTestModels[i]
	const data = fs.readFileSync(`${__dirname + fflModelName}.ffl`, ENCODING)
	const context = new Context()
	const wb = new WorkBook(context)
	const register = new Register()
	const debug_manager = new DebugManager(register, context.audittrail)
	wb.importSolution({
		register: register,
		raw     : data
	}, 'ffl')
	const validate = debug_manager.monteCarlo(fflModelName)
	assert.ok(validate.valid)
	var screendefExport = wb.export('webexport')
	var allnodes = screendefExport.nodes

	var graphvizModelTree = ''
	var depVariableNames_with_formulas = ''
	var depVariableNames = ''

	for (var nodeName in allnodes) {
		var node = allnodes[nodeName]
	}

	wb.visitProperties(wb.getSolutionNode('KSP_root'), function(child) {
		graphvizModelTree += createRow(child.rowId)
		graphvizModelTree += `\r\n${child.parentrowId} -> ${child.rowId};`
	}, 0)

	var variableNames = new Set()

	wb.solution.formulas.forEach(function(formulaId) {
		const formula = SolutionFacade.fetchFormulaByIndex(formulaId)
		if (Object.keys(formula.deps).length > 0) {
			variableNames.add(correctFileName(formula.name))
		}
		for (let dep in formula.deps) {
			depVariableNames_with_formulas += `\r\n${correctFileName(formula.name)} -> ${correctFileName(dep)}[label="${formula.original}"];`
			depVariableNames += `\r\n${correctFileName(formula.name)} -> ${correctFileName(dep)};`
		}
	})
	variableNames.forEach(function(name) {
		depVariableNames_with_formulas += createRow(name)
		depVariableNames += createRow(name)
	})
	var formulaInfo = {}
	FormulaService.visitFormulas(function(formula) {
		formulaInfo[formula.name] = formula
	})
	createFile(wb, '_dependencies.json', JSON.stringify(formulaInfo, null, 2))
	createFile(wb, '_canvas.json', wb.export('lme', undefined))
	createFile(wb, '_modelTree.txt', createGraph(graphvizModelTree))
	createFile(wb, '_dependencies.txt', createGraph(depVariableNames))
	createFile(wb, '_dependencies_with_formulas.txt', createGraph(depVariableNames_with_formulas))
}

function createFile(wb, fileName, graph) {
	var fullFileName = '../resources/' + wb.getSolutionName() + fileName
	fs.writeFile(fullFileName, graph, function(err) {
		if (err) {
			log.log(err)
			return
		}
		log.info('[%s] saved!', fullFileName)
	})
}

function createRow(rowId) {
	return '\r\n' + rowId + ' [shape=record, label="' + rowId + '"];'
}

function createGraph(middle) {
	var graphviz = 'digraph G { \r\nrankdir="LR"'
	graphviz += middle
	graphviz += '\r\n}'
	return graphviz
}

log.info('test fflExport succeed')