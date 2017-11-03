/*
 First, most basic export of values
 Just calling getAllValues() internally to export
 */
var SolutionFacade = require('../../fesjs/SolutionFacade');
var jsonValues = {
    name: 'jsonvalues',
    extension: 'json',
    headername: 'JSON Values',
    parseData: function(values, workbook) {
        updateValues(JSON.parse(values), workbook.context.values);
        return SolutionFacade.createSolution(workbook.getSolutionName());
    },
    deParse: function(rowId, workbook) {
        let allValues = workbook.getAllValues();
        allValues.forEach(function(el) {
            el.varName = correctFileName(el.varName)
        })
        return allValues;
    }
};

function correctFileName(name) {
    return name.replace(/^[^_]+_([\w]*)_\w+$/gmi, '$1');
}

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