'use strict';

var _algebra = require('algebra.js');

var _log = require('log6');

require('../');

var expr = new _algebra.Expression('x');
(0, _log.info)(expr.toString());
expr = expr.subtract(3);
var eq1 = new _algebra.Equation(expr, 4);
(0, _log.info)(eq1.toString());
eq1.solveFor('x').toString();

var eq = new _algebra.Equation((0, _algebra.parse)('a'), (0, _algebra.parse)('b+c'));
(0, _log.info)(eq.toString());
(0, _log.info)('b = ' + eq.solveFor('b').toString());
(0, _log.info)('c = ' + eq.solveFor('c').toString());

var mySolver = SOLVER({
	a: 'b+c',
	b: 'a-test(c)',
	c: 'a-b'
});
var test = function test(c) {
	return c;
};