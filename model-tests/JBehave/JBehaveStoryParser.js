import { error }                                             from 'log6'
import path                                                  from 'path'
import api, { Context, DETAIL_INTERVAL, ENCODING, Register } from '../../lme-core/index'
import { DebugManager, RegisterPlainFFLDecorator }           from '../../ffl/index'
import { StoryParser }                                       from '../StoryParser'
import { LmeAPI }                                            from '../../lme-model-api/index'
import CustomImport                                          from '../../lme-core/resources/CustomImport.json'
import { readFileSync }                                      from 'fs'
import fflMath                                               from '../../math/ffl-math'
import ExcelApi                                              from '../excel-api'

api.registerParser(RegisterPlainFFLDecorator)
api.addFunctions(fflMath)

class JBehaveStoryParser {
	constructor(props) {
		this.fflFile = null
		this.modelName = null
		this.timeModel = null
		this.interval = null
		this.storyFile = null
		Object.assign(this, props)
	}

	start() {
		const story = path.resolve(this.storyFile)
		const storyFile = readFileSync(story, ENCODING)
		//Quick-fix for month/year based story
		if (storyFile.startsWith('Given a month based')) {
			this.interval = DETAIL_INTERVAL
			this.timeModel = CustomImport
		}
		const context = new Context({})
		const model = new LmeAPI(this.timeModel, context, this.interval)
		const fflFile = readFileSync(this.fflFile, ENCODING)
		const model_name = this.modelName
		ExcelApi.loadExcelFile(model_name).then(() => {
			const register = new Register
			model.importFFL({ register, raw: fflFile })
			const debugManager = new DebugManager(register, context.audittrail)
			const storyParser = new StoryParser(storyFile, story, model.lme)

			storyParser.filename = story
			let success = true

			storyParser.message = function(event) {
				if (event.result.status === 'fail') {
					//Failed results are just not right, but don't require stacktrace
					error(`Story ${story}:${event.line} failed to complete.\n${event.raw.line} failing, because [${event.result.message}]`)
					error(context.audittrail.printAuditTrailDelta())
					success = false
				}
				else if (event.result.status === 'error') throw Error(`Story failed${JSON.stringify(event)}`)
				else context.audittrail.markNow()
			}
			storyParser.start()
			storyParser.call()

			debugManager.monteCarlo(model_name)
			context.audittrail.printErrors()

			if (!success) process.exit(1)
		}).catch(err => {
			error(err)
			process.exit(1)
		})
	}
}

export { JBehaveStoryParser }