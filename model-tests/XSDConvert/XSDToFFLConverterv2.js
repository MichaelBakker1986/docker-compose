import { BaseConversionVisitor, BaseConverter, Xsd2JsonSchema } from 'michael.bakker_xsd2jsonschema'
import { JSVisitor, Register, RegisterToFFL }                   from '../../lme-core/'
import { debug }                                                from 'log6'

const baseConverter = new BaseConverter()
const annotatedVisitor = new BaseConversionVisitor(baseConverter)
const converter = new Xsd2JsonSchema({
	baseId    : '#',
	xsdBaseDir: __dirname,
	visitor   : annotatedVisitor
})
const XSDRegister = new Register()

//TODO: first extract all types,
function XSDConverter() {
	this.variables = {
		date: {
			type: 'date'
		},
		int : {
			type: 'int'
		}
	}
	this.jsonXSD = []
}

XSDConverter.prototype.loadJSON = function(jsonFile) {
	this.jsonXSD.push(jsonFile)
}
XSDConverter.prototype.loadXSD = function(pattern) {
	this.pattern = pattern
	const walkSync = function(dir, file_list, mask) {
		if (dir[dir.length - 1] !== '/') dir = dir.concat('/')
		let fs    = fs || require('fs'),
		    files = fs.readdirSync(dir)
		file_list = file_list || []
		files.forEach(function(file) {
			if (fs.statSync(dir + file).isDirectory())
				file_list = walkSync(dir + file + '/', file_list, mask)
			else if (mask.test(file.toString())) {
				file_list.push(require('path').relative(__dirname, dir + file))
			}
		})
		return file_list
	}
	const xsdFilenames = []
	walkSync(__dirname, xsdFilenames, new RegExp(this.pattern, 'i'))

	//Annotations should be present in the json files
	baseConverter.annotation = (a, b, c) => true
	converter.processAllSchemas({ xsdFilenames })
	/**
	 * Skip the write/read from disk, directly use JSON objects to re-use
	 */
	const jsonXSD = this.jsonXSD
	Object.keys(converter.jsonSchemas).forEach((uri) => {
		jsonXSD.push(converter.jsonSchemas[uri].getJsonSchema())
	}, converter)
}

function inherit(root, obj, other) {
	Object.assign(root, obj)
	Object.assign(root, other)
}

//DataTypes are used as xsdToJson/tuple
//The oneOf/allOf/anyOf are implementations and should be defined 2nd iteration
XSDConverter.prototype.findReference = function(schemaId, ref) {
	const ns = ref.split('/')
	const nstype = ns[ns.length - 1].split(':')
	const suffix = nstype[nstype.length - 1]
	return this.variables[schemaId + '_' + suffix] || this.variables[suffix]
}
XSDConverter.prototype.extractAllVariables = function() {
	for (let i = 0; i < this.jsonXSD.length; i++) {
		const jsonObj = this.jsonXSD[i]
		this.extractVariables(jsonObj.id.split('.')[0], jsonObj)
	}
}
XSDConverter.prototype.extractVariables = function(id, jsonObj) {
	const variables = this.variables
	//restructure oneOf instances
	JSVisitor.travelOne(jsonObj, null, function(key, node, ctx) {
		if (key == null) return
		if (node.oneOf && node._parentKey === 'properties' && !node._parent.id) {
			if (node.oneOf[1].type === 'array') {
				if (node.oneOf[0].$ref === node.oneOf[1].items.$ref) {
					node._parent._parent.oneOf = node.oneOf
					delete node._parent._parent.properties
				}
			}
		}
	})
	JSVisitor.travelOne(jsonObj, null, function(key, node, ctx) {
		if (key == null) return
		node.schemaid = id
		const realkey = key.replace(/tns:|colcom:|xsd:|comres:|pay:|colcov:|colobj:|colreg:|coladr:|met:|lgdcon:|facprod:|facrat:|facfac:|facrep:|facwith:|comens:|comdat:/, '')
		const usedkey = id + '_' + realkey
		if (realkey === 'oneOf') return
		if (node.type === 'string' || node.type === 'integer' || node.type === 'number' || node.type === 'object' || node.allOf || node.oneOf) {
			//allow duplicates among serveral xsd files
			if (variables[realkey]) {
				//this occurred only once for Product object re-defining it as 0.* tuple
				if (variables[usedkey]) throw Error('duplicate not supported ' + id + usedkey)
				variables[usedkey] = node
			} else {
				variables[realkey] = node
			}
		} else if (key === 'required') {
			//TODO: mark fields required
		}
	})
}

function inheritObject(root_object, obj) {
	Object.assign(root_object, obj)
}

