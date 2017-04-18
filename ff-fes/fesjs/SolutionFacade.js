/**
 * combines FormulaService with
 */
var Solution = require('./Solution')
var UIService = require('./UIService')
var FormulaService = require('./FormulaService')
var ParserService = require('./ParserService')
function SolutionFacade() {
}
SolutionFacade.prototype.createSolution = function (solutionName) {
    return new Solution(UIService.createRootNode(solutionName).solutionName);
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
    var solution = UIService.findAll(nodeId);
    this.gatherFormulas(solution);
    return solution;
}
SolutionFacade.prototype.createUIFormulaLink = function (solution, rowId, colId, body, displayAs) {
    //by default only value properties can be user entered
    //in simple (LOCKED = (colId !== 'value'))
    var ui = UIService.getUI(solution.name, rowId, colId);
    var formulaId = FormulaService.addModelFormula(ui, solution.name, rowId, colId, colId === 'value' ? false : true, body);
    //most ugly part here, the Parsers themselves add Links, which should be done just before parsing Formula's
    //afterwards the Formula's are parsed,
    return solution.createNode(rowId, colId, formulaId, displayAs);
};
//** addUi and bulkinsert should not be exposed.
SolutionFacade.prototype.addUi = UIService.addUi;
SolutionFacade.prototype.bulkInsert = UIService.bulkInsert;
SolutionFacade.prototype.getParsers = ParserService.getParsers;
SolutionFacade.prototype.findParser = ParserService.findParser;
SolutionFacade.prototype.addParser = ParserService.addParser;
module.exports = SolutionFacade.prototype;