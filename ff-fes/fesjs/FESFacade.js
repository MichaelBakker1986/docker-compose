/**
 * Bridge between FormulaService,PropertiesAssembler and FunctionMap
 */
var logger = require('ff-log');
var FESFacade = {}
var PropertiesAssembler = require('./PropertiesAssembler');
var FunctionMap = require('./FunctionMap');
var FormulaService = require('./FormulaService')
/**
 * For small arrays, lets say until 1000, elements. There is no need to map by name.
 * Just iterate the shabang and test the property
 */
Array.prototype.lookup = function(property, name) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][property] === name) {
            return this[i];
        }
    }
    return undefined;
}
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}
if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

function findFormula(uiModel) {
    if (uiModel === undefined) {
        return undefined;
    }
    return FormulaService.findFormulaByIndex(uiModel.ref);
}

function fetchSolutionNode(row, col) {
    return PropertiesAssembler.fetch(row + '_' + col);
}

FESFacade.putSolutionPropertyValue = function(context, row, value, col, xas, yas) {
    var rowId = row + '_' + ( col || 'value');
    var localFormula = findFormula(PropertiesAssembler.fetch(rowId));
    if (localFormula === undefined) {
        //don't give away variable name here.
        throw Error('Cannot find variable')
    }
    if (logger.DEBUG) logger.debug('Set value row:[%s] x:[%s] y:[%s] value:[%s]', rowId, xas.hash, yas.hash, value);
    context.calc_count++;
    context.audit.push({
        saveToken: context.saveToken,
        hash: xas.hash + yas.hash + 0,
        formulaId: localFormula.id || localFormula.index
    })
    FunctionMap.apiSet(localFormula, xas, yas, 0, value, context.values);
};
/**
 * Generic default values, formatter transformers
 * TODO: introduce data-masks to keep these checks quick
 * - every variable has one mask, this one includes display and data types.
 */
FESFacade.fetchSolutionPropertyValue = function(context, row, col, xas, yas) {
    var colType = col || 'value';
    if (colType === 'entered') {
        //kinda copy-paste, find way to refactor. there is no real enteredValue formula.
        //retrieve the 'value' formula, check if there is an entered value
        var variable = fetchSolutionNode(row, 'value');
        var localFormula = findFormula(variable);
        if (localFormula === undefined) {
            return false;
        }
        var id = localFormula.id || localFormula.index;
        var hash = xas.hash + yas.hash + 0;
        return context.values[id][hash] != null;
    } else if (colType === 'original') {
        var variable = fetchSolutionNode(row, 'value');
        var localFormula = findFormula(variable);
        return localFormula.original;
    }
    var variable = fetchSolutionNode(row, colType);
    var localFormula = findFormula(variable);
    var returnValue;
    if (localFormula === undefined) {
        returnValue = context.propertyDefaults[colType];
    }
    else {
        returnValue = FunctionMap.apiGet(localFormula, xas, yas, 0, context.values);
    }
    if (variable) {
        if (colType === 'value') {
            if (variable.decimals !== undefined) {
                if (variable.datatype == 'matrix') {
                    for (var i = 0; i < returnValue.length; i++) {
                        var innerx = returnValue[i];
                        if (!isNaN(innerx)) {
                            var level = Math.pow(10, variable.decimals);
                            returnValue[i] = (Math.round(innerx * level) / level)
                        }
                        for (var y = 0; y < returnValue[i].length; y++) {
                            var innery = returnValue[i][y];
                            if (!isNaN(innery)) {
                                var level = Math.pow(10, variable.decimals);
                                returnValue[i][y] = (Math.round(innery * level) / level)
                            }
                        }
                    }
                }
                else if (!isNaN(returnValue)) {
                    var level = Math.pow(10, variable.decimals);
                    returnValue = (Math.round(returnValue * level) / level)
                }
            }
            if (variable.datatype == 'number') {
                returnValue = OnNA(returnValue, '')
            }
            if (variable.displayAs == 'piechart') {
                returnValue = PIECHART(returnValue)
            }
        } else if (colType == 'locked') {
            return Boolean(returnValue)
        } else if (colType == 'visible') {
            return Boolean(returnValue)
        }
    }
    return returnValue;
}
FESFacade.fetchRootSolutionProperty = PropertiesAssembler.getRootProperty;
FESFacade.fetchSolutionNode = fetchSolutionNode;
FESFacade.apiGetValue = FunctionMap.apiGet;
FESFacade.getAllValues = function(docValues) {
    return this.getValuesFromFormulaIds(Object.keys(docValues), docValues);
}
FESFacade.getValuesFromFormulaIds = function(keys, docValues) {
    //we cannot just return everything here, Because for now all formula's have a user-entered value cache.
    //Also Functions themSelves are bound to this object.
    //So we have to strip them out here.
    //should be part of the apiGet, to query all *_value functions. or *_validation etc.
    var values = [];
    for (var i = 0; i < keys.length; i++) {
        var formulaId = keys[i];
        var cachevalues = docValues[formulaId];
        if (cachevalues) {
            var formula = FormulaService.findFormulaByIndex(formulaId);
            var formulaName = formula === undefined ? formulaId : formula.name;
            for (var cachedValue in cachevalues)
                values.push({
                    varName: formulaName,
                    colId: cachedValue,
                    value: cachevalues[cachedValue]
                });
        }
    }
    return values;
}
//when new formula's arrive, we have to update the user-entered map so we don't get NPE
//just a quick-fix..
FESFacade.updateValueMap = function(values) {
    FormulaService.visitFormulas(function(formula) {
        //later will add values['_'+key] for the cache
        //for unlocked add values[key] here will user entered values stay
        if (formula.type === 'noCacheUnlocked') {
            var id = formula.id || formula.index;
            if (!values[id]) {
                values[id] = {};
            }
        }
    });
};
FESFacade.visit = PropertiesAssembler.visitProperty;
FESFacade.findAllInSolution = PropertiesAssembler.findAllInSolution;
module.exports = FESFacade;