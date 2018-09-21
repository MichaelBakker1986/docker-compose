'use strict';

var _ = require('../../');

var _log = require('log6');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Backwards compatible decorator, until all unit-tests success it will serve to fix bugs.
 */
function SwaggerParser() {}

SwaggerParser.prototype.name = 'swagger';
SwaggerParser.prototype.headername = '.swagger';

SwaggerParser.prototype.deParse = function (metaData, workbook) {
	if (metaData.type === 'output') return this.parseInput(metaData, workbook);else if (metaData.type === 'input') return this.parseOutput(metaData, workbook);else throw Error('Error while parsing Swagger. Invalid conversion type valid types: input|output');
};
SwaggerParser.prototype.parseInput = function (metaData, workbook) {
	var rowId = metaData.rowId;
	var type = metaData.type;

	var indexer = workbook.indexer;
	var register = indexer.getIndex('name');
	var startnode = indexer.getIndex('name')[rowId];
	var nameIndex = indexer.schemaIndexes.name;
	var childrenIndex = indexer.schemaIndexes.children;
	var frequencyIndex = indexer.schemaIndexes.frequency;
	var datatypeIndex = indexer.schemaIndexes.datatype;
	var parentIdIndex = indexer.schemaIndexes.parentId;
	var referstoIndex = indexer.schemaIndexes.refersto;
	var variables = {};
	var names = indexer.getIndex('i');
	var firstArray = true;

	//TODO: copy-paste from RegisterToLMEParser...
	//only inherit properties once.
	var inherited = {};
	//INFO: inheritance could also be possible via database
	//TODO: copy-paste from RegisterToLMEParser...
	function inheritProperties(node) {
		if (!inherited[node[nameIndex]] && node[referstoIndex]) {
			inherited[node[nameIndex]] = true;
			var supertype = register[node[referstoIndex]];
			if (supertype == null) {
				if (_log2.default.DEBUG) _log2.default.debug('RefersTo: [' + node[referstoIndex] + '] is declared in the model but does not exsists');
			}
			//first inherit from parents of parents.
			if (supertype[referstoIndex]) inheritProperties(supertype);
			for (var i = 0; i < supertype.length; i++) {
				if (node[i] == null) node[i] = supertype[i];
			}
		}
	}

	indexer.walk(startnode, 0, function (node, depth) {
		var nodeName = node[nameIndex];
		inheritProperties(node);

		var hasChildren = node[childrenIndex].length == 0;
		if (workbook.get(nodeName, 'locked') && !hasChildren) {
			return;
		}
		var nodeType = 'number';
		var currentNode = {
			type: nodeType,
			description: workbook.get(nodeName, 'title')
		};
		var choices = void 0;
		if (node[childrenIndex].length > 0) {
			currentNode.type = 'object';
		} else if (choices = workbook.get(nodeName, 'choices')) {
			currentNode.enum = [];
			for (var i = 0; i < choices.length; i++) {
				var obj = choices[i];
				currentNode.enum.push(obj.value);
			}
		} else {
			if (node[datatypeIndex]) {
				currentNode.type = node[datatypeIndex];
			} else {
				currentNode.type = 'string';
			}
		}
		variables[nodeName] = currentNode;
		if (currentNode.type == 'object') currentNode.properties = {};
		if (currentNode.type == 'number') currentNode.format = 'double';

		if (currentNode.type != 'object') {
			currentNode.properties = {};
			for (var type in workbook.properties) {
				if (type.startsWith('_')) continue;
				currentNode.properties[type] = {
					'type': type == 'title' ? 'string' : 'boolean'
				};
			}
			currentNode.properties.value = {
				'type': currentNode.type
			};
			if (currentNode.type == 'number') currentNode.properties.value.format = 'double';

			currentNode.type = 'object';

			delete currentNode.format;
		}
		if (node[frequencyIndex] == 'column' && firstArray) {
			firstArray = false;
			currentNode.type = 'array';
			currentNode.items = {
				properties: currentNode.properties
			};
			delete currentNode.properties;
		}
	});
	indexer.walk(startnode, 0, function (node, depth) {
		if (node[parentIdIndex]) {
			var variable = variables[node[nameIndex]];
			var parent = variables[names[node[parentIdIndex]][nameIndex]];
			if (parent) {
				if (parent.type == 'array') {
					parent.items.properties[node[nameIndex]] = variable;
				} else {
					parent.properties[node[nameIndex]] = variable;
				}
			}
		}
	});
	return variables[rowId];
};
SwaggerParser.prototype.parseOutput = function (metaData, workbook) {
	var rowId = metaData.rowId;
	var type = metaData.type;
	var register = workbook.indexer;
	var startnode = register.getIndex('name')[rowId];
	var nameIndex = register.schemaIndexes.name;
	var childrenIndex = register.schemaIndexes.children;
	var frequencyIndex = register.schemaIndexes.frequency;
	var datatypeIndex = register.schemaIndexes.datatype;
	var parentIdIndex = register.schemaIndexes.parentId;
	var variables = {};
	var names = register.getIndex('i');
	var firstArray = true;
	register.walk(startnode, 0, function (node, depth) {
		var nodeName = node[nameIndex];
		var nodeType = 'number';
		var currentNode = {
			type: nodeType,
			description: workbook.get(nodeName, 'title')
		};
		var choices = void 0;
		if (node[childrenIndex].length > 0) {
			currentNode.type = 'object';
		} else if (choices = workbook.get(nodeName, 'choices')) {
			currentNode.enum = [];
			for (var i = 0; i < choices.length; i++) {
				var obj = choices[i];
				currentNode.enum.push(obj.value);
			}
		} else {
			if (node[datatypeIndex]) {
				currentNode.type = node[datatypeIndex];
			} else {
				currentNode.type = 'number';
			}
		}
		variables[nodeName] = currentNode;
		if (currentNode.type == 'object') currentNode.properties = {};
		if (currentNode.type == 'number') currentNode.format = 'double';
	});
	register.walk(startnode, 0, function (node, depth) {
		if (node[parentIdIndex]) {
			var variable = variables[node[nameIndex]];
			var parent = variables[names[node[parentIdIndex]][nameIndex]];
			if (parent) {
				if (parent.type == 'array') {
					parent.items.properties[node[nameIndex]] = variable;
				} else {
					parent.properties[node[nameIndex]] = variable;
				}
			}
		}
	});
	return variables[rowId];
};
SwaggerParser.prototype.parseData = function (data, workbook) {
	throw new Error('There is no support to convert swagger into lme yet.');
};
exports.RegisterPlainFFLToLMEParser = SwaggerParser;
_.SolutionFacade.addParser(SwaggerParser.prototype);