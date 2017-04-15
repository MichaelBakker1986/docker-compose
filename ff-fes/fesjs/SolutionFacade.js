/**
 * combines FormulaService with
 */
var Solution = require('./Solution')
var UIService = require('./UIService')
function SolutionFacade() {
}
SolutionFacade.prototype.createSolution = function (solutionName) {
    return new Solution(UIService.createRootNode(solutionName).solutionName);
}
module.exports = SolutionFacade.prototype;