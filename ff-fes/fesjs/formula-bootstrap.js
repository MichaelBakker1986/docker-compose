/**
 * Bootstrap formula's
 * Will convert VARIABLENAME + VARIABLENAME2.validation into a bound FESJS Function
 * example:
 * VARIABLENAME + VARIABLENAME2.validation becomes:
 * this[1234](a,b,c,d) + this[1235](a,b,c,d)
 * @type {exports|module.exports}
 * VariableName[prev] becomes this[1235](f,x.prev,y,z,v)
 *
 * In old style a AST tree would be created, this is nice, very object related.
 * But to make it a Function we need the parsed String and place it in Function(params,body);
 * So in middle of AST tree's we construct Strings that are function calls. Its quicker and simpler
 * As long we don't require the AST tree its self to do look-ups
 * Another approach would be to keep a entire AST tree of the Functions.
 *
 * For now NEW-style = node.name = this[id](f,x,y,z,v),node.type = 'Identifier' and remove all other members of the AST node
 * its way quicker.
 *Instead of testing all, we better of just testing Identifiers
 * TODO: add variable as Self reference
 **/
//better use a Set() to check if an item exists, its quicker
var logger = require('ff-log');
var assert = require('assert');
var AST = require('./AST.js');
var esprima = require('esprima')
var escodegen = require('escodegen')
var XDimVariableName = 'x.';
var variables;
var columnProperties;
var findLink;
var formulas;
var caseCount = 10;
var initialized = false; //the parseAsFormula should never be called without init being called
//this part is essencial to bind variables, extract support Variable types, supported Column types

// these variables will be red from the given JSON asap.
// for now we state them here..
var properties;
var propertiesArr = [
    'value',
    'visible',
    'required',
    'locked',
    'entered',
    'validation',
    'title',
    'validateInput',
    'choices',
    'g',
    'h'
]
var escodegenOptions = {
    format: {
        renumber: true,
        hexadecimal: true,
        escapeless: true,
        compact: true,
        semicolons: false,
        parentheses: false
    }
};
var astHIndex = {
    "type": "Identifier",
    "name": "hIndex"
};
var astValues = {
    "type": "Identifier",
    "name": "v"
};
var xArgument = {
    "type": "Identifier",
    "name": "x"
};

//TODO: move this method away. its the only one that should create Dependencies
//Move it to either a DependencyManager/Service or GenericModelFile
function addFormulaDependency(formulaInfo, name, property) {
    var foundUiModel = findLink(formulaInfo.name.split('_')[0], name, property || 'value');
    //we want do know if we can all the value straight away or we have to invoke a function for it
    //in future we want to check here if its a dynamic formula, or plain value.
    //also inherited functions are nice to play around with.
    //if type is not static, we add it as dependency
    var referenceFormulaInfo = formulas(foundUiModel.ref);
    //ok so we going to allow default values, this could because this formula was the default.
    //there was once an idea to create static formula types
    //we could now reference to the index instead...
    var refName = foundUiModel.name;
    var refId;
    if (referenceFormulaInfo === undefined) {
        logger.trace('failed to lookup:[' + name + '_' + property + '] but it was in the model, could be in another model. OR it just have default value formula')
        logger.trace(formulaInfo.original);
    }
    else {
        refName = referenceFormulaInfo.name;
        refId = referenceFormulaInfo.id || referenceFormulaInfo.index;

        if (referenceFormulaInfo.refs[formulaInfo.name] === undefined) {
            referenceFormulaInfo.refs[formulaInfo.name] = true;
            referenceFormulaInfo.formulaDependencys.push({
                name: formulaInfo.name,
                association: 'refs',
                refId: formulaInfo.id || formulaInfo.index
            });
        }
    }
    if (formulaInfo.deps[refName] === undefined) {
        formulaInfo.deps[refName] = true;
        formulaInfo.formulaDependencys.push({
            name: refName,
            association: 'deps',
            refId: refId
        });
    }
    return referenceFormulaInfo;
}

/**
 * for now we will reference all formula's in the property range<br>
 * For now just support the _value formula.
 * Be aware when formula changes with the Default Formula. its not directly linked.
 * In mainWhile we learned there are two return types of this function, either the a11231(f.x.y.z.v) or v[f](xyz.hash)
 */
