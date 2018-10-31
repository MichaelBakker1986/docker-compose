import { exec }                                                            from 'child-process-promise'
import { debug, DEBUG, error, info }                                       from 'log6'
import bodyParser                                                          from 'body-parser'
import expressStaticGzip                                                   from 'express-static-gzip'
import { createReadStream }                                                from 'fs'
import ExcelConnect                                                        from '../excel-connect/excel-connect'
import fileUpload                                                          from 'express-fileupload'
import assembler                                                           from '../git-connect/ModelAssembler'
import { existsExcelSheet, FILE_SYSTEM_RESOURCES_PATH, getExcelSheetPath } from '../git-connect/index'
import { Stash as stash }                                                  from './src/stash'
import { DockerImageBuilder }                                              from '../docker-connect/DockerImageBuilder'
import { EndpointCreator }                                                 from '../traefik/src/index'
import express                                                             from 'express'
import compression                                                         from 'compression'
import { join }                                                            from 'path'
import { setup }                                                           from './api-def'
import cors                                                                from 'cors'
import IDECodeBuilder                                                      from './src/IDE_code_builder'
import request                                                             from 'request-promise-json'
import { FFLToRegister }                                                   from '../ffl/FFLToRegister'
import { FFL_VERSION_PROPERTY_NAME, Register }                             from '../lme-core/index'
import { RegisterToFFL }                                                   from '../ffl/RegisterToFFL'

const DBModel = {}
const host = process.env.INTERNAL_HOST || '127.0.0.1'
const internal_proxy_port = process.env.INTERNAL_PROXY_PORT || 7081
const port = 8080
const isDebug = process.env.ENV === 'debug'
const app = express()
app.use('/id/:id/transformFFL_LME/', expressStaticGzip(FILE_SYSTEM_RESOURCES_PATH, undefined))
app.use('/resources/', expressStaticGzip(FILE_SYSTEM_RESOURCES_PATH, undefined))
app.use(expressStaticGzip(FILE_SYSTEM_RESOURCES_PATH, undefined))
app.use(compression())
app.use(cors())
app.set('port', port)
app.set('host', host)
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
	extended: true,
	limit   : '50mb'
}))
app.use('*/src', IDECodeBuilder)
app.post('*/:user_id/preview/:model_name', async ({ body, params }, res) => {
	const { model_name, user_id } = params
	const { fail, hash, message } = await stash.preview(user_id, model_name, body.data)
	if (fail) {
		if (DEBUG) debug(`Failed to write ${model_name}.ffl file.`, message)
		res.json({ status: 'fail', reason: message })
	} else {
		res.set('x-auth-id', `${hash}.ffl`)
		res.json({ status: 'ok', link: hash })
	}
})
assembler.then(db_methods => {
	Object.assign(DBModel, db_methods)
}).catch(err => {
	error(err.stack)
})
app.get('*/model', async (req, res) => {
	const name = req.query.model
	DBModel.getModel(name).then((data) => {
		res.json({ status: 'success', data: data })
	}).catch(err => {
		debug('Failed to fetch model from database', err)
		res.json({ status: 'fail', reason: err.toString() })
	})
})
app.get('*/modelChanges/:model_name', async (req, res) => {
	const model_name = req.params.model_name
	DBModel.getFFLModelPropertyChanges(model_name).then((data) => {
		res.json({ status: 'success', data: data })
	}).catch((err) => {
		debug('Failed to fetch model changes from database', err)
		res.json({ status: 'fail', reason: err.toString() })
	})
})
app.post('*/:user_id/saveFFLModel/:model_name', async ({ body, params }, res) => {
	const { model_name, user_id } = params
	try {
		const { ffl, version } = bumbVersion(body.data)
		await stash.commit(user_id, model_name, ffl, body.type)
		res.json({ status: 'ok', version })
	} catch (err) {
		debug('Failed to write ' + model_name + '.ffl file.', err)
		res.json({ status: 'fail', message: `Failed to write ${model_name}.ffl`, reason: err.toString() })
	}
})
app.post('*/:user_id/saveJBehaveStory/:model_name', async ({ body, params }, res) => {
	const { model_name, user_id } = params
	stash.commitJBehaveFile(user_id, model_name, body.data, body.type).then(() => {
		res.json({ status: 'ok' })
	}).catch((err) => {
		debug(`Failed to write ${model_name}.ffl file.`, err)
		res.json({ status: 'fail', message: `Failed to write ${model_name}.ffl`, reason: err.toString() })
	})
})

app.get('*/models', async (req, res) => {
	try {
		const data = await stash.models('master', 'ffl')
		res.json(data)
	}
	catch (err) {
		res.status(500).send(err.toString())
	}
})
app.get('*/tmp_model/:model', async ({ params }, res) => {
	const name = params.model
	return exec(`node ${join(__dirname, '/src/exportLME_FFL.js')} ${name}`).then(() => {
		createReadStream(join(FILE_SYSTEM_RESOURCES_PATH, `${name}.js`)).pipe(res)
	}).catch((err) => {
		res.status(500).send(err.toString())
	})
})

