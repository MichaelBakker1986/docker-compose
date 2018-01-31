/**
 * JBehave testing is just more easy to make and maintain while innovation is happening
 * Concepts on functional differentiation are tested, which are n(1) instead of n(^n), which leads to less shortcuts in tests.
 *
 * There is one thing to do here. Convert JBehave text files into LME statements.
 *  1) Set a Value given in the story
 *  2) Assert a value provided within the story
 */
const log = require('log6')
const functionMapper = {
    //And variable Q_MAP04_VRAAG12 is set to 0 for document
    setValue: {
        // ------------------------------------------------------VARIABLE_NAME--TUPLE_NAME
        regex: /^\s*(?:When|Then|And) (?:a |an )?(?:variable )?(\w+)(\((\w+,?){0,3}\))? is set to ([-0-9,.A-z]+)\s*(?:(?:for column with id (\d+))|(for document))?\s*$/i,
        call: function(workbook, linenumber, line, args) {
            var variableName = args[0], tupleIndexName = args[1], value = args[3], colId = (parseInt(args[4]) || 1) - 1
            return [function() {
                // const locationDetails = workbook.locate(variableName, tupleIndexName)
                const yas = workbook.resolveYas(variableName, tupleIndexName)

                workbook.set(variableName, value, 'value', colId, yas)
                if (log.TRACE) log.trace('[%s]: %s %s', linenumber, variableName, tupleIndexName)
                return {
                    status: 'info',
                    message: 'set variable ' + variableName + tupleIndexName + ' to ' + value
                }
            }]
        }
    },
    cleanDocumentState: {
        /* One story can have multiple contexts, this for now will just clean the current state. */
        regex: /^\s*Given an? Context(\((\w+,?){0,3}\))?/i,
        call: function(workbook, linenumber, line, args) {
            return [function() {
                workbook.clearValues()
                if (log.TRACE) log.trace('Document values cleared')
                return {
                    status: 'info',
                    message: "New context created."
                };
            }]
        }
    },
    assertValue: {
        //Then variable Q_MAP01_SUBSCORE01 should have 0 decimals rounded value 14 for document
        //And variable TotalYearlyCosts should have 0 decimals rounded 15944 for column with id 1
        regex: /^\s*(?:When|Then|And) (?:a |an )?(?:variable )?(\w+)(\((\w+,?){0,3}\))? should (?:have |be )?(?:(\d+) decimals rounded value )?([-0-9,.A-z]+)\s*(?:(?:for column with id (\d+))|(for document))?/i,
        call: function(workbook, linenumber, line, args) {
            const variableName = args[0], tupleIndexName = args[1], decimals = args[3], value = args[4],
                columnId = (parseInt(args[5]) || 1) - 1
            return [function() {
                const result = {};
                const yas = workbook.resolveYas(variableName, tupleIndexName)
                const rawValue = workbook.get(variableName, 'value', columnId, yas);
                var calculatedValue = rawValue;
                if (decimals) calculatedValue = calculatedValue.toFixed(decimals)
                if (log.TRACE) log.trace('[%s]: assert value calculated[%s] [%s] decimals[%s] [%s]', linenumber, calculatedValue, variableName, decimals, value)
                if (calculatedValue != value) {
                    result.status = 'fail'
                    result.message = calculatedValue + ' is not ' + value + ' raw value ' + rawValue
                } else {
                    result.status = 'info'
                    result.message = 'Variable ' + variableName + " = " + calculatedValue + ' is ' + value + " [" + rawValue + "]";
                }
                return result;
            }]
        }
    }
}

function StoryParser(story, filename, workbook) {
    this.filename = filename;
    this.workbook = workbook;
    this.lines = story.split('\n')
    this.calls = [];
    this.results = {
        passed: 0,
        failed: 0,
        total: 0,
        rate: function() {
            return (100 / this.total) * (this.passed)
        }
    };
}

StoryParser.prototype.start = function() {
    for (var lineNumber = 0; lineNumber < this.lines.length; lineNumber++) {
        var jebehaveMatchFound = false;
        var line = this.lines[lineNumber];
        if (line.trim() == '') continue;//empty lines
        if (line.startsWith('@')) continue;//just meta-data
        for (var mappedKey in functionMapper) {
            if (line.match(functionMapper[mappedKey].regex)) {
                jebehaveMatchFound = true;
                var functions = functionMapper[mappedKey].call(this.workbook, lineNumber, line, line.match(functionMapper[mappedKey].regex).slice(1));
                const lineAction = {
                    line: {
                        line: line.trim(),
                        lineNumber: lineNumber + 1
                    },
                    functions: functions
                }
                this.calls.push(lineAction)
            }
        }
        if (!jebehaveMatchFound && log.DEBUG) log.warn('No match [%s] [%s]:[%s]', this.filename, lineNumber, line.trim())
    }
}
StoryParser.prototype.call = function() {
    for (var i = 0; i < this.calls.length; i++) {
        var call = this.calls[i];
        var functions = call.functions;
        for (var callIndex = 0; callIndex < functions.length; callIndex++) {
            var functionCall = functions[callIndex];
            //TODO: can have multiple calls on one row..
            var on = {
                type: 'call',
                raw: call.line,
                line: call.line.lineNumber
            }
            try {
                on.result = functionCall()
            } catch (err) {
                if (log.DEBUG) log.warn('Unexpected Error', err)
                on.result = {
                    status: 'error',
                    message: err.toString()
                }
            }
            this.on(on);
        }
    }
    this.on({
        type: 'done',
        result: {
            status: 'info'
        }
    });
}
StoryParser.prototype.on = function(event) {
    if (event.result.status == 'error') {
        this.results.failed++;
    } else {
        this.results.passed++;
    }
    this.results.total++;
    if (event.type == 'call') {
        this.message(event)
    }
    else if (event.type == 'done') {
        // this.then(event)
    }
}
exports.StoryParser = StoryParser;