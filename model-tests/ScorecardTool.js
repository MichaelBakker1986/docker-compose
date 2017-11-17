/**
 * find displaytype = scorecard
 * add validation to all steps
 * fix input required
 * parse back to ffl
 * TODO: skip the part where formula's are parsed
 * When parsing, remove all default formula.
 * While de-parsing, put all default formula back
 * So a line in result can be multiple lines original
 * First milestone could be a formatting tool
 */
if (!String.prototype.repeat) {
    String.prototype.repeat = function(count) {
        'use strict';
        if (this == null) {
            throw new TypeError('can\'t convert ' + this + ' to object');
        }
        var str = '' + this;
        count = +count;
        if (count != count) {
            count = 0;
        }
        if (count < 0) {
            throw new RangeError('repeat count must be non-negative');
        }
        if (count == Infinity) {
            throw new RangeError('repeat count must be less than infinity');
        }
        count = Math.floor(count);
        if (str.length == 0 || count == 0) {
            return '';
        }
        // Ensuring count is a 31-bit integer allows us to heavily optimize the
        // main part. But anyway, most current (August 2014) browsers can't handle
        // strings 1 << 28 chars or longer, so:
        if (str.length * count >= 1 << 28) {
            throw new RangeError('repeat count must not overflow maximum string size');
        }
        var rpt = '';
        for (var i = 0; i < count; i++) {
            rpt += str;
        }
        return rpt;
    }
}

function ScorecardTool() {
    this.on = false;
}


function findSolutionNameFromFFLFile(json) {
    for (var key in json) {
        if (key.toLowerCase().startsWith('model ')) {
            return key.split(' ')[1].toUpperCase();
        }
    }
    return undefined;
}

var defaultValue = {
    visible: {
        undefined: true,
        '1.0': true,
        '1': true,
        'true': true,
        'On': true
    },
    locked: {
        '0.0': true,
        '0': true,
        'false': true,
        'Off': true,
        'No': true
    },
    required: {
        '0.0': true,
        '0': true,
        'false': true,
        'No': true,
        'Off': true
    }
}

function stripVariableOrtuple(name, node) {
    if (!name) {
        return undefined;
    }
    //this is just a fallback, the FflToJsonConverter sometimes fails variable + variablename refers to othervariable
    if (name.indexOf('+') > -1) {
        //something wrong while parsing regex, trying to fix it here,
        name = name.replace(/(\+|-|\=)\s*/gm, '');
        node.modifier = '+';
    }
    else if (name.indexOf('-') > -1) {
        name = name.replace(/(\+|-|\=)\s*/gm, '');
        node.modifier = '-';
    }
    else if (name.indexOf('=') > -1) {
        name = name.replace(/(\+|-|\=)\s*/gm, '');
        node.modifier = '=';
    }
    if (name.split(' ').length < 2) {
        return undefined;
    }

    //(Variable NetWorth Implies AnotherVariable) becomes NetWorth
    var secondWordOfLine = name.split(' ')[1];
    //Strip Variable Modifiers (+/-/=),
    var replace = secondWordOfLine.replace(/\W/g, '');
    if (replace === '') {
        return undefined;
    }
    return replace;
}

function StartWithVariableOrTuplePredicate(node) {
    if (node === undefined || !node._parentKey) {
        return false;
    }
    return (node._parentKey.startsWith('variable') || node._parentKey.startsWith('tuple'));
}

function isStartModel() {
    let modelRoot = objectModel['model ' + solutionName + ' uses BaseModel'][''];
}

ScorecardTool.prototype.parse = function(input) {
    var output = input.split('\n');
    var meta = []
    const constants = {};
    for (var i = 0; i < output.length; i++) {
        var line = output[i];
        var trim = line.trim();
        /**
         * Extract constants from current line.
         */
        const strings = trim.match(/"(.*?)"/i);

        var commentPoint = trim.indexOf('//');
        var comment = commentPoint == -1 ? '' : trim.substring(commentPoint);
        const display = trim.substring(0, commentPoint == -1 ? trim.length : commentPoint).trim()

        meta.push({
            no: i,
            comment: comment,
            display: display,
            into: undefined,
            trim: trim,
            raw: line
        })
    }
    var stack = [];
    for (var idx = 0; idx < meta.length; idx++) {
        var object = meta[idx];
        if (object.display == '}' || object.display.endsWith('}')) {
            stack.length = (stack.length - 1)
        } else if (object.display == '{' || object.display.endsWith('{')) {
            stack.push(idx)
        }
        object.indent = stack.length;
    }
    return {
        constants: constants,
        data: output,
        toString: function() {
            return meta.map(function(el) {
                return el.raw
            }).join('\n')
        },
        toFormattedFFL: function() {
            return meta.filter(function(el) {
                return el.display
            }).map(function(el) {
                return ' '.repeat(el.indent) + el.display + el.comment
            }).join('\n')
        }
    }
}

let scorecardTool = new ScorecardTool().parse('a\nb{\nc}');
var test = scorecardTool.toString()
var testFFl = scorecardTool.toFormattedFFL()
console.info(testFFl)

exports.ScorecardTool = new ScorecardTool();
/*JSVisitor.travelOne(modelRoot, null, function(keyArg, node, context) {
    if (keyArg === null) {
    }
    else {
        var tupleDefiniton = keyArg.startsWith('tuple ');
        if ((keyArg.startsWith('variable ') || tupleDefiniton)) {
            var nodeName = stripVariableOrtuple(keyArg, node);

            var parent = JSVisitor.findPredicate(node, StartWithVariableOrTuplePredicate)
            var parentId = (parent === undefined ? undefined : stripVariableOrtuple(parent._name, parent));
            if (tupleDefiniton) {
                context.nestTupleDepth++;
            }
        }
    }
}, {nestTupleDepth: 0});*/
