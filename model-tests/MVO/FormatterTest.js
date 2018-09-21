/**
 * test consitency and speed of the formatter
 */
import { FFLToRegister } from '../../lme-core/exchange_modules/ffl/FFLToRegister'
import { Register }      from '../../lme-core/exchange_modules/ffl/Register'
import assert            from 'assert'
import now               from 'performance-now'
import { readFileSync }  from 'fs'

const fflFile = readFileSync(__dirname + '/MVO.ffl', 'utf8')

try {
	const start = now()
	const formatterTry1 = new FFLToRegister(new Register(), fflFile)
	formatterTry1.parseProperties()
	const parse = formatterTry1.toString()
	const time = (now() - start).toFixed(0)
	assert(time < 120, 'formatting KSP twice may never take longer than 120ms')
} catch (err) {
	//re-try
	var start = now()
	const formatterTry2 = new Formatter(new Register(), fflFile)
	formatterTry2.parseProperties()
	const parse = formatterTry2.toString()
	const time = (now() - start).toFixed(0)
	assert(time < 120, 'formatting KSP twice may never take longer than 120ms')
}