function buildFunc(formulaInfo, fType, refer, propertyName) {
    propertyName = propertyName || '';

    var referenceFormulaInfo = addFormulaDependency(formulaInfo, refer.name, propertiesArr[fType]);
    if (referenceFormulaInfo === undefined) {
        return defaultValues[propertiesArr[fType]];
    }
    var refId = referenceFormulaInfo.id === undefined ? referenceFormulaInfo.index : referenceFormulaInfo.id;
    delete refer.refn;
    return "a" + refId + "('" + refId + "',x" + propertyName + ",y,z,v)";
}
var varproperties = {}
// some variables we shall use..
//we want to modify its default behavior
//Before entering a Function..
var simplified = {
    //gets Sels for the value also
    ExpandLevel: function (formulaInfo, node) {
        node.arguments = [{
            "type": "Identifier",
            "name": "1.1"
        }];
    },
    Min: function (formulaInfo, node) {
        node.callee.name = 'Math.min'
    },
    //we will need this one later to determine + or &&
    EvaluateAsString: function (formulaInfo, node) {
        node.callee.name = 'String'
    },
    Max: function (formulaInfo, node) {
        node.callee.name = 'Math.max'
    },
    Abs: function (formulaInfo, node) {
        node.callee.name = 'Math.abs'
    },
    //the format is strange, hard to get a better format in the fin->json parser.
    //Expected format: Case(X_MAP01_Verplicht,[0,0||1,10||2,20||11,30||12,120||13,130])
    Case: function (formulaInfo, node) {
        assert.ok(node.arguments.length === 2, "Only expecting 2 arguments for now");
        var statements = node.arguments[1];
        assert.ok(statements.type === 'ArrayExpression', "Second argument has to be ArrayExpression for now");

        var cs = '_c0s' + caseCount++;
        node.type = "SequenceExpression";
        var elements = statements.elements;
        node.expressions = [
            {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "Identifier",
                    "name": cs
                },
                "right": node.arguments[0]
            }
        ];

        if (elements.length === 1) {
            elements.unshift(AST.IDENTIFIER(true));
        }
        //make the first argument have a right member as other ContionalExpression have
        //this way the loop don't need to check it every iteration
        elements[0] = {
            right: elements[0]
        }

        //the the last argument a ContditionalExpression, with default return value NA
        //in the loop this statement is being used to be the alternate
        var lastExpression = elements[elements.length - 1];
        elements[elements.length - 1] = {
            type: "ConditionalExpression",
            // (elements.length > 1 ? : '')
            test: AST.IDENTIFIER(cs + ' === ' + elements[elements.length - 2].right.value),
            consequent: lastExpression,
            alternate: AST.IDENTIFIER('NA')
        }

        /*right: elements[0]*/
        for (var i = (elements.length - 2); i > 0; i--) {
            var element = elements[i];
            element.type = 'ConditionalExpression';
            element.test = AST.IDENTIFIER(cs + ' === ' + elements[i - 1].right.value);
            element.consequent = element.left;
            element.alternate = elements[i + 1];
            element.operator = undefined;
            element.right = undefined;
            element.left = undefined;
        }
        node.expressions.push(elements[1])
        //look into delete and undefined, we better use undefined since its quicker.
        node.callee = undefined;
        node.arguments = undefined;
    },
    //convert traditional If(q,a,b) into q?a:b, skip the entire Callee
    If: function (formulaInfo, node) {
        //could be replaced with the default property value..
        if (node.arguments.length === 2) {
            logger.warn('Strange formuala setup IF(q,a,b) without b) Using NA as b' + formulaInfo.original)
            node.arguments.push(AST.IDENTIFIER('NA'));
        }
        assert.equal(node.arguments.length, 3, formulaInfo.original);
        node.type = "ConditionalExpression";
        node.test = node.arguments[0];
        node.consequent = node.arguments[1];
        node.alternate = node.arguments[2];
        node.arguments.length = 0;
        node.arguments = undefined;
        node.callee = undefined;
    },
    //wants horizontale aggregation
    Hsum: function (formulaInfo, node) {
        /* node.arguments = [{
         "type": "Identifier",
         "name": "1"
         }];*/
    },
    /*
     OnZero: function (node)
     {
     node.arguments = [{
     "type": "Identifier",
     "name": "1"
     }];
     },*/
    MaxValueT: function (formulaInfo, node) {
        node.arguments = [{
            "type": "Identifier",
            "name": "1"
        }];
    },
    //reqruires two variables
    ExpandFraction: function (formulaInfo, node) {
        node.arguments = [{
            "type": "Identifier",
            "name": "1"
        }, {
            "type": "Identifier",
            "name": "2"
        }];
    },
    ExpandOriginalValue: function (formulaInfo, node) {
        node.arguments = [{
            "type": "Identifier",
            "name": "1"
        }];
    },
    TSUM: function (formulaInfo, node) {
        //jsut straighten TSUM and TupleSum
        // node.callee.name = 'TupleSum';
        /*  node.arguments = [{
         "type": "Identifier",
         "name": "1"
         }];*/
        /*     node.arguments[0].name = 'this[' + variables[node.arguments[0].name].id + ']';
         node.arguments.push({
         "type": "Identifier",
         "name": "x"
         });*/
    },
    /**
     * Inject the x parameter into the call
     * @param formulaInfo
     * @param node
     * @constructor
     */
    FirstValueT: function (formulaInfo, node) {
        node.arguments.unshift(xArgument);
    },
    DateToT: function (formulaInfo, node) {
        node.arguments.unshift(xArgument);
    },
    Visible: function (formulaInfo, node) {
        node.type = "MemberExpression";
        node.computed = false;
        node.object = AST.IDENTIFIER(node.arguments[0].name);
        node.property = AST.IDENTIFIER('visible');
        delete node.arguments;
        delete node.callee;

    },
    //so it can have a (x,T) parameter
    DataAvailable: function (formulaInfo, node) {
        //If(DataEntered(TaxOnProfitPsayable&&TaxProfitPaymentCalc!==10),TaxOnProfitsPayable-(TaxOnProfitsCum+TaxOnProfitsAssessment-TaxOnProfitsPaidAccumulated),NA)
        var refFormula = addFormulaDependency(formulaInfo, node.arguments[0].name, 'value')
        if (refFormula === undefined) {
            logger.warn("Can't find a variableReference for " + generate(node)) + " " + formulaInfo.name + ":" + formulaInfo.original;
            return;
        }
        node.type = 'Identifier'
        // looks like being extracted as object, while has to be array
        node.name = 'v[' + ((refFormula.id === undefined) ? refFormula.index : refFormula.id) + '][x.hash + y + z]!==undefined';
        delete node.refn;
        delete node.arguments;
        delete node.callee;
    },
    InputRequired: function (formulaInfo, node) {
        node.type = "MemberExpression";
        node.computed = false;
        node.object = AST.IDENTIFIER(node.arguments[0].name);
        node.property = AST.IDENTIFIER(propertiesArr[2]);
        /*node.name = buildFunc(orId, propertiesArr[2], node.object)*/
        delete node.arguments;
        delete node.callee;
    },
    //now its provided with (x,SelectDecendents/Array,LambaExpression)
    //we gonna narrow it down until further use of the 'X'. so ForAll(array,property[])
    //now ForAllFunction has no use anymore
    Count: function (formulaInfo, node) {
        //ok remove first argument X
        node.arguments.splice(0, 1);
        //give the lambda expression to the SelectDecendants function
        node.arguments[0].arguments.push(node.arguments[1])
        //remove the lambda expression
        node.arguments.splice(1, 1);
    },
    //two members, START and END, will return Array<Variable>
    //so transform into ArrayExpression
    //this is somewhat complex
    //first the ForAll, Count etc.. methods push the lamba as additional parameter into this function
    //then with the first and additional second parameter we generate a Nested Logical expression of the whole
    //leaving the lamba in tact. so everything is allowed there, only replacing the X with the found variables
    //so the result of ForAll(x,SelectDecendants(Q_ROOT),Required(x)) will be Required(Q_MAP01) || Required(Q_MAP02) || Required(Q_MAP03 etc...
    //Its better to also rename the Callee to Something like Lambda(SequenceExpression), or removing the entire CallExpression
    //This must be the most complex seen in a while
    SelectDescendants: function (formulaInfo, node) {
        node.type = 'ArrayExpression';
        var groupName = node.arguments[0].name.split('_')[0];
        var foundStartUiModel = findLink(groupName, node.arguments[0].name, propertiesArr[0]);
        var lambda;
        //get the propertyType
        //extract lambda
        if (node.arguments.length === 3) {
            lambda = node.arguments[2];
            node.arguments.length = 2;
        }
        //extrace lambda
        //this can also be the propertyType is variableType empty
        var foundEndUiModel;
        if (lambda === undefined) {
            lambda = node.arguments[1];
            /*variableType.push('required');*/
            node.arguments.length = 1;
        }
        else {
            foundEndUiModel = findLink(groupName, node.arguments[1].name, propertiesArr[0]);
        }

        node.elements = [];
        var nodes = foundStartUiModel.nodes;
        if (nodes === undefined) {
            logger.debug('Log nothing..');
        }
        //now lets create the Nested Logical Expression
        //var root = AST.OR(AST.MEMBER(AST.IDENTIFIER(nodes[0].rowId), 'value'), AST.MEMBER(AST.IDENTIFIER(nodes[1].rowId), 'value'));
        /*var ArrayExpression = {
         type: 'ArrayExpression',
         elements: []
         }*/
        //first copy has many functions attached. copying it first will loss them, so next iterations can get use of it
        lambda = AST.cloneAST(lambda, null, null);
        //todo, just query nodes, instead of filtering them here
        for (var i = 0; i < nodes.length; i++) {
            if (foundEndUiModel !== undefined && foundEndUiModel.rowId === nodes[i].rowId) {
                break;
            }
            node.elements.push(AST.cloneAST(lambda, 'X', nodes[i].rowId));
        }
        delete node.arguments;
        delete node.callee;
    },
    Self: function (formulaInfo, node) {
        node.arguments = [{
            "type": "Identifier",
            "name": "1"
        }];
    },
    Mut: function (formulaInfo, node) {
        node.arguments = [{
            "type": "Identifier",
            "name": "1"
        }];
    }
}
//same thing.
simplified.ForAll = simplified.Count
simplified.Exists = simplified.ForAll;
simplified.DataEntered = simplified.DataAvailable;
simplified.TupleSum = simplified.TSUM;
simplified.IF = simplified.If;
simplified.if = simplified.If;
simplified.MAX = simplified.Max;
simplified.MIN = simplified.Min;
simplified.min = simplified.Min;
simplified.max = simplified.Max;
simplified.ABS = simplified.Abs;
var defaultValues = {
    required: false,
    visible: true,
    locked: false,
    entered: false,
    valid: true
}
var dummy = function (or, parent, node) {
};
var expression = function (or, parent, node) {
    var left = node.left;
    if (left.refn != undefined) {
        node.left.name = buildFunc(or, 0, left);
    }
    var right = node.right;
    if (right.refn != undefined) {
        node.right.name = buildFunc(or, 0, right);
    }
};
//the tree, visited Depth First
var traverseTypes = {
    //TODO: make one map directly returning the value, for T or variable
    Identifier: function (formulaInfo, parent, node) {
        //variable reference
        if (variables(node.name)) {
            node.refn = node.name;
        }
        //var properties are .value .coices .visible etc. NOT t.next....
        else if (varproperties[node.name] != undefined) {
            // inject the T as context.
            // allow _ references.. is pretty expensive, also runtime, better just create those buildtime
            node.legacy = node.name.replace(/_/g, '.');
            node.name = node.legacy;
            //node.name = XDimVariableName + node.legacy;
        }
    },
    //Don't check the left side of an AssignmentExpression, it would lead into a102('102',x,y,z,v) = 'something'
    AssignmentExpression: function (formulaInfo, parent, node) {
        if (node.right.refn) {
            node.right.name = buildFunc(formulaInfo, 0, node.right);
        }
    },
    ThisExpression: dummy,
    SequenceExpression: dummy,
    ObjectExpression: dummy,
    Property: dummy,
    Program: dummy,
    Literal: dummy,
    ArrayExpression: function (or, parent, node) {
        node.elements.forEach(function (el) {
            if (el.refn !== undefined) {
                el.name = buildFunc(or, 0, {name: el.refn});
            }
        });
    },
    BinaryExpression: expression,
    LogicalExpression: expression,
    ExpressionStatement: function (orId, parent, node) {
        var expression = node.expression;
        if (expression.refn != undefined) {
            expression.name = buildFunc(orId, 0, expression);
        }
    },
    UnaryExpression: function (orId, parent, node) {
        var argument = node.argument;
        if (argument.refn != undefined) {
            argument.name = buildFunc(orId, 0, argument);
        }
    },
    CallExpression: function (orId, parent, node) {
        for (var i = 0, len = node.arguments.length; i < len; i++) {
            var argument = node.arguments[i];
            if (argument.refn != undefined) {
                argument.name = buildFunc(orId, 0, argument);
            }
        }
    },
    SequenceExpression: function (orId, parent, node) {
        //for now we can discard any SequenceExpression
    },
    ConditionalExpression: function (orId, parent, node) {
        if (node.test.refn !== undefined) {
            node.test.name = buildFunc(orId, 0, node.test);
        }
        if (node.alternate.refn !== undefined) {
            node.alternate.name = buildFunc(orId, 0, node.alternate);
        }
        if (node.consequent.refn !== undefined) {
            node.consequent.name = buildFunc(orId, 0, node.consequent);
        }
    },
    MemberExpression: function (orId, parent, node) {
        var object = node.object;
        if (object.refn != undefined) {
            var property = node.property;
            if (property.type === 'Identifier') {
                if (node.computed) {
                    if (parent.type === 'MemberExpression') {
                        /*    // not refactored into new style!
                         var tempparentporpertyname = parent.property.name;// we will lose this
                         // now a tricky part, we going to use the parent, and place all of this in there.. removing the
                         // entire sublevel.Extact the property name, inject it in here most complex situation we can
                         // get into
                         parent.type = 'CallExpression';
                         var refer = variables[object.refn];
                         var refFormId = refer.formula[properties[tempparentporpertyname]];
                         node.object.name = 'this[' + refFormId + ']';
                         parent.callee = node.object;
                         delete node.object;
                         parent.property.name = (buildFunc(orId, 0, object) + '.' + node.property.legacy);
                         parent.arguments = [astHIndex, varproperties[tempparentporpertyname].t, node.property, astValues];
                         delete parent.property;
                         delete object.refn;
                         delete property.legacy;*/
                        throw new Error('Not Supported Yet')
                    }
                    else {
                        //this is presumably were the undefined comes from.
                        //T-1 is a BinaryExpression
                        //node property.name will result in undefined.
                        //its esier to lookAhead the SequenceExpression
                        //variableName[contextReference] , e.g. Balance[prev] or Debit[doc]
                        node.type = 'Identifier';
                        node.name = buildFunc(orId, 0, object, '.' + node.property.name);
                        node.object = undefined;
                        object.refn = undefined;
                        node.callee = undefined;
                        node.property = undefined;
                        node.computed = undefined;
                    }
                }
                else {
                    //not computed = .xxxx..
                    //the .choices,.vsible,required.title etc.
                    //works partially
                    node.type = 'Identifier';
                    if (node.property.name === 'title') {
                    }
                    //this is very stupid to port it triple time. we will fix this later.
                    node.name = buildFunc(orId, varproperties[node.property.name].f, node.object);
                    delete node.property;
                    delete node.object;
                    delete node.computed;
                }
            }
            //Sequence is XYZ[a,b]...
            else if (property.type === 'SequenceExpression') {
                /* Partially works, just a direct call to the Variables
                 //this one should be able to resolve VARIABLE[prev,next]
                 node.type = 'CallExpression';
                 object.name = 'VALUES';
                 node.arguments = node.property.expressions;
                 node.arguments.splice(0, 0, {
                 type: "Identifier",
                 name: 'this[' + object.refid + ']'//be aware the DEPENDENCY is not made!
                 }, varproperties.value.t, astHIndex);
                 */
                node.type = 'Identifier';
                node.name = buildFunc(orId, 0, node.object);
                delete node.arguments;
                delete node.object;
                delete node.property;
                delete node.computed;
                //console.info('[x,x] Not implemented this feature yet : ' + orId.original)
            }
            else {
                node.type = 'Identifier';
                //this is where VARIABLE[1], VARIABLE[prev] ends up
                //for now we will check if the caller, starts with the being called, to avoid loops
                if (orId.tempnaaam === node.object.name) {
                    //return 1 instead of a Self-reference
                    node.name = '1';
                }
                else {
                    //else will will what ever just get the onecol value back.
                    node.name = buildFunc(orId, 0, node.object);
                }

                delete node.object;
                delete node.property;
                delete node.computed;
            }
        }
    }
}
//recursive walk the formula ast
function buildFormula(formulaInfo, parent, node) {
    // just simplify some MODEL code, when a CallExpression appears, we might want to modify the structure before
    // looking at the content, this might cause some overhead because we have to parse more, but it simplifies the code
    // Simplified is only Top down
    // its only lookAhead
    if (node.type === 'CallExpression') {
        logger.trace('Use function [' + node.callee.name + "]")
        if (simplified[node.callee.name] !== undefined) {
            simplified[node.callee.name](formulaInfo, node);
        } else {
            //be aware since Simplified modifies the Max into Math.max this will be seen as the function Math.max etc..
            if (global[node.callee.name.split('.')[0]] == undefined) {
                throw Error('invalid call [' + node.callee.name + ']')
            }
        }
    }
    else if (node.type === 'Identifier') {
        /**
         * TODO: modify these parameters while parsing regex, directly inject the correct parameters
         */
        if (node.name === 'T') {
            node.name = 'x';
        }
        if (node.name === 'MainPeriod') {
            node.name = 'x';
        }
        if (node.name === 'MaxT') {
            node.name = 'x';
        }
        if (node.name === 'Trend') {
            node.name = 'x';
        }
        if (node.name === 'NoTrend') {
            node.name = 'x';
        }
        if (node.name === 'LastHistYear') {
            node.name = 'x';
        }
        else if (node.name === 't') {
            //return the real Index t.hash?
            node.name = 'hash';
        }
    }
    //now we iterate all members, its not required if just use all types, we can skip things like properties etc..
    //Would be a performance boost, when we need it its going to increase speeds Log(n-1)
    for (var key in node) {
        if (node[key]) {
            var child = node[key];
            if (typeof child === 'object') {
                if (Array.isArray(child)) {
                    for (var i = 0, len = child.length; i < len; i++) {
                        buildFormula(formulaInfo, node, child[i]);
                    }
                }
                else {
                    buildFormula(formulaInfo, node, child);
                }
            }
        }
    }

    if (traverseTypes[node.type] === undefined) {
        console.info('ERROR: ' + node.type);
    }
    traverseTypes[node.type](formulaInfo, parent, node);
}

