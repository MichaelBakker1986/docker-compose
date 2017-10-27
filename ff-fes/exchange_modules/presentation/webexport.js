var SolutionFacade = require('../../fesjs/SolutionFacade');
var log = require('ff-log')

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

var repeats = {
    none: [1, 3],
    column: [3, 1],
    document: [1, 3]
}
LMETree.prototype.addNode = function(node, columns) {

    var workbook = this.workbook;
    var rowId = node.rowId;
    var details = repeats[node.frequency];
    var amount = repeats[node.frequency][0]
    var colspan = repeats[node.frequency][1];
    var rv = {
        ammount: amount,
        colspan: colspan,
        cols: []
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
    this.nodes[rowId] = rv;
}

WebExport.prototype.deParse = function(rowId, workbook) {
    var modelName = workbook.getSolutionName();
    var rootNode = workbook.getRootSolutionProperty(modelName);
    var lmeTree = new LMETree(modelName, workbook);
    workbook.visitProperties(rootNode, function(node) {
        if (node !== rootNode) {
            lmeTree.addNode(node, ['title', 'value', 'visible', 'entered', 'locked', 'required'])
        }
    })
    return lmeTree;
}

SolutionFacade.addParser(new WebExport())