const SolutionFacade = require('../../src/SolutionFacade')
const RegisterToFFL = require('./RegisterToFFL').RegisterToFFL
const FinFormula = require('./FinFormula')
const AST = require('../../../ast-node-utils/index').ast
const Solution = require('../../src/Solution')
const log = require('log6')
const esprima = require('esprima');

/**
 * ffl parsing, supports refers-to, modifiers. internationalization. v1:{@fflparser.js} field-validations
 * V2
 *  Quicker, cleaner, flexible, less data-loss
 *   1) Indexing makes lookups while processing data more efficient and use less code.
 *   2) Prefer ["a","b"].join('') above "a" + "b" its way quicker.
 *   3) The indexer has removed parsing abnormals with propername " visible" etc.. Makes the code more clean
 *   4) Own char-interpreter was more complex than recursive regex-replace.
 *
 * TODO: load property names in DB which directly correspond, fix defaults while saving.
 * TODO: some exotic choices not work correctly
 */
function RegisterToLMEParser() {
}

RegisterToLMEParser.prototype.name = 'ffl2'
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
    const validIndex = indexer.schemaIndexes.valid;
    const displayOptionsIndex = indexer.schemaIndexes.display_options;
    const dataOptionsIndex = indexer.schemaIndexes.data_options;
    const lengthIndex = indexer.schemaIndexes.length;
    const patternIndex = indexer.schemaIndexes.pattern;
    const titleIndex = indexer.schemaIndexes.title;
    const referstoIndex = indexer.schemaIndexes.refersto;
    const displayTypeIndex = indexer.schemaIndexes.displaytype;
    const frequencyIndex = indexer.schemaIndexes.frequency;
    const versionIndex = indexer.schemaIndexes.version;
    const dataTypeIndex = indexer.schemaIndexes.datatype;
    const rangeIndex = indexer.schemaIndexes.range;
    const aggregationIndex = indexer.schemaIndexes.aggregation;
    const modifierIndex = indexer.schemaIndexes.modifier;
    const decimalsIndex = indexer.schemaIndexes.fixed_decimals;
    const parentNameIndex = indexer.schemaIndexes.parentId;
    const visibleIndex = indexer.schemaIndexes.visible;
    const treeIndex = indexer.schemaIndexes.treeindex;

    this.childIndex = indexer.schemaIndexes.children;
    const childIndex = this.childIndex;
    const choiceIndex = indexer.schemaIndexes.choices;
    const trend_formulaIndex = indexer.schemaIndexes.formula_trend;
    const notrend_formulaIndex = indexer.schemaIndexes.formula_notrend;
    this.formulaIndexes = []
    const formulaIndexes = this.formulaIndexes
    var formulas = ['valid', 'hint', 'locked', 'visible', 'required', 'choices']
    for (var i = 0; i < formulas.length; i++) {
        //test if the formula is in the model at all
        if (data.schemaIndexes[formulas[i]] != null) this.formulaIndexes.push(data.schemaIndexes[formulas[i]])
    }
    //only inherit properties once.
    const inherited = {}

    //INFO: inheritance could also be possible via database
    function inheritProperties(node) {
        if (register.root == node) return
        const fallback = node[referstoIndex] || register.root
        if (!inherited[node[nameIndex]]) {
            inherited[node[nameIndex]] = true
            const supertype = node[referstoIndex] ? register[node[referstoIndex]] : register.root
            if (log.DEBUG && supertype == null) log.debug('RefersTo: [' + node[referstoIndex] + '] is declared in the model but does not exsists');
            //first inherit from parents of parents.
            if (supertype[referstoIndex]) inheritProperties(supertype)

            for (var i = 0; i < supertype.length; i++) {
                if (node[i] == null) node[i] = supertype[i];
            }
        }
    }

    const tuples = []
    /*  var default_frequency = 'column'
      if (register.root) {
          default_frequency = register.root[frequencyIndex] || 'column'
      }*/
    const rootNode = register.root || indexer.i[0]
    workbook.model_version = rootNode ? rootNode[versionIndex] : ''
    this.walk(rootNode, 3, function(node, depth) {
        if (depth < tuples.length) {
            tuples.length = depth;
            while (tuples.length > 0 && !tuples[depth - 1]) tuples.length--
        }
        const nodeName = node[nameIndex];
        inheritProperties(node)
        var displaytype = node[displayTypeIndex] || 'number'

        var datatype = node[dataTypeIndex] || 'number'
        var frequency = node[frequencyIndex] || 'column'
        var display_options = node[displayOptionsIndex]
        const title = node[titleIndex] || "\"" + nodeName + "\""
        const data_options = node[dataOptionsIndex]
        //TODO: paragraph when no children.
        //TODO: else column frequency..
        /*
         * Don't forget reference variables
         * Don't forget num(1,2) datatype parsing. (fixed_decimals)
         * Don't forget unscalable number
         * Choice -> " and " <- fix
         * merge display options and displaytype.
         */
        if (node[tupleIndex]) {
            displaytype = 'paragraph'
        }
        if (displaytype == 'paragraph') {
            datatype = 'string'
            frequency = 'none'
        }
        // expecting an parentName..
        var parentId = node[parentNameIndex] ? indexer.i[node[parentNameIndex]][nameIndex] : null;
        //if (parentId == 'root') parentId = undefined;

        /**
         * number:2 means: number with 2 fixed decimals
         */
        var fixed_decimals = node[decimalsIndex];
        var startdecimalsIndex;
        if ((fixed_decimals == null) && (startdecimalsIndex = displaytype.indexOf('(')) > -1) {
            fixed_decimals = displaytype.substr(startdecimalsIndex).slice(1, -1)
            displaytype = displaytype.substr(0, startdecimalsIndex);
        }
        /**
         * This is where formula-sets are combined.
         * if the node has and trend and notrend formula, the target formula will be x.trend ? node.formula_trend : valueFormula
         * Ofcourse this will be for every formulaset that exists in the node
         * Document formulaset is notrend, formula = notrend
         * This way it would also be possible to have and formulaset 'orange', 'document' and trend formulasets
         */
        var valueFormula;
        /**
         * Copy - variable
         */
        if (node[referstoIndex]) {
            valueFormula = node[referstoIndex]
        } else {
            var trendformula = node[trend_formulaIndex];
            valueFormula = node[notrend_formulaIndex] || node[fflRegister.formulaindex];//notrend is more specific than formula
            if (trendformula != null && valueFormula != trendformula) {//first of all, if both formula's are identical. We can skip the exercise
                valueFormula = 'If(IsTrend,' + trendformula + ',' + (valueFormula ? valueFormula : 'NA') + ')';
            }
            if (frequency == 'column' && datatype == 'number' && node[aggregationIndex] == 'flow') {
                valueFormula = 'If(TimeAggregated,Aggregate(Self,x),' + (valueFormula ? valueFormula : 'NA') + ')'
            }
            if (node[modifierIndex] == '=' || node[modifierIndex] == '+=') {
                const treeIdx = (node[treeIndex] - 2)
                display_options = 'displayAsSummation'
                const siblings = indexer.i[node[parentNameIndex]][childIndex]
                var sumformula = [];

                for (var i = treeIdx; i >= 0; i--) {
                    const sibling_modifier = siblings[i][modifierIndex];
                    if (sibling_modifier) {
                        if (sibling_modifier.indexOf('=') > -1) break
                        const withouttotal = sibling_modifier.replace(/=/, '');
                        if (withouttotal.length > 0) sumformula.push(withouttotal + siblings[i][nameIndex]);
                    }
                }
                //if (valueFormula) log.error(nodeName + '=\n' + sumformula.reverse().join('') + '\nformula:\n' + valueFormula)
                valueFormula = sumformula.reverse().join('');
            }
        }
        //if column && number.. (aggregate)
        /**
         * optional displaytype =select.
         * Having the choice member is enough
         */
        if (node[choiceIndex] || displaytype == 'select') {
            if (displaytype == 'date') {
                //NO-OP (for now..., the choices are used to format the date-picker.
            }
            else if (!node[choiceIndex]) {
                if (log.debug) log.debug('Row [' + nodeName + '] is displaytype [select], but does not have choices')
            } else if (node[choiceIndex].split('|').length == 2) {
                displaytype = 'radio'
            } else {
                displaytype = 'select'
                if (log.TRACE) log.trace('[' + nodeName + '] ' + node.choices)
            }
        }

        //TODO: quick-fix move into IDE ScorecardTool-addon
        if (nodeName.match(/MAP[0-9,A-z]+_(VALIDATION|INFO|HINT|WARNING)$/i)) {
            if (fflRegister.defaultValues[fflRegister.visibleIndex][node[fflRegister.visibleIndex]]) {
                node[fflRegister.visibleIndex] = 'Length(' + nodeName + ')'
                frequency = 'none'
                node[frequencyIndex] = 'none'
            }
            displaytype = 'string';
            node[displayOptionsIndex] = nodeName.split("_").pop().toLowerCase();
        } else if (nodeName.match(/MAP[0-9,A-z]+_PARAGRAAF[0-9]+$/i)) {
            node[frequencyIndex] = 'none'
            frequency = 'none'
            displaytype = 'paragraph'
        }

        //we also check nodeName here. With root { .. there are two root nodes, one wihout name.
        if (!node[validIndex] && nodeName) {
            //valid formula's (this will become more complex soon valid(list<predicate,message>) now predicate,message
            //info: patternIndex is language-specific (f.e. email- regular expression)
            const validFormulas = []
            //pattern is optional
            if (patternIndex && node[patternIndex]) validFormulas.push("REGEXPMATCH(" + node[patternIndex] + ',' + nodeName + ')');
            //length is optional
            if (lengthIndex && node[lengthIndex]) validFormulas.push('Length(' + nodeName + ') ' + node[lengthIndex]);
            //range is optional
            if (rangeIndex && node[rangeIndex]) validFormulas.push('(' + node[rangeIndex].replace(/(>|>=|<|<=)/gi, nodeName + ' $1') + ')');
            if (datatype == 'number') validFormulas.push('not isNaN(OnNA(' + nodeName + ',null))');
            //its also only interesting when its a required field and entered
            // or when its entered and required
            //' + node[nameIndex] + '.required &&
            //valid formulas are only interesting when entered OR required
            if (validFormulas.length > 0) node[validIndex] = 'If(' + validFormulas.join(' And ') + ',"","Enter valid input.")'
        }

        const uiNode = SolutionFacade.createUIFormulaLink(solution, nodeName, 'value', self.parseFFLFormula(indexer, valueFormula, nodeName, 'value', datatype, workbook.context), displaytype, frequency, null, parentId);

        //hierarchical visibility
        const visibleFormula = node[fflRegister.visibleIndex];
        if (parentId) {
            node[fflRegister.visibleIndex] = fflRegister.defaultValues[visibleIndex][visibleFormula] ? parentId + '.visible' : parentId + '.visible and ' + visibleFormula
        }

        if (fixed_decimals) uiNode.decimals = parseInt(fixed_decimals);
        if (display_options) uiNode.display_options = display_options
        if (data_options) uiNode.data_options = data_options

        //should not be needed...
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
                uiNode.datatype = 'string' //Will story string-based values (Jan,Piet,123Jaar,Etc..)
                if (tuples.length > 0) {
                    uiNode.tupleDefinitionName = tuples[tuples.length - 1].rowId;
                    uiNode.tupleProperty = true
                }
                tuples[depth] = uiNode
            } else {
                uiNode.tupleDefinitionName = tuples[tuples.length - 1].rowId;
                uiNode.tupleProperty = true
            }
        }

        if (node[fflRegister.options_titleIndex] == 'locked') uiNode.title_locked = true

        uiNode.datatype = datatype;

        SolutionFacade.createUIFormulaLink(solution, nodeName, 'title', self.parseFFLFormula(indexer, title, nodeName, 'title', null, workbook.context), undefined, frequency, null, null);

        for (var i = 0; i < formulaIndexes.length; i++) {
            const index = formulaIndexes[i];
            if (node[index]) {
                if (!fflRegister.defaultValues[index] || !fflRegister.defaultValues[index][node[index]]) {
                    SolutionFacade.createUIFormulaLink(solution, nodeName, indexer.schema[index], self.parseFFLFormula(indexer, node[index], nodeName, indexer.schema[index], null, workbook.context), undefined, frequency, null, null);
                }
            }
        }
    });
    //think about formula-sets, same ritual as trend + notrend formulasets
    return solution;
}

/**
 * @param {optional} modelName
 */
RegisterToLMEParser.prototype.parseFFLFormula = function(indexer, formula, nodeName, col, type, context) {
    if (!formula) return type == 'string' ? AST.STRING("") : type == 'number' ? {
        "type": "Identifier",
        "name": 'NA'
    } : {
        "type": "Identifier",
        "name": 'null'
    }
    var finparse = col == 'choices' ? FinFormula.finChoice(formula) : FinFormula.parseFormula(formula)
    //allow multi-language here
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
        if (global.IDE_DEBUGMODUS) context.audittrail.addRow(['MODEL', 'ERROR', nodeName, col, '', '', '', e.toString(), formula, null, finparse])
    }
    return formulaReturn;
}

exports.RegisterToLMEParser = RegisterToLMEParser;
SolutionFacade.addParser(RegisterToLMEParser.prototype);