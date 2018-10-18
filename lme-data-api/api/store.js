/**
 * TODO: this class requires Unit-tests for internal logic. The lack of array.map is noticeable
 * While calculating in front-end.
 * There is a need to store/retrieve values entered by the client
 */
// || "postgresql://postgres:postgres@127.0.0.1:5432/lme";
import { Figure }             from './Figure'
import uuid                   from 'uuid4'
import { debug, DEBUG, warn } from 'log6'
import { MatrixStore }        from '../MatrixStore'

const dbConnectString = process.env.FIGURE_DB_STRING

export function setup(app) {
	if (!dbConnectString) return//early exit (no db)
	const ds = new MatrixStore()

	/**
	 * Retrieve entered values supplied by the client
	 */
	let FinancialFigures
	Figure.then(({ Figures }) => {
		FinancialFigures = Figures
	}).catch((err) => {
		throw Error(`Fail db initializeFFlModelData ${err.stack}`)
	})
	function fetchDatabaseFigures(promise, req, res) {
		//TODO: move logic to the matrixStore, not pairing with rest-api now
		promise.then((dbData) => {
			//TODO: use array.map....
			const values = {}
			for (let i = 0; i < dbData[0].length; i++) {
				const obj = dbData[0][i]
				const hash = obj.var + '#' + obj.col
				values[hash] = {
					value: obj.val
				}
			}
			//TODO: use array.map....
			const parents = []
			for (let dbParentsIndex = 0; dbParentsIndex < dbData[1].length; dbParentsIndex++) {
				let dbParentRow = dbData[1][dbParentsIndex]
				parents.push({
					id         : dbParentRow.uuid,
					create_date: dbParentRow.create_time.getTime()
				})
			}
			res.json({
				status : 'succes',
				id     : req.params.id,
				parents: parents,
				values : values
			})
		}).catch((err) => {
			if (DEBUG) warn('error while resolving figures:', err)
			req.json({
				id     : req.params.id,
				status : 'fail',
				message: err.toString(),
				values : []
			})
		})
	}

	app.get('*/scenario/:ids', function(req, res) {
		fetchDatabaseFigures(new FinancialFigures().getScenarioFigures(req.params.ids.split(',')), req, res)
	})
	app.get('*/id/:userId/data/:id', function(req, res) {
		if (req.params.id.indexOf(',') > -1) {
			fetchDatabaseFigures(new FinancialFigures().getScenarioFigures(req.params.id.split(',')), req, res)
		} else {
			fetchDatabaseFigures(new FinancialFigures().getFigures(req.params.id), req, res)
		}
	})
	/**
	 * Quick solution to test if share-data works
	 */
	app.get('*/id/:userId/shareData/:token', function(req, res) {
		res.set('x-share-id', req.params.token)
		res.json({
			status: 'success'
		})
	})
	/**
	 * Store entered values supplied by the client
	 */
	app.post('*/id/:userId/saveUserData/:token', function(req, res) {
		const now = new Date()
		const newChildId = uuid()
		const parentUuid = req.params.token
		const dbData = []
		for (let i = 0; i < req.body.data.length; i++) {
			const entry = req.body.data[i]
			dbData.push([newChildId, entry.varName, entry.colId, entry.value])
		}
		new FinancialFigures().insertFigures(parentUuid, newChildId, dbData, now).then(function(data) {
			//tell the response a new hash should be added to the current user calling this method.
			res.set('x-auth-id', newChildId)
			res.json({
				status   : 'success',
				saveToken: newChildId
			})
		}).catch((err) => {
			if (DEBUG) warn('Error while inserting figures:', err)
			res.json({
				status : 'fail',
				message: err.toString()
			})
		})
	})
}