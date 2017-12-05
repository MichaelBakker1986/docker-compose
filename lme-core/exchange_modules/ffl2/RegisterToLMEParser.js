const RegisterToFFL = require('./RegisterToFFL').RegisterToFFL
const Register = require('./Register').Register
const SolutionFacade = require('../../src/SolutionFacade')
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

RegisterToLMEParser.prototype.parseData = function(data, workbook) {
    const indexer = new RegisterToFFL(new Register(), data);
    const modelName = workbook.modelName || indexer.name;
    const solution = SolutionFacade.createSolution(modelName || "NEW");
    indexer.indexProperties()

    //only inherit properties once.
    const inherited = {}

    //INFO: inheritance could also be possible via database
    function inheritProperties(node) {
        if (!inherited[node[indexer.nameIndex]] && node[indexer.referstoIndex]) {
            inherited[node[indexer.nameIndex]] = true
            const supertype = indexer.vars[node[indexer.referstoIndex]]
            //first inherit from parents of parents.
            if (supertype[indexer.referstoIndex]) inheritProperties(supertype)
            for (var i = 0; i < supertype.length; i++) {
                if (node[i] == null) node[i] = supertype[i];
            }
        }
    }

    indexer.walk('root', 3, function(node, depth) {
        const nodeName = node[indexer.nameIndex];
        let type = node[indexer.displaytypeIndex]
        inheritProperties(node)

        const parentId = node[indexer.parentNameIndex];

        //TODO: quick-fix move into IDE ScorecardTool-addon
        if (nodeName.match(/MAP[0-9]+_(VALIDATION|INFO|HINT|WARNING)$/i)) {
            if (indexer.defaultValues[indexer.visibleIndex][node[indexer.visibleIndex]]) {
                node[indexer.visibleIndex] = 'Length(' + nodeName + ')'
                node[indexer.frequencyIndex] = 'none'
            }
        } else if (nodeName.match(/MAP[0-9]+_PARAGRAAF[0-9]+$/i)) {
            node[indexer.frequencyIndex] = 'none'
            type = 'paragraph'
        }

        var uiNode = SolutionFacade.createUIFormulaLink(solution, nodeName, 'value', parseFFLFormula(node[indexer.formulaindex], nodeName, 'value', type), type);
        //hierarchical visibility
        const visibleFormula = node[indexer.visibleIndex];
        if (visibleFormula && parentId) node[indexer.visibleIndex] = indexer.defaultValues[visibleFormula] ? parentId + '.visible' : parentId + '.visible && ' + visibleFormula

        if (node[indexer.decimalsIndex]) uiNode.decimals = parseInt(node[indexer.decimalsIndex]);
        uiNode.frequency = node[indexer.frequencyIndex] || 'column';
        uiNode.datatype = node[indexer.datatypeIndex] || 'number';

        if (nodeName !== 'root') solution.setParentName(uiNode, parentId);

        for (var i = 0; i < indexer.formulaIndexes.length; i++) {
            const index = indexer.formulaIndexes[i];
            if (node[index]) {
                if (!indexer.defaultValues[index] || !indexer.defaultValues[index][node[index]])
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

exports = RegisterToLMEParser;
SolutionFacade.addParser(RegisterToLMEParser.prototype);