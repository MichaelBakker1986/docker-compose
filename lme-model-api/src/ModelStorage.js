import { Register }                            from '../../lme-core/index'
import { DeltaCompareRegister, FFLToRegister } from '../../ffl/index'
import uuid                                    from 'uuid4'
import log                                     from 'log6'
import path                                    from 'path'
import assembler                               from '../../git-connect/ModelAssembler'
import fs, { readFileSync }                    from 'fs'

/**
 * A data-state contains
 *  - Translation file(s)    MODEL.test(1.1).csv
 *  - FFL model files(s)     MODEL.test(0.1).ffl
 *  - JBehave story files(s) MODEL(test-v1).story
 *  - Excel matrix files(s)  MODEL(test-v1).xlsx
 *  -
 *
 *  We want to load multiple version files runtime.
 *  Storage is another question
 *  Could load only last 4versions.
 *
 *  model(v1|2|3|4).ffl -> LME
 *  We require state to be changed runtime, Since we update small parts of the model only constantly
 *  And ability to change model also.
 *
 *  TODO: bug in JBehave view while editing FFL.
 *
 *  root
 *  {
 *    version: a
 *  }
 *  is combined with model X uses BaseModel {
 *  will become x_root_value   = null
 *  will become x_root_version = a
 */
function ModelStorage() {
	assembler.then(({ getFFLModelPropertyChanges, insertProperties }) => {
		this.getFFLModelPropertyChanges = getFFLModelPropertyChanges
		this.insertProperties = insertProperties
	})
}

ModelStorage.prototype.getHistory = function(name) {
	return this.getFFLModelPropertyChanges(name).then(function(ok) {
		log.info(ok)
		return ok
	}).catch(function(err) {
		log.error(err)
		throw Error(`Unable to get history for model with name ${name}\m${err.stack}`)
	})
}
/**
 * TODO: WE KNOW FOR ALL VALUES IN THE MODEL WHAT VALUES IT OUTPUTS IN THE MONTOCARLO TEST
 * STORE THESE VALUES,  AND MATCH IT VS UPDATES!!!!!
 * THIS WAY we do not explicitly need a JBehave Test, we can conftront the editor with the changes once he want to edit formula's
 *
 * Variables * FormulaSets[doc|column_trend|column_notrend_user|valuation]
 * So we can create a DELTA-COMPARE between calculations. ALSO internal calculations will be reported
 *
 * document_title: 'Hoi';
 *   column_title: 'Other';
 */
ModelStorage.prototype.saveDelta = function(name, data) {
	const fflPath = path.resolve(`${__dirname}/../../git-connect/resources/${name}.ffl`)
	const compareResults = this.doDeltaCompare(name, fflPath, data)
	if (compareResults.status === 'ok' && compareResults.changes > 0) {
		let i
		const relativeFFLPath = path.relative(`${__dirname}/../../git-connect/resources/`, fflPath)
		const dbEntries = []
		const create_time = new Date().toUTCString()
		const hash = uuid()
		for (i = 0; i < compareResults.compare.updates.length; i++) {
			const update = compareResults.compare.updates[i]
			dbEntries.push([hash, create_time, relativeFFLPath, name, update[1], update[2], update[3]])
		}
		for (i = 0; i < compareResults.compare.inserts.length; i++) {
			const update = compareResults.compare.inserts[i]
			dbEntries.push([hash, create_time, relativeFFLPath, name, update[1], update[2], update[3]])
		}
		for (i = 0; i < compareResults.compare.deletes.length; i++) {
			const update = compareResults.compare.deletes[i]
			dbEntries.push([hash, create_time, relativeFFLPath, name, update[1], update[2], null])
		}
		this.insertProperties(dbEntries).then(function(ok) {
			log.info(ok)
		}).catch(err => {
			if (log.DEBUG) log.error(err)
		})
		return hash
	}
}
ModelStorage.prototype.doDeltaCompare = function(name, fflPath, data) {
	const result = { status: 'fail', changes: 0 }
	if (fs.existsSync(fflPath)) {
		const modelRegister = new Register()
		const fflformat = new FFLToRegister(modelRegister, readFileSync(fflPath, 'utf8'))
		fflformat.parseProperties()
		const otherModelRegister = new Register()
		const otherFFLFormat = new FFLToRegister(otherModelRegister, data)
		otherFFLFormat.parseProperties()
		const dcompare = new DeltaCompareRegister(modelRegister, otherModelRegister)
		const compareResults = dcompare.compare()
		if (log.TRACE) log.trace(compareResults.toString())
		result.status = 'ok'
		result.changes = compareResults.changes
		result.compare = compareResults
	}
	return result
}
exports.ModelStorage = new ModelStorage()