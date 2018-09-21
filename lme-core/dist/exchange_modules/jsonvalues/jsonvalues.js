'use strict';

var _index = require('../../index');

var jsonValues = {
	name: 'jsonvalues',
	parseData: function parseData(data, workbook) {
		updateValues(data, workbook.context);
		return _index.SolutionFacade.createSolution(workbook.getSolutionName());
	},
	deParse: function deParse(rowId, workbook) {
		var allValues = workbook.getAllChangedValues();
		//clean up the audit while deparsing.
		allValues.forEach(function (el) {
			if (el.varName.endsWith('_title')) {
				el.varName = correctPropertyName(el.varName);
			} else {
				el.varName = correctFileName(el.varName);
			}
		});
		return allValues;
	}
}; /*
    First, most basic export of values
    Just calling getAllValues() internally to export
    */


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
	var docValues = context.getValues();
	for (var key in docValues) {
		if (!isNaN(key)) docValues[key] = {};
	}
	for (var _key in data.values) {
		var value = data.values[_key];
		var nodeId = _key.split('#')[0];
		var nodeColId = _key.split('#')[1];
		if (!nodeId.endsWith('_value')) {
			nodeId = nodeId + '_value';
		}
		var fetch = _index.PropertiesAssembler.fetch(nodeId);
		//we don't have to import values for variables we don't use.
		if (fetch) {
			var enteredValue = value.value;
			if (fetch.datatype === _index.NUMBER) {
				enteredValue = enteredValue == null ? null : Number(enteredValue);
			}
			docValues[fetch.ref][parseInt(nodeColId)] = enteredValue;
		}
	}
}
_index.SolutionFacade.addParser(jsonValues);