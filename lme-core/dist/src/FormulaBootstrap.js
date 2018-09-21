'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _esprima = require('esprima');

var _esprima2 = _interopRequireDefault(_esprima);

var _escodegen = require('escodegen');

var _escodegen2 = _interopRequireDefault(_escodegen);

var _astNodeUtils = require('ast-node-utils');

var _ASTPreparser = require('./ASTPreparser');

var _ASTPreparser2 = _interopRequireDefault(_ASTPreparser);

var _assert = require('assert');

var _log = require('log6');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Bootstrap formula's
 * Will convert VARIABLE_NAME + VARIABLENAME2.validation into a bound FESJS Function
 * example:
 * VARIABLE)NAME + VARIABLE_NAME2.validation becomes:
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
function FormulaBootstrap() {}

var varproperties = {};
var defaultValues = {
	required: false,
	visible: true,
	locked: false,
	entered: false,
	valid: true
};
var variables;
var functions;
var getOrCreateProperty;
var addFormulaDependency;
var properties;
var propertiesArr = ['value', 'visible', 'required', 'locked', 'entered', 'validation', 'title', 'validateInput', 'choices', 'valid', 'hint'];
var IDENTIFIER = 'Identifier';
var ARRAYEXPRESSION = 'ArrayExpression';
//this part is essencial to bind variables, extract support Variable types, supported Column types
// these variables will be red from the given JSON asap.
// for now we state them here..

//so it can have a (x,T) parameter
_ASTPreparser2.default.DataAvailable = function (formulaInfo, node) {
	//If(DataEntered(TaxOnProfitPsayable&&TaxProfitPaymentCalc!==10),TaxOnProfitsPayable-(TaxOnProfitsCum+TaxOnProfitsAssessment-TaxOnProfitsPaidAccumulated),NA)
	//be aware here, DataEntered refences to value,trend,notrend formulasets.
	//idea idea is all formulasets are redirected into one variable ID, so we can use 'notrend,trend,value' to redirect into value
	var refFormula = addFormulaDependency(formulaInfo, node.arguments[0].name, 'value');
	if (refFormula.ref === undefined) {
		return _log2.default.warn('Can\'t find a variableReference for ' + regenerate(node) + ' ' + formulaInfo.name + ':' + formulaInfo.original);
	}
	node.type = 'Identifier';
	// looks like being extracted as object, while has to be array
	node.name = 'v[' + refFormula.ref + '][x.hash + y.hash + z]!=null';
	delete node.refn;
	delete node.arguments;
	delete node.callee;
};

