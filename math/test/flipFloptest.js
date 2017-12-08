require('../')

let algebra = require("algebra.js");
var Equation = algebra.Equation;
var Expression = algebra.Expression;
var expr = new Expression("x");
console.log(expr.toString());
expr = expr.subtract(3);
var eq = new Equation(expr, 4);
console.log(eq.toString());
var x = eq.solveFor("x").toString();


var eq = new Equation(algebra.parse("a"), algebra.parse("b+c"));
console.log(eq.toString());
console.log("b = " + eq.solveFor("b").toString());
console.log("c = " + eq.solveFor("c").toString());



var mySolver = SOLVER({
    a: 'b+c',
    b: 'a-test(c)',
    c: 'a-b'
})
test = function(c) {
    return c;
}