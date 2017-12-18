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
function FormulaBootstrap() {
}

var log = require('ff-log');
var assert = require('assert');
var AST = require('../../ast-node-utils').ast;
var esprima = require('esprima')
var escodegen = require('escodegen')
var simplified = require('./ASTPreparser')
var variables;
let functions;
var getOrCreateProperty;
var addFormulaDependency;
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
    'valid',
    'h'
]
var IDENTIFIER = 'Identifier';
var ARRAYEXPRESSION = 'ArrayExpression'
//this part is essencial to bind variables, extract support Variable types, supported Column types
// these variables will be red from the given JSON asap.
// for now we state them here..

//so it can have a (x,T) parameter
simplified.DataAvailable = function(formulaInfo, node) {
    //If(DataEntered(TaxOnProfitPsayable&&TaxProfitPaymentCalc!==10),TaxOnProfitsPayable-(TaxOnProfitsCum+TaxOnProfitsAssessment-TaxOnProfitsPaidAccumulated),NA)
    //be aware here, DataEntered refences to value,trend,notrend formulasets.
    //idea idea is all formulasets are redirected into one variable ID, so we can use 'notrend,trend,value' to redirect into value
    var refFormula = addFormulaDependency(formulaInfo, node.arguments[0].name, 'value')
    if (refFormula.ref === undefined) {
        log.warn("Can't find a variableReference for " + regenerate(node)) + " " + formulaInfo.name + ":" + formulaInfo.original;
        return;
    }
    node.type = 'Identifier';
    // looks like being extracted as object, while has to be array
    node.name = 'v[' + (refFormula.ref) + '][x.hash + y.hash + z]!=null';
    delete node.refn;
    delete node.arguments;
    delete node.callee;
}
simplified.DataEntered = simplified.DataAvailable;
//two members, START and END, will return Array<Variable>
//so transform into ArrayExpression
//this is somewhat complex
//first the ForAll, Count etc.. methods push the lamba as additional parameter into this function
//then with the first and additional second parameter we generate a Nested Logical expression of the whole
//leaving the lamba in tact. so everything is allowed there, only replacing the X with the found variables
//so the result of ForAll(x,SelectDecendants(Q_ROOT),Required(x)) will be Required(Q_MAP01) || Required(Q_MAP02) || Required(Q_MAP03 etc...
//Its better to also rename the Callee to Something like Lambda(SequenceExpression), or removing the entire CallExpression
//This must be the most complex seen in a while
simplified.SelectDescendants = function(formulaInfo, node) {
    node.type = ARRAYEXPRESSION;
    var groupName = formulaInfo.name.split('_')[0];
    var foundStartUiModel = getOrCreateProperty(groupName, node.arguments[0].name, propertiesArr[0]);
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
        node.arguments.length = 1;
    }
    else {
        foundEndUiModel = getOrCreateProperty(groupName, node.arguments[1].name, propertiesArr[0]);
    }
    node.elements = [];
    //nodes may never be undefined
    var nodes = foundStartUiModel.nodes;
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
}
simplified.InputRequired = function(formulaInfo, node) {
    node.type = "MemberExpression";
    node.computed = false;
    node.object = AST.IDENTIFIER(node.arguments[0].name);
    node.property = AST.IDENTIFIER(propertiesArr[2]);
    delete node.arguments;
    delete node.callee;
    delete node.refn;
}
simplified.GetTitle = function(formulaInfo, node) {
    node.type = "MemberExpression";
    node.computed = false;
    node.object = AST.IDENTIFIER(node.arguments[0].name);
    node.property = AST.IDENTIFIER(propertiesArr[6]);
    delete node.arguments;
    delete node.callee;
    delete node.refn;
}
simplified.TSUM = function(formulaInfo, node) {
    //all calls into a tuple should return a []
    //convert TSUM(variableName) into SUM(TVALUES(a123,'123',x,y,z,v))
    node.callee.name = 'SUM'
    buildFunc(formulaInfo, node.arguments[0], 0, node.arguments[0], node.property ? '.' + node.property.name : '', 'TVALUES');
}
simplified.TCOUNT = function(formulaInfo, node) {
    node.callee.name = 'PROXY'
    buildFunc(formulaInfo, node.arguments[0], 0, node.arguments[0], node.property ? '.' + node.property.name : '', 'TCOUNT');
}
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

