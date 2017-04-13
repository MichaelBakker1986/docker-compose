var assert = require('assert');
var parser = require('../exchange_modules/ffl/fflparser.js');//just let it inject into the GenericModelFile
require('../exchange_modules/presentation/presentation.js');//just let it inject into the GenericModelFile

require('../../ff-math/ff-math')
var fesjsApi = require('../ff-fes').fesjs;
var FESContext = require('../fesjs/fescontext');
var FormulaService = require('../fesjs/FormulaService');
var JUNIT = require('../test/JUNIT');
fesjsApi.addFunctions(require('../../ff-formulajs/ff-formulajs').formulajs);
//add excel-lookup, MatrixLookup
fesjsApi.addFunctions(require('../../ff-fes-xlsx/ff-fes-xlsx').xlsxLookup);


var WorkBook = require('../fesjs/JSWorkBook.js');

var JUNIT = require('./JUNIT.js');
var fs = require('fs');

var fflTestModels = ['V05'];// ['hierarchyTest', 'hierarchyTest'];
function correctFileName(name) {
    return name.replace(/^[^_]+_([\w]*)_\w+$/gmi, '$1');
}
for (var i = 0; i < fflTestModels.length; i++) {
    var fflModelName = fflTestModels[i];
    var data = JUNIT.getFile(fflModelName + '.ffl');
    var wb = new WorkBook(new FESContext());

    wb.doImport(data, 'ffl');
    var validate = wb.validate();
    wb.fixAll();
    assert.ok(wb.validate().valid);
    var fflExport = wb.export('ffl');
    var screendefExport = wb.export('presentation');
    var allnodes = screendefExport.tree._tree.nodes;
    var solution = wb.produceSolution();


    var graphvizModelTree = '';
    var depVariableNames_with_formulas = "";
    var depVariableNames = "";

    for (var nodeName in allnodes) {
        var node = allnodes[nodeName];
        //graphvizModelTree += createRow(node.rowId);
    }

    wb.visit(wb.getStatelessNode('V05_root'), function (child) {
        graphvizModelTree += createRow(child.rowId);
        graphvizModelTree += "\r\n" + child.parentrowId + " -> " + child.rowId + ";"
    })

    var variableNames = new Set();


    solution.formulas.forEach(function (formula) {
        if (Object.keys(formula.deps).length > 0) {
            variableNames.add(correctFileName(formula.name))
        }
        for (var dep in formula.deps) {
            depVariableNames_with_formulas += "\r\n" + correctFileName(formula.name) + " -> " + correctFileName(dep) + '[label="' + formula.original + '"];'
            depVariableNames += "\r\n" + correctFileName(formula.name) + " -> " + correctFileName(dep) + ';'
        }
    });
    variableNames.forEach(function (name) {
        depVariableNames_with_formulas += createRow(name);
        depVariableNames += createRow(name);
    })
    var formulaInfo = {};
    FormulaService.visitFormulas(function (formula) {
        formulaInfo[formula.name] = formula;
    })
    fs.writeFile(wb.modelName + "_dependencies.json", JSON.stringify(formulaInfo, null, 2), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!" + wb.modelName + "_dependencies.json");
    });
    fs.writeFile(wb.modelName + "_modelTree.txt", createGraph(graphvizModelTree), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    fs.writeFile(wb.modelName + "_dependencies.txt", createGraph(depVariableNames), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file2 was saved!");
    });
    fs.writeFile(wb.modelName + "_dependencies_with_formulas.txt", createGraph(depVariableNames_with_formulas), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file2 was saved!");
    });
    //debugging..
    if (!process.alltest) {
        //console.info(fflExport);
    }
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

console.info('test fflExport succeed')