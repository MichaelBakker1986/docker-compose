const JBehaveStoryParser = require('../JBehave/JBehaveStoryParser')
const modelName = 'LGD'
const path = __dirname + '../../../git-connect/resources/'
const test = new JBehaveStoryParser({
    fflFile: path + modelName + '.ffl',
    modelName: modelName,
    storyFile: path + modelName + '.story'
})
test.start()