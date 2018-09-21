'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TITLE = exports.NUMBER = exports.ENCODING = exports.VISIBLE = exports.VALUE = exports.DOCUMENT = exports.COLUMN = exports.DETAIL_INTERVAL = exports.AuditTrail = exports.resources = exports.Register = exports.XAxis = exports.TimeAxis = exports.JSVisitor = exports.FormulaService = exports.PropertiesAssembler = exports.ValueFacade = exports.YAxis = exports.SolutionFacade = exports.WorkBook = exports.Context = undefined;

var _Context = require('./src/Context');

var _AuditTrail = require('./src/AuditTrail');

var _JSWorkBook = require('./src/JSWorkBook');

var _JSVisitor = require('./src/JSVisitor');

var _JSVisitor2 = _interopRequireDefault(_JSVisitor);

var _Register = require('./src/Register');

var _FormulaService = require('./src/FormulaService');

var _FormulaService2 = _interopRequireDefault(_FormulaService);

var _ValueFacade = require('./src/ValueFacade');

var _ValueFacade2 = _interopRequireDefault(_ValueFacade);

var _PropertiesAssembler = require('./src/PropertiesAssembler');

var _PropertiesAssembler2 = _interopRequireDefault(_PropertiesAssembler);

var _YAxis = require('./src/YAxis');

var _YAxis2 = _interopRequireDefault(_YAxis);

var _XAxis = require('./src/XAxis');

var _XAxis2 = _interopRequireDefault(_XAxis);

var _TimeAxis = require('./src/TimeAxis');

var _TimeAxis2 = _interopRequireDefault(_TimeAxis);

var _SolutionFacade = require('./src/SolutionFacade');

var _SolutionFacade2 = _interopRequireDefault(_SolutionFacade);

var _log = require('log6');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * user friendly API
 * TODO: Move tuple related work to FESFacade
 * just let it inject into the FESFacade
 */
var resources = {
	formulasets: [{
		formulasetId: 0,
		name: 'notrend'
	}, {
		formulasetId: 1,
		name: 'trend'
	}, {
		formulasetId: 2,
		name: 'user'
	}, {
		formulasetId: 3,
		name: 'sector'
	}, {
		formulasetId: 4,
		name: 'aggregation'
	}],
	layout: {
		children: [{
			children: [{
				children: [{
					children: [{
						children: [],
						name: 'detl',
						size: 1
					}],
					name: 'qurt',
					size: 4
				}],
				name: 'half',
				size: 9
			}],
			name: 'bkyr',
			size: 19
		}],
		children13period: [{
			children: [{
				children: [],
				name: 'detl',
				size: 1
			}],
			name: 'bkyr',
			size: 13
		}],
		idx: 400,
		name: 'all',
		no: 0,
		period: [{
			formulasetId: 0,
			hash: 0,
			idx: 19
		}, {
			formulasetId: 1,
			hash: 1,
			idx: 400
		}],
		size: 400
	},
	navalue: 1e-10,
	nestedTupleMultiplier: 'undefined',
	time: {
		columnMultiplier: 1,
		columnSize: 400,
		columns: [{
			index: 0,
			name: 'jan/p1'
		}, {
			index: 1,
			name: 'fes/p2'
		}, {
			index: 2,
			name: 'mar/p3'
		}],
		periodMultiplier: 1,
		periodSize: 2,
		timelineMultiplier: 256,
		timelineSize: 1,
		timelines: [{
			index: 0,
			name: 'ExpertOptie-level5'
		}]
	},
	tupleMultiplier: 32768
};


function LMEFacade() {}

