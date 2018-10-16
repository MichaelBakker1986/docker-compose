import { WebpackCompiler }                                            from './WebpackCompiler'
import path                                                           from 'path'
import uuid4                                                          from 'uuid4'
import MemoryFS                                                       from 'memory-fs'
import { createReadStream, createWriteStream, existsSync, mkdirSync } from 'fs'
import { error, info }                                                from 'log6'
import { exec }                                                       from 'child-process-promise'

const params = process.env.MODEL || 'MVO'
const DEVICE_HOST_PORT = 10000

const package_template = {
	'name'           : 'ksp',
	'description'    : 'REST api for lme',
	'author'         : 'michael.bakker1986@gmail.com',
	'repository'     : {
		'type': 'git',
		'url' : 'ssh://git@stash.topicus.nl:7999/ff/fesjs.git'
	},
	'main'           : 'rest-api-backend.js',
	'version'        : '0.0.20',
	'scripts'        : {
		'start': 'node rest-api-backend.js'
	},
	'dependencies'   : {
		'escodegen'                : '^1.11.0',
		'babel-runtime'            : '^6.22.0',
		'source-map-support'       : '^0.5.9',
		'body-parser'              : '^1.18.3',
		'browserify'               : '^16.2.3',
		'child-process-es6-promise': '^1.2.0',
		'child-process-promise'    : '^2.2.1',
		'cors'                     : '^2.8.4',
		'express'                  : '^4.16.4',
		'express-prettify'         : '0.0.9',
		'express-test'             : '^0.1.2',
		'ffl-math'                 : '^1.0.17',
		'flatten-object'           : '^1.2.0',
		'formulajs-connect'        : '^1.0.6',
		'glob'                     : '^7.1.3',
		'http-proxy-middleware'    : '^0.17.4',
		'log6'                     : '^2.0.16',
		'morgan'                   : '^1.9.1',
		'mysql'                    : '^2.16.0',
		'orm'                      : '^4.0.1',
		'orm-timestamps'           : '^0.5.2',
		'performance-now'          : '^2.1.0',
		'pg'                       : '^7.5.0',
		'promise'                  : '^7.1.1',
		'request-promise-json'     : '^1.0.4',
		'swagger-jsdoc'            : '^1.10.3',
		'swaggerize-ui'            : '^1.0.1',
		'uuid4'                    : '^1.1.4',
		'xhr2'                     : '^0.1.4'
	},
	'devDependencies': {},
	'license'        : 'MIT'
}
const temp_dir_name = 'temp'

class DockerImageBuilder {
	constructor(fflModel, story, matrix, model_name, model_version) {
		this.fflModel = fflModel
		this.entry_code_path = 'rest-api-backend.js'
		this.story = story
		this.matrix = matrix
		this.model_name = model_name
		this.model_version = model_version
		this.folder_id = path.join('temp', uuid4())
		this.new_folder = path.join(__dirname, this.folder_id)
		this.resources_folder = path.join(this.new_folder, 'resources')
		this.docker_model_name = this.model_name.toLowerCase()
		this.docker_tag = `michaelbakker1986/${this.docker_model_name}:0.${this.model_version}`
	}

	async buildDockerFile(path_info) {
		if (!existsSync(temp_dir_name)) mkdirSync(temp_dir_name)
		mkdirSync(this.new_folder)
		mkdirSync(this.resources_folder)
		await this.compileRestApiCode(path_info)
		await this.copyFFLModelFile(this.model_name)
		await this.copy_package_information(package_template)
		await this.copy_Dockerfile()
	}

	async compileRestApiCode(path_info) {
		const memory_fs = new MemoryFS()
		await new WebpackCompiler({ memory_fs }).buildProductionFile(path_info)
		const readStream = memory_fs.createReadStream(path.join(__dirname, this.entry_code_path))
		const writeStream = createWriteStream(path.join(this.new_folder, this.entry_code_path))
		await readStream.pipe(writeStream)
	}

	async copyFFLModelFile(modelName) {
		const read_stream = createReadStream(`../model-tests/${this.model_name}/${modelName}.ffl`)
		const write_stream = createWriteStream(path.join(this.resources_folder, `${this.model_name}.ffl`))
		read_stream.pipe(write_stream)
	}

	print_result({ stderr, stdout }) {
		if (stderr.length > 0) return error(`failed to create docker image ${this.docker_tag}`, stderr)
		info(stdout)
	}

	async start() {
		try {
			const command = `cd ${this.new_folder} && docker build . --build-arg ENABLED_MODELS=${this.model_name} -t=${this.docker_tag}`
			info(`Start build image \n"${command}"`)
			const build_output = await exec(command)
			this.print_result(build_output)

		} catch (err) {
			console.error(err)
		}

		const start_command = `cd ${this.new_folder} && docker run -d -t -i -p ${DEVICE_HOST_PORT}:8085 --name ${this.docker_model_name}_${this.model_version} -e RESOURCES_PATH=resources -e ENABLED_MODELS=${this.model_name} -e ENV=debug ${this.docker_tag}`
		const run_output = await exec(start_command)
		this.print_result(run_output)
	}

	async copy_package_information(package_template) {
		await createWriteStream(path.join(this.new_folder, 'package.json')).write(JSON.stringify(package_template, null, 2))
	}

	async copy_Dockerfile() {
		await createReadStream(path.join(__dirname, 'Dockerfile')).pipe(createWriteStream(path.join(this.new_folder, 'Dockerfile')))
	}
}

export { DockerImageBuilder }