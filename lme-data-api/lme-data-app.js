import express                         from 'express'
import bodyParser                      from 'body-parser'
import cors                            from 'cors'
import { setup as storeSetup }         from './api/store'
import { setup as valueSetup }         from './api/value'
import { setup as apiDefinitionSetup } from './api/api-def'
import logger                          from 'morgan'
import { info }                        from 'log6'

const port = process.env.DATA_API_PORT || 8085
const model = String(process.env.ENABLED_MODELS || 'KSP')
const model_version = String(process.env.MODEL_VERSION || '0.19')
const host = process.env.HOST || '127.0.0.1:8085'
const domain = process.env.DOMAIN || (`${host}/${model}/${model_version}`)
const basePath = `/${model}/${model_version}/`

info(`Starting up application given ENABLED MODELS=${model}`)
const app = express()

app.use(logger('dev'))
app.set('basePath', basePath)
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
	console.info(`<span>Swagger: </span><a href="https://${host}/${basePath}/data-api-docs">data-api-docs</a>\n`)
})