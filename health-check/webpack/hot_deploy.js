import { CodeBuilder } from './Codebuilder'
import path            from 'path'
import middleware      from 'webpack-dev-middleware'
import hotClient       from 'webpack-hot-client'

const codeBuilder = new CodeBuilder()

export class HotDeploy {
	constructor(server, hot_path) {
		const filename = path.basename(hot_path)
		/*		const { publicPath } = `http://localhost:3000/${filename}`*/
		const compiler = codeBuilder.getCompiler(hot_path)
		const client = hotClient(compiler, { reload: false })

		client.server.on('listening', () => {
			let middleware1 = middleware(compiler, { name: filename })
			server.use(middleware1)
		})
	}
}