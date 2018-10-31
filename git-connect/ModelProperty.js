import orm from 'orm'
import log from 'log6'

const dbConnectString = process.env.FIGURE_DB_STRING || 'postgresql://postgres:postgres@127.0.0.1:5432/lme'
export const ORM = new Promise((accept, reject) => {

	orm.connectAsync(dbConnectString).then(async (db) => {
		console.info(`Connected with database ${db}`)
		db.use(require('orm-timestamps'), {
			createdProperty : 'created_at',
			modifiedProperty: 'modified_at',
			expireProperty  : false,
			dbtype          : { type: 'date', time: true },
			now             : function() {
				return new Date()
			},
			persist         : true
		})
		const ModelProperty = db.define('model_property', {
			uuid       : String,
			create_time: { type: 'date', time: true },
			model_name : String,
			model_path : String,
			var        : String,
			col        : String,
			val        : String
		}, {
			methods: {
				insertModelProperty       : function(uuid, create_time, modelName, variableName, property, value) {
					return new Promise(function(ok, fail) {
						let sql = 'INSERT INTO model_property (uuid,create_time,model_path,model_name,var,col,val) VALUES (?,?,?,?,?,?)'
						db.driver.execQuery(sql, [uuid, create_time, modelName, variableName, property, value], function(err, result) {
							if (err) return fail(err)
							ok(result)
						})
					})
				},
				getModel                  : function(name) {
					return new Promise(function(ok, fail) {
						const sql = `SELECT * FROM model_property where model_name = '${name}'`
						db.driver.execQuery(sql, function(err, result) {
							if (err) return fail(err)
							ok(result)
						})
					})
				},
				getFFLModelPropertyChanges: function(name) {
					return new Promise(function(ok, fail) {
						const sql = `SELECT * FROM model_property where model_name = '${name}'`
						db.driver.execQuery(sql, function(err, result) {
							if (err) return fail(err)
							ok(result)
						})
					})
				},
				insertModelProperties     : function(entries) {
					return new Promise(function(ok, fail) {
						//uuid, modelName, variableName, property, value
						let sql = 'INSERT INTO model_property (uuid,create_time,model_path,model_name,var,col,val) VALUES' + entries.map(a => {
							return '(\'' + a.join('\',\'') + '\')'
						}).join(',').replace(/''/gm, 'null')
						db.driver.execQuery(sql, function(err, result) {
							if (err) return fail(err)
							ok(result)
						})
					})
				}
			}
		}, {
			timestamp: true
		})

		const modelProperty = new ModelProperty()
		db.sync(async (err) => {
			if (err) throw err
			const dbSchema = { model_property: ['uuid', 'create_time', 'model_path', 'model_name', 'var', 'col', 'val'] }
			//create indexes on psql databases
			if (db.driver.dialect !== 'mysql') {
				for (let table in dbSchema) {
					for (let i = 0; i < dbSchema[table].length; i++) {
						const column = dbSchema[table][i]
						const sql = `CREATE INDEX IF NOT EXISTS idx_${table}_${column} ON ${table} (${column});`
						db.driver.execQuery(sql, [], function(err) {
							if (err) throw err
						})
					}
				}
			}
		})

		accept({ ModelProperty: modelProperty })

	}).catch((err) => {
		log.error(err)
		reject(err)
	})
})