'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RegisterToFFL = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RegisterToFFL(register) {
	this.schema = register.schema;
	this.constants = register.constants;
	register.createIndex('name');
	this.vars = register.getIndex('name');
	this.child = {};
	this.nameIndex = register.schemaIndexes.name;
	this.descIndex = register.schemaIndexes.desc;
	this.startIndex = register.schemaIndexes.start;
	this.endIndex = register.schemaIndexes.end;
	this.tree_index = register.schemaIndexes.tree_index;
	this.parentNameIndex = register.schemaIndexes.parentId;
	this.stringIndex = register.schemaIndexes.index;
	this.modifierIndex = register.schemaIndexes.modifier;
	this.referstoIndex = register.schemaIndexes.refersto;
	this.tupleIndex = register.schemaIndexes.tuple;
	this.displaytypeIndex = register.schemaIndexes.displaytype;
	this.visibleIndex = register.schemaIndexes.visible;
	this.decimalsIndex = register.schemaIndexes.fixed_decimals;
	this.datatypeIndex = register.schemaIndexes.datatype;
	this.frequencyIndex = register.schemaIndexes.frequency;
	this.options_titleIndex = register.schemaIndexes.options_title;
	this.formulaindex = register.schemaIndexes.formula;
	this.lockedIndex = register.schemaIndexes.locked;
	this.requiredIndex = register.schemaIndexes.required;
	this.childIndex = register.schemaIndexes.children;
	this.schema_indexes = register.schemaIndexes;
	var _register$schemaIndex = register.schemaIndexes,
	    name = _register$schemaIndex.name,
	    modifier = _register$schemaIndex.modifier,
	    refersto = _register$schemaIndex.refersto,
	    tuple = _register$schemaIndex.tuple;

	this.output = '';
	this.delimiter = ';';
	this.line_delimiter = '\n';

	this.variableProperties = [name, modifier, refersto, tuple];
	this.hiddenProperties = [this.startIndex, this.endIndex, this.tree_index, this.stringIndex, this.schema.indexOf('version'), this.schema.indexOf('type'), this.schema.indexOf('parent_name'), this.parentNameIndex, this.childIndex, this.descIndex];
	this.indents = [];
	var depth = 30;
	for (var i = 0; i < depth; i++) {
		this.indents[i] = new Array(i).join(' ');
	}this.relevant = [];
	for (var _i = 0; _i < this.schema.length; _i++) {
		if (this.hiddenProperties.indexOf(_i) === -1 && this.variableProperties.indexOf(_i) === -1) {
			this.relevant.push(_i);
		}
	}

	var shiftindent = [];
	for (var _i2 = 0; _i2 < depth; _i2++) {
		shiftindent[_i2] = [];
		for (var j = 0; j <= _i2; j++) {
			var item = [];
			for (var k = 0; k <= j; k++) {
				item.push(new Array(_i2 - k).join(' '));
				item.push('}\n');
			}
			shiftindent[_i2][j] = item.join('');
		}
	}

	this.shiftindent = shiftindent;
	var formulas = ['valid', 'title', 'hint', 'locked', 'visible', 'required', 'choices'];
	this.formulaIndexes = formulas.map(function (formula) {
		return register.schemaIndexes[formula];
	});
	this.defaultValues = [];
	this.defaultValues[this.visibleIndex] = {
		undefined: true,
		null: true,
		'1.0': true,
		'1': true,
		'true': true,
		'On': true
	};
	this.defaultValues[this.lockedIndex] = {
		undefined: true,
		null: true,
		'0.0': true,
		'0': true,
		'false': true,
		'Off': true,
		'No': true
	};
	this.defaultValues[this.requiredIndex] = this.defaultValues[this.lockedIndex];
}

