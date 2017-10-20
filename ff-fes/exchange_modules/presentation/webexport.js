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
WebExport.prototype.deParse = function(rowId, workbook) {
    var modelName = workbook.getSolutionName();
    var rootNode = workbook.getRootSolutionProperty(modelName);

}

function createTreeNode(tree, nodeId, displayAs) {
    return tree.createNode(nodeId);
}

SolutionFacade.addParser(new WebExport())