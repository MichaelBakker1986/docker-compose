import composefile        from 'composefile'
import read               from 'read-yaml'
import { join }           from 'path'
import { stopOne, upAll } from '../docker-compose/index'
import { error }          from 'log6'

class EndpointCreator {
	constructor() {
		this.endpoints = []
		const config = read.sync(join(__dirname, 'docker-compose.yml'), {})

		config.outputFolder = join(__dirname)
		config.filename = 'docker-compose.yml'
		this.config = config
	}

	addDummyEndpoint() {
		this.addEndPoint('whoami', 'latest', 'emilevauge')
	}

	addEndPoint(endpoint, version, name) {
		if (!this.endpoints.includes(endpoint)) {
			this.endpoints.push(endpoint)
			this.config.services[endpoint] = {
				'image' : `${name || 'michaelbakker1986'}/${endpoint}:${version}`,
				'labels': [
					'traefik.frontend.rule=Host:lme.appmodel.org',
					`traefik.frontend.rule=Path:/${endpoint}/${version}`
				]
			}
			this.buildEndpoints()
			this.bringServicesUp()
		} else {
			error('Endpoint already exists')
		}
	}

	buildEndpoints() {
		composefile(this.config, err => { console.log('done') })
	}

	bringServicesUp() {
		upAll({ cwd: join(__dirname), log: true })
		.then(
			() => { console.log('done')},
			err => { console.log('something went wrong:', err.message)}
		)
	}

	killAll() {
		this.endpoints.forEach(point => {
			stopOne(point, { cwd: join(__dirname), log: true })
			.then(
				() => { console.log('done')},
				err => { console.log('something went wrong:', err.message)}
			)
		})
		this.endpoints.length = 0
	}
}

export { EndpointCreator }