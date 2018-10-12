'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Contracter = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fflPack = require('ffl-pack');

var _log = require('log6');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dummy_orig = '\nmodel SCORECARDBASICS uses BaseModel\n{\n variable Q_ROOT\n {\n  display_options:scorecard;\n  variable FirstMAP\n  {\n   title: "FirstMAP";\n   datatype: number(2);\n  }\n }\n}';

var Contracter = exports.Contracter = function () {
	function Contracter() {
		var _this = this;

		_classCallCheck(this, Contracter);

		this.db_entries = [];

		this.getEntries = function () {
			return _this.db_entries;
		};
	}

	_createClass(Contracter, [{
		key: 'getContractDelta',
		value: function getContractDelta(root_hash, data_id, data) {
			var _this2 = this;

			var compareResults = this.doDeltaCompare(root_hash, dummy_orig, data);
			if (compareResults.status === 'ok' && compareResults.changes > 0) {
				var relativeFFLPath = root_hash;
				var create_time = new Date().getTime();
				compareResults.compare.forEach(function (_ref) {
					var _ref2 = _slicedToArray(_ref, 4),
					    name = _ref2[0],
					    from = _ref2[1],
					    to = _ref2[2],
					    delta = _ref2[3];

					_this2.db_entries.push({ data_id: data_id, time: create_time, modelname: relativeFFLPath, root_hash: root_hash, from: from, to: to, delta: delta });
				});
			}
		}
	}, {
		key: 'saveDelta',
		value: function saveDelta(name, data) {
			return this.getContractDelta(name, data);
		}
	}, {
		key: 'doDeltaCompare',
		value: function doDeltaCompare(name, source_data, target_data) {
			var source_register = new _fflPack.Register();
			new _fflPack.Formatter(source_register, source_data).parseProperties();
			var target_register = new _fflPack.Register();
			new _fflPack.Formatter(target_register, target_data).parseProperties();
			var database_compare = new _fflPack.DeltaCompareRegister(source_register, target_register);
			database_compare.compare();
			if (_log2.default.TRACE) _log2.default.trace(database_compare);
			return { status: 'ok', changes: database_compare.changes, compare: database_compare };
		}
	}]);

	return Contracter;
}();