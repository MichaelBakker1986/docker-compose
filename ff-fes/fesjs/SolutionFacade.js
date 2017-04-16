/**
 * combines FormulaService with
 */
var Solution = require('./Solution')
var UIService = require('./UIService')
var FormulaService = require('./FormulaService')
function SolutionFacade() {
}
SolutionFacade.prototype.createSolution = function (solutionName) {
    return new Solution(UIService.createRootNode(solutionName).solutionName);
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
module.exports = SolutionFacade.prototype;