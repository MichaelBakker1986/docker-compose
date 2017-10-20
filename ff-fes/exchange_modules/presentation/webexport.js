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
var counter = 0;

function LMETree(name, workbook) {
    this.name = name;
    this.workbook = workbook;
    this.nodes = {};
}

LMETree.prototype.addNode = function(node, columns) {
    var icount = -1;
    var rval;
    var workbook = this.workbook;
    columns.forEach(function(column) {
        //temp check, seems to proxy multiple times.
        if (!node.hasOwnProperty(column)) {
            Object.defineProperty(node, column, {
                get: function() {
                    if (icount !== counter) {
                        icount = counter;
                        rval = workbook.get(node.rowId, column, 0, 0);
                        if (typeof(rval) === 'object') {
                            rval = 1;
                        }
                    }
                    return rval;
                },
                set: function(v) {
                    //only for 'value,formula_trend,...'
                    console.info('user set value' + v + ' :' + node.rowId)
                    counter++;
                    workbook.set(node.rowId, v, column, 0, 0);
                }
            });
        }
    });
    this.nodes[node.name] = node;
}

WebExport.prototype.deParse = function(rowId, workbook) {
    var modelName = workbook.getSolutionName();
    var rootNode = workbook.getRootSolutionProperty(modelName);
    var lmeTree = new LMETree(modelName, workbook);
    workbook.visitProperties(rootNode, function(node) {
        lmeTree.addNode(node, ['title', 'value', 'visible', 'locked'])
    })
    return lmeTree;
}

SolutionFacade.addParser(new WebExport())