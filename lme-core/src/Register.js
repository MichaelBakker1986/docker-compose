/**
 * All indexed will be linked to a array of values, like a DB structure
 * Creating a simple-typed DB is easy. When this functionality in growing exponentially introduce in memory-db..
 * For now this is a easy data-structure for many problems. very close to JS/NodeJS
 * @constructor
 */
class Register {

	constructor(schema_defaults = ['desc', 'start', 'end', 'name', 'index', 'modifier', 'parentId', 'tuple', 'refersto', 'tree_index', 'children', 'valid', 'title', 'type', 'parent_name']) {//expect 'valid' to exist) {

		this.header = ''
		this.schema = []
		this.createdIndexes = []
		this.schema_defaults = []
		this.changes = []

		this.schema_defaults = schema_defaults
		this.clean()
	}

	clean() {
		this.header = null
		this.constants = []
		this.formatters = []
		for (let j = 0; j < this.createdIndexes.length; j++) delete this[this.createdIndexes[j]]
		this.createdIndexes = []
		this.schema.length = 0
		this.i = []
		this.schemaIndexes = {}
		//somehow 'valid' is a real important property
		//{{MODEL_VARIABLENAME_undefined}} will exist when 'valid' is not added to the list here. (since valid is created on demand in RegisterToLMEParser
		//Something alike if (VARIABLENAME.pattern) VARIABLENAME.valid = if(VARIABLENAME.test(VARIABLENAME),'','Invalid Input')
		//therefore adding the property 'valid 'too late while parsing.
		for (let j = 0; j < this.schema_defaults.length; j++) this.addColumn(this.schema_defaults[j])
	}

	setFormatters(formatters) {
		for (let i = 0; i < formatters.length; i++) this.formatters[i] = formatters[i]
	}

	findByName(n) {
		return this.getNames()[n]
	}

	getNames() {
		return this.getIndex('name')
	}

	getIndexNames() {
		return this.getNames()
	}

	getIndex(name) {
		if (!this[name]) this.createIndex(name)
		return this[name]
	}

	humanNode(row) {
		return row.reduce((acc, cur, i) => {
			acc[this.schema[i]] = cur
			return acc
		}, {})
	}

	lastRowIndex() {
		return this.i.length - 1
	}

	addColumns(names) {
		names.forEach(name => this.addColumn(name))
	}

	addColumn(name) {
		if (this.schemaIndexes[name] == null) {
			this.schemaIndexes[name] = this.schema.length
			this.schema.push(name)
		}
	}

	removeColumn(name) {
		const schemaIds = this.schemaIndexes
		if (schemaIds[name] != null) {
			const index = schemaIds[name]
			for (let i = 0; i < this.i.length; i++) {
				this.i[i].splice(index, 1)
			}
			delete schemaIds[name]
			this.schema.splice(index, 1)
			this.schema.forEach((el, i) => schemaIds[el] = i)
		}
	}

	flush() {
		for (let i = 0; i < this.i.length; i++) this.i[i].length = this.schema.length
	}

	value(idx, key, value) {
		this.i[idx][this.schemaIndexes[key]] = value
	}

	setValue(name, key, value) {
		let row_index = this.getNames()[name][this.schemaIndexes.index]
		this.i[row_index][this.schema.indexOf(key)] = value
	}

	getValue(name, key) {
		let row_index = this.getNames()[name][this.schemaIndexes.index]
		return this.i[row_index][this.schema.indexOf(key)]
	}

	findStream(key, value, start) {
		return this.find(key, value, this.mark)
	}

	find(key, value, start) {
		const result = []
		for (let i = (start || 0); i < this.i.length; i++) if (this.i[i][this.schemaIndexes[key]] === value) result.push(this.i[i])
		return result
	}

	distinct(schema, start) {
		return this.distinctArr(this.i, schema, start || this.mark)
	}

	distinctArr(arr, schema, start) {
		const result = []
		const combi = {}
		const schemaIndexes = this.schemaIndexes
		const distinctIndex = schema.map((el) => schemaIndexes[el])
		for (let i = (start || 0); i < arr.length; i++) {
			const row = arr[i]
			let key = ''
			for (let j = 0; j < distinctIndex.length; j++) key += '_' + row[distinctIndex[j]]
			if (!combi[key]) {
				result.push(row)
				combi[key] = true
			}
		}
		return result
	}

//can only be unique indexes, string based.
	addIndex(name) {
		this.createIndex(name)
		return this[name]
	}

//can only be unique indexes, string based.
	createIndex(name) {
		if (!this[name]) {
			this.createdIndexes.push(name)
			const index = {}, i = this.i, ni = this.schemaIndexes[name]
			for (let c = 0; c < i.length; c++) index[i[c][ni]] = i[c]
			this[name] = index
		}
	}

//this will also update indexes...
	addRowSave(row) {
		this.i.push(row)
		for (let i = 0; i < this.createdIndexes.length; i++) {
			const index = this.createdIndexes[i]
			this[index][row[this.schemaIndexes[index]]] = row
		}
		return this.i.length - 1
	}

//insert (quick)
	addRows(rows) {
		return rows.map(row => this.addRow(row))
	}

