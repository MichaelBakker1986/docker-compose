var StoryParser = require('../StoryParser').StoryParser
require('../../ff-fes/exchange_modules/presentation/webexport');
var excelPlugin = require('../../ff-fes-xlsx/ff-fes-xlsx').xlsxLookup;
const LMEapi = require('../../lme-model-api/src/lme');

function MVOStory(story) {
    this.story = story;
    this.model = __dirname + '/story_MVO.ffl';
    const MVOapi = new LMEapi();
    LMEMETA = MVOapi;
    MVOapi.addFunctions(excelPlugin);
    MVOapi.importFFL(require('fs').readFileSync(this.model, 'utf8'));
    LME = MVOapi.exportWebModel();
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