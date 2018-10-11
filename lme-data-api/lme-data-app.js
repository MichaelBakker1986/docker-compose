import { DEBUG, debug, error }         from 'log6'
import express                         from 'express'
import request                         from 'request-promise-json'
import bodyParser                      from 'body-parser'
import cors                            from 'cors'
import { setup as storeSetup }         from './api/store'
import { setup as valueSetup }         from './api/value'
import { setup as apiDefinitionSetup } from './api/api-def'

const port = process.env.DATA_API_PORT || 8085
const host = process.env.HOST || '127.0.0.1'
const internal_proxy_port = process.env.INTERNAL_PROXY_PORT || 7081
const domain = process.env.DOMAIN || (`${host}:${internal_proxy_port}/id/guest`)
const app = express()

app.set('port', port)
app.set('host', host)
app.set('domain', domain)
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' })) // To support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // To support URL-encoded bodies
	extended: true
}))

//var privateKey = fs.readFileSync('privatekey.pem');
//var certificate = fs.readFileSync('certificate.pem');
//routes
storeSetup(app)
valueSetup(app)
apiDefinitionSetup(app)

app.listen(port, () => {
	console.info(`<span>LME DATA: </span><a href="http://${domain}/data-docs/">data-api</a>\n`)
	//talk with the proxy
	const routes = ['*/data-docs*']
	app._router.stack.forEach(function(r) {
		if (r.route && r.route.path) {
			routes.push(r.route.path)
		}
	})
	request.get(`http://${host}:${internal_proxy_port}/register/service/model-api/${host}/${port}/${routes.join(',')}`).then(function(data) {
		if (DEBUG) debug(data)
	}).catch(function(err) {
		error('Failed to register ', err)
	})
})