RegisterToFFL.prototype.toGeneratedCommaSeperated = function () {
	var rooNodeName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'root';
	var delimiter = this.delimiter,
	    hiddenProperties = this.hiddenProperties,
	    indents = this.indents,
	    vars = this.vars;

	var lines = [];
	this.walk(vars[rooNodeName], 0, function (variable, depth) {
		return lines.push([indents[depth], variable.filter(function (value, index) {
			return hiddenProperties.indexOf(index) === -1;
		})].join(delimiter));
	});
	this.output = lines.join(this.line_delimiter);
	return this.output;
};
RegisterToFFL.prototype.toCSV = function (_ref) {
	var _ref$rootVariableName = _ref.rootVariableName,
	    rootVariableName = _ref$rootVariableName === undefined ? 'root' : _ref$rootVariableName;
	var delimiter = this.delimiter,
	    hiddenProperties = this.hiddenProperties,
	    vars = this.vars,
	    schema = this.schema;

	return [schema.filter(function (value, index) {
		return hiddenProperties.indexOf(index) === -1;
	}).join(delimiter)].concat((0, _toConsumableArray3.default)(this.walk(vars[rootVariableName], 0, function (variable) {
		return variable.filter(function (value, index) {
			return hiddenProperties.indexOf(index) === -1;
		}).join(delimiter);
	})));
};
RegisterToFFL.prototype.walk = function (node, depth, visitor) {
	var initial = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

	initial.push(visitor(node, depth));
	var c = node[this.childIndex];
	for (var i = 0; i < c.length; i++) {
		this.walk(c[i], depth + 1, visitor, initial);
	}return initial;
};
RegisterToFFL.prototype.validate = function (line) {
	return this.schema.length - this.hiddenProperties.length === (line.match(/;/g) || []).length + 1;
};

RegisterToFFL.prototype.toGeneratedFFL = function (_ref2) {
	var _ref2$rootVariableNam = _ref2.rootVariableName,
	    rootVariableName = _ref2$rootVariableNam === undefined ? 'root' : _ref2$rootVariableNam,
	    _ref2$noChildren = _ref2.noChildren,
	    noChildren = _ref2$noChildren === undefined ? false : _ref2$noChildren,
	    _ref2$auto_join = _ref2.auto_join,
	    auto_join = _ref2$auto_join === undefined ? false : _ref2$auto_join;

	var formattedFFL = [];
	var traverse = !noChildren;
	var modifierIndex = this.modifierIndex,
	    nameIndex = this.nameIndex,
	    indents = this.indents,
	    constants = this.constants,
	    relevant = this.relevant,
	    schema = this.schema,
	    shiftindent = this.shiftindent,
	    tupleIndex = this.tupleIndex;
	var _schema_indexes = this.schema_indexes,
	    type = _schema_indexes.type,
	    _schema_indexes$title = _schema_indexes.title,
	    title = _schema_indexes$title === undefined ? nameIndex : _schema_indexes$title,
	    refersto = _schema_indexes.refersto;

	var tuple = 'tuple ',
	    variable = 'variable ',
	    model = 'model ',
	    ref_postfix = ' refers to ';

	var curr_depth = 0;
	var rootNode = this.vars[rootVariableName];

	var visitor = function visitor(node, depth) {
		var items = [];
		var model_node = node[type] === 'm';
		if (curr_depth >= depth) items.push(shiftindent[curr_depth][curr_depth - depth]);
		items.push(indents[depth]);
		items.push(node[tupleIndex] ? tuple : model_node ? model : variable);
		items.push(node[modifierIndex] || '');
		items.push(model_node ? node[title] + ' uses BaseModel' : node[nameIndex]);
		if (refersto !== -1 && node[refersto]) items.push(ref_postfix, node[refersto]);
		items.push('\n', indents[depth]);

		var props = [];
		for (var i = 0; i < relevant.length; i++) {
			var real = relevant[i];
			if (node[real]) props.push([indents[depth + 1], schema[real], ': ', node[real], ';'].join(''));
		}
		if (props.length > 0) items.push('{\n', props.join('\n'));else items.push('{');
		curr_depth = depth;
		formattedFFL.push(items.join(''));
	};
	if (rootNode != null) {
		if (traverse) this.walk(rootNode, 1, visitor);else visitor(rootNode, 1);
		formattedFFL.push(shiftindent[curr_depth][curr_depth - 1]);
		if (!rootVariableName) formattedFFL.shift();
	}
	var translated = formattedFFL.map(function (ffl) {
		return ffl.replace(/__(\d+)/gm, function ($1) {
			return constants[parseInt($1.substring(2))];
		});
	});
	return auto_join ? translated.join('\n') : translated;
};
exports.RegisterToFFL = RegisterToFFL;