//BE AWARE THIS TEST CLEARES THE DATABASE BEFORE START
process.dbSchema = 'questjstest';

var DB = require('../archive/backend/db.js');
var DBController = require('../archive/backend/dbcontroller.js');
var assert = require('assert');
var uimodel = require('../archive/clientscorecard/uimodel.js');
var FESFacade = require('../archive/fesjs/FESFacade');
var FunctionMap = require('../archive/fesjs/FunctionMap.js');
var JSWorkBook = require('../archive/fesjs/JSWorkBook.js');
var bootstrap = require('../archive/fesjs/formula-bootstrap.js');
var esprima = require('esprima');
//SEEMS LIKE A VERY COMPLEX Test.
//Hopefully nothing breaks here, cause its not working
//We also need a clean Database in order to make it work

var wb = new JSWorkBook();
function createNode(i, formulaId, rowId, parentId, colId, property)
{
    return {
        name: rowId + '_' + colId,
        rowId: 'C' + i,
        colId: colId,
        displayAs: property,
        formulaId: formulaId,
        uimodelId: parentId,
        parentName: parentId === undefined ? undefined : 'root_value'
    };
}
function createSolution(solutionName, parentId)
{
    var solution = {
        name: solutionName,
        formulas: [{
            "name": "C1_title",
            "type": "noCacheLocked",
            "formulaDependencys": [],
            "original": "'DUMMY MODEL'",
            "parsed": "'DUMMY MODEL'"
        }, {
            "name": "trueClause",
            "type": "noCacheLocked",
            "formulaDependencys": [],
            "original": "true",
            "parsed": "true"
        }],
        nodes: [
            {
                name: solutionName + '_root_value',
                rowId: 'root',
                colId: 'value',
                displayAs: 'SectionType'
            }
        ]
    };
    for (var i = 0; i < 100; i++)
    {
        var formulaName = solutionName + '_C' + i;
        solution.formulas.push({
            "name": formulaName,
            "parsed": "'DUMMY MODEL'"
        });
    }
    for (var i = 0; i < 50; i++)
    {
        var rowId = solutionName + '_C' + i;

        solution.nodes.push(createNode(i, 1, rowId, parentId, 'value', 'TextAnswerType'));
        solution.nodes.push(createNode(i, 1, rowId, undefined, 'title', 'TextAnswerType'));
        solution.nodes.push(createNode(i, 2, rowId, undefined, 'visible', 'PropertyType'));
    }
    return solution
}
var SolutionDUMMY = createSolution('DUMMY', 1);
function createFormula(value, rowId, colId)
{
    //create a formula for the element
    var ast = esprima.parse(value);
    var newFormulaId = FESFacade.addLink(rowId, colId, true, ast);
    var newFormula = FESFacade.findFormulaByIndex(newFormulaId);
    //integrate formula (parse it)
    FunctionMap.init(bootstrap.parseAsFormula, [newFormula], true);

    //print the 500 value
    assert.equal(value, FESFacade.getValue(rowId, colId));
};
function addUiElement(rowId, colId)
{
    //create UI element
    uimodel.addProperty(rowId, colId, {
        displayAs: 'AmountAnswerType'
    }, 'root_value');
}

function testSolution(solutionName)
{
    //create new Solution
    var solution = uimodel.create(solutionName);

    addUiElement('A10', 'value');

    createFormula(501, 'A10', 'value');
    //override first formula
    createFormula(501, 'A10', 'value');

    var Solution = FESFacade.produceSolution();
    assert.equal(Solution.formulas.length, 1);
    assert.equal(Solution.nodes.length, 2);

    //now add another UI element
    addUiElement('A11', 'value');
    createFormula(502, 'A11', 'value');

    Solution = FESFacade.produceSolution();
    assert.equal(Solution.formulas.length, 2);
    assert.equal(Solution.nodes.length, 3);
}
//create Solution
testSolution('TESTMODEL');
//check refs:
var ui = uimodel.getOrCreateProperty('A10', 'value');
var formula = FESFacade.findFormula(ui);
assert.equal(Object.keys(formula.refs).length, 1);
//combine solutions, current solution is set to TESTMODEL2
testSolution('TESTMODEL2');
var ui = uimodel.getOrCreateProperty('A10', 'value');
var formula = FESFacade.findFormula(ui);
assert.equal(Object.keys(formula.refs).length, 2);

//save TESTMODEL2 to database
var currentSolution = FESFacade.produceSolution();
DB.sequelize.sync({force: true}).then(function ()
{
    return DBController.update('FORMULA', SolutionDUMMY.formulas);
}).then(function ()
{
    //add the DUMYM model
    return DBController.update('SOLUTION', {
        name: SolutionDUMMY.name,
        nodes: SolutionDUMMY.nodes
    });
}).then(function ()
{
    //first store all Formula's, not sure if going to do this on the server side or client. presumable client. to reparse the formula's
    return DBController.update('FORMULA', currentSolution.formulas);
}).then(function (formulas)
{
    FESFacade.mergeFormulas(formulas);
    assert.equal(501, wb.get('A10'));
    //now update all formula's, they have id's now, be aware in this testCase its the same object, in the client. these are two different objects
}).then(function ()
{
    //now we have to make the HasMany and HasOne in update function, since formula reference is given by Name, and we want to bind by ID
    return DBController.update('SOLUTION', {
        name: currentSolution.name,
        nodes: currentSolution.nodes
    });
}).then(function ()
{
    //switch to the first Solution
    uimodel.create('TESTMODEL');
    assert.equal(501, wb.get('A10'));
    var rootNode = uimodel.getRootNode();

}).then(function ()
{
    //now we gonna inject a never loaded model from the database.
    //retrieve the DUMMY model from the database;
    var lookupQuestion = {
        id: true,
        name: 'DUMMY',
        nodes: {
            rowId: true,
            colId: true,
            displayAs: true,
            formulaId: true,
            formula: {}
        },
        formulas: {
            original: true,
            type: true,
            parsed: true
        }
    }
    return DBController.get('SOLUTION', lookupQuestion);
}).then(function (data)
{
    //these three methodes are business logic.
    FESFacade.bulkInsertFormula(data.formulas);
    uimodel.bulkInsert(data);
    FunctionMap.init(bootstrap.parseAsFormula, data.formulas, true);
    //these three methodes are business logic.

    var rootNode = uimodel.find(uimodel.getRootNode().nodes[0]);

    var localFormula = FESFacade.findFormula(rootNode);
    assert.equal('DUMMY MODEL', FunctionMap.apiGet(localFormula, FESFacade.x, 0, 0));
    console.info(localFormula);
}).then(function ()
{
    //change a formula to the DUMMY model
    createFormula(1000, 'C0', 'value');
    //check local formula
    assert.equal('1000', wb.get('C0'));
    //save the entire thing back to the database
    var currentSolution = FESFacade.produceSolution();
    //first store all Formula's, not sure if going to do this on the server side or client. presumable client. to reparse the formula's
    return DBController.update('FORMULA', currentSolution.formulas);
}).then(function (formulas)
{
    //now merge it again and save to the
    FESFacade.mergeFormulas(formulas);
    //check local formula
    assert.equal('1000', wb.get('C0'));
    //save the entire thing back to the database
    /*    var currentSolution = FESFacade.produceSolution();
     return DBController.update('SOLUTION', {
     name: currentSolution.name,
     nodes: currentSolution.nodes
     });*/
});
