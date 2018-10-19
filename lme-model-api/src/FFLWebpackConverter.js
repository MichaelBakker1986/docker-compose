import webpack                             from 'webpack'
import { createWriteStream, readFileSync } from 'fs'
import path                                from 'path'
import MemoryFS                            from 'memory-fs'
import ExcelApi                            from './ExcelApi'
import SolutionFacade                      from '../../lme-core/src/SolutionFacade'
import { LmeAPI }                          from './lme'
import { error, info }                     from 'log6'
import timeModel                           from '../../lme-core/resources/CustomImport'
import { Context }                         from '../../lme-core/src/Context'
import { DETAIL_INTERVAL, ENCODING }       from '../../lme-core/src/Constants'

/** Combine workspace into a REST-API js **/
const fileType = '.ffl'
const compilers = {}
const javascript_filename = 'frontend.js'
const resources_folder = path.join(__dirname, '/../../git-connect/resources/')
const modelName = process.argv[2] || 'KSP'
const excel_file_name_quick_fix = (modelName) => modelName.startsWith('_tmp_') ? modelName.split('_').slice(-1)[0] : modelName
const xlsx_name = excel_file_name_quick_fix(modelName)

const resolveCompiler = (memory_fs, filename, json_data) => {
	let compiler = compilers[filename]
	if (!compiler) {
		compiler = webpack({
			entry  : [path.resolve(__dirname, filename)],
			mode   : 'development',
			target : 'web',
			node   : {
				fs           : 'empty',
				child_process: 'empty'
			},
			output : {
				path    : __dirname,
				filename: javascript_filename
			},
			module : {
				rules: [{
					test   : /\.js$/,
					include: [path.join(__dirname, 'client')],
					loader : 'babel-loader'
				}]
			},
			plugins: [
				new webpack.NamedModulesPlugin(),
				new webpack.NoEmitOnErrorsPlugin(),
				new webpack.optimize.OccurrenceOrderPlugin(),
				new webpack.DefinePlugin({
					'global.JSON_MODEL': json_data
				})
			],
			devtool: 'inline-source-map'
		})
		compiler.outputFileSystem = memory_fs
		compilers[filename] = compiler
	}
	return compilers[filename]
}

export class FFLWebpackCompiler {
	constructor({ memory_fs, json_data }) {
		this.memory_fs = memory_fs
		this.json_data = json_data
	}

	async buildProductionFile(filename) {
		const memory_fs = this.memory_fs
		const compiler = resolveCompiler(memory_fs, filename, this.json_data)
		return new Promise((accept, reject) => {
			try {
				compiler.run((err, stats) => {
					if (err) reject(err)
					accept(stats.toString({
						aggregateTimeout: 300,
						poll            : undefined,
						chunks          : false,  // Makes the build much quieter
						colors          : true    // Shows colors in the console
					}))
				})
			} catch (err) {
				reject(err)
			}
		})
	}

	static async readProductionFile(filename, json_data) {
		const memory_fs = new MemoryFS
		const webpackCompiler = new FFLWebpackCompiler({ memory_fs, json_data })
		const stats = await webpackCompiler.buildProductionFile(filename)
		console.info(stats)
		return memory_fs.readFileSync(path.join(__dirname, javascript_filename), ENCODING)
	}
}

ExcelApi.loadExcelFile(xlsx_name).then((matrix) => {
	SolutionFacade.addVariables([{ name: 'MATRIX_VALUES', expression: matrix }])
	let LME
	if (modelName.includes('SCORECARDTESTMODEL')) {
		LME = new LmeAPI(timeModel, new Context({ modelName }), DETAIL_INTERVAL)
	} else {
		LME = new LmeAPI(null, new Context({ modelName }), null)
	}
	let rawData = readFileSync(`${resources_folder}${modelName}${fileType}`, ENCODING)
	LME.importFFL(rawData)
	const json_data = LME.exportLME()

	FFLWebpackCompiler.readProductionFile('./lmeAPIWrapper.js', json_data).then((source) => {
		const destination_path = path.join(resources_folder, `${modelName}.js`)
		createWriteStream(destination_path).write(source)
		info(`Done writing executable file to ${destination_path} size: ${source.length} `)
	}).catch((err) => error(err.stack))
})


