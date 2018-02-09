/**
 * Gives a Object-oriented view over a part of the model
 * Objectify the entire model is simply too expensive to do. 128(t3)*128(t2)*128(t1)*128(t0)*500(cols)*5000(vars)...
 * So we focus on the parts that are created, active and interesting to see/modify
 *
 * The LMETree has .sort() to sort the entire rows array naturally
 *  Ordering the Nodes requires a somewhat complex sort-function.
 *  ((VariableID|TupleDefinitionID),tIndex(tDepth)){maxTupleDepth}
 *  e.g: 0005,001,0006,000,0006,000 = 0006(John)
 *  e.g: 0005,001,0006,000,0008,001 = 0008(John,CarPayment)
 *
 *  Where id's are translated into Unique names per tIndex
 *  So 0005,001 is always the First (John) in this example
 *  So 0005,001,0006,000 is always the First (John,CarPayment) in this example
 *  0008 can be any child-variable in 0005.0006.* Example John.CarPayment.Status
 *
 * (!)       TODO:                                                      Another option should be
 * (?) be aware null-tuple is post-fixed with ,0,0 : t(2)    => 2,0,0 | 2,2,2
 * (?) be aware first-tuple is post-fixed with ,0  : t(4,1)  => 4,1,0 | 4,1,1
 *
 *  So will mean that:
 *  a(0)       = a0a0a0
 *   b(0,0)    = a0b0b0
 *    d(0,0,0) = a0b0d0
 *   b(0,1)    = a0b1b0 (!) what to do with the last index? re-use the one before or not?
 *    d(0,1,1) = a0b1d1
 *   b(0,tMax) = a0b9b0
 *  a(1)       = a1a0a0 (!) what to do with the last index? re-use the one before or not?
 *   b(1,tMax) = a1b9b0
 *  e(0)       = e0e0e0
 *
 * The LMETree.nodes has a blueprint from the entire model. (without tuple-instances, and not hiding the Tuple Definition)
 * The LMETree.no has all created nodes in a map, to speed up lookups.
 * The LMETree.rows is the Array, used for manipulation/view
 */
const SolutionFacade = require('../../src/SolutionFacade');
const PropertiesAssembler = require('../../src/PropertiesAssembler');

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
    this.rows = []
    this.no = {}
    this.repeats = {
        undefined: [workbook.context.columnSize, 1],
        none: [1, 1],
        column: [workbook.context.columnSize, 1],
        document: [1, workbook.context.columnSize],
        timeline: [1, workbook.context.columnSize]
    }
    this.columns = workbook.context.columns;
}

function noChange(workbook, rowId, col, index, type, yas) {
    var r;//return value
    var c = -1;//calculation counter
    return {
        get: function() {
            if (workbook.context.calc_count !== c && c < 0) {
                c = workbook.context.calc_count;
                r = workbook.get(rowId, col, index, yas);
            }
            return r;
        }
    }
}

function changeAble(workbook, rowId, col, index, type, yas) {
    var r;//return value
    var c = -1;//calculation counter
    return {
        get: function() {
            if (workbook.context.calc_count !== c) {
                c = workbook.context.calc_count;
                r = workbook.get(rowId, col, index, yas);
            }
            return r;
        }
    }
}

