/**
 build docker image and publish to Registry
 #docker build . -f LMERestAPIBuilder -t=nexus.topicusfinance.nl:8444/model_name:version
 #docker push nexus.topicusfinance.nl:8444/ksp:1.1
 #sudo docker run -p 80:7081 nexus.topicusfinance.nl:8444/ksp:0.3
 #should only include the generated model.js from the generator instead of
 # -- but for now we include all to make the docker-image file work
 #http://blfyn-dv-doc01.finance.lab
 # - lme-core
 # - math
 # - ast-node-utils
 # - formulajs
 # - excel-connect
 # nexus.topicusfinance.nl:8444
 **/
import { WebpackCompiler } from './WebpackCompiler'
import MemoryFS            from 'memory-fs'
import path                from 'path'

const params = process.env.MODEL || 'MVO'

class DockerImageBuilder {
	constructor(fflModel, story, matrix, model_name, model_version) {
		this.fflModel = fflModel
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

		const read_stream = fs.createReadStream('../model-tests/KSP/KSP.ffl')
		const write_stream = fs.createWriteStream(path.join(base_dir, 'KSP.ffl'))
		read_stream.pipe(write_stream)

		const source = memory_fs.readFileSync(path.resolve(base_dir, 'rest-api-backend.js'), 'utf8')

		console.info(stats)
		console.info(source)
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
new DockerImageBuilder('KSP', undefined, undefined, 2).buildDockerFile('../lme-data-api/lme-data-app.js')