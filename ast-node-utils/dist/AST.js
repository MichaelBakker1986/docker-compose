"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Default AST templates
 * alternative ast-types
 * Should be excluded from front-end
 */
function _STRING(text) {
    return {
        "type": "Literal",
        "value": text
    };
}
function IDENTIFIER(text) {
    return {
        "type": "Identifier",
        "name": text
    };
}
function fallBackToString(value) {
    return (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object' ? value : _STRING(value);
}
function fallBackToIdentifier(value) {
    return (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object' ? value : IDENTIFIER(value);
}
function FUNCTION(name, args) {
    return {
        "type": "CallExpression",
        "callee": fallBackToIdentifier(name),
        "arguments": args
    };
}
function EQUALS(left, right) {
    return {
        "type": "BinaryExpression",
        "operator": "===",
        "left": fallBackToIdentifier(left),
        "right": fallBackToIdentifier(right)
    };
}
function IF(condition, consequent, alternative) {
    return {
        "type": "ConditionalExpression",
        "test": condition,
        "consequent": fallBackToString(consequent),
        "alternate": fallBackToString(alternative)
    };
}
function PROPERTY(key, value) {
    return {
        "type": "Property",
        "key": _STRING(key),
        "computed": false,
        "value": fallBackToString(value),
        "kind": "init",
        "method": false,
        "shorthand": false
    };
}
//Helper, to clone AST tree's and replacing X for lamba expressions
function cloneAST(obj, replace, to) {

    if (obj === null || (typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== 'object') {
        return obj;
    }
    //i
    var temp = Array.isArray(obj) ? [] : {}; //obj.constructor();// {}; // give temp the original obj's constructor
    for (var key in obj) {
        if (obj[key] === replace) {
            temp[key] = to;
        } else {
            var childClone = cloneAST(obj[key], replace, to);
            if (typeof childClone !== 'function') {
                temp[key] = childClone;
            }
        }
    }
    return temp;
}
var AST = {
    fallBackToIdentifier: fallBackToIdentifier,
    FUNCTION: FUNCTION,
    GTE: function GTE(left, right) {
        return {
            "type": "BinaryExpression",
            "operator": ">=",
            "left": left,
            "right": right
        };
    },
    GT: function GT(left, right) {
        return {
            "type": "BinaryExpression",
            "operator": ">",
            "left": left,
            "right": right
        };
    },
    LT: function LT(left, right) {
        return {
            "type": "BinaryExpression",
            "operator": "<",
            "left": left,
            "right": right
        };
    },
    TRUE: function TRUE() {
        return IDENTIFIER(true);
    },
    FALSE: function FALSE() {
        return IDENTIFIER(false);
    },
    LTE: function LTE(left, right) {
        return {
            "type": "BinaryExpression",
            "operator": "<=",
            "left": left,
            "right": right
        };
    },
    NONAN: function NONAN(identifier) {
        return {
            "type": "ConditionalExpression",
            "test": FUNCTION("isNaN", [IDENTIFIER(identifier)]),
            "consequent": _STRING(0),
            "alternate": IDENTIFIER(identifier)
        };
    },
    ZEROONNAN: function ZEROONNAN(identifier) {
        return FUNCTION("ZeroOnNaN", [IDENTIFIER(identifier)]);
    },
    IDENTIFIER: IDENTIFIER,
    EQUALS: EQUALS,
    NOTEQUAL: function NOTEQUAL(left, right) {
        return {
            "type": "BinaryExpression",
            "operator": "!==",
            "left": fallBackToIdentifier(left),
            "right": fallBackToIdentifier(right)
        };
    },
    ISNAN: function ISNAN(ast) {
        return FUNCTION("isNaN", [ast]);
    },
    NOT: function NOT(ast) {
        return {
            "type": "UnaryExpression",
            "operator": "!",
            "argument": ast,
            "prefix": true
        };
    },
    AND: function AND(left, right) {
        return {
            "type": "LogicalExpression",
            "operator": "&&",
            "left": left,
            "right": right
        };
    },
    PARSEFLOAT: function PARSEFLOAT(value) {
        return FUNCTION("parseFloat", [fallBackToString(value)]);
    },
    OR: function OR(left, right) {
        return {
            "type": "LogicalExpression",
            "operator": "||",
            "left": left,
            "right": right
        };
    },
    EXPRESSION: function EXPRESSION(ast) {
        return {
            "type": "ExpressionStatement",
            "expression": fallBackToIdentifier(ast)
        };
    },
    ADD: function ADD(left, right) {
        return {
            "type": "BinaryExpression",
            "operator": "+",
            "left": fallBackToString(left),
            "right": fallBackToString(right)
        };
    },
    MIN: function MIN(left, right) {
        return {
            "type": "BinaryExpression",
            "operator": "-",
            "left": fallBackToString(left),
            "right": fallBackToString(right)
        };
    },
    MULTIPLY: function MULTIPLY(left, right) {
        return {
            "type": "BinaryExpression",
            "operator": "*",
            "left": fallBackToString(left),
            "right": fallBackToString(right)
        };
    },
    IF: IF,
    MEMBER: function MEMBER(obj, property) {
        return {
            "type": "MemberExpression",
            "computed": false,
            "object": obj,
            "property": IDENTIFIER(property)
        };
    },
    STRING: function STRING(test) {
        return _STRING(test);
    },
    UNDEFINED: function UNDEFINED() {
        return IDENTIFIER("undefined");
    },
    PROPERTY: PROPERTY,
    CHOICE: function CHOICE(key, value) {
        return {
            "type": "ObjectExpression",
            "properties": [PROPERTY("name", key), PROPERTY("value", value)]
        };
    },
    ARRAY: function ARRAY() {
        return {
            "type": "ArrayExpression",
            "elements": []
        };
    },
    PROGRAM: function PROGRAM(body) {
        return {
            "type": "Program",
            "body": [body],
            "sourceType": "script"
        };
    },
    cloneAST: cloneAST
};
module.exports = AST;