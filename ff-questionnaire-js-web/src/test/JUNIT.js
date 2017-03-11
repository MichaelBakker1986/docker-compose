var fs = require('fs');
var assert = require('assert');
/**
 * This file should not be used in production. its only for testing purpose.
 */

function arraysEqual(a, b)
{
    if (a === b)
    {
        return true;
    }
    if (a == null)
    {
        if (b == null)
        {
            return true;
        }
        return b.length == 0;
    }
    if (b == null)
    {
        if (a == null)
        {
            return true;
        }
        return a.length == 0;
    }
    return a.length == b.length;
};
function validateTree(expected, actual, expectedChildrenProperty, actualChildrenProperty, equalsFunction)
{
    assert.ok(equalsFunction(expected, actual))
    var expectedChildren = expected[expectedChildrenProperty];
    var actualChildren = actual[actualChildrenProperty];
    arraysEqual(expectedChildren, actualChildren);
    if (expectedChildren !== undefined && actualChildren !== undefined)
    {
        for (var i = 0; i < expectedChildren.length; i++)
        {
            validateTree(expectedChildren[i], actualChildren[i], expectedChildrenProperty, actualChildrenProperty, equalsFunction);
        }
    }
};
assert.ok(arraysEqual(undefined, undefined))
assert.ok(arraysEqual(null, undefined))
assert.ok(arraysEqual(undefined, null))
assert.ok(arraysEqual([], null))
assert.ok(arraysEqual(undefined, []))
assert.ok(!arraysEqual([1, 2], [1]))
module.exports = {
    getFile: function (name)
    {
        return fs.readFileSync('../resources/' + name, 'utf8');
    },
    print: function (data)
    {
        if (!process.alltest)
        {
            console.info(data);
        }
    },
    printPretty: function (data)
    {
        module.exports.print(JSON.stringify(data, null, 2))
    },
    resources: '..../resources/',
    arraysEqual: arraysEqual,
    validateTree: validateTree
};