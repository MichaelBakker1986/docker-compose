/**
 * @type {*|exports|module.exports}
 */
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '5mb'}));
var port = process.env.PORT || 8081;        // set our port
var router = express.Router();              // get an instance of the express Router
var DBController = require('./dbcontroller.js');
app.set('json spaces', 4);
///making a generic rest API. this was a journey on itself.
//Others have tried, none worked with many-to-many relations
function successPromise(res)
{
    return function (object)
    {
        res.status(201);
        res.json(object);
    }
};//{force: true}
var templates = {
    SOLUTION: function (id)
    {
        var request = {
            id: true,
            nodes: {
                rowId: true,
                colId: true,
                displayAs: true,
                formulaId: true,
                formula: {},
                parentName: true
            },
            formulas: {
                original: true,
                type: true,
                parsed: true
            }
        };
        request[isNaN(id) ? 'name' : 'id'] = id;
        return request;
    },
    MODEL: function (id)
    {
        return {
            id: id,
            formulas: {}
        };
    }
    ,
    FORMULA: function (id)
    {
        return {
            id: id,
            ast: true,
            parsed: true
        };
    },
    DOCUMENT: function (id)
    {
        return {
            id: id
        };
    }
}
router.route('/:entity/').post(function (request, res)
{
    DBController.update(request.params.entity, request.body, false).then(successPromise(res)).catch(function (error)
    {
        console.error('You had an error: ', error.stack);
    });
});
router.route('/:entity/:id').post(function (request, res)
{
    DBController.update(request.params.entity, request.body, false).then(successPromise(res)).catch(function (error)
    {
        console.error('You had an error: ', error.stack);
    });
});
router.route('/:entity/:id').get(function (req, res)
{
    DBController.get(req.params.entity, templates[req.params.entity](req.params.id)).then(successPromise(res)).catch(function (error)
    {
        console.error('You had an error: ', error.stack);
    });
});
router.route('/:entity').get(function (req, res)
{
    DBController.find(req.params.entity).then(successPromise(res)).catch(function (error)
    {
        console.error('You had an error: ', error.stack);
    });
});
app.all("/api/*", function (req, res, next)
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
});
app.use('/api', router);
app.listen(port);
console.log('API started on port: ' + port);