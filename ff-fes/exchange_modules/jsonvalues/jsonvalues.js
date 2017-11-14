/*
 First, most basic export of values
 Just calling getAllValues() internally to export
 */
var SolutionFacade = require('../../fesjs/SolutionFacade');
var PropertiesAssembler = require('../../fesjs/PropertiesAssembler');
var jsonValues = {
    name: 'jsonvalues',
    extension: 'json',
    headername: 'JSON Values',
    parseData: function(data, workbook) {
        updateValues(data, workbook.context.values);
        return SolutionFacade.createSolution(workbook.getSolutionName());
    },
    deParse: function(rowId, workbook) {
        let allValues = workbook.getAllValues();
        allValues.forEach(function(el) {
            if (el.varName.endsWith('_title')) {
                el.varName = correctPropertyName(el.varName)
            } else {
                el.varName = correctFileName(el.varName)
            }
        })
        return allValues;
    }
};

function correctPropertyName(name) {
    return name.replace(/^([^_]+_[\w]*_\w+)$/gmi, '$1');
}

function correctFileName(name) {
    return name.replace(/^([^_]+_[\w]*)_\w+$/gmi, '$1');
}

function updateValues(data, docValues) {
    for (var key in docValues) {
        docValues[key] = {};
    }
    for (var key in data.values) {
        var value = data.values[key];
        var nodeId = key.split('#')[0]
        var nodeColId = key.split('#')[1]
        if (!nodeId.endsWith('_value')) {
            nodeId = nodeId + '_value'
        }
        let fetch = PropertiesAssembler.fetch(nodeId);
        //we don't have to import values for variables we don't use.
        if (fetch) {
            var enteredValue = value.value;
            if (fetch.datatype=='number'){
                enteredValue = Number(enteredValue)
            }
            docValues[fetch.ref][parseInt(nodeColId)] = enteredValue;
        }
    }
}

SolutionFacade.addParser(jsonValues)