/**
 * Find all .story in model-tests
 * Match them with a *.ffl model-file
 * Call the JBehaveStoryParser to execute vs Financial Model File
 */
import { FILE_SYSTEM_RESOURCES_PATH, FileWalker } from '../../git-connect/index'
import fs                                         from 'fs'
import path                                       from 'path'
import { error, info }                            from 'log6'

import { exec } from 'child-process-promise'

const modelTests = new FileWalker(path.join(__dirname, '/../'), ['*', '*/*', '*/*/*', '*/*/*/*', '*/*/*/*'], '.story')
const coreTests = new FileWalker(path.join(__dirname, `/../../lme-core/`), ['*', '*/*', '*/*/*', '*/*/*/*', '*/*/*/*'], '.story')
new FileWalker(FILE_SYSTEM_RESOURCES_PATH, ['*', '*/*', '*/*/*', '*/*/*/*', '*/*/*/*'], '.story')

const visit = (file) => {
	fs.exists(file.replace(/(\(\w+\))?\.story/gm, '.ffl'), async (exists) => {
			if (exists) {
				const fflFile = file.replace(/(\(\w+\))?\.story/gm, '.ffl')
				const jBehaveStoryFile = file
				const modelName = path.basename(fflFile).replace('.ffl', '')
				const command = `node -r babel-register ${__dirname}/StoryExecutor.js ${[modelName, '"' + fflFile + '"', '"' + jBehaveStoryFile + '"'].join(' ')}`
				try {
					await exec(command, { maxBuffer: 1024 * 500 })
					info(`Success story ${file}`)
				} catch (err) {
					error(`Fail story ${err.toString()}`)
				}
			} else {
				info(`Story has no matching ffl file [${file}]`)
			}
		}
	)
}
modelTests.walk(visit, true)
coreTests.walk(visit, true)