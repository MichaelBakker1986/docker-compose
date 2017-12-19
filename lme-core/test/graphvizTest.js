/**
 * file creator, not tested every cycle.
 *
 * @type {ok}
 */
var assert = require('assert');
require('../exchange_modules/ffl/fflparser.js');
require('../exchange_modules/presentation/presentation.js');
require('../../math')
var CalculationFacade = require('../').CalculationFacade;
var FESContext = require('../src/fescontext');
var FormulaService = require('../src/FormulaService');
var SolutionFacade = require('../src/SolutionFacade');
var JUNIT = require('../test/JUNIT');
CalculationFacade.addFunctions(require('../../formulajs-connect/ff-formulajs').formulajs);
CalculationFacade.addFunctions(require('../../excel-connect/excel-connect').xlsxLookup);
var log = require('ff-log');
var WorkBook = require('../src/JSWorkBook.js');
var JUNIT = require('./JUNIT.js');
var fs = require('fs');

var fflTestModels = ['../../lme-model-tests/resources/KSP'];

function correctFileName(name) {
    return name.replace(/^[^_]+_([\w]*)_\w+$/gmi, '$1');
}

for (var i = 0; i < fflTestModels.length; i++) {
    var fflModelName = fflTestModels[i];
    var data = JUNIT.getFile(fflModelName + '.ffl');
    var wb = new WorkBook(new FESContext());

    wb.importSolution(data, 'ffl');
    var validate = wb.validateImportedSolution();
    wb.fixProblemsInImportedSolution();
    assert.ok(wb.validateImportedSolution().valid);
    var fflExport = wb.export('ffl');
    var screendefExport = wb.export('presentation');
    var allnodes = screendefExport.tree._tree.nodes;

    var graphvizModelTree = '';
    var depVariableNames_with_formulas = "";
    var depVariableNames = "";

    for (var nodeName in allnodes) {
        var node = allnodes[nodeName];
    }

    wb.visitProperties(wb.getSolutionNode('KSP_root'), function(child) {
        graphvizModelTree += createRow(child.rowId);
        graphvizModelTree += "\r\n" + child.parentrowId + " -> " + child.rowId + ";"
    }, 0)

    var variableNames = new Set();

    wb.solution.formulas.forEach(function(formulaId) {
        var formula = SolutionFacade.fetchFormulaByIndex(formulaId);
        if (Object.keys(formula.deps).length > 0) {
            variableNames.add(correctFileName(formula.name))
        }
        for (var dep in formula.deps) {
            depVariableNames_with_formulas += "\r\n" + correctFileName(formula.name) + " -> " + correctFileName(dep) + '[label="' + formula.original + '"];'
            depVariableNames += "\r\n" + correctFileName(formula.name) + " -> " + correctFileName(dep) + ';'
        }
    });
    variableNames.forEach(function(name) {
        depVariableNames_with_formulas += createRow(name);
        depVariableNames += createRow(name);
    })
    var formulaInfo = {};
    FormulaService.visitFormulas(function(formula) {
        formulaInfo[formula.name] = formula;
    })
    createFile(wb, "_dependencies.json", JSON.stringify(formulaInfo, null, 2));
    createFile(wb, "_modelTree.txt", createGraph(graphvizModelTree));
    createFile(wb, "_dependencies.txt", createGraph(depVariableNames));
    createFile(wb, "_dependencies_with_formulas.txt", createGraph(depVariableNames_with_formulas));
}

function createFile(wb, fileName, graph) {
    var fullFileName = '../resources/' + wb.getSolutionName() + fileName;
    fs.writeFile(fullFileName, graph, function(err) {
        if (err) {
            log.log(err);
            return
        }
        log.info("[%s] saved!", fullFileName);
    });
}

function createRow(rowId) {
    return "\r\n" + rowId + ' [shape=record, label="' + rowId + '"];';
}

function createGraph(middle) {
    var graphviz = 'digraph G { \r\nrankdir="LR"';
    graphviz += middle;
    graphviz += "\r\n}";
    return graphviz;
}

log.info('test fflExport succeed')