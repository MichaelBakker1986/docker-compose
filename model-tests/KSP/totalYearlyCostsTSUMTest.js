const JBehaveStoryParser = require('../JBehave/JBehaveStoryParser')
const gyllionKspTest = new JBehaveStoryParser({
    fflFile: __dirname + '/GYLLIONKSP.ffl',
    modelName: 'GYLLIONKSP',
    storyFile: __dirname + '/GYLLIONKSP.story'
})
gyllionKspTest.start()