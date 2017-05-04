var assert = require('assert');
var fileParser = require('./fileParser');
var FinFormula = require('./FinFormula');
var Stack = require('stack-adt');
var visitor = require('../../fesjs/JSVisitor');
var log = require('ff-log');
/*
 datatype: true,
 frequency: true,
 formula: true,
 data_options: true,
 title: true,
 displaytype: true,
 choices: true,
 top_blanklines: true,
 locked: true,
 visible: true,
 options_title: true,
 options_notrend: true,
 options_trend: true,
 aggregation: true,
 top_separator: true,
 bottom_separator: true,
 fixed_decimals: true,
 hint: true,
 refer: true,
 flipflop_trend: true,
 flipflop_notrend: true,
 formula_trend: true,
 pattern: true,
 unspecified: true,
 afterinput: true,
 */
/*
 The purpose of these methods is:
 convert ffl into Javascript
 convert Javascript into ffl

 This part is sky high complex, so be aware
 The regex and the replacement are in Objects these objects are in an Array
 The loop will execute the regular expressions on the input String.
 U can print the result every iteration to see the effect of the expression.
 All regex bits are documented, they should do.

 Very generic bits are separated from model specific language
 If a new operator needs to be added, or one has changed. it should not be that hard.
 If u try fix a bug here, Good Luck :)
 */
