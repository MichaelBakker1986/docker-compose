import { CodeBuilder } from './CodeBuilder'
import path            from 'path'
import middleware      from 'webpack-dev-middleware'
import hotClient       from 'webpack-hot-client'

const codeBuilder = new CodeBuilder()

export class HotDeploy {
	constructor(server, hot_path) {
		const filename = path.basename(hot_path)
		const { publicPath } = `http://localhost:10500/${filename}`
		const file_path = path.join(__dirname, hot_path)

		const compiler = codeBuilder.getCompiler(file_path)
		const client = hotClient(compiler, { reload: false })

		client.server.on('listening', () => {
			server.use(middleware(compiler, { name: filename, publicPath, dynamicPublicPath: true }))
		})
	}
}