'use strict';

var _src = require('../src/');

var _formulajsConnect = require('../../formulajs-connect');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _log = require('log6');

var _log2 = _interopRequireDefault(_log);

var _excelConnect = require('../../excel-connect');

var _excelConnect2 = _interopRequireDefault(_excelConnect);

require('../exchange_modules/presentation/webexport');

require('../exchange_modules/ffl/RegisterPlainFFLDecorator');

require('../exchange_modules/lme/lmeparser');

require('fll-math');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * file creator, not tested every cycle.
 *
 * @type {ok}
 */
var LMEFacade = require('../').LMEFacade;
LMEFacade.addFunctions(_formulajsConnect.entries);
LMEFacade.addFunctions(_excelConnect2.default);
var fflTestModels = ['/../resources/KSP'];

function correctFileName(name) {
	return name.replace(/^[^_]+_([\w]*)_\w+$/gmi, '$1');
}

for (var i = 0; i < fflTestModels.length; i++) {
	var fflModelName = fflTestModels[i];
	var data = _fs2.default.readFileSync(__dirname + fflModelName + '.ffl', 'utf8');
	var context = new _src.Context();
	var wb = new _src.WorkBook(context);
	var register = new _src.Register();
	var debug_manager = new _src.DebugManager(register, context.audittrail);
	wb.importSolution({
		register: register,
		raw: data
	}, 'ffl');
	var validate = debug_manager.monteCarlo(fflModelName);
	_assert2.default.ok(validate.valid);
	var screendefExport = wb.export('webexport');
	var allnodes = screendefExport.nodes;

	var graphvizModelTree = '';
	var depVariableNames_with_formulas = '';
	var depVariableNames = '';

	for (var nodeName in allnodes) {
		var node = allnodes[nodeName];
	}

	wb.visitProperties(wb.getSolutionNode('KSP_root'), function (child) {
		graphvizModelTree += createRow(child.rowId);
		graphvizModelTree += '\r\n' + child.parentrowId + ' -> ' + child.rowId + ';';
	}, 0);

	var variableNames = new Set();

	wb.solution.formulas.forEach(function (formulaId) {
		var formula = _src.SolutionFacade.fetchFormulaByIndex(formulaId);
		if (Object.keys(formula.deps).length > 0) {
			variableNames.add(correctFileName(formula.name));
		}
		for (var dep in formula.deps) {
			depVariableNames_with_formulas += '\r\n' + correctFileName(formula.name) + ' -> ' + correctFileName(dep) + '[label="' + formula.original + '"];';
			depVariableNames += '\r\n' + correctFileName(formula.name) + ' -> ' + correctFileName(dep) + ';';
		}
	});
	variableNames.forEach(function (name) {
		depVariableNames_with_formulas += createRow(name);
		depVariableNames += createRow(name);
	});
	var formulaInfo = {};
	_src.FormulaService.visitFormulas(function (formula) {
		formulaInfo[formula.name] = formula;
	});
	createFile(wb, '_dependencies.json', JSON.stringify(formulaInfo, null, 2));
	createFile(wb, '_canvas.json', wb.export('lme', undefined));
	createFile(wb, '_modelTree.txt', createGraph(graphvizModelTree));
	createFile(wb, '_dependencies.txt', createGraph(depVariableNames));
	createFile(wb, '_dependencies_with_formulas.txt', createGraph(depVariableNames_with_formulas));
}

function createFile(wb, fileName, graph) {
	var fullFileName = '../resources/' + wb.getSolutionName() + fileName;
	_fs2.default.writeFile(fullFileName, graph, function (err) {
		if (err) {
			_log2.default.log(err);
			return;
		}
		_log2.default.info('[%s] saved!', fullFileName);
	});
}

function createRow(rowId) {
	return '\r\n' + rowId + ' [shape=record, label="' + rowId + '"];';
}

function createGraph(middle) {
	var graphviz = 'digraph G { \r\nrankdir="LR"';
	graphviz += middle;
	graphviz += '\r\n}';
	return graphviz;
}

_log2.default.info('test fflExport succeed');