// default options
app.use(fileUpload())
app.get('*/excel/:model.xlsx', async ({ params }, res) => {
	const { model_name } = params
	const result = await existsExcelSheet({ model_name })
	const excelSheetPath = getExcelSheetPath({ model_name: result ? model_name : 'SAMPLE' })
	res.sendFile(excelSheetPath)
})
app.post('*/upload', async (req, res) => {
	info('upload')
	res.status(200).json({ status: 'ok' })
})

app.get('*/readExcel/:model', async ({ params }, res) => {
	try {
		res.json(await ExcelConnect.loadExcelFile(params.model))
	} catch (err) {
		res.status(400).json({ status: 'fail', reason: err.toString() })
	}
})

function bumbVersion(data) {
	let register = new Register(['desc', 'start', 'end', 'name', 'index', 'modifier', 'parentId', 'tuple', 'refersto', 'tree_index', 'children', 'valid', 'title', 'type', 'parent_name', 'locked', 'frequency', 'displaytype', 'formula', 'required', FFL_VERSION_PROPERTY_NAME])
	new FFLToRegister(register, data).parseProperties()
	let new_version = Number(register.getValue('root', FFL_VERSION_PROPERTY_NAME) || 0) + 1
	register.setValue('root', FFL_VERSION_PROPERTY_NAME, new_version)
	console.info(register.getValue('root', FFL_VERSION_PROPERTY_NAME))
	return {
		version: new_version,
		ffl    : new RegisterToFFL(register).toGeneratedFFL({ auto_join: true })
	}
}

/**
 * Test the distribution
 * Stash all given data.
 * Tag the version
 * Build image
 * Publish to nexus
 */
app.post('*/:user_id/publishDockerImage/:model_name', async ({ body, params }, res) => {
	const { model_name, user_id } = params

	stash.commitJBehaveFile(user_id, model_name, body.story, null).then(() => {
		ExcelConnect.loadExcelFile(model_name).then(() => {
			const { ffl, version } = bumbVersion(body.fflData)

			stash.commit(user_id, model_name, ffl, '.ffl').then(async () => {
				const model_version = `0.${version}`
				const dockerImageBuilder = new DockerImageBuilder({
					model_name,
					model_version,
					resource: {
						fflModel: ffl
					}
				})
				try {
					await dockerImageBuilder.prepareDockerFile()
					await dockerImageBuilder.buildDockerImage()
					new EndpointCreator().addEndPoint({ endpoint_name: model_name, model_version, host, debug: isDebug })
				} catch (er) {
					error(er.stack)
				}
				return res.json({
					version: model_version,
					status : 'ok',
					model_name
				})
			}).catch((err) => {
				if (DEBUG) debug(`Failed to write ${model_name}.ffl file.`, err)
				return res.json({
					status : 'fail',
					message: `Failed to write ${model_name}.ffl`,
					reason : err.toString()
				})
			})
		}).catch((err) => {
			if (DEBUG) debug(`Failed to write ${model_name}.ffl file.`, err.stack)
			res.status(400).json({ status: 'fail', reason: err.toString() })
		})
	}).catch((err) => {
		if (DEBUG) debug(`Failed to write ${model_name}.ffl file.`, err.toString())
		return res.json({ status: 'fail', message: `Failed to write ${model_name}.ffl`, reason: err.toString() })
	})
})
/** * TODO: add commit to stash */
app.post('*/excel/:model', async (req, res) => {
	const modelName = req.params.model
	if (!req.files) {
		debug(`Failed to write ${modelName}.xlsx file.`)
		return res.status(400).json({ status: 'fail', reason: 'No files were uploaded.' })
	}
	const excel_file = req.files.excelfile
	excel_file.mv(getExcelSheetPath(modelName), err => {
		if (err) {
			if (DEBUG) debug(`Failed to write ${modelName}.xlsx file.`, err)
			res.status(400).json({ status: 'fail', reason: 'No files were uploaded.' })
		} else {
			if (DEBUG) debug(`Success write new excel sheet from user upload. ${modelName}`)
			res.json({ status: 'ok', modelName })
		}
	})
})
setup(app)
app.listen(port, () => {
	//talk with the proxy
	const routes = ['*/model-docs*', '*/src/ide.js']
	app._router.stack.forEach(r => {
		if (r.route && r.route.path) {
			routes.push(r.route.path)
		}
	})
	request.get(`http://${host}:${internal_proxy_port}/register/service/model-api/${host}/${port}/${routes.join(',')}`).then(data => {
		if (DEBUG) debug(`${JSON.stringify(routes)} ${data}`)
	}).catch(err => error('Failed to register ', err))
})