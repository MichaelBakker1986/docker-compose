import { ORM }   from './ModelProperty'
import { error } from 'log6'

export default new Promise((accept, reject) => {

	ORM.then(({ ModelProperty }) => {

		const insertProperties = ModelProperty.insertModelProperties
		const getFFLModelPropertyChanges = ModelProperty.getFFLModelPropertyChanges

		const getModel = (modelName) => {
			return ModelProperty.getModel(modelName).then((ok) => {
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
			}).catch(err => {
				error(err)
				reject(err)
			})
		}
		accept({ getModel, insertProperties, getFFLModelPropertyChanges })
	})
})