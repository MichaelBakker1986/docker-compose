'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lmeCore = require('lme-core');

var _FFLToRegister = require('./FFLToRegister');

var _RegisterToLMEParser = require('./RegisterToLMEParser');

function RegisterPlainFFLDecorator() {}

RegisterPlainFFLDecorator.prototype.name = 'ffl';
RegisterPlainFFLDecorator.prototype.status = 'green';
RegisterPlainFFLDecorator.prototype.headername = '.finance ffl';
RegisterPlainFFLDecorator.prototype.deParse = function (data, workbook) {
	return new _RegisterToLMEParser.RegisterToLMEParser().deParse(data, workbook);
};
RegisterPlainFFLDecorator.prototype.parseData = function (data, workbook) {
	var register = data.register || new _lmeCore.Register();
	var raw_model_data = data.raw || data;

	var fflFormatter = new _FFLToRegister.FFLToRegister(register, raw_model_data);
	fflFormatter.parseProperties();
	workbook.modelName = fflFormatter.name || workbook.modelName;
	return new _RegisterToLMEParser.RegisterToLMEParser().parseData(register, workbook);
};
_lmeCore.SolutionFacade.addParser(RegisterPlainFFLDecorator.prototype);
exports.default = RegisterPlainFFLDecorator.prototype;