LMEFacade.prototype.initializeFFlModelData = function (data, path) {
	var JSWorkBook = void 0;
	if (path.includes('KSP')) {
		//KSP is only model with the 18year TimeModel, need 1 more example to generalize.
		JSWorkBook = new _JSWorkBook.JSWorkBook(new _Context.Context());
	} else {
		JSWorkBook = new _JSWorkBook.JSWorkBook(new _Context.Context(), new _TimeAxis2.default(resources), 'detl');
	}
	JSWorkBook.importFFL(data);
	JSWorkBook.validateImportedSolution();
	JSWorkBook.fixProblemsInImportedSolution();
	var validateFeedback = JSWorkBook.validateImportedSolution();
	if (validateFeedback.valid) {
		if (_log.DEBUG) (0, _log.debug)('Initialized model [' + JSWorkBook.getSolutionName() + ']');
	} else {
		if (_log.DEBUG) (0, _log.error)(validateFeedback);
		throw Error('unable to initialize');
	}
	return JSWorkBook;
};
/**
 * TODO: Inject this functions into the FunctionMap instead of global.
 * @param plugin
 */
LMEFacade.prototype.addFunctions = function (plugin) {
	Object.assign(global, plugin.entries);
	/*Object.keys(plugin.entries).forEach(function_name => {
  global[function_name] = plugin.entries[function_name]
  })*/
	if (_log.TRACE) (0, _log.trace)('Added fes-plugin [' + plugin.name + '] functions [' + Object.keys(plugin.entries) + ']');
};
/**
 * rowId - VariableName
 * @Optional value - new value
 * TODO: move to tupleDefinition to support multiple tuple definition/tuple in tuple
 */
// Convert tuple index to tuple number

LMEFacade.prototype.getValue = function (context, rowId) {
	var column_context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	var value = arguments[3];
	var tuple_index = arguments[4];

	var fesContext = new _Context.Context();
	fesContext._values = context.values;
	var JSWorkBook = new _JSWorkBook.JSWorkBook(fesContext);
	JSWorkBook.columns = context.columns || 2;
	JSWorkBook.properties = context.properties || JSWorkBook.properties;
	//prepare the workbook and context to match current appscope
	if (!context.isset) {
		JSWorkBook.updateValues();
		context.isset = true;
	}
	if (tuple_index != null) {
		tuple_index = JSWorkBook.tupleIndexForName(rowId, tuple_index);
		if (tuple_index === -1) tuple_index = JSWorkBook.insertTuple(rowId, tuple_index);
	}
	if (value !== undefined) {
		//choice(select) requests
		JSWorkBook.setSolutionPropertyValue(rowId, value, 'value', column_context, tuple_index);
		return [];
	} else {
		//getValue
		var values = [];
		var rootNode = JSWorkBook.getSolutionNode(rowId);
		if (rootNode) {
			JSWorkBook.walkProperties(rootNode, function (node, type, depth, yax) {
				values.push(getEntry(JSWorkBook, node.solutionName + '_' + node.rowId, column_context, yax));
			}, JSWorkBook.resolveY(tuple_index), null, 0);
		} else {
			values.push({ variable: rowId });
		}
		return values;
	}
};

LMEFacade.prototype.getObjectValues = function (context, rowId, tuple_index) {
	var fesContext = new _Context.Context();
	var JSWorkBook = new _JSWorkBook.JSWorkBook(fesContext);
	JSWorkBook.importValues(context.values);
	JSWorkBook.columns = context.columns || 2;
	JSWorkBook.properties = context.properties || JSWorkBook.properties;
	var values = [];
	if (!context.isset) {
		JSWorkBook.updateValues();
		context.isset = true;
	}
	if (tuple_index != null) {
		tuple_index = JSWorkBook.tupleIndexForName(rowId, tuple_index);
		if (tuple_index === -1) tuple_index = JSWorkBook.insertTuple(rowId, tuple_index);
	}
	var rootNode = JSWorkBook.getSolutionNode(rowId);
	var flattenValues = {};
	if (rootNode) {
		JSWorkBook.visitProperties(rootNode, function (node, type, innerTreeDepth, yax) {
			var nodeName = node.rowId;
			var parentName = node.parentName.split('_').slice(0, -1).join('_');
			var columns = node.frequency === 'document' ? 0 : context.columns;
			for (var i = 0; i <= columns; i++) {
				var appendix = columns === 0 ? '' : '$' + i;
				flattenValues[node.rowId + appendix] = {
					parent: parentName + appendix,
					name: nodeName,
					value: getValueObject(JSWorkBook, node.solutionName + '_' + node.rowId, i, yax),
					data: []
				};
			}
		}, JSWorkBook.resolveY(0).parent, null, 0);
		//reassemble results
		for (var key in flattenValues) {
			if (flattenValues[flattenValues[key].parent]) {
				flattenValues[flattenValues[key].parent][flattenValues[key].name] = flattenValues[key].value;
			} else {
				//array variants
				var parentName = flattenValues[key].parent.split('$')[0];
				if (flattenValues[parentName]) {
					flattenValues[parentName].data.push(flattenValues[key]);
				}
			}
		}
		for (var _key in flattenValues) {
			delete flattenValues[_key].parent;
			delete flattenValues[_key].name;
			if (flattenValues[_key].data.length === 0) delete flattenValues[_key].data;
		}
	} else {
		values.push({ variable: rowId });
	}
	/**
  * Values are not bound.
  */
	return flattenValues[rowId.split('_').slice(1).join('_')];
};

