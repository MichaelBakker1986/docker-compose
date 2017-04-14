var fesjsApi = require('../ff-fes').fesjs;
var log = require('ff-log')
var WorkBook = require('../fesjs/JSWorkBook')
var FESContext = require('../fesjs/fescontext')
//create choice formula somehow..
var wb = new WorkBook(new FESContext());

//choices require value functions..
wb.createFormula("''", "CHOICE_TEST")
wb.createFormula("[{'name':' 0','value':'VWO'},{'name':'1','value':'VMBO-MBO'},{'name':'2','value':'VMBO-HAVO'},{'name':'3','value':'HAVO'}]", "CHOICE_TEST", "choices")
log.info(wb.get('CHOICE_TEST', 'choices'));
var fesGetValue = fesjsApi.fesGetValue({
    properties: {
        choices: true,
        value: true
    },
    columns: 1,
    values: []
}, 'NEW_CHOICE_TEST', 0);
log.info(JSON.stringify(fesGetValue))
