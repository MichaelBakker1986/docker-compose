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

LMETree.prototype.addNode = function(node, columns) {

    var workbook = this.workbook;
    var rowId = node.rowId;
    var r = {};
    columns.forEach(function(column) {
        //temp check, seems to proxy multiple times.
        Object.defineProperty(r, column, {
            get: function() {
                let rval = workbook.get(rowId, column, 0, 0);
                log.info('get ' + rowId + "." + column + " = "  + rval)
                if (typeof(rval) === 'object') {
                    rval = null;
                }
                return rval;
            },
            set: function(v) {
                //only for 'value,formula_trend,...'
                log.info('user set value ' + parseInt(v) + ' :' + rowId)
                counter++;
                workbook.set(rowId, parseInt(v), column, 0, 0);
            }
        });
    });
    this.nodes[rowId] = r;
}

WebExport.prototype.deParse = function(rowId, workbook) {
    var modelName = workbook.getSolutionName();
    var rootNode = workbook.getRootSolutionProperty(modelName);
    var lmeTree = new LMETree(modelName, workbook);
    workbook.visitProperties(rootNode, function(node) {
        lmeTree.addNode(node, ['title', 'value', 'visible', 'locked', 'required'])
    })
    return lmeTree;
}

SolutionFacade.addParser(new WebExport())