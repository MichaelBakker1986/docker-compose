const assert = require("assert")
const log = require('log6')
const AST = require('../../ast-node-utils').ast;
const escodegen = require('escodegen');

// some variables we shall use..
//we want to modify its default behavior
//Before entering a Function..
var caseCount = 0;
var simplified = {
    YearInT            : function(formulaInfo, node) {
        node.arguments.unshift({
            type: 'Identifier',
            name: 'v'
        });
    },
    //gets Sels for the value also
    ExpandLevel        : function(formulaInfo, node) {
        node.arguments = [{
            "type": "Identifier",
            "name": "1.1",
            "raw" : "1.1"
        }];
    },
    IRR                : function(formulaInfo, node) {
        node.arguments[0].name = "[1,2]";
    },
    Min                : function(formulaInfo, node) {
        node.callee.name = 'Math.min'
    },
    //we will need this one later to determine + or &&
    EvaluateAsString   : function(formulaInfo, node) {
        node.callee.name = 'String'
    },
    Max                : function(formulaInfo, node) {
        node.callee.name = 'Math.max'
    },
    Abs                : function(formulaInfo, node) {
        node.callee.name = 'Math.abs'
    },
    InvNormal          : function(formulaInfo, node) {
        node.callee.name = 'NORMSINV'
    },
    //the format is strange, hard to get a better format in the fin->json parser.
    //Expected format: Case(X_MAP01_Verplicht,[0,0||1,10||2,20||11,30||12,120||13,130])
    Case               : function(formulaInfo, node) {
        assert.ok(node.arguments.length === 2, "Only expecting 2 arguments for now");
        var statements = node.arguments[1];
        assert.ok(statements.type === 'ArrayExpression', "Second argument has to be ArrayExpression for now");

        var cs = 'arguments.__c0s' + caseCount++;
        node.type = "SequenceExpression";
        var elements = statements.elements;
        node.expressions = [
            {
                "type"    : "AssignmentExpression",
                "operator": "=",
                "left"    : {
                    "type": "Identifier",
                    "name": cs
                },
                "right"   : node.arguments[0]
            }
        ];

        if (elements.length === 1) {
            elements.unshift(AST.IDENTIFIER(true));
        }
        //make the first argument have a right member as other ContionalExpression have
        //this way the loop don't need to check it every iteration
        //can be removed because add Infinity in front while FinFormula
        //!elements[0].left =Case(statement,[0,576||1,906||2,535||3,535])
        //elements[0].left = Case(statement,[0:1,576||<1:2])
        if (!elements[0].left || elements[0].left.name !== 'Infinity') {
            elements[0] = {
                right: elements[0]
            }
        }

        //the the last argument a ContditionalExpression, with default return value NA
        //in the loop this statement is being used to be the alternate
        var lastExpression = elements[elements.length - 1];
        const lastOp = elements[elements.length - 2].operator;
        const usedLastOP = (lastOp == '||' ? '==' : lastOp)
        elements[elements.length - 1] = {
            type      : "ConditionalExpression",
            test      : AST.IDENTIFIER(cs + usedLastOP + elements[elements.length - 2].right.value),
            consequent: lastExpression,
            alternate : AST.IDENTIFIER('NA')
        }

        /*right: elements[0]*/
        for (var i = (elements.length - 2); i > 0; i--) {
            var element = elements[i];
            element.type = 'ConditionalExpression';
            element.test = AST.IDENTIFIER(cs + (element.operator == '||' ? '==' : element.operator) + elements[i - 1].right.value);
            element.consequent = element.left;
            element.alternate = elements[i + 1];
            element.operator = undefined;
            element.right = undefined;
            element.left = undefined;
        }
        node.expressions.push(elements[1])
        //look into delete and undefined, we better use undefined since its quicker.
        node.callee = undefined;
        node.arguments = undefined;
        if (log.TRACE) log.trace('[%s] CASE parsed into: [%s]', formulaInfo.name, escodegen.generate(node));
    },
    //convert traditional If(q,a,b) into q?a:b, skip the entire Callee
    If                 : function(formulaInfo, node) {
        //could be replaced with the default property value..
        if (node.arguments.length === 2) {
            if (log.TRACE) log.trace('Strange formuala setup IF(q,a,b) without b) Using NA as b. [' + formulaInfo.original + ']')
            node.arguments.push(AST.IDENTIFIER('NA'));
        }
        assert.equal(node.arguments.length, 3, formulaInfo.original);
        node.type = "ConditionalExpression";
        node.test = node.arguments[0];
        node.consequent = node.arguments[1];
        node.alternate = node.arguments[2];
        node.arguments.length = 0;
        node.arguments = undefined;
        node.callee = undefined;
    },
    OnER               : function(formulaInfo, node) {
        assert.equal(node.arguments.length, 2, formulaInfo.original);
        //TODO: for now we fix in math. but its better to compile this in the JS code
    },
    //wants horizontale aggregation from values in between two given columns
    HSUM               : function(formulaInfo, node) {
        node.callee.name = "HSUM";
        if (node.arguments[0].type == 'Identifier') {
            node.arguments[0] = {
                "type"    : "MemberExpression",
                "computed": true,
                "object"  : {
                    "type": "Identifier",
                    "name": node.arguments[0].name
                },
                "property": {
                    "type": "Identifier",
                    "name": "all"
                }
            }
        }
    },
    HVALUES            : function(formulaInfo, node) {
        node.callee.name = "HVALUES";
        if (node.arguments[0].type == 'Identifier') {
            node.arguments[0] = {
                "type"    : "MemberExpression",
                "computed": true,
                "object"  : {
                    "type": "Identifier",
                    "name": node.arguments[0].name
                },
                "property": {
                    "type": "Identifier",
                    "name": "all"
                }
            }
        }
    },
    /*
     OnZero: function (node)
     {
     node.arguments = [{
     "type": "Identifier",
     "name": "1"
     }];
     },*/
    //returns max value in between two given columns. entered/non-entered
    MaxValueT          : function(formulaInfo, node) {
        node.arguments = [{
            "type": "Identifier",
            "name": "1",
            "raw" : "1"
        }];
    },
    //ExpandFraction ExpandFraction(VariableCosts,Sales)
    //http://wiki.findesk.com/index.php/ExpandFraction_(numeric_function)
    ExpandFraction     : function(formulaInfo, node) {
        node.arguments = [{
            "type": "Identifier",
            "name": "1",
            "raw" : "1"
        }, {
            "type": "Identifier",
            "name": "2"
        }];
    },
    ExpandOriginalValue: function(formulaInfo, node) {
        node.arguments = [{
            "type": "Identifier",
            "name": "1"
        }];
    },
    /**
     * Inject the x parameter into the call
     */
    FirstValueT        : function(formulaInfo, node) {
        node.arguments.unshift({
            "type": "Identifier",
            "name": "x"
        });
    },
    DateToT            : function(formulaInfo, node) {
        node.arguments.unshift({
            "type": "Identifier",
            "name": "x"
        });
    },
    Visible            : function(formulaInfo, node) {
        node.type = "MemberExpression";
        node.computed = false;
        node.object = AST.IDENTIFIER(node.arguments[0].name);
        node.property = AST.IDENTIFIER('visible');
        delete node.arguments;
        delete node.callee;
    },
    HINT               : function(formulaInfo, node) {
        node.type = "MemberExpression";
        node.computed = false;
        node.object = AST.IDENTIFIER(node.arguments[0].name);
        node.property = AST.IDENTIFIER('hint');
        delete node.arguments;
        delete node.callee;
    },
    //now its provided with (x,SelectDecendents/Array,LambaExpression)
    //we gonna narrow it down until further use of the 'X'. so ForAll(array,property[])
    //now ForAllFunction has no use anymore
    Count              : function(formulaInfo, node) {
        //ok remove first argument X
        node.arguments.splice(0, 1);
        //give the lambda expression to the SelectDecendants function
        node.arguments[0].arguments.push(node.arguments[1])
        //remove the lambda expression
        node.arguments.splice(1, 1);
    },
    Mut                : function(formulaInfo, node) {
        node.arguments = [{
            "type": "Identifier",
            "name": "1"
        }];
    },
    NPV2               : function(formulaInfo, node) {
        node.callee.name = 'NPV';
    }
}
simplified.ForAll = simplified.Count
simplified.Exists = simplified.ForAll;
simplified.IF = simplified.If;
simplified.Hsum = simplified.HSUM;
simplified.HSum = simplified.HSUM;
simplified.if = simplified.If;
simplified.MAX = simplified.Max;

simplified.MIN = simplified.Min;
simplified.min = simplified.Min;
simplified.max = simplified.Max;
simplified.ABS = simplified.Abs;
module.exports = simplified;