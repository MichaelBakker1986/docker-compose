import webpack   from 'webpack'
import { error } from 'log6'
import fs        from 'fs'
import path      from 'path'
import MemoryFS  from 'memory-fs'

/**
 * Combine workspace into a REST-API js
 */

const compilers = {}
const nodeModules = {}

const resolveCompiler = (memory_fs, filename) => {
	const basename = path.basename(filename)
	let compiler = compilers[filename]
	if (!compiler) {
		const dist_path = path.resolve(`${__dirname}/`, basename)
		compiler = webpack({
			entry    : [path.resolve(__dirname, filename)],
			mode     : 'development',
			target   : 'node',
			node     : {},
			output   : {
				/*		publicPath: 'http://localhost:10500/',*/
				path    : path.join(__dirname, '/dist'),
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

		fs.readdirSync('../node_modules')
		.filter((x) => ['.bin'].indexOf(x) === -1)
		.forEach(mod => nodeModules[mod] = `commonjs ${mod}`)

		fs.readdirSync('../lme-data-api/node_modules')
		.filter((x) => ['.bin'].indexOf(x) === -1)
		.forEach(mod => nodeModules[mod] = `commonjs ${mod}`)
	}

	async buildProductionFile(filename) {
		const memory_fs = this.memory_fs
		const compiler = resolveCompiler(memory_fs, filename)
		return new Promise((accept, reject) => {
			compiler.run((err, stats) => {
				if (err) reject(err)
				/*const readFileSync = memory_fs.readFileSync(path.resolve(__dirname + '/dist', 'rest-api-backend.js'), 'utf8')*/
				accept(stats.toString({
					aggregateTimeout: 300,
					poll            : undefined,
					chunks          : false,  // Makes the build much quieter
					colors          : true    // Shows colors in the console
				}))
			})
		})
	}

	async readProductionFile(filename) {
		const memory_fs = this.memory_fs
		const source = await this.buildProductionFile(filename)
		return memory_fs.readFileSync(path.resolve(__dirname + '/dist', 'rest-api-backend.js'), 'utf8')
	}

}

/*new WebpackCompiler({ memory_fs: new MemoryFS() }).readProductionFile('../lme-data-api/lme-data-app.js').then((source) => {
		console.info(source)
	}
).catch((er) => error('err', er))*/
