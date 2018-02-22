const visitor = require('../../src/JSVisitor');
const PropertiesAssembler = require('../../src/PropertiesAssembler');
const SolutionFacade = require('../../src/SolutionFacade');
const Solution = require('../../src/Solution')
const AST = require('ast-node-utils').ast;
const FinFormula = require('../ffl/FinFormula');
const parser = {
    name     : 'screendefinition',
    //expection json as String for screen definitions
    parseData: function(json, workbook) {
        var data = JSON.parse(json);
        var solution = SolutionFacade.createSolution(data.modelName || workbook.getSolutionName());

        visitor.travelOne(data, null, function(keyArg, node, context) {
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
    deParse  : function(rowId, workbook) {
        var screenSolution = SolutionFacade.createSolution(workbook.getSolutionName());
        const rootProperty = PropertiesAssembler.getRootProperty(workbook.getSolutionName());
        PropertiesAssembler.visitProperty(rowId, function(elem) {
            //create output node
            var uielem = {
                name       : elem.rowId,
                displaytype: elem.displaytype,
                description: elem.title
            };
            var formulaProperties = SolutionFacade.gatherFormulaProperties(workbook.getSolutionName(), workbook.properties, elem.rowId);
            for (var key in formulaProperties) {
                var formula = formulaProperties[key];
                var finFormula = FinFormula.javaScriptToFinGeneric(formula);
                if (finFormula != 'undefined') uielem[key] = finFormula;
            }
        });
        screenSolution.root = {
            modelName: workbook.getSolutionName()
        };
        return stringifySolution(screenSolution.root);
    }
};

function stringifySolution(root) {
    return JSON.stringify(root, function(key, val) {
            if (key === 'originalproperties') {
                return undefined;
            }
            return val;
        }, 2
    );
}

function addnode(solution, rowId, node, parentId, referId) {
    const uiNode = SolutionFacade.createUIFormulaLink(solution, rowId, 'value', AST.UNDEFINED(), "AmountAnswerType", 'document', null, parentId);
    const titlestring = node.name || node.description || rowId;
    SolutionFacade.createUIFormulaLink(solution, rowId, 'title', AST.STRING(titlestring), undefined, 'document');
}

SolutionFacade.addParser(parser);