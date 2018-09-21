'use strict';

var _log = require('log6');

var _FunctionMap = require('../../src/FunctionMap');

var _FunctionMap2 = _interopRequireDefault(_FunctionMap);

var _PropertiesAssembler = require('../../src/PropertiesAssembler');

var _PropertiesAssembler2 = _interopRequireDefault(_PropertiesAssembler);

var _SolutionFacade = require('../../src/SolutionFacade');

var _SolutionFacade2 = _interopRequireDefault(_SolutionFacade);

var _FormulaService = require('../../src/FormulaService');

var _FormulaService2 = _interopRequireDefault(_FormulaService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var known_widths = new Set(['locked', 'visible', 'entered']);
var unwantedKeys = new Set(['delegate', 'ast', 'body']);
var hidden_keys = new Set(['original', 'parsed']);
var correctFileName = function correctFileName(name) {
	return name.split('_').slice(1, -1).join('_');
};
var variableName = function variableName(name) {
	return name.split('_').slice(1).join('_');
};

function FormulaInfo(dataArg, schema, modelName) {
	var i = void 0;
	this.name = modelName;
	this.formulas = [];
	this.variables = [];
	var self = this;
	this.data = dataArg;
	var data = [];
	this.nodes = [];
	var forms = {};
	_FormulaService2.default.visitFormulas(function (formula) {
		formula.id = formula.id || formula.index;
		forms[formula.name] = formula;
		self.addFormula(formula);
	});
	var names = {};

	var modelNamePrefix = modelName + '_';
	for (i = 0; i < this.formulas.length; i++) {
		var formula = this.formulas[i];
		var name = correctFileName(formula.name);
		if (names[name] === undefined) {
			names[name] = true;
			if (formula.ipprotected) {
				(0, _log.info)('formula is ipProtected' + JSON.stringify(formula));
				data.push([name, (forms[modelNamePrefix + name + '_title'] || { original: null }).original, null, null, null, null, null, null, null, null]);
			} else {
				var title = forms[modelNamePrefix + name + '_title'] || { original: null };
				var hint = forms[modelNamePrefix + name + '_hint'] || { original: '' };
				var visible = forms[modelNamePrefix + name + '_visible'] || { original: false };
				var valid = forms[modelNamePrefix + name + '_valid'] || { original: false };
				var value = forms[modelNamePrefix + name + '_value'] || { original: '' };
				var formula_trend = forms[modelNamePrefix + name + '_trend'] || { original: '' };
				var formula_notrend = forms[modelNamePrefix + name + '_notrend'] || { original: '' };
				var locked = forms[modelNamePrefix + name + '_locked'] || { original: false };
				var choices = forms[modelNamePrefix + name + '_choices'] || { original: null
					//looks a lot like the Register.js functionality
				};data.push([name, title.original, value.original, formula_trend.original, formula_notrend.original, visible.original, locked.original, choices.original, hint.original, valid.original]);
			}
		}
	}
	var types = ['name', 'title', 'value', 'notrend', 'trend', 'visible', 'locked', 'choices', 'hint', 'valid'];
	//this.formulas = undefined;
	this.meta = { view: { columns: [] } };
	var counter = 0;
	for (i = 0; i < types.length; i++) {
		var type = types[i];
		self.meta.view.columns.push({
			'width': known_widths.has(type) ? undefined : 50,
			'name': type,
			'dataTypeName': 'text',
			'fieldName': type,
			'position': counter++,
			'renderTypeName': 'text'
		});
	}
}
FormulaInfo.prototype.setSchema = function (schema) {
	this.schema = schema;
};
FormulaInfo.prototype.addFormula = function (formula) {
	formula.fflname = variableName(formula.name);
	if (!formula.ipprotected) this.formulas.push(formula);else {
		this.formulas.push(JSON.parse(JSON.stringify(formula, function (k, v) {
			return hidden_keys.has(k) ? undefined : v;
		})));
	}
};

function LMEParser() {}

LMEParser.prototype.name = 'lme';
LMEParser.prototype.headername = '.finance lme';
LMEParser.prototype.parseData = function (data, workbook) {
	var solution = _SolutionFacade2.default.createSolution(data.name);
	solution.nodes = data.nodes;
	if (data.variables) _FormulaService2.default.initVariables(data.variables);
	_PropertiesAssembler2.default.bulkInsert(solution);
	//Probably for formula-information
	_FormulaService2.default.bulkInsertFormula(data.formulas);
	for (var i = 0; i < data.formulas.length; i++) {
		_FunctionMap2.default.initializeFormula(data.formulas[i], workbook.context.ma, workbook.context.audittrail);
	}if (_log.DEBUG) (0, _log.info)('Done import ' + data.name);
	return solution;
};

LMEParser.prototype.deParse = function (rowId, workbook) {
	var modelName = workbook.getSolutionName();
	var info = new FormulaInfo({}, {}, modelName);
	_PropertiesAssembler2.default.findAllInSolution(modelName, function (property) {
		return info.nodes.push(property);
	});
	_FormulaService2.default.getVariables(function (variable) {
		return info.variables.push(variable);
	});
	return JSON.stringify(info, function (key, value) {
		return unwantedKeys.has(key) ? undefined : value;
	}, 0);
};
_SolutionFacade2.default.addParser(LMEParser.prototype);
exports.LMEParser = LMEParser.prototype;