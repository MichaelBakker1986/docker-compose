const log = require('log6')
const path = require('path')
const SolutionFacade = require('../../lme-core/src/SolutionFacade');
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator');
const StoryParser = require('../StoryParser').StoryParser
const LMEapi = require('../../lme-model-api/src/lme');

function JBehaveStoryParser(opts) {
    this.fflFile = null;
    this.modelName = null;
    this.storyFile = null;
    if (opts) for (var key in opts) this[key] = opts[key]
}

JBehaveStoryParser.prototype.start = function() {
    const model = new LMEapi();
    const excelPlugin = require('../../excel-connect').xlsxLookup;
    model.addFunctions(excelPlugin);
    const fflFile = require('fs').readFileSync(this.fflFile, 'utf8');
    const story = path.resolve(this.storyFile)
    const storyFile = require('fs').readFileSync(story, 'utf8');

    excelPlugin.initComplete(this.modelName).then(function(matrix) {
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
    }).catch(function(err) {
        log.error(err)
        process.exit(1);
    })
}
module.exports = JBehaveStoryParser