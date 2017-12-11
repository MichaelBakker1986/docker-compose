/**
 * Solution encapsulation
 * FormulaId '0' is not a valid ID!
 */
var log = require('ff-log')
var Solution = require('./Solution')
var PropertiesAssembler = require('./PropertiesAssembler')
var FunctionMap = require('./FunctionMap')
var FormulaService = require('./FormulaService')
var ParserService = require('./ParserService')
var FormulaBootstrap = require('./FormulaBootstrap');
var esprima = require('esprima')

function SolutionFacade() {
}

SolutionFacade.prototype.createSolution = function(solutionName) {
    return new Solution(PropertiesAssembler.createRootNode(solutionName).solutionName);
}

SolutionFacade.prototype.importSolutionData = function(data, parserType, workbook) {
    var foundParser = ParserService.findParser(parserType);
    var solution = foundParser.parseData(data, workbook);
    PropertiesAssembler.bulkInsert(solution);
    initFormulaBootstrap(solution.formulas, false);
    return solution;
}
SolutionFacade.prototype.exportSolution = function(parserType, rowId, workbook) {
    var parser = ParserService.findParser(parserType);
    if (parser === undefined) {
        throw Error('No such parser found:[' + parserType + ']');
    }
    return parser.deParse(rowId, workbook);
}

function initFormulaBootstrap(formulas, resetParsedFormula) {
    formulas.forEach(function(formulaId) {
        var formulaInfo = FormulaService.findFormulaByIndex(formulaId);
        if (resetParsedFormula) {
            formulaInfo.parsed = undefined;//explicitly reset parsed. (The formula-bootstrap) will skip parsed formulas
        }
        if (formulaInfo.parsed === undefined || formulaInfo.parsed === null) {
            FormulaBootstrap.parseAsFormula(formulaInfo);
        }
        FunctionMap.initializeFormula(formulaInfo);
    });
};
SolutionFacade.prototype.initFormulaBootstrap = initFormulaBootstrap;
/*
 *return given properties from a formula
 */
SolutionFacade.prototype.gatherFormulaProperties = function(modelName, properties, rowId) {
    var formulaProperties = {};
    for (var property in properties) {
        var formula = FormulaService.findFormulaByIndex(PropertiesAssembler.getOrCreateProperty(modelName, rowId, property).ref);
        if (formula !== undefined && formula.original !== undefined && formula.original !== null && formula.original !== '') {
            formulaProperties[property] = formula.original;
        }
    }
    return formulaProperties;
}
/**
 * Called from JSWorkBook
 * Initializes Solution if not exists
 * Creates Formula/Property if not exists
 * Initialize Functionmap
 */
SolutionFacade.prototype.createFormulaAndStructure = function(solutionName, formulaAsString, rowId, colId) {
    //create a formula for the element
    var ast = esprima.parse(formulaAsString);
    //create Solution if not exists.
    var solution = this.createSolution(solutionName);
    //integrate Property with Formula
    this.createUIFormulaLink(solution, rowId, colId, ast.body[0].expression, undefined);
    //integrate one formula from just created Solution
    this.initFormulaBootstrap(solution.formulas);
};
/**
 * Called by parsers
 */
SolutionFacade.prototype.createUIFormulaLink = function(solution, rowId, colId, body, displayAs) {
    //by default only value properties can be user entered
    //in simple (LOCKED = (colId !== 'value'))
    var property = PropertiesAssembler.getOrCreateProperty(solution.name, rowId, colId);
    var formulaId = FormulaService.addModelFormula(property, solution.name, rowId, colId, ['value', 'title'].indexOf(colId) == -1, body);
    return solution.createNode(rowId, colId, formulaId, displayAs);
};

SolutionFacade.prototype.mergeFormulas = function(formulasArg) {
    //so for all refs in the formula, we will switch the formulaIndex
    var changed = [];
    formulasArg.forEach(function(formula) {
        //not sure where to put this logic
        //get local formula
        //var id = formula.id === undefined ? formula.index : formula.id;
        var localFormula = FormulaService.findFormulaByIndex(formula.index);
        if (localFormula !== undefined && localFormula !== null) {
            changed.push(localFormula.id || localFormula.index);
            //of course this should not live here, its just a bug fix.
            if (localFormula.index !== formula.id) {
                //move formula
                modify(localFormula, formula);
            }
        }
    });
    //rebuild the formulas
    this.initFormulaBootstrap(changed, true);
};

function modifyFormula(old, newFormula) {
    FormulaService.moveFormula(old, newFormula);
    FunctionMap.moveFunction(old, newFormula);
    //update references
    for (var ref in old.refs) {
        var property = PropertiesAssembler.fetch(ref);
        property.ref = newFormula.id;
        property.formulaId = newFormula.id;
    }
}

SolutionFacade.prototype.addFormulaDependency = function(formulaInfo, name, propertyName) {
    var property = PropertiesAssembler.getOrCreateProperty(formulaInfo.name.split('_')[0], name, propertyName || 'value');
    FormulaService.addFormulaDependency(formulaInfo, property.ref, property.name);
    return property;
}
SolutionFacade.prototype.getFunctions = function() {
    return this.functions;
}
SolutionFacade.prototype.visitParsers = ParserService.visitParsers;
SolutionFacade.prototype.addParser = ParserService.addParser;
SolutionFacade.prototype.getOrCreateProperty = PropertiesAssembler.getOrCreateProperty;
SolutionFacade.prototype.contains = PropertiesAssembler.contains
//TODO: add locked flag to these properties
SolutionFacade.prototype.properties = {
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
SolutionFacade.prototype.functions = {}
SolutionFacade.prototype.addFunction = function(solution, functionName, functionBody) {
    var node = this.createUIFormulaLink(solution, functionName, 'function', functionBody, 'number');
    const findFormulaByIndex = FormulaService.findFormulaByIndex(node.ref);
    findFormulaByIndex.params = "$1,$2"
}
SolutionFacade.prototype.addVariables = FormulaService.addVariables
SolutionFacade.prototype.initVariables = FormulaService.initVariables
SolutionFacade.prototype.fetchFormulaByIndex = FormulaService.findFormulaByIndex;
FormulaBootstrap.initStateBootstrap(SolutionFacade.prototype);
module.exports = SolutionFacade.prototype;