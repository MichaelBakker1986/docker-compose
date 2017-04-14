var visitor = require('../../clientscorecard/JSVisitor.js');
/**
 * Parse the components from the modelFile
 * Add functions onto the FormulaMap corresponding
 * @type {visit|exports|module.exports}
 *
 * Pattern and DateConstraint are not called yet.
 */
var JSVisitor = visitor.visit;
var JSFinder = visitor.find;
var visitTopDown = visitor.visitTopDown;
var AST = require('../../fesjs/AST.js');
var ConstraintParser = require('./Constraints.js');
var RulesParser = require('./Rules.js');
var mapping = require('./Mapping.js');
var ABN = require('./ABNGenericModel.js');
var UIModel = require('../../clientscorecard/uimodel.js');
var components = {};
var languages = {};
var FESFacade;

var ADD = AST.ADD;
var ZEROONNAN = AST.ZEROONNAN;

function parseUIModel(solution, node, FESFacadeArg)
{
    FESFacade = FESFacadeArg;
    //lets add languages to the rootNode
    //node.Components.Component.languages = languages;
    //iterate the Constaints to start with, we need them before we can do something with the Components
    JSVisitor(node[mapping.Constraints], null, ConstraintParser.JSVisit);
    //same for the Rules.
    JSVisitor(node[mapping.Rules], null, RulesParser.JSVisit);
    //now add some properties to the Component
    JSVisitor(node[mapping.Components], null, AnyType);
    visitTopDown(node[mapping.Components], null, Components);
}
var ComponentTypes = {}
ComponentTypes [mapping.QuestionType] = function (component)
{
    var componentId = component[mapping._id];
    FESFacade.addLink(componentId, 'value', false, "undefined");
    FESFacade.addLink(componentId, 'locked', true, false);
}
var ResultTypes = {
    AddType: AST.ADD,
    MultiplyType: AST.MULTIPLY,
    SubtractType: AST.MIN
}
ComponentTypes[mapping.ResultType] = function (component)
{
    component.displayAs = 'TextAnswerType';
    var calculation = component[mapping.Calculation];
    //make the AddType function
    var ast = ZEROONNAN(calculation[mapping.QuestionId][0]);
    for (var i = 1; i < calculation[mapping.QuestionId].length; i++)
    {
        ast = ResultTypes[calculation.type](ast, ZEROONNAN(calculation[mapping.QuestionId][i]))
    }
    //add formula to model
    //register it to the value property, its locked.
    FESFacade.addLink(component[mapping._id], 'value', true, ast);
    FESFacade.addLink(component[mapping._id], 'locked', true, true);
}
ComponentTypes.undefined = function (component)
{
    //Don't add any functions for the Undefined Types
    //Headers etc.
    FESFacade.addLink(component[mapping._id], 'locked', true, true);
}
ComponentTypes[mapping.SectionType] = function (component)
{
    //Don't add any functions for the SectionType Types
    FESFacade.addLink(component[mapping._id], 'locked', true, true);
}
ComponentTypes[mapping.QuestionGroupType] = function (component)
{
    FESFacade.addLink(component[mapping._id], 'locked', true, true);
}
//Interesting and vendor specific part goes here.
var AnyType = {};
AnyType[mapping.Component] = function (node)
{
    components[node[mapping._id]] = node;
    //  node.displayAs = 'undefined';
    //every component needs other boilet plate,
    //ridrect into componentHandler
    ComponentTypes[node[mapping._xsi_type]](node);
}
AnyType[mapping._language] = function (node)
{
    //gather all languages
    languages[node[mapping._language]] = node[mapping._language];
}
AnyType[mapping.MandatoryRule] = function (node)
{
    var component = findComponent(node);
    var body = RulesParser.generate(node[mapping._refId]);
    FESFacade.addLink(component[mapping._id], 'required', true, body);
}
AnyType[mapping.ValidationRule] = function (node)
{
    // the answer value must be conform this validation rule
    // console.info('ValidationRule of component ' + scope.componentId + ' has refId ' + component._refId);
    var component = findComponent(node);
    var body = RulesParser.generate(node._refId);
    FESFacade.addLink(component[mapping._id], 'validation', true, body);
}
AnyType[mapping.RelevantRule] = function (node)
{
    var component = findComponent(node);
    var body = RulesParser.generate(node[mapping._refId]);
    FESFacade.addLink(component[mapping._id], 'visible', true, body);
}
AnyType[mapping.DateConstraint] = function (node)
{
    //not impl yet
    throw Error('Not been tested yet');
}
AnyType[mapping.PatternConstraint] = function (node)
{
    //not impl yet
    throw Error('Not been tested yet');
}
AnyType[mapping.StringConstraint] = function (node)
{
    var component = findComponent(node);
    FESFacade.addLink(component[mapping._id], 'validateInput', true, ConstraintParser.generate(node[mapping._refId], 'validateInput', component[mapping._id]));
}
AnyType[mapping.NumberConstraint] = function (node)
{
    var component = findComponent(node);
    FESFacade.addLink(component[mapping._id], 'validateInput', true, ConstraintParser.generate(node[mapping._refId], 'validateInput', component[mapping._id]));
}
AnyType[mapping.ListConstraint] = function (node)
{
    var component = findComponent(node);
    var componentId = component[mapping._id];
    FESFacade.addLink(componentId, 'choices', true, ConstraintParser.generate(node[mapping._refId], 'choices', componentId));
    FESFacade.addLink(componentId, 'validateInput', true, ConstraintParser.generate(node[mapping._refId], 'validateInput', componentId));
}

AnyType[mapping.Label] = function (node)
{
    var component = findComponent(node);
    FESFacade.addLink(component[mapping._id], 'title', true, ABN.Label(node));
}
AnyType[mapping.Answer] = function (node)
{
    var component = findComponent(node);
    component.displayAs = node[mapping._xsi_type];
}
function findComponent(node)
{
    return JSFinder(node, "_parentKey", mapping.Component)
}
/**
 * This part is ABN specific with 'Component'
 * @type {{component: Function}}
 */
var Components = {
    component: function (node)
    {
        //create ui object
        var item = {
            rowId: node.id,
            displayAs: node.displayAs || node.type || "undefined",
            mandatoryRule: node.mandatoryRule !== undefined,
            relevantRule: node.relevantRule !== undefined,
            validationRule: node.validationRule !== undefined,
            nodes: []
        };

        //find parent
        var parent = JSFinder(node, '_parentKey', 'component');

        var parentId = parent === undefined || parent.id === undefined ? 'root_value' : parent.id + '_value';

        UIModel.addUi(item.rowId, 'value', item, parentId);
        if (item.displayAs === 'select')
        {
            UIModel.getUI(item.rowId, 'choices').displayAs = 'PropertyType';
        }
        if (item.relevantRule)
        {
            UIModel.getUI(item.rowId, 'visible').displayAs = 'PropertyType';
        }
        if (item.mandatoryRule)
        {
            UIModel.getUI(item.rowId, 'required').displayAs = 'PropertyType';
        }
        if (item.displayAs !== 'SectionType')
        {
            UIModel.getUI(item.rowId, 'validateInput').displayAs = 'PropertyType';
        }
        UIModel.getUI(item.rowId, 'locked').displayAs = 'PropertyType';
        UIModel.getUI(item.rowId, 'title').displayAs = 'PropertyType';
    }
}

module.exports = {
    parseUIModel: parseUIModel
};