'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RegisterToLMEParser = undefined;

var _esprima = require('esprima');

var _esprima2 = _interopRequireDefault(_esprima);

var _log = require('log6');

var _astNodeUtils = require('ast-node-utils');

var _RegisterToFFL = require('./RegisterToFFL');

var _RegisterFormulaBuilder = require('./RegisterFormulaBuilder');

var _RegisterFormulaBuilder2 = _interopRequireDefault(_RegisterFormulaBuilder);

var _FinFormula = require('./FinFormula');

var _FinFormula2 = _interopRequireDefault(_FinFormula);

var _lmeCore = require('lme-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RegisterToLMEParser() {}

RegisterToLMEParser.prototype.name = 'ffl2';
RegisterToLMEParser.prototype.headername = '.finance ffl';
RegisterToLMEParser.prototype.walk = function (node, depth, visitor) {
	visitor(node, depth);
	var children = node[this.childIndex];
	for (var i = 0; i < children.length; i++) {
		this.walk(children[i], depth + 1, visitor);
	}
};
RegisterToLMEParser.prototype.deParse = function (data, workbook) {
	if (!workbook.indexer) return null;
	return new _RegisterToFFL.RegisterToFFL(workbook.indexer).toGeneratedFFL({ rootVariableName: workbook.modelName });
};
RegisterToLMEParser.prototype.parseData = function (data, workbook) {
	var indexer = data;
	workbook.indexer = indexer;

	var self = this;
	var fflRegister = new _RegisterToFFL.RegisterToFFL(indexer);
	var register = data.getIndex('name');
	var rfb = new _RegisterFormulaBuilder2.default(indexer);
	var modelName = workbook.modelName || indexer.name;
	var solution = _lmeCore.SolutionFacade.createSolution(modelName || 'NEW');
	var nameIndex = indexer.schemaIndexes.name;
	var tupleIndex = indexer.schemaIndexes.tuple;
	var validIndex = indexer.schemaIndexes.valid;
	var displayOptionsIndex = indexer.schemaIndexes.display_options;
	var dataOptionsIndex = indexer.schemaIndexes.data_options;
	var lengthIndex = indexer.schemaIndexes.length;
	var patternIndex = indexer.schemaIndexes.pattern;
	var titleIndex = indexer.schemaIndexes.title;
	var referstoIndex = indexer.schemaIndexes.refersto;
	var displayTypeIndex = indexer.schemaIndexes.displaytype;
	var frequencyIndex = indexer.schemaIndexes.frequency;
	var versionIndex = indexer.schemaIndexes.version;
	var dataTypeIndex = indexer.schemaIndexes.datatype;
	var rangeIndex = indexer.schemaIndexes.range;
	var ipprotectedIndex = indexer.schemaIndexes.ipprotected;
	var modifierIndex = indexer.schemaIndexes.modifier;
	var decimalsIndex = indexer.schemaIndexes.fixed_decimals;
	var parentNameIndex = indexer.schemaIndexes.parentId;
	var visibleIndex = indexer.schemaIndexes.visible;

	this.childIndex = indexer.schemaIndexes.children;
	var choiceIndex = indexer.schemaIndexes.choices;

	this.formulaIndexes = [];
	var formulaIndexes = this.formulaIndexes;
	var formulas = ['valid', 'hint', 'locked', 'visible', 'required', 'choices'];
	for (var i = 0; i < formulas.length; i++) {
		if (data.schemaIndexes[formulas[i]] != null) this.formulaIndexes.push(data.schemaIndexes[formulas[i]]);
	}

	var tuples = [];

	var rootNode = register.root || indexer.i[0];
	workbook.model_version = rootNode ? rootNode[versionIndex] : '';
	this.walk(rootNode, 3, function (node, depth) {
		if (depth < tuples.length) {
			tuples.length = depth;
			while (tuples.length > 0 && !tuples[depth - 1]) {
				tuples.length--;
			}
		}
		var nodeName = node[nameIndex];
		rfb.inherit(node);
		var displaytype = node[displayTypeIndex] || 'number';

		var datatype = node[dataTypeIndex] || 'number';
		var frequency = node[frequencyIndex] || 'column';
		var display_options = node[displayOptionsIndex];
		var title = node[titleIndex] || '"' + nodeName + '"';
		var data_options = node[dataOptionsIndex];
		var ipprotected = node[ipprotectedIndex] || false;

		if (node[tupleIndex]) {
			displaytype = 'paragraph';
		}
		if (displaytype === 'paragraph') {
			datatype = 'string';
			frequency = 'none';
		}

		var parentId = node[parentNameIndex] ? indexer.i[node[parentNameIndex]][nameIndex] : null;

		var fixed_decimals = node[decimalsIndex];
		var startdecimalsIndex;
		if (fixed_decimals == null && (startdecimalsIndex = displaytype.indexOf('(')) > -1) {
			fixed_decimals = displaytype.substr(startdecimalsIndex).slice(1, -1);
			displaytype = displaytype.substr(0, startdecimalsIndex);
		}

		var valueFormula = rfb.buildFFLFormula(node, frequency == 'column' && datatype == 'number');

		if (node[modifierIndex] && node[modifierIndex].indexOf('=') > -1) display_options = 'displayAsSummation';

		if (node[choiceIndex] || displaytype === 'select') {
			if (displaytype === 'date') {} else if (!node[choiceIndex]) {
				if (_log.DEBUG) (0, _log.debug)('Row [' + nodeName + '] is displaytype [select], but does not have choices');
			} else if (node[choiceIndex].split('|').length === 2) {
				displaytype = 'radio';
			} else {
				displaytype = 'select';
				if (_log.TRACE) (0, _log.trace)('[' + nodeName + '] ' + node.choices);
			}
		}

		if (nodeName.match(/MAP[0-9,A-z]+_(VALIDATION|INFO|HINT|WARNING)$/i)) {
			if (fflRegister.defaultValues[fflRegister.visibleIndex][node[fflRegister.visibleIndex]]) {
				node[fflRegister.visibleIndex] = 'Length(' + nodeName + ')';
				frequency = 'none';
				node[frequencyIndex] = 'none';
			}
			displaytype = 'string';
			node[displayOptionsIndex] = nodeName.split('_').pop().toLowerCase();
		} else if (nodeName.match(/MAP[0-9,A-z]+_PARAGRAAF[0-9]+$/i)) {
			node[frequencyIndex] = 'none';
			frequency = 'none';
			displaytype = 'paragraph';
		}

		if (!node[validIndex] && nodeName) {
			var validFormulas = [];

			if (patternIndex && node[patternIndex]) validFormulas.push('REGEXPMATCH(' + node[patternIndex] + ',' + nodeName + ')');

			if (lengthIndex && node[lengthIndex]) validFormulas.push('Length(' + nodeName + ') ' + node[lengthIndex]);

			if (rangeIndex && node[rangeIndex]) validFormulas.push('(' + node[rangeIndex].replace(/(>|>=|<|<=)/gi, nodeName + ' $1') + ')');
			if (datatype === 'number') validFormulas.push('not isNaN(OnNA(' + nodeName + ',null))');

			if (validFormulas.length > 0) node[validIndex] = 'If(' + validFormulas.join(' And ') + ',"","Enter valid input.")';
		}

		var uiNode = _lmeCore.SolutionFacade.createUIFormulaLink(solution, nodeName, 'value', self.parseFFLFormula(indexer, valueFormula, nodeName, 'value', datatype, workbook.context), displaytype, frequency, null, parentId, ipprotected);

		var visibleFormula = node[fflRegister.visibleIndex];
		if (parentId) {
			node[fflRegister.visibleIndex] = fflRegister.defaultValues[visibleIndex][visibleFormula] ? parentId + '.visible' : parentId + '.visible and ' + visibleFormula;
		}

		if (fixed_decimals) uiNode.decimals = parseInt(fixed_decimals);
		if (display_options) uiNode.display_options = display_options;
		if (data_options) uiNode.data_options = data_options;

		uiNode.frequency = frequency;

		if (node[tupleIndex] || tuples.length > 0) {
			uiNode.tuple = true;
			uiNode.nestedTupleDepth = 0;
			for (var _i = 0; _i < tuples.length; _i++) {
				if (tuples[_i]) uiNode.nestedTupleDepth++;
			}if (node[tupleIndex]) {
				uiNode.tupleDefinition = true;
				uiNode.datatype = 'string';
				if (tuples.length > 0) {
					uiNode.tupleDefinitionName = tuples[tuples.length - 1].rowId;
					uiNode.tupleProperty = true;
				}
				tuples[depth] = uiNode;
			} else {
				uiNode.tupleDefinitionName = tuples[tuples.length - 1].rowId;
				uiNode.tupleProperty = true;
			}
		}

		if (node[fflRegister.options_titleIndex] === 'locked') uiNode.title_locked = true;

		uiNode.datatype = datatype;

		_lmeCore.SolutionFacade.createUIFormulaLink(solution, nodeName, 'title', self.parseFFLFormula(indexer, title, nodeName, 'title', null, workbook.context), undefined, frequency, null, null);

		for (var i = 0; i < formulaIndexes.length; i++) {
			var index = formulaIndexes[i];
			if (node[index]) {
				if (!fflRegister.defaultValues[index] || !fflRegister.defaultValues[index][node[index]]) {
					_lmeCore.SolutionFacade.createUIFormulaLink(solution, nodeName, indexer.schema[index], self.parseFFLFormula(indexer, node[index], nodeName, indexer.schema[index], null, workbook.context), undefined, frequency, null, null);
				}
			}
		}
	});

	return solution;
};

RegisterToLMEParser.prototype.parseFFLFormula = function (indexer, formula, nodeName, col, type, context) {
	if (!formula) return type === 'string' ? _astNodeUtils.AST.STRING('') : type === 'number' ? {
		'type': 'Identifier',
		'name': 'NA'
	} : {
		'type': 'Identifier',
		'name': 'null'
	};
	var fin_parse = col === 'choices' ? _FinFormula2.default.finChoice(formula) : _FinFormula2.default.parseFormula(formula);

	fin_parse = indexer.translateKeys(fin_parse);
	var formulaReturn = 'undefined';
	try {
		formulaReturn = _esprima2.default.parse(fin_parse).body[0].expression;
	} catch (e) {
		if (_log.DEBUG) (0, _log.debug)('unable to parse [' + fin_parse + '] returning it as String value [' + nodeName + '] : ' + col, e);
		formulaReturn = _astNodeUtils.AST.STRING(fin_parse);
		if (global.IDE_DEBUGMODUS) context.audittrail.addRow(['MODEL', 'ERROR', nodeName, col, '', '', '', e.toString(), formula, null, fin_parse]);
	}
	return formulaReturn;
};
_lmeCore.SolutionFacade.addParser(RegisterToLMEParser.prototype);
exports.RegisterToLMEParser = RegisterToLMEParser;