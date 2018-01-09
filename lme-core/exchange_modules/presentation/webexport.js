var SolutionFacade = require('../../src/SolutionFacade');
var PropertiesAssembler = require('../../src/PropertiesAssembler');


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
    this.repeats = {
        undefined: [workbook.context.columnSize, 1],
        none: [1, 1],
        column: [workbook.context.columnSize, 1],
        document: [1, workbook.context.columnSize],
        timeline: [1, workbook.context.columnSize]
    }
    this.columns = workbook.context.columns;
}

function noChange(workbook, rowId, col, index, type) {
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

function changeAble(workbook, rowId, col, index, type) {
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

function changeAndCache(workbook, rowId, col, index, type) {
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
            /*if (v != null && ((v.indexOf('+') > -1) || (v.indexOf('-') > -1) || (v.indexOf('/') > -1) || (v.indexOf('*')) > -1)) {
                if (!v.endsWith('+') && !v.endsWith('-'))
                    v = eval(v)
                else
                    return
            }*/
            workbook.set(rowId, (v == null || v == '') ? null : v, col, index, 0);
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

let tuplecounter = 0;
LMETree.prototype.addTupleNode = function(node, treePath, index, natural_order_id, yas) {
    tuplecounter++;
    const tree = this;
    var workbook = this.workbook;
    var rowId = node.rowId;
    const newTupleId = rowId + "_add_tuple_" + tuplecounter
    var amount = this.repeats.document[0]
    var colspan = this.repeats.document[1];
    const type = 'tuple_add';
    const parent = this.nodes[treePath[treePath.length - 1]];
    const path = treePath.join('.');
    var rv = {
        id: newTupleId,
        order_id: natural_order_id,
        add: function() {
            console.info('Clicked add tuple' + newTupleId)
            console.info(path)
            tree.addTupleNode(node, path.split('.'), parent.children.length + 1, natural_order_id + tuplecounter, yas)
        },
        index: index,
        title_locked: node.title_locked,
        type: 'tuple_add',
        path: path,
        ammount: amount,
        colspan: colspan,
        visible: true,
        cols: [{
            value: newTupleId,
            entered: false,
            type: 'tuple_add',
            locked: true,
            visible: true,
            valid: true
        }],
        children: []
    };

    if (parent) parent.children.push(rv);
    this.nodes[newTupleId] = rv;
}
LMETree.prototype.addWebNode = function(node, treePath, index, natural_order_id, yas) {
    var workbook = this.workbook;
    var rowId = node.rowId;
    var amount = this.repeats[node.frequency][0]
    var colspan = this.repeats[node.frequency][1];
    const type = node.displayAs;
    const datatype = node.datatype
    const displaytype = type;// node.datatype;
    const path = treePath.join('.')
    var rv = {
        id: rowId,
        order_id: natural_order_id,
        index: index,
        title_locked: node.title_locked,
        type: node.displayAs,
        path: path,
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
            locked: null,
            valid: null
        });
    }
    for (var index = 0; index < amount; index++) {
        var r = {
            type: type,
            value: null,
            visible: null,
            entered: null,
            required: null,
            locked: null,
            valid: null
        }
        rv.cols.push(r);

        Object.defineProperty(r, 'value', properties.value.prox(workbook, rowId, 'value', index, displaytype));
        Object.defineProperty(r, 'visible', properties.visible.prox(workbook, rowId, 'visible', index, displaytype));
        Object.defineProperty(r, 'entered', properties.entered.prox(workbook, rowId, 'entered', index, displaytype));
        Object.defineProperty(r, 'required', properties.required.prox(workbook, rowId, 'required', index, displaytype));
        Object.defineProperty(r, 'locked', properties.locked.prox(workbook, rowId, 'locked', index, displaytype));
        Object.defineProperty(r, 'valid', properties.locked.prox(workbook, rowId, 'valid', index, displaytype));
    }
    /**
     * Proxy properties to the row object
     */
    this.columns.forEach(function(col) {
        rv[col] = null;
        Object.defineProperty(rv, col, properties[col].prox(workbook, rowId, col, 0, displaytype));
    });
    const parent = this.nodes[treePath[treePath.length - 1]];
    if (parent) parent.children.push(rv);
    this.nodes[rowId] = rv;
}
WebExport.prototype.parseData = function(webExport, workbook) {
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
    var indexPath = [];
    //make the walk here,
    var rootNode = workbook.fetchSolutionNode(rowId, 'value') || workbook.getRootSolutionProperty(modelName);
    let natural_order_id = 0;
    workbook.visitProperties(rootNode, function(node, yas, treeDepth) {
        natural_order_id = natural_order_id + 1000;
        if (node && node.rowId !== 'root') {
            if (treeDepth > currentDepth) {
                treePath.push(node.parentrowId)
                indexPath.push(-1)
                currentDepth = treeDepth;
            } else if (treeDepth < currentDepth) {
                treePath.length = treeDepth;
                indexPath.length = treeDepth;
                currentDepth = treeDepth;
            }
            var index = indexPath[indexPath.length - 1] + 1
            indexPath[indexPath.length - 1] = index
            if (node.tupleDefinition) {
                lmeTree.addTupleNode(node, treePath, index, natural_order_id, yas)
            } else {
                lmeTree.addWebNode(node, treePath, index, natural_order_id, yas)
            }
        }
    })
    lmeTree.offset = 0;
    return lmeTree;
}
SolutionFacade.addParser(new WebExport())