/**
 * Bridge between Formulas and UiModel
 * all functions should be moved to either formula-bootstrap.js or uitmodel.js,because this concept doesn't really exist
 *
 * Just look at it Very Generic Dynamic Service
 *
 * if has static members
 *  bootstrap
 *  FunctionMap
 *  formulas
 *
 * if two actual
 * There is so much wrong with this class, its and STATE and GenericService
 * For now we dont care.
 *
 * So this is where the business logic is.
 * Encapsulate abstraction with Business case
 *
 * So far this Giant is a:
 * UiModelService, ParserService, ValueService,  SolutionService
 */
var logger = require('ff-log');
var AST = require('./AST');
var jsMath = require('./jsMath.json')
var esprima = require('esprima')
var assert = require('assert')
var time = require('./XAxis')
var detailColumns = new time().detl.columns;
//for now now just years.. keep it simple
var contextState = detailColumns[0][0];
//converter between display type and fesjs value
function ParserService() {
}
/*
 Class Parser
 {
 name: String,
 headerName: String,
 parse: Function(Context) : Solution
 deParse: Function() : Export
 }
 */
var parsers = {};
var UIService = require('./uimodel');
var bootstrap = require('./formula-bootstrap');
var FunctionMap = require('./FunctionMap');
var FormulaService = require('./FormulaService')
/*
 Class Formula
 {
 ast: String, AST AsString
 body: Object, AST
 deps: Object, containing dependend elements
 formulaDependencys: [],
 index: Number, Temporally ID
 name: String, name of the function
 original: String, User entered String value of given formula
 parsed: String, String body of the function
 refs: Object, revered Dependencies of the Formula. These are used to reset caches from the dependent formulas when this value changes
 type: String, Formula decorator type. e.x. If formula can be user entered, it will wrap lookup in the docValues around it
 }
 */

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
    var id = uiModel.formulaId === undefined ? uiModel.ref : uiModel.formulaId;
    return FormulaService.findFormulaByIndex(uiModel.ref);
}
function getUI(groupName, row, col) {
    return UIService.getUI(groupName, row, col || 'value');
}
function getFormulaByUI(uielem) {
    return findFormula(uielem);
}
function getFormula(row, col) {
    return findFormula(getUI(row, col));
};
//copy paste of the one below, its time to integrate Solution
function gatherFormulas(solution) {
    var solutionFormulas = [];
    solution.nodes.forEach(function (uiModel) {
        var formula = findFormula(uiModel);
        if (formula !== undefined && formula !== null) {
            var id = formula.id === undefined ? formula.index : formula.id;
            solutionFormulas[id] = formula;
        }
    })
    solution.formulas = solutionFormulas.clean(null);
}
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
//public

function addLink(groupName, row, col, locked, body) {
    var ui = UIService.getUI(groupName, row, col);
    return FormulaService.addFormulaLink(ui, groupName, row, col, locked, body);
};
//private


function produceSolution(nodeId) {
    var solution = UIService.findAll(nodeId);
    gatherFormulas(solution);
    return solution;
}
//assert(formula.name);
//assert(formula.id);


function addParser(parser) {
    parsers[parser.name] = parser;
}
//looks a lot like JSWorkBook.doImport, only does not support the ABN way
//this method only recieves GenericModels so we dont have to check Type
function getParsers() {
    var result = [];
    for (var key in parsers) {
        result.push(parsers[key]);
    }
    return result;
}
function mergeFormulas(formulasArg) {
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
    FunctionMap.init(bootstrap.parseAsFormula, changed, true);
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
function statelessGetValue(context, row, col, x) {
    var colType = col || 'value';
    var uielem = getStatelessVariable(row, colType);
    var localFormula = getFormulaByUI(uielem);
    var returnValue;
    if (localFormula === undefined) {

        if (col === 'value') {
            returnValue = propertyDefaults[colType];
        }
        else {
            returnValue = propertyDefaults[colType];
        }
    }
    else {
        var xas = x ? detailColumns[0][x] : contextState;
        returnValue = FunctionMap.apiGet(localFormula, xas || contextState, 0, 0, context.values);
    }
    return returnValue;
}
function statelessSetValue(context, row, value, col, x) {
    var xas = x ? detailColumns[0][x] : contextState;
    var rowId = row + '_' + ( col || 'value');
    var localFormula = getFormulaByUI(UIService.fetch(rowId));
    if (localFormula === undefined) {
        //don't give away variable name here.
        throw Error('Cannot find variable')
    }
    logger.info('Set value row:[%s] x:[%s] value:[%s]', row, xas.hash, value);
    FunctionMap.apiSet(localFormula, xas, 0, 0, value, context.values);
}
ParserService.prototype.addParser = addParser;
ParserService.prototype.getParsers = getParsers;
ParserService.prototype.findParser = function (parserName) {
    return parsers[parserName];
}
var GenericModelFile = {
    addParser: ParserService.prototype.addParser,
    getParsers: ParserService.prototype.getParsers,
    findParser: ParserService.prototype.findParser,

    //ValueService?
    statelessSetValue: statelessSetValue,
    statelessGetValue: statelessGetValue,
    getStatelessVariable: getStatelessVariable,
    //FormulaService?
    findFormulaByIndex: FormulaService.findFormulaByIndex,
    bulkInsertFormula: FormulaService.bulkInsertFormula,
    findFormula: findFormula,
    mergeFormulas: mergeFormulas,
    getFormula: getFormula,
    getFormulas: FormulaService.getFormulas,
    gatherFormulas: gatherFormulas,
    createFormula: function createFormula(groupName, formulaAsString, rowId, colId) {
        var col = colId || 'value';
        //create a formula for the element
        var ast = esprima.parse(formulaAsString);
        var newFormulaId = addLink(groupName, rowId, col, col === 'value' ? false : true, ast.body[0].expression);
        //integrate formula (parse it)
        FunctionMap.init(bootstrap.parseAsFormula, [FormulaService.findFormulaByIndex(newFormulaId)], true);
    },
    jsMath: jsMath,//strange part
    //SolutionService
    produceSolution: produceSolution,
    //UiModelService?
    updateValueMap: updateValueMap,
    //encapsulate isLocked flag
    addSimpleLink: function (solution, rowId, colId, body, displayAs) {
        //by default only value properties can be user entered
        //in simple (LOCKED = (colId !== 'value'))
        var formulaId = addLink(solution.name, rowId, colId, colId === 'value' ? false : true, body);
        //most ugly part here, the Parsers themselves add Links, which should be done just before parsing Formula's
        //afterwards the Formula's are parsed,
        return solution.createNode(rowId, colId, formulaId, displayAs);
    },
    findLink: function (groupName, row, col) {
        return UIService.getUI(groupName, row, col);
    },

    //supported properties
    properties: {
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
    },
    setXasStart: function (year) {
        contextState = detailColumns[0][0];
    },
    x: contextState,
    updateAll: {validation: true, title: true, value: true, required: true, visible: true, locked: true, choices: true}
};
//for now we accept NON-Dynamic FesJSMath, nor Dynamic variable properties.
//properties once bound ONCE, math Functions also ONCE
bootstrap.init({
    state: GenericModelFile,
    uicontains: UIService.contains
});
module.exports = GenericModelFile;