	initRows(rows) {
		return rows.map(([row, extra]) => this.initRow(row, extra))
	}

	_mergeArrayProperties(row, extra) {
		const indexes = this.schemaIndexes
		return extra.reduce((init, { col, val }) => {
			init[indexes[col]] = val
			return init
		}, row)
	}

	_mergeObjectProperties(row, extra) {
		const indexes = this.schemaIndexes
		for (let prop in extra) {
			row[indexes[prop]] = extra[prop]
		}
		return row
	}

	initRow(row, extra = []) {
		if (Array.isArray(extra)) {
			return this.addRow(this._mergeArrayProperties(row, extra))
		} else {
			return this.addRow(this._mergeObjectProperties(row, extra))
		}
	}

	addRow(row) {
		this.i.push(row)
		return this.i.length - 1
	}

	/*Inheritance belongs to the Register! this data-structure supports it. DB+Inheritance data-model */
	inheritProperty(name, paramIndex) {
		const variable = this.getIndex('name')[name]
		if (variable[paramIndex]) return variable[paramIndex]
		if (variable[this.schemaIndexes.refersto]) return this.inheritProperty(variable[this.schemaIndexes.refersto], paramIndex)
		return ''
	}

	doProx(name, metaData, param) {
		const register = this
		const variable = this.getIndex('name')[name]
		Object.defineProperty(metaData, 'value', {
			set: (value) => {
				variable[param] = value
				register.changes.push({ name, param })
			},
			get: () => register.inheritProperty(name, param)
		})
	}

	createInformationObject(name, hidden) {
		const variable = []
		for (let paramIndex = 0; paramIndex < this.schema.length; paramIndex++) {
			let propertyName = this.schema[paramIndex]

			if (hidden.indexOf(paramIndex) !== -1) continue
			const metaData = { name: propertyName }
			this.doProx(name, metaData, paramIndex)
			variable.push(metaData)
		}
		return variable
	}

	getAll(name) {
		const r = [], index = this.i, indexpos = this.schemaIndexes[name]
		for (let i = 0; i < index.length; i++) r[i] = index[i][indexpos]
		return r
	}

	walk(node, depth, visitor) {
		visitor(node, depth)
		const children = node[this.schemaIndexes.children]
		for (let i = 0; i < children.length; i++) this.walk(children[i], depth + 1, visitor)
	}

	print(idxMap, start, filter) {
		return this.printArr(this.i, idxMap, this.mark || start, filter)
	}

	printArr(arr, idxMap, start, filter) {
		filter = filter || []
		const tout = []
		const self = this
		const filtermap = []
		for (let i = 0; i < filter.length; i++) filtermap[this.schemaIndexes[filter[i]]] = true
		const f = function(el, idx) {
			return filtermap[idx]
		}
		for (let i = (start || 0); i < arr.length; i++) {
			const el = arr[i]
			tout.push((filter.length > 0 ? el.filter(f) : el).map(function(innerEl, idx) {
				const v = self.formatters[idx] ? self.formatters[idx](innerEl) : innerEl
				const prefix = []
				prefix.length = Math.max(idxMap[idx] - String(v).length, 0)
				return String(v).slice(0, idxMap[idx] - 1) + prefix.join(' ')
			}).join('|'))
		}
		return tout
	}

	translateKeys(formula) {
		const constants = this.constants
		return formula.replace(/__(\d+)/gm, ($1, $2) => constants[parseInt($2)]) || ''
	}

	iterateRows(addition_property, stream) {
		const names = this.getNames(), parent_name_index = this.schemaIndexes.parent_name,
		      extra                                      = this.schemaIndexes[addition_property],
		      root                                       = names.root
		this.i.filter(row => row[this.schemaIndexes.name] !== 'root').forEach((row, index) => stream(index, row, names[row[parent_name_index]] || root, row[extra]))
	}

	/** * mark current moment as last checkpoint */
	markNow() {
		this.mark = this.i.length
	}

	size() {
		return this.i.length
	}

	toString() {
		return `variables:[${this.i.length}]\nSchema:[${this.schema.map((el, i) => el + ':' + i).join(',')}]\n${this.i.join('\n')}`
	}

}

export { Register }