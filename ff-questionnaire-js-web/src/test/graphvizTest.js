var assert = require('assert');
var parser = require('../archive/ffl/fflparser.js');//just let it inject into the GenericModelFile
require('../archive/exchange_modules/presentation/presentation.js');//just let it inject into the GenericModelFile

var WorkBook = require('../archive/fesjs/JSWorkBook.js');
var JUNIT = require('./JUNIT.js');
var fs = require('fs');

var fflTestModels = ['KSP'];// ['hierarchyTest', 'hierarchyTest'];
function correctFileName(name) {
    return name.replace(/^[^_]+_([\w]*)_\w+$/gmi, '$1');
}
for (var i = 0; i < fflTestModels.length; i++) {
    var fflModelName = fflTestModels[i];
    var data = JUNIT.getFile(fflModelName + '.ffl');
    var wb = new WorkBook();

    wb.doImport(data, 'ffl');
    var validate = wb.validate();
    validate.fixAll();
    assert.ok(wb.validate().valid);
    var fflExport = wb.export('ffl');
    var screendefExport = wb.export('presentation');
    var allnodes = screendefExport.tree._tree.nodes;
    var solution = wb.produceSolution();


    var graphviz = '';

    for (var nodeName in allnodes) {
        var node = allnodes[nodeName];
        graphviz += createRow(node.rowId);
    }

    wb.visit(undefined, function (child) {
        graphviz += "\r\n" + child.parentrowId + " -> " + child.rowId + ";"
    })

    var variableNames = new Set();

    var depVariableNames = "";

    solution.formulas.forEach(function (formula) {
        variableNames.add(correctFileName(formula.name))
        for (var dep in formula.deps) {
            depVariableNames += "\r\n" + correctFileName(formula.name) + " -> " + correctFileName(dep) + ";"
        }
    });
    variableNames.forEach(function (name) {
        depVariableNames += createRow(name);
    })
    var dependencyGraph = createGraph(depVariableNames);

    fs.writeFile("test.txt", createGraph(graphviz), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    fs.writeFile("test2.txt", dependencyGraph, function (err) {
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