'use strict';

var _SolutionFacade = require('../../src/SolutionFacade');

var _SolutionFacade2 = _interopRequireDefault(_SolutionFacade);

var _PropertiesAssembler = require('../../src/PropertiesAssembler');

var _PropertiesAssembler2 = _interopRequireDefault(_PropertiesAssembler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parser object
 */
/**
 * Gives a Object-oriented view over a part of the model
 * Objectify the entire model is simply too expensive to do. 128(t3)*128(t2)*128(t1)*128(t0)*500(cols)*5000(vars)...
 * So we focus on the parts that are created, active and interesting to see/modify
 *
 * The LMETree has .sort() to sort the entire rows array naturally
 *  Ordering the Nodes requires a somewhat complex sort-function.
 *  ((VariableID|TupleDefinitionID),tIndex(tDepth)){maxTupleDepth}
 *  e.g: 0005,001,0006,000,0006,000 = 0006(John)
 *  e.g: 0005,001,0006,000,0008,001 = 0008(John,CarPayment)
 *
 *  Where id's are translated into Unique names per tIndex
 *  So 0005,001 is always the First (John) in this example
 *  So 0005,001,0006,000 is always the First (John,CarPayment) in this example
 *  0008 can be any child-variable in 0005.0006.* Example John.CarPayment.Status
 *
 * (!)       TODO:                                                      Another option should be
 * (?) be aware null-tuple is post-fixed with ,0,0 : t(2)    => 2,0,0 | 2,2,2
 * (?) be aware first-tuple is post-fixed with ,0  : t(4,1)  => 4,1,0 | 4,1,1
 *
 *  So will mean that:
 *  a(0)       = a0a0a0
 *   b(0,0)    = a0b0b0
 *    d(0,0,0) = a0b0d0
 *   b(0,1)    = a0b1b0 (!) what to do with the last index? re-use the one before or not?
 *    d(0,1,1) = a0b1d1
 *   b(0,tMax) = a0b9b0
 *  a(1)       = a1a0a0 (!) what to do with the last index? re-use the one before or not?
 *   b(1,tMax) = a1b9b0
 *  e(0)       = e0e0e0
 *
 * The LMETree.nodes has a blueprint from the entire model. (without tuple-instances, and not hiding the Tuple Definition)
 * The LMETree.no has all created nodes in a map, to speed up lookups.
 * The LMETree.rows is the Array, used for manipulation/view
 */
function WebExportParser() {
	this.name = 'webexport';
	this.headername = 'Native Object Web Presentation';
}

/**
 * LMETree is a array-based representation of the internal data-structure
 * Easy to manipulate with Tuples,
 *  - First-level caching. (SetValue will increment all getters to just retrieve the values once)
 *  - Basic NULL and Empty string to NA converter
 * Every object in the members, no|nodes and rows have the DOCUMENT properties
 * the cols member in the rows is a list of repeated elements in time
 *
 *  - a Document frequency variable contains [title,document_value]
 *  - a None frequency variable contains [document_value]
 *  - a Column frequency variable contains [title,{column_value*,}+]
 */
function LMETree(name, workbook) {
	this.name = name;
	this.workbook = workbook;
	this.nodes = {};
	this.names = {};
	this.rows = [];
	this.no = {};
	this.repeats = {
		undefined: [workbook.context.columnSize, 1],
		none: [1, 1],
		column: [workbook.context.columnSize, 1],
		document: [1, workbook.context.columnSize],
		timeline: [1, workbook.context.columnSize]
	};
	this.columns = workbook.context.columns;
	var rowColumns = workbook.context.columns.slice();
	if (this.columns.indexOf('choices') === -1) rowColumns.push('choices');
	this.propertyNames = rowColumns;
	this.tuplecounter = 0;
}

LMETree.prototype.findWebNode = function (name) {
	return this.rows.find(function (n) {
		return n.id === name;
	});
};
/**
 * Sort created rows output for UI
 */
LMETree.prototype.sortRows = function () {
	this.rows.sort(function (a, b) {
		if (a.order_id === b.order_id) throw Error('Duplicate variable names in financial model are not supported. Choose an unique name for every variable. [' + a.id + '] in \'' + b.path + '\' and in \'' + a.path + '\'');
		return a.order_id === b.order_id ? 0 : a.order_id < b.order_id ? -1 : 1;
	});
};
LMETree.prototype.findScorecardTypes = function () {
	var scorecards = [];
	for (var name in this.no) {
		var row_element = this.no[name];
		if (row_element.type === 'scorecard' || row_element.display_options === 'scorecard') scorecards.push(row_element);
	}
	return scorecards;
};

function noChange(workbook, rowId, col, index, type, yas) {
	var r = void 0; //return value
	var c = -1; //calculation counter
	return {
		get: function get() {
			if (workbook.context.calc_count !== c && c < 0) {
				c = workbook.context.calc_count;
				r = workbook.get(rowId, col, index, yas);
			}
			return r;
		}
	};
}

function changeAble(workbook, rowId, col, index, type, yas) {
	var r = void 0; //return value
	var c = -1; //calculation counter
	return {
		get: function get() {
			if (workbook.context.calc_count !== c) {
				c = workbook.context.calc_count;
				r = workbook.get(rowId, col, index, yas);
			}
			return r;
		}
	};
}

function changeAndCache(workbook, rowId, col, index, type, yas) {
	var r = void 0; //return value
	var c = -1; //calculation counter
	return {
		get: function get() {
			if (workbook.context.calc_count !== c) {
				c = workbook.context.calc_count;
				r = workbook.get(rowId, col, index, yas);
			}
			return r;
		},
		set: function set(v) {
			workbook.set(rowId, v == null || v === '' ? null : v, col, index, yas);
		}
	};
}

/**
 * Cache means only resolve once
 * Change means user can modify the value
 */
var properties = {
	title: { change: true, prox: changeAndCache },
	original: { change: true, prox: noChange },
	value: { change: true, prox: changeAndCache },
	visible: { prox: changeAble },
	entered: { prox: changeAble },
	valid: { prox: changeAble },
	locked: { prox: changeAble },
	required: { prox: changeAble },
	hint: { cache: true, prox: noChange },
	choices: { cache: true, prox: noChange }
};

LMETree.prototype.addTupleNode = function (node, treePath, index, yas, treeDepth) {
	var tree = this;
	var unique = yas.display + '__' + node.rowId;
	var workbook = this.workbook;
	var rowId = node.rowId;
	var amount = this.repeats.document[0];
	var colspan = this.repeats.document[1];
	var parent = this.nodes[yas.display + '_' + treePath[treePath.length - 1]];
	var path = treePath.join('.');
	var has = node.hash.slice();
	if (yas.depth === 0) {
		has[1] = '999';
	} else if (yas.depth === 1) {
		has[1] = yas.uihash;
		has[3] = '999';
	} else if (yas.depth === 2) {
		has[1] = yas.parent.uihash;
		has[3] = yas.uihash;
		has[5] = '999';
	} else if (yas.depth === 3) {
		//throw Error('Something wrong here..')
		has[1] = yas.parent.uihash;
		has[3] = yas.uihash;
		has[5] = '999';
	}
	var rv = {
		id: rowId,
		order_id: has.join('.'),
		treeDepth: treeDepth,
		add: function add() {
			var inneryas = workbook.addTuple(node.rowId, ++tree.tuplecounter + '_' + yas.display + '_' + node.rowId, yas);
			workbook.set(node.rowId, inneryas.display + ':' + node.rowId, 'value', undefined, inneryas);
			workbook.walkProperties(node, function (child, yasi, cTreeDepth, yi) {
				if (yasi === 'new') {
					tree.addTupleNode(child, path.split('.'), index, yi, cTreeDepth);
				} else {
					tree.addWebNode(child, path.split('.'), index, yi, cTreeDepth);
				}
			}, inneryas, node.rowId, treePath.length);
			return inneryas;
		},
		//index is deprecated. Lookup the next sibling when needed. Could be tuple..
		index: index,
		title_locked: node.title_locked,
		type: 'tuple_add',
		path: path,
		ammount: amount,
		display: yas.display,
		colspan: colspan,
		depth: yas.depth + 1, //This could be a quick-fix to a serious problem.
		cols: [{
			value: unique,
			entered: false,
			type: 'tuple_add',
			locked: true,
			visible: true,
			valid: true
		}],
		children: []
	};
	if (node.display_options) rv.display_options = node.display_options;
	/**
  * Proxy properties to the row object
  */
	for (var columnIndex = 0; columnIndex < this.columns.length; columnIndex++) {
		var col = this.columns[columnIndex];
		rv[col] = null;
		Object.defineProperty(rv, col, properties[col].prox(workbook, rowId, col, 0, undefined, yas));
	}
	if (parent) parent.children.push(rv);
	this.nodes[unique] = rv;
	this.rows.push(rv);
};
LMETree.prototype.diagnose = function (_ref) {
	var _ref$auto_join = _ref.auto_join,
	    auto_join = _ref$auto_join === undefined ? true : _ref$auto_join;

	var rows = this.rows.map(function (row) {
		return '' + row.order_id + ' '.repeat(row.depth) + row.id;
	});
	return auto_join ? rows.join('\n') : rows;
};

LMETree.prototype.addWebNode = function (node, treePath, index, yas, treeDepth) {
	var workbook = this.workbook;
	var rowId = node.rowId;
	var unique = yas.display + '_' + rowId;
	var amount = this.repeats[node.frequency][0];
	var colspan = this.repeats[node.frequency][1];
	var type = node.displaytype;
	var displaytype = type;
	var path = treePath.join('.');
	var has = node.hash.slice();
	//alright this is a big step. and seems to work (there is a variable set wrongly.)
	if (yas.depth === 0) {
		has[1] = yas.uihash;
	} else if (yas.depth === 1) {
		has[1] = yas.uihash;
	} else if (yas.depth === 2) {
		has[3] = yas.uihash;
		has[1] = yas.parent.uihash;
	} else if (yas.depth === 3) {
		has[5] = yas.uihash;
		has[3] = yas.parent.uihash;
		has[1] = yas.parent.parent.uihash;
	}
	var rv = {
		id: rowId,
		treeDepth: treeDepth,
		depth: yas.depth,
		display_options: node.display_options,
		display: yas.display,
		order_id: has.join('.'),
		index: index,
		title_locked: node.title_locked,
		type: node.displaytype,
		path: path,
		ammount: amount,
		colspan: colspan,
		tupleDefinition: node.tupleDefinition,
		cols: [],
		children: []
	};

	Object.defineProperty(rv, 'firstChild', {
		get: function get() {
			return rv.children.length > 0 ? rv.children[0] : null;
		}
	});

	/**
  * Proxy properties to the column objects
  */
	var rt = {};
	Object.defineProperty(rt, 'value', properties.title.prox(workbook, rowId, 'title', 0, undefined, yas));
	if (node.frequency !== 'none') {
		rv.cols.push({
			value: null,
			entered: null,
			type: 'title',
			visible: true,
			locked: null,
			valid: null
		});
	}
	for (var column_index = 0; column_index < amount; column_index++) {
		var r = {
			type: type,
			value: null,
			visible: null,
			entered: null,
			required: null,
			locked: null,
			valid: null
		};
		rv.cols.push(r);
		for (var propertyIndex = 0; propertyIndex < this.propertyNames.length; propertyIndex++) {
			var propertyName = this.propertyNames[propertyIndex];
			Object.defineProperty(r, propertyName, properties[propertyName].prox(workbook, rowId, propertyName, column_index, displaytype, yas));
		}
	}
	/**
  * Proxy properties to the row object
  */
	for (var columnIndex = 0; columnIndex < this.columns.length; columnIndex++) {
		var col = this.columns[columnIndex];
		rv[col] = null;
		Object.defineProperty(rv, col, properties[col].prox(workbook, rowId, col, 0, displaytype, yas));
	}
	var parent = this.nodes[yas.display + '_' + treePath[treePath.length - 1]];
	if (parent) {
		parent[rowId] = rv;
		parent.children.push(rv);
	}
	this.nodes[unique] = rv;
	this.no[rowId] = rv;
	this.rows.push(rv);
};
WebExportParser.prototype.parseData = function (webExport, workbook) {
	return _SolutionFacade2.default.createSolution(workbook.modelName);
};

WebExportParser.prototype.deParse = function (rowId, workbook) {
	var modelName = workbook.getSolutionName();
	var lmeTree = new LMETree(modelName, workbook);
	_PropertiesAssembler2.default.findAllInSolution(modelName, function (node) {
		return lmeTree.names[node.rowId] = true;
	});
	var treePath = [];
	var currentDepth = 0;
	var indexPath = [];
	//make the walk here,
	var rootNode = workbook.fetchSolutionNode(rowId, 'value') || workbook.getRootSolutionProperty(modelName);
	_PropertiesAssembler2.default.indexProperties(modelName);

	workbook.walkProperties(rootNode, function (node, yas, treeDepth, y) {
		if (node && node.rowId !== 'root') {
			if (treeDepth > currentDepth) {
				treePath.push(node.parentrowId);
				indexPath.push(-1);
				currentDepth = treeDepth;
			} else if (treeDepth < currentDepth) {
				treePath.length = treeDepth;
				indexPath.length = treeDepth;
				currentDepth = treeDepth;
			}
			var index = indexPath[indexPath.length - 1] + 1;
			indexPath[indexPath.length - 1] = index;
			if (yas === 'new') {
				lmeTree.addTupleNode(node, treePath, index, y, treeDepth);
			} else {
				lmeTree.addWebNode(node, treePath, index, y, treeDepth);
			}
		}
	}, workbook.resolveY(0).parent, null, 0);
	return lmeTree;
};
_SolutionFacade2.default.addParser(new WebExportParser());