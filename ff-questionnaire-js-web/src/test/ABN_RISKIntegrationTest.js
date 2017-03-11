//just let it inject into the GenericModelFile
require('../archive/exchange_modules/abn/ABNParser.js');
require('../archive/exchange_modules/jsonvalues/jsonvalues.js');

var GenericModelFile = require('../archive/fesjs/GenericModelFile.js');
var WorkBook = require('../archive/fesjs/JSWorkBook.js');
var JUNIT = require('./JUNIT.js');
var assert = require('assert');
var fileName = 'RISK';
var data = JUNIT.getFile(fileName + '.json');

var wb = new WorkBook();
var get = wb.get;

var Test = {
    DUMMY: function ()
    {
        wb.doImport(data, 'ABN');
    },
    RISK: function ()
    {
        wb.doImport(data, 'ABN');


        assert.ok(wb.validate().valid);
        set('C5', 'value', '123', false);
        assert.equal(get('C5', 'validateInput'), '', 'value 123 should be a number');
        set('C5', 'value', '-123');
        var c5 = get('C5', 'validateInput');
        assert.equal(c5.length == 0, false, 'value -123 must be larger than 0');
        set('C35', 'value', '1923');
        assert.equal(get('C35', 'validateInput'), '', 'value 123 should be a number');
        set('C35', 'value', 'abc');
        assert.equal(get('C35', 'validateInput').length == 0, false, 'value abc should not be a number');

        set('C35', 'value', '123abc');
        assert.equal(get('C35', 'validateInput').length == 0, false, 'value 123abc should not be a number');

        set('C35', 'value', '123');
        assert.equal(get('C35', 'validateInput').length == 0, false, 'value 123abc must be larger than 1800');

        set('C1', 'value', 'A');
        assert.equal(get('C1', 'validateInput').length == 0, true, 'value A must be valid input');

        set('C1', 'value', 'F');
        assert.equal(get('C1', 'validateInput').length == 0, false, 'value F must not be valid input');

        assert.equal(true, get('BR', 'visible'));
        assert.equal(true, get('FR', 'visible'));

        set('C5', 'value', '2');
        set('C6', 'value', '2');
        set('C7', 'value', '2');
        set('C8', 'value', '2');
        set('C9', 'value', '2');
        set('C10', 'value', '2');
        set('C11', 'value', '2');
        set('C12', 'value', '2');
        assert.equal(16, get('C13', 'value'));

        set('C1', 'value', 'B');
        assert.equal(true, get('C29', 'visible'));
        set('C1', 'value', 'A');
        JUNIT.print(wb.export('jsonvalues'));

        //change existing formulas
        createFormula(100, 'C34');
        assert.equal(100, get('C34', 'value'));

        createFormula(false, 'C34', 'visible');
        assert.equal(false, get('C34', 'visible'));
        createFormula(true, 'C34', 'visible');
        assert.equal(true, get('C34', 'visible'));
        var values = wb.export('jsonvalues');

        var testValues = JSON.parse(values);
        assert.equal(testValues.length, 10, 'wrong number of found entered values');
        JUNIT.print(values);
    },
    request1: function ()
    {
        wb.doImport(data, 'ABN')
    }
}

//HELPER delegation
function set(row, col, value)
{
    wb.set(row, value, col);
}
function createFormula(value, rowId, colId)
{
    wb.createFormula(value, rowId, colId);
    assert.equal(value, get(rowId, colId));
};
//END OF HELPER delegation
Test[fileName]();
console.info('Test Integration success')