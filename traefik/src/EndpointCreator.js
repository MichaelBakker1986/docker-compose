import composefile                                                    from 'composefile'
import { join }                                                       from 'path'
import { stopOne, upAll }                                             from 'michaelbakker_docker-compose'
import { readYamlConfigurationFile, REST_API_ENDPOINT_CONFIGURATION } from '../../git-connect/index'
import { error, info }                                                from 'log6'

class EndpointCreator {
	constructor() {
		this.endpoints = []
		const config = readYamlConfigurationFile(REST_API_ENDPOINT_CONFIGURATION)
		config.outputFolder = join(__dirname)
		config.filename = 'docker-compose.yml'
		this.config = config
	}

	addDummyEndpoint() {
		this.addEndPoint({ endpoint_name: 'whoami', model_version: 'latest', author: 'emilevauge' })
	}

	addEndPoint({ author = 'michaelbakker1986', endpoint_name, model_version, host = 'appmodel.org' }) {
		if (this.endpoints.includes(endpoint_name)) {
			warn('Endpoint already exists, restarting ' + endpoint_name)
		}

		this.endpoints.push(endpoint_name)
		const container_name = `${endpoint_name}:${model_version}`.replace(/:/gmi, '-')
		this.config.services[container_name] = this.config.services.DUMMY
		delete this.config.services.DUMMY
		const endpoint = this.config.services[container_name]

		endpoint.image = `${author}/${endpoint_name}:${model_version}`.toLowerCase()
		endpoint.container_name = container_name
		endpoint.environment['HOST'] = host
		endpoint.environment['ENABLED_MODELS'] = endpoint_name
		endpoint.environment['MODEL_VERSION'] = model_version
		const strip = `/${endpoint_name}/${model_version}/`
		endpoint.labels['traefik.frontend.rule'] = `Host:${host};PathPrefix:${strip};PathPrefixStrip:${strip}`
		this.buildEndpoints()
		this.bringServicesUp()
	}

	buildEndpoints() {
		composefile(this.config, () => { info('done') })
	}

	bringServicesUp() {
		upAll({ cwd: join(__dirname), log: true })
		.then(
			() => { info('done')},
			err => { error('something went wrong:', err.message)}
		)
	}

	killAll() {
		this.endpoints.forEach(point => {
			stopOne(point, { cwd: join(__dirname), log: true })
			.then(
				() => { info('done')},
				err => { error('something went wrong:', err.message)}
			)
		})
		this.endpoints.length = 0
	}
}

export { EndpointCreator }