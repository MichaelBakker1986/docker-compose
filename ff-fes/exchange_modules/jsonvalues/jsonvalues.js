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
        if (!fetch) {
            console.warn(nodeId + " does not exsist");
        } else {
            docValues[fetch.ref][parseInt(nodeColId)] = value.value;
        }
    }
}

SolutionFacade.addParser(jsonValues)