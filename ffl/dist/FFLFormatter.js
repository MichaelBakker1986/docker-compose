'use strict';

function FFLFormatter(register, data) {
	this.register = register;
	register.addColumn('desc');
	this.vars = register.getIndex('i');
	this.original = data;
	this.data = data;
	this.reassembled = '';
	this.constants = [];
	register.constants = this.constants;
	this.comments = [];
	this.header = '';
	this.indents = [];
	for (var i = 0; i < 30; i++) {
		this.indents[i] = new Array(i).join(' ');
	}
}

FFLFormatter.prototype.extractHeader = function () {
	this.header = this.original.substring(0, this.original.indexOf('{'));

	this.register.header = this.header;
	var headerLines = this.header.split('\n');
	for (var i = 0; i < headerLines.length; i++) {
		var headerLine = headerLines[i].trim();
		var modelName = void 0;
		if (modelName = headerLine.match(/^\s*model (\w+)/i)) {
			this.name = modelName[1];
			break;
		}
	}
};
FFLFormatter.prototype.extractConstants = function () {
	var index = 0;
	var constants = this.constants;
	this.data = this.data.replace(/"(.*?)"/gm, function ($0) {
		constants[++index] = $0;
		return '__' + index;
	});
};
FFLFormatter.prototype.insertConstants = function () {
	var constants = this.constants;
	this.reassembled = this.reassembled.replace(/__(\d+)/gm, function ($1, $2) {
		return constants[parseInt($2)];
	});
};
FFLFormatter.prototype.extractComments = function () {
	var comments = {};
	var index = 0;
	this.data = this.data.replace(/\/\/.*/gm, function ($0) {
		comments[++index] = $0;
		return '____' + index;
	});
	this.comments = comments;
};

FFLFormatter.prototype.removeWhite = function () {
	this.data = this.data.replace(/\s\s+/g, ' ').replace(/;\s+/g, ';');
};
FFLFormatter.prototype.extractVars = function () {
	var noneexit = true;
	var data = this.data;
	var index = 0;
	var register = this.register;
	while (noneexit) {
		noneexit = false;
		data = data.replace(/{([^}{]*?)}/gm, function ($0, $1, $2) {
			noneexit = true;
			var index = register.addRow([$1, $2, $0.length + $2]);
			return '___' + index;
		});
	}
};
FFLFormatter.prototype.findRootVariable = function () {
	return this.register.lastRowIndex();
};
FFLFormatter.prototype.buildTree = function () {
	this.extractHeader();
	this.extractConstants();
	this.extractComments();
	this.removeWhite();
	this.extractVars();
	var firstVar = this.findRootVariable();
	this.reassembled = this.prettyFormatFFL(2, firstVar);
	this.insertConstants();
};
FFLFormatter.prototype.walk = function (visit) {
	this.extractHeader();
	this.extractConstants();
	this.extractComments();
	this.removeWhite();
	this.extractVars();
	var firstVar = this.register.lastRowIndex();
	var firstRow = this.vars[firstVar];
	firstRow[0] = firstRow[0].replace(/^\s*root\s*/gi, 'variable root ').trim();

	firstRow.push('root', firstVar, null, null, null, null, 0, []);
	this.walkTree(visit, firstVar, 1);
};
FFLFormatter.prototype.walkTree = function (visit, parentId, depth) {
	var self = this;
	var parts = this.vars[parentId][0].trim().split(';');
	var children = 0;
	if (parts[parts.length - 1] === '') {
		parts.length--;
	} else {
		var temp = parts[parts.length - 1];
		parts.length--;
		temp.replace(/((?!( variable | tuple )).)+/gm, function ($1) {
			var refIdStartIndex = $1.indexOf('___');
			var varDesc = $1.substring(0, refIdStartIndex - 1);
			var tuple = varDesc.startsWith('tuple');
			var referIdx = varDesc.toLowerCase().indexOf('refers to');
			var referstoVariableName = referIdx != -1 ? varDesc.substring(referIdx + 10) : null;
			var varname = tuple ? referIdx === -1 ? varDesc.substring(6) : varDesc.substring(6, referIdx) : referIdx === -1 ? varDesc.substring(9) : varDesc.substring(9, referIdx);
			var modifier = varname.startsWith('+=') ? '+=' : varname.startsWith('+') ? '+' : varname.startsWith('=') ? '=' : varname.startsWith('-') ? '-' : null;
			var name = varname.substring(modifier ? modifier.length : 0).trim();
			var varRefIndex = parseInt($1.substring(refIdStartIndex + 3));

			var variable = self.vars[varRefIndex];
			variable.push(name, varRefIndex, modifier, parentId, tuple, referstoVariableName, children++, []);

			self.vars[parentId][10].push(variable);
			self.walkTree(visit, varRefIndex, depth + 1);
			return '';
		});
	}
	visit(parentId, parts);
};

FFLFormatter.prototype.prettyFormatFFL = function (depth, index) {
	var self = this;
	var indent = this.indents[depth];
	var variable = this.vars[index][0].trim();
	var parts = variable.split(';');
	var varparts = [];
	if (parts[parts.length - 1] === '') {
		parts.length--;
	} else {
		var temp = parts[parts.length - 1];
		parts.length--;
		temp.replace(/((?!( variable | tuple )).)+/gm, function ($1) {
			var refId = $1.indexOf('___');
			varparts.push(indent + $1.substring(0, refId - 1) + '\n' + indent + '{\n' + self.prettyFormatFFL(depth + 1, parseInt($1.substring(refId + 3))) + '\n' + indent + '}');
			return '';
		});
	}
	var lb = ';\n';
	var r;
	if (parts.length === 0) {
		if (varparts.length === 0) {
			r = '';
		} else {
			r = varparts.join('\n');
		}
	} else {
		if (varparts.length === 0) {
			r = indent + parts.join(lb + indent) + ';';
		} else {
			r = indent + parts.join(lb + indent) + ';\n' + (varparts.length > 0 ? varparts.join('\n') : ';');
		}
	}
	return r;
};
var formulaMapping = { inputRequired: 'required' };
FFLFormatter.prototype.lookupConstant = function (index) {
	return this.constants[parseInt(index.substring(2))].replace(/'/g, '\\\'').replace(/(?:\\r\\n|\\r|\\n)/g, '[br]');
};
FFLFormatter.prototype.parseProperties = function (resolve_parent_name) {
	var register = this.register;
	if (resolve_parent_name) register.addColumn('parent_name');
	var index = register.getIndex('i');
	var formatter = this;
	this.walk(function (v, raw_properties) {
		for (var i = 0; i < raw_properties.length; i++) {
			var p = raw_properties[i];
			var p_seperator_index = p.indexOf(':');
			var key = p.substring(0, p_seperator_index).trim();
			key = formulaMapping[key] || key;
			register.addColumn(key);
			var value = p.substring(p_seperator_index + 1).trim();

			if (value.startsWith('__')) value = formatter.lookupConstant(value);
			register.value(v, key, value);
		}
		if (resolve_parent_name) {
			var parent = register.i[v][register.schemaIndexes.parentId];
			if (parent != null) register.value(v, 'parent_name', register.i[parent][register.schemaIndexes.name]);
		}
	});
};
FFLFormatter.prototype.toString = function () {
	this.buildTree();
	return this.header + '{\n' + this.reassembled + '\n}';
};

function Factory() {
	this.on = false;
}

exports.Formatter = FFLFormatter;
exports.FFLFormatter = new Factory();