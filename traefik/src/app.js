import express             from 'express'
import cookieParser        from 'cookie-parser'
import logger              from 'morgan'
import indexRouter         from './index'
import cors                from 'cors'
import express_no_favIcons from 'express-no-favicons'

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express_no_favIcons())

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => { next(createError(404))})

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.end('error')
})

export default app