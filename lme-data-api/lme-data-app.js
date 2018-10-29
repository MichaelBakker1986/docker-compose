import express                         from 'express'
import bodyParser                      from 'body-parser'
import cors                            from 'cors'
import { setup as storeSetup }         from './api/store'
import { setup as valueSetup }         from './api/value'
import { setup as apiDefinitionSetup } from './api/api-def'
import logger                          from 'morgan'

const port = process.env.DATA_API_PORT || 8085
const model = String(process.env.ENABLED_MODELS || 'KSP2')
const model_version = String(process.env.MODEL_VERSION || '0.19')
const host = process.env.HOST || '127.0.0.1:8085'
const domain = process.env.DOMAIN || (`${host}/${model.toLowerCase()}/${model_version}`)
const app = express()

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
	console.info(`Listening port is ${port}`)
	console.info(`<span>Swagger: </span><a href="https://${host}/swagger/">swagger</a>\n`)
	console.info(`<span>LME DATA: </span><a href="https://${domain}">data-api</a>\n`)
})