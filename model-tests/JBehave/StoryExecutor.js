/**
 * This is the template runner for JBehave stories
 */
import { JBehaveStoryParser } from '../JBehave/JBehaveStoryParser'

const [not_used, not_used2, modelName, fflFile, storyFile] = process.argv

new JBehaveStoryParser({ fflFile, modelName, storyFile }).start()