import { error }              from 'log6'
import { DockerImageBuilder } from './DockerImageBuilder'

async function gogo() {
	const builder = new DockerImageBuilder('KSP2', undefined, undefined, 'KSP2', 18)
	await builder.buildDockerFile('../lme-data-api/lme-data-app.js')
	return builder.start()
}

gogo().then(() => {

}).catch((err) => {
	error(err)
})
