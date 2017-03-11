/**
 * Extract constraints from the modelFile
 * @type {AST|exports|module.exports}
 */
var AST = require('../../fesjs/AST.js');
var mapping = require('./Mapping.js');
var escodegen = require('escodegen');
var ABN = require('./ABNGenericModel.js');
var AND = AST.AND;
var OR = AST.OR;
var IF = AST.IF;
var EQUALS = AST.EQUALS;
var NOT = AST.NOT;
var ADD = AST.ADD;
var PARSEFLOAT = AST.PARSEFLOAT;
var ISNAN = AST.ISNAN;
var IDENTIFIER = AST.IDENTIFIER;
var STRING = AST.STRING;
var GT = AST.GT;
var GTE = AST.GTE;
var LT = AST.LT;
var LTE = AST.LTE;
var TRUE = AST.TRUE;

var constraints = {};
var ConstraintTypes = {};
ConstraintTypes[mapping.DateConstraint] = function (constraint)
{
    constraint.validateInput = function (componentId)
    {
        //not tested yet
        return IF(AST.FUNCTION("VALIDDATE", [IDENTIFIER(componentId)]), STRING(""), STRING("Invalid date"));
    }
}
ConstraintTypes[mapping.PatternConstraintType] = function (constraint)
{
    var formulaExplained = 'this PatternConstraint says that ';
    if (constraint[mapping.Pattern] !== undefined)
    {
        formulaExplained += ': value must conform pattern ' + constraint[mapping.Pattern];
    }
    console.info('PatternConstraintType has id ' + constraint._id + ', ' + formulaExplained);
    constraint.validateInput = function (componentId)
    {
        //not tested yet
        return IF(AST.FUNCTION("MATCH", [IDENTIFIER(componentId), constraint.Pattern]), STRING(""), STRING(formulaExplained));
    }
}
ConstraintTypes[mapping.StringConstraintType] = function (constraint)
{
    var formulaExplained = 'this StringConstraint says that ';
    if (constraint[mapping.MinLength] !== undefined)
    {
        formulaExplained += ': value.length >= ' + constraint[mapping.MinLength];
    }
    if (constraint[mapping.MaxLength] !== undefined)
    {
        formulaExplained += ': value.length <= ' + constraint[mapping.MaxLength];
    }
    //console.info('StringConstraintType has id ' + constraint._id + ', ' + formulaExplained);
    constraint.validateInput = function (componentId)
    {
        var gt = AST.LT(AST.FUNCTION("Length", [IDENTIFIER(componentId)]), AST.PARSEFLOAT(STRING(constraint.MinLength)));
        var lt = AST.GT(AST.FUNCTION("Length", [IDENTIFIER(componentId)]), AST.PARSEFLOAT(STRING(constraint.MaxLength)));
        var if2 = IF(AST.AND(AST.NOT(AST.EQUALS(AST.UNDEFINED(), IDENTIFIER(componentId))), AST.OR(gt, lt)), STRING(formulaExplained), STRING(""));
        return if2;
    }
}
ConstraintTypes[mapping.ListConstraintType] = function (constraint)
{
    var entries = constraint[mapping.EntryList][0][mapping.Entry];
    var options = AST.ARRAY();
    var entryValues = [];
    //better do ascending is strange in UI
    for (var i = 0, len = entries.length; i < len; i++)
    {
        var entrie = entries[i];
        entryValues.push(entrie[mapping._value]);
        options.elements.push(AST.CHOICE(entrie[mapping._value], ABN.Label(entrie)));
    }
    constraint.choices = function (componentId)
    {
        return options;
    }
    var formulaExplained = 'this ListConstraint says that a value must be one of these: ' + entryValues.join(', ');

    constraint.validateInput = function (componentId)
    {
        var testIfAST = ADD(ADD("Value ", IDENTIFIER(componentId)), " must be one of these: " + entryValues.join(', '));
        for (var i = 0, len = entries.length; i < len; i++)
        {
            var entry = entries[i];
            testIfAST = IF(EQUALS(STRING(entry[mapping._value]), IDENTIFIER(componentId)), "", testIfAST);
        }
        return IF(EQUALS(componentId, "undefined"), STRING(""), testIfAST);
    }
}
ConstraintTypes[mapping.NumberConstraintType] = function (constraint)
{
    //here we can do some static stuff
    var formulaExplained = ' must be a number';
    if (constraint[mapping.MinInclusive] !== undefined)
    {
        formulaExplained += ' and value >= ' + constraint[mapping.MinInclusive];
    }
    if (constraint[mapping.MinExclusive] !== undefined)
    {
        formulaExplained += ' and value > ' + constraint[mapping.MinExclusive];
    }
    if (constraint[mapping.MaxInclusive] !== undefined)
    {
        formulaExplained += ' and value <= ' + constraint[mapping.MaxInclusive];
    }
    if (constraint[mapping.MaxExclusive] !== undefined)
    {
        formulaExplained += ' and value < ' + constraint[mapping.MaxExclusive];
    }
    if (constraint[mapping.FractionDigits] !== undefined)
    {
        formulaExplained += ' and value has ' + constraint[mapping.FractionDigits] + ' fractionDigits';
    }
    //in the generate function the dynamic stuff takes place.
    constraint.validateInput = function (componentId)
    {
        var minInclusiveAST = TRUE();
        var minExclusiveAST = TRUE();
        var maxInclusiveAST = TRUE();
        var maxExclusiveAST = TRUE();
        var fractionDigitsAST = TRUE();

        if (constraint[mapping.MinInclusive] !== undefined)
        {
            minInclusiveAST = GTE(IDENTIFIER(componentId), STRING(Number(constraint[mapping.MinInclusive])));
        }
        if (constraint[mapping.MinExclusive] !== undefined)
        {
            minExclusiveAST = GT(IDENTIFIER(componentId), STRING(Number(constraint[mapping.MinExclusive])));
        }
        if (constraint[mapping.MaxInclusive] !== undefined)
        {
            maxInclusiveAST = LTE(IDENTIFIER(componentId), STRING(Number(constraint[mapping.MaxInclusive])));
        }
        if (constraint[mapping.MaxExclusive] !== undefined)
        {
            maxExclusiveAST = LT(IDENTIFIER(componentId), STRING(Number(constraint[mapping.MaxExclusive])));
        }
        if (constraint[mapping.FractionDigits] !== undefined)
        {
        }

        var left = EQUALS(IDENTIFIER(componentId), "undefined");
        var right = AND(AND(AND(AND(AND(AND(NOT(ISNAN(PARSEFLOAT(IDENTIFIER(componentId)))), PARSEFLOAT(IDENTIFIER(componentId))), minInclusiveAST), minExclusiveAST), maxInclusiveAST), maxExclusiveAST), fractionDigitsAST);
        return IF(OR(left, right), "", ADD(ADD("value ", IDENTIFIER(componentId)), formulaExplained));
    }

}
function generate(constraintId, type, componentId)
{
    if (constraints[constraintId] == undefined)
    {
        throw Error('Constraint with id [' + constraintId + '] was not defined in Constraint section');
    }
    return constraints[constraintId][type](componentId);
}
var JSVisit = {};
JSVisit[mapping.Constraint] = function(constraint)
{
    constraints[constraint[mapping._id]] = constraint;
    if (ConstraintTypes[mapping[constraint[mapping._xsi_type]]] == undefined)
    {
        console.error('Not Supported: ' + constraint[mapping._xsi_type]);
    }
    else
    {
        ConstraintTypes[mapping[constraint[mapping._xsi_type]]](constraint)
    }
}
module.exports = {
    generate: generate,
    JSVisit: JSVisit
};