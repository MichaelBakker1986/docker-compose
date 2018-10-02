/**
 * Convert Model into front-end distribution
 * node exportLME_FFL {modelName}
 */
import LMEFacade, { Context, DETAIL_INTERVAL, ENCODING, SolutionFacade } from '../../lme-core/index'
import ExcelLookup                                                       from '../../excel-connect/excel-connect'
import babelify                                                          from 'babelify'
import { createWriteStream, readFileSync }                               from 'fs'
import browser                                                           from 'browserify'
import timeModel
                                                                         from '../../lme-core/resources/CustomImport.json'
import { error }                                                         from 'log6'
import LmeAPI                                                            from './lme'
import '../../ffl/RegisterPlainFFLDecorator'
import browserify_fastjson                                               from 'browserify-fastjson'

const modelName = process.argv[2]
const fileType = '.ffl'
LMEFacade.addFunctions(ExcelLookup)

//quick-fix resolve XSLX modelName
if (!'_tmp_'.startsWith('_tmp_')) throw Error('error')
const xlsx_name = modelName.startsWith('_tmp_') ? modelName.split('_').slice(-1)[0] : modelName

ExcelLookup.loadExcelFile(xlsx_name).then((matrix) => {
	SolutionFacade.addVariables([{ name: 'MATRIX_VALUES', expression: matrix }])
	if (modelName.includes('SCORECARDTESTMODEL')) {
		global.LME = new LmeAPI(timeModel, new Context({ modelName }), DETAIL_INTERVAL)
	} else {
		global.LME = new LmeAPI(null, new Context({ modelName }), null)
	}
	let rawData = readFileSync(`${__dirname}/../../git-connect/resources/${modelName}${fileType}`, ENCODING)
	LME.importFFL(rawData)
	const lmeExport = LME.exportLME()
	const options = {
		insertGlobals   : true,
		insertGlobalVars: {
			JSON_MODEL: (file, dir) => {
				return (file.endsWith('lmeAPIWrapper.js')) ? lmeExport : 'undefined'
			}
		},
		gzip            : true,
		minify          : true,
		debug           : false
	}
	let b = browser(options)
	.ignore('escodegen').ignore('esprima').ignore('log6').ignore('tracer').ignore('ast-node-utils').ignore('*ast-node-utils*')
	b.add(__dirname + '/../../lme-core/exchange_modules/presentation/webexport.js')
	b.add(__dirname + '/lmeAPIWrapper.js')

	b.transform(babelify, { presets: ['env'] })
	b.transform(browserify_fastjson)
	const res = createWriteStream(`${__dirname}/../../git-connect/resources/${modelName}.js`)
	b.bundle().pipe(res)
}).catch((err) => {
	error(err)
	process.exit(1)
})