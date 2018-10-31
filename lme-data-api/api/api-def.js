import { APIDefinition } from '../resources/AuthenticatedSwaggerDefinition'

export function setup(app) {
	app.get(['*/:model_name/:model_version/data-api-docs', '^/:model_name/:model_version/$'], ({ headers, params }, res) => {
		APIDefinition.basePath = app.get('basePath') || `/${params.model_name}/${params.model_version}/`
		APIDefinition.host = headers.host
		res.json(APIDefinition)
	})
}