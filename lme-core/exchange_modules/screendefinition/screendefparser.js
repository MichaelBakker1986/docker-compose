var visitor = require('../../src/JSVisitor');
var PropertiesAssembler = require('../../src/PropertiesAssembler');
var SolutionFacade = require('../../src/SolutionFacade');
var AST = require('ast-node-utils').ast;
var FinFormula = require('../ffl/FinFormula');
var keys = ['description', 'viewType', 'col9umnHeader', 'searchBar'];
var parser = {
    name: 'screendefinition',
    headername: '.finance Screendefinition',
    //expection json as String for screen definitions
    parseData: function (json, workbook) {
        var data = JSON.parse(json);
        var solution = SolutionFacade.createSolution(data.modelName || workbook.getSolutionName());

        visitor.travelOne(data, null, function (keyArg, node, context) {
            //keyArg !== null &&  is a hack, prevents RootNode from being added;
            if (node !== null && node !== undefined && keyArg !== null && (node.variableName || node.name) && !Array.isArray(node)) {
                var parent = node._parent;
                var nodeName = node.variableName || node.name;
                if (nodeName) {
                    addnode(solution, nodeName, node, parent ? (parent.variableName || parent.name) : undefined, undefined);
                }
            }
        });
        return solution;
    },
    deParse: function (rowId, workbook) {
        var screenSolution = SolutionFacade.createSolution(workbook.getSolutionName());

        PropertiesAssembler.visitProperty(rowId, function (elem) {
            //create output node
            var uielem = {
                name: elem.rowId,
                displaytype: elem.displayAs,
                description: elem.title
            };
            var formulaProperties = SolutionFacade.gatherFormulaProperties(workbook.getSolutionName(), workbook.properties, elem.rowId);
            for (var key in formulaProperties) {
                var formula = formulaProperties[key];
                var finFormula = FinFormula.javaScriptToFinGeneric(formula);
                if (finFormula != 'undefined') {
                    uielem[key] = finFormula;
                }
            }
            screenSolution.addNode(elem.rowId, uielem);
            screenSolution.restoreDelegateProperties(uielem, elem);
            screenSolution.addNodeToCorrespondingPlaceInHierarchie(elem.parentrowId, elem.rowId, uielem);
        });
        screenSolution.root.modelName = workbook.getSolutionName();
        return screenSolution.stringify();
    }
};

function addnode(solution, rowId, node, parentId, referId) {
    if (solution.hasNode(rowId) || !rowId) {
        return;
        //throw Error()
    }
    //create formula if not exist
    var uiNode = SolutionFacade.createUIFormulaLink(solution, rowId, 'value', AST.UNDEFINED(), "AmountAnswerType");
    //only for the value tree a Tree structure is build, properties only part of the uiNode, not a child
    //uiNode.referId = referId;
    solution.setDelegate(uiNode, node);
    solution.setParentName(uiNode, parentId);
    var titlestring = node.name || node.description || rowId;
    SolutionFacade.createUIFormulaLink(solution, rowId, 'title', AST.STRING(titlestring));
}
SolutionFacade.addParser(parser);