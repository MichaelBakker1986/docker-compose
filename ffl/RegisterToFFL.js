/**
 * Used in front-end to reassemble the FFL file when needed.
 * extract underlying data-model
 * make an register, schema - indexed with array values
 * Can expand while adding more properties and keeps its integrity
 * schema and nodes
 * re-use over implementations
 * @param {Register} register
 */
function RegisterToFFL(register) {
	this.schema = register.schema
	this.constants = register.constants
	register.createIndex('name')
	this.vars = register.getIndex('name')
	this.child = {}
	this.nameIndex = register.schemaIndexes.name
	this.descIndex = register.schemaIndexes.desc
	this.startIndex = register.schemaIndexes.start
	this.endIndex = register.schemaIndexes.end
	this.tree_index = register.schemaIndexes.tree_index
	this.parentNameIndex = register.schemaIndexes.parentId
	this.stringIndex = register.schemaIndexes.index
	this.modifierIndex = register.schemaIndexes.modifier
	this.referstoIndex = register.schemaIndexes.refersto
	this.tupleIndex = register.schemaIndexes.tuple
	this.displaytypeIndex = register.schemaIndexes.displaytype
	this.visibleIndex = register.schemaIndexes.visible
	this.decimalsIndex = register.schemaIndexes.fixed_decimals
	this.datatypeIndex = register.schemaIndexes.datatype
	this.frequencyIndex = register.schemaIndexes.frequency
	this.options_titleIndex = register.schemaIndexes.options_title
	this.formulaindex = register.schemaIndexes.formula
	this.lockedIndex = register.schemaIndexes.locked
	this.requiredIndex = register.schemaIndexes.required
	this.childIndex = register.schemaIndexes.children
	this.schema_indexes = register.schemaIndexes
	const { name, modifier, refersto, tuple } = register.schemaIndexes
	this.output = ''
	this.delimiter = ';'
	this.line_delimiter = '\n'
	//some properties are generated for the tree structure, and cannot be changes manually
	this.variableProperties = [name, modifier, refersto, tuple]
	this.hiddenProperties = [this.startIndex, this.endIndex, this.tree_index, this.stringIndex, this.schema.indexOf('version'), this.schema.indexOf('type'), this.schema.indexOf('parent_name'), this.parentNameIndex, this.childIndex, this.descIndex]
	this.indents = []
	const depth = 30
	for (let i = 0; i < depth; i++) this.indents[i] = new Array(i).join(' ')
	this.relevant = []
	for (let i = 0; i < this.schema.length; i++) {
		if ((this.hiddenProperties.indexOf(i) === -1) && (this.variableProperties.indexOf(i) === -1)) {
			this.relevant.push(i)
		}
	}
	//creating indents + brackets
	const shiftindent = []
	for (let i = 0; i < depth; i++) {
		shiftindent[i] = []
		for (let j = 0; j <= i; j++) {
			let item = []
			for (let k = 0; k <= j; k++) {
				item.push(new Array(i - k).join(' '))
				item.push('}\n')
			}
			shiftindent[i][j] = item.join('')
		}
	}

	this.shiftindent = shiftindent
	const formulas = ['valid', 'title', 'hint', 'locked', 'visible', 'required', 'choices']
	this.formulaIndexes = formulas.map(formula => register.schemaIndexes[formula])
	this.defaultValues = []
	this.defaultValues[this.visibleIndex] = {
		undefined: true,
		null     : true,
		'1.0'    : true,
		'1'      : true,
		'true'   : true,
		'On'     : true
	}
	this.defaultValues[this.lockedIndex] = {
		undefined: true,
		null     : true,
		'0.0'    : true,
		'0'      : true,
		'false'  : true,
		'Off'    : true,
		'No'     : true
	}
	this.defaultValues[this.requiredIndex] = this.defaultValues[this.lockedIndex]
}

RegisterToFFL.prototype.toGeneratedCommaSeperated = function(rooNodeName = 'root') {
	const { delimiter, hiddenProperties, indents, vars } = this
	const lines = []
	this.walk(vars[rooNodeName], 0, (variable, depth) => lines.push([indents[depth], variable.filter((value, index) => hiddenProperties.indexOf(index) === -1)].join(delimiter)))
	this.output = lines.join(this.line_delimiter)
	return this.output
}
RegisterToFFL.prototype.toCSV = function({ rootVariableName = 'root' }) {
	const { delimiter, hiddenProperties, vars, schema } = this
	return [
		schema.filter((value, index) => hiddenProperties.indexOf(index) === -1).join(delimiter),
		... this.walk(vars[rootVariableName], 0, variable => variable.filter((value, index) => hiddenProperties.indexOf(index) === -1).join(delimiter))
	]
}
RegisterToFFL.prototype.walk = function(node, depth, visitor, initial = []) {
	initial.push(visitor(node, depth))
	const c = node[this.childIndex]
	for (let i = 0; i < c.length; i++) this.walk(c[i], depth + 1, visitor, initial)
	return initial
}
RegisterToFFL.prototype.validate = function(line) {
	return (this.schema.length - this.hiddenProperties.length) === ((line.match(/;/g) || []).length + 1)
}
/**
 *  Complex situation.
 *  Convert Register to FFL.
 *    -- internationalization happens here, 'constants'
 */
RegisterToFFL.prototype.toGeneratedFFL = function({ rootVariableName = 'root', noChildren = false, auto_join = false }) {
	const formattedFFL = []
	const traverse = !noChildren
	const { modifierIndex, nameIndex, indents, constants, relevant, schema, shiftindent, tupleIndex } = this
	const { type, title = nameIndex, refersto } = this.schema_indexes
	const tuple = 'tuple ', variable = 'variable ', model = 'model ', ref_postfix = ' refers to '

	let curr_depth = 0
	const rootNode = this.vars[rootVariableName]

	const visitor = function(node, depth) {
		const items = []
		const model_node = node[type] === 'm'
		if (curr_depth >= depth) items.push(shiftindent[curr_depth][(curr_depth - depth)])
		items.push(indents[depth])
		items.push(node[tupleIndex] ? tuple : (model_node ? model : variable))
		items.push(node[modifierIndex] || '')
		items.push(model_node ? node[title] + ' uses BaseModel' : node[nameIndex])
		if (refersto !== -1 && node[refersto]) items.push(ref_postfix, node[refersto])
		items.push('\n', indents[depth])

		const props = []
		for (let i = 0; i < relevant.length; i++) {
			const real = relevant[i]
			if (node[real]) props.push([indents[depth + 1], schema[real], ': ', node[real], ';'].join(''))
		}
		if (props.length > 0) items.push('{\n', props.join('\n'))
		else items.push('{')
		curr_depth = depth
		formattedFFL.push(items.join(''))
	}
	if (rootNode != null) {
		if (traverse) this.walk(rootNode, 1, visitor)
		else visitor(rootNode, 1)
		formattedFFL.push(shiftindent[curr_depth][curr_depth - 1])
		if (!rootVariableName) formattedFFL.shift()
	}
	const translated = formattedFFL.map(ffl => ffl.replace(/__(\d+)/gm, $1 => constants[parseInt($1.substring(2))]))
	return auto_join ? translated.join('\n') : translated
}
export { RegisterToFFL }