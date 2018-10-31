import webpack                                            from 'webpack'
import path                                               from 'path'
import MemoryFS                                           from 'memory-fs'
import ExcelApi                                           from './ExcelApi'
import SolutionFacade                                     from '../../lme-core/src/SolutionFacade'
import { LmeAPI }                                         from './lme'
import { error, info }                                    from 'log6'
import timeModel                                          from '../../lme-core/resources/CustomImport'
import { Context }                                        from '../../lme-core/src/Context'
import { DETAIL_INTERVAL, ENCODING }                      from '../../lme-core/src/Constants'
import { createJavascriptWriteStream, readModelAsString } from '../../git-connect/ResourceManager'

/** Combine workspace into a REST-API js **/
const compilers = {}
const javascript_filename = 'frontend.js'
const model_name = process.argv[2] || 'KSP'
const excel_file_name_quick_fix = (modelName) => modelName.startsWith('_tmp_') ? modelName.split('_').slice(-1)[0] : modelName
const xlsx_name = excel_file_name_quick_fix(model_name)

const resolveCompiler = (memory_fs, filename, json_data) => {
	let compiler = compilers[filename]
	//let b = browser(options).ignore('escodegen').ignore('esprima').ignore('log6').ignore('tracer').ignore('ast-node-utils').ignore('*ast-node-utils*')
	if (!compiler) {
		compiler = webpack({
			entry  : [path.resolve(__dirname, filename)],
			mode   : 'development',
			target : 'web',
			node   : {
				fs           : 'empty',
				escodegen    : 'empty',
				log6         : 'empty',
				esprima      : 'empty',
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
				/*new webpack.IgnorePlugin(/esprima/)*/
				/*new webpack.IgnorePlugin(/escodegen/),*/
				/*new webpack.IgnorePlugin(/log6/)*/
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
		await webpackCompiler.buildProductionFile(filename)
		return memory_fs.readFileSync(path.join(__dirname, javascript_filename), ENCODING)
	}
}

ExcelApi.loadExcelFile(xlsx_name).then(async (matrix) => {
	SolutionFacade.addVariables([{ name: 'MATRIX_VALUES', expression: matrix }])
	let LME
	if (model_name.includes('SCORECARDTESTMODEL')) {
		LME = new LmeAPI(timeModel, new Context({ modelName: model_name }), DETAIL_INTERVAL)
	} else {
		LME = new LmeAPI(null, new Context({ modelName: model_name }), null)
	}
	const rawData = readModelAsString({ model_name })
	LME.importFFL(rawData)
	const json_data = LME.exportLME()

	try {
		const source = await FFLWebpackCompiler.readProductionFile('./lmeAPIWrapper.js', json_data)
		createJavascriptWriteStream({ model_name }).write(source)
		info(`Done writing executable file to ${model_name} size: ${source.length} `)
	} catch (err) {
		error(err.stack)
	}
})


