/**
 * Recursive Rules parser
 * Will modify original AST and convert into default AST
 * See JSVis
 * @type {AST|exports|module.exports}
 */
var AST = require('../../fesjs/AST.js');
var mapping = require('./Mapping.js');
var rules = {};
var Types = {};
Types[mapping.Always] = function (node)
{
    node.type = "Identifier";
    node.name = true;
}
Types[mapping.Never] = function (node)
{
    node.type = "Identifier";
    node.name = false;
}
Types[mapping.LogicalType] = function (node)
{
    //Abstract Type of implementations
    // Should not get pass here
    throw Error("Abstract implementation, expected concrete variation");
}
Types[mapping.NotType] = function (node)
{
    node.type = "UnaryExpression";
    node.operator = "!";
    node.argument = node.Condition;
    node.prefix = true;
}
Types[mapping.AndType] = function (node)
{
    node.type = "LogicalExpression";
    node.operator = "&&";
    node._xsi_type = undefined;
}
Types[mapping.OrType] = function (node)
{
    node.type = "LogicalExpression";
    node.operator = "||";
    node._xsi_type = undefined;
}
Types[mapping.ElementType] = function (node)
{
    //Abstract Type of implementations
    // Should not get pass here
    throw Error("Abstract implementation, expected concrete variation");
}
Types[mapping.QuestionRefType] = function (node)
{
    node.type = "Identifier";
    node.name = node.__text;
    node.__text = undefined;
    node._xsi_type = undefined;
}
Types  [mapping.ResultRefType] = function (node)
{
    node.type = "Identifier";
    node.name = node.__text;
}
Types[mapping.FixedValueType] = function (node)
{
    node.type = "Literal";
    node.value = node.__text;
    node.__text = undefined;
    node._xsi_type = undefined;
}
Types[mapping.EmptyValueType] = function (node)
{
    node.type = "Identifier";
    node.name = "undefined";
}
Types[mapping.CheckType] = function (node)
{
    //Abstract Type of implementations
    // Should not get pass here
    throw Error("Abstract implementation, expected concrete variation");
}
Types[mapping.EqualsTo] = function (node)
{
    node.type = "BinaryExpression";
    node.operator = "===";
    node._xsi_type = undefined;
}
Types[mapping.LessThan] = function (node)
{
    node.type = "BinaryExpression";
    node.operator = "<";
    node._xsi_type = undefined;
}
Types[mapping.LessThanEqualsTo] = function (node)
{
    node.type = "BinaryExpression";
    node.operator = "<=";
    node._xsi_type = undefined;
}
Types[mapping.GreaterThan] = function (node)
{
    node.type = "BinaryExpression";
    node.operator = ">";
    node._xsi_type = undefined;
}
Types[mapping.GreaterThanEqualsTo] = function (node)
{
    node.type = "BinaryExpression";
    node.operator = ">=";
    node._xsi_type = undefined;
}
Types[mapping.ValueType] = function (node)
{
    node.type = "Literal";
    node.value = node.__text;
    node.__text = undefined;
    node._xsi_type = undefined;
}
Types.undefined = function (node)
{
    // throw Error("Unknown _xsi_type:" + node);
}
Types[mapping.RulesType] = function (node)
{
    //not doing anything here
}
Types[mapping.RuleType] = function (node)
{
    //not doing anything here
}
Types[mapping.DisplayTextType] = function (node)
{
    //not doing anything here
}
var JSVisit = {};
JSVisit[mapping.Rule] = function (node)
{
    rules[node[mapping._id]] = node;
}

JSVisit[mapping._xsi_type] = function (node)
{
    var node2 = node[mapping._xsi_type];
    if (Types[mapping[node2]] !== undefined)
    {
        Types[mapping[node2]](node);
    }
}
//better instruct ABN to not use Condition nor Element as Array, its just an object with a left and a right property
JSVisit[mapping.Condition] = function (node)
{
    var elements = node[mapping.Element];
    if (Array.isArray(elements))
    {
        if (elements.length !== 2)
        {
            throw Error("Must always be two elements, left and right");
        }
        node.left = AST.fallBackToIdentifier(elements[0]);
        node.right = AST.fallBackToIdentifier(elements[1]);
        node.Element = undefined;
    }
    else if (Array.isArray(node[mapping.Condition]))
    {
        if (node[mapping.Condition].length !== 2)
        {
            throw Error("Must always be two elements, left and right");
        }
        node.left = node[mapping.Condition][0];
        node.right = node[mapping.Condition][1];
        node[mapping.Condition] = undefined;
    }
}
function generate(ruleId)
{
    if (rules[ruleId] == undefined)
    {
        throw Error("Rule was not defined in Rules section " + ruleId);
    }
    return rules[ruleId][mapping.Condition];
}
module.exports = {
    generate: generate,
    JSVisit: JSVisit
};