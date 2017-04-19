//THIS test relies on a a Filled Database with the SOLUTION:2
//therefore it will fail.
process.dbSchema = 'questjstest';
var DB = require('../archive/backend/db.js');
var DBController = require('../archive/backend/dbcontroller.js');
var FESFacade = require('../archive/fesjs/FESFacade');
DB.sequelize.sync().then(function ()
{
    return DBController.get('SOLUTION', {id: 2});
}).then(function (data)
{
    //uimodel.bulkInsert(data);
    //FESFacade.bulkInsertFormula(data.formulas);
    FunctionMap.init(bootstrap.parseAsFormula, data.formulas, false);
    FESFacade.updateValueMap(docValues);
    return DBController.get('DOCUMENT', {id: 2});

}).then(function (document)
{
    FESFacade.updateValues(document.values, docValues);
});