import { exec }                      from 'child-process-promise'
import { debug, DEBUG, error, info } from 'log6'
import browserify                    from 'browserify-middleware'
import babelify                      from 'babelify'
import bodyParser                    from 'body-parser'
import expressStaticGzip             from 'express-static-gzip'
import fs, { createReadStream }      from 'fs'
import ExcelConnect                  from '../excel-connect/excel-connect'
import fileUpload                    from 'express-fileupload'
import assembler                     from '../git-connect/ModelAssembler'
import { Stash as stash }            from './src/stash'
import { DockerImageBuilder }        from '../docker-connect/DockerImageBuilder'
import request                       from 'request-promise-json'
import express                       from 'express'
import compression                   from 'compression'
import path                          from 'path'
import { setup }                     from './api-def'
import cors                          from 'cors'
import IDECodeBuilder                from './src/IDE_code_builder'

const DBModel = {}
const host = process.env.HOST || '127.0.0.1'
const internal_proxy_port = process.env.INTERNAL_PROXY_PORT || 7081
const port = 8080
//const domain = process.env.INTERNAL_PROXY_PORT || (`http://${host}:${internal_proxy_port}/id/guest`)
const app = express()
//app.use(express_favicon())
app.use('/id/:id/transformFFL_LME/', expressStaticGzip(`${__dirname}/../git-connect/resources/`, undefined))
app.use('/resources/', expressStaticGzip(`${__dirname}/../git-connect/resources/`, undefined))
app.use(expressStaticGzip(`${__dirname}/../git-connect/resources/`, undefined))
app.use(compression())
app.use(cors())
app.set('port', port)
app.set('host', host)
app.use(bodyParser.json({ limit: '50mb' }))       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true,
	limit   : '50mb'
}))
app.use('/src', IDECodeBuilder)
browserify.settings({
	transform: [
		/*	require('browserify-fastjson'),*/
		[babelify, {
			presets: ['env', 'stage-0'], 'plugins': [
				'transform-runtime',
				'transform-class-properties',
				'transform-decorators-legacy'
			]
		}]
	]
})
app.get('*/excelide.js', browserify(__dirname + '/src/excelide.js', {
	cache        : true,
	gzip         : true,
	insertGlobals: true,
	debug        : false,
	minify       : true,
	precompile   : true
}))
app.get('*/ui_showcase.js', browserify(__dirname + '/src/uishowcase.js', {
	gzip         : true,
	insertGlobals: true,
	debug        : false
}))
app.post('*/:user_id/preview/:model_name', async (req, res) => {
	const model_name = req.params.model_name
	const user_id = req.params.user_id
	stash.preview(user_id, model_name, req.body.data).then((data) => {
		res.set('x-auth-id', data + '.ffl')
		res.json({ status: 'ok', link: data })
	}).catch(err => {
		debug('Failed to write ' + model_name + '.ffl file.', err)
		res.json({ status: 'fail', reason: err.toString() })
	})
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
app.post('*/:user_id/saveFFLModel/:model_name', async (req, res) => {
	const model_name = req.params.model_name
	const user_id = req.params.user_id
	stash.commit(user_id, model_name, req.body.data, req.body.type).then((data) => {
		res.json({ status: 'ok' })
	}).catch((err) => {
		debug('Failed to write ' + model_name + '.ffl file.', err)
		res.json({ status: 'fail', message: 'Failed to write ' + model_name + '.ffl', reason: err.toString() })
	})
})
app.post('*/:user_id/saveJBehaveStory/:model_name', async (req, res) => {
	const model_name = req.params.model_name
	const user_id = req.params.user_id
	stash.commitJBehaveFile(user_id, model_name, req.body.data, req.body.type).then((data) => {
		res.json({ status: 'ok' })
	}).catch((err) => {
		debug('Failed to write ' + model_name + '.ffl file.', err)
		res.json({ status: 'fail', message: 'Failed to write ' + model_name + '.ffl', reason: err.toString() })
	})
})

app.get('*/branches', async (req, res) => {
	stash.branches().then(data => {
		res.json(data)
	}).catch(err => {
		debug(`Failed to lookup branches:[${err}]`)
		res.json([])
	})
})
app.get('*/models', async (req, res) => {
	stash.models('master', 'ffl').then((data) => {
		res.json(data)
	}).catch((err) => {
		//res.json({status: 'fail', reason: err.toString()});
		res.status(500).send(err.toString())
	})
})
app.get('*/tmp_model/:model', async (req, res) => {
	const name = req.params.model
	return exec(`node ${__dirname}/src/exportLME_FFL.js ${name}`).then(() => {
		const readStream = createReadStream(`${__dirname}/../git-connect/resources/${name}.js`)
		readStream.pipe(res)
	}).catch((err) => {
		res.status(500).send(err.toString())
	})
})

// default options
app.use(fileUpload())
app.get('*/excel/:model', async (req, res) => {
	const modelName = req.params.model
	fs.exists(`${__dirname}/../git-connect/resources/${modelName}.xlsx`, (result) => {
		const targetFilePath = `${__dirname}/../git-connect/resources/${modelName}.xlsx`
		const sampleFilePath = `${__dirname}/../git-connect/SAMPLE.xlsx`
		if (!result) {
			res.sendFile(path.resolve(sampleFilePath))
		} else {
			res.sendFile(path.resolve(targetFilePath))
		}
	})
})
app.post('*/upload', async (req, res) => {
	info('upload')
	res.status(200).json({ status: 'ok' })
})

app.get('*/readExcel/:model', async function(req, res) {
	const modelName = req.params.model
	ExcelConnect.loadExcelFile(modelName).then(function(matrix) {
		res.json(matrix)
	}).catch(err => res.status(400).json({ status: 'fail', reason: err.toString() }))
})
/**
 * Test the distribution
 * Stash all given data.
 * Tag the version
 * Build image
 * Publish to nexus
 */
app.post('*/:user_id/publishDockerImage/:model_name', async function(req, res) {
	const model_name = req.params.model_name
	const user_id = req.params.user_id

	stash.commitJBehaveFile(user_id, model_name, req.body.story, null).then(() => {
		ExcelConnect.loadExcelFile(model_name).then(() => {
			stash.commit(user_id, model_name, req.body.fflData, null).then(() => {
				new DockerImageBuilder(model_name, null, null, null, req.body.model_version).buildDockerImage()
				return res.json({
					version   : 1,
					status    : 'ok',
					model_name: model_name
				})
			}).catch((err) => {
				debug(`Failed to write ${model_name}.ffl file.`, err)
				return res.json({
					status : 'fail',
					message: `Failed to write ${model_name}.ffl`,
					reason : err.toString()
				})
			})
		}).catch(function(err) {
			return res.status(400).json({ status: 'fail', reason: err.toString() })
		})
	}).catch((err) => {
		debug('Failed to write ' + model_name + '.ffl file.', err.toString())
		return res.json({ status: 'fail', message: 'Failed to write ' + model_name + '.ffl', reason: err.toString() })
	})
})
/** * TODO: add commit to stash */
app.post('*/excel/:model', async function(req, res) {
	const modelName = req.params.model
	if (!req.files) {
		debug(`Failed to write ${modelName}.xlsx file.`)
		return res.status(400).json({ status: 'fail', reason: 'No files were uploaded.' })
	}

	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	let excelfile = req.files.excelfile

	// Use the mv() method to place the file somewhere on your server
	excelfile.mv(__dirname + '/../git-connect/resources/' + modelName + '.xlsx', err => {
		if (err) {
			debug('Failed to write ' + modelName + '.xlsx file.', err)
			return res.status(400).json({ status: 'fail', reason: 'No files were uploaded.' })
		}
		res.json({ status: 'ok' })
	})
})
app.get('/ide.js', browserify(__dirname + '/src/ide.js', {
	insertGlobals: true,
	precompile   : true,
	debug        : false
}))
setup(app)
app.listen(port, () => {
	//talk with the proxy
	const routes = ['*/model-docs*', '*/ide.js']
	app._router.stack.forEach(r => {
		if (r.route && r.route.path) {
			routes.push(r.route.path)
		}
	})
	request.get(`http://${host}:${internal_proxy_port}/register/service/model-api/${host}/${port}/${routes.join(',')}`).then(data => {
		if (DEBUG) debug(`${JSON.stringify(routes)} ${data}`)
	}).catch(err => error('Failed to register ', err))
})