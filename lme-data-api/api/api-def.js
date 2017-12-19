const swaggerUi = require('swaggerize-ui');
/**
 * Dynamic Swagger definition route
 * @param app
 */
module.exports.setup = function(app) {
    const port = app.get('port');
    const host = app.get('host');
    const domain = app.get('domain');

    app.use('/docs', swaggerUi({
        docs: '/api-docs'
    }));
    app.get('/api-docs', function(req, res) {
        let swaggerData = require(__dirname + '/swaggerDef.json');
        swaggerData.host = domain || (host + ':' + port);
        res.json(swaggerData)
    });
};