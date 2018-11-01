import { Register }                                                                 from '../../lme-core/index'
import { DeltaCompareRegister, FFLToRegister }                                      from '../../ffl/index'
import uuid                                                                         from 'uuid4'
import { DEBUG, error, info, TRACE, trace }                                         from 'log6'
import path                                                                         from 'path'
import assembler
                                                                                    from '../../git-connect/ModelAssembler'
import { existsModel, FILE_SYSTEM_RESOURCES_PATH, getModelPath, readModelAsString } from '../../git-connect/index'

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

ModelStorage.prototype.getHistory = (name) => {
	return this.getFFLModelPropertyChanges(name).then((ok) => {
		info(ok)
		return ok
	}).catch((err) => {
		error(err)
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
ModelStorage.prototype.saveDelta = function(model_name, data) {
	const fflPath = getModelPath({ model_path: model_name })
	const compareResults = this.doDeltaCompare(model_name, data)
	if (compareResults.status === 'ok' && compareResults.changes > 0) {
		let i
		const relativeFFLPath = path.relative(FILE_SYSTEM_RESOURCES_PATH, fflPath)
		const dbEntries = []
		const create_time = new Date().toUTCString()
		const hash = uuid()
		for (i = 0; i < compareResults.compare.updates.length; i++) {
			const update = compareResults.compare.updates[i]
			dbEntries.push([hash, create_time, relativeFFLPath, model_name, update[1], update[2], update[3]])
		}
		for (i = 0; i < compareResults.compare.inserts.length; i++) {
			const update = compareResults.compare.inserts[i]
			dbEntries.push([hash, create_time, relativeFFLPath, model_name, update[1], update[2], update[3]])
		}
		for (i = 0; i < compareResults.compare.deletes.length; i++) {
			const update = compareResults.compare.deletes[i]
			dbEntries.push([hash, create_time, relativeFFLPath, model_name, update[1], update[2], null])
		}
		this.insertProperties(dbEntries).then((ok) => {
			info(ok)
		}).catch(err => {
			if (DEBUG) error(err)
		})
		return { hash, changes: dbEntries }
	}
}
ModelStorage.prototype.doDeltaCompare = function(model_name, data) {
	const result = { status: 'fail', changes: 0 }
	if (existsModel(model_name)) {
		const modelRegister = new Register
		const ffl_format = new FFLToRegister(modelRegister, readModelAsString({ model_name }))
		ffl_format.parseProperties()
		const otherModelRegister = new Register
		const otherFFLFormat = new FFLToRegister(otherModelRegister, data)
		otherFFLFormat.parseProperties()
		const delta_compare = new DeltaCompareRegister(modelRegister, otherModelRegister)
		const compareResults = delta_compare.compare()
		if (TRACE) trace(compareResults.toString())
		result.status = 'ok'
		result.changes = compareResults.changes
		result.compare = compareResults
	}
	return result
}
export default new ModelStorage()