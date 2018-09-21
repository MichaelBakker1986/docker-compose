'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _log = require('log6');

var _PropertiesAssembler = require('./PropertiesAssembler');

var _PropertiesAssembler2 = _interopRequireDefault(_PropertiesAssembler);

var _FunctionMap = require('./FunctionMap');

var _FunctionMap2 = _interopRequireDefault(_FunctionMap);

var _FormulaService = require('./FormulaService');

var _FormulaService2 = _interopRequireDefault(_FormulaService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Bridge between FormulaService,PropertiesAssembler and FunctionMap
 */
var ValueFacade = {};

if (Error.prototype.stack === undefined) Error.prototype.stack = '';

/**
 * For small arrays, lets say until 1000, elements. There is no need to map by name.
 * Just iterate the shabang and test the property
 */
Array.prototype.lookup = function (property, name) {
	for (var i = 0; i < this.length; i++) {
		if (this[i][property] === name) return this[i];
	}
	return undefined;
};
if (!String.prototype.startsWith) {
	String.prototype.startsWith = function (searchString, position) {
		position = position || 0;
		return this.substr(position, searchString.length) === searchString;
	};
}
if (!String.prototype.endsWith) {
	String.prototype.endsWith = function (suffix) {
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};
}
if (!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, '');
	};
}

function findFormula(uiModel) {
	if (uiModel === undefined) return undefined;
	return _FormulaService2.default.findFormulaByIndex(uiModel.ref);
}

var fetchSolutionNode = function fetchSolutionNode(row, col) {
	return _PropertiesAssembler2.default.fetch(row + '_' + col);
};

ValueFacade.validChoice = function (choices, row, userValue) {
	userValue = userValue === true ? '1' : userValue === false ? '0' : userValue;
	return choices.lookup('value', String(userValue)) || choices.lookup('name', String(userValue));
};
ValueFacade.putSolutionPropertyValue = function (context, row, value, col, xas, yas) {
	var rowId = row + '_' + (col || 'value');
	var localFormula = findFormula(_PropertiesAssembler2.default.fetch(rowId));
	//because only Formula's are known here, we cannot give away variable name here.
	if (localFormula === undefined) throw Error('Cannot find variable');
	if (_log.TRACE) (0, _log.trace)('Set value row:[%s] x:[%s] y:[%s] value:[%s]', rowId, xas.hash, yas.hash, value);
	context.calc_count++;
	context.audit.push({
		saveToken: context.saveToken,
		hash: xas.hash + yas.hash + 0,
		formulaId: localFormula.id || localFormula.index
	});
	var userValue = value;
	var variable = fetchSolutionNode(row, col || 'value');
	if (variable.displaytype == 'radio' || variable.displaytype == 'select') {
		if (userValue != null) {
			var choices = ValueFacade.fetchSolutionPropertyValue(context, row, 'choices', xas, yas);
			var lookupvalue = ValueFacade.validChoice(choices, row, userValue);
			if (_log.DEBUG && lookupvalue == null) (0, _log.warn)('Invalid choice-value set for ' + row + ' [' + userValue + ']');
			userValue = lookupvalue ? lookupvalue.name : null;
			if (!isNaN(userValue)) {
				userValue = parseFloat(userValue);
			}
		}
	}
	if (variable.frequency == 'document') xas = xas.doc;
	//NULL values are allowed, and should not be parsed into a real data type.
	if (userValue != null) {
		if (variable.datatype == 'number') {
			userValue = Number(userValue);
		} else if (variable.datatype == 'string') {
			userValue = String(userValue);
		} else if (variable.datatype == 'boolean') {
			userValue = Boolean(userValue);
		}
	}
	_FunctionMap2.default.apiSet(localFormula, xas, yas, 0, userValue, context.getValues());
};
/**
 * Generic default values, formatter transformers
 * TODO: introduce data-masks to keep these checks quick
 * - every variable has one mask, this one includes display and data types.
 */
