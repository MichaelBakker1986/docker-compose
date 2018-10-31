import { createReadStream, exists, readFileSync } from 'fs'
import { basename, join }                         from 'path'
import read                                       from 'read-yaml'
import write                                      from 'node-fs-writefile-promise'

const resources_map = join(__dirname, 'resources')
const ENCODING = 'utf8'
const DEFAULT_FILE_EXTENSION = '.ffl'

const toFFLFileName = (model_name, appendix = DEFAULT_FILE_EXTENSION, version = '') => `${model_name}${appendix}`
const joinResource = (model_name, appendix = DEFAULT_FILE_EXTENSION, version = '') => join(resources_map, toFFLFileName(model_name, appendix, version))

export const readModelAsStream = ({ model_name, version = '' }) => createReadStream(joinResource(model_name, undefined, version))
export const readModelAsString = ({ model_name, version = '' }) => readFileSync(joinResource(model_name, undefined, version), ENCODING)
export const writeModelAsString = async ({ model_name, model_version = '', data }) => write(joinResource(model_name), data)
export const writeJBehaveAsString = async ({ name, model_version = '', data }) => write(joinResource(name, '.story'), data)
export const readYamlConfigurationFile = (configuration_file) => read.sync(join(resources_map, configuration_file), {})
export const existsExcelSheet = async ({ model_name, version }) => new Promise((accept) => exists(joinResource(model_name, '.xlsx', version), (result) => accept(result)))
export const existsModel = async ({ model_name, version }) => new Promise((accept) => exists(joinResource(model_name, undefined, version), (result) => accept(result)))
export const readExcelSheetAsString = ({ model_name, version }) => readFileSync(joinResource(model_name, '.xlsx', version), ENCODING)
export const readExcelSheetAsStream = ({ model_name, version }) => createReadStream(joinResource(model_name, '.xlsx', version), ENCODING)
export const getExcelSheetPath = ({ model_name, version }) => joinResource(model_name, '.xlsx', version)
export const getModelPath = ({ model_path, version }) => joinResource(basename(model_path), undefined, version)

export const REST_API_ENDPOINT_CONFIGURATION = 'docker-compose-rest-api-endpoint.yml'
export const FILE_SYSTEM_RESOURCES_PATH = resources_map