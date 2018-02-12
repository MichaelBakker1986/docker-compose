const JBehaveStoryParser = require('../JBehave/JBehaveStoryParser')
const modelName = 'TupleTest'
//const path = __dirname + '../../../git-connect/resources/'
const path = __dirname + '../../../lme-core/test/'
//const path = __dirname + '/../KSP/'
const test = new JBehaveStoryParser({
    fflFile: path + modelName + '.ffl',
    modelName: modelName,
    storyFile: path + modelName + '.story'
})
test.start()