function changeAndCache(workbook, rowId, col, index, type, yas) {
    var r;//return value
    var c = -1;//calculation counter
    return {
        get: function() {
            if (workbook.context.calc_count !== c) {
                c = workbook.context.calc_count;
                r = workbook.get(rowId, col, index, yas);
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
            workbook.set(rowId, (v == null || v == '') ? null : v, col, index, yas);
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

var tuplecounter = 0;
LMETree.prototype.addTupleNode = function(node, treePath, index, yas, treeDepth) {
    const tree = this;
    const unique = yas.display + '__' + node.rowId
    const workbook = this.workbook;
    const rowId = node.rowId;
    const amount = this.repeats.document[0]
    const colspan = this.repeats.document[1];
    const type = 'tuple_add';
    const parent = this.nodes[yas.display + '_' + treePath[treePath.length - 1]];
    const path = treePath.join('.');
    const has = node.hash.slice();
    if (yas.depth == 0) {
        has[1] = '999'
    } else if (yas.depth == 1) {
        has[1] = yas.uihash
        has[3] = '999'
    } else if (yas.depth == 2) {
        has[1] = yas.parent.uihash
        has[3] = yas.uihash
        has[5] = '999'
    } else if (yas.depth == 3) {
        //throw Error('Something wrong here..')
        has[1] = yas.parent.uihash
        has[3] = yas.uihash
        has[5] = '999'
    }
    const rv = {
        id: rowId,
        order_id: has.join('.'),
        treeDepth: treeDepth,
        add: function() {
            const inneryas = workbook.addTuple(node.rowId, ++tuplecounter + '_' + yas.display + '_' + node.rowId, yas)
            workbook.set(node.rowId, inneryas.display + ":" + node.rowId, 'value', undefined, inneryas)

            workbook.walkProperties(node, function(child, yasi, cTreeDepth, yi) {
                if (yasi == 'new') {
                    tree.addTupleNode(child, path.split('.'), index, yi, cTreeDepth)
                }
                else {
                    tree.addWebNode(child, path.split('.'), index, yi, cTreeDepth)
                }
            }, inneryas, node.rowId, treePath.length)
            return inneryas;
        },
        //index is deprecated. Lookup the next sibling when needed. Could be tuple..
        index: index,
        title_locked: node.title_locked,
        type: 'tuple_add',
        path: path,
        ammount: amount,
        display: yas.display,
        colspan: colspan,
        depth: yas.depth + 1,//This could be a quick-fix to a serious problem.
        visible: true,
        cols: [{
            value: unique,
            entered: false,
            type: 'tuple_add',
            locked: true,
            visible: true,
            valid: true
        }],
        children: []
    };
    if (node.display_options) rv.display_options = node.display_options;

    Object.defineProperty(rv, 'title', properties.title.prox(workbook, rowId, 'title', 0, undefined, yas));
    if (parent) parent.children.push(rv);
    this.nodes[unique] = rv;
    this.rows.push(rv)
}
LMETree.prototype.addWebNode = function(node, treePath, index, yas, treeDepth) {
    const workbook = this.workbook;
    const rowId = node.rowId;
    const unique = yas.display + "_" + rowId
    const amount = this.repeats[node.frequency][0]
    const colspan = this.repeats[node.frequency][1];
    const type = node.displayAs;
    const datatype = node.datatype
    const displaytype = type;// node.datatype;
    const path = treePath.join('.')
    const has = node.hash.slice();
    //alright this is a big step. and seems to work (there is a variable set wrongly.)
    if (yas.depth == 0) {
        has[1] = yas.uihash
    } else if (yas.depth == 1) {
        has[1] = yas.uihash
    } else if (yas.depth == 2) {
        has[3] = yas.uihash
        has[1] = yas.parent.uihash
    } else if (yas.depth == 3) {
        has[5] = yas.uihash
        has[3] = yas.parent.uihash
        has[1] = yas.parent.parent.uihash
    }
    const rv = {
        id: rowId,
        treeDepth: treeDepth,
        depth: yas.depth,
        display_options: node.display_options,
        display: yas.display,
        order_id: has.join('.'),
        index: index,
        title_locked: node.title_locked,
        type: node.displayAs,
        path: path,
        ammount: amount,
        colspan: colspan,
        tupleDefinition: node.tupleDefinition,
        cols: [],
        children: []
    };
    /**
     * Proxy properties to the column objects
     */
    var rt = {}
    Object.defineProperty(rt, 'value', properties.title.prox(workbook, rowId, 'title', 0, undefined, yas));
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
        const r = {
            type: type,
            value: null,
            visible: null,
            entered: null,
            required: null,
            locked: null,
            valid: null
        }
        rv.cols.push(r);

        Object.defineProperty(r, 'value', properties.value.prox(workbook, rowId, 'value', index, displaytype, yas));
        Object.defineProperty(r, 'visible', properties.visible.prox(workbook, rowId, 'visible', index, displaytype, yas));
        Object.defineProperty(r, 'entered', properties.entered.prox(workbook, rowId, 'entered', index, displaytype, yas));
        Object.defineProperty(r, 'required', properties.required.prox(workbook, rowId, 'required', index, displaytype, yas));
        Object.defineProperty(r, 'locked', properties.locked.prox(workbook, rowId, 'locked', index, displaytype, yas));
        Object.defineProperty(r, 'valid', properties.locked.prox(workbook, rowId, 'valid', index, displaytype, yas));
    }
    /**
     * Proxy properties to the row object
     */
    this.columns.forEach(function(col) {
        rv[col] = null;
        Object.defineProperty(rv, col, properties[col].prox(workbook, rowId, col, 0, displaytype, yas));
    });
    const parent = this.nodes[yas.display + "_" + treePath[treePath.length - 1]];
    if (parent) parent.children.push(rv);
    this.nodes[unique] = rv;
    this.no[rowId] = rv;
    this.rows.push(rv)
}
WebExport.prototype.parseData = function(webExport, workbook) {
    return SolutionFacade.createSolution(workbook.modelName);
}

WebExport.prototype.deParse = function(rowId, workbook) {
    const modelName = workbook.getSolutionName();

    const lmeTree = new LMETree(modelName, workbook);
    PropertiesAssembler.findAllInSolution(modelName, function(node) {
        lmeTree.names[node.rowId] = true;
    });
    const treePath = [];
    var currentDepth = 0;
    const indexPath = [];
    //make the walk here,
    const rootNode = workbook.fetchSolutionNode(rowId, 'value') || workbook.getRootSolutionProperty(modelName);
    PropertiesAssembler.indexProperties(modelName)

    workbook.walkProperties(rootNode, function(node, yas, treeDepth, y) {
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
            const index = indexPath[indexPath.length - 1] + 1
            indexPath[indexPath.length - 1] = index
            if (yas == 'new') {
                lmeTree.addTupleNode(node, treePath, index, y, treeDepth)
            } else {
                lmeTree.addWebNode(node, treePath, index, y, treeDepth)
            }
        }
    }, workbook.resolveY(0).parent, null, 0)
    lmeTree.offset = 0;
    lmeTree.sort = function() {
        lmeTree.rows.sort((a, b) => {
            if (a.order_id == b.order_id) throw Error()
            return a.order_id == b.order_id ? 0 : a.order_id < b.order_id ? -1 : 1
        })
    }
    return lmeTree;
}
SolutionFacade.addParser(new WebExport())