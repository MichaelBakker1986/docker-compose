const JBehaveStoryParser = require('../JBehave/JBehaveStoryParser')
const gyllionKspTest = new JBehaveStoryParser({
    fflFile: __dirname + '/TRENDNOTREND.ffl',
    modelName: 'TRENDNOTREND',
    storyFile: __dirname + '/TRENDNOTREND.story'
})
gyllionKspTest.start()