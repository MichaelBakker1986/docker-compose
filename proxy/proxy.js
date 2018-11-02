/**
 * JSON parsing does not work here yet, it will modify the proxy requests
 * Just a dynamic reverse proxy
 */
import Logstash      from 'logstash-client'
import now           from 'performance-now'
import log, { info } from 'log6'
import proxy         from 'http-proxy-middleware'
import bodyParser    from 'body-parser'
import express       from 'express'
import cors          from 'cors'

import method_override from 'method-override'

const internal_proxy_port = process.env.INTERNAL_PROXY_PORT || 7081
const host = process.env.HOST || '127.0.0.1'
//5000: Logstash TCP input.
const ELK_ENDPOINT = process.env.ELK_ENDPOINT || 'blfif-cv-lme01.finance.lab:5000'
const logstash = new Logstash({
	type: 'tcp',
	host: ELK_ENDPOINT.split(':')[0],
	port: ELK_ENDPOINT.split(':')[1]
})

const debug = process.env.NODE_ENV !== 'production'
const domain = `http://${host}:${internal_proxy_port}/`
const app = express()
const proxyLogLevel = (log.DEBUG ? 'debug' : 'silent')
app.use(function(req, res, next) {
	if (res['X-Response-Time-start'] === undefined) res['X-Response-Time-start'] = now()
	next()
})
// restream parsed body before proxying
const restream = function(proxyReq, req, res, options) {
	if (req.body) {
		let bodyData = JSON.stringify(req.body)
		// incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
		proxyReq.setHeader('Content-Type', 'application/json')
		proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
		// stream the content
		proxyReq.write(bodyData)
	}
}
/*app.use(express_favicon())*/
app.use(cors())
app.set('port', internal_proxy_port)
app.set('host', host)
app.use(method_override())
app.use(errorHandler)
app.use(clientErrorHandler)

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))

function errorHandler(err, req, res, next) {
	if (res.headersSent) return next(err)
	res.status(500)
	res.render('error', { error: err })
}

function clientErrorHandler(err, req, res, next) {
	if (req.xhr) res.status(500).send({ error: 'Something failed!' })
	else next(err)
}

/**
 * Services register to to the proxy
 * Telling this proxy where to point certain adresses
 * Last argument is used for the route.
 * Only one route can be registered at a time.
 * If ever want to register multiple endpoints, use a separator in the last argument
 * This should also be able to generate a report of the services
 */
app.get('/register/service/:name/:host/:port/*', async function(req, res) {
	const routes = (req.params['1'] || req.params['0']).split(',')
	const name = req.params.name
	const targetProxyHost = req.params.host
	const targetProxyPort = req.params.port
	for (let route_index = 0; route_index < routes.length; route_index++) {
		const route = routes[route_index]
		app[req.params.type || 'all'](route, proxy({
			target      : `http://${targetProxyHost}:${targetProxyPort}`,
			changeOrigin: true,
			logLevel    : proxyLogLevel,
			limit       : '50mb',
			onProxyReq  : restream,
			onProxyRes  : onProxyRes
		}))
	}
	if (log.DEBUG) log.debug(`service registered [${name}] http://${host}:${internal_proxy_port}/${routes} ~ >  http://${targetProxyHost}:${targetProxyPort}`)
	res.send('ok')
})

/**
 * Hook on proxy response. (Log everything - except Security aspects.)
 * This will be used to allow hooks on the data/models (events and distributed logging)
 * Here we want to know who did what.
 * ELK stack
 * To set up an entire ELK-stack in minutes: https://github.com/deviantony/docker-elk
 * There is a log-skip function.. for static resources..
 *
 * Don't forget HipChat integration
 */
async function onProxyRes(proxyRes, req, res) {
	/**
	 * ELK - LogStash/Kibana
	 */
	const end = now()
	const message = {
		host        : host,
		lenght      : res['Content-Length'],
		ip          : req.headers['x-forwarded-for'] || req.connection.remoteAddress,
		status      : res.statusCode,
		'@timestamp': new Date(),
		responsetime: (end - res['X-Response-Time-start']).toFixed(3),
		url         : req.originalUrl,
		agent       : req.headers['user-agent'],
		level       : 'info'
	}
	logstash.send(message)
	/**
	 * Webhooks
	 * We know for the roest-api to call the ELK-LogStash with in and output
	 * anonymity the request and send it into the REDIS queue for further tasks
	 */
	if (req.originalUrl.includes('/figure/')) {
		let content = ''
		proxyRes.on('data', (dataBuffer) => content += dataBuffer)
		proxyRes.on('end', function() {
			logstash.send({
				host        : host,
				lenght      : proxyRes['Content-Length'],
				ip          : req.headers['x-forwarded-for'] || req.connection.remoteAddress,
				status      : proxyRes.statusCode,
				'@timestamp': new Date(),
				responsetime: (end - res['X-Response-Time-start']).toFixed(3),
				url         : req.originalUrl,
				agent       : req.headers['user-agent'],
				input       : req.body,
				output      : JSON.parse(content),
				level       : 'info'
			})
		})
	}
}

app.listen(internal_proxy_port, () => info(`<a href="http://${host}"> Kibana logstash</a><span> deployed.</span>`))
export default app