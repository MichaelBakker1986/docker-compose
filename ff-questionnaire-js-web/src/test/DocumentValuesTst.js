//THIS test relies on a a Filled Database with the SOLUTION:2
//therefore it will fail.

process.dbSchema = 'questjstest';

var DB = require('../archive/backend/db.js');
var DBController = require('../archive/backend/dbcontroller.js');
var GenericModelFile = require('../archive/fesjs/GenericModelFile.js');
var FunctionMap = require('../archive/fesjs/FunctionMap.js');
var bootstrap = require('../archive/fesjs/formula-bootstrap.js');
var uimodel = require('../archive/clientscorecard/uimodel.js');
var docValues = [];
DB.sequelize.sync().then(function ()
{
    return DBController.get('SOLUTION', {id: 2});
}).then(function (data)
{
    uimodel.bulkInsert(data);
    GenericModelFile.bulkInsertFormula(data.formulas);
    FunctionMap.init(bootstrap.parseAsFormula, data.formulas, false);
    GenericModelFile.updateValueMap(docValues);
    return DBController.get('DOCUMENT', {id: 2});

}).then(function (document)
{
    GenericModelFile.updateValues(document.values, docValues);
});