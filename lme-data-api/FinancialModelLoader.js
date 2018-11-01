/**
 * Load FFL models, update Dynamic Swagger docs
 */
import { DEBUG, debug, error, TRACE, trace, warn }                                    from 'log6'
import LMEFacade, { DISPLAY_TYPE, INPUT_NODE_TYPE, OUTPUT_NODE_TYPE, SolutionFacade } from '../lme-core/index'
import fflMath                                                                        from '../math/ffl-math'
import { RegisterPlainFFLDecorator }                                                  from '../ffl/index'
import formulaJs
                                                                                      from '../formulajs-connect/formulajs'
import { ModelListener }                                                              from '../git-connect'
import excelPlugin
                                                                                      from '../excel-connect/excel-connect'
import { basename }                                                                   from 'path'
import SwaggerParser
                                                                                      from '../lme-core/exchange_modules/swagger/swaggerParser'
import { APIDefinition }                                                              from './resources/AuthenticatedSwaggerDefinition'

LMEFacade.registerParser(RegisterPlainFFLDecorator, SwaggerParser)
LMEFacade.addFunctions(fflMath, formulaJs)

const ModelLoader = new ModelListener()

LMEFacade.addFunctions(excelPlugin)
ModelLoader.addListener(async (fflModelData, path) => {
	const pathModelName = basename(path).split('.')[0]

	try {
		const matrix = await excelPlugin.loadExcelFile(pathModelName)

		SolutionFacade.initVariables([{ name: 'MATRIX_VALUES', expression: matrix }])
		if (DEBUG) debug(`Loading model: ${pathModelName} path:${path}`)
		const lmeModel = LMEFacade.initializeFFlModelData(fflModelData, path)
		const modelname = lmeModel.modelName
		const model_version_postfix = lmeModel.model_version ? (`/v${lmeModel.model_version}`) : ''
		const indexer = lmeModel.indexer
		const names = indexer.getIndexNames()

		for (let name in names) APIDefinition.parameters.FigureName.enum.push(modelname + '_' + name)
		/**
		 * Update API-definition with variable names
		 */
		const outputNodes = indexer.find(DISPLAY_TYPE, INPUT_NODE_TYPE).concat(indexer.find('data_options', OUTPUT_NODE_TYPE))
		if (TRACE) trace(`Found output nodes: ${JSON.stringify(outputNodes.map(n => indexer.humanNode(n).name))}`)
		if (outputNodes.length > 0) {
			const inputNodes = indexer.find(DISPLAY_TYPE, INPUT_NODE_TYPE).concat(indexer.find('data_options', INPUT_NODE_TYPE))
			if (TRACE) trace(`Found inputNodes nodes: ${JSON.stringify(inputNodes.map(n => indexer.humanNode(n).name))}`)
			if (outputNodes.length !== inputNodes.length) {
				warn('invalid in and output-nodes ')
				return
			}
			for (let i = 0; i < outputNodes.length; i++) {
				const outputNode = indexer.humanNode(outputNodes[i])
				const inputNode = indexer.humanNode(inputNodes[i])

				const endPointName = `${outputNode.name}${model_version_postfix}`
				const operation = `/figure/${endPointName}`
				if (DEBUG) debug(`Creating operation: ${operation}`)

				if (!APIDefinition.paths[operation]) {

					if (DEBUG) debug(`Adding path: ${operation}`)
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
							'parameters' : [{
								'name'       : endPointName,
								'in'         : 'body',
								'description': '',
								'required'   : false,
								'schema'     : lmeModel.exportSwagger({
									rowId: inputNode.name,
									type : 'input'
								})
							}],
							'responses'  : {
								'200': {
									'description': 'Success',
									'schema'     : lmeModel.exportSwagger({
										rowId: outputNode.name,
										type : 'output'
									})
								}
							}
						}
					}
				} else {
					warn(`Path already exist: ${operation}. Skipping...`)
				}
			}
		}
	} catch (err) {
		if (DEBUG) debug(err.stack)
		error(`Error while loading model: [${pathModelName}]${path} ${err.message}. See debug for the trace`)
	}
})

ModelLoader.initializeModels()
export {
	ModelLoader,
	LMEFacade
}