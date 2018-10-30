/**
 * JBehave testing is just more easy to make and maintain while innovation is happening
 * Concepts on functional differentiation are tested, which are n(1) instead of n(^n), which leads to less shortcuts in tests.
 *
 * There is one thing to do here. Convert JBehave text files into LME statements.
 *  1) Set a Value given in the story
 *  2) Assert a value provided within the story
 */
import { DEBUG, TRACE, trace, warn } from 'log6'
import { LOCKED, VALUE, VISIBLE }    from '../../lme-core/index'

const map_property = {
	'invisible': VISIBLE,
	'visible'  : VISIBLE
}
const functionMapper = {
	//And variable Q_MAP04_VRAAG12 is set to 0 for document
	setValue          : {
		// ------------------------------------------------------VARIABLE_NAME--TUPLE_NAME
		regex: /^\s*(?:When|Then|And)\s+(?:a |an )?(?:variable |tuple )*(\w+)(\((\w+,?){0,3}\))? is set to ([-0-9,.A-z]+)\s*(?:(?:for column with id (\d+))|(for document))?\s*$/i,
		call : function(workbook, line_number, line, args) {

			const variableName   = args[0],
			      tupleIndexName = args[1],
			      value          = args[3],
			      columnId       = (parseInt(args[4]) || 1) - 1

			return [function() {
				if (TRACE) trace('JBehave called line [%s]: %s %s', line_number, variableName, tupleIndexName)

				if (workbook.getNode(variableName)) {
					const yas = workbook.resolveYas(variableName, tupleIndexName)
					const lockedValue = workbook.get(variableName, LOCKED, columnId, yas)

					const typed_value = isNaN(value) ? value : Number(value)

					workbook.set(variableName, value === 'NA' ? NA : typed_value, VALUE, columnId, yas)
					const validValue = workbook.isValidInput(variableName, columnId, yas, typed_value)
					if (lockedValue) {
						return {
							status : 'fail',
							message: `${variableName} cannot be set to typed_value [${typed_value}]. Because [${variableName} is locked for user input.`
						}
					}
					else if (validValue.length <= 0) {
						return {
							status : 'info',
							message: variableName + (tupleIndexName || '') + ' is set to ' + typed_value
						}
					} else {
						return {
							status : 'fail',
							message: `${variableName} cannot be set to typed_value [${typed_value}]. Because [${validValue}]`
						}
					}
				} else {
					return {
						status : 'fail',
						message: `${variableName} is does not exist`
					}
				}
			}]
		}
	},
	cleanDocumentState: {
		/* One story can have multiple contexts, this for now will just clean the current state. */
		regex: /^\s*Given an? Context(\((\w+,?){0,3}\))?(?: for year (\d+))?/i,
		call : function(workbook, line_number, line, args) {
			const start_year = parseInt(args[2] || new Date().getFullYear())
			return [function() {
				workbook.clearValues()
				workbook.context._values.absolute_start_year = start_year
				if (TRACE) trace('Document values cleared')
				return {
					status : 'info',
					message: 'New context created.'
				}
			}]
		}
	},
	assertValue       : {
		//Then variable Q_MAP01_SUBSCORE01 should have 0 decimals rounded value 14 for document
		//And variable TotalYearlyCosts should have 0 decimals rounded 15944 for column with id 1
		regex: /^\s*(?:When|Then|And)\s+(?:a |an )?(?:tuple )?(?:variable )?(\w+)(\((\w+,?){0,3}\))?(?: in tuple (\w+))? should (?:have |be )?(?:(\d+) decimals rounded value )?([-0-9,.A-z]+)\s*(?:(?:for column with id (\d+))|(for document))?/i,
		call : function(workbook, line_number, line, args) {

			const maptable = {
				'OI'       : 'Onvolledig ingevuld.',
				'invisible': false,
				'visible'  : true,
				'NA'       : NA
			}
			//default decimals are defined by the amount of decimals in the value.
			const variableName   = args[0],
			      tupleIndexName = args[1] || (args[3] ? '(' + args[3] + ')' : null),
			      decimals       = (args[4] || (args[5].split('.')[1] || '').length),
			      //Should the input be validated?
			      testProperty   = args[5] === 'invisible' || args[5] === VISIBLE,
			      property       = map_property[args[5]] || VALUE,
			      value          = maptable[args[5]] == null ? args[5] : maptable[args[5]],
			      columnId       = (parseInt(args[6]) || 1) - 1

			return [function() {
				const result = {}
				const yas = workbook.resolveYas(variableName, tupleIndexName)
				const rawValue = workbook.get(variableName, property, columnId, yas)
				const validValue = workbook.get(variableName, 'valid', columnId, yas)
				let testValue = value
				let calculatedValue = rawValue
				if (decimals != null && property === VALUE && !isNaN(calculatedValue) && !isNaN(value)) {
					calculatedValue = Number(calculatedValue.toFixed(decimals))
					testValue = Number(Number(value).toFixed(decimals))
				}
				if (TRACE) trace('[%s]: assert value calculated[%s] [%s] decimals[%s] [%s]', line_number, calculatedValue, variableName, decimals, value)
				if (calculatedValue !== testValue) {
					result.status = 'fail'
					result.message = variableName + (tupleIndexName || '') + ' should be ' + value + '. But is ' + calculatedValue
				} else if (testProperty && validValue.length > 0) {
					result.status = 'fail'
					result.message = rawValue + ' is not a valid value for ' + variableName + (tupleIndexName || '') + '. Because ' + validValue
				} else {
					result.status = 'info'
					result.message = variableName + (tupleIndexName || '') + ' is ' + calculatedValue
				}
				return result
			}]
		}
	},
	assertProperty    : {
		regex: /^\s*(?:When|Then|And)\s+(?:a |an )?(?:variable )?(\w+)(\((\w+,?){0,3}\))?\.(\w+) should (?:have |be )? ([-0-9,.A-z]+)/i,
		call : function(workbook, line_number, line, args) {
			const variableName   = args[0],
			      tupleIndexName = args[1],
			      pname          = args[3],
			      value          = args[4]
			return [function() {
				const result = {}
				const yas = workbook.resolveYas(variableName, tupleIndexName)
				const rawValue = workbook.get(variableName, pname, null, yas)
				let calculatedValue = rawValue
				if (TRACE) trace('[%s]: assert value calculated[%s] [%s]  [%s]', line_number, calculatedValue, variableName, value)
				if (calculatedValue !== value) {
					result.status = 'fail'
					result.message = (tupleIndexName || '') + ' is not ' + value + ' raw value ' + rawValue
				} else {
					result.status = 'info'
					result.message = `Variable ${variableName} = ` + (tupleIndexName || '') + ' is ' + value + ' [' + rawValue + ']'
				}
				return result
			}
			]
		}
	}
}

