const log = require('log6')
const path = require('path')
const SolutionFacade = require('../../lme-core/src/SolutionFacade');
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator');
const StoryParser = require('../StoryParser').StoryParser
const LMEapi = require('../../lme-model-api/src/lme');

function JBehaveStoryParser(opts) {
    this.fflFile = null;
    this.modelName = null;
    this.timeModel = null;
    this.interval = null;
    this.storyFile = null;
    if (opts) for (var key in opts) this[key] = opts[key]
}

JBehaveStoryParser.prototype.start = function() {
    const story = path.resolve(this.storyFile)
    const storyFile = require('fs').readFileSync(story, 'utf8');
    //Quick-fix for month/year based story
    if (storyFile.startsWith('Given a month based')) {
        this.interval = 'detl';
        this.timeModel = require('../../lme-core/resources/CustomImport.json')
    }
    const model = new LMEapi(this.timeModel, null, this.interval);
    const excelPlugin = require('../../excel-connect').xlsxLookup;
    model.addFunctions(excelPlugin);
    const fflFile = require('fs').readFileSync(this.fflFile, 'utf8');
    excelPlugin.initComplete(this.modelName).then(function(matrix) {
        SolutionFacade.initVariables([{ name: 'MATRIX_VALUES', expression: matrix }])
        model.importFFL(fflFile)

        //TODO: allow multiple contexts here they should inherit model.lme but not modify it.
        const storyParser = new StoryParser(storyFile, story, model.lme);

        storyParser.filename = story;
        var succes = true;
        storyParser.message = function(event) {
            if (event.result.status == 'fail') {
                //Failed results are just not right, but don't require stacktrace
                log.error('Story ' + story + ':' + event.line + ' failed to complete.\n' + event.raw.line + ' failing, because [' + event.result.message + ']')
                succes = false;
            }
            else if (event.result.status == 'error') {
                throw Error('Story failed' + JSON.stringify(event))
            }
        }
        storyParser.start()
        storyParser.call()

    /*    var feedback = model.lme.fixProblemsInImportedSolution();
        if (!feedback.valid) succes = false*/

        if (!succes) process.exit(1);
    }).catch(function(err) {
        log.error(err)
        process.exit(1);
    })
}
module.exports = JBehaveStoryParser