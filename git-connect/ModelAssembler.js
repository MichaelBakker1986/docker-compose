import { ORM }   from './ModelProperty'
import { error } from 'log6'

export const started = ORM.orm.then(() => {
	exports.insertProperties = ORM.ModelProperty.insertModelProperties
	exports.getFFLModelPropertyChanges = ORM.ModelProperty.getFFLModelPropertyChanges
	exports.getModel = (modelName) => {
		return ORM.ModelProperty.getModel(modelName).then((ok) => {
			const schemaIndex = {}
				, schema       = []
				, constants    = []
				, nodes        = []
				, index        = {}

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
			return { schema, nodes, constants }
		}).catch(err => error(err))
	}
}).catch(err => error(err))