import { MatrixStore } from '../MatrixStore'
import { error, warn } from 'log6'
import ModelLoader     from '../FinancialModelLoader'

const LMEFacade = ModelLoader.LMEFacade

module.exports.setup = function(app) {
	var ds = new MatrixStore()

	function defaultResponse(req, res) {
		//handle request Async by default, create Promise, result when done.
		new Promise(function(success, fail) {
			try {
				var context = ds.getOrCreate(req.params.id)
				var columncontext = parseInt(req.params.columncontext || '0')
				var variablename = req.params.figureName === '{variable}' ? undefined : req.params.figureName
				var value = isNaN(req.params.value) ? req.params.value : parseFloat(req.params.value)

				success(LMEFacade.getValue(context, variablename, columncontext, value, undefined))
			} catch (err) {
				fail(err)
			}
		}).then(function(answer) {
			res.json(answer)
		}).catch(function(err) {
			error(err)
		})
	}

	function flatten(keyvalue, object) {
		for (var key in object) {
			if (typeof(object[key]) === 'object') flatten(keyvalue, object[key])
			else {
				if (keyvalue[key] != null) throw Error('Duplicate value input')
				keyvalue[key] = object[key]
			}
		}
	}

	function defaultPostResponse(req, res) {
		//handle request Async by default, create Promise, result when done.
		new Promise(function(success, fail) {
			try {
				const body = req.body

				let result
				var context = ds.getOrCreate(req.params.id)
				const url = req.originalUrl
				const outputNodeName = req.params.figureName
				const version = req.params.version || ''
				/**
				 * TODO: find generic way to map the Output node to the model name
				 */
				let modelPrefix = ''
				switch (outputNodeName) {
				case 'PRESCAN':
					modelPrefix = 'PRESCAN'
					break
				case 'FyndooCreditRating':
					modelPrefix = 'FyndooCreditRating'
					break
				case 'TupleRestModel':
					modelPrefix = 'TupleRestModel'
					break
				case 'LGDCalculationOutputContainer':
					modelPrefix = 'LGD'
					break
				case 'KinderSpaarPlan':
					modelPrefix = 'KSP'
					break
				default:
					modelPrefix = outputNodeName
				}
				modelPrefix = modelPrefix.toUpperCase() + '_'

				//This is very very basic, rewrite required.

				const keyValue = {}
				flatten(keyValue, body)
				for (let key in keyValue) {
					LMEFacade.getValue(context, modelPrefix + key, 0, keyValue[key], undefined)
				}
				/**
				 * TODO: find generic way to map the Output node to the model name
				 */
				if (outputNodeName === 'LGDCalculationOutputContainer') context.columns = 1
				else if (outputNodeName === 'PRESCAN') context.columns = 1
				else if (outputNodeName === 'FyndooCreditRating') context.columns = 1
				else if (outputNodeName === 'TupleRestModel') context.columns = 1
				else if (outputNodeName === 'KinderSpaarPlan') context.columns = 17
				else warn('Invalid rest api call ' + url)
				result = LMEFacade.getObjectValues(context, modelPrefix + outputNodeName, undefined)

				if (!result) result = { status: 'failed ' }
				success(result)
			} catch (err) {
				fail(err)
			}
		}).then(function(answer) {
			res.json(answer)
		}).catch(function(err) {
			res.json(err.toString())
		})
	}

	app.get('*/id/:id/newModel', function(req, res) {
		ModelLoader.ModelLoader.onNewModel(require('fs').readFileSync(__dirname + '/../../git-connect/resources/LGD.ffl', 'utf8'), __dirname + '/../../git-connect/resources/LGD.ffl')
		res.json({ 'status': 'ok' })
	})
	/**
	 * UserName/value/MaxNrCompensatedHoursOutofSchoolCare/101
	 * @:id            - (any context to identify the process  username/processid/requestId
	 * @:figure        - (figure e.g. CREDIT / DEBIT / Q_ROOT)
	 * @:columncontext - (index in a range for corresponding request)
	 * @:tupleindex    - (string name of tuple object)
	 * @:value         - (new user value)
	 */
	app.get('*/id/:id/figure/:figureName', defaultResponse)
	app.post('*/id/:id/figure/:figureName/value/:value', defaultResponse)

	app.post('*/id/:id/figure/:figureName/:version', defaultPostResponse)
	app.post('*/id/:id/figure/:figureName', defaultPostResponse)
	app.post('*/figure/:figureName', defaultPostResponse)
	app.post('*/figure/:figureName/:version', defaultPostResponse)
}
