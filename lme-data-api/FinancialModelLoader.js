/**
 * Load FFL models, update Dynamic Swagger docs
 */
import { error, warn }               from 'log6'
import LMEFacade, { SolutionFacade } from '../lme-core/index'
import fflMath                       from '../math/ffl-math'
import { RegisterPlainFFLDecorator } from '../ffl/index'
import formulaJs                     from '../formulajs-connect/formulajs'
import { ModelListener }             from '../git-connect'
import excelPlugin                   from '../excel-connect/excel-connect'
import { basename }                  from 'path'
import SwaggerParser                 from '../lme-core/exchange_modules/swagger/swaggerParser'
import { APIDefinition }             from './resources/AuthenticatedSwaggerDefinition'

LMEFacade.registerParser(RegisterPlainFFLDecorator, SwaggerParser)
LMEFacade.addFunctions(fflMath, formulaJs)

const modelLoadListener = new ModelListener()

LMEFacade.addFunctions(excelPlugin)
modelLoadListener.addListener((fflModelData, path) => {
	const pathModelName = basename(path).split('.')[0]
	excelPlugin.loadExcelFile(pathModelName).then((matrix) => {

		SolutionFacade.initVariables([{ name: 'MATRIX_VALUES', expression: matrix }])

		const lmeModel = LMEFacade.initializeFFlModelData(fflModelData, path)
		const modelname = lmeModel.modelName
		const model_version_postfix = lmeModel.model_version ? (`/v${lmeModel.model_version}`) : ''
		const indexer = lmeModel.indexer
		const names = indexer.getIndex('name')

		for (let name in names) APIDefinition.parameters.FigureName.enum.push(modelname + '_' + name)
		/**
		 * Update API-definition with variable names
		 */
		const outputNodes = indexer.find('displaytype', 'Output').concat(indexer.find('data_options', 'Output'))
		if (outputNodes.length > 0) {
			let endPointName
			const inputNodes = indexer.find('displaytype', 'Input').concat(indexer.find('data_options', 'Input'))
			if (outputNodes.length !== inputNodes.length) {
				warn('invalid in and output-nodes ')
				return
			}
			for (let i = 0; i < outputNodes.length; i++) {
				const outputNode = outputNodes[i]
				const inputNode = inputNodes[i]
				endPointName = outputNode[indexer.schemaIndexes.name] + model_version_postfix
				const operation = `/figure/${endPointName}`
				const schema = lmeModel.export('swagger', {
					rowId: inputNode[indexer.schemaIndexes.name],
					type : 'input'
				})
				if (!APIDefinition.paths[operation]) {
					APIDefinition.paths[operation] = {
						'post': {
							'summary'    : endPointName,
							'operationId': endPointName,
							'consumes'   : [
								'application/json'
							],
							'produces'   : [
								'application/json'
							],
							'parameters' : [],
							'responses'  : {
								'200': {
									'description': 'Success',
									'schema'     : {}
								}
							}
						}
					}
				}
				APIDefinition.paths[operation].post.parameters.push({
					'name'       : endPointName,
					'in'         : 'body',
					'description': '',
					'required'   : false,
					'schema'     : schema
				})
			}
			for (let i = 0; i < outputNodes.length; i++) {
				const node = outputNodes[i]
				const swaggerSchema = lmeModel.export('swagger', {
					rowId: node[indexer.schemaIndexes.name],
					type : 'output'
				})
				APIDefinition.paths[`/figure/${endPointName}`].post.responses['200'] = {
					'description': 'Success',
					'schema'     : swaggerSchema
				}
			}
		}
	}).catch((err) => {
		error(`Error while loading model: [${pathModelName}]${path}`, err)
	})
})

modelLoadListener.initializeModels()
exports.ModelLoader = modelLoadListener
exports.LMEFacade = LMEFacade
export default {
	ModelLoader: modelLoadListener,
	LMEFacade
}