import { WebpackCompiler }                                            from './WebpackCompiler'
import path                                                           from 'path'
import uuid4                                                          from 'uuid4'
import MemoryFS                                                       from 'memory-fs'
import { createReadStream, createWriteStream, existsSync, mkdirSync } from 'fs'
import { error, info }                                                from 'log6'
import { exec }                                                       from 'child-process-promise'

import { Readable } from 'stream'

const package_template = {
	'name'           : 'ksp',
	'description'    : 'REST api for lme',
	'author'         : 'michael.bakker1986@gmail.com',
	'repository'     : {
		'type': 'git',
		'url' : 'ssh://git@stash.topicus.nl:7999/ff/fesjs.git'
	},
	'main'           : 'rest-api-backend.js',
	'version'        : '0.0.3',
	'scripts'        : {
		'start': 'node --no-deprecation rest-api-backend.js'
	},
	'dependencies'   : {
		'acorn'                    : '^6.0.2',
		'acorn-node'               : '^1.6.2',
		'escodegen'                : '^1.11.0',
		'babel-runtime'            : '^6.22.0',
		'source-map-support'       : '^0.5.9',
		'body-parser'              : '^1.18.3',
		'child-process-es6-promise': '^1.2.0',
		'child-process-promise'    : '^2.2.1',
		'cors'                     : '^2.8.4',
		'chalk'                    : '^2.4.1',
		'composefile'              : '^0.3.0',
		'express'                  : '^4.16.4',
		'express-prettify'         : '0.0.9',
		'exceljs'                  : '^1.6.2',
		'express-test'             : '^0.1.2',
		'ffl-math'                 : '^1.0.17',
		'flatten-object'           : '^1.2.0',
		'formulajs-connect'        : '^1.0.6',
		'function-bind'            : '^1.1.1',
		'glob'                     : '^7.1.3',
		'http-proxy'               : '^1.17.0',
		'is-promise'               : '^2.1.0',
		'json-parse-better-errors' : '^1.0.2',
		'log6'                     : '^2.0.16',
		'morgan'                   : '^1.9.1',
		'mysql'                    : '^2.16.0',
		'orm'                      : '^5.0.2',
		'orm-timestamps'           : '^0.5.2',
		'pako'                     : '^1.0.6',
		'performance-now'          : '^2.1.0',
		'pg'                       : '^7.5.0',
		'promise'                  : '^7.1.1',
		'request-promise-json'     : '^1.0.4',
		'swagger-jsdoc'            : '^1.10.3',
		'strip-ansi'               : '^5.0.0',
		'uuid4'                    : '^1.1.4',
		'xhr2'                     : '^0.1.4'
	},
	'devDependencies': {},
	'license'        : 'MIT'
}
const temp_dir_name = path.join(__dirname, 'build_folder')

class DockerImageBuilder {
	constructor({
		            story, matrix, model_name, model_version, postfix = '', path_info = '../lme-data-api/lme-data-app.js',
		            resource: {
			            fflModel,
			            ffl_model_file_read_stream
		            }
	            }) {
		if (model_name == null) throw Error(`Invalid model name ${model_name}`)
		if ((fflModel == null) === (ffl_model_file_read_stream == null)) throw Error('Invalid parameters, only required parameter and only one type of resource possible')
		if (fflModel) {
			//convert the string to stream
			ffl_model_file_read_stream = new Readable()
			ffl_model_file_read_stream._read = () => {}
			ffl_model_file_read_stream.push(fflModel)
			ffl_model_file_read_stream.push(null)

		}
		this.ffl_model_file_read_stream = ffl_model_file_read_stream
		this.path_info = path_info
		this.postfix = postfix //modelname-IDE or modelname-BACKEND
		this.entry_code_path = 'rest-api-backend.js'
		this.story = story
		this.matrix = matrix
		this.model_name = model_name
		this.model_version = model_version
		this.folder_id = uuid4()
		this.new_folder = path.join(temp_dir_name, this.folder_id)
		this.resources_folder = path.join(this.new_folder, 'resources')
		this.docker_model_name = this.model_name.toLowerCase()
		this.docker_tag = `michaelbakker1986/${this.docker_model_name}${this.postfix}:${this.model_version}`
	}

	async prepareDockerFile() {
		if (!existsSync(temp_dir_name)) {
			info(`Creating build folder ${temp_dir_name}`)
			mkdirSync(temp_dir_name)
		}
		info(`Current folder ${__dirname} new_folder ${this.new_folder}`)
		mkdirSync(this.new_folder)
		mkdirSync(this.resources_folder)
		await this.compileRestApiCode()
		await this.copyFFLModelFile()
		await this.copy_package_information(package_template)
		await this.copy_Dockerfile()
	}

	async compileRestApiCode() {
		const path_info = this.path_info
		const memory_fs = new MemoryFS()
		await new WebpackCompiler({ memory_fs }).buildProductionFile(path_info)
		try {
			const readStream = memory_fs.createReadStream(path.join(__dirname, this.entry_code_path))
			const writeStream = createWriteStream(path.join(this.new_folder, this.entry_code_path))
			await readStream.pipe(writeStream)
		} catch (err) {
			error(' trying to enter: ' + this.entry_code_path)
			error(err)
		}
	}

	async copyFFLModelFile() {
		const read_stream = this.ffl_model_file_read_stream
		const write_stream = createWriteStream(path.join(this.resources_folder, `${this.model_name}.ffl`))
		read_stream.pipe(write_stream)
	}

	print_result({ stderr, stdout }) {
		if (stderr.length > 0) return error(`failed to create docker image ${this.docker_tag}`, stderr)
		info(stdout)
	}

	async buildDockerImage() {
		try {
			const command = `cd ${this.new_folder} && docker build . --build-arg ENABLED_MODELS=${this.model_name} -t=${this.docker_tag}`
			info(`Start build image \n"${command}"`)
			const build_output = await exec(command)
			this.print_result(build_output)
		} catch (err) {
			error(err)
		}
	}

	/*	async buildAndDeploy() {
	 const docker_name = `${this.docker_model_name}_${this.model_version}`
	 await this.buildDockerImage()
	 //const start_command = `docker run -d -t -i -p 9991:80 --name ${docker_name} -e RESOURCES_PATH=resources -e ENABLED_MODELS=${this.model_name} -e ENV=debug ${this.docker_tag}`
	 const start_command = `docker run -d -t -i -p --name ${docker_name} -e RESOURCES_PATH=resources -e ENABLED_MODELS=${this.model_name} -e ENV=debug ${this.docker_tag}`
	 const run_output = await exec(start_command)
	 this.print_result(run_output)
	 }*/

	async copy_package_information(package_template) {
		await createWriteStream(path.join(this.new_folder, 'package.json')).write(JSON.stringify(package_template, null, 2))
	}

	async copy_Dockerfile() {
		await createReadStream(path.join(__dirname, 'Dockerfile')).pipe(createWriteStream(path.join(this.new_folder, 'Dockerfile')))
	}
}

export { DockerImageBuilder }