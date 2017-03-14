var visitor = require('../../fesjs/JSVisitor.js');
var GenericModelFile = require('../../fesjs/GenericModelFile.js');
var uimodel = require('../../fesjs/uimodel.js');
var AST = require('../../fesjs/AST.js');
var Solution = require('../../fesjs/Solution.js');
var finformula = require('../ffl/FinFormula.js');
var keys = ['description', 'viewType', 'col9umnHeader', 'searchBar'];
var esprima = require('esprima');
var parser = {
    name: 'screendefinition',
    headername: '.finance Screendefinition',
    //expection json as String for screen definitions
    parse: function (json)
    {
        var data = JSON.parse(json);
        var solution = uimodel.create(data.modelName || 'V05');

        visitor.travelOne(data, null, function (keyArg, node)
        {
            //keyArg !== null &&  is a hack, prevents RootNode from being added;
            if (node !== null && node !== undefined && keyArg !== null && (node.variableName || node.name) && !Array.isArray(node))
            {
                var parent = node._parent;
                var nodeName = node.variableName || node.name;
                if (nodeName)
                {
                    addnode(solution, nodeName, node, parent ? (parent.variableName || parent.name) : undefined, undefined);
                }
            }
        });
        return solution;
    },
    deParse: function ()
    {
        var screenSolution = uimodel.create();

        uimodel.visit(undefined, function (elem)
        {
            //create output node
            var uielem = {
                name: elem.rowId,
                displaytype: elem.displayAs,
                description: elem.title
            };
            var formulaProperties = screenSolution.gatherProperties(GenericModelFile.getFormula, GenericModelFile.properties, elem.rowId);
            for (var key in formulaProperties)
            {
                var formula = formulaProperties[key];
                var finFormula = finformula.javaScriptToFinGeneric(formula);
                if (finFormula != 'undefined')
                {
                    uielem[key] = finFormula;
                }
            }
            screenSolution.addNode(elem.rowId, uielem);
            screenSolution.restoreDelegateProperties(uielem, elem);
            screenSolution.addNodeToCorrespondingPlaceInHierarchie(elem.parentrowId, elem.rowId, uielem);
        });
        screenSolution.root.modelName = uimodel.getCurrentModelName();
        return screenSolution.stringify();
    }
};

function addnode(solution, rowId, node, parentId, referId)
{
    if (solution.hasNode(rowId) || !rowId)
    {
        throw Error()
    }
    //create formula if not exist
    var uiNode = GenericModelFile.addSimpleLink(solution, rowId, 'value', AST.UNDEFINED(), "AmountAnswerType");
    //only for the value tree a Tree structure is build, properties only part of the uiNode, not a child
    //uiNode.referId = referId;
    solution.setDelegate(uiNode, node);
    solution.setParentName(uiNode, parentId);
    var titlestring = node.name || node.description || rowId;
    GenericModelFile.addSimpleLink(solution, rowId, 'title', AST.STRING(titlestring));
}
GenericModelFile.addParser(parser);