/**
 * Bridge between FormulaService,PropertiesAssembler and FunctionMap
 */
const log = require('log6');
const ValueFacade = {}
const PropertiesAssembler = require('./PropertiesAssembler');
const FunctionMap = require('./FunctionMap');
const FormulaService = require('./FormulaService')
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

ValueFacade.putSolutionPropertyValue = function(context, row, value, col, xas, yas) {
    var rowId = row + '_' + (col || 'value');
    var localFormula = findFormula(PropertiesAssembler.fetch(rowId));
    if (localFormula === undefined) {
        //because only Formula's are known here, we cannot give away variable name here.
        throw Error('Cannot find variable')
    }
    if (log.TRACE) log.trace('Set value row:[%s] x:[%s] y:[%s] value:[%s]', rowId, xas.hash, yas.hash, value);
    context.calc_count++;
    context.audit.push({
        saveToken: context.saveToken,
        hash: xas.hash + yas.hash + 0,
        formulaId: localFormula.id || localFormula.index
    })
    let userValue = value;
    var variable = fetchSolutionNode(row, (col || 'value'));
    if (variable.displayAs == 'radio' || variable.displayAs == 'select') {
        if (userValue != null) {
            const choices = ValueFacade.fetchSolutionPropertyValue(context, row, 'choices');
            userValue = userValue === true ? "1" : userValue === false ? "0" : userValue
            const lookupvalue = (choices.lookup('value', String(userValue)) || choices.lookup('name', String(userValue)));
            if (log.DEBUG && lookupvalue == null) log.warn('Invalid choice-value set for ' + row + ' [' + userValue + ']')
            userValue = lookupvalue ? lookupvalue.name : null;
            if (!isNaN(userValue)) {
                userValue = parseFloat(userValue)
            }
        }
    }
    if (variable.frequency == 'document') {
        xas = xas.doc
    }
    //NULL values are allowed, and should not be parsed into a real data type.
    if (userValue != null) {
        if (variable.datatype == 'number') {
            userValue = Number(userValue)
        } else if (variable.datatype == 'string') {
            userValue = String(userValue)
        } else if (variable.datatype == 'boolean') {
            userValue = Boolean(userValue)
        }
    }
    FunctionMap.apiSet(localFormula, xas, yas, 0, userValue, context.values);
};
/**
 * Generic default values, formatter transformers
 * TODO: introduce data-masks to keep these checks quick
 * - every variable has one mask, this one includes display and data types.
 */
ValueFacade.fetchSolutionPropertyValue = function(context, row, col, xas, yas) {
    const colType = col || 'value';
    if (colType === 'entered') {
        //kinda copy-paste, find way to refactor. there is no real enteredValue formula.
        //retrieve the 'value' formula, check if there is an entered value
        const variable = fetchSolutionNode(row, 'value');
        const localFormula = findFormula(variable);
        if (localFormula === undefined) {
            return false;
        }
        const id = localFormula.id || localFormula.index;
        const hash = xas.hash + yas.hash + 0;
        return context.values[id][hash] != null;
    } else if (colType === 'original') {
        const variable = fetchSolutionNode(row, 'value');
        const localFormula = findFormula(variable);
        return localFormula.original;
    }
    const variable = fetchSolutionNode(row, colType);
    const localFormula = findFormula(variable);
    var returnValue;
    if (localFormula === undefined) {
        returnValue = context.propertyDefaults[colType];
    }
    else {
        if (variable.frequency == 'document') {
            xas = xas.doc
        }
        returnValue = FunctionMap.apiGet(localFormula, xas, yas, 0, context.values);
    }
    if (variable) {
        if (colType === 'value') {
            if (variable.displayAs == 'radio' || variable.displayAs == 'select') {
                if (returnValue != null) {
                    const choices = ValueFacade.fetchSolutionPropertyValue(context, row, 'choices');
                    returnValue = returnValue === true ? "1" : returnValue === false ? "0" : returnValue
                    const choicesLookup = choices.lookup('name', String(returnValue));
                    returnValue = choicesLookup ? choicesLookup.value : returnValue;
                }
            } else {
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
                    returnValue = OnNA(returnValue, 0)
                }
                if (variable.displayAs == 'piechart') {
                    returnValue = PIECHART(returnValue)
                }
            }
            if (variable.displayAs == 'date') {
                returnValue = new Date(returnValue)
            }
        } else if (colType == 'locked') {
            return Boolean(returnValue)
        } else if (colType == 'visible') {
            return Boolean(returnValue)
        }

    }
    return returnValue;
}
ValueFacade.fetchRootSolutionProperty = PropertiesAssembler.getRootProperty;
ValueFacade.fetchSolutionNode = fetchSolutionNode;
ValueFacade.apiGetValue = FunctionMap.apiGet;
ValueFacade.getAllValues = function(docValues) {
    return this.getValuesFromFormulaIds(Object.keys(docValues), docValues);
}
ValueFacade.getValuesFromFormulaIds = function(keys, docValues) {
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
ValueFacade.updateValueMap = function(values) {
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
ValueFacade.visit = PropertiesAssembler.visitProperty;
ValueFacade.findAllInSolution = PropertiesAssembler.findAllInSolution;
module.exports = ValueFacade;