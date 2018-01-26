const JBehaveStoryParser = require('../JBehave/JBehaveStoryParser')
const gyllionKspTest = new JBehaveStoryParser({
    fflFile: __dirname + '/KSP_experience.ffl',
    modelName: 'KSP',
    storyFile: __dirname + '/KSP.story'
})
gyllionKspTest.start()