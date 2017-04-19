/**
 * combines FormulaService with
 */
var Solution = require('./Solution')
var PropertiesAssembler = require('./PropertiesAssembler')
var FormulaService = require('./FormulaService')
function SolutionFacade() {
}
SolutionFacade.prototype.createSolution = function (solutionName) {
    return new Solution(PropertiesAssembler.createRootNode(solutionName).solutionName);
}
SolutionFacade.prototype.createUIFormulaLink = function (solution, rowId, colId, body, displayAs) {
    //by default only value properties can be user entered
    //in simple (LOCKED = (colId !== 'value'))
    var ui = PropertiesAssembler.getProperty(solution.name, rowId, colId);
    var formulaId = FormulaService.addModelFormula(ui, solution.name, rowId, colId, colId === 'value' ? false : true, body);
    //most ugly part here, the Parsers themselves add Links, which should be done just before parsing Formula's
    //afterwards the Formula's are parsed,
    return solution.createNode(rowId, colId, formulaId, displayAs);
};
//** addProperty and bulkinsert should not be exposed.
SolutionFacade.prototype.addProperty = PropertiesAssembler.addProperty;
SolutionFacade.prototype.bulkInsert = PropertiesAssembler.bulkInsert;
module.exports = SolutionFacade.prototype;