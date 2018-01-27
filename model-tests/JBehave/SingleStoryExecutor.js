const JBehaveStoryParser = require('../JBehave/JBehaveStoryParser')
const modelName = 'TUPLETEST'
const test = new JBehaveStoryParser({
    fflFile: __dirname + '/../Tuples/' + modelName + '.ffl',
    modelName: modelName,
    storyFile: __dirname + '/../Tuples/' + modelName + '(parent).story'
})
test.start()