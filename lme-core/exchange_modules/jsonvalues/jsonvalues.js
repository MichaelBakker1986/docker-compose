/*
 First, most basic export of values
 Just calling getAllValues() internally to export
 */
const SolutionFacade = require('../../src/SolutionFacade');
const PropertiesAssembler = require('../../src/PropertiesAssembler');
const Solution = require('../../src/Solution')

const jsonValues = {
    name     : 'jsonvalues',
    parseData: function(data, workbook) {
        updateValues(data, workbook.context);
        return SolutionFacade.createSolution(workbook.getSolutionName());
    },
    deParse  : function(rowId, workbook) {
        const allValues = workbook.getAllChangedValues();
        //clean up the audit while deparsing.
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

/**
 * values are directly injected into the context, not through the API
 * They will not be saved in the audit.
 */
function updateValues(data, context) {
    const docValues = context.getValues()
    for (var key in docValues) {
        if (!isNaN(key)) docValues[key] = {};
    }
    for (var key in data.values) {
        const value = data.values[key];
        var nodeId = key.split('#')[0]
        const nodeColId = key.split('#')[1]
        if (!nodeId.endsWith('_value')) {
            nodeId = nodeId + '_value'
        }
        const fetch = PropertiesAssembler.fetch(nodeId);
        //we don't have to import values for variables we don't use.
        if (fetch) {
            var enteredValue = value.value;
            if (fetch.datatype == 'number') {
                enteredValue = enteredValue == null ? null : Number(enteredValue)
            }
            docValues[fetch.ref][parseInt(nodeColId)] = enteredValue;
        }
    }
}

SolutionFacade.addParser(jsonValues)