var StoryParser = require('../StoryParser').StoryParser
var MVO = require('../../ff-ssh-git/resources/MVO')
function MVOStory(story) {
    this.story = story;
}

MVOStory.prototype.startTest = function() {
    let storyParser = new StoryParser(require('fs').readFileSync(this.story, 'utf8'));
    storyParser.message = function(event) {
        if (event.result.status == 'fail') {
            throw Error('Story failed' + JSON.stringify(event))
        }
    }
    storyParser.start()
    storyParser.call()
}
exports.MVOStory = MVOStory;