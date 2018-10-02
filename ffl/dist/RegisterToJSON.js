'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RegisterToJSON = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lmeCore = require('lme-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RegisterToJSON = exports.RegisterToJSON = function () {
	function RegisterToJSON() {
		var register = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _lmeCore.Register();
		(0, _classCallCheck3.default)(this, RegisterToJSON);

		this.register = register;
		this.hidden_properties = ['desc', 'start', 'end', 'parentId', 'index', 'children'];
	}

	(0, _createClass3.default)(RegisterToJSON, [{
		key: 'toJSON',
		value: function toJSON() {
			var _this = this;

			var root_name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'root';

			var register = this.register;
			var rootNode = register.findByName(root_name);
			var rows = [];
			var indexes = register.schemaIndexes;
			var schema = register.schema.filter(function (val) {
				return _this.hidden_properties.indexOf(val) === -1;
			});
			var variable_schema = schema.map(function (property_name) {
				return indexes[property_name];
			});
			register.walk(rootNode, 0, function (variable) {
				return rows.push(variable_schema.map(function (schema_index) {
					return variable[schema_index];
				}));
			});
			return { schema: schema, rows: rows };
		}
	}, {
		key: 'fromJSON',
		value: function fromJSON(json_register) {
			var register = this.register;
			register.clean();
			register.addColumns(json_register.schema);
			register.addColumn('tree_index');
			var children_index = register.schemaIndexes.children;
			json_register.rows.forEach(function (row) {
				register.initRow([null, null, null, row[0]], [{
					val: [],
					col: 'children'
				}].concat((0, _toConsumableArray3.default)(row.map(function (val, index) {
					return { val: val, col: json_register.schema[index] };
				}))));
			});
			register.iterateRows('tree_index', function (index, row, parent) {
				var tree_index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

				parent[children_index][tree_index] = row;
			});
			return register;
		}
	}]);
	return RegisterToJSON;
}();