function getValueObject(workbook, rowId, column_context, yAxis) {
	var dataEntry = {};
	Object.keys(workbook.properties).forEach(function (type) {
		dataEntry[type] = workbook.getSolutionPropertyValue(rowId, type, column_context, yAxis);
	});
	return dataEntry;
}

/**
 * Given properties in workbook return all values for given columns
 * @param workbook
 * @param rowId
 * @param column_context
 * @param yAxis
 * @returns {Array}
 */
function getEntry(workbook, rowId, column_context, yAxis) {
	var outputData = [];
	var columnStart = column_context;
	var columnEnd = workbook.columns;
	var variable = workbook.getSolutionNode(rowId, 'value');

	if (variable && variable.frequency === 'document') {
		columnEnd = columnStart;
	}
	var tupleStart = 0;
	var tupleEnd = 0;

	// If frequency = column: return multiple columns
	for (var xAxisCounter = columnStart; xAxisCounter <= columnEnd; xAxisCounter++) {
		var dataEnty = {};
		outputData.push(dataEnty);

		// For properties of the variable
		for (var type in workbook.properties) {
			dataEnty[type] = workbook.getSolutionPropertyValue(rowId, type, xAxisCounter, yAxis);

			if (columnStart !== columnEnd || columnStart > 0) {
				dataEnty.column = xAxisCounter;
			}
			dataEnty.variable = variable.rowId;
			if (variable.tuple) {
				dataEnty.tupleIndex = yAxis.index;
			}
			dataEnty.hash = yAxis.hash + xAxisCounter + 0;
		}
	}
	//if there is only one column, the exported value is not presented to be an array
	if (columnStart === columnEnd) {
		outputData = outputData[0];
	}
	return outputData;
}

var DOCUMENT = 'document',
    VALUE = 'value',
    VISIBLE = 'visible',
    DETAIL_INTERVAL = 'detl',
    NUMBER = 'number',
    COLUMN = 'column',
    TITLE = 'title',
    ENCODING = 'utf8';
exports.Context = _Context.Context;
exports.WorkBook = _JSWorkBook.JSWorkBook;
exports.SolutionFacade = _SolutionFacade2.default;
exports.YAxis = _YAxis2.default;
exports.ValueFacade = _ValueFacade2.default;
exports.PropertiesAssembler = _PropertiesAssembler2.default;
exports.FormulaService = _FormulaService2.default;
exports.JSVisitor = _JSVisitor2.default;
exports.TimeAxis = _TimeAxis2.default;
exports.XAxis = _XAxis2.default;
exports.Register = _Register.Register;
exports.resources = resources;
exports.AuditTrail = _AuditTrail.AuditTrail;
exports.DETAIL_INTERVAL = DETAIL_INTERVAL;
exports.COLUMN = COLUMN;
exports.DOCUMENT = DOCUMENT;
exports.VALUE = VALUE;
exports.VISIBLE = VISIBLE;
exports.ENCODING = ENCODING;
exports.NUMBER = NUMBER;
exports.TITLE = TITLE;
exports.default = LMEFacade.prototype;