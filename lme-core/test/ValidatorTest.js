import { Validator } from '../src/Validator'
import { Register }  from '../src/Register'
import { ok }        from 'assert'

const register = new Register(['name', 'modifier', 'refersto'])
register.addRows([
	['a', 'b', 'c', 'd'],
	['b', 'b', 'd', 'd'],
	['c', 'b', 'c', 'd']
])
const validator = new Validator(register)
validator.validateIntegrity()
const feedBack = validator.feedBack()

ok(!feedBack.fail, `Should not fail :) ${feedBack.toString()}`)

