import tracer from 'tracer'

const format = process.env.TIME_FORMAT || 'HH.MM.ssl'
const logLevel = process.env.ENV || 'info'
const levels = {
	debug: {
		DEBUG: true,
		TRACE: false,
		WARN : true,
		INFO : true
	},
	info : {
		DEBUG: false,
		TRACE: false,
		WARN : true,
		INFO : true
	},
	error: {
		DEBUG: false,
		TRACE: false,
		INFO : false,
		WARN : false
	},
	trace: {
		DEBUG: true,
		TRACE: true,
		INFO : true,
		WARN : true
	}
}
const console = tracer.colorConsole({
	format    : '{{timestamp}} ({{file}}:{{line}}) \t- {{message}}',
	dateformat: format,
	level     : logLevel,
	preprocess: ({ args }) => {
		if (args.length > 0) {
			const [first_arg] = args
			if (typeof (first_arg.toString) === 'function') {
				args[0] = first_arg.toString()
			} else if (first_arg.stack) {
				args[0] = first_arg.stack
			}
		}
	}
})
console.DEBUG = levels[logLevel].DEBUG
console.INFO = levels[logLevel].INFO
console.TRACE = levels[logLevel].TRACE
console.WARN = levels[logLevel].WARN
module.exports = console

export const info = console.info
export const error = console.error
export const trace = console.trace
export const warn = console.warn
export const debug = console.debug
export default console