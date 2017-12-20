var StoryParser = require('../StoryParser').StoryParser
const LMEapi = require('../../lme-model-api/src/lme');
const SolutionFacade = require('../../lme-core/src/SolutionFacade');
require('../../lme-core/exchange_modules/ffl2/RegisterPlainFFLDecorator');
require('../../lme-core/exchange_modules/presentation/webexport_with_template');
const assert = require('assert');
const model = new LMEapi();
LMEMETA = model;
var excelPlugin = require('../../excel-connect').xlsxLookup;
model.addFunctions(excelPlugin);
let mvoFLLFile = require('fs').readFileSync(__dirname + '/KSP_experience.ffl', 'utf8');

function KSPStory(story) {
    this.story = story;
}

KSPStory.prototype.startTest = function() {
    let storyParser = new StoryParser(require('fs').readFileSync(this.story, 'utf8'));
    storyParser.message = function(event) {
        if (event.result.status == 'fail' || event.result.status == 'error') {
            throw Error('Story failed' + JSON.stringify(event))
        } else {
            console.info(event)
        }
    }
    storyParser.start()
    storyParser.call()
}
excelPlugin.initComplete('KSP').then(function(matrix) {
    SolutionFacade.initVariables([{name: 'MATRIX_VALUES', expression: matrix}])
    model.importFFL2BackwardsCompatible(mvoFLLFile)
    LME = model.exportWebModel();
    new KSPStory(__dirname + '/KSP.story').startTest()
}).catch((err) => {
    console.error(err)
    throw err;
})
exports.KSPStory = KSPStory;