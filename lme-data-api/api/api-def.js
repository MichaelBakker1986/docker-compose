const swaggerUi = require('swaggerize-ui');

module.exports.setup = function(app) {
    app.use('/docs', swaggerUi({
        docs: '/api-docs' // from the express route above.
    }));
    app.get('/api-docs', function(req, res) {
        const port = app.get('port');
        const host = app.get('host');
        let swaggerData = require(__dirname + '/swaggerDef.json');
        swaggerData.host = process.env.DOMAIN || (host + ':' + port);
        res.json(swaggerData)
    });
};