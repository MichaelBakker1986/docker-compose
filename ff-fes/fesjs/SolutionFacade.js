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
SolutionFacade.prototype.createSolution = function (solutionName) {
    return new Solution(PropertiesAssembler.createRootNode(solutionName).solutionName);
}
SolutionFacade.prototype.produceSolution = function (nodeId) {
    var solution = PropertiesAssembler.findAllInSolution(nodeId);
    var solutionFormulas = [];
    solution.nodes.forEach(function (uiModel) {
        var formula = FormulaService.findFormulaByIndex(uiModel.ref);
        if (formula) {
            solutionFormulas[formula.id || formula.index] = formula;
        }
    })
    solution.formulas = solutionFormulas;
    return solution;
}

SolutionFacade.prototype.importSolution = function (data, parserType, workbook) {
    if (data === undefined) {
        log.error('No data specified')
        return;
    }
    var solution = ParserService.findParser(parserType).parse(data, workbook);
    log.debug('Update Solution [' + solution.getName() + ']');
    PropertiesAssembler.bulkInsert(solution);
    //only get the formulas for Current Model
    //the parser itsself should add formulas to the solution.
    var formulas = this.produceSolution(solution.getName()).formulas;
    this.initFormulaBootstrap(formulas, false);
    return solution;
}
SolutionFacade.prototype.exportSolution = function (parserType, rowId, workbook) {
    var parser = ParserService.findParser(parserType);
    if (parser === undefined) {
        throw Error('No such parser found:[' + parserType + ']');
    }
    return parser.deParse(rowId, workbook);
}
SolutionFacade.prototype.initFormulaBootstrap = function (formulas, disableCache) {
    return FunctionMap.initFormulaBootstrap(FormulaBootstrap.parseAsFormula, formulas, disableCache);
};
/*
 *return given properties from a formula
 */
SolutionFacade.prototype.gatherFormulaProperties = function (modelName, properties, rowId) {
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
 */
SolutionFacade.prototype.createFormulaAndStructure = function (groupName, formulaAsString, rowId, col) {
    //create a formula for the element
    var ast = esprima.parse(formulaAsString);
    var property = PropertiesAssembler.getOrCreateProperty(groupName, rowId, col);
    var newFormulaId = FormulaService.addModelFormula(property, groupName, rowId, col, col !== 'value', ast.body[0].expression);
    //integrate formula (parse it)
    FunctionMap.initFormulaBootstrap(FormulaBootstrap.parseAsFormula, [FormulaService.findFormulaByIndex(newFormulaId)], true);
};
/**
 * Called by parsers
 */
SolutionFacade.prototype.createUIFormulaLink = function (solution, rowId, colId, body, displayAs) {
    //by default only value properties can be user entered
    //in simple (LOCKED = (colId !== 'value'))
    var property = PropertiesAssembler.getOrCreateProperty(solution.name, rowId, colId);
    var formulaId = FormulaService.addModelFormula(property, solution.name, rowId, colId, colId !== 'value', body);
    //The Parsers themselves add Links, which should be done just before parsing Formula's
    //afterwards the Formula's are parsed,
    return solution.createNode(rowId, colId, formulaId, displayAs);
};

SolutionFacade.prototype.mergeFormulas = function (formulasArg) {
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
    FunctionMap.initFormulaBootstrap(FormulaBootstrap.parseAsFormula, changed, true);
};
function moveFormula(old, newFormula) {
    FormulaService.moveFormula(old, newFormula);
    FunctionMap.moveFormula(old, newFormula);
    //update references
    for (var ref in old.refs) {
        var property = PropertiesAssembler.fetch(ref);
        property.ref = newFormula.id;
        property.formulaId = newFormula.id;
    }
}
SolutionFacade.prototype.addFormulaDependency = function (formulaInfo, name, propertyName) {
    var property = PropertiesAssembler.getOrCreateProperty(formulaInfo.name.split('_')[0], name, propertyName || 'value');
    return FormulaService.addFormulaDependency(formulaInfo, property.ref, property.name);
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
SolutionFacade.prototype.findFormulaByIndex = FormulaService.findFormulaByIndex;
FormulaBootstrap.initStateBootstrap(SolutionFacade.prototype);
module.exports = SolutionFacade.prototype;