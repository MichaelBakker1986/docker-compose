require('../exchange_modules/ffl/fflparser');//just let it inject into the FESFacade
require('../exchange_modules/screendefinition/screendefparser');//just let it inject into the FESFacade
require('../../ff-math/ff-math');//just let it inject into the FESFacade
var JSWorkBook = require('../fesjs/JSWorkBook');
var JUNIT = require('./JUNIT');
var FESFacade = require('../fesjs/FESFacade');
var PropertiesAssembler = require('../fesjs/PropertiesAssembler');
var FormulaService = require('../fesjs/FormulaService');
var FormulaBootstrap = require('../fesjs/FormulaBootstrap');
var assert = require('assert');
var esprima = require('esprima');
//test basic functionality for an import
var data = JUNIT.getFile('hierarchyTest.ffl');
var FESContext = require('../fesjs/fescontext')
var wb = new JSWorkBook(new FESContext());
//wb.doImport(data, 'ffl');
var singleVariable = JUNIT.getFile('testFFLVariable.ffl');
wb.doImport(singleVariable, 'ffl');
//@formatter:off
/* corresponsing FFL file:
 model TEST uses BaseModel
 {
 root
 {
 variable Q_ROOT
 {
 title : "Q_ROOT";
 formula : 10;
 frequency : document;
 tuple Q_MAP01 refers to TestProperty
 {
 title : "Hint";
 formula : 50;
 locked: On;
 frequency : document;
 variable Q_MAP01_VRAAG1
 {
 title : "Vraag01";
 formula : 100;
 displaytype: select;
 choices: "0:History|1:Projection";
 frequency : document;
 visible: 0;
 }
 }
 variable TestProperty
 {
 title : "TestProperty";
 formula : 200;
 frequency : document;
 choices: 1:Multiple|2:Lening|3:RC|4:Lease|5:Factoring|6:Vastgoed Eigen gebruik|7:Commercieel vastgoed|8:Residentieel vastgoed;
 displaytype: select;
 }
 }
 }
 }
 */
// @formatter:on
//extracting a simular tree
var expectedFFLTree = {
    "variableName": "root",
    "children": [
        {
            "variableName": "Q_ROOT",
            "children": [
                {
                    "variableName": "Q_MAP01",
                    "title": "Hint",
                    "children": [
                        {
                            "variableName": "Q_MAP01_VRAAG1",
                            hidden: true
                        }
                    ]
                },
                {
                    "variableName": "TestProperty",
                    "title": "TestProperty",
                    formula: 200,
                    displaytype: "ListAnswerType",
                    choices: "1:Multiple|2:Lening|3:RC|4:Lease|5:Factoring|6:Vastgoed Eigen gebruik|7:Commercieel vastgoed|8:Residentieel vastgoed"
                }
            ]
        }
    ]
};
var mapping = {
    hidden: 'visible',
    hint: 'hint',
    formula: 'value',
    title: 'title',
    hint: 'hint',
    displaytype: 'displaytype'
}
//so we can make a structure test.
//with all properties.
var actual = JSON.parse(wb.export('screendefinition'));
JUNIT.validateTree(expectedFFLTree, actual, 'children', 'children', function (expected, actual) {
        if (expected.hidden) {
            assert.ok(!wb.get(expected.variableName, 'visible'));
        }
        if (expected.hint) {
            var trim = wb.get(expected.variableName, 'hint');
            assert.ok(trim === expected.hint);
        }
        if (expected.title) {
            var trim = wb.get(expected.variableName, 'title');
            assert.ok(trim === expected.title, JSON.stringify(expected) + ", but was: " + JSON.stringify(trim));
        }
        if (expected.formula) {
            var newVar = wb.get(expected.variableName, 'value');
            assert.ok(newVar === expected.formula);
        }
        if (expected.choies) {
            wb.get(expected.variableName, 'choices');
        }
        if (expected.displaytype) {
            assert.ok(expected.displaytype === actual.displaytype);
            return expected.variableName == actual.name;
        }
        return true;
    }
)
var fflSolution = wb.export('ffl');
assert.notStrictEqual(fflSolution, undefined, 'should return A value');
assert.notStrictEqual(fflSolution, 'should return A value');
//'/KAM/FFL/KAM',
return;
var tests = ['KSP'];
for (var i = 0; i < tests.length; i++) {
    var solutionName = tests[i];
    var data = JUNIT.getFile(solutionName + '.ffl');
    var wb = new JSWorkBook(new FESContext());
    wb.doImport(data, 'ffl');

    var feedback = wb.validate();
    if (!feedback.valid) {
        feedback = wb.fixAll();
    }
    feedback.error.forEach(function (item) {
        console.error('error: ' + item.formulaName + "\r\nreason: [" + item.reason + "]");
    });

    var solution = FESFacade.produceSolution(wb.modelName);
    wb.createFormula(100, 'TestVariable');
    assert.equal(wb.get('TestVariable'), 100);

    assert.ok(feedback.valid);
    console.info('Succes test Solution [' + solutionName + ']');

}
console.info('Test fflImport success')