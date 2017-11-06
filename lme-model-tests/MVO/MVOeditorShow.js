///var MVOffl = require('fs').readFileSync(__dirname + '/MVO.ffl', 'utf8');


function MVOeditorShow() {
    this.on = true;
}

function getdepth(node, depth) {
    if (node && node._parent == undefined) {
        return depth;
    }
    return getdepth(node._parent, 1 + depth)
}

MVOeditorShow.prototype.parse = function(input) {
    var parser = require('../../ff-fes/exchange_modules/ffl/FflToJsonConverter')
    var JSVisitor = require('../../ff-fes/fesjs/JSVisitor')
    var result = parser.parseFFL(input)
    var solutionName = findSolutionNameFromFFLFile(result);
    let objectModel = result['model ' + solutionName + ' uses BaseModel'][''];
    var output = [];
    JSVisitor.travelOne(objectModel, null, function(keyArg, node, context) {
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
                var locked = node.locked || false
                var visible = node.visible || false
                var required = node.required || false
                var formula = node.formula || false
                var hint = node.hint || false
                if (formula) {
                    var spaces = [];
                    let depth = getdepth(node, 0);
                    let total = (node.modifier || '') + nodeName + " " + (locked ? 'locked ' : ' ') + (visible ? 'visible ' : ' ') + (required ? 'required ' : ' ');
                    spaces.length = (80 - total.length) - depth;
                    let prefix = [];
                    prefix.length = depth;

                    output.push(depth + " " + prefix.join(' ') + total + spaces.join(' ') + '=' + node.formula);
                    //output.push('value:' + spaces.join(' ') + "=" + node.formula)
                    if (hint) {
                        // output.push(' hint:' + spaces.join(' ') + "=" + node.hint)
                    }
                }

                // addnode(logVars, solution, nodeName, node, parentId, tupleDefiniton, !tupleDefiniton && context.tupleDefinition, context.tupleDefinition, context.nestTupleDepth);
                if (tupleDefiniton) {
                    context.tupleDefinition = nodeName;
                }
            }
        }
    }, {nestTupleDepth: 0});

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

    return output.join('\n');
}

function findSolutionNameFromFFLFile(json) {
    for (var key in json) {
        if (key.toLowerCase().startsWith('model ')) {
            return key.split(' ')[1].toUpperCase();
        }
    }
    return undefined;
}

//console.info(new MVOeditorShow().parse(require('fs').readFileSync(__dirname + '/MVO.ffl', 'utf8')))
exports.MVOeditorShow = new MVOeditorShow();

