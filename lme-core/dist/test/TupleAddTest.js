'use strict';

var _ = require('../');

var _assert = require('assert');

require('../../math');

var wb = new _.WorkBook(new _.Context(), null, null, { modelName: 'TADDINSTANCE' }); /**
                                                                                      * Test TupleAdd Function and concepts
                                                                                      * (i) This could be a JBehave story(s)
                                                                                      *  - YAxis[t1].deeper[t2] would be Child(t1,t2) in the story
                                                                                      *  - Would be parsed ffl- alike...
                                                                                      *  When ChildGender(Piet) is set to Male would imply a Tuple Child(Piet) to be exist then modifying Child(Piet).ChildGender into Male
                                                                                      */

wb.createFormula('0', 'TupleValue', 'value', true, 'document', 'number');
var node = wb.findNode('TupleValue');

/**
 * 0-Tuple_ADD
 */
(0, _assert.equal)(wb.maxTupleCountForRow(node), -1);
(0, _assert.equal)(wb.addTuple('TupleValue', 'Piet').display, '0000');
(0, _assert.equal)(wb.maxTupleCountForRow(node), 0);
(0, _assert.equal)(wb.addTuple('TupleValue', 'Jan_').display, '1000');
(0, _assert.equal)(wb.maxTupleCountForRow(node), 1);

/**
 * 1-Tuple_ADD
 * It's possible to use a single TupleDefinition to be 0-tuple, 1-tuple, 2-tuple since the values are stored in different parts of the index.
 * Yet, adding the 0,0,0 instance will in all depths result in one entry filled.
 */
(0, _assert.equal)(wb.maxTupleCountForRow(node, _.YAxis[0]), 0);
(0, _assert.equal)(wb.addTuple('TupleValue', 'Harry', _.YAxis[0]).display, '0100');
(0, _assert.equal)(wb.maxTupleCountForRow(node, _.YAxis[0]), 1);
(0, _assert.equal)(wb.addTuple('TupleValue', 'John_', _.YAxis[0]).display, '0200');
(0, _assert.equal)(wb.maxTupleCountForRow(node, _.YAxis[0]), 2);

/**
 * 2-Tuple_ADD
 * 0000 is taken, so 0010 will be assigned
 */
(0, _assert.equal)(wb.maxTupleCountForRow(node, _.YAxis[0].deeper[0]), 0);
(0, _assert.equal)(wb.addTuple('TupleValue', 'Sanne', _.YAxis[0].deeper[0]).display, '0010');
(0, _assert.equal)(wb.maxTupleCountForRow(node, _.YAxis[0].deeper[0]), 1);
(0, _assert.equal)(wb.addTuple('TupleValue', 'Rick_', _.YAxis[0].deeper[0]).display, '0020');
(0, _assert.equal)(wb.maxTupleCountForRow(node, _.YAxis[0].deeper[0]), 2);

/**
 * 2,1-Tuple_ADD
 * 0200 is taken, so 0210 will be assigned
 */
(0, _assert.equal)(wb.addTuple('TupleValue', 'Steve___', _.YAxis[0].deeper[2]).display, '0210');
(0, _assert.equal)(wb.addTuple('TupleValue', 'SteveJob', _.YAxis[0].deeper[2]).display, '0220');