const JBehaveStoryParser = require('../JBehave/JBehaveStoryParser')
const gyllionKspTest = new JBehaveStoryParser({
    fflFile: __dirname + '/MVO.ffl',
    modelName: 'MVO',
    storyFile: __dirname + '/MVO.story'
})
gyllionKspTest.start()