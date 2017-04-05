var visitor = require('../../fesjs/JSVisitor');
var GenericModelFile = require('../../fesjs/GenericModelFile');
var AST = require('../../fesjs/AST');
var uimodel = require('../../fesjs/UIService');
var bracketparser = require('./bracketparser');
var finformula = require('./FinFormula.js');
var esprima = require('esprima');
var logger = require('ff-log');

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

/*var nodePropertiesMapping =
 {
 data_options: unscalable,
 options_title: locked
 }*/
var parser = {
    name: 'ffl',
    status: 'green',
    headername: '.finance ffl',
    parse: function (data, workbook) {
        var log = {variables: []};
        //convert FFL into JSON (Generic)
        var json = bracketparser.parse(data);

        //lookup  modelName, we need this in the process;
        //all nodes will be given the SolutionName member as ID of its corresponding SolutionName
        var solutionName = findSolutionNameFromFFLFile(json);
        //Create a Solution that will contain these formulas
        var solution = uimodel.create(solutionName);
        //iterate all Elements, containing Variables and properties(Generic), just Walk trough JSON
        visitor.travelOne(json, null, function (keyArg, node) {
            if (keyArg === null) {
            }
            else {
                var tuple = keyArg.startsWith('tuple ');
                if ((keyArg.startsWith('variable ') || tuple)) {

                    var refersto = node.refer;
                    var nodeName = stripVariableOrtuple(keyArg, node);
                    var parent = visitor.findPredicate(node, StartWithVariableOrTuplePredicate)
                    var parentId = (parent === undefined ? undefined : stripVariableOrtuple(parent._name, parent));

                    addnode(log, solution, nodeName, node, parentId, undefined, tuple);
                }
            }
        });
        logger.debug('Added variables [' + log.variables + ']')
        return solution;
    },
    deParse: function (rowId, workbook) {
        var fflSolution = uimodel.create(workbook.modelName)
        if (rowId) {
            var startuielem = uimodel.getUI(workbook.modelName, rowId, 'value')
        }
        uimodel.visit(startuielem, function (elem) {
            //JSON output doesn't gurantee properties to be in the same order as inserted
            //so little bit tricky here, wrap the node in another node
            //add to its wrapper a child type []
            //insert nodes in that array
            var uielem = {};
            //for now all nodes are variables
            var realObject = {}
            var formulaProperties = workbook.gatherProperties(elem.rowId);
            for (var key in formulaProperties) {
                var formula = formulaProperties[key];
                var finFormula;
                if (key === 'choices') {
                    finFormula = finformula.toJavascriptChoice(formula);
                }
                else {
                    finFormula = finformula.javaScriptToFinGeneric(formula);
                }
                if (finFormula != 'undefined') {
                    logger.debug('[' + finFormula + ']');
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
            fflSolution.setPreparser(bracketparser.deparseRegex);
            fflSolution.addNodeToCorrespondingPlaceInHierarchie(elem.parentrowId, elem.rowId, uielem);
        });

        var stringify = fflSolution.stringify();
        return stringify;
    }
};
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
    //this is just a fallback, the bracketparser sometimes fails variable + variablename refers to othervariable
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
    default: 'StringAnswerType',
    select: 'ListAnswerType',
    undefined: 'StringAnswerType',
    currency: 'AmountAnswerType',
    //date: 'DateAnswerType',//requires a converter to work
    date: 'TextAnswerType',
    percentage: 'PercentageAnswerType',
    memo: 'MemoAnswerType',
    //reversed
    StringAnswerType: "StringAnswerType",
    ListAnswerType: "select",
    AmountAnswerType: "currency",
    TextAnswerType: "default",
    PercentageAnswerType: "percentage",
    MemoAnswerType: "memo",
    chart: "chart",
    line: "line"
}
var formulaMapping = {
    title: 'title',
    locked: 'locked',
    visible: 'visible',
    inputRequired: 'required',
    choices: 'choices'
}
var reversedFormulaMapping = {
    title: 'title',
    locked: 'locked',
    visible: 'visible',
    required: 'inputRequired',
    choices: 'choices',
    value: 'formula',
    displayAs: 'displaytype'
}
var defaultValue = {
    visible: {
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

//this is where it is all about, the variable with his properties
//we should make it more Generic so i can use it for fin language parser
function addnode(log, solution, rowId, node, parentId, referId, tuple) {
    log.variables.push(rowId);
    if (rowId === undefined || rowId.trim() === '') {
        logger.info('NULL rowId')
        return;
    }

    var mappedDisplayType = displayAsMapping[node.displaytype];
    //this should inherent work while adding a UINode to the Solution, checking if it has a valid displayType
    solution.addDisplayType(mappedDisplayType);

    var uiNode = GenericModelFile.addSimpleLink(solution, rowId, 'value', node.formula ? parseFormula(node.formula) : AST.UNDEFINED(), mappedDisplayType);

    uiNode.referId = referId;
    solution.setDelegate(uiNode, node);
    solution.setParentName(uiNode, parentId);

    if (tuple) {
        uiNode.tuple = true;
    }
    for (var key in formulaMapping) {
        if (node[key] !== undefined) {
            //use the ASTCache for this later on
            //this could cause problems when internal formula's are requesting its value
            if (defaultValue[key] && defaultValue[key][node[key]]) {
                logger.debug('Default [' + key + '] formula, skipping. [' + node[key] + '][' + rowId + ']');
                continue;
            }
            GenericModelFile.addSimpleLink(solution, rowId, formulaMapping[key], parseFormula(node[key]));
        }
    }
}
function parseFormula(formula) {
    var formulaReturn = 'undefined';
    try {
        if (formula !== undefined) {
            formulaReturn = esprima.parse(formula).body[0].expression
        }
    }
    catch (e) {
        logger.error('unable to parse [' + formula + '] returning it as String value', e);
        formulaReturn = AST.STRING(formula);
    }
    return formulaReturn;
}
GenericModelFile.addParser(parser);