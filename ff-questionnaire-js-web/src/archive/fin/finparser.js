var FESFacade = require('../../../../ff-fes/fesjs/FESFacade');
var SolutionFacade = require('../../../../ff-fes/fesjs/SolutionFacade');
var AST = require('ast-node-utils').ast;
var lineparser = require('./finToJson.js');
var finformula = require('../FinFormula/FinFormula.js');
var uimodel = require('../clientscorecard/uimodel.js');
var Solution = require('../fesjs/Solution.js');
var assert = require('assert');
var Stack = require('stack-adt');
var esprima = require('esprima')
var escodegen = require('escodegen')
var logger = require('tracer').console();
require('../../../node_modules/excel-formula/dist/excel-formula.min.js')
var excelFormulaUtilities = global.excelFormulaUtilities;
//FIN->JavaScript
var parser = {
    name: 'fin',
    status: 'yellow',
    headername: '.finance fin',
    parse: function (data)
    {
        //should return a parseResult
        //.with a .valid
        var solution;
        var parseResult = lineparser.parse(data);
        if (!parseResult.valid)
        {
            solution = uimodel.create();
        }
        else
        {
            solution = uimodel.create(parseResult.solutionName);

            //at some lines we need to remember some state, f.e. if it were Trend formula or Visible formula
            var finVariables = parseResult.orderedByType.variables;
            console.time('jsonToNode')

            createVariableTree(finVariables, solution);
            //add all Formula Groups, Choices, Trend, NoTrend, Hint, Title
            createFormulaGroupsSafe(solution, parseResult.orderedByType.formulas);
            console.timeEnd('jsonToNode')
        }
        return solution;
    },
    deParse: function (rowId)
    {
        var finExport = uimodel.create()
        var exportString = "";
        //= finExport.getName() + "\n\n";
        //exportString += ".Variables\n.Variables\n";
        var formulasString = {};
        if (rowId)
        {
            var startuielem = uimodel.getOrCreateUI(rowId, 'value')
        }

        uimodel.visit(startuielem, function (node)
        {
            var formulaProperties = finExport.gatherProperties(FESFacade.getFormula, FESFacade.properties, node.rowId);
            // exportString += createFinVariableRow(node, formulaProperties['title'] || '');
            for (var key in formulaProperties)
            {
                if (formulasString[key] === undefined)
                {
                    formulasString[key] = "";
                }
                if (formulaProperties[key] !== 'undefined')
                {
                    formulasString[key] = formulasString[key] + createFinFormulaRow(key, node, formulaProperties[key]);
                }
            }
        });

        for (var key in formulasString)
        {
            if (key !== 'title')
            {
                exportString += "\n.Formulas " + key + "\n" + formulasString[key];
            }
        }
        return exportString;
            //+ '\n.Quit';
    }
};
function createVariableTree(variables, solution)
{
    if (variables.length == 0)
    {
        //nothing to do
        return;
    }
    console.time('buildHierarchy')
    var cache = {};
    var stack = new Stack();

    var rootVariable = variables[0];
    var root = rootVariable;
    stack.push(root);
    addNode(solution, rootVariable, undefined)
    //this algorithm required to know the last added variable for a parent.
    cache[stack.peek().name] = rootVariable;
    var delta = 0;
    var count = 0;

    //FIN contains duplicate variables, we have to do something fun with it later on
    var allreadyAddedVariables = {};
    for (var i = 1; i < variables.length; i++)
    {
        var variable = variables[i];
        if (allreadyAddedVariables[variable.name])
        {
            variable.name = variable.name + count++;
        }
        allreadyAddedVariables[variable.name] = true;
        delta = variable._depth - (stack.size() - 1);
        if (delta > 0)
        {
            assert.equal(delta, 1);
            stack.push(cache[stack.peek().name])
        }
        while (delta < 0)
        {
            stack.pop()
            delta++
        }
        cache[stack.peek().name] = variable;
        addNode(solution, variable, stack.peek())
    }
    console.timeEnd('buildHierarchy')
}
function createFormulaGroupsSafe(solution, formulas)
{
    for (var i = 0; i < formulas.length; i++)
    {
        createFormulaSafe(solution, formulas[i]);
    }
}
function createFormulaSafe(solution, formula)
{
    var code = formula.formula;
    var ast;
    //we open a try-catch literally everything could be in there that could make no sense at all, model builder mistake etc..
    if (ASTCache[code])
    {
        ast = ASTCache[code]();
    }
    else
    {

        try
        {
            //so this can fail easy, impossible to fix, external managed etc.
            ast = esprima.parse(code).body[0].expression;
        }
        catch (e)
        {
            logger.log('cannot parse: ' + JSON.stringify(formula));
            //just add the formula as String value.. maybe it makes sence ..
            ast = AST.STRING(code);
        }
    }
    var uiNode = SolutionFacade.createUIFormulaLink(solution, formula.name, formula.property, ast, formula.displayAs)
    if (formula._delegate)
    {
        solution.setDelegate(uiNode, formula._delegate);
        solution.setParentName(uiNode, formula.parentName);
    }
}
function createFinVariableRow(variable, title)
{
    var str = title;
    var pad = "                                                                                    ";
    var and = str + pad.substring(0, pad.length - str.length);

    return "PPP      X     " + variable._depth + "          " + and.substring(0, 81) + "\\" + variable.rowId + "\n";
}
function createFinFormulaRow(key, variable, formula)
{
    var str = variable.rowId;
    var pad = "                                      ";
    var and = str + pad.substring(0, pad.length - str.length);
    var deparsed = finformula.javaScriptToFinGeneric(formula);
    var formattedFormula;
    try
    {
        formattedFormula = excelFormulaUtilities.formatFormula(deparsed, {});
    }
    catch (e)
    {
        logger.log('Unable to prettyfy:' + e);
        formattedFormula = deparsed;
    }
    return and + " = " + formattedFormula + "\n";
}
/*space: no special presentation format.
 'D': Display the value of the variable as a date, an optional code in column 7 is the format code. Not possible in combination with a flow variable (a "F", "D", "I" or "M" in column 9).
 'C': a Choice variable, specify the options in the Choices section.
 'T': a Choice variable with that shows a list of columns. The value of the variable is the Internal column number.
 '%': Show the variable as a percentage.
 'G': Display the variable in Growth view. The variable should be a copy-variable.
 'I': Integer variable. The format code in column 7 is normally zero. A positive format code specifies the with of the number, zero's are added before the number in order to reach the width.
 'M': Memo = memoscreen. Memos per period are possible.
 */
