
var AST = require('../archive/fesjs/AST.js');
var esprima = require('esprima');
var escodegen = require('escodegen');
var esmangle = require('esmangle');
var assert = require('assert');
var util = require('util');

var xts = String('')
var x = [{"word": "we", "freq": 29, "score": 300, "flags": "bc", "syllables": "1"},
    {"word": "e", "freq": 24, "score": 300, "flags": "c", "syllables": "1"},
    {"word": "ie", "freq": 24, "score": 300, "flags": "", "syllables": "1"}].map(function (ea)
    {
        return {name: ea.word, value: ea.word, score: ea.score, meta: "rhyme"}
    })
console.info(x);
var arr = ['a', 'two'];
arr.unshift('b');
arr.push('c')
console.info(arr)
//console.info('Q_statUSa 201'.replace(/Q_([a-z]*)/gmi, 'Q_' + "$1".toUpperCase()))

var r = 'bQ_statUSa 201'.replace(/(Q_\w*)/gmi, function (v) { return v.toUpperCase(); });


var buf = 'If(DataEntered(IMPORT_relnr,1) ,1,0) || (Q_Status[1]==1)'.replace(/([^\w]{1})(Q_\w*)/gmi, function ($1, $2)
    {
        return $2 + $1.toUpperCase()
    }
);

function testSwitch(name)
{
    return ((( _in = name, _in === 'a' ? 1 : (_in === 'b' ? 2 : 0))))
}
var switchCase = {
    "type": "SequenceExpression",
    "expressions": [
        {
            "type": "AssignmentExpression",
            "operator": "=",
            "left": {
                "type": "Identifier",
                "name": "_in"
            },
            "right": {
                "type": "Identifier",
                "name": "name"
            }
        },
        {
            "type": "ConditionalExpression",
            "test": {
                "type": "BinaryExpression",
                "operator": "===",
                "left": {
                    "type": "Identifier",
                    "name": "_in"
                },
                "right": {
                    "type": "Literal",
                    "value": "a",
                    "raw": "'a'"
                }
            },
            "consequent": {
                "type": "Literal",
                "value": 1,
                "raw": "1"
            },
            "alternate": {
                "type": "ConditionalExpression",
                "test": {
                    "type": "BinaryExpression",
                    "operator": "===",
                    "left": {
                        "type": "Identifier",
                        "name": "_in"
                    },
                    "right": {
                        "type": "Literal",
                        "value": "b",
                        "raw": "'b'"
                    }
                },
                "consequent": {
                    "type": "Literal",
                    "value": 2,
                    "raw": "2"
                },
                "alternate": {
                    "type": "Literal",
                    "value": 0,
                    "raw": "0"
                }
            }
        }
    ]
}


console.info(testSwitch('b'))


//console.info(JSON.stringify(exprima.parse('ABC(TEST.required||TEST)'), null, 2))
//var r = a.replace(/(f)/, function(v) { return v.toUpperCase(); });
console.info(JSON.stringify(esprima.parse("false ? '' : ((( _in = name, _in === 'a' ? 1 : (_in === 'b' ? 2 : (_in === 'c' ? 3 : 0)))))"), null, 2))
console.info(JSON.stringify(esprima.parse('ABC("a",{})'), null, 2))
console.info(JSON.stringify(esprima.parse('ABC["a",{}]'), null, 2))
console.info(JSON.stringify(esprima.parse('ABC[T-1]'), null, 2))
var seq = {
    type: 'SequenceExpression',
    ope9rator: '||',
    expression: [{
        type: 'Identifier',
        name: 1
    }, {
        type: 'Identifier',
        name: 'true'
    }]
}
//var esc = escodegen.generate(seq);

var s = 'a_adsada_a';
console.info(s.substring(s.indexOf("_") + 1));
console.info('bla_value'.indexOf('bla_'))
9
var output = {
    A: [],
    B: []
};

[
    {name: 'first', type: 'A'},
    {name: 'second', type: 'A'},
    {name: 'thrid', type: 'B'}
].reduce(function (result, currentItem)
    {
        result[currentItem.type].push(currentItem);
        return result;
    }, output)

console.info(output)


//fastest and most elegant way to extract the formula's from the map.
var aa = {0: "a", 1: "b", 2: "c", length: 4, test: 'x'};
// convert to array
var bb = Array.prototype.slice.call(aa);
console.info(bb)

//npm node-array, can so async forEach
//

var map = {
    'a': {
        name: 'a'
    },
    'b': {
        name: 'b'
    }
}
//var arrOfVals = map.map(function (it) { return it.name})
//console.info(arrOfVals)
var test = {
    a: 'a'
}
var func = Function('return this.a;').bind(test);
console.info(func())


var array = Object.keys(map).map(function (key)
{
    if (key === 'a')
    {
        return map[key]
    }
})
console.info(array)

var test = [1, 2, 3, undefined];
var newArray = test.reduce(function (result, element)
{
    if (element !== undefined)
    {
        result.push(element);
    }
    return result;
}, []);
console.info(newArray)
var SETTINGS = {LANGUAGE: 'en'}
var code = "var a = 'en'===SETTINGS.LANGUAGE && true && true ?'BUSINESS RISK':'BUSINESS RISK'";
var ast = esprima.parse(code);
var optimized = esmangle.optimize(ast, null);
var result = esmangle.mangle(optimized);  // gets mangled AST
console.log(escodegen.generate(result));  // dump AST
var a = ('en' === SETTINGS.LANGUAGE, 'BUSINESS RISK');
console.info(a)
var test = {
    'a': true,
    'b': true
}

console.info(Object.keys(test))

var test = {};
test.prototype = {a: 'b'};

var test2 = {a: 'c'};
var set = new Set();

set.add({name: 'a'});
set.add({name: 'a'});

console.info(set.size)

function onlyUnique(value, index, self)
{
    console.info(value + " : " + self)
    return value.name === self.name;
}

// usage example:
var a = [{name: 'test'}, {name: 'test'}, {name: 'other'}, {name: 'other2'}]
var unique = a.filter(onlyUnique);
console.info(unique)

console.info((JSON.stringify(esprima.parse("this[123]('TEST',x.doc,y,z,v)"), null, 2)))
console.info((escodegen.generate({
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "Identifier",
                "name": "this[123]('TEST', x.doc, y, z, v)"
            }
        }
    ],
    "sourceType": "script"
})))