var JSVisitor = require('../../src/JSVisitor');
var SolutionFacade = require('../../src/SolutionFacade')
var AST = require('../../../ast-node-utils/index').ast;
var FflToJsonConverter = require('./FflToJsonConverter');
var FinFormula = require('./FinFormula');
var esprima = require('esprima');
var log = require('ff-log');
//DisplayAs require a Date object, need to add Converter for DisplayTypes.
//@formatter:off
/*variable FES_LAYOUTNR
 {
 datatype: number;
 frequency: document;
 displaytype: select;

 formula:FES_EXCHANGE_RATES+FES_LAYOUT;
 data_options: unscalable;
 title: "Layout";

 choices: "0: NA|1: IFRS-EU|2: IFRS|48: Polish";
 top_blanklines: 1;
 locked: On;
 visible: 1;
 options_title: locked;
 options_notrend: locked;
 options_trend: locked;
 }*/

//@formatter:on

function FFLParser() {
}

FFLParser.prototype.name = 'ffl'
FFLParser.prototype.status = 'green';
FFLParser.prototype.headername = '.finance ffl';
FFLParser.prototype.parseData = function(data, workbook) {
    var logVars = {variables: []};
    //convert FFL into JSON (Generic)
    var json = FflToJsonConverter.parseFFL(data);
    //lookup  modelName, we need this in the process;
    //all nodes will be given the SolutionName member as ID of its corresponding SolutionName
    var solutionName = findSolutionNameFromFFLFile(json);
    //Create a Solution that will contain these formulas
    var solution = SolutionFacade.createSolution(solutionName);
    //iterate all Elements, containing Variables and properties(Generic), just Walk trough JSON
    JSVisitor.travelOne(json, null, function(keyArg, node, context) {
        if (keyArg === null) {
            for (var key in node) {
                if (!key.startsWith("_") && !key.startsWith('model ') && !key.startsWith("/")) {
                    SolutionFacade.addFunction(solution, key, parseFFLFormula(node[key], node, key))
                }
            }
        }
        else {
            var tupleDefiniton = keyArg.startsWith('tuple ');
            if ((keyArg.startsWith('variable ') || tupleDefiniton)) {
                var refersto = node.refer;
                var nodeName = stripVariableOrtuple(keyArg, node);


                var parent = JSVisitor.findPredicate(node, StartWithVariableOrTuplePredicate)
                var parentId = (parent === undefined ? undefined : stripVariableOrtuple(parent._name, parent));
                if (tupleDefiniton) {
                    context.nestTupleDepth++;
                }
                if (context.tupleDefinition) {
                    if (log.TRACE) log.trace('tuple def for [%s].[%s] is [%s]', nodeName, context.nestTupleDepth, context.tupleDefinition);
                }
                addnode(logVars, solution, nodeName, node, parentId, tupleDefiniton, !tupleDefiniton && context.tupleDefinition, context.tupleDefinition, context.nestTupleDepth);
                if (tupleDefiniton) {
                    context.tupleDefinition = nodeName;
                }
            }
        }
    }, {nestTupleDepth: 0});
    if (log.TRACE) log.trace('Add variables [' + logVars.variables + ']')
    return solution;
}
FFLParser.prototype.deParse = function(rowId, workbook) {
    var fflSolution = SolutionFacade.createSolution(workbook.getSolutionName());
    workbook.visitProperties(workbook.getNode(rowId || 'root'), function(elem) {
        //JSON output doesn't gurantee properties to be in the same order as inserted
        //so little bit tricky here, wrap the node in another node
        //add to its wrapper a child type []
        //insert nodes in that array
        var uielem = {};
        //for now all nodes are variables
        var realObject = {}
        var formulaProperties = SolutionFacade.gatherFormulaProperties(workbook.getSolutionName(), workbook.properties, elem.rowId);
        for (var key in formulaProperties) {
            var formula = formulaProperties[key];
            var finFormula;
            if (key === 'choices') {
                finFormula = FinFormula.toJavascriptChoice(formula);
            }
            else {
                finFormula = FinFormula.javaScriptToFinGeneric(formula);
            }
            if (finFormula != 'undefined') {
                log.debug('[' + finFormula + ']');
                realObject[reversedFormulaMapping[key]] = finFormula;
            }
            if (reversedFormulaMapping[key] === 'locked') {
                /*realObject['options_notrend'] = formulaProperties[key];
                 realObject['options_trend'] = formulaProperties[key];*/
            }
        }
        realObject.displaytype = displayAsMapping[elem.displayAs];

        uielem['variable ' + elem.rowId] = realObject;
        fflSolution.addNode(elem.rowId, uielem);
        fflSolution.restoreDelegateProperties(realObject, elem);
        fflSolution.setPreparser(FflToJsonConverter.deparseRegex);
        fflSolution.addNodeToCorrespondingPlaceInHierarchie(elem.parentrowId, elem.rowId, uielem);
    });

    var stringify = fflSolution.stringify();
    return stringify;
}

