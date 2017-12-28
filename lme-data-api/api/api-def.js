const swaggerUi = require('swaggerize-ui');
/**
 * Dynamic Swagger definition route
 */
module.exports.setup = function(app) {
    const port = app.get('port');
    const host = app.get('host');
    const domain = app.get('domain');

    app.use('*/data-docs', swaggerUi({
        docs: '/data-api-docs'
    }));
    app.get('*/data-api-docs', function(req, res) {
        //TODO: check authorization role for fire-grained definiton. For now privacy > rest
        //maybe via filename, maybe life-generated.
        let swaggerData = require(__dirname + '/AuthenticatedSwaggerDefinition.json');
        swaggerData.host = (host + ':' + port);
        res.json(swaggerData)
    });
};