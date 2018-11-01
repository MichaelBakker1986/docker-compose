import glob                                 from 'glob'
import { DEBUG, error, TRACE, trace, warn } from 'log6'
import { readFile }                         from 'fs'
import { FILE_SYSTEM_RESOURCES_PATH }       from './ResourceManager'

const fileSystemFFLModelsSearchPath = `${FILE_SYSTEM_RESOURCES_PATH}/**`
const enabledModels = (process.env.ENABLED_MODELS || '.*').split(',')

/**
 * Find FFL models from filesystem and load them.
 * Filtered by {@enabledModels}
 */
function ModelListener() {
	this.listeners = []
}

function enabledModel(caseInsensitiveFileName) {
	for (let i = 0; i < enabledModels.length; i++) {
		const enabledModelName = `/${enabledModels[i]}\\.`
		if (caseInsensitiveFileName.match(new RegExp(enabledModelName, 'i'))) {
			return true
		}
	}
	return false
}

ModelListener.prototype.loadModel = function(file) {
	const self = this
	return function(err, data) {
		if (err) throw err
		let modelData = data
		/**
		 * Windows client is case insensitive.
		 * To load the models directly into linux some case-fixes are required.
		 */
		modelData = modelData
		.replace(/amount/gmi, 'Amount')
		.replace(/GoodWill/gmi, 'GoodWill')
		.replace(/MatrixLookup/gmi, 'MatrixLookup')
		.replace(/Startdate/gmi, 'StartDate')
		.replace(/Bookvalue/gmi, 'BookValue')
		.replace(/LiquidVATonCashExpenses/gmi, 'LiquidVATOnCashExpenses')
		.replace(/DiscountRateTaxShieldBasis/gmi, 'DiscountRateTaxShieldBasis')
		.replace(/krWirtschaftlichesEigenKapitalRating/gmi, 'krWirtschaftlichesEigenKapitalRating')
		.replace(/OtherTransitionalAssets/gmi, 'OtherTransitionalAssets')
		.replace(/LiquidVATonCashExpenses/gmi, 'LiquidVATOnCashExpenses')

		try {
			self.onNewModel(modelData, file.toString())
		} catch (err) {
			log.warn('Failed to load model on path [%s] \nSee DEBUG logging to see why it has failed to load the model.', file.toString())
			if (DEBUG) error(err)
		}
	}
}
ModelListener.prototype.initializeModels = function() {
	const self = this
	const fileLookupCallback = (err, files) => {
		if (err) warn('Error', err)
		else {
			files.forEach(file => {
				const caseInsensitiveFileName = file.toLowerCase()
				//filter files other than *.ffl or containing _tmp_
				if (caseInsensitiveFileName.endsWith('.ffl') && caseInsensitiveFileName.indexOf('_tmp_') === -1) {
					if (enabledModel(caseInsensitiveFileName)) {
						readFile(file, 'utf8', self.loadModel(file))
					}
				}
			})
		}
	}
	glob(fileSystemFFLModelsSearchPath, fileLookupCallback)
}
ModelListener.prototype.addListener = function(listener) {
	this.listeners.push(listener)
}
ModelListener.prototype.onNewModel = function(model_data, path) {
	if (TRACE) trace(model_data)
	for (let i = 0; i < this.listeners.length; i++) {
		this.listeners[i](model_data, path)
	}
}
export { ModelListener }