/**
 * Default AST templates
 * alternative ast-types
 * Should be excluded from front-end
 */
function STRING(text)
{
    return {
        "type": "Literal",
        "value": text
    }
}
function IDENTIFIER(text)
{
    return {
        "type": "Identifier",
        "name": text
    }
}
function fallBackToString(value)
{
    return (typeof value === 'object') ? value : STRING(value);
}
function fallBackToIdentifier(value)
{
    return (typeof value === 'object') ? value : IDENTIFIER(value);
}
function FUNCTION(name, args)
{
    return {
        "type": "CallExpression",
        "callee": fallBackToIdentifier(name),
        "arguments": args
    }
}
function EQUALS(left, right)
{
    return {
        "type": "BinaryExpression",
        "operator": "===",
        "left": fallBackToIdentifier(left),
        "right": fallBackToIdentifier(right)
    }
}
function IF(condition, consequent, alternative)
{
    return {
        "type": "ConditionalExpression",
        "test": condition,
        "consequent": fallBackToString(consequent),
        "alternate": fallBackToString(alternative)
    }
}
function PROPERTY(key, value)
{
    return {
        "type": "Property",
        "key": STRING(key),
        "computed": false,
        "value": fallBackToString(value),
        "kind": "init",
        "method": false,
        "shorthand": false
    }
}
//Helper, to clone AST tree's and replacing X for lamba expressions
function cloneAST(obj, replace, to)
{

    if (obj === null || typeof obj !== 'object')
    {
        return obj;
    }
    //i
    var temp = Array.isArray(obj) ? [] : {};//obj.constructor();// {}; // give temp the original obj's constructor
    for (var key in obj)
    {
        if (obj[key] === replace)
        {
            temp[key] = to;
        }
        else
        {
            var childClone = cloneAST(obj[key], replace, to);
            if ((typeof childClone !== 'function'))
            {
                temp[key] = childClone;
            }
        }
    }
    return temp;
}
var AST = {
    fallBackToIdentifier: fallBackToIdentifier,
    FUNCTION: FUNCTION,
    GTE: function (left, right)
    {
        return {
            "type": "BinaryExpression",
            "operator": ">=",
            "left": left,
            "right": right
        };
    },
    GT: function (left, right)
    {
        return {
            "type": "BinaryExpression",
            "operator": ">",
            "left": left,
            "right": right
        };
    },
    LT: function (left, right)
    {
        return {
            "type": "BinaryExpression",
            "operator": "<",
            "left": left,
            "right": right
        };
    },
    TRUE: function ()
    {
        return IDENTIFIER(true);
    },
    FALSE: function ()
    {
        return IDENTIFIER(false);
    },
    LTE: function (left, right)
    {
        return {
            "type": "BinaryExpression",
            "operator": "<=",
            "left": left,
            "right": right
        };
    },
    NONAN: function (identifier)
    {
        return {
            "type": "ConditionalExpression",
            "test": FUNCTION("isNaN", [IDENTIFIER(identifier)]),
            "consequent": STRING(0),
            "alternate": IDENTIFIER(identifier)
        };
    },
    ZEROONNAN: function (identifier)
    {
        return FUNCTION("ZeroOnNaN", [IDENTIFIER(identifier)]);
    },
    IDENTIFIER: IDENTIFIER,
    EQUALS: EQUALS,
    NOTEQUAL: function (left, right)
    {
        return {
            "type": "BinaryExpression",
            "operator": "!==",
            "left": fallBackToIdentifier(left),
            "right": fallBackToIdentifier(right)
        }
    },
    ISNAN: function (ast)
    {
        return FUNCTION("isNaN", [ast]);
    },
    NOT: function (ast)
    {
        return {
            "type": "UnaryExpression",
            "operator": "!",
            "argument": ast,
            "prefix": true
        };
    },
    AND: function (left, right)
    {
        return {
            "type": "LogicalExpression",
            "operator": "&&",
            "left": left,
            "right": right
        };
    },
    PARSEFLOAT: function (value)
    {
        return FUNCTION("parseFloat", [fallBackToString(value)]);
    },
    OR: function (left, right)
    {
        return {
            "type": "LogicalExpression",
            "operator": "||",
            "left": left,
            "right": right
        }
    },
    EXPRESSION: function (ast)
    {
        return {
            "type": "ExpressionStatement",
            "expression": fallBackToIdentifier(ast)
        }
    },
    ADD: function (left, right)
    {
        return {
            "type": "BinaryExpression",
            "operator": "+",
            "left": fallBackToString(left),
            "right": fallBackToString(right)
        };
    },
    MIN: function (left, right)
    {
        return {
            "type": "BinaryExpression",
            "operator": "-",
            "left": fallBackToString(left),
            "right": fallBackToString(right)
        };
    },
    MULTIPLY: function (left, right)
    {
        return {
            "type": "BinaryExpression",
            "operator": "*",
            "left": fallBackToString(left),
            "right": fallBackToString(right)
        };
    },
    IF: IF,
    MEMBER: function (obj, property)
    {
        return {
            "type": "MemberExpression",
            "computed": false,
            "object": obj,
            "property": IDENTIFIER(property)
        };
    },
    STRING: function (test)
    {
        return STRING(test);
    },
    UNDEFINED: function ()
    {
        return IDENTIFIER("undefined");
    },
    PROPERTY: PROPERTY,
    CHOICE: function (key, value)
    {
        return {
            "type": "ObjectExpression",
            "properties": [
                PROPERTY("name", key),
                PROPERTY("value", value)
            ]
        };
    },
    ARRAY: function ()
    {
        return {
            "type": "ArrayExpression",
            "elements": []
        }
    },
    PROGRAM: function (body)
    {
        return {
            "type": "Program",
            "body": [body],
            "sourceType": "script"
        };
    },
    cloneAST: cloneAST
}
module.exports = AST;