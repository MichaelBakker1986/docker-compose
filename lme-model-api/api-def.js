const swaggerUi = require('swaggerize-ui');
const hostname = require('os').hostname();

module.exports.setup = function(app) {
    //swagger
    app.use('/docs', swaggerUi({
        docs: '/api-docs' // from the express route above.
    }));
    // swagger definition
    app.get('/api-docs', function(req, res) {
        let port = app.get('port');
        let swaggerData = require(__dirname + '/apidef.json');
        require('dns').lookup(hostname, (err, add, fam) => {
            swaggerData.host = add + ':' + port;
            res.json(swaggerData)
        })
    });
};
