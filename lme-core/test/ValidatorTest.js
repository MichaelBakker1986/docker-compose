import { Validator } from '../src/Validator'
import { Register }  from '../src/Register'
import { ok }        from 'assert'

function testMissing() {
	const register = new Register(['name', 'modifier', 'refersto'])
	register.addRows([
		['a', 'b', 'c', 'd'],
		['b', 'b', 'd', 'd'],
		['c', 'b', 'c', 'd']
	])
	const validator = new Validator(register)
	validator.validateIntegrity()
	const feedBack = validator.feedBack()

	ok(feedBack.fail, `Should fail b missing d. ${feedBack.toString()}`)
}

function testNoReferstoAvail() {
	const register = new Register(['name', 'modifier', 'refersto'])
	register.addRows([
		['a', 'b', 'c', 'd'],
		['b', 'b', null, 'd'],
		['c', 'b', undefined, 'd']
	])
	const validator = new Validator(register)
	validator.validateIntegrity()
	const feedBack = validator.feedBack()
	ok(!feedBack.fail, `Should not fail :) ${feedBack.toString()}`)
}

testMissing()
testNoReferstoAvail()
