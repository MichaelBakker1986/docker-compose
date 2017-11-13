const functionMapper = {
    //And variable Q_MAP04_VRAAG12 is set to 0 for document
    valueset: {
        regex: /variable (\w+) is set to (\d+) for document/,
        call: function([$1, $2]) {
            return [function() {
                LME.nodes[$1].value = $2
                return {
                    status: 'info',
                    message: 'set variable ' + $1 + ' to ' + $2
                }
            }]
        }
    },
    assert: {
        //Then variable Q_MAP01_SUBSCORE01 should have 0 decimals rounded value 14 for document
        regex: /variable (\w+) should have (\d+) decimals rounded value (\d+)/,
        call: function([$1, $2, $3]) {
            return [function() {
                var result = {};
                let rawValue = LME.nodes[$1].value;
                let calculatedValue = rawValue.toFixed($2);
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

function StoryParser(story) {
    this.lines = story.split('\n')
    this.calls = [];
}

StoryParser.prototype.start = function() {
    for (var i = 0; i < this.lines.length; i++) {
        var line = this.lines[i];
        for (var mappedKey in functionMapper) {
            if (line.match(functionMapper[mappedKey].regex)) {
                let functions = functionMapper[mappedKey].call(line.match(functionMapper[mappedKey].regex).slice(1));
                const lineAction = {
                    line: {
                        line: line,
                        lineNumber: i
                    },
                    functions: functions
                }
                this.calls.push(lineAction)
            }
        }
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
}
StoryParser.prototype.on = function(event) {
    if (event.type == 'call') {
        this.message(event)
    }
}
exports.StoryParser = StoryParser;

