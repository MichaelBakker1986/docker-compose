var restify = require('restify');
var server = restify.createServer();
var swagger = require('swagger-restify');

swagger.init(server, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    swaggerURL: '/swagger',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './public',
    basePath: 'http://localhost:' + 8086,
    info: {
        title: 'swagger-restify sample app',
        description: 'Swagger + Restify = {swagger-restify}'
    },
    apis: ['./ff-fes-app.js', './api.yml'],
    middleware: function(req, res) {
    }
});
server.listen(8086);