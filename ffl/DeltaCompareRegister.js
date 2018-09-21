/**
 * We only want to store delta's from models in the database
 * Therefore we require a comparator between two models
 * returns an action list for current state to update into other state.
 *
 * A compare has three categories.
 1) UPDATES
 2) INSERTS
 3) REMOVES
 */
import 'array.equals'

export default class DeltaCompareRegister {

	_source_to_target_property_map = []
	_target_to_source_property_map = []
	_updates = []
	_inserts = []
	_deletes = []
	_changes = 0

	constructor(source_register, target_register) {
		this.source_register = source_register
		this.target_register = target_register
	}

	addChange(changeType, property_name, var_name, value) {
		this['_' + changeType].push([changeType, var_name, property_name, value])
		this._changes++
	}

	compare() {
		this.buildSchema()
		this.checkInserts()
		this.checkDeletes()
		return this
	}

	buildSchema() {
		this.source_schema = this.source_register.schema.slice()
		this.target_schema = this.target_register.schema.slice()
		const max_schema_length = Math.max(this.source_schema.length, this.target_schema.length)
		const source_schema = this.source_register.schemaIndexes, target_schema = this.target_register.schemaIndexes
		this.source_schema.length = max_schema_length
		this.target_schema.length = max_schema_length

		for (let i = 0; i < max_schema_length; i++) {
			this._source_to_target_property_map[source_schema[this.source_schema[i]]] = target_schema[this.source_schema[i]]
			this._target_to_source_property_map[target_schema[this.target_schema[i]]] = source_schema[this.target_schema[i]]
		}
	}

	checkInserts() {
		const indexes = this.target_register.schemaIndexes
		const hidden_keys = new Set([indexes.parentId, indexes.index, indexes.children])
		const source_variables = this.source_register.getIndex('name')
		const target_variables = this.target_register.getIndex('name')
		//check inserts and updates
		const target_variable_names = Object.keys(target_variables)
		for (let variable_name of target_variable_names) {
			const source_variable = source_variables[variable_name], target_variable = target_variables[variable_name]
			if (!source_variable) {
				//INSERT every property for the variable
				for (let target_property_index = 3; target_property_index < target_variable.length; target_property_index++) {
					const target_property = target_variable[target_property_index]
					if (hidden_keys.has(target_property_index) || target_property == null) continue
					this.addChange('inserts', this.target_schema[target_property_index], variable_name, target_property)
				}
			} else {
				for (let target_property_index = 3; target_property_index < target_variable.length; target_property_index++) {
					if (hidden_keys.has(target_property_index)) continue
					const sourceProperty = source_variable[this._target_to_source_property_map[target_property_index]]
					const targetProperty = target_variable[target_property_index]
					if (sourceProperty == null && targetProperty != null) {
						this.addChange('inserts', this.target_schema[target_property_index], variable_name, targetProperty)
					} else if (sourceProperty !== targetProperty && targetProperty != null && !Array.isArray(sourceProperty)) {
						this.addChange('updates', this.target_schema[target_property_index], variable_name, targetProperty)
					}
				}
			}
		}
	}

	checkDeletes() {
		const source_variables = this.source_register.getIndex('name')
		const target_variables = this.target_register.getIndex('name')
		//check deletes
		const source_variable_names = Object.keys(source_variables)
		const indexes = this.source_register.schemaIndexes
		const props = this.source_schema.filter((val, i) => i > 3 &&
			i !== indexes.parentId &&
			i !== indexes.index &&
			i !== indexes.children).map(property_name => [indexes[property_name], property_name])

		for (let variable_name of source_variable_names) {
			const source_variable = source_variables[variable_name]
			const target_variable = target_variables[variable_name]
			props.forEach(([source_variable_property_index, source_variable_property_name]) => {
				const source_property = source_variable[source_variable_property_index]
				if (!target_variable) {
					if (source_property != null) this.addChange('deletes', source_variable_property_name, variable_name, null)
				} else {
					const target_property = target_variable[this._source_to_target_property_map[source_variable_property_index]]
					if (target_property == null && source_property != null) {
						this.addChange('deletes', source_variable_property_name, variable_name, null)
					}
				}
			})
		}
	}

	collect = () => [... this._updates, ... this._inserts, ... this._deletes]
	map = (stream) => this.collect().map(stream)
	forEach = (stream) => this.collect().forEach(stream)

	toString() {
		const diff = this.map(change_set => change_set.map(change => change.filter(Boolean).join(';')).join('\n'))
		return ['Changes:' + this._changes, JSON.stringify(this.target_register.schemaIndexes), diff.filter(Boolean).join('\n')].join('\n')
	}
}