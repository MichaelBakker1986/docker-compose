/**
 * Is a FFL quick-formatter (V05 '3.1m chars' 90ms) and is FFL to indexed formatter
 */
function FFLToRegister(register, data, resolve_parent_name = false) {
	this.resolve_parent_name = resolve_parent_name
	this.register = register
	register.addColumns(['desc', 'parent_name'])
	this.vars = register.getIndex('i')
	this.original = data
	this.data = data
	this.reassembled = ''
	this.constants = []
	register.constants = this.constants
	this.comments = []
	this.header = ''
	this.indents = []
	for (let i = 0; i < 30; i++) this.indents[i] = new Array(i).join(' ')
}

/**
 * Extract imports, model name,comments in header
 */
FFLToRegister.prototype.extractHeader = function() {
	this.header = this.original.substring(0, this.original.indexOf('{'))
	//INFO: the header is not indexed.
	this.register.header = this.header
	const headerLines = this.header.split('\n')
	for (let i = 0; i < headerLines.length; i++) {
		const headerLine = headerLines[i].trim()
		let modelName
		if (modelName = headerLine.match(/^\s*model (\w+)/i)) {
			this.name = modelName[1]
			break
		}
	}
}
FFLToRegister.prototype.extractConstants = function() {
	var index = 0
	const constants = this.constants
	this.data = this.data.replace(/"(.*?)"/gm, function($0) {
		constants[++index] = $0
		return '__' + index
	})
}
FFLToRegister.prototype.insertConstants = function() {
	var constants = this.constants
	this.reassembled = this.reassembled.replace(/__(\d+)/gm, function($1, $2) {
		return constants[parseInt($2)]
	})
}
FFLToRegister.prototype.extractComments = function() {
	var comments = {}
	var index = 0
	this.data = this.data.replace(/\/\/.*/gm, function($0) {
		comments[++index] = $0
		return '____' + index
	})
	this.comments = comments
}

