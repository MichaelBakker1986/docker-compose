const SolutionFacade = require('../../src/SolutionFacade')
const RegisterToFFL = require('./RegisterToFFL').RegisterToFFL
const FinFormula = require('./FinFormula')
const AST = require('../../../ast-node-utils/index').ast
const log = require('log6')
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
RegisterToLMEParser.prototype.headername = '.finance ffl';
RegisterToLMEParser.prototype.walk = function(node, depth, visitor) {
    visitor(node, depth)
    const childs = node[this.childIndex];
    for (var i = 0; i < childs.length; i++) {
        this.walk(childs[i], depth + 1, visitor)
    }
}
RegisterToLMEParser.prototype.deParse = function(data, workbook) {
    if (!workbook.indexer) return null;
    return new RegisterToFFL(workbook.indexer).toGeneratedFFL(undefined, workbook.modelName)
}
RegisterToLMEParser.prototype.parseData = function(data, workbook) {
    const indexer = data;
    workbook.indexer = indexer;
    const self = this;
    const fflRegister = new RegisterToFFL(indexer)
    const register = data.getIndex('name');
    const modelName = workbook.modelName || indexer.name;
    const solution = SolutionFacade.createSolution(modelName || "NEW");
    const nameIndex = indexer.schemaIndexes.name;
    const tupleIndex = indexer.schemaIndexes.tuple;
    const referstoIndex = indexer.schemaIndexes.refersto;
    const displayTypeIndex = indexer.schemaIndexes.displaytype;
    const dataTypeIndex = indexer.schemaIndexes.datatype;
    const modifierIndex = indexer.schemaIndexes.modifier;
    this.childIndex = indexer.schemaIndexes.children;
    const childIndex = this.childIndex;
    const choiceIndex = indexer.schemaIndexes.choices;
    const trend_formulaIndex = indexer.schemaIndexes.formula_trend;
    const notrend_formulaIndex = indexer.schemaIndexes.formula_notrend;
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

    let nestedTupleDepth = 0
    const tuples = []
    const rootNode = register['root']
    this.walk(rootNode, 3, function(node, depth) {
        if (depth < tuples.length) {
            tuples.length--
            while (!tuples[depth] && tuples.length > 0) tuples.length--
        }
        const nodeName = node[nameIndex];
        let type = node[displayTypeIndex]
        inheritProperties(node)


        // expecting an parentName..
        let parentId = node[fflRegister.parentNameIndex] ? indexer.i[node[fflRegister.parentNameIndex]][fflRegister.nameIndex] : null;
        if (parentId == 'root') {
            parentId = undefined;
        }

        /**
         * This is where formula-sets are combined.
         * if the node has and trend and notrend formula, the target formula will be x.trend ? node.formula_trend : valueFormula
         * Ofcourse this will be for every formulaset that exists in the node
         * Document formulaset is notrend, formula = notrend
         * This way it would also be possible to have and formulaset 'orange', 'document' and trend formulasets
         */
        let trendformula = node[trend_formulaIndex];
        let valueFormula = node[notrend_formulaIndex] || node[fflRegister.formulaindex];//notrend is more specific than formula
        if (trendformula !== undefined && valueFormula !== trendformula) {//first of all, if both formula's are identical. We can skip the exercise
            valueFormula = 'If(x.istrend,' + trendformula + ',' + (valueFormula ? valueFormula : 'NA') + ')';
        }
        if (node[modifierIndex] == '=') {
            const siblings = indexer.i[node[fflRegister.parentNameIndex]][childIndex]
            let formula = '0';
            for (var i = 0; i < siblings.length; i++) {
                if (siblings[i][modifierIndex] && siblings[i][modifierIndex] != '=') {
                    formula += siblings[i][modifierIndex] + siblings[i][nameIndex];
                }
            }
            valueFormula = formula;
        }
        if (type == 'select') {
            if (!node[choiceIndex]) {
                if (log.debug) log.debug('Row [' + nodeName + '] is type [select], but does not have choices')
            } else if (node[choiceIndex].split('|').length == 2) {
                type = 'radio'
            } else {
                if (log.TRACE) log.trace('[' + nodeName + '] ' + node.choices)
            }
        }

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
        const frequency = node[fflRegister.frequencyIndex] || 'column';

        var uiNode = SolutionFacade.createUIFormulaLink(solution, nodeName, 'value', self.parseFFLFormula(indexer, valueFormula, nodeName, 'value', type), type, frequency);
        //hierarchical visibility
        const visibleFormula = node[fflRegister.visibleIndex];
        if (visibleFormula && parentId) node[fflRegister.visibleIndex] = fflRegister.defaultValues[visibleFormula] ? parentId + '.visible' : parentId + '.visible and ' + visibleFormula

        if (node[fflRegister.decimalsIndex]) uiNode.decimals = parseInt(node[fflRegister.decimalsIndex]);

        uiNode.frequency = frequency;

        /**
         * Tuple properties
         */
        if (node[tupleIndex] || tuples.length > 0) {
            uiNode.tuple = true;
            uiNode.nestedTupleDepth = 0
            for (var i = 0; i < tuples.length; i++)
                if (tuples[i]) uiNode.nestedTupleDepth++
            if (node[tupleIndex]) {
                uiNode.tupleDefinition = true;
                tuples[depth] = uiNode
            } else {
                uiNode.tupleDefinitionName = tuples[tuples.length - 1].rowId;
                uiNode.tupleProperty = true
            }
        }

        if (node[fflRegister.options_titleIndex] == 'locked') uiNode.title_locked = true

        uiNode.datatype = node[dataTypeIndex] || 'number';

        if (nodeName !== 'root') solution.setParentName(uiNode, parentId);

        for (var i = 0; i < formulaIndexes.length; i++) {
            const index = formulaIndexes[i];
            if (node[index]) {
                if (!fflRegister.defaultValues[index] || !fflRegister.defaultValues[index][node[index]])
                    SolutionFacade.createUIFormulaLink(solution, nodeName, indexer.schema[index], self.parseFFLFormula(indexer, node[index], nodeName, indexer.schema[index], null), undefined, frequency);
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
RegisterToLMEParser.prototype.parseFFLFormula = function(indexer, formula, nodeName, col, type) {
    if (!formula) return type == 'string' ? AST.STRING("") : AST.UNDEFINED()
    let finparse = col == 'choices' ? FinFormula.finChoice(formula) : FinFormula.parseFormula(formula)
    finparse = finparse.replace(/__(\d+)/gm, function($1, $2) {
        return indexer.constants[parseInt($2)]
    })
    var formulaReturn = 'undefined';
    try {
        formulaReturn = esprima.parse(finparse).body[0].expression
    }
    catch (e) {
        if (log.DEBUG) log.debug('unable to parse [' + finparse + '] returning it as String value [' + nodeName + "] : " + col, e);
        formulaReturn = AST.STRING(finparse);
    }
    return formulaReturn;
}

exports.RegisterToLMEParser = RegisterToLMEParser;
SolutionFacade.addParser(RegisterToLMEParser.prototype);