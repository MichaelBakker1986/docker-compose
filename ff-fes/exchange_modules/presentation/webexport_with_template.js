var SolutionFacade = require('../../fesjs/SolutionFacade');
var PropertiesAssembler = require('../../fesjs/PropertiesAssembler');
var LmeDisplayGrammer = require('./LmeDisplayGrammer').LmeDisplayGrammer
var columns = ['title', 'value', 'visible', 'entered', 'locked', 'required', 'hint', 'choices', 'original', 'valid']

function WebExport() {
    this.exportAsObject = true;
    this.hide = true;
    this.name = 'webexport';

    this.headername = 'Native Object Web Presentation';
}

function LMETree(name, workbook) {
    this.name = name;
    this.workbook = workbook;
    this.nodes = {};
    this.names = {};
}

function noChange(workbook, rowId, col, index) {
    let r;//return value
    let c = -1;//calculation counter
    return {
        get: function() {
            if (workbook.context.calc_count !== c && c < 0) {
                c = workbook.context.calc_count;
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
            if (workbook.context.calc_count !== c) {
                c = workbook.context.calc_count;
                r = workbook.get(rowId, col, index, 0);
            }
            return r;
        }
    }
}

function changeAndCache(workbook, rowId, col, index) {
    let r;//return value
    let c = -1;//calculation counter
    return {
        get: function() {
            if (workbook.context.calc_count !== c) {
                c = workbook.context.calc_count;
                r = workbook.get(rowId, col, index, 0);
            }
            return r;
        },
        set: function(v) {
            var value = (v == null || v == '') ? null : (isNaN(v) ? v : parseFloat(v))
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
    original: {change: true, prox: noChange},
    value: {change: true, prox: changeAndCache},
    visible: {prox: changeAble},
    entered: {prox: changeAble},
    valid: {prox: changeAble},
    locked: {prox: changeAble},
    required: {prox: changeAble},
    hint: {cache: true, prox: noChange},
    choices: {cache: true, prox: noChange}
}
var repeats = {
    undefined: [1, 1],
    none: [1, 1],
    column: [3, 1],
    document: [1, 3],
    timeline: [1, 3]
}

LMETree.prototype.addWebNode = function(node, treePath) {
    var workbook = this.workbook;
    var rowId = node.rowId;
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
    var rt = {}
    Object.defineProperty(rt, 'value', properties.title.prox(workbook, rowId, 'title', 0));
    if (node.frequency !== 'none') {
        rv.cols.push({
            value: null,
            entered: null,
            type: 'title',
            locked: null
        });
    }
    for (var index = 0; index < amount; index++) {
        var r = {
            type: node.displayAs,
            value: null,
            visible: null,
            entered: null,
            required: null,
            locked: null
        }
        rv.cols.push(r);
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
        rv[col] = null;
        Object.defineProperty(rv, col, properties[col].prox(workbook, rowId, col, 0));
    });
    const parent = this.nodes[treePath[treePath.length - 1]];
    if (parent) parent.children.push(rv);
    this.nodes[rowId] = rv;
}

var webDesign = {
    nodes: [
        {rowId: 'root'}
    ]
}
WebExport.prototype.parseData = function(webExport, workbook) {
    webDesign = new LmeDisplayGrammer(webExport, workbook.modelName).parseGrammer()
    webDesign.nodes[0].rowId = workbook.modelName + '_root'
    return SolutionFacade.createSolution(workbook.modelName);
}

WebExport.prototype.deParse = function(rowId, workbook) {
    var modelName = workbook.getSolutionName();

    var lmeTree = new LMETree(modelName, workbook);
    PropertiesAssembler.findAllInSolution(modelName, function(node) {
        lmeTree.names[node.rowId] = true;
    });
    var treePath = [];
    var currentDepth = 0;

    //make the walk here,
    /*    for (var i = 0; i < webDesign.nodes.length; i++) {
            var node = webDesign.nodes[i];*/
    var rootNode = workbook.fetchSolutionNode(rowId, 'value') || workbook.getRootSolutionProperty(modelName);

    workbook.visitProperties(rootNode, function(node, yas, treeDepth) {
        if (node && node.rowId !== 'root') {
            if (treeDepth > currentDepth) {
                treePath.push(node.parentrowId)
                currentDepth = treeDepth;
            } else if (treeDepth < currentDepth) {
                treePath.length = treeDepth;
                currentDepth = treeDepth;
            }
            lmeTree.addWebNode(node, treePath)
        }
    })
    /*  }*/
    return lmeTree;
}
SolutionFacade.addParser(new WebExport())