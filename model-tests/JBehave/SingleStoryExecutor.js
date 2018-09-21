global.IDE_DEBUGMODUS = true
import { JBehaveStoryParser } from '../JBehave/JBehaveStoryParser'

const modelName = 'KSP2'
//const path = __dirname + '../../../git-connect/resources/'
//const path = __dirname + '../../../lme-core/test/'
const path = __dirname + '/../KSP/'
const test = new JBehaveStoryParser({
	fflFile  : `${path + modelName}.ffl`,
	modelName,
	storyFile: `${path + modelName}.story`
})
test.start()