var displayAsMapping = {
    C: 'select',
    T: 'select',
    " ": 'StringAnswerType',
    undefined: 'TextAnswerType',
    G: 'AmountAnswerType',
    I: 'StringAnswerType',
    //date: 'DateAnswerType',//requires a converter to work
    //Causing infinite digest cycles, soemthing with Date types with functions returning either 1 or Undefined.
    D: 'StringAnswerType',
    //D: 'DateAnswerType',
    '%': 'PercentageAnswerType',
    M: 'MemoAnswerType'
}
var ASTCache = {
    "undefined": AST.UNDEFINED,
    "On": AST.TRUE,
    "No": AST.FALSE,
    "Off": AST.FALSE,
    "True": AST.TRUE,
    "False": AST.FALSE
}
/*
 Column 21: Input required
 space: default situation: no input required.
 '+' or 'R': input is required for this variable. This will be checked when going to a higher level or when the datafile is closed. If no input, a error-message will occur
 Column 1: Protection code of Description
 Protection code of the description of a variable (Title)
 'I': unprotected
 'P': protected
 'N', 'X' or space: entire variable is hidden.
 Apart from the protection code column 1 can also contain:
 'C': Comment displayed in a hint window belonging to variable (same as user comments). NOTE: Not recommended, use the Hints (cmd), see also the Hints specification (fin) section.

 */
/*
 Columns 2-5: Formula set protection code  TODO: using title for the one-col formulaset
 Protection codes per Formulaset:
 Column 1 Title
 Column 2 Notrend (History)
 Column 3 Trend (Forecast)
 Column 4 User
 'I': unprotected
 'P': protected
 'X': hidden, underlying level is hidden as well.
 'N': data is hidden, but underlying level can be reached. It is a node.
 */
var protection = {
    ' ': false,
    'I': false,
    'P': true,
}
function addNode(solution, node, parentId)
{
    var rowId = node.name;
    if (rowId === 'root')
    {
        return
    }
    if (solution.hasNode(rowId))
    {
        console.info('Dupe..')
    }
    var parentName;
    if (parentId !== undefined && parentId !== null)
    {
        parentName = parentId.name;
    }

    createFormulaSafe(solution, {_delegate: node, parentName: parentName, displayAs: displayAsMapping[node.displaytype], name: rowId, property: 'value', formula: 'undefined'});
    createFormulaSafe(solution, {name: rowId, property: 'title', formula: node.title});

    //locked and visibility
    if (node.protection === 'I')
    {
        SolutionFacade.createUIFormulaLink(solution, rowId, 'locked', AST.TRUE())
    }
    else if (node.protection === 'X' || node.protection === ' ' || node.protection === 'N')
    {
        SolutionFacade.createUIFormulaLink(solution, rowId, 'visible', AST.FALSE())
    }
    if (node.required === '+' || node.required === 'R')
    {
        SolutionFacade.createUIFormulaLink(solution, rowId, 'required', AST.TRUE())
    }

    if (node.hint.trim().length > 0)
    {
        SolutionFacade.createUIFormulaLink(solution, rowId, 'hint', AST.STRING(node.hint))
    }
}
FESFacade.addParser(parser);