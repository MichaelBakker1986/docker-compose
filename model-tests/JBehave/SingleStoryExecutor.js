global.DEBUGMODUS = true
const JBehaveStoryParser = require('../JBehave/JBehaveStoryParser')
const modelName = 'MVO'
//const path = __dirname + '../../../git-connect/resources/'
//const path = __dirname + '../../../lme-core/test/'
const path = __dirname + '/../MVO/'
const test = new JBehaveStoryParser({
    fflFile: path + modelName + '.ffl',
    modelName: modelName,
    storyFile: path + modelName + '(basic).story'
})
test.start()