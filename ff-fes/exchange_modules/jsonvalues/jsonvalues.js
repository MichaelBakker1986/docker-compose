/*
 First, most basic export of values
 Just calling getAllValues() internally to export
 */
var SolutionFacade = require('../../fesjs/SolutionFacade');
var jsonValues = {
    name: 'jsonvalues',
    extension: 'json',
    headername: 'JSON Values',
    parse: function (values, workbook) {
        updateValues(JSON.parse(values), workbook.context.values);
        return SolutionFacade.createSolution(workbook.getSolutionName());
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
SolutionFacade.addParser(jsonValues)