/**
 * Two return types of this function, either the a11231(f.x.y.z.v) or v[f](xyz.hash)
 * There is no information which property is calling and cannot be resolved, since multiple sources can share a formula
 *
 */
function buildFunc(formulaInfo, node, property, referenceProperty, xapendix, tupleType) {
    xapendix = xapendix || '';
    var referenceProperty = addFormulaDependency(formulaInfo, referenceProperty.name, propertiesArr[property == 4 ? 0 : property]);
    var yAppendix = 'y';
    if (xapendix == '' && referenceProperty.frequency == 'document') xapendix = '.doc'
    delete referenceProperty.refn;
    var referenceFormulaId = referenceProperty.ref;
    if (!referenceProperty.tuple) {
        yAppendix += '.base';
    }
    if (tupleType) {
        if (referenceProperty) {
            var groupName = formulaInfo.name.split('_')[0];
            var foundStartUiModel = getOrCreateProperty(groupName, referenceProperty.tupleDefinitionName, propertiesArr[0]);
            var allrefIdes = [];
            if (referenceProperty.ref) {
                allrefIdes.push('' + referenceProperty.ref)
            }
            for (var i = 0; i < foundStartUiModel.nodes.length; i++) {
                var tupleChild = foundStartUiModel.nodes[i];
                var items = getOrCreateProperty(groupName, tupleChild.rowId, propertiesArr[0]).ref;
                if (items) {
                    allrefIdes.push('' + items);
                }
            }
            var test = '[' + allrefIdes.join(',') + "]"
            node.name = tupleType + '(' + test + ',a' + referenceFormulaId + ",'" + referenceFormulaId + "',x" + xapendix + "," + yAppendix + ",z,v)"
        } else {
            node.name = '[' + defaultValues[propertiesArr[property]] + ']';
        }
    }
    else {
        if (referenceProperty.ref === undefined) {
            node.name = defaultValues[propertiesArr[property]];
        } else {
            if (property == 4) {
                node.name = 'v[' + (referenceFormulaId) + '][x.hash + y.hash + z] !=null';
            } else {
                if (xapendix == '.all') {
                    //HSUM = function(fId, func, v, x, y, z, start, end) {
                    node.name = "VALUES(a" + referenceFormulaId + ",'" + referenceFormulaId + "',x" + xapendix + "," + yAppendix + ",z,v)"
                } else {
                    node.name = 'a' + referenceFormulaId + "('" + referenceFormulaId + "',x" + xapendix + "," + yAppendix + ",z,v)";
                }
            }
        }
    }
}

var varproperties = {}