XSDConverter.prototype.attachReferences = function() {
	const variables = this.variables
	const schemaconverter = this
	for (let variable_name in this.variables) {
		const variable = this.variables[variable_name]
		JSVisitor.travelOne(variable, null, function(key, node, ctx) {
			if (node.$ref) {
				const found_ref = schemaconverter.findReference(variable.schemaId, node.$ref)
				inheritObject(node, found_ref)
				delete node.$ref
			}
		})
	}
}

XSDConverter.prototype.polimorph = function() {
	const variables = this.variables
	const schemaconverter = this
	for (var variable_name in this.variables) {
		const variable = this.variables[variable_name]
		JSVisitor.travelOne(variable, null, function(key, node, ctx) {
			delete node._parent
			if (node.oneOf) {
				if (node.oneOf[0].type === 'boolean') {
					inheritObject(node, node.oneOf[0])
					delete node.oneOf
				}
				else if (node.oneOf[1].type === 'array') {
					inheritObject(node, node.oneOf[1])
					node.tuple = true
					delete node.oneOf
				} else {
					throw Error('not complete')
				}
			}
			else if (node.allOf) {
				inherit(node, node.allOf[0], node.allOf[1])
				delete node.allOf
			}
		})
	}
}
XSDConverter.prototype.initRegister = function() {

	XSDRegister.addColumn('displaytype')
	XSDRegister.addColumn('datatype')
	XSDRegister.addColumn('title')
	XSDRegister.addColumn('frequency')
	XSDRegister.addColumn('maxlength')
	XSDRegister.addColumn('pattern')
	XSDRegister.addColumn('minimum')
	XSDRegister.addColumn('maximum')
	XSDRegister.addColumn('choices')
	//identify all variables
	for (var node in this.variables) {
		const variable = this.variables[node]
		if (variable.enum) {
			variable.choices = '"' + variable.enum.join('|') + '"'
		}
		let type = variable.type
		if (type === 'object') {
			const index = XSDRegister.addRow([variable, 0, 0, node, null, null, null, false, null, null, [], null, null, '"' + node + '"', 'document', null, null, null, null, variable.choices])
		} else if (type === 'string' || type === 'integer' || type === 'number' || type === 'date' || type === 'int' || type === 'boolean') {
			if (variable.enum) type = 'select'
			const index = XSDRegister.addRow([variable, 0, 0, node, null, null, null, false, null, null, [], type, type === 'date' ? 'number' : type, '"' + node + '"', 'document', variable.maxLength, variable.pattern ? '"' + variable.pattern + '"' : null, variable.minimum, variable.maximum, variable.choices])
		} else if (type === 'array') {//tuple
			const index = XSDRegister.addRow([variable, 0, 0, node, null, null, null, true, null, null, [], null, 'string', '"' + node + '"', 'document', null, null, null, null, variable.choices])
		} else {
			//throw Error('All supported types should be mapped ')
		}
	}
}
XSDConverter.prototype.attachChildren = function() {
	//attach all parent-child relations
	const names = XSDRegister.getIndex('name')
	const tupleIndex = XSDRegister.schemaIndexes.tuple
	const childIndex = XSDRegister.schemaIndexes.children
	const rawDataIndex = XSDRegister.schemaIndexes.desc
	for (let node in names) {
		let children
		if (names[node][tupleIndex]) {
			children = names[node][rawDataIndex].items.properties
		}
		else {
			children = names[node][rawDataIndex].properties
		}
		for (let childName in children) {
			if (childName === 'schemaid') continue
			const child = children[childName]
			if (child.enum) child.choices = '"' + child.enum.join('|') + '"'
			if (child.enum) child.type = 'select'
			if (child.type === 'object') {
				if (names[childName])
					names[node][childIndex].push(names[childName])
			} else if (child.type === 'array') {
				if (names[childName])
					names[node][childIndex].push(names[childName])

			}
			else {
				const index = XSDRegister.addRow([child, 0, 0, childName, null, null, null, null, null, null, [], child.type, child.type, '"' + childName + '"', 'document', child.maxLength, child.pattern ? '"' + child.pattern + '"' : null, child.minimum, child.maximum, child.choices])
				names[node][childIndex].push(XSDRegister.i[index])
			}
		}

		//names['root'][childIndex].push(names[node])
	}
}
XSDConverter.prototype.start = function() {
	this.extractAllVariables()
	this.attachReferences()
	this.polimorph()
	this.initRegister()
	this.attachChildren()
}
XSDConverter.prototype.print = function() {
	const names = XSDRegister.getIndex('name')
	Object.keys(names).forEach(var_name => {
		debug('---' + var_name + '---')
		debug(this.variables[var_name])
		debug(new RegisterToFFL(XSDRegister).toGeneratedFFL({ rootVariableName: var_name, auto_join: true }))
	})
}
exports.XSDConverter = XSDConverter