function generate(body) {
    return escodegen.generate(body, escodegenOptions);
}
//public function, will return the parsed string
//its getting nasty, with supporting this many options, consider only expecting on valid type either AST or STRING only
function parseAsFormula(formulaInfo) {
    if (formulaInfo.parsed === undefined || formulaInfo.parsed === null) {
        var ast;
        if (formulaInfo.body === "") {
            formulaInfo.original = "";
            return "null";
        }
        else if (typeof formulaInfo.body === 'object') {
            formulaInfo.original = generate(formulaInfo.body);
            ast = formulaInfo.body;
        }
        else {
            formulaInfo.original = formulaInfo.body;
            ast = esprima.parse(formulaInfo.body);
        }
        //this part is cutting off a load of self-references. Not sure if going to build caching mechanism
        //There is soo many to learn about dependency loops.
        var tempnaaam = formulaInfo.name.replace('FINANPROGNOSEMODEL_', '').replace(/_value$/g, '');
        formulaInfo.tempnaaam = tempnaaam;

        if (new RegExp("\W" + tempnaaam + "\W", "gmi").test(formulaInfo.original)) {
            logger.info(formulaInfo.name + " : " + formulaInfo.original);
        }
        buildFormula(formulaInfo, null, ast);
        var generated = generate(ast);
        /*  if (formulaInfo.formulaDependencys.length > 0)
         {
         logger.debug(formulaInfo.formulaDependencys.length + ":" + formulaInfo.name + ": " + formulaInfo.original + "\n                                                                                            " + generated)
         }*/
        formulaInfo.ast = JSON.stringify(ast);
        formulaInfo.parsed = generated;
    }
    return formulaInfo.parsed;
}


function initStateBootstrap(configsFile) {
    //for now we accept no Dynamic variable.properties (visible, etc.)
    //also we acept no Dynamic FesJSMath. (static for all models;
    if (initialized) {
        throw Error("The bootstrap is already initialized");
    }
    initialized = true;
    var configs = configsFile.state;

    variables = configsFile.uicontains;//to distinct FesVariable from references
    properties = configs.properties;//to check if we use this property from the model language
    //we might better just always insert UIModel_value
    findLink = configs.findLink;//findOrCreate a UIModel, to do a variable lookup.  We must have knowledge from the UIModels. To find corresponding LinkID
    formulas = configs.findFormulaByIndex;

    //TODO: this part makes it impossible to be flexible
    //if its done in GenericModelFile it become flexible
    for (var property in properties) {
        varproperties[property] = {
            f: properties[property],
            t: {
                "type": 'Identifier',
                "name": properties[property]
            }
        }
    }
    //TODO: this part makes it impossible to be flexible
    //if its done in GenericModelFile it become flexible
    return parseAsFormula;
};
module.exports = {
    initStateBootstrap: initStateBootstrap,
    parseAsFormula: parseAsFormula
};