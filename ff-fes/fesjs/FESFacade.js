/**
 * Bridge between Formulas and UiModel
 * all functions should be moved to either formula-bootstrap.js or uitmodel.js
 */
var logger = require('ff-log');
var AST = require('ast-node-utils').ast;
var esprima = require('esprima')
var assert = require('assert')
//for now now just years.. keep it simple
var FESFacade = {}

var UIService = require('./UIService');
var bootstrap = require('./formula-bootstrap');
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

function findFormula(uiModel) {
    if (uiModel === undefined) {
        return undefined;
    }
    return FormulaService.findFormulaByIndex(uiModel.ref);
}
function getUI(groupName, row, col) {
    return UIService.getUI(groupName, row, col || 'value');
}
function getFormula(row, col) {
    return findFormula(getUI(row, col));
};
//public
//when new formula's arrive, we have to update the user-entered map so we don't get NPE
//just a quick-fix..
function updateValueMap(values) {
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
}
function moveFormula(old, newFormula) {
    FormulaService.moveFormula(old, newFormula);
    FunctionMap.moveFormula(old, newFormula);
    //update references
    for (var ref in old.refs) {
        var uiModel = UIService.fetch(ref);
        uiModel.ref = newFormula.id;
        uiModel.formulaId = newFormula.id;
    }
}
var propertyDefaults = {
    'visible': true,
    'value': 1e-10,
    'required': false,
    'locked': false,
    'choices': undefined,
    'valid': true,
    'validation': false
}

function getStatelessVariable(row, col) {
    return UIService.fetch(row + '_' + col);
}

FESFacade.statelessSetValue = function (context, row, value, col, xas) {
    var rowId = row + '_' + ( col || 'value');
    var localFormula = findFormula(UIService.fetch(rowId));
    if (localFormula === undefined) {
        //don't give away variable name here.
        throw Error('Cannot find variable')
    }
    logger.debug('Set value row:[%s] x:[%s] value:[%s]', row, xas.hash, value);
    FunctionMap.apiSet(localFormula, xas, 0, 0, value, context.values);
};
FESFacade.statelessGetValue = function (context, row, col, xas) {
    var colType = col || 'value';
    var localFormula = findFormula(getStatelessVariable(row, colType));
    var returnValue;
    if (localFormula === undefined) {
        returnValue = propertyDefaults[colType];
    }
    else {
        returnValue = FunctionMap.apiGet(localFormula, xas, 0, 0, context.values);
    }
    return returnValue;
}
FESFacade.getRootNode = UIService.getRootNode;
FESFacade.getStatelessVariable = getStatelessVariable;
FESFacade.findFormulaByIndex = FormulaService.findFormulaByIndex;
FESFacade.bulkInsertFormula = FormulaService.bulkInsertFormula;
FESFacade.findFormula = findFormula;
FESFacade.mergeFormulas = function (formulasArg) {
    //so for all refs in the formula, we will switch the formulaIndex
    var changed = [];
    formulasArg.forEach(function (formula) {
        //not sure where to put this logic
        //get local formula
        //var id = formula.id === undefined ? formula.index : formula.id;
        var localFormula = FormulaService.findFormulaByIndex(formula.index);
        if (localFormula !== undefined && localFormula !== null) {
            changed.push(localFormula);
            //of course this should not live here, its just a bug fix.
            if (localFormula.index !== formula.id) {
                //move formula
                moveFormula(localFormula, formula);
            }
        }
    });
    //rebuild the formulas
    FunctionMap.initFormulaBootstrap(bootstrap.parseAsFormula, changed, true);
};
FESFacade.getFormula = getFormula;
FESFacade.apiGet = FunctionMap.apiGet;

FESFacade.initFormulaBootstrap = function (formulas, disableCache) {
    return FunctionMap.initFormulaBootstrap(bootstrap.parseAsFormula, formulas, disableCache);
};
FESFacade.createFormulaAndStructure = function (groupName, formulaAsString, rowId, col) {
    //create a formula for the element
    var ast = esprima.parse(formulaAsString);
    var ui = UIService.getUI(groupName, rowId, col);
    var newFormulaId = FormulaService.addModelFormula(ui, groupName, rowId, col, col === 'value' ? false : true, ast.body[0].expression);
    //integrate formula (parse it)
    FunctionMap.initFormulaBootstrap(bootstrap.parseAsFormula, [FormulaService.findFormulaByIndex(newFormulaId)], true);
};
//SolutionService
//UiModelService?
FESFacade.updateValueMap = updateValueMap;
//encapsulate isLocked flag
FESFacade.findLink = UIService.getUI;
FESFacade.visit = UIService.visit;
//supported properties
FESFacade.properties = {
    value: 0,
    visible: 1,
    required: 2,
    locked: 3,
    entered: 4,
    validation: 5,
    title: 6,
    validateInput: 7,
    choices: 8,
    _testg: 9,
    _testh: 10
};
//for now we accept NON-Dynamic Fes7, nor Dynamic variable properties.
//properties once bound ONCE, math Functions also ONCE
bootstrap.initStateBootstrap({
    state: FESFacade,
    uicontains: UIService.contains
});
module.exports = FESFacade;