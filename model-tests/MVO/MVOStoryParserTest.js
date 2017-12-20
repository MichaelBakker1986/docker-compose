const StoryParser = require('../StoryParser').StoryParser
const LMEapi = require('../../lme-model-api/src/lme');
require('../../lme-core/exchange_modules/presentation/webexport_with_template');
const assert = require('assert');
const log = require('ff-log')
const model = new LMEapi();
LMEMETA = model;
var excelPlugin = require('../../excel-connect').xlsxLookup;
model.addFunctions(excelPlugin);
const mvoFLLFile = require('fs').readFileSync(__dirname + '/MVO.ffl', 'utf8');

function MVOStory(story) {
    this.story = story;
}

MVOStory.prototype.startTest = function() {
    let storyParser = new StoryParser(require('fs').readFileSync(this.story, 'utf8'));
    storyParser.message = function(event) {
        if (event.result.status == 'fail' || event.result.status == 'error') {
            throw Error('Story failed' + JSON.stringify(event))
        }
    }
    storyParser.start()
    storyParser.call()
}
excelPlugin.initComplete().then(function(matrix) {
    model.importFFL2BackwardsCompatible(mvoFLLFile)
    LME = model.exportWebModel();
    new MVOStory(__dirname + '/mvo.story').startTest()
}).catch((err) => {
    log.error(err)
    process.exit(1);
})
exports.MVOStory = MVOStory;