var defaultValues = {
    required: false,
    visible: true,
    locked: false,
    entered: false,
    valid: true
}
var dummy = function(or, parent, node) {
};
var expression = function(or, parent, node) {
    var left = node.left;
    if (left.refn) {
        buildFunc(or, left, 0, left);
    }
    var right = node.right;
    if (right.refn) {
        buildFunc(or, right, 0, right);
    }
};
//the tree, visited Depth First
var traverseTypes = {
    //TODO: make one map directly returning the value, for T or variable
    Identifier: function(formulaInfo, parent, node) {
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
    AssignmentExpression: function(formulaInfo, parent, node) {
        if (node.right.refn) {
            buildFunc(formulaInfo, node.right, 0, node.right);
        }
    },
    ThisExpression: dummy,
    SequenceExpression: dummy,
    ObjectExpression: dummy,
    Property: dummy,
    Program: dummy,
    Literal: dummy,
    ArrayExpression: function(or, parent, node) {
        node.elements.forEach(function(el) {
            if (el.refn) {
                //Why is here a new Object created? {}
                buildFunc(or, el, 0, {name: el.refn});
            }
        });
    },
    BinaryExpression: expression,
    LogicalExpression: expression,
    ExpressionStatement: function(orId, parent, node) {
        var expression = node.expression;
        if (expression.refn) {
            buildFunc(orId, expression, 0, expression);
        }
    },
    UnaryExpression: function(orId, parent, node) {
        var argument = node.argument;
        if (argument.refn) {
            buildFunc(orId, argument, 0, argument);
        }
    },
    CallExpression: function(orId, parent, node) {
        for (var i = 0, len = node.arguments.length; i < len; i++) {
            var argument = node.arguments[i];
            if (argument.refn) {
                buildFunc(orId, argument, 0, argument);
            }
        }
    },
    SequenceExpression: function(orId, parent, node) {
        //for now we can discard any SequenceExpression
    },
    ConditionalExpression: function(orId, parent, node) {
        if (node.test.refn) {
            buildFunc(orId, node.test, 0, node.test);
        }
        if (node.alternate.refn) {
            buildFunc(orId, node.alternate, 0, node.alternate);
        }
        if (node.consequent.refn) {
            buildFunc(orId, node.consequent, 0, node.consequent);
        }
    },
    MemberExpression: function(orId, parent, node) {
        var object = node.object;
        if (object.refn) {
            var property = node.property;
            if (property.type === 'Identifier') {
                if (node.computed) {
                    if (parent.type === 'MemberExpression') {
                        throw new Error('Not Supported Yet')
                    }
                    else {
                        //this is presumably were the undefined comes from.
                        //T-1 is a BinaryExpression
                        //node property.name will result in undefined.
                        //its esier to lookAhead the SequenceExpression
                        //variableName[contextReference] , e.g. Balance[prev] or Debit[doc]
                        node.type = 'Identifier';
                        //node.name =
                        buildFunc(orId, node, 0, object, '.' + node.property.name);
                        delete node.object;
                        delete object.refn;
                        delete node.callee
                        delete node.property
                        delete node.computed;
                    }
                }
                else {
                    //not computed = .xxxx..
                    //the .choices,.vsible,required.title etc.
                    //works partially
                    node.type = IDENTIFIER;
                    //this is very stupid to port it triple time. we will fix this later.
                    buildFunc(orId, node, varproperties[node.property.name].f, node.object);
                    delete node.property;
                    delete node.object;
                    delete node.computed;
                }
            }
            //Sequence is XYZ[a,b]...
            else if (property.type === 'SequenceExpression') {
                node.type = IDENTIFIER;
                buildFunc(orId, node, 0, node.object);
                delete node.arguments;
                delete node.object;
                delete node.property;
                delete node.computed;
                //console.info('[x,x] Not implemented this feature yet : ' + orId.original)
            }
            else {
                node.type = IDENTIFIER;
                //this is where VARIABLE[1], VARIABLE[prev] ends up
                //for now we will check if the caller, starts with the being called, to avoid loops
                if (orId.tempnaaam === node.object.name) {
                    //return 1 instead of a Self-reference
                    node.name = '1';
                    log.trace('found self reference [%s]', node.object.name)
                }
                else {
                    //else will will what ever just get the onecol value back.
                    buildFunc(orId, node, 0, node.object);
                }
                delete node.object;
                delete node.property;
                delete node.computed;
            }
        }
    }
}
global.ExpandGrowth = function() {
    return 0;
}
global.FormulaSetInT = function() {
    return 0;
}
global.Onzero = function() {
    return 0;
}
global.Hm = function() {
    return 0
}

//recursive walk the formula ast
function buildFormula(formulaInfo, parent, node) {
    // just simplify some MODEL code, when a CallExpression appears, we might want to modify the structure before
    // looking at the content, this might cause some overhead because we have to parse more, but it simplifies the code
    // Simplified is only Top down
    // its only lookAhead
    if (node.type === 'CallExpression') {
        //register function
        functions[node.callee.name] = true;
        if (log.TRACE) {
            log.trace('Use function [' + node.callee.name + "]")
        }
        if (simplified[node.callee.name]) {
            simplified[node.callee.name](formulaInfo, node);
        } else {
            //be aware since Simplified modifies the Max into Math.max this will be seen as the function Math.max etc..
            const globalFunction = node.callee.name.split('.')[0];
            if (global[globalFunction] == undefined) {
                var groupName = formulaInfo.name.split('_')[0];
                var referenceProperty = getOrCreateProperty(groupName, globalFunction, 'function');
                if (referenceProperty.ref !== undefined) {
                    node.callee.name = 'a' + referenceProperty.ref
                } else {
                    throw Error('invalid call [' + node.callee.name + ']')
                }
            }
        }
    }
    else if (node.type === IDENTIFIER) {
        /**
         * TODO: modify these parameters while parsing regex, directly inject the correct parameters
         */
        if (node.name === 'T') {
            node.name = 'x';
        }
        //zAxis Reference, base period, z.base
        else if (node.name === 'MainPeriod') {
            node.name = 'z';
        }
        //
        else if (node.name === 'MaxT') {
            node.name = 'x';
        }
        else if (node.name === 'TsY') {
            node.name = 'x';
        }
        //xAxisReference x.trend
        else if (node.name === 'Trend') {
            node.name = 'x';
        }
        //xAsReference x.notrend
        else if (node.name === 'NoTrend') {
            node.name = 'x';
        }
        //x.trend.lastbkyr
        else if (node.name === 'LastHistYear') {
            node.name = 'x';
        }
        //x.trend.lastbkyr
        else if (node.name === 'LastHistYear') {
            node.name = 'x';
        }
        /*       else if (node.name === 'lastnotrend') {
                   node.name = 'lastnotrend';
               }
               else if (node.name === 'lastnotrend') {
                   node.name = 'lastnotrend';
               }*/
        //should return the x.index.
        else if (node.name === 't') {
            log.warn('invalid t parsing [%s]', formulaInfo)
            //return the hash t.hash or t.index?
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
    if (!traverseTypes[node.type]) {
        log.error('ERROR: [%s] not registered AST expression [%s]', node.type, node.name);
    }
    traverseTypes[node.type](formulaInfo, parent, node);
}

function regenerate(body) {
    return escodegen.generate(body, escodegenOptions);
}

//public function, will return the parsed string
//its getting nasty, with supporting this many options, consider only expecting on valid type either AST or STRING only
FormulaBootstrap.prototype.parseAsFormula = function(formulaInfo) {
    assert(formulaInfo.parsed === undefined)
    var ast;
    if (typeof formulaInfo.body === 'object') {
        formulaInfo.original = regenerate(formulaInfo.body);
        ast = formulaInfo.body;
    }
    else {
        formulaInfo.original = formulaInfo.body;
        ast = esprima.parse(formulaInfo.body);
    }
    // formulaInfo.tempnaaam = formulaInfo.name.replace(/^KSP_/, '').replace(/_value$/g, '');
    buildFormula(formulaInfo, null, ast);
    var generated = regenerate(ast);
    formulaInfo.ast = JSON.stringify(ast);
    formulaInfo.parsed = generated;
    formulaInfo.tempnaaam = undefined;
}
FormulaBootstrap.prototype.initStateBootstrap = function(configs) {
    functions = configs.functions;
    variables = configs.contains;//to distinct FesVariable from references
    properties = configs.properties;//to check if we use this property from the model language
    getOrCreateProperty = configs.getOrCreateProperty;//getOrCreateProperty a PropertyAssembler, to do a variable lookup.  We must have knowledge from the PropertyAssembler. To find corresponding referenceId
    addFormulaDependency = configs.addFormulaDependency;
    for (var property in properties) {
        varproperties[property] = {
            f: properties[property],
            t: {
                "type": 'Identifier',
                "name": properties[property]
            }
        }
    }
};
module.exports = FormulaBootstrap.prototype;