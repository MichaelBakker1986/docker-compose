require('../')
const log = require('log6')

let algebra = require("algebra.js");
var Equation = algebra.Equation;
var Expression = algebra.Expression;
var expr = new Expression("x");
log.info(expr.toString());
expr = expr.subtract(3);
var eq = new Equation(expr, 4);
log.info(eq.toString());
var x = eq.solveFor("x").toString();


var eq = new Equation(algebra.parse("a"), algebra.parse("b+c"));
log.info(eq.toString());
log.info("b = " + eq.solveFor("b").toString());
log.info("c = " + eq.solveFor("c").toString());



var mySolver = SOLVER({
    a: 'b+c',
    b: 'a-test(c)',
    c: 'a-b'
})
test = function(c) {
    return c;
}