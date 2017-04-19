/*
 First, most basic export of values
 Just calling getAllValues() internally to export
 */
var FESFacade = require('../../fesjs/FESFacade');
var UIModel = require('../../fesjs/PropertiesAssembler');
var jsonValues = {
    name: 'jsonvalues',
    extension: 'json',
    headername: 'JSON Values',
    parse: function (values, workbook) {
        updateValues(JSON.parse(values), workbook.context.values);
        return UIModel.create();
    },
    deParse: function (rowId, workbook) {
        return workbook.getAllValues();
    }
};

function updateValues(values, docValues) {
    for (var i = 0; i < values.length; i++) {
        var obj = values[i];
        if (!docValues[obj.formulaId]) {
            docValues[obj.formulaId] = [];
        }
        docValues[obj.formulaId][obj.colId] = obj.value;
    }
}
FESFacade.addParser(jsonValues)