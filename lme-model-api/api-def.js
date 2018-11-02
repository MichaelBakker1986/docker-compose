export const setup = function(app) {
	// swagger definition
	app.get('*/model-api-docs', (req, res) => {
		let port = app.get('port')
		let host = app.get('host')
		let swaggerData = require(`${__dirname}/apidef.json`)
		swaggerData.host = host + ':' + port
		res.json(swaggerData)
	})
}