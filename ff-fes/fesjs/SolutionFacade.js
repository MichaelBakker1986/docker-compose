/**
 * combines FormulaService with
 */
var log = require('ff-log')
var Solution = require('./Solution')
var PropertiesAssembler = require('./PropertiesAssembler')
var FunctionMap = require('./FunctionMap')
var FormulaService = require('./FormulaService')
var ParserService = require('./ParserService')
var bootstrap = require('./formula-bootstrap');
var esprima = require('esprima')
function SolutionFacade() {
}
SolutionFacade.prototype.createSolution = function (solutionName) {
    return new Solution(PropertiesAssembler.createRootNode(solutionName).solutionName);
}
SolutionFacade.prototype.gatherFormulas = function (solution) {
    var solutionFormulas = [];
    solution.nodes.forEach(function (uiModel) {
        var formula = FormulaService.findFormulaByIndex(uiModel.ref);
        if (formula) {
            var id = formula.id === undefined ? formula.index : formula.id;
            solutionFormulas[id] = formula;
        }
    })
    solution.formulas = solutionFormulas;
};
SolutionFacade.prototype.produceSolution = function (nodeId) {
    var solution = PropertiesAssembler.findAllInSolution(nodeId);
    this.gatherFormulas(solution);
    return solution;
}
SolutionFacade.prototype.createUIFormulaLink = function (solution, rowId, colId, body, displayAs) {
    //by default only value properties can be user entered
    //in simple (LOCKED = (colId !== 'value'))
    var ui = PropertiesAssembler.getOrCreateUI(solution.name, rowId, colId);
    var formulaId = FormulaService.addModelFormula(ui, solution.name, rowId, colId, colId === 'value' ? false : true, body);
    //most ugly part here, the Parsers themselves add Links, which should be done just before parsing Formula's
    //afterwards the Formula's are parsed,
    return solution.createNode(rowId, colId, formulaId, displayAs);
};
SolutionFacade.prototype.importSolution = function (data, parserType, wb) {
    if (data === undefined) {
        console.info('no file specified')
        return;
    }
    var solution = ParserService.findParser(parserType).parse(data, wb);

    log.debug('Update model [' + solution.getName() + ']');
    PropertiesAssembler.bulkInsert(solution);
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
    return FunctionMap.initFormulaBootstrap(bootstrap.parseAsFormula, formulas, disableCache);
};
SolutionFacade.prototype.gatherProperties = function (modelName, properties, rowId) {
    var formulaProperties = {};
    for (var key in properties) {
        var formula = FormulaService.findFormulaByIndex(PropertiesAssembler.getOrCreateUI(modelName, rowId, key).ref);
        if (formula !== undefined && formula.original !== undefined && formula.original !== null && formula.original !== '') {
            formulaProperties[key] = formula.original;
        }
    }
    return formulaProperties;
}
SolutionFacade.prototype.createFormulaAndStructure = function (groupName, formulaAsString, rowId, col) {
    //create a formula for the element
    var ast = esprima.parse(formulaAsString);
    var ui = PropertiesAssembler.getOrCreateUI(groupName, rowId, col);
    var newFormulaId = FormulaService.addModelFormula(ui, groupName, rowId, col, col === 'value' ? false : true, ast.body[0].expression);
    //integrate formula (parse it)
    FunctionMap.initFormulaBootstrap(bootstrap.parseAsFormula, [FormulaService.findFormulaByIndex(newFormulaId)], true);
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
    FunctionMap.initFormulaBootstrap(bootstrap.parseAsFormula, changed, true);
};
function moveFormula(old, newFormula) {
    FormulaService.moveFormula(old, newFormula);
    FunctionMap.moveFormula(old, newFormula);
    //update references
    for (var ref in old.refs) {
        var uiModel = PropertiesAssembler.fetch(ref);
        uiModel.ref = newFormula.id;
        uiModel.formulaId = newFormula.id;
    }
}
//** addUi and bulkinsert should not be exposed.
SolutionFacade.prototype.addUi = PropertiesAssembler.addUi;
SolutionFacade.prototype.bulkInsert = PropertiesAssembler.bulkInsert;
SolutionFacade.prototype.visitParsers = ParserService.visitParsers;
SolutionFacade.prototype.addParser = ParserService.addParser;

SolutionFacade.prototype.findLink = PropertiesAssembler.getOrCreateUI;
SolutionFacade.prototype.contains = PropertiesAssembler.contains
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
bootstrap.initStateBootstrap(SolutionFacade.prototype);
module.exports = SolutionFacade.prototype;