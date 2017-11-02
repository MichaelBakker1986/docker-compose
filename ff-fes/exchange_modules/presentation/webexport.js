var SolutionFacade = require('../../fesjs/SolutionFacade');

function WebExport() {
    this.exportAsObject = true;
    this.hide = true;
    this.name = 'webexport';
    this.headername = 'Native Object Web Presentation';
}

WebExport.prototype.parse = function(webExport) {
    throw new Error('Not yet supported');
}
var counter = 1;

function LMETree(name, workbook) {
    this.name = name;
    this.workbook = workbook;
    this.nodes = {};
}
var repeats = {
    undefined: [3, 1],
    none: [1, 3],
    column: [3, 1],
    document: [1, 3],
    timeline: [1, 3]
}

LMETree.prototype.addNode = function(node, columns, treePath) {
    var workbook = this.workbook;
    var rowId = node.rowId;
    var details = repeats[node.frequency];
    var amount = repeats[node.frequency][0]
    var colspan = repeats[node.frequency][1];
    var rv = {
        id: rowId,
        path: treePath.join('.'),
        ammount: amount,
        colspan: colspan,
        cols: [],
        children: []
    };

    for (var cm = 0; cm < amount; cm++) {
        var r = {}
        rv.cols[cm] = r;
        columns.forEach(function(column) {
            //temp check, seems to proxy multiple times.
            const ammount = cm;
            let rval, vcount;
            Object.defineProperty(r, column, {
                get: function() {
                    if (counter !== vcount) {
                        vcount = counter;
                        rval = workbook.get(rowId, column, ammount, 0);
                        if (typeof(rval) === 'object') {
                            rval = null;
                        }
                    }
                    return rval;
                },
                set: function(v) {
                    //only for 'value,formula_trend,...'
                    counter++;
                    var value = v === null ? v : (isNaN(v) ? v : parseFloat(v))
                    workbook.set(rowId, value, column, ammount, 0);
                }
            });
        });
    }
    /**
     * This is duplicate of above, to support title, visible etc for now.
     * Values are traditionally not supposed to have title and visible properties.
     * They are arranged by the row, but it does not seem to affect performance.
     */
    columns.forEach(function(column) {
        //temp check, seems to proxy multiple times.
        let rval, vcount;
        Object.defineProperty(rv, column, {
            get: function() {
                if (counter !== vcount) {
                    vcount = counter;
                    rval = workbook.get(rowId, column, 0, 0);
                    if (typeof(rval) === 'object') {
                        rval = null;
                    }
                }
                return rval;
            },
            set: function(v) {
                //only for 'value,formula_trend,...'
                counter++;
                var value = v === null ? v : (isNaN(v) ? v : parseFloat(v))
                workbook.set(rowId, value, column, 0, 0);
            }
        });
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
            lmeTree.addNode(
                node,
                ['title', 'value', 'visible', 'entered', 'locked', 'required', 'hint'],
                treePath
            )
        }
    })
    return lmeTree;
}
SolutionFacade.addParser(new WebExport())