import path     from 'path'
import MemoryFS from 'memory-fs'
import webpack  from 'webpack'

const memory_fs = new MemoryFS()
const compilers = {}

export class CodeBuilder {
	constructor() {
	}

	async build(filename) {
		const basename = path.basename(filename)
		const compiler = this.resolveCompiler(filename)

		return new Promise((accept, reject) => {
			compiler.run((err, stats) => {
				if (err) reject(err)
				else accept(memory_fs.readFileSync(`${__dirname}/dist/${basename}`, 'utf8'))
			})
		})
	}

	resolveCompiler(filename) {
		let compiler_name = 'main'
		const entries = {}
		if (Array.isArray(filename)) {
			filename.forEach(fn => {
				const basename = path.basename(fn)
				entries[basename] = [fn]
				compiler_name = basename
			})
		} else {
			const basename = path.basename(filename)
			entries[basename] = [filename]
			compiler_name = basename
		}
		let compiler = compilers[compiler_name]

		if (!compiler) {
			compiler = webpack({
				context: __dirname + './',
				entry  : entries,
				mode   : 'development',
				node   : {
					fs           : 'empty',
					child_process: 'empty'
				},
				output : {
					publicPath: 'http://localhost:10500/',
					path      : path.resolve(__dirname, './dist'),
					filename  : () => '[id]'
				},
				module : {
					rules: [{
						test   : /\.js$/,
						include: [path.join(__dirname, 'client')],
						exclude: /node_modules/,
						loader : 'babel-loader'
					}]
				},
				plugins: [
					new webpack.NamedModulesPlugin(),
					new webpack.NoEmitOnErrorsPlugin()
				]
			})
			compiler.outputFileSystem = memory_fs
			compilers[compiler_name] = compiler
		}
		return compilers[compiler_name]
	}

	getCompiler(filename) {
		return this.resolveCompiler(filename)
	}
}