function findSolutionNameFromFFLFile(json) {
    for (var key in json) {
        if (key.toLowerCase().startsWith('model ')) {
            return key.split(' ')[1].toUpperCase();
        }
    }
    return undefined;
}

function stripVariableOrtuple(name, node) {
    if (!name) {
        return undefined;
    }
    //this is just a fallback, the FflToJsonConverter sometimes fails variable + variablename refers to othervariable
    if (name.indexOf('+') > -1) {
        //something wrong while parsing regex, trying to fix it here,
        name = name.replace(/(\+|-|\=)\s*/gm, '');
        node.modifier = '+';
    }
    else if (name.indexOf('-') > -1) {
        name = name.replace(/(\+|-|\=)\s*/gm, '');
        node.modifier = '-';
    }
    else if (name.indexOf('=') > -1) {
        name = name.replace(/(\+|-|\=)\s*/gm, '');
        node.modifier = '=';
    }
    if (name.split(' ').length < 2) {
        return undefined;
    }

    //(Variable NetWorth Implies AnotherVariable) becomes NetWorth
    var secondWordOfLine = name.split(' ')[1];
    //Strip Variable Modifiers (+/-/=),
    var replace = secondWordOfLine.replace(/\W/g, '');
    if (replace === '') {
        return undefined;
    }
    return replace;
}

function StartWithVariableOrTuplePredicate(node) {
    if (node === undefined || !node._parentKey) {
        return false;
    }
    return (node._parentKey.startsWith('variable') || node._parentKey.startsWith('tuple'));
}

