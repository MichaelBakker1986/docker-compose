import { WebpackCompiler }                                from './WebpackCompiler'
import path                                               from 'path'
import uuid4                                              from 'uuid4'
import MemoryFS                                           from 'memory-fs'
import { createReadStream, createWriteStream, mkdirSync } from 'fs'

const params = process.env.MODEL || 'MVO'

class DockerImageBuilder {
	constructor(fflModel, story, matrix, model_name, model_version) {
		this.fflModel = fflModel
		this.entry_code = 'rest-api-backend.js'
		this.story = story
		this.matrix = matrix
		this.model_name = model_name
		this.model_version = model_version
	}

	async buildDockerFile(path_info) {
		const memory_fs = new MemoryFS()
		const stats = await new WebpackCompiler({ memory_fs }).buildProductionFile(path_info)
		//add Model-file
		const base_dir = `${__dirname}/dist`

		const folder_id = uuid4()
		let new_folder = path.join(__dirname, folder_id)
		mkdirSync(new_folder)

		const read_stream = createReadStream(`../model-tests/${this.model_name}/KSP.ffl`)
		const write_stream = createWriteStream(path.join(new_folder, `${this.model_name}.ffl`))
		read_stream.pipe(write_stream)

		memory_fs.createReadStream(path.resolve(base_dir, 'rest-api-backend.js')).pipe(createWriteStream(path.join(new_folder, 'rest-api-backend.js')))

		console.info(stats)
	}

	start() {
		log.info('Start build image')
		const command = `cd .. && docker build . --build-arg ENABLED_MODELS=${this.model_name} -f LMERestAPIBuilder  -t=${this.model_name}:0.${this.model_version}`
		exec(command).then((resp) => {
			if (resp.stderr.length > 0) return log.error('failed to create docker image ', resp.stderr)
			log.info(resp.stdout)
		})
	}
}

//new DockerImageBuilder(null, null, null, 'prescan').buildDockerImage()
export { DockerImageBuilder }
new DockerImageBuilder('KSP', undefined, undefined, 'KSP', 2).buildDockerFile('../lme-data-api/lme-data-app.js').then(() => {

}).catch((err) => {

})