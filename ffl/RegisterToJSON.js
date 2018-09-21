import { Register } from 'lme-core'

export class RegisterToJSON {
	register = null
	hidden_properties = ['desc', 'start', 'end', 'parentId', 'index', 'children']

	constructor(register = new Register) {this.register = register}

	toJSON(root_name = 'root') {
		const register = this.register
		const rootNode = register.findByName(root_name)
		const rows = []
		const indexes = register.schemaIndexes
		const schema = register.schema.filter((val) => this.hidden_properties.indexOf(val) === -1)
		const variable_schema = schema.map(property_name => indexes[property_name])
		register.walk(rootNode, 0, (variable) => rows.push(
			variable_schema.map(schema_index => variable[schema_index])
		))
		return { schema, rows }
	}

	fromJSON(json_register) {
		const register = this.register
		register.clean()
		register.addColumns(json_register.schema)
		register.addColumn('tree_index')
		const children_index = register.schemaIndexes.children
		json_register.rows.forEach(row => {
			register.initRow([null, null, null, row[0]], [{
				val: [],
				col: 'children'
			}, ... row.map((val, index) => ({ val, col: json_register.schema[index] }))])
		})
		register.iterateRows('tree_index', (index, row, parent, tree_index = 0) => {
			parent[children_index][tree_index] = row
		})
		return register
	}
}