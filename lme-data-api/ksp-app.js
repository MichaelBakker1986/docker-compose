import proxy   from 'http-proxy-middleware'
import express from 'express'
import cors    from 'cors'
import morgan  from 'morgan'

const port = 8006
const host = process.env.HOST || '127.0.0.1'
const internal_proxy_port = process.env.EXPOSED_AUTHENTICATION_PORT || 7080
const app = express()
app.set('port', port)
app.set('host', host)

app.use(cors())
app.use(morgan(':remote-addr - :status :method :url :res[content-length] b - :response-time[0] ms'))

app.listen(port, () => {
	app.post('/id/:id/figure/KinderSpaarPlan', proxy({
		target      : `http://127.0.0.1:${internal_proxy_port}`,
		changeOrigin: true,
		logLevel    : 'debug',
		limit       : '50mb',
		pathRewrite : {
			'^/id/321321/': '/'
		}
	}))
})
