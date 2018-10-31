import { MatrixStore }            from '../MatrixStore'
import { error }                  from 'log6'
import { LMEFacade, ModelLoader } from '../FinancialModelLoader'
import { getModelAsString }       from '../../git-connect/ResourceManager'

export function setup(app) {
	const ds = new MatrixStore()

	function defaultResponse({ params }, res) {
		const { columncontext, figureName, value, id } = params
		//handle request Async by default, create Promise, result when done.
		new Promise((success, fail) => {
			try {
				const context = ds.getOrCreate(id)
				const column_context = parseInt(columncontext || '0')
				const variable_name = figureName === '{variable}' ? undefined : figureName
				const value = isNaN(value) ? value : parseFloat(value)

				success(LMEFacade.getValue(context, variable_name, column_context, value, undefined))
			} catch (err) {
				fail(err)
			}
		}).then((answer) => res.json(answer))
		.catch((err) => error(err))
	}

	function flatten(key_value, object) {
		Object.keys(object).forEach(key => {
			if (typeof(object[key]) === 'object') flatten(key_value, object[key])
			else {
				if (key_value[key] != null) throw Error('Duplicate value input')
				key_value[key] = object[key]
			}
		})
	}

	function defaultPostResponse({ params, body, originalUrl }, res) {
		const { figureName, id, model_name } = params
		//handle request Async by default, create Promise, result when done.
		new Promise((success, fail) => {
			try {
				let result
				const context = ds.getOrCreate(id)

				let modelPrefix = ''
				if (!model_name) {
					switch (figureName) {
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
					case 'Q_MAP06':
						modelPrefix = 'KSP2'
						break
					default:
						modelPrefix = figureName
					}
				} else {
					modelPrefix = model_name
				}
				modelPrefix = `${modelPrefix.toUpperCase()}_`

				const keyValue = {}
				flatten(keyValue, body)
				Object.keys(keyValue).forEach(key => LMEFacade.getValue(context, modelPrefix + key, 0, keyValue[key], undefined))

				if (figureName === 'LGDCalculationOutputContainer') context.columns = 1
				else if (figureName === 'PRESCAN') context.columns = 1
				else if (figureName === 'FyndooCreditRating') context.columns = 1
				else if (figureName === 'TupleRestModel') context.columns = 1
				else if (figureName === 'KinderSpaarPlan') context.columns = 17
				else if (figureName === 'Q_MAP06') context.columns = 17
				else context.columns = 17
				result = LMEFacade.getObjectValues(context, `${modelPrefix}${figureName}`, undefined)

				if (!result) result = { status: 'failed ' }
				success(result)
			} catch (err) {
				fail(err)
			}
		}).then((answer) => res.json(answer))
		.catch((err) => res.json(err.toString()))
	}

	app.get('*/id/:id/newModel', (req, res) => {
		ModelLoader.onNewModel(getModelAsString('LGD'), `/LGD.ffl`)
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
	app.post('*/:model_name/:version/figure/:figureName', defaultPostResponse)
	app.post('*/figure/:figureName', defaultPostResponse)
	app.post('*/figure/:figureName/:version', defaultPostResponse)
}
