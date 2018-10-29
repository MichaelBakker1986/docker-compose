import { APIDefinition } from '../resources/AuthenticatedSwaggerDefinition'

export function setup(app) {
	app.get('*/data-api-docs', (req, res) => {
		APIDefinition.basePath = '/ksp2/0.20/'
		APIDefinition.host = 'appmodel.org'
		res.json(APIDefinition)
	})
}