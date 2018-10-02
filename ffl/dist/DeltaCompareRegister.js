'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

require('array.equals');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeltaCompareRegister = function () {
	function DeltaCompareRegister(source_register, target_register) {
		(0, _classCallCheck3.default)(this, DeltaCompareRegister);


		this._source_to_target_property_map = [];
		this._target_to_source_property_map = [];
		this._updates = [];
		this._inserts = [];
		this._deletes = [];
		this._changes = 0;

		this.source_register = source_register;
		this.target_register = target_register;
	}

	(0, _createClass3.default)(DeltaCompareRegister, [{
		key: 'addChange',
		value: function addChange(changeType, property_name, var_name, value) {
			this['_' + changeType].push([changeType, var_name, property_name, value]);
			this._changes++;
		}
	}, {
		key: 'compare',
		value: function compare() {
			this.buildSchema();
			this.checkInserts();
			this.checkDeletes();
			return this;
		}
	}, {
		key: 'buildSchema',
		value: function buildSchema() {
			this.source_schema = this.source_register.schema.slice();
			this.target_schema = this.target_register.schema.slice();
			var max_schema_length = Math.max(this.source_schema.length, this.target_schema.length);
			var source_schema = this.source_register.schemaIndexes,
			    target_schema = this.target_register.schemaIndexes;
			this.source_schema.length = max_schema_length;
			this.target_schema.length = max_schema_length;

			for (var i = 0; i < max_schema_length; i++) {
				this._source_to_target_property_map[source_schema[this.source_schema[i]]] = target_schema[this.source_schema[i]];
				this._target_to_source_property_map[target_schema[this.target_schema[i]]] = source_schema[this.target_schema[i]];
			}
		}
	}, {
		key: 'checkInserts',
		value: function checkInserts() {
			var indexes = this.target_register.schemaIndexes;
			var hidden_keys = new _set2.default([indexes.parentId, indexes.index, indexes.children]);
			var source_variables = this.source_register.getIndex('name');
			var target_variables = this.target_register.getIndex('name');

			var target_variable_names = (0, _keys2.default)(target_variables);
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = (0, _getIterator3.default)(target_variable_names), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var variable_name = _step.value;

					var source_variable = source_variables[variable_name],
					    target_variable = target_variables[variable_name];
					if (!source_variable) {
						for (var target_property_index = 3; target_property_index < target_variable.length; target_property_index++) {
							var target_property = target_variable[target_property_index];
							if (hidden_keys.has(target_property_index) || target_property == null) continue;
							this.addChange('inserts', this.target_schema[target_property_index], variable_name, target_property);
						}
					} else {
						for (var _target_property_index = 3; _target_property_index < target_variable.length; _target_property_index++) {
							if (hidden_keys.has(_target_property_index)) continue;
							var sourceProperty = source_variable[this._target_to_source_property_map[_target_property_index]];
							var targetProperty = target_variable[_target_property_index];
							if (sourceProperty == null && targetProperty != null) {
								this.addChange('inserts', this.target_schema[_target_property_index], variable_name, targetProperty);
							} else if (sourceProperty !== targetProperty && targetProperty != null && !Array.isArray(sourceProperty)) {
								this.addChange('updates', this.target_schema[_target_property_index], variable_name, targetProperty);
							}
						}
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: 'checkDeletes',
		value: function checkDeletes() {
			var _this = this;

			var source_variables = this.source_register.getIndex('name');
			var target_variables = this.target_register.getIndex('name');

			var source_variable_names = (0, _keys2.default)(source_variables);
			var indexes = this.source_register.schemaIndexes;
			var props = this.source_schema.filter(function (val, i) {
				return i > 3 && i !== indexes.parentId && i !== indexes.index && i !== indexes.children;
			}).map(function (property_name) {
				return [indexes[property_name], property_name];
			});

			var _loop = function _loop(variable_name) {
				var source_variable = source_variables[variable_name];
				var target_variable = target_variables[variable_name];
				props.forEach(function (_ref) {
					var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
					    source_variable_property_index = _ref2[0],
					    source_variable_property_name = _ref2[1];

					var source_property = source_variable[source_variable_property_index];
					if (!target_variable) {
						if (source_property != null) _this.addChange('deletes', source_variable_property_name, variable_name, null);
					} else {
						var target_property = target_variable[_this._source_to_target_property_map[source_variable_property_index]];
						if (target_property == null && source_property != null) {
							_this.addChange('deletes', source_variable_property_name, variable_name, null);
						}
					}
				});
			};

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = (0, _getIterator3.default)(source_variable_names), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var variable_name = _step2.value;

					_loop(variable_name);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	}, {
		key: 'collect',
		value: function collect() {
			return [].concat((0, _toConsumableArray3.default)(this._updates), (0, _toConsumableArray3.default)(this._inserts), (0, _toConsumableArray3.default)(this._deletes));
		}
	}, {
		key: 'map',
		value: function map(stream) {
			return this.collect().map(stream);
		}
	}, {
		key: 'forEach',
		value: function forEach(stream) {
			return this.collect().forEach(stream);
		}
	}, {
		key: 'toString',
		value: function toString() {
			var diff = this.map(function (change_set) {
				return change_set.map(function (change) {
					return change.filter(Boolean).join(';');
				}).join('\n');
			});
			return ['Changes:' + this._changes, (0, _stringify2.default)(this.target_register.schemaIndexes), diff.filter(Boolean).join('\n')].join('\n');
		}
	}]);
	return DeltaCompareRegister;
}();

exports.default = DeltaCompareRegister;