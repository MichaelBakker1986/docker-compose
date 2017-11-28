function EconomicEditorView() {
    this.on = false;
    this.properties = true;
}

function getdepth(node, depth) {
    if (node && node._parent == undefined) {
        return depth;
    }
    return getdepth(node._parent, 1 + depth)
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

EconomicEditorView.prototype.parse = function(input) {
    var props = this.properties;
    var parser = require('../lme-core/exchange_modules/ffl/FflToJsonConverter')
    var JSVisitor = require('../lme-core/fesjs/JSVisitor')
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
                var required = node.inputRequired || false
                var formula = node.formula || false
                var hint = node.hint || false
                if (formula) {
                    var spaces = [];
                    let depth = getdepth(node, 0);
                    let total = (node.modifier || '') + nodeName + " " + (props ? ((locked ? 'locked ' : ' ') + (visible ? 'visible ' : ' ') + (required ? 'required ' : ' ')) : '');
                    spaces.length = Math.max((80 - total.length) - depth, 0);
                    let prefix = [];
                    prefix.length = depth;
                    output.push(prefix.join(' ') + total + spaces.join(' ') + '=' + node.formula);

                    if (hint) {
                        // output.push(' hint:' + spaces.join(' ') + "=" + node.hint)
                    }
                }
                if (props && required && !defaultValue.required[required]) {
                    var spaces = [];
                    let depth = getdepth(node, 0);
                    let total3 = (node.modifier || '') + nodeName + ".required";
                    spaces.length = Math.max((80 - total3.length) - depth, 0);
                    let prefix = [];
                    prefix.length = depth;
                    output.push(prefix.join(' ') + total3 + spaces.join(' ') + '=' + node.inputRequired);
                }
                 if (props && visible && !defaultValue.visible[visible]) {
                    var spaces = [];
                    let depth = getdepth(node, 0);
                    let total6 = (node.modifier || '') + nodeName + ".visible";
                    spaces.length = Math.max((80 - total6.length) - depth,0);
                    let prefix = [];
                    prefix.length = depth;
                    output.push(prefix.join(' ') + total6 + spaces.join(' ') + '=' + node.visible);
                }
                if (props && locked && !defaultValue.locked[locked]) {
                    var spaces = [];
                    let depth = getdepth(node, 0);
                    let total2 = (node.modifier || '') + nodeName + ".locked";
                    spaces.length = Math.max((80 - total2.length) - depth, 0);
                    let prefix = [];
                    prefix.length = depth;
                    output.push(prefix.join(' ') + total2 + spaces.join(' ') + '=' + node.visible);
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

exports.EconomicEditorView = new EconomicEditorView();

