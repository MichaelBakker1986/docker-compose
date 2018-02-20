global.IDE_DEBUGMODUS = true
const JBehaveStoryParser = require('../JBehave/JBehaveStoryParser')
const modelName = 'FyndooCreditRating'
//const path = __dirname + '../../../git-connect/resources/'
//const path = __dirname + '../../../lme-core/test/'
const path = __dirname + '/../URA/'
const test = new JBehaveStoryParser({
    fflFile: path + modelName + '.ffl',
    modelName: modelName,
    storyFile: path + modelName + '.story'
})
test.start()