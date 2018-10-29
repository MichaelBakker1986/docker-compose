import { error }              from 'log6'
import { DockerImageBuilder } from './DockerImageBuilder'
import { getModelAsStream }   from '../git-connect/ResourceManager'

async function gogo() {
	const model_name = 'KSP2'
	const builder = new DockerImageBuilder({
		model_name,
		model_version: 20,
		resource     : {
			ffl_model_file_read_stream: getModelAsStream({ model_name })
		}
	})
	await builder.prepareDockerFile()
	return builder.buildDockerImage()
}

async function gogoIDE() {
	/*const builder = new DockerImageBuilder('KSP2', undefined, undefined, 'KSP2', 1, '-ide', '../lme-model-api/lme-model-app.js')
	 await builder.buildDockerFile()
	 return builder.start()*/
}

Promise.all([gogo(), gogoIDE()]).then(() => {

}).catch((err) => {
	error(err.stack)
})
