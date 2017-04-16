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
SolutionFacade.prototype.addSimpleLink = function (solution, rowId, colId, body, displayAs) {
    //by default only value properties can be user entered
    //in simple (LOCKED = (colId !== 'value'))
    var formulaId = addLink(solution.name, rowId, colId, colId === 'value' ? false : true, body);
    //most ugly part here, the Parsers themselves add Links, which should be done just before parsing Formula's
    //afterwards the Formula's are parsed,
    return solution.createNode(rowId, colId, formulaId, displayAs);
};
function addLink(groupName, row, col, locked, body) {
    var ui = UIService.getUI(groupName, row, col);
    return FormulaService.addModelFormula(ui, groupName, row, col, locked, body);
};
module.exports = SolutionFacade.prototype;