ValueFacade.fetchSolutionPropertyValue = function (context, row, col, xas, yas) {
	var colType = col || 'value';
	if (colType === 'entered') {
		//kinda copy-paste, find way to refactor. there is no real enteredValue formula.
		//retrieve the 'value' formula, check if there is an entered value
		var _variable = fetchSolutionNode(row, 'value');
		var _localFormula = findFormula(_variable);
		if (_localFormula === undefined) {
			return false;
		}
		var id = _localFormula.id || _localFormula.index;
		var hash = xas.hash + yas.hash + 0;
		return context.getValues()[id][hash] != null;
	} else if (colType === 'original') {
		var _variable2 = fetchSolutionNode(row, 'value');
		var _localFormula2 = findFormula(_variable2);
		return _localFormula2.original;
	}
	var variable = fetchSolutionNode(row, colType);
	var localFormula = findFormula(variable);
	var returnValue;
	if (localFormula === undefined) {
		returnValue = context.propertyDefaults[colType];
	} else {
		if (variable.frequency == 'document') {
			xas = xas.doc;
		}
		returnValue = _FunctionMap2.default.apiGet(localFormula, xas, yas, 0, context.getValues(), context.ma, context.audittrail);
	}
	if (variable) {
		if (colType === 'value') {
			if (variable.displaytype === 'radio' || variable.displaytype === 'select') {
				if (returnValue != null) {
					var choices = ValueFacade.fetchSolutionPropertyValue(context, row, 'choices', xas, yas);
					returnValue = returnValue === true ? '1' : returnValue === false ? '0' : returnValue;
					var choicesLookup = choices.lookup('name', String(returnValue));
					returnValue = choicesLookup ? choicesLookup.value : returnValue;
				}
			} else {
				if (variable.decimals !== undefined) {
					if (variable.datatype === 'matrix') {
						for (var i = 0; i < returnValue.length; i++) {
							var innerx = returnValue[i];
							if (!isNaN(innerx)) {
								var level = Math.pow(10, variable.decimals);
								returnValue[i] = Math.round(innerx * level) / level;
							}
							for (var y = 0; y < returnValue[i].length; y++) {
								var innery = returnValue[i][y];
								if (!isNaN(innery)) {
									var level = Math.pow(10, variable.decimals);
									returnValue[i][y] = Math.round(innery * level) / level;
								}
							}
						}
					} else if (!isNaN(returnValue)) {
						var _level = Math.pow(10, variable.decimals);
						returnValue = Math.round(returnValue * _level) / _level;
					}
				}
				if (variable.datatype === 'number') {
					returnValue = OnNA(returnValue, 0);
				}
				if (variable.displaytype === 'piechart') {
					returnValue = PIECHART(returnValue);
				}
			}
			if (variable.displaytype === 'date') {
				returnValue = new Date(returnValue);
			}
		} else if (colType === 'locked') {
			return Boolean(returnValue);
		} else if (colType === 'visible') {
			return Boolean(returnValue);
		}
	}
	return returnValue;
};
ValueFacade.fetchRootSolutionProperty = _PropertiesAssembler2.default.getRootProperty;
ValueFacade.fetchSolutionNode = fetchSolutionNode;
ValueFacade.apiGetValue = _FunctionMap2.default.apiGet;
ValueFacade.getAllValues = function (docValues) {
	return this.getValuesFromFormulaIds(Object.keys(docValues), docValues);
};
ValueFacade.getValuesFromFormulaIds = function (keys, docValues) {
	//we cannot just return everything here, Because for now all formula's have a user-entered value cache.
	//Also Functions themSelves are bound to this object.
	//So we have to strip them out here.
	//should be part of the apiGet, to query all *_value functions. or *_validation etc.
	var values = [];
	for (var i = 0; i < keys.length; i++) {
		var formulaId = keys[i];
		var cachevalues = docValues[formulaId];
		if (cachevalues) {
			var formula = _FormulaService2.default.findFormulaByIndex(formulaId);
			var formulaName = formula === undefined ? formulaId : formula.name;
			for (var cachedValue in cachevalues) {
				values.push({
					varName: formulaName,
					colId: cachedValue,
					value: cachevalues[cachedValue]
				});
			}
		}
	}
	return values;
};
//when new formula's arrive, we have to update the user-entered map so we don't get NPE
ValueFacade.updateValueMap = function (values) {
	_FormulaService2.default.visitFormulas(function (formula) {
		//later will add values['_'+key] for the cache
		//for unlocked add values[key] here will user entered values stay
		if (formula.type === 'noCacheUnlocked') {
			var id = formula.id || formula.index;
			if (!values[id]) values[id] = {};
		}
	});
};
ValueFacade.visit = _PropertiesAssembler2.default.visitProperty;
ValueFacade.visitChildren = _PropertiesAssembler2.default.visitChildren;
ValueFacade.findAllInSolution = _PropertiesAssembler2.default.findAllInSolution;

exports.default = ValueFacade;