function StoryParser(story, filename, workbook) {
	this.filename = filename
	this.workbook = workbook
	this.lines = story.split('\n')
	this.calls = []
	this.results = {
		passed: 0,
		failed: 0,
		total : 0,
		rate  : function() {
			return (100 / this.total) * (this.passed)
		}
	}
}

StoryParser.prototype.start = function() {
	for (let lineNumber = 0; lineNumber < this.lines.length; lineNumber++) {
		let jBehaveMatchFound = false
		const line = this.lines[lineNumber]
		if (line.trim() === '') continue//empty lines
		if (line.startsWith('@')) continue//just meta-data
		for (let mappedKey in functionMapper) {
			if (line.match(functionMapper[mappedKey].regex)) {
				jBehaveMatchFound = true
				const functions = functionMapper[mappedKey].call(this.workbook, lineNumber, line, line.match(functionMapper[mappedKey].regex).slice(1))
				const lineAction = {
					line: {
						line      : line.trim(),
						lineNumber: lineNumber + 1
					},
					functions
				}
				this.calls.push(lineAction)
			}
		}
		if (!jBehaveMatchFound && DEBUG) warn(`No match [${this.filename}] [${lineNumber}]:[%s]`, line.trim())
	}
}
StoryParser.prototype.call = function() {
	for (let i = 0; i < this.calls.length; i++) {
		const call = this.calls[i]
		const functions = call.functions
		for (let callIndex = 0; callIndex < functions.length; callIndex++) {
			const functionCall = functions[callIndex]
			//TODO: can have multiple calls on one row..
			const on = {
				type: 'call',
				raw : call.line,
				line: call.line.lineNumber
			}
			try {
				on.result = functionCall()
			} catch (err) {
				if (DEBUG) warn('Unexpected Error', err)
				on.result = {
					status : 'error',
					message: err.toString()
				}
			}
			this.on(on)
		}
	}
	this.on({
		type  : 'done',
		result: { status: 'info' }
	})
}
StoryParser.prototype.on = function(event) {
	if (event.result.status === 'error') {
		this.results.failed++
	} else {
		this.results.passed++
	}
	this.results.total++
	if (event.type === 'call') {
		this.message(event)
	}
	else if (event.type === 'done') {
	}
}
export { StoryParser }