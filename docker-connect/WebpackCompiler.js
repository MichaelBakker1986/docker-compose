import webpack         from 'webpack'
import { readdirSync } from 'fs'
import path            from 'path'
import MemoryFS        from 'memory-fs'
import { error }       from 'log6'

/**
 * Combine workspace into a REST-API js
 */

const compilers = {}
const nodeModules = {}

const resolveCompiler = (memory_fs, filename) => {
	let compiler = compilers[filename]
	if (!compiler) {
		compiler = webpack({
			entry    : [path.resolve(__dirname, filename)],
			mode     : 'development',
			target   : 'node',
			node     : {},
			output   : {
				path    : __dirname,
				filename: 'rest-api-backend.js'
			},
			module   : {
				rules: [{
					test   : /\.js$/,
					include: [path.join(__dirname, 'client')],
					loader : 'babel-loader'
				}]
			},
			plugins  : [
				new webpack.NamedModulesPlugin(),
				new webpack.NoEmitOnErrorsPlugin(),
				new webpack.BannerPlugin(
					{ raw: true, entryOnly: false, banner: 'require("source-map-support").install();' }
				)
			],
			devtool  : 'sourcemap',
			externals: nodeModules
		})
		compiler.outputFileSystem = memory_fs
		compilers[filename] = compiler
	}
	return compilers[filename]
}

export class WebpackCompiler {
	constructor({ memory_fs }) {
		this.memory_fs = memory_fs
		readdirSync(path.join(__dirname, '../node_modules'))
		.filter((x) => ['.bin'].indexOf(x) === -1)
		.forEach(mod => nodeModules[mod] = `commonjs ${mod}`)

		readdirSync(path.join(__dirname, '../lme-data-api/node_modules'))
		.filter((x) => ['.bin'].indexOf(x) === -1)
		.forEach(mod => nodeModules[mod] = `commonjs ${mod}`)
	}

	async buildProductionFile(filename) {
		const memory_fs = this.memory_fs
		const compiler = resolveCompiler(memory_fs, filename)
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

	async readProductionFile(filename) {
		const stats = await this.buildProductionFile(filename)
		console.info(stats)
		return this.memory_fs.readFileSync(path.join(__dirname, 'rest-api-backend.js'), 'utf8')
	}
}

/*new WebpackCompiler({ memory_fs: new MemoryFS }).readProductionFile('../lme-data-api/lme-data-app.js').then((source) => {
		console.info(source)
	}
).catch((er) => error('err', er))*/