FFLToRegister.prototype.removeWhite = function() {
	this.data = this.data.replace(/\s\s+/g, ' ')
	//TODO: parse by properties, not by semicolons
	.replace(/;\s+/g, ';')//7ms of 100ms..(V05) (expensive, but it is removing trailing whitespaces of properties)
}
FFLToRegister.prototype.extractVars = function() {
	var noneexit = true
	var data = this.data
	var index = 0
	const register = this.register
	while (noneexit) {
		noneexit = false
		data = data.replace(/{([^}{]*?)}/gm, function($0, $1, $2) {
			//this happens to many times...
			noneexit = true
			const index = register.addRow([$1, $2, $0.length + $2])
			return '___' + index
		})
	}
}
FFLToRegister.prototype.findRootVariable = function() {
	return this.register.lastRowIndex()

}
FFLToRegister.prototype.buildTree = function() {
	this.extractHeader()
	this.extractConstants()
	this.extractComments()
	this.removeWhite()
	this.extractVars()
	var firstVar = this.findRootVariable()
	this.reassembled = this.prettyFormatFFL(2, firstVar)
	this.insertConstants()
}
FFLToRegister.prototype.walk = function(visit) {
	this.extractHeader()
	this.extractConstants()
	this.extractComments()
	this.removeWhite()
	this.extractVars()
	const firstVar = this.register.lastRowIndex()
	const firstRow = this.vars[firstVar]
	if (firstRow) {
		firstRow[0] = firstRow[0].replace(/^\s*root\s*/gi, 'variable root ').trim()
		//this is a trick, not wrong!. parent and child index are the same to start with root.
		firstRow.push('root', firstVar, null, null, null, null, 0, [], null, this.name, 'm')
		this.walkTree(visit, firstVar, 1)
	}
}
FFLToRegister.prototype.walkTree = function(visit, parentId, depth) {
	const self = this
	const parts = this.vars[parentId][0].trim().split(';')
	const child_index = this.register.schemaIndexes.children
	let children = 0
	if (parts[parts.length - 1] === '') {
		parts.length--
	} else {
		let temp = parts[parts.length - 1]
		parts.length--
		temp.replace(/((?!( variable | tuple )).)+/gm, function($1) {
			//here should go tuple/modifier/refer-to extraction.
			const refIdStartIndex = $1.indexOf('___')
			const varDesc = $1.substring(0, refIdStartIndex - 1)
			const tuple = varDesc.startsWith('tuple')
			const referIdx = varDesc.toLowerCase().indexOf('refers to')
			const referstoVariableName = referIdx !== -1 ? varDesc.substring(referIdx + 10) : null
			const varname = tuple ? referIdx === -1 ? varDesc.substring(6) : varDesc.substring(6, referIdx) : referIdx === -1 ? varDesc.substring(9) : varDesc.substring(9, referIdx)
			const modifier = varname.startsWith('+=') ? '+=' : varname.startsWith('+') ? '+' : varname.startsWith('=') ? '=' : varname.startsWith('-') ? '-' : null
			const name = varname.substring(modifier ? modifier.length : 0).trim()//it might be a double space in the end. its too easy to trim.
			const varRefIndex = parseInt($1.substring(refIdStartIndex + 3))

			const variable = self.vars[varRefIndex]
			variable.push(name, varRefIndex, modifier, parentId, tuple, referstoVariableName, children++, [], null, null, tuple ? 't' : 'v')

			self.vars[parentId][child_index].push(variable)
			self.walkTree(visit, varRefIndex, depth + 1)
			return ''
		})
	}
	visit(parentId, parts)
}
//test if this is quicker than indexing, and recreate FFL
//scorecardTool is using this, internally
FFLToRegister.prototype.prettyFormatFFL = function(depth, index) {
	const self = this
	const indent = this.indents[depth]
	const variable = this.vars[index][0].trim()
	const parts = variable.split(';')
	const varparts = []
	if (parts[parts.length - 1] === '') {
		parts.length--
	} else {
		var temp = parts[parts.length - 1]
		parts.length--
		temp.replace(/((?!( variable | tuple )).)+/gm, function($1) {
			const refId = $1.indexOf('___')
			varparts.push(indent + $1.substring(0, refId - 1) + '\n' + indent + '{\n' + self.prettyFormatFFL(depth + 1, parseInt($1.substring(refId + 3))) + '\n' + indent + '}')
			return ''
		})
	}
	var lb = ';\n'
	var r
	if (parts.length === 0) {
		if (varparts.length === 0) {
			r = ''
		} else {
			r = varparts.join('\n')
		}
	} else {
		if (varparts.length === 0) {
			r = indent + parts.join(lb + indent) + ';'
		} else {
			r = indent + parts.join(lb + indent) + ';\n' + (varparts.length > 0 ? varparts.join('\n') : ';')
		}
	}
	return r
}
FFLToRegister.prototype.lookupConstant = (index, constants) => {
	return constants[parseInt(index.substring(2))].replace(/'/g, '\\\'').replace(/(?:\\r\\n|\\r|\\n)/g, '[br]')
}
FFLToRegister.prototype.parseProperties = function(resolve_parent_name = this.resolve_parent_name) {
	const { lookupConstant, constants, register } = this
	const formulaMapping = { inputRequired: 'required' }
	this.walk((v, raw_properties) => {
			for (let i = 0; i < raw_properties.length; i++) {
				const p = raw_properties[i]
				const p_seperator_index = p.indexOf(':')//can't use split. some properties use multiple :
				let key = p.substring(0, p_seperator_index).trim()
				key = formulaMapping[key] || key
				register.addColumn(key)
				let value = p.substring(p_seperator_index + 1).trim()
				/**
				 *  (!! doesn't work with multiple translations in a value) e.g. entirely string
				 * ffl.replace(/__(\d+)/gm, ($1) => constants[parseInt($1.substring(2))])
				 * ... this does cover too little... title="Hoi" + VAR01 + "Bye" is nog covered.
				 */
				if (value.startsWith('__')) value = lookupConstant(value, constants)
				register.value(v, key, value)
			}
			if (resolve_parent_name) {
				const parent = register.i[v][register.schemaIndexes.parentId]
				if (parent != null) register.value(v, 'parent_name', register.i[parent][register.schemaIndexes.name])
			}
		}
	)
	return register
}
FFLToRegister.prototype.toString = function() {
	this.buildTree()
	return `${this.header}{\n${this.reassembled}\n}`
}
export { FFLToRegister }