_ASTPreparser2.default.AnyDataAvailable = function (formulaInfo, node) {
	var refFormula = addFormulaDependency(formulaInfo, node.arguments[0].name, 'value');
	if (refFormula.ref === undefined) return _log2.default.warn('Can\'t find a variableReference for ' + regenerate(node) + ' ' + formulaInfo.name + ':' + formulaInfo.original);

	node.type = 'Identifier';
	node.name = 'Object.keys(v[' + refFormula.ref + ']).length>0';
	delete node.refn;
	delete node.arguments;
	delete node.callee;
};
_ASTPreparser2.default.TitleEntered = function (formulaInfo, node) {
	var refFormula = addFormulaDependency(formulaInfo, node.arguments[0].name, 'title');
	if (refFormula.ref === undefined) return _log2.default.warn('Can\'t find a variableReference for ' + regenerate(node) + ' ' + formulaInfo.name + ':' + formulaInfo.original);
	node.type = 'Identifier';
	node.name = 'Object.keys(v[' + refFormula.ref + ']).length>0';
	delete node.refn;
	delete node.arguments;
	delete node.callee;
};
_ASTPreparser2.default.DataEntered = _ASTPreparser2.default.DataAvailable;
//two members, START and END, will return Array<Variable>
//so transform into ArrayExpression
//this is somewhat complex
//first the ForAll, Count etc.. methods push the lamba as additional parameter into this function
//then with the first and additional second parameter we generate a Nested Logical expression of the whole
//leaving the lamba in tact. so everything is allowed there, only replacing the X with the found variables
//so the result of ForAll(x,SelectDecendants(Q_ROOT),Required(x)) will be Required(Q_MAP01) || Required(Q_MAP02) || Required(Q_MAP03 etc...
//Its better to also rename the Callee to Something like Lambda(SequenceExpression), or removing the entire CallExpression
//This must be the most complex seen in a while
_ASTPreparser2.default.SelectDescendants = function (formulaInfo, node) {
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
	//extract lambda
	//this can also be the propertyType is variableType empty
	var foundEndUiModel;
	if (lambda === undefined) {
		lambda = _astNodeUtils.ast.IDENTIFIER('X');
		node.arguments.length = 1;
	} else {
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
	lambda = _astNodeUtils.ast.cloneAST(lambda, null, null);
	for (var i = 0; i < nodes.length; i++) {
		if (foundEndUiModel && foundEndUiModel.rowId === nodes[i].rowId) {
			break;
		}
		walkRecursive(nodes[i], groupName, propertiesArr[0], function (child) {
			node.elements.push(_astNodeUtils.ast.cloneAST(lambda, 'X', child.rowId));
		});
	}
	delete node.arguments;
	delete node.callee;
};

function walkRecursive(node, groupName, col, callback) {
	callback(node);
	var n = getOrCreateProperty(groupName, node.rowId, col);
	if (n.nodes.length) {
		for (var i = 0; i < n.nodes.length; i++) {
			walkRecursive(n.nodes[i], groupName, col, callback);
		}
	}
}

_ASTPreparser2.default.InputRequired = function (formulaInfo, node) {
	node.type = 'MemberExpression';
	node.computed = false;
	node.object = _astNodeUtils.ast.IDENTIFIER(node.arguments[0].name);
	node.property = _astNodeUtils.ast.IDENTIFIER(propertiesArr[2]);
	delete node.arguments;
	delete node.callee;
	delete node.refn;
};
_ASTPreparser2.default.GetTitle = function (formulaInfo, node) {
	node.type = 'MemberExpression';
	node.computed = false;
	node.object = _astNodeUtils.ast.IDENTIFIER(node.arguments[0].name);
	node.property = _astNodeUtils.ast.IDENTIFIER(propertiesArr[6]);
	delete node.arguments;
	delete node.callee;
	delete node.refn;
};
_ASTPreparser2.default.TSUM = function (formulaInfo, node) {
	//all calls into a tuple should return a []
	//convert TSUM(variableName) into SUM(TVALUES(a123,'123',x,y,z,v))
	node.callee.name = 'SUM';
	buildFunc(formulaInfo, node.arguments[0], 0, node.arguments[0], node.property ? '.' + node.property.name : '', 'TVALUES');
};
_ASTPreparser2.default.TupleSum = _ASTPreparser2.default.TSUM;
_ASTPreparser2.default.TMIN = function (formulaInfo, node) {
	node.callee.name = 'MIN';
	buildFunc(formulaInfo, node.arguments[0], 0, node.arguments[0], node.property ? '.' + node.property.name : '', 'TVALUES');
};
_ASTPreparser2.default.TupleMin = _ASTPreparser2.default.TMIN;
_ASTPreparser2.default.TMAX = function (formulaInfo, node) {
	node.callee.name = 'MAX';
	buildFunc(formulaInfo, node.arguments[0], 0, node.arguments[0], node.property ? '.' + node.property.name : '', 'TVALUES');
};
_ASTPreparser2.default.TupleMax = _ASTPreparser2.default.TMAX;
_ASTPreparser2.default.TCOUNT = function (formulaInfo, node) {
	node.callee.name = 'PROXY';
	buildFunc(formulaInfo, node.arguments[0], 0, node.arguments[0], node.property ? '.' + node.property.name : '', 'TCOUNT');
};
_ASTPreparser2.default.TupleCount = _ASTPreparser2.default.TCOUNT;
var escodegenOptions = {
	format: {
		renumber: true,
		hexadecimal: true,
		escapeless: true,
		compact: true,
		semicolons: false,
		parentheses: false
	}

	/**
  * Two return types of this function, either the a11231(f.x.y.z.v) or v[f](xyz.hash)
  * There is no information which property is calling and cannot be resolved, since multiple sources can share a formula
  * This method is becoming so complex, its fixing a lot of things :)
  */
};function buildFunc(formulaInfo, node, property, referenceProperty, xapendix, tupleType) {
	xapendix = xapendix || '';
	var referenceProperty = addFormulaDependency(formulaInfo, referenceProperty.name, propertiesArr[property == 4 ? 0 : property]);
	var yAppendix = 'y';
	if (xapendix == '' && referenceProperty.frequency === 'document') xapendix = '.doc';
	delete referenceProperty.refn;
	var referenceFormulaId = referenceProperty.ref;

	if (!referenceProperty.tuple) {
		//From y(n) -> y(0) we go y.base
		yAppendix += '.base';
	} else {
		//Here we want to do y.parent for y(1,2) -> y(1) functions.
		//Lets be wiser, we can always do a parent-lookup y.one/y.two/y.three
		yAppendix += '.p[' + referenceProperty.nestedTupleDepth + ']';
	}
	if (tupleType) {
		if (referenceProperty) {
			var groupName = formulaInfo.name.split('_')[0];
			var foundStartUiModel = getOrCreateProperty(groupName, referenceProperty.tupleDefinitionName, propertiesArr[0]);
			var allrefIdes = [];
			if (referenceProperty.ref) {
				allrefIdes.push('' + referenceProperty.ref);
			}
			for (var i = 0; i < foundStartUiModel.nodes.length; i++) {
				var tupleChild = foundStartUiModel.nodes[i];
				var items = getOrCreateProperty(groupName, tupleChild.rowId, propertiesArr[0]).ref;
				if (items) {
					allrefIdes.push('' + items);
				}
			}
			var test = '[' + allrefIdes.join(',') + ']';
			node.name = tupleType + '(' + test + ',m[' + referenceFormulaId + '],\'' + referenceFormulaId + '\',x' + xapendix + ',' + yAppendix + ',z,v,m)';
		} else {
			node.name = '[' + defaultValues[propertiesArr[property]] + ']';
		}
	} else {
		if (referenceProperty.ref === undefined) {
			node.name = defaultValues[propertiesArr[property]];
		} else {
			if (property === 4) {
				node.name = 'v[' + referenceFormulaId + '][x.hash + y.hash + z] !=null';
			} else {
				if (xapendix === '.all') {
					//HSUM = function(fId, func, v, x, y, z, start, end) {
					node.name = 'VALUES(m[' + referenceFormulaId + '],\'' + referenceFormulaId + '\',x' + xapendix + ',' + yAppendix + ',z,v,m)';
				} else {
					node.name = 'm[' + referenceFormulaId + '](\'' + referenceFormulaId + '\',x' + xapendix + ',' + yAppendix + ',z,v,m)';
				}
			}
		}
	}
}

var dummy = function dummy(or, parent, node) {};
var expression = function expression(or, parent, node) {
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
	Identifier: function Identifier(formulaInfo, parent, node) {
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
	AssignmentExpression: function AssignmentExpression(formulaInfo, parent, node) {
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
	ArrayExpression: function ArrayExpression(or, parent, node) {
		node.elements.forEach(function (el) {
			if (el.refn) {
				//Why is here a new Object created? {}
				buildFunc(or, el, 0, { name: el.refn });
			}
		});
	},
	BinaryExpression: expression,
	LogicalExpression: expression,
	ExpressionStatement: function ExpressionStatement(orId, parent, node) {
		var expression = node.expression;
		if (expression.refn) {
			buildFunc(orId, expression, 0, expression);
		}
	},
	UnaryExpression: function UnaryExpression(orId, parent, node) {
		var argument = node.argument;
		if (argument.refn) {
			buildFunc(orId, argument, 0, argument);
		}
	},
	CallExpression: function CallExpression(orId, parent, node) {
		for (var i = 0, len = node.arguments.length; i < len; i++) {
			var argument = node.arguments[i];
			if (argument.refn) {
				buildFunc(orId, argument, 0, argument);
			}
		}
	},
	ConditionalExpression: function ConditionalExpression(orId, parent, node) {
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
	MemberExpression: function MemberExpression(orId, parent, node) {
		var object = node.object;
		if (object.refn) {
			var property = node.property;
			if (property.type === 'Identifier') {
				if (node.computed) {
					if (false && parent.type === 'MemberExpression') {
						//throw new Error('Not Supported Yet')
					} else {
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
						delete node.callee;
						delete node.property;
						delete node.computed;
					}
				} else {
					//not computed = .xxxx..
					//the .choices,.visible,required.title etc.
					//works partially
					node.type = IDENTIFIER;
					//this is very stupid to port it triple time. we will fix this later.
					buildFunc(orId, node, varproperties[node.property.name].f, node.object);
					delete node.property;
					delete node.object;
					delete node.computed;
				}
			}
			//Sequence is XYZ[a,b]... '[x,x] Not implemented this feature yet : ' + orId.original
			else if (property.type === 'SequenceExpression') {
					node.type = IDENTIFIER;
					buildFunc(orId, node, 0, node.object);
					delete node.arguments;
					delete node.object;
					delete node.property;
					delete node.computed;
				} else {
					node.type = IDENTIFIER;
					//this is where VARIABLE[1], VARIABLE[prev] ends up
					//for now we will check if the caller, starts with the being called, to avoid loops
					if (orId.tempnaaam === node.object.name) {
						//return 1 instead of a Self-reference
						node.name = '1';
						_log2.default.info('found self reference [%s]', node.object.name);
					} else {
						//else will will what ever just get the onecol value back.
						buildFunc(orId, node, 0, node.object);
					}
					delete node.object;
					delete node.property;
					delete node.computed;
				}
		}
	}
	//Now
};global.ExpandGrowth = function () {
	return 0;
};
global.Onzero = function () {
	return 0;
};
global.Hm = function () {
	return 0;
};
//So firstValueT means:  (FirstValueT(Self,1,MaxT)>0) Give me the First Column Index where the value is not NA
//So the question here is has[variable]AnyValue in time?
//recursive walk the formula ast
var identifier_replace = {
	TSY: 'x.tsy',
	T: 'x',
	MainPeriod: 'z', //zAxis Reference, base period, z.base
	MaxT: 'x.last',
	TupleInstanceIndex: 'y.index',
	TupleIndex: 'y.index',
	TupleLocation: 'y.display',
	Trend: 'x', //x.trend
	IsTrend: 'x.istrend',
	LastTinYear: 'x.lastinbkyear',
	Bookyear: 'x.bkyear',
	Now: 'NOW()',
	TimeAggregated: 'x.aggregated'

};

identifier_replace.Tsy = identifier_replace.TSY;
identifier_replace.TsY = identifier_replace.TSY;
identifier_replace.tsy = identifier_replace.TSY;

function buildFormula(formulaInfo, parent, node) {
	// just simplify some MODEL code, when a CallExpression appears, we might want to modify the structure before
	// looking at the content, this might cause some overhead because we have to parse more, but it simplifies the code
	// Simplified is only Top down
	// its only lookAhead

	if (node.type === 'CallExpression') {
		//register function
		functions[node.callee.name] = true;
		if (_log2.default.TRACE) _log2.default.trace('Use function [' + node.callee.name + ']');
		if (_ASTPreparser2.default[node.callee.name]) {
			_ASTPreparser2.default[node.callee.name](formulaInfo, node);
		} else {
			if (node.callee.name) {
				//be aware since Simplified modifies the Max into Math.max this will be seen as the function Math.max etc..
				var lme_math = node.callee.name.split('.')[0];
				if (global[lme_math] == null) {
					var groupName = formulaInfo.name.split('_')[0];
					var referenceProperty = getOrCreateProperty(groupName, lme_math, 'function');
					if (referenceProperty.ref !== undefined) {
						addFormulaDependency(formulaInfo, referenceProperty.rowId, 'function');
						node.callee.name = 'm[' + referenceProperty.ref + ']';
					} else throw Error('invalid call [' + node.callee.name + '] ' + formulaInfo.original);
				}
			}
		}
	} else if (node.type === IDENTIFIER) {
		/**
   * TODO: modify these parameters while parsing regex, directly inject the correct parameters
   */
		var n_name = node.name;
		if (identifier_replace[n_name]) {
			node.name = identifier_replace[n_name];
		} else if (n_name == 'YearInT' && parent.callee != node) {
			node.callee = {
				type: 'Identifier',
				name: 'YearInT'
			};
			node.type = 'CallExpression';
			node.arguments = [{
				type: 'Identifier',
				name: 'x'
			}];
			delete node.name;
			//because we create the CallExpression too late..
			_ASTPreparser2.default['YearInT'](formulaInfo, node);
		}
		//xAsReference x.notrend
		else if (n_name === 'NoTrend') {
				node.name = 'x';
			}
			//x.trend.lastbkyr
			else if (n_name === 'LastHistYear') {
					node.name = 'x.notrend.first';
				} else if (n_name === 'LastTinPeriod') {
					node.name = 'x.lastinperiod';
				}
				//x.trend.lastbkyr
				else if (n_name === 'LastHistYear') {
						node.name = 'x';
					}
					//should return the x.index.
					else if (n_name === 't') {
							_log2.default.warn('invalid t parsing [%s]', formulaInfo);
							//return the hash t.hash or t.index?
							node.name = 'hash';
						} else if (n_name == 'Self') {
							node.name = formulaInfo.name.split('_').slice(1, -1).join('_');
						}
	}
	//now we iterate all members, its not required if just use all types, we can skip things like properties etc..
	//Would be a performance boost, when we need it its going to increase speeds Log(n-1)
	for (var key in node) {
		if (node[key]) {
			var child = node[key];
			if ((typeof child === 'undefined' ? 'undefined' : (0, _typeof3.default)(child)) === 'object') {
				if (Array.isArray(child)) {
					for (var i = 0, len = child.length; i < len; i++) {
						buildFormula(formulaInfo, node, child[i]);
					}
				} else {
					buildFormula(formulaInfo, node, child);
				}
			}
		}
	}
	if (!traverseTypes[node.type]) {
		_log2.default.error('ERROR: [%s] not registered AST expression [%s]', node.type, name);
	}
	traverseTypes[node.type](formulaInfo, parent, node);
}

function regenerate(body) {
	return _escodegen2.default.generate(body, escodegenOptions);
}

//public function, will return the parsed string
//its getting nasty, with supporting this many options, consider only expecting on valid type either AST or STRING only
FormulaBootstrap.prototype.parseAsFormula = function (formulaInfo) {
	(0, _assert.ok)(formulaInfo.parsed === undefined);
	var ast;
	if ((0, _typeof3.default)(formulaInfo.body) === 'object') {
		formulaInfo.original = regenerate(formulaInfo.body);
		ast = formulaInfo.body;
	} else {
		formulaInfo.original = formulaInfo.body;
		ast = _esprima2.default.parse(formulaInfo.body);
	}
	// formulaInfo.tempnaaam = formulaInfo.name.replace(/^KSP_/, '').replace(/_value$/g, '');
	buildFormula(formulaInfo, null, ast);
	var generated = regenerate(ast);
	formulaInfo.ast = JSON.stringify(ast);
	formulaInfo.parsed = generated;
	formulaInfo.tempnaaam = undefined;
};
FormulaBootstrap.prototype.initStateBootstrap = function (configs) {
	functions = configs.functions;
	variables = configs.contains; //to distinct FesVariable from references
	properties = configs.properties; //to check if we use this property from the model language
	getOrCreateProperty = configs.getOrCreateProperty; //getOrCreateProperty a PropertyAssembler, to do a variable lookup.  We must have knowledge from the PropertyAssembler. To find corresponding referenceId
	addFormulaDependency = configs.addFormulaDependency;
	for (var property in properties) {
		varproperties[property] = {
			f: properties[property],
			t: {
				'type': 'Identifier',
				'name': properties[property]
			}
		};
	}
};
exports.default = FormulaBootstrap.prototype;