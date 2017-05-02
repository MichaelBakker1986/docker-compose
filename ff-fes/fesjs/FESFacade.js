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
Array.prototype.lookup = function (property, name) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][property] === name) {
            return this[i];
        }
    }
    return undefined;
}
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
    if (uiModel === undefined) {
        return undefined;
    }
    return FormulaService.findFormulaByIndex(uiModel.ref);
}

function getStatelessVariable(row, col) {
    return PropertiesAssembler.fetch(row + '_' + col);
}
FESFacade.putSolutionPropertyValue = function (context, row, value, col, xas, yas) {
    var rowId = row + '_' + ( col || 'value');
    var localFormula = findFormula(PropertiesAssembler.fetch(rowId));
    if (localFormula === undefined) {
        //don't give away variable name here.
        throw Error('Cannot find variable')
    }
    logger.debug('Set value row:[%s] x:[%s] y:[%s] value:[%s]', row, xas.hash, yas.hash, value);
    FunctionMap.apiSet(localFormula, xas, yas, 0, value, context.values);
};

FESFacade.fetchSolutionProperyValue = function (context, row, col, xas, yas) {
    var colType = col || 'value';
    var variable = getStatelessVariable(row, colType);
    var localFormula = findFormula(variable);
    var returnValue;
    if (localFormula === undefined) {
        returnValue = context.propertyDefaults[colType];
    }
    else {
        returnValue = FunctionMap.apiGet(localFormula, xas, yas, 0, context.values);
    }
    return returnValue;
}
FESFacade.fetchRootSolutionProperty = PropertiesAssembler.getRootProperty;
FESFacade.fetchSolutionNode = getStatelessVariable;
FESFacade.apiGetValue = FunctionMap.apiGet;
FESFacade.getAllValues = function (docValues) {
    //we cannot just return everything here, Because for now all formula's have a user-entered value cache.
    //Also Functions themSelves are bound to this object.
    //So we have to strip them out here.
    //should be part of the apiGet, to query all *_value functions. or *_validation etc.
    var values = [];
    for (var formulaId in docValues) {
        var cachevalues = docValues[formulaId];
        if (cachevalues) {
            var formula = FormulaService.findFormulaByIndex(formulaId);
            var formulaName = formula === undefined ? formulaId : formula.name;
            for (var cachedValue in cachevalues)
                values.push({
                    varName: formulaName,
                    colId: cachedValue,
                    value: cachevalues[cachedValue],
                    formulaId: formulaId
                });
        }
    }
    return values;
}
//when new formula's arrive, we have to update the user-entered map so we don't get NPE
//just a quick-fix..
FESFacade.updateValueMap = function (values) {
    FormulaService.visitFormulas(function (formula) {
        //later will add values['_'+key] for the cache
        //for unlocked add values[key] here will user entered values stay
        if (formula.type === 'noCacheUnlocked') {
            var id = formula.id === undefined ? formula.index : formula.id;
            if (!values[id]) {
                values[id] = {};
            }
        }
    });
};
FESFacade.visit = PropertiesAssembler.visitProperty;
module.exports = FESFacade;