/**
 * file creator, not tested every cycle.
 *
 * @type {ok}
 */
var assert = require('assert');
require('../exchange_modules/ffl/RegisterPlainFFLDecorator');
require('../exchange_modules/presentation/webexport');

require('../../math')
var CalculationFacade = require('../').CalculationFacade;
var Context = require('../src/Context');
var FormulaService = require('../src/FormulaService');
var SolutionFacade = require('../src/SolutionFacade');
const ValueFacade = require('../src/ValueFacade');
CalculationFacade.addFunctions(require('../../formulajs-connect').formulajs);
CalculationFacade.addFunctions(require('../../excel-connect').xlsxLookup);
var log = require('log6');
var WorkBook = require('../src/JSWorkBook');
var fs = require('fs');
const path = '/../../git-connect/resources/';
const modelname = 'URA';
var fflTestModels = [path + modelname];
const onlyValue = true;
function correctFileName(name) {
    return name.replace(/^[^_]+_([\w]*)_\w+$/gmi, '$1');
}

for (var i = 0; i < fflTestModels.length; i++) {
    var fflModelName = fflTestModels[i];
    var data = fs.readFileSync(__dirname + fflModelName + '.ffl', 'utf8');
    var wb = new WorkBook(new Context());

    wb.importSolution(data, 'ffl');
    var validate = wb.validateImportedSolution();
    wb.fixProblemsInImportedSolution();
    assert.ok(wb.validateImportedSolution().valid);
    var screendefExport = wb.export('webexport');
    var allnodes = screendefExport.nodes;

    var graphvizModelTree = '';
    var depVariableNames_with_formulas = "";
    var depVariableNames = "";

    for (var nodeName in allnodes) {
        var node = allnodes[nodeName];
    }

    ValueFacade.visit(wb.getSolutionNode(modelname + '_root'), function(child) {
        graphvizModelTree += createRow(child.rowId);
        graphvizModelTree += "\r\n" + child.parentrowId + " -> " + child.rowId + ";"
    }, 0)

    var variableNames = new Set();

    wb.solution.formulas.forEach(function(formulaId) {
        var formula = SolutionFacade.fetchFormulaByIndex(formulaId);
        if (onlyValue && formula.name.endsWith('_valid')) return;
        if (Object.keys(formula.deps).length > 0) {
            variableNames.add(correctFileName(formula.name))
        }
        for (var dep in formula.deps) {
            if (onlyValue && !dep.endsWith('_value')) continue;
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