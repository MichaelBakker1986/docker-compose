/**
 * file creator, not tested every cycle.
 *
 * @type {ok}
 */
var assert = require('assert');
require('../exchange_modules/ffl/RegisterPlainFFLDecorator');
require('../exchange_modules/lme/lmeparser');
require('../exchange_modules/presentation/webexport');
require('../../math')
var LMEFacade = require('../').LMEFacade;
var Context = require('../src/Context');
var FormulaService = require('../src/FormulaService');
var DebugManager = require('../exchange_modules/ffl/DebugManager').DebugManager;
var SolutionFacade = require('../src/SolutionFacade');
LMEFacade.addFunctions(require('../../formulajs-connect').formulajs);
LMEFacade.addFunctions(require('../../excel-connect'));
var log = require('log6');
var WorkBook = require('../src/JSWorkBook');
var Register = require('../exchange_modules/ffl/Register').Register;
var fs = require('fs');

var fflTestModels = ['/../resources/KSP'];

function correctFileName(name) {
    return name.replace(/^[^_]+_([\w]*)_\w+$/gmi, '$1');
}

for (var i = 0; i < fflTestModels.length; i++) {
    var fflModelName = fflTestModels[i];
    var data = fs.readFileSync(__dirname + fflModelName + '.ffl', 'utf8');
    const context = new Context();
    var wb = new WorkBook(context);
    const register = new Register();
    const debug_manager = new DebugManager(register, context.audittrail)
    wb.importSolution({
        register: register,
        raw     : data
    }, 'ffl');
    var validate = debug_manager.monteCarlo(fflModelName)
    assert.ok(validate.valid);
    var screendefExport = wb.export('webexport');
    var allnodes = screendefExport.nodes;

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
        depVariableNames_with_formulas += createRow(name)
        depVariableNames += createRow(name)
    })
    var formulaInfo = {};
    FormulaService.visitFormulas(function(formula) {
        formulaInfo[formula.name] = formula
    })
    createFile(wb, "_dependencies.json", JSON.stringify(formulaInfo, null, 2))
    createFile(wb, "_canvas.json", wb.export('lme', undefined))
    createFile(wb, "_modelTree.txt", createGraph(graphvizModelTree))
    createFile(wb, "_dependencies.txt", createGraph(depVariableNames))
    createFile(wb, "_dependencies_with_formulas.txt", createGraph(depVariableNames_with_formulas))
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