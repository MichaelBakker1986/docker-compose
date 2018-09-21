'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _esprima = require('esprima');

var esprima = _interopRequireWildcard(_esprima);

var _FormulaBootstrap = require('./FormulaBootstrap');

var _FormulaBootstrap2 = _interopRequireDefault(_FormulaBootstrap);

var _ParserService = require('./ParserService');

var _ParserService2 = _interopRequireDefault(_ParserService);

var _FormulaService = require('./FormulaService');

var _FormulaService2 = _interopRequireDefault(_FormulaService);

var _FunctionMap = require('./FunctionMap');

var _FunctionMap2 = _interopRequireDefault(_FunctionMap);

var _PropertiesAssembler = require('./PropertiesAssembler');

var _PropertiesAssembler2 = _interopRequireDefault(_PropertiesAssembler);

var _Solution = require('./Solution');

var _Solution2 = _interopRequireDefault(_Solution);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SolutionFacade = function () {
	function SolutionFacade() {
		(0, _classCallCheck3.default)(this, SolutionFacade);
	}

	(0, _createClass3.default)(SolutionFacade, [{
		key: 'createSolution',
		value: function createSolution(solutionName) {
			return new _Solution2.default(_PropertiesAssembler2.default.createRootNode(solutionName).solutionName);
		}
	}, {
		key: 'importSolutionData',
		value: function importSolutionData(data, parserType, workbook) {
			var foundParser = _ParserService2.default.findParser(parserType);
			if (foundParser == null) throw Error('Parser for type \'' + parserType + '\' is not found. You have to include it in the startup script (require/import)');
			var solution = foundParser.parseData(data, workbook);
			_PropertiesAssembler2.default.bulkInsert(solution);
			this.initFormulaBootstrap(solution.getFormulaKeys(), false, workbook.context.ma, workbook.context.audittrail);
			return solution;
		}
	}, {
		key: 'exportSolution',
		value: function exportSolution(parserType, rowId, workbook) {
			var parser = _ParserService2.default.findParser(parserType);
			if (parser == null) throw Error('No such parser found:[' + parserType + ']');
			return parser.deParse(rowId, workbook);
		}
	}, {
		key: 'initFormulaBootstrap',
		value: function initFormulaBootstrap(formulas, resetParsedFormula, ma, audittrail) {
			for (var i = 0; i < formulas.length; i++) {
				var formulaInfo = _FormulaService2.default.findFormulaByIndex(formulas[i]);
				if (resetParsedFormula) formulaInfo.parsed = undefined; //explicitly reset parsed. (The formula-bootstrap) will skip parsed formulas
				if (formulaInfo.parsed == null) _FormulaBootstrap2.default.parseAsFormula(formulaInfo);
				_FunctionMap2.default.initializeFormula(formulaInfo, ma, audittrail);
			}
		}

		/*
   *return given properties from a formula
   */

	}, {
		key: 'gatherFormulaProperties',
		value: function gatherFormulaProperties(modelName, properties, rowId) {
			var formulaProperties = {};
			Object.keys(properties).forEach(function (prop_name) {
				var formula = _FormulaService2.default.findFormulaByIndex(_PropertiesAssembler2.default.getOrCreateProperty(modelName, rowId, prop_name).ref);
				if (formula !== undefined && formula.original !== undefined && formula.original !== null && formula.original !== '') {
					formulaProperties[prop_name] = formula.original;
				}
			});
			return formulaProperties;
		}

		/**
   * Called from JSWorkBook
   * Initializes Solution if not exists
   * Creates Formula/Property if not exists
   * Initialize FunctionMap
   */

	}, {
		key: 'createFormulaAndStructure',
		value: function createFormulaAndStructure(solutionName, formulaAsString, rowId, colId, displaytype, frequency, ma, audittrail, self_body, parent_id) {
			//create a formula for the element
			var ast = esprima.parse(formulaAsString);
			//create Solution if not exists.
			var solution = this.createSolution(solutionName);
			//integrate Property with Formula
			this.createUIFormulaLink(solution, rowId, colId, ast.body[0].expression, displaytype, frequency, self_body, parent_id);
			//integrate one formula from just created Solution
			this.initFormulaBootstrap(solution.getFormulaKeys(), false, ma, audittrail);
		}

		/**
   * Called by parsers
   */

	}, {
		key: 'createUIFormulaLink',
		value: function createUIFormulaLink(solution, rowId, colId, body, displaytype, frequency, self_body, parent_id, ip_protected) {
			//by default only value properties can be user entered
			//in simple (LOCKED = (colId !== 'value'))
			var property = _PropertiesAssembler2.default.getOrCreateProperty(solution.name, rowId, colId);
			if (rowId !== 'root' && colId === 'value') property.parentName = parent_id ? parent_id + '_value' : 'root_value';
			if (displaytype) property.displaytype = displaytype;
			var formulaId = _FormulaService2.default.addModelFormula(property, solution.name, rowId, colId, ['value', 'title'].indexOf(colId) === -1, body, frequency, self_body, ip_protected);
			solution.createNode(formulaId, displaytype, property);
			return property;
		}
	}, {
		key: 'addFormulaDependency',
		value: function addFormulaDependency(formulaInfo, name, propertyName) {
			var property = _PropertiesAssembler2.default.getOrCreateProperty(formulaInfo.name.split('_')[0], name, propertyName || 'value');
			_FormulaService2.default.addFormulaDependency(formulaInfo, property.ref, property.name);
			return property;
		}
	}]);
	return SolutionFacade;
}(); /**
      * Solution encapsulation
      * FormulaId '0' is not a valid ID!
      */


var properties = {
	value: 0,
	visible: 1,
	required: 2,
	locked: 3,
	entered: 4,
	validation: 5,
	title: 6,
	validateInput: 7,
	choices: 8,
	hint: 9,
	_testh: 10
};
var functions = {};
var getFunctions = function getFunctions() {
	return functions;
};
var addVariables = _FormulaService2.default.addVariables;
var initVariables = _FormulaService2.default.initVariables;
var fetchFormulaByIndex = _FormulaService2.default.findFormulaByIndex;

SolutionFacade.prototype.addParser = _ParserService2.default.addParser;
SolutionFacade.prototype.getOrCreateProperty = _PropertiesAssembler2.default.getOrCreateProperty;
SolutionFacade.prototype.contains = _PropertiesAssembler2.default.contains;
SolutionFacade.prototype.getFunctions = getFunctions;
SolutionFacade.prototype.visitParsers = _ParserService2.default.visitParsers;
SolutionFacade.prototype.properties = properties;
SolutionFacade.prototype.functions = functions;
SolutionFacade.prototype.addVariables = addVariables;
SolutionFacade.prototype.initVariables = initVariables;
SolutionFacade.prototype.fetchFormulaByIndex = fetchFormulaByIndex;

var solutionFacade = new SolutionFacade();
_FormulaBootstrap2.default.initStateBootstrap(solutionFacade);
exports.default = solutionFacade;