/**
 * This is the template runner for JBehave stories
 */
const modelname = process.argv[2];
const fflFile = process.argv[3];
const story = process.argv[4];

const JBehaveStoryParser = require('../JBehave/JBehaveStoryParser')

const gyllionKspTest = new JBehaveStoryParser({
    fflFile: fflFile,
    modelName: modelname,
    storyFile: story
})
gyllionKspTest.start()