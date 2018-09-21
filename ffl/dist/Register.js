'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Register = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Register = function () {
	function Register() {
		var _this = this;

		var schema_defaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['desc', 'start', 'end', 'name', 'index', 'modifier', 'parentId', 'tuple', 'refersto', 'tree_index', 'children', 'valid', 'title', 'type', 'parent_name'];
		(0, _classCallCheck3.default)(this, Register);
		this.header = '';
		this.schema = [];
		this.createdIndexes = [];
		this.schema_defaults = [];
		this.changes = [];

		this.print = function (idxMap, start, filter) {
			return _this.printArr(_this.i, idxMap, _this.mark || start, filter);
		};

		this.schema_defaults = schema_defaults;
		this.clean();
	}

	(0, _createClass3.default)(Register, [{
		key: 'clean',
		value: function clean() {
			this.header = null;
			this.constants = [];
			this.formatters = [];
			for (var j = 0; j < this.createdIndexes.length; j++) {
				delete this[this.createdIndexes[j]];
			}this.createdIndexes = [];
			this.schema.length = 0;
			this.i = [];
			this.schemaIndexes = {};

			for (var _j = 0; _j < this.schema_defaults.length; _j++) {
				this.addColumn(this.schema_defaults[_j]);
			}
		}
	}, {
		key: 'setFormatters',
		value: function setFormatters(formatters) {
			for (var i = 0; i < formatters.length; i++) {
				this.formatters[i] = formatters[i];
			}
		}
	}, {
		key: 'findByName',
		value: function findByName(n) {
			return this.getNames()[n];
		}
	}, {
		key: 'getNames',
		value: function getNames() {
			return this.getIndex('name');
		}
	}, {
		key: 'getIndex',
		value: function getIndex(name) {
			if (!this[name]) this.createIndex(name);
			return this[name];
		}
	}, {
		key: 'lastRowIndex',
		value: function lastRowIndex() {
			return this.i.length - 1;
		}
	}, {
		key: 'addColumns',
		value: function addColumns(names) {
			var _this2 = this;

			names.forEach(function (name) {
				return _this2.addColumn(name);
			});
		}
	}, {
		key: 'addColumn',
		value: function addColumn(name) {
			if (this.schemaIndexes[name] == null) {
				this.schemaIndexes[name] = this.schema.length;
				this.schema.push(name);
			}
		}
	}, {
		key: 'removeColumn',
		value: function removeColumn(name) {
			var schemaIds = this.schemaIndexes;
			if (schemaIds[name] != null) {
				var index = schemaIds[name];
				for (var i = 0; i < this.i.length; i++) {
					this.i[i].splice(index, 1);
				}
				delete schemaIds[name];
				this.schema.splice(index, 1);
				this.schema.forEach(function (el, i) {
					return schemaIds[el] = i;
				});
			}
		}
	}, {
		key: 'flush',
		value: function flush() {
			for (var i = 0; i < this.i.length; i++) {
				this.i[i].length = this.schema.length;
			}
		}
	}, {
		key: 'value',
		value: function value(idx, key, _value) {
			this.i[idx][this.schemaIndexes[key]] = _value;
		}
	}, {
		key: 'findStream',
		value: function findStream(key, value, start) {
			return this.find(key, value, this.mark);
		}
	}, {
		key: 'find',
		value: function find(key, value, start) {
			var result = [];
			for (var i = start || 0; i < this.i.length; i++) {
				if (this.i[i][this.schemaIndexes[key]] === value) result.push(this.i[i]);
			}return result;
		}
	}, {
		key: 'distinct',
		value: function distinct(schema, start) {
			return this.distinctArr(this.i, schema, start || this.mark);
		}
	}, {
		key: 'distinctArr',
		value: function distinctArr(arr, schema, start) {
			var result = [];
			var combi = {};
			var schemaIndexes = this.schemaIndexes;
			var distinctIndex = schema.map(function (el) {
				return schemaIndexes[el];
			});
			for (var i = start || 0; i < arr.length; i++) {
				var row = arr[i];
				var key = '';
				for (var j = 0; j < distinctIndex.length; j++) {
					key += '_' + row[distinctIndex[j]];
				}if (!combi[key]) {
					result.push(row);
					combi[key] = true;
				}
			}
			return result;
		}
	}, {
		key: 'addIndex',
		value: function addIndex(name) {
			this.createIndex(name);
			return this[name];
		}
	}, {
		key: 'createIndex',
		value: function createIndex(name) {
			if (!this[name]) {
				this.createdIndexes.push(name);
				var index = {},
				    i = this.i,
				    ni = this.schemaIndexes[name];
				for (var c = 0; c < i.length; c++) {
					index[i[c][ni]] = i[c];
				}this[name] = index;
			}
		}
	}, {
		key: 'addRowSave',
		value: function addRowSave(row) {
			this.i.push(row);
			for (var i = 0; i < this.createdIndexes.length; i++) {
				var index = this.createdIndexes[i];
				this[index][row[this.schemaIndexes[index]]] = row;
			}
			return this.i.length - 1;
		}
	}, {
		key: 'addRows',
		value: function addRows(rows) {
			var _this3 = this;

			return rows.map(function (row) {
				return _this3.addRow(row);
			});
		}
	}, {
		key: 'initRows',
		value: function initRows(rows) {
			var _this4 = this;

			return rows.map(function (_ref) {
				var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
				    row = _ref2[0],
				    extra = _ref2[1];

				return _this4.initRow(row, extra);
			});
		}
	}, {
		key: '_mergeArrayProperties',
		value: function _mergeArrayProperties(row, extra) {
			var indexes = this.schemaIndexes;
			return extra.reduce(function (init, _ref3) {
				var col = _ref3.col,
				    val = _ref3.val;

				init[indexes[col]] = val;
				return init;
			}, row);
		}
	}, {
		key: '_mergeObjectProperties',
		value: function _mergeObjectProperties(row, extra) {
			var indexes = this.schemaIndexes;
			for (var prop in extra) {
				row[indexes[prop]] = extra[prop];
			}
			return row;
		}
	}, {
		key: 'initRow',
		value: function initRow(row) {
			var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

			if (Array.isArray(extra)) {
				return this.addRow(this._mergeArrayProperties(row, extra));
			} else {
				return this.addRow(this._mergeObjectProperties(row, extra));
			}
		}
	}, {
		key: 'addRow',
		value: function addRow(row) {
			this.i.push(row);
			return this.i.length - 1;
		}
	}, {
		key: 'inheritProperty',
		value: function inheritProperty(name, paramIndex) {
			var variable = this.getIndex('name')[name];
			if (variable[paramIndex]) return variable[paramIndex];
			if (variable[this.schemaIndexes.refersto]) return this.inheritProperty(variable[this.schemaIndexes.refersto], paramIndex);
			return '';
		}
	}, {
		key: 'doProx',
		value: function doProx(name, metaData, param) {
			var register = this;
			var variable = this.getIndex('name')[name];
			Object.defineProperty(metaData, 'value', {
				set: function set(value) {
					variable[param] = value;
					register.changes.push({ name: name, param: param });
				},
				get: function get() {
					return register.inheritProperty(name, param);
				}
			});
		}
	}, {
		key: 'createInformationObject',
		value: function createInformationObject(name, hidden) {
			var variable = [];
			for (var paramIndex = 0; paramIndex < this.schema.length; paramIndex++) {
				var propertyName = this.schema[paramIndex];

				if (hidden.indexOf(paramIndex) !== -1) continue;
				var metaData = { name: propertyName };
				this.doProx(name, metaData, paramIndex);
				variable.push(metaData);
			}
			return variable;
		}
	}, {
		key: 'getAll',
		value: function getAll(name) {
			var r = [],
			    index = this.i,
			    indexpos = this.schemaIndexes[name];
			for (var i = 0; i < index.length; i++) {
				r[i] = index[i][indexpos];
			}return r;
		}
	}, {
		key: 'walk',
		value: function walk(node, depth, visitor) {
			visitor(node, depth);
			var children = node[this.schemaIndexes.children];
			for (var i = 0; i < children.length; i++) {
				this.walk(children[i], depth + 1, visitor);
			}
		}
	}, {
		key: 'printArr',
		value: function printArr(arr, idxMap, start, filter) {
			filter = filter || [];
			var tout = [];
			var self = this;
			var filtermap = [];
			for (var i = 0; i < filter.length; i++) {
				filtermap[this.schemaIndexes[filter[i]]] = true;
			}var f = function f(el, idx) {
				return filtermap[idx];
			};
			for (var _i = start || 0; _i < arr.length; _i++) {
				var el = arr[_i];
				tout.push((filter.length > 0 ? el.filter(f) : el).map(function (innerEl, idx) {
					var v = self.formatters[idx] ? self.formatters[idx](innerEl) : innerEl;
					var prefix = [];
					prefix.length = Math.max(idxMap[idx] - String(v).length, 0);
					return String(v).slice(0, idxMap[idx] - 1) + prefix.join(' ');
				}).join('|'));
			}
			return tout;
		}
	}, {
		key: 'translateKeys',
		value: function translateKeys(formula) {
			var constants = this.constants;
			return formula.replace(/__(\d+)/gm, function ($1, $2) {
				return constants[parseInt($2)];
			}) || '';
		}
	}, {
		key: 'iterateRows',
		value: function iterateRows(addition_property, stream) {
			var _this5 = this;

			var names = this.getNames(),
			    parent_name_index = this.schemaIndexes.parent_name,
			    extra = this.schemaIndexes[addition_property],
			    root = names.root;
			this.i.filter(function (row) {
				return row[_this5.schemaIndexes.name] !== 'root';
			}).forEach(function (row, index) {
				return stream(index, row, names[row[parent_name_index]] || root, row[extra]);
			});
		}
	}, {
		key: 'markNow',
		value: function markNow() {
			this.mark = this.i.length;
		}
	}, {
		key: 'size',
		value: function size() {
			return this.i.length;
		}
	}, {
		key: 'toString',
		value: function toString() {
			return 'variables:[' + this.i.length + ']\nSchema:[' + this.schema.map(function (el, i) {
				return el + ':' + i;
			}).join(',') + ']\n' + this.i.join('\n');
		}
	}]);
	return Register;
}();

exports.Register = Register;