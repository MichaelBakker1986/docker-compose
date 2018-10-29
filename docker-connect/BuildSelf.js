import { error }              from 'log6'
import { DockerImageBuilder } from './DockerImageBuilder'

async function gogo() {
	const builder = new DockerImageBuilder('KSP2', undefined, undefined, 'KSP2', 20, '', '../lme-data-api/lme-data-app.js')
	await builder.buildDockerFile()
	return builder.start()
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
