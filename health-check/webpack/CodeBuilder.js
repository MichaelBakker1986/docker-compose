import path     from 'path'
import MemoryFS from 'memory-fs'
import webpack  from 'webpack'

const memory_fs = new MemoryFS()
const compilers = {}

export class CodeBuilder {
	constructor() {
	}

	resolveCompiler(absolute_path) {
		const basename = path.basename(absolute_path)
		let compiler = compilers[absolute_path]
		if (!compiler) {
			compiler = webpack({
				context: __dirname,
				entry  : {
					chart: [absolute_path]
				},
				mode   : 'development',
				node   : {
					fs           : 'empty',
					child_process: 'empty'
				},
				output : {
					filename: basename
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
				]
			})
			compiler.outputFileSystem = memory_fs
			compilers[absolute_path] = compiler
		}
		return compilers[absolute_path]
	}

	getCompiler(absolute_path) {
		return this.resolveCompiler(absolute_path)
	}
}