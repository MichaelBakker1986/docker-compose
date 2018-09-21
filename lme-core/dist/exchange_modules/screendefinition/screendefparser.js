'use strict';

var _astNodeUtils = require('ast-node-utils');

var _index = require('../../index');

var _FinFormula = require('../../../ffl/FinFormula');

var _FinFormula2 = _interopRequireDefault(_FinFormula);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parser = {
	name: 'screendefinition',
	//expection json as String for screen definitions
	parseData: function parseData(json, workbook) {
		var data = JSON.parse(json);
		var solution = _index.SolutionFacade.createSolution(data.modelName || workbook.getSolutionName());

		_index.JSVisitor.travelOne(data, null, function (keyArg, node, context) {
			if (node !== null && node !== undefined && keyArg !== null && (node.variableName || node.name) && !Array.isArray(node)) {
				var parent = node._parent;
				var nodeName = node.variableName || node.name;
				if (nodeName) {
					addnode(solution, nodeName, node, parent ? parent.variableName || parent.name : undefined, undefined);
				}
			}
		});
		return solution;
	},
	deParse: function deParse(rowId, workbook) {
		var screenSolution = _index.SolutionFacade.createSolution(workbook.getSolutionName());
		var rootProperty = _index.PropertiesAssembler.getRootProperty(workbook.getSolutionName());
		_index.PropertiesAssembler.visitProperty(rowId, function (elem) {
			//create output node
			var uielem = {
				name: elem.rowId,
				displaytype: elem.displaytype,
				description: elem.title
			};
			var formulaProperties = _index.SolutionFacade.gatherFormulaProperties(workbook.getSolutionName(), workbook.properties, elem.rowId);
			for (var key in formulaProperties) {
				var formula = formulaProperties[key];
				var finFormula = _FinFormula2.default.javaScriptToFinGeneric(formula);
				if (finFormula !== 'undefined') uielem[key] = finFormula;
			}
		});
		screenSolution.root = {
			modelName: workbook.getSolutionName()
		};
		return stringifySolution(screenSolution.root);
	}
};

function stringifySolution(root) {
	return JSON.stringify(root, function (key, val) {
		if (key === 'originalproperties') {
			return undefined;
		}
		return val;
	}, 2);
}

function addnode(solution, rowId, node, parentId, referId) {
	var uiNode = _index.SolutionFacade.createUIFormulaLink(solution, rowId, 'value', _astNodeUtils.ast.UNDEFINED(), 'AmountAnswerType', 'document', null, parentId);
	var titlestring = node.name || node.description || rowId;
	_index.SolutionFacade.createUIFormulaLink(solution, rowId, 'title', _astNodeUtils.ast.STRING(titlestring), undefined, 'document');
}

_index.SolutionFacade.addParser(parser);