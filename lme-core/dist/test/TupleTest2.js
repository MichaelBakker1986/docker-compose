'use strict';

var _log = require('log6');

var _ = require('../');

var _lme = require('../../lme-model-api/src/lme');

var _lme2 = _interopRequireDefault(_lme);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _assert = require('assert');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//We add custom TimeAxis because we are going to extend columns here to the max to test the 10bit into tuple range
var defaultImport = {
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


var TUPLE_TEST = new _lme2.default(defaultImport, new _.Context({ columnSize: 1, columns: [_.VALUE] }));
var wb = TUPLE_TEST.lme;
TUPLE_TEST.importFFL(_fs2.default.readFileSync(__dirname + '/TupleTest.ffl', 'utf8'));
var rootVariable = wb.getRootSolutionProperty();
wb.set('Tuple', '123', 'value', 0, _.YAxis[1]);
(0, _assert.equal)(wb.maxTupleCountForRow(wb.findNode('Tuple'), _.YAxis[0].parent), 1);
wb.set('NestedTuple', '123', 'value', 0, _.YAxis[1].deeper[0]);
(0, _assert.equal)(wb.maxTupleCountForRow(wb.findNode('NestedTuple'), _.YAxis[0].deeper[0]), -1, 'There is a Tuple instance on 1,0 but not on 0,0');
(0, _assert.equal)(wb.maxTupleCountForRow(wb.findNode('NestedTuple'), _.YAxis[1].deeper[0]), 0, ' We just added a nested tuple instance here');
(0, _assert.equal)(wb.maxTupleCountForRow(wb.findNode('NestedTuple'), _.YAxis[2].deeper[0]), -1, 'No instance here');
(0, _assert.equal)(wb.maxTupleCountForRow(wb.findNode('NestedTuple'), _.YAxis[3].deeper[0]), -1);
(0, _assert.equal)(wb.maxTupleCountForRow(wb.findNode('NestedTuple'), _.YAxis[4].deeper[0]), -1);
(0, _assert.equal)(wb.maxTupleCountForRow(wb.findNode('Tuple'), _.YAxis[0].deeper[0]), -1, 'No Instance here');
(0, _assert.equal)(wb.maxTupleCountForRow(wb.findNode('Tuple'), _.YAxis[1].deeper[0]), 0, 'there is an instance here');
wb.set('Tuple', '123', 'value', 0, _.YAxis[1].deeper[0]);
(0, _assert.equal)(wb.maxTupleCountForRow(wb.findNode('Tuple'), _.YAxis[1]), 0);
(0, _assert.equal)(wb.maxTupleCountForRow(wb.findNode('NestedTuple'), _.YAxis[2].deeper[2]), -1);
//its strange to see why the first tuple shows 3nested instances also
wb.walkProperties(rootVariable, function (node, yax, treeDepth, y) {
	if (_log.DEBUG) (0, _log.debug)(y.display + ' '.repeat(treeDepth) + node.rowId);
}, _.YAxis[0].parent, null, 0);