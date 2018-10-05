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
				else accept(memory_fs.readFileSync(__dirname + '/dist/' + basename, 'utf8'))
			})
		})
	}

	resolveCompiler(filename) {
		const basename = path.basename(filename)
		let compiler = compilers[filename]
		if (!compiler) {
			compiler = webpack({
				context: __dirname + './',
				entry  : [filename],
				mode   : 'development',
				node   : {
					fs           : 'empty',
					child_process: 'empty'
				},
				output : {
					publicPath: 'http://localhost:10500/',
					path      : path.resolve(__dirname, './dist'),
					filename  : basename
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
			compilers[filename] = compiler
		}
		return compilers[filename]
	}

	getCompiler(filename) {
		return this.resolveCompiler(filename)
	}
}