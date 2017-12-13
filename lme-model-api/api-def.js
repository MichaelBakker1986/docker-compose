const swaggerUi = require('swaggerize-ui');

module.exports.setup = function(app) {
    //swagger
    app.use('/docs', swaggerUi({
        docs: '/api-docs' // from the express route above.
    }));
    // swagger definition
    app.get('/api-docs', function(req, res) {
        let port = app.get('port');
        let host = app.get('host');
        let swaggerData = require(__dirname + '/apidef.json');
        swaggerData.host = host + ':' + port;
        res.json(swaggerData)
    });
};
