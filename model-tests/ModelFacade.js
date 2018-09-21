/*
 * Never include this in frond-end-dist for evaluation purpose
 * lme.js is the front-end opponent
 */
import 'esprima'
import 'escodegen'
import { debug }      from 'log6'
import assert         from 'assert'
import fs             from 'fs'
import LME            from '../lme-model-api/src/lme'
import excelPlugin    from '../excel-connect'
import FormulaService from '../lme-core/src/FormulaService'
import '../lme-core/exchange_modules/presentation/webexport'

const model = new LME()
model.addFunctions(excelPlugin)

function readFileSync(name) {
	return fs.readFileSync(name, 'utf8')
}

function importModel(name) {
	model.importFFL(readFileSync(__dirname + '/' + name + '.ffl'))
}

LME.prototype.visitFormulas = FormulaService.visitFormulas
LME.prototype.maxDependencies = () => {
	let bestMatchingDependency, max = -1
	FormulaService.visitFormulas((formula) => {
		//tempOutput += formula.fflname + '=' + formula.original + ';\n';
		var depsSize = Object.keys(formula.deps).length
		if (max < depsSize) {
			max = depsSize
			debug(formula.name + ':' + depsSize)
			bestMatchingDependency = formula
		}
	})
	return bestMatchingDependency
}

module.exports = [assert, importModel, model, log, readFileSync, fs.writeFileSync]
