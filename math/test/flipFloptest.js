import { Equation, Expression, parse } from 'algebra.js'
import { info }                        from 'log6'
import '../'

let expr = new Expression('x')
info(expr.toString())
expr = expr.subtract(3)
const eq1 = new Equation(expr, 4)
info(eq1.toString())
eq1.solveFor('x').toString()

const eq = new Equation(parse('a'), parse('b+c'))
info(eq.toString())
info('b = ' + eq.solveFor('b').toString())
info('c = ' + eq.solveFor('c').toString())

const mySolver = SOLVER({
	a: 'b+c',
	b: 'a-test(c)',
	c: 'a-b'
})
const test = function(c) {
	return c
}