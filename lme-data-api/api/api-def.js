import { APIDefinition } from '../resources/AuthenticatedSwaggerDefinition'

export function setup(app) {
	app.get('*/data-api-docs', (req, res) => {
		APIDefinition.basePath = app.get('basePath')
		APIDefinition.host = req.headers.host
		res.json(APIDefinition)
	})
}