function FflToJsonConverter() {
}
//has to be Unit Tested very intensive
//FIN,FFL formula language to JavaScript language
function parseRegex(contents) {
    //first place some properties from variables on different lines

    //var data = contents.replace(/^(model \s*)([\w]*)\s*(uses)?\s*([\w]*)\s*\{/mi).replace("$1$2\n{\n  inherit:$4;");
    //variable x refers to z
    //{
    //some lines end with a ',' they are concerning about the same thing.
    var data = contents.replace(/,\s*\n/gm, ',');
    data = data.replace(/\/\/.*\n?$/gm, '');
    data = FinFormula.fixCasing(data);
    //==> variable x
    //==> {
    //==>  reger: z
    data = data.replace(/^(\s+)((?:variable|tuple)\s+[\w\-\=\+]+)\s+refers to\s+([\w\-\+\=]+)\s*\{/gmi, "$1$2$1{$1  refer: $3;");
    //something smart with the title

    //the variable modifier
    //variable =x
    //==> variable x
    //==> {
    //==>  modifier: =
    data = data.replace(/^(\s+)((?:variable|tuple)\s*)?([\-\=\+]{1})\s*([\w]+)\s*\{'/gmi).replace("$1$2$4$1{$1  modifier: $3;");

    //remove tabs,remove line-breaks, replace " with '
    data = data.replace(/\t/gm, '').replace(/^\s*root\s*$/gmi, ' Root ;').replace(/([^;])[\r?\n]+/gm, '$1').replace(/\r?\n|\r/gm, ';').replace(/\s\s+/gm, ' ').replace(/\"(.*)'(.*)\"/gm, '"$1 $2"')
    //
        .replace(/"/gm, '\'');

    //in ffl some variables are just prepended with &, for some reason i don't understand
    //EvaluateAsString(If(Q_Map13 = 0.0, && "Nog niet alle vragen zijn beantwoord.", && "") && scRestricties && Q_WARNING_GLOBAL)
    //becomes EvaluateAsString(If(Q_Map13 = 0.0, "Nog niet alle vragen zijn beantwoord.", "") + scRestricties + Q_WARNING_GLOBAL)
    return data;
}
//these steps are done to go back from a JSON object to ffl
var deparsers = [
    {
        //remove all ""
        regex: /"/g,
        replace: ''
    },
    {
        //remove all lines with children:[
        //consider merging them with the next one, this one creates whitespace which the next one will remove
        regex: /children\:.*\[.*\n/g,
        replace: ''
    },
    {
        //remove all lines ]
        regex: /^\s*]\s*\n/gmi,
        replace: ''
    },
    {   //complex one, \s is all whitespace
        //the whitespace is created by removing the children, we might just combine these
        regex: /\s*},\s*\{s*/g,
        replace: ''
    },
    {
        //Bracket on newLine
        //might be best performed as last step, it changes a lot, makes it harder to remove the empty lines for children
        //  So get all original whitespace,
        //  get anything between whitespace and :
        //  include all whitespace until next { also include the { itself
        //  replace what was found with whitespace (indenting) $1 + anything between whitespace and :
        //  add a linebreak
        //  add a {
        regex: /(\s+)(.*):\s*\{/g,
        replace: "$1$2\r$1{"
    },
    {
        //remove all trailing on the end of lines that ended with a ,
        regex: /^(.*),\S*$/gm,
        replace: '$1'
    },
    {
        //remove all trailing on the end of lines that ended with a ,
        regex: /^(.*:.*)$/gm,
        replace: '$1;'
    }
];

//create a native javascript object
//Find parent-child relations
//Add all properties to its parent
FflToJsonConverter.prototype.parseFFL = function (contents) {
    // log.time('fflParse')
    var stack = new Stack();

    var data = parseRegex(contents);
    var currentScope = {
        _start: 0,
        _end: data.length,
        _data: '',
        _name: '',
        _temp: ''
    };
    stack.push(currentScope);
    var lastname = '';
    for (var currentPos = 0; currentPos < data.length; currentPos++) {
        var currChar = data.charAt(currentPos);
        switch (currChar) {
            case  '{':
                var newScope = {
                    _start: currentPos,
                    _data: '',
                    _name: lastname.trim(),
                    _temp: ''
                };
                //stack.peek()._data = '';
                stack.peek()._temp = '';
                stack.peek()[lastname.trim()] = newScope
                stack.push(newScope);
                break;
            case ';':
                lastname = stack.peek()._temp;
                stack.peek()._data += currChar;
                stack.peek()._temp = ''
                break;
            case '"':
                break;
            case  '}':
                lastname = stack.peek()._temp;
                stack.peek()._temp = ''
                stack.pop()._end = currentPos;
                break;
            default :
                stack.peek()._data += currChar;
                stack.peek()._temp += currChar;
                lastname += currChar;
        }
    }
    assert.equal(0, stack.peek()._start);//_end scope must be _start scope, else invalid data
    assert.equal(1, stack.size());//_end scope must be _start scope, else invalid _data
    //presumably upper part can be rewritten with some regex
    // console.info(JSON.stringify(stack.peek(), null, 2));
    var formulaType = {
        formula: true,
        visible: true,
        title: true,
        locked: true,
        flipflop_notrend: true,
        inputRequired: true,
        hint: true,
        afterinput: true
    }


    var allProperties = {};
    //iterate entire stack
    visitor.travelOne(stack.peek(), null, function (keyArg, node, depth) {
        //only interest in the ._data part, the rest are empty lines etc... brackets
        if (node._data !== undefined) {
            //split the line with semi cols, this holds an element of every key-value pair
            var props = node._data.trim().split(';');
            for (var i = 0; i < props.length; i++) {
                var obj = props[i];
                //split it by ':'  so we have a key:value pair
                var split = obj.split(':');

                //trim excess spaces
                var firstWord = split[0].trim();
                var foundPropertyName = firstWord;
                //again, empty places, it were brackets, that we skip here
                if (split[1] == undefined) {
                    continue;
                }
                var foundValue = split[1].trim();
                if (firstWord.startsWith('choices')) {
                    node[firstWord] = FinFormula.finChoice(obj.substring(obj.indexOf(':') + 1, obj.length));
                }
                else if (split.length == 2) {
                    var secondPart = split[1].trim();
                    if (firstWord === 'title') {
                        secondPart = "'" + secondPart.replace(/["']*/gm, "") + "'";// secondPart.replace(/'/gm, "\\'");
                        node[firstWord] = FinFormula.parseFormula(secondPart);
                    }
                    else if (formulaType[firstWord] !== undefined) {
                        node[firstWord] = FinFormula.parseFormula(secondPart);
                    }
                    else {
                        node[firstWord] = secondPart;
                    }

                }
            }
        }
    }, 0);
    //log.timeEnd('fflParse')
    return stack.peek();
}
FflToJsonConverter.prototype.deparseRegex = function (input) {
    return fileParser.deparseRegexs(deparsers, input)
}
FflToJsonConverter.prototype.parseRegex = FinFormula.parseFormula;
module.exports = FflToJsonConverter.prototype;