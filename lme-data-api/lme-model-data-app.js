import express                         from 'express'
import bodyParser                      from 'body-parser'
import cors                            from 'cors'
import { setup as storeSetup }         from './api/store'
import { setup as valueSetup }         from './api/value'
import { setup as apiDefinitionSetup } from './api/api-def'
import logger                          from 'morgan'
import { DEBUG, debug }                from 'log6'
import request                         from 'request-promise-json'

const port = process.env.DATA_API_PORT || 8085
const model = String(process.env.ENABLED_MODELS || 'KSP2')
const model_version = String(process.env.MODEL_VERSION || '0.19')
const host = process.env.HOST || '127.0.0.1:8085'
const domain = process.env.DOMAIN || (`${host}/${model.toLowerCase()}/${model_version}`)
const app = express()
const internal_proxy_port = process.env.INTERNAL_PROXY_PORT || 7081


app.use(logger('dev'))
app.set('port', port)
app.set('host', host)
app.set('domain', domain)
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))

//routes
storeSetup(app)
valueSetup(app)
apiDefinitionSetup(app)

app.listen(port, () => {
	const routes = ['*/data-docs*']
	app._router.stack.forEach((r) => {
		if (r.route && r.route.path) routes.push(r.route.path)
	})
	let host_ip = host.split(':')[0]
	let s = `http://${host_ip}:${internal_proxy_port}/register/service/model-api/${host_ip}/${port}/${routes.join(',')}`
	request.get(s).then((data) => {
		if (DEBUG) debug(data)
	}).catch((err) => error('Failed to register ', err))
})