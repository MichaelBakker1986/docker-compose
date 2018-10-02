import ORM       from './ModelProperty'
import { error } from 'log6'

exports.started = ORM.orm.then(function() {
	exports.insertProperties = ORM.ModelProperty.insertModelProperties
	exports.getFFLModelPropertyChanges = ORM.ModelProperty.getFFLModelPropertyChanges
	exports.getModel = function(modelName) {
		return ORM.ModelProperty.getModel(modelName).then(function(ok) {
			const schemaIndex = {}
			const schema = []
			const constants = []
			const nodes = []
			const index = {}
			ok.map((row) => {
				index[row.var] = index[row.var] || {}
				if (!schemaIndex[row.col]) {
					schemaIndex[row.col] = true
					schema.push(row.col)
				}
				index[row.var][row.col] = row.val
			})
			for (let key in index) {
				const node = []
				for (let i = 0; i < schema.length; i++) {
					const col = schema[i]
					node.push(index[key][col] || null)
				}
				nodes.push(node)
			}
			return {
				schema   : schema,
				nodes    : nodes,
				constants: constants
			}
		}).catch(err => error(err))
	}
}).catch(err => {
	console.error(err)
})