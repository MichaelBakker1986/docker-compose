const log = require('log6')
const path = require('path')
const SolutionFacade = require('../../lme-core/src/SolutionFacade');
const Context = require('../../lme-core/src/Context');
const DebugManager = require('../../lme-core/exchange_modules/ffl/DebugManager').DebugManager;
const Register = require('../../lme-core/exchange_modules/ffl/Register').Register;
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
    const context = new Context()
    const model = new LMEapi(this.timeModel, context, this.interval);
    const excelPlugin = require('../../excel-connect').xlsxLookup;
    model.addFunctions(excelPlugin);
    const fflFile = require('fs').readFileSync(this.fflFile, 'utf8');
    const model_name = this.modelName;
    excelPlugin.initComplete(model_name).then(function(matrix) {
        SolutionFacade.initVariables([{ name: 'MATRIX_VALUES', expression: matrix }])
        const register = new Register()
        model.importFFL({
            register: register,
            raw     : fflFile
        })
        const debugManager = new DebugManager(register, context.audittrail);
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

        debugManager.monteCarlo(model_name)

        if (!succes) process.exit(1);
    }).catch(function(err) {
        log.error(err)
        process.exit(1);
    })
}
module.exports = JBehaveStoryParser