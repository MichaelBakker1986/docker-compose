const StoryParser = require('../StoryParser').StoryParser
const LMEapi = require('../../lme-model-api/src/lme');
const SolutionFacade = require('../../lme-core/src/SolutionFacade');
const log = require('ff-log')
const path = require('path')
const model = new LMEapi();
var excelPlugin = require('../../excel-connect').xlsxLookup;
model.addFunctions(excelPlugin);
const fflFile = require('fs').readFileSync(__dirname + '/MVO.ffl', 'utf8');
const story = path.resolve(__dirname + '/MVO.story')
const storyFile = require('fs').readFileSync(story, 'utf8');

excelPlugin.initComplete('MVO').then(function(matrix) {
    SolutionFacade.initVariables([{name: 'MATRIX_VALUES', expression: matrix}])
    model.importFFL(fflFile)
    const storyParser = new StoryParser(storyFile, story, model.lme);
    storyParser.filename = story;
    storyParser.message = function(event) {
        if (event.result.status == 'fail' || event.result.status == 'error') {
            throw Error('Story failed' + JSON.stringify(event))
        }
    }
    storyParser.start()
    storyParser.call()
}).catch((err) => {
    log.error(err)
    process.exit(1);
})