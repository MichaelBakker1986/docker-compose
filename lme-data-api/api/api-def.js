import swaggerUi         from 'swaggerize-ui'
import { APIDefinition } from '../resources/AuthenticatedSwaggerDefinition'

/**
 * Dynamic Swagger definition route
 */
export function setup(app) {
	const port = app.get('port')
	const host = app.get('host')
	const domain = app.get('domain')

	app.use('*/data-docs', swaggerUi({
		docs: '/data-api-docs'
	}))
	app.get('*/data-api-docs', function(req, res) {
		//TODO: check authorization role for fire-grained definiton. For now privacy > rest
		//maybe via filename, maybe life-generated.
		APIDefinition.host = req.headers['x-forwarded-host']
		res.json(APIDefinition)
	})
}