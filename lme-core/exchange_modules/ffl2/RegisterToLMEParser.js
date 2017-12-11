const SolutionFacade = require('../../src/SolutionFacade')
const RegisterToFFL = require('./RegisterToFFL').RegisterToFFL
const FinFormula = require('../ffl/FinFormula')
const AST = require('../../../ast-node-utils/index').ast
const log = require('ff-log')
var esprima = require('esprima');

/**
 * v2 ffl parsing, supports refers-to, modifiers. internationalization. v1:{@fflparser.js}
 * Quicker, cleaner, flexible, less data-loss
 * TODO: load property names in DB which directly correspond, fix defaults while saving.
 * TODO: choices not work correctly
 */
function RegisterToLMEParser() {

}

RegisterToLMEParser.prototype.name = 'ffl2'
RegisterToLMEParser.prototype.status = 'green';
RegisterToLMEParser.prototype.headername = '.finance ffl2';
RegisterToLMEParser.prototype.walk = function(node, depth, visitor) {
    visitor(node, depth)
    const childs = node[this.childIndex];
    for (var i = 0; i < childs.length; i++) {
        this.walk(childs[i], depth + 1, visitor)
    }
}
RegisterToLMEParser.prototype.parseData = function(data, workbook) {
    const indexer = data;
    const fflRegister = new RegisterToFFL(indexer)
    const register = data.getIndex('name');
    const modelName = workbook.modelName || indexer.name;
    const solution = SolutionFacade.createSolution(modelName || "NEW");
    const nameIndex = indexer.schemaIndexes.name;
    const referstoIndex = indexer.schemaIndexes.refersto;
    const displayTypeIndex = indexer.schemaIndexes.displaytype;
    this.childIndex = indexer.schemaIndexes.children;
    this.formulaIndexes = []
    const formulaIndexes = this.formulaIndexes
    var formulas = ['valid', 'title', 'hint', 'locked', 'visible', 'required', 'choices']
    for (var i = 0; i < formulas.length; i++) {
        this.formulaIndexes.push(data.schemaIndexes[formulas[i]])
    }
    //only inherit properties once.
    const inherited = {}

    //INFO: inheritance could also be possible via database
    function inheritProperties(node) {
        if (!inherited[node[nameIndex]] && node[referstoIndex]) {
            inherited[node[nameIndex]] = true
            const supertype = register[node[referstoIndex]]
            if (log.DEBUG && supertype == null) log.debug('RefersTo: [' + node[referstoIndex] + '] is declared in the model but does not exsists');
            //first inherit from parents of parents.
            if (supertype[fflRegister.referstoIndex]) inheritProperties(supertype)
            for (var i = 0; i < supertype.length; i++) {
                if (node[i] == null) node[i] = supertype[i];
            }
        }
    }

    const rootNode = register['root']
    this.walk(rootNode, 3, function(node, depth) {
        const nodeName = node[nameIndex];
        let type = node[displayTypeIndex]
        inheritProperties(node)

        // expecting an parentName..
        const parentId = node[fflRegister.parentNameIndex] ? indexer.i[node[fflRegister.parentNameIndex]][fflRegister.nameIndex] : null;

        //TODO: quick-fix move into IDE ScorecardTool-addon
        if (nodeName.match(/MAP[0-9]+_(VALIDATION|INFO|HINT|WARNING)$/i)) {
            if (fflRegister.defaultValues[fflRegister.visibleIndex][node[fflRegister.visibleIndex]]) {
                node[fflRegister.visibleIndex] = 'Length(' + nodeName + ')'
                node[fflRegister.frequencyIndex] = 'none'
            }
        } else if (nodeName.match(/MAP[0-9]+_PARAGRAAF[0-9]+$/i)) {
            node[fflRegister.frequencyIndex] = 'none'
            type = 'paragraph'
        }

        var uiNode = SolutionFacade.createUIFormulaLink(solution, nodeName, 'value', parseFFLFormula(node[fflRegister.formulaindex], nodeName, 'value', type), type);
        //hierarchical visibility
        const visibleFormula = node[fflRegister.visibleIndex];
        if (visibleFormula && parentId) node[fflRegister.visibleIndex] = fflRegister.defaultValues[visibleFormula] ? parentId + '.visible' : parentId + '.visible && ' + visibleFormula

        if (node[fflRegister.decimalsIndex]) uiNode.decimals = parseInt(node[fflRegister.decimalsIndex]);
        uiNode.frequency = node[fflRegister.frequencyIndex] || 'column';

        if (node[fflRegister.options_titleIndex] == 'locked') uiNode.title_locked = true

        uiNode.datatype = node[displayTypeIndex] || 'number';

        if (nodeName !== 'root') solution.setParentName(uiNode, parentId);

        for (var i = 0; i < formulaIndexes.length; i++) {
            const index = formulaIndexes[i];
            if (node[index]) {
                if (!fflRegister.defaultValues[index] || !fflRegister.defaultValues[index][node[index]])
                    SolutionFacade.createUIFormulaLink(solution, nodeName, indexer.schema[index], parseFFLFormula(node[index], nodeName, indexer.schema[index], null));
            }
        }
    });
    //think about formula-sets, same ritual as trend + notrend formulasets
    //think about the modifiers, to make them work correctly
    //think about ' and // in constants
    //think about trend - notrend
    //INFO: scorecardtool: think about paragraph, WARNING, INFO, HINT..
    //think about tupleDefinitionName, tupleDefinitionProperty
    //forget about de parsing, since its included in the indexer.
    return solution;
}

/**
 * We have full indexed key-value of the model.
 * Easy way to implement refers-to (inheritance)
 * @param {optional} modelName
 */
const displaytypes = {
    default: 'string'
}

function parseFFLFormula(formula, nodeName, col, type) {
    if (!formula) return type == 'string' ? AST.STRING("") : AST.UNDEFINED()
    let finparse = col == 'choices' ? FinFormula.finChoice(formula) : FinFormula.parseFormula(formula)
    finparse = finparse.replace(/__(\d+)/gm, function($1, $2) {
        return '"international' + $2 + '"'
    })
    var formulaReturn = 'undefined';
    try {
        formulaReturn = esprima.parse(finparse).body[0].expression
    }
    catch (e) {
        log.debug('unable to parse [' + finparse + '] returning it as String value [' + nodeName + "] : " + col, e);
        formulaReturn = AST.STRING(finparse);
    }
    return formulaReturn;
}

exports.RegisterToLMEParser = RegisterToLMEParser;
SolutionFacade.addParser(RegisterToLMEParser.prototype);