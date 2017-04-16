var parseString = require('xml2js').parseString;
var JUNIT = require('./JUNIT.js')
var xml = JUNIT.getFile('/KAM/FMT/Master/KAM.Fmt4Model.xml')
var FESFacade = require('../archive/fesjs/FESFacade.js');
var SolutionFacade = require('../archive/fesjs/SolutionFacade');
var uimodel = require('../archive/fesjs/UIService');
var AST = require('ast-node-utils').ast;
var parser = {
    name: 'FMT4Mapping',
    headername: '.finance FMT4ImportMapping',
    //expection json as String for screen definitions
    parse: function (xml)
    {
        var solution;
        parseString(xml, function (err, result)
        {
            solution = uimodel.create(result.FmtMappingModel.Head[0].Description[0]);

            var value = result.FmtMappingModel.Accounts[0].Account.length;
            result.FmtMappingModel.Accounts[0].Account.forEach(function (elem)
            {
                addnode(solution, elem.Code[0], elem, undefined, '')
                console.info(JSON.stringify(elem.Code[0]));
            })
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
                displaytype: elem.displayAs
            };
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
    //create formula if not exist
    var uiNode = SolutionFacade.createUIFormulaLink(solution, rowId, 'value', AST.UNDEFINED(), "AmountAnswerType");
    //only for the value tree a Tree structure is build, properties only part of the uiNode, not a child
    uiNode.referId = referId;
    solution.setDelegate(uiNode, node);
    solution.setParentName(uiNode, parentId);
    SolutionFacade.createUIFormulaLink(solution, rowId, 'title', AST.STRING(node.description || node.name || 'test'));
}
parser.parse(xml)