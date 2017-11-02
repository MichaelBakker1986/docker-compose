module.exports.setup = function(app) {
    //swagger
    app.use('/docs', swaggerUi({
        docs: '/api-docs?abc=1' // from the express route above.
    }));
    // swagger definition
    app.get('/api-docs', function(req, res) {
        let swaggerData = require(__dirname + '/swaggerDef.json');
        require('dns').lookup(hostname, (err, add, fam) => {
            swaggerData.host = add + ':' + port;
            res.json(swaggerData)
        })
    });
};
