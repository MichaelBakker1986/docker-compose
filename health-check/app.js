import express             from 'express'
import path                from 'path'
import cookieParser        from 'cookie-parser'
import logger              from 'morgan'
import indexRouter         from './routes/index'
import cors                from 'cors'
import express_no_favIcons from 'express-no-favicons'
import { HotDeploy }       from 'lme-webpack'

const app = express()

new HotDeploy(app, path.join(__dirname, 'routes/chart.js'))
app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express_no_favIcons())

app.use('/', indexRouter)

export default app

