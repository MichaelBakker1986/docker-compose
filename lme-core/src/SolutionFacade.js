/**
 * Solution encapsulation
 * FormulaId '0' is not a valid ID!
 */
const Solution = require('./Solution')
const PropertiesAssembler = require('./PropertiesAssembler')
const FunctionMap = require('./FunctionMap')
const FormulaService = require('./FormulaService')
const ParserService = require('./ParserService')
const FormulaBootstrap = require('./FormulaBootstrap');
const esprima = require('esprima')

function SolutionFacade() {
}

SolutionFacade.prototype.createSolution = function(solutionName) {
    return new Solution(PropertiesAssembler.createRootNode(solutionName).solutionName);
}

SolutionFacade.prototype.importSolutionData = function(data, parserType, workbook) {
    const foundParser = ParserService.findParser(parserType);
    const solution = foundParser.parseData(data, workbook);
    PropertiesAssembler.bulkInsert(solution);
    this.initFormulaBootstrap(solution.getFormulaKeys(), false, workbook.context.ma, workbook.context.audittrail);
    return solution;
}
SolutionFacade.prototype.exportSolution = function(parserType, rowId, workbook) {
    const parser = ParserService.findParser(parserType);
    if (parser == null) throw Error('No such parser found:[' + parserType + ']');
    return parser.deParse(rowId, workbook);
}

SolutionFacade.prototype.initFormulaBootstrap = function(formulas, resetParsedFormula, ma, audittrail) {
    for (var i = 0; i < formulas.length; i++) {
        const formulaInfo = FormulaService.findFormulaByIndex(formulas[i]);
        if (resetParsedFormula) formulaInfo.parsed = undefined;//explicitly reset parsed. (The formula-bootstrap) will skip parsed formulas
        if (formulaInfo.parsed == null) FormulaBootstrap.parseAsFormula(formulaInfo);
        FunctionMap.initializeFormula(formulaInfo, ma, audittrail);
    }
};
/*
 *return given properties from a formula
 */
SolutionFacade.prototype.gatherFormulaProperties = function(modelName, properties, rowId) {
    const formulaProperties = {};
    for (var property in properties) {
        const formula = FormulaService.findFormulaByIndex(PropertiesAssembler.getOrCreateProperty(modelName, rowId, property).ref);
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
SolutionFacade.prototype.createFormulaAndStructure = function(solutionName, formulaAsString, rowId, colId, displaytype, frequency, ma, audittrail, self_body, parent_id) {
    //create a formula for the element
    const ast = esprima.parse(formulaAsString);
    //create Solution if not exists.
    const solution = this.createSolution(solutionName);
    //integrate Property with Formula
    this.createUIFormulaLink(solution, rowId, colId, ast.body[0].expression, displaytype, frequency, self_body, parent_id);
    //integrate one formula from just created Solution
    this.initFormulaBootstrap(solution.getFormulaKeys(), false, ma, audittrail);
};
/**
 * Called by parsers
 */
SolutionFacade.prototype.createUIFormulaLink = function(solution, rowId, colId, body, displaytype, frequency, self_body, parent_id) {
    //by default only value properties can be user entered
    //in simple (LOCKED = (colId !== 'value'))
    const property = PropertiesAssembler.getOrCreateProperty(solution.name, rowId, colId);
    if (rowId !== 'root' && colId == 'value') property.parentName = parent_id ? parent_id + '_value' : 'root_value';
    if (displaytype) property.displaytype = displaytype;
    const formulaId = FormulaService.addModelFormula(property, solution.name, rowId, colId, ['value', 'title'].indexOf(colId) == -1, body, frequency, self_body);
    solution.createNode(formulaId, displaytype, property);
    return property
};

SolutionFacade.prototype.addFormulaDependency = function(formulaInfo, name, propertyName) {
    const property = PropertiesAssembler.getOrCreateProperty(formulaInfo.name.split('_')[0], name, propertyName || 'value');
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
    value        : 0,
    visible      : 1,
    required     : 2,
    locked       : 3,
    entered      : 4,
    validation   : 5,
    title        : 6,
    validateInput: 7,
    choices      : 8,
    hint         : 9,
    _testh       : 10
};
SolutionFacade.prototype.functions = {}
SolutionFacade.prototype.addVariables = FormulaService.addVariables
SolutionFacade.prototype.initVariables = FormulaService.initVariables
SolutionFacade.prototype.fetchFormulaByIndex = FormulaService.findFormulaByIndex;
FormulaBootstrap.initStateBootstrap(SolutionFacade.prototype);
module.exports = SolutionFacade.prototype;