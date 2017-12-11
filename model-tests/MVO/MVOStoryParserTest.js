var StoryParser = require('../StoryParser').StoryParser
const LMEapi = require('../../lme-model-api/src/lme');
require('../../lme-core/exchange_modules/ffl2/RegisterPlainFFLDecorator');
require('../../lme-core/exchange_modules/presentation/webexport_with_template');
const assert = require('assert');
const model = new LMEapi();
var excelPlugin = require('../../excel-connect').xlsxLookup;
model.addFunctions(excelPlugin);
let mvoFLLFile = require('fs').readFileSync(__dirname + '/MVO.ffl', 'utf8');

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
excelPlugin.initComplete.then(function() {
    model.importFFL2Backwards(mvoFLLFile)
    LME = model.exportWebModel();
    new MVOStory(__dirname + '/mvo.story').startTest()
})
exports.MVOStory = MVOStory;