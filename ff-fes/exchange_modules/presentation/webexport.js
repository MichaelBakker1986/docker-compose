var SolutionFacade = require('../../fesjs/SolutionFacade');
var columns = ['title', 'value', 'visible', 'entered', 'locked', 'required', 'hint', 'choices']

function WebExport() {
    this.exportAsObject = true;
    this.hide = true;
    this.name = 'webexport';
    this.headername = 'Native Object Web Presentation';
}

WebExport.prototype.parse = function(webExport) {
    throw new Error('Not yet supported');
}
var counter = 0;

function LMETree(name, workbook) {
    this.name = name;
    this.workbook = workbook;
    this.nodes = {};
}

function noChange(workbook, rowId, col, index) {
    let r;//return value
    let c = -1;//calculation counter
    return {
        get: function() {
            if (counter !== c && c < 0) {
                c = counter;
                r = workbook.get(rowId, col, index, 0);
            }
            return r;
        }
    }
}

function changeAble(workbook, rowId, col, index) {
    let r;//return value
    let c = -1;//calculation counter
    return {
        get: function() {
            if (counter !== c) {
                c = counter;
                r = workbook.get(rowId, col, index, 0);
            }
            return r;
        }
    }
}

function changeAndCache(workbook, rowId, col, index) {
    let r;//return value
    let c;//calculation counter
    return {
        get: function() {
            if (counter !== c) {
                c = counter;
                r = workbook.get(rowId, col, index, 0);
            }
            return r;
        },
        set: function(v) {
            counter++;
            var value = v === null ? v : (isNaN(v) ? v : parseFloat(v))
            workbook.set(rowId, value, col, index, 0);
        }
    }
}

/**
 * Cache means only resolve once
 * Change means user can modify the value
 */
var properties = {
    title: {change: true, prox: changeAndCache},
    value: {change: true, prox: changeAndCache},
    visible: {prox: changeAble},
    entered: {prox: changeAble},
    locked: {prox: changeAble},
    required: {prox: changeAble},
    hint: {cache: true, prox: noChange},
    choices: {cache: true, prox: noChange}
}
var repeats = {
    undefined: [3, 1],
    none: [1, 3],
    column: [3, 1],
    document: [1, 3],
    timeline: [1, 3]
}

LMETree.prototype.addNode = function(node, treePath) {
    var workbook = this.workbook;
    var rowId = node.rowId;
    var details = repeats[node.frequency];
    var amount = repeats[node.frequency][0]
    var colspan = repeats[node.frequency][1];
    var rv = {
        id: rowId,
        type: node.displayAs,
        path: treePath.join('.'),
        ammount: amount,
        colspan: colspan,
        cols: [],
        children: []
    };
    /**
     * Proxy properties to the column objects
     */
    for (var index = 0; index < amount; index++) {
        var r = {}
        rv.cols[index] = r;
        Object.defineProperty(r, 'value', properties.value.prox(workbook, rowId, 'value', index));
        Object.defineProperty(r, 'visible', properties.visible.prox(workbook, rowId, 'visible', index));
        Object.defineProperty(r, 'entered', properties.entered.prox(workbook, rowId, 'entered', index));
        Object.defineProperty(r, 'required', properties.required.prox(workbook, rowId, 'required', index));
        Object.defineProperty(r, 'locked', properties.locked.prox(workbook, rowId, 'locked', index));
    }
    /**
     * Proxy properties to the row object
     */
    columns.forEach(function(col) {
        Object.defineProperty(rv, col, properties[col].prox(workbook, rowId, col, 0));
    });
    const parent = this.nodes[treePath[treePath.length - 1]];
    if (parent) parent.children.push(rv);
    this.nodes[rowId] = rv;
}
WebExport.prototype.deParse = function(rowId, workbook) {
    var modelName = workbook.getSolutionName();
    var rootNode = workbook.getRootSolutionProperty(modelName);
    var lmeTree = new LMETree(modelName, workbook);
    var treePath = [];
    var currentDepth = -1;
    workbook.visitProperties(rootNode, function(node, yas, treeDepth) {
        if (node !== rootNode) {
            if (treeDepth > currentDepth) {
                treePath.push(node.parentrowId)
                currentDepth = treeDepth;
            } else if (treeDepth < currentDepth) {
                treePath.length = treeDepth;
                currentDepth = treeDepth;
            }
            lmeTree.addNode(node, treePath)
        }
    })
    return lmeTree;
}
SolutionFacade.addParser(new WebExport())