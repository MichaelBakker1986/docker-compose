'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _index = require('../lme-core/index');

var _FFLToRegister = require('./FFLToRegister');

var _RegisterToLMEParser = require('./RegisterToLMEParser');

var _RegisterToLMEParser2 = _interopRequireDefault(_RegisterToLMEParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RegisterPlainFFLDecorator = {
	name: 'ffl',
	status: 'green',
	headername: '.finance ffl',
	deParse: function deParse(data, workbook) {
		return new _RegisterToLMEParser2.default().deParse(data, workbook);
	},
	parseData: function parseData(data, workbook) {
		var register = data.register || new _index.Register();
		var raw_model_data = data.raw || data;

		var fflFormatter = new _FFLToRegister.FFLToRegister(register, raw_model_data);
		fflFormatter.parseProperties();
		workbook.modelName = fflFormatter.name || workbook.modelName;
		return new _RegisterToLMEParser2.default().parseData(register, workbook);
	}
};
exports.default = RegisterPlainFFLDecorator;