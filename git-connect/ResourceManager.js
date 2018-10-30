import { createReadStream, readFileSync } from 'fs'
import { join }                           from 'path'
import read                               from 'read-yaml'

const resources_map = join(__dirname, '/resources')

export function getModelAsStream({ model_name, model_version = '' }) {
	return createReadStream(join(resources_map, `${model_name}.ffl`))
}

export function getModelAsString({ model_name, model_version = '' }) {
	return readFileSync(join(resources_map, `${model_name}.ffl`), 'utf8')
}

export function readYamlConfigurationFile(configuration_file) {
	return read.sync(join(resources_map, configuration_file), {})
}

export const REST_API_ENDPOINT_CONFIGURATION = 'docker-compose-rest-api-endpoint.yml'
