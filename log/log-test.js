import assert from 'assert'
import log    from './log'

const debug = (process.env.ENV === 'debug')
log.dateformat = 'HHMM;ssl'
if (debug) {
	assert.equal(log.DEBUG, true)
	assert(log.INFO === true)
	assert(log.TRACE === false)
} else {
	assert(log.DEBUG === false)
	assert(log.INFO === true)
	assert(log.TRACE === false)
}