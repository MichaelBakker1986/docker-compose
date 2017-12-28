const log = require('log6')
const functionMapper = {
    //And variable Q_MAP04_VRAAG12 is set to 0 for document
    valueset: {
        regex: /variable (\w+) is set to ([0-9.,]+) for document/,
        call: function(workbook, linenumber, line, args) {
            var $1 = args[0], $2 = args[1]
            return [function() {
                workbook.set($1, $2)
                if (log.TRACE) log.trace('[%s]: %s %s', linenumber, $1, $2)
                return {
                    status: 'info',
                    regeex: /variable (\w+) is set to ([0-9.,]+) for document/,
                    message: 'set variable ' + $1 + ' to ' + $2
                }
            }]
        }
    },
    assertDocumentValue: {
        //Then variable Q_MAP01_SUBSCORE01 should have 0 decimals rounded value 14 for document
        //And variable TotalYearlyCosts should have 0 decimals rounded 15944 for column with id 1
        regex: /variable (\w+) should have (\d+) decimals rounded value ([0-9.,]+)\s*(?:(?:for column with id (\d+))|(for document))/,
        call: function(workbook, linenumber, line, args) {
            var $1 = args[0], $2 = args[1], $3 = args[2], $4 = args[3]
            return [function() {
                var result = {};
                let rawValue = workbook.get($1, 'value', (parseInt($4) || 1) - 1);
                let calculatedValue = rawValue.toFixed($2);
                if (log.TRACE) log.trace('[%s]: assert value calculated[%s] [%s] decimals[%s] [%s]', linenumber, calculatedValue, $1, $2, $3)
                if (calculatedValue != $3) {
                    result.status = 'error'
                    result.message = calculatedValue + ' is not ' + $3 + ' raw value ' + rawValue
                } else {
                    result.status = 'info'
                    result.message = 'Variable ' + $1 + " = " + calculatedValue + ' is ' + $3 + " [" + rawValue + "]";
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
        let jebehaveMatchFound = false;
        var line = this.lines[lineNumber];
        if (line.startsWith('@')) continue;//just meta-data
        for (var mappedKey in functionMapper) {
            if (line.match(functionMapper[mappedKey].regex)) {
                jebehaveMatchFound = true;
                let functions = functionMapper[mappedKey].call(this.workbook, lineNumber, line, line.match(functionMapper[mappedKey].regex).slice(1));
                const lineAction = {
                    line: {
                        line: line,
                        lineNumber: lineNumber
                    },
                    functions: functions
                }
                this.calls.push(lineAction)
            }
        }
        if (!jebehaveMatchFound) log.warn('No match [%s] [%s]:[%s]', this.filename, lineNumber, line.trim())
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
                line: call.line.lineNumber
            }
            try {
                on.result = functionCall()
            } catch (err) {
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

