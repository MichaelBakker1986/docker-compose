const functionMapper = {
    valueset: {
        regex: /variable (\w+) is set to (\d+) for document/,
        call: function([$1, $2]) {
            return [function() {
                console.info('LME.nodes['+ $1 + "].value =" + $2)
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
                let callables = functionMapper[mappedKey].call(line.match(functionMapper[mappedKey].regex).slice(1));
                this.calls = this.calls.concat(callables)
            }
        }
    }
}
StoryParser.prototype.call = function() {
    for (var i = 0; i < this.calls.length; i++) {
        var call = this.calls[i];
        call();
    }
}
exports = StoryParser;
let storyParser = new StoryParser(require('fs').readFileSync(__dirname + '/mvo.story', 'utf8'));
storyParser.start()
storyParser.call()