var displayAsMapping = {
    default: 'string',
    select: 'select',
    radio: 'select',//reversed, back to original
    undefined: 'string',
    currency: 'currency',
    paragraph: 'paragraph',
    date: 'date',//requires a converter to work
    percentage: 'percentage',
    memo: 'memo',
    //reversed
    string: "string",
    chart: "chart",
    polarchart: "polarchart",
    customwidget: "customwidget",
    piechart: "piechart",
    line: "line"
}
var formulaMapping = {
    valid: 'valid',
    title: 'title',
    hint: 'hint',
    locked: 'locked',
    visible: 'visible',
    inputRequired: 'required',
    choices: 'choices'
}
var reversedFormulaMapping = {
    title: 'title',
    valid: 'valid',
    hint: 'hint',
    locked: 'locked',
    visible: 'visible',
    required: 'inputRequired',
    choices: 'choices',
    value: 'formula',
    notrend: 'formula_notrend',
    trend: 'formula_trend',
    displayAs: 'displaytype'
}
var defaultValue = {
    visible: {
        undefined: true,
        '1.0': true,
        '1': true,
        'true': true,
        'On': true
    },
    locked: {
        '0.0': true,
        '0': true,
        'false': true,
        'Off': true,
        'No': true
    },
    required: {
        '0.0': true,
        '0': true,
        'false': true,
        'No': true,
        'Off': true
    }
}
const supportedFrequencies = {
    document: true,
    column: true,
    none: true,
    timeline: true
}
//this is where it is all about, the variable with his properties
//we should make it more Generic so i can use it for fin language parser
function addnode(logVars, solution, rowId, node, parentId, tupleDefinition, tupleProperty, tupleDefinitionName, nestedTupleDepth) {
    logVars.variables.push(rowId);
    if (rowId === undefined || rowId.trim() === '') {
        log.error('Invalid FFL file detected while parsing. No name declared for node [' + node + ']')
        return;
    }
    var mappedDisplayType = displayAsMapping[node.displaytype] || node.displaytype;
    if (mappedDisplayType == 'select') {
        if (!node.choices) {
            if (log.debug) log.debug('Row [' + rowId + '] is type [select], but does not have choices')
        } else if (JSON.parse(node.choices).length == 2) {
            mappedDisplayType = 'radio'
        } else {
            if (log.TRACE) log.trace('[' + rowId + '] ' + node.choices)
        }
    }
    /*if (parentId && parentId.match(/Q_MAP[0-9]{2}/)) {
        //   mappedDisplayType = "";
    }*/
    //this should inherent work while adding a UINode to the Solution, checking if it has a valid displayType
    solution.addDisplayType(mappedDisplayType);

    /**
     * This is where formula-sets are combined.
     * if the node has and trend and notrend formula, the target formula will be x.trend ? node.formula_trend : valueFormula
     * Ofcourse this will be for every formulaset that exists in the node
     * Document formulaset is notrend, formula = notrend
     * This way it would also be possible to have and formulaset 'orange', 'document' and trend formulasets
     */
    var trendformula = node.formula_trend;
    let valueFormula = node.formula_notrend || node.formula;//notrend is more specific than formula
    if (trendformula !== undefined && valueFormula !== trendformula) {//first of all, if both formula's are identical. We can skip the exercise
        valueFormula = 'x.istrend ? ' + trendformula + ':' + valueFormula;
    }
    //TODO: quick-fix move into IDE -addon
    if (rowId.match(/MAP[0-9]+_(VALIDATION|INFO|HINT|WARNING)$/i)) {
        if (defaultValue.visible[node.visible]) {
            node.visible = 'Length(' + rowId + ')'
            node.frequency = 'none'
        }
    } else if (rowId.match(/MAP[0-9]+_PARAGRAAF[0-9]+$/i)) {
        node.frequency = 'none'
        mappedDisplayType = 'paragraph'
    }
    if (tupleDefinition) {
        mappedDisplayType = 'tuple_add'
    }
    var uiNode = SolutionFacade.createUIFormulaLink(solution, rowId, 'value', valueFormula ? parseFFLFormula(valueFormula, 'none', rowId) : (mappedDisplayType == 'string' ? AST.STRING('') : AST.UNDEFINED()), mappedDisplayType);
    uiNode.displayAs = mappedDisplayType;

    if (node.options_title == 'locked') uiNode.title_locked = true

    if (!supportedFrequencies[node.frequency || 'document']) {//default frequency is document
        throw Error('Invalid frequency [' + node + ']');
    }
    uiNode.frequency = node.frequency;
    if (node.datatype !== undefined) {
        uiNode.datatype = node.datatype;
    }
    if (node.fixed_decimals !== undefined) {
        uiNode.decimals = parseInt(node.fixed_decimals);
    }
    solution.setDelegate(uiNode, node);
    solution.setParentName(uiNode, parentId);

    //nestedTupleDepth might be enough
    if (tupleDefinition || tupleProperty) {
        uiNode.tuple = true;
        uiNode.nestedTupleDepth = nestedTupleDepth;
        uiNode.tupleDefinitionName = tupleDefinitionName;
    }
    if (tupleDefinition) {
        log.debug('Found tupleDefinition [%s]', rowId)
        uiNode.tupleDefinition = true;
    }
    else if (tupleProperty) {
        if (log.TRACE) log.trace('Found tupleProperty [%s]', rowId)
        uiNode.tupleProperty = true;
    }
    /**
     * Add hierarchy in visibility
     */
    if (node.visible && parentId) {
        if (defaultValue.visible[node.visible]) {
            node.visible = parentId + '.visible';
        } else {
            node.visible = parentId + '.visible && ' + node.visible
        }
    }
    for (var key in formulaMapping) {
        if (node[key] !== undefined) {
            //use the ASTCache for this later on
            //this could cause problems when internal formula's are requesting its value
            if (defaultValue[key] && defaultValue[key][node[key]]) {
                if (log.DEBUG) {
                    log.debug('Default [%s.%s]-formula. Skipping formula:[%s]', rowId, key, node[key]);
                }
                continue;
            }
            SolutionFacade.createUIFormulaLink(solution, rowId, formulaMapping[key], parseFFLFormula(node[key], key, rowId));
        }
    }
}

function parseFFLFormula(formula, node, row) {
    var formulaReturn = 'undefined';
    try {
        if (formula !== undefined) {
            formulaReturn = esprima.parse(formula).body[0].expression
        }
    }
    catch (e) {
        log.debug('unable to parse [' + formula + '] returning it as String value [' + node + "] : " + row, e);
        formulaReturn = AST.STRING(formula);
    }
    return formulaReturn;
}

SolutionFacade.addParser(FFLParser.prototype);