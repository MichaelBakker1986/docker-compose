(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
/**
 * Default AST templates
 * alternative ast-types
 * Should be excluded from front-end
 */
function STRING(text)
{
    return {
        "type": "Literal",
        "value": text
    }
}
function IDENTIFIER(text)
{
    return {
        "type": "Identifier",
        "name": text
    }
}
function fallBackToString(value)
{
    return (typeof value === 'object') ? value : STRING(value);
}
function fallBackToIdentifier(value)
{
    return (typeof value === 'object') ? value : IDENTIFIER(value);
}
function FUNCTION(name, args)
{
    return {
        "type": "CallExpression",
        "callee": fallBackToIdentifier(name),
        "arguments": args
    }
}
function EQUALS(left, right)
{
    return {
        "type": "BinaryExpression",
        "operator": "===",
        "left": fallBackToIdentifier(left),
        "right": fallBackToIdentifier(right)
    }
}
function IF(condition, consequent, alternative)
{
    return {
        "type": "ConditionalExpression",
        "test": condition,
        "consequent": fallBackToString(consequent),
        "alternate": fallBackToString(alternative)
    }
}
function PROPERTY(key, value)
{
    return {
        "type": "Property",
        "key": STRING(key),
        "computed": false,
        "value": fallBackToString(value),
        "kind": "init",
        "method": false,
        "shorthand": false
    }
}
//Helper, to clone AST tree's and replacing X for lamba expressions
function cloneAST(obj, replace, to)
{

    if (obj === null || typeof obj !== 'object')
    {
        return obj;
    }
    //i
    var temp = Array.isArray(obj) ? [] : {};//obj.constructor();// {}; // give temp the original obj's constructor
    for (var key in obj)
    {
        if (obj[key] === replace)
        {
            temp[key] = to;
        }
        else
        {
            var childClone = cloneAST(obj[key], replace, to);
            if ((typeof childClone !== 'function'))
            {
                temp[key] = childClone;
            }
        }
    }
    return temp;
}
var AST = {
    fallBackToIdentifier: fallBackToIdentifier,
    FUNCTION: FUNCTION,
    GTE: function (left, right)
    {
        return {
            "type": "BinaryExpression",
            "operator": ">=",
            "left": left,
            "right": right
        };
    },
    GT: function (left, right)
    {
        return {
            "type": "BinaryExpression",
            "operator": ">",
            "left": left,
            "right": right
        };
    },
    LT: function (left, right)
    {
        return {
            "type": "BinaryExpression",
            "operator": "<",
            "left": left,
            "right": right
        };
    },
    TRUE: function ()
    {
        return IDENTIFIER(true);
    },
    FALSE: function ()
    {
        return IDENTIFIER(false);
    },
    LTE: function (left, right)
    {
        return {
            "type": "BinaryExpression",
            "operator": "<=",
            "left": left,
            "right": right
        };
    },
    NONAN: function (identifier)
    {
        return {
            "type": "ConditionalExpression",
            "test": FUNCTION("isNaN", [IDENTIFIER(identifier)]),
            "consequent": STRING(0),
            "alternate": IDENTIFIER(identifier)
        };
    },
    ZEROONNAN: function (identifier)
    {
        return FUNCTION("ZeroOnNaN", [IDENTIFIER(identifier)]);
    },
    IDENTIFIER: IDENTIFIER,
    EQUALS: EQUALS,
    NOTEQUAL: function (left, right)
    {
        return {
            "type": "BinaryExpression",
            "operator": "!==",
            "left": fallBackToIdentifier(left),
            "right": fallBackToIdentifier(right)
        }
    },
    ISNAN: function (ast)
    {
        return FUNCTION("isNaN", [ast]);
    },
    NOT: function (ast)
    {
        return {
            "type": "UnaryExpression",
            "operator": "!",
            "argument": ast,
            "prefix": true
        };
    },
    AND: function (left, right)
    {
        return {
            "type": "LogicalExpression",
            "operator": "&&",
            "left": left,
            "right": right
        };
    },
    PARSEFLOAT: function (value)
    {
        return FUNCTION("parseFloat", [fallBackToString(value)]);
    },
    OR: function (left, right)
    {
        return {
            "type": "LogicalExpression",
            "operator": "||",
            "left": left,
            "right": right
        }
    },
    EXPRESSION: function (ast)
    {
        return {
            "type": "ExpressionStatement",
            "expression": fallBackToIdentifier(ast)
        }
    },
    ADD: function (left, right)
    {
        return {
            "type": "BinaryExpression",
            "operator": "+",
            "left": fallBackToString(left),
            "right": fallBackToString(right)
        };
    },
    MIN: function (left, right)
    {
        return {
            "type": "BinaryExpression",
            "operator": "-",
            "left": fallBackToString(left),
            "right": fallBackToString(right)
        };
    },
    MULTIPLY: function (left, right)
    {
        return {
            "type": "BinaryExpression",
            "operator": "*",
            "left": fallBackToString(left),
            "right": fallBackToString(right)
        };
    },
    IF: IF,
    MEMBER: function (obj, property)
    {
        return {
            "type": "MemberExpression",
            "computed": false,
            "object": obj,
            "property": IDENTIFIER(property)
        };
    },
    STRING: function (test)
    {
        return STRING(test);
    },
    UNDEFINED: function ()
    {
        return IDENTIFIER("undefined");
    },
    PROPERTY: PROPERTY,
    CHOICE: function (key, value)
    {
        return {
            "type": "ObjectExpression",
            "properties": [
                PROPERTY("name", key),
                PROPERTY("value", value)
            ]
        };
    },
    ARRAY: function ()
    {
        return {
            "type": "ArrayExpression",
            "elements": []
        }
    },
    PROGRAM: function (body)
    {
        return {
            "type": "Program",
            "body": [body],
            "sourceType": "script"
        };
    },
    cloneAST: cloneAST
}
module.exports = AST;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/ast-node-utils\\AST.js","/ast-node-utils",undefined)
},{"_process":38,"buffer":36}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
exports.ast = require('./AST')
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/ast-node-utils\\index.js","/ast-node-utils",undefined)
},{"./AST":1,"_process":38,"buffer":36}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
/**
 * bridge between formulajs and fesjs
 */
const logger = require('log6')
const formulaJs = require('formulajs')
const entries = {};
for (functionName in formulaJs) {
    //FFL parser uses this function to be a VARIABLE 1e-10
    if (functionName == 'NA') {
        continue;
    }
    if (global[functionName] !== undefined) {
        if (logger.DEBUG) logger.debug('global function already used : [' + functionName + ']')
        continue;
    }
    entries[functionName] = formulaJs[functionName]
}
exports.formulajs = {
    name: 'formulaJs',
    entries: entries
}
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/formulajs-connect\\formulajs.js","/formulajs-connect",undefined)
},{"_process":38,"buffer":36,"formulajs":4,"log6":35}],4:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("numeric"), require("numeral"), require("jStat"));
	else if(typeof define === 'function' && define.amd)
		define(["numeric", "numeral", "jStat"], factory);
	else if(typeof exports === 'object')
		exports["formulajs"] = factory(require("numeric"), require("numeral"), require("jStat"));
	else
		root["formulajs"] = factory(root["numeric"], root["numeral"], root["jStat"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var categories = [
	  __webpack_require__(1),
	  __webpack_require__(15),
	  __webpack_require__(12),
	  __webpack_require__(16),
	  __webpack_require__(2),
	  __webpack_require__(7),
	  __webpack_require__(14),
	  __webpack_require__(17),
	  __webpack_require__(11),
	  __webpack_require__(18),
	  __webpack_require__(6),
	  __webpack_require__(10)
	];

	for (var c in categories) {
	  var category = categories[c];
	  for (var f in category) {
	    exports[f] = exports[f] || category[f];
	  }
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var mathTrig = __webpack_require__(2);
	var statistical = __webpack_require__(6);
	var engineering = __webpack_require__(12);
	var dateTime = __webpack_require__(14);

	function set(fn, root) {
	  if (root) {
	    for (var i in root) {
	      fn[i] = root[i];
	    }
	  }
	  return fn;
	}

	exports.BETADIST = statistical.BETA.DIST;
	exports.BETAINV = statistical.BETA.INV;
	exports.BINOMDIST = statistical.BINOM.DIST;
	exports.CEILING = exports.ISOCEILING = set(mathTrig.CEILING.MATH, mathTrig.CEILING);
	exports.CEILINGMATH = mathTrig.CEILING.MATH;
	exports.CEILINGPRECISE = mathTrig.CEILING.PRECISE;
	exports.CHIDIST = statistical.CHISQ.DIST;
	exports.CHIDISTRT = statistical.CHISQ.DIST.RT;
	exports.CHIINV = statistical.CHISQ.INV;
	exports.CHIINVRT = statistical.CHISQ.INV.RT;
	exports.CHITEST = statistical.CHISQ.TEST;
	exports.CONFIDENCE = set(statistical.CONFIDENCE.NORM, statistical.CONFIDENCE);
	exports.COVAR = statistical.COVARIANCE.P;
	exports.COVARIANCEP = statistical.COVARIANCE.P;
	exports.COVARIANCES = statistical.COVARIANCE.S;
	exports.CRITBINOM = statistical.BINOM.INV;
	exports.EXPONDIST = statistical.EXPON.DIST;
	exports.ERFCPRECISE = engineering.ERFC.PRECISE;
	exports.ERFPRECISE = engineering.ERF.PRECISE;
	exports.FDIST = statistical.F.DIST;
	exports.FDISTRT = statistical.F.DIST.RT;
	exports.FINVRT = statistical.F.INV.RT;
	exports.FINV = statistical.F.INV;
	exports.FLOOR = set(mathTrig.FLOOR.MATH, mathTrig.FLOOR);
	exports.FLOORMATH = mathTrig.FLOOR.MATH;
	exports.FLOORPRECISE = mathTrig.FLOOR.PRECISE;
	exports.FTEST = statistical.F.TEST;
	exports.GAMMADIST = statistical.GAMMA.DIST;
	exports.GAMMAINV = statistical.GAMMA.INV;
	exports.GAMMALNPRECISE = statistical.GAMMALN.PRECISE;
	exports.HYPGEOMDIST = statistical.HYPGEOM.DIST;
	exports.LOGINV = statistical.LOGNORM.INV;
	exports.LOGNORMINV = statistical.LOGNORM.INV;
	exports.LOGNORMDIST = statistical.LOGNORM.DIST;
	exports.MODE = set(statistical.MODE.SNGL, statistical.MODE);
	exports.MODEMULT = statistical.MODE.MULT;
	exports.MODESNGL = statistical.MODE.SNGL;
	exports.NEGBINOMDIST = statistical.NEGBINOM.DIST;
	exports.NETWORKDAYSINTL = dateTime.NETWORKDAYS.INTL;
	exports.NORMDIST = statistical.NORM.DIST;
	exports.NORMINV = statistical.NORM.INV;
	exports.NORMSDIST = statistical.NORM.S.DIST;
	exports.NORMSINV = statistical.NORM.S.INV;
	exports.PERCENTILE = set(statistical.PERCENTILE.EXC, statistical.PERCENTILE);
	exports.PERCENTILEEXC = statistical.PERCENTILE.EXC;
	exports.PERCENTILEINC = statistical.PERCENTILE.INC;
	exports.PERCENTRANK = set(statistical.PERCENTRANK.INC, statistical.PERCENTRANK);
	exports.PERCENTRANKEXC = statistical.PERCENTRANK.EXC;
	exports.PERCENTRANKINC = statistical.PERCENTRANK.INC;
	exports.POISSON = set(statistical.POISSON.DIST, statistical.POISSON);
	exports.POISSONDIST = statistical.POISSON.DIST;
	exports.QUARTILE = set(statistical.QUARTILE.INC, statistical.QUARTILE);
	exports.QUARTILEEXC = statistical.QUARTILE.EXC;
	exports.QUARTILEINC = statistical.QUARTILE.INC;
	exports.RANK = set(statistical.RANK.EQ, statistical.RANK);
	exports.RANKAVG = statistical.RANK.AVG;
	exports.RANKEQ = statistical.RANK.EQ;
	exports.SKEWP = statistical.SKEW.P;
	exports.STDEV = set(statistical.STDEV.S, statistical.STDEV);
	exports.STDEVP = statistical.STDEV.P;
	exports.STDEVS = statistical.STDEV.S;
	exports.TDIST = statistical.T.DIST;
	exports.TDISTRT = statistical.T.DIST.RT;
	exports.TINV = statistical.T.INV;
	exports.TTEST = statistical.T.TEST;
	exports.VAR = set(statistical.VAR.S, statistical.VAR);
	exports.VARP = statistical.VAR.P;
	exports.VARS = statistical.VAR.S;
	exports.WEIBULL = set(statistical.WEIBULL.DIST, statistical.WEIBULL);
	exports.WEIBULLDIST = statistical.WEIBULL.DIST;
	exports.WORKDAYINTL = dateTime.WORKDAY.INTL;
	exports.ZTEST = statistical.Z.TEST;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var numeric = __webpack_require__(3);
	var utils = __webpack_require__(4);
	var error = __webpack_require__(5);
	var statistical = __webpack_require__(6);
	var information = __webpack_require__(11);

	exports.ABS = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.abs(utils.parseNumber(number));
	};

	exports.ACOS = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.acos(number);
	};

	exports.ACOSH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.log(number + Math.sqrt(number * number - 1));
	};

	exports.ACOT = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.atan(1 / number);
	};

	exports.ACOTH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return 0.5 * Math.log((number + 1) / (number - 1));
	};

	//TODO: use options
	exports.AGGREGATE = function(function_num, options, ref1, ref2) {
	  function_num = utils.parseNumber(function_num);
	  options = utils.parseNumber(function_num);
	  if (utils.anyIsError(function_num, options)) {
	    return error.value;
	  }
	  switch (function_num) {
	    case 1:
	      return statistical.AVERAGE(ref1);
	    case 2:
	      return statistical.COUNT(ref1);
	    case 3:
	      return statistical.COUNTA(ref1);
	    case 4:
	      return statistical.MAX(ref1);
	    case 5:
	      return statistical.MIN(ref1);
	    case 6:
	      return exports.PRODUCT(ref1);
	    case 7:
	      return statistical.STDEV.S(ref1);
	    case 8:
	      return statistical.STDEV.P(ref1);
	    case 9:
	      return exports.SUM(ref1);
	    case 10:
	      return statistical.VAR.S(ref1);
	    case 11:
	      return statistical.VAR.P(ref1);
	    case 12:
	      return statistical.MEDIAN(ref1);
	    case 13:
	      return statistical.MODE.SNGL(ref1);
	    case 14:
	      return statistical.LARGE(ref1, ref2);
	    case 15:
	      return statistical.SMALL(ref1, ref2);
	    case 16:
	      return statistical.PERCENTILE.INC(ref1, ref2);
	    case 17:
	      return statistical.QUARTILE.INC(ref1, ref2);
	    case 18:
	      return statistical.PERCENTILE.EXC(ref1, ref2);
	    case 19:
	      return statistical.QUARTILE.EXC(ref1, ref2);
	  }
	};

	exports.ARABIC = function(text) {
	  // Credits: Rafa? Kukawski
	  if (!/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/.test(text)) {
	    return error.value;
	  }
	  var r = 0;
	  text.replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, function(i) {
	    r += {
	      M: 1000,
	      CM: 900,
	      D: 500,
	      CD: 400,
	      C: 100,
	      XC: 90,
	      L: 50,
	      XL: 40,
	      X: 10,
	      IX: 9,
	      V: 5,
	      IV: 4,
	      I: 1
	    }[i];
	  });
	  return r;
	};

	exports.ASIN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.asin(number);
	};

	exports.ASINH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.log(number + Math.sqrt(number * number + 1));
	};

	exports.ATAN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.atan(number);
	};

	exports.ATAN2 = function(number_x, number_y) {
	  number_x = utils.parseNumber(number_x);
	  number_y = utils.parseNumber(number_y);
	  if (utils.anyIsError(number_x, number_y)) {
	    return error.value;
	  }
	  return Math.atan2(number_x, number_y);
	};

	exports.ATANH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.log((1 + number) / (1 - number)) / 2;
	};

	exports.BASE = function(number, radix, min_length) {
	  min_length = min_length || 0;

	  number = utils.parseNumber(number);
	  radix = utils.parseNumber(radix);
	  min_length = utils.parseNumber(min_length);
	  if (utils.anyIsError(number, radix, min_length)) {
	    return error.value;
	  }
	  min_length = (min_length === undefined) ? 0 : min_length;
	  var result = number.toString(radix);
	  return new Array(Math.max(min_length + 1 - result.length, 0)).join('0') + result;
	};

	exports.CEILING = function(number, significance, mode) {
	  significance = (significance === undefined) ? 1 : Math.abs(significance);
	  mode = mode || 0;

	  number = utils.parseNumber(number);
	  significance = utils.parseNumber(significance);
	  mode = utils.parseNumber(mode);
	  if (utils.anyIsError(number, significance, mode)) {
	    return error.value;
	  }
	  if (significance === 0) {
	    return 0;
	  }
	  var precision = -Math.floor(Math.log(significance) / Math.log(10));
	  if (number >= 0) {
	    return exports.ROUND(Math.ceil(number / significance) * significance, precision);
	  } else {
	    if (mode === 0) {
	      return -exports.ROUND(Math.floor(Math.abs(number) / significance) * significance, precision);
	    } else {
	      return -exports.ROUND(Math.ceil(Math.abs(number) / significance) * significance, precision);
	    }
	  }
	};

	exports.CEILING.MATH = exports.CEILING;

	exports.CEILING.PRECISE = exports.CEILING;

	exports.COMBIN = function(number, number_chosen) {
	  number = utils.parseNumber(number);
	  number_chosen = utils.parseNumber(number_chosen);
	  if (utils.anyIsError(number, number_chosen)) {
	    return error.value;
	  }
	  return exports.FACT(number) / (exports.FACT(number_chosen) * exports.FACT(number - number_chosen));
	};

	exports.COMBINA = function(number, number_chosen) {
	  number = utils.parseNumber(number);
	  number_chosen = utils.parseNumber(number_chosen);
	  if (utils.anyIsError(number, number_chosen)) {
	    return error.value;
	  }
	  return (number === 0 && number_chosen === 0) ? 1 : exports.COMBIN(number + number_chosen - 1, number - 1);
	};

	exports.COS = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.cos(number);
	};

	exports.COSH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return (Math.exp(number) + Math.exp(-number)) / 2;
	};

	exports.COT = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return 1 / Math.tan(number);
	};

	exports.COTH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var e2 = Math.exp(2 * number);
	  return (e2 + 1) / (e2 - 1);
	};

	exports.CSC = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return 1 / Math.sin(number);
	};

	exports.CSCH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return 2 / (Math.exp(number) - Math.exp(-number));
	};

	exports.DECIMAL = function(number, radix) {
	  if (arguments.length < 1) {
	    return error.value;
	  }


	  return parseInt(number, radix);
	};

	exports.DEGREES = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return number * 180 / Math.PI;
	};

	exports.EVEN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return exports.CEILING(number, -2, -1);
	};

	exports.EXP = Math.exp;

	var MEMOIZED_FACT = [];
	exports.FACT = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var n = Math.floor(number);
	  if (n === 0 || n === 1) {
	    return 1;
	  } else if (MEMOIZED_FACT[n] > 0) {
	    return MEMOIZED_FACT[n];
	  } else {
	    MEMOIZED_FACT[n] = exports.FACT(n - 1) * n;
	    return MEMOIZED_FACT[n];
	  }
	};

	exports.FACTDOUBLE = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var n = Math.floor(number);
	  if (n <= 0) {
	    return 1;
	  } else {
	    return n * exports.FACTDOUBLE(n - 2);
	  }
	};

	exports.FLOOR = function(number, significance) {
	  number = utils.parseNumber(number);
	  significance = utils.parseNumber(significance);
	  if (utils.anyIsError(number, significance)) {
	    return error.value;
	  }
	  if (significance === 0) {
	    return 0;
	  }

	  if (!(number > 0 && significance > 0) && !(number < 0 && significance < 0)) {
	    return error.num;
	  }

	  significance = Math.abs(significance);
	  var precision = -Math.floor(Math.log(significance) / Math.log(10));
	  if (number >= 0) {
	    return exports.ROUND(Math.floor(number / significance) * significance, precision);
	  } else {
	    return -exports.ROUND(Math.ceil(Math.abs(number) / significance), precision);
	  }
	};

	//TODO: Verify
	exports.FLOOR.MATH = function(number, significance, mode) {
	  significance = (significance === undefined) ? 1 : significance;
	  mode = (mode === undefined) ? 0 : mode;

	  number = utils.parseNumber(number);
	  significance = utils.parseNumber(significance);
	  mode = utils.parseNumber(mode);
	  if (utils.anyIsError(number, significance, mode)) {
	    return error.value;
	  }
	  if (significance === 0) {
	    return 0;
	  }

	  significance = significance ? Math.abs(significance) : 1;
	  var precision = -Math.floor(Math.log(significance) / Math.log(10));
	  if (number >= 0) {
	    return exports.ROUND(Math.floor(number / significance) * significance, precision);
	  } else if (mode === 0 || mode === undefined) {
	    return -exports.ROUND(Math.ceil(Math.abs(number) / significance) * significance, precision);
	  }
	  return -exports.ROUND(Math.floor(Math.abs(number) / significance) * significance, precision);
	};

	// Deprecated
	exports.FLOOR.PRECISE = exports.FLOOR.MATH;

	// adapted http://rosettacode.org/wiki/Greatest_common_divisor#JavaScript
	exports.GCD = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var n = range.length;
	  var r0 = range[0];
	  var x = r0 < 0 ? -r0 : r0;
	  for (var i = 1; i < n; i++) {
	    var ri = range[i];
	    var y = ri < 0 ? -ri : ri;
	    while (x && y) {
	      if (x > y) {
	        x %= y;
	      } else {
	        y %= x;
	      }
	    }
	    x += y;
	  }
	  return x;
	};


	exports.INT = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.floor(number);
	};

	//TODO: verify
	exports.ISO = {
	  CEILING: exports.CEILING
	};

	exports.LCM = function() {
	  // Credits: Jonas Raoni Soares Silva
	  var o = utils.parseNumberArray(utils.flatten(arguments));
	  if (o instanceof Error) {
	    return o;
	  }
	  for (var i, j, n, d, r = 1;
	    (n = o.pop()) !== undefined;) {
	    while (n > 1) {
	      if (n % 2) {
	        for (i = 3, j = Math.floor(Math.sqrt(n)); i <= j && n % i; i += 2) {
	          //empty
	        }
	        d = (i <= j) ? i : n;
	      } else {
	        d = 2;
	      }
	      for (n /= d, r *= d, i = o.length; i;
	        (o[--i] % d) === 0 && (o[i] /= d) === 1 && o.splice(i, 1)) {
	        //empty
	      }
	    }
	  }
	  return r;
	};

	exports.LN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.log(number);
	};

	exports.LOG = function(number, base) {
	  number = utils.parseNumber(number);
	  base = utils.parseNumber(base);
	  if (utils.anyIsError(number, base)) {
	    return error.value;
	  }
	  base = (base === undefined) ? 10 : base;
	  return Math.log(number) / Math.log(base);
	};

	exports.LOG10 = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.log(number) / Math.log(10);
	};

	exports.MDETERM = function(matrix) {
	  matrix = utils.parseMatrix(matrix);
	  if (matrix instanceof Error) {
	    return matrix;
	  }
	  return numeric.det(matrix);
	};

	exports.MINVERSE = function(matrix) {
	  matrix = utils.parseMatrix(matrix);
	  if (matrix instanceof Error) {
	    return matrix;
	  }
	  return numeric.inv(matrix);
	};

	exports.MMULT = function(matrix1, matrix2) {
	  matrix1 = utils.parseMatrix(matrix1);
	  matrix2 = utils.parseMatrix(matrix2);
	  if (utils.anyIsError(matrix1, matrix2)) {
	    return error.value;
	  }
	  return numeric.dot(matrix1, matrix2);
	};

	exports.MOD = function(dividend, divisor) {
	  dividend = utils.parseNumber(dividend);
	  divisor = utils.parseNumber(divisor);
	  if (utils.anyIsError(dividend, divisor)) {
	    return error.value;
	  }
	  if (divisor === 0) {
	    return error.div0;
	  }
	  var modulus = Math.abs(dividend % divisor);
	  return (divisor > 0) ? modulus : -modulus;
	};

	  exports.MROUND = function(number, multiple) {
	  number = utils.parseNumber(number);
	  multiple = utils.parseNumber(multiple);
	  if (utils.anyIsError(number, multiple)) {
	    return error.value;
	  }
	  if (number * multiple < 0) {
	    return error.num;
	  }

	  return Math.round(number / multiple) * multiple;
	};

	exports.MULTINOMIAL = function() {
	  var args = utils.parseNumberArray(utils.flatten(arguments));
	  if (args instanceof Error) {
	    return args;
	  }
	  var sum = 0;
	  var divisor = 1;
	  for (var i = 0; i < args.length; i++) {
	    sum += args[i];
	    divisor *= exports.FACT(args[i]);
	  }
	  return exports.FACT(sum) / divisor;
	};

	exports.MUNIT = function(dimension) {
	  dimension = utils.parseNumber(dimension);
	  if (dimension instanceof Error) {
	    return dimension;
	  }
	  return numeric.identity(dimension);
	};

	exports.ODD = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var temp = Math.ceil(Math.abs(number));
	  temp = (temp & 1) ? temp : temp + 1;
	  return (number > 0) ? temp : -temp;
	};

	exports.PI = function() {
	  return Math.PI;
	};

	exports.POWER = function(number, power) {
	  number = utils.parseNumber(number);
	  power = utils.parseNumber(power);
	  if (utils.anyIsError(number, power)) {
	    return error.value;
	  }
	  var result = Math.pow(number, power);
	  if (isNaN(result)) {
	    return error.num;
	  }

	  return result;
	};

	exports.PRODUCT = function() {
	  var args = utils.parseNumberArray(utils.flatten(arguments));
	  if (args instanceof Error) {
	    return args;
	  }
	  var result = 1;
	  for (var i = 0; i < args.length; i++) {
	    result *= args[i];
	  }
	  return result;
	};

	exports.QUOTIENT = function(numerator, denominator) {
	  numerator = utils.parseNumber(numerator);
	  denominator = utils.parseNumber(denominator);
	  if (utils.anyIsError(numerator, denominator)) {
	    return error.value;
	  }
	  return parseInt(numerator / denominator, 10);
	};

	exports.RADIANS = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return number * Math.PI / 180;
	};

	exports.RAND = function() {
	  return Math.random();
	};

	exports.RANDBETWEEN = function(bottom, top) {
	  bottom = utils.parseNumber(bottom);
	  top = utils.parseNumber(top);
	  if (utils.anyIsError(bottom, top)) {
	    return error.value;
	  }
	  // Creative Commons Attribution 3.0 License
	  // Copyright (c) 2012 eqcode
	  return bottom + Math.ceil((top - bottom + 1) * Math.random()) - 1;
	};

	// TODO
	exports.ROMAN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  // The MIT License
	  // Copyright (c) 2008 Steven Levithan
	  var digits = String(number).split('');
	  var key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM', '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC', '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
	  var roman = '';
	  var i = 3;
	  while (i--) {
	    roman = (key[+digits.pop() + (i * 10)] || '') + roman;
	  }
	  return new Array(+digits.join('') + 1).join('M') + roman;
	};

	exports.ROUND = function(number, digits) {
	  number = utils.parseNumber(number);
	  digits = utils.parseNumber(digits);
	  if (utils.anyIsError(number, digits)) {
	    return error.value;
	  }
	  return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
	};

	exports.ROUNDDOWN = function(number, digits) {
	  number = utils.parseNumber(number);
	  digits = utils.parseNumber(digits);
	  if (utils.anyIsError(number, digits)) {
	    return error.value;
	  }
	  var sign = (number > 0) ? 1 : -1;
	  return sign * (Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
	};

	exports.ROUNDUP = function(number, digits) {
	  number = utils.parseNumber(number);
	  digits = utils.parseNumber(digits);
	  if (utils.anyIsError(number, digits)) {
	    return error.value;
	  }
	  var sign = (number > 0) ? 1 : -1;
	  return sign * (Math.ceil(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
	};

	exports.SEC = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return 1 / Math.cos(number);
	};

	exports.SECH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return 2 / (Math.exp(number) + Math.exp(-number));
	};

	exports.SERIESSUM = function(x, n, m, coefficients) {
	  x = utils.parseNumber(x);
	  n = utils.parseNumber(n);
	  m = utils.parseNumber(m);
	  coefficients = utils.parseNumberArray(coefficients);
	  if (utils.anyIsError(x, n, m, coefficients)) {
	    return error.value;
	  }
	  var result = coefficients[0] * Math.pow(x, n);
	  for (var i = 1; i < coefficients.length; i++) {
	    result += coefficients[i] * Math.pow(x, n + i * m);
	  }
	  return result;
	};

	exports.SIGN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  if (number < 0) {
	    return -1;
	  } else if (number === 0) {
	    return 0;
	  } else {
	    return 1;
	  }
	};

	exports.SIN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.sin(number);
	};

	  exports.SINH = function(number) {
	    number = utils.parseNumber(number);
	    if (number instanceof Error) {
	      return number;
	    }
	    return (Math.exp(number) - Math.exp(-number)) / 2;
	  };

	  exports.SQRT = function(number) {
	    number = utils.parseNumber(number);
	    if (number instanceof Error) {
	      return number;
	    }
	    if (number < 0) {
	      return error.num;
	    }
	    return Math.sqrt(number);
	  };

	  exports.SQRTPI = function(number) {
	    number = utils.parseNumber(number);
	    if (number instanceof Error) {
	      return number;
	    }
	    return Math.sqrt(number * Math.PI);
	  };

	exports.SUBTOTAL = function(function_code, ref1) {
	  function_code = utils.parseNumber(function_code);
	  if (function_code instanceof Error) {
	    return function_code;
	  }
	  switch (function_code) {
	    case 1:
	      return statistical.AVERAGE(ref1);
	    case 2:
	      return statistical.COUNT(ref1);
	    case 3:
	      return statistical.COUNTA(ref1);
	    case 4:
	      return statistical.MAX(ref1);
	    case 5:
	      return statistical.MIN(ref1);
	    case 6:
	      return exports.PRODUCT(ref1);
	    case 7:
	      return statistical.STDEV.S(ref1);
	    case 8:
	      return statistical.STDEV.P(ref1);
	    case 9:
	      return exports.SUM(ref1);
	    case 10:
	      return statistical.VAR.S(ref1);
	    case 11:
	      return statistical.VAR.P(ref1);
	      // no hidden values for us
	    case 101:
	      return statistical.AVERAGE(ref1);
	    case 102:
	      return statistical.COUNT(ref1);
	    case 103:
	      return statistical.COUNTA(ref1);
	    case 104:
	      return statistical.MAX(ref1);
	    case 105:
	      return statistical.MIN(ref1);
	    case 106:
	      return exports.PRODUCT(ref1);
	    case 107:
	      return statistical.STDEV.S(ref1);
	    case 108:
	      return statistical.STDEV.P(ref1);
	    case 109:
	      return exports.SUM(ref1);
	    case 110:
	      return statistical.VAR.S(ref1);
	    case 111:
	      return statistical.VAR.P(ref1);

	  }
	};

	exports.ADD = function (num1, num2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  num1 = utils.parseNumber(num1);
	  num2 = utils.parseNumber(num2);
	  if (utils.anyIsError(num1, num2)) {
	    return error.value;
	  }

	  return num1 + num2;
	};

	exports.MINUS = function (num1, num2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  num1 = utils.parseNumber(num1);
	  num2 = utils.parseNumber(num2);
	  if (utils.anyIsError(num1, num2)) {
	    return error.value;
	  }

	  return num1 - num2;
	};

	exports.DIVIDE = function (dividend, divisor) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  dividend = utils.parseNumber(dividend);
	  divisor = utils.parseNumber(divisor);
	  if (utils.anyIsError(dividend, divisor)) {
	    return error.value;
	  }

	  if (divisor === 0) {
	    return error.div0;
	  }

	  return dividend / divisor;
	};

	exports.MULTIPLY = function (factor1, factor2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  factor1 = utils.parseNumber(factor1);
	  factor2 = utils.parseNumber(factor2);
	  if (utils.anyIsError(factor1, factor2)) {
	    return error.value;
	  }

	  return factor1 * factor2;
	};

	exports.GTE = function (num1, num2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  num1 = utils.parseNumber(num1);
	  num2 = utils.parseNumber(num2);
	  if (utils.anyIsError(num1, num2)) {
	    return error.error;
	  }

	  return num1 >= num2;
	};

	exports.LT = function (num1, num2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  num1 = utils.parseNumber(num1);
	  num2 = utils.parseNumber(num2);
	  if (utils.anyIsError(num1, num2)) {
	    return error.error;
	  }

	  return num1 < num2;
	};


	exports.LTE = function (num1, num2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  num1 = utils.parseNumber(num1);
	  num2 = utils.parseNumber(num2);
	  if (utils.anyIsError(num1, num2)) {
	    return error.error;
	  }

	  return num1 <= num2;
	};

	exports.EQ = function (value1, value2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  return value1 === value2;
	};

	exports.NE = function (value1, value2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  return value1 !== value2;
	};

	exports.POW = function (base, exponent) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  base = utils.parseNumber(base);
	  exponent = utils.parseNumber(exponent);
	  if (utils.anyIsError(base, exponent)) {
	    return error.error;
	  }

	  return exports.POWER(base, exponent);
	};

	exports.SUM = function() {
	  var result = 0;
	  var argsKeys = Object.keys(arguments);
	  for (var i = 0; i < argsKeys.length; ++i) {
	    var elt = arguments[argsKeys[i]];
	    if (typeof elt === 'number') {
	      result += elt;
	    } else if (typeof elt === 'string') {
	      var parsed = parseFloat(elt);
	      !isNaN(parsed) && (result += parsed);
	    } else if (Array.isArray(elt)) {
	      result += exports.SUM.apply(null, elt);
	    }
	  }
	  return result;
	};

	exports.SUMIF = function(range, criteria) {
	  range = utils.parseNumberArray(utils.flatten(range));
	  if (range instanceof Error) {
	    return range;
	  }
	  var result = 0;
	  for (var i = 0; i < range.length; i++) {
	    result += (eval(range[i] + criteria)) ? range[i] : 0; // jshint ignore:line
	  }
	  return result;
	};

	exports.SUMIFS = function() {
	  var args = utils.argsToArray(arguments);
	  var range = utils.parseNumberArray(utils.flatten(args.shift()));
	  if (range instanceof Error) {
	    return range;
	  }
	  var criteria = args;

	  var n_range_elements = range.length;
	  var n_criterias = criteria.length;

	  var result = 0;
	  for (var i = 0; i < n_range_elements; i++) {
	    var el = range[i];
	    var condition = '';
	    for (var c = 0; c < n_criterias; c++) {
	      condition += el + criteria[c];
	      if (c !== n_criterias - 1) {
	        condition += '&&';
	      }
	    }
	    if (eval(condition)) { // jshint ignore:line
	      result += el;
	    }
	  }
	  return result;
	};

	exports.SUMPRODUCT = function() {
	  if (!arguments || arguments.length === 0) {
	    return error.value;
	  }
	  var arrays = arguments.length + 1;
	  var result = 0;
	  var product;
	  var k;
	  var _i;
	  var _ij;
	  for (var i = 0; i < arguments[0].length; i++) {
	    if (!(arguments[0][i] instanceof Array)) {
	      product = 1;
	      for (k = 1; k < arrays; k++) {
	        _i = utils.parseNumber(arguments[k - 1][i]);
	        if (_i instanceof Error) {
	          return _i;
	        }
	        product *= _i;
	      }
	      result += product;
	    } else {
	      for (var j = 0; j < arguments[0][i].length; j++) {
	        product = 1;
	        for (k = 1; k < arrays; k++) {
	          _ij = utils.parseNumber(arguments[k - 1][i][j]);
	          if (_ij instanceof Error) {
	            return _ij;
	          }
	          product *= _ij;
	        }
	        result += product;
	      }
	    }
	  }
	  return result;
	};

	exports.SUMSQ = function() {
	  var numbers = utils.parseNumberArray(utils.flatten(arguments));
	  if (numbers instanceof Error) {
	    return numbers;
	  }
	  var result = 0;
	  var length = numbers.length;
	  for (var i = 0; i < length; i++) {
	    result += (information.ISNUMBER(numbers[i])) ? numbers[i] * numbers[i] : 0;
	  }
	  return result;
	};

	exports.SUMX2MY2 = function(array_x, array_y) {
	  array_x = utils.parseNumberArray(utils.flatten(array_x));
	  array_y = utils.parseNumberArray(utils.flatten(array_y));
	  if (utils.anyIsError(array_x, array_y)) {
	    return error.value;
	  }
	  var result = 0;
	  for (var i = 0; i < array_x.length; i++) {
	    result += array_x[i] * array_x[i] - array_y[i] * array_y[i];
	  }
	  return result;
	};

	exports.SUMX2PY2 = function(array_x, array_y) {
	  array_x = utils.parseNumberArray(utils.flatten(array_x));
	  array_y = utils.parseNumberArray(utils.flatten(array_y));
	  if (utils.anyIsError(array_x, array_y)) {
	    return error.value;
	  }
	  var result = 0;
	  array_x = utils.parseNumberArray(utils.flatten(array_x));
	  array_y = utils.parseNumberArray(utils.flatten(array_y));
	  for (var i = 0; i < array_x.length; i++) {
	    result += array_x[i] * array_x[i] + array_y[i] * array_y[i];
	  }
	  return result;
	};

	exports.SUMXMY2 = function(array_x, array_y) {
	  array_x = utils.parseNumberArray(utils.flatten(array_x));
	  array_y = utils.parseNumberArray(utils.flatten(array_y));
	  if (utils.anyIsError(array_x, array_y)) {
	    return error.value;
	  }
	  var result = 0;
	  array_x = utils.flatten(array_x);
	  array_y = utils.flatten(array_y);
	  for (var i = 0; i < array_x.length; i++) {
	    result += Math.pow(array_x[i] - array_y[i], 2);
	  }
	  return result;
	};

	exports.TAN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.tan(number);
	};

	exports.TANH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var e2 = Math.exp(2 * number);
	  return (e2 - 1) / (e2 + 1);
	};

	exports.TRUNC = function(number, digits) {
	  digits = (digits === undefined) ? 0 : digits;
	  number = utils.parseNumber(number);
	  digits = utils.parseNumber(digits);
	  if (utils.anyIsError(number, digits)) {
	    return error.value;
	  }
	  var sign = (number > 0) ? 1 : -1;
	  return sign * (Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(5);

	function flattenShallow(array) {
	  if (!array || !array.reduce) { return array; }
	  return array.reduce(function(a, b) {
	    var aIsArray = Array.isArray(a);
	    var bIsArray = Array.isArray(b);
	    if (aIsArray && bIsArray ) {
	      return a.concat(b);
	    }
	    if (aIsArray) {
	      a.push(b);
	      return a;
	    }
	    if (bIsArray) {
	      return [a].concat(b);
	    }
	    return [a, b];
	  });
	}

	function isFlat(array) {
	  if (!array) { return false; }
	  for (var i = 0; i < array.length; ++i) {
	    if (Array.isArray(array[i])) {
	      return false;
	    }
	  }
	  return true;
	}

	exports.flatten = function() {
	  var result = exports.argsToArray.apply(null, arguments);
	  while (!isFlat(result)) {
	    result = flattenShallow(result);
	  }
	  return result;
	};

	exports.argsToArray = function(args) {
	  return Array.prototype.slice.call(args, 0);
	};

	exports.numbers = function() {
	  var possibleNumbers = this.flatten.apply(null, arguments);
	  return possibleNumbers.filter(function(el) {
	    return typeof el === 'number';
	  });
	};

	exports.cleanFloat = function(number) {
	  var power = 1e14;
	  return Math.round(number * power) / power;
	};

	exports.parseBool = function(bool) {
	  if (typeof bool === 'boolean') {
	    return bool;
	  }

	  if (bool instanceof Error) {
	    return bool;
	  }

	  if (typeof bool === 'number') {
	    return bool !== 0;
	  }

	  if (typeof bool === 'string') {
	    var up = bool.toUpperCase();
	    if (up === 'TRUE') {
	      return true;
	    }

	    if (up === 'FALSE') {
	      return false;
	    }
	  }

	  if (bool instanceof Date && !isNaN(bool)) {
	    return true;
	  }

	  return error.value;
	};

	exports.parseNumber = function(string) {
	  if (string === undefined || string === '') {
	    return error.value;
	  }
	  if (!isNaN(string)) {
	    return parseFloat(string);
	  }
	  return error.value;
	};

	exports.parseNumberArray = function(arr) {
	  var len;
	  if (!arr || (len = arr.length) === 0) {
	    return error.value;
	  }
	  var parsed;
	  while (len--) {
	    parsed = exports.parseNumber(arr[len]);
	    if (parsed === error.value) {
	      return parsed;
	    }
	    arr[len] = parsed;
	  }
	  return arr;
	};

	exports.parseMatrix = function(matrix) {
	  var n;
	  if (!matrix || (n = matrix.length) === 0) {
	    return error.value;
	  }
	  var pnarr;
	  for (var i = 0; i < matrix.length; i++) {
	    pnarr = exports.parseNumberArray(matrix[i]);
	    matrix[i] = pnarr;
	    if (pnarr instanceof Error) {
	      return pnarr;
	    }
	  }
	  return matrix;
	};

	var d1900 = new Date(1900, 0, 1);
	exports.parseDate = function(date) {
	  if (!isNaN(date)) {
	    if (date instanceof Date) {
	      return new Date(date);
	    }
	    var d = parseInt(date, 10);
	    if (d < 0) {
	      return error.num;
	    }
	    if (d <= 60) {
	      return new Date(d1900.getTime() + (d - 1) * 86400000);
	    }
	    return new Date(d1900.getTime() + (d - 2) * 86400000);
	  }
	  if (typeof date === 'string') {
	    date = new Date(date);
	    if (!isNaN(date)) {
	      return date;
	    }
	  }
	  return error.value;
	};

	exports.parseDateArray = function(arr) {
	  var len = arr.length;
	  var parsed;
	  while (len--) {
	    parsed = this.parseDate(arr[len]);
	    if (parsed === error.value) {
	      return parsed;
	    }
	    arr[len] = parsed;
	  }
	  return arr;
	};

	exports.anyIsError = function() {
	  var n = arguments.length;
	  while (n--) {
	    if (arguments[n] instanceof Error) {
	      return true;
	    }
	  }
	  return false;
	};

	exports.arrayValuesToNumbers = function(arr) {
	  var n = arr.length;
	  var el;
	  while (n--) {
	    el = arr[n];
	    if (typeof el === 'number') {
	      continue;
	    }
	    if (el === true) {
	      arr[n] = 1;
	      continue;
	    }
	    if (el === false) {
	      arr[n] = 0;
	      continue;
	    }
	    if (typeof el === 'string') {
	      var number = this.parseNumber(el);
	      if (number instanceof Error) {
	        arr[n] = 0;
	      } else {
	        arr[n] = number;
	      }
	    }
	  }
	  return arr;
	};

	exports.rest = function(array, idx) {
	  idx = idx || 1;
	  if (!array || typeof array.slice !== 'function') {
	    return array;
	  }
	  return array.slice(idx);
	};

	exports.initial = function(array, idx) {
	  idx = idx || 1;
	  if (!array || typeof array.slice !== 'function') {
	    return array;
	  }
	  return array.slice(0, array.length - idx);
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	exports.nil = new Error('#NULL!');
	exports.div0 = new Error('#DIV/0!');
	exports.value = new Error('#VALUE?');
	exports.ref = new Error('#REF!');
	exports.name = new Error('#NAME?');
	exports.num = new Error('#NUM!');
	exports.na = new Error('#N/A');
	exports.error = new Error('#ERROR!');
	exports.data = new Error('#GETTING_DATA');


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var mathTrig = __webpack_require__(2);
	var text = __webpack_require__(7);
	var jStat = __webpack_require__(9).jStat;
	var utils = __webpack_require__(4);
	var error = __webpack_require__(5);
	var misc = __webpack_require__(10);

	var SQRT2PI = 2.5066282746310002;

	exports.AVEDEV = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  return jStat.sum(jStat(range).subtract(jStat.mean(range)).abs()[0]) / range.length;
	};

	exports.AVERAGE = function() {
	  var range = utils.numbers(utils.flatten(arguments));
	  var n = range.length;
	  var sum = 0;
	  var count = 0;
	  for (var i = 0; i < n; i++) {
	    sum += range[i];
	    count += 1;
	  }
	  return sum / count;
	};

	exports.AVERAGEA = function() {
	  var range = utils.flatten(arguments);
	  var n = range.length;
	  var sum = 0;
	  var count = 0;
	  for (var i = 0; i < n; i++) {
	    var el = range[i];
	    if (typeof el === 'number') {
	      sum += el;
	    }
	    if (el === true) {
	      sum++;
	    }
	    if (el !== null) {
	      count++;
	    }
	  }
	  return sum / count;
	};

	exports.AVERAGEIF = function(range, criteria, average_range) {
	  average_range = average_range || range;
	  range = utils.flatten(range);
	  average_range = utils.parseNumberArray(utils.flatten(average_range));
	  if (average_range instanceof Error) {
	    return average_range;
	  }
	  var average_count = 0;
	  var result = 0;
	  for (var i = 0; i < range.length; i++) {
	    if (eval(range[i] + criteria)) { // jshint ignore:line
	      result += average_range[i];
	      average_count++;
	    }
	  }
	  return result / average_count;
	};

	exports.AVERAGEIFS = function() {
	  // Does not work with multi dimensional ranges yet!
	  //http://office.microsoft.com/en-001/excel-help/averageifs-function-HA010047493.aspx
	  var args = utils.argsToArray(arguments);
	  var criteria = (args.length - 1) / 2;
	  var range = utils.flatten(args[0]);
	  var count = 0;
	  var result = 0;
	  for (var i = 0; i < range.length; i++) {
	    var condition = '';
	    for (var j = 0; j < criteria; j++) {
	      condition += args[2 * j + 1][i] + args[2 * j + 2];
	      if (j !== criteria - 1) {
	        condition += '&&';
	      }
	    }
	    if (eval(condition)) { // jshint ignore:line
	      result += range[i];
	      count++;
	    }
	  }

	  var average = result / count;
	  if (isNaN(average)) {
	    return 0;
	  } else {
	    return average;
	  }
	};

	exports.BETA = {};

	exports.BETA.DIST = function(x, alpha, beta, cumulative, A, B) {
	  if (arguments.length < 4) {
	    return error.value;
	  }

	  A = (A === undefined) ? 0 : A;
	  B = (B === undefined) ? 1 : B;

	  x = utils.parseNumber(x);
	  alpha = utils.parseNumber(alpha);
	  beta = utils.parseNumber(beta);
	  A = utils.parseNumber(A);
	  B = utils.parseNumber(B);
	  if (utils.anyIsError(x, alpha, beta, A, B)) {
	    return error.value;
	  }

	  x = (x - A) / (B - A);
	  return (cumulative) ? jStat.beta.cdf(x, alpha, beta) : jStat.beta.pdf(x, alpha, beta);
	};

	exports.BETA.INV = function(probability, alpha, beta, A, B) {
	  A = (A === undefined) ? 0 : A;
	  B = (B === undefined) ? 1 : B;

	  probability = utils.parseNumber(probability);
	  alpha = utils.parseNumber(alpha);
	  beta = utils.parseNumber(beta);
	  A = utils.parseNumber(A);
	  B = utils.parseNumber(B);
	  if (utils.anyIsError(probability, alpha, beta, A, B)) {
	    return error.value;
	  }

	  return jStat.beta.inv(probability, alpha, beta) * (B - A) + A;
	};

	exports.BINOM = {};

	exports.BINOM.DIST = function(successes, trials, probability, cumulative) {
	  successes = utils.parseNumber(successes);
	  trials = utils.parseNumber(trials);
	  probability = utils.parseNumber(probability);
	  cumulative = utils.parseNumber(cumulative);
	  if (utils.anyIsError(successes, trials, probability, cumulative)) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.binomial.cdf(successes, trials, probability) : jStat.binomial.pdf(successes, trials, probability);
	};

	exports.BINOM.DIST.RANGE = function(trials, probability, successes, successes2) {
	  successes2 = (successes2 === undefined) ? successes : successes2;

	  trials = utils.parseNumber(trials);
	  probability = utils.parseNumber(probability);
	  successes = utils.parseNumber(successes);
	  successes2 = utils.parseNumber(successes2);
	  if (utils.anyIsError(trials, probability, successes, successes2)) {
	    return error.value;
	  }

	  var result = 0;
	  for (var i = successes; i <= successes2; i++) {
	    result += mathTrig.COMBIN(trials, i) * Math.pow(probability, i) * Math.pow(1 - probability, trials - i);
	  }
	  return result;
	};

	exports.BINOM.INV = function(trials, probability, alpha) {
	  trials = utils.parseNumber(trials);
	  probability = utils.parseNumber(probability);
	  alpha = utils.parseNumber(alpha);
	  if (utils.anyIsError(trials, probability, alpha)) {
	    return error.value;
	  }

	  var x = 0;
	  while (x <= trials) {
	    if (jStat.binomial.cdf(x, trials, probability) >= alpha) {
	      return x;
	    }
	    x++;
	  }
	};

	exports.CHISQ = {};

	exports.CHISQ.DIST = function(x, k, cumulative) {
	  x = utils.parseNumber(x);
	  k = utils.parseNumber(k);
	  if (utils.anyIsError(x, k)) {
	    return error.value;
	  }

	  return (cumulative) ? jStat.chisquare.cdf(x, k) : jStat.chisquare.pdf(x, k);
	};

	exports.CHISQ.DIST.RT = function(x, k) {
	  if (!x | !k) {
	    return error.na;
	  }

	  if (x < 1 || k > Math.pow(10, 10)) {
	    return error.num;
	  }

	  if ((typeof x !== 'number') || (typeof k !== 'number')) {
	    return error.value;
	  }

	  return 1 -  jStat.chisquare.cdf(x, k);
	};

	exports.CHISQ.INV = function(probability, k) {
	  probability = utils.parseNumber(probability);
	  k = utils.parseNumber(k);
	  if (utils.anyIsError(probability, k)) {
	    return error.value;
	  }
	  return jStat.chisquare.inv(probability, k);
	};

	exports.CHISQ.INV.RT = function(p, k) {
	  if (!p | !k) {
	    return error.na;
	  }

	  if (p < 0 || p > 1 || k < 1 || k > Math.pow(10, 10)) {
	    return error.num;
	  }

	  if ((typeof p !== 'number') || (typeof k !== 'number')) {
	    return error.value;
	  }

	  return jStat.chisquare.inv(1.0 - p, k);
	};

	exports.CHISQ.TEST = function(observed, expected) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  if ((!(observed instanceof Array)) || (!(expected instanceof Array))) {
	    return error.value;
	  }

	  if (observed.length !== expected.length) {
	    return error.value;
	  }

	  if (observed[0] && expected[0] &&
	      observed[0].length !== expected[0].length) {
	    return error.value;
	  }

	  var row = observed.length;
	  var tmp, i, j;

	  // Convert single-dimension array into two-dimension array
	  for (i = 0; i < row; i ++) {
	    if (!(observed[i] instanceof Array)) {
	      tmp = observed[i];
	      observed[i] = [];
	      observed[i].push(tmp);
	    }
	    if (!(expected[i] instanceof Array)) {
	      tmp = expected[i];
	      expected[i] = [];
	      expected[i].push(tmp);
	    }
	  }

	  var col = observed[0].length;
	  var dof = (col === 1) ? row-1 : (row-1)*(col-1);
	  var xsqr = 0;
	  var Pi =Math.PI;

	  for (i = 0; i < row; i ++) {
	    for (j = 0; j < col; j ++) {
	      xsqr += Math.pow((observed[i][j] - expected[i][j]), 2) / expected[i][j];
	    }
	  }

	  // Get independency by X square and its degree of freedom
	  function ChiSq(xsqr, dof) {
	    var p = Math.exp(-0.5 * xsqr);
	    if((dof%2) === 1) {
	      p = p * Math.sqrt(2 * xsqr/Pi);
	    }
	    var k = dof;
	    while(k >= 2) {
	      p = p * xsqr/k;
	      k = k - 2;
	    }
	    var t = p;
	    var a = dof;
	    while (t > 0.0000000001*p) {
	      a = a + 2;
	      t = t * xsqr/a;
	      p = p + t;
	    }
	    return 1-p;
	  }

	  return Math.round(ChiSq(xsqr, dof) * 1000000) / 1000000;
	};

	exports.COLUMN = function(matrix, index) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  if (index < 0) {
	    return error.num;
	  }

	  if (!(matrix instanceof Array) || (typeof index !== 'number')) {
	    return error.value;
	  }

	  if (matrix.length === 0) {
	    return undefined;
	  }

	  return jStat.col(matrix, index);
	};

	exports.COLUMNS = function(matrix) {
	  if (arguments.length !== 1) {
	    return error.na;
	  }

	  if (!(matrix instanceof Array)) {
	    return error.value;
	  }

	  if (matrix.length === 0) {
	    return 0;
	  }

	  return jStat.cols(matrix);
	};

	exports.CONFIDENCE = {};

	exports.CONFIDENCE.NORM = function(alpha, sd, n) {
	  alpha = utils.parseNumber(alpha);
	  sd = utils.parseNumber(sd);
	  n = utils.parseNumber(n);
	  if (utils.anyIsError(alpha, sd, n)) {
	    return error.value;
	  }
	  return jStat.normalci(1, alpha, sd, n)[1] - 1;
	};

	exports.CONFIDENCE.T = function(alpha, sd, n) {
	  alpha = utils.parseNumber(alpha);
	  sd = utils.parseNumber(sd);
	  n = utils.parseNumber(n);
	  if (utils.anyIsError(alpha, sd, n)) {
	    return error.value;
	  }
	  return jStat.tci(1, alpha, sd, n)[1] - 1;
	};

	exports.CORREL = function(array1, array2) {
	  array1 = utils.parseNumberArray(utils.flatten(array1));
	  array2 = utils.parseNumberArray(utils.flatten(array2));
	  if (utils.anyIsError(array1, array2)) {
	    return error.value;
	  }
	  return jStat.corrcoeff(array1, array2);
	};

	exports.COUNT = function() {
	  return utils.numbers(utils.flatten(arguments)).length;
	};

	exports.COUNTA = function() {
	  var range = utils.flatten(arguments);
	  return range.length - exports.COUNTBLANK(range);
	};

	exports.COUNTIN = function (range, value) {
	  var result = 0;
	  for (var i = 0; i < range.length; i++) {
	    if (range[i] === value) {
	      result++;
	    }
	  }
	  return result;
	};


	exports.COUNTBLANK = function() {
	  var range = utils.flatten(arguments);
	  var blanks = 0;
	  var element;
	  for (var i = 0; i < range.length; i++) {
	    element = range[i];
	    if (element === null || element === '') {
	      blanks++;
	    }
	  }
	  return blanks;
	};

	exports.COUNTIF = function(range, criteria) {
	  range = utils.flatten(range);
	  if (!/[<>=!]/.test(criteria)) {
	    criteria = '=="' + criteria + '"';
	  }
	  var matches = 0;
	  for (var i = 0; i < range.length; i++) {
	    if (typeof range[i] !== 'string') {
	      if (eval(range[i] + criteria)) { // jshint ignore:line
	        matches++;
	      }
	    } else {
	      if (eval('"' + range[i] + '"' + criteria)) { // jshint ignore:line
	        matches++;
	      }
	    }
	  }
	  return matches;
	};

	exports.COUNTIFS = function() {
	  var args = utils.argsToArray(arguments);
	  var results = new Array(utils.flatten(args[0]).length);
	  for (var i = 0; i < results.length; i++) {
	    results[i] = true;
	  }
	  for (i = 0; i < args.length; i += 2) {
	    var range = utils.flatten(args[i]);
	    var criteria = args[i + 1];
	    if (!/[<>=!]/.test(criteria)) {
	      criteria = '=="' + criteria + '"';
	    }
	    for (var j = 0; j < range.length; j++) {
	      if (typeof range[j] !== 'string') {
	        results[j] = results[j] && eval(range[j] + criteria); // jshint ignore:line
	      } else {
	        results[j] = results[j] && eval('"' + range[j] + '"' + criteria); // jshint ignore:line
	      }
	    }
	  }
	  var result = 0;
	  for (i = 0; i < results.length; i++) {
	    if (results[i]) {
	      result++;
	    }
	  }
	  return result;
	};

	exports.COUNTUNIQUE = function () {
	  return misc.UNIQUE.apply(null, utils.flatten(arguments)).length;
	};

	exports.COVARIANCE = {};

	exports.COVARIANCE.P = function(array1, array2) {
	  array1 = utils.parseNumberArray(utils.flatten(array1));
	  array2 = utils.parseNumberArray(utils.flatten(array2));
	  if (utils.anyIsError(array1, array2)) {
	    return error.value;
	  }
	  var mean1 = jStat.mean(array1);
	  var mean2 = jStat.mean(array2);
	  var result = 0;
	  var n = array1.length;
	  for (var i = 0; i < n; i++) {
	    result += (array1[i] - mean1) * (array2[i] - mean2);
	  }
	  return result / n;
	};

	exports.COVARIANCE.S = function(array1, array2) {
	  array1 = utils.parseNumberArray(utils.flatten(array1));
	  array2 = utils.parseNumberArray(utils.flatten(array2));
	  if (utils.anyIsError(array1, array2)) {
	    return error.value;
	  }
	  return jStat.covariance(array1, array2);
	};

	exports.DEVSQ = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var mean = jStat.mean(range);
	  var result = 0;
	  for (var i = 0; i < range.length; i++) {
	    result += Math.pow((range[i] - mean), 2);
	  }
	  return result;
	};

	exports.EXPON = {};

	exports.EXPON.DIST = function(x, lambda, cumulative) {
	  x = utils.parseNumber(x);
	  lambda = utils.parseNumber(lambda);
	  if (utils.anyIsError(x, lambda)) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.exponential.cdf(x, lambda) : jStat.exponential.pdf(x, lambda);
	};

	exports.F = {};

	exports.F.DIST = function(x, d1, d2, cumulative) {
	  x = utils.parseNumber(x);
	  d1 = utils.parseNumber(d1);
	  d2 = utils.parseNumber(d2);
	  if (utils.anyIsError(x, d1, d2)) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.centralF.cdf(x, d1, d2) : jStat.centralF.pdf(x, d1, d2);
	};

	exports.F.DIST.RT = function(x, d1, d2) {
	  if (arguments.length !== 3) {
	    return error.na;
	  }

	  if (x < 0 || d1 < 1 || d2 < 1) {
	    return error.num;
	  }

	  if ((typeof x !== 'number') || (typeof d1 !== 'number') || (typeof d2 !== 'number')) {
	    return error.value;
	  }

	  return 1 - jStat.centralF.cdf(x, d1, d2);
	};

	exports.F.INV = function(probability, d1, d2) {
	  probability = utils.parseNumber(probability);
	  d1 = utils.parseNumber(d1);
	  d2 = utils.parseNumber(d2);
	  if (utils.anyIsError(probability, d1, d2)) {
	    return error.value;
	  }
	  if (probability <= 0.0 || probability > 1.0) {
	    return error.num;
	  }

	  return jStat.centralF.inv(probability, d1, d2);
	};

	exports.F.INV.RT = function(p, d1, d2) {
	  if (arguments.length !== 3) {
	    return error.na;
	  }

	  if (p < 0 || p > 1 || d1 < 1 || d1 > Math.pow(10, 10) || d2 < 1 || d2 > Math.pow(10, 10)) {
	    return error.num;
	  }

	  if ((typeof p !== 'number') || (typeof d1 !== 'number') || (typeof d2 !== 'number')) {
	    return error.value;
	  }

	  return jStat.centralF.inv(1.0 - p, d1, d2);
	};

	exports.F.TEST = function(array1, array2) {
	  if (!array1 || !array2) {
	    return error.na;
	  }

	  if (!(array1 instanceof Array) || !(array2 instanceof Array)) {
	    return error.na;
	  }

	  if (array1.length < 2 || array2.length < 2) {
	    return error.div0;
	  }

	  var sumOfSquares = function(values, x1) {
	    var sum = 0;
	    for (var i = 0; i < values.length; i++) {
	      sum +=Math.pow((values[i] - x1), 2);
	    }
	    return sum;
	  };

	  var x1 = mathTrig.SUM(array1) / array1.length;
	  var x2 = mathTrig.SUM(array2) / array2.length;
	  var sum1 = sumOfSquares(array1, x1) / (array1.length - 1);
	  var sum2 = sumOfSquares(array2, x2) / (array2.length - 1);

	  return sum1 / sum2;
	};

	exports.FISHER = function(x) {
	  x = utils.parseNumber(x);
	  if (x instanceof Error) {
	    return x;
	  }
	  return Math.log((1 + x) / (1 - x)) / 2;
	};

	exports.FISHERINV = function(y) {
	  y = utils.parseNumber(y);
	  if (y instanceof Error) {
	    return y;
	  }
	  var e2y = Math.exp(2 * y);
	  return (e2y - 1) / (e2y + 1);
	};

	exports.FORECAST = function(x, data_y, data_x) {
	  x = utils.parseNumber(x);
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  if (utils.anyIsError(x, data_y, data_x)) {
	    return error.value;
	  }
	  var xmean = jStat.mean(data_x);
	  var ymean = jStat.mean(data_y);
	  var n = data_x.length;
	  var num = 0;
	  var den = 0;
	  for (var i = 0; i < n; i++) {
	    num += (data_x[i] - xmean) * (data_y[i] - ymean);
	    den += Math.pow(data_x[i] - xmean, 2);
	  }
	  var b = num / den;
	  var a = ymean - b * xmean;
	  return a + b * x;
	};

	exports.FREQUENCY = function(data, bins) {
	  data = utils.parseNumberArray(utils.flatten(data));
	  bins = utils.parseNumberArray(utils.flatten(bins));
	  if (utils.anyIsError(data, bins)) {
	    return error.value;
	  }
	  var n = data.length;
	  var b = bins.length;
	  var r = [];
	  for (var i = 0; i <= b; i++) {
	    r[i] = 0;
	    for (var j = 0; j < n; j++) {
	      if (i === 0) {
	        if (data[j] <= bins[0]) {
	          r[0] += 1;
	        }
	      } else if (i < b) {
	        if (data[j] > bins[i - 1] && data[j] <= bins[i]) {
	          r[i] += 1;
	        }
	      } else if (i === b) {
	        if (data[j] > bins[b - 1]) {
	          r[b] += 1;
	        }
	      }
	    }
	  }
	  return r;
	};


	exports.GAMMA = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }

	  if (number === 0) {
	    return error.num;
	  }

	  if (parseInt(number, 10) === number && number < 0) {
	    return error.num;
	  }

	  return jStat.gammafn(number);
	};

	exports.GAMMA.DIST = function(value, alpha, beta, cumulative) {
	  if (arguments.length !== 4) {
	    return error.na;
	  }

	  if (value < 0 || alpha <= 0 || beta <= 0) {
	    return error.value;
	  }

	  if ((typeof value !== 'number') || (typeof alpha !== 'number') || (typeof beta !== 'number')) {
	    return error.value;
	  }

	  return cumulative ? jStat.gamma.cdf(value, alpha, beta, true) : jStat.gamma.pdf(value, alpha, beta, false);
	};

	exports.GAMMA.INV = function(probability, alpha, beta) {
	  if (arguments.length !== 3) {
	    return error.na;
	  }

	  if (probability < 0 || probability > 1 || alpha <= 0 || beta <= 0) {
	    return error.num;
	  }

	  if ((typeof probability !== 'number') || (typeof alpha !== 'number') || (typeof beta !== 'number')) {
	    return error.value;
	  }

	  return jStat.gamma.inv(probability, alpha, beta);
	};

	exports.GAMMALN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return jStat.gammaln(number);
	};

	exports.GAMMALN.PRECISE = function(x) {
	  if (arguments.length !== 1) {
	    return error.na;
	  }

	  if (x <= 0) {
	    return error.num;
	  }

	  if (typeof x !== 'number') {
	    return error.value;
	  }

	  return jStat.gammaln(x);
	};

	exports.GAUSS = function(z) {
	  z = utils.parseNumber(z);
	  if (z instanceof Error) {
	    return z;
	  }
	  return jStat.normal.cdf(z, 0, 1) - 0.5;
	};

	exports.GEOMEAN = function() {
	  var args = utils.parseNumberArray(utils.flatten(arguments));
	  if (args instanceof Error) {
	    return args;
	  }
	  return jStat.geomean(args);
	};

	exports.GROWTH = function(known_y, known_x, new_x, use_const) {
	  // Credits: Ilmari Karonen (http://stackoverflow.com/questions/14161990/how-to-implement-growth-function-in-javascript)

	  known_y = utils.parseNumberArray(known_y);
	  if (known_y instanceof Error) {
	    return known_y;
	  }

	  // Default values for optional parameters:
	  var i;
	  if (known_x === undefined) {
	    known_x = [];
	    for (i = 1; i <= known_y.length; i++) {
	      known_x.push(i);
	    }
	  }
	  if (new_x === undefined) {
	    new_x = [];
	    for (i = 1; i <= known_y.length; i++) {
	      new_x.push(i);
	    }
	  }

	  known_x = utils.parseNumberArray(known_x);
	  new_x = utils.parseNumberArray(new_x);
	  if (utils.anyIsError(known_x, new_x)) {
	    return error.value;
	  }


	  if (use_const === undefined) {
	    use_const = true;
	  }

	  // Calculate sums over the data:
	  var n = known_y.length;
	  var avg_x = 0;
	  var avg_y = 0;
	  var avg_xy = 0;
	  var avg_xx = 0;
	  for (i = 0; i < n; i++) {
	    var x = known_x[i];
	    var y = Math.log(known_y[i]);
	    avg_x += x;
	    avg_y += y;
	    avg_xy += x * y;
	    avg_xx += x * x;
	  }
	  avg_x /= n;
	  avg_y /= n;
	  avg_xy /= n;
	  avg_xx /= n;

	  // Compute linear regression coefficients:
	  var beta;
	  var alpha;
	  if (use_const) {
	    beta = (avg_xy - avg_x * avg_y) / (avg_xx - avg_x * avg_x);
	    alpha = avg_y - beta * avg_x;
	  } else {
	    beta = avg_xy / avg_xx;
	    alpha = 0;
	  }

	  // Compute and return result array:
	  var new_y = [];
	  for (i = 0; i < new_x.length; i++) {
	    new_y.push(Math.exp(alpha + beta * new_x[i]));
	  }
	  return new_y;
	};

	exports.HARMEAN = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var n = range.length;
	  var den = 0;
	  for (var i = 0; i < n; i++) {
	    den += 1 / range[i];
	  }
	  return n / den;
	};

	exports.HYPGEOM = {};

	exports.HYPGEOM.DIST = function(x, n, M, N, cumulative) {
	  x = utils.parseNumber(x);
	  n = utils.parseNumber(n);
	  M = utils.parseNumber(M);
	  N = utils.parseNumber(N);
	  if (utils.anyIsError(x, n, M, N)) {
	    return error.value;
	  }

	  function pdf(x, n, M, N) {
	    return mathTrig.COMBIN(M, x) * mathTrig.COMBIN(N - M, n - x) / mathTrig.COMBIN(N, n);
	  }

	  function cdf(x, n, M, N) {
	    var result = 0;
	    for (var i = 0; i <= x; i++) {
	      result += pdf(i, n, M, N);
	    }
	    return result;
	  }

	  return (cumulative) ? cdf(x, n, M, N) : pdf(x, n, M, N);
	};

	exports.INTERCEPT = function(known_y, known_x) {
	  known_y = utils.parseNumberArray(known_y);
	  known_x = utils.parseNumberArray(known_x);
	  if (utils.anyIsError(known_y, known_x)) {
	    return error.value;
	  }
	  if (known_y.length !== known_x.length) {
	    return error.na;
	  }
	  return exports.FORECAST(0, known_y, known_x);
	};

	exports.KURT = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var mean = jStat.mean(range);
	  var n = range.length;
	  var sigma = 0;
	  for (var i = 0; i < n; i++) {
	    sigma += Math.pow(range[i] - mean, 4);
	  }
	  sigma = sigma / Math.pow(jStat.stdev(range, true), 4);
	  return ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * sigma - 3 * (n - 1) * (n - 1) / ((n - 2) * (n - 3));
	};

	exports.LARGE = function(range, k) {
	  range = utils.parseNumberArray(utils.flatten(range));
	  k = utils.parseNumber(k);
	  if (utils.anyIsError(range, k)) {
	    return range;
	  }
	  return range.sort(function(a, b) {
	    return b - a;
	  })[k - 1];
	};

	exports.LINEST = function(data_y, data_x) {
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  if (utils.anyIsError(data_y, data_x)) {
	    return error.value;
	  }
	  var ymean = jStat.mean(data_y);
	  var xmean = jStat.mean(data_x);
	  var n = data_x.length;
	  var num = 0;
	  var den = 0;
	  for (var i = 0; i < n; i++) {
	    num += (data_x[i] - xmean) * (data_y[i] - ymean);
	    den += Math.pow(data_x[i] - xmean, 2);
	  }
	  var m = num / den;
	  var b = ymean - m * xmean;
	  return [m, b];
	};

	// According to Microsoft:
	// http://office.microsoft.com/en-us/starter-help/logest-function-HP010342665.aspx
	// LOGEST returns are based on the following linear model:
	// ln y = x1 ln m1 + ... + xn ln mn + ln b
	exports.LOGEST = function(data_y, data_x) {
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  if (utils.anyIsError(data_y, data_x)) {
	    return error.value;
	  }
	  for (var i = 0; i < data_y.length; i ++) {
	    data_y[i] = Math.log(data_y[i]);
	  }

	  var result = exports.LINEST(data_y, data_x);
	  result[0] = Math.round(Math.exp(result[0])*1000000)/1000000;
	  result[1] = Math.round(Math.exp(result[1])*1000000)/1000000;
	  return result;
	};

	exports.LOGNORM = {};

	exports.LOGNORM.DIST = function(x, mean, sd, cumulative) {
	  x = utils.parseNumber(x);
	  mean = utils.parseNumber(mean);
	  sd = utils.parseNumber(sd);
	  if (utils.anyIsError(x, mean, sd)) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.lognormal.cdf(x, mean, sd) : jStat.lognormal.pdf(x, mean, sd);
	};

	exports.LOGNORM.INV = function(probability, mean, sd) {
	  probability = utils.parseNumber(probability);
	  mean = utils.parseNumber(mean);
	  sd = utils.parseNumber(sd);
	  if (utils.anyIsError(probability, mean, sd)) {
	    return error.value;
	  }
	  return jStat.lognormal.inv(probability, mean, sd);
	};

	exports.MAX = function() {
	  var range = utils.numbers(utils.flatten(arguments));
	  return (range.length === 0) ? 0 : Math.max.apply(Math, range);
	};

	exports.MAXA = function() {
	  var range = utils.arrayValuesToNumbers(utils.flatten(arguments));
	  return (range.length === 0) ? 0 : Math.max.apply(Math, range);
	};

	exports.MEDIAN = function() {
	  var range = utils.arrayValuesToNumbers(utils.flatten(arguments));
	  return jStat.median(range);
	};

	exports.MIN = function() {
	  var range = utils.numbers(utils.flatten(arguments));
	  return (range.length === 0) ? 0 : Math.min.apply(Math, range);
	};

	exports.MINA = function() {
	  var range = utils.arrayValuesToNumbers(utils.flatten(arguments));
	  return (range.length === 0) ? 0 : Math.min.apply(Math, range);
	};

	exports.MODE = {};

	exports.MODE.MULT = function() {
	  // Credits: Roönaän
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var n = range.length;
	  var count = {};
	  var maxItems = [];
	  var max = 0;
	  var currentItem;

	  for (var i = 0; i < n; i++) {
	    currentItem = range[i];
	    count[currentItem] = count[currentItem] ? count[currentItem] + 1 : 1;
	    if (count[currentItem] > max) {
	      max = count[currentItem];
	      maxItems = [];
	    }
	    if (count[currentItem] === max) {
	      maxItems[maxItems.length] = currentItem;
	    }
	  }
	  return maxItems;
	};

	exports.MODE.SNGL = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  return exports.MODE.MULT(range).sort(function(a, b) {
	    return a - b;
	  })[0];
	};

	exports.NEGBINOM = {};

	exports.NEGBINOM.DIST = function(k, r, p, cumulative) {
	  k = utils.parseNumber(k);
	  r = utils.parseNumber(r);
	  p = utils.parseNumber(p);
	  if (utils.anyIsError(k, r, p)) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.negbin.cdf(k, r, p) : jStat.negbin.pdf(k, r, p);
	};

	exports.NORM = {};

	exports.NORM.DIST = function(x, mean, sd, cumulative) {
	  x = utils.parseNumber(x);
	  mean = utils.parseNumber(mean);
	  sd = utils.parseNumber(sd);
	  if (utils.anyIsError(x, mean, sd)) {
	    return error.value;
	  }
	  if (sd <= 0) {
	    return error.num;
	  }

	  // Return normal distribution computed by jStat [http://jstat.org]
	  return (cumulative) ? jStat.normal.cdf(x, mean, sd) : jStat.normal.pdf(x, mean, sd);
	};

	exports.NORM.INV = function(probability, mean, sd) {
	  probability = utils.parseNumber(probability);
	  mean = utils.parseNumber(mean);
	  sd = utils.parseNumber(sd);
	  if (utils.anyIsError(probability, mean, sd)) {
	    return error.value;
	  }
	  return jStat.normal.inv(probability, mean, sd);
	};

	exports.NORM.S = {};

	exports.NORM.S.DIST = function(z, cumulative) {
	  z = utils.parseNumber(z);
	  if (z instanceof Error) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.normal.cdf(z, 0, 1) : jStat.normal.pdf(z, 0, 1);
	};

	exports.NORM.S.INV = function(probability) {
	  probability = utils.parseNumber(probability);
	  if (probability instanceof Error) {
	    return error.value;
	  }
	  return jStat.normal.inv(probability, 0, 1);
	};

	exports.PEARSON = function(data_x, data_y) {
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  if (utils.anyIsError(data_y, data_x)) {
	    return error.value;
	  }
	  var xmean = jStat.mean(data_x);
	  var ymean = jStat.mean(data_y);
	  var n = data_x.length;
	  var num = 0;
	  var den1 = 0;
	  var den2 = 0;
	  for (var i = 0; i < n; i++) {
	    num += (data_x[i] - xmean) * (data_y[i] - ymean);
	    den1 += Math.pow(data_x[i] - xmean, 2);
	    den2 += Math.pow(data_y[i] - ymean, 2);
	  }
	  return num / Math.sqrt(den1 * den2);
	};

	exports.PERCENTILE = {};

	exports.PERCENTILE.EXC = function(array, k) {
	  array = utils.parseNumberArray(utils.flatten(array));
	  k = utils.parseNumber(k);
	  if (utils.anyIsError(array, k)) {
	    return error.value;
	  }
	  array = array.sort(function(a, b) {
	    {
	      return a - b;
	    }
	  });
	  var n = array.length;
	  if (k < 1 / (n + 1) || k > 1 - 1 / (n + 1)) {
	    return error.num;
	  }
	  var l = k * (n + 1) - 1;
	  var fl = Math.floor(l);
	  return utils.cleanFloat((l === fl) ? array[l] : array[fl] + (l - fl) * (array[fl + 1] - array[fl]));
	};

	exports.PERCENTILE.INC = function(array, k) {
	  array = utils.parseNumberArray(utils.flatten(array));
	  k = utils.parseNumber(k);
	  if (utils.anyIsError(array, k)) {
	    return error.value;
	  }
	  array = array.sort(function(a, b) {
	    return a - b;
	  });
	  var n = array.length;
	  var l = k * (n - 1);
	  var fl = Math.floor(l);
	  return utils.cleanFloat((l === fl) ? array[l] : array[fl] + (l - fl) * (array[fl + 1] - array[fl]));
	};

	exports.PERCENTRANK = {};

	exports.PERCENTRANK.EXC = function(array, x, significance) {
	  significance = (significance === undefined) ? 3 : significance;
	  array = utils.parseNumberArray(utils.flatten(array));
	  x = utils.parseNumber(x);
	  significance = utils.parseNumber(significance);
	  if (utils.anyIsError(array, x, significance)) {
	    return error.value;
	  }
	  array = array.sort(function(a, b) {
	    return a - b;
	  });
	  var uniques = misc.UNIQUE.apply(null, array);
	  var n = array.length;
	  var m = uniques.length;
	  var power = Math.pow(10, significance);
	  var result = 0;
	  var match = false;
	  var i = 0;
	  while (!match && i < m) {
	    if (x === uniques[i]) {
	      result = (array.indexOf(uniques[i]) + 1) / (n + 1);
	      match = true;
	    } else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
	      result = (array.indexOf(uniques[i]) + 1 + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n + 1);
	      match = true;
	    }
	    i++;
	  }
	  return Math.floor(result * power) / power;
	};

	exports.PERCENTRANK.INC = function(array, x, significance) {
	  significance = (significance === undefined) ? 3 : significance;
	  array = utils.parseNumberArray(utils.flatten(array));
	  x = utils.parseNumber(x);
	  significance = utils.parseNumber(significance);
	  if (utils.anyIsError(array, x, significance)) {
	    return error.value;
	  }
	  array = array.sort(function(a, b) {
	    return a - b;
	  });
	  var uniques = misc.UNIQUE.apply(null, array);
	  var n = array.length;
	  var m = uniques.length;
	  var power = Math.pow(10, significance);
	  var result = 0;
	  var match = false;
	  var i = 0;
	  while (!match && i < m) {
	    if (x === uniques[i]) {
	      result = array.indexOf(uniques[i]) / (n - 1);
	      match = true;
	    } else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
	      result = (array.indexOf(uniques[i]) + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n - 1);
	      match = true;
	    }
	    i++;
	  }
	  return Math.floor(result * power) / power;
	};

	exports.PERMUT = function(number, number_chosen) {
	  number = utils.parseNumber(number);
	  number_chosen = utils.parseNumber(number_chosen);
	  if (utils.anyIsError(number, number_chosen)) {
	    return error.value;
	  }
	  return mathTrig.FACT(number) / mathTrig.FACT(number - number_chosen);
	};

	exports.PERMUTATIONA = function(number, number_chosen) {
	  number = utils.parseNumber(number);
	  number_chosen = utils.parseNumber(number_chosen);
	  if (utils.anyIsError(number, number_chosen)) {
	    return error.value;
	  }
	  return Math.pow(number, number_chosen);
	};

	exports.PHI = function(x) {
	  x = utils.parseNumber(x);
	  if (x instanceof Error) {
	    return error.value;
	  }
	  return Math.exp(-0.5 * x * x) / SQRT2PI;
	};

	exports.POISSON = {};

	exports.POISSON.DIST = function(x, mean, cumulative) {
	  x = utils.parseNumber(x);
	  mean = utils.parseNumber(mean);
	  if (utils.anyIsError(x, mean)) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.poisson.cdf(x, mean) : jStat.poisson.pdf(x, mean);
	};

	exports.PROB = function(range, probability, lower, upper) {
	  if (lower === undefined) {
	    return 0;
	  }
	  upper = (upper === undefined) ? lower : upper;

	  range = utils.parseNumberArray(utils.flatten(range));
	  probability = utils.parseNumberArray(utils.flatten(probability));
	  lower = utils.parseNumber(lower);
	  upper = utils.parseNumber(upper);
	  if (utils.anyIsError(range, probability, lower, upper)) {
	    return error.value;
	  }

	  if (lower === upper) {
	    return (range.indexOf(lower) >= 0) ? probability[range.indexOf(lower)] : 0;
	  }

	  var sorted = range.sort(function(a, b) {
	    return a - b;
	  });
	  var n = sorted.length;
	  var result = 0;
	  for (var i = 0; i < n; i++) {
	    if (sorted[i] >= lower && sorted[i] <= upper) {
	      result += probability[range.indexOf(sorted[i])];
	    }
	  }
	  return result;
	};

	exports.QUARTILE = {};

	exports.QUARTILE.EXC = function(range, quart) {
	  range = utils.parseNumberArray(utils.flatten(range));
	  quart = utils.parseNumber(quart);
	  if (utils.anyIsError(range, quart)) {
	    return error.value;
	  }
	  switch (quart) {
	    case 1:
	      return exports.PERCENTILE.EXC(range, 0.25);
	    case 2:
	      return exports.PERCENTILE.EXC(range, 0.5);
	    case 3:
	      return exports.PERCENTILE.EXC(range, 0.75);
	    default:
	      return error.num;
	  }
	};

	exports.QUARTILE.INC = function(range, quart) {
	  range = utils.parseNumberArray(utils.flatten(range));
	  quart = utils.parseNumber(quart);
	  if (utils.anyIsError(range, quart)) {
	    return error.value;
	  }
	  switch (quart) {
	    case 1:
	      return exports.PERCENTILE.INC(range, 0.25);
	    case 2:
	      return exports.PERCENTILE.INC(range, 0.5);
	    case 3:
	      return exports.PERCENTILE.INC(range, 0.75);
	    default:
	      return error.num;
	  }
	};

	exports.RANK = {};

	exports.RANK.AVG = function(number, range, order) {
	  number = utils.parseNumber(number);
	  range = utils.parseNumberArray(utils.flatten(range));
	  if (utils.anyIsError(number, range)) {
	    return error.value;
	  }
	  range = utils.flatten(range);
	  order = order || false;
	  var sort = (order) ? function(a, b) {
	    return a - b;
	  } : function(a, b) {
	    return b - a;
	  };
	  range = range.sort(sort);

	  var length = range.length;
	  var count = 0;
	  for (var i = 0; i < length; i++) {
	    if (range[i] === number) {
	      count++;
	    }
	  }

	  return (count > 1) ? (2 * range.indexOf(number) + count + 1) / 2 : range.indexOf(number) + 1;
	};

	exports.RANK.EQ = function(number, range, order) {
	  number = utils.parseNumber(number);
	  range = utils.parseNumberArray(utils.flatten(range));
	  if (utils.anyIsError(number, range)) {
	    return error.value;
	  }
	  order = order || false;
	  var sort = (order) ? function(a, b) {
	    return a - b;
	  } : function(a, b) {
	    return b - a;
	  };
	  range = range.sort(sort);
	  return range.indexOf(number) + 1;
	};

	exports.ROW = function(matrix, index) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  if (index < 0) {
	    return error.num;
	  }

	  if (!(matrix instanceof Array) || (typeof index !== 'number')) {
	    return error.value;
	  }

	  if (matrix.length === 0) {
	    return undefined;
	  }

	  return jStat.row(matrix, index);
	};

	exports.ROWS = function(matrix) {
	  if (arguments.length !== 1) {
	    return error.na;
	  }

	  if (!(matrix instanceof Array)) {
	    return error.value;
	  }

	  if (matrix.length === 0) {
	    return 0;
	  }

	  return jStat.rows(matrix);
	};

	exports.RSQ = function(data_x, data_y) { // no need to flatten here, PEARSON will take care of that
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  if (utils.anyIsError(data_x, data_y)) {
	    return error.value;
	  }
	  return Math.pow(exports.PEARSON(data_x, data_y), 2);
	};

	exports.SKEW = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var mean = jStat.mean(range);
	  var n = range.length;
	  var sigma = 0;
	  for (var i = 0; i < n; i++) {
	    sigma += Math.pow(range[i] - mean, 3);
	  }
	  return n * sigma / ((n - 1) * (n - 2) * Math.pow(jStat.stdev(range, true), 3));
	};

	exports.SKEW.P = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var mean = jStat.mean(range);
	  var n = range.length;
	  var m2 = 0;
	  var m3 = 0;
	  for (var i = 0; i < n; i++) {
	    m3 += Math.pow(range[i] - mean, 3);
	    m2 += Math.pow(range[i] - mean, 2);
	  }
	  m3 = m3 / n;
	  m2 = m2 / n;
	  return m3 / Math.pow(m2, 3 / 2);
	};

	exports.SLOPE = function(data_y, data_x) {
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  if (utils.anyIsError(data_y, data_x)) {
	    return error.value;
	  }
	  var xmean = jStat.mean(data_x);
	  var ymean = jStat.mean(data_y);
	  var n = data_x.length;
	  var num = 0;
	  var den = 0;
	  for (var i = 0; i < n; i++) {
	    num += (data_x[i] - xmean) * (data_y[i] - ymean);
	    den += Math.pow(data_x[i] - xmean, 2);
	  }
	  return num / den;
	};

	exports.SMALL = function(range, k) {
	  range = utils.parseNumberArray(utils.flatten(range));
	  k = utils.parseNumber(k);
	  if (utils.anyIsError(range, k)) {
	    return range;
	  }
	  return range.sort(function(a, b) {
	    return a - b;
	  })[k - 1];
	};

	exports.STANDARDIZE = function(x, mean, sd) {
	  x = utils.parseNumber(x);
	  mean = utils.parseNumber(mean);
	  sd = utils.parseNumber(sd);
	  if (utils.anyIsError(x, mean, sd)) {
	    return error.value;
	  }
	  return (x - mean) / sd;
	};

	exports.STDEV = {};

	exports.STDEV.P = function() {
	  var v = exports.VAR.P.apply(this, arguments);
	  return Math.sqrt(v);
	};

	exports.STDEV.S = function() {
	  var v = exports.VAR.S.apply(this, arguments);
	  return Math.sqrt(v);
	};

	exports.STDEVA = function() {
	  var v = exports.VARA.apply(this, arguments);
	  return Math.sqrt(v);
	};

	exports.STDEVPA = function() {
	  var v = exports.VARPA.apply(this, arguments);
	  return Math.sqrt(v);
	};


	exports.STEYX = function(data_y, data_x) {
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  if (utils.anyIsError(data_y, data_x)) {
	    return error.value;
	  }
	  var xmean = jStat.mean(data_x);
	  var ymean = jStat.mean(data_y);
	  var n = data_x.length;
	  var lft = 0;
	  var num = 0;
	  var den = 0;
	  for (var i = 0; i < n; i++) {
	    lft += Math.pow(data_y[i] - ymean, 2);
	    num += (data_x[i] - xmean) * (data_y[i] - ymean);
	    den += Math.pow(data_x[i] - xmean, 2);
	  }
	  return Math.sqrt((lft - num * num / den) / (n - 2));
	};

	exports.TRANSPOSE = function(matrix) {
	  if (!matrix) {
	    return error.na;
	  }
	  return jStat.transpose(matrix);
	};

	exports.T = text.T;

	exports.T.DIST = function(x, df, cumulative) {
	  x = utils.parseNumber(x);
	  df = utils.parseNumber(df);
	  if (utils.anyIsError(x, df)) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.studentt.cdf(x, df) : jStat.studentt.pdf(x, df);
	};

	exports.T.DIST['2T'] = function(x, df) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  if (x < 0 || df < 1) {
	    return error.num;
	  }

	  if ((typeof x !== 'number') || (typeof df !== 'number')) {
	    return error.value;
	  }

	  return (1 - jStat.studentt.cdf(x , df)) * 2;
	};

	exports.T.DIST.RT = function(x, df) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  if (x < 0 || df < 1) {
	    return error.num;
	  }

	  if ((typeof x !== 'number') || (typeof df !== 'number')) {
	    return error.value;
	  }

	  return 1 - jStat.studentt.cdf(x , df);
	};

	exports.T.INV = function(probability, df) {
	  probability = utils.parseNumber(probability);
	  df = utils.parseNumber(df);
	  if (utils.anyIsError(probability, df)) {
	    return error.value;
	  }
	  return jStat.studentt.inv(probability, df);
	};

	exports.T.INV['2T'] = function(probability, df) {
	  probability = utils.parseNumber(probability);
	  df = utils.parseNumber(df);
	  if (probability <= 0 || probability > 1 || df < 1) {
	    return error.num;
	  }
	  if (utils.anyIsError(probability, df)) {
	    return error.value;
	  }
	  return Math.abs(jStat.studentt.inv(probability/2, df));
	};

	// The algorithm can be found here:
	// http://www.chem.uoa.gr/applets/AppletTtest/Appl_Ttest2.html
	exports.T.TEST = function(data_x, data_y) {
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  if (utils.anyIsError(data_x, data_y)) {
	    return error.value;
	  }

	  var mean_x = jStat.mean(data_x);
	  var mean_y = jStat.mean(data_y);
	  var s_x = 0;
	  var s_y = 0;
	  var i;

	  for (i = 0; i < data_x.length; i++) {
	    s_x += Math.pow(data_x[i] - mean_x, 2);
	  }
	  for (i = 0; i < data_y.length; i++) {
	    s_y += Math.pow(data_y[i] - mean_y, 2);
	  }

	  s_x = s_x / (data_x.length-1);
	  s_y = s_y / (data_y.length-1);

	  var t = Math.abs(mean_x - mean_y) / Math.sqrt(s_x/data_x.length + s_y/data_y.length);

	  return exports.T.DIST['2T'](t, data_x.length+data_y.length-2);
	};

	exports.TREND = function(data_y, data_x, new_data_x) {
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  new_data_x = utils.parseNumberArray(utils.flatten(new_data_x));
	  if (utils.anyIsError(data_y, data_x, new_data_x)) {
	    return error.value;
	  }
	  var linest = exports.LINEST(data_y, data_x);
	  var m = linest[0];
	  var b = linest[1];
	  var result = [];

	  new_data_x.forEach(function(x) {
	    result.push(m * x + b);
	  });

	  return result;
	};

	exports.TRIMMEAN = function(range, percent) {
	  range = utils.parseNumberArray(utils.flatten(range));
	  percent = utils.parseNumber(percent);
	  if (utils.anyIsError(range, percent)) {
	    return error.value;
	  }
	  var trim = mathTrig.FLOOR(range.length * percent, 2) / 2;
	  return jStat.mean(utils.initial(utils.rest(range.sort(function(a, b) {
	    return a - b;
	  }), trim), trim));
	};

	exports.VAR = {};

	exports.VAR.P = function() {
	  var range = utils.numbers(utils.flatten(arguments));
	  var n = range.length;
	  var sigma = 0;
	  var mean = exports.AVERAGE(range);
	  for (var i = 0; i < n; i++) {
	    sigma += Math.pow(range[i] - mean, 2);
	  }
	  return sigma / n;
	};

	exports.VAR.S = function() {
	  var range = utils.numbers(utils.flatten(arguments));
	  var n = range.length;
	  var sigma = 0;
	  var mean = exports.AVERAGE(range);
	  for (var i = 0; i < n; i++) {
	    sigma += Math.pow(range[i] - mean, 2);
	  }
	  return sigma / (n - 1);
	};

	exports.VARA = function() {
	  var range = utils.flatten(arguments);
	  var n = range.length;
	  var sigma = 0;
	  var count = 0;
	  var mean = exports.AVERAGEA(range);
	  for (var i = 0; i < n; i++) {
	    var el = range[i];
	    if (typeof el === 'number') {
	      sigma += Math.pow(el - mean, 2);
	    } else if (el === true) {
	      sigma += Math.pow(1 - mean, 2);
	    } else {
	      sigma += Math.pow(0 - mean, 2);
	    }

	    if (el !== null) {
	      count++;
	    }
	  }
	  return sigma / (count - 1);
	};

	exports.VARPA = function() {
	  var range = utils.flatten(arguments);
	  var n = range.length;
	  var sigma = 0;
	  var count = 0;
	  var mean = exports.AVERAGEA(range);
	  for (var i = 0; i < n; i++) {
	    var el = range[i];
	    if (typeof el === 'number') {
	      sigma += Math.pow(el - mean, 2);
	    } else if (el === true) {
	      sigma += Math.pow(1 - mean, 2);
	    } else {
	      sigma += Math.pow(0 - mean, 2);
	    }

	    if (el !== null) {
	      count++;
	    }
	  }
	  return sigma / count;
	};

	exports.WEIBULL = {};

	exports.WEIBULL.DIST = function(x, alpha, beta, cumulative) {
	  x = utils.parseNumber(x);
	  alpha = utils.parseNumber(alpha);
	  beta = utils.parseNumber(beta);
	  if (utils.anyIsError(x, alpha, beta)) {
	    return error.value;
	  }
	  return (cumulative) ? 1 - Math.exp(-Math.pow(x / beta, alpha)) : Math.pow(x, alpha - 1) * Math.exp(-Math.pow(x / beta, alpha)) * alpha / Math.pow(beta, alpha);
	};

	exports.Z = {};

	exports.Z.TEST = function(range, x, sd) {
	  range = utils.parseNumberArray(utils.flatten(range));
	  x = utils.parseNumber(x);
	  if (utils.anyIsError(range, x)) {
	    return error.value;
	  }

	  sd = sd || exports.STDEV.S(range);
	  var n = range.length;
	  return 1 - exports.NORM.S.DIST((exports.AVERAGE(range) - x) / (sd / Math.sqrt(n)), true);
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(4);
	var error = __webpack_require__(5);
	var numeral = __webpack_require__(8);

	//TODO
	exports.ASC = function() {
	 throw new Error('ASC is not implemented');
	};

	//TODO
	exports.BAHTTEXT = function() {
	 throw new Error('BAHTTEXT is not implemented');
	};

	exports.CHAR = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return String.fromCharCode(number);
	};

	exports.CLEAN = function(text) {
	  text = text || '';
	  var re = /[\0-\x1F]/g;
	  return text.replace(re, "");
	};

	exports.CODE = function(text) {
	  text = text || '';
	  return text.charCodeAt(0);
	};

	exports.CONCATENATE = function() {
	  var args = utils.flatten(arguments);

	  var trueFound = 0;
	  while ((trueFound = args.indexOf(true)) > -1) {
	    args[trueFound] = 'TRUE';
	  }

	  var falseFound = 0;
	  while ((falseFound = args.indexOf(false)) > -1) {
	    args[falseFound] = 'FALSE';
	  }

	  return args.join('');
	};

	//TODO
	exports.DBCS = function() {
	 throw new Error('DBCS is not implemented');
	};

	exports.DOLLAR = function(number, decimals) {
	  decimals = (decimals === undefined) ? 2 : decimals;

	  number = utils.parseNumber(number);
	  decimals = utils.parseNumber(decimals);
	  if (utils.anyIsError(number, decimals)) {
	    return error.value;
	  }
	  var format = '';
	  if (decimals <= 0) {
	    number = Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
	    format = '($0,0)';
	  } else if (decimals > 0) {
	    format = '($0,0.' + new Array(decimals + 1).join('0') + ')';
	  }
	  return numeral(number).format(format);
	};

	exports.EXACT = function(text1, text2) {
	  return text1 === text2;
	};

	exports.FIND = function(find_text, within_text, position) {
	  position = (position === undefined) ? 0 : position;
	  return within_text ? within_text.indexOf(find_text, position - 1) + 1 : null;
	};

	exports.FIXED = function(number, decimals, no_commas) {
	  decimals = (decimals === undefined) ? 2 : decimals;
	  no_commas = (no_commas === undefined) ? false : no_commas;

	  number = utils.parseNumber(number);
	  decimals = utils.parseNumber(decimals);
	  if (utils.anyIsError(number, decimals)) {
	    return error.value;
	  }

	  var format = no_commas ? '0' : '0,0';
	  if (decimals <= 0) {
	    number = Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
	  } else if (decimals > 0) {
	    format += '.' + new Array(decimals + 1).join('0');
	  }
	  return numeral(number).format(format);
	};

	exports.HTML2TEXT = function (value) {
	  var result = '';

	  if (value) {
	    if (value instanceof Array) {
	      value.forEach(function (line) {
	        if (result !== '') {
	          result += '\n';
	        }
	        result += (line.replace(/<(?:.|\n)*?>/gm, ''));
	      });
	    } else {
	      result = value.replace(/<(?:.|\n)*?>/gm, '');
	    }
	  }

	  return result;
	};

	exports.LEFT = function(text, number) {
	  number = (number === undefined) ? 1 : number;
	  number = utils.parseNumber(number);
	  if (number instanceof Error || typeof text !== 'string') {
	    return error.value;
	  }
	  return text ? text.substring(0, number) : null;
	};

	exports.LEN = function(text) {
	  if (arguments.length === 0) {
	    return error.error;
	  }

	  if (typeof text === 'string') {
	    return text ? text.length : 0;
	  }

	  if (text.length) {
	    return text.length;
	  }

	  return error.value;
	};

	exports.LOWER = function(text) {
	  if (typeof text !== 'string') {
	    return error.value;
	  }
	  return text ? text.toLowerCase() : text;
	};

	exports.MID = function(text, start, number) {
	  start = utils.parseNumber(start);
	  number = utils.parseNumber(number);
	  if (utils.anyIsError(start, number) || typeof text !== 'string') {
	    return number;
	  }

	  var begin = start - 1;
	  var end = begin + number;

	  return text.substring(begin, end);
	};

	// TODO
	exports.NUMBERVALUE = function (text, decimal_separator, group_separator)  {
	  decimal_separator = (typeof decimal_separator === 'undefined') ? '.' : decimal_separator;
	  group_separator = (typeof group_separator === 'undefined') ? ',' : group_separator;
	  return Number(text.replace(decimal_separator, '.').replace(group_separator, ''));
	};

	// TODO
	exports.PRONETIC = function() {
	 throw new Error('PRONETIC is not implemented');
	};

	exports.PROPER = function(text) {
	  if (text === undefined || text.length === 0) {
	    return error.value;
	  }
	  if (text === true) {
	    text = 'TRUE';
	  }
	  if (text === false) {
	    text = 'FALSE';
	  }
	  if (isNaN(text) && typeof text === 'number') {
	    return error.value;
	  }
	  if (typeof text === 'number') {
	    text = '' + text;
	  }

	  return text.replace(/\w\S*/g, function(txt) {
	    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	  });
	};

	exports.REGEXEXTRACT = function (text, regular_expression) {
	  var match = text.match(new RegExp(regular_expression));
	  return match ? (match[match.length > 1 ? match.length - 1 : 0]) : null;
	};

	exports.REGEXMATCH = function (text, regular_expression, full) {
	  var match = text.match(new RegExp(regular_expression));
	  return full ? match : !!match;
	};

	exports.REGEXREPLACE = function (text, regular_expression, replacement) {
	  return text.replace(new RegExp(regular_expression), replacement);
	};

	exports.REPLACE = function(text, position, length, new_text) {
	  position = utils.parseNumber(position);
	  length = utils.parseNumber(length);
	  if (utils.anyIsError(position, length) ||
	    typeof text !== 'string' ||
	    typeof new_text !== 'string') {
	    return error.value;
	  }
	  return text.substr(0, position - 1) + new_text + text.substr(position - 1 + length);
	};

	exports.REPT = function(text, number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return new Array(number + 1).join(text);
	};

	exports.RIGHT = function(text, number) {
	  number = (number === undefined) ? 1 : number;
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return text ? text.substring(text.length - number) : null;
	};

	exports.SEARCH = function(find_text, within_text, position) {
	  var foundAt;
	  if (typeof find_text !== 'string' || typeof within_text !== 'string') {
	    return error.value;
	  }
	  position = (position === undefined) ? 0 : position;
	  foundAt = within_text.toLowerCase().indexOf(find_text.toLowerCase(), position - 1)+1;
	  return (foundAt === 0)?error.value:foundAt;
	};

	exports.SPLIT = function (text, separator) {
	  return text.split(separator);
	};

	exports.SUBSTITUTE = function(text, old_text, new_text, occurrence) {
	  if (!text || !old_text || !new_text) {
	    return text;
	  } else if (occurrence === undefined) {
	    return text.replace(new RegExp(old_text, 'g'), new_text);
	  } else {
	    var index = 0;
	    var i = 0;
	    while (text.indexOf(old_text, index) > 0) {
	      index = text.indexOf(old_text, index + 1);
	      i++;
	      if (i === occurrence) {
	        return text.substring(0, index) + new_text + text.substring(index + old_text.length);
	      }
	    }
	  }
	};

	exports.T = function(value) {
	  return (typeof value === "string") ? value : '';
	};

	// TODO incomplete implementation
	exports.TEXT = function(value, format) {
	  value = utils.parseNumber(value);
	  if (utils.anyIsError(value)) {
	    return error.na;
	  }

	  return numeral(value).format(format);
	};

	exports.TRIM = function(text) {
	  if (typeof text !== 'string') {
	    return error.value;
	  }
	  return text.replace(/ +/g, ' ').trim();
	};

	exports.UNICHAR = this.CHAR;

	exports.UNICODE = this.CODE;

	exports.UPPER = function(text) {
	  if (typeof text !== 'string') {
	    return error.value;
	  }
	  return text.toUpperCase();
	};

	exports.VALUE = function(text) {
	  if (typeof text !== 'string') {
	    return error.value;
	  }
	  return numeral().unformat(text);
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var utils   = __webpack_require__(4);
	var numeral = __webpack_require__(8);

	exports.UNIQUE = function () {
	  var result = [];
	  for (var i = 0; i < arguments.length; ++i) {
	    var hasElement = false;
	    var element    = arguments[i];

	    // Check if we've already seen this element.
	    for (var j = 0; j < result.length; ++j) {
	      hasElement = result[j] === element;
	      if (hasElement) { break; }
	    }

	    // If we did not find it, add it to the result.
	    if (!hasElement) {
	      result.push(element);
	    }
	  }
	  return result;
	};

	exports.FLATTEN = utils.flatten;

	exports.ARGS2ARRAY = function () {
	  return Array.prototype.slice.call(arguments, 0);
	};

	exports.REFERENCE = function (context, reference) {
	  try {
	    var path = reference.split('.');
	    var result = context;
	    for (var i = 0; i < path.length; ++i) {
	      var step = path[i];
	      if (step[step.length - 1] === ']') {
	        var opening = step.indexOf('[');
	        var index = step.substring(opening + 1, step.length - 1);
	        result = result[step.substring(0, opening)][index];
	      } else {
	        result = result[step];
	      }
	    }
	    return result;
	  } catch (error) {}
	};

	exports.JOIN = function (array, separator) {
	  return array.join(separator);
	};

	exports.NUMBERS = function () {
	  var possibleNumbers = utils.flatten(arguments);
	  return possibleNumbers.filter(function (el) {
	    return typeof el === 'number';
	  });
	};

	exports.NUMERAL = function (number, format) {
	  return numeral(number).format(format);
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(5);

	// TODO
	exports.CELL = function() {
	 throw new Error('CELL is not implemented');
	};

	exports.ERROR = {};
	exports.ERROR.TYPE = function(error_val) {
	  switch (error_val) {
	    case error.nil: return 1;
	    case error.div0: return 2;
	    case error.value: return 3;
	    case error.ref: return 4;
	    case error.name: return 5;
	    case error.num: return 6;
	    case error.na: return 7;
	    case error.data: return 8;
	  }
	  return error.na;
	};

	// TODO
	exports.INFO = function() {
	 throw new Error('INFO is not implemented');
	};

	exports.ISBLANK = function(value) {
	  return value === null;
	};

	exports.ISBINARY = function (number) {
	  return (/^[01]{1,10}$/).test(number);
	};

	exports.ISERR = function(value) {
	  return ([error.value, error.ref, error.div0, error.num, error.name, error.nil]).indexOf(value) >= 0 ||
	    (typeof value === 'number' && (isNaN(value) || !isFinite(value)));
	};

	exports.ISERROR = function(value) {
	  return exports.ISERR(value) || value === error.na;
	};

	exports.ISEVEN = function(number) {
	  return (Math.floor(Math.abs(number)) & 1) ? false : true;
	};

	// TODO
	exports.ISFORMULA = function() {
	  throw new Error('ISFORMULA is not implemented');
	};

	exports.ISLOGICAL = function(value) {
	  return value === true || value === false;
	};

	exports.ISNA = function(value) {
	  return value === error.na;
	};

	exports.ISNONTEXT = function(value) {
	  return typeof(value) !== 'string';
	};

	exports.ISNUMBER = function(value) {
	  return typeof(value) === 'number' && !isNaN(value) && isFinite(value);
	};

	exports.ISODD = function(number) {
	  return (Math.floor(Math.abs(number)) & 1) ? true : false;
	};

	// TODO
	exports.ISREF = function() {
	  throw new Error('ISREF is not implemented');
	};

	exports.ISTEXT = function(value) {
	  return typeof(value) === 'string';
	};

	exports.N = function(value) {
	  if (this.ISNUMBER(value)) {
	    return value;
	  }
	  if (value instanceof Date) {
	    return value.getTime();
	  }
	  if (value === true) {
	    return 1;
	  }
	  if (value === false) {
	    return 0;
	  }
	  if (this.ISERROR(value)) {
	    return value;
	  }
	  return 0;
	};

	exports.NA = function() {
	  return error.na;
	};


	// TODO
	exports.SHEET = function() {
	  throw new Error('SHEET is not implemented');
	};

	// TODO
	exports.SHEETS = function() {
	  throw new Error('SHEETS is not implemented');
	};

	exports.TYPE = function(value) {
	  if (this.ISNUMBER(value)) {
	    return 1;
	  }
	  if (this.ISTEXT(value)) {
	    return 2;
	  }
	  if (this.ISLOGICAL(value)) {
	    return 4;
	  }
	  if (this.ISERROR(value)) {
	    return 16;
	  }
	  if (Array.isArray(value)) {
	    return 64;
	  }
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(5);
	var jStat = __webpack_require__(9).jStat;
	var text = __webpack_require__(7);
	var utils = __webpack_require__(4);
	var bessel = __webpack_require__(13);

	function isValidBinaryNumber(number) {
	  return (/^[01]{1,10}$/).test(number);
	}

	exports.BESSELI = function(x, n) {
	  x = utils.parseNumber(x);
	  n = utils.parseNumber(n);
	  if (utils.anyIsError(x, n)) {
	    return error.value;
	  }
	  return bessel.besseli(x, n);
	};

	exports.BESSELJ = function(x, n) {
	  x = utils.parseNumber(x);
	  n = utils.parseNumber(n);
	  if (utils.anyIsError(x, n)) {
	    return error.value;
	  }
	  return bessel.besselj(x, n);
	};

	exports.BESSELK = function(x, n) {
	  x = utils.parseNumber(x);
	  n = utils.parseNumber(n);
	  if (utils.anyIsError(x, n)) {
	    return error.value;
	  }
	  return bessel.besselk(x, n);
	};

	exports.BESSELY = function(x, n) {
	  x = utils.parseNumber(x);
	  n = utils.parseNumber(n);
	  if (utils.anyIsError(x, n)) {
	    return error.value;
	  }
	  return bessel.bessely(x, n);
	};

	exports.BIN2DEC = function(number) {
	  // Return error if number is not binary or contains more than 10 characters (10 digits)
	  if (!isValidBinaryNumber(number)) {
	    return error.num;
	  }

	  // Convert binary number to decimal
	  var result = parseInt(number, 2);

	  // Handle negative numbers
	  var stringified = number.toString();
	  if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
	    return parseInt(stringified.substring(1), 2) - 512;
	  } else {
	    return result;
	  }
	};


	exports.BIN2HEX = function(number, places) {
	  // Return error if number is not binary or contains more than 10 characters (10 digits)
	  if (!isValidBinaryNumber(number)) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character hexadecimal number if number is negative
	  var stringified = number.toString();
	  if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
	    return (1099511627264 + parseInt(stringified.substring(1), 2)).toString(16);
	  }

	  // Convert binary number to hexadecimal
	  var result = parseInt(number, 2).toString(16);

	  // Return hexadecimal number using the minimum number of characters necessary if places is undefined
	  if (places === undefined) {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.BIN2OCT = function(number, places) {
	  // Return error if number is not binary or contains more than 10 characters (10 digits)
	  if (!isValidBinaryNumber(number)) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character octal number if number is negative
	  var stringified = number.toString();
	  if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
	    return (1073741312 + parseInt(stringified.substring(1), 2)).toString(8);
	  }

	  // Convert binary number to octal
	  var result = parseInt(number, 2).toString(8);

	  // Return octal number using the minimum number of characters necessary if places is undefined
	  if (places === undefined) {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.BITAND = function(number1, number2) {
	  // Return error if either number is a non-numeric value
	  number1 = utils.parseNumber(number1);
	  number2 = utils.parseNumber(number2);
	  if (utils.anyIsError(number1, number2)) {
	    return error.value;
	  }

	  // Return error if either number is less than 0
	  if (number1 < 0 || number2 < 0) {
	    return error.num;
	  }

	  // Return error if either number is a non-integer
	  if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
	    return error.num;
	  }

	  // Return error if either number is greater than (2^48)-1
	  if (number1 > 281474976710655 || number2 > 281474976710655) {
	    return error.num;
	  }

	  // Return bitwise AND of two numbers
	  return number1 & number2;
	};

	exports.BITLSHIFT = function(number, shift) {
	  number = utils.parseNumber(number);
	  shift = utils.parseNumber(shift);
	  if (utils.anyIsError(number, shift)) {
	    return error.value;
	  }

	  // Return error if number is less than 0
	  if (number < 0) {
	    return error.num;
	  }

	  // Return error if number is a non-integer
	  if (Math.floor(number) !== number) {
	    return error.num;
	  }

	  // Return error if number is greater than (2^48)-1
	  if (number > 281474976710655) {
	    return error.num;
	  }

	  // Return error if the absolute value of shift is greater than 53
	  if (Math.abs(shift) > 53) {
	    return error.num;
	  }

	  // Return number shifted by shift bits to the left or to the right if shift is negative
	  return (shift >= 0) ? number << shift : number >> -shift;
	};

	exports.BITOR = function(number1, number2) {
	  number1 = utils.parseNumber(number1);
	  number2 = utils.parseNumber(number2);
	  if (utils.anyIsError(number1, number2)) {
	    return error.value;
	  }

	  // Return error if either number is less than 0
	  if (number1 < 0 || number2 < 0) {
	    return error.num;
	  }

	  // Return error if either number is a non-integer
	  if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
	    return error.num;
	  }

	  // Return error if either number is greater than (2^48)-1
	  if (number1 > 281474976710655 || number2 > 281474976710655) {
	    return error.num;
	  }

	  // Return bitwise OR of two numbers
	  return number1 | number2;
	};

	exports.BITRSHIFT = function(number, shift) {
	  number = utils.parseNumber(number);
	  shift = utils.parseNumber(shift);
	  if (utils.anyIsError(number, shift)) {
	    return error.value;
	  }

	  // Return error if number is less than 0
	  if (number < 0) {
	    return error.num;
	  }

	  // Return error if number is a non-integer
	  if (Math.floor(number) !== number) {
	    return error.num;
	  }

	  // Return error if number is greater than (2^48)-1
	  if (number > 281474976710655) {
	    return error.num;
	  }

	  // Return error if the absolute value of shift is greater than 53
	  if (Math.abs(shift) > 53) {
	    return error.num;
	  }

	  // Return number shifted by shift bits to the right or to the left if shift is negative
	  return (shift >= 0) ? number >> shift : number << -shift;
	};

	exports.BITXOR = function(number1, number2) {
	  number1 = utils.parseNumber(number1);
	  number2 = utils.parseNumber(number2);
	  if (utils.anyIsError(number1, number2)) {
	    return error.value;
	  }

	  // Return error if either number is less than 0
	  if (number1 < 0 || number2 < 0) {
	    return error.num;
	  }

	  // Return error if either number is a non-integer
	  if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
	    return error.num;
	  }

	  // Return error if either number is greater than (2^48)-1
	  if (number1 > 281474976710655 || number2 > 281474976710655) {
	    return error.num;
	  }

	  // Return bitwise XOR of two numbers
	  return number1 ^ number2;
	};

	exports.COMPLEX = function(real, imaginary, suffix) {
	  real = utils.parseNumber(real);
	  imaginary = utils.parseNumber(imaginary);
	  if (utils.anyIsError(real, imaginary)) {
	    return real;
	  }

	  // Set suffix
	  suffix = (suffix === undefined) ? 'i' : suffix;

	  // Return error if suffix is neither "i" nor "j"
	  if (suffix !== 'i' && suffix !== 'j') {
	    return error.value;
	  }

	  // Return complex number
	  if (real === 0 && imaginary === 0) {
	    return 0;
	  } else if (real === 0) {
	    return (imaginary === 1) ? suffix : imaginary.toString() + suffix;
	  } else if (imaginary === 0) {
	    return real.toString();
	  } else {
	    var sign = (imaginary > 0) ? '+' : '';
	    return real.toString() + sign + ((imaginary === 1) ? suffix : imaginary.toString() + suffix);
	  }
	};

	exports.CONVERT = function(number, from_unit, to_unit) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }

	  // List of units supported by CONVERT and units defined by the International System of Units
	  // [Name, Symbol, Alternate symbols, Quantity, ISU, CONVERT, Conversion ratio]
	  var units = [
	    ["a.u. of action", "?", null, "action", false, false, 1.05457168181818e-34],
	    ["a.u. of charge", "e", null, "electric_charge", false, false, 1.60217653141414e-19],
	    ["a.u. of energy", "Eh", null, "energy", false, false, 4.35974417757576e-18],
	    ["a.u. of length", "a?", null, "length", false, false, 5.29177210818182e-11],
	    ["a.u. of mass", "m?", null, "mass", false, false, 9.10938261616162e-31],
	    ["a.u. of time", "?/Eh", null, "time", false, false, 2.41888432650516e-17],
	    ["admiralty knot", "admkn", null, "speed", false, true, 0.514773333],
	    ["ampere", "A", null, "electric_current", true, false, 1],
	    ["ampere per meter", "A/m", null, "magnetic_field_intensity", true, false, 1],
	    ["ångström", "Å", ["ang"], "length", false, true, 1e-10],
	    ["are", "ar", null, "area", false, true, 100],
	    ["astronomical unit", "ua", null, "length", false, false, 1.49597870691667e-11],
	    ["bar", "bar", null, "pressure", false, false, 100000],
	    ["barn", "b", null, "area", false, false, 1e-28],
	    ["becquerel", "Bq", null, "radioactivity", true, false, 1],
	    ["bit", "bit", ["b"], "information", false, true, 1],
	    ["btu", "BTU", ["btu"], "energy", false, true, 1055.05585262],
	    ["byte", "byte", null, "information", false, true, 8],
	    ["candela", "cd", null, "luminous_intensity", true, false, 1],
	    ["candela per square metre", "cd/m?", null, "luminance", true, false, 1],
	    ["coulomb", "C", null, "electric_charge", true, false, 1],
	    ["cubic ångström", "ang3", ["ang^3"], "volume", false, true, 1e-30],
	    ["cubic foot", "ft3", ["ft^3"], "volume", false, true, 0.028316846592],
	    ["cubic inch", "in3", ["in^3"], "volume", false, true, 0.000016387064],
	    ["cubic light-year", "ly3", ["ly^3"], "volume", false, true, 8.46786664623715e-47],
	    ["cubic metre", "m?", null, "volume", true, true, 1],
	    ["cubic mile", "mi3", ["mi^3"], "volume", false, true, 4168181825.44058],
	    ["cubic nautical mile", "Nmi3", ["Nmi^3"], "volume", false, true, 6352182208],
	    ["cubic Pica", "Pica3", ["Picapt3", "Pica^3", "Picapt^3"], "volume", false, true, 7.58660370370369e-8],
	    ["cubic yard", "yd3", ["yd^3"], "volume", false, true, 0.764554857984],
	    ["cup", "cup", null, "volume", false, true, 0.0002365882365],
	    ["dalton", "Da", ["u"], "mass", false, false, 1.66053886282828e-27],
	    ["day", "d", ["day"], "time", false, true, 86400],
	    ["degree", "°", null, "angle", false, false, 0.0174532925199433],
	    ["degrees Rankine", "Rank", null, "temperature", false, true, 0.555555555555556],
	    ["dyne", "dyn", ["dy"], "force", false, true, 0.00001],
	    ["electronvolt", "eV", ["ev"], "energy", false, true, 1.60217656514141],
	    ["ell", "ell", null, "length", false, true, 1.143],
	    ["erg", "erg", ["e"], "energy", false, true, 1e-7],
	    ["farad", "F", null, "electric_capacitance", true, false, 1],
	    ["fluid ounce", "oz", null, "volume", false, true, 0.0000295735295625],
	    ["foot", "ft", null, "length", false, true, 0.3048],
	    ["foot-pound", "flb", null, "energy", false, true, 1.3558179483314],
	    ["gal", "Gal", null, "acceleration", false, false, 0.01],
	    ["gallon", "gal", null, "volume", false, true, 0.003785411784],
	    ["gauss", "G", ["ga"], "magnetic_flux_density", false, true, 1],
	    ["grain", "grain", null, "mass", false, true, 0.0000647989],
	    ["gram", "g", null, "mass", false, true, 0.001],
	    ["gray", "Gy", null, "absorbed_dose", true, false, 1],
	    ["gross registered ton", "GRT", ["regton"], "volume", false, true, 2.8316846592],
	    ["hectare", "ha", null, "area", false, true, 10000],
	    ["henry", "H", null, "inductance", true, false, 1],
	    ["hertz", "Hz", null, "frequency", true, false, 1],
	    ["horsepower", "HP", ["h"], "power", false, true, 745.69987158227],
	    ["horsepower-hour", "HPh", ["hh", "hph"], "energy", false, true, 2684519.538],
	    ["hour", "h", ["hr"], "time", false, true, 3600],
	    ["imperial gallon (U.K.)", "uk_gal", null, "volume", false, true, 0.00454609],
	    ["imperial hundredweight", "lcwt", ["uk_cwt", "hweight"], "mass", false, true, 50.802345],
	    ["imperial quart (U.K)", "uk_qt", null, "volume", false, true, 0.0011365225],
	    ["imperial ton", "brton", ["uk_ton", "LTON"], "mass", false, true, 1016.046909],
	    ["inch", "in", null, "length", false, true, 0.0254],
	    ["international acre", "uk_acre", null, "area", false, true, 4046.8564224],
	    ["IT calorie", "cal", null, "energy", false, true, 4.1868],
	    ["joule", "J", null, "energy", true, true, 1],
	    ["katal", "kat", null, "catalytic_activity", true, false, 1],
	    ["kelvin", "K", ["kel"], "temperature", true, true, 1],
	    ["kilogram", "kg", null, "mass", true, true, 1],
	    ["knot", "kn", null, "speed", false, true, 0.514444444444444],
	    ["light-year", "ly", null, "length", false, true, 9460730472580800],
	    ["litre", "L", ["l", "lt"], "volume", false, true, 0.001],
	    ["lumen", "lm", null, "luminous_flux", true, false, 1],
	    ["lux", "lx", null, "illuminance", true, false, 1],
	    ["maxwell", "Mx", null, "magnetic_flux", false, false, 1e-18],
	    ["measurement ton", "MTON", null, "volume", false, true, 1.13267386368],
	    ["meter per hour", "m/h", ["m/hr"], "speed", false, true, 0.00027777777777778],
	    ["meter per second", "m/s", ["m/sec"], "speed", true, true, 1],
	    ["meter per second squared", "m?s??", null, "acceleration", true, false, 1],
	    ["parsec", "pc", ["parsec"], "length", false, true, 30856775814671900],
	    ["meter squared per second", "m?/s", null, "kinematic_viscosity", true, false, 1],
	    ["metre", "m", null, "length", true, true, 1],
	    ["miles per hour", "mph", null, "speed", false, true, 0.44704],
	    ["millimetre of mercury", "mmHg", null, "pressure", false, false, 133.322],
	    ["minute", "?", null, "angle", false, false, 0.000290888208665722],
	    ["minute", "min", ["mn"], "time", false, true, 60],
	    ["modern teaspoon", "tspm", null, "volume", false, true, 0.000005],
	    ["mole", "mol", null, "amount_of_substance", true, false, 1],
	    ["morgen", "Morgen", null, "area", false, true, 2500],
	    ["n.u. of action", "?", null, "action", false, false, 1.05457168181818e-34],
	    ["n.u. of mass", "m?", null, "mass", false, false, 9.10938261616162e-31],
	    ["n.u. of speed", "c?", null, "speed", false, false, 299792458],
	    ["n.u. of time", "?/(me?c??)", null, "time", false, false, 1.28808866778687e-21],
	    ["nautical mile", "M", ["Nmi"], "length", false, true, 1852],
	    ["newton", "N", null, "force", true, true, 1],
	    ["œrsted", "Oe ", null, "magnetic_field_intensity", false, false, 79.5774715459477],
	    ["ohm", "Ω", null, "electric_resistance", true, false, 1],
	    ["ounce mass", "ozm", null, "mass", false, true, 0.028349523125],
	    ["pascal", "Pa", null, "pressure", true, false, 1],
	    ["pascal second", "Pa?s", null, "dynamic_viscosity", true, false, 1],
	    ["pferdestärke", "PS", null, "power", false, true, 735.49875],
	    ["phot", "ph", null, "illuminance", false, false, 0.0001],
	    ["pica (1/6 inch)", "pica", null, "length", false, true, 0.00035277777777778],
	    ["pica (1/72 inch)", "Pica", ["Picapt"], "length", false, true, 0.00423333333333333],
	    ["poise", "P", null, "dynamic_viscosity", false, false, 0.1],
	    ["pond", "pond", null, "force", false, true, 0.00980665],
	    ["pound force", "lbf", null, "force", false, true, 4.4482216152605],
	    ["pound mass", "lbm", null, "mass", false, true, 0.45359237],
	    ["quart", "qt", null, "volume", false, true, 0.000946352946],
	    ["radian", "rad", null, "angle", true, false, 1],
	    ["second", "?", null, "angle", false, false, 0.00000484813681109536],
	    ["second", "s", ["sec"], "time", true, true, 1],
	    ["short hundredweight", "cwt", ["shweight"], "mass", false, true, 45.359237],
	    ["siemens", "S", null, "electrical_conductance", true, false, 1],
	    ["sievert", "Sv", null, "equivalent_dose", true, false, 1],
	    ["slug", "sg", null, "mass", false, true, 14.59390294],
	    ["square ångström", "ang2", ["ang^2"], "area", false, true, 1e-20],
	    ["square foot", "ft2", ["ft^2"], "area", false, true, 0.09290304],
	    ["square inch", "in2", ["in^2"], "area", false, true, 0.00064516],
	    ["square light-year", "ly2", ["ly^2"], "area", false, true, 8.95054210748189e+31],
	    ["square meter", "m?", null, "area", true, true, 1],
	    ["square mile", "mi2", ["mi^2"], "area", false, true, 2589988.110336],
	    ["square nautical mile", "Nmi2", ["Nmi^2"], "area", false, true, 3429904],
	    ["square Pica", "Pica2", ["Picapt2", "Pica^2", "Picapt^2"], "area", false, true, 0.00001792111111111],
	    ["square yard", "yd2", ["yd^2"], "area", false, true, 0.83612736],
	    ["statute mile", "mi", null, "length", false, true, 1609.344],
	    ["steradian", "sr", null, "solid_angle", true, false, 1],
	    ["stilb", "sb", null, "luminance", false, false, 0.0001],
	    ["stokes", "St", null, "kinematic_viscosity", false, false, 0.0001],
	    ["stone", "stone", null, "mass", false, true, 6.35029318],
	    ["tablespoon", "tbs", null, "volume", false, true, 0.0000147868],
	    ["teaspoon", "tsp", null, "volume", false, true, 0.00000492892],
	    ["tesla", "T", null, "magnetic_flux_density", true, true, 1],
	    ["thermodynamic calorie", "c", null, "energy", false, true, 4.184],
	    ["ton", "ton", null, "mass", false, true, 907.18474],
	    ["tonne", "t", null, "mass", false, false, 1000],
	    ["U.K. pint", "uk_pt", null, "volume", false, true, 0.00056826125],
	    ["U.S. bushel", "bushel", null, "volume", false, true, 0.03523907],
	    ["U.S. oil barrel", "barrel", null, "volume", false, true, 0.158987295],
	    ["U.S. pint", "pt", ["us_pt"], "volume", false, true, 0.000473176473],
	    ["U.S. survey mile", "survey_mi", null, "length", false, true, 1609.347219],
	    ["U.S. survey/statute acre", "us_acre", null, "area", false, true, 4046.87261],
	    ["volt", "V", null, "voltage", true, false, 1],
	    ["watt", "W", null, "power", true, true, 1],
	    ["watt-hour", "Wh", ["wh"], "energy", false, true, 3600],
	    ["weber", "Wb", null, "magnetic_flux", true, false, 1],
	    ["yard", "yd", null, "length", false, true, 0.9144],
	    ["year", "yr", null, "time", false, true, 31557600]
	  ];

	  // Binary prefixes
	  // [Name, Prefix power of 2 value, Previx value, Abbreviation, Derived from]
	  var binary_prefixes = {
	    Yi: ["yobi", 80, 1208925819614629174706176, "Yi", "yotta"],
	    Zi: ["zebi", 70, 1180591620717411303424, "Zi", "zetta"],
	    Ei: ["exbi", 60, 1152921504606846976, "Ei", "exa"],
	    Pi: ["pebi", 50, 1125899906842624, "Pi", "peta"],
	    Ti: ["tebi", 40, 1099511627776, "Ti", "tera"],
	    Gi: ["gibi", 30, 1073741824, "Gi", "giga"],
	    Mi: ["mebi", 20, 1048576, "Mi", "mega"],
	    ki: ["kibi", 10, 1024, "ki", "kilo"]
	  };

	  // Unit prefixes
	  // [Name, Multiplier, Abbreviation]
	  var unit_prefixes = {
	    Y: ["yotta", 1e+24, "Y"],
	    Z: ["zetta", 1e+21, "Z"],
	    E: ["exa", 1e+18, "E"],
	    P: ["peta", 1e+15, "P"],
	    T: ["tera", 1e+12, "T"],
	    G: ["giga", 1e+09, "G"],
	    M: ["mega", 1e+06, "M"],
	    k: ["kilo", 1e+03, "k"],
	    h: ["hecto", 1e+02, "h"],
	    e: ["dekao", 1e+01, "e"],
	    d: ["deci", 1e-01, "d"],
	    c: ["centi", 1e-02, "c"],
	    m: ["milli", 1e-03, "m"],
	    u: ["micro", 1e-06, "u"],
	    n: ["nano", 1e-09, "n"],
	    p: ["pico", 1e-12, "p"],
	    f: ["femto", 1e-15, "f"],
	    a: ["atto", 1e-18, "a"],
	    z: ["zepto", 1e-21, "z"],
	    y: ["yocto", 1e-24, "y"]
	  };

	  // Initialize units and multipliers
	  var from = null;
	  var to = null;
	  var base_from_unit = from_unit;
	  var base_to_unit = to_unit;
	  var from_multiplier = 1;
	  var to_multiplier = 1;
	  var alt;

	  // Lookup from and to units
	  for (var i = 0; i < units.length; i++) {
	    alt = (units[i][2] === null) ? [] : units[i][2];
	    if (units[i][1] === base_from_unit || alt.indexOf(base_from_unit) >= 0) {
	      from = units[i];
	    }
	    if (units[i][1] === base_to_unit || alt.indexOf(base_to_unit) >= 0) {
	      to = units[i];
	    }
	  }

	  // Lookup from prefix
	  if (from === null) {
	    var from_binary_prefix = binary_prefixes[from_unit.substring(0, 2)];
	    var from_unit_prefix = unit_prefixes[from_unit.substring(0, 1)];

	    // Handle dekao unit prefix (only unit prefix with two characters)
	    if (from_unit.substring(0, 2) === 'da') {
	      from_unit_prefix = ["dekao", 1e+01, "da"];
	    }

	    // Handle binary prefixes first (so that 'Yi' is processed before 'Y')
	    if (from_binary_prefix) {
	      from_multiplier = from_binary_prefix[2];
	      base_from_unit = from_unit.substring(2);
	    } else if (from_unit_prefix) {
	      from_multiplier = from_unit_prefix[1];
	      base_from_unit = from_unit.substring(from_unit_prefix[2].length);
	    }

	    // Lookup from unit
	    for (var j = 0; j < units.length; j++) {
	      alt = (units[j][2] === null) ? [] : units[j][2];
	      if (units[j][1] === base_from_unit || alt.indexOf(base_from_unit) >= 0) {
	        from = units[j];
	      }
	    }
	  }

	  // Lookup to prefix
	  if (to === null) {
	    var to_binary_prefix = binary_prefixes[to_unit.substring(0, 2)];
	    var to_unit_prefix = unit_prefixes[to_unit.substring(0, 1)];

	    // Handle dekao unit prefix (only unit prefix with two characters)
	    if (to_unit.substring(0, 2) === 'da') {
	      to_unit_prefix = ["dekao", 1e+01, "da"];
	    }

	    // Handle binary prefixes first (so that 'Yi' is processed before 'Y')
	    if (to_binary_prefix) {
	      to_multiplier = to_binary_prefix[2];
	      base_to_unit = to_unit.substring(2);
	    } else if (to_unit_prefix) {
	      to_multiplier = to_unit_prefix[1];
	      base_to_unit = to_unit.substring(to_unit_prefix[2].length);
	    }

	    // Lookup to unit
	    for (var k = 0; k < units.length; k++) {
	      alt = (units[k][2] === null) ? [] : units[k][2];
	      if (units[k][1] === base_to_unit || alt.indexOf(base_to_unit) >= 0) {
	        to = units[k];
	      }
	    }
	  }

	  // Return error if a unit does not exist
	  if (from === null || to === null) {
	    return error.na;
	  }

	  // Return error if units represent different quantities
	  if (from[3] !== to[3]) {
	    return error.na;
	  }

	  // Return converted number
	  return number * from[6] * from_multiplier / (to[6] * to_multiplier);
	};

	exports.DEC2BIN = function(number, places) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }

	  // Return error if number is not decimal, is lower than -512, or is greater than 511
	  if (!/^-?[0-9]{1,3}$/.test(number) || number < -512 || number > 511) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character binary number if number is negative
	  if (number < 0) {
	    return '1' + text.REPT('0', 9 - (512 + number).toString(2).length) + (512 + number).toString(2);
	  }

	  // Convert decimal number to binary
	  var result = parseInt(number, 10).toString(2);

	  // Return binary number using the minimum number of characters necessary if places is undefined
	  if (typeof places === 'undefined') {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.DEC2HEX = function(number, places) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }

	  // Return error if number is not decimal, is lower than -549755813888, or is greater than 549755813887
	  if (!/^-?[0-9]{1,12}$/.test(number) || number < -549755813888 || number > 549755813887) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character hexadecimal number if number is negative
	  if (number < 0) {
	    return (1099511627776 + number).toString(16);
	  }

	  // Convert decimal number to hexadecimal
	  var result = parseInt(number, 10).toString(16);

	  // Return hexadecimal number using the minimum number of characters necessary if places is undefined
	  if (typeof places === 'undefined') {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.DEC2OCT = function(number, places) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }

	  // Return error if number is not decimal, is lower than -549755813888, or is greater than 549755813887
	  if (!/^-?[0-9]{1,9}$/.test(number) || number < -536870912 || number > 536870911) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character octal number if number is negative
	  if (number < 0) {
	    return (1073741824 + number).toString(8);
	  }

	  // Convert decimal number to octal
	  var result = parseInt(number, 10).toString(8);

	  // Return octal number using the minimum number of characters necessary if places is undefined
	  if (typeof places === 'undefined') {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.DELTA = function(number1, number2) {
	  // Set number2 to zero if undefined
	  number2 = (number2 === undefined) ? 0 : number2;
	  number1 = utils.parseNumber(number1);
	  number2 = utils.parseNumber(number2);
	  if (utils.anyIsError(number1, number2)) {
	    return error.value;
	  }

	  // Return delta
	  return (number1 === number2) ? 1 : 0;
	};

	// TODO: why is upper_bound not used ? The excel documentation has no examples with upper_bound
	exports.ERF = function(lower_bound, upper_bound) {
	  // Set number2 to zero if undefined
	  upper_bound = (upper_bound === undefined) ? 0 : upper_bound;

	  lower_bound = utils.parseNumber(lower_bound);
	  upper_bound = utils.parseNumber(upper_bound);
	  if (utils.anyIsError(lower_bound, upper_bound)) {
	    return error.value;
	  }

	  return jStat.erf(lower_bound);
	};

	// TODO
	exports.ERF.PRECISE = function() {
	 throw new Error('ERF.PRECISE is not implemented');
	};

	exports.ERFC = function(x) {
	  // Return error if x is not a number
	  if (isNaN(x)) {
	    return error.value;
	  }

	  return jStat.erfc(x);
	};

	// TODO
	exports.ERFC.PRECISE = function() {
	 throw new Error('ERFC.PRECISE is not implemented');
	};

	exports.GESTEP = function(number, step) {
	  step = step || 0;
	  number = utils.parseNumber(number);
	  if (utils.anyIsError(step, number)) {
	    return number;
	  }

	  // Return delta
	  return (number >= step) ? 1 : 0;
	};

	exports.HEX2BIN = function(number, places) {
	  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
	  if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
	    return error.num;
	  }

	  // Check if number is negative
	  var negative = (number.length === 10 && number.substring(0, 1).toLowerCase() === 'f') ? true : false;

	  // Convert hexadecimal number to decimal
	  var decimal = (negative) ? parseInt(number, 16) - 1099511627776 : parseInt(number, 16);

	  // Return error if number is lower than -512 or greater than 511
	  if (decimal < -512 || decimal > 511) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character binary number if number is negative
	  if (negative) {
	    return '1' + text.REPT('0', 9 - (512 + decimal).toString(2).length) + (512 + decimal).toString(2);
	  }

	  // Convert decimal number to binary
	  var result = decimal.toString(2);

	  // Return binary number using the minimum number of characters necessary if places is undefined
	  if (places === undefined) {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.HEX2DEC = function(number) {
	  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
	  if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
	    return error.num;
	  }

	  // Convert hexadecimal number to decimal
	  var decimal = parseInt(number, 16);

	  // Return decimal number
	  return (decimal >= 549755813888) ? decimal - 1099511627776 : decimal;
	};

	exports.HEX2OCT = function(number, places) {
	  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
	  if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
	    return error.num;
	  }

	  // Convert hexadecimal number to decimal
	  var decimal = parseInt(number, 16);

	  // Return error if number is positive and greater than 0x1fffffff (536870911)
	  if (decimal > 536870911 && decimal < 1098974756864) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character octal number if number is negative
	  if (decimal >= 1098974756864) {
	    return (decimal - 1098437885952).toString(8);
	  }

	  // Convert decimal number to octal
	  var result = decimal.toString(8);

	  // Return octal number using the minimum number of characters necessary if places is undefined
	  if (places === undefined) {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.IMABS = function(inumber) {
	  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  // Return error if either coefficient is not a number
	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Return absolute value of complex number
	  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
	};

	exports.IMAGINARY = function(inumber) {
	  if (inumber === undefined || inumber === true || inumber === false) {
	    return error.value;
	  }

	  // Return 0 if inumber is equal to 0
	  if (inumber === 0 || inumber === '0') {
	    return 0;
	  }

	  // Handle special cases
	  if (['i', 'j'].indexOf(inumber) >= 0) {
	    return 1;
	  }

	  // Normalize imaginary coefficient
	  inumber = inumber.replace('+i', '+1i').replace('-i', '-1i').replace('+j', '+1j').replace('-j', '-1j');

	  // Lookup sign
	  var plus = inumber.indexOf('+');
	  var minus = inumber.indexOf('-');
	  if (plus === 0) {
	    plus = inumber.indexOf('+', 1);
	  }

	  if (minus === 0) {
	    minus = inumber.indexOf('-', 1);
	  }

	  // Lookup imaginary unit
	  var last = inumber.substring(inumber.length - 1, inumber.length);
	  var unit = (last === 'i' || last === 'j');

	  if (plus >= 0 || minus >= 0) {
	    // Return error if imaginary unit is neither i nor j
	    if (!unit) {
	      return error.num;
	    }

	    // Return imaginary coefficient of complex number
	    if (plus >= 0) {
	      return (isNaN(inumber.substring(0, plus)) || isNaN(inumber.substring(plus + 1, inumber.length - 1))) ?
	        error.num :
	        Number(inumber.substring(plus + 1, inumber.length - 1));
	    } else {
	      return (isNaN(inumber.substring(0, minus)) || isNaN(inumber.substring(minus + 1, inumber.length - 1))) ?
	        error.num :
	        -Number(inumber.substring(minus + 1, inumber.length - 1));
	    }
	  } else {
	    if (unit) {
	      return (isNaN(inumber.substring(0, inumber.length - 1))) ? error.num : inumber.substring(0, inumber.length - 1);
	    } else {
	      return (isNaN(inumber)) ? error.num : 0;
	    }
	  }
	};

	exports.IMARGUMENT = function(inumber) {
	  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  // Return error if either coefficient is not a number
	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Return error if inumber is equal to zero
	  if (x === 0 && y === 0) {
	    return error.div0;
	  }

	  // Return PI/2 if x is equal to zero and y is positive
	  if (x === 0 && y > 0) {
	    return Math.PI / 2;
	  }

	  // Return -PI/2 if x is equal to zero and y is negative
	  if (x === 0 && y < 0) {
	    return -Math.PI / 2;
	  }

	  // Return zero if x is negative and y is equal to zero
	  if (y === 0 && x > 0) {
	    return 0;
	  }

	  // Return zero if x is negative and y is equal to zero
	  if (y === 0 && x < 0) {
	    return -Math.PI;
	  }

	  // Return argument of complex number
	  if (x > 0) {
	    return Math.atan(y / x);
	  } else if (x < 0 && y >= 0) {
	    return Math.atan(y / x) + Math.PI;
	  } else {
	    return Math.atan(y / x) - Math.PI;
	  }
	};

	exports.IMCONJUGATE = function(inumber) {
	  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return conjugate of complex number
	  return (y !== 0) ? exports.COMPLEX(x, -y, unit) : inumber;
	};

	exports.IMCOS = function(inumber) {
	  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return cosine of complex number
	  return exports.COMPLEX(Math.cos(x) * (Math.exp(y) + Math.exp(-y)) / 2, -Math.sin(x) * (Math.exp(y) - Math.exp(-y)) / 2, unit);
	};

	exports.IMCOSH = function(inumber) {
	  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return hyperbolic cosine of complex number
	  return exports.COMPLEX(Math.cos(y) * (Math.exp(x) + Math.exp(-x)) / 2, Math.sin(y) * (Math.exp(x) - Math.exp(-x)) / 2, unit);
	};

	exports.IMCOT = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Return cotangent of complex number
	  return exports.IMDIV(exports.IMCOS(inumber), exports.IMSIN(inumber));
	};

	exports.IMDIV = function(inumber1, inumber2) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var a = exports.IMREAL(inumber1);
	  var b = exports.IMAGINARY(inumber1);
	  var c = exports.IMREAL(inumber2);
	  var d = exports.IMAGINARY(inumber2);

	  if (utils.anyIsError(a, b, c, d)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit1 = inumber1.substring(inumber1.length - 1);
	  var unit2 = inumber2.substring(inumber2.length - 1);
	  var unit = 'i';
	  if (unit1 === 'j') {
	    unit = 'j';
	  } else if (unit2 === 'j') {
	    unit = 'j';
	  }

	  // Return error if inumber2 is null
	  if (c === 0 && d === 0) {
	    return error.num;
	  }

	  // Return exponential of complex number
	  var den = c * c + d * d;
	  return exports.COMPLEX((a * c + b * d) / den, (b * c - a * d) / den, unit);
	};

	exports.IMEXP = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return exponential of complex number
	  var e = Math.exp(x);
	  return exports.COMPLEX(e * Math.cos(y), e * Math.sin(y), unit);
	};

	exports.IMLN = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return exponential of complex number
	  return exports.COMPLEX(Math.log(Math.sqrt(x * x + y * y)), Math.atan(y / x), unit);
	};

	exports.IMLOG10 = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return exponential of complex number
	  return exports.COMPLEX(Math.log(Math.sqrt(x * x + y * y)) / Math.log(10), Math.atan(y / x) / Math.log(10), unit);
	};

	exports.IMLOG2 = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return exponential of complex number
	  return exports.COMPLEX(Math.log(Math.sqrt(x * x + y * y)) / Math.log(2), Math.atan(y / x) / Math.log(2), unit);
	};

	exports.IMPOWER = function(inumber, number) {
	  number = utils.parseNumber(number);
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);
	  if (utils.anyIsError(number, x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Calculate power of modulus
	  var p = Math.pow(exports.IMABS(inumber), number);

	  // Calculate argument
	  var t = exports.IMARGUMENT(inumber);

	  // Return exponential of complex number
	  return exports.COMPLEX(p * Math.cos(number * t), p * Math.sin(number * t), unit);
	};

	exports.IMPRODUCT = function() {
	  // Initialize result
	  var result = arguments[0];

	  // Loop on all numbers
	  for (var i = 1; i < arguments.length; i++) {
	    // Lookup coefficients of two complex numbers
	    var a = exports.IMREAL(result);
	    var b = exports.IMAGINARY(result);
	    var c = exports.IMREAL(arguments[i]);
	    var d = exports.IMAGINARY(arguments[i]);

	    if (utils.anyIsError(a, b, c, d)) {
	      return error.value;
	    }

	    // Complute product of two complex numbers
	    result = exports.COMPLEX(a * c - b * d, a * d + b * c);
	  }

	  // Return product of complex numbers
	  return result;
	};

	exports.IMREAL = function(inumber) {
	  if (inumber === undefined || inumber === true || inumber === false) {
	    return error.value;
	  }

	  // Return 0 if inumber is equal to 0
	  if (inumber === 0 || inumber === '0') {
	    return 0;
	  }

	  // Handle special cases
	  if (['i', '+i', '1i', '+1i', '-i', '-1i', 'j', '+j', '1j', '+1j', '-j', '-1j'].indexOf(inumber) >= 0) {
	    return 0;
	  }

	  // Lookup sign
	  var plus = inumber.indexOf('+');
	  var minus = inumber.indexOf('-');
	  if (plus === 0) {
	    plus = inumber.indexOf('+', 1);
	  }
	  if (minus === 0) {
	    minus = inumber.indexOf('-', 1);
	  }

	  // Lookup imaginary unit
	  var last = inumber.substring(inumber.length - 1, inumber.length);
	  var unit = (last === 'i' || last === 'j');

	  if (plus >= 0 || minus >= 0) {
	    // Return error if imaginary unit is neither i nor j
	    if (!unit) {
	      return error.num;
	    }

	    // Return real coefficient of complex number
	    if (plus >= 0) {
	      return (isNaN(inumber.substring(0, plus)) || isNaN(inumber.substring(plus + 1, inumber.length - 1))) ?
	        error.num :
	        Number(inumber.substring(0, plus));
	    } else {
	      return (isNaN(inumber.substring(0, minus)) || isNaN(inumber.substring(minus + 1, inumber.length - 1))) ?
	        error.num :
	        Number(inumber.substring(0, minus));
	    }
	  } else {
	    if (unit) {
	      return (isNaN(inumber.substring(0, inumber.length - 1))) ? error.num : 0;
	    } else {
	      return (isNaN(inumber)) ? error.num : inumber;
	    }
	  }
	};

	exports.IMSEC = function(inumber) {
	  // Return error if inumber is a logical value
	  if (inumber === true || inumber === false) {
	    return error.value;
	  }

	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Return secant of complex number
	  return exports.IMDIV('1', exports.IMCOS(inumber));
	};

	exports.IMSECH = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Return hyperbolic secant of complex number
	  return exports.IMDIV('1', exports.IMCOSH(inumber));
	};

	exports.IMSIN = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return sine of complex number
	  return exports.COMPLEX(Math.sin(x) * (Math.exp(y) + Math.exp(-y)) / 2, Math.cos(x) * (Math.exp(y) - Math.exp(-y)) / 2, unit);
	};

	exports.IMSINH = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return hyperbolic sine of complex number
	  return exports.COMPLEX(Math.cos(y) * (Math.exp(x) - Math.exp(-x)) / 2, Math.sin(y) * (Math.exp(x) + Math.exp(-x)) / 2, unit);
	};

	exports.IMSQRT = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Calculate power of modulus
	  var s = Math.sqrt(exports.IMABS(inumber));

	  // Calculate argument
	  var t = exports.IMARGUMENT(inumber);

	  // Return exponential of complex number
	  return exports.COMPLEX(s * Math.cos(t / 2), s * Math.sin(t / 2), unit);
	};

	exports.IMCSC = function (inumber) {
	  // Return error if inumber is a logical value
	  if (inumber === true || inumber === false) {
	    return error.value;
	  }

	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  // Return error if either coefficient is not a number
	  if (utils.anyIsError(x, y)) {
	    return error.num;
	  }

	  // Return cosecant of complex number
	  return exports.IMDIV('1', exports.IMSIN(inumber));
	};

	exports.IMCSCH = function (inumber) {
	  // Return error if inumber is a logical value
	  if (inumber === true || inumber === false) {
	    return error.value;
	  }

	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  // Return error if either coefficient is not a number
	  if (utils.anyIsError(x, y)) {
	    return error.num;
	  }

	  // Return hyperbolic cosecant of complex number
	  return exports.IMDIV('1', exports.IMSINH(inumber));
	};

	exports.IMSUB = function(inumber1, inumber2) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var a = this.IMREAL(inumber1);
	  var b = this.IMAGINARY(inumber1);
	  var c = this.IMREAL(inumber2);
	  var d = this.IMAGINARY(inumber2);

	  if (utils.anyIsError(a, b, c, d)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit1 = inumber1.substring(inumber1.length - 1);
	  var unit2 = inumber2.substring(inumber2.length - 1);
	  var unit = 'i';
	  if (unit1 === 'j') {
	    unit = 'j';
	  } else if (unit2 === 'j') {
	    unit = 'j';
	  }

	  // Return _ of two complex numbers
	  return this.COMPLEX(a - c, b - d, unit);
	};

	exports.IMSUM = function() {
	  var args = utils.flatten(arguments);

	  // Initialize result
	  var result = args[0];

	  // Loop on all numbers
	  for (var i = 1; i < args.length; i++) {
	    // Lookup coefficients of two complex numbers
	    var a = this.IMREAL(result);
	    var b = this.IMAGINARY(result);
	    var c = this.IMREAL(args[i]);
	    var d = this.IMAGINARY(args[i]);

	    if (utils.anyIsError(a, b, c, d)) {
	      return error.value;
	    }

	    // Complute product of two complex numbers
	    result = this.COMPLEX(a + c, b + d);
	  }

	  // Return sum of complex numbers
	  return result;
	};

	exports.IMTAN = function(inumber) {
	  // Return error if inumber is a logical value
	  if (inumber === true || inumber === false) {
	    return error.value;
	  }

	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Return tangent of complex number
	  return this.IMDIV(this.IMSIN(inumber), this.IMCOS(inumber));
	};

	exports.OCT2BIN = function(number, places) {
	  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
	  if (!/^[0-7]{1,10}$/.test(number)) {
	    return error.num;
	  }

	  // Check if number is negative
	  var negative = (number.length === 10 && number.substring(0, 1) === '7') ? true : false;

	  // Convert octal number to decimal
	  var decimal = (negative) ? parseInt(number, 8) - 1073741824 : parseInt(number, 8);

	  // Return error if number is lower than -512 or greater than 511
	  if (decimal < -512 || decimal > 511) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character binary number if number is negative
	  if (negative) {
	    return '1' + text.REPT('0', 9 - (512 + decimal).toString(2).length) + (512 + decimal).toString(2);
	  }

	  // Convert decimal number to binary
	  var result = decimal.toString(2);

	  // Return binary number using the minimum number of characters necessary if places is undefined
	  if (typeof places === 'undefined') {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.OCT2DEC = function(number) {
	  // Return error if number is not octal or contains more than ten characters (10 digits)
	  if (!/^[0-7]{1,10}$/.test(number)) {
	    return error.num;
	  }

	  // Convert octal number to decimal
	  var decimal = parseInt(number, 8);

	  // Return decimal number
	  return (decimal >= 536870912) ? decimal - 1073741824 : decimal;
	};

	exports.OCT2HEX = function(number, places) {
	  // Return error if number is not octal or contains more than ten characters (10 digits)
	  if (!/^[0-7]{1,10}$/.test(number)) {
	    return error.num;
	  }

	  // Convert octal number to decimal
	  var decimal = parseInt(number, 8);

	  // Ignore places and return a 10-character octal number if number is negative
	  if (decimal >= 536870912) {
	    return 'ff' + (decimal + 3221225472).toString(16);
	  }

	  // Convert decimal number to hexadecimal
	  var result = decimal.toString(16);

	  // Return hexadecimal number using the minimum number of characters necessary if places is undefined
	  if (places === undefined) {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var M = Math;
	function _horner(arr, v) { return arr.reduce(function(z,w){return v * z + w;},0); };
	function _bessel_iter(x, n, f0, f1, sign) {
	  if(!sign) sign = -1;
	  var tdx = 2 / x, f2;
	  if(n === 0) return f0;
	  if(n === 1) return f1;
	  for(var o = 1; o != n; ++o) {
	    f2 = f1 * o * tdx + sign * f0;
	    f0 = f1; f1 = f2;
	  }
	  return f1;
	}
	function _bessel_wrap(bessel0, bessel1, name, nonzero, sign) {
	  return function bessel(x,n) {
	    if(n === 0) return bessel0(x);
	    if(n === 1) return bessel1(x);
	    if(n < 0) throw name + ': Order (' + n + ') must be nonnegative';
	    if(nonzero == 1 && x === 0) throw name + ': Undefined when x == 0';
	    if(nonzero == 2 && x <= 0) throw name + ': Undefined when x <= 0';
	    var b0 = bessel0(x), b1 = bessel1(x);
	    return _bessel_iter(x, n, b0, b1, sign);
	  };
	}
	var besselj = (function() {
	  var b0_a1a = [57568490574.0,-13362590354.0,651619640.7,-11214424.18,77392.33017,-184.9052456].reverse();
	  var b0_a2a = [57568490411.0,1029532985.0,9494680.718,59272.64853,267.8532712,1.0].reverse();
	  var b0_a1b = [1.0, -0.1098628627e-2, 0.2734510407e-4, -0.2073370639e-5, 0.2093887211e-6].reverse();
	  var b0_a2b = [-0.1562499995e-1, 0.1430488765e-3, -0.6911147651e-5, 0.7621095161e-6, -0.934935152e-7].reverse();
	  var W = 0.636619772; // 2 / Math.PI

	  function bessel0(x) {
	    var a, a1, a2, y = x * x, xx = M.abs(x) - 0.785398164;
	    if(M.abs(x) < 8) {
	      a1 = _horner(b0_a1a, y);
	      a2 = _horner(b0_a2a, y);
	      a = a1/a2;
	    }
	    else {
	      y = 64 / y;
	      a1 = _horner(b0_a1b, y);
	      a2 = _horner(b0_a2b, y);
	      a = M.sqrt(W/M.abs(x))*(M.cos(xx)*a1-M.sin(xx)*a2*8/M.abs(x));
	    }
	    return a;
	  }
	  var b1_a1a = [72362614232.0,-7895059235.0,242396853.1,-2972611.439, 15704.48260, -30.16036606].reverse();
	  var b1_a2a = [144725228442.0, 2300535178.0, 18583304.74, 99447.43394, 376.9991397, 1.0].reverse();
	  var b1_a1b = [1.0, 0.183105e-2, -0.3516396496e-4, 0.2457520174e-5, -0.240337019e-6].reverse();
	  var b1_a2b = [0.04687499995, -0.2002690873e-3, 0.8449199096e-5, -0.88228987e-6, 0.105787412e-6].reverse();
	  function bessel1(x) {
	    var a, a1, a2, y = x*x, xx = M.abs(x) - 2.356194491;
	    if(Math.abs(x)< 8) {
	      a1 = x*_horner(b1_a1a, y);
	      a2 = _horner(b1_a2a, y);
	      a = a1 / a2;
	    } else {
	      y = 64 / y;
	      a1=_horner(b1_a1b, y);
	      a2=_horner(b1_a2b, y);
	      a=M.sqrt(W/M.abs(x))*(M.cos(xx)*a1-M.sin(xx)*a2*8/M.abs(x));
	      if(x < 0) a = -a;
	    }
	    return a;
	  }
	  return function besselj(x, n) {
	    n = Math.round(n);
	    if(n === 0) return bessel0(M.abs(x));
	    if(n === 1) return bessel1(M.abs(x));
	    if(n < 0) throw 'BESSELJ: Order (' + n + ') must be nonnegative';
	    if(M.abs(x) === 0) return 0;

	    var ret, j, tox = 2 / M.abs(x), m, jsum, sum, bjp, bj, bjm;
	    if(M.abs(x) > n) {
	      ret = _bessel_iter(x, n, bessel0(M.abs(x)), bessel1(M.abs(x)),-1);
	    } else {
	      m=2*M.floor((n+M.floor(M.sqrt(40*n)))/2);
	      jsum=0;
	      bjp=ret=sum=0.0;
	      bj=1.0;
	      for (j=m;j>0;j--) {
	        bjm=j*tox*bj-bjp;
	        bjp=bj;
	        bj=bjm;
	        if (M.abs(bj) > 1E10) {
	          bj *= 1E-10;
	          bjp *= 1E-10;
	          ret *= 1E-10;
	          sum *= 1E-10;
	        }
	        if (jsum) sum += bj;
	        jsum=!jsum;
	        if (j == n) ret=bjp;
	      }
	      sum=2.0*sum-bj;
	      ret /= sum;
	    }
	    return x < 0 && (n%2) ? -ret : ret;
	  };
	})();
	var bessely = (function() {
	  var b0_a1a = [-2957821389.0, 7062834065.0, -512359803.6, 10879881.29, -86327.92757, 228.4622733].reverse();
	  var b0_a2a = [40076544269.0, 745249964.8, 7189466.438, 47447.26470, 226.1030244, 1.0].reverse();
	  var b0_a1b = [1.0, -0.1098628627e-2, 0.2734510407e-4, -0.2073370639e-5, 0.2093887211e-6].reverse();
	  var b0_a2b = [-0.1562499995e-1, 0.1430488765e-3, -0.6911147651e-5, 0.7621095161e-6, -0.934945152e-7].reverse();

	  var W = 0.636619772;
	  function bessel0(x) {
	    var a, a1, a2, y = x * x, xx = x - 0.785398164;
	    if(x < 8) {
	      a1 = _horner(b0_a1a, y);
	      a2 = _horner(b0_a2a, y);
	      a = a1/a2 + W * besselj(x,0) * M.log(x);
	    } else {
	      y = 64 / y;
	      a1 = _horner(b0_a1b, y);
	      a2 = _horner(b0_a2b, y);
	      a = M.sqrt(W/x)*(M.sin(xx)*a1+M.cos(xx)*a2*8/x);
	    }
	    return a;
	  }

	  var b1_a1a = [-0.4900604943e13, 0.1275274390e13, -0.5153438139e11, 0.7349264551e9, -0.4237922726e7, 0.8511937935e4].reverse();
	  var b1_a2a = [0.2499580570e14, 0.4244419664e12, 0.3733650367e10, 0.2245904002e8, 0.1020426050e6, 0.3549632885e3, 1].reverse();
	  var b1_a1b = [1.0, 0.183105e-2, -0.3516396496e-4, 0.2457520174e-5, -0.240337019e-6].reverse();
	  var b1_a2b = [0.04687499995, -0.2002690873e-3, 0.8449199096e-5, -0.88228987e-6, 0.105787412e-6].reverse();
	  function bessel1(x) {
	    var a, a1, a2, y = x*x, xx = x - 2.356194491;
	    if(x < 8) {
	      a1 = x*_horner(b1_a1a, y);
	      a2 = _horner(b1_a2a, y);
	      a = a1/a2 + W * (besselj(x,1) * M.log(x) - 1 / x);
	    } else {
	      y = 64 / y;
	      a1=_horner(b1_a1b, y);
	      a2=_horner(b1_a2b, y);
	      a=M.sqrt(W/x)*(M.sin(xx)*a1+M.cos(xx)*a2*8/x);
	    }
	    return a;
	  }

	  return _bessel_wrap(bessel0, bessel1, 'BESSELY', 1, -1);
	})();
	var besseli = (function() {
	  var b0_a = [1.0, 3.5156229, 3.0899424, 1.2067492, 0.2659732, 0.360768e-1, 0.45813e-2].reverse();
	  var b0_b = [0.39894228, 0.1328592e-1, 0.225319e-2, -0.157565e-2, 0.916281e-2, -0.2057706e-1, 0.2635537e-1, -0.1647633e-1, 0.392377e-2].reverse();
	  function bessel0(x) {
	    if(x <= 3.75) return _horner(b0_a, x*x/(3.75*3.75));
	    return M.exp(M.abs(x))/M.sqrt(M.abs(x))*_horner(b0_b, 3.75/M.abs(x));
	  }

	  var b1_a = [0.5, 0.87890594, 0.51498869, 0.15084934, 0.2658733e-1, 0.301532e-2, 0.32411e-3].reverse();
	  var b1_b = [0.39894228, -0.3988024e-1, -0.362018e-2, 0.163801e-2, -0.1031555e-1, 0.2282967e-1, -0.2895312e-1, 0.1787654e-1, -0.420059e-2].reverse();
	  function bessel1(x) {
	    if(x < 3.75) return x * _horner(b1_a, x*x/(3.75*3.75));
	    return (x < 0 ? -1 : 1) * M.exp(M.abs(x))/M.sqrt(M.abs(x))*_horner(b1_b, 3.75/M.abs(x));
	  }

	  return function besseli(x, n) {
	    n = Math.round(n);
	    if(n === 0) return bessel0(x);
	    if(n == 1) return bessel1(x);
	    if(n < 0) throw 'BESSELI Order (' + n + ') must be nonnegative';
	    if(M.abs(x) === 0) return 0;

	    var ret, j, tox = 2 / M.abs(x), m, bip, bi, bim;
	    m=2*M.round((n+M.round(M.sqrt(40*n)))/2);
	    bip=ret=0.0;
	    bi=1.0;
	    for (j=m;j>0;j--) {
	      bim=j*tox*bi + bip;
	      bip=bi; bi=bim;
	      if (M.abs(bi) > 1E10) {
	        bi *= 1E-10;
	        bip *= 1E-10;
	        ret *= 1E-10;
	      }
	      if(j == n) ret = bip;
	    }
	    ret *= besseli(x, 0) / bi;
	    return x < 0 && (n%2) ? -ret : ret;
	  };

	})();

	var besselk = (function() {
	  var b0_a = [-0.57721566, 0.42278420, 0.23069756, 0.3488590e-1, 0.262698e-2, 0.10750e-3, 0.74e-5].reverse();
	  var b0_b = [1.25331414, -0.7832358e-1, 0.2189568e-1, -0.1062446e-1, 0.587872e-2, -0.251540e-2, 0.53208e-3].reverse();
	  function bessel0(x) {
	    if(x <= 2) return -M.log(x/2)*besseli(x,0) + _horner(b0_a, x*x/4);
	    return M.exp(-x)/M.sqrt(x)*_horner(b0_b, 2/x);
	  }

	  var b1_a = [1.0, 0.15443144, -0.67278579, -0.18156897, -0.1919402e-1, -0.110404e-2, -0.4686e-4].reverse();
	  var b1_b = [1.25331414, 0.23498619, -0.3655620e-1, 0.1504268e-1, -0.780353e-2, 0.325614e-2, -0.68245e-3].reverse();
	  function bessel1(x) {
	    if(x <= 2) return M.log(x/2)*besseli(x,1) + (1/x)*_horner(b1_a, x*x/4);
	    return M.exp(-x)/M.sqrt(x)*_horner(b1_b, 2/x);
	  }

	  return _bessel_wrap(bessel0, bessel1, 'BESSELK', 2, 1);
	})();
	if(true) {
	  exports.besselj = besselj;
	  exports.bessely = bessely;
	  exports.besseli = besseli;
	  exports.besselk = besselk;
	}



/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(5);
	var utils = __webpack_require__(4);

	var d1900 = new Date(1900, 0, 1);
	var WEEK_STARTS = [
	  undefined,
	  0,
	  1,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  1,
	  2,
	  3,
	  4,
	  5,
	  6,
	  0
	];
	var WEEK_TYPES = [
	  [],
	  [1, 2, 3, 4, 5, 6, 7],
	  [7, 1, 2, 3, 4, 5, 6],
	  [6, 0, 1, 2, 3, 4, 5],
	  [],
	  [],
	  [],
	  [],
	  [],
	  [],
	  [],
	  [7, 1, 2, 3, 4, 5, 6],
	  [6, 7, 1, 2, 3, 4, 5],
	  [5, 6, 7, 1, 2, 3, 4],
	  [4, 5, 6, 7, 1, 2, 3],
	  [3, 4, 5, 6, 7, 1, 2],
	  [2, 3, 4, 5, 6, 7, 1],
	  [1, 2, 3, 4, 5, 6, 7]
	];
	var WEEKEND_TYPES = [
	  [],
	  [6, 0],
	  [0, 1],
	  [1, 2],
	  [2, 3],
	  [3, 4],
	  [4, 5],
	  [5, 6],
	  undefined,
	  undefined,
	  undefined, [0, 0],
	  [1, 1],
	  [2, 2],
	  [3, 3],
	  [4, 4],
	  [5, 5],
	  [6, 6]
	];

	exports.DATE = function(year, month, day) {
	  year = utils.parseNumber(year);
	  month = utils.parseNumber(month);
	  day = utils.parseNumber(day);
	  if (utils.anyIsError(year, month, day)) {
	    return error.value;
	  }
	  if (year < 0 || month < 0 || day < 0) {
	    return error.num;
	  }
	  var date = new Date(year, month - 1, day);
	  return date;
	};

	exports.DATEVALUE = function(date_text) {
	  if (typeof date_text !== 'string') {
	    return error.value;
	  }
	  var date = Date.parse(date_text);
	  if (isNaN(date)) {
	    return error.value;
	  }
	  if (date <= -2203891200000) {
	    return (date - d1900) / 86400000 + 1;
	  }
	  return (date - d1900) / 86400000 + 2;
	};

	exports.DAY = function(serial_number) {
	  var date = utils.parseDate(serial_number);
	  if (date instanceof Error) {
	    return date;
	  }
	  return date.getDate();
	};

	exports.DAYS = function(end_date, start_date) {
	  end_date = utils.parseDate(end_date);
	  start_date = utils.parseDate(start_date);
	  if (end_date instanceof Error) {
	    return end_date;
	  }
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  return serial(end_date) - serial(start_date);
	};

	exports.DAYS360 = function(start_date, end_date, method) {
	  method = utils.parseBool(method);
	  start_date = utils.parseDate(start_date);
	  end_date = utils.parseDate(end_date);
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  if (end_date instanceof Error) {
	    return end_date;
	  }
	  if (method instanceof Error) {
	    return method;
	  }
	  var sm = start_date.getMonth();
	  var em = end_date.getMonth();
	  var sd, ed;
	  if (method) {
	    sd = start_date.getDate() === 31 ? 30 : start_date.getDate();
	    ed = end_date.getDate() === 31 ? 30 : end_date.getDate();
	  } else {
	    var smd = new Date(start_date.getFullYear(), sm + 1, 0).getDate();
	    var emd = new Date(end_date.getFullYear(), em + 1, 0).getDate();
	    sd = start_date.getDate() === smd ? 30 : start_date.getDate();
	    if (end_date.getDate() === emd) {
	      if (sd < 30) {
	        em++;
	        ed = 1;
	      } else {
	        ed = 30;
	      }
	    } else {
	      ed = end_date.getDate();
	    }
	  }
	  return 360 * (end_date.getFullYear() - start_date.getFullYear()) +
	    30 * (em - sm) + (ed - sd);
	};

	exports.EDATE = function(start_date, months) {
	  start_date = utils.parseDate(start_date);
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  if (isNaN(months)) {
	    return error.value;
	  }
	  months = parseInt(months, 10);
	  start_date.setMonth(start_date.getMonth() + months);
	  return serial(start_date);
	};

	exports.EOMONTH = function(start_date, months) {
	  start_date = utils.parseDate(start_date);
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  if (isNaN(months)) {
	    return error.value;
	  }
	  months = parseInt(months, 10);
	  return serial(new Date(start_date.getFullYear(), start_date.getMonth() + months + 1, 0));
	};

	exports.HOUR = function(serial_number) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  return serial_number.getHours();
	};

	exports.INTERVAL = function (second) {
	  if (typeof second !== 'number' && typeof second !== 'string') {
	    return error.value;
	  } else {
	    second = parseInt(second, 10);
	  }

	  var year  = Math.floor(second/946080000);
	  second    = second%946080000;
	  var month = Math.floor(second/2592000);
	  second    = second%2592000;
	  var day   = Math.floor(second/86400);
	  second    = second%86400;

	  var hour  = Math.floor(second/3600);
	  second    = second%3600;
	  var min   = Math.floor(second/60);
	  second    = second%60;
	  var sec   = second;

	  year  = (year  > 0) ? year  + 'Y' : '';
	  month = (month > 0) ? month + 'M' : '';
	  day   = (day   > 0) ? day   + 'D' : '';
	  hour  = (hour  > 0) ? hour  + 'H' : '';
	  min   = (min   > 0) ? min   + 'M' : '';
	  sec   = (sec   > 0) ? sec   + 'S' : '';

	  return 'P' + year + month + day +
	  'T' + hour + min + sec;
	};

	exports.ISOWEEKNUM = function(date) {
	  date = utils.parseDate(date);
	  if (date instanceof Error) {
	    return date;
	  }

	  date.setHours(0, 0, 0);
	  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
	  var yearStart = new Date(date.getFullYear(), 0, 1);
	  return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
	};

	exports.MINUTE = function(serial_number) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  return serial_number.getMinutes();
	};

	exports.MONTH = function(serial_number) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  return serial_number.getMonth() + 1;
	};

	exports.NETWORKDAYS = function(start_date, end_date, holidays) {
	  return this.NETWORKDAYS.INTL(start_date, end_date, 1, holidays);
	};

	exports.NETWORKDAYS.INTL = function(start_date, end_date, weekend, holidays) {
	  start_date = utils.parseDate(start_date);
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  end_date = utils.parseDate(end_date);
	  if (end_date instanceof Error) {
	    return end_date;
	  }
	  if (weekend === undefined) {
	    weekend = WEEKEND_TYPES[1];
	  } else {
	    weekend = WEEKEND_TYPES[weekend];
	  }
	  if (!(weekend instanceof Array)) {
	    return error.value;
	  }
	  if (holidays === undefined) {
	    holidays = [];
	  } else if (!(holidays instanceof Array)) {
	    holidays = [holidays];
	  }
	  for (var i = 0; i < holidays.length; i++) {
	    var h = utils.parseDate(holidays[i]);
	    if (h instanceof Error) {
	      return h;
	    }
	    holidays[i] = h;
	  }
	  var days = (end_date - start_date) / (1000 * 60 * 60 * 24) + 1;
	  var total = days;
	  var day = start_date;
	  for (i = 0; i < days; i++) {
	    var d = (new Date().getTimezoneOffset() > 0) ? day.getUTCDay() : day.getDay();
	    var dec = false;
	    if (d === weekend[0] || d === weekend[1]) {
	      dec = true;
	    }
	    for (var j = 0; j < holidays.length; j++) {
	      var holiday = holidays[j];
	      if (holiday.getDate() === day.getDate() &&
	        holiday.getMonth() === day.getMonth() &&
	        holiday.getFullYear() === day.getFullYear()) {
	        dec = true;
	        break;
	      }
	    }
	    if (dec) {
	      total--;
	    }
	    day.setDate(day.getDate() + 1);
	  }
	  return total;
	};

	exports.NOW = function() {
	  return new Date();
	};

	exports.SECOND = function(serial_number) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  return serial_number.getSeconds();
	};

	exports.TIME = function(hour, minute, second) {
	  hour = utils.parseNumber(hour);
	  minute = utils.parseNumber(minute);
	  second = utils.parseNumber(second);
	  if (utils.anyIsError(hour, minute, second)) {
	    return error.value;
	  }
	  if (hour < 0 || minute < 0 || second < 0) {
	    return error.num;
	  }
	  return (3600 * hour + 60 * minute + second) / 86400;
	};

	exports.TIMEVALUE = function(time_text) {
	  time_text = utils.parseDate(time_text);
	  if (time_text instanceof Error) {
	    return time_text;
	  }
	  return (3600 * time_text.getHours() +
	    60 * time_text.getMinutes() +
	    time_text.getSeconds()) / 86400;
	};

	exports.TODAY = function() {
	  return new Date();
	};

	exports.WEEKDAY = function(serial_number, return_type) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  if (return_type === undefined) {
	    return_type = 1;
	  }
	  var day = serial_number.getDay();
	  return WEEK_TYPES[return_type][day];
	};

	exports.WEEKNUM = function(serial_number, return_type) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  if (return_type === undefined) {
	    return_type = 1;
	  }
	  if (return_type === 21) {
	    return this.ISOWEEKNUM(serial_number);
	  }
	  var week_start = WEEK_STARTS[return_type];
	  var jan = new Date(serial_number.getFullYear(), 0, 1);
	  var inc = jan.getDay() < week_start ? 1 : 0;
	  jan -= Math.abs(jan.getDay() - week_start) * 24 * 60 * 60 * 1000;
	  return Math.floor(((serial_number - jan) / (1000 * 60 * 60 * 24)) / 7 + 1) + inc;
	};

	exports.WORKDAY = function(start_date, days, holidays) {
	  return this.WORKDAY.INTL(start_date, days, 1, holidays);
	};

	exports.WORKDAY.INTL = function(start_date, days, weekend, holidays) {
	  start_date = utils.parseDate(start_date);
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  days = utils.parseNumber(days);
	  if (days instanceof Error) {
	    return days;
	  }
	  if (days < 0) {
	    return error.num;
	  }
	  if (weekend === undefined) {
	    weekend = WEEKEND_TYPES[1];
	  } else {
	    weekend = WEEKEND_TYPES[weekend];
	  }
	  if (!(weekend instanceof Array)) {
	    return error.value;
	  }
	  if (holidays === undefined) {
	    holidays = [];
	  } else if (!(holidays instanceof Array)) {
	    holidays = [holidays];
	  }
	  for (var i = 0; i < holidays.length; i++) {
	    var h = utils.parseDate(holidays[i]);
	    if (h instanceof Error) {
	      return h;
	    }
	    holidays[i] = h;
	  }
	  var d = 0;
	  while (d < days) {
	    start_date.setDate(start_date.getDate() + 1);
	    var day = start_date.getDay();
	    if (day === weekend[0] || day === weekend[1]) {
	      continue;
	    }
	    for (var j = 0; j < holidays.length; j++) {
	      var holiday = holidays[j];
	      if (holiday.getDate() === start_date.getDate() &&
	        holiday.getMonth() === start_date.getMonth() &&
	        holiday.getFullYear() === start_date.getFullYear()) {
	        d--;
	        break;
	      }
	    }
	    d++;
	  }
	  return start_date;
	};

	exports.YEAR = function(serial_number) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  return serial_number.getFullYear();
	};

	function isLeapYear(year) {
	  return new Date(year, 1, 29).getMonth() === 1;
	}

	// TODO : Use DAYS ?
	function daysBetween(start_date, end_date) {
	  return Math.ceil((end_date - start_date) / 1000 / 60 / 60 / 24);
	}

	exports.YEARFRAC = function(start_date, end_date, basis) {
	  start_date = utils.parseDate(start_date);
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  end_date = utils.parseDate(end_date);
	  if (end_date instanceof Error) {
	    return end_date;
	  }

	  basis = basis || 0;
	  var sd = start_date.getDate();
	  var sm = start_date.getMonth() + 1;
	  var sy = start_date.getFullYear();
	  var ed = end_date.getDate();
	  var em = end_date.getMonth() + 1;
	  var ey = end_date.getFullYear();

	  switch (basis) {
	    case 0:
	      // US (NASD) 30/360
	      if (sd === 31 && ed === 31) {
	        sd = 30;
	        ed = 30;
	      } else if (sd === 31) {
	        sd = 30;
	      } else if (sd === 30 && ed === 31) {
	        ed = 30;
	      }
	      return ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / 360;
	    case 1:
	      // Actual/actual
	      var feb29Between = function(date1, date2) {
	        var year1 = date1.getFullYear();
	        var mar1year1 = new Date(year1, 2, 1);
	        if (isLeapYear(year1) && date1 < mar1year1 && date2 >= mar1year1) {
	          return true;
	        }
	        var year2 = date2.getFullYear();
	        var mar1year2 = new Date(year2, 2, 1);
	        return (isLeapYear(year2) && date2 >= mar1year2 && date1 < mar1year2);
	      };
	      var ylength = 365;
	      if (sy === ey || ((sy + 1) === ey) && ((sm > em) || ((sm === em) && (sd >= ed)))) {
	        if ((sy === ey && isLeapYear(sy)) ||
	            feb29Between(start_date, end_date) ||
	            (em === 1 && ed === 29)) {
	          ylength = 366;
	        }
	        return daysBetween(start_date, end_date) / ylength;
	      }
	      var years = (ey - sy) + 1;
	      var days = (new Date(ey + 1, 0, 1) - new Date(sy, 0, 1)) / 1000 / 60 / 60 / 24;
	      var average = days / years;
	      return daysBetween(start_date, end_date) / average;
	    case 2:
	      // Actual/360
	      return daysBetween(start_date, end_date) / 360;
	    case 3:
	      // Actual/365
	      return daysBetween(start_date, end_date) / 365;
	    case 4:
	      // European 30/360
	      return ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / 360;
	  }
	};

	function serial(date) {
	  var addOn = (date > -2203891200000)?2:1;
	  return (date - d1900) / 86400000 + addOn;
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(5);
	var stats = __webpack_require__(6);
	var maths = __webpack_require__(2);
	var utils = __webpack_require__(4);

	function compact(array) {
	  if (!array) { return array; }
	  var result = [];
	  for (var i = 0; i < array.length; ++i) {
	    if (!array[i]) { continue; }
	    result.push(array[i]);
	  }
	  return result;
	}

	exports.FINDFIELD = function(database, title) {
	  var index = null;
	  for (var i = 0; i < database.length; i++) {
	    if (database[i][0] === title) {
	      index = i;
	      break;
	    }
	  }

	  // Return error if the input field title is incorrect
	  if (index == null) {
	    return error.value;
	  }
	  return index;
	};

	function findResultIndex(database, criterias) {
	  var matches = {};
	  for (var i = 1; i < database[0].length; ++i) {
	    matches[i] = true;
	  }
	  var maxCriteriaLength = criterias[0].length;
	  for (i = 1; i < criterias.length; ++i) {
	    if (criterias[i].length > maxCriteriaLength) {
	      maxCriteriaLength = criterias[i].length;
	    }
	  }

	  for (var k = 1; k < database.length; ++k) {
	    for (var l = 1; l < database[k].length; ++l) {
	      var currentCriteriaResult = false;
	      var hasMatchingCriteria   = false;
	      for (var j = 0; j < criterias.length; ++j) {
	        var criteria = criterias[j];
	        if (criteria.length < maxCriteriaLength) {
	          continue;
	        }

	        var criteriaField = criteria[0];
	        if (database[k][0] !== criteriaField) {
	          continue;
	        }
	        hasMatchingCriteria = true;
	        for (var p = 1; p < criteria.length; ++p) {
	          currentCriteriaResult = currentCriteriaResult || eval(database[k][l] + criteria[p]);  // jshint ignore:line
	        }
	      }
	      if (hasMatchingCriteria) {
	        matches[l] = matches[l] && currentCriteriaResult;
	      }
	    }
	  }

	  var result = [];
	  for (var n = 0; n < database[0].length; ++n) {
	    if (matches[n]) {
	      result.push(n - 1);
	    }
	  }
	  return result;
	}

	// Database functions
	exports.DAVERAGE = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var sum = 0;
	  for (var i = 0; i < resultIndexes.length; i++) {
	    sum += targetFields[resultIndexes[i]];
	  }
	  return resultIndexes.length === 0 ? error.div0 : sum / resultIndexes.length;
	};

	exports.DCOUNT = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var targetValues = [];
	  for (var i = 0; i < resultIndexes.length; i++) {
	    targetValues[i] = targetFields[resultIndexes[i]];
	  }
	  return stats.COUNT(targetValues);
	};

	exports.DCOUNTA = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var targetValues = [];
	  for (var i = 0; i < resultIndexes.length; i++) {
	    targetValues[i] = targetFields[resultIndexes[i]];
	  }
	  return stats.COUNTA(targetValues);
	};

	exports.DGET = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  // Return error if no record meets the criteria
	  if (resultIndexes.length === 0) {
	    return error.value;
	  }
	  // Returns the #NUM! error value because more than one record meets the
	  // criteria
	  if (resultIndexes.length > 1) {
	    return error.num;
	  }

	  return targetFields[resultIndexes[0]];
	};

	exports.DMAX = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var maxValue = targetFields[resultIndexes[0]];
	  for (var i = 1; i < resultIndexes.length; i++) {
	    if (maxValue < targetFields[resultIndexes[i]]) {
	      maxValue = targetFields[resultIndexes[i]];
	    }
	  }
	  return maxValue;
	};

	exports.DMIN = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var minValue = targetFields[resultIndexes[0]];
	  for (var i = 1; i < resultIndexes.length; i++) {
	    if (minValue > targetFields[resultIndexes[i]]) {
	      minValue = targetFields[resultIndexes[i]];
	    }
	  }
	  return minValue;
	};

	exports.DPRODUCT = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var targetValues = [];
	  for (var i = 0; i < resultIndexes.length; i++) {
	    targetValues[i] = targetFields[resultIndexes[i]];
	  }
	  targetValues = compact(targetValues);
	  var result = 1;
	  for (i = 0; i < targetValues.length; i++) {
	    result *= targetValues[i];
	  }
	  return result;
	};

	exports.DSTDEV = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var targetValues = [];
	  for (var i = 0; i < resultIndexes.length; i++) {
	    targetValues[i] = targetFields[resultIndexes[i]];
	  }
	  targetValues = compact(targetValues);
	  return stats.STDEV.S(targetValues);
	};

	exports.DSTDEVP = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var targetValues = [];
	  for (var i = 0; i < resultIndexes.length; i++) {
	    targetValues[i] = targetFields[resultIndexes[i]];
	  }
	  targetValues = compact(targetValues);
	  return stats.STDEV.P(targetValues);
	};

	exports.DSUM = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var targetValues = [];
	  for (var i = 0; i < resultIndexes.length; i++) {
	    targetValues[i] = targetFields[resultIndexes[i]];
	  }
	  return maths.SUM(targetValues);
	};

	exports.DVAR = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var targetValues = [];
	  for (var i = 0; i < resultIndexes.length; i++) {
	    targetValues[i] = targetFields[resultIndexes[i]];
	  }
	  return stats.VAR.S(targetValues);
	};

	exports.DVARP = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var targetValues = [];
	  for (var i = 0; i < resultIndexes.length; i++) {
	    targetValues[i] = targetFields[resultIndexes[i]];
	  }
	  return stats.VAR.P(targetValues);
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(5);
	var utils = __webpack_require__(4);
	var information = __webpack_require__(11);

	exports.AND = function() {
	  var args = utils.flatten(arguments);
	  var result = true;
	  for (var i = 0; i < args.length; i++) {
	    if (!args[i]) {
	      result = false;
	    }
	  }
	  return result;
	};

	exports.CHOOSE = function() {
	  if (arguments.length < 2) {
	    return error.na;
	  }

	  var index = arguments[0];
	  if (index < 1 || index > 254) {
	    return error.value;
	  }

	  if (arguments.length < index + 1) {
	    return error.value;
	  }

	  return arguments[index];
	};

	exports.FALSE = function() {
	  return false;
	};

	exports.IF = function(test, then_value, otherwise_value) {
	  return test ? then_value : otherwise_value;
	};

	exports.IFERROR = function(value, valueIfError) {
	  if (information.ISERROR(value)) {
	    return valueIfError;
	  }
	  return value;
	};

	exports.IFNA = function(value, value_if_na) {
	  return value === error.na ? value_if_na : value;
	};

	exports.NOT = function(logical) {
	  return !logical;
	};

	exports.OR = function() {
	  var args = utils.flatten(arguments);
	  var result = false;
	  for (var i = 0; i < args.length; i++) {
	    if (args[i]) {
	      result = true;
	    }
	  }
	  return result;
	};

	exports.TRUE = function() {
	  return true;
	};

	exports.XOR = function() {
	  var args = utils.flatten(arguments);
	  var result = 0;
	  for (var i = 0; i < args.length; i++) {
	    if (args[i]) {
	      result++;
	    }
	  }
	  return (Math.floor(Math.abs(result)) & 1) ? true : false;
	};

	exports.SWITCH = function () {
	  var result;
	  if (arguments.length > 0)  {
	    var targetValue = arguments[0];
	    var argc = arguments.length - 1;
	    var switchCount = Math.floor(argc / 2);
	    var switchSatisfied = false;
	    var defaultClause = argc % 2 === 0 ? null : arguments[arguments.length - 1];

	    if (switchCount) {
	      for (var index = 0; index < switchCount; index++) {
	        if (targetValue === arguments[index * 2 + 1]) {
	          result = arguments[index * 2 + 2];
	          switchSatisfied = true;
	          break;
	        }
	      }
	    }

	    if (!switchSatisfied && defaultClause) {
	      result = defaultClause;
	    }
	  }

	  return result;
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(5);
	var dateTime = __webpack_require__(14);
	var utils = __webpack_require__(4);

	function validDate(d) {
	  return d && d.getTime && !isNaN(d.getTime());
	}

	function ensureDate(d) {
	  return (d instanceof Date)?d:new Date(d);
	}

	exports.ACCRINT = function(issue, first, settlement, rate, par, frequency, basis) {
	  // Return error if either date is invalid
	  issue      = ensureDate(issue);
	  first      = ensureDate(first);
	  settlement = ensureDate(settlement);
	  if (!validDate(issue) || !validDate(first) || !validDate(settlement)) {
	    return '#VALUE!';
	  }

	  // Return error if either rate or par are lower than or equal to zero
	  if (rate <= 0 || par <= 0) {
	    return '#NUM!';
	  }

	  // Return error if frequency is neither 1, 2, or 4
	  if ([1, 2, 4].indexOf(frequency) === -1) {
	    return '#NUM!';
	  }

	  // Return error if basis is neither 0, 1, 2, 3, or 4
	  if ([0, 1, 2, 3, 4].indexOf(basis) === -1) {
	    return '#NUM!';
	  }

	  // Return error if settlement is before or equal to issue
	  if (settlement <= issue) {
	    return '#NUM!';
	  }

	  // Set default values
	  par   = par   || 0;
	  basis = basis || 0;

	  // Compute accrued interest
	  return par * rate * dateTime.YEARFRAC(issue, settlement, basis);
	};

	// TODO
	exports.ACCRINTM = function() {
	 throw new Error('ACCRINTM is not implemented');
	};

	// TODO
	exports.AMORDEGRC = function() {
	 throw new Error('AMORDEGRC is not implemented');
	};

	// TODO
	exports.AMORLINC = function() {
	 throw new Error('AMORLINC is not implemented');
	};

	// TODO
	exports.COUPDAYBS = function() {
	 throw new Error('COUPDAYBS is not implemented');
	};

	// TODO
	exports.COUPDAYS = function() {
	 throw new Error('COUPDAYS is not implemented');
	};

	// TODO
	exports.COUPDAYSNC = function() {
	 throw new Error('COUPDAYSNC is not implemented');
	};

	// TODO
	exports.COUPNCD = function() {
	 throw new Error('COUPNCD is not implemented');
	};

	// TODO
	exports.COUPNUM = function() {
	 throw new Error('COUPNUM is not implemented');
	};

	// TODO
	exports.COUPPCD = function() {
	 throw new Error('COUPPCD is not implemented');
	};

	exports.CUMIPMT = function(rate, periods, value, start, end, type) {
	  // Credits: algorithm inspired by Apache OpenOffice
	  // Credits: Hannes Stiebitzhofer for the translations of function and variable names
	  // Requires exports.FV() and exports.PMT() from exports.js [http://stoic.com/exports/]

	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  value = utils.parseNumber(value);
	  if (utils.anyIsError(rate, periods, value)) {
	    return error.value;
	  }

	  // Return error if either rate, periods, or value are lower than or equal to zero
	  if (rate <= 0 || periods <= 0 || value <= 0) {
	    return error.num;
	  }

	  // Return error if start < 1, end < 1, or start > end
	  if (start < 1 || end < 1 || start > end) {
	    return error.num;
	  }

	  // Return error if type is neither 0 nor 1
	  if (type !== 0 && type !== 1) {
	    return error.num;
	  }

	  // Compute cumulative interest
	  var payment = exports.PMT(rate, periods, value, 0, type);
	  var interest = 0;

	  if (start === 1) {
	    if (type === 0) {
	      interest = -value;
	      start++;
	    }
	  }

	  for (var i = start; i <= end; i++) {
	    if (type === 1) {
	      interest += exports.FV(rate, i - 2, payment, value, 1) - payment;
	    } else {
	      interest += exports.FV(rate, i - 1, payment, value, 0);
	    }
	  }
	  interest *= rate;

	  // Return cumulative interest
	  return interest;
	};

	exports.CUMPRINC = function(rate, periods, value, start, end, type) {
	  // Credits: algorithm inspired by Apache OpenOffice
	  // Credits: Hannes Stiebitzhofer for the translations of function and variable names

	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  value = utils.parseNumber(value);
	  if (utils.anyIsError(rate, periods, value)) {
	    return error.value;
	  }

	  // Return error if either rate, periods, or value are lower than or equal to zero
	  if (rate <= 0 || periods <= 0 || value <= 0) {
	    return error.num;
	  }

	  // Return error if start < 1, end < 1, or start > end
	  if (start < 1 || end < 1 || start > end) {
	    return error.num;
	  }

	  // Return error if type is neither 0 nor 1
	  if (type !== 0 && type !== 1) {
	    return error.num;
	  }

	  // Compute cumulative principal
	  var payment = exports.PMT(rate, periods, value, 0, type);
	  var principal = 0;
	  if (start === 1) {
	    if (type === 0) {
	      principal = payment + value * rate;
	    } else {
	      principal = payment;
	    }
	    start++;
	  }
	  for (var i = start; i <= end; i++) {
	    if (type > 0) {
	      principal += payment - (exports.FV(rate, i - 2, payment, value, 1) - payment) * rate;
	    } else {
	      principal += payment - exports.FV(rate, i - 1, payment, value, 0) * rate;
	    }
	  }

	  // Return cumulative principal
	  return principal;
	};

	exports.DB = function(cost, salvage, life, period, month) {
	  // Initialize month
	  month = (month === undefined) ? 12 : month;

	  cost = utils.parseNumber(cost);
	  salvage = utils.parseNumber(salvage);
	  life = utils.parseNumber(life);
	  period = utils.parseNumber(period);
	  month = utils.parseNumber(month);
	  if (utils.anyIsError(cost, salvage, life, period, month)) {
	    return error.value;
	  }

	  // Return error if any of the parameters is negative
	  if (cost < 0 || salvage < 0 || life < 0 || period < 0) {
	    return error.num;
	  }

	  // Return error if month is not an integer between 1 and 12
	  if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].indexOf(month) === -1) {
	    return error.num;
	  }

	  // Return error if period is greater than life
	  if (period > life) {
	    return error.num;
	  }

	  // Return 0 (zero) if salvage is greater than or equal to cost
	  if (salvage >= cost) {
	    return 0;
	  }

	  // Rate is rounded to three decimals places
	  var rate = (1 - Math.pow(salvage / cost, 1 / life)).toFixed(3);

	  // Compute initial depreciation
	  var initial = cost * rate * month / 12;

	  // Compute total depreciation
	  var total = initial;
	  var current = 0;
	  var ceiling = (period === life) ? life - 1 : period;
	  for (var i = 2; i <= ceiling; i++) {
	    current = (cost - total) * rate;
	    total += current;
	  }

	  // Depreciation for the first and last periods are special cases
	  if (period === 1) {
	    // First period
	    return initial;
	  } else if (period === life) {
	    // Last period
	    return (cost - total) * rate;
	  } else {
	    return current;
	  }
	};

	exports.DDB = function(cost, salvage, life, period, factor) {
	  // Initialize factor
	  factor = (factor === undefined) ? 2 : factor;

	  cost = utils.parseNumber(cost);
	  salvage = utils.parseNumber(salvage);
	  life = utils.parseNumber(life);
	  period = utils.parseNumber(period);
	  factor = utils.parseNumber(factor);
	  if (utils.anyIsError(cost, salvage, life, period, factor)) {
	    return error.value;
	  }

	  // Return error if any of the parameters is negative or if factor is null
	  if (cost < 0 || salvage < 0 || life < 0 || period < 0 || factor <= 0) {
	    return error.num;
	  }

	  // Return error if period is greater than life
	  if (period > life) {
	    return error.num;
	  }

	  // Return 0 (zero) if salvage is greater than or equal to cost
	  if (salvage >= cost) {
	    return 0;
	  }

	  // Compute depreciation
	  var total = 0;
	  var current = 0;
	  for (var i = 1; i <= period; i++) {
	    current = Math.min((cost - total) * (factor / life), (cost - salvage - total));
	    total += current;
	  }

	  // Return depreciation
	  return current;
	};

	// TODO
	exports.DISC = function() {
	 throw new Error('DISC is not implemented');
	};

	exports.DOLLARDE = function(dollar, fraction) {
	  // Credits: algorithm inspired by Apache OpenOffice

	  dollar = utils.parseNumber(dollar);
	  fraction = utils.parseNumber(fraction);
	  if (utils.anyIsError(dollar, fraction)) {
	    return error.value;
	  }

	  // Return error if fraction is negative
	  if (fraction < 0) {
	    return error.num;
	  }

	  // Return error if fraction is greater than or equal to 0 and less than 1
	  if (fraction >= 0 && fraction < 1) {
	    return error.div0;
	  }

	  // Truncate fraction if it is not an integer
	  fraction = parseInt(fraction, 10);

	  // Compute integer part
	  var result = parseInt(dollar, 10);

	  // Add decimal part
	  result += (dollar % 1) * Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN10)) / fraction;

	  // Round result
	  var power = Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN2) + 1);
	  result = Math.round(result * power) / power;

	  // Return converted dollar price
	  return result;
	};

	exports.DOLLARFR = function(dollar, fraction) {
	  // Credits: algorithm inspired by Apache OpenOffice

	  dollar = utils.parseNumber(dollar);
	  fraction = utils.parseNumber(fraction);
	  if (utils.anyIsError(dollar, fraction)) {
	    return error.value;
	  }

	  // Return error if fraction is negative
	  if (fraction < 0) {
	    return error.num;
	  }

	  // Return error if fraction is greater than or equal to 0 and less than 1
	  if (fraction >= 0 && fraction < 1) {
	    return error.div0;
	  }

	  // Truncate fraction if it is not an integer
	  fraction = parseInt(fraction, 10);

	  // Compute integer part
	  var result = parseInt(dollar, 10);

	  // Add decimal part
	  result += (dollar % 1) * Math.pow(10, -Math.ceil(Math.log(fraction) / Math.LN10)) * fraction;

	  // Return converted dollar price
	  return result;
	};

	// TODO
	exports.DURATION = function() {
	 throw new Error('DURATION is not implemented');
	};

	exports.EFFECT = function(rate, periods) {
	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  if (utils.anyIsError(rate, periods)) {
	    return error.value;
	  }

	  // Return error if rate <=0 or periods < 1
	  if (rate <= 0 || periods < 1) {
	    return error.num;
	  }

	  // Truncate periods if it is not an integer
	  periods = parseInt(periods, 10);

	  // Return effective annual interest rate
	  return Math.pow(1 + rate / periods, periods) - 1;
	};

	exports.FV = function(rate, periods, payment, value, type) {
	  // Credits: algorithm inspired by Apache OpenOffice

	  value = value || 0;
	  type = type || 0;

	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  payment = utils.parseNumber(payment);
	  value = utils.parseNumber(value);
	  type = utils.parseNumber(type);
	  if (utils.anyIsError(rate, periods, payment, value, type)) {
	    return error.value;
	  }

	  // Return future value
	  var result;
	  if (rate === 0) {
	    result = value + payment * periods;
	  } else {
	    var term = Math.pow(1 + rate, periods);
	    if (type === 1) {
	      result = value * term + payment * (1 + rate) * (term - 1) / rate;
	    } else {
	      result = value * term + payment * (term - 1) / rate;
	    }
	  }
	  return -result;
	};

	exports.FVSCHEDULE = function(principal, schedule) {
	  principal = utils.parseNumber(principal);
	  schedule = utils.parseNumberArray(utils.flatten(schedule));
	  if (utils.anyIsError(principal, schedule)) {
	    return error.value;
	  }

	  var n = schedule.length;
	  var future = principal;

	  // Apply all interests in schedule
	  for (var i = 0; i < n; i++) {
	    // Apply scheduled interest
	    future *= 1 + schedule[i];
	  }

	  // Return future value
	  return future;
	};

	// TODO
	exports.INTRATE = function() {
	 throw new Error('INTRATE is not implemented');
	};

	exports.IPMT = function(rate, period, periods, present, future, type) {
	  // Credits: algorithm inspired by Apache OpenOffice

	  future = future || 0;
	  type = type || 0;

	  rate = utils.parseNumber(rate);
	  period = utils.parseNumber(period);
	  periods = utils.parseNumber(periods);
	  present = utils.parseNumber(present);
	  future = utils.parseNumber(future);
	  type = utils.parseNumber(type);
	  if (utils.anyIsError(rate, period, periods, present, future, type)) {
	    return error.value;
	  }

	  // Compute payment
	  var payment = exports.PMT(rate, periods, present, future, type);

	  // Compute interest
	  var interest;
	  if (period === 1) {
	    if (type === 1) {
	      interest = 0;
	    } else {
	      interest = -present;
	    }
	  } else {
	    if (type === 1) {
	      interest = exports.FV(rate, period - 2, payment, present, 1) - payment;
	    } else {
	      interest = exports.FV(rate, period - 1, payment, present, 0);
	    }
	  }

	  // Return interest
	  return interest * rate;
	};

	exports.IRR = function(values, guess) {
	  // Credits: algorithm inspired by Apache OpenOffice

	  guess = guess || 0;

	  values = utils.parseNumberArray(utils.flatten(values));
	  guess = utils.parseNumber(guess);
	  if (utils.anyIsError(values, guess)) {
	    return error.value;
	  }

	  // Calculates the resulting amount
	  var irrResult = function(values, dates, rate) {
	    var r = rate + 1;
	    var result = values[0];
	    for (var i = 1; i < values.length; i++) {
	      result += values[i] / Math.pow(r, (dates[i] - dates[0]) / 365);
	    }
	    return result;
	  };

	  // Calculates the first derivation
	  var irrResultDeriv = function(values, dates, rate) {
	    var r = rate + 1;
	    var result = 0;
	    for (var i = 1; i < values.length; i++) {
	      var frac = (dates[i] - dates[0]) / 365;
	      result -= frac * values[i] / Math.pow(r, frac + 1);
	    }
	    return result;
	  };

	  // Initialize dates and check that values contains at least one positive value and one negative value
	  var dates = [];
	  var positive = false;
	  var negative = false;
	  for (var i = 0; i < values.length; i++) {
	    dates[i] = (i === 0) ? 0 : dates[i - 1] + 365;
	    if (values[i] > 0) {
	      positive = true;
	    }
	    if (values[i] < 0) {
	      negative = true;
	    }
	  }

	  // Return error if values does not contain at least one positive value and one negative value
	  if (!positive || !negative) {
	    return error.num;
	  }

	  // Initialize guess and resultRate
	  guess = (guess === undefined) ? 0.1 : guess;
	  var resultRate = guess;

	  // Set maximum epsilon for end of iteration
	  var epsMax = 1e-10;

	  // Implement Newton's method
	  var newRate, epsRate, resultValue;
	  var contLoop = true;
	  do {
	    resultValue = irrResult(values, dates, resultRate);
	    newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
	    epsRate = Math.abs(newRate - resultRate);
	    resultRate = newRate;
	    contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
	  } while (contLoop);

	  // Return internal rate of return
	  return resultRate;
	};

	exports.ISPMT = function(rate, period, periods, value) {
	  rate = utils.parseNumber(rate);
	  period = utils.parseNumber(period);
	  periods = utils.parseNumber(periods);
	  value = utils.parseNumber(value);
	  if (utils.anyIsError(rate, period, periods, value)) {
	    return error.value;
	  }

	  // Return interest
	  return value * rate * (period / periods - 1);
	};

	// TODO
	exports.MDURATION = function() {
	 throw new Error('MDURATION is not implemented');
	};

	exports.MIRR = function(values, finance_rate, reinvest_rate) {
	  values = utils.parseNumberArray(utils.flatten(values));
	  finance_rate = utils.parseNumber(finance_rate);
	  reinvest_rate = utils.parseNumber(reinvest_rate);
	  if (utils.anyIsError(values, finance_rate, reinvest_rate)) {
	    return error.value;
	  }

	  // Initialize number of values
	  var n = values.length;

	  // Lookup payments (negative values) and incomes (positive values)
	  var payments = [];
	  var incomes = [];
	  for (var i = 0; i < n; i++) {
	    if (values[i] < 0) {
	      payments.push(values[i]);
	    } else {
	      incomes.push(values[i]);
	    }
	  }

	  // Return modified internal rate of return
	  var num = -exports.NPV(reinvest_rate, incomes) * Math.pow(1 + reinvest_rate, n - 1);
	  var den = exports.NPV(finance_rate, payments) * (1 + finance_rate);
	  return Math.pow(num / den, 1 / (n - 1)) - 1;
	};

	exports.NOMINAL = function(rate, periods) {
	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  if (utils.anyIsError(rate, periods)) {
	    return error.value;
	  }

	  // Return error if rate <=0 or periods < 1
	  if (rate <= 0 || periods < 1) {
	    return error.num;
	  }

	  // Truncate periods if it is not an integer
	  periods = parseInt(periods, 10);

	  // Return nominal annual interest rate
	  return (Math.pow(rate + 1, 1 / periods) - 1) * periods;
	};

	exports.NPER = function(rate, payment, present, future, type) {
	  type = (type === undefined) ? 0 : type;
	  future = (future === undefined) ? 0 : future;

	  rate = utils.parseNumber(rate);
	  payment = utils.parseNumber(payment);
	  present = utils.parseNumber(present);
	  future = utils.parseNumber(future);
	  type = utils.parseNumber(type);
	  if (utils.anyIsError(rate, payment, present, future, type)) {
	    return error.value;
	  }

	  // Return number of periods
	  var num = payment * (1 + rate * type) - future * rate;
	  var den = (present * rate + payment * (1 + rate * type));
	  return Math.log(num / den) / Math.log(1 + rate);
	};

	exports.NPV = function() {
	  var args = utils.parseNumberArray(utils.flatten(arguments));
	  if (args instanceof Error) {
	    return args;
	  }

	  // Lookup rate
	  var rate = args[0];

	  // Initialize net present value
	  var value = 0;

	  // Loop on all values
	  for (var j = 1; j < args.length; j++) {
	    value += args[j] / Math.pow(1 + rate, j);
	  }

	  // Return net present value
	  return value;
	};

	// TODO
	exports.ODDFPRICE = function() {
	 throw new Error('ODDFPRICE is not implemented');
	};

	// TODO
	exports.ODDFYIELD = function() {
	 throw new Error('ODDFYIELD is not implemented');
	};

	// TODO
	exports.ODDLPRICE = function() {
	 throw new Error('ODDLPRICE is not implemented');
	};

	// TODO
	exports.ODDLYIELD = function() {
	 throw new Error('ODDLYIELD is not implemented');
	};

	exports.PDURATION = function(rate, present, future) {
	  rate = utils.parseNumber(rate);
	  present = utils.parseNumber(present);
	  future = utils.parseNumber(future);
	  if (utils.anyIsError(rate, present, future)) {
	    return error.value;
	  }

	  // Return error if rate <=0
	  if (rate <= 0) {
	    return error.num;
	  }

	  // Return number of periods
	  return (Math.log(future) - Math.log(present)) / Math.log(1 + rate);
	};

	exports.PMT = function(rate, periods, present, future, type) {
	  // Credits: algorithm inspired by Apache OpenOffice

	  future = future || 0;
	  type = type || 0;

	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  present = utils.parseNumber(present);
	  future = utils.parseNumber(future);
	  type = utils.parseNumber(type);
	  if (utils.anyIsError(rate, periods, present, future, type)) {
	    return error.value;
	  }

	  // Return payment
	  var result;
	  if (rate === 0) {
	    result = (present + future) / periods;
	  } else {
	    var term = Math.pow(1 + rate, periods);
	    if (type === 1) {
	      result = (future * rate / (term - 1) + present * rate / (1 - 1 / term)) / (1 + rate);
	    } else {
	      result = future * rate / (term - 1) + present * rate / (1 - 1 / term);
	    }
	  }
	  return -result;
	};

	exports.PPMT = function(rate, period, periods, present, future, type) {
	  future = future || 0;
	  type = type || 0;

	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  present = utils.parseNumber(present);
	  future = utils.parseNumber(future);
	  type = utils.parseNumber(type);
	  if (utils.anyIsError(rate, periods, present, future, type)) {
	    return error.value;
	  }

	  return exports.PMT(rate, periods, present, future, type) - exports.IPMT(rate, period, periods, present, future, type);
	};

	// TODO
	exports.PRICE = function() {
	 throw new Error('PRICE is not implemented');
	};

	// TODO
	exports.PRICEDISC = function() {
	 throw new Error('PRICEDISC is not implemented');
	};

	// TODO
	exports.PRICEMAT = function() {
	 throw new Error('PRICEMAT is not implemented');
	};

	exports.PV = function(rate, periods, payment, future, type) {
	  future = future || 0;
	  type = type || 0;

	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  payment = utils.parseNumber(payment);
	  future = utils.parseNumber(future);
	  type = utils.parseNumber(type);
	  if (utils.anyIsError(rate, periods, payment, future, type)) {
	    return error.value;
	  }

	  // Return present value
	  if (rate === 0) {
	    return -payment * periods - future;
	  } else {
	    return (((1 - Math.pow(1 + rate, periods)) / rate) * payment * (1 + rate * type) - future) / Math.pow(1 + rate, periods);
	  }
	};

	exports.RATE = function(periods, payment, present, future, type, guess) {
	  // Credits: rabugento

	  guess = (guess === undefined) ? 0.01 : guess;
	  future = (future === undefined) ? 0 : future;
	  type = (type === undefined) ? 0 : type;

	  periods = utils.parseNumber(periods);
	  payment = utils.parseNumber(payment);
	  present = utils.parseNumber(present);
	  future = utils.parseNumber(future);
	  type = utils.parseNumber(type);
	  guess = utils.parseNumber(guess);
	  if (utils.anyIsError(periods, payment, present, future, type, guess)) {
	    return error.value;
	  }

	  // Set maximum epsilon for end of iteration
	  var epsMax = 1e-6;

	  // Set maximum number of iterations
	  var iterMax = 100;
	  var iter = 0;
	  var close = false;
	  var rate = guess;

	  while (iter < iterMax && !close) {
	    var t1 = Math.pow(rate + 1, periods);
	    var t2 = Math.pow(rate + 1, periods - 1);

	    var f1 = future + t1 * present + payment * (t1 - 1) * (rate * type + 1) / rate;
	    var f2 = periods * t2 * present - payment * (t1 - 1) *(rate * type + 1) / Math.pow(rate,2);
	    var f3 = periods * payment * t2 * (rate * type + 1) / rate + payment * (t1 - 1) * type / rate;

	    var newRate = rate - f1 / (f2 + f3);

	    if (Math.abs(newRate - rate) < epsMax) close = true;
	    iter++
	    rate = newRate;
	  }

	  if (!close) return Number.NaN + rate;
	  return rate;
	};

	// TODO
	exports.RECEIVED = function() {
	 throw new Error('RECEIVED is not implemented');
	};

	exports.RRI = function(periods, present, future) {
	  periods = utils.parseNumber(periods);
	  present = utils.parseNumber(present);
	  future = utils.parseNumber(future);
	  if (utils.anyIsError(periods, present, future)) {
	    return error.value;
	  }

	  // Return error if periods or present is equal to 0 (zero)
	  if (periods === 0 || present === 0) {
	    return error.num;
	  }

	  // Return equivalent interest rate
	  return Math.pow(future / present, 1 / periods) - 1;
	};

	exports.SLN = function(cost, salvage, life) {
	  cost = utils.parseNumber(cost);
	  salvage = utils.parseNumber(salvage);
	  life = utils.parseNumber(life);
	  if (utils.anyIsError(cost, salvage, life)) {
	    return error.value;
	  }

	  // Return error if life equal to 0 (zero)
	  if (life === 0) {
	    return error.num;
	  }

	  // Return straight-line depreciation
	  return (cost - salvage) / life;
	};

	exports.SYD = function(cost, salvage, life, period) {
	  // Return error if any of the parameters is not a number
	  cost = utils.parseNumber(cost);
	  salvage = utils.parseNumber(salvage);
	  life = utils.parseNumber(life);
	  period = utils.parseNumber(period);
	  if (utils.anyIsError(cost, salvage, life, period)) {
	    return error.value;
	  }

	  // Return error if life equal to 0 (zero)
	  if (life === 0) {
	    return error.num;
	  }

	  // Return error if period is lower than 1 or greater than life
	  if (period < 1 || period > life) {
	    return error.num;
	  }

	  // Truncate period if it is not an integer
	  period = parseInt(period, 10);

	  // Return straight-line depreciation
	  return ((cost - salvage) * (life - period + 1) * 2) / (life * (life + 1));
	};

	exports.TBILLEQ = function(settlement, maturity, discount) {
	  settlement = utils.parseDate(settlement);
	  maturity = utils.parseDate(maturity);
	  discount = utils.parseNumber(discount);
	  if (utils.anyIsError(settlement, maturity, discount)) {
	    return error.value;
	  }

	  // Return error if discount is lower than or equal to zero
	  if (discount <= 0) {
	    return error.num;
	  }

	  // Return error if settlement is greater than maturity
	  if (settlement > maturity) {
	    return error.num;
	  }

	  // Return error if maturity is more than one year after settlement
	  if (maturity - settlement > 365 * 24 * 60 * 60 * 1000) {
	    return error.num;
	  }

	  // Return bond-equivalent yield
	  return (365 * discount) / (360 - discount * dateTime.DAYS360(settlement, maturity, false));
	};

	exports.TBILLPRICE = function(settlement, maturity, discount) {
	  settlement = utils.parseDate(settlement);
	  maturity = utils.parseDate(maturity);
	  discount = utils.parseNumber(discount);
	  if (utils.anyIsError(settlement, maturity, discount)) {
	    return error.value;
	  }

	  // Return error if discount is lower than or equal to zero
	  if (discount <= 0) {
	    return error.num;
	  }

	  // Return error if settlement is greater than maturity
	  if (settlement > maturity) {
	    return error.num;
	  }

	  // Return error if maturity is more than one year after settlement
	  if (maturity - settlement > 365 * 24 * 60 * 60 * 1000) {
	    return error.num;
	  }

	  // Return bond-equivalent yield
	  return 100 * (1 - discount * dateTime.DAYS360(settlement, maturity, false) / 360);
	};

	exports.TBILLYIELD = function(settlement, maturity, price) {
	  settlement = utils.parseDate(settlement);
	  maturity = utils.parseDate(maturity);
	  price = utils.parseNumber(price);
	  if (utils.anyIsError(settlement, maturity, price)) {
	    return error.value;
	  }

	  // Return error if price is lower than or equal to zero
	  if (price <= 0) {
	    return error.num;
	  }

	  // Return error if settlement is greater than maturity
	  if (settlement > maturity) {
	    return error.num;
	  }

	  // Return error if maturity is more than one year after settlement
	  if (maturity - settlement > 365 * 24 * 60 * 60 * 1000) {
	    return error.num;
	  }

	  // Return bond-equivalent yield
	  return (100 - price) * 360 / (price * dateTime.DAYS360(settlement, maturity, false));
	};

	// TODO
	exports.VDB = function() {
	 throw new Error('VDB is not implemented');
	};


	exports.XIRR = function(values, dates, guess) {
	  // Credits: algorithm inspired by Apache OpenOffice

	  values = utils.parseNumberArray(utils.flatten(values));
	  dates = utils.parseDateArray(utils.flatten(dates));
	  guess = utils.parseNumber(guess);
	  if (utils.anyIsError(values, dates, guess)) {
	    return error.value;
	  }

	  // Calculates the resulting amount
	  var irrResult = function(values, dates, rate) {
	    var r = rate + 1;
	    var result = values[0];
	    for (var i = 1; i < values.length; i++) {
	      result += values[i] / Math.pow(r, dateTime.DAYS(dates[i], dates[0]) / 365);
	    }
	    return result;
	  };

	  // Calculates the first derivation
	  var irrResultDeriv = function(values, dates, rate) {
	    var r = rate + 1;
	    var result = 0;
	    for (var i = 1; i < values.length; i++) {
	      var frac = dateTime.DAYS(dates[i], dates[0]) / 365;
	      result -= frac * values[i] / Math.pow(r, frac + 1);
	    }
	    return result;
	  };

	  // Check that values contains at least one positive value and one negative value
	  var positive = false;
	  var negative = false;
	  for (var i = 0; i < values.length; i++) {
	    if (values[i] > 0) {
	      positive = true;
	    }
	    if (values[i] < 0) {
	      negative = true;
	    }
	  }

	  // Return error if values does not contain at least one positive value and one negative value
	  if (!positive || !negative) {
	    return error.num;
	  }

	  // Initialize guess and resultRate
	  guess = guess || 0.1;
	  var resultRate = guess;

	  // Set maximum epsilon for end of iteration
	  var epsMax = 1e-10;

	  // Implement Newton's method
	  var newRate, epsRate, resultValue;
	  var contLoop = true;
	  do {
	    resultValue = irrResult(values, dates, resultRate);
	    newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
	    epsRate = Math.abs(newRate - resultRate);
	    resultRate = newRate;
	    contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
	  } while (contLoop);

	  // Return internal rate of return
	  return resultRate;
	};

	exports.XNPV = function(rate, values, dates) {
	  rate = utils.parseNumber(rate);
	  values = utils.parseNumberArray(utils.flatten(values));
	  dates = utils.parseDateArray(utils.flatten(dates));
	  if (utils.anyIsError(rate, values, dates)) {
	    return error.value;
	  }

	  var result = 0;
	  for (var i = 0; i < values.length; i++) {
	    result += values[i] / Math.pow(1 + rate, dateTime.DAYS(dates[i], dates[0]) / 365);
	  }
	  return result;
	};

	// TODO
	exports.YIELD = function() {
	 throw new Error('YIELD is not implemented');
	};

	// TODO
	exports.YIELDDISC = function() {
	 throw new Error('YIELDDISC is not implemented');
	};

	// TODO
	exports.YIELDMAT = function() {
	 throw new Error('YIELDMAT is not implemented');
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(5);

	exports.MATCH = function(lookupValue, lookupArray, matchType) {
	  if (!lookupValue && !lookupArray) {
	    return error.na;
	  }

	  if (arguments.length === 2) {
	    matchType = 1;
	  }
	  if (!(lookupArray instanceof Array)) {
	    return error.na;
	  }

	  if (matchType !== -1 && matchType !== 0 && matchType !== 1) {
	    return error.na;
	  }
	  var index;
	  var indexValue;
	  for (var idx = 0; idx < lookupArray.length; idx++) {
	    if (matchType === 1) {
	      if (lookupArray[idx] === lookupValue) {
	        return idx + 1;
	      } else if (lookupArray[idx] < lookupValue) {
	        if (!indexValue) {
	          index = idx + 1;
	          indexValue = lookupArray[idx];
	        } else if (lookupArray[idx] > indexValue) {
	          index = idx + 1;
	          indexValue = lookupArray[idx];
	        }
	      }
	    } else if (matchType === 0) {
	      if (typeof lookupValue === 'string') {
	        lookupValue = lookupValue.replace(/\?/g, '.');
	        if (lookupArray[idx].toLowerCase().match(lookupValue.toLowerCase())) {
	          return idx + 1;
	        }
	      } else {
	        if (lookupArray[idx] === lookupValue) {
	          return idx + 1;
	        }
	      }
	    } else if (matchType === -1) {
	      if (lookupArray[idx] === lookupValue) {
	        return idx + 1;
	      } else if (lookupArray[idx] > lookupValue) {
	        if (!indexValue) {
	          index = idx + 1;
	          indexValue = lookupArray[idx];
	        } else if (lookupArray[idx] < indexValue) {
	          index = idx + 1;
	          indexValue = lookupArray[idx];
	        }
	      }
	    }
	  }

	  return index ? index : error.na;
	};

/***/ }
/******/ ])
});
;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/formulajs-connect\\node_modules\\formulajs\\dist\\formula.js","/formulajs-connect\\node_modules\\formulajs\\dist",undefined)
},{"_process":38,"buffer":36,"jStat":5,"numeral":6,"numeric":7}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
this.j$ = this.jStat = (function(Math, undefined) {

// For quick reference.
var concat = Array.prototype.concat;
var slice = Array.prototype.slice;
var toString = Object.prototype.toString;

// Calculate correction for IEEE error
// TODO: This calculation can be improved.
function calcRdx(n, m) {
  var val = n > m ? n : m;
  return Math.pow(10,
                  17 - ~~(Math.log(((val > 0) ? val : -val)) * Math.LOG10E));
}


var isArray = Array.isArray || function isArray(arg) {
  return toString.call(arg) === '[object Array]';
};


function isFunction(arg) {
  return toString.call(arg) === '[object Function]';
}


function isNumber(arg) {
  return typeof arg === 'number' && arg === arg;
}


// Converts the jStat matrix to vector.
function toVector(arr) {
  return concat.apply([], arr);
}


// The one and only jStat constructor.
function jStat() {
  return new jStat._init(arguments);
}


// TODO: Remove after all references in src files have been removed.
jStat.fn = jStat.prototype;


// By separating the initializer from the constructor it's easier to handle
// always returning a new instance whether "new" was used or not.
jStat._init = function _init(args) {
  var i;

  // If first argument is an array, must be vector or matrix.
  if (isArray(args[0])) {
    // Check if matrix.
    if (isArray(args[0][0])) {
      // See if a mapping function was also passed.
      if (isFunction(args[1]))
        args[0] = jStat.map(args[0], args[1]);
      // Iterate over each is faster than this.push.apply(this, args[0].
      for (i = 0; i < args[0].length; i++)
        this[i] = args[0][i];
      this.length = args[0].length;

    // Otherwise must be a vector.
    } else {
      this[0] = isFunction(args[1]) ? jStat.map(args[0], args[1]) : args[0];
      this.length = 1;
    }

  // If first argument is number, assume creation of sequence.
  } else if (isNumber(args[0])) {
    this[0] = jStat.seq.apply(null, args);
    this.length = 1;

  // Handle case when jStat object is passed to jStat.
  } else if (args[0] instanceof jStat) {
    // Duplicate the object and pass it back.
    return jStat(args[0].toArray());

  // Unexpected argument value, return empty jStat object.
  // TODO: This is strange behavior. Shouldn't this throw or some such to let
  // the user know they had bad arguments?
  } else {
    this[0] = [];
    this.length = 1;
  }

  return this;
};
jStat._init.prototype = jStat.prototype;
jStat._init.constructor = jStat;


// Utility functions.
// TODO: for internal use only?
jStat.utils = {
  calcRdx: calcRdx,
  isArray: isArray,
  isFunction: isFunction,
  isNumber: isNumber,
  toVector: toVector
};


// Easily extend the jStat object.
// TODO: is this seriously necessary?
jStat.extend = function extend(obj) {
  var i, j;

  if (arguments.length === 1) {
    for (j in obj)
      jStat[j] = obj[j];
    return this;
  }

  for (i = 1; i < arguments.length; i++) {
    for (j in arguments[i])
      obj[j] = arguments[i][j];
  }

  return obj;
};


// Returns the number of rows in the matrix.
jStat.rows = function rows(arr) {
  return arr.length || 1;
};


// Returns the number of columns in the matrix.
jStat.cols = function cols(arr) {
  return arr[0].length || 1;
};


// Returns the dimensions of the object { rows: i, cols: j }
jStat.dimensions = function dimensions(arr) {
  return {
    rows: jStat.rows(arr),
    cols: jStat.cols(arr)
  };
};


// Returns a specified row as a vector
jStat.row = function row(arr, index) {
  return arr[index];
};


// Returns the specified column as a vector
jStat.col = function cols(arr, index) {
  var column = new Array(arr.length);
  for (var i = 0; i < arr.length; i++)
    column[i] = [arr[i][index]];
  return column;
};


// Returns the diagonal of the matrix
jStat.diag = function diag(arr) {
  var nrow = jStat.rows(arr);
  var res = new Array(nrow);
  for (var row = 0; row < nrow; row++)
    res[row] = [arr[row][row]];
  return res;
};


// Returns the anti-diagonal of the matrix
jStat.antidiag = function antidiag(arr) {
  var nrow = jStat.rows(arr) - 1;
  var res = new Array(nrow);
  for (var i = 0; nrow >= 0; nrow--, i++)
    res[i] = [arr[i][nrow]];
  return res;
};

// Transpose a matrix or array.
jStat.transpose = function transpose(arr) {
  var obj = [];
  var objArr, rows, cols, j, i;

  // Make sure arr is in matrix format.
  if (!isArray(arr[0]))
    arr = [arr];

  rows = arr.length;
  cols = arr[0].length;

  for (i = 0; i < cols; i++) {
    objArr = new Array(rows);
    for (j = 0; j < rows; j++)
      objArr[j] = arr[j][i];
    obj.push(objArr);
  }

  // If obj is vector, return only single array.
  return obj.length === 1 ? obj[0] : obj;
};


// Map a function to an array or array of arrays.
// "toAlter" is an internal variable.
jStat.map = function map(arr, func, toAlter) {
  var row, nrow, ncol, res, col;

  if (!isArray(arr[0]))
    arr = [arr];

  nrow = arr.length;
  ncol = arr[0].length;
  res = toAlter ? arr : new Array(nrow);

  for (row = 0; row < nrow; row++) {
    // if the row doesn't exist, create it
    if (!res[row])
      res[row] = new Array(ncol);
    for (col = 0; col < ncol; col++)
      res[row][col] = func(arr[row][col], row, col);
  }

  return res.length === 1 ? res[0] : res;
};


// Destructively alter an array.
jStat.alter = function alter(arr, func) {
  return jStat.map(arr, func, true);
};


// Generate a rows x cols matrix according to the supplied function.
jStat.create = function  create(rows, cols, func) {
  var res = new Array(rows);
  var i, j;

  if (isFunction(cols)) {
    func = cols;
    cols = rows;
  }

  for (i = 0; i < rows; i++) {
    res[i] = new Array(cols);
    for (j = 0; j < cols; j++)
      res[i][j] = func(i, j);
  }

  return res;
};


function retZero() { return 0; }


// Generate a rows x cols matrix of zeros.
jStat.zeros = function zeros(rows, cols) {
  if (!isNumber(cols))
    cols = rows;
  return jStat.create(rows, cols, retZero);
};


function retOne() { return 1; }


// Generate a rows x cols matrix of ones.
jStat.ones = function ones(rows, cols) {
  if (!isNumber(cols))
    cols = rows;
  return jStat.create(rows, cols, retOne);
};


// Generate a rows x cols matrix of uniformly random numbers.
jStat.rand = function rand(rows, cols) {
  if (!isNumber(cols))
    cols = rows;
  return jStat.create(rows, cols, Math.random);
};


function retIdent(i, j) { return i === j ? 1 : 0; }


// Generate an identity matrix of size row x cols.
jStat.identity = function identity(rows, cols) {
  if (!isNumber(cols))
    cols = rows;
  return jStat.create(rows, cols, retIdent);
};


// Tests whether a matrix is symmetric
jStat.symmetric = function symmetric(arr) {
  var issymmetric = true;
  var size = arr.length;
  var row, col;

  if (arr.length !== arr[0].length)
    return false;

  for (row = 0; row < size; row++) {
    for (col = 0; col < size; col++)
      if (arr[col][row] !== arr[row][col])
        return false;
  }

  return true;
};


// Set all values to zero.
jStat.clear = function clear(arr) {
  return jStat.alter(arr, retZero);
};


// Generate sequence.
jStat.seq = function seq(min, max, length, func) {
  if (!isFunction(func))
    func = false;

  var arr = [];
  var hival = calcRdx(min, max);
  var step = (max * hival - min * hival) / ((length - 1) * hival);
  var current = min;
  var cnt;

  // Current is assigned using a technique to compensate for IEEE error.
  // TODO: Needs better implementation.
  for (cnt = 0;
       current <= max;
       cnt++, current = (min * hival + step * hival * cnt) / hival) {
    arr.push((func ? func(current, cnt) : current));
  }

  return arr;
};


// TODO: Go over this entire implementation. Seems a tragic waste of resources
// doing all this work. Instead, and while ugly, use new Function() to generate
// a custom function for each static method.

// Quick reference.
var jProto = jStat.prototype;

// Default length.
jProto.length = 0;

// For internal use only.
// TODO: Check if they're actually used, and if they are then rename them
// to _*
jProto.push = Array.prototype.push;
jProto.sort = Array.prototype.sort;
jProto.splice = Array.prototype.splice;
jProto.slice = Array.prototype.slice;


// Return a clean array.
jProto.toArray = function toArray() {
  return this.length > 1 ? slice.call(this) : slice.call(this)[0];
};


// Map a function to a matrix or vector.
jProto.map = function map(func, toAlter) {
  return jStat(jStat.map(this, func, toAlter));
};


// Destructively alter an array.
jProto.alter = function alter(func) {
  jStat.alter(this, func);
  return this;
};


// Extend prototype with methods that have no argument.
(function(funcs) {
  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
    jProto[passfunc] = function(func) {
      var self = this,
      results;
      // Check for callback.
      if (func) {
        setTimeout(function() {
          func.call(self, jProto[passfunc].call(self));
        });
        return this;
      }
      results = jStat[passfunc](this);
      return isArray(results) ? jStat(results) : results;
    };
  })(funcs[i]);
})('transpose clear symmetric rows cols dimensions diag antidiag'.split(' '));


// Extend prototype with methods that have one argument.
(function(funcs) {
  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
    jProto[passfunc] = function(index, func) {
      var self = this;
      // check for callback
      if (func) {
        setTimeout(function() {
          func.call(self, jProto[passfunc].call(self, index));
        });
        return this;
      }
      return jStat(jStat[passfunc](this, index));
    };
  })(funcs[i]);
})('row col'.split(' '));


// Extend prototype with simple shortcut methods.
(function(funcs) {
  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
    jProto[passfunc] = new Function(
        'return jStat(jStat.' + passfunc + '.apply(null, arguments));');
  })(funcs[i]);
})('create zeros ones rand identity'.split(' '));


// Exposing jStat.
return jStat;

}(Math));
(function(jStat, Math) {

var isFunction = jStat.utils.isFunction;

// Ascending functions for sort
function ascNum(a, b) { return a - b; }

function clip(arg, min, max) {
  return Math.max(min, Math.min(arg, max));
}


// sum of an array
jStat.sum = function sum(arr) {
  var sum = 0;
  var i = arr.length;
  var tmp;
  while (--i >= 0)
    sum += arr[i];
  return sum;
};


// sum squared
jStat.sumsqrd = function sumsqrd(arr) {
  var sum = 0;
  var i = arr.length;
  while (--i >= 0)
    sum += arr[i] * arr[i];
  return sum;
};


// sum of squared errors of prediction (SSE)
jStat.sumsqerr = function sumsqerr(arr) {
  var mean = jStat.mean(arr);
  var sum = 0;
  var i = arr.length;
  var tmp;
  while (--i >= 0) {
    tmp = arr[i] - mean;
    sum += tmp * tmp;
  }
  return sum;
};


// product of an array
jStat.product = function product(arr) {
  var prod = 1;
  var i = arr.length;
  while (--i >= 0)
    prod *= arr[i];
  return prod;
};


// minimum value of an array
jStat.min = function min(arr) {
  var low = arr[0];
  var i = 0;
  while (++i < arr.length)
    if (arr[i] < low)
      low = arr[i];
  return low;
};


// maximum value of an array
jStat.max = function max(arr) {
  var high = arr[0];
  var i = 0;
  while (++i < arr.length)
    if (arr[i] > high)
      high = arr[i];
  return high;
};


// mean value of an array
jStat.mean = function mean(arr) {
  return jStat.sum(arr) / arr.length;
};


// mean squared error (MSE)
jStat.meansqerr = function meansqerr(arr) {
  return jStat.sumsqerr(arr) / arr.length;
};


// geometric mean of an array
jStat.geomean = function geomean(arr) {
  return Math.pow(jStat.product(arr), 1 / arr.length);
};


// median of an array
jStat.median = function median(arr) {
  var arrlen = arr.length;
  var _arr = arr.slice().sort(ascNum);
  // check if array is even or odd, then return the appropriate
  return !(arrlen & 1)
    ? (_arr[(arrlen / 2) - 1 ] + _arr[(arrlen / 2)]) / 2
    : _arr[(arrlen / 2) | 0 ];
};


// cumulative sum of an array
jStat.cumsum = function cumsum(arr) {
  var len = arr.length;
  var sums = new Array(len);
  var i;
  sums[0] = arr[0];
  for (i = 1; i < len; i++)
    sums[i] = sums[i - 1] + arr[i];
  return sums;
};


// successive differences of a sequence
jStat.diff = function diff(arr) {
  var diffs = [];
  var arrLen = arr.length;
  var i;
  for (i = 1; i < arrLen; i++)
    diffs.push(arr[i] - arr[i - 1]);
  return diffs;
};


// mode of an array
// if there are multiple modes of an array, return all of them
// is this the appropriate way of handling it?
jStat.mode = function mode(arr) {
  var arrLen = arr.length;
  var _arr = arr.slice().sort(ascNum);
  var count = 1;
  var maxCount = 0;
  var numMaxCount = 0;
  var mode_arr = [];
  var i;

  for (i = 0; i < arrLen; i++) {
    if (_arr[i] === _arr[i + 1]) {
      count++;
    } else {
      if (count > maxCount) {
        mode_arr = [_arr[i]];
        maxCount = count;
        numMaxCount = 0;
      }
      // are there multiple max counts
      else if (count === maxCount) {
        mode_arr.push(_arr[i]);
        numMaxCount++;
      }
      // resetting count for new value in array
      count = 1;
    }
  }

  return numMaxCount === 0 ? mode_arr[0] : mode_arr;
};


// range of an array
jStat.range = function range(arr) {
  return jStat.max(arr) - jStat.min(arr);
};

// variance of an array
// flag indicates population vs sample
jStat.variance = function variance(arr, flag) {
  return jStat.sumsqerr(arr) / (arr.length - (flag ? 1 : 0));
};


// standard deviation of an array
// flag indicates population vs sample
jStat.stdev = function stdev(arr, flag) {
  return Math.sqrt(jStat.variance(arr, flag));
};


// mean deviation (mean absolute deviation) of an array
jStat.meandev = function meandev(arr) {
  var devSum = 0;
  var mean = jStat.mean(arr);
  var i;
  for (i = arr.length - 1; i >= 0; i--)
    devSum += Math.abs(arr[i] - mean);
  return devSum / arr.length;
};


// median deviation (median absolute deviation) of an array
jStat.meddev = function meddev(arr) {
  var devSum = 0;
  var median = jStat.median(arr);
  var i;
  for (i = arr.length - 1; i >= 0; i--)
    devSum += Math.abs(arr[i] - median);
  return devSum / arr.length;
};


// coefficient of variation
jStat.coeffvar = function coeffvar(arr) {
  return jStat.stdev(arr) / jStat.mean(arr);
};


// quartiles of an array
jStat.quartiles = function quartiles(arr) {
  var arrlen = arr.length;
  var _arr = arr.slice().sort(ascNum);
  return [
    _arr[ Math.round((arrlen) / 4) - 1 ],
    _arr[ Math.round((arrlen) / 2) - 1 ],
    _arr[ Math.round((arrlen) * 3 / 4) - 1 ]
  ];
};


// Arbitary quantiles of an array. Direct port of the scipy.stats
// implementation by Pierre GF Gerard-Marchant.
jStat.quantiles = function quantiles(arr, quantilesArray, alphap, betap) {
  var sortedArray = arr.slice().sort(ascNum);
  var quantileVals = [quantilesArray.length];
  var n = arr.length;
  var i, p, m, aleph, k, gamma;

  if (typeof alphap === 'undefined')
    alphap = 3 / 8;
  if (typeof betap === 'undefined')
    betap = 3 / 8;

  for (i = 0; i < quantilesArray.length; i++) {
    p = quantilesArray[i];
    m = alphap + p * (1 - alphap - betap);
    aleph = n * p + m;
    k = Math.floor(clip(aleph, 1, n - 1));
    gamma = clip(aleph - k, 0, 1);
    quantileVals[i] = (1 - gamma) * sortedArray[k - 1] + gamma * sortedArray[k];
  }

  return quantileVals;
};

// The percentile rank of score in a given array. Returns the percentage
// of all values in the input array that are less than (kind='strict') or
// less or equal than (kind='weak') score. Default is weak.
jStat.percentileOfScore = function percentileOfScore(arr, score, kind) {
  var counter = 0;
  var len = arr.length;
  var strict = false;
  var value, i;

  if (kind === 'strict')
    strict = true;

  for (i = 0; i < len; i++) {
    value = arr[i];
    if ((strict && value < score) ||
        (!strict && value <= score)) {
      counter++;
    }
  }

  return counter / len;
};

// covariance of two arrays
jStat.covariance = function covariance(arr1, arr2) {
  var u = jStat.mean(arr1);
  var v = jStat.mean(arr2);
  var arr1Len = arr1.length;
  var sq_dev = new Array(arr1Len);
  var i;

  for (i = 0; i < arr1Len; i++)
    sq_dev[i] = (arr1[i] - u) * (arr2[i] - v);

  return jStat.sum(sq_dev) / (arr1Len - 1);
};


// (pearson's) population correlation coefficient, rho
jStat.corrcoeff = function corrcoeff(arr1, arr2) {
  return jStat.covariance(arr1, arr2) /
      jStat.stdev(arr1, 1) /
      jStat.stdev(arr2, 1);
};


var jProto = jStat.prototype;


// Extend jProto with method for calculating cumulative sums, as it does not
// run again in case of true.
// If a matrix is passed, automatically assume operation should be done on the
// columns.
jProto.cumsum = function(fullbool, func) {
  var arr = [];
  var i = 0;
  var tmpthis = this;

  // Assignment reassignation depending on how parameters were passed in.
  if (isFunction(fullbool)) {
    func = fullbool;
    fullbool = false;
  }

  // Check if a callback was passed with the function.
  if (func) {
    setTimeout(function() {
      func.call(tmpthis, jProto.cumsum.call(tmpthis, fullbool));
    });
    return this;
  }

  // Check if matrix and run calculations.
  if (this.length > 1) {
    tmpthis = fullbool === true ? this : this.transpose();
    for (; i < tmpthis.length; i++)
      arr[i] = jStat.cumsum(tmpthis[i]);
    return arr;
  }

  return jStat.cumsum(this[0], fullbool);
};


// Extend jProto with methods which don't require arguments and work on columns.
(function(funcs) {
  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
    // If a matrix is passed, automatically assume operation should be done on
    // the columns.
    jProto[passfunc] = function(fullbool, func) {
      var arr = [];
      var i = 0;
      var tmpthis = this;
      // Assignment reassignation depending on how parameters were passed in.
      if (isFunction(fullbool)) {
        func = fullbool;
        fullbool = false;
      }
      // Check if a callback was passed with the function.
      if (func) {
        setTimeout(function() {
          func.call(tmpthis, jProto[passfunc].call(tmpthis, fullbool));
        });
        return this;
      }
      // Check if matrix and run calculations.
      if (this.length > 1) {
        tmpthis = fullbool === true ? this : this.transpose();
        for (; i < tmpthis.length; i++)
          arr[i] = jStat[passfunc](tmpthis[i]);
        return fullbool === true
            ? jStat[passfunc](jStat.utils.toVector(arr))
            : arr;
      }
      // Pass fullbool if only vector, not a matrix. for variance and stdev.
      return jStat[passfunc](this[0], fullbool);
    };
  })(funcs[i]);
})(('sum sumsqrd sumsqerr product min max mean meansqerr geomean median diff ' +
    'mode range variance stdev meandev meddev coeffvar quartiles').split(' '));


// Extend jProto with functions that take arguments. Operations on matrices are
// done on columns.
(function(funcs) {
  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
    jProto[passfunc] = function() {
      var arr = [];
      var i = 0;
      var tmpthis = this;
      var args = Array.prototype.slice.call(arguments);

      // If the last argument is a function, we assume it's a callback; we
      // strip the callback out and call the function again.
      if (isFunction(args[args.length - 1])) {
        var callbackFunction = args[args.length - 1];
        var argsToPass = args.slice(0, args.length - 1);

        setTimeout(function() {
          callbackFunction.call(tmpthis,
                                jProto[passfunc].apply(tmpthis, argsToPass));
        });
        return this;

      // Otherwise we curry the function args and call normally.
      } else {
        var callbackFunction = undefined;
        var curriedFunction = function curriedFunction(vector) {
          return jStat[passfunc].apply(tmpthis, [vector].concat(args));
        }
      }

      // If this is a matrix, run column-by-column.
      if (this.length > 1) {
        tmpthis = tmpthis.transpose();
        for (; i < tmpthis.length; i++)
          arr[i] = curriedFunction(tmpthis[i]);
        return arr;
      }

      // Otherwise run on the vector.
      return curriedFunction(this[0]);
    };
  })(funcs[i]);
})('quantiles percentileOfScore'.split(' '));

}(this.jStat, Math));
// Special functions //
(function(jStat, Math) {

// Log-gamma function
jStat.gammaln = function gammaln(x) {
  var j = 0;
  var cof = [
    76.18009172947146, -86.50532032941677, 24.01409824083091,
    -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5
  ];
  var ser = 1.000000000190015;
  var xx, y, tmp;
  tmp = (y = xx = x) + 5.5;
  tmp -= (xx + 0.5) * Math.log(tmp);
  for (; j < 6; j++)
    ser += cof[j] / ++y;
  return Math.log(2.5066282746310005 * ser / xx) - tmp;
};


// gamma of x
jStat.gammafn = function gammafn(x) {
  var p = [-1.716185138865495, 24.76565080557592, -379.80425647094563,
           629.3311553128184, 866.9662027904133, -31451.272968848367,
           -36144.413418691176, 66456.14382024054
  ];
  var q = [-30.8402300119739, 315.35062697960416, -1015.1563674902192,
           -3107.771671572311, 22538.118420980151, 4755.8462775278811,
           -134659.9598649693, -115132.2596755535];
  var fact = false;
  var n = 0;
  var xden = 0;
  var xnum = 0;
  var y = x;
  var i, z, yi, res, sum, ysq;
  if (y <= 0) {
    res = y % 1 + 3.6e-16;
    if (res) {
      fact = (!(y & 1) ? 1 : -1) * Math.PI / Math.sin(Math.PI * res);
      y = 1 - y;
    } else {
      return Infinity;
    }
  }
  yi = y;
  if (y < 1) {
    z = y++;
  } else {
    z = (y -= n = (y | 0) - 1) - 1;
  }
  for (i = 0; i < 8; ++i) {
    xnum = (xnum + p[i]) * z;
    xden = xden * z + q[i];
  }
  res = xnum / xden + 1;
  if (yi < y) {
    res /= yi;
  } else if (yi > y) {
    for (i = 0; i < n; ++i) {
      res *= y;
      y++;
    }
  }
  if (fact) {
    res = fact / res;
  }
  return res;
};


// lower incomplete gamma function P(a,x)
jStat.gammap = function gammap(a, x) {
  var aln = jStat.gammaln(a);
  var ap = a;
  var sum = 1 / a;
  var del = sum;
  var b = x + 1 - a;
  var c = 1 / 1.0e-30;
  var d = 1 / b;
  var h = d;
  var i = 1;
  // calculate maximum number of itterations required for a
  var ITMAX = -~(Math.log((a >= 1) ? a : 1 / a) * 8.5 + a * 0.4 + 17);
  var an, endval;

  if (x < 0 || a <= 0) {
    return NaN;
  } else if (x < a + 1) {
    for (; i <= ITMAX; i++) {
      sum += del *= x / ++ap;
    }
    return sum * Math.exp(-x + a * Math.log(x) - (aln));
  }

  for (; i <= ITMAX; i++) {
    an = -i * (i - a);
    b += 2;
    d = an * d + b;
    c = b + an / c;
    d = 1 / d;
    h *= d * c;
  }

  return 1 - h * Math.exp(-x + a * Math.log(x) - (aln));
};


// natural log factorial of n
jStat.factorialln = function factorialln(n) {
  return n < 0 ? NaN : jStat.gammaln(n + 1);
};

// factorial of n
jStat.factorial = function factorial(n) {
  return n < 0 ? NaN : jStat.gammafn(n + 1);
};

// combinations of n, m
jStat.combination = function combination(n, m) {
  // make sure n or m don't exceed the upper limit of usable values
  return (n > 170 || m > 170)
      ? Math.exp(jStat.combinationln(n, m))
      : (jStat.factorial(n) / jStat.factorial(m)) / jStat.factorial(n - m);
};


jStat.combinationln = function combinationln(n, m){
  return jStat.factorialln(n) - jStat.factorialln(m) - jStat.factorialln(n - m);
};


// permutations of n, m
jStat.permutation = function permutation(n, m) {
  return jStat.factorial(n) / jStat.factorial(n - m);
};


// beta function
jStat.betafn = function betafn(x, y) {
  // ensure arguments are positive
  if (x <= 0 || y <= 0)
    return undefined;
  // make sure x + y doesn't exceed the upper limit of usable values
  return (x + y > 170)
      ? Math.exp(jStat.betaln(x, y))
      : jStat.gammafn(x) * jStat.gammafn(y) / jStat.gammafn(x + y);
};


// natural logarithm of beta function
jStat.betaln = function betaln(x, y) {
  return jStat.gammaln(x) + jStat.gammaln(y) - jStat.gammaln(x + y);
};


// Evaluates the continued fraction for incomplete beta function by modified
// Lentz's method.
jStat.betacf = function betacf(x, a, b) {
  var fpmin = 1e-30;
  var m = 1;
  var qab = a + b;
  var qap = a + 1;
  var qam = a - 1;
  var c = 1;
  var d = 1 - qab * x / qap;
  var m2, aa, del, h;

  // These q's will be used in factors that occur in the coefficients
  if (Math.abs(d) < fpmin)
    d = fpmin;
  d = 1 / d;
  h = d;

  for (; m <= 100; m++) {
    m2 = 2 * m;
    aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    // One step (the even one) of the recurrence
    d = 1 + aa * d;
    if (Math.abs(d) < fpmin)
      d = fpmin;
    c = 1 + aa / c;
    if (Math.abs(c) < fpmin)
      c = fpmin;
    d = 1 / d;
    h *= d * c;
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    // Next step of the recurrence (the odd one)
    d = 1 + aa * d;
    if (Math.abs(d) < fpmin)
      d = fpmin;
    c = 1 + aa / c;
    if (Math.abs(c) < fpmin)
      c = fpmin;
    d = 1 / d;
    del = d * c;
    h *= del;
    if (Math.abs(del - 1.0) < 3e-7)
      break;
  }

  return h;
};


// Returns the inverse incomplte gamma function
jStat.gammapinv = function gammapinv(p, a) {
  var j = 0;
  var a1 = a - 1;
  var EPS = 1e-8;
  var gln = jStat.gammaln(a);
  var x, err, t, u, pp, lna1, afac;

  if (p >= 1)
    return Math.max(100, a + 100 * Math.sqrt(a));
  if (p <= 0)
    return 0;
  if (a > 1) {
    lna1 = Math.log(a1);
    afac = Math.exp(a1 * (lna1 - 1) - gln);
    pp = (p < 0.5) ? p : 1 - p;
    t = Math.sqrt(-2 * Math.log(pp));
    x = (2.30753 + t * 0.27061) / (1 + t * (0.99229 + t * 0.04481)) - t;
    if (p < 0.5)
      x = -x;
    x = Math.max(1e-3,
                 a * Math.pow(1 - 1 / (9 * a) - x / (3 * Math.sqrt(a)), 3));
  } else {
    t = 1 - a * (0.253 + a * 0.12);
    if (p < t)
      x = Math.pow(p / t, 1 / a);
    else
      x = 1 - Math.log(1 - (p - t) / (1 - t));
  }

  for(; j < 12; j++) {
    if (x <= 0)
      return 0;
    err = jStat.gammap(a, x) - p;
    if (a > 1)
      t = afac * Math.exp(-(x - a1) + a1 * (Math.log(x) - lna1));
    else
      t = Math.exp(-x + a1 * Math.log(x) - gln);
    u = err / t;
    x -= (t = u / (1 - 0.5 * Math.min(1, u * ((a - 1) / x - 1))));
    if (x <= 0)
      x = 0.5 * (x + t);
    if (Math.abs(t) < EPS * x)
      break;
  }

  return x;
};


// Returns the error function erf(x)
jStat.erf = function erf(x) {
  var cof = [-1.3026537197817094, 6.4196979235649026e-1, 1.9476473204185836e-2,
             -9.561514786808631e-3, -9.46595344482036e-4, 3.66839497852761e-4,
             4.2523324806907e-5, -2.0278578112534e-5, -1.624290004647e-6,
             1.303655835580e-6, 1.5626441722e-8, -8.5238095915e-8,
             6.529054439e-9, 5.059343495e-9, -9.91364156e-10,
             -2.27365122e-10, 9.6467911e-11, 2.394038e-12,
             -6.886027e-12, 8.94487e-13, 3.13092e-13,
             -1.12708e-13, 3.81e-16, 7.106e-15,
             -1.523e-15, -9.4e-17, 1.21e-16,
             -2.8e-17];
  var j = cof.length - 1;
  var isneg = false;
  var d = 0;
  var dd = 0;
  var t, ty, tmp, res;

  if (x < 0) {
    x = -x;
    isneg = true;
  }

  t = 2 / (2 + x);
  ty = 4 * t - 2;

  for(; j > 0; j--) {
    tmp = d;
    d = ty * d - dd + cof[j];
    dd = tmp;
  }

  res = t * Math.exp(-x * x + 0.5 * (cof[0] + ty * d) - dd);
  return isneg ? res - 1 : 1 - res;
};


// Returns the complmentary error function erfc(x)
jStat.erfc = function erfc(x) {
  return 1 - jStat.erf(x);
};


// Returns the inverse of the complementary error function
jStat.erfcinv = function erfcinv(p) {
  var j = 0;
  var x, err, t, pp;
  if (p >= 2)
    return -100;
  if (p <= 0)
    return 100;
  pp = (p < 1) ? p : 2 - p;
  t = Math.sqrt(-2 * Math.log(pp / 2));
  x = -0.70711 * ((2.30753 + t * 0.27061) /
                  (1 + t * (0.99229 + t * 0.04481)) - t);
  for (; j < 2; j++) {
    err = jStat.erfc(x) - pp;
    x += err / (1.12837916709551257 * Math.exp(-x * x) - x * err);
  }
  return (p < 1) ? x : -x;
};


// Returns the inverse of the incomplete beta function
jStat.ibetainv = function ibetainv(p, a, b) {
  var EPS = 1e-8;
  var a1 = a - 1;
  var b1 = b - 1;
  var j = 0;
  var lna, lnb, pp, t, u, err, x, al, h, w, afac;
  if (p <= 0)
    return 0;
  if (p >= 1)
    return 1;
  if (a >= 1 && b >= 1) {
    pp = (p < 0.5) ? p : 1 - p;
    t = Math.sqrt(-2 * Math.log(pp));
    x = (2.30753 + t * 0.27061) / (1 + t* (0.99229 + t * 0.04481)) - t;
    if (p < 0.5)
      x = -x;
    al = (x * x - 3) / 6;
    h = 2 / (1 / (2 * a - 1)  + 1 / (2 * b - 1));
    w = (x * Math.sqrt(al + h) / h) - (1 / (2 * b - 1) - 1 / (2 * a - 1)) *
        (al + 5 / 6 - 2 / (3 * h));
    x = a / (a + b * Math.exp(2 * w));
  } else {
    lna = Math.log(a / (a + b));
    lnb = Math.log(b / (a + b));
    t = Math.exp(a * lna) / a;
    u = Math.exp(b * lnb) / b;
    w = t + u;
    if (p < t / w)
      x = Math.pow(a * w * p, 1 / a);
    else
      x = 1 - Math.pow(b * w * (1 - p), 1 / b);
  }
  afac = -jStat.gammaln(a) - jStat.gammaln(b) + jStat.gammaln(a + b);
  for(; j < 10; j++) {
    if (x === 0 || x === 1)
      return x;
    err = jStat.ibeta(x, a, b) - p;
    t = Math.exp(a1 * Math.log(x) + b1 * Math.log(1 - x) + afac);
    u = err / t;
    x -= (t = u / (1 - 0.5 * Math.min(1, u * (a1 / x - b1 / (1 - x)))));
    if (x <= 0)
      x = 0.5 * (x + t);
    if (x >= 1)
      x = 0.5 * (x + t + 1);
    if (Math.abs(t) < EPS * x && j > 0)
      break;
  }
  return x;
};


// Returns the incomplete beta function I_x(a,b)
jStat.ibeta = function ibeta(x, a, b) {
  // Factors in front of the continued fraction.
  var bt = (x === 0 || x === 1) ?  0 :
    Math.exp(jStat.gammaln(a + b) - jStat.gammaln(a) -
             jStat.gammaln(b) + a * Math.log(x) + b *
             Math.log(1 - x));
  if (x < 0 || x > 1)
    return false;
  if (x < (a + 1) / (a + b + 2))
    // Use continued fraction directly.
    return bt * jStat.betacf(x, a, b) / a;
  // else use continued fraction after making the symmetry transformation.
  return 1 - bt * jStat.betacf(1 - x, b, a) / b;
};


// Returns a normal deviate (mu=0, sigma=1).
// If n and m are specified it returns a object of normal deviates.
jStat.randn = function randn(n, m) {
  var u, v, x, y, q, mat;
  if (!m)
    m = n;
  if (n)
    return jStat.create(n, m, function() { return jStat.randn(); });
  do {
    u = Math.random();
    v = 1.7156 * (Math.random() - 0.5);
    x = u - 0.449871;
    y = Math.abs(v) + 0.386595;
    q = x * x + y * (0.19600 * y - 0.25472 * x);
  } while (q > 0.27597 && (q > 0.27846 || v * v > -4 * Math.log(u) * u * u));
  return v / u;
};


// Returns a gamma deviate by the method of Marsaglia and Tsang.
jStat.randg = function randg(shape, n, m) {
  var oalph = shape;
  var a1, a2, u, v, x, mat;
  if (!m)
    m = n;
  if (!shape)
    shape = 1;
  if (n) {
    mat = jStat.zeros(n,m);
    mat.alter(function() { return jStat.randg(shape); });
    return mat;
  }
  if (shape < 1)
    shape += 1;
  a1 = shape - 1 / 3;
  a2 = 1 / Math.sqrt(9 * a1);
  do {
    do {
      x = jStat.randn();
      v = 1 + a2 * x;
    } while(v <= 0);
    v = v * v * v;
    u = Math.random();
  } while(u > 1 - 0.331 * Math.pow(x, 4) &&
          Math.log(u) > 0.5 * x*x + a1 * (1 - v + Math.log(v)));
  // alpha > 1
  if (shape == oalph)
    return a1 * v;
  // alpha < 1
  do {
    u = Math.random();
  } while(u === 0);
  return Math.pow(u, 1 / oalph) * a1 * v;
};


// making use of static methods on the instance
(function(funcs) {
  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
    jStat.fn[passfunc] = function() {
      return jStat(
          jStat.map(this, function(value) { return jStat[passfunc](value); }));
    }
  })(funcs[i]);
})('gammaln gammafn factorial factorialln'.split(' '));


(function(funcs) {
  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
    jStat.fn[passfunc] = function() {
      return jStat(jStat[passfunc].apply(null, arguments));
    };
  })(funcs[i]);
})('randn'.split(' '));

}(this.jStat, Math));
(function(jStat, Math) {

// generate all distribution instance methods
(function(list) {
  for (var i = 0; i < list.length; i++) (function(func) {
    // distribution instance method
    jStat[func] = function(a, b, c) {
      if (!(this instanceof arguments.callee))
        return new arguments.callee(a, b, c);
      this._a = a;
      this._b = b;
      this._c = c;
      return this;
    };
    // distribution method to be used on a jStat instance
    jStat.fn[func] = function(a, b, c) {
      var newthis = jStat[func](a, b, c);
      newthis.data = this;
      return newthis;
    };
    // sample instance method
    jStat[func].prototype.sample = function(arr) {
      var a = this._a;
      var b = this._b;
      var c = this._c;
      if (arr)
        return jStat.alter(arr, function() {
          return jStat[func].sample(a, b, c);
        });
      else
        return jStat[func].sample(a, b, c);
    };
    // generate the pdf, cdf and inv instance methods
    (function(vals) {
      for (var i = 0; i < vals.length; i++) (function(fnfunc) {
        jStat[func].prototype[fnfunc] = function(x) {
          var a = this._a;
          var b = this._b;
          var c = this._c;
          if (!x && x !== 0)
            x = this.data;
          if (typeof x !== 'number') {
            return jStat.fn.map.call(x, function(x) {
              return jStat[func][fnfunc](x, a, b, c);
            });
          }
          return jStat[func][fnfunc](x, a, b, c);
        };
      })(vals[i]);
    })('pdf cdf inv'.split(' '));
    // generate the mean, median, mode and variance instance methods
    (function(vals) {
      for (var i = 0; i < vals.length; i++) (function(fnfunc) {
        jStat[func].prototype[fnfunc] = function() {
          return jStat[func][fnfunc](this._a, this._b, this._c);
        };
      })(vals[i]);
    })('mean median mode variance'.split(' '));
  })(list[i]);
})((
  'beta centralF cauchy chisquare exponential gamma invgamma kumaraswamy ' +
  'lognormal normal pareto studentt weibull uniform  binomial negbin hypgeom ' +
  'poisson triangular'
).split(' '));



// extend beta function with static methods
jStat.extend(jStat.beta, {
  pdf: function pdf(x, alpha, beta) {
    // PDF is zero outside the support
    if (x > 1 || x < 0)
      return 0;
    // PDF is one for the uniform case
    if (alpha == 1 && beta == 1)
      return 1;

    if (alpha < 512 || beta < 512) {
      return (Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1)) /
          jStat.betafn(alpha, beta);
    } else {
      return Math.exp((alpha - 1) * Math.log(x) +
                      (beta - 1) * Math.log(1 - x) -
                      jStat.betaln(alpha, beta));
    }
  },

  cdf: function cdf(x, alpha, beta) {
    return (x > 1 || x < 0) ? (x > 1) * 1 : jStat.ibeta(x, alpha, beta);
  },

  inv: function inv(x, alpha, beta) {
    return jStat.ibetainv(x, alpha, beta);
  },

  mean: function mean(alpha, beta) {
    return alpha / (alpha + beta);
  },

  median: function median(alpha, beta) {
    throw new Error('median not yet implemented');
  },

  mode: function mode(alpha, beta) {
    return (alpha * beta) / (Math.pow(alpha + beta, 2) * (alpha + beta + 1));
  },

  // return a random sample
  sample: function sample(alpha, beta) {
    var u = jStat.randg(alpha);
    return u / (u + jStat.randg(beta));
  },

  variance: function variance(alpha, beta) {
    return (alpha * beta) / (Math.pow(alpha + beta, 2) * (alpha + beta + 1));
  }
});

// extend F function with static methods
jStat.extend(jStat.centralF, {
  pdf: function pdf(x, df1, df2) {
    if (x < 0)
      return undefined;
    return Math.sqrt((Math.pow(df1 * x, df1) * Math.pow(df2, df2)) /
                     (Math.pow(df1 * x + df2, df1 + df2))) /
                     (x * jStat.betafn(df1/2, df2/2));

  },

  cdf: function cdf(x, df1, df2) {
    return jStat.ibeta((df1 * x) / (df1 * x + df2), df1 / 2, df2 / 2);
  },

  inv: function inv(x, df1, df2) {
    return df2 / (df1 * (1 / jStat.ibetainv(x, df1 / 2, df2 / 2) - 1));
  },

  mean: function mean(df1, df2) {
    return (df2 > 2) ? df2 / (df2 - 2) : undefined;
  },

  mode: function mode(df1, df2) {
    return (df1 > 2) ? (df2 * (df1 - 2)) / (df1 * (df2 + 2)) : undefined;
  },

  // return a random sample
  sample: function sample(df1, df2) {
    var x1 = jStat.randg(df1 / 2) * 2;
    var x2 = jStat.randg(df2 / 2) * 2;
    return (x1 / df1) / (x2 / df2);
  },

  variance: function variance(df1, df2) {
    if (df2 <= 4)
      return undefined;
    return 2 * df2 * df2 * (df1 + df2 - 2) /
        (df1 * (df2 - 2) * (df2 - 2) * (df2 - 4));
  }
});


// extend cauchy function with static methods
jStat.extend(jStat.cauchy, {
  pdf: function pdf(x, local, scale) {
    return (scale / (Math.pow(x - local, 2) + Math.pow(scale, 2))) / Math.PI;
  },

  cdf: function cdf(x, local, scale) {
    return Math.atan((x - local) / scale) / Math.PI + 0.5;
  },

  inv: function(p, local, scale) {
    return local + scale * Math.tan(Math.PI * (p - 0.5));
  },

  median: function median(local, scale) {
    return local;
  },

  mode: function mode(local, scale) {
    return local;
  },

  sample: function sample(local, scale) {
    return jStat.randn() *
        Math.sqrt(1 / (2 * jStat.randg(0.5))) * scale + local;
  }
});



// extend chisquare function with static methods
jStat.extend(jStat.chisquare, {
  pdf: function pdf(x, dof) {
    return Math.exp((dof / 2 - 1) * Math.log(x) - x / 2 - (dof / 2) *
                    Math.log(2) - jStat.gammaln(dof / 2));
  },

  cdf: function cdf(x, dof) {
    return jStat.gammap(dof / 2, x / 2);
  },

  inv: function(p, dof) {
    return 2 * jStat.gammapinv(p, 0.5 * dof);
  },

  mean : function(dof) {
    return dof;
  },

  // TODO: this is an approximation (is there a better way?)
  median: function median(dof) {
    return dof * Math.pow(1 - (2 / (9 * dof)), 3);
  },

  mode: function mode(dof) {
    return (dof - 2 > 0) ? dof - 2 : 0;
  },

  sample: function sample(dof) {
    return jStat.randg(dof / 2) * 2;
  },

  variance: function variance(dof) {
    return 2 * dof;
  }
});



// extend exponential function with static methods
jStat.extend(jStat.exponential, {
  pdf: function pdf(x, rate) {
    return x < 0 ? 0 : rate * Math.exp(-rate * x);
  },

  cdf: function cdf(x, rate) {
    return x < 0 ? 0 : 1 - Math.exp(-rate * x);
  },

  inv: function(p, rate) {
    return -Math.log(1 - p) / rate;
  },

  mean : function(rate) {
    return 1 / rate;
  },

  median: function (rate) {
    return (1 / rate) * Math.log(2);
  },

  mode: function mode(rate) {
    return 0;
  },

  sample: function sample(rate) {
    return -1 / rate * Math.log(Math.random());
  },

  variance : function(rate) {
    return Math.pow(rate, -2);
  }
});



// extend gamma function with static methods
jStat.extend(jStat.gamma, {
  pdf: function pdf(x, shape, scale) {
    return Math.exp((shape - 1) * Math.log(x) - x / scale -
                    jStat.gammaln(shape) - shape * Math.log(scale));
  },

  cdf: function cdf(x, shape, scale) {
    return jStat.gammap(shape, x / scale);
  },

  inv: function(p, shape, scale) {
    return jStat.gammapinv(p, shape) * scale;
  },

  mean : function(shape, scale) {
    return shape * scale;
  },

  mode: function mode(shape, scale) {
    if(shape > 1) return (shape - 1) * scale;
    return undefined;
  },

  sample: function sample(shape, scale) {
    return jStat.randg(shape) * scale;
  },

  variance: function variance(shape, scale) {
    return shape * scale * scale;
  }
});

// extend inverse gamma function with static methods
jStat.extend(jStat.invgamma, {
  pdf: function pdf(x, shape, scale) {
    return Math.exp(-(shape + 1) * Math.log(x) - scale / x -
                    jStat.gammaln(shape) + shape * Math.log(scale));
  },

  cdf: function cdf(x, shape, scale) {
    return 1 - jStat.gammap(shape, scale / x);
  },

  inv: function(p, shape, scale) {
    return scale / jStat.gammapinv(1 - p, shape);
  },

  mean : function(shape, scale) {
    return (shape > 1) ? scale / (shape - 1) : undefined;
  },

  mode: function mode(shape, scale) {
    return scale / (shape + 1);
  },

  sample: function sample(shape, scale) {
    return scale / jStat.randg(shape);
  },

  variance: function variance(shape, scale) {
    if (shape <= 2)
      return undefined;
    return scale * scale / ((shape - 1) * (shape - 1) * (shape - 2));
  }
});


// extend kumaraswamy function with static methods
jStat.extend(jStat.kumaraswamy, {
  pdf: function pdf(x, alpha, beta) {
    return Math.exp(Math.log(alpha) + Math.log(beta) + (alpha - 1) *
                    Math.log(x) + (beta - 1) *
                    Math.log(1 - Math.pow(x, alpha)));
  },

  cdf: function cdf(x, alpha, beta) {
    return (1 - Math.pow(1 - Math.pow(x, alpha), beta));
  },

  mean : function(alpha, beta) {
    return (beta * jStat.gammafn(1 + 1 / alpha) *
            jStat.gammafn(beta)) / (jStat.gammafn(1 + 1 / alpha + beta));
  },

  median: function median(alpha, beta) {
    return Math.pow(1 - Math.pow(2, -1 / beta), 1 / alpha);
  },

  mode: function mode(alpha, beta) {
    if (!(alpha >= 1 && beta >= 1 && (alpha !== 1 && beta !== 1)))
      return undefined;
    return Math.pow((alpha - 1) / (alpha * beta - 1), 1 / alpha);
  },

  variance: function variance(alpha, beta) {
    throw new Error('variance not yet implemented');
    // TODO: complete this
  }
});



// extend lognormal function with static methods
jStat.extend(jStat.lognormal, {
  pdf: function pdf(x, mu, sigma) {
    return Math.exp(-Math.log(x) - 0.5 * Math.log(2 * Math.PI) -
                    Math.log(sigma) - Math.pow(Math.log(x) - mu, 2) /
                    (2 * sigma * sigma));
  },

  cdf: function cdf(x, mu, sigma) {
    return 0.5 +
        (0.5 * jStat.erf((Math.log(x) - mu) / Math.sqrt(2 * sigma * sigma)));
  },

  inv: function(p, mu, sigma) {
    return Math.exp(-1.41421356237309505 * sigma * jStat.erfcinv(2 * p) + mu);
  },

  mean: function mean(mu, sigma) {
    return Math.exp(mu + sigma * sigma / 2);
  },

  median: function median(mu, sigma) {
    return Math.exp(mu);
  },

  mode: function mode(mu, sigma) {
    return Math.exp(mu - sigma * sigma);
  },

  sample: function sample(mu, sigma) {
    return Math.exp(jStat.randn() * sigma + mu);
  },

  variance: function variance(mu, sigma) {
    return (Math.exp(sigma * sigma) - 1) * Math.exp(2 * mu + sigma * sigma);
  }
});



// extend normal function with static methods
jStat.extend(jStat.normal, {
  pdf: function pdf(x, mean, std) {
    return Math.exp(-0.5 * Math.log(2 * Math.PI) -
                    Math.log(std) - Math.pow(x - mean, 2) / (2 * std * std));
  },

  cdf: function cdf(x, mean, std) {
    return 0.5 * (1 + jStat.erf((x - mean) / Math.sqrt(2 * std * std)));
  },

  inv: function(p, mean, std) {
    return -1.41421356237309505 * std * jStat.erfcinv(2 * p) + mean;
  },

  mean : function(mean, std) {
    return mean;
  },

  median: function median(mean, std) {
    return mean;
  },

  mode: function (mean, std) {
    return mean;
  },

  sample: function sample(mean, std) {
    return jStat.randn() * std + mean;
  },

  variance : function(mean, std) {
    return std * std;
  }
});



// extend pareto function with static methods
jStat.extend(jStat.pareto, {
  pdf: function pdf(x, scale, shape) {
    if (x <= scale)
      return undefined;
    return (shape * Math.pow(scale, shape)) / Math.pow(x, shape + 1);
  },

  cdf: function cdf(x, scale, shape) {
    return 1 - Math.pow(scale / x, shape);
  },

  mean: function mean(scale, shape) {
    if (shape <= 1)
      return undefined;
    return (shape * Math.pow(scale, shape)) / (shape - 1);
  },

  median: function median(scale, shape) {
    return scale * (shape * Math.SQRT2);
  },

  mode: function mode(scale, shape) {
    return scale;
  },

  variance : function(scale, shape) {
    if (shape <= 2)
      return undefined;
    return (scale*scale * shape) / (Math.pow(shape - 1, 2) * (shape - 2));
  }
});



// extend studentt function with static methods
jStat.extend(jStat.studentt, {
  pdf: function pdf(x, dof) {
    return (jStat.gammafn((dof + 1) / 2) / (Math.sqrt(dof * Math.PI) *
        jStat.gammafn(dof / 2))) *
        Math.pow(1 + ((x * x) / dof), -((dof + 1) / 2));
  },

  cdf: function cdf(x, dof) {
    var dof2 = dof / 2;
    return jStat.ibeta((x + Math.sqrt(x * x + dof)) /
                       (2 * Math.sqrt(x * x + dof)), dof2, dof2);
  },

  inv: function(p, dof) {
    var x = jStat.ibetainv(2 * Math.min(p, 1 - p), 0.5 * dof, 0.5);
    x = Math.sqrt(dof * (1 - x) / x);
    return (p > 0.5) ? x : -x;
  },

  mean: function mean(dof) {
    return (dof > 1) ? 0 : undefined;
  },

  median: function median(dof) {
    return 0;
  },

  mode: function mode(dof) {
    return 0;
  },

  sample: function sample(dof) {
    return jStat.randn() * Math.sqrt(dof / (2 * jStat.randg(dof / 2)));
  },

  variance: function variance(dof) {
    return (dof  > 2) ? dof / (dof - 2) : (dof > 1) ? Infinity : undefined;
  }
});



// extend weibull function with static methods
jStat.extend(jStat.weibull, {
  pdf: function pdf(x, scale, shape) {
    if (x < 0)
      return 0;
    return (shape / scale) * Math.pow((x / scale), (shape - 1)) *
        Math.exp(-(Math.pow((x / scale), shape)));
  },

  cdf: function cdf(x, scale, shape) {
    return x < 0 ? 0 : 1 - Math.exp(-Math.pow((x / scale), shape));
  },

  inv: function(p, scale, shape) {
    return scale * Math.pow(-Math.log(1 - p), 1 / shape);
  },

  mean : function(scale, shape) {
    return scale * jStat.gammafn(1 + 1 / shape);
  },

  median: function median(scale, shape) {
    return scale * Math.pow(Math.log(2), 1 / shape);
  },

  mode: function mode(scale, shape) {
    if (shape <= 1)
      return undefined;
    return scale * Math.pow((shape - 1) / shape, 1 / shape);
  },

  sample: function sample(scale, shape) {
    return scale * Math.pow(-Math.log(Math.random()), 1 / shape);
  },

  variance: function variance(scale, shape) {
    return scale * scale * jStat.gammafn(1 + 2 / shape) -
        Math.pow(this.mean(scale, shape), 2);
  }
});



// extend uniform function with static methods
jStat.extend(jStat.uniform, {
  pdf: function pdf(x, a, b) {
    return (x < a || x > b) ? 0 : 1 / (b - a);
  },

  cdf: function cdf(x, a, b) {
    if (x < a)
      return 0;
    else if (x < b)
      return (x - a) / (b - a);
    return 1;
  },

  mean: function mean(a, b) {
    return 0.5 * (a + b);
  },

  median: function median(a, b) {
    return jStat.mean(a, b);
  },

  mode: function mode(a, b) {
    throw new Error('mode is not yet implemented');
  },

  sample: function sample(a, b) {
    return (a / 2 + b / 2) + (b / 2 - a / 2) * (2 * Math.random() - 1);
  },

  variance: function variance(a, b) {
    return Math.pow(b - a, 2) / 12;
  }
});



// extend uniform function with static methods
jStat.extend(jStat.binomial, {
  pdf: function pdf(k, n, p) {
    return (p === 0 || p === 1) ?
      ((n * p) === k ? 1 : 0) :
      jStat.combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
  },

  cdf: function cdf(x, n, p) {
    var binomarr = [],
    k = 0;
    if (x < 0) {
      return 0;
    }
    if (x < n) {
      for (; k <= x; k++) {
        binomarr[ k ] = jStat.binomial.pdf(k, n, p);
      }
      return jStat.sum(binomarr);
    }
    return 1;
  }
});



// extend uniform function with static methods
jStat.extend(jStat.negbin, {
  pdf: function pdf(k, r, p) {
    return k !== k | 0
      ? false
      : k < 0
        ? 0
        : jStat.combination(k + r - 1, r - 1) * Math.pow(1 - p, k) * Math.pow(p, r);
  },

  cdf: function cdf(x, r, p) {
    var sum = 0,
    k = 0;
    if (x < 0) return 0;
    for (; k <= x; k++) {
      sum += jStat.negbin.pdf(k, r, p);
    }
    return sum;
  }
});



// extend uniform function with static methods
jStat.extend(jStat.hypgeom, {
  pdf: function pdf(k, N, m, n) {
    // Hypergeometric PDF.

    // A simplification of the CDF algorithm below.

    // k = number of successes drawn
    // N = population size
    // m = number of successes in population
    // n = number of items drawn from population

    if(k !== k | 0) {
      return false;
    } else if(k < 0 || k < m - (N - n)) {
      // It's impossible to have this few successes drawn.
      return 0;
    } else if(k > n || k > m) {
      // It's impossible to have this many successes drawn.
      return 0;
    } else if (m * 2 > N) {
      // More than half the population is successes.

      if(n * 2 > N) {
        // More than half the population is sampled.

        return jStat.hypgeom.pdf(N - m - n + k, N, N - m, N - n)
      } else {
        // Half or less of the population is sampled.

        return jStat.hypgeom.pdf(n - k, N, N - m, n);
      }

    } else if(n * 2 > N) {
      // Half or less is successes.

      return jStat.hypgeom.pdf(m - k, N, m, N - n);

    } else if(m < n) {
      // We want to have the number of things sampled to be less than the
      // successes available. So swap the definitions of successful and sampled.
      return jStat.hypgeom.pdf(k, N, n, m);
    } else {
      // If we get here, half or less of the population was sampled, half or
      // less of it was successes, and we had fewer sampled things than
      // successes. Now we can do this complicated iterative algorithm in an
      // efficient way.

      // The basic premise of the algorithm is that we partially normalize our
      // intermediate product to keep it in a numerically good region, and then
      // finish the normalization at the end.

      // This variable holds the scaled probability of the current number of
      // successes.
      var scaledPDF = 1;

      // This keeps track of how much we have normalized.
      var samplesDone = 0;

      for(var i = 0; i < k; i++) {
        // For every possible number of successes up to that observed...

        while(scaledPDF > 1 && samplesDone < n) {
          // Intermediate result is growing too big. Apply some of the
          // normalization to shrink everything.

          scaledPDF *= 1 - (m / (N - samplesDone));

          // Say we've normalized by this sample already.
          samplesDone++;
        }

        // Work out the partially-normalized hypergeometric PDF for the next
        // number of successes
        scaledPDF *= (n - i) * (m - i) / ((i + 1) * (N - m - n + i + 1));
      }

      for(; samplesDone < n; samplesDone++) {
        // Apply all the rest of the normalization
        scaledPDF *= 1 - (m / (N - samplesDone));
      }

      // Bound answer sanely before returning.
      return Math.min(1, Math.max(0, scaledPDF));
    }
  },

  cdf: function cdf(x, N, m, n) {
    // Hypergeometric CDF.

    // This algorithm is due to Prof. Thomas S. Ferguson, <tom@math.ucla.edu>,
    // and comes from his hypergeometric test calculator at
    // <http://www.math.ucla.edu/~tom/distributions/Hypergeometric.html>.

    // x = number of successes drawn
    // N = population size
    // m = number of successes in population
    // n = number of items drawn from population

    if(x < 0 || x < m - (N - n)) {
      // It's impossible to have this few successes drawn or fewer.
      return 0;
    } else if(x >= n || x >= m) {
      // We will always have this many successes or fewer.
      return 1;
    } else if (m * 2 > N) {
      // More than half the population is successes.

      if(n * 2 > N) {
        // More than half the population is sampled.

        return jStat.hypgeom.cdf(N - m - n + x, N, N - m, N - n)
      } else {
        // Half or less of the population is sampled.

        return 1 - jStat.hypgeom.cdf(n - x - 1, N, N - m, n);
      }

    } else if(n * 2 > N) {
      // Half or less is successes.

      return 1 - jStat.hypgeom.cdf(m - x - 1, N, m, N - n);

    } else if(m < n) {
      // We want to have the number of things sampled to be less than the
      // successes available. So swap the definitions of successful and sampled.
      return jStat.hypgeom.cdf(x, N, n, m);
    } else {
      // If we get here, half or less of the population was sampled, half or
      // less of it was successes, and we had fewer sampled things than
      // successes. Now we can do this complicated iterative algorithm in an
      // efficient way.

      // The basic premise of the algorithm is that we partially normalize our
      // intermediate sum to keep it in a numerically good region, and then
      // finish the normalization at the end.

      // Holds the intermediate, scaled total CDF.
      var scaledCDF = 1;

      // This variable holds the scaled probability of the current number of
      // successes.
      var scaledPDF = 1;

      // This keeps track of how much we have normalized.
      var samplesDone = 0;

      for(var i = 0; i < x; i++) {
        // For every possible number of successes up to that observed...

        while(scaledCDF > 1 && samplesDone < n) {
          // Intermediate result is growing too big. Apply some of the
          // normalization to shrink everything.

          var factor = 1 - (m / (N - samplesDone));

          scaledPDF *= factor;
          scaledCDF *= factor;

          // Say we've normalized by this sample already.
          samplesDone++;
        }

        // Work out the partially-normalized hypergeometric PDF for the next
        // number of successes
        scaledPDF *= (n - i) * (m - i) / ((i + 1) * (N - m - n + i + 1));

        // Add to the CDF answer.
        scaledCDF += scaledPDF;
      }

      for(; samplesDone < n; samplesDone++) {
        // Apply all the rest of the normalization
        scaledCDF *= 1 - (m / (N - samplesDone));
      }

      // Bound answer sanely before returning.
      return Math.min(1, Math.max(0, scaledCDF));
    }
  }
});



// extend uniform function with static methods
jStat.extend(jStat.poisson, {
  pdf: function pdf(k, l) {
    return Math.pow(l, k) * Math.exp(-l) / jStat.factorial(k);
  },

  cdf: function cdf(x, l) {
    var sumarr = [],
    k = 0;
    if (x < 0) return 0;
    for (; k <= x; k++) {
      sumarr.push(jStat.poisson.pdf(k, l));
    }
    return jStat.sum(sumarr);
  },

  mean : function(l) {
    return l;
  },

  variance : function(l) {
    return l;
  },

  sample: function sample(l) {
    var p = 1, k = 0, L = Math.exp(-l);
    do {
      k++;
      p *= Math.random();
    } while (p > L);
    return k - 1;
  }
});

// extend triangular function with static methods
jStat.extend(jStat.triangular, {
  pdf: function pdf(x, a, b, c) {
    return (b <= a || c < a || c > b)
      ? undefined
      : (x < a || x > b)
        ? 0
        : (x <= c)
          ? (2 * (x - a)) / ((b - a) * (c - a))
          : (2 * (b - x)) / ((b - a) * (b - c));
  },

  cdf: function cdf(x, a, b, c) {
    if (b <= a || c < a || c > b)
      return undefined;
    if (x < a) {
      return 0;
    } else {
      if (x <= c)
        return Math.pow(x - a, 2) / ((b - a) * (c - a));
      return 1 - Math.pow(b - x, 2) / ((b - a) * (b - c));
    }
    // never reach this
    return 1;
  },

  mean: function mean(a, b, c) {
    return (a + b + c) / 3;
  },

  median: function median(a, b, c) {
    if (c <= (a + b) / 2) {
      return b - Math.sqrt((b - a) * (b - c)) / Math.sqrt(2);
    } else if (c > (a + b) / 2) {
      return a + Math.sqrt((b - a) * (c - a)) / Math.sqrt(2);
    }
  },

  mode: function mode(a, b, c) {
    return c;
  },

  sample: function sample(a, b, c) {
    var u = Math.random();
    if (u < ((c - a) / (b - a)))
      return a + Math.sqrt(u * (b - a) * (c - a))
    return b - Math.sqrt((1 - u) * (b - a) * (b - c));
  },

  variance: function variance(a, b, c) {
    return (a * a + b * b + c * c - a * b - a * c - b * c) / 18;
  }
});

}(this.jStat, Math));
/* Provides functions for the solution of linear system of equations, integration, extrapolation,
 * interpolation, eigenvalue problems, differential equations and PCA analysis. */

(function(jStat, Math) {

var push = Array.prototype.push;
var isArray = jStat.utils.isArray;

jStat.extend({

  // add a vector/matrix to a vector/matrix or scalar
  add: function add(arr, arg) {
    // check if arg is a vector or scalar
    if (isArray(arg)) {
      if (!isArray(arg[0])) arg = [ arg ];
      return jStat.map(arr, function(value, row, col) {
        return value + arg[row][col];
      });
    }
    return jStat.map(arr, function(value) { return value + arg; });
  },

  // subtract a vector or scalar from the vector
  subtract: function subtract(arr, arg) {
    // check if arg is a vector or scalar
    if (isArray(arg)) {
      if (!isArray(arg[0])) arg = [ arg ];
      return jStat.map(arr, function(value, row, col) {
        return value - arg[row][col] || 0;
      });
    }
    return jStat.map(arr, function(value) { return value - arg; });
  },

  // matrix division
  divide: function divide(arr, arg) {
    if (isArray(arg)) {
      if (!isArray(arg[0])) arg = [ arg ];
      return jStat.multiply(arr, jStat.inv(arg));
    }
    return jStat.map(arr, function(value) { return value / arg; });
  },

  // matrix multiplication
  multiply: function multiply(arr, arg) {
    var row, col, nrescols, sum,
    nrow = arr.length,
    ncol = arr[0].length,
    res = jStat.zeros(nrow, nrescols = (isArray(arg)) ? arg[0].length : ncol),
    rescols = 0;
    if (isArray(arg)) {
      for (; rescols < nrescols; rescols++) {
        for (row = 0; row < nrow; row++) {
          sum = 0;
          for (col = 0; col < ncol; col++)
          sum += arr[row][col] * arg[col][rescols];
          res[row][rescols] = sum;
        }
      }
      return (nrow === 1 && rescols === 1) ? res[0][0] : res;
    }
    return jStat.map(arr, function(value) { return value * arg; });
  },

  // Returns the dot product of two matricies
  dot: function dot(arr, arg) {
    if (!isArray(arr[0])) arr = [ arr ];
    if (!isArray(arg[0])) arg = [ arg ];
    // convert column to row vector
    var left = (arr[0].length === 1 && arr.length !== 1) ? jStat.transpose(arr) : arr,
    right = (arg[0].length === 1 && arg.length !== 1) ? jStat.transpose(arg) : arg,
    res = [],
    row = 0,
    nrow = left.length,
    ncol = left[0].length,
    sum, col;
    for (; row < nrow; row++) {
      res[row] = [];
      sum = 0;
      for (col = 0; col < ncol; col++)
      sum += left[row][col] * right[row][col];
      res[row] = sum;
    }
    return (res.length === 1) ? res[0] : res;
  },

  // raise every element by a scalar
  pow: function pow(arr, arg) {
    return jStat.map(arr, function(value) { return Math.pow(value, arg); });
  },

  // generate the absolute values of the vector
  abs: function abs(arr) {
    return jStat.map(arr, function(value) { return Math.abs(value); });
  },

  // computes the p-norm of the vector
  // In the case that a matrix is passed, uses the first row as the vector
  norm: function norm(arr, p) {
    var nnorm = 0,
    i = 0;
    // check the p-value of the norm, and set for most common case
    if (isNaN(p)) p = 2;
    // check if multi-dimensional array, and make vector correction
    if (isArray(arr[0])) arr = arr[0];
    // vector norm
    for (; i < arr.length; i++) {
      nnorm += Math.pow(Math.abs(arr[i]), p);
    }
    return Math.pow(nnorm, 1 / p);
  },

  // TODO: make compatible with matrices
  // computes the angle between two vectors in rads
  angle: function angle(arr, arg) {
    return Math.acos(jStat.dot(arr, arg) / (jStat.norm(arr) * jStat.norm(arg)));
  },

  // augment one matrix by another
  aug: function aug(a, b) {
    var newarr = a.slice(),
    i = 0;
    for (; i < newarr.length; i++) {
      push.apply(newarr[i], b[i]);
    }
    return newarr;
  },

  inv: function inv(a) {
    var rows = a.length,
    cols = a[0].length,
    b = jStat.identity(rows, cols),
    c = jStat.gauss_jordan(a, b),
    obj = [],
    i = 0,
    j;
    for (; i < rows; i++) {
      obj[i] = [];
      for (j = cols - 1; j < c[0].length; j++)
      obj[i][j - cols] = c[i][j];
    }
    return obj;
  },

  // calculate the determinant of a matrix
  det: function det(a) {
    var alen = a.length,
    alend = alen * 2,
    vals = new Array(alend),
    rowshift = alen - 1,
    colshift = alend - 1,
    mrow = rowshift - alen + 1,
    mcol = colshift,
    i = 0,
    result = 0,
    j;
    // check for special 2x2 case
    if (alen === 2) {
      return a[0][0] * a[1][1] - a[0][1] * a[1][0];
    }
    for (; i < alend; i++) {
      vals[i] = 1;
    }
    for (i = 0; i < alen; i++) {
      for (j = 0; j < alen; j++) {
        vals[(mrow < 0) ? mrow + alen : mrow ] *= a[i][j];
        vals[(mcol < alen) ? mcol + alen : mcol ] *= a[i][j];
        mrow++;
        mcol--;
      }
      mrow = --rowshift - alen + 1;
      mcol = --colshift;
    }
    for (i = 0; i < alen; i++) {
      result += vals[i];
    }
    for (; i < alend; i++) {
      result -= vals[i];
    }
    return result;
  },

  gauss_elimination: function gauss_elimination(a, b) {
    var i = 0,
    j = 0,
    n = a.length,
    m = a[0].length,
    factor = 1,
    sum = 0,
    x = [],
    maug, pivot, temp, k;
    a = jStat.aug(a, b);
    maug = a[0].length;
    for(; i < n; i++) {
      pivot = a[i][i];
      j = i;
      for (k = i + 1; k < m; k++) {
        if (pivot < Math.abs(a[k][i])) {
          pivot = a[k][i];
          j = k;
        }
      }
      if (j != i) {
        for(k = 0; k < maug; k++) {
          temp = a[i][k];
          a[i][k] = a[j][k];
          a[j][k] = temp;
        }
      }
      for (j = i + 1; j < n; j++) {
        factor = a[j][i] / a[i][i];
        for(k = i; k < maug; k++) {
          a[j][k] = a[j][k] - factor * a[i][k];
        }
      }
    }
    for (i = n - 1; i >= 0; i--) {
      sum = 0;
      for (j = i + 1; j<= n - 1; j++) {
        sum = x[j] * a[i][j];
      }
      x[i] =(a[i][maug - 1] - sum) / a[i][i];
    }
    return x;
  },

  gauss_jordan: function gauss_jordan(a, b) {
    var m = jStat.aug(a, b),
    h = m.length,
    w = m[0].length;
    // find max pivot
    for (var y = 0; y < h; y++) {
      var maxrow = y;
      for (var y2 = y+1; y2 < h; y2++) {
        if (Math.abs(m[y2][y]) > Math.abs(m[maxrow][y]))
          maxrow = y2;
      }
      var tmp = m[y];
      m[y] = m[maxrow];
      m[maxrow] = tmp
      for (var y2 = y+1; y2 < h; y2++) {
        c = m[y2][y] / m[y][y];
        for (var x = y; x < w; x++) {
          m[y2][x] -= m[y][x] * c;
        }
      }
    }
    // backsubstitute
    for (var y = h-1; y >= 0; y--) {
      c = m[y][y];
      for (var y2 = 0; y2 < y; y2++) {
        for (var x = w-1; x > y-1; x--) {
          m[y2][x] -= m[y][x] * m[y2][y] / c;
        }
      }
      m[y][y] /= c;
      for (var x = h; x < w; x++) {
        m[y][x] /= c;
      }
    }
    return m;
  },

  lu: function lu(a, b) {
    throw new Error('lu not yet implemented');
  },

  cholesky: function cholesky(a, b) {
    throw new Error('cholesky not yet implemented');
  },

  gauss_jacobi: function gauss_jacobi(a, b, x, r) {
    var i = 0;
    var j = 0;
    var n = a.length;
    var l = [];
    var u = [];
    var d = [];
    var xv, c, h, xk;
    for (; i < n; i++) {
      l[i] = [];
      u[i] = [];
      d[i] = [];
      for (j = 0; j < n; j++) {
        if (i > j) {
          l[i][j] = a[i][j];
          u[i][j] = d[i][j] = 0;
        } else if (i < j) {
          u[i][j] = a[i][j];
          l[i][j] = d[i][j] = 0;
        } else {
          d[i][j] = a[i][j];
          l[i][j] = u[i][j] = 0;
        }
      }
    }
    h = jStat.multiply(jStat.multiply(jStat.inv(d), jStat.add(l, u)), -1);
    c = jStat.multiply(jStat.inv(d), b);
    xv = x;
    xk = jStat.add(jStat.multiply(h, x), c);
    i = 2;
    while (Math.abs(jStat.norm(jStat.subtract(xk,xv))) > r) {
      xv = xk;
      xk = jStat.add(jStat.multiply(h, xv), c);
      i++;
    }
    return xk;
  },

  gauss_seidel: function gauss_seidel(a, b, x, r) {
    var i = 0;
    var n = a.length;
    var l = [];
    var u = [];
    var d = [];
    var j, xv, c, h, xk;
    for (; i < n; i++) {
      l[i] = [];
      u[i] = [];
      d[i] = [];
      for (j = 0; j < n; j++) {
        if (i > j) {
          l[i][j] = a[i][j];
          u[i][j] = d[i][j] = 0;
        } else if (i < j) {
          u[i][j] = a[i][j];
          l[i][j] = d[i][j] = 0;
        } else {
          d[i][j] = a[i][j];
          l[i][j] = u[i][j] = 0;
        }
      }
    }
    h = jStat.multiply(jStat.multiply(jStat.inv(jStat.add(d, l)), u), -1);
    c = jStat.multiply(jStat.inv(jStat.add(d, l)), b);
    xv = x;
    xk = jStat.add(jStat.multiply(h, x), c);
    i = 2;
    while (Math.abs(jStat.norm(jStat.subtract(xk, xv))) > r) {
      xv = xk;
      xk = jStat.add(jStat.multiply(h, xv), c);
      i = i + 1;
    }
    return xk;
  },

  SOR: function SOR(a, b, x, r, w) {
    var i = 0;
    var n = a.length;
    var l = [];
    var u = [];
    var d = [];
    var j, xv, c, h, xk;
    for (; i < n; i++) {
      l[i] = [];
      u[i] = [];
      d[i] = [];
      for (j = 0; j < n; j++) {
        if (i > j) {
          l[i][j] = a[i][j];
          u[i][j] = d[i][j] = 0;
        } else if (i < j) {
          u[i][j] = a[i][j];
          l[i][j] = d[i][j] = 0;
        } else {
          d[i][j] = a[i][j];
          l[i][j] = u[i][j] = 0;
        }
      }
    }
    h = jStat.multiply(jStat.inv(jStat.add(d, jStat.multiply(l, w))),
                       jStat.subtract(jStat.multiply(d, 1 - w),
                                      jStat.multiply(u, w)));
    c = jStat.multiply(jStat.multiply(jStat.inv(jStat.add(d,
        jStat.multiply(l, w))), b), w);
    xv = x;
    xk = jStat.add(jStat.multiply(h, x), c);
    i = 2;
    while (Math.abs(jStat.norm(jStat.subtract(xk, xv))) > r) {
      xv = xk;
      xk = jStat.add(jStat.multiply(h, xv), c);
      i++;
    }
    return xk;
  },

  householder: function householder(a) {
    var m = a.length;
    var n = a[0].length;
    var i = 0;
    var w = [];
    var p = [];
    var alpha, r, k, j, factor;
    for (; i < m - 1; i++) {
      alpha = 0;
      for (j = i + 1; j < n; j++)
      alpha += (a[j][i] * a[j][i]);
      factor = (a[i + 1][i] > 0) ? -1 : 1;
      alpha = factor * Math.sqrt(alpha);
      r = Math.sqrt((((alpha * alpha) - a[i + 1][i] * alpha) / 2));
      w = jStat.zeros(m, 1);
      w[i + 1][0] = (a[i + 1][i] - alpha) / (2 * r);
      for (k = i + 2; k < m; k++) w[k][0] = a[k][i] / (2 * r);
      p = jStat.subtract(jStat.identity(m, n),
          jStat.multiply(jStat.multiply(w, jStat.transpose(w)), 2));
      a = jStat.multiply(p, jStat.multiply(a, p));
    }
    return a;
  },

  // TODO: not working properly.
  QR: function QR(a, b) {
    var m = a.length;
    var n = a[0].length;
    var i = 0;
    var w = [];
    var p = [];
    var x = [];
    var j, alpha, r, k, factor, sum;
    for (; i < m - 1; i++) {
      alpha = 0;
      for (j = i + 1; j < n; j++)
        alpha += (a[j][i] * a[j][i]);
      factor = (a[i + 1][i] > 0) ? -1 : 1;
      alpha = factor * Math.sqrt(alpha);
      r = Math.sqrt((((alpha * alpha) - a[i + 1][i] * alpha) / 2));
      w = jStat.zeros(m, 1);
      w[i + 1][0] = (a[i + 1][i] - alpha) / (2 * r);
      for (k = i + 2; k < m; k++)
        w[k][0] = a[k][i] / (2 * r);
      p = jStat.subtract(jStat.identity(m, n),
          jStat.multiply(jStat.multiply(w, jStat.transpose(w)), 2));
      a = jStat.multiply(p, a);
      b = jStat.multiply(p, b);
    }
    for (i = m - 1; i >= 0; i--) {
      sum = 0;
      for (j = i + 1; j <= n - 1; j++)
      sum = x[j] * a[i][j];
      x[i] = b[i][0] / a[i][i];
    }
    return x;
  },

  jacobi: function jacobi(a) {
    var condition = 1;
    var count = 0;
    var n = a.length;
    var e = jStat.identity(n, n);
    var ev = [];
    var b, i, j, p, q, maxim, theta, s;
    // condition === 1 only if tolerance is not reached
    while (condition === 1) {
      count++;
      maxim = a[0][1];
      p = 0;
      q = 1;
      for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
          if (i != j) {
            if (maxim < Math.abs(a[i][j])) {
              maxim = Math.abs(a[i][j]);
              p = i;
              q = j;
            }
          }
        }
      }
      if (a[p][p] === a[q][q])
        theta = (a[p][q] > 0) ? Math.PI / 4 : -Math.PI / 4;
      else
        theta = Math.atan(2 * a[p][q] / (a[p][p] - a[q][q])) / 2;
      s = jStat.identity(n, n);
      s[p][p] = Math.cos(theta);
      s[p][q] = -Math.sin(theta);
      s[q][p] = Math.sin(theta);
      s[q][q] = Math.cos(theta);
      // eigen vector matrix
      e = jStat.multiply(e, s);
      b = jStat.multiply(jStat.multiply(jStat.inv(s), a), s);
      a = b;
      condition = 0;
      for (i = 1; i < n; i++) {
        for (j = 1; j < n; j++) {
          if (i != j && Math.abs(a[i][j]) > 0.001) {
            condition = 1;
          }
        }
      }
    }
    for (i = 0; i < n; i++) ev.push(a[i][i]);
    //returns both the eigenvalue and eigenmatrix
    return [e, ev];
  },

  rungekutta: function rungekutta(f, h, p, t_j, u_j, order) {
    var k1, k2, u_j1, k3, k4;
    if (order === 2) {
      while (t_j <= p) {
        k1 = h * f(t_j, u_j);
        k2 = h * f(t_j + h, u_j + k1);
        u_j1 = u_j + (k1 + k2) / 2;
        u_j = u_j1;
        t_j = t_j + h;
      }
    }
    if (order === 4) {
      while (t_j <= p) {
        k1 = h * f(t_j, u_j);
        k2 = h * f(t_j + h / 2, u_j + k1 / 2);
        k3 = h * f(t_j + h / 2, u_j + k2 / 2);
        k4 = h * f(t_j +h, u_j + k3);
        u_j1 = u_j + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
        u_j = u_j1;
        t_j = t_j + h;
      }
    }
    return u_j;
  },

  romberg: function romberg(f, a, b, order) {
    var i = 0;
    var h = (b - a) / 2;
    var x = [];
    var h1 = [];
    var g = [];
    var m, a1, j, k, I, d;
    while (i < order / 2) {
      I = f(a);
      for (j = a, k = 0; j <= b; j = j + h, k++) x[k] = j;
      m = x.length;
      for (j = 1; j < m - 1; j++) {
        I += (((j % 2) !== 0) ? 4 : 2) * f(x[j]);
      }
      I = (h / 3) * (I + f(b));
      g[i] = I;
      h /= 2;
      i++;
    }
    a1 = g.length;
    m = 1;
    while (a1 !== 1) {
      for (j = 0; j < a1 - 1; j++)
      h1[j] = ((Math.pow(4, m)) * g[j + 1] - g[j]) / (Math.pow(4, m) - 1);
      a1 = h1.length;
      g = h1;
      h1 = [];
      m++;
    }
    return g;
  },

  richardson: function richardson(X, f, x, h) {
    function pos(X, x) {
      var i = 0;
      var n = X.length;
      var p;
      for (; i < n; i++)
        if (X[i] === x) p = i;
      return p;
    }
    var n = X.length,
    h_min = Math.abs(x - X[pos(X, x) + 1]),
    i = 0,
    g = [],
    h1 = [],
    y1, y2, m, a, j;
    while (h >= h_min) {
      y1 = pos(X, x + h);
      y2 = pos(X, x);
      g[i] = (f[y1] - 2 * f[y2] + f[2 * y2 - y1]) / (h * h);
      h /= 2;
      i++;
    }
    a = g.length;
    m = 1;
    while (a != 1) {
      for (j = 0; j < a - 1; j++)
      h1[j] = ((Math.pow(4, m)) * g[j + 1] - g[j]) / (Math.pow(4, m) - 1);
      a = h1.length;
      g = h1;
      h1 = [];
      m++;
    }
    return g;
  },

  simpson: function simpson(f, a, b, n) {
    var h = (b - a) / n;
    var I = f(a);
    var x = [];
    var j = a;
    var k = 0;
    var i = 1;
    var m;
    for (; j <= b; j = j + h, k++)
      x[k] = j;
    m = x.length;
    for (; i < m - 1; i++) {
      I += ((i % 2 !== 0) ? 4 : 2) * f(x[i]);
    }
    return (h / 3) * (I + f(b));
  },

  hermite: function hermite(X, F, dF, value) {
    var n = X.length;
    var p = 0;
    var i = 0;
    var l = [];
    var dl = [];
    var A = [];
    var B = [];
    var j;
    for (; i < n; i++) {
      l[i] = 1;
      for (j = 0; j < n; j++) {
        if (i != j) l[i] *= (value - X[j]) / (X[i] - X[j]);
      }
      dl[i] = 0;
      for (j = 0; j < n; j++) {
        if (i != j) dl[i] += 1 / (X [i] - X[j]);
      }
      A[i] = (1 - 2 * (value - X[i]) * dl[i]) * (l[i] * l[i]);
      B[i] = (value - X[i]) * (l[i] * l[i]);
      p += (A[i] * F[i] + B[i] * dF[i]);
    }
    return p;
  },

  lagrange: function lagrange(X, F, value) {
    var p = 0;
    var i = 0;
    var j, l;
    var n = X.length;
    for (; i < n; i++) {
      l = F[i];
      for (j = 0; j < n; j++) {
        // calculating the lagrange polynomial L_i
        if (i != j) l *= (value - X[j]) / (X[i] - X[j]);
      }
      // adding the lagrange polynomials found above
      p += l;
    }
    return p;
  },

  cubic_spline: function cubic_spline(X, F, value) {
    var n = X.length;
    var i = 0, j;
    var A = [];
    var B = [];
    var alpha = [];
    var c = [];
    var h = [];
    var b = [];
    var d = [];
    for (; i < n - 1; i++)
      h[i] = X[i + 1] - X[i];
    alpha[0] = 0;
    for (i = 1; i < n - 1; i++) {
      alpha[i] = (3 / h[i]) * (F[i + 1] - F[i]) -
          (3 / h[i-1]) * (F[i] - F[i-1]);
    }
    for (i = 1; i < n - 1; i++) {
      A[i] = [];
      B[i] = [];
      A[i][i-1] = h[i-1];
      A[i][i] = 2 * (h[i - 1] + h[i]);
      A[i][i+1] = h[i];
      B[i][0] = alpha[i];
    }
    c = jStat.multiply(jStat.inv(A), B);
    for (j = 0; j < n - 1; j++) {
      b[j] = (F[j + 1] - F[j]) / h[j] - h[j] * (c[j + 1][0] + 2 * c[j][0]) / 3;
      d[j] = (c[j + 1][0] - c[j][0]) / (3 * h[j]);
    }
    for (j = 0; j < n; j++) {
      if (X[j] > value) break;
    }
    j -= 1;
    return F[j] + (value - X[j]) * b[j] + jStat.sq(value-X[j]) *
        c[j] + (value - X[j]) * jStat.sq(value - X[j]) * d[j];
  },

  gauss_quadrature: function gauss_quadrature() {
    throw new Error('gauss_quadrature not yet implemented');
  },

  PCA: function PCA(X) {
    var m = X.length;
    var n = X[0].length;
    var flag = false;
    var i = 0;
    var j, temp1;
    var u = [];
    var D = [];
    var result = [];
    var temp2 = [];
    var Y = [];
    var Bt = [];
    var B = [];
    var C = [];
    var V = [];
    var Vt = [];
    for (i = 0; i < m; i++) {
      u[i] = jStat.sum(X[i]) / n;
    }
    for (i = 0; i < n; i++) {
      B[i] = [];
      for(j = 0; j < m; j++) {
        B[i][j] = X[j][i] - u[j];
      }
    }
    B = jStat.transpose(B);
    for (i = 0; i < m; i++) {
      C[i] = [];
      for (j = 0; j < m; j++) {
        C[i][j] = (jStat.dot([B[i]], [B[j]])) / (n - 1);
      }
    }
    result = jStat.jacobi(C);
    V = result[0];
    D = result[1];
    Vt = jStat.transpose(V);
    for (i = 0; i < D.length; i++) {
      for (j = i; j < D.length; j++) {
        if(D[i] < D[j])  {
          temp1 = D[i];
          D[i] = D[j];
          D[j] = temp1;
          temp2 = Vt[i];
          Vt[i] = Vt[j];
          Vt[j] = temp2;
        }
      }
    }
    Bt = jStat.transpose(B);
    for (i = 0; i < m; i++) {
      Y[i] = [];
      for (j = 0; j < Bt.length; j++) {
        Y[i][j] = jStat.dot([Vt[i]], [Bt[j]]);
      }
    }
    return [X, D, Vt, Y];
  }
});

// extend jStat.fn with methods that require one argument
(function(funcs) {
  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
    jStat.fn[passfunc] = function(arg, func) {
      var tmpthis = this;
      // check for callback
      if (func) {
        setTimeout(function() {
          func.call(tmpthis, jStat.fn[passfunc].call(tmpthis, arg));
        }, 15);
        return this;
      }
      if (typeof jStat[passfunc](this, arg) === 'number')
        return jStat[passfunc](this, arg);
      else
        return jStat(jStat[passfunc](this, arg));
    };
  }(funcs[i]));
}('add divide multiply subtract dot pow abs norm angle'.split(' ')));

}(this.jStat, Math));
(function(jStat, Math) {

var slice = [].slice;
var isNumber = jStat.utils.isNumber;

// flag==true denotes use of sample standard deviation
// Z Statistics
jStat.extend({
  // 2 different parameter lists:
  // (value, mean, sd)
  // (value, array, flag)
  zscore: function zscore() {
    var args = slice.call(arguments);
    if (isNumber(args[1])) {
      return (args[0] - args[1]) / args[2];
    }
    return (args[0] - jStat.mean(args[1])) / jStat.stdev(args[1], args[2]);
  },

  // 3 different paramter lists:
  // (value, mean, sd, sides)
  // (zscore, sides)
  // (value, array, sides, flag)
  ztest: function ztest() {
    var args = slice.call(arguments);
    if (args.length === 4) {
      if(isNumber(args[1])) {
        var z = jStat.zscore(args[0],args[1],args[2])
        return (args[3] === 1) ?
          (jStat.normal.cdf(-Math.abs(z),0,1)) :
          (jStat.normal.cdf(-Math.abs(z),0,1)* 2);
      }
      var z = args[0]
      return (args[2] === 1) ?
        (jStat.normal.cdf(-Math.abs(z),0,1)) :
        (jStat.normal.cdf(-Math.abs(z),0,1)*2);
    }
    var z = jStat.zscore(args[0],args[1],args[3])
    return (args[1] === 1) ?
      (jStat.normal.cdf(-Math.abs(z), 0, 1)) :
      (jStat.normal.cdf(-Math.abs(z), 0, 1)*2);
  }
});

jStat.extend(jStat.fn, {
  zscore: function zscore(value, flag) {
    return (value - this.mean()) / this.stdev(flag);
  },

  ztest: function ztest(value, sides, flag) {
    var zscore = Math.abs(this.zscore(value, flag));
    return (sides === 1) ?
      (jStat.normal.cdf(-zscore, 0, 1)) :
      (jStat.normal.cdf(-zscore, 0, 1) * 2);
  }
});

// T Statistics
jStat.extend({
  // 2 parameter lists
  // (value, mean, sd, n)
  // (value, array)
  tscore: function tscore() {
    var args = slice.call(arguments);
    return (args.length === 4) ?
      ((args[0] - args[1]) / (args[2] / Math.sqrt(args[3]))) :
      ((args[0] - jStat.mean(args[1])) /
       (jStat.stdev(args[1], true) / Math.sqrt(args[1].length)));
  },

  // 3 different paramter lists:
  // (value, mean, sd, n, sides)
  // (tscore, n, sides)
  // (value, array, sides)
  ttest: function ttest() {
    var args = slice.call(arguments);
    var tscore;
    if (args.length === 5) {
      tscore = Math.abs(jStat.tscore(args[0], args[1], args[2], args[3]));
      return (args[4] === 1) ?
        (jStat.studentt.cdf(-tscore, args[3]-1)) :
        (jStat.studentt.cdf(-tscore, args[3]-1)*2);
    }
    if (isNumber(args[1])) {
      tscore = Math.abs(args[0])
      return (args[2] == 1) ?
        (jStat.studentt.cdf(-tscore, args[1]-1)) :
        (jStat.studentt.cdf(-tscore, args[1]-1) * 2);
    }
    tscore = Math.abs(jStat.tscore(args[0], args[1]))
    return (args[2] == 1) ?
      (jStat.studentt.cdf(-tscore, args[1].length-1)) :
      (jStat.studentt.cdf(-tscore, args[1].length-1) * 2);
  }
});

jStat.extend(jStat.fn, {
  tscore: function tscore(value) {
    return (value - this.mean()) / (this.stdev(true) / Math.sqrt(this.cols()));
  },

  ttest: function ttest(value, sides) {
    return (sides === 1) ?
      (1 - jStat.studentt.cdf(Math.abs(this.tscore(value)), this.cols()-1)) :
      (jStat.studentt.cdf(-Math.abs(this.tscore(value)), this.cols()-1)*2);
  }
});

// F Statistics
jStat.extend({
  // Paramter list is as follows:
  // (array1, array2, array3, ...)
  // or it is an array of arrays
  // array of arrays conversion
  anovafscore: function anovafscore() {
    var args = slice.call(arguments),
    expVar, sample, sampMean, sampSampMean, tmpargs, unexpVar, i, j;
    if (args.length === 1) {
      tmpargs = new Array(args[0].length);
      for (i = 0; i < args[0].length; i++) {
        tmpargs[i] = args[0][i];
      }
      args = tmpargs;
    }
    // 2 sample case
    if (args.length === 2) {
      return jStat.variance(args[0]) / jStat.variance(args[1]);
    }
    // Builds sample array
    sample = new Array();
    for (i = 0; i < args.length; i++) {
      sample = sample.concat(args[i]);
    }
    sampMean = jStat.mean(sample);
    // Computes the explained variance
    expVar = 0;
    for (i = 0; i < args.length; i++) {
      expVar = expVar + args[i].length * Math.pow(jStat.mean(args[i]) - sampMean, 2);
    }
    expVar /= (args.length - 1);
    // Computes unexplained variance
    unexpVar = 0;
    for (i = 0; i < args.length; i++) {
      sampSampMean = jStat.mean(args[i]);
      for (j = 0; j < args[i].length; j++) {
        unexpVar += Math.pow(args[i][j] - sampSampMean, 2);
      }
    }
    unexpVar /= (sample.length - args.length);
    return expVar / unexpVar;
  },

  // 2 different paramter setups
  // (array1, array2, array3, ...)
  // (anovafscore, df1, df2)
  anovaftest: function anovaftest() {
    var args = slice.call(arguments),
    df1, df2, n, i;
    if (isNumber(args[0])) {
      return 1 - jStat.centralF.cdf(args[0], args[1], args[2]);
    }
    anovafscore = jStat.anovafscore(args);
    df1 = args.length - 1;
    n = 0;
    for (i = 0; i < args.length; i++) {
      n = n + args[i].length;
    }
    df2 = n - df1 - 1;
    return 1 - jStat.centralF.cdf(anovafscore, df1, df2);
  },

  ftest: function ftest(fscore, df1, df2) {
    return 1 - jStat.centralF.cdf(fscore, df1, df2);
  }
});

jStat.extend(jStat.fn, {
  anovafscore: function anovafscore() {
    return jStat.anovafscore(this.toArray());
  },

  anovaftes: function anovaftes() {
    var n = 0;
    var i;
    for (i = 0; i < this.length; i++) {
      n = n + this[i].length;
    }
    return jStat.ftest(this.anovafscore(), this.length - 1, n - this.length);
  }
});

// Error Bounds
jStat.extend({
  // 2 different parameter setups
  // (value, alpha, sd, n)
  // (value, alpha, array)
  normalci: function normalci() {
    var args = slice.call(arguments),
    ans = new Array(2),
    change;
    if (args.length === 4) {
      change = Math.abs(jStat.normal.inv(args[1] / 2, 0, 1) *
                        args[2] / Math.sqrt(args[3]));
    } else {
      change = Math.abs(jStat.normal.inv(args[1] / 2, 0, 1) *
                        jStat.stdev(args[2]) / Math.sqrt(args[2].length));
    }
    ans[0] = args[0] - change;
    ans[1] = args[0] + change;
    return ans;
  },

  // 2 different parameter setups
  // (value, alpha, sd, n)
  // (value, alpha, array)
  tci: function tci() {
    var args = slice.call(arguments),
    ans = new Array(2),
    change;
    if (args.length === 4) {
      change = Math.abs(jStat.studentt.inv(args[1] / 2, args[3] - 1) *
                        args[2] / Math.sqrt(args[3]));
    } else {
      change = Math.abs(jStat.studentt.inv(args[1] / 2, args[2].length - 1) *
                        jStat.stdev(args[2], true) / Math.sqrt(args[2].length));
    }
    ans[0] = args[0] - change;
    ans[1] = args[0] + change;
    return ans;
  },

  significant: function significant(pvalue, alpha) {
    return pvalue < alpha;
  }
});

jStat.extend(jStat.fn, {
  normalci: function normalci(value, alpha) {
    return jStat.normalci(value, alpha, this.toArray());
  },

  tci: function tci(value, alpha) {
    return jStat.tci(value, alpha, this.toArray());
  }
});

}(this.jStat, Math));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/formulajs-connect\\node_modules\\jStat\\dist\\jstat.js","/formulajs-connect\\node_modules\\jStat\\dist",undefined)
},{"_process":38,"buffer":36}],6:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
/*!
 * numeral.js
 * version : 1.5.3
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */

(function () {

    /************************************
        Constants
    ************************************/

    var numeral,
        VERSION = '1.5.3',
        // internal storage for language config files
        languages = {},
        currentLanguage = 'en',
        zeroFormat = null,
        defaultFormat = '0,0',
        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports);


    /************************************
        Constructors
    ************************************/


    // Numeral prototype object
    function Numeral (number) {
        this._value = number;
    }

    /**
     * Implementation of toFixed() that treats floats more like decimals
     *
     * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
     * problems for accounting- and finance-related software.
     */
    function toFixed (value, precision, roundingFunction, optionals) {
        var power = Math.pow(10, precision),
            optionalsRegExp,
            output;
            
        //roundingFunction = (roundingFunction !== undefined ? roundingFunction : Math.round);
        // Multiply up by precision, round accurately, then divide and use native toFixed():
        output = (roundingFunction(value * power) / power).toFixed(precision);

        if (optionals) {
            optionalsRegExp = new RegExp('0{1,' + optionals + '}$');
            output = output.replace(optionalsRegExp, '');
        }

        return output;
    }

    /************************************
        Formatting
    ************************************/

    // determine what type of formatting we need to do
    function formatNumeral (n, format, roundingFunction) {
        var output;

        // figure out what kind of format we are dealing with
        if (format.indexOf('$') > -1) { // currency!!!!!
            output = formatCurrency(n, format, roundingFunction);
        } else if (format.indexOf('%') > -1) { // percentage
            output = formatPercentage(n, format, roundingFunction);
        } else if (format.indexOf(':') > -1) { // time
            output = formatTime(n, format);
        } else { // plain ol' numbers or bytes
            output = formatNumber(n._value, format, roundingFunction);
        }

        // return string
        return output;
    }

    // revert to number
    function unformatNumeral (n, string) {
        var stringOriginal = string,
            thousandRegExp,
            millionRegExp,
            billionRegExp,
            trillionRegExp,
            suffixes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            bytesMultiplier = false,
            power;

        if (string.indexOf(':') > -1) {
            n._value = unformatTime(string);
        } else {
            if (string === zeroFormat) {
                n._value = 0;
            } else {
                if (languages[currentLanguage].delimiters.decimal !== '.') {
                    string = string.replace(/\./g,'').replace(languages[currentLanguage].delimiters.decimal, '.');
                }

                // see if abbreviations are there so that we can multiply to the correct number
                thousandRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.thousand + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                millionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.million + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                billionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.billion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                trillionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.trillion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');

                // see if bytes are there so that we can multiply to the correct number
                for (power = 0; power <= suffixes.length; power++) {
                    bytesMultiplier = (string.indexOf(suffixes[power]) > -1) ? Math.pow(1024, power + 1) : false;

                    if (bytesMultiplier) {
                        break;
                    }
                }

                // do some math to create our number
                n._value = ((bytesMultiplier) ? bytesMultiplier : 1) * ((stringOriginal.match(thousandRegExp)) ? Math.pow(10, 3) : 1) * ((stringOriginal.match(millionRegExp)) ? Math.pow(10, 6) : 1) * ((stringOriginal.match(billionRegExp)) ? Math.pow(10, 9) : 1) * ((stringOriginal.match(trillionRegExp)) ? Math.pow(10, 12) : 1) * ((string.indexOf('%') > -1) ? 0.01 : 1) * (((string.split('-').length + Math.min(string.split('(').length-1, string.split(')').length-1)) % 2)? 1: -1) * Number(string.replace(/[^0-9\.]+/g, ''));

                // round if we are talking about bytes
                n._value = (bytesMultiplier) ? Math.ceil(n._value) : n._value;
            }
        }
        return n._value;
    }

    function formatCurrency (n, format, roundingFunction) {
        var symbolIndex = format.indexOf('$'),
            openParenIndex = format.indexOf('('),
            minusSignIndex = format.indexOf('-'),
            space = '',
            spliceIndex,
            output;

        // check for space before or after currency
        if (format.indexOf(' $') > -1) {
            space = ' ';
            format = format.replace(' $', '');
        } else if (format.indexOf('$ ') > -1) {
            space = ' ';
            format = format.replace('$ ', '');
        } else {
            format = format.replace('$', '');
        }

        // format the number
        output = formatNumber(n._value, format, roundingFunction);

        // position the symbol
        if (symbolIndex <= 1) {
            if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {
                output = output.split('');
                spliceIndex = 1;
                if (symbolIndex < openParenIndex || symbolIndex < minusSignIndex){
                    // the symbol appears before the "(" or "-"
                    spliceIndex = 0;
                }
                output.splice(spliceIndex, 0, languages[currentLanguage].currency.symbol + space);
                output = output.join('');
            } else {
                output = languages[currentLanguage].currency.symbol + space + output;
            }
        } else {
            if (output.indexOf(')') > -1) {
                output = output.split('');
                output.splice(-1, 0, space + languages[currentLanguage].currency.symbol);
                output = output.join('');
            } else {
                output = output + space + languages[currentLanguage].currency.symbol;
            }
        }

        return output;
    }

    function formatPercentage (n, format, roundingFunction) {
        var space = '',
            output,
            value = n._value * 100;

        // check for space before %
        if (format.indexOf(' %') > -1) {
            space = ' ';
            format = format.replace(' %', '');
        } else {
            format = format.replace('%', '');
        }

        output = formatNumber(value, format, roundingFunction);
        
        if (output.indexOf(')') > -1 ) {
            output = output.split('');
            output.splice(-1, 0, space + '%');
            output = output.join('');
        } else {
            output = output + space + '%';
        }

        return output;
    }

    function formatTime (n) {
        var hours = Math.floor(n._value/60/60),
            minutes = Math.floor((n._value - (hours * 60 * 60))/60),
            seconds = Math.round(n._value - (hours * 60 * 60) - (minutes * 60));
        return hours + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
    }

    function unformatTime (string) {
        var timeArray = string.split(':'),
            seconds = 0;
        // turn hours and minutes into seconds and add them all up
        if (timeArray.length === 3) {
            // hours
            seconds = seconds + (Number(timeArray[0]) * 60 * 60);
            // minutes
            seconds = seconds + (Number(timeArray[1]) * 60);
            // seconds
            seconds = seconds + Number(timeArray[2]);
        } else if (timeArray.length === 2) {
            // minutes
            seconds = seconds + (Number(timeArray[0]) * 60);
            // seconds
            seconds = seconds + Number(timeArray[1]);
        }
        return Number(seconds);
    }

    function formatNumber (value, format, roundingFunction) {
        var negP = false,
            signed = false,
            optDec = false,
            abbr = '',
            abbrK = false, // force abbreviation to thousands
            abbrM = false, // force abbreviation to millions
            abbrB = false, // force abbreviation to billions
            abbrT = false, // force abbreviation to trillions
            abbrForce = false, // force abbreviation
            bytes = '',
            ord = '',
            abs = Math.abs(value),
            suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            min,
            max,
            power,
            w,
            precision,
            thousands,
            d = '',
            neg = false;

        // check if number is zero and a custom zero format has been set
        if (value === 0 && zeroFormat !== null) {
            return zeroFormat;
        } else {
            // see if we should use parentheses for negative number or if we should prefix with a sign
            // if both are present we default to parentheses
            if (format.indexOf('(') > -1) {
                negP = true;
                format = format.slice(1, -1);
            } else if (format.indexOf('+') > -1) {
                signed = true;
                format = format.replace(/\+/g, '');
            }

            // see if abbreviation is wanted
            if (format.indexOf('a') > -1) {
                // check if abbreviation is specified
                abbrK = format.indexOf('aK') >= 0;
                abbrM = format.indexOf('aM') >= 0;
                abbrB = format.indexOf('aB') >= 0;
                abbrT = format.indexOf('aT') >= 0;
                abbrForce = abbrK || abbrM || abbrB || abbrT;

                // check for space before abbreviation
                if (format.indexOf(' a') > -1) {
                    abbr = ' ';
                    format = format.replace(' a', '');
                } else {
                    format = format.replace('a', '');
                }

                if (abs >= Math.pow(10, 12) && !abbrForce || abbrT) {
                    // trillion
                    abbr = abbr + languages[currentLanguage].abbreviations.trillion;
                    value = value / Math.pow(10, 12);
                } else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9) && !abbrForce || abbrB) {
                    // billion
                    abbr = abbr + languages[currentLanguage].abbreviations.billion;
                    value = value / Math.pow(10, 9);
                } else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6) && !abbrForce || abbrM) {
                    // million
                    abbr = abbr + languages[currentLanguage].abbreviations.million;
                    value = value / Math.pow(10, 6);
                } else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3) && !abbrForce || abbrK) {
                    // thousand
                    abbr = abbr + languages[currentLanguage].abbreviations.thousand;
                    value = value / Math.pow(10, 3);
                }
            }

            // see if we are formatting bytes
            if (format.indexOf('b') > -1) {
                // check for space before
                if (format.indexOf(' b') > -1) {
                    bytes = ' ';
                    format = format.replace(' b', '');
                } else {
                    format = format.replace('b', '');
                }

                for (power = 0; power <= suffixes.length; power++) {
                    min = Math.pow(1024, power);
                    max = Math.pow(1024, power+1);

                    if (value >= min && value < max) {
                        bytes = bytes + suffixes[power];
                        if (min > 0) {
                            value = value / min;
                        }
                        break;
                    }
                }
            }

            // see if ordinal is wanted
            if (format.indexOf('o') > -1) {
                // check for space before
                if (format.indexOf(' o') > -1) {
                    ord = ' ';
                    format = format.replace(' o', '');
                } else {
                    format = format.replace('o', '');
                }

                ord = ord + languages[currentLanguage].ordinal(value);
            }

            if (format.indexOf('[.]') > -1) {
                optDec = true;
                format = format.replace('[.]', '.');
            }

            w = value.toString().split('.')[0];
            precision = format.split('.')[1];
            thousands = format.indexOf(',');

            if (precision) {
                if (precision.indexOf('[') > -1) {
                    precision = precision.replace(']', '');
                    precision = precision.split('[');
                    d = toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
                } else {
                    d = toFixed(value, precision.length, roundingFunction);
                }

                w = d.split('.')[0];

                if (d.split('.')[1].length) {
                    d = languages[currentLanguage].delimiters.decimal + d.split('.')[1];
                } else {
                    d = '';
                }

                if (optDec && Number(d.slice(1)) === 0) {
                    d = '';
                }
            } else {
                w = toFixed(value, null, roundingFunction);
            }

            // format number
            if (w.indexOf('-') > -1) {
                w = w.slice(1);
                neg = true;
            }

            if (thousands > -1) {
                w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + languages[currentLanguage].delimiters.thousands);
            }

            if (format.indexOf('.') === 0) {
                w = '';
            }

            return ((negP && neg) ? '(' : '') + ((!negP && neg) ? '-' : '') + ((!neg && signed) ? '+' : '') + w + d + ((ord) ? ord : '') + ((abbr) ? abbr : '') + ((bytes) ? bytes : '') + ((negP && neg) ? ')' : '');
        }
    }

    /************************************
        Top Level Functions
    ************************************/

    numeral = function (input) {
        if (numeral.isNumeral(input)) {
            input = input.value();
        } else if (input === 0 || typeof input === 'undefined') {
            input = 0;
        } else if (!Number(input)) {
            input = numeral.fn.unformat(input);
        }

        return new Numeral(Number(input));
    };

    // version number
    numeral.version = VERSION;

    // compare numeral object
    numeral.isNumeral = function (obj) {
        return obj instanceof Numeral;
    };

    // This function will load languages and then set the global language.  If
    // no arguments are passed in, it will simply return the current global
    // language key.
    numeral.language = function (key, values) {
        if (!key) {
            return currentLanguage;
        }

        if (key && !values) {
            if(!languages[key]) {
                throw new Error('Unknown language : ' + key);
            }
            currentLanguage = key;
        }

        if (values || !languages[key]) {
            loadLanguage(key, values);
        }

        return numeral;
    };
    
    // This function provides access to the loaded language data.  If
    // no arguments are passed in, it will simply return the current
    // global language object.
    numeral.languageData = function (key) {
        if (!key) {
            return languages[currentLanguage];
        }
        
        if (!languages[key]) {
            throw new Error('Unknown language : ' + key);
        }
        
        return languages[key];
    };

    numeral.language('en', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            var b = number % 10;
            return (~~ (number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
        },
        currency: {
            symbol: '$'
        }
    });

    numeral.zeroFormat = function (format) {
        zeroFormat = typeof(format) === 'string' ? format : null;
    };

    numeral.defaultFormat = function (format) {
        defaultFormat = typeof(format) === 'string' ? format : '0.0';
    };

    /************************************
        Helpers
    ************************************/

    function loadLanguage(key, values) {
        languages[key] = values;
    }

    /************************************
        Floating-point helpers
    ************************************/

    // The floating-point helper functions and implementation
    // borrows heavily from sinful.js: http://guipn.github.io/sinful.js/

    /**
     * Array.prototype.reduce for browsers that don't support it
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Compatibility
     */
    if ('function' !== typeof Array.prototype.reduce) {
        Array.prototype.reduce = function (callback, opt_initialValue) {
            'use strict';
            
            if (null === this || 'undefined' === typeof this) {
                // At the moment all modern browsers, that support strict mode, have
                // native implementation of Array.prototype.reduce. For instance, IE8
                // does not support strict mode, so this check is actually useless.
                throw new TypeError('Array.prototype.reduce called on null or undefined');
            }
            
            if ('function' !== typeof callback) {
                throw new TypeError(callback + ' is not a function');
            }

            var index,
                value,
                length = this.length >>> 0,
                isValueSet = false;

            if (1 < arguments.length) {
                value = opt_initialValue;
                isValueSet = true;
            }

            for (index = 0; length > index; ++index) {
                if (this.hasOwnProperty(index)) {
                    if (isValueSet) {
                        value = callback(value, this[index], index, this);
                    } else {
                        value = this[index];
                        isValueSet = true;
                    }
                }
            }

            if (!isValueSet) {
                throw new TypeError('Reduce of empty array with no initial value');
            }

            return value;
        };
    }

    
    /**
     * Computes the multiplier necessary to make x >= 1,
     * effectively eliminating miscalculations caused by
     * finite precision.
     */
    function multiplier(x) {
        var parts = x.toString().split('.');
        if (parts.length < 2) {
            return 1;
        }
        return Math.pow(10, parts[1].length);
    }

    /**
     * Given a variable number of arguments, returns the maximum
     * multiplier that must be used to normalize an operation involving
     * all of them.
     */
    function correctionFactor() {
        var args = Array.prototype.slice.call(arguments);
        return args.reduce(function (prev, next) {
            var mp = multiplier(prev),
                mn = multiplier(next);
        return mp > mn ? mp : mn;
        }, -Infinity);
    }        


    /************************************
        Numeral Prototype
    ************************************/


    numeral.fn = Numeral.prototype = {

        clone : function () {
            return numeral(this);
        },

        format : function (inputString, roundingFunction) {
            return formatNumeral(this, 
                  inputString ? inputString : defaultFormat, 
                  (roundingFunction !== undefined) ? roundingFunction : Math.round
              );
        },

        unformat : function (inputString) {
            if (Object.prototype.toString.call(inputString) === '[object Number]') { 
                return inputString; 
            }
            return unformatNumeral(this, inputString ? inputString : defaultFormat);
        },

        value : function () {
            return this._value;
        },

        valueOf : function () {
            return this._value;
        },

        set : function (value) {
            this._value = Number(value);
            return this;
        },

        add : function (value) {
            var corrFactor = correctionFactor.call(null, this._value, value);
            function cback(accum, curr, currI, O) {
                return accum + corrFactor * curr;
            }
            this._value = [this._value, value].reduce(cback, 0) / corrFactor;
            return this;
        },

        subtract : function (value) {
            var corrFactor = correctionFactor.call(null, this._value, value);
            function cback(accum, curr, currI, O) {
                return accum - corrFactor * curr;
            }
            this._value = [value].reduce(cback, this._value * corrFactor) / corrFactor;            
            return this;
        },

        multiply : function (value) {
            function cback(accum, curr, currI, O) {
                var corrFactor = correctionFactor(accum, curr);
                return (accum * corrFactor) * (curr * corrFactor) /
                    (corrFactor * corrFactor);
            }
            this._value = [this._value, value].reduce(cback, 1);
            return this;
        },

        divide : function (value) {
            function cback(accum, curr, currI, O) {
                var corrFactor = correctionFactor(accum, curr);
                return (accum * corrFactor) / (curr * corrFactor);
            }
            this._value = [this._value, value].reduce(cback);            
            return this;
        },

        difference : function (value) {
            return Math.abs(numeral(this._value).subtract(value).value());
        }

    };

    /************************************
        Exposing Numeral
    ************************************/

    // CommonJS module is defined
    if (hasModule) {
        module.exports = numeral;
    }

    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `numeral` as a global object via a string identifier,
        // for Closure Compiler 'advanced' mode
        this['numeral'] = numeral;
    }

    /*global define:false */
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return numeral;
        });
    }
}).call(this);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/formulajs-connect\\node_modules\\numeral\\numeral.js","/formulajs-connect\\node_modules\\numeral",undefined)
},{"_process":38,"buffer":36}],7:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
"use strict";

var numeric = (typeof exports === "undefined")?(function numeric() {}):(exports);
if(typeof global !== "undefined") { global.numeric = numeric; }

numeric.version = "1.2.6";

// 1. Utility functions
numeric.bench = function bench (f,interval) {
    var t1,t2,n,i;
    if(typeof interval === "undefined") { interval = 15; }
    n = 0.5;
    t1 = new Date();
    while(1) {
        n*=2;
        for(i=n;i>3;i-=4) { f(); f(); f(); f(); }
        while(i>0) { f(); i--; }
        t2 = new Date();
        if(t2-t1 > interval) break;
    }
    for(i=n;i>3;i-=4) { f(); f(); f(); f(); }
    while(i>0) { f(); i--; }
    t2 = new Date();
    return 1000*(3*n-1)/(t2-t1);
}

numeric._myIndexOf = (function _myIndexOf(w) {
    var n = this.length,k;
    for(k=0;k<n;++k) if(this[k]===w) return k;
    return -1;
});
numeric.myIndexOf = (Array.prototype.indexOf)?Array.prototype.indexOf:numeric._myIndexOf;

numeric.Function = Function;
numeric.precision = 4;
numeric.largeArray = 50;

numeric.prettyPrint = function prettyPrint(x) {
    function fmtnum(x) {
        if(x === 0) { return '0'; }
        if(isNaN(x)) { return 'NaN'; }
        if(x<0) { return '-'+fmtnum(-x); }
        if(isFinite(x)) {
            var scale = Math.floor(Math.log(x) / Math.log(10));
            var normalized = x / Math.pow(10,scale);
            var basic = normalized.toPrecision(numeric.precision);
            if(parseFloat(basic) === 10) { scale++; normalized = 1; basic = normalized.toPrecision(numeric.precision); }
            return parseFloat(basic).toString()+'e'+scale.toString();
        }
        return 'Infinity';
    }
    var ret = [];
    function foo(x) {
        var k;
        if(typeof x === "undefined") { ret.push(Array(numeric.precision+8).join(' ')); return false; }
        if(typeof x === "string") { ret.push('"'+x+'"'); return false; }
        if(typeof x === "boolean") { ret.push(x.toString()); return false; }
        if(typeof x === "number") {
            var a = fmtnum(x);
            var b = x.toPrecision(numeric.precision);
            var c = parseFloat(x.toString()).toString();
            var d = [a,b,c,parseFloat(b).toString(),parseFloat(c).toString()];
            for(k=1;k<d.length;k++) { if(d[k].length < a.length) a = d[k]; }
            ret.push(Array(numeric.precision+8-a.length).join(' ')+a);
            return false;
        }
        if(x === null) { ret.push("null"); return false; }
        if(typeof x === "function") { 
            ret.push(x.toString());
            var flag = false;
            for(k in x) { if(x.hasOwnProperty(k)) { 
                if(flag) ret.push(',\n');
                else ret.push('\n{');
                flag = true; 
                ret.push(k); 
                ret.push(': \n'); 
                foo(x[k]); 
            } }
            if(flag) ret.push('}\n');
            return true;
        }
        if(x instanceof Array) {
            if(x.length > numeric.largeArray) { ret.push('...Large Array...'); return true; }
            var flag = false;
            ret.push('[');
            for(k=0;k<x.length;k++) { if(k>0) { ret.push(','); if(flag) ret.push('\n '); } flag = foo(x[k]); }
            ret.push(']');
            return true;
        }
        ret.push('{');
        var flag = false;
        for(k in x) { if(x.hasOwnProperty(k)) { if(flag) ret.push(',\n'); flag = true; ret.push(k); ret.push(': \n'); foo(x[k]); } }
        ret.push('}');
        return true;
    }
    foo(x);
    return ret.join('');
}

numeric.parseDate = function parseDate(d) {
    function foo(d) {
        if(typeof d === 'string') { return Date.parse(d.replace(/-/g,'/')); }
        if(!(d instanceof Array)) { throw new Error("parseDate: parameter must be arrays of strings"); }
        var ret = [],k;
        for(k=0;k<d.length;k++) { ret[k] = foo(d[k]); }
        return ret;
    }
    return foo(d);
}

numeric.parseFloat = function parseFloat_(d) {
    function foo(d) {
        if(typeof d === 'string') { return parseFloat(d); }
        if(!(d instanceof Array)) { throw new Error("parseFloat: parameter must be arrays of strings"); }
        var ret = [],k;
        for(k=0;k<d.length;k++) { ret[k] = foo(d[k]); }
        return ret;
    }
    return foo(d);
}

numeric.parseCSV = function parseCSV(t) {
    var foo = t.split('\n');
    var j,k;
    var ret = [];
    var pat = /(([^'",]*)|('[^']*')|("[^"]*")),/g;
    var patnum = /^\s*(([+-]?[0-9]+(\.[0-9]*)?(e[+-]?[0-9]+)?)|([+-]?[0-9]*(\.[0-9]+)?(e[+-]?[0-9]+)?))\s*$/;
    var stripper = function(n) { return n.substr(0,n.length-1); }
    var count = 0;
    for(k=0;k<foo.length;k++) {
      var bar = (foo[k]+",").match(pat),baz;
      if(bar.length>0) {
          ret[count] = [];
          for(j=0;j<bar.length;j++) {
              baz = stripper(bar[j]);
              if(patnum.test(baz)) { ret[count][j] = parseFloat(baz); }
              else ret[count][j] = baz;
          }
          count++;
      }
    }
    return ret;
}

numeric.toCSV = function toCSV(A) {
    var s = numeric.dim(A);
    var i,j,m,n,row,ret;
    m = s[0];
    n = s[1];
    ret = [];
    for(i=0;i<m;i++) {
        row = [];
        for(j=0;j<m;j++) { row[j] = A[i][j].toString(); }
        ret[i] = row.join(', ');
    }
    return ret.join('\n')+'\n';
}

numeric.getURL = function getURL(url) {
    var client = new XMLHttpRequest();
    client.open("GET",url,false);
    client.send();
    return client;
}

numeric.imageURL = function imageURL(img) {
    function base64(A) {
        var n = A.length, i,x,y,z,p,q,r,s;
        var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var ret = "";
        for(i=0;i<n;i+=3) {
            x = A[i];
            y = A[i+1];
            z = A[i+2];
            p = x >> 2;
            q = ((x & 3) << 4) + (y >> 4);
            r = ((y & 15) << 2) + (z >> 6);
            s = z & 63;
            if(i+1>=n) { r = s = 64; }
            else if(i+2>=n) { s = 64; }
            ret += key.charAt(p) + key.charAt(q) + key.charAt(r) + key.charAt(s);
            }
        return ret;
    }
    function crc32Array (a,from,to) {
        if(typeof from === "undefined") { from = 0; }
        if(typeof to === "undefined") { to = a.length; }
        var table = [0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA, 0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3,
                     0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988, 0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91, 
                     0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE, 0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7,
                     0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC, 0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5, 
                     0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172, 0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B, 
                     0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940, 0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59, 
                     0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116, 0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F,
                     0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924, 0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D,
                     0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A, 0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433,
                     0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818, 0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01, 
                     0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E, 0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457, 
                     0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C, 0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65, 
                     0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2, 0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB, 
                     0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0, 0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9, 
                     0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086, 0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F, 
                     0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4, 0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD, 
                     0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A, 0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683, 
                     0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8, 0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1, 
                     0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE, 0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7, 
                     0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC, 0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5, 
                     0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252, 0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B, 
                     0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60, 0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79, 
                     0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236, 0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F, 
                     0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04, 0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D, 
                     0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A, 0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713, 
                     0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38, 0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21, 
                     0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E, 0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777, 
                     0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C, 0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45, 
                     0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2, 0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB, 
                     0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0, 0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9, 
                     0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6, 0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF, 
                     0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94, 0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D];
     
        var crc = -1, y = 0, n = a.length,i;

        for (i = from; i < to; i++) {
            y = (crc ^ a[i]) & 0xFF;
            crc = (crc >>> 8) ^ table[y];
        }
     
        return crc ^ (-1);
    }

    var h = img[0].length, w = img[0][0].length, s1, s2, next,k,length,a,b,i,j,adler32,crc32;
    var stream = [
                  137, 80, 78, 71, 13, 10, 26, 10,                           //  0: PNG signature
                  0,0,0,13,                                                  //  8: IHDR Chunk length
                  73, 72, 68, 82,                                            // 12: "IHDR" 
                  (w >> 24) & 255, (w >> 16) & 255, (w >> 8) & 255, w&255,   // 16: Width
                  (h >> 24) & 255, (h >> 16) & 255, (h >> 8) & 255, h&255,   // 20: Height
                  8,                                                         // 24: bit depth
                  2,                                                         // 25: RGB
                  0,                                                         // 26: deflate
                  0,                                                         // 27: no filter
                  0,                                                         // 28: no interlace
                  -1,-2,-3,-4,                                               // 29: CRC
                  -5,-6,-7,-8,                                               // 33: IDAT Chunk length
                  73, 68, 65, 84,                                            // 37: "IDAT"
                  // RFC 1950 header starts here
                  8,                                                         // 41: RFC1950 CMF
                  29                                                         // 42: RFC1950 FLG
                  ];
    crc32 = crc32Array(stream,12,29);
    stream[29] = (crc32>>24)&255;
    stream[30] = (crc32>>16)&255;
    stream[31] = (crc32>>8)&255;
    stream[32] = (crc32)&255;
    s1 = 1;
    s2 = 0;
    for(i=0;i<h;i++) {
        if(i<h-1) { stream.push(0); }
        else { stream.push(1); }
        a = (3*w+1+(i===0))&255; b = ((3*w+1+(i===0))>>8)&255;
        stream.push(a); stream.push(b);
        stream.push((~a)&255); stream.push((~b)&255);
        if(i===0) stream.push(0);
        for(j=0;j<w;j++) {
            for(k=0;k<3;k++) {
                a = img[k][i][j];
                if(a>255) a = 255;
                else if(a<0) a=0;
                else a = Math.round(a);
                s1 = (s1 + a )%65521;
                s2 = (s2 + s1)%65521;
                stream.push(a);
            }
        }
        stream.push(0);
    }
    adler32 = (s2<<16)+s1;
    stream.push((adler32>>24)&255);
    stream.push((adler32>>16)&255);
    stream.push((adler32>>8)&255);
    stream.push((adler32)&255);
    length = stream.length - 41;
    stream[33] = (length>>24)&255;
    stream[34] = (length>>16)&255;
    stream[35] = (length>>8)&255;
    stream[36] = (length)&255;
    crc32 = crc32Array(stream,37);
    stream.push((crc32>>24)&255);
    stream.push((crc32>>16)&255);
    stream.push((crc32>>8)&255);
    stream.push((crc32)&255);
    stream.push(0);
    stream.push(0);
    stream.push(0);
    stream.push(0);
//    a = stream.length;
    stream.push(73);  // I
    stream.push(69);  // E
    stream.push(78);  // N
    stream.push(68);  // D
    stream.push(174); // CRC1
    stream.push(66);  // CRC2
    stream.push(96);  // CRC3
    stream.push(130); // CRC4
    return 'data:image/png;base64,'+base64(stream);
}

// 2. Linear algebra with Arrays.
numeric._dim = function _dim(x) {
    var ret = [];
    while(typeof x === "object") { ret.push(x.length); x = x[0]; }
    return ret;
}

numeric.dim = function dim(x) {
    var y,z;
    if(typeof x === "object") {
        y = x[0];
        if(typeof y === "object") {
            z = y[0];
            if(typeof z === "object") {
                return numeric._dim(x);
            }
            return [x.length,y.length];
        }
        return [x.length];
    }
    return [];
}

numeric.mapreduce = function mapreduce(body,init) {
    return Function('x','accum','_s','_k',
            'if(typeof accum === "undefined") accum = '+init+';\n'+
            'if(typeof x === "number") { var xi = x; '+body+'; return accum; }\n'+
            'if(typeof _s === "undefined") _s = numeric.dim(x);\n'+
            'if(typeof _k === "undefined") _k = 0;\n'+
            'var _n = _s[_k];\n'+
            'var i,xi;\n'+
            'if(_k < _s.length-1) {\n'+
            '    for(i=_n-1;i>=0;i--) {\n'+
            '        accum = arguments.callee(x[i],accum,_s,_k+1);\n'+
            '    }'+
            '    return accum;\n'+
            '}\n'+
            'for(i=_n-1;i>=1;i-=2) { \n'+
            '    xi = x[i];\n'+
            '    '+body+';\n'+
            '    xi = x[i-1];\n'+
            '    '+body+';\n'+
            '}\n'+
            'if(i === 0) {\n'+
            '    xi = x[i];\n'+
            '    '+body+'\n'+
            '}\n'+
            'return accum;'
            );
}
numeric.mapreduce2 = function mapreduce2(body,setup) {
    return Function('x',
            'var n = x.length;\n'+
            'var i,xi;\n'+setup+';\n'+
            'for(i=n-1;i!==-1;--i) { \n'+
            '    xi = x[i];\n'+
            '    '+body+';\n'+
            '}\n'+
            'return accum;'
            );
}


numeric.same = function same(x,y) {
    var i,n;
    if(!(x instanceof Array) || !(y instanceof Array)) { return false; }
    n = x.length;
    if(n !== y.length) { return false; }
    for(i=0;i<n;i++) {
        if(x[i] === y[i]) { continue; }
        if(typeof x[i] === "object") { if(!same(x[i],y[i])) return false; }
        else { return false; }
    }
    return true;
}

numeric.rep = function rep(s,v,k) {
    if(typeof k === "undefined") { k=0; }
    var n = s[k], ret = Array(n), i;
    if(k === s.length-1) {
        for(i=n-2;i>=0;i-=2) { ret[i+1] = v; ret[i] = v; }
        if(i===-1) { ret[0] = v; }
        return ret;
    }
    for(i=n-1;i>=0;i--) { ret[i] = numeric.rep(s,v,k+1); }
    return ret;
}


numeric.dotMMsmall = function dotMMsmall(x,y) {
    var i,j,k,p,q,r,ret,foo,bar,woo,i0,k0,p0,r0;
    p = x.length; q = y.length; r = y[0].length;
    ret = Array(p);
    for(i=p-1;i>=0;i--) {
        foo = Array(r);
        bar = x[i];
        for(k=r-1;k>=0;k--) {
            woo = bar[q-1]*y[q-1][k];
            for(j=q-2;j>=1;j-=2) {
                i0 = j-1;
                woo += bar[j]*y[j][k] + bar[i0]*y[i0][k];
            }
            if(j===0) { woo += bar[0]*y[0][k]; }
            foo[k] = woo;
        }
        ret[i] = foo;
    }
    return ret;
}
numeric._getCol = function _getCol(A,j,x) {
    var n = A.length, i;
    for(i=n-1;i>0;--i) {
        x[i] = A[i][j];
        --i;
        x[i] = A[i][j];
    }
    if(i===0) x[0] = A[0][j];
}
numeric.dotMMbig = function dotMMbig(x,y){
    var gc = numeric._getCol, p = y.length, v = Array(p);
    var m = x.length, n = y[0].length, A = new Array(m), xj;
    var VV = numeric.dotVV;
    var i,j,k,z;
    --p;
    --m;
    for(i=m;i!==-1;--i) A[i] = Array(n);
    --n;
    for(i=n;i!==-1;--i) {
        gc(y,i,v);
        for(j=m;j!==-1;--j) {
            z=0;
            xj = x[j];
            A[j][i] = VV(xj,v);
        }
    }
    return A;
}

numeric.dotMV = function dotMV(x,y) {
    var p = x.length, q = y.length,i;
    var ret = Array(p), dotVV = numeric.dotVV;
    for(i=p-1;i>=0;i--) { ret[i] = dotVV(x[i],y); }
    return ret;
}

numeric.dotVM = function dotVM(x,y) {
    var i,j,k,p,q,r,ret,foo,bar,woo,i0,k0,p0,r0,s1,s2,s3,baz,accum;
    p = x.length; q = y[0].length;
    ret = Array(q);
    for(k=q-1;k>=0;k--) {
        woo = x[p-1]*y[p-1][k];
        for(j=p-2;j>=1;j-=2) {
            i0 = j-1;
            woo += x[j]*y[j][k] + x[i0]*y[i0][k];
        }
        if(j===0) { woo += x[0]*y[0][k]; }
        ret[k] = woo;
    }
    return ret;
}

numeric.dotVV = function dotVV(x,y) {
    var i,n=x.length,i1,ret = x[n-1]*y[n-1];
    for(i=n-2;i>=1;i-=2) {
        i1 = i-1;
        ret += x[i]*y[i] + x[i1]*y[i1];
    }
    if(i===0) { ret += x[0]*y[0]; }
    return ret;
}

numeric.dot = function dot(x,y) {
    var d = numeric.dim;
    switch(d(x).length*1000+d(y).length) {
    case 2002:
        if(y.length < 10) return numeric.dotMMsmall(x,y);
        else return numeric.dotMMbig(x,y);
    case 2001: return numeric.dotMV(x,y);
    case 1002: return numeric.dotVM(x,y);
    case 1001: return numeric.dotVV(x,y);
    case 1000: return numeric.mulVS(x,y);
    case 1: return numeric.mulSV(x,y);
    case 0: return x*y;
    default: throw new Error('numeric.dot only works on vectors and matrices');
    }
}

numeric.diag = function diag(d) {
    var i,i1,j,n = d.length, A = Array(n), Ai;
    for(i=n-1;i>=0;i--) {
        Ai = Array(n);
        i1 = i+2;
        for(j=n-1;j>=i1;j-=2) {
            Ai[j] = 0;
            Ai[j-1] = 0;
        }
        if(j>i) { Ai[j] = 0; }
        Ai[i] = d[i];
        for(j=i-1;j>=1;j-=2) {
            Ai[j] = 0;
            Ai[j-1] = 0;
        }
        if(j===0) { Ai[0] = 0; }
        A[i] = Ai;
    }
    return A;
}
numeric.getDiag = function(A) {
    var n = Math.min(A.length,A[0].length),i,ret = Array(n);
    for(i=n-1;i>=1;--i) {
        ret[i] = A[i][i];
        --i;
        ret[i] = A[i][i];
    }
    if(i===0) {
        ret[0] = A[0][0];
    }
    return ret;
}

numeric.identity = function identity(n) { return numeric.diag(numeric.rep([n],1)); }
numeric.pointwise = function pointwise(params,body,setup) {
    if(typeof setup === "undefined") { setup = ""; }
    var fun = [];
    var k;
    var avec = /\[i\]$/,p,thevec = '';
    var haveret = false;
    for(k=0;k<params.length;k++) {
        if(avec.test(params[k])) {
            p = params[k].substring(0,params[k].length-3);
            thevec = p;
        } else { p = params[k]; }
        if(p==='ret') haveret = true;
        fun.push(p);
    }
    fun[params.length] = '_s';
    fun[params.length+1] = '_k';
    fun[params.length+2] = (
            'if(typeof _s === "undefined") _s = numeric.dim('+thevec+');\n'+
            'if(typeof _k === "undefined") _k = 0;\n'+
            'var _n = _s[_k];\n'+
            'var i'+(haveret?'':', ret = Array(_n)')+';\n'+
            'if(_k < _s.length-1) {\n'+
            '    for(i=_n-1;i>=0;i--) ret[i] = arguments.callee('+params.join(',')+',_s,_k+1);\n'+
            '    return ret;\n'+
            '}\n'+
            setup+'\n'+
            'for(i=_n-1;i!==-1;--i) {\n'+
            '    '+body+'\n'+
            '}\n'+
            'return ret;'
            );
    return Function.apply(null,fun);
}
numeric.pointwise2 = function pointwise2(params,body,setup) {
    if(typeof setup === "undefined") { setup = ""; }
    var fun = [];
    var k;
    var avec = /\[i\]$/,p,thevec = '';
    var haveret = false;
    for(k=0;k<params.length;k++) {
        if(avec.test(params[k])) {
            p = params[k].substring(0,params[k].length-3);
            thevec = p;
        } else { p = params[k]; }
        if(p==='ret') haveret = true;
        fun.push(p);
    }
    fun[params.length] = (
            'var _n = '+thevec+'.length;\n'+
            'var i'+(haveret?'':', ret = Array(_n)')+';\n'+
            setup+'\n'+
            'for(i=_n-1;i!==-1;--i) {\n'+
            body+'\n'+
            '}\n'+
            'return ret;'
            );
    return Function.apply(null,fun);
}
numeric._biforeach = (function _biforeach(x,y,s,k,f) {
    if(k === s.length-1) { f(x,y); return; }
    var i,n=s[k];
    for(i=n-1;i>=0;i--) { _biforeach(typeof x==="object"?x[i]:x,typeof y==="object"?y[i]:y,s,k+1,f); }
});
numeric._biforeach2 = (function _biforeach2(x,y,s,k,f) {
    if(k === s.length-1) { return f(x,y); }
    var i,n=s[k],ret = Array(n);
    for(i=n-1;i>=0;--i) { ret[i] = _biforeach2(typeof x==="object"?x[i]:x,typeof y==="object"?y[i]:y,s,k+1,f); }
    return ret;
});
numeric._foreach = (function _foreach(x,s,k,f) {
    if(k === s.length-1) { f(x); return; }
    var i,n=s[k];
    for(i=n-1;i>=0;i--) { _foreach(x[i],s,k+1,f); }
});
numeric._foreach2 = (function _foreach2(x,s,k,f) {
    if(k === s.length-1) { return f(x); }
    var i,n=s[k], ret = Array(n);
    for(i=n-1;i>=0;i--) { ret[i] = _foreach2(x[i],s,k+1,f); }
    return ret;
});

/*numeric.anyV = numeric.mapreduce('if(xi) return true;','false');
numeric.allV = numeric.mapreduce('if(!xi) return false;','true');
numeric.any = function(x) { if(typeof x.length === "undefined") return x; return numeric.anyV(x); }
numeric.all = function(x) { if(typeof x.length === "undefined") return x; return numeric.allV(x); }*/

numeric.ops2 = {
        add: '+',
        sub: '-',
        mul: '*',
        div: '/',
        mod: '%',
        and: '&&',
        or:  '||',
        eq:  '===',
        neq: '!==',
        lt:  '<',
        gt:  '>',
        leq: '<=',
        geq: '>=',
        band: '&',
        bor: '|',
        bxor: '^',
        lshift: '<<',
        rshift: '>>',
        rrshift: '>>>'
};
numeric.opseq = {
        addeq: '+=',
        subeq: '-=',
        muleq: '*=',
        diveq: '/=',
        modeq: '%=',
        lshifteq: '<<=',
        rshifteq: '>>=',
        rrshifteq: '>>>=',
        bandeq: '&=',
        boreq: '|=',
        bxoreq: '^='
};
numeric.mathfuns = ['abs','acos','asin','atan','ceil','cos',
                    'exp','floor','log','round','sin','sqrt','tan',
                    'isNaN','isFinite'];
numeric.mathfuns2 = ['atan2','pow','max','min'];
numeric.ops1 = {
        neg: '-',
        not: '!',
        bnot: '~',
        clone: ''
};
numeric.mapreducers = {
        any: ['if(xi) return true;','var accum = false;'],
        all: ['if(!xi) return false;','var accum = true;'],
        sum: ['accum += xi;','var accum = 0;'],
        prod: ['accum *= xi;','var accum = 1;'],
        norm2Squared: ['accum += xi*xi;','var accum = 0;'],
        norminf: ['accum = max(accum,abs(xi));','var accum = 0, max = Math.max, abs = Math.abs;'],
        norm1: ['accum += abs(xi)','var accum = 0, abs = Math.abs;'],
        sup: ['accum = max(accum,xi);','var accum = -Infinity, max = Math.max;'],
        inf: ['accum = min(accum,xi);','var accum = Infinity, min = Math.min;']
};

(function () {
    var i,o;
    for(i=0;i<numeric.mathfuns2.length;++i) {
        o = numeric.mathfuns2[i];
        numeric.ops2[o] = o;
    }
    for(i in numeric.ops2) {
        if(numeric.ops2.hasOwnProperty(i)) {
            o = numeric.ops2[i];
            var code, codeeq, setup = '';
            if(numeric.myIndexOf.call(numeric.mathfuns2,i)!==-1) {
                setup = 'var '+o+' = Math.'+o+';\n';
                code = function(r,x,y) { return r+' = '+o+'('+x+','+y+')'; };
                codeeq = function(x,y) { return x+' = '+o+'('+x+','+y+')'; };
            } else {
                code = function(r,x,y) { return r+' = '+x+' '+o+' '+y; };
                if(numeric.opseq.hasOwnProperty(i+'eq')) {
                    codeeq = function(x,y) { return x+' '+o+'= '+y; };
                } else {
                    codeeq = function(x,y) { return x+' = '+x+' '+o+' '+y; };                    
                }
            }
            numeric[i+'VV'] = numeric.pointwise2(['x[i]','y[i]'],code('ret[i]','x[i]','y[i]'),setup);
            numeric[i+'SV'] = numeric.pointwise2(['x','y[i]'],code('ret[i]','x','y[i]'),setup);
            numeric[i+'VS'] = numeric.pointwise2(['x[i]','y'],code('ret[i]','x[i]','y'),setup);
            numeric[i] = Function(
                    'var n = arguments.length, i, x = arguments[0], y;\n'+
                    'var VV = numeric.'+i+'VV, VS = numeric.'+i+'VS, SV = numeric.'+i+'SV;\n'+
                    'var dim = numeric.dim;\n'+
                    'for(i=1;i!==n;++i) { \n'+
                    '  y = arguments[i];\n'+
                    '  if(typeof x === "object") {\n'+
                    '      if(typeof y === "object") x = numeric._biforeach2(x,y,dim(x),0,VV);\n'+
                    '      else x = numeric._biforeach2(x,y,dim(x),0,VS);\n'+
                    '  } else if(typeof y === "object") x = numeric._biforeach2(x,y,dim(y),0,SV);\n'+
                    '  else '+codeeq('x','y')+'\n'+
                    '}\nreturn x;\n');
            numeric[o] = numeric[i];
            numeric[i+'eqV'] = numeric.pointwise2(['ret[i]','x[i]'], codeeq('ret[i]','x[i]'),setup);
            numeric[i+'eqS'] = numeric.pointwise2(['ret[i]','x'], codeeq('ret[i]','x'),setup);
            numeric[i+'eq'] = Function(
                    'var n = arguments.length, i, x = arguments[0], y;\n'+
                    'var V = numeric.'+i+'eqV, S = numeric.'+i+'eqS\n'+
                    'var s = numeric.dim(x);\n'+
                    'for(i=1;i!==n;++i) { \n'+
                    '  y = arguments[i];\n'+
                    '  if(typeof y === "object") numeric._biforeach(x,y,s,0,V);\n'+
                    '  else numeric._biforeach(x,y,s,0,S);\n'+
                    '}\nreturn x;\n');
        }
    }
    for(i=0;i<numeric.mathfuns2.length;++i) {
        o = numeric.mathfuns2[i];
        delete numeric.ops2[o];
    }
    for(i=0;i<numeric.mathfuns.length;++i) {
        o = numeric.mathfuns[i];
        numeric.ops1[o] = o;
    }
    for(i in numeric.ops1) {
        if(numeric.ops1.hasOwnProperty(i)) {
            setup = '';
            o = numeric.ops1[i];
            if(numeric.myIndexOf.call(numeric.mathfuns,i)!==-1) {
                if(Math.hasOwnProperty(o)) setup = 'var '+o+' = Math.'+o+';\n';
            }
            numeric[i+'eqV'] = numeric.pointwise2(['ret[i]'],'ret[i] = '+o+'(ret[i]);',setup);
            numeric[i+'eq'] = Function('x',
                    'if(typeof x !== "object") return '+o+'x\n'+
                    'var i;\n'+
                    'var V = numeric.'+i+'eqV;\n'+
                    'var s = numeric.dim(x);\n'+
                    'numeric._foreach(x,s,0,V);\n'+
                    'return x;\n');
            numeric[i+'V'] = numeric.pointwise2(['x[i]'],'ret[i] = '+o+'(x[i]);',setup);
            numeric[i] = Function('x',
                    'if(typeof x !== "object") return '+o+'(x)\n'+
                    'var i;\n'+
                    'var V = numeric.'+i+'V;\n'+
                    'var s = numeric.dim(x);\n'+
                    'return numeric._foreach2(x,s,0,V);\n');
        }
    }
    for(i=0;i<numeric.mathfuns.length;++i) {
        o = numeric.mathfuns[i];
        delete numeric.ops1[o];
    }
    for(i in numeric.mapreducers) {
        if(numeric.mapreducers.hasOwnProperty(i)) {
            o = numeric.mapreducers[i];
            numeric[i+'V'] = numeric.mapreduce2(o[0],o[1]);
            numeric[i] = Function('x','s','k',
                    o[1]+
                    'if(typeof x !== "object") {'+
                    '    xi = x;\n'+
                    o[0]+';\n'+
                    '    return accum;\n'+
                    '}'+
                    'if(typeof s === "undefined") s = numeric.dim(x);\n'+
                    'if(typeof k === "undefined") k = 0;\n'+
                    'if(k === s.length-1) return numeric.'+i+'V(x);\n'+
                    'var xi;\n'+
                    'var n = x.length, i;\n'+
                    'for(i=n-1;i!==-1;--i) {\n'+
                    '   xi = arguments.callee(x[i]);\n'+
                    o[0]+';\n'+
                    '}\n'+
                    'return accum;\n');
        }
    }
}());

numeric.truncVV = numeric.pointwise(['x[i]','y[i]'],'ret[i] = round(x[i]/y[i])*y[i];','var round = Math.round;');
numeric.truncVS = numeric.pointwise(['x[i]','y'],'ret[i] = round(x[i]/y)*y;','var round = Math.round;');
numeric.truncSV = numeric.pointwise(['x','y[i]'],'ret[i] = round(x/y[i])*y[i];','var round = Math.round;');
numeric.trunc = function trunc(x,y) {
    if(typeof x === "object") {
        if(typeof y === "object") return numeric.truncVV(x,y);
        return numeric.truncVS(x,y);
    }
    if (typeof y === "object") return numeric.truncSV(x,y);
    return Math.round(x/y)*y;
}

numeric.inv = function inv(x) {
    var s = numeric.dim(x), abs = Math.abs, m = s[0], n = s[1];
    var A = numeric.clone(x), Ai, Aj;
    var I = numeric.identity(m), Ii, Ij;
    var i,j,k,x;
    for(j=0;j<n;++j) {
        var i0 = -1;
        var v0 = -1;
        for(i=j;i!==m;++i) { k = abs(A[i][j]); if(k>v0) { i0 = i; v0 = k; } }
        Aj = A[i0]; A[i0] = A[j]; A[j] = Aj;
        Ij = I[i0]; I[i0] = I[j]; I[j] = Ij;
        x = Aj[j];
        for(k=j;k!==n;++k)    Aj[k] /= x; 
        for(k=n-1;k!==-1;--k) Ij[k] /= x;
        for(i=m-1;i!==-1;--i) {
            if(i!==j) {
                Ai = A[i];
                Ii = I[i];
                x = Ai[j];
                for(k=j+1;k!==n;++k)  Ai[k] -= Aj[k]*x;
                for(k=n-1;k>0;--k) { Ii[k] -= Ij[k]*x; --k; Ii[k] -= Ij[k]*x; }
                if(k===0) Ii[0] -= Ij[0]*x;
            }
        }
    }
    return I;
}

numeric.det = function det(x) {
    var s = numeric.dim(x);
    if(s.length !== 2 || s[0] !== s[1]) { throw new Error('numeric: det() only works on square matrices'); }
    var n = s[0], ret = 1,i,j,k,A = numeric.clone(x),Aj,Ai,alpha,temp,k1,k2,k3;
    for(j=0;j<n-1;j++) {
        k=j;
        for(i=j+1;i<n;i++) { if(Math.abs(A[i][j]) > Math.abs(A[k][j])) { k = i; } }
        if(k !== j) {
            temp = A[k]; A[k] = A[j]; A[j] = temp;
            ret *= -1;
        }
        Aj = A[j];
        for(i=j+1;i<n;i++) {
            Ai = A[i];
            alpha = Ai[j]/Aj[j];
            for(k=j+1;k<n-1;k+=2) {
                k1 = k+1;
                Ai[k] -= Aj[k]*alpha;
                Ai[k1] -= Aj[k1]*alpha;
            }
            if(k!==n) { Ai[k] -= Aj[k]*alpha; }
        }
        if(Aj[j] === 0) { return 0; }
        ret *= Aj[j];
    }
    return ret*A[j][j];
}

numeric.transpose = function transpose(x) {
    var i,j,m = x.length,n = x[0].length, ret=Array(n),A0,A1,Bj;
    for(j=0;j<n;j++) ret[j] = Array(m);
    for(i=m-1;i>=1;i-=2) {
        A1 = x[i];
        A0 = x[i-1];
        for(j=n-1;j>=1;--j) {
            Bj = ret[j]; Bj[i] = A1[j]; Bj[i-1] = A0[j];
            --j;
            Bj = ret[j]; Bj[i] = A1[j]; Bj[i-1] = A0[j];
        }
        if(j===0) {
            Bj = ret[0]; Bj[i] = A1[0]; Bj[i-1] = A0[0];
        }
    }
    if(i===0) {
        A0 = x[0];
        for(j=n-1;j>=1;--j) {
            ret[j][0] = A0[j];
            --j;
            ret[j][0] = A0[j];
        }
        if(j===0) { ret[0][0] = A0[0]; }
    }
    return ret;
}
numeric.negtranspose = function negtranspose(x) {
    var i,j,m = x.length,n = x[0].length, ret=Array(n),A0,A1,Bj;
    for(j=0;j<n;j++) ret[j] = Array(m);
    for(i=m-1;i>=1;i-=2) {
        A1 = x[i];
        A0 = x[i-1];
        for(j=n-1;j>=1;--j) {
            Bj = ret[j]; Bj[i] = -A1[j]; Bj[i-1] = -A0[j];
            --j;
            Bj = ret[j]; Bj[i] = -A1[j]; Bj[i-1] = -A0[j];
        }
        if(j===0) {
            Bj = ret[0]; Bj[i] = -A1[0]; Bj[i-1] = -A0[0];
        }
    }
    if(i===0) {
        A0 = x[0];
        for(j=n-1;j>=1;--j) {
            ret[j][0] = -A0[j];
            --j;
            ret[j][0] = -A0[j];
        }
        if(j===0) { ret[0][0] = -A0[0]; }
    }
    return ret;
}

numeric._random = function _random(s,k) {
    var i,n=s[k],ret=Array(n), rnd;
    if(k === s.length-1) {
        rnd = Math.random;
        for(i=n-1;i>=1;i-=2) {
            ret[i] = rnd();
            ret[i-1] = rnd();
        }
        if(i===0) { ret[0] = rnd(); }
        return ret;
    }
    for(i=n-1;i>=0;i--) ret[i] = _random(s,k+1);
    return ret;
}
numeric.random = function random(s) { return numeric._random(s,0); }

numeric.norm2 = function norm2(x) { return Math.sqrt(numeric.norm2Squared(x)); }

numeric.linspace = function linspace(a,b,n) {
    if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
    if(n<2) { return n===1?[a]:[]; }
    var i,ret = Array(n);
    n--;
    for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
    return ret;
}

numeric.getBlock = function getBlock(x,from,to) {
    var s = numeric.dim(x);
    function foo(x,k) {
        var i,a = from[k], n = to[k]-a, ret = Array(n);
        if(k === s.length-1) {
            for(i=n;i>=0;i--) { ret[i] = x[i+a]; }
            return ret;
        }
        for(i=n;i>=0;i--) { ret[i] = foo(x[i+a],k+1); }
        return ret;
    }
    return foo(x,0);
}

numeric.setBlock = function setBlock(x,from,to,B) {
    var s = numeric.dim(x);
    function foo(x,y,k) {
        var i,a = from[k], n = to[k]-a;
        if(k === s.length-1) { for(i=n;i>=0;i--) { x[i+a] = y[i]; } }
        for(i=n;i>=0;i--) { foo(x[i+a],y[i],k+1); }
    }
    foo(x,B,0);
    return x;
}

numeric.getRange = function getRange(A,I,J) {
    var m = I.length, n = J.length;
    var i,j;
    var B = Array(m), Bi, AI;
    for(i=m-1;i!==-1;--i) {
        B[i] = Array(n);
        Bi = B[i];
        AI = A[I[i]];
        for(j=n-1;j!==-1;--j) Bi[j] = AI[J[j]];
    }
    return B;
}

numeric.blockMatrix = function blockMatrix(X) {
    var s = numeric.dim(X);
    if(s.length<4) return numeric.blockMatrix([X]);
    var m=s[0],n=s[1],M,N,i,j,Xij;
    M = 0; N = 0;
    for(i=0;i<m;++i) M+=X[i][0].length;
    for(j=0;j<n;++j) N+=X[0][j][0].length;
    var Z = Array(M);
    for(i=0;i<M;++i) Z[i] = Array(N);
    var I=0,J,ZI,k,l,Xijk;
    for(i=0;i<m;++i) {
        J=N;
        for(j=n-1;j!==-1;--j) {
            Xij = X[i][j];
            J -= Xij[0].length;
            for(k=Xij.length-1;k!==-1;--k) {
                Xijk = Xij[k];
                ZI = Z[I+k];
                for(l = Xijk.length-1;l!==-1;--l) ZI[J+l] = Xijk[l];
            }
        }
        I += X[i][0].length;
    }
    return Z;
}

numeric.tensor = function tensor(x,y) {
    if(typeof x === "number" || typeof y === "number") return numeric.mul(x,y);
    var s1 = numeric.dim(x), s2 = numeric.dim(y);
    if(s1.length !== 1 || s2.length !== 1) {
        throw new Error('numeric: tensor product is only defined for vectors');
    }
    var m = s1[0], n = s2[0], A = Array(m), Ai, i,j,xi;
    for(i=m-1;i>=0;i--) {
        Ai = Array(n);
        xi = x[i];
        for(j=n-1;j>=3;--j) {
            Ai[j] = xi * y[j];
            --j;
            Ai[j] = xi * y[j];
            --j;
            Ai[j] = xi * y[j];
            --j;
            Ai[j] = xi * y[j];
        }
        while(j>=0) { Ai[j] = xi * y[j]; --j; }
        A[i] = Ai;
    }
    return A;
}

// 3. The Tensor type T
numeric.T = function T(x,y) { this.x = x; this.y = y; }
numeric.t = function t(x,y) { return new numeric.T(x,y); }

numeric.Tbinop = function Tbinop(rr,rc,cr,cc,setup) {
    var io = numeric.indexOf;
    if(typeof setup !== "string") {
        var k;
        setup = '';
        for(k in numeric) {
            if(numeric.hasOwnProperty(k) && (rr.indexOf(k)>=0 || rc.indexOf(k)>=0 || cr.indexOf(k)>=0 || cc.indexOf(k)>=0) && k.length>1) {
                setup += 'var '+k+' = numeric.'+k+';\n';
            }
        }
    }
    return Function(['y'],
            'var x = this;\n'+
            'if(!(y instanceof numeric.T)) { y = new numeric.T(y); }\n'+
            setup+'\n'+
            'if(x.y) {'+
            '  if(y.y) {'+
            '    return new numeric.T('+cc+');\n'+
            '  }\n'+
            '  return new numeric.T('+cr+');\n'+
            '}\n'+
            'if(y.y) {\n'+
            '  return new numeric.T('+rc+');\n'+
            '}\n'+
            'return new numeric.T('+rr+');\n'
    );
}

numeric.T.prototype.add = numeric.Tbinop(
        'add(x.x,y.x)',
        'add(x.x,y.x),y.y',
        'add(x.x,y.x),x.y',
        'add(x.x,y.x),add(x.y,y.y)');
numeric.T.prototype.sub = numeric.Tbinop(
        'sub(x.x,y.x)',
        'sub(x.x,y.x),neg(y.y)',
        'sub(x.x,y.x),x.y',
        'sub(x.x,y.x),sub(x.y,y.y)');
numeric.T.prototype.mul = numeric.Tbinop(
        'mul(x.x,y.x)',
        'mul(x.x,y.x),mul(x.x,y.y)',
        'mul(x.x,y.x),mul(x.y,y.x)',
        'sub(mul(x.x,y.x),mul(x.y,y.y)),add(mul(x.x,y.y),mul(x.y,y.x))');

numeric.T.prototype.reciprocal = function reciprocal() {
    var mul = numeric.mul, div = numeric.div;
    if(this.y) {
        var d = numeric.add(mul(this.x,this.x),mul(this.y,this.y));
        return new numeric.T(div(this.x,d),div(numeric.neg(this.y),d));
    }
    return new T(div(1,this.x));
}
numeric.T.prototype.div = function div(y) {
    if(!(y instanceof numeric.T)) y = new numeric.T(y);
    if(y.y) { return this.mul(y.reciprocal()); }
    var div = numeric.div;
    if(this.y) { return new numeric.T(div(this.x,y.x),div(this.y,y.x)); }
    return new numeric.T(div(this.x,y.x));
}
numeric.T.prototype.dot = numeric.Tbinop(
        'dot(x.x,y.x)',
        'dot(x.x,y.x),dot(x.x,y.y)',
        'dot(x.x,y.x),dot(x.y,y.x)',
        'sub(dot(x.x,y.x),dot(x.y,y.y)),add(dot(x.x,y.y),dot(x.y,y.x))'
        );
numeric.T.prototype.transpose = function transpose() {
    var t = numeric.transpose, x = this.x, y = this.y;
    if(y) { return new numeric.T(t(x),t(y)); }
    return new numeric.T(t(x));
}
numeric.T.prototype.transjugate = function transjugate() {
    var t = numeric.transpose, x = this.x, y = this.y;
    if(y) { return new numeric.T(t(x),numeric.negtranspose(y)); }
    return new numeric.T(t(x));
}
numeric.Tunop = function Tunop(r,c,s) {
    if(typeof s !== "string") { s = ''; }
    return Function(
            'var x = this;\n'+
            s+'\n'+
            'if(x.y) {'+
            '  '+c+';\n'+
            '}\n'+
            r+';\n'
    );
}

numeric.T.prototype.exp = numeric.Tunop(
        'return new numeric.T(ex)',
        'return new numeric.T(mul(cos(x.y),ex),mul(sin(x.y),ex))',
        'var ex = numeric.exp(x.x), cos = numeric.cos, sin = numeric.sin, mul = numeric.mul;');
numeric.T.prototype.conj = numeric.Tunop(
        'return new numeric.T(x.x);',
        'return new numeric.T(x.x,numeric.neg(x.y));');
numeric.T.prototype.neg = numeric.Tunop(
        'return new numeric.T(neg(x.x));',
        'return new numeric.T(neg(x.x),neg(x.y));',
        'var neg = numeric.neg;');
numeric.T.prototype.sin = numeric.Tunop(
        'return new numeric.T(numeric.sin(x.x))',
        'return x.exp().sub(x.neg().exp()).div(new numeric.T(0,2));');
numeric.T.prototype.cos = numeric.Tunop(
        'return new numeric.T(numeric.cos(x.x))',
        'return x.exp().add(x.neg().exp()).div(2);');
numeric.T.prototype.abs = numeric.Tunop(
        'return new numeric.T(numeric.abs(x.x));',
        'return new numeric.T(numeric.sqrt(numeric.add(mul(x.x,x.x),mul(x.y,x.y))));',
        'var mul = numeric.mul;');
numeric.T.prototype.log = numeric.Tunop(
        'return new numeric.T(numeric.log(x.x));',
        'var theta = new numeric.T(numeric.atan2(x.y,x.x)), r = x.abs();\n'+
        'return new numeric.T(numeric.log(r.x),theta.x);');
numeric.T.prototype.norm2 = numeric.Tunop(
        'return numeric.norm2(x.x);',
        'var f = numeric.norm2Squared;\n'+
        'return Math.sqrt(f(x.x)+f(x.y));');
numeric.T.prototype.inv = function inv() {
    var A = this;
    if(typeof A.y === "undefined") { return new numeric.T(numeric.inv(A.x)); }
    var n = A.x.length, i, j, k;
    var Rx = numeric.identity(n),Ry = numeric.rep([n,n],0);
    var Ax = numeric.clone(A.x), Ay = numeric.clone(A.y);
    var Aix, Aiy, Ajx, Ajy, Rix, Riy, Rjx, Rjy;
    var i,j,k,d,d1,ax,ay,bx,by,temp;
    for(i=0;i<n;i++) {
        ax = Ax[i][i]; ay = Ay[i][i];
        d = ax*ax+ay*ay;
        k = i;
        for(j=i+1;j<n;j++) {
            ax = Ax[j][i]; ay = Ay[j][i];
            d1 = ax*ax+ay*ay;
            if(d1 > d) { k=j; d = d1; }
        }
        if(k!==i) {
            temp = Ax[i]; Ax[i] = Ax[k]; Ax[k] = temp;
            temp = Ay[i]; Ay[i] = Ay[k]; Ay[k] = temp;
            temp = Rx[i]; Rx[i] = Rx[k]; Rx[k] = temp;
            temp = Ry[i]; Ry[i] = Ry[k]; Ry[k] = temp;
        }
        Aix = Ax[i]; Aiy = Ay[i];
        Rix = Rx[i]; Riy = Ry[i];
        ax = Aix[i]; ay = Aiy[i];
        for(j=i+1;j<n;j++) {
            bx = Aix[j]; by = Aiy[j];
            Aix[j] = (bx*ax+by*ay)/d;
            Aiy[j] = (by*ax-bx*ay)/d;
        }
        for(j=0;j<n;j++) {
            bx = Rix[j]; by = Riy[j];
            Rix[j] = (bx*ax+by*ay)/d;
            Riy[j] = (by*ax-bx*ay)/d;
        }
        for(j=i+1;j<n;j++) {
            Ajx = Ax[j]; Ajy = Ay[j];
            Rjx = Rx[j]; Rjy = Ry[j];
            ax = Ajx[i]; ay = Ajy[i];
            for(k=i+1;k<n;k++) {
                bx = Aix[k]; by = Aiy[k];
                Ajx[k] -= bx*ax-by*ay;
                Ajy[k] -= by*ax+bx*ay;
            }
            for(k=0;k<n;k++) {
                bx = Rix[k]; by = Riy[k];
                Rjx[k] -= bx*ax-by*ay;
                Rjy[k] -= by*ax+bx*ay;
            }
        }
    }
    for(i=n-1;i>0;i--) {
        Rix = Rx[i]; Riy = Ry[i];
        for(j=i-1;j>=0;j--) {
            Rjx = Rx[j]; Rjy = Ry[j];
            ax = Ax[j][i]; ay = Ay[j][i];
            for(k=n-1;k>=0;k--) {
                bx = Rix[k]; by = Riy[k];
                Rjx[k] -= ax*bx - ay*by;
                Rjy[k] -= ax*by + ay*bx;
            }
        }
    }
    return new numeric.T(Rx,Ry);
}
numeric.T.prototype.get = function get(i) {
    var x = this.x, y = this.y, k = 0, ik, n = i.length;
    if(y) {
        while(k<n) {
            ik = i[k];
            x = x[ik];
            y = y[ik];
            k++;
        }
        return new numeric.T(x,y);
    }
    while(k<n) {
        ik = i[k];
        x = x[ik];
        k++;
    }
    return new numeric.T(x);
}
numeric.T.prototype.set = function set(i,v) {
    var x = this.x, y = this.y, k = 0, ik, n = i.length, vx = v.x, vy = v.y;
    if(n===0) {
        if(vy) { this.y = vy; }
        else if(y) { this.y = undefined; }
        this.x = x;
        return this;
    }
    if(vy) {
        if(y) { /* ok */ }
        else {
            y = numeric.rep(numeric.dim(x),0);
            this.y = y;
        }
        while(k<n-1) {
            ik = i[k];
            x = x[ik];
            y = y[ik];
            k++;
        }
        ik = i[k];
        x[ik] = vx;
        y[ik] = vy;
        return this;
    }
    if(y) {
        while(k<n-1) {
            ik = i[k];
            x = x[ik];
            y = y[ik];
            k++;
        }
        ik = i[k];
        x[ik] = vx;
        if(vx instanceof Array) y[ik] = numeric.rep(numeric.dim(vx),0);
        else y[ik] = 0;
        return this;
    }
    while(k<n-1) {
        ik = i[k];
        x = x[ik];
        k++;
    }
    ik = i[k];
    x[ik] = vx;
    return this;
}
numeric.T.prototype.getRows = function getRows(i0,i1) {
    var n = i1-i0+1, j;
    var rx = Array(n), ry, x = this.x, y = this.y;
    for(j=i0;j<=i1;j++) { rx[j-i0] = x[j]; }
    if(y) {
        ry = Array(n);
        for(j=i0;j<=i1;j++) { ry[j-i0] = y[j]; }
        return new numeric.T(rx,ry);
    }
    return new numeric.T(rx);
}
numeric.T.prototype.setRows = function setRows(i0,i1,A) {
    var j;
    var rx = this.x, ry = this.y, x = A.x, y = A.y;
    for(j=i0;j<=i1;j++) { rx[j] = x[j-i0]; }
    if(y) {
        if(!ry) { ry = numeric.rep(numeric.dim(rx),0); this.y = ry; }
        for(j=i0;j<=i1;j++) { ry[j] = y[j-i0]; }
    } else if(ry) {
        for(j=i0;j<=i1;j++) { ry[j] = numeric.rep([x[j-i0].length],0); }
    }
    return this;
}
numeric.T.prototype.getRow = function getRow(k) {
    var x = this.x, y = this.y;
    if(y) { return new numeric.T(x[k],y[k]); }
    return new numeric.T(x[k]);
}
numeric.T.prototype.setRow = function setRow(i,v) {
    var rx = this.x, ry = this.y, x = v.x, y = v.y;
    rx[i] = x;
    if(y) {
        if(!ry) { ry = numeric.rep(numeric.dim(rx),0); this.y = ry; }
        ry[i] = y;
    } else if(ry) {
        ry = numeric.rep([x.length],0);
    }
    return this;
}

numeric.T.prototype.getBlock = function getBlock(from,to) {
    var x = this.x, y = this.y, b = numeric.getBlock;
    if(y) { return new numeric.T(b(x,from,to),b(y,from,to)); }
    return new numeric.T(b(x,from,to));
}
numeric.T.prototype.setBlock = function setBlock(from,to,A) {
    if(!(A instanceof numeric.T)) A = new numeric.T(A);
    var x = this.x, y = this.y, b = numeric.setBlock, Ax = A.x, Ay = A.y;
    if(Ay) {
        if(!y) { this.y = numeric.rep(numeric.dim(this),0); y = this.y; }
        b(x,from,to,Ax);
        b(y,from,to,Ay);
        return this;
    }
    b(x,from,to,Ax);
    if(y) b(y,from,to,numeric.rep(numeric.dim(Ax),0));
}
numeric.T.rep = function rep(s,v) {
    var T = numeric.T;
    if(!(v instanceof T)) v = new T(v);
    var x = v.x, y = v.y, r = numeric.rep;
    if(y) return new T(r(s,x),r(s,y));
    return new T(r(s,x));
}
numeric.T.diag = function diag(d) {
    if(!(d instanceof numeric.T)) d = new numeric.T(d);
    var x = d.x, y = d.y, diag = numeric.diag;
    if(y) return new numeric.T(diag(x),diag(y));
    return new numeric.T(diag(x));
}
numeric.T.eig = function eig() {
    if(this.y) { throw new Error('eig: not implemented for complex matrices.'); }
    return numeric.eig(this.x);
}
numeric.T.identity = function identity(n) { return new numeric.T(numeric.identity(n)); }
numeric.T.prototype.getDiag = function getDiag() {
    var n = numeric;
    var x = this.x, y = this.y;
    if(y) { return new n.T(n.getDiag(x),n.getDiag(y)); }
    return new n.T(n.getDiag(x));
}

// 4. Eigenvalues of real matrices

numeric.house = function house(x) {
    var v = numeric.clone(x);
    var s = x[0] >= 0 ? 1 : -1;
    var alpha = s*numeric.norm2(x);
    v[0] += alpha;
    var foo = numeric.norm2(v);
    if(foo === 0) { /* this should not happen */ throw new Error('eig: internal error'); }
    return numeric.div(v,foo);
}

numeric.toUpperHessenberg = function toUpperHessenberg(me) {
    var s = numeric.dim(me);
    if(s.length !== 2 || s[0] !== s[1]) { throw new Error('numeric: toUpperHessenberg() only works on square matrices'); }
    var m = s[0], i,j,k,x,v,A = numeric.clone(me),B,C,Ai,Ci,Q = numeric.identity(m),Qi;
    for(j=0;j<m-2;j++) {
        x = Array(m-j-1);
        for(i=j+1;i<m;i++) { x[i-j-1] = A[i][j]; }
        if(numeric.norm2(x)>0) {
            v = numeric.house(x);
            B = numeric.getBlock(A,[j+1,j],[m-1,m-1]);
            C = numeric.tensor(v,numeric.dot(v,B));
            for(i=j+1;i<m;i++) { Ai = A[i]; Ci = C[i-j-1]; for(k=j;k<m;k++) Ai[k] -= 2*Ci[k-j]; }
            B = numeric.getBlock(A,[0,j+1],[m-1,m-1]);
            C = numeric.tensor(numeric.dot(B,v),v);
            for(i=0;i<m;i++) { Ai = A[i]; Ci = C[i]; for(k=j+1;k<m;k++) Ai[k] -= 2*Ci[k-j-1]; }
            B = Array(m-j-1);
            for(i=j+1;i<m;i++) B[i-j-1] = Q[i];
            C = numeric.tensor(v,numeric.dot(v,B));
            for(i=j+1;i<m;i++) { Qi = Q[i]; Ci = C[i-j-1]; for(k=0;k<m;k++) Qi[k] -= 2*Ci[k]; }
        }
    }
    return {H:A, Q:Q};
}

numeric.epsilon = 2.220446049250313e-16;

numeric.QRFrancis = function(H,maxiter) {
    if(typeof maxiter === "undefined") { maxiter = 10000; }
    H = numeric.clone(H);
    var H0 = numeric.clone(H);
    var s = numeric.dim(H),m=s[0],x,v,a,b,c,d,det,tr, Hloc, Q = numeric.identity(m), Qi, Hi, B, C, Ci,i,j,k,iter;
    if(m<3) { return {Q:Q, B:[ [0,m-1] ]}; }
    var epsilon = numeric.epsilon;
    for(iter=0;iter<maxiter;iter++) {
        for(j=0;j<m-1;j++) {
            if(Math.abs(H[j+1][j]) < epsilon*(Math.abs(H[j][j])+Math.abs(H[j+1][j+1]))) {
                var QH1 = numeric.QRFrancis(numeric.getBlock(H,[0,0],[j,j]),maxiter);
                var QH2 = numeric.QRFrancis(numeric.getBlock(H,[j+1,j+1],[m-1,m-1]),maxiter);
                B = Array(j+1);
                for(i=0;i<=j;i++) { B[i] = Q[i]; }
                C = numeric.dot(QH1.Q,B);
                for(i=0;i<=j;i++) { Q[i] = C[i]; }
                B = Array(m-j-1);
                for(i=j+1;i<m;i++) { B[i-j-1] = Q[i]; }
                C = numeric.dot(QH2.Q,B);
                for(i=j+1;i<m;i++) { Q[i] = C[i-j-1]; }
                return {Q:Q,B:QH1.B.concat(numeric.add(QH2.B,j+1))};
            }
        }
        a = H[m-2][m-2]; b = H[m-2][m-1];
        c = H[m-1][m-2]; d = H[m-1][m-1];
        tr = a+d;
        det = (a*d-b*c);
        Hloc = numeric.getBlock(H, [0,0], [2,2]);
        if(tr*tr>=4*det) {
            var s1,s2;
            s1 = 0.5*(tr+Math.sqrt(tr*tr-4*det));
            s2 = 0.5*(tr-Math.sqrt(tr*tr-4*det));
            Hloc = numeric.add(numeric.sub(numeric.dot(Hloc,Hloc),
                                           numeric.mul(Hloc,s1+s2)),
                               numeric.diag(numeric.rep([3],s1*s2)));
        } else {
            Hloc = numeric.add(numeric.sub(numeric.dot(Hloc,Hloc),
                                           numeric.mul(Hloc,tr)),
                               numeric.diag(numeric.rep([3],det)));
        }
        x = [Hloc[0][0],Hloc[1][0],Hloc[2][0]];
        v = numeric.house(x);
        B = [H[0],H[1],H[2]];
        C = numeric.tensor(v,numeric.dot(v,B));
        for(i=0;i<3;i++) { Hi = H[i]; Ci = C[i]; for(k=0;k<m;k++) Hi[k] -= 2*Ci[k]; }
        B = numeric.getBlock(H, [0,0],[m-1,2]);
        C = numeric.tensor(numeric.dot(B,v),v);
        for(i=0;i<m;i++) { Hi = H[i]; Ci = C[i]; for(k=0;k<3;k++) Hi[k] -= 2*Ci[k]; }
        B = [Q[0],Q[1],Q[2]];
        C = numeric.tensor(v,numeric.dot(v,B));
        for(i=0;i<3;i++) { Qi = Q[i]; Ci = C[i]; for(k=0;k<m;k++) Qi[k] -= 2*Ci[k]; }
        var J;
        for(j=0;j<m-2;j++) {
            for(k=j;k<=j+1;k++) {
                if(Math.abs(H[k+1][k]) < epsilon*(Math.abs(H[k][k])+Math.abs(H[k+1][k+1]))) {
                    var QH1 = numeric.QRFrancis(numeric.getBlock(H,[0,0],[k,k]),maxiter);
                    var QH2 = numeric.QRFrancis(numeric.getBlock(H,[k+1,k+1],[m-1,m-1]),maxiter);
                    B = Array(k+1);
                    for(i=0;i<=k;i++) { B[i] = Q[i]; }
                    C = numeric.dot(QH1.Q,B);
                    for(i=0;i<=k;i++) { Q[i] = C[i]; }
                    B = Array(m-k-1);
                    for(i=k+1;i<m;i++) { B[i-k-1] = Q[i]; }
                    C = numeric.dot(QH2.Q,B);
                    for(i=k+1;i<m;i++) { Q[i] = C[i-k-1]; }
                    return {Q:Q,B:QH1.B.concat(numeric.add(QH2.B,k+1))};
                }
            }
            J = Math.min(m-1,j+3);
            x = Array(J-j);
            for(i=j+1;i<=J;i++) { x[i-j-1] = H[i][j]; }
            v = numeric.house(x);
            B = numeric.getBlock(H, [j+1,j],[J,m-1]);
            C = numeric.tensor(v,numeric.dot(v,B));
            for(i=j+1;i<=J;i++) { Hi = H[i]; Ci = C[i-j-1]; for(k=j;k<m;k++) Hi[k] -= 2*Ci[k-j]; }
            B = numeric.getBlock(H, [0,j+1],[m-1,J]);
            C = numeric.tensor(numeric.dot(B,v),v);
            for(i=0;i<m;i++) { Hi = H[i]; Ci = C[i]; for(k=j+1;k<=J;k++) Hi[k] -= 2*Ci[k-j-1]; }
            B = Array(J-j);
            for(i=j+1;i<=J;i++) B[i-j-1] = Q[i];
            C = numeric.tensor(v,numeric.dot(v,B));
            for(i=j+1;i<=J;i++) { Qi = Q[i]; Ci = C[i-j-1]; for(k=0;k<m;k++) Qi[k] -= 2*Ci[k]; }
        }
    }
    throw new Error('numeric: eigenvalue iteration does not converge -- increase maxiter?');
}

numeric.eig = function eig(A,maxiter) {
    var QH = numeric.toUpperHessenberg(A);
    var QB = numeric.QRFrancis(QH.H,maxiter);
    var T = numeric.T;
    var n = A.length,i,k,flag = false,B = QB.B,H = numeric.dot(QB.Q,numeric.dot(QH.H,numeric.transpose(QB.Q)));
    var Q = new T(numeric.dot(QB.Q,QH.Q)),Q0;
    var m = B.length,j;
    var a,b,c,d,p1,p2,disc,x,y,p,q,n1,n2;
    var sqrt = Math.sqrt;
    for(k=0;k<m;k++) {
        i = B[k][0];
        if(i === B[k][1]) {
            // nothing
        } else {
            j = i+1;
            a = H[i][i];
            b = H[i][j];
            c = H[j][i];
            d = H[j][j];
            if(b === 0 && c === 0) continue;
            p1 = -a-d;
            p2 = a*d-b*c;
            disc = p1*p1-4*p2;
            if(disc>=0) {
                if(p1<0) x = -0.5*(p1-sqrt(disc));
                else     x = -0.5*(p1+sqrt(disc));
                n1 = (a-x)*(a-x)+b*b;
                n2 = c*c+(d-x)*(d-x);
                if(n1>n2) {
                    n1 = sqrt(n1);
                    p = (a-x)/n1;
                    q = b/n1;
                } else {
                    n2 = sqrt(n2);
                    p = c/n2;
                    q = (d-x)/n2;
                }
                Q0 = new T([[q,-p],[p,q]]);
                Q.setRows(i,j,Q0.dot(Q.getRows(i,j)));
            } else {
                x = -0.5*p1;
                y = 0.5*sqrt(-disc);
                n1 = (a-x)*(a-x)+b*b;
                n2 = c*c+(d-x)*(d-x);
                if(n1>n2) {
                    n1 = sqrt(n1+y*y);
                    p = (a-x)/n1;
                    q = b/n1;
                    x = 0;
                    y /= n1;
                } else {
                    n2 = sqrt(n2+y*y);
                    p = c/n2;
                    q = (d-x)/n2;
                    x = y/n2;
                    y = 0;
                }
                Q0 = new T([[q,-p],[p,q]],[[x,y],[y,-x]]);
                Q.setRows(i,j,Q0.dot(Q.getRows(i,j)));
            }
        }
    }
    var R = Q.dot(A).dot(Q.transjugate()), n = A.length, E = numeric.T.identity(n);
    for(j=0;j<n;j++) {
        if(j>0) {
            for(k=j-1;k>=0;k--) {
                var Rk = R.get([k,k]), Rj = R.get([j,j]);
                if(numeric.neq(Rk.x,Rj.x) || numeric.neq(Rk.y,Rj.y)) {
                    x = R.getRow(k).getBlock([k],[j-1]);
                    y = E.getRow(j).getBlock([k],[j-1]);
                    E.set([j,k],(R.get([k,j]).neg().sub(x.dot(y))).div(Rk.sub(Rj)));
                } else {
                    E.setRow(j,E.getRow(k));
                    continue;
                }
            }
        }
    }
    for(j=0;j<n;j++) {
        x = E.getRow(j);
        E.setRow(j,x.div(x.norm2()));
    }
    E = E.transpose();
    E = Q.transjugate().dot(E);
    return { lambda:R.getDiag(), E:E };
};

// 5. Compressed Column Storage matrices
numeric.ccsSparse = function ccsSparse(A) {
    var m = A.length,n,foo, i,j, counts = [];
    for(i=m-1;i!==-1;--i) {
        foo = A[i];
        for(j in foo) {
            j = parseInt(j);
            while(j>=counts.length) counts[counts.length] = 0;
            if(foo[j]!==0) counts[j]++;
        }
    }
    var n = counts.length;
    var Ai = Array(n+1);
    Ai[0] = 0;
    for(i=0;i<n;++i) Ai[i+1] = Ai[i] + counts[i];
    var Aj = Array(Ai[n]), Av = Array(Ai[n]);
    for(i=m-1;i!==-1;--i) {
        foo = A[i];
        for(j in foo) {
            if(foo[j]!==0) {
                counts[j]--;
                Aj[Ai[j]+counts[j]] = i;
                Av[Ai[j]+counts[j]] = foo[j];
            }
        }
    }
    return [Ai,Aj,Av];
}
numeric.ccsFull = function ccsFull(A) {
    var Ai = A[0], Aj = A[1], Av = A[2], s = numeric.ccsDim(A), m = s[0], n = s[1], i,j,j0,j1,k;
    var B = numeric.rep([m,n],0);
    for(i=0;i<n;i++) {
        j0 = Ai[i];
        j1 = Ai[i+1];
        for(j=j0;j<j1;++j) { B[Aj[j]][i] = Av[j]; }
    }
    return B;
}
numeric.ccsTSolve = function ccsTSolve(A,b,x,bj,xj) {
    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, max = Math.max,n=0;
    if(typeof bj === "undefined") x = numeric.rep([m],0);
    if(typeof bj === "undefined") bj = numeric.linspace(0,x.length-1);
    if(typeof xj === "undefined") xj = [];
    function dfs(j) {
        var k;
        if(x[j] !== 0) return;
        x[j] = 1;
        for(k=Ai[j];k<Ai[j+1];++k) dfs(Aj[k]);
        xj[n] = j;
        ++n;
    }
    var i,j,j0,j1,k,l,l0,l1,a;
    for(i=bj.length-1;i!==-1;--i) { dfs(bj[i]); }
    xj.length = n;
    for(i=xj.length-1;i!==-1;--i) { x[xj[i]] = 0; }
    for(i=bj.length-1;i!==-1;--i) { j = bj[i]; x[j] = b[j]; }
    for(i=xj.length-1;i!==-1;--i) {
        j = xj[i];
        j0 = Ai[j];
        j1 = max(Ai[j+1],j0);
        for(k=j0;k!==j1;++k) { if(Aj[k] === j) { x[j] /= Av[k]; break; } }
        a = x[j];
        for(k=j0;k!==j1;++k) {
            l = Aj[k];
            if(l !== j) x[l] -= a*Av[k];
        }
    }
    return x;
}
numeric.ccsDFS = function ccsDFS(n) {
    this.k = Array(n);
    this.k1 = Array(n);
    this.j = Array(n);
}
numeric.ccsDFS.prototype.dfs = function dfs(J,Ai,Aj,x,xj,Pinv) {
    var m = 0,foo,n=xj.length;
    var k = this.k, k1 = this.k1, j = this.j,km,k11;
    if(x[J]!==0) return;
    x[J] = 1;
    j[0] = J;
    k[0] = km = Ai[J];
    k1[0] = k11 = Ai[J+1];
    while(1) {
        if(km >= k11) {
            xj[n] = j[m];
            if(m===0) return;
            ++n;
            --m;
            km = k[m];
            k11 = k1[m];
        } else {
            foo = Pinv[Aj[km]];
            if(x[foo] === 0) {
                x[foo] = 1;
                k[m] = km;
                ++m;
                j[m] = foo;
                km = Ai[foo];
                k1[m] = k11 = Ai[foo+1];
            } else ++km;
        }
    }
}
numeric.ccsLPSolve = function ccsLPSolve(A,B,x,xj,I,Pinv,dfs) {
    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, n=0;
    var Bi = B[0], Bj = B[1], Bv = B[2];
    
    var i,i0,i1,j,J,j0,j1,k,l,l0,l1,a;
    i0 = Bi[I];
    i1 = Bi[I+1];
    xj.length = 0;
    for(i=i0;i<i1;++i) { dfs.dfs(Pinv[Bj[i]],Ai,Aj,x,xj,Pinv); }
    for(i=xj.length-1;i!==-1;--i) { x[xj[i]] = 0; }
    for(i=i0;i!==i1;++i) { j = Pinv[Bj[i]]; x[j] = Bv[i]; }
    for(i=xj.length-1;i!==-1;--i) {
        j = xj[i];
        j0 = Ai[j];
        j1 = Ai[j+1];
        for(k=j0;k<j1;++k) { if(Pinv[Aj[k]] === j) { x[j] /= Av[k]; break; } }
        a = x[j];
        for(k=j0;k<j1;++k) {
            l = Pinv[Aj[k]];
            if(l !== j) x[l] -= a*Av[k];
        }
    }
    return x;
}
numeric.ccsLUP1 = function ccsLUP1(A,threshold) {
    var m = A[0].length-1;
    var L = [numeric.rep([m+1],0),[],[]], U = [numeric.rep([m+1], 0),[],[]];
    var Li = L[0], Lj = L[1], Lv = L[2], Ui = U[0], Uj = U[1], Uv = U[2];
    var x = numeric.rep([m],0), xj = numeric.rep([m],0);
    var i,j,k,j0,j1,a,e,c,d,K;
    var sol = numeric.ccsLPSolve, max = Math.max, abs = Math.abs;
    var P = numeric.linspace(0,m-1),Pinv = numeric.linspace(0,m-1);
    var dfs = new numeric.ccsDFS(m);
    if(typeof threshold === "undefined") { threshold = 1; }
    for(i=0;i<m;++i) {
        sol(L,A,x,xj,i,Pinv,dfs);
        a = -1;
        e = -1;
        for(j=xj.length-1;j!==-1;--j) {
            k = xj[j];
            if(k <= i) continue;
            c = abs(x[k]);
            if(c > a) { e = k; a = c; }
        }
        if(abs(x[i])<threshold*a) {
            j = P[i];
            a = P[e];
            P[i] = a; Pinv[a] = i;
            P[e] = j; Pinv[j] = e;
            a = x[i]; x[i] = x[e]; x[e] = a;
        }
        a = Li[i];
        e = Ui[i];
        d = x[i];
        Lj[a] = P[i];
        Lv[a] = 1;
        ++a;
        for(j=xj.length-1;j!==-1;--j) {
            k = xj[j];
            c = x[k];
            xj[j] = 0;
            x[k] = 0;
            if(k<=i) { Uj[e] = k; Uv[e] = c;   ++e; }
            else     { Lj[a] = P[k]; Lv[a] = c/d; ++a; }
        }
        Li[i+1] = a;
        Ui[i+1] = e;
    }
    for(j=Lj.length-1;j!==-1;--j) { Lj[j] = Pinv[Lj[j]]; }
    return {L:L, U:U, P:P, Pinv:Pinv};
}
numeric.ccsDFS0 = function ccsDFS0(n) {
    this.k = Array(n);
    this.k1 = Array(n);
    this.j = Array(n);
}
numeric.ccsDFS0.prototype.dfs = function dfs(J,Ai,Aj,x,xj,Pinv,P) {
    var m = 0,foo,n=xj.length;
    var k = this.k, k1 = this.k1, j = this.j,km,k11;
    if(x[J]!==0) return;
    x[J] = 1;
    j[0] = J;
    k[0] = km = Ai[Pinv[J]];
    k1[0] = k11 = Ai[Pinv[J]+1];
    while(1) {
        if(isNaN(km)) throw new Error("Ow!");
        if(km >= k11) {
            xj[n] = Pinv[j[m]];
            if(m===0) return;
            ++n;
            --m;
            km = k[m];
            k11 = k1[m];
        } else {
            foo = Aj[km];
            if(x[foo] === 0) {
                x[foo] = 1;
                k[m] = km;
                ++m;
                j[m] = foo;
                foo = Pinv[foo];
                km = Ai[foo];
                k1[m] = k11 = Ai[foo+1];
            } else ++km;
        }
    }
}
numeric.ccsLPSolve0 = function ccsLPSolve0(A,B,y,xj,I,Pinv,P,dfs) {
    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, n=0;
    var Bi = B[0], Bj = B[1], Bv = B[2];
    
    var i,i0,i1,j,J,j0,j1,k,l,l0,l1,a;
    i0 = Bi[I];
    i1 = Bi[I+1];
    xj.length = 0;
    for(i=i0;i<i1;++i) { dfs.dfs(Bj[i],Ai,Aj,y,xj,Pinv,P); }
    for(i=xj.length-1;i!==-1;--i) { j = xj[i]; y[P[j]] = 0; }
    for(i=i0;i!==i1;++i) { j = Bj[i]; y[j] = Bv[i]; }
    for(i=xj.length-1;i!==-1;--i) {
        j = xj[i];
        l = P[j];
        j0 = Ai[j];
        j1 = Ai[j+1];
        for(k=j0;k<j1;++k) { if(Aj[k] === l) { y[l] /= Av[k]; break; } }
        a = y[l];
        for(k=j0;k<j1;++k) y[Aj[k]] -= a*Av[k];
        y[l] = a;
    }
}
numeric.ccsLUP0 = function ccsLUP0(A,threshold) {
    var m = A[0].length-1;
    var L = [numeric.rep([m+1],0),[],[]], U = [numeric.rep([m+1], 0),[],[]];
    var Li = L[0], Lj = L[1], Lv = L[2], Ui = U[0], Uj = U[1], Uv = U[2];
    var y = numeric.rep([m],0), xj = numeric.rep([m],0);
    var i,j,k,j0,j1,a,e,c,d,K;
    var sol = numeric.ccsLPSolve0, max = Math.max, abs = Math.abs;
    var P = numeric.linspace(0,m-1),Pinv = numeric.linspace(0,m-1);
    var dfs = new numeric.ccsDFS0(m);
    if(typeof threshold === "undefined") { threshold = 1; }
    for(i=0;i<m;++i) {
        sol(L,A,y,xj,i,Pinv,P,dfs);
        a = -1;
        e = -1;
        for(j=xj.length-1;j!==-1;--j) {
            k = xj[j];
            if(k <= i) continue;
            c = abs(y[P[k]]);
            if(c > a) { e = k; a = c; }
        }
        if(abs(y[P[i]])<threshold*a) {
            j = P[i];
            a = P[e];
            P[i] = a; Pinv[a] = i;
            P[e] = j; Pinv[j] = e;
        }
        a = Li[i];
        e = Ui[i];
        d = y[P[i]];
        Lj[a] = P[i];
        Lv[a] = 1;
        ++a;
        for(j=xj.length-1;j!==-1;--j) {
            k = xj[j];
            c = y[P[k]];
            xj[j] = 0;
            y[P[k]] = 0;
            if(k<=i) { Uj[e] = k; Uv[e] = c;   ++e; }
            else     { Lj[a] = P[k]; Lv[a] = c/d; ++a; }
        }
        Li[i+1] = a;
        Ui[i+1] = e;
    }
    for(j=Lj.length-1;j!==-1;--j) { Lj[j] = Pinv[Lj[j]]; }
    return {L:L, U:U, P:P, Pinv:Pinv};
}
numeric.ccsLUP = numeric.ccsLUP0;

numeric.ccsDim = function ccsDim(A) { return [numeric.sup(A[1])+1,A[0].length-1]; }
numeric.ccsGetBlock = function ccsGetBlock(A,i,j) {
    var s = numeric.ccsDim(A),m=s[0],n=s[1];
    if(typeof i === "undefined") { i = numeric.linspace(0,m-1); }
    else if(typeof i === "number") { i = [i]; }
    if(typeof j === "undefined") { j = numeric.linspace(0,n-1); }
    else if(typeof j === "number") { j = [j]; }
    var p,p0,p1,P = i.length,q,Q = j.length,r,jq,ip;
    var Bi = numeric.rep([n],0), Bj=[], Bv=[], B = [Bi,Bj,Bv];
    var Ai = A[0], Aj = A[1], Av = A[2];
    var x = numeric.rep([m],0),count=0,flags = numeric.rep([m],0);
    for(q=0;q<Q;++q) {
        jq = j[q];
        var q0 = Ai[jq];
        var q1 = Ai[jq+1];
        for(p=q0;p<q1;++p) {
            r = Aj[p];
            flags[r] = 1;
            x[r] = Av[p];
        }
        for(p=0;p<P;++p) {
            ip = i[p];
            if(flags[ip]) {
                Bj[count] = p;
                Bv[count] = x[i[p]];
                ++count;
            }
        }
        for(p=q0;p<q1;++p) {
            r = Aj[p];
            flags[r] = 0;
        }
        Bi[q+1] = count;
    }
    return B;
}

numeric.ccsDot = function ccsDot(A,B) {
    var Ai = A[0], Aj = A[1], Av = A[2];
    var Bi = B[0], Bj = B[1], Bv = B[2];
    var sA = numeric.ccsDim(A), sB = numeric.ccsDim(B);
    var m = sA[0], n = sA[1], o = sB[1];
    var x = numeric.rep([m],0), flags = numeric.rep([m],0), xj = Array(m);
    var Ci = numeric.rep([o],0), Cj = [], Cv = [], C = [Ci,Cj,Cv];
    var i,j,k,j0,j1,i0,i1,l,p,a,b;
    for(k=0;k!==o;++k) {
        j0 = Bi[k];
        j1 = Bi[k+1];
        p = 0;
        for(j=j0;j<j1;++j) {
            a = Bj[j];
            b = Bv[j];
            i0 = Ai[a];
            i1 = Ai[a+1];
            for(i=i0;i<i1;++i) {
                l = Aj[i];
                if(flags[l]===0) {
                    xj[p] = l;
                    flags[l] = 1;
                    p = p+1;
                }
                x[l] = x[l] + Av[i]*b;
            }
        }
        j0 = Ci[k];
        j1 = j0+p;
        Ci[k+1] = j1;
        for(j=p-1;j!==-1;--j) {
            b = j0+j;
            i = xj[j];
            Cj[b] = i;
            Cv[b] = x[i];
            flags[i] = 0;
            x[i] = 0;
        }
        Ci[k+1] = Ci[k]+p;
    }
    return C;
}

numeric.ccsLUPSolve = function ccsLUPSolve(LUP,B) {
    var L = LUP.L, U = LUP.U, P = LUP.P;
    var Bi = B[0];
    var flag = false;
    if(typeof Bi !== "object") { B = [[0,B.length],numeric.linspace(0,B.length-1),B]; Bi = B[0]; flag = true; }
    var Bj = B[1], Bv = B[2];
    var n = L[0].length-1, m = Bi.length-1;
    var x = numeric.rep([n],0), xj = Array(n);
    var b = numeric.rep([n],0), bj = Array(n);
    var Xi = numeric.rep([m+1],0), Xj = [], Xv = [];
    var sol = numeric.ccsTSolve;
    var i,j,j0,j1,k,J,N=0;
    for(i=0;i<m;++i) {
        k = 0;
        j0 = Bi[i];
        j1 = Bi[i+1];
        for(j=j0;j<j1;++j) { 
            J = LUP.Pinv[Bj[j]];
            bj[k] = J;
            b[J] = Bv[j];
            ++k;
        }
        bj.length = k;
        sol(L,b,x,bj,xj);
        for(j=bj.length-1;j!==-1;--j) b[bj[j]] = 0;
        sol(U,x,b,xj,bj);
        if(flag) return b;
        for(j=xj.length-1;j!==-1;--j) x[xj[j]] = 0;
        for(j=bj.length-1;j!==-1;--j) {
            J = bj[j];
            Xj[N] = J;
            Xv[N] = b[J];
            b[J] = 0;
            ++N;
        }
        Xi[i+1] = N;
    }
    return [Xi,Xj,Xv];
}

numeric.ccsbinop = function ccsbinop(body,setup) {
    if(typeof setup === "undefined") setup='';
    return Function('X','Y',
            'var Xi = X[0], Xj = X[1], Xv = X[2];\n'+
            'var Yi = Y[0], Yj = Y[1], Yv = Y[2];\n'+
            'var n = Xi.length-1,m = Math.max(numeric.sup(Xj),numeric.sup(Yj))+1;\n'+
            'var Zi = numeric.rep([n+1],0), Zj = [], Zv = [];\n'+
            'var x = numeric.rep([m],0),y = numeric.rep([m],0);\n'+
            'var xk,yk,zk;\n'+
            'var i,j,j0,j1,k,p=0;\n'+
            setup+
            'for(i=0;i<n;++i) {\n'+
            '  j0 = Xi[i]; j1 = Xi[i+1];\n'+
            '  for(j=j0;j!==j1;++j) {\n'+
            '    k = Xj[j];\n'+
            '    x[k] = 1;\n'+
            '    Zj[p] = k;\n'+
            '    ++p;\n'+
            '  }\n'+
            '  j0 = Yi[i]; j1 = Yi[i+1];\n'+
            '  for(j=j0;j!==j1;++j) {\n'+
            '    k = Yj[j];\n'+
            '    y[k] = Yv[j];\n'+
            '    if(x[k] === 0) {\n'+
            '      Zj[p] = k;\n'+
            '      ++p;\n'+
            '    }\n'+
            '  }\n'+
            '  Zi[i+1] = p;\n'+
            '  j0 = Xi[i]; j1 = Xi[i+1];\n'+
            '  for(j=j0;j!==j1;++j) x[Xj[j]] = Xv[j];\n'+
            '  j0 = Zi[i]; j1 = Zi[i+1];\n'+
            '  for(j=j0;j!==j1;++j) {\n'+
            '    k = Zj[j];\n'+
            '    xk = x[k];\n'+
            '    yk = y[k];\n'+
            body+'\n'+
            '    Zv[j] = zk;\n'+
            '  }\n'+
            '  j0 = Xi[i]; j1 = Xi[i+1];\n'+
            '  for(j=j0;j!==j1;++j) x[Xj[j]] = 0;\n'+
            '  j0 = Yi[i]; j1 = Yi[i+1];\n'+
            '  for(j=j0;j!==j1;++j) y[Yj[j]] = 0;\n'+
            '}\n'+
            'return [Zi,Zj,Zv];'
            );
};

(function() {
    var k,A,B,C;
    for(k in numeric.ops2) {
        if(isFinite(eval('1'+numeric.ops2[k]+'0'))) A = '[Y[0],Y[1],numeric.'+k+'(X,Y[2])]';
        else A = 'NaN';
        if(isFinite(eval('0'+numeric.ops2[k]+'1'))) B = '[X[0],X[1],numeric.'+k+'(X[2],Y)]';
        else B = 'NaN';
        if(isFinite(eval('1'+numeric.ops2[k]+'0')) && isFinite(eval('0'+numeric.ops2[k]+'1'))) C = 'numeric.ccs'+k+'MM(X,Y)';
        else C = 'NaN';
        numeric['ccs'+k+'MM'] = numeric.ccsbinop('zk = xk '+numeric.ops2[k]+'yk;');
        numeric['ccs'+k] = Function('X','Y',
                'if(typeof X === "number") return '+A+';\n'+
                'if(typeof Y === "number") return '+B+';\n'+
                'return '+C+';\n'
                );
    }
}());

numeric.ccsScatter = function ccsScatter(A) {
    var Ai = A[0], Aj = A[1], Av = A[2];
    var n = numeric.sup(Aj)+1,m=Ai.length;
    var Ri = numeric.rep([n],0),Rj=Array(m), Rv = Array(m);
    var counts = numeric.rep([n],0),i;
    for(i=0;i<m;++i) counts[Aj[i]]++;
    for(i=0;i<n;++i) Ri[i+1] = Ri[i] + counts[i];
    var ptr = Ri.slice(0),k,Aii;
    for(i=0;i<m;++i) {
        Aii = Aj[i];
        k = ptr[Aii];
        Rj[k] = Ai[i];
        Rv[k] = Av[i];
        ptr[Aii]=ptr[Aii]+1;
    }
    return [Ri,Rj,Rv];
}

numeric.ccsGather = function ccsGather(A) {
    var Ai = A[0], Aj = A[1], Av = A[2];
    var n = Ai.length-1,m = Aj.length;
    var Ri = Array(m), Rj = Array(m), Rv = Array(m);
    var i,j,j0,j1,p;
    p=0;
    for(i=0;i<n;++i) {
        j0 = Ai[i];
        j1 = Ai[i+1];
        for(j=j0;j!==j1;++j) {
            Rj[p] = i;
            Ri[p] = Aj[j];
            Rv[p] = Av[j];
            ++p;
        }
    }
    return [Ri,Rj,Rv];
}

// The following sparse linear algebra routines are deprecated.

numeric.sdim = function dim(A,ret,k) {
    if(typeof ret === "undefined") { ret = []; }
    if(typeof A !== "object") return ret;
    if(typeof k === "undefined") { k=0; }
    if(!(k in ret)) { ret[k] = 0; }
    if(A.length > ret[k]) ret[k] = A.length;
    var i;
    for(i in A) {
        if(A.hasOwnProperty(i)) dim(A[i],ret,k+1);
    }
    return ret;
};

numeric.sclone = function clone(A,k,n) {
    if(typeof k === "undefined") { k=0; }
    if(typeof n === "undefined") { n = numeric.sdim(A).length; }
    var i,ret = Array(A.length);
    if(k === n-1) {
        for(i in A) { if(A.hasOwnProperty(i)) ret[i] = A[i]; }
        return ret;
    }
    for(i in A) {
        if(A.hasOwnProperty(i)) ret[i] = clone(A[i],k+1,n);
    }
    return ret;
}

numeric.sdiag = function diag(d) {
    var n = d.length,i,ret = Array(n),i1,i2,i3;
    for(i=n-1;i>=1;i-=2) {
        i1 = i-1;
        ret[i] = []; ret[i][i] = d[i];
        ret[i1] = []; ret[i1][i1] = d[i1];
    }
    if(i===0) { ret[0] = []; ret[0][0] = d[i]; }
    return ret;
}

numeric.sidentity = function identity(n) { return numeric.sdiag(numeric.rep([n],1)); }

numeric.stranspose = function transpose(A) {
    var ret = [], n = A.length, i,j,Ai;
    for(i in A) {
        if(!(A.hasOwnProperty(i))) continue;
        Ai = A[i];
        for(j in Ai) {
            if(!(Ai.hasOwnProperty(j))) continue;
            if(typeof ret[j] !== "object") { ret[j] = []; }
            ret[j][i] = Ai[j];
        }
    }
    return ret;
}

numeric.sLUP = function LUP(A,tol) {
    throw new Error("The function numeric.sLUP had a bug in it and has been removed. Please use the new numeric.ccsLUP function instead.");
};

numeric.sdotMM = function dotMM(A,B) {
    var p = A.length, q = B.length, BT = numeric.stranspose(B), r = BT.length, Ai, BTk;
    var i,j,k,accum;
    var ret = Array(p),reti;
    for(i=p-1;i>=0;i--) {
        reti = [];
        Ai = A[i];
        for(k=r-1;k>=0;k--) {
            accum = 0;
            BTk = BT[k];
            for(j in Ai) {
                if(!(Ai.hasOwnProperty(j))) continue;
                if(j in BTk) { accum += Ai[j]*BTk[j]; }
            }
            if(accum) reti[k] = accum;
        }
        ret[i] = reti;
    }
    return ret;
}

numeric.sdotMV = function dotMV(A,x) {
    var p = A.length, Ai, i,j;
    var ret = Array(p), accum;
    for(i=p-1;i>=0;i--) {
        Ai = A[i];
        accum = 0;
        for(j in Ai) {
            if(!(Ai.hasOwnProperty(j))) continue;
            if(x[j]) accum += Ai[j]*x[j];
        }
        if(accum) ret[i] = accum;
    }
    return ret;
}

numeric.sdotVM = function dotMV(x,A) {
    var i,j,Ai,alpha;
    var ret = [], accum;
    for(i in x) {
        if(!x.hasOwnProperty(i)) continue;
        Ai = A[i];
        alpha = x[i];
        for(j in Ai) {
            if(!Ai.hasOwnProperty(j)) continue;
            if(!ret[j]) { ret[j] = 0; }
            ret[j] += alpha*Ai[j];
        }
    }
    return ret;
}

numeric.sdotVV = function dotVV(x,y) {
    var i,ret=0;
    for(i in x) { if(x[i] && y[i]) ret+= x[i]*y[i]; }
    return ret;
}

numeric.sdot = function dot(A,B) {
    var m = numeric.sdim(A).length, n = numeric.sdim(B).length;
    var k = m*1000+n;
    switch(k) {
    case 0: return A*B;
    case 1001: return numeric.sdotVV(A,B);
    case 2001: return numeric.sdotMV(A,B);
    case 1002: return numeric.sdotVM(A,B);
    case 2002: return numeric.sdotMM(A,B);
    default: throw new Error('numeric.sdot not implemented for tensors of order '+m+' and '+n);
    }
}

numeric.sscatter = function scatter(V) {
    var n = V[0].length, Vij, i, j, m = V.length, A = [], Aj;
    for(i=n-1;i>=0;--i) {
        if(!V[m-1][i]) continue;
        Aj = A;
        for(j=0;j<m-2;j++) {
            Vij = V[j][i];
            if(!Aj[Vij]) Aj[Vij] = [];
            Aj = Aj[Vij];
        }
        Aj[V[j][i]] = V[j+1][i];
    }
    return A;
}

numeric.sgather = function gather(A,ret,k) {
    if(typeof ret === "undefined") ret = [];
    if(typeof k === "undefined") k = [];
    var n,i,Ai;
    n = k.length;
    for(i in A) {
        if(A.hasOwnProperty(i)) {
            k[n] = parseInt(i);
            Ai = A[i];
            if(typeof Ai === "number") {
                if(Ai) {
                    if(ret.length === 0) {
                        for(i=n+1;i>=0;--i) ret[i] = [];
                    }
                    for(i=n;i>=0;--i) ret[i].push(k[i]);
                    ret[n+1].push(Ai);
                }
            } else gather(Ai,ret,k);
        }
    }
    if(k.length>n) k.pop();
    return ret;
}

// 6. Coordinate matrices
numeric.cLU = function LU(A) {
    var I = A[0], J = A[1], V = A[2];
    var p = I.length, m=0, i,j,k,a,b,c;
    for(i=0;i<p;i++) if(I[i]>m) m=I[i];
    m++;
    var L = Array(m), U = Array(m), left = numeric.rep([m],Infinity), right = numeric.rep([m],-Infinity);
    var Ui, Uj,alpha;
    for(k=0;k<p;k++) {
        i = I[k];
        j = J[k];
        if(j<left[i]) left[i] = j;
        if(j>right[i]) right[i] = j;
    }
    for(i=0;i<m-1;i++) { if(right[i] > right[i+1]) right[i+1] = right[i]; }
    for(i=m-1;i>=1;i--) { if(left[i]<left[i-1]) left[i-1] = left[i]; }
    var countL = 0, countU = 0;
    for(i=0;i<m;i++) {
        U[i] = numeric.rep([right[i]-left[i]+1],0);
        L[i] = numeric.rep([i-left[i]],0);
        countL += i-left[i]+1;
        countU += right[i]-i+1;
    }
    for(k=0;k<p;k++) { i = I[k]; U[i][J[k]-left[i]] = V[k]; }
    for(i=0;i<m-1;i++) {
        a = i-left[i];
        Ui = U[i];
        for(j=i+1;left[j]<=i && j<m;j++) {
            b = i-left[j];
            c = right[i]-i;
            Uj = U[j];
            alpha = Uj[b]/Ui[a];
            if(alpha) {
                for(k=1;k<=c;k++) { Uj[k+b] -= alpha*Ui[k+a]; }
                L[j][i-left[j]] = alpha;
            }
        }
    }
    var Ui = [], Uj = [], Uv = [], Li = [], Lj = [], Lv = [];
    var p,q,foo;
    p=0; q=0;
    for(i=0;i<m;i++) {
        a = left[i];
        b = right[i];
        foo = U[i];
        for(j=i;j<=b;j++) {
            if(foo[j-a]) {
                Ui[p] = i;
                Uj[p] = j;
                Uv[p] = foo[j-a];
                p++;
            }
        }
        foo = L[i];
        for(j=a;j<i;j++) {
            if(foo[j-a]) {
                Li[q] = i;
                Lj[q] = j;
                Lv[q] = foo[j-a];
                q++;
            }
        }
        Li[q] = i;
        Lj[q] = i;
        Lv[q] = 1;
        q++;
    }
    return {U:[Ui,Uj,Uv], L:[Li,Lj,Lv]};
};

numeric.cLUsolve = function LUsolve(lu,b) {
    var L = lu.L, U = lu.U, ret = numeric.clone(b);
    var Li = L[0], Lj = L[1], Lv = L[2];
    var Ui = U[0], Uj = U[1], Uv = U[2];
    var p = Ui.length, q = Li.length;
    var m = ret.length,i,j,k;
    k = 0;
    for(i=0;i<m;i++) {
        while(Lj[k] < i) {
            ret[i] -= Lv[k]*ret[Lj[k]];
            k++;
        }
        k++;
    }
    k = p-1;
    for(i=m-1;i>=0;i--) {
        while(Uj[k] > i) {
            ret[i] -= Uv[k]*ret[Uj[k]];
            k--;
        }
        ret[i] /= Uv[k];
        k--;
    }
    return ret;
};

numeric.cgrid = function grid(n,shape) {
    if(typeof n === "number") n = [n,n];
    var ret = numeric.rep(n,-1);
    var i,j,count;
    if(typeof shape !== "function") {
        switch(shape) {
        case 'L':
            shape = function(i,j) { return (i>=n[0]/2 || j<n[1]/2); }
            break;
        default:
            shape = function(i,j) { return true; };
            break;
        }
    }
    count=0;
    for(i=1;i<n[0]-1;i++) for(j=1;j<n[1]-1;j++) 
        if(shape(i,j)) {
            ret[i][j] = count;
            count++;
        }
    return ret;
}

numeric.cdelsq = function delsq(g) {
    var dir = [[-1,0],[0,-1],[0,1],[1,0]];
    var s = numeric.dim(g), m = s[0], n = s[1], i,j,k,p,q;
    var Li = [], Lj = [], Lv = [];
    for(i=1;i<m-1;i++) for(j=1;j<n-1;j++) {
        if(g[i][j]<0) continue;
        for(k=0;k<4;k++) {
            p = i+dir[k][0];
            q = j+dir[k][1];
            if(g[p][q]<0) continue;
            Li.push(g[i][j]);
            Lj.push(g[p][q]);
            Lv.push(-1);
        }
        Li.push(g[i][j]);
        Lj.push(g[i][j]);
        Lv.push(4);
    }
    return [Li,Lj,Lv];
}

numeric.cdotMV = function dotMV(A,x) {
    var ret, Ai = A[0], Aj = A[1], Av = A[2],k,p=Ai.length,N;
    N=0;
    for(k=0;k<p;k++) { if(Ai[k]>N) N = Ai[k]; }
    N++;
    ret = numeric.rep([N],0);
    for(k=0;k<p;k++) { ret[Ai[k]]+=Av[k]*x[Aj[k]]; }
    return ret;
}

// 7. Splines

numeric.Spline = function Spline(x,yl,yr,kl,kr) { this.x = x; this.yl = yl; this.yr = yr; this.kl = kl; this.kr = kr; }
numeric.Spline.prototype._at = function _at(x1,p) {
    var x = this.x;
    var yl = this.yl;
    var yr = this.yr;
    var kl = this.kl;
    var kr = this.kr;
    var x1,a,b,t;
    var add = numeric.add, sub = numeric.sub, mul = numeric.mul;
    a = sub(mul(kl[p],x[p+1]-x[p]),sub(yr[p+1],yl[p]));
    b = add(mul(kr[p+1],x[p]-x[p+1]),sub(yr[p+1],yl[p]));
    t = (x1-x[p])/(x[p+1]-x[p]);
    var s = t*(1-t);
    return add(add(add(mul(1-t,yl[p]),mul(t,yr[p+1])),mul(a,s*(1-t))),mul(b,s*t));
}
numeric.Spline.prototype.at = function at(x0) {
    if(typeof x0 === "number") {
        var x = this.x;
        var n = x.length;
        var p,q,mid,floor = Math.floor,a,b,t;
        p = 0;
        q = n-1;
        while(q-p>1) {
            mid = floor((p+q)/2);
            if(x[mid] <= x0) p = mid;
            else q = mid;
        }
        return this._at(x0,p);
    }
    var n = x0.length, i, ret = Array(n);
    for(i=n-1;i!==-1;--i) ret[i] = this.at(x0[i]);
    return ret;
}
numeric.Spline.prototype.diff = function diff() {
    var x = this.x;
    var yl = this.yl;
    var yr = this.yr;
    var kl = this.kl;
    var kr = this.kr;
    var n = yl.length;
    var i,dx,dy;
    var zl = kl, zr = kr, pl = Array(n), pr = Array(n);
    var add = numeric.add, mul = numeric.mul, div = numeric.div, sub = numeric.sub;
    for(i=n-1;i!==-1;--i) {
        dx = x[i+1]-x[i];
        dy = sub(yr[i+1],yl[i]);
        pl[i] = div(add(mul(dy, 6),mul(kl[i],-4*dx),mul(kr[i+1],-2*dx)),dx*dx);
        pr[i+1] = div(add(mul(dy,-6),mul(kl[i], 2*dx),mul(kr[i+1], 4*dx)),dx*dx);
    }
    return new numeric.Spline(x,zl,zr,pl,pr);
}
numeric.Spline.prototype.roots = function roots() {
    function sqr(x) { return x*x; }
    function heval(y0,y1,k0,k1,x) {
        var A = k0*2-(y1-y0);
        var B = -k1*2+(y1-y0);
        var t = (x+1)*0.5;
        var s = t*(1-t);
        return (1-t)*y0+t*y1+A*s*(1-t)+B*s*t;
    }
    var ret = [];
    var x = this.x, yl = this.yl, yr = this.yr, kl = this.kl, kr = this.kr;
    if(typeof yl[0] === "number") {
        yl = [yl];
        yr = [yr];
        kl = [kl];
        kr = [kr];
    }
    var m = yl.length,n=x.length-1,i,j,k,y,s,t;
    var ai,bi,ci,di, ret = Array(m),ri,k0,k1,y0,y1,A,B,D,dx,cx,stops,z0,z1,zm,t0,t1,tm;
    var sqrt = Math.sqrt;
    for(i=0;i!==m;++i) {
        ai = yl[i];
        bi = yr[i];
        ci = kl[i];
        di = kr[i];
        ri = [];
        for(j=0;j!==n;j++) {
            if(j>0 && bi[j]*ai[j]<0) ri.push(x[j]);
            dx = (x[j+1]-x[j]);
            cx = x[j];
            y0 = ai[j];
            y1 = bi[j+1];
            k0 = ci[j]/dx;
            k1 = di[j+1]/dx;
            D = sqr(k0-k1+3*(y0-y1)) + 12*k1*y0;
            A = k1+3*y0+2*k0-3*y1;
            B = 3*(k1+k0+2*(y0-y1));
            if(D<=0) {
                z0 = A/B;
                if(z0>x[j] && z0<x[j+1]) stops = [x[j],z0,x[j+1]];
                else stops = [x[j],x[j+1]];
            } else {
                z0 = (A-sqrt(D))/B;
                z1 = (A+sqrt(D))/B;
                stops = [x[j]];
                if(z0>x[j] && z0<x[j+1]) stops.push(z0);
                if(z1>x[j] && z1<x[j+1]) stops.push(z1);
                stops.push(x[j+1]);
            }
            t0 = stops[0];
            z0 = this._at(t0,j);
            for(k=0;k<stops.length-1;k++) {
                t1 = stops[k+1];
                z1 = this._at(t1,j);
                if(z0 === 0) {
                    ri.push(t0); 
                    t0 = t1;
                    z0 = z1;
                    continue;
                }
                if(z1 === 0 || z0*z1>0) {
                    t0 = t1;
                    z0 = z1;
                    continue;
                }
                var side = 0;
                while(1) {
                    tm = (z0*t1-z1*t0)/(z0-z1);
                    if(tm <= t0 || tm >= t1) { break; }
                    zm = this._at(tm,j);
                    if(zm*z1>0) {
                        t1 = tm;
                        z1 = zm;
                        if(side === -1) z0*=0.5;
                        side = -1;
                    } else if(zm*z0>0) {
                        t0 = tm;
                        z0 = zm;
                        if(side === 1) z1*=0.5;
                        side = 1;
                    } else break;
                }
                ri.push(tm);
                t0 = stops[k+1];
                z0 = this._at(t0, j);
            }
            if(z1 === 0) ri.push(t1);
        }
        ret[i] = ri;
    }
    if(typeof this.yl[0] === "number") return ret[0];
    return ret;
}
numeric.spline = function spline(x,y,k1,kn) {
    var n = x.length, b = [], dx = [], dy = [];
    var i;
    var sub = numeric.sub,mul = numeric.mul,add = numeric.add;
    for(i=n-2;i>=0;i--) { dx[i] = x[i+1]-x[i]; dy[i] = sub(y[i+1],y[i]); }
    if(typeof k1 === "string" || typeof kn === "string") { 
        k1 = kn = "periodic";
    }
    // Build sparse tridiagonal system
    var T = [[],[],[]];
    switch(typeof k1) {
    case "undefined":
        b[0] = mul(3/(dx[0]*dx[0]),dy[0]);
        T[0].push(0,0);
        T[1].push(0,1);
        T[2].push(2/dx[0],1/dx[0]);
        break;
    case "string":
        b[0] = add(mul(3/(dx[n-2]*dx[n-2]),dy[n-2]),mul(3/(dx[0]*dx[0]),dy[0]));
        T[0].push(0,0,0);
        T[1].push(n-2,0,1);
        T[2].push(1/dx[n-2],2/dx[n-2]+2/dx[0],1/dx[0]);
        break;
    default:
        b[0] = k1;
        T[0].push(0);
        T[1].push(0);
        T[2].push(1);
        break;
    }
    for(i=1;i<n-1;i++) {
        b[i] = add(mul(3/(dx[i-1]*dx[i-1]),dy[i-1]),mul(3/(dx[i]*dx[i]),dy[i]));
        T[0].push(i,i,i);
        T[1].push(i-1,i,i+1);
        T[2].push(1/dx[i-1],2/dx[i-1]+2/dx[i],1/dx[i]);
    }
    switch(typeof kn) {
    case "undefined":
        b[n-1] = mul(3/(dx[n-2]*dx[n-2]),dy[n-2]);
        T[0].push(n-1,n-1);
        T[1].push(n-2,n-1);
        T[2].push(1/dx[n-2],2/dx[n-2]);
        break;
    case "string":
        T[1][T[1].length-1] = 0;
        break;
    default:
        b[n-1] = kn;
        T[0].push(n-1);
        T[1].push(n-1);
        T[2].push(1);
        break;
    }
    if(typeof b[0] !== "number") b = numeric.transpose(b);
    else b = [b];
    var k = Array(b.length);
    if(typeof k1 === "string") {
        for(i=k.length-1;i!==-1;--i) {
            k[i] = numeric.ccsLUPSolve(numeric.ccsLUP(numeric.ccsScatter(T)),b[i]);
            k[i][n-1] = k[i][0];
        }
    } else {
        for(i=k.length-1;i!==-1;--i) {
            k[i] = numeric.cLUsolve(numeric.cLU(T),b[i]);
        }
    }
    if(typeof y[0] === "number") k = k[0];
    else k = numeric.transpose(k);
    return new numeric.Spline(x,y,y,k,k);
}

// 8. FFT
numeric.fftpow2 = function fftpow2(x,y) {
    var n = x.length;
    if(n === 1) return;
    var cos = Math.cos, sin = Math.sin, i,j;
    var xe = Array(n/2), ye = Array(n/2), xo = Array(n/2), yo = Array(n/2);
    j = n/2;
    for(i=n-1;i!==-1;--i) {
        --j;
        xo[j] = x[i];
        yo[j] = y[i];
        --i;
        xe[j] = x[i];
        ye[j] = y[i];
    }
    fftpow2(xe,ye);
    fftpow2(xo,yo);
    j = n/2;
    var t,k = (-6.2831853071795864769252867665590057683943387987502116419/n),ci,si;
    for(i=n-1;i!==-1;--i) {
        --j;
        if(j === -1) j = n/2-1;
        t = k*i;
        ci = cos(t);
        si = sin(t);
        x[i] = xe[j] + ci*xo[j] - si*yo[j];
        y[i] = ye[j] + ci*yo[j] + si*xo[j];
    }
}
numeric._ifftpow2 = function _ifftpow2(x,y) {
    var n = x.length;
    if(n === 1) return;
    var cos = Math.cos, sin = Math.sin, i,j;
    var xe = Array(n/2), ye = Array(n/2), xo = Array(n/2), yo = Array(n/2);
    j = n/2;
    for(i=n-1;i!==-1;--i) {
        --j;
        xo[j] = x[i];
        yo[j] = y[i];
        --i;
        xe[j] = x[i];
        ye[j] = y[i];
    }
    _ifftpow2(xe,ye);
    _ifftpow2(xo,yo);
    j = n/2;
    var t,k = (6.2831853071795864769252867665590057683943387987502116419/n),ci,si;
    for(i=n-1;i!==-1;--i) {
        --j;
        if(j === -1) j = n/2-1;
        t = k*i;
        ci = cos(t);
        si = sin(t);
        x[i] = xe[j] + ci*xo[j] - si*yo[j];
        y[i] = ye[j] + ci*yo[j] + si*xo[j];
    }
}
numeric.ifftpow2 = function ifftpow2(x,y) {
    numeric._ifftpow2(x,y);
    numeric.diveq(x,x.length);
    numeric.diveq(y,y.length);
}
numeric.convpow2 = function convpow2(ax,ay,bx,by) {
    numeric.fftpow2(ax,ay);
    numeric.fftpow2(bx,by);
    var i,n = ax.length,axi,bxi,ayi,byi;
    for(i=n-1;i!==-1;--i) {
        axi = ax[i]; ayi = ay[i]; bxi = bx[i]; byi = by[i];
        ax[i] = axi*bxi-ayi*byi;
        ay[i] = axi*byi+ayi*bxi;
    }
    numeric.ifftpow2(ax,ay);
}
numeric.T.prototype.fft = function fft() {
    var x = this.x, y = this.y;
    var n = x.length, log = Math.log, log2 = log(2),
        p = Math.ceil(log(2*n-1)/log2), m = Math.pow(2,p);
    var cx = numeric.rep([m],0), cy = numeric.rep([m],0), cos = Math.cos, sin = Math.sin;
    var k, c = (-3.141592653589793238462643383279502884197169399375105820/n),t;
    var a = numeric.rep([m],0), b = numeric.rep([m],0),nhalf = Math.floor(n/2);
    for(k=0;k<n;k++) a[k] = x[k];
    if(typeof y !== "undefined") for(k=0;k<n;k++) b[k] = y[k];
    cx[0] = 1;
    for(k=1;k<=m/2;k++) {
        t = c*k*k;
        cx[k] = cos(t);
        cy[k] = sin(t);
        cx[m-k] = cos(t);
        cy[m-k] = sin(t)
    }
    var X = new numeric.T(a,b), Y = new numeric.T(cx,cy);
    X = X.mul(Y);
    numeric.convpow2(X.x,X.y,numeric.clone(Y.x),numeric.neg(Y.y));
    X = X.mul(Y);
    X.x.length = n;
    X.y.length = n;
    return X;
}
numeric.T.prototype.ifft = function ifft() {
    var x = this.x, y = this.y;
    var n = x.length, log = Math.log, log2 = log(2),
        p = Math.ceil(log(2*n-1)/log2), m = Math.pow(2,p);
    var cx = numeric.rep([m],0), cy = numeric.rep([m],0), cos = Math.cos, sin = Math.sin;
    var k, c = (3.141592653589793238462643383279502884197169399375105820/n),t;
    var a = numeric.rep([m],0), b = numeric.rep([m],0),nhalf = Math.floor(n/2);
    for(k=0;k<n;k++) a[k] = x[k];
    if(typeof y !== "undefined") for(k=0;k<n;k++) b[k] = y[k];
    cx[0] = 1;
    for(k=1;k<=m/2;k++) {
        t = c*k*k;
        cx[k] = cos(t);
        cy[k] = sin(t);
        cx[m-k] = cos(t);
        cy[m-k] = sin(t)
    }
    var X = new numeric.T(a,b), Y = new numeric.T(cx,cy);
    X = X.mul(Y);
    numeric.convpow2(X.x,X.y,numeric.clone(Y.x),numeric.neg(Y.y));
    X = X.mul(Y);
    X.x.length = n;
    X.y.length = n;
    return X.div(n);
}

//9. Unconstrained optimization
numeric.gradient = function gradient(f,x) {
    var n = x.length;
    var f0 = f(x);
    if(isNaN(f0)) throw new Error('gradient: f(x) is a NaN!');
    var max = Math.max;
    var i,x0 = numeric.clone(x),f1,f2, J = Array(n);
    var div = numeric.div, sub = numeric.sub,errest,roundoff,max = Math.max,eps = 1e-3,abs = Math.abs, min = Math.min;
    var t0,t1,t2,it=0,d1,d2,N;
    for(i=0;i<n;i++) {
        var h = max(1e-6*f0,1e-8);
        while(1) {
            ++it;
            if(it>20) { throw new Error("Numerical gradient fails"); }
            x0[i] = x[i]+h;
            f1 = f(x0);
            x0[i] = x[i]-h;
            f2 = f(x0);
            x0[i] = x[i];
            if(isNaN(f1) || isNaN(f2)) { h/=16; continue; }
            J[i] = (f1-f2)/(2*h);
            t0 = x[i]-h;
            t1 = x[i];
            t2 = x[i]+h;
            d1 = (f1-f0)/h;
            d2 = (f0-f2)/h;
            N = max(abs(J[i]),abs(f0),abs(f1),abs(f2),abs(t0),abs(t1),abs(t2),1e-8);
            errest = min(max(abs(d1-J[i]),abs(d2-J[i]),abs(d1-d2))/N,h/N);
            if(errest>eps) { h/=16; }
            else break;
            }
    }
    return J;
}

numeric.uncmin = function uncmin(f,x0,tol,gradient,maxit,callback,options) {
    var grad = numeric.gradient;
    if(typeof options === "undefined") { options = {}; }
    if(typeof tol === "undefined") { tol = 1e-8; }
    if(typeof gradient === "undefined") { gradient = function(x) { return grad(f,x); }; }
    if(typeof maxit === "undefined") maxit = 1000;
    x0 = numeric.clone(x0);
    var n = x0.length;
    var f0 = f(x0),f1,df0;
    if(isNaN(f0)) throw new Error('uncmin: f(x0) is a NaN!');
    var max = Math.max, norm2 = numeric.norm2;
    tol = max(tol,numeric.epsilon);
    var step,g0,g1,H1 = options.Hinv || numeric.identity(n);
    var dot = numeric.dot, inv = numeric.inv, sub = numeric.sub, add = numeric.add, ten = numeric.tensor, div = numeric.div, mul = numeric.mul;
    var all = numeric.all, isfinite = numeric.isFinite, neg = numeric.neg;
    var it=0,i,s,x1,y,Hy,Hs,ys,i0,t,nstep,t1,t2;
    var msg = "";
    g0 = gradient(x0);
    while(it<maxit) {
        if(typeof callback === "function") { if(callback(it,x0,f0,g0,H1)) { msg = "Callback returned true"; break; } }
        if(!all(isfinite(g0))) { msg = "Gradient has Infinity or NaN"; break; }
        step = neg(dot(H1,g0));
        if(!all(isfinite(step))) { msg = "Search direction has Infinity or NaN"; break; }
        nstep = norm2(step);
        if(nstep < tol) { msg="Newton step smaller than tol"; break; }
        t = 1;
        df0 = dot(g0,step);
        // line search
        x1 = x0;
        while(it < maxit) {
            if(t*nstep < tol) { break; }
            s = mul(step,t);
            x1 = add(x0,s);
            f1 = f(x1);
            if(f1-f0 >= 0.1*t*df0 || isNaN(f1)) {
                t *= 0.5;
                ++it;
                continue;
            }
            break;
        }
        if(t*nstep < tol) { msg = "Line search step size smaller than tol"; break; }
        if(it === maxit) { msg = "maxit reached during line search"; break; }
        g1 = gradient(x1);
        y = sub(g1,g0);
        ys = dot(y,s);
        Hy = dot(H1,y);
        H1 = sub(add(H1,
                mul(
                        (ys+dot(y,Hy))/(ys*ys),
                        ten(s,s)    )),
                div(add(ten(Hy,s),ten(s,Hy)),ys));
        x0 = x1;
        f0 = f1;
        g0 = g1;
        ++it;
    }
    return {solution: x0, f: f0, gradient: g0, invHessian: H1, iterations:it, message: msg};
}

// 10. Ode solver (Dormand-Prince)
numeric.Dopri = function Dopri(x,y,f,ymid,iterations,msg,events) {
    this.x = x;
    this.y = y;
    this.f = f;
    this.ymid = ymid;
    this.iterations = iterations;
    this.events = events;
    this.message = msg;
}
numeric.Dopri.prototype._at = function _at(xi,j) {
    function sqr(x) { return x*x; }
    var sol = this;
    var xs = sol.x;
    var ys = sol.y;
    var k1 = sol.f;
    var ymid = sol.ymid;
    var n = xs.length;
    var x0,x1,xh,y0,y1,yh,xi;
    var floor = Math.floor,h;
    var c = 0.5;
    var add = numeric.add, mul = numeric.mul,sub = numeric.sub, p,q,w;
    x0 = xs[j];
    x1 = xs[j+1];
    y0 = ys[j];
    y1 = ys[j+1];
    h  = x1-x0;
    xh = x0+c*h;
    yh = ymid[j];
    p = sub(k1[j  ],mul(y0,1/(x0-xh)+2/(x0-x1)));
    q = sub(k1[j+1],mul(y1,1/(x1-xh)+2/(x1-x0)));
    w = [sqr(xi - x1) * (xi - xh) / sqr(x0 - x1) / (x0 - xh),
         sqr(xi - x0) * sqr(xi - x1) / sqr(x0 - xh) / sqr(x1 - xh),
         sqr(xi - x0) * (xi - xh) / sqr(x1 - x0) / (x1 - xh),
         (xi - x0) * sqr(xi - x1) * (xi - xh) / sqr(x0-x1) / (x0 - xh),
         (xi - x1) * sqr(xi - x0) * (xi - xh) / sqr(x0-x1) / (x1 - xh)];
    return add(add(add(add(mul(y0,w[0]),
                           mul(yh,w[1])),
                           mul(y1,w[2])),
                           mul( p,w[3])),
                           mul( q,w[4]));
}
numeric.Dopri.prototype.at = function at(x) {
    var i,j,k,floor = Math.floor;
    if(typeof x !== "number") {
        var n = x.length, ret = Array(n);
        for(i=n-1;i!==-1;--i) {
            ret[i] = this.at(x[i]);
        }
        return ret;
    }
    var x0 = this.x;
    i = 0; j = x0.length-1;
    while(j-i>1) {
        k = floor(0.5*(i+j));
        if(x0[k] <= x) i = k;
        else j = k;
    }
    return this._at(x,i);
}

numeric.dopri = function dopri(x0,x1,y0,f,tol,maxit,event) {
    if(typeof tol === "undefined") { tol = 1e-6; }
    if(typeof maxit === "undefined") { maxit = 1000; }
    var xs = [x0], ys = [y0], k1 = [f(x0,y0)], k2,k3,k4,k5,k6,k7, ymid = [];
    var A2 = 1/5;
    var A3 = [3/40,9/40];
    var A4 = [44/45,-56/15,32/9];
    var A5 = [19372/6561,-25360/2187,64448/6561,-212/729];
    var A6 = [9017/3168,-355/33,46732/5247,49/176,-5103/18656];
    var b = [35/384,0,500/1113,125/192,-2187/6784,11/84];
    var bm = [0.5*6025192743/30085553152,
              0,
              0.5*51252292925/65400821598,
              0.5*-2691868925/45128329728,
              0.5*187940372067/1594534317056,
              0.5*-1776094331/19743644256,
              0.5*11237099/235043384];
    var c = [1/5,3/10,4/5,8/9,1,1];
    var e = [-71/57600,0,71/16695,-71/1920,17253/339200,-22/525,1/40];
    var i = 0,er,j;
    var h = (x1-x0)/10;
    var it = 0;
    var add = numeric.add, mul = numeric.mul, y1,erinf;
    var max = Math.max, min = Math.min, abs = Math.abs, norminf = numeric.norminf,pow = Math.pow;
    var any = numeric.any, lt = numeric.lt, and = numeric.and, sub = numeric.sub;
    var e0, e1, ev;
    var ret = new numeric.Dopri(xs,ys,k1,ymid,-1,"");
    if(typeof event === "function") e0 = event(x0,y0);
    while(x0<x1 && it<maxit) {
        ++it;
        if(x0+h>x1) h = x1-x0;
        k2 = f(x0+c[0]*h,                add(y0,mul(   A2*h,k1[i])));
        k3 = f(x0+c[1]*h,            add(add(y0,mul(A3[0]*h,k1[i])),mul(A3[1]*h,k2)));
        k4 = f(x0+c[2]*h,        add(add(add(y0,mul(A4[0]*h,k1[i])),mul(A4[1]*h,k2)),mul(A4[2]*h,k3)));
        k5 = f(x0+c[3]*h,    add(add(add(add(y0,mul(A5[0]*h,k1[i])),mul(A5[1]*h,k2)),mul(A5[2]*h,k3)),mul(A5[3]*h,k4)));
        k6 = f(x0+c[4]*h,add(add(add(add(add(y0,mul(A6[0]*h,k1[i])),mul(A6[1]*h,k2)),mul(A6[2]*h,k3)),mul(A6[3]*h,k4)),mul(A6[4]*h,k5)));
        y1 = add(add(add(add(add(y0,mul(k1[i],h*b[0])),mul(k3,h*b[2])),mul(k4,h*b[3])),mul(k5,h*b[4])),mul(k6,h*b[5]));
        k7 = f(x0+h,y1);
        er = add(add(add(add(add(mul(k1[i],h*e[0]),mul(k3,h*e[2])),mul(k4,h*e[3])),mul(k5,h*e[4])),mul(k6,h*e[5])),mul(k7,h*e[6]));
        if(typeof er === "number") erinf = abs(er);
        else erinf = norminf(er);
        if(erinf > tol) { // reject
            h = 0.2*h*pow(tol/erinf,0.25);
            if(x0+h === x0) {
                ret.msg = "Step size became too small";
                break;
            }
            continue;
        }
        ymid[i] = add(add(add(add(add(add(y0,
                mul(k1[i],h*bm[0])),
                mul(k3   ,h*bm[2])),
                mul(k4   ,h*bm[3])),
                mul(k5   ,h*bm[4])),
                mul(k6   ,h*bm[5])),
                mul(k7   ,h*bm[6]));
        ++i;
        xs[i] = x0+h;
        ys[i] = y1;
        k1[i] = k7;
        if(typeof event === "function") {
            var yi,xl = x0,xr = x0+0.5*h,xi;
            e1 = event(xr,ymid[i-1]);
            ev = and(lt(e0,0),lt(0,e1));
            if(!any(ev)) { xl = xr; xr = x0+h; e0 = e1; e1 = event(xr,y1); ev = and(lt(e0,0),lt(0,e1)); }
            if(any(ev)) {
                var xc, yc, en,ei;
                var side=0, sl = 1.0, sr = 1.0;
                while(1) {
                    if(typeof e0 === "number") xi = (sr*e1*xl-sl*e0*xr)/(sr*e1-sl*e0);
                    else {
                        xi = xr;
                        for(j=e0.length-1;j!==-1;--j) {
                            if(e0[j]<0 && e1[j]>0) xi = min(xi,(sr*e1[j]*xl-sl*e0[j]*xr)/(sr*e1[j]-sl*e0[j]));
                        }
                    }
                    if(xi <= xl || xi >= xr) break;
                    yi = ret._at(xi, i-1);
                    ei = event(xi,yi);
                    en = and(lt(e0,0),lt(0,ei));
                    if(any(en)) {
                        xr = xi;
                        e1 = ei;
                        ev = en;
                        sr = 1.0;
                        if(side === -1) sl *= 0.5;
                        else sl = 1.0;
                        side = -1;
                    } else {
                        xl = xi;
                        e0 = ei;
                        sl = 1.0;
                        if(side === 1) sr *= 0.5;
                        else sr = 1.0;
                        side = 1;
                    }
                }
                y1 = ret._at(0.5*(x0+xi),i-1);
                ret.f[i] = f(xi,yi);
                ret.x[i] = xi;
                ret.y[i] = yi;
                ret.ymid[i-1] = y1;
                ret.events = ev;
                ret.iterations = it;
                return ret;
            }
        }
        x0 += h;
        y0 = y1;
        e0 = e1;
        h = min(0.8*h*pow(tol/erinf,0.25),4*h);
    }
    ret.iterations = it;
    return ret;
}

// 11. Ax = b
numeric.LU = function(A, fast) {
  fast = fast || false;

  var abs = Math.abs;
  var i, j, k, absAjk, Akk, Ak, Pk, Ai;
  var max;
  var n = A.length, n1 = n-1;
  var P = new Array(n);
  if(!fast) A = numeric.clone(A);

  for (k = 0; k < n; ++k) {
    Pk = k;
    Ak = A[k];
    max = abs(Ak[k]);
    for (j = k + 1; j < n; ++j) {
      absAjk = abs(A[j][k]);
      if (max < absAjk) {
        max = absAjk;
        Pk = j;
      }
    }
    P[k] = Pk;

    if (Pk != k) {
      A[k] = A[Pk];
      A[Pk] = Ak;
      Ak = A[k];
    }

    Akk = Ak[k];

    for (i = k + 1; i < n; ++i) {
      A[i][k] /= Akk;
    }

    for (i = k + 1; i < n; ++i) {
      Ai = A[i];
      for (j = k + 1; j < n1; ++j) {
        Ai[j] -= Ai[k] * Ak[j];
        ++j;
        Ai[j] -= Ai[k] * Ak[j];
      }
      if(j===n1) Ai[j] -= Ai[k] * Ak[j];
    }
  }

  return {
    LU: A,
    P:  P
  };
}

numeric.LUsolve = function LUsolve(LUP, b) {
  var i, j;
  var LU = LUP.LU;
  var n   = LU.length;
  var x = numeric.clone(b);
  var P   = LUP.P;
  var Pi, LUi, LUii, tmp;

  for (i=n-1;i!==-1;--i) x[i] = b[i];
  for (i = 0; i < n; ++i) {
    Pi = P[i];
    if (P[i] !== i) {
      tmp = x[i];
      x[i] = x[Pi];
      x[Pi] = tmp;
    }

    LUi = LU[i];
    for (j = 0; j < i; ++j) {
      x[i] -= x[j] * LUi[j];
    }
  }

  for (i = n - 1; i >= 0; --i) {
    LUi = LU[i];
    for (j = i + 1; j < n; ++j) {
      x[i] -= x[j] * LUi[j];
    }

    x[i] /= LUi[i];
  }

  return x;
}

numeric.solve = function solve(A,b,fast) { return numeric.LUsolve(numeric.LU(A,fast), b); }

// 12. Linear programming
numeric.echelonize = function echelonize(A) {
    var s = numeric.dim(A), m = s[0], n = s[1];
    var I = numeric.identity(m);
    var P = Array(m);
    var i,j,k,l,Ai,Ii,Z,a;
    var abs = Math.abs;
    var diveq = numeric.diveq;
    A = numeric.clone(A);
    for(i=0;i<m;++i) {
        k = 0;
        Ai = A[i];
        Ii = I[i];
        for(j=1;j<n;++j) if(abs(Ai[k])<abs(Ai[j])) k=j;
        P[i] = k;
        diveq(Ii,Ai[k]);
        diveq(Ai,Ai[k]);
        for(j=0;j<m;++j) if(j!==i) {
            Z = A[j]; a = Z[k];
            for(l=n-1;l!==-1;--l) Z[l] -= Ai[l]*a;
            Z = I[j];
            for(l=m-1;l!==-1;--l) Z[l] -= Ii[l]*a;
        }
    }
    return {I:I, A:A, P:P};
}

numeric.__solveLP = function __solveLP(c,A,b,tol,maxit,x,flag) {
    var sum = numeric.sum, log = numeric.log, mul = numeric.mul, sub = numeric.sub, dot = numeric.dot, div = numeric.div, add = numeric.add;
    var m = c.length, n = b.length,y;
    var unbounded = false, cb,i0=0;
    var alpha = 1.0;
    var f0,df0,AT = numeric.transpose(A), svd = numeric.svd,transpose = numeric.transpose,leq = numeric.leq, sqrt = Math.sqrt, abs = Math.abs;
    var muleq = numeric.muleq;
    var norm = numeric.norminf, any = numeric.any,min = Math.min;
    var all = numeric.all, gt = numeric.gt;
    var p = Array(m), A0 = Array(n),e=numeric.rep([n],1), H;
    var solve = numeric.solve, z = sub(b,dot(A,x)),count;
    var dotcc = dot(c,c);
    var g;
    for(count=i0;count<maxit;++count) {
        var i,j,d;
        for(i=n-1;i!==-1;--i) A0[i] = div(A[i],z[i]);
        var A1 = transpose(A0);
        for(i=m-1;i!==-1;--i) p[i] = (/*x[i]+*/sum(A1[i]));
        alpha = 0.25*abs(dotcc/dot(c,p));
        var a1 = 100*sqrt(dotcc/dot(p,p));
        if(!isFinite(alpha) || alpha>a1) alpha = a1;
        g = add(c,mul(alpha,p));
        H = dot(A1,A0);
        for(i=m-1;i!==-1;--i) H[i][i] += 1;
        d = solve(H,div(g,alpha),true);
        var t0 = div(z,dot(A,d));
        var t = 1.0;
        for(i=n-1;i!==-1;--i) if(t0[i]<0) t = min(t,-0.999*t0[i]);
        y = sub(x,mul(d,t));
        z = sub(b,dot(A,y));
        if(!all(gt(z,0))) return { solution: x, message: "", iterations: count };
        x = y;
        if(alpha<tol) return { solution: y, message: "", iterations: count };
        if(flag) {
            var s = dot(c,g), Ag = dot(A,g);
            unbounded = true;
            for(i=n-1;i!==-1;--i) if(s*Ag[i]<0) { unbounded = false; break; }
        } else {
            if(x[m-1]>=0) unbounded = false;
            else unbounded = true;
        }
        if(unbounded) return { solution: y, message: "Unbounded", iterations: count };
    }
    return { solution: x, message: "maximum iteration count exceeded", iterations:count };
}

numeric._solveLP = function _solveLP(c,A,b,tol,maxit) {
    var m = c.length, n = b.length,y;
    var sum = numeric.sum, log = numeric.log, mul = numeric.mul, sub = numeric.sub, dot = numeric.dot, div = numeric.div, add = numeric.add;
    var c0 = numeric.rep([m],0).concat([1]);
    var J = numeric.rep([n,1],-1);
    var A0 = numeric.blockMatrix([[A                   ,   J  ]]);
    var b0 = b;
    var y = numeric.rep([m],0).concat(Math.max(0,numeric.sup(numeric.neg(b)))+1);
    var x0 = numeric.__solveLP(c0,A0,b0,tol,maxit,y,false);
    var x = numeric.clone(x0.solution);
    x.length = m;
    var foo = numeric.inf(sub(b,dot(A,x)));
    if(foo<0) { return { solution: NaN, message: "Infeasible", iterations: x0.iterations }; }
    var ret = numeric.__solveLP(c, A, b, tol, maxit-x0.iterations, x, true);
    ret.iterations += x0.iterations;
    return ret;
};

numeric.solveLP = function solveLP(c,A,b,Aeq,beq,tol,maxit) {
    if(typeof maxit === "undefined") maxit = 1000;
    if(typeof tol === "undefined") tol = numeric.epsilon;
    if(typeof Aeq === "undefined") return numeric._solveLP(c,A,b,tol,maxit);
    var m = Aeq.length, n = Aeq[0].length, o = A.length;
    var B = numeric.echelonize(Aeq);
    var flags = numeric.rep([n],0);
    var P = B.P;
    var Q = [];
    var i;
    for(i=P.length-1;i!==-1;--i) flags[P[i]] = 1;
    for(i=n-1;i!==-1;--i) if(flags[i]===0) Q.push(i);
    var g = numeric.getRange;
    var I = numeric.linspace(0,m-1), J = numeric.linspace(0,o-1);
    var Aeq2 = g(Aeq,I,Q), A1 = g(A,J,P), A2 = g(A,J,Q), dot = numeric.dot, sub = numeric.sub;
    var A3 = dot(A1,B.I);
    var A4 = sub(A2,dot(A3,Aeq2)), b4 = sub(b,dot(A3,beq));
    var c1 = Array(P.length), c2 = Array(Q.length);
    for(i=P.length-1;i!==-1;--i) c1[i] = c[P[i]];
    for(i=Q.length-1;i!==-1;--i) c2[i] = c[Q[i]];
    var c4 = sub(c2,dot(c1,dot(B.I,Aeq2)));
    var S = numeric._solveLP(c4,A4,b4,tol,maxit);
    var x2 = S.solution;
    if(x2!==x2) return S;
    var x1 = dot(B.I,sub(beq,dot(Aeq2,x2)));
    var x = Array(c.length);
    for(i=P.length-1;i!==-1;--i) x[P[i]] = x1[i];
    for(i=Q.length-1;i!==-1;--i) x[Q[i]] = x2[i];
    return { solution: x, message:S.message, iterations: S.iterations };
}

numeric.MPStoLP = function MPStoLP(MPS) {
    if(MPS instanceof String) { MPS.split('\n'); }
    var state = 0;
    var states = ['Initial state','NAME','ROWS','COLUMNS','RHS','BOUNDS','ENDATA'];
    var n = MPS.length;
    var i,j,z,N=0,rows = {}, sign = [], rl = 0, vars = {}, nv = 0;
    var name;
    var c = [], A = [], b = [];
    function err(e) { throw new Error('MPStoLP: '+e+'\nLine '+i+': '+MPS[i]+'\nCurrent state: '+states[state]+'\n'); }
    for(i=0;i<n;++i) {
        z = MPS[i];
        var w0 = z.match(/\S*/g);
        var w = [];
        for(j=0;j<w0.length;++j) if(w0[j]!=="") w.push(w0[j]);
        if(w.length === 0) continue;
        for(j=0;j<states.length;++j) if(z.substr(0,states[j].length) === states[j]) break;
        if(j<states.length) {
            state = j;
            if(j===1) { name = w[1]; }
            if(j===6) return { name:name, c:c, A:numeric.transpose(A), b:b, rows:rows, vars:vars };
            continue;
        }
        switch(state) {
        case 0: case 1: err('Unexpected line');
        case 2: 
            switch(w[0]) {
            case 'N': if(N===0) N = w[1]; else err('Two or more N rows'); break;
            case 'L': rows[w[1]] = rl; sign[rl] = 1; b[rl] = 0; ++rl; break;
            case 'G': rows[w[1]] = rl; sign[rl] = -1;b[rl] = 0; ++rl; break;
            case 'E': rows[w[1]] = rl; sign[rl] = 0;b[rl] = 0; ++rl; break;
            default: err('Parse error '+numeric.prettyPrint(w));
            }
            break;
        case 3:
            if(!vars.hasOwnProperty(w[0])) { vars[w[0]] = nv; c[nv] = 0; A[nv] = numeric.rep([rl],0); ++nv; }
            var p = vars[w[0]];
            for(j=1;j<w.length;j+=2) {
                if(w[j] === N) { c[p] = parseFloat(w[j+1]); continue; }
                var q = rows[w[j]];
                A[p][q] = (sign[q]<0?-1:1)*parseFloat(w[j+1]);
            }
            break;
        case 4:
            for(j=1;j<w.length;j+=2) b[rows[w[j]]] = (sign[rows[w[j]]]<0?-1:1)*parseFloat(w[j+1]);
            break;
        case 5: /*FIXME*/ break;
        case 6: err('Internal error');
        }
    }
    err('Reached end of file without ENDATA');
}
// seedrandom.js version 2.0.
// Author: David Bau 4/2/2011
//
// Defines a method Math.seedrandom() that, when called, substitutes
// an explicitly seeded RC4-based algorithm for Math.random().  Also
// supports automatic seeding from local or network sources of entropy.
//
// Usage:
//
//   <script src=http://davidbau.com/encode/seedrandom-min.js></script>
//
//   Math.seedrandom('yipee'); Sets Math.random to a function that is
//                             initialized using the given explicit seed.
//
//   Math.seedrandom();        Sets Math.random to a function that is
//                             seeded using the current time, dom state,
//                             and other accumulated local entropy.
//                             The generated seed string is returned.
//
//   Math.seedrandom('yowza', true);
//                             Seeds using the given explicit seed mixed
//                             together with accumulated entropy.
//
//   <script src="http://bit.ly/srandom-512"></script>
//                             Seeds using physical random bits downloaded
//                             from random.org.
//
//   <script src="https://jsonlib.appspot.com/urandom?callback=Math.seedrandom">
//   </script>                 Seeds using urandom bits from call.jsonlib.com,
//                             which is faster than random.org.
//
// Examples:
//
//   Math.seedrandom("hello");            // Use "hello" as the seed.
//   document.write(Math.random());       // Always 0.5463663768140734
//   document.write(Math.random());       // Always 0.43973793770592234
//   var rng1 = Math.random;              // Remember the current prng.
//
//   var autoseed = Math.seedrandom();    // New prng with an automatic seed.
//   document.write(Math.random());       // Pretty much unpredictable.
//
//   Math.random = rng1;                  // Continue "hello" prng sequence.
//   document.write(Math.random());       // Always 0.554769432473455
//
//   Math.seedrandom(autoseed);           // Restart at the previous seed.
//   document.write(Math.random());       // Repeat the 'unpredictable' value.
//
// Notes:
//
// Each time seedrandom('arg') is called, entropy from the passed seed
// is accumulated in a pool to help generate future seeds for the
// zero-argument form of Math.seedrandom, so entropy can be injected over
// time by calling seedrandom with explicit data repeatedly.
//
// On speed - This javascript implementation of Math.random() is about
// 3-10x slower than the built-in Math.random() because it is not native
// code, but this is typically fast enough anyway.  Seeding is more expensive,
// especially if you use auto-seeding.  Some details (timings on Chrome 4):
//
// Our Math.random()            - avg less than 0.002 milliseconds per call
// seedrandom('explicit')       - avg less than 0.5 milliseconds per call
// seedrandom('explicit', true) - avg less than 2 milliseconds per call
// seedrandom()                 - avg about 38 milliseconds per call
//
// LICENSE (BSD):
//
// Copyright 2010 David Bau, all rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
// 
//   1. Redistributions of source code must retain the above copyright
//      notice, this list of conditions and the following disclaimer.
//
//   2. Redistributions in binary form must reproduce the above copyright
//      notice, this list of conditions and the following disclaimer in the
//      documentation and/or other materials provided with the distribution.
// 
//   3. Neither the name of this module nor the names of its contributors may
//      be used to endorse or promote products derived from this software
//      without specific prior written permission.
// 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
/**
 * All code is in an anonymous closure to keep the global namespace clean.
 *
 * @param {number=} overflow 
 * @param {number=} startdenom
 */

// Patched by Seb so that seedrandom.js does not pollute the Math object.
// My tests suggest that doing Math.trouble = 1 makes Math lookups about 5%
// slower.
numeric.seedrandom = { pow:Math.pow, random:Math.random };

(function (pool, math, width, chunks, significance, overflow, startdenom) {


//
// seedrandom()
// This is the seedrandom function described above.
//
math['seedrandom'] = function seedrandom(seed, use_entropy) {
  var key = [];
  var arc4;

  // Flatten the seed string or build one from local entropy if needed.
  seed = mixkey(flatten(
    use_entropy ? [seed, pool] :
    arguments.length ? seed :
    [new Date().getTime(), pool, window], 3), key);

  // Use the seed to initialize an ARC4 generator.
  arc4 = new ARC4(key);

  // Mix the randomness into accumulated entropy.
  mixkey(arc4.S, pool);

  // Override Math.random

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.

  math['random'] = function random() {  // Closure to return a random double:
    var n = arc4.g(chunks);             // Start with a numerator n < 2 ^ 48
    var d = startdenom;                 //   and denominator d = 2 ^ 48.
    var x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  // Return the seed that was used
  return seed;
};

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
/** @constructor */
function ARC4(key) {
  var t, u, me = this, keylen = key.length;
  var i = 0, j = me.i = me.j = me.m = 0;
  me.S = [];
  me.c = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) { me.S[i] = i++; }
  for (i = 0; i < width; i++) {
    t = me.S[i];
    j = lowbits(j + t + key[i % keylen]);
    u = me.S[j];
    me.S[i] = u;
    me.S[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  me.g = function getnext(count) {
    var s = me.S;
    var i = lowbits(me.i + 1); var t = s[i];
    var j = lowbits(me.j + t); var u = s[j];
    s[i] = u;
    s[j] = t;
    var r = s[lowbits(t + u)];
    while (--count) {
      i = lowbits(i + 1); t = s[i];
      j = lowbits(j + t); u = s[j];
      s[i] = u;
      s[j] = t;
      r = r * width + s[lowbits(t + u)];
    }
    me.i = i;
    me.j = j;
    return r;
  };
  // For robust unpredictability discard an initial batch of values.
  // See http://www.rsa.com/rsalabs/node.asp?id=2009
  me.g(width);
}

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
/** @param {Object=} result 
  * @param {string=} prop
  * @param {string=} typ */
function flatten(obj, depth, result, prop, typ) {
  result = [];
  typ = typeof(obj);
  if (depth && typ == 'object') {
    for (prop in obj) {
      if (prop.indexOf('S') < 5) {    // Avoid FF3 bug (local/sessionStorage)
        try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
      }
    }
  }
  return (result.length ? result : obj + (typ != 'string' ? '\0' : ''));
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
/** @param {number=} smear 
  * @param {number=} j */
function mixkey(seed, key, smear, j) {
  seed += '';                         // Ensure the seed is a string
  smear = 0;
  for (j = 0; j < seed.length; j++) {
    key[lowbits(j)] =
      lowbits((smear ^= key[lowbits(j)] * 19) + seed.charCodeAt(j));
  }
  seed = '';
  for (j in key) { seed += String.fromCharCode(key[j]); }
  return seed;
}

//
// lowbits()
// A quick "n mod width" for width a power of 2.
//
function lowbits(n) { return n & (width - 1); }

//
// The following constants are related to IEEE 754 limits.
//
startdenom = math.pow(width, chunks);
significance = math.pow(2, significance);
overflow = significance * 2;

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to intefere with determinstic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

// End anonymous scope, and pass initial values.
}(
  [],   // pool: entropy pool starts empty
  numeric.seedrandom, // math: package containing random, pow, and seedrandom
  256,  // width: each RC4 output is 0 <= x < 256
  6,    // chunks: at least six RC4 outputs for each double
  52    // significance: there are 52 significant digits in a double
  ));
/* This file is a slightly modified version of quadprog.js from Alberto Santini.
 * It has been slightly modified by Sébastien Loisel to make sure that it handles
 * 0-based Arrays instead of 1-based Arrays.
 * License is in resources/LICENSE.quadprog */
(function(exports) {

function base0to1(A) {
    if(typeof A !== "object") { return A; }
    var ret = [], i,n=A.length;
    for(i=0;i<n;i++) ret[i+1] = base0to1(A[i]);
    return ret;
}
function base1to0(A) {
    if(typeof A !== "object") { return A; }
    var ret = [], i,n=A.length;
    for(i=1;i<n;i++) ret[i-1] = base1to0(A[i]);
    return ret;
}

function dpori(a, lda, n) {
    var i, j, k, kp1, t;

    for (k = 1; k <= n; k = k + 1) {
        a[k][k] = 1 / a[k][k];
        t = -a[k][k];
        //~ dscal(k - 1, t, a[1][k], 1);
        for (i = 1; i < k; i = i + 1) {
            a[i][k] = t * a[i][k];
        }

        kp1 = k + 1;
        if (n < kp1) {
            break;
        }
        for (j = kp1; j <= n; j = j + 1) {
            t = a[k][j];
            a[k][j] = 0;
            //~ daxpy(k, t, a[1][k], 1, a[1][j], 1);
            for (i = 1; i <= k; i = i + 1) {
                a[i][j] = a[i][j] + (t * a[i][k]);
            }
        }
    }

}

function dposl(a, lda, n, b) {
    var i, k, kb, t;

    for (k = 1; k <= n; k = k + 1) {
        //~ t = ddot(k - 1, a[1][k], 1, b[1], 1);
        t = 0;
        for (i = 1; i < k; i = i + 1) {
            t = t + (a[i][k] * b[i]);
        }

        b[k] = (b[k] - t) / a[k][k];
    }

    for (kb = 1; kb <= n; kb = kb + 1) {
        k = n + 1 - kb;
        b[k] = b[k] / a[k][k];
        t = -b[k];
        //~ daxpy(k - 1, t, a[1][k], 1, b[1], 1);
        for (i = 1; i < k; i = i + 1) {
            b[i] = b[i] + (t * a[i][k]);
        }
    }
}

function dpofa(a, lda, n, info) {
    var i, j, jm1, k, t, s;

    for (j = 1; j <= n; j = j + 1) {
        info[1] = j;
        s = 0;
        jm1 = j - 1;
        if (jm1 < 1) {
            s = a[j][j] - s;
            if (s <= 0) {
                break;
            }
            a[j][j] = Math.sqrt(s);
        } else {
            for (k = 1; k <= jm1; k = k + 1) {
                //~ t = a[k][j] - ddot(k - 1, a[1][k], 1, a[1][j], 1);
                t = a[k][j];
                for (i = 1; i < k; i = i + 1) {
                    t = t - (a[i][j] * a[i][k]);
                }
                t = t / a[k][k];
                a[k][j] = t;
                s = s + t * t;
            }
            s = a[j][j] - s;
            if (s <= 0) {
                break;
            }
            a[j][j] = Math.sqrt(s);
        }
        info[1] = 0;
    }
}

function qpgen2(dmat, dvec, fddmat, n, sol, crval, amat,
    bvec, fdamat, q, meq, iact, nact, iter, work, ierr) {

    var i, j, l, l1, info, it1, iwzv, iwrv, iwrm, iwsv, iwuv, nvl, r, iwnbv,
        temp, sum, t1, tt, gc, gs, nu,
        t1inf, t2min,
        vsmall, tmpa, tmpb,
        go;

    r = Math.min(n, q);
    l = 2 * n + (r * (r + 5)) / 2 + 2 * q + 1;

    vsmall = 1.0e-60;
    do {
        vsmall = vsmall + vsmall;
        tmpa = 1 + 0.1 * vsmall;
        tmpb = 1 + 0.2 * vsmall;
    } while (tmpa <= 1 || tmpb <= 1);

    for (i = 1; i <= n; i = i + 1) {
        work[i] = dvec[i];
    }
    for (i = n + 1; i <= l; i = i + 1) {
        work[i] = 0;
    }
    for (i = 1; i <= q; i = i + 1) {
        iact[i] = 0;
    }

    info = [];

    if (ierr[1] === 0) {
        dpofa(dmat, fddmat, n, info);
        if (info[1] !== 0) {
            ierr[1] = 2;
            return;
        }
        dposl(dmat, fddmat, n, dvec);
        dpori(dmat, fddmat, n);
    } else {
        for (j = 1; j <= n; j = j + 1) {
            sol[j] = 0;
            for (i = 1; i <= j; i = i + 1) {
                sol[j] = sol[j] + dmat[i][j] * dvec[i];
            }
        }
        for (j = 1; j <= n; j = j + 1) {
            dvec[j] = 0;
            for (i = j; i <= n; i = i + 1) {
                dvec[j] = dvec[j] + dmat[j][i] * sol[i];
            }
        }
    }

    crval[1] = 0;
    for (j = 1; j <= n; j = j + 1) {
        sol[j] = dvec[j];
        crval[1] = crval[1] + work[j] * sol[j];
        work[j] = 0;
        for (i = j + 1; i <= n; i = i + 1) {
            dmat[i][j] = 0;
        }
    }
    crval[1] = -crval[1] / 2;
    ierr[1] = 0;

    iwzv = n;
    iwrv = iwzv + n;
    iwuv = iwrv + r;
    iwrm = iwuv + r + 1;
    iwsv = iwrm + (r * (r + 1)) / 2;
    iwnbv = iwsv + q;

    for (i = 1; i <= q; i = i + 1) {
        sum = 0;
        for (j = 1; j <= n; j = j + 1) {
            sum = sum + amat[j][i] * amat[j][i];
        }
        work[iwnbv + i] = Math.sqrt(sum);
    }
    nact = 0;
    iter[1] = 0;
    iter[2] = 0;

    function fn_goto_50() {
        iter[1] = iter[1] + 1;

        l = iwsv;
        for (i = 1; i <= q; i = i + 1) {
            l = l + 1;
            sum = -bvec[i];
            for (j = 1; j <= n; j = j + 1) {
                sum = sum + amat[j][i] * sol[j];
            }
            if (Math.abs(sum) < vsmall) {
                sum = 0;
            }
            if (i > meq) {
                work[l] = sum;
            } else {
                work[l] = -Math.abs(sum);
                if (sum > 0) {
                    for (j = 1; j <= n; j = j + 1) {
                        amat[j][i] = -amat[j][i];
                    }
                    bvec[i] = -bvec[i];
                }
            }
        }

        for (i = 1; i <= nact; i = i + 1) {
            work[iwsv + iact[i]] = 0;
        }

        nvl = 0;
        temp = 0;
        for (i = 1; i <= q; i = i + 1) {
            if (work[iwsv + i] < temp * work[iwnbv + i]) {
                nvl = i;
                temp = work[iwsv + i] / work[iwnbv + i];
            }
        }
        if (nvl === 0) {
            return 999;
        }

        return 0;
    }

    function fn_goto_55() {
        for (i = 1; i <= n; i = i + 1) {
            sum = 0;
            for (j = 1; j <= n; j = j + 1) {
                sum = sum + dmat[j][i] * amat[j][nvl];
            }
            work[i] = sum;
        }

        l1 = iwzv;
        for (i = 1; i <= n; i = i + 1) {
            work[l1 + i] = 0;
        }
        for (j = nact + 1; j <= n; j = j + 1) {
            for (i = 1; i <= n; i = i + 1) {
                work[l1 + i] = work[l1 + i] + dmat[i][j] * work[j];
            }
        }

        t1inf = true;
        for (i = nact; i >= 1; i = i - 1) {
            sum = work[i];
            l = iwrm + (i * (i + 3)) / 2;
            l1 = l - i;
            for (j = i + 1; j <= nact; j = j + 1) {
                sum = sum - work[l] * work[iwrv + j];
                l = l + j;
            }
            sum = sum / work[l1];
            work[iwrv + i] = sum;
            if (iact[i] < meq) {
                // continue;
                break;
            }
            if (sum < 0) {
                // continue;
                break;
            }
            t1inf = false;
            it1 = i;
        }

        if (!t1inf) {
            t1 = work[iwuv + it1] / work[iwrv + it1];
            for (i = 1; i <= nact; i = i + 1) {
                if (iact[i] < meq) {
                    // continue;
                    break;
                }
                if (work[iwrv + i] < 0) {
                    // continue;
                    break;
                }
                temp = work[iwuv + i] / work[iwrv + i];
                if (temp < t1) {
                    t1 = temp;
                    it1 = i;
                }
            }
        }

        sum = 0;
        for (i = iwzv + 1; i <= iwzv + n; i = i + 1) {
            sum = sum + work[i] * work[i];
        }
        if (Math.abs(sum) <= vsmall) {
            if (t1inf) {
                ierr[1] = 1;
                // GOTO 999
                return 999;
            } else {
                for (i = 1; i <= nact; i = i + 1) {
                    work[iwuv + i] = work[iwuv + i] - t1 * work[iwrv + i];
                }
                work[iwuv + nact + 1] = work[iwuv + nact + 1] + t1;
                // GOTO 700
                return 700;
            }
        } else {
            sum = 0;
            for (i = 1; i <= n; i = i + 1) {
                sum = sum + work[iwzv + i] * amat[i][nvl];
            }
            tt = -work[iwsv + nvl] / sum;
            t2min = true;
            if (!t1inf) {
                if (t1 < tt) {
                    tt = t1;
                    t2min = false;
                }
            }

            for (i = 1; i <= n; i = i + 1) {
                sol[i] = sol[i] + tt * work[iwzv + i];
                if (Math.abs(sol[i]) < vsmall) {
                    sol[i] = 0;
                }
            }

            crval[1] = crval[1] + tt * sum * (tt / 2 + work[iwuv + nact + 1]);
            for (i = 1; i <= nact; i = i + 1) {
                work[iwuv + i] = work[iwuv + i] - tt * work[iwrv + i];
            }
            work[iwuv + nact + 1] = work[iwuv + nact + 1] + tt;

            if (t2min) {
                nact = nact + 1;
                iact[nact] = nvl;

                l = iwrm + ((nact - 1) * nact) / 2 + 1;
                for (i = 1; i <= nact - 1; i = i + 1) {
                    work[l] = work[i];
                    l = l + 1;
                }

                if (nact === n) {
                    work[l] = work[n];
                } else {
                    for (i = n; i >= nact + 1; i = i - 1) {
                        if (work[i] === 0) {
                            // continue;
                            break;
                        }
                        gc = Math.max(Math.abs(work[i - 1]), Math.abs(work[i]));
                        gs = Math.min(Math.abs(work[i - 1]), Math.abs(work[i]));
                        if (work[i - 1] >= 0) {
                            temp = Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
                        } else {
                            temp = -Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
                        }
                        gc = work[i - 1] / temp;
                        gs = work[i] / temp;

                        if (gc === 1) {
                            // continue;
                            break;
                        }
                        if (gc === 0) {
                            work[i - 1] = gs * temp;
                            for (j = 1; j <= n; j = j + 1) {
                                temp = dmat[j][i - 1];
                                dmat[j][i - 1] = dmat[j][i];
                                dmat[j][i] = temp;
                            }
                        } else {
                            work[i - 1] = temp;
                            nu = gs / (1 + gc);
                            for (j = 1; j <= n; j = j + 1) {
                                temp = gc * dmat[j][i - 1] + gs * dmat[j][i];
                                dmat[j][i] = nu * (dmat[j][i - 1] + temp) - dmat[j][i];
                                dmat[j][i - 1] = temp;

                            }
                        }
                    }
                    work[l] = work[nact];
                }
            } else {
                sum = -bvec[nvl];
                for (j = 1; j <= n; j = j + 1) {
                    sum = sum + sol[j] * amat[j][nvl];
                }
                if (nvl > meq) {
                    work[iwsv + nvl] = sum;
                } else {
                    work[iwsv + nvl] = -Math.abs(sum);
                    if (sum > 0) {
                        for (j = 1; j <= n; j = j + 1) {
                            amat[j][nvl] = -amat[j][nvl];
                        }
                        bvec[nvl] = -bvec[nvl];
                    }
                }
                // GOTO 700
                return 700;
            }
        }

        return 0;
    }

    function fn_goto_797() {
        l = iwrm + (it1 * (it1 + 1)) / 2 + 1;
        l1 = l + it1;
        if (work[l1] === 0) {
            // GOTO 798
            return 798;
        }
        gc = Math.max(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
        gs = Math.min(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
        if (work[l1 - 1] >= 0) {
            temp = Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
        } else {
            temp = -Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
        }
        gc = work[l1 - 1] / temp;
        gs = work[l1] / temp;

        if (gc === 1) {
            // GOTO 798
            return 798;
        }
        if (gc === 0) {
            for (i = it1 + 1; i <= nact; i = i + 1) {
                temp = work[l1 - 1];
                work[l1 - 1] = work[l1];
                work[l1] = temp;
                l1 = l1 + i;
            }
            for (i = 1; i <= n; i = i + 1) {
                temp = dmat[i][it1];
                dmat[i][it1] = dmat[i][it1 + 1];
                dmat[i][it1 + 1] = temp;
            }
        } else {
            nu = gs / (1 + gc);
            for (i = it1 + 1; i <= nact; i = i + 1) {
                temp = gc * work[l1 - 1] + gs * work[l1];
                work[l1] = nu * (work[l1 - 1] + temp) - work[l1];
                work[l1 - 1] = temp;
                l1 = l1 + i;
            }
            for (i = 1; i <= n; i = i + 1) {
                temp = gc * dmat[i][it1] + gs * dmat[i][it1 + 1];
                dmat[i][it1 + 1] = nu * (dmat[i][it1] + temp) - dmat[i][it1 + 1];
                dmat[i][it1] = temp;
            }
        }

        return 0;
    }

    function fn_goto_798() {
        l1 = l - it1;
        for (i = 1; i <= it1; i = i + 1) {
            work[l1] = work[l];
            l = l + 1;
            l1 = l1 + 1;
        }

        work[iwuv + it1] = work[iwuv + it1 + 1];
        iact[it1] = iact[it1 + 1];
        it1 = it1 + 1;
        if (it1 < nact) {
            // GOTO 797
            return 797;
        }

        return 0;
    }

    function fn_goto_799() {
        work[iwuv + nact] = work[iwuv + nact + 1];
        work[iwuv + nact + 1] = 0;
        iact[nact] = 0;
        nact = nact - 1;
        iter[2] = iter[2] + 1;

        return 0;
    }

    go = 0;
    while (true) {
        go = fn_goto_50();
        if (go === 999) {
            return;
        }
        while (true) {
            go = fn_goto_55();
            if (go === 0) {
                break;
            }
            if (go === 999) {
                return;
            }
            if (go === 700) {
                if (it1 === nact) {
                    fn_goto_799();
                } else {
                    while (true) {
                        fn_goto_797();
                        go = fn_goto_798();
                        if (go !== 797) {
                            break;
                        }
                    }
                    fn_goto_799();
                }
            }
        }
    }

}

function solveQP(Dmat, dvec, Amat, bvec, meq, factorized) {
    Dmat = base0to1(Dmat);
    dvec = base0to1(dvec);
    Amat = base0to1(Amat);
    var i, n, q,
        nact, r,
        crval = [], iact = [], sol = [], work = [], iter = [],
        message;

    meq = meq || 0;
    factorized = factorized ? base0to1(factorized) : [undefined, 0];
    bvec = bvec ? base0to1(bvec) : [];

    // In Fortran the array index starts from 1
    n = Dmat.length - 1;
    q = Amat[1].length - 1;

    if (!bvec) {
        for (i = 1; i <= q; i = i + 1) {
            bvec[i] = 0;
        }
    }
    for (i = 1; i <= q; i = i + 1) {
        iact[i] = 0;
    }
    nact = 0;
    r = Math.min(n, q);
    for (i = 1; i <= n; i = i + 1) {
        sol[i] = 0;
    }
    crval[1] = 0;
    for (i = 1; i <= (2 * n + (r * (r + 5)) / 2 + 2 * q + 1); i = i + 1) {
        work[i] = 0;
    }
    for (i = 1; i <= 2; i = i + 1) {
        iter[i] = 0;
    }

    qpgen2(Dmat, dvec, n, n, sol, crval, Amat,
        bvec, n, q, meq, iact, nact, iter, work, factorized);

    message = "";
    if (factorized[1] === 1) {
        message = "constraints are inconsistent, no solution!";
    }
    if (factorized[1] === 2) {
        message = "matrix D in quadratic function is not positive definite!";
    }

    return {
        solution: base1to0(sol),
        value: base1to0(crval),
        unconstrained_solution: base1to0(dvec),
        iterations: base1to0(iter),
        iact: base1to0(iact),
        message: message
    };
}
exports.solveQP = solveQP;
}(numeric));
/*
Shanti Rao sent me this routine by private email. I had to modify it
slightly to work on Arrays instead of using a Matrix object.
It is apparently translated from http://stitchpanorama.sourceforge.net/Python/svd.py
*/

numeric.svd= function svd(A) {
    var temp;
//Compute the thin SVD from G. H. Golub and C. Reinsch, Numer. Math. 14, 403-420 (1970)
	var prec= numeric.epsilon; //Math.pow(2,-52) // assumes double prec
	var tolerance= 1.e-64/prec;
	var itmax= 50;
	var c=0;
	var i=0;
	var j=0;
	var k=0;
	var l=0;
	
	var u= numeric.clone(A);
	var m= u.length;
	
	var n= u[0].length;
	
	if (m < n) throw "Need more rows than columns"
	
	var e = new Array(n);
	var q = new Array(n);
	for (i=0; i<n; i++) e[i] = q[i] = 0.0;
	var v = numeric.rep([n,n],0);
//	v.zero();
	
 	function pythag(a,b)
 	{
		a = Math.abs(a)
		b = Math.abs(b)
		if (a > b)
			return a*Math.sqrt(1.0+(b*b/a/a))
		else if (b == 0.0) 
			return a
		return b*Math.sqrt(1.0+(a*a/b/b))
	}

	//Householder's reduction to bidiagonal form

	var f= 0.0;
	var g= 0.0;
	var h= 0.0;
	var x= 0.0;
	var y= 0.0;
	var z= 0.0;
	var s= 0.0;
	
	for (i=0; i < n; i++)
	{	
		e[i]= g;
		s= 0.0;
		l= i+1;
		for (j=i; j < m; j++) 
			s += (u[j][i]*u[j][i]);
		if (s <= tolerance)
			g= 0.0;
		else
		{	
			f= u[i][i];
			g= Math.sqrt(s);
			if (f >= 0.0) g= -g;
			h= f*g-s
			u[i][i]=f-g;
			for (j=l; j < n; j++)
			{
				s= 0.0
				for (k=i; k < m; k++) 
					s += u[k][i]*u[k][j]
				f= s/h
				for (k=i; k < m; k++) 
					u[k][j]+=f*u[k][i]
			}
		}
		q[i]= g
		s= 0.0
		for (j=l; j < n; j++) 
			s= s + u[i][j]*u[i][j]
		if (s <= tolerance)
			g= 0.0
		else
		{	
			f= u[i][i+1]
			g= Math.sqrt(s)
			if (f >= 0.0) g= -g
			h= f*g - s
			u[i][i+1] = f-g;
			for (j=l; j < n; j++) e[j]= u[i][j]/h
			for (j=l; j < m; j++)
			{	
				s=0.0
				for (k=l; k < n; k++) 
					s += (u[j][k]*u[i][k])
				for (k=l; k < n; k++) 
					u[j][k]+=s*e[k]
			}	
		}
		y= Math.abs(q[i])+Math.abs(e[i])
		if (y>x) 
			x=y
	}
	
	// accumulation of right hand gtransformations
	for (i=n-1; i != -1; i+= -1)
	{	
		if (g != 0.0)
		{
		 	h= g*u[i][i+1]
			for (j=l; j < n; j++) 
				v[j][i]=u[i][j]/h
			for (j=l; j < n; j++)
			{	
				s=0.0
				for (k=l; k < n; k++) 
					s += u[i][k]*v[k][j]
				for (k=l; k < n; k++) 
					v[k][j]+=(s*v[k][i])
			}	
		}
		for (j=l; j < n; j++)
		{
			v[i][j] = 0;
			v[j][i] = 0;
		}
		v[i][i] = 1;
		g= e[i]
		l= i
	}
	
	// accumulation of left hand transformations
	for (i=n-1; i != -1; i+= -1)
	{	
		l= i+1
		g= q[i]
		for (j=l; j < n; j++) 
			u[i][j] = 0;
		if (g != 0.0)
		{
			h= u[i][i]*g
			for (j=l; j < n; j++)
			{
				s=0.0
				for (k=l; k < m; k++) s += u[k][i]*u[k][j];
				f= s/h
				for (k=i; k < m; k++) u[k][j]+=f*u[k][i];
			}
			for (j=i; j < m; j++) u[j][i] = u[j][i]/g;
		}
		else
			for (j=i; j < m; j++) u[j][i] = 0;
		u[i][i] += 1;
	}
	
	// diagonalization of the bidiagonal form
	prec= prec*x
	for (k=n-1; k != -1; k+= -1)
	{
		for (var iteration=0; iteration < itmax; iteration++)
		{	// test f splitting
			var test_convergence = false
			for (l=k; l != -1; l+= -1)
			{	
				if (Math.abs(e[l]) <= prec)
				{	test_convergence= true
					break 
				}
				if (Math.abs(q[l-1]) <= prec)
					break 
			}
			if (!test_convergence)
			{	// cancellation of e[l] if l>0
				c= 0.0
				s= 1.0
				var l1= l-1
				for (i =l; i<k+1; i++)
				{	
					f= s*e[i]
					e[i]= c*e[i]
					if (Math.abs(f) <= prec)
						break
					g= q[i]
					h= pythag(f,g)
					q[i]= h
					c= g/h
					s= -f/h
					for (j=0; j < m; j++)
					{	
						y= u[j][l1]
						z= u[j][i]
						u[j][l1] =  y*c+(z*s)
						u[j][i] = -y*s+(z*c)
					} 
				}	
			}
			// test f convergence
			z= q[k]
			if (l== k)
			{	//convergence
				if (z<0.0)
				{	//q[k] is made non-negative
					q[k]= -z
					for (j=0; j < n; j++)
						v[j][k] = -v[j][k]
				}
				break  //break out of iteration loop and move on to next k value
			}
			if (iteration >= itmax-1)
				throw 'Error: no convergence.'
			// shift from bottom 2x2 minor
			x= q[l]
			y= q[k-1]
			g= e[k-1]
			h= e[k]
			f= ((y-z)*(y+z)+(g-h)*(g+h))/(2.0*h*y)
			g= pythag(f,1.0)
			if (f < 0.0)
				f= ((x-z)*(x+z)+h*(y/(f-g)-h))/x
			else
				f= ((x-z)*(x+z)+h*(y/(f+g)-h))/x
			// next QR transformation
			c= 1.0
			s= 1.0
			for (i=l+1; i< k+1; i++)
			{	
				g= e[i]
				y= q[i]
				h= s*g
				g= c*g
				z= pythag(f,h)
				e[i-1]= z
				c= f/z
				s= h/z
				f= x*c+g*s
				g= -x*s+g*c
				h= y*s
				y= y*c
				for (j=0; j < n; j++)
				{	
					x= v[j][i-1]
					z= v[j][i]
					v[j][i-1] = x*c+z*s
					v[j][i] = -x*s+z*c
				}
				z= pythag(f,h)
				q[i-1]= z
				c= f/z
				s= h/z
				f= c*g+s*y
				x= -s*g+c*y
				for (j=0; j < m; j++)
				{
					y= u[j][i-1]
					z= u[j][i]
					u[j][i-1] = y*c+z*s
					u[j][i] = -y*s+z*c
				}
			}
			e[l]= 0.0
			e[k]= f
			q[k]= x
		} 
	}
		
	//vt= transpose(v)
	//return (u,q,vt)
	for (i=0;i<q.length; i++) 
	  if (q[i] < prec) q[i] = 0
	  
	//sort eigenvalues	
	for (i=0; i< n; i++)
	{	 
	//writeln(q)
	 for (j=i-1; j >= 0; j--)
	 {
	  if (q[j] < q[i])
	  {
	//  writeln(i,'-',j)
	   c = q[j]
	   q[j] = q[i]
	   q[i] = c
	   for(k=0;k<u.length;k++) { temp = u[k][i]; u[k][i] = u[k][j]; u[k][j] = temp; }
	   for(k=0;k<v.length;k++) { temp = v[k][i]; v[k][i] = v[k][j]; v[k][j] = temp; }
//	   u.swapCols(i,j)
//	   v.swapCols(i,j)
	   i = j	   
	  }
	 }	
	}
	
	return {U:u,S:q,V:v}
};


}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/formulajs-connect\\node_modules\\numeric\\numeric-1.2.6.js","/formulajs-connect\\node_modules\\numeric",undefined)
},{"_process":38,"buffer":36}],8:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
/**
 * Is a FFL quick-formatter (V05 '3.1m chars' 90ms) and is FFL to indexed formatter
 */
function FFLFormatter(register, data) {
    this.register = register;
    register.addColumn('desc')
    this.vars = register.getIndex('i')
    this.original = data;
    this.data = data;
    this.reassembled = '';
    this.constants = [];
    register.constants = this.constants
    this.comments = [];
    this.header = '';
    this.indents = [];
    for (var i = 0; i < 30; i++) {
        this.indents[i] = new Array(i).join(" ")
    }
}

/**
 * Extract imports, model name,comments in header
 */
FFLFormatter.prototype.extractHeader = function() {
    this.header = this.original.substring(0, this.original.indexOf('{'))
    //INFO: the header is not indexed.
    this.register.header = this.header;
    const headerLines = this.header.split('\n');
    for (var i = 0; i < headerLines.length; i++) {
        var headerLine = headerLines[i].trim();
        var modelName;
        if (modelName = headerLine.match(/^\s*model (\w+)/i)) {
            this.name = modelName[1];
            break;
        }
    }
}
FFLFormatter.prototype.extractConstants = function() {
    var index = 0;
    const constants = this.constants;
    this.data = this.data.replace(/"(.*?)"/gm, function($0) {
        constants[++index] = $0
        return '__' + index
    })
}
FFLFormatter.prototype.insertConstants = function() {
    var constants = this.constants;
    this.reassembled = this.reassembled.replace(/__(\d+)/gm, function($1, $2) {
        return constants[parseInt($2)]
    })
}
FFLFormatter.prototype.extractComments = function() {
    var comments = {}
    var index = 0;
    this.data = this.data.replace(/\/\/.*/gm, function($0) {
        comments[++index] = $0
        return '____' + index
    })
    this.comments = comments;
}

FFLFormatter.prototype.removeWhite = function() {
    this.data = this.data.replace(/\s\s+/g, ' ')
    //TODO: parse by properties, not by semicolons
        .replace(/;\s+/g, ';')//7ms of 100ms..(V05) (expensive, but it is removing trailing whitespaces of properties)
}
FFLFormatter.prototype.extractVars = function() {
    var noneexit = true;
    var data = this.data;
    var index = 0;
    const vars = [];
    const register = this.register;
    while (noneexit) {
        noneexit = false;
        data = data.replace(/{([^}{]*?)}/gm, function($0, $1, $2) {
            //this happens to many times...
            noneexit = true;
            const index = register.addRow([$1, $2, $0.length + $2])
            return '___' + index
        })
    }
    //  this.vars = vars;
}
FFLFormatter.prototype.findRootVariable = function() {
    return this.register.lastRowIndex()

}
FFLFormatter.prototype.buildTree = function() {
    this.extractHeader();
    this.extractConstants();
    this.extractComments();
    this.removeWhite();
    this.extractVars();
    var firstVar = this.findRootVariable();
    this.reassembled = this.prettyFormatFFL(2, firstVar)
    this.insertConstants();
}
FFLFormatter.prototype.walk = function(visit) {
    this.extractHeader();
    this.extractConstants();
    this.extractComments();
    this.removeWhite();
    this.extractVars();
    var firstVar = this.register.lastRowIndex();
    const firstRow = this.vars[firstVar];
    firstRow[0] = firstRow[0].replace(/root /gi, 'variable root ').trim()

    //this is a trick, not wrong!. parent and child index are the same to start with root.
    firstRow.push('root', firstVar, null, null, null, null, 0, [])
    this.walkTree(visit, firstVar, 1)
}
FFLFormatter.prototype.walkTree = function(visit, parentId, depth) {
    var self = this;
    const parts = this.vars[parentId][0].trim().split(';')
    var children = 0;
    if (parts[parts.length - 1] == '') {
        parts.length--;
    } else {
        var temp = parts[parts.length - 1];
        parts.length--;
        temp.replace(/((?!( variable | tuple )).)+/gm, function($1) {
            //here should go tuple/modifier/refer-to extraction.
            const refIdStartIndex = $1.indexOf('___');
            const varDesc = $1.substring(0, refIdStartIndex - 1)
            const tuple = varDesc.startsWith('tuple');
            const referIdx = varDesc.toLowerCase().indexOf('refers to')
            const referstoVariableName = referIdx != -1 ? varDesc.substring(referIdx + 10) : null;
            const varname = tuple ? referIdx == -1 ? varDesc.substring(6) : varDesc.substring(6, referIdx) : referIdx == -1 ? varDesc.substring(9) : varDesc.substring(9, referIdx);
            const modifier = varname.startsWith('+=') ? "+=" : varname.startsWith('+') ? '+' : varname.startsWith('=') ? '=' : varname.startsWith('-') ? '-' : null;
            const name = varname.substring(modifier ? modifier.length : 0).trim();//it might be a double space in the end. its too easy to trim.
            const varRefIndex = parseInt($1.substring(refIdStartIndex + 3));

            const variable = self.vars[varRefIndex];
            variable.push(name, varRefIndex, modifier, parentId, tuple, referstoVariableName, ++children, [])

            self.vars[parentId][10].push(variable)
            self.walkTree(visit, varRefIndex, depth + 1)
            return ''
        });
    }
    visit(parentId, parts)
}
//test if this is quicker than indexing, and recreate FFL
//scorecardTool is using this, internally
FFLFormatter.prototype.prettyFormatFFL = function(depth, index) {
    var self = this;
    const indent = this.indents[depth];
    const variable = this.vars[index][0].trim()
    const parts = variable.split(';')
    const varparts = [];
    if (parts[parts.length - 1] == '') {
        parts.length--;
    } else {
        var temp = parts[parts.length - 1];
        parts.length--
        temp.replace(/((?!( variable | tuple )).)+/gm, function($1) {
            const refId = $1.indexOf('___');
            varparts.push(indent + $1.substring(0, refId - 1) + "\n" + indent + "{\n" + self.prettyFormatFFL(depth + 1, parseInt($1.substring(refId + 3))) + "\n" + indent + "}")
            return ''
        });
    }
    var lb = ';\n'
    var r;
    if (parts.length == 0) {
        if (varparts.length == 0) {
            r = ''
        } else {
            r = varparts.join('\n')
        }
    } else {
        if (varparts.length == 0) {
            r = indent + parts.join(lb + indent) + ';'
        } else {
            r = indent + parts.join(lb + indent) + ";\n" + (varparts.length > 0 ? varparts.join('\n') : ';')
        }
    }
    return r;
}
var formulaMapping = {inputRequired: 'required'}
FFLFormatter.prototype.lookupConstant = function(index) {
    return this.constants[parseInt(index.substring(2))].replace(/'/g, "\\'").replace(/(?:\\r\\n|\\r|\\n)/g, "[br]")
}
FFLFormatter.prototype.parseProperties = function() {
    const register = this.register;
    const index = register.getIndex('i');
    const formatter = this;
    this.walk(function(v, raw_properties) {
            for (var i = 0; i < raw_properties.length; i++) {
                const p = raw_properties[i];
                const p_seperator_index = p.indexOf(':');//can't use split. some properties use multiple :
                var key = p.substring(0, p_seperator_index).trim();
                key = formulaMapping[key] || key
                register.addColumn(key)
                var value = p.substring(p_seperator_index + 1).trim();
                //TODO: internationalization should not happen here:
                //TODO: But to introduce Internationalization will take a day.
                //TODO: So thats why we are injecting constant Strings here.
                //TODO: making the model one language only for now
                if (value.startsWith('__')) value = formatter.lookupConstant(value)
                register.value(v, key, value)
            }
        }
    )
}
FFLFormatter.prototype.toString = function() {
    this.buildTree();
    return this.header + '{\n' + this.reassembled + '\n}';
}

function Factory() {
    this.on = false;
}
exports.Formatter = FFLFormatter;
exports.FFLFormatter = new Factory();

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\exchange_modules\\ffl\\FFLFormatter.js","/lme-core\\exchange_modules\\ffl",undefined)
},{"_process":38,"buffer":36}],9:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
//http://excelformulabeautifier.com/
function finFormulaGeneric(buf) {
    /**
     * Choices fix, this is a problem for titles and hints containing ":" chars.
     * TODO: move to choice specific logic.
     */
    var buf = buf.replace(/:/gm, ', ');
    buf = buf.replace(/(\$p|@|#|%|\.\.)/gmi, '');

    //temp case fix, <= lt,gt,lte,gte from Cases,
    buf = buf.replace(/\[\<\=/gm, '[');
    buf = buf.replace(/\[\</gm, '[');
    buf = buf.replace(/\|\</gm, '|');
    buf = buf.replace(/\[\=/gm, '[');
    buf = buf.replace(/\|\<\=/gm, '|');
    buf = buf.replace(/\|\=/gm, '|');
    buf = buf.replace(/\|\>\=/gm, '|');
    buf = buf.replace(/\|\>/gm, '|');
    //end temp case fix

    /**
     * Here are all time references
     the same as hasAnyValue? HasValue(var) ?
     */
    buf = buf.replace(/\(FirstValueT\((\w+),1,MaxT\)>0\)/gi, 'AnyDataAvailable($1)')//regular test for any data entered
    buf = buf.replace(/FormulaSetInT\(GetT\(T\,-1\)\)<>NoTrend/gi, '!x.isprevnotrend');

    buf = buf.replace(/LastTinYear\(FirstTinFormulaSet\(Trend,\s*(\w+|\d+)\)\)/gi, 'x.firsttrend.lastbkyr');
    buf = buf.replace(/FirstTInFormulaset\(NoTrend\)/gi, 'x.firstnotrend');
    buf = buf.replace(/FirstTInFormulaset\(Trend\)/gi, 'x.firsttrend');
    buf = buf.replace(/FirstTinFormulaSet\(NoTrend,\s*(\w+|\d+)\)/gi, 'x.firstnotrend');
    buf = buf.replace(/FirstTinFormulaSet\(Trend,\s*(\w+|\d+)\)/gi, 'x.firsttrend');

    buf = buf.replace(/LastTinFormulaSet\(NoTrend\)/gi, 'x.lastnotrend');
    buf = buf.replace(/LastTinFormulaSet\(Trend\)/gi, 'x.lasttrend');
    buf = buf.replace(/LastTinFormulaSet\(NoTrend,\s*(\w+|\d+)\)/gi, 'x.lastnotrend');
    buf = buf.replace(/LastTinFormulaSet\(Trend,\s*(\w+|\d+)\)/gi, 'x.lasttrend');
    // buf = buf.replace(/LastTinFormulaSet\(NoTrend,PeriodInT\)/gi, 'x.lastnotrend');

    buf = buf.replace(/FormulaSetInT\(LastTinPeriod\)/gi, 'x.lastinperiod');
    buf = buf.replace(/FormulaSetInT\(FirstTinPeriod\)/gi, 'x.firstinperiod');

    buf = buf.replace(/\[LastTinPeriod\(PeriodInT\)]/gi, '[lastinperiod]');
    buf = buf.replace(/\LastTinPeriod\(PeriodInT\)/gi, 'x.lastinperiod');
    buf = buf.replace(/LastTinYear\(T-TsY\)/gi, 'x.prevbkyear');

    buf = buf.replace(/\[1]/g, '[doc]');
    buf = buf.replace(/\[T]/g, ''); //Variable[T] is the same as Variable, its always in default to the corresponding time.
    buf = buf.replace(/\[GetT\(T,-1\)]/gi, '[prev]'); //Variable[T] is the same as Variable, its always in default to the corresponding time.
    buf = buf.replace(/\[LastT\]/gi, '[lastinperiod]');
    //(FormulaSetInT(GetT(T,-1))<>NoTrend) ==>  !x.prev.isnotrend
    buf = buf.replace(/ValueT\(1\)/gi, 'x.firstdetail');
    buf = buf.replace(/GetT\(T,-TsY,0,TsY\)/gi, 'x.prevbkyr');
    buf = buf.replace(/GetT\(T,-1\)/gi, 'x.prev');
    buf = buf.replace(/GetT(T,-1,1,1)/gi, 'x.prev');
    buf = buf.replace(/\(MaxT\)/g, '(x.last)');//only replace Function(MaxT) into  Function(x.last)


    //TODO: same as TSY?
    buf = buf.replace(/TsY\(LastTinPeriod\)/gi, 'TsY');
    buf = buf.replace(/TsY\(T\)/gi, 'x.tsy');
    buf = buf.replace(/\[0\]/g, '.title ');
    /*buf = buf.replace(/Visible\((\w+)\)/gi, '$1.visible')  ; Is done in ASTPreparser.js*/

    //(& types
    buf = buf.replace(/(=|,|\()\s{0,4}\&/gm, ' $1 ');// replace all '=   &' and '(  &'   with = or ( respectively
    buf = buf.replace(/\(\s*not /gim, '(!');//this of course only tackles the half of it
    buf = buf.replace(/^\s*&/gm, '');

    //AND &
    buf = buf.replace(/&/gmi, '+');// convert & to &&
    buf = buf.replace(/ And /gmi, '&&');// convert & to &&
    buf = buf.replace(/\)\s*and\s*\(/gmi, ')&&(');// convert )  and ( => &&

    buf = buf.replace(/\s*&&not\s*/gmi, '&& !');// convert )  and ( => &&

    //OR |
    buf = buf.replace(/\||\s+or /gmi, ' || ');// convert | to ||
    buf = buf.replace(/ Or /gmi, ' || ');// convert OR to ||
    buf = buf.replace(/\)\s*or\s*\(/gim, ')||(');

    //fix = to == when <=
    buf = buf.replace(/=/gm, '==');// convert = to ==
    buf = buf.replace(/<==/gm, '<=');
    buf = buf.replace(/>==/gm, '>=');
    buf = buf.replace(/<>/gm, '!=');
    buf = buf.replace(/<->/gm, '!=');
    buf = buf.replace(/ Implies /g, '&&');
    buf = buf.replace(/ mod /g, ' % ');

    return buf;
}

//console.info(finFormulaGeneric('[(VATPaymentFraction[GetT(T,-1)]>0)*(Round(VATPaymentFraction[GetT(T,-1)],0)=VATPaymentFraction[GetT(T,-1)])]'))
function javaScriptToFinGeneric(buf) {
    var buf = buf.replace(/!=/gm, '<>');
    //buf = buf.replace(/<=/gm, '<==');
    //buf = buf.replace(/>=/gm, '>==');
    buf = buf.replace(/==/gm, '=');// convert = to ==
    buf = buf.replace(/\|\|/gmi, ' | ');// convert | to ||
    buf = buf.replace(/&&/gmi, ' & ');// convert )  and ( => &&
    return buf;
}

//if it ends up being impossible to resolve generic
//we will have to do it in the formula-bootstrap.js
//there we know what is a Variable name
function finChoice(formula) {
    /**
     * Sometimes FFL is converted incorrectly with a trailing '\''
     * This is bugfixing the problem
     */
    formula = formula.replace(/\\''$/g, "'")

    //looks like a variable reference
    if (/^[a-z0-9_ ]+$/i.test(formula)) {
        return formula + '.choices';
    }
    //tricky one is just
    //three options
    //Directly with mm/dd/yy
    else if (formula.indexOf("|") < 0 && formula.indexOf(":") < 0) {
        const cleanslice = formula.slice(1, -1);
        return '[{ "name": "' + cleanslice + '", "value": "' + cleanslice + '" }]';
    }
    //NL|USA|BEL|GER
    else if (formula.indexOf(":") < 0) {
        var split = formula.split('|');
        //remove a trailing and leading " character.
        split[0] = split[0].slice(1);
        split[split.length - 1] = split[split.length - 1].slice(0, -1);

        split = split.map(function(e, idx) {
            return '{ "name": "' + idx + '" ,"value":' + (e ? '"' + e + '"' : null) + '}'
        })
        return "[" + split.join(',') + "]";
    }
    //HIGH:1|LOW:2|UNKNOWN:3
    else {
        formula = formula.trim().slice(1, -1);
        var choices = formula.replace(/'/gmi, '');
        choices = choices.replace(/: /g, ":")
        choices = choices.replace(/:/gmi, '\" , \"value\" : \"');
        choices = choices.replace(/\|/gmi, '\"} , { \"name\" :\"');
        return "[{ \"name\" : \"" + choices + "\" }]";
    }
}

function FinFormula() {
}

FinFormula.prototype.toJavascriptChoice = function(choiceObjectString) {
    var choiceObject = JSON.parse(choiceObjectString.replace(/'/gmi, '"'));
    var response = '';
    for (var i = 0; i < choiceObject.length; i++) {
        var choiceItem = choiceObject[i];
        if (i !== 0) {
            response += '|';
        }
        response += choiceItem.name + '|' + choiceItem.value;
    }
    return response;
}

FinFormula.prototype.finFormulaGeneric = finFormulaGeneric;
FinFormula.prototype.javaScriptToFinGeneric = javaScriptToFinGeneric;
FinFormula.prototype.parseFormula = finFormulaGeneric;
FinFormula.prototype.finChoice = finChoice;

//something more usefull came to mind, catches this large chunk of possibilities.
//>> old version would look like : buf = buf.replace(/Q_Map([0-9]{2})/gi, 'Q_MAP$1')9;
FinFormula.prototype.fixCasing = function(buf) {
    return buf.replace(/[^\w]{1}(Q_\w*)/gmi, function($1) {
        return $1.toUpperCase()
    })
};
module.exports = FinFormula.prototype;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\exchange_modules\\ffl\\FinFormula.js","/lme-core\\exchange_modules\\ffl",undefined)
},{"_process":38,"buffer":36}],10:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
/**
 * All indexed will be linked to a array of values, like a DB structure
 * Lightweigt data-model
 * @constructor
 */
function Register() {
    this.schema = []
    this.createdIndexes = []
    this.clean()
    this.changes = []
}

Register.prototype.clean = function() {
    this.header = null;
    this.constants = []
    for (var j = 0; j < this.createdIndexes.length; j++) delete this[this.createdIndexes[j]];
    this.createdIndexes = []
    this.schema.length = 0
    this.i = []
    this.schemaIndexes = {}
    //somehow 'valid' is a real important property
    //{{MODEL_VARIABLENAME_undefined}} will exist when 'valid' is not added to the list here. (since valid is created on demand in RegisterToLMEParser
    //Something alike if (VARIABLENAME.pattern) VARIABLENAME.valid = if(VARIABLENAME.test(VARIABLENAME),'','Invalid Input')
    //therefore adding the property 'valid 'too late while parsing.
    var schema = ['desc', 'start', 'end', 'name', 'index', 'modifier', 'parentId', 'tuple', 'refersto', 'treeindex', 'children', 'valid']//expect 'valid' to exist
    for (var j = 0; j < schema.length; j++) this.addColumn(schema[j]);
}
Register.prototype.getIndex = function(name) {
    if (!this[name]) this.createIndex(name)
    return this[name]
}
Register.prototype.lastRowIndex = function() {
    return this.i.length - 1
}
Register.prototype.addColumn = function(name) {
    if (this.schemaIndexes[name] == null) {
        this.schemaIndexes[name] = this.schema.length
        this.schema.push(name)
    }
}
Register.prototype.value = function(idx, key, value) {
    this.i[idx][this.schemaIndexes[key]] = value
}
Register.prototype.find = function(key, value) {
    const result = []
    for (var i = 0; i < this.i.length; i++) if (this.i[i][this.schemaIndexes[key]] === value) result.push(this.i[i])
    return result;
}
//can only be unique indexes, string based.
Register.prototype.createIndex = function(name) {
    if (!this[name]) {
        this.createdIndexes.push(name)
        const index = {}
        const a = this.i
        for (var i = 0; i < a.length; i++) index[a[i][this.schemaIndexes[name]]] = a[i]
        this[name] = index
    }
}
Register.prototype.addRow = function(row) {
    this.i.push(row)
    return this.i.length - 1
}
Register.prototype.inheritProperty = function(name, paramIndex) {
    const variable = this.getIndex('name')[name]
    if (variable[paramIndex]) return variable[paramIndex]
    if (variable[this.schemaIndexes.refersto]) return this.inheritProperty(variable[this.schemaIndexes.refersto], paramIndex)
    return "";
}
Register.prototype.doProx = function doProx(name, metaData, paramIndex) {
    const register = this;
    const variable = this.getIndex('name')[name];
    Object.defineProperty(metaData, 'value', {
        set: function(value) {
            variable[paramIndex] = value;
            register.changes.push({
                name: name,
                param: paramIndex
            })
        },
        get: function() {
            return register.inheritProperty(name, paramIndex);
        }
    });
}
Register.prototype.createInformationObject = function(name, hidden) {
    const variable = [];
    for (var paramIndex = 0; paramIndex < this.schema.length; paramIndex++) {
        var propertyName = this.schema[paramIndex];

        if (hidden.indexOf(paramIndex) != -1) continue
        const metaData = {name: propertyName};
        this.doProx(name, metaData, paramIndex)
        variable.push(metaData)
    }
    return variable;
}
Register.prototype.getAll = function(name) {
    const r = [], index = this.i, indexpos = this.schemaIndexes[name];
    for (var i = 0; i < index.length; i++) r[i] = index[i][indexpos]
    return r;
}
Register.prototype.walk = function(node, depth, visitor) {
    visitor(node, depth)
    const childs = node[this.schemaIndexes.children];
    for (var i = 0; i < childs.length; i++) {
        this.walk(childs[i], depth + 1, visitor)
    }
}
Register.prototype.toString = function() {
    return "variables:[" + this.i.length + "]\n" + this.i.join('\n')
}
exports.Register = Register
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\exchange_modules\\ffl\\Register.js","/lme-core\\exchange_modules\\ffl",undefined)
},{"_process":38,"buffer":36}],11:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
/**
 * Backwards compatible decorator, until all unit-tests success it will serve to fix bugs.
 */
const SolutionFacade = require('../../src/SolutionFacade')
const RegisterToLMEParser = require('./RegisterToLMEParser').RegisterToLMEParser
const FFLFormatter = require('./FFLFormatter').Formatter
const Register = require('./Register').Register

function RegisterPlainFFLToLMEParser() {
}

RegisterPlainFFLToLMEParser.prototype.name = 'ffl'
RegisterPlainFFLToLMEParser.prototype.status = 'green';
RegisterPlainFFLToLMEParser.prototype.headername = '.finance ffl';

RegisterPlainFFLToLMEParser.prototype.deParse = function(data, workbook) {
    return new RegisterToLMEParser().deParse(data, workbook)
}
RegisterPlainFFLToLMEParser.prototype.parseData = function(data, workbook) {
    /*
     * Backward compatibility:
     * Allow the register to be provided
     */
    const register = data.register || new Register()
    const raw = data.raw || data;

    const fflFormatter = new FFLFormatter(register, raw)
    fflFormatter.parseProperties();
    workbook.modelName = fflFormatter.name || workbook.modelName;
    return new RegisterToLMEParser().parseData(register, workbook)
}
exports.RegisterPlainFFLToLMEParser = RegisterPlainFFLToLMEParser;
SolutionFacade.addParser(RegisterPlainFFLToLMEParser.prototype);
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\exchange_modules\\ffl\\RegisterPlainFFLDecorator.js","/lme-core\\exchange_modules\\ffl",undefined)
},{"../../src/SolutionFacade":28,"./FFLFormatter":8,"./Register":10,"./RegisterToLMEParser":13,"_process":38,"buffer":36}],12:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
/**
 * Used in front-end to reassemble the FFL file when needed.
 */
const StringBuffer = require('../../../model-tests/StringUtils').StringBuffer
//extract underlying data-model
//make an register, schema - indexed with array values
//Can expand while adding more properties and keeps its integrity
//schema and nodes
//re-use over implementations

function RegisterToFFL(register) {
    this.schema = register.schema;
    this.constants = register.constants;
    register.createIndex('name')
    //this.nodes = register.getIndex('name');
    this.vars = register.getIndex('name');
    this.child = {}
    this.nameIndex = register.schemaIndexes.name;
    this.descIndex = register.schemaIndexes.desc;
    this.startIndex = register.schemaIndexes.start;
    this.endIndex = register.schemaIndexes.end;
    this.treeIndex = register.schemaIndexes.treeindex;
    this.parentNameIndex = register.schemaIndexes.parentId;
    this.stringIndex = register.schemaIndexes.index;
    this.modifierIndex = register.schemaIndexes.modifier;
    this.referstoIndex = register.schemaIndexes.refersto;
    this.tupleIndex = register.schemaIndexes.tuple;
    this.displaytypeIndex = register.schemaIndexes.displaytype;
    this.visibleIndex = register.schemaIndexes.visible;
    this.decimalsIndex = register.schemaIndexes.fixed_decimals;
    this.datatypeIndex = register.schemaIndexes.datatype;
    this.frequencyIndex = register.schemaIndexes.frequency;
    this.options_titleIndex = register.schemaIndexes.options_title;
    this.formulaindex = register.schemaIndexes.formula;
    this.lockedIndex = register.schemaIndexes.locked;
    this.requiredIndex = register.schemaIndexes.required;
    this.childIndex = register.schemaIndexes.children;
    this.output = "";
    this.delimiter = ';'
    this.line_delimiter = '\n'
    //some properties are generated for the tree structure, and cannot be changes manually
    this.variableProperties = [this.nameIndex, this.modifierIndex, this.referstoIndex, this.tupleIndex]
    this.hiddenProperties = [this.startIndex, this.endIndex, this.treeIndex, this.stringIndex, this.schema.indexOf('version'), this.parentNameIndex, this.childIndex, this.descIndex]
    this.indents = [];
    const depth = 30
    for (var i = 0; i < depth; i++) {
        this.indents[i] = new Array(i).join(" ")
    }
    this.relevant = []
    for (var i = 0; i < this.schema.length; i++) {
        if ((this.hiddenProperties.indexOf(i) == -1) && (this.variableProperties.indexOf(i) == -1)) {
            this.relevant.push(i)
        }
    }
    //creating indents + brackets
    const shiftindent = [];
    for (var i = 0; i < depth; i++) {
        shiftindent[i] = []
        for (var j = 0; j <= i; j++) {
            var item = [];
            for (var k = 0; k <= j; k++) {
                item.push(new Array(i - k).join(" "))
                item.push("}\n")
            }
            shiftindent[i][j] = item.join("")
        }
    }

    this.shiftindent = shiftindent;
    this.formulaIndexes = []
    var formulas = ['valid', 'title', 'hint', 'locked', 'visible', 'required', 'choices']
    for (var i = 0; i < formulas.length; i++) {
        this.formulaIndexes.push(register.schemaIndexes[formulas[i]])
    }
    this.defaultValues = [];
    this.defaultValues[this.visibleIndex] = {
        undefined: true,
        null: true,
        '1.0': true,
        '1': true,
        'true': true,
        'On': true
    }
    this.defaultValues[this.lockedIndex] = {
        undefined: true,
        null: true,
        '0.0': true,
        '0': true,
        'false': true,
        'Off': true,
        'No': true
    }
    this.defaultValues[this.requiredIndex] = this.defaultValues[this.lockedIndex];
}

RegisterToFFL.prototype.toGeneratedCommaSeperated = function(rooNodeName) {
    const delimiter = this.delimiter;
    const hidden = this.hiddenProperties;
    const lines = []
    const rootNode = this.vars[rooNodeName || 'root']
    this.walk(rootNode, 0, function(variable, depth) {
        lines.push(new StringBuffer().append(" ".repeat(depth)).append(variable.filter(function(value, index) {
            return hidden.indexOf(index) == -1;
        }).join(delimiter)).toString());
    })
    this.output = lines.join(this.line_delimiter);
    return this.output;
}
RegisterToFFL.prototype.walk = function(node, depth, visitor) {
    visitor(node, depth)
    const childs = node[this.childIndex];
    for (var i = 0; i < childs.length; i++) {
        this.walk(childs[i], depth + 1, visitor)
    }
}
RegisterToFFL.prototype.validate = function(line) {
    return (this.schema.length - this.hiddenProperties.length) == ((line.match(/;/g) || []).length + 1)
}

/**
 * TODO: internationalization should happen here, inject constants on placeholders
 */
RegisterToFFL.prototype.toGeneratedFFL = function(rootVariableName, modelName) {
    const constants = this.constants;
    const formattedFFL = []
    const midx = this.modifierIndex;
    const nidx = this.nameIndex;
    const ridx = this.referstoIndex;
    const rname = " refers to "
    const indents = this.indents;
    const tidx = this.tupleIndex;
    const tuple = "tuple "
    const variable = "variable "
    //define shiftindent relevant indexes;
    const schema = this.schema;
    const relevant = this.relevant;
    const shiftindent = this.shiftindent;

    var cdept = 0;
    const rootNode = this.vars[rootVariableName || 'root'];
    this.walk(rootNode, 1, function(node, depth) {
        const items = [];
        if (cdept >= depth) items.push(shiftindent[cdept][(cdept - depth)])
        items.push(indents[depth])
        items.push(node[tidx] ? tuple : variable)
        items.push(node[midx] || "")
        items.push(node[nidx])
        if (ridx != -1 && node[ridx]) {
            items.push(rname);
            items.push(node[ridx])
        }
        items.push("\n")
        items.push(indents[depth])

        const props = []
        for (var i = 0; i < relevant.length; i++) {
            const real = relevant[i]
            if (node[real]) {
                props.push([indents[depth + 1], schema[real], ": ", node[real], ";"].join(""))
            }
        }
        if (props.length > 0) {
            items.push("{\n")
            items.push(props.join("\n"))
        } else {
            items.push("{")
        }
        cdept = depth;
        formattedFFL.push(items.join(""));
    })
    formattedFFL.push(shiftindent[cdept][cdept - 1]);
    if (!rootVariableName) {
        formattedFFL[1] = " root\n {"
        formattedFFL.shift()
    }
    for (var i = 0; i < formattedFFL.length; i++) {
        var obj = formattedFFL[i];
        formattedFFL[i] = obj.replace(/__(\d+)/gm, function($1, $2) {
            return constants[parseInt($1.substring(2))]
        })
    }
    return formattedFFL;
}
exports.RegisterToFFL = RegisterToFFL;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\exchange_modules\\ffl\\RegisterToFFL.js","/lme-core\\exchange_modules\\ffl",undefined)
},{"../../../model-tests/StringUtils":46,"_process":38,"buffer":36}],13:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
const SolutionFacade = require('../../src/SolutionFacade')
const RegisterToFFL = require('./RegisterToFFL').RegisterToFFL
const FinFormula = require('./FinFormula')
const AST = require('../../../ast-node-utils/index').ast
const log = require('log6')
var esprima = require('esprima');

/**
 * ffl parsing, supports refers-to, modifiers. internationalization. v1:{@fflparser.js} field-validations
 * V2
 *  Quicker, cleaner, flexible, less data-loss
 *   1) Indexing makes lookups while processing data more efficient and use less code.
 *   2) Prefer ["a","b"].join('') above "a" + "b" its way quicker.
 *   3) The indexer has removed parsing abnormals with propername " visible" etc.. Makes the code more clean
 *   4) Own char-interpreter was more complex than recursive regex-replace.
 *
 * TODO: load property names in DB which directly correspond, fix defaults while saving.
 * TODO: some exotic choices not work correctly
 */
function RegisterToLMEParser() {
}

RegisterToLMEParser.prototype.name = 'ffl2'
RegisterToLMEParser.prototype.status = 'green';
RegisterToLMEParser.prototype.headername = '.finance ffl';
RegisterToLMEParser.prototype.walk = function(node, depth, visitor) {
    visitor(node, depth)
    const childs = node[this.childIndex];
    for (var i = 0; i < childs.length; i++) {
        this.walk(childs[i], depth + 1, visitor)
    }
}
RegisterToLMEParser.prototype.deParse = function(data, workbook) {
    if (!workbook.indexer) return null;
    return new RegisterToFFL(workbook.indexer).toGeneratedFFL(undefined, workbook.modelName)
}
RegisterToLMEParser.prototype.parseData = function(data, workbook) {
    const indexer = data;
    workbook.indexer = indexer;
    const self = this;
    const fflRegister = new RegisterToFFL(indexer)
    const register = data.getIndex('name');
    const modelName = workbook.modelName || indexer.name;
    const solution = SolutionFacade.createSolution(modelName || "NEW");
    const nameIndex = indexer.schemaIndexes.name;
    const tupleIndex = indexer.schemaIndexes.tuple;
    const validIndex = indexer.schemaIndexes.valid;
    const displayOptionsIndex = indexer.schemaIndexes.display_options;
    const lengthIndex = indexer.schemaIndexes.length;
    const patternIndex = indexer.schemaIndexes.pattern;
    const referstoIndex = indexer.schemaIndexes.refersto;
    const displayTypeIndex = indexer.schemaIndexes.displaytype;
    const frequencyIndex = indexer.schemaIndexes.frequency;
    const dataTypeIndex = indexer.schemaIndexes.datatype;
    const rangeIndex = indexer.schemaIndexes.range;
    const aggregationIndex = indexer.schemaIndexes.aggregation;
    const modifierIndex = indexer.schemaIndexes.modifier;
    const decimalsIndex = indexer.schemaIndexes.fixed_decimals;

    this.childIndex = indexer.schemaIndexes.children;
    const childIndex = this.childIndex;
    const choiceIndex = indexer.schemaIndexes.choices;
    const trend_formulaIndex = indexer.schemaIndexes.formula_trend;
    const notrend_formulaIndex = indexer.schemaIndexes.formula_notrend;
    this.formulaIndexes = []
    const formulaIndexes = this.formulaIndexes
    var formulas = ['valid', 'title', 'hint', 'locked', 'visible', 'required', 'choices']
    for (var i = 0; i < formulas.length; i++) {
        //test if the formula is in the model at all
        if (data.schemaIndexes[formulas[i]] != null) this.formulaIndexes.push(data.schemaIndexes[formulas[i]])
    }
    //only inherit properties once.
    const inherited = {}

    //INFO: inheritance could also be possible via database
    function inheritProperties(node) {
        if (!inherited[node[nameIndex]] && node[referstoIndex]) {
            inherited[node[nameIndex]] = true
            const supertype = register[node[referstoIndex]]
            if (log.DEBUG && supertype == null) log.debug('RefersTo: [' + node[referstoIndex] + '] is declared in the model but does not exsists');
            //first inherit from parents of parents.
            if (supertype[fflRegister.referstoIndex]) inheritProperties(supertype)

            for (var i = 0; i < supertype.length; i++) {
                if (node[i] == null) node[i] = supertype[i];
            }
        }
    }

    var nestedTupleDepth = 0
    const tuples = []
    const rootNode = register['root']
    this.walk(rootNode, 3, function(node, depth) {
        if (depth < tuples.length) {
            tuples.length = depth;
            while (tuples.length > 0 && !tuples[depth - 1]) tuples.length--
        }
        const nodeName = node[nameIndex];
        inheritProperties(node)

        var displaytype = node[displayTypeIndex] || 'number'
        var datatype = node[dataTypeIndex] || 'number'
        var frequency = node[frequencyIndex] || 'column'
        //TODO: paragraph when no children.
        //TODO: else column frequency..
        /*
         * Don't forget reference variables
         * Don't forget num(1,2) datatype parsing. (fixed_decimals)
         * Don't forget unscalable number
         * Choice -> " and " <- fix
         * merge display options and displaytype.
         */
        if (node[tupleIndex]) {
            displaytype = 'paragraph'
        }
        if (displaytype == 'paragraph') {
            datatype = 'string'
            frequency = 'none'
        }
        // expecting an parentName..
        var parentId = node[fflRegister.parentNameIndex] ? indexer.i[node[fflRegister.parentNameIndex]][fflRegister.nameIndex] : null;
        if (parentId == 'root') {
            parentId = undefined;
        }
        /**
         * number:2 means: number with 2 fixed decimals
         */
        var fixed_decimals = node[decimalsIndex];
        if (datatype.indexOf('(') > -1) {
            console.info('WORK')
        }
        /**
         * This is where formula-sets are combined.
         * if the node has and trend and notrend formula, the target formula will be x.trend ? node.formula_trend : valueFormula
         * Ofcourse this will be for every formulaset that exists in the node
         * Document formulaset is notrend, formula = notrend
         * This way it would also be possible to have and formulaset 'orange', 'document' and trend formulasets
         */
        var valueFormula;
        /**
         * Copy - variable
         */
        if (node[referstoIndex]) {
            valueFormula = node[referstoIndex]
        } else {
            var trendformula = node[trend_formulaIndex];
            valueFormula = node[notrend_formulaIndex] || node[fflRegister.formulaindex];//notrend is more specific than formula
            if (trendformula !== undefined && valueFormula !== trendformula) {//first of all, if both formula's are identical. We can skip the exercise
                valueFormula = 'If(IsTrend,' + trendformula + ',' + (valueFormula ? valueFormula : 'NA') + ')';
            }
            if (frequency == 'column' && datatype == 'number' && node[aggregationIndex] == 'flow') {
                valueFormula = 'If(TimeAggregated,Aggregate(Self,x),' + valueFormula + ')'
            }

            if (node[modifierIndex] == '=') {
                const siblings = indexer.i[node[fflRegister.parentNameIndex]][childIndex]
                var formula = '0';
                for (var i = 0; i < siblings.length; i++) {
                    if (siblings[i][modifierIndex] && siblings[i][modifierIndex] != '=') {
                        formula += siblings[i][modifierIndex] + siblings[i][nameIndex];
                    }
                }
                valueFormula = formula;
            }
        }
        //if column && number.. (aggregate)
        /**
         * optional displaytype =select.
         * Having the choice member is enough
         */
        if (node[choiceIndex] || displaytype == 'select') {
            if (displaytype == 'date') {
                //NO-OP (for now..., the choices are used to format the date-picker.
            }
            else if (!node[choiceIndex]) {
                if (log.debug) log.debug('Row [' + nodeName + '] is displaytype [select], but does not have choices')
            } else if (node[choiceIndex].split('|').length == 2) {
                displaytype = 'radio'
            } else {
                displaytype = 'select'
                if (log.TRACE) log.trace('[' + nodeName + '] ' + node.choices)
            }
        }

        //TODO: quick-fix move into IDE ScorecardTool-addon
        if (nodeName.match(/MAP[0-9,A-z]+_(VALIDATION|INFO|HINT|WARNING)$/i)) {
            if (fflRegister.defaultValues[fflRegister.visibleIndex][node[fflRegister.visibleIndex]]) {
                node[fflRegister.visibleIndex] = 'Length(' + nodeName + ')'
                frequency = 'none'
                node[frequencyIndex] = 'none'
            }
            displaytype = 'string';
            node[displayOptionsIndex] = nodeName.split("_").pop().toLowerCase();
        } else if (nodeName.match(/MAP[0-9,A-z]+_PARAGRAAF[0-9]+$/i)) {
            node[frequencyIndex] = 'none'
            frequency = 'none'
            displaytype = 'paragraph'
        }


        if (!node[validIndex]) {
            //valid formula's (this will become more complex soon valid(list<predicate,message>) now predicate,message
            //info: patternIndex is language-specific (f.e. email- regular expression)
            const validFormulas = []
            //if (node[validIndex]) validFormulas.push(node[validIndex])
            if (node[patternIndex]) validFormulas.push("REGEXPMATCH(" + node[patternIndex] + ',' + node[nameIndex] + ')');
            if (node[lengthIndex]) validFormulas.push('Length(' + node[nameIndex] + ') ' + node[lengthIndex]);
            if (node[rangeIndex]) validFormulas.push('(' + node[rangeIndex].replace(/(>|>=|<|<=)/gi, node[nameIndex] + ' $1') + ')');
            if (datatype == 'number') validFormulas.push('not isNaN(OnNA(' + node[nameIndex] + ',null))');
            //its also only interesting when its a required field and entered
            // or when its entered and required
            //' + node[nameIndex] + '.required &&
            //valid formulas are only interesting when entered OR required
            if (validFormulas.length > 0) node[validIndex] = 'If(' + validFormulas.join(' And ') + ',"","Enter valid input.")'
            //if (validFormulas.length > 0) console.info(node[nameIndex] + ':' + node[validIndex])
        }
        var uiNode = SolutionFacade.createUIFormulaLink(solution, nodeName, 'value', self.parseFFLFormula(indexer, valueFormula, nodeName, 'value', datatype), displaytype, frequency);
        //hierarchical visibility
        const visibleFormula = node[fflRegister.visibleIndex];
        if (visibleFormula && parentId) node[fflRegister.visibleIndex] = fflRegister.defaultValues[visibleFormula] ? parentId + '.visible' : parentId + '.visible and ' + visibleFormula

        if (fixed_decimals) uiNode.decimals = parseInt(fixed_decimals);
        if (node[displayOptionsIndex]) uiNode.display_options = node[displayOptionsIndex]

        uiNode.frequency = frequency;

        /**
         * Tuple properties
         */
        if (node[tupleIndex] || tuples.length > 0) {
            uiNode.tuple = true;
            uiNode.nestedTupleDepth = 0
            for (var i = 0; i < tuples.length; i++)
                if (tuples[i]) uiNode.nestedTupleDepth++
            if (node[tupleIndex]) {
                uiNode.tupleDefinition = true;
                uiNode.datatype = 'string' //Will story string-based values (Jan,Piet,123Jaar,Etc..)
                if (tuples.length > 0) {
                    uiNode.tupleDefinitionName = tuples[tuples.length - 1].rowId;
                    uiNode.tupleProperty = true
                }
                tuples[depth] = uiNode
            } else {
                uiNode.tupleDefinitionName = tuples[tuples.length - 1].rowId;
                uiNode.tupleProperty = true
            }
        }

        if (node[fflRegister.options_titleIndex] == 'locked') uiNode.title_locked = true

        uiNode.datatype = datatype;

        if (nodeName !== 'root') solution.setParentName(uiNode, parentId);

        for (var i = 0; i < formulaIndexes.length; i++) {
            const index = formulaIndexes[i];
            if (node[index]) {
                if (!fflRegister.defaultValues[index] || !fflRegister.defaultValues[index][node[index]]) {
                    SolutionFacade.createUIFormulaLink(solution, nodeName, indexer.schema[index], self.parseFFLFormula(indexer, node[index], nodeName, indexer.schema[index], null), undefined, frequency);
                }
            }
        }
    });
    //think about formula-sets, same ritual as trend + notrend formulasets
    return solution;
}

/**
 * @param {optional} modelName
 */
RegisterToLMEParser.prototype.parseFFLFormula = function(indexer, formula, nodeName, col, type) {
    if (!formula) return type == 'string' ? AST.STRING("") : type == 'number' ? {
        "type": "Identifier",
        "name": 'NA'
    } : {
        "type": "Identifier",
        "name": 'null'
    }
    var finparse = col == 'choices' ? FinFormula.finChoice(formula) : FinFormula.parseFormula(formula)
    //allow multi-language here
    finparse = finparse.replace(/__(\d+)/gm, function($1, $2) {
        return indexer.constants[parseInt($2)]
    })
    var formulaReturn = 'undefined';
    try {
        formulaReturn = esprima.parse(finparse).body[0].expression
    }
    catch (e) {
        if (log.DEBUG) log.debug('unable to parse [' + finparse + '] returning it as String value [' + nodeName + "] : " + col, e);
        formulaReturn = AST.STRING(finparse);
    }
    return formulaReturn;
}

exports.RegisterToLMEParser = RegisterToLMEParser;
SolutionFacade.addParser(RegisterToLMEParser.prototype);
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\exchange_modules\\ffl\\RegisterToLMEParser.js","/lme-core\\exchange_modules\\ffl",undefined)
},{"../../../ast-node-utils/index":2,"../../src/SolutionFacade":28,"./FinFormula":9,"./RegisterToFFL":12,"_process":38,"buffer":36,"esprima":35,"log6":35}],14:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
/*
 First, most basic export of values
 Just calling getAllValues() internally to export
 */
var SolutionFacade = require('../../src/SolutionFacade');
var PropertiesAssembler = require('../../src/PropertiesAssembler');
var jsonValues = {
    name: 'jsonvalues',
    extension: 'json',
    headername: 'JSON Values',
    parseData: function(data, workbook) {
        updateValues(data, workbook.context.values);
        return SolutionFacade.createSolution(workbook.getSolutionName());
    },
    deParse: function(rowId, workbook) {
        const allValues = workbook.getAllChangedValues();
        //clean up the audit while deparsing.
        allValues.forEach(function(el) {
            if (el.varName.endsWith('_title')) {
                el.varName = correctPropertyName(el.varName)
            } else {
                el.varName = correctFileName(el.varName)
            }
        })
        return allValues;
    }
};

function correctPropertyName(name) {
    return name.replace(/^([^_]+_[\w]*_\w+)$/gmi, '$1');
}

function correctFileName(name) {
    return name.replace(/^([^_]+_[\w]*)_\w+$/gmi, '$1');
}

/**
 * values are directly injected into the context, not through the API
 * They will not be saved in the audit.
 */
function updateValues(data, docValues) {
    for (var key in docValues) {
        docValues[key] = {};
    }
    for (var key in data.values) {
        const value = data.values[key];
        var nodeId = key.split('#')[0]
        const nodeColId = key.split('#')[1]
        if (!nodeId.endsWith('_value')) {
            nodeId = nodeId + '_value'
        }
        const fetch = PropertiesAssembler.fetch(nodeId);
        //we don't have to import values for variables we don't use.
        if (fetch) {
            var enteredValue = value.value;
            if (fetch.datatype == 'number') {
                enteredValue = enteredValue == null ? null : Number(enteredValue)
            }
            docValues[fetch.ref][parseInt(nodeColId)] = enteredValue;
        }
    }
}

SolutionFacade.addParser(jsonValues)
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\exchange_modules\\jsonvalues\\jsonvalues.js","/lme-core\\exchange_modules\\jsonvalues",undefined)
},{"../../src/PropertiesAssembler":26,"../../src/SolutionFacade":28,"_process":38,"buffer":36}],15:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
const SolutionFacade = require('../../src/SolutionFacade')
const FormulaService = require('../../src/FormulaService')
const PropertiesAssembler = require('../../src/PropertiesAssembler')
const FunctionMap = require('../../src/FunctionMap')
const log = require('log6');

function FormulaInfo(dataArg, schema, modelName) {
    this.formulas = [];
    this.variables = []
    const self = this;
    this.data = dataArg;
    const data = [];
    this.nodes = [];
    const forms = {};
    FormulaService.visitFormulas(function(formula) {
        formula.id = formula.id || formula.index;
        forms[formula.name] = formula;
        self.addFormula(formula)
    });
    const names = {};

    const modelNamePrefix = modelName + '_';
    for (var i = 0; i < this.formulas.length; i++) {
        var formula = this.formulas[i];
        const name = correctFileName(formula.name);
        if (names[name] === undefined) {
            names[name] = true;
            const title = forms[modelNamePrefix + name + '_title'] || {original: null};
            const hint = forms[modelNamePrefix + name + '_hint'] || {original: ''};
            const visible = forms[modelNamePrefix + name + '_visible'] || {original: false};
            const valid = forms[modelNamePrefix + name + '_valid'] || {original: false};
            const value = forms[modelNamePrefix + name + '_value'] || {original: ''};
            const formula_trend = forms[modelNamePrefix + name + '_trend'] || {original: ''};
            const formula_notrend = forms[modelNamePrefix + name + '_notrend'] || {original: ''};
            const locked = forms[modelNamePrefix + name + '_locked'] || {original: false};
            const choices = forms[modelNamePrefix + name + '_choices'] || {original: null};
            data.push([name, title.original, value.original, formula_trend.original, formula_notrend.original, visible.original, locked.original, choices.original, hint.original, valid.original])
        }
    }
    const types = ['name', 'title', 'value', 'notrend', 'trend', 'visible', 'locked', 'choices', 'hint', 'valid'];
    //this.formulas = undefined;
    this.meta = {
        view: {
            columns: []
        }
    }
    var counter = 0;
    for (var i = 0; i < types.length; i++) {
        var type = types[i];
        self.meta.view.columns.push({
            "width": ['locked', 'visible', 'entered'].indexOf(type) == -1 ? 50 : undefined,
            "name": type,
            "dataTypeName": "text",
            "fieldName": type,
            "position": counter++,
            "renderTypeName": "text",
        })
    }
}

FormulaInfo.prototype.setSchema = function(schema) {
    this.schema = schema;
}
FormulaInfo.prototype.addFormula = function(formula) {
    formula.fflname = variableName(formula.name)
    this.formulas.push(formula);
}

function correctFileName(name) {
    return name.replace(/^[^_]+_([\w]*)_\w+$/gmi, '$1');
}

function variableName(name) {
    return name.replace(/^[^_]+_([\w]*_\w+)$/gmi, '$1');
}

function LMEParser() {
}

LMEParser.prototype.name = 'lme'
LMEParser.prototype.status = 'green';
LMEParser.prototype.headername = '.finance lme';
LMEParser.prototype.parseData = function(data, workbook) {
    const solution = SolutionFacade.createSolution(data.name);
    solution.nodes = data.nodes;
    if (data.variables) FormulaService.initVariables(data.variables)
    PropertiesAssembler.bulkInsert(solution);
    FormulaService.bulkInsertFormula(data.formulas)
    for (var i = 0; i < data.formulas.length; i++) FunctionMap.initializeFormula(data.formulas[i]);
    if (log.DEBUG) log.info('Done import ' + data.name)
    return solution;
}
const unwantedKeys = {
    delegate: true,
    ast: true,
    body: true
}
LMEParser.prototype.deParse = function(rowId, workbook) {
    const modelName = workbook.getSolutionName();
    const formulaInfo = {};
    const info = new FormulaInfo(formulaInfo, {}, modelName);
    info.name = modelName;
    PropertiesAssembler.findAllInSolution(modelName, function(property) {
        info.nodes.push(property)
    })
    FormulaService.getVariables(function(variable) {
        info.variables.push(variable)
    });
    return JSON.stringify(info, function(key, value) {
        return unwantedKeys[key] ? undefined : value;
    }, 0);
}
SolutionFacade.addParser(LMEParser.prototype);
exports.LMEParser = LMEParser.prototype
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\exchange_modules\\lme\\lmeparser.js","/lme-core\\exchange_modules\\lme",undefined)
},{"../../src/FormulaService":22,"../../src/FunctionMap":23,"../../src/PropertiesAssembler":26,"../../src/SolutionFacade":28,"_process":38,"buffer":36,"log6":35}],16:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
/**
 * Gives a Object-oriented view over a part of the model
 * Objectify the entire model is simply too expensive to do. 128(t3)*128(t2)*128(t1)*128(t0)*500(cols)*5000(vars)...
 * So we focus on the parts that are created, active and interesting to see/modify
 *
 * The LMETree has .sort() to sort the entire rows array naturally
 *  Ordering the Nodes requires a somewhat complex sort-function.
 *  ((VariableID|TupleDefinitionID),tIndex(tDepth)){maxTupleDepth}
 *  e.g: 0005,001,0006,000,0006,000 = 0006(John)
 *  e.g: 0005,001,0006,000,0008,001 = 0008(John,CarPayment)
 *
 *  Where id's are translated into Unique names per tIndex
 *  So 0005,001 is always the First (John) in this example
 *  So 0005,001,0006,000 is always the First (John,CarPayment) in this example
 *  0008 can be any child-variable in 0005.0006.* Example John.CarPayment.Status
 *
 * (!)       TODO:                                                      Another option should be
 * (?) be aware null-tuple is post-fixed with ,0,0 : t(2)    => 2,0,0 | 2,2,2
 * (?) be aware first-tuple is post-fixed with ,0  : t(4,1)  => 4,1,0 | 4,1,1
 *
 *  So will mean that:
 *  a(0)       = a0a0a0
 *   b(0,0)    = a0b0b0
 *    d(0,0,0) = a0b0d0
 *   b(0,1)    = a0b1b0 (!) what to do with the last index? re-use the one before or not?
 *    d(0,1,1) = a0b1d1
 *   b(0,tMax) = a0b9b0
 *  a(1)       = a1a0a0 (!) what to do with the last index? re-use the one before or not?
 *   b(1,tMax) = a1b9b0
 *  e(0)       = e0e0e0
 *
 * The LMETree.nodes has a blueprint from the entire model. (without tuple-instances, and not hiding the Tuple Definition)
 * The LMETree.no has all created nodes in a map, to speed up lookups.
 * The LMETree.rows is the Array, used for manipulation/view
 */
const SolutionFacade = require('../../src/SolutionFacade');
const PropertiesAssembler = require('../../src/PropertiesAssembler');

/**
 * Parser object
 */
function WebExportParser() {
    this.exportAsObject = true;
    this.hide = true;
    this.name = 'webexport';
    this.headername = 'Native Object Web Presentation';
}

/**
 * LMETree is a array-based representation of the internal data-structure
 * Easy to manipulate with Tuples,
 *  - First-level caching. (SetValue will increment all getters to just retrieve the values once)
 *  - Basic NULL and Empty string to NA converter
 * Every object in the members, no|nodes and rows have the DOCUMENT properties
 * the cols member in the rows is a list of repeated elements in time
 *
 *  - a Document frequency variable contains [title,document_value]
 *  - a None frequency variable contains [document_value]
 *  - a Column frequency variable contains [title,{column_value*,}+]
 */
function LMETree(name, workbook) {
    this.name = name;
    this.workbook = workbook;
    this.nodes = {};
    this.names = {};
    this.rows = []
    this.no = {}
    this.repeats = {
        undefined: [workbook.context.columnSize, 1],
        none: [1, 1],
        column: [workbook.context.columnSize, 1],
        document: [1, workbook.context.columnSize],
        timeline: [1, workbook.context.columnSize]
    }
    this.columns = workbook.context.columns;
    const rowColumns = workbook.context.columns.slice();
    if (this.columns.indexOf('choices') == -1) rowColumns.push('choices')
    this.propertyNames = rowColumns
    this.tuplecounter = 0;
}

/**
 * Sort created rows output for UI
 */
LMETree.prototype.sort = function() {
    this.rows.sort((a, b) => {
        if (a.order_id == b.order_id) throw Error('Duplicate variable names in financial model are not supported. Choose an unique name for every variable. [' + a.id + '] in \'' + b.path + '\' and in \'' + a.path + '\'')
        return a.order_id == b.order_id ? 0 : a.order_id < b.order_id ? -1 : 1
    })
}
LMETree.prototype.findScorecardTypes = function() {
    const scorecards = []
    for (var name in this.no) {
        const row_element = this.no[name];
        if (row_element.type == 'scorecard' || row_element.display_options == 'scorecard') scorecards.push(row_element)
    }
    return scorecards;
}

function noChange(workbook, rowId, col, index, type, yas) {
    var r;//return value
    var c = -1;//calculation counter
    return {
        get: function() {
            if (workbook.context.calc_count !== c && c < 0) {
                c = workbook.context.calc_count;
                r = workbook.get(rowId, col, index, yas);
            }
            return r;
        }
    }
}

function changeAble(workbook, rowId, col, index, type, yas) {
    var r;//return value
    var c = -1;//calculation counter
    return {
        get: function() {
            if (workbook.context.calc_count !== c) {
                c = workbook.context.calc_count;
                r = workbook.get(rowId, col, index, yas);
            }
            return r;
        }
    }
}

function changeAndCache(workbook, rowId, col, index, type, yas) {
    var r;//return value
    var c = -1;//calculation counter
    return {
        get: function() {
            if (workbook.context.calc_count !== c) {
                c = workbook.context.calc_count;
                r = workbook.get(rowId, col, index, yas);
            }
            return r;
        },
        set: function(v) {
            workbook.set(rowId, (v == null || v == '') ? null : v, col, index, yas);
        }
    }
}

/**
 * Cache means only resolve once
 * Change means user can modify the value
 */
var properties = {
    title: {change: true, prox: changeAndCache},
    original: {change: true, prox: noChange},
    value: {change: true, prox: changeAndCache},
    visible: {prox: changeAble},
    entered: {prox: changeAble},
    valid: {prox: changeAble},
    locked: {prox: changeAble},
    required: {prox: changeAble},
    hint: {cache: true, prox: noChange},
    choices: {cache: true, prox: noChange}
}

LMETree.prototype.addTupleNode = function(node, treePath, index, yas, treeDepth) {
    const tree = this;
    const unique = yas.display + '__' + node.rowId
    const workbook = this.workbook;
    const rowId = node.rowId;
    const amount = this.repeats.document[0]
    const colspan = this.repeats.document[1];
    const parent = this.nodes[yas.display + '_' + treePath[treePath.length - 1]];
    const path = treePath.join('.');
    const has = node.hash.slice();
    if (yas.depth == 0) {
        has[1] = '999'
    } else if (yas.depth == 1) {
        has[1] = yas.uihash
        has[3] = '999'
    } else if (yas.depth == 2) {
        has[1] = yas.parent.uihash
        has[3] = yas.uihash
        has[5] = '999'
    } else if (yas.depth == 3) {
        //throw Error('Something wrong here..')
        has[1] = yas.parent.uihash
        has[3] = yas.uihash
        has[5] = '999'
    }
    const rv = {
        id: rowId,
        order_id: has.join('.'),
        treeDepth: treeDepth,
        add: function() {
            const inneryas = workbook.addTuple(node.rowId, ++tree.tuplecounter + '_' + yas.display + '_' + node.rowId, yas)
            workbook.set(node.rowId, inneryas.display + ":" + node.rowId, 'value', undefined, inneryas)
            workbook.walkProperties(node, function(child, yasi, cTreeDepth, yi) {
                if (yasi == 'new') {
                    tree.addTupleNode(child, path.split('.'), index, yi, cTreeDepth)
                }
                else {
                    tree.addWebNode(child, path.split('.'), index, yi, cTreeDepth)
                }
            }, inneryas, node.rowId, treePath.length)
            return inneryas;
        },
        //index is deprecated. Lookup the next sibling when needed. Could be tuple..
        index: index,
        title_locked: node.title_locked,
        type: 'tuple_add',
        path: path,
        ammount: amount,
        display: yas.display,
        colspan: colspan,
        depth: yas.depth + 1,//This could be a quick-fix to a serious problem.
        cols: [{
            value: unique,
            entered: false,
            type: 'tuple_add',
            locked: true,
            visible: true,
            valid: true
        }],
        children: []
    };
    if (node.display_options) rv.display_options = node.display_options;
    /**
     * Proxy properties to the row object
     */
    for (var columnIndex = 0; columnIndex < this.columns.length; columnIndex++) {
        const col = this.columns[columnIndex];
        rv[col] = null;
        Object.defineProperty(rv, col, properties[col].prox(workbook, rowId, col, 0, undefined, yas));
    }
    if (parent) parent.children.push(rv);
    this.nodes[unique] = rv;
    this.rows.push(rv)
}
LMETree.prototype.addWebNode = function(node, treePath, index, yas, treeDepth) {
    const workbook = this.workbook;
    const rowId = node.rowId;
    const unique = yas.display + "_" + rowId
    const amount = this.repeats[node.frequency][0]
    const colspan = this.repeats[node.frequency][1];
    const type = node.displayAs;
    const displaytype = type;
    const path = treePath.join('.')
    const has = node.hash.slice();
    //alright this is a big step. and seems to work (there is a variable set wrongly.)
    if (yas.depth == 0) {
        has[1] = yas.uihash
    } else if (yas.depth == 1) {
        has[1] = yas.uihash
    } else if (yas.depth == 2) {
        has[3] = yas.uihash
        has[1] = yas.parent.uihash
    } else if (yas.depth == 3) {
        has[5] = yas.uihash
        has[3] = yas.parent.uihash
        has[1] = yas.parent.parent.uihash
    }
    const rv = {
        id: rowId,
        treeDepth: treeDepth,
        depth: yas.depth,
        display_options: node.display_options,
        display: yas.display,
        order_id: has.join('.'),
        index: index,
        title_locked: node.title_locked,
        type: node.displayAs,
        path: path,
        ammount: amount,
        colspan: colspan,
        tupleDefinition: node.tupleDefinition,
        cols: [],
        children: []
    };
    /**
     * Proxy properties to the column objects
     */
    const rt = {}
    Object.defineProperty(rt, 'value', properties.title.prox(workbook, rowId, 'title', 0, undefined, yas));
    if (node.frequency !== 'none') {
        rv.cols.push({
            value: null,
            entered: null,
            type: 'title',
            visible: true,
            locked: null,
            valid: null
        });
    }
    for (var index = 0; index < amount; index++) {
        const r = {
            type: type,
            value: null,
            visible: null,
            entered: null,
            required: null,
            locked: null,
            valid: null
        }
        rv.cols.push(r);
        for (var propertyIndex = 0; propertyIndex < this.propertyNames.length; propertyIndex++) {
            const propertyName = this.propertyNames[propertyIndex];
            Object.defineProperty(r, propertyName, properties[propertyName].prox(workbook, rowId, propertyName, index, displaytype, yas));
        }
    }
    /**
     * Proxy properties to the row object
     */
    for (var columnIndex = 0; columnIndex < this.columns.length; columnIndex++) {
        const col = this.columns[columnIndex];
        rv[col] = null;
        Object.defineProperty(rv, col, properties[col].prox(workbook, rowId, col, 0, displaytype, yas));
    }
    const parent = this.nodes[yas.display + "_" + treePath[treePath.length - 1]];
    if (parent) parent.children.push(rv);
    this.nodes[unique] = rv;
    this.no[rowId] = rv;
    this.rows.push(rv)
}
WebExportParser.prototype.parseData = function(webExport, workbook) {
    return SolutionFacade.createSolution(workbook.modelName);
}

WebExportParser.prototype.deParse = function(rowId, workbook) {
    const modelName = workbook.getSolutionName();
    const lmeTree = new LMETree(modelName, workbook);
    PropertiesAssembler.findAllInSolution(modelName, function(node) {
        lmeTree.names[node.rowId] = true;
    });
    const treePath = [];
    var currentDepth = 0;
    const indexPath = [];
    //make the walk here,
    const rootNode = workbook.fetchSolutionNode(rowId, 'value') || workbook.getRootSolutionProperty(modelName);
    PropertiesAssembler.indexProperties(modelName)

    workbook.walkProperties(rootNode, function(node, yas, treeDepth, y) {
        if (node && node.rowId !== 'root') {
            if (treeDepth > currentDepth) {
                treePath.push(node.parentrowId)
                indexPath.push(-1)
                currentDepth = treeDepth;
            } else if (treeDepth < currentDepth) {
                treePath.length = treeDepth;
                indexPath.length = treeDepth;
                currentDepth = treeDepth;
            }
            const index = indexPath[indexPath.length - 1] + 1
            indexPath[indexPath.length - 1] = index
            if (yas == 'new') {
                lmeTree.addTupleNode(node, treePath, index, y, treeDepth)
            } else {
                lmeTree.addWebNode(node, treePath, index, y, treeDepth)
            }
        }
    }, workbook.resolveY(0).parent, null, 0)

    return lmeTree;
}
SolutionFacade.addParser(new WebExportParser())
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\exchange_modules\\presentation\\webexport.js","/lme-core\\exchange_modules\\presentation",undefined)
},{"../../src/PropertiesAssembler":26,"../../src/SolutionFacade":28,"_process":38,"buffer":36}],17:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
/**
 * user friendly API
 * TODO: Move tuple related work to FESFacade
 */
require("./exchange_modules/ffl/RegisterPlainFFLDecorator");//just let it inject into the FESFacade
const log = require("log6");
const WorkBook = require("./src/JSWorkBook");
const Context = require("./src/Context");

function LMEService() {
}

LMEService.prototype.initializeFFlModelData = function(data, path) {
    var JSWorkBook;
    if (path.indexOf('KSP') > -1) {//KSP is only model with the 18year TimeModel, need 1 more example to generalize.
        JSWorkBook = new WorkBook(new Context());
    } else {
        const TimeAxis = require('./src/TimeAxis');
        const timeAxis = new TimeAxis(require('./resources/CustomImport'));
        JSWorkBook = new WorkBook(new Context(), timeAxis, 'detl');
    }
    JSWorkBook.importSolution(data, "ffl");
    var validate = JSWorkBook.validateImportedSolution();
    JSWorkBook.fixProblemsInImportedSolution();
    var validateFeedback = JSWorkBook.validateImportedSolution();
    if (validateFeedback.valid) {
        //valid
        if (log.DEBUG) log.debug("Initialized model [" + JSWorkBook.getSolutionName() + "]");
    } else {
        if (log.DEBUG) log.error(validateFeedback);
        throw Error("unable to initialize");
    }
    return JSWorkBook;
};
LMEService.prototype.addFunctions = function(plugin) {
    var functions = [];
    for (var functionName in plugin.entries) {
        functions.push(functionName);
        global[functionName] = plugin.entries[functionName];
    }
    if (log.TRACE) log.trace('Added fes-plugin [%s] functions [%s]', plugin.name, functions);
};
/**
 * rowId - VariableName
 * @Optional value - new value
 * TODO: move to tupleDefinition to support multiple tuple definition/tuple in tuple
 */
// Convert tuple index to tuple number

LMEService.prototype.getValue = function(context, rowId, columncontext, value, tupleindex) {
    columncontext = columncontext || 0;
    const fesContext = new Context();
    fesContext.values = context.values;
    const JSWorkBook = new WorkBook(fesContext);
    JSWorkBook.columns = context.columns || 2;
    JSWorkBook.properties = context.properties || JSWorkBook.properties;
    //prepare the workbook and context to match current appscope
    if (!context.isset) {
        JSWorkBook.updateValues();
        context.isset = true;
    }
    if (tupleindex != null) {
        tupleindex = JSWorkBook.tupleIndexForName(rowId, tupleindex);
        if (tupleindex == -1) tupleindex = JSWorkBook.insertTuple(rowId, tupleindex);
    }
    //setvalue
    if (value !== undefined) {
        //choice(select) requests
        JSWorkBook.setSolutionPropertyValue(rowId, value, 'value', columncontext, tupleindex);
        return [];
    } else {
        //getValue
        var values = [];
        var rootNode = JSWorkBook.getSolutionNode(rowId);
        if (rootNode) {
            JSWorkBook.walkProperties(rootNode, function(node, type, depth, yax) {
                values.push(getEntry(JSWorkBook, node.solutionName + '_' + node.rowId, columncontext, yax));
            }, JSWorkBook.resolveY(tupleindex), null, 0);
        } else {
            values.push({
                variable: rowId
            });
        }
        return values;
    }
};

LMEService.prototype.getObjectValues = function(context, rowId, tupleindex) {

    var fesContext = new Context();
    fesContext.values = context.values;
    var JSWorkBook = new WorkBook(fesContext);
    JSWorkBook.columns = context.columns || 2;
    JSWorkBook.properties = context.properties || JSWorkBook.properties;
    const values = [];
    if (!context.isset) {
        JSWorkBook.updateValues();
        context.isset = true;
    }
    if (tupleindex != null) {
        tupleindex = JSWorkBook.tupleIndexForName(rowId, tupleindex);
        if (tupleindex == -1) tupleindex = JSWorkBook.insertTuple(rowId, tupleindex);
    }
    var rootNode = JSWorkBook.getSolutionNode(rowId);
    const flattenValues = {}
    if (rootNode) {
        JSWorkBook.visitProperties(rootNode, function(node, type, innerTreeDepth, yax) {
            const nodeName = node.rowId;
            const parentName = node.parentName.split("_").slice(0, -1).join("_")
            const columns = node.frequency == 'document' ? 0 : context.columns;
            for (var i = 0; i <= columns; i++) {
                const appendix = columns == 0 ? "" : "$" + i
                flattenValues[node.rowId + appendix] = {
                    parent: parentName + appendix,
                    name: nodeName,
                    value: getValueObject(JSWorkBook, node.solutionName + "_" + node.rowId, i, yax),
                    data: []
                }
            }
        }, JSWorkBook.resolveY(0).parent, null, 0)
        //reassemble results
        for (var key in flattenValues) {
            if (flattenValues[flattenValues[key].parent]) {
                flattenValues[flattenValues[key].parent][flattenValues[key].name] = (flattenValues[key].value)
            } else {
                //array variants
                const parentName = flattenValues[key].parent.split("$")[0];
                if (flattenValues[parentName]) {
                    flattenValues[parentName].data.push(flattenValues[key])
                }
            }
        }
        for (var key in flattenValues) {
            delete flattenValues[key].parent
            delete flattenValues[key].name
            if (flattenValues[key].data.length == 0) delete flattenValues[key].data
        }
    } else {
        values.push({
            variable: rowId
        });
    }
    /**
     * Values are not bound.
     */
    return flattenValues[rowId.split("_").slice(1).join("_")];
}

function getValueObject(workbook, rowId, columncontext, yAxis) {
    const dataEnty = {}
    for (var type in workbook.properties) {
        dataEnty[type] = workbook.getSolutionPropertyValue(rowId, type, columncontext, yAxis);
    }
    return dataEnty;
}

/**
 * Given properties in workbook return all values for given columns
 * @param workbook
 * @param rowId
 * @param columncontext
 * @returns {Array}
 */
function getEntry(workbook, rowId, columncontext, yAxis) {
    var outputData = [];
    var columnStart = columncontext;
    var columnEnd = workbook.columns;
    var variable = workbook.getSolutionNode(rowId, 'value');

    if (variable && variable.frequency === 'document') {
        columnEnd = columnStart;
    }
    var tupleStart = 0;
    var tupleEnd = 0;

    // If frequency = column: return multiple columns
    for (var xAxisCounter = columnStart; xAxisCounter <= columnEnd; xAxisCounter++) {
        var dataEnty = {};
        outputData.push(dataEnty);

        // For properties of the variable
        for (var type in workbook.properties) {
            dataEnty[type] = workbook.getSolutionPropertyValue(rowId, type, xAxisCounter, yAxis);

            if (columnStart !== columnEnd || columnStart > 0) {
                dataEnty.column = xAxisCounter;
            }
            dataEnty.variable = variable.rowId;
            if (variable.tuple) {
                dataEnty.tupleIndex = yAxis.index;
            }
            dataEnty.hash = yAxis.hash + xAxisCounter + 0;
        }
    }
    //if there is only one column, the exported value is not presented to be an array
    if (columnStart == columnEnd) {
        outputData = outputData[0];
    }
    return outputData;
}

exports.JSWorkbook = WorkBook;
exports.LMEContext = WorkBook;
exports.CalculationFacade = LMEService.prototype;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\index.js","/lme-core",undefined)
},{"./exchange_modules/ffl/RegisterPlainFFLDecorator":11,"./resources/CustomImport":18,"./src/Context":20,"./src/JSWorkBook":24,"./src/TimeAxis":29,"_process":38,"buffer":36,"log6":35}],18:[function(require,module,exports){
module.exports={
  "formulasets": [
    {
      "formulasetId": 0,
      "name": "notrend"
    },
    {
      "formulasetId": 1,
      "name": "trend"
    },
    {
      "formulasetId": 2,
      "name": "user"
    },
    {
      "formulasetId": 3,
      "name": "sector"
    },
    {
      "formulasetId": 4,
      "name": "aggregation"
    }
  ],
  "layout": {
    "children": [
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "name": "detl",
                    "size": 1
                  }
                ],
                "name": "qurt",
                "size": 4
              }
            ],
            "name": "half",
            "size": 9
          }
        ],
        "name": "bkyr",
        "size": 19
      }
    ],
    "children13period": [
      {
        "children": [
          {
            "children": [],
            "name": "detl",
            "size": 1
          }
        ],
        "name": "bkyr",
        "size": 13
      }
    ],
    "idx": 400,
    "name": "all",
    "no": 0,
    "period": [
      {
        "formulasetId": 0,
        "hash": 0,
        "idx": 19
      },
      {
        "formulasetId": 1,
        "hash": 1,
        "idx": 400
      }
    ],
    "size": 400
  },
  "navalue": 1e-10,
  "nestedTupleMultiplier": "undefined",
  "time": {
    "columnMultiplier": 1,
    "columnSize": 400,
    "columns": [
      {
        "index": 0,
        "name": "jan/p1"
      },
      {
        "index": 1,
        "name": "fes/p2"
      },
      {
        "index": 2,
        "name": "mar/p3"
      }
    ],
    "periodMultiplier": 1,
    "periodSize": 2,
    "timelineMultiplier": 256,
    "timelineSize": 1,
    "timelines": [
      {
        "index": 0,
        "name": "ExpertOptie-level5"
      }
    ]
  },
  "tupleMultiplier": 32768
}
},{}],19:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
const assert = require("assert")
const log = require('log6')
const AST = require('../../ast-node-utils').ast;
const escodegen = require('escodegen');

// some variables we shall use..
//we want to modify its default behavior
//Before entering a Function..
var caseCount = 0;
var simplified = {
    //gets Sels for the value also
    ExpandLevel: function(formulaInfo, node) {
        node.arguments = [{
            "type": "Identifier",
            "name": "1.1",
            "raw": "1.1"
        }];
    },
    IRR: function(formulaInfo, node) {
        node.arguments[0].name = "[1,2]";
    },
    Min: function(formulaInfo, node) {
        node.callee.name = 'Math.min'
    },
    //we will need this one later to determine + or &&
    EvaluateAsString: function(formulaInfo, node) {
        node.callee.name = 'String'
    },
    Max: function(formulaInfo, node) {
        node.callee.name = 'Math.max'
    },
    Abs: function(formulaInfo, node) {
        node.callee.name = 'Math.abs'
    },
    InvNormal: function(formulaInfo, node) {
        node.callee.name = 'NORMSINV'
    },
    //the format is strange, hard to get a better format in the fin->json parser.
    //Expected format: Case(X_MAP01_Verplicht,[0,0||1,10||2,20||11,30||12,120||13,130])
    Case: function(formulaInfo, node) {
        assert.ok(node.arguments.length === 2, "Only expecting 2 arguments for now");
        var statements = node.arguments[1];
        assert.ok(statements.type === 'ArrayExpression', "Second argument has to be ArrayExpression for now");

        var cs = '__c0s' + caseCount++;
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
        if (log.TRACE) log.trace('[%s] CASE parsed into: [%s]', formulaInfo.name, escodegen.generate(node));
    },
    //convert traditional If(q,a,b) into q?a:b, skip the entire Callee
    If: function(formulaInfo, node) {
        //could be replaced with the default property value..
        if (node.arguments.length === 2) {
            if (log.TRACE) log.trace('Strange formuala setup IF(q,a,b) without b) Using NA as b. [' + formulaInfo.original + ']')
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
    OnER: function(formulaInfo, node) {
        assert.equal(node.arguments.length, 2, formulaInfo.original);
        //TODO: for now we fix in math. but its better to compile this in the JS code
    },
    //wants horizontale aggregation from values in between two given columns
    HSUM: function(formulaInfo, node) {
        node.callee.name = "HSUM";
        if (node.arguments[0].type == 'Identifier') {
            node.arguments[0] = {
                "type": "MemberExpression",
                "computed": true,
                "object": {
                    "type": "Identifier",
                    "name": node.arguments[0].name
                },
                "property": {
                    "type": "Identifier",
                    "name": "all"
                }
            }
        }

        /*  console.info('test')*/
        /* node.arguments = [{
         "type": "Identifier",
         "name": "1"
         }];*/
    },
    HVALUES: function(formulaInfo, node) {
        node.callee.name = "HVALUES";
        if (node.arguments[0].type == 'Identifier') {
            node.arguments[0] = {
                "type": "MemberExpression",
                "computed": true,
                "object": {
                    "type": "Identifier",
                    "name": node.arguments[0].name
                },
                "property": {
                    "type": "Identifier",
                    "name": "all"
                }
            }
        }

        /*  console.info('test')*/
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
    //returns max value in between two given columns. entered/non-entered
    MaxValueT: function(formulaInfo, node) {
        node.arguments = [{
            "type": "Identifier",
            "name": "1",
            "raw": "1"
        }];
    },
    //ExpandFraction ExpandFraction(VariableCosts,Sales)
    //http://wiki.findesk.com/index.php/ExpandFraction_(numeric_function)
    ExpandFraction: function(formulaInfo, node) {
        node.arguments = [{
            "type": "Identifier",
            "name": "1",
            "raw": "1"
        }, {
            "type": "Identifier",
            "name": "2"
        }];
    },
    ExpandOriginalValue: function(formulaInfo, node) {
        node.arguments = [{
            "type": "Identifier",
            "name": "1"
        }];
    },
    /**
     * Inject the x parameter into the call
     */
    FirstValueT: function(formulaInfo, node) {
        node.arguments.unshift({
            "type": "Identifier",
            "name": "x"
        });
    },
    DateToT: function(formulaInfo, node) {
        node.arguments.unshift({
            "type": "Identifier",
            "name": "x"
        });
    },
    Visible: function(formulaInfo, node) {
        node.type = "MemberExpression";
        node.computed = false;
        node.object = AST.IDENTIFIER(node.arguments[0].name);
        node.property = AST.IDENTIFIER('visible');
        delete node.arguments;
        delete node.callee;
    },
    HINT: function(formulaInfo, node) {
        node.type = "MemberExpression";
        node.computed = false;
        node.object = AST.IDENTIFIER(node.arguments[0].name);
        node.property = AST.IDENTIFIER('hint');
        delete node.arguments;
        delete node.callee;
    },
    //now its provided with (x,SelectDecendents/Array,LambaExpression)
    //we gonna narrow it down until further use of the 'X'. so ForAll(array,property[])
    //now ForAllFunction has no use anymore
    Count: function(formulaInfo, node) {
        //ok remove first argument X
        node.arguments.splice(0, 1);
        //give the lambda expression to the SelectDecendants function
        node.arguments[0].arguments.push(node.arguments[1])
        //remove the lambda expression
        node.arguments.splice(1, 1);
    },
    Self: function(formulaInfo, node) {
        node.arguments = [{
            "type": "Identifier",
            "name": "1"
        }];
    },
    Mut: function(formulaInfo, node) {
        node.arguments = [{
            "type": "Identifier",
            "name": "1"
        }];
    },
    NPV2: function(formulaInfo, node) {
        node.callee.name = 'NPV';
    }
}
simplified.ForAll = simplified.Count
simplified.Exists = simplified.ForAll;
simplified.IF = simplified.If;
simplified.Hsum = simplified.HSUM;
simplified.HSum = simplified.HSUM;
simplified.if = simplified.If;
simplified.MAX = simplified.Max;

simplified.MIN = simplified.Min;
simplified.min = simplified.Min;
simplified.max = simplified.Max;
simplified.ABS = simplified.Abs;
module.exports = simplified;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\src\\ASTPreparser.js","/lme-core\\src",undefined)
},{"../../ast-node-utils":2,"_process":38,"assert":33,"buffer":36,"escodegen":35,"log6":35}],20:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
//app scope context
var ApplicationContext = {
    parsers: []
}
var propertyDefaults = {
    'visible': true,
    'value': 1e-10,
    'required': false,
    'locked': false,
    'choices': undefined,
    'valid': true,
    'validation': false
}

//request scope context
function Context(opts) {
    //reference to the ApplicationContext context
    this.applicationContext = ApplicationContext;
    this.values = {};
    this.audit = [];
    this.calc_count = 0;
    this.columnSize = 6;
    this.columns = ['title', 'value', 'visible', 'entered', 'locked', 'required', 'hint', 'choices', 'original', 'valid'];
    this.saveToken = undefined;//commit hash
    if (opts) for (var key in opts) this[key] = opts[key]
}

Context.prototype.propertyDefaults = propertyDefaults;
Context.prototype.getValues = function() {
    return this.values;
}
Context.prototype.clear = function() {
    for (var key in this.values) {
        this.values[key] = {}
    }
    this.audit.length = 0;
}
Context.prototype.hasChanges = function() {
    return this.audit.length > 0;
}
module.exports = Context

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\src\\Context.js","/lme-core\\src",undefined)
},{"_process":38,"buffer":36}],21:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
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

const log = require('log6');
const assert = require('assert');
const AST = require('../../ast-node-utils').ast;
const esprima = require('esprima')
const escodegen = require('escodegen')
const simplified = require('./ASTPreparser')
var variables;
var functions;
var getOrCreateProperty;
var addFormulaDependency;
var properties;
const propertiesArr = [
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
    'hint'
]
const IDENTIFIER = 'Identifier';
const ARRAYEXPRESSION = 'ArrayExpression'
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

simplified.AnyDataAvailable = function(formulaInfo, node) {
    var refFormula = addFormulaDependency(formulaInfo, node.arguments[0].name, 'value')
    if (refFormula.ref === undefined) return log.warn("Can't find a variableReference for " + regenerate(node)) + " " + formulaInfo.name + ":" + formulaInfo.original;

    node.type = 'Identifier';
    node.name = 'Object.keys(v[' + refFormula.ref + ']).length>0';
    delete node.refn;
    delete node.arguments;
    delete node.callee;
}
simplified.TitleEntered = function(formulaInfo, node) {
    var refFormula = addFormulaDependency(formulaInfo, node.arguments[0].name, 'title')
    if (refFormula.ref === undefined) return log.warn("Can't find a variableReference for " + regenerate(node)) + " " + formulaInfo.name + ":" + formulaInfo.original;
    node.type = 'Identifier';
    node.name = 'Object.keys(v[' + refFormula.ref + ']).length>0';
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
    //extract lambda
    //this can also be the propertyType is variableType empty
    var foundEndUiModel;
    if (lambda === undefined) {
        lambda = AST.IDENTIFIER('X')
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
    for (var i = 0; i < nodes.length; i++) {
        if (foundEndUiModel && foundEndUiModel.rowId === nodes[i].rowId) {
            break;
        }
        walkRecursive(nodes[i], groupName, propertiesArr[0], function(child) {
            node.elements.push(AST.cloneAST(lambda, 'X', child.rowId));
        })
    }
    delete node.arguments;
    delete node.callee;
}

function walkRecursive(node, groupName, col, callback) {
    callback(node)
    const n = getOrCreateProperty(groupName, node.rowId, col)
    if (n.nodes.length) {
        for (var i = 0; i < n.nodes.length; i++) {
            walkRecursive(n.nodes[i], groupName, col, callback);
        }
    }
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
simplified.TupleSum = simplified.TSUM
simplified.TMIN = function(formulaInfo, node) {
    node.callee.name = 'MIN'
    buildFunc(formulaInfo, node.arguments[0], 0, node.arguments[0], node.property ? '.' + node.property.name : '', 'TVALUES');
}
simplified.TupleMin = simplified.TMIN
simplified.TMAX = function(formulaInfo, node) {
    node.callee.name = 'MAX'
    buildFunc(formulaInfo, node.arguments[0], 0, node.arguments[0], node.property ? '.' + node.property.name : '', 'TVALUES');
}
simplified.TupleMax = simplified.TMAX
simplified.TCOUNT = function(formulaInfo, node) {
    node.callee.name = 'PROXY'
    buildFunc(formulaInfo, node.arguments[0], 0, node.arguments[0], node.property ? '.' + node.property.name : '', 'TCOUNT');
}
simplified.TupleCount = simplified.TCOUNT
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
 * This method is becoming so complex, its fixing a lot of things :)
 */
function buildFunc(formulaInfo, node, property, referenceProperty, xapendix, tupleType) {
    xapendix = xapendix || '';
    var referenceProperty = addFormulaDependency(formulaInfo, referenceProperty.name, propertiesArr[property == 4 ? 0 : property]);
    var yAppendix = 'y';
    if (xapendix == '' && referenceProperty.frequency == 'document') xapendix = '.doc'
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
            node.name = tupleType + '(' + test + ',m[' + referenceFormulaId + "],'" + referenceFormulaId + "',x" + xapendix + "," + yAppendix + ",z,v,m)"
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
                    node.name = "VALUES(m[" + referenceFormulaId + "],'" + referenceFormulaId + "',x" + xapendix + "," + yAppendix + ",z,v,m)"
                } else {
                    node.name = 'm[' + referenceFormulaId + "]('" + referenceFormulaId + "',x" + xapendix + "," + yAppendix + ",z,v,m)";
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
                    log.info('found self reference [%s]', node.object.name)
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
//return  var (_cz199 = (call)) >  0?_cz199: zeroNumber
global.Onzero = function() {
    return 0;
}
global.Hm = function() {
    return 0
}
//So firstValueT means:  (FirstValueT(Self,1,MaxT)>0) Give me the First Column Index where the value is not NA
//So the question here is has[variable]AnyValue in time?
//recursive walk the formula ast
const identifier_replace = {
    TSY: 'x.tsy',
    T: 'x',
    MainPeriod: 'z', //zAxis Reference, base period, z.base
    MaxT: 'x.last',
    TupleInstanceIndex: 'y.index',
    TupleIndex: 'y.index',
    TupleLocation: 'y.display',
    Trend: 'x',//x.trend
    IsTrend: 'x.istrend',
    LastTinYear: 'x.lastinbkyear',
    Bookyear: 'x.bkyear',
    Now: 'NOW()',
    TimeAggregated: 'x.aggregated'

}

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
        if (log.TRACE) log.trace('Use function [' + node.callee.name + "]")
        if (simplified[node.callee.name]) {
            simplified[node.callee.name](formulaInfo, node);
        } else {
            //be aware since Simplified modifies the Max into Math.max this will be seen as the function Math.max etc..
            const globalFunction = node.callee.name.split('.')[0];
            if (global[globalFunction] == undefined) {
                var groupName = formulaInfo.name.split('_')[0];
                var referenceProperty = getOrCreateProperty(groupName, globalFunction, 'function');
                if (referenceProperty.ref !== undefined) {
                    node.callee.name = 'm[' + referenceProperty.ref + ']'
                    throw Error('??')
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
        if (identifier_replace[node.name]) {
            node.name = identifier_replace[node.name];
        }
        //xAsReference x.notrend
        else if (node.name === 'NoTrend') {
            node.name = 'x';
        }
        //x.trend.lastbkyr
        else if (node.name === 'LastHistYear') {
            node.name = 'x.notrend.first';
        }
        else if (node.name === 'LastTinPeriod') {
            node.name = 'x.lastinperiod';
        }
        //x.trend.lastbkyr
        else if (node.name === 'LastHistYear') {
            node.name = 'x';
        }
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
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\src\\FormulaBootstrap.js","/lme-core\\src",undefined)
},{"../../ast-node-utils":2,"./ASTPreparser":19,"_process":38,"assert":33,"buffer":36,"escodegen":35,"esprima":35,"log6":35}],22:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
const log = require('log6');
const AST = require('../../ast-node-utils').ast;
const assert = require('assert')
const escodegen = require('escodegen')
/**
 * * FormulaId '0' is not a valid ID!
 */
const variables = []
//the array index is used to be next formulaId
const formulas = [];
//make 100.000 entries, we start counting here for temporally formula's
formulas[1000] = null;
/**
 * Todo: add formula.frequency into the cache key?
 * the cache is a String based to Formula object cache,
 * One a formula is created, its stored in cache.
 * When another formula with the same modelFormula String is presented its checked with cache
 */
const cache = {};

function FormulaService() {
}

FormulaService.prototype.visitFormulas = function(visitFunctionArg) {
    for (var i = 0; i < formulas.length; i++) {
        var formula = formulas[i];
        if (formula !== null && formula !== undefined) {
            visitFunctionArg(formula);

        }
        else if (i > 1000) {
            visitFunctionArg(formula);
        }
    }
}
FormulaService.prototype.addFormulaDependency = function(formulaInfo, referenceFormulaIndex, referenceName) {
    //we want do know if we can all the value straight away or we have to invoke a function for it
    //in future we want to check here if its a dynamic formula, or plain value.
    //also inherited functions are nice to play around with.
    //if type is not static, we add it as dependency
    var referenceFormulaInfo = formulas[referenceFormulaIndex];
    //ok so we going to allow default values, this could because this formula was the default.
    //there was once an idea to create static formula types
    //we could now reference to the index instead...
    var refName = referenceName;
    var refId;
    if (referenceFormulaInfo === undefined) {
        if (log.TRACE) log.trace('failed to lookup:[' + referenceName + '] but it was in the model, could be in another model. OR it just have default value formula')
        if (log.TRACE) log.trace(formulaInfo.original);
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

function addAssociation(index, property, associationType) {
    var formula = formulas[index];
    var otherFormula = formulas[property.ref];
    if (otherFormula.name !== formula.name && formula.refs[otherFormula.name] === undefined) {
        formula.formulaDependencys.push({
            name: otherFormula.name,
            association: associationType
        });
    }
    formula[associationType][property.name] = true;
}

/**
 * TODO: every formula created requires a UNIQUE id, but can re-use a formula.
 * TODO: Now it will reuse the ID when formulastring is found
 * called to parse modelString formula and add to current state
 * if formulaString already parsed, its returned from cache
 */
FormulaService.prototype.addModelFormula = function(property, groupName, row, col, locked, body, frequency) {
    assert(frequency, 'A formula must have a frequency')
    assert(body !== undefined, 'refactored, this function return undefined when body is undefined');
    var formula;
    var key = escodegen.generate(AST.EXPRESSION(body));
    //if not locked and the formula isn't already cached, we can reuse it
    //if not locked, its not possible to re-use since the user to override the value of the formula
    //when running in DEBUG-MODUS, we cannot re-use Formula's since they will result in incorrect method calls
    if (locked && cache[frequency + "_" + key] !== undefined) {
        formula = cache[frequency + "_" + key];
    }
    else {
        //else we have to create a new formula
        formula = newFormula(locked, AST.EXPRESSION(body), formulas.length, property.name);
        cache[key] = formula;
    }
    property.ref = formula.index;
    property.formulaName = formula.name;

    //add the formula Association, so formula 1 knows C12_value uses it.
    addAssociation(formula.index, property, 'refs');
    return formula.id || formula.index;
}
/*
 Class Formula
 {
 ast: String, AST AsString
 body: Object, AST
 deps: Object, containing dependend elements
 formulaDependencys: [],
 index: Number, Temporally ID
 name: String, name of the function
 original: String, User entered String value of given formula
 parsed: String, String body of the function
 refs: Object, revered Dependencies of the Formula. These are used to reset caches from the dependent formulas when this value changes
 type: String, Formula decorator type. e.x. If formula can be user entered, it will wrap lookup in the docValues around it
 }
 */
//create a new Formula
//initiate a new Object, add it to the Array
function newFormula(locked, body, index, propertyName) {
    const original = AST.PROGRAM(body);
    const formula = {
        type: locked ? 'noCacheLocked' : 'noCacheUnlocked',//there are some types, for nor only locked and unlocked are interesting
        refs: {},//map of references
        formulaDependencys: [],//array of associations (deps and refs)
        deps: {},//map of dependencies
        body: original,//AST
        original: original,
        index: index,//index used in formula array
        name: propertyName//default formula name.
    };
    formulas.push(formula);
    return formula;
}

FormulaService.prototype.findFormulaByIndex = function(index) {
    return formulas[index];
}
/**
 * used with javascript models, they are pre-parsed
 */
FormulaService.prototype.bulkInsertFormula = function(formulasArg) {
    for (var i = 0; i < formulasArg.length; i++) {
        var formula = formulasArg[i];
        formulas[formula.id] = formula;
    }
};
FormulaService.prototype.moveFormula = function(old, newFormula) {
    if (old.index !== newFormula.id) {
        formulas[newFormula.id] = formulas[old.index];
        formulas[newFormula.id].id = newFormula.id;
        delete formulas[newFormula.id].index;
        //we can make the ID final.
        delete formulas[old.index];
    }
}
FormulaService.prototype.addVariables = function(variablesArg) {
    for (var i = 0; i < variablesArg.length; i++) {
        var variable = variablesArg[i];
        if (variables[variable.name] !== undefined) {
            throw Error('already declared variable [' + variable.name + ']')
        }
        variables.push({
            name: variable.name,
            expression: variable.expression
        })
    }
}
FormulaService.prototype.getVariables = function(visit) {
    for (var i = 0; i < variables.length; i++) {
        visit(variables[i]);
    }
}
FormulaService.prototype.initVariables = function(variables) {
    for (var i = 0; i < variables.length; i++) {
        const variable = variables[i];
        global[variable.name] = variable.expression;
    }
}
module.exports = FormulaService.prototype;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\src\\FormulaService.js","/lme-core\\src",undefined)
},{"../../ast-node-utils":2,"_process":38,"assert":33,"buffer":36,"escodegen":35,"log6":35}],23:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
const log = require('log6')

/**
 * The map that contains parsed model-functions
 * * FormulaId '0' is not a valid ID!
 *
 * x = time object
 * y = tuple object
 * z = timeline object
 * value = new value
 * v = entered values
 * m = model
 */
function fm() {
}

const m = []
//don't directly use this method, use JSWorkBook instead.
fm.prototype.apiGet = function(formula, x, y, z, v) {
    //temp fix fallback for ID, index is the Virtual ID, not persisted in the database
    //should be checked outside this function call
    var id = formula.id || formula.index;
    return m[id](id, x, y, z, v, m);
}
fm.prototype.apiSet = function(formula, x, y, z, value, v) {
    var id = formula.id || formula.index;
    if (v[id] !== undefined) {
        var hash = x.hash + y.hash + z;
        var newValue = value;
        v[id][hash] = newValue;
    }
    else if (log.DEBUG) log.debug('[%s] does not exist', id);
}
if (!global.DEBUGMODUS) {
    global.DEBUGMODUS = false
}
fm.prototype.initializeFormula = function(newFormula) {
    const id = newFormula.id || newFormula.index;
    //"debug('" + newFormula.name + "');
    if (log.TRACE) log.trace("Added function %s\n\t\t\t\t\t\t\t\t\t  [%s] %s : %s : [%s]", +id, newFormula.original, newFormula.name, newFormula.type, newFormula.parsed)
    var stringFunction;

    if (global.DEBUGMODUS) stringFunction = "const debugv =  (" + newFormula.parsed + ") ;console.info(' variable[%s] value[%s] tuple:[%s] column[%s]','" + newFormula.name + "',debugv,y.display,x.hash);return debugv;/*  \n" + newFormula.name + ":" + newFormula.original + "  */ ";// : "return " + newFormula.parsed
    else stringFunction = "return " + newFormula.parsed + " /*  \n" + newFormula.name + ":" + newFormula.original + "  */ ";// : "return " + newFormula.parsed

    const modelFunction = Function(newFormula.params || 'f, x, y, z, v, m', stringFunction).bind(global);
    m[id] = formulaDecorators[newFormula.type](modelFunction, id, newFormula.name);
};
//we do need this functions to be here, so the FormulaBootstrap can directly call the function on its map instead of
//for now we just use static functions and user enterable function that will not cache.
// the ApiGet. we don't need the CacheLocked and the NoCacheUnlocked they are just for further optimalizations.
var formulaDecorators = {
    //nothing to to, just return the inner function
    noCacheLocked: function(innerFunction, formulaName) {
        return innerFunction;
    },
    //Unlocked formula's can be user entered.
    //Encapsulates that part.
    noCacheUnlocked: function(innerFunction, formulaName, varName) {
        //add a user value cache
        //f = formulaId
        //y,x,z dimensions Tuple,Column,Layer
        //v = enteredValues
        return function(f, x, y, z, v, m) {
            if (x.dummy) return NA;
            var hash = x.hash + y.hash + z;
            //check if user entered a value
            if (v[f][hash] == null) {
                return innerFunction(f, x, y, z, v, m);
            }
            return v[f][hash]; //return entered value
        };
    }
}
module.exports = fm.prototype;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\src\\FunctionMap.js","/lme-core\\src",undefined)
},{"_process":38,"buffer":36,"log6":35}],24:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
/*
 This class should have less business logic,
 Its the state wrapper around the stateless ValueFacade
 Remove All dependencies besides ValueFacade,log6. Even XAxis should be inside the Context Object
 */

const SolutionFacade = require('./SolutionFacade');
const PropertiesAssembler = require('./PropertiesAssembler');
const ValueFacade = require('./ValueFacade');
const AST = require('../../ast-node-utils').ast;
const log = require('log6')
const YAxis = require('./YAxis')

//user friendly stable API
//importSolution(data,'type') : Solution          ; See Solution class for definiton
//export('type')        : Object            ; raw type undefined output. When calling this read the header of the parser to get more information
//set(rowId,value <,property> <,context>)   ; value can be anything see "get" function
// --optional property (default='value')
// --optional context  Time/FormulaSet -Matrix (default=0)

//get(rowId <,property> <,context>) : Object; has the range from a char or PDF base64String till any possible Object with functions
// --optional property (default='value')
// --optional context Time/FormulaSet -Matrix (default=0)

function JSWorkBook(context, XAxis, interval, opts) {
    this.indexer = null;//preserved to store the indexer
    this.context = context;
    this.offset = 0;
    //default modelname
    this.modelName = 'NEW';
    //tuple axis
    this.yaxis = YAxis;
    this.y = YAxis[0].parent
    //time axis, we looking at bookyears at the moment
    this.xaxis = (XAxis || require('./XAxis'))[interval || 'bkyr'].columns[0]
    if (opts) for (var key in opts) this[key] = opts[key]
}

JSWorkBook.prototype.setColumnOffset = function(delta) {
    var newOffset = this.offset
    if (delta == 'next') newOffset++
    else if (delta == 'previous') newOffset--
    newOffset = Math.min(this.xaxis.length - 6, Math.max(0, newOffset))
    if (newOffset != this.offset) {
        this.offset = newOffset
        this.context.calc_count++;
    }
}
JSWorkBook.prototype.getTimeViews = function() {
    return this.xaxis;
}
/**
 * workbook modelName leads to data modelName
 */
JSWorkBook.prototype.importFFL = function(data) {
    this.importSolution(data, 'ffl')
}
JSWorkBook.prototype.importSolution = function(data, parserType) {
    var solution = SolutionFacade.importSolutionData(data, parserType, this);
    this.solution = solution;
    this.modelName = solution.getName();
    this.updateValues();
}
JSWorkBook.prototype.getSolutionName = function() {
    return this.modelName;
}

/**
 * Try to do: Monte-Carlos simulation
 * https://nl.wikipedia.org/wiki/Monte-Carlosimulatie
 * if it is possible to fix missing functions
 * TRY fix infinite loops in the solution, breaking down chains.
 */
function fixAll() {
    var attempt = 0;
    var workbook = this;
    var feedback = workbook.validateImportedSolution();
    while (!feedback.valid && attempt < 20) {
        feedback.error.forEach(function(item) {
            if (item.canFix) {
                item.fix();
            }
        });
        feedback = workbook.validateImportedSolution();
        attempt++;
    }
    return feedback;
};

/**
 * validateImportedSolution current solution
 * validation is done once they are imported
 * Generic problems can be resolved in the same manner
 * returns a FeedBack object
 * TODO: extract validator.
 */
var mostcommon = {}

function logErrorWithVariableName(variableName, workbook, formulaInfo, e) {
    return function() {
        try {
            log.debug(variableName + " : " + 'Fix for [' + variableName + '] in solution: ' + workbook.getSolutionName() + " : " + formulaInfo.original + ' message:[' + e + ']')
            workbook.createFormula(1, variableName);
        } catch (err) {
            log.error('Fatal error in variable [' + variableName + ']', err);
        }
    }
}

/**
 * TODO: this function only, is enough to extract into Validation.js
 * Try to do: Monte-Carlos simulation
 *  - TODO: add trend-notrend x-input values.
 *
 * https://nl.wikipedia.org/wiki/Monte-Carlosimulatie
 * if it is possible to fix missing functions
 * TRY fix infinite loops in the solution, breaking down chains.
 *  -- When ReferenceError: Create new VARIABLE matching, remove original formula
 *  -- When RangeError:
 *  --- lookup most significant part in loop, disable formula, transform into String formula. try again
 */
function validateImportedSolution() {
    var validateResponse = {
        succes: [],
        error: []
    };
    var context = this.context;
    var workbook = this;

    function formulaFixer(elemId) {
        const formulaInfo = SolutionFacade.fetchFormulaByIndex(elemId)
        try {
            //iterate all formula-sets to test 100%
            ValueFacade.apiGetValue(formulaInfo, workbook.resolveX(0), resolveY(workbook, 0), 0, context.getValues());
            validateResponse.succes.push(formulaInfo.name);
        }
        catch (e) {
            var fix;
            if (e.name === 'ReferenceError') {
                var variableName = e.message.split(' ')[0];
                //it could occur same problem is found multiple times. Strip those errors
                if (!validateResponse.error.lookup('variableName', variableName)) {
                    fix = {
                        canFix: true,
                        variableName: variableName,
                        fixMessage: 'Add',
                        fix: logErrorWithVariableName(variableName, workbook, formulaInfo, e)
                    };
                }
                else {
                    fix = {
                        hide: true
                    }
                }
            }
            else if (e.name === 'RangeError') {
                //we should Isolate the most offending formula here instead of all
                //make a graph of the loops, resolve the deepest one, only add this one.
                fix = {
                    canFix: true,
                    fixMessage: 'Remove formula',
                    fix: function() {
                        var deps = Object.keys(formulaInfo.deps);
                        var refs = Object.keys(formulaInfo.refs);

                        formulaInfo.formulaDependencys.forEach(function(dependency) {
                            const dependencyInfo = SolutionFacade.fetchFormulaByIndex(dependency.refId);
                            try {
                                ValueFacade.apiGetValue(dependencyInfo, workbook.resolveX(0), resolveY(workbook, 0), 0, context.getValues());
                            } catch (e) {
                                // log.error(e)
                                //NOOP
                                mostcommon[formulaInfo.name] = isNaN(mostcommon[formulaInfo.name]) ? 1 : mostcommon[formulaInfo.name] + 1
                            }
                        })
                        if (log.DEBUG) log.debug('Loop detected for [' + formulaInfo.name + '], Making string formula ' + formulaInfo.original + "\n"
                            + "DEPS[" + deps.length + "][" + deps + "]\nREFS[" + refs.length + "]:[" + refs + "]"
                        )
                        formulaInfo.parsed = undefined;
                        formulaInfo.body = AST.STRING(formulaInfo.original);
                        //YES we have to do this two times, known BUG, we have to call rebuild, updateValueMap, rebuild
                        SolutionFacade.initFormulaBootstrap([elemId], false);
                        workbook.updateValues();
                    }
                };
            }
            else {
                //try underlying formulas
                formulaInfo.formulaDependencys.forEach(function(dependency) {
                    if (dependency.association === 'deps') {
                        const dependencyInfo = SolutionFacade.fetchFormulaByIndex(dependency.refId);
                        try {
                            ValueFacade.apiGetValue(dependencyInfo, workbook.resolveX(0), resolveY(workbook, 0), 0, context.getValues());
                        } catch (e) {
                            log.error(e)
                            //NOOP
                        }
                    }
                })
                log.error(e)
                log.warn('unable to fix problem in ' + formulaInfo.original + ' fail:' + e)
                log.warn(formulaInfo);
                fix = {
                    canFix: false
                }
            }
            //filter Exceptions not worth viewing e.g. Duplicates
            if (!fix.hide) {
                fix.formulaName = formulaInfo.name;
                fix.reason = e.message;
                validateResponse.error.push(fix);
            }
        }
    };
    this.visitSolutionFormulas(formulaFixer);
    validateResponse.valid = validateResponse.error.length === 0;
    validateResponse.fixProblemsInImportedSolution = fixAll;
    validateResponse.more = mostcommon;
    return validateResponse;
};
/**
 * Visit imported Formula's
 */
JSWorkBook.prototype.visitSolutionFormulas = function(visitor) {
    return this.solution.formulas.forEach(visitor);
}
JSWorkBook.prototype.exportWebModel = function(rowId) {
    return this.export('webexport', rowId)
}
JSWorkBook.prototype.export = function(parserType, rowId) {
    return SolutionFacade.exportSolution(parserType, rowId, this);
}
JSWorkBook.prototype.getNode = function(name) {
    return this.getSolutionNode(this.getSolutionName() + "_" + name);
}
JSWorkBook.prototype.getSolutionNode = function(name) {
    return ValueFacade.fetchSolutionNode(name, 'value')
};
JSWorkBook.prototype.findNode = function(name) {
    return ValueFacade.fetchSolutionNode(this.modelName + "_" + name, 'value')
};
JSWorkBook.prototype.fetchSolutionNode = ValueFacade.fetchSolutionNode

JSWorkBook.prototype.resolveX = function(x) {
    return x ? this.xaxis[x + this.offset] : this.xaxis[this.offset];
}
JSWorkBook.prototype.resolveY = function(idx) {
    if (idx == null) return this.y
    return resolveY(this, idx)
}
/**
 * Gets/Creates a named tuple list.
 * Ok so now we have to do this for nested tuples too.
 * Lets make sure the NestedTuple exist with corresponding tupleIndexNames
 */
JSWorkBook.prototype.resolveYas = function(variableName, note) {
    var yas = this.resolveY(undefined);
    if (note) {
        const indexes = note.slice(1, -1).split(',')
        for (var i = 0; i < indexes.length; i++) {
            const tempIndex = this.tupleIndexForName(this.modelName + '_' + variableName, indexes[i], yas, indexes.length - i)
            if (tempIndex == -1) yas = this.addTuple(variableName, indexes[i], yas)
            else yas = yas.deeper[tempIndex]
        }
    }
    return yas;
}

function resolveY(wb, y) {
    var yAxis = y || 0;
    return isNaN(yAxis) ? yAxis : wb.yaxis[yAxis];
}

JSWorkBook.prototype.get = function(row, col, x, y) {
    return this.getSolutionPropertyValue(this.modelName + '_' + row, col, x, y);
};
JSWorkBook.prototype.getSolutionPropertyValue = function(row, col, x, y) {
    var xas = this.resolveX(x);
    var yas = this.resolveY(y)
    return ValueFacade.fetchSolutionPropertyValue(this.context, row, col, xas, yas)
};

JSWorkBook.prototype.set = function(row, value, col, x, y) {
    return this.setSolutionPropertyValue(this.modelName + '_' + row, value, col, x, y);
}
JSWorkBook.prototype.setSolutionPropertyValue = function(row, value, col, x, y) {
    const xas = this.resolveX(x);
    const yas = this.resolveY(y);
    return ValueFacade.putSolutionPropertyValue(this.context, row, value, col, xas, yas);
}
JSWorkBook.prototype.updateValues = function() {
    ValueFacade.updateValueMap(this.context.values);
};
JSWorkBook.prototype.fixProblemsInImportedSolution = fixAll
//should return the solution instead. So its deprecated
JSWorkBook.prototype.getRootSolutionProperty = function() {
    return ValueFacade.fetchRootSolutionProperty(this.getSolutionName());
};
/**
 * Does not fix invalid request doing a 2-tuple node-lookup with a 3/1-tuple yas.
 */
JSWorkBook.prototype.maxTupleCountForRow = function(node, yas) {
    if (!node.tuple) return -1;
    yas = this.resolveY(yas)
    var tupleDefinition = node.tupleDefinition ? node : this.getSolutionNode(node.solutionName + '_' + node.tupleDefinitionName)
    var allrefIdes = [];
    PropertiesAssembler.visitProperty(tupleDefinition, function(child, depth) {
        if (child.ref) allrefIdes.push(String(child.ref))
    }, 0)
    return TINSTANCECOUNT(allrefIdes, this.context.values, yas);
}
/**
 * TODO: enforce unique name per nodeName/yas.
 */
JSWorkBook.prototype.insertTuple = function(nodeName, name, yas) {
    const node = ValueFacade.fetchSolutionNode(nodeName, 'value')
    const tupleDefinition = node.tuple ? node.tupleDefinition ? node : this.getSolutionNode(node.solutionName + '_' + node.tupleDefinitionName) : node
    //THIS IS quick-fix, it should never call insertTuple on a non-tuple
    //if (!tupleDefinition) throw Error('Cannot add tuple of non-existing tuple' + nodeName)
    yas = this.resolveY(yas)//this makes it complex, since parent is used for the 0-tuple.
    const tupleCount = this.maxTupleCountForRow(tupleDefinition, yas)
    const deeperYaxis = yas.deeper[tupleCount + 1];
    this.set(tupleDefinition.rowId, name || ('value' + tupleCount), 'value', undefined, deeperYaxis)
    return deeperYaxis;
}
JSWorkBook.prototype.addTuple = function(nodeName, name, yas) {
    return this.insertTuple(this.modelName + '_' + nodeName, name, yas)
}
/**
 * Creating a tuple-instance is done by placing a name in the TupleDefinition
 * These can be found with this method later on
 * (i) there is no support by duplicate names per Tuple
 */
JSWorkBook.prototype.tupleIndexForName = function(nodeName, name, yas, delta) {
    const node = ValueFacade.fetchSolutionNode(nodeName, 'value')
    if (!node.tuple) return -1;
    yas = this.resolveY(yas)
    var tupleDefinition = node.tupleDefinition ? node : this.getSolutionNode(node.solutionName + '_' + node.tupleDefinitionName)
    if (delta >= 2) tupleDefinition = tupleDefinition.tupleDefinitionName ? this.getSolutionNode(tupleDefinition.solutionName + '_' + tupleDefinition.tupleDefinitionName) : tupleDefinition
    if (delta >= 3) tupleDefinition = tupleDefinition.tupleDefinitionName ? this.getSolutionNode(tupleDefinition.solutionName + '_' + tupleDefinition.tupleDefinitionName) : tupleDefinition
    const values = this.context.values[String(tupleDefinition.ref)];
    for (var key in values) {
        if (name == values[key]) {
            if (log.DEBUG) log.debug('Found ' + key + '' + values[key])
            return REVERSEYAXIS(parseInt(key), yas);
        }
    }
    return -1;
}
/**
 * Copy-paste from walkproperties. (Without [+]tupleD)
 */
JSWorkBook.prototype.visitProperties = function(node, visitor, y, type, treeDepth) {
    const wb = this;
    const itarfunction = function(treeNode, innerTreeDepth) {
        //instance is only for the first call
        //we must be recursive since Tuple in tuple
        if (treeNode.tupleDefinition) {
            if (type !== treeNode.rowId) {
                const maxTupleCountForTupleDefenition = wb.maxTupleCountForRow(treeNode, y);
                for (var t = 0; t <= maxTupleCountForTupleDefenition; t++) {
                    wb.visitProperties(treeNode, visitor, y.deeper[t], treeNode.rowId, innerTreeDepth)
                }
                itarfunction.stop = true;
            } else {
                visitor(treeNode, 'instance', innerTreeDepth, y)
            }
        } else {
            //because of this check, the nested tuple-property will not be displayed.
            visitor(treeNode, 'instance_no_td', innerTreeDepth, y)
        }
    };
    ValueFacade.visit(node, itarfunction, treeDepth);
}
/*
* TupleDefinition[2]
*  TupleProperty_A/TupleDefinition[2]
*   TupleProperty_B
*  =>
*  0_0_TD
*  0_0_TP_A
*  0_0_TP_B
*  0_1_TP_A
*  0_1_TP_B
*  1_0_TD
*  1_0_TP_A
*  1_0_TP_B
*  1_1_TP_A
*  1_1_TP_B
*
*  Because this method is called in relative situations, within treedepths and tuple nesting, these two arguments are required
*
 */
JSWorkBook.prototype.walkProperties = function(node, visitor, y, type, treeDepth) {
    const wb = this;
    const itarfunction = function(treeNode, innerTreeDepth) {
        //instance is only for the first call
        //we must be recursive since Tuple in tuple
        if (treeNode.tupleDefinition) {
            if (type !== treeNode.rowId) {
                const maxTupleCountForTupleDefenition = wb.maxTupleCountForRow(treeNode, y);
                for (var t = 0; t <= maxTupleCountForTupleDefenition; t++) {
                    wb.walkProperties(treeNode, visitor, y.deeper[t], treeNode.rowId, innerTreeDepth)
                }
                visitor(treeNode, 'new', innerTreeDepth, y)    //tuple_add call
                itarfunction.stop = true;
            } else {
                visitor(treeNode, 'instance', innerTreeDepth, y)
            }
        } else {
            //because of this check, the nested tuple-property will not be displayed.
            visitor(treeNode, 'instance_no_td', innerTreeDepth, y)
        }
    };
    ValueFacade.visit(node, itarfunction, treeDepth);
}
JSWorkBook.prototype.validateImportedSolution = validateImportedSolution;
JSWorkBook.prototype.createFormula = function(formulaAsString, rowId, colId, tuple, frequency, displaytype) {
    SolutionFacade.createFormulaAndStructure(this.getSolutionName(), formulaAsString, rowId, colId || 'value', displaytype, frequency || 'none');
    const node = SolutionFacade.getOrCreateProperty(this.getSolutionName(), rowId, colId || 'value');
    if (tuple) {
        node.tuple = tuple;
        node.tupleDefinition = true;
        node.nestedTupleDepth = 0;
        node.tupleDefinitionName = rowId;
    }
    node.frequency = frequency;
    this.updateValues();
}
JSWorkBook.prototype.clearValues = function() {
    this.context.clear()
}
JSWorkBook.prototype.properties = SolutionFacade.properties;
JSWorkBook.prototype.getAllChangedValues = function() {
    const formulaIds = [];
    const formulaIdMap = {}
    for (var i = 0; i < this.context.audit.length; i++) {
        const audit = this.context.audit[i];
        if (audit.saveToken == this.context.saveToken && !formulaIdMap[audit.formulaId]) {
            formulaIdMap[audit.formulaId] = true;
            formulaIds.push(audit.formulaId)
        }
    }
    return ValueFacade.getValuesFromFormulaIds(formulaIds, this.context.values);
}
JSWorkBook.prototype.getAllValues = function() {
    return ValueFacade.getAllValues(this.context.values);
};
module.exports = JSWorkBook;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\src\\JSWorkBook.js","/lme-core\\src",undefined)
},{"../../ast-node-utils":2,"./PropertiesAssembler":26,"./SolutionFacade":28,"./ValueFacade":30,"./XAxis":31,"./YAxis":32,"_process":38,"buffer":36,"log6":35}],25:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
/*
 register/resolve echange modules e.g. ffl,screendefinition,presentation
 TODO: rename into exchangeModulesSerivce
 */
var parsers = {};
function ParserService() {
}
ParserService.prototype.addParser = function (parser) {
    parsers[parser.name] = parser;
}
/*Class Parser
 {
 name: String,
 headerName: String,
 parse: Function(Context) : Solution
 deParse: Function() : Export
 }
 */
ParserService.prototype.visitParsers = function (visitFunction) {
    for (var key in parsers) {
        visitFunction(parsers[key]);
    }
}
ParserService.prototype.findParser = function (parserName) {
    return parsers[parserName];
}
module.exports = ParserService.prototype;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\src\\ParserService.js","/lme-core\\src",undefined)
},{"_process":38,"buffer":36}],26:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function PropertiesAssembler() {
}

var PropertiesModel = {
    NEW_root_value: {
        rowId: 'root',
        solutionName: 'NEW'
    }
};
/**
 * Model root nodes
 */
var rootNodes = {
    NEW: PropertiesModel.NEW_root_value
};
var rows = new Set();

PropertiesAssembler.prototype.contains = function(name) {
    return rows.has(name);
};
//Don't call this method directly, business logic is within the Solution and JSWorkBook object
//NULL is not valid, nor empty string
function createRootnode(modelName) {
    //when calling with undefined just return a Solution with current modelName
    var newModelName = modelName.toUpperCase();
    //create a root node if not exists
    //Better to keep a list of existing Solution instead of writing over them
    var newRootNodeName = newModelName + '_root_value';
    if (!rootNodes[newModelName]) {
        PropertiesModel[newRootNodeName] = {
            name: newRootNodeName,
            rowId: 'root',
            colId: 'value',
            solutionName: newModelName,
            frequency: 'document',
            displayAs: 'SectionAnswerType',
            nodes: []
        };
        rootNodes[newModelName] = PropertiesModel[newRootNodeName]
    }
    return rootNodes[newModelName];
};
PropertiesAssembler.prototype.createRootNode = createRootnode

function getOrCreateProperty(groupName, row, col) {
    var rowId = groupName + '_' + row;
    var name = rowId + "_" + col;
    var node = PropertiesModel[name];
    if (node == undefined) {
        node = {
            rowId: row,
            solutionName: groupName,
            colId: col,
            name: name,
            nodes: []
        }
        PropertiesModel[name] = node;
        rows.add(row);
    }
    return node;
}

function hasChild(children, name) {
    for (var i = 0; i < children.nodes.length; i++) {
        if (children.nodes[i].name === name) {
            return true;
        }
    }
    return false;
}

//add element to Solution
function addProperty(groupName, row, col, item, parentId) {
    //add to map if it not exists, else re-use the entry
    var property = getOrCreateProperty(groupName, row, col);

    //inherit all properties But new allow extended Objects.
    //Only copy primitive members, and the delegate Object.
    for (key in item) {
        if (property[key] === undefined && (key === 'delegate' || typeof item[key] !== 'object')) {
            property[key] = item[key];
        }
    }
    //add to root if no parent
    if (parentId !== undefined) {
        //else add to PropertiesModel
        var parentUiModel = PropertiesModel[groupName + '_' + parentId];
        if (!hasChild(parentUiModel, property.name)) {
            parentUiModel.nodes.push({
                name: property.name,
                rowId: property.rowId,
                colId: property.colId,
                identifier: groupName + '_' + parentId
            })
        }
    }
}

//add elements from Solution into Map
PropertiesAssembler.prototype.bulkInsert = function(solution) {
    var solutionName = solution.getName();
    if (!rootNodes[solutionName]) {
        createRootnode(solutionName);
    }
    var nodes = solution.nodes;
    var leftOver = [];
    var iteration = 0;

    //inserting Nodes requires a couple of iterations, parents first
    //fail for recursive structures
    while (iteration < 8) {
        for (var i = 0; i < nodes.length; i++) {
            var obj = nodes[i];
            if (!obj.parentName || PropertiesModel[solutionName + '_' + obj.parentName]) {
                obj.ref = obj.formulaId || obj.ref;
                addProperty(solutionName, obj.rowId, obj.colId, obj, obj.parentName == null ? undefined : obj.parentName);
            }
            else {
                leftOver.push(obj);
            }
        }
        if (leftOver.length == 0) {
            nodes = leftOver;
            break;
        }
        nodes = leftOver;
        leftOver = [];
        iteration++;
    }
    if (nodes.length !== 0) {
        throw Error('after ' + iteration + ' still items left, maybe too deeply nested or resursive.');
    }
}

function getRootNode(modelName) {
    return rootNodes[modelName];
}

PropertiesAssembler.prototype.findAllInSolution = function(modelName, visitArg) {
    for (var key in PropertiesModel) {
        var property = PropertiesModel[key];
        if (property.solutionName === modelName) {
            visitArg(property);
        }
    }
};
//fetchByName (can return undefined)
PropertiesAssembler.prototype.fetch = function fetch(name) {
    return PropertiesModel[name];
};
/**
 * Visitor walk the tree
 * if node is null we use root node
 * function is not thread safe, add parent and depth to function call instead of altering PropertyNode
 * As expected, problems while recursive calling this method.
 */
PropertiesAssembler.prototype.visitProperty = function(node, func, startDepth) {
    var startingNode = node || getRootNode('NEW');
    if (startingNode) visitInternal(startingNode, func, startDepth || 0)
}
PropertiesAssembler.prototype.visitModel = function(modelName, func, startDepth) {
    visitInternal(getRootNode(modelName), func, startDepth || 0)
}
/*
 * Complex to explain. See {@webexport.js}
 * Its used to provide a sortable id per row when combined with Tuples
 *  [((variableId|tupleDefinitionId),tupleIndex){maxTupleDepth}]
 */
PropertiesAssembler.prototype.indexProperties = function(modelName) {
    var counter = 0;
    const padder = pad;
    visitInternal(getRootNode(modelName), function(node, depth) {
        counter++;
        node.id = padder(counter, 5);
        if (node.tupleProperty) {
            const tupleDef = PropertiesModel[node.solutionName + "_" + node.tupleDefinitionName + "_value"]
            if (tupleDef.tupleProperty) {
                const nestedTupleDef = PropertiesModel[node.solutionName + "_" + tupleDef.tupleDefinitionName + "_value"]
                if (nestedTupleDef.tupleProperty) {
                    const douleNestedTupleDef = PropertiesModel[node.solutionName + "_" + nestedTupleDef.tupleDefinitionName + "_value"]
                    if (douleNestedTupleDef.tupleProperty) throw Error('only 3levels nested tuples are allowed')
                    node.hash = [douleNestedTupleDef.id, '000', nestedTupleDef.id, '000', tupleDef.id, '000', node.id]
                } else {
                    node.hash = [nestedTupleDef.id, '000', tupleDef.id, '000', node.id, '000', node.id]
                }
            } else {
                node.hash = [tupleDef.id, '000', node.id, '000', node.id, '000', node.id]
            }
        }
        else node.hash = [node.id, '000', node.id, '000', node.id, '000', node.id];
    }, 0)
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function visitInternal(node, func, depth) {
    func(node, depth);
    if (func.stop) return delete func.stop;
    if (node.nodes) {
        for (var i = 0; i < node.nodes.length; i++) {
            var childNode = PropertiesModel[node.nodes[i].name];
            childNode.parentrowId = node.rowId;//TODO: remove this (visitor should not modify state)
            visitInternal(childNode, func, depth + 1);
        }
    }
}

function visitChildren(node, func, depth) {
    if (node.nodes) {
        for (var i = 0; i < node.nodes.length; i++) {
            func(node, depth);
            visitChildren(PropertiesModel[node.nodes[i].name], func, depth + 1);
        }
    }
}

PropertiesAssembler.prototype.visitChildren = visitChildren;
PropertiesAssembler.prototype.getRootProperty = getRootNode;
PropertiesAssembler.prototype.getOrCreateProperty = getOrCreateProperty;
module.exports = PropertiesAssembler.prototype;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\src\\PropertiesAssembler.js","/lme-core\\src",undefined)
},{"_process":38,"buffer":36}],27:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
/**
 * Parsers/Exchange modules create Solution objects filled with generic metadata (formula's,properties concerning a variable)
 *
 */
//This class also has functions for Property types.
//No instances of Property are made since there will be made a lot of those. (1.000.000) easy
//So we keep them plain.
//Don't allow dependencies to Services occur here
//TODO: we should not twice hold the 'nodes' object.
function Solution(solutionName) {
    this.name = solutionName;
    this.displayTypes = {};
    this.type = solutionName;
    this.properties = {};
    this.nodes = [];
    this.addedRowIds = new Set();
    this.formulas = new Set();
    this.root = {};
}

Solution.prototype.preparser = function(input) {
    return input;
}
Solution.prototype.getFormulas = function(iterator) {
    return this.formulas.forEach(iterator);
}
Solution.prototype.hasNode = function(rowId) {
    var has = this.addedRowIds.has(rowId);
    this.addedRowIds.add(rowId);
    return has;
}
Solution.prototype.setParentName = function(uiNode, parentId) {
    uiNode.parentName = (parentId === undefined ? 'root_value' : parentId + '_value');
}
//just be able to retrieve all data of the original
//delegate can be anything, only the one who created it knows it
Solution.prototype.setDelegate = function(uiNode, node) {
    var originalproperties = {};
    for (var key in node) {
        var property = node[key];
        if (typeof property !== 'object' && key.charAt(0) !== '_') {
            this.properties[key] = this.properties[key] || {};
            this.properties[key][property] = this.properties[key][property] || 0;
            this.properties[key][property] += 1;
            originalproperties[key] = property;
        }
    }
    node.originalproperties = originalproperties;
    uiNode.delegate = node;
}
Solution.prototype.getName = function() {
    return this.name;
}
//should not allow duplicates.
//Save UI- names only
Solution.prototype.createNode = function(rowId, colId, formulaId, displayAs) {
    var uiNode = {
        name: this.name + "_" + rowId + "_" + colId,
        rowId: rowId,
        colId: colId,
        refId: formulaId,
        displayAs: displayAs || 'string'
    };
    if (formulaId !== undefined) {
        uiNode.ref = formulaId;
        this.formulas.add(formulaId);
    }
    this.displayTypes[uiNode.displayAs] = true;
    this.nodes.push(uiNode);
    return uiNode;
}

Solution.prototype.addDisplayType = function(displayType) {
    if (displayType === undefined) {
        throw new Error('undefined displaytype, make sure to use valid displayTypes');
    }
    this.displayTypes[displayType] = true;
}
Solution.prototype.getDisplayTypes = function(displayType) {
    return this.displayTypes;
}
Solution.prototype.stringify = function() {
    return this.preparser(JSON.stringify(this.root, function(key, val) {
            if (key === 'originalproperties') {
                return undefined;
            }
            return val;
        }, 2
    ));
}
//add to global list of found variables
Solution.prototype.addNode = function(rowId, node) {
    this.nodes[rowId] = node
}
Solution.prototype.setPreparser = function(parser) {
    this.preparser = parser;
}
//'uielem' the Object of which the properties need to be set
//'elem' the Object of which the properties can be found
//set all properties of the elem in uielem
Solution.prototype.restoreDelegateProperties = function(newObject, orginalObject) {
    var delegate = orginalObject.delegate;
    if (delegate !== undefined && delegate.originalproperties !== undefined) {
        for (var key in delegate.originalproperties) {
            if (newObject[key] === undefined || newObject[key] === null) {
                if (delegate.originalproperties[key] !== undefined && delegate.originalproperties[key] !== null && delegate.originalproperties[key] !== '') {
                    newObject[key] = delegate.originalproperties[key];
                }
            }
        }
    }
}
//add node to root node if it has no parent
//else add the node to the children of is parent
Solution.prototype.addNodeToCorrespondingPlaceInHierarchie = function(parentrowId, rowId, node) {
    if (parentrowId === undefined) {
        this.root = node;
    }
    else {
        //create children array if it did not exist yet.
        var foundVariable = this.nodes[parentrowId];
        if (foundVariable.children === undefined) {
            foundVariable.children = [];
        }
        foundVariable.children.push(node);
    }
}
Solution.prototype.size = function() {
    return this.nodes.length;
}
module.exports = Solution;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\src\\Solution.js","/lme-core\\src",undefined)
},{"_process":38,"buffer":36}],28:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
/**
 * Solution encapsulation
 * FormulaId '0' is not a valid ID!
 */
const log = require('log6')
const Solution = require('./Solution')
const PropertiesAssembler = require('./PropertiesAssembler')
const FunctionMap = require('./FunctionMap')
const FormulaService = require('./FormulaService')
const ParserService = require('./ParserService')
const FormulaBootstrap = require('./FormulaBootstrap');
const esprima = require('esprima')

function SolutionFacade() {
}

SolutionFacade.prototype.createSolution = function(solutionName) {
    return new Solution(PropertiesAssembler.createRootNode(solutionName).solutionName);
}

SolutionFacade.prototype.importSolutionData = function(data, parserType, workbook) {
    var foundParser = ParserService.findParser(parserType);
    var solution = foundParser.parseData(data, workbook);
    PropertiesAssembler.bulkInsert(solution);
    initFormulaBootstrap(solution.formulas, false);
    return solution;
}
SolutionFacade.prototype.exportSolution = function(parserType, rowId, workbook) {
    var parser = ParserService.findParser(parserType);
    if (parser === undefined) {
        throw Error('No such parser found:[' + parserType + ']');
    }
    return parser.deParse(rowId, workbook);
}

function initFormulaBootstrap(formulas, resetParsedFormula) {
    formulas.forEach(function(formulaId) {
        var formulaInfo = FormulaService.findFormulaByIndex(formulaId);
        if (resetParsedFormula) {
            formulaInfo.parsed = undefined;//explicitly reset parsed. (The formula-bootstrap) will skip parsed formulas
        }
        if (formulaInfo.parsed === undefined || formulaInfo.parsed === null) {
            FormulaBootstrap.parseAsFormula(formulaInfo);
        }
        FunctionMap.initializeFormula(formulaInfo);
    });
};
SolutionFacade.prototype.initFormulaBootstrap = initFormulaBootstrap;
/*
 *return given properties from a formula
 */
SolutionFacade.prototype.gatherFormulaProperties = function(modelName, properties, rowId) {
    var formulaProperties = {};
    for (var property in properties) {
        var formula = FormulaService.findFormulaByIndex(PropertiesAssembler.getOrCreateProperty(modelName, rowId, property).ref);
        if (formula !== undefined && formula.original !== undefined && formula.original !== null && formula.original !== '') {
            formulaProperties[property] = formula.original;
        }
    }
    return formulaProperties;
}
/**
 * Called from JSWorkBook
 * Initializes Solution if not exists
 * Creates Formula/Property if not exists
 * Initialize Functionmap
 */
SolutionFacade.prototype.createFormulaAndStructure = function(solutionName, formulaAsString, rowId, colId, displaytype, frequency) {
    //create a formula for the element
    var ast = esprima.parse(formulaAsString);
    //create Solution if not exists.
    var solution = this.createSolution(solutionName);
    //integrate Property with Formula
    this.createUIFormulaLink(solution, rowId, colId, ast.body[0].expression, displaytype, frequency);
    //integrate one formula from just created Solution
    this.initFormulaBootstrap(solution.formulas);
};
/**
 * Called by parsers
 */
SolutionFacade.prototype.createUIFormulaLink = function(solution, rowId, colId, body, displaytype, frequency) {
    //by default only value properties can be user entered
    //in simple (LOCKED = (colId !== 'value'))

    var property = PropertiesAssembler.getOrCreateProperty(solution.name, rowId, colId);
    if (displaytype) property.displaytype = displaytype;
    var formulaId = FormulaService.addModelFormula(property, solution.name, rowId, colId, ['value', 'title'].indexOf(colId) == -1, body, frequency);
    return solution.createNode(rowId, colId, formulaId, displaytype);
};

SolutionFacade.prototype.mergeFormulas = function(formulasArg) {
    //so for all refs in the formula, we will switch the formulaIndex
    var changed = [];
    formulasArg.forEach(function(formula) {
        //not sure where to put this logic
        //get local formula
        //var id = formula.id === undefined ? formula.index : formula.id;
        var localFormula = FormulaService.findFormulaByIndex(formula.index);
        if (localFormula !== undefined && localFormula !== null) {
            changed.push(localFormula.id || localFormula.index);
            //of course this should not live here, its just a bug fix.
            if (localFormula.index !== formula.id) {
                //move formula
                modify(localFormula, formula);
            }
        }
    });
    //rebuild the formulas
    this.initFormulaBootstrap(changed, true);
};

SolutionFacade.prototype.addFormulaDependency = function(formulaInfo, name, propertyName) {
    var property = PropertiesAssembler.getOrCreateProperty(formulaInfo.name.split('_')[0], name, propertyName || 'value');
    FormulaService.addFormulaDependency(formulaInfo, property.ref, property.name);
    return property;
}
SolutionFacade.prototype.getFunctions = function() {
    return this.functions;
}
SolutionFacade.prototype.visitParsers = ParserService.visitParsers;
SolutionFacade.prototype.addParser = ParserService.addParser;
SolutionFacade.prototype.getOrCreateProperty = PropertiesAssembler.getOrCreateProperty;
SolutionFacade.prototype.contains = PropertiesAssembler.contains
//TODO: add locked flag to these properties
SolutionFacade.prototype.properties = {
    value: 0,
    visible: 1,
    required: 2,
    locked: 3,
    entered: 4,
    validation: 5,
    title: 6,
    validateInput: 7,
    choices: 8,
    _testg: 9,
    _testh: 10
};
SolutionFacade.prototype.functions = {}
SolutionFacade.prototype.addFunction = function(solution, functionName, functionBody) {
    var node = this.createUIFormulaLink(solution, functionName, 'function', functionBody, 'number', 'document');
    const findFormulaByIndex = FormulaService.findFormulaByIndex(node.ref);
    findFormulaByIndex.params = "$1,$2"
}
SolutionFacade.prototype.addVariables = FormulaService.addVariables
SolutionFacade.prototype.initVariables = FormulaService.initVariables
SolutionFacade.prototype.fetchFormulaByIndex = FormulaService.findFormulaByIndex;
FormulaBootstrap.initStateBootstrap(SolutionFacade.prototype);
module.exports = SolutionFacade.prototype;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\src\\SolutionFacade.js","/lme-core\\src",undefined)
},{"./FormulaBootstrap":21,"./FormulaService":22,"./FunctionMap":23,"./ParserService":25,"./PropertiesAssembler":26,"./Solution":27,"_process":38,"buffer":36,"esprima":35,"log6":35}],29:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
const log = require('log6');
const headers = {
    columns: {
        title: 'timeline'
    },
    period: {
        title: 'period'
    },
    matrix: {
        title: 'matrix'
    },
    none: {
        title: 'none'
    },
    doc: {
        title: 'document'
    }
}

function TimeAxis(data) {
    this.importData = data
    // console.time('initialize_xAxis');
    this.tContext = data;
    var formulasets = data.formulasets;
    var viewmodes = {};
    var NA = data.navalue;
    var indexed = [];// holds a indexed reference for quicked lookup for real-column-contexts/ can be used for the
                     // column variable
    var templateindexed = [];// holds a indexed reference for quicked lookup for contexts/ its only for the templates
    // and will only be used during build time
    this.viewmodes = viewmodes;
    // make an array storing the formulaset for all columnentrees, used for quicker lookup later
    var formulasetLookup = [];// used to lookup the
    // we assume they ordered, looping trough the entrees, using the currentPeriod as being used until index had been
    // reached
    var periods = data.layout.period;
    var currentperiod = periods[0];
    var aggregationformulaset = formulasets[formulasets.length - 1];
    currentperiod.formulaset = formulasets[currentperiod.formulasetId];
    for (var i = 0; i < data.layout.idx; i++) {
        if (i >= currentperiod.idx) {
            currentperiod = periods[currentperiod.formulasetId + 1];
            // assign the formulaset, it was stored as reference
            currentperiod.formulaset = formulasets[currentperiod.formulasetId];
        }
        formulasetLookup[i] = currentperiod;
    }
    currentperiod.last = data.layout.idx;
    /*    this.column = function (variable, vars, hIndex, fIndex)
     {
     // var fi = (fIndex * formulasetsCount) + this.f;
     // should pass trough formula to the variable deocorator..
     // he can still swap flipflop T
     // i can pass trough the scope.. // return variable.evaluated[fIndex].call(this, variable, vars, hIndex, this);
     // i will pass trouhg the engine as scope..
     return variable.evaluated[(formulasetsCount * fIndex) + this.f](variable, vars, hIndex, this);
     }*/
    var infinitColumn = {
        hash: 0,
        dummy: true
    };
    infinitColumn.f = 0;
    infinitColumn.prev = infinitColumn;
    var timelineSize = data.time.timelineSize;
    var columnMultiplier = data.time.columnMultiplier;
    // find out all viewtypes in the document
    var layout = data.layout;

    while (layout != undefined) {
        viewmodes[layout.name] = {
            //these will be reduced to fixednumber and columns, they all share the same algorithms
            doc: [[{
                hash: 1,
                f: 1,
                header: headers.doc,
                lastall: {hash: 1},
                firstall: {hash: 1},
                firstnotrend: {hash: 1},
                lastnotrend: {hash: 1},
                firsttrend: {hash: 1, lastbkyr: {hash: 0}},
                lasttrend: {hash: 1}
            }]],
            period: [[{hash: 1, f: 1, header: headers.period}, {
                hash: 2,
                header: headers.period
            }]],
            none: [[]],
            columns: [],
            matrix: [[{hash: 1, f: 1, header: headers.matrix}, {
                hash: 2,
                header: headers.matrix
            }, {
                hash: 3,
                header: headers.matrix
            }, {
                hash: 4,
                header: headers.matrix
            }, {hash: 5, header: headers.matrix}
            ]],
            cols: []
        };
        layout = layout.children[0];
    }

    // tricky recursion here, just debug it.. too many to explain
    function nestRecursive(parent, object, offset, func) {
        object.forEach(function(child) {
            child.parent = parent;
            var tempincrease = child.size;
            var no = 0;
            child.parent.sibling = [];
            while (tempincrease <= (parent.size - 1)) {
                child.idx = (offset + tempincrease);
                child.no = no;
                tempincrease += child.size;
                child.parent.sibling.push((offset + (child.size * (no + 1))));
                nestRecursive(child, child.children, offset + (child.size * (no)), func)
                no++;
            }
        });
        func(parent);
    }

    function extractBaseChildren(child, array) {
        child.sibling.forEach(function(innerchild) {
            var foundChild = templateindexed[innerchild];
            if (foundChild.sibling == undefined) {
                array.push(innerchild);
            }
            else {
                extractBaseChildren(foundChild, array);
            }
        });
    }

    // extract data from recursion
    // make new column objects
    // be aware the values from child in here are temporally from transitive nature. U cannot keep references since
    // they will change in future. Presumably to the last one...
    nestRecursive(data.layout, data.layout.children, 0, function(child) {
        // actual element
        var newElement = {
            // type : child.name,
            parenttypes: [],
            hash: child.idx
        };
        // find out all parents and top
        var parent = child.parent;
        while (parent != undefined) {
            // register aggregation type
            // register all types to the new columnIndex object
            var previdx = child.idx - parent.size;
            newElement.parenttypes.push({
                idx: parent.idx,
                type: parent.name,
                prevme: previdx > 0 ? previdx : undefined
            });
            // if the next is undefined, we found top.
            newElement.top = parent.idx;
            parent = parent.parent;
        }
        // could be top, of so, we don't need this information
        if (child.parent != undefined) {
            newElement.agg = child.parent.idx;
            newElement.period = formulasetLookup[child.idx];
        }
        // could be aggregated, we want to know what siblings it had
        if (child.sibling != undefined) {
            newElement.sibling = child.sibling.slice();
            var children = newElement.sibling;
            var tarr = [];
            // add the base children aswell for quicker and eaier lookup later
            extractBaseChildren(child, tarr);
            newElement.allchildren = tarr;
        }
        else {
            // this is smallest we get
            var period = formulasetLookup[child.idx];
            if (period.first == undefined) {
                period.first = child.idx;
            }
            formulasetLookup[child.idx].last = child.idx;
        }
        // add elements to the base cols
        viewmodes[child.name].cols.push(newElement);
        templateindexed[newElement.hash] = newElement;
    });

    // convert template column index into real index
    function calculateIndex(timelineId, columnId) {
        var columnId = (columnId * columnMultiplier);
        // add offset,0 for the titleValue, 1 for dummy cache,we starting from 1 so +1
        columnId++;
        return columnId;
    }

    // convert meta data in real column object..
    // don't make references. The values are re-used over timelines
    for (var vmode in this.viewmodes) {
        // this loop will be used for all viewmodes when wisely declared.
        for (var tId = 0; tId < timelineSize; tId++) {
            // create new array for the timeline
            this.viewmodes[vmode].columns[tId] = [];
        }
    }
    // creat all real objects for all timeslines first, we use the indexes created to lookup the elements while
    // loooking for references
    for (var tId = 0; tId < timelineSize; tId++) {
        for (var vmode in this.viewmodes) {
            // times multiplier
            // jsut for quick reference place the array in here;
            var currentviewmode = viewmodes[vmode];
            var currentviewmodecolumns = currentviewmode.cols;
            for (var cId = 0; cId < currentviewmodecolumns.length; cId++) {
                var columnEntries = currentviewmode.columns;
                var columnEntriesForTimeline = currentviewmode.columns[tId];
                var metadata = currentviewmode.cols[cId];
                var columnId = calculateIndex(tId, metadata.hash);
                var previousColumn = (cId == 0 ? infinitColumn : columnEntriesForTimeline[columnEntriesForTimeline.length - 1]);
                var columnElement = {
                    header: headers.columns,
                    hash: columnId,
                    prev: previousColumn
                };
                indexed[columnId] = columnElement;
                // add to the stack
                columnEntriesForTimeline.push(columnElement);
                // we know the first column from this, while being the first we can references it from here
                columnElement.first = columnEntriesForTimeline[0];
                // we don't knwow the last.. since it could be in the future, we have to add it later
            }
        }
        // now all entree are filled, for its timeline we can reference the last
        // be aware that the the viewmodes walked top,bkyr,half,qurt,detl. No reference can be made for the real column
        // objects,from top->detl. It would require a new loop so u can ask from a detl about a parent type children,
        // but not about information about those children, since they are not determined yet, they exist, but the
        // references are not u can however obtain information about the children from the template. And ofc there
        // should not be a need to ask these kind of information
        for (var vmode in this.viewmodes) {
            // times multiplier
            // jsut for quick reference place the array in here;
            var currentviewmode = viewmodes[vmode];
            var currentviewmodecolumns = currentviewmode.cols;
            var columnslength = currentviewmodecolumns.length;
            for (var cId = 0; cId < columnslength; cId++) {
                // here all references are made
                // bky,doc,period,formula,aggregation, top, children.. all
                var columnEntries = currentviewmode.columns;
                var columnEntriesForTimeline = columnEntries[tId];
                var entree = currentviewmode.columns[tId][cId];
                entree.last = columnEntriesForTimeline[columnEntriesForTimeline.length - 1];
                entree.first = columnEntriesForTimeline[0];
                entree.next = (cId == (columnslength - 1)) ? infinitColumn : columnEntriesForTimeline[cId + 1];
                var metadata = currentviewmode.cols[cId];
                entree.formula = metadata.period;
                if (metadata.agg != undefined) {
                    var aggColumnId = calculateIndex(tId, metadata.agg);
                    entree.agg = indexed[aggColumnId];
                }
                if (metadata.sibling != undefined) {
                    entree.f = aggregationformulaset.formulasetId;
                    entree.header = {
                        title: 'timelineAgg'
                    };
                    entree.aggcols = [];
                    metadata.sibling.forEach(function(childid) {
                        var childColId = calculateIndex(tId, childid);
                        entree.aggcols.push(indexed[childColId]);
                    });
                    entree.firstchild = indexed[calculateIndex(tId, metadata.allchildren[0])];
                    entree.lastchild = indexed[calculateIndex(tId, metadata.allchildren[metadata.allchildren.length - 1])];
                }
                else {
                    entree.f = formulasetLookup[metadata.hash].formulasetId;
                }
                // this will allow document values per timeline, if referring to timeline[0] there will only be one
                // possible..
                entree.doc = columnEntriesForTimeline[0];// there only is one and one only, always correct behavior
                // entree.period = (cId == 0) ? columnEntriesForTimeline[0] : columnEntriesForTimeline[1];// detail
                // should refer to corresponding period add all period information
                if (metadata.period != undefined) {
                    // now it will be able to aggregate
                    // can't do firstchild in this type.
                    entree.period = columnEntriesForTimeline[metadata.period.hash];
                    entree.header = {
                        title: 'timeline ' + metadata.period.formulaset.name
                    };
                    entree.firstinperiod = indexed[calculateIndex(tId, metadata.period.first)];
                    entree.lastinperiod = indexed[calculateIndex(tId, metadata.period.last)];
                    for (var pi = 0; pi < periods.length; pi++) {
                        var period = periods[pi];
                        var tFirst = indexed[calculateIndex(tId, period.first)];
                        var formulaname = period.formulaset.name;
                        entree['first' + formulaname] = tFirst;
                        var tLast = indexed[calculateIndex(tId, period.last)];
                        entree['last' + formulaname] = tLast;
                        entree['isfirst' + formulaname] = (tFirst.hash == entree.hash);
                        entree['islast' + formulaname] = (tLast.hash == entree.hash);
                        entree['is' + formulaname] = (period.formulasetId == formulasetLookup[metadata.hash].formulasetId);
                        entree['isprev' + formulaname] = entree.prev.hash == 0 ? false : entree.prev['is' + formulaname];
                    }
                    entree.isfirstinperiod = (entree.firstinperiod.hash == entree.hash);
                    entree.islastinperiod = (entree.lastinperiod.hash == entree.hash);
                }
                entree.aggregated = (metadata.sibling != undefined);
                entree.tsy = (metadata.sibling == undefined) ? 1 : metadata.allchildren.length;
                entree.texceedtsy = metadata.hash > entree.tsy;// should be infirstbkyr
                // add all information about aggregation types;bkyr,all are available if not top..
                // there is no need yet to give aggregated columns information about bookyear etc.. yet
                if (metadata.sibling == undefined) {
                    for (var aggi = 0; aggi < metadata.parenttypes.length; aggi++) {
                        var agg = metadata.parenttypes[aggi];
                        var aggtype = agg.type;
                        var template = templateindexed[agg.idx];
                        var tempatechilds = template.allchildren;
                        var aggentree = indexed[calculateIndex(tId, template.hash)];
                        entree[aggtype] = aggentree;
                        entree['prev' + aggtype] = aggentree.prev == undefined ? infinitColumn : aggentree.prev;
                        entree['previn' + aggtype] = agg.prevme == undefined ? infinitColumn : indexed[calculateIndex(tId, agg.prevme)];
                        entree['isinfirst' + aggtype] = agg.prevme == undefined;
                        var prevagg = aggentree.prev;
                        entree['lastinprev' + aggtype] = (prevagg.hash == 0) ? infinitColumn : prevagg.lastchild;
                        entree['firstinprev' + aggtype] = (prevagg.hash == 0) ? infinitColumn : prevagg.firstchild;
                        entree['lastin' + aggtype] = prevagg;
                        var firstEntree = indexed[calculateIndex(tId, tempatechilds[0])];
                        entree['first' + aggtype] = firstEntree;
                        entree['isfirst' + aggtype] = (firstEntree.hash == entree.hash);
                        var lastEntree = indexed[calculateIndex(tId, tempatechilds[tempatechilds.length - 1])];
                        entree['last' + aggtype] = lastEntree;
                        entree['islast' + aggtype] = (lastEntree.hash == entree.hash);
                    }
                    entree.mutcalc = entree.infirstbkyr ? 1 : NA;// information not available in aggcolumns,yet...
                }
                // when period or doc variable refer to Detail Variable, which is kind of strange..
                entree.detail = (cId == 0) ? columnEntriesForTimeline[0] : columnEntriesForTimeline[1];// period should
                                                                                                       // refer to
                                                                                                       // first detail
                                                                                                       // from own
                                                                                                       // period
            }
        }
    }
    this.indexed = indexed;
    templateindexed = undefined;
    if (log.DEBUG) log.debug('Created Xaxis for ' + data.time.columnSize + ' columns on ' + timelineSize + ' timelines ');
    /**
     * Assign references to the infinit column
     */
    infinitColumn.doc = entree.doc;
    return viewmodes;
}

module.exports = TimeAxis;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\src\\TimeAxis.js","/lme-core\\src",undefined)
},{"_process":38,"buffer":36,"log6":35}],30:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
/**
 * Bridge between FormulaService,PropertiesAssembler and FunctionMap
 */
const log = require('log6');
const ValueFacade = {}
const PropertiesAssembler = require('./PropertiesAssembler');
const FunctionMap = require('./FunctionMap');
const FormulaService = require('./FormulaService')
/**
 * For small arrays, lets say until 1000, elements. There is no need to map by name.
 * Just iterate the shabang and test the property
 */
Array.prototype.lookup = function(property, name) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][property] === name) {
            return this[i];
        }
    }
    return undefined;
}
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}
if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

function findFormula(uiModel) {
    if (uiModel === undefined) {
        return undefined;
    }
    return FormulaService.findFormulaByIndex(uiModel.ref);
}

function fetchSolutionNode(row, col) {
    return PropertiesAssembler.fetch(row + '_' + col);
}

ValueFacade.putSolutionPropertyValue = function(context, row, value, col, xas, yas) {
    var rowId = row + '_' + (col || 'value');
    var localFormula = findFormula(PropertiesAssembler.fetch(rowId));
    if (localFormula === undefined) {
        //because only Formula's are known here, we cannot give away variable name here.
        throw Error('Cannot find variable')
    }
    if (log.TRACE) log.trace('Set value row:[%s] x:[%s] y:[%s] value:[%s]', rowId, xas.hash, yas.hash, value);
    context.calc_count++;
    context.audit.push({
        saveToken: context.saveToken,
        hash: xas.hash + yas.hash + 0,
        formulaId: localFormula.id || localFormula.index
    })
    var userValue = value;
    var variable = fetchSolutionNode(row, (col || 'value'));
    if (variable.displayAs == 'radio' || variable.displayAs == 'select') {
        if (userValue != null) {
            const choices = ValueFacade.fetchSolutionPropertyValue(context, row, 'choices');
            userValue = userValue === true ? "1" : userValue === false ? "0" : userValue
            const lookupvalue = (choices.lookup('value', String(userValue)) || choices.lookup('name', String(userValue)));
            if (log.DEBUG && lookupvalue == null) log.warn('Invalid choice-value set for ' + row + ' [' + userValue + ']')
            userValue = lookupvalue ? lookupvalue.name : null;
            if (!isNaN(userValue)) {
                userValue = parseFloat(userValue)
            }
        }
    }
    if (variable.frequency == 'document') {
        xas = xas.doc
    }
    //NULL values are allowed, and should not be parsed into a real data type.
    if (userValue != null) {
        if (variable.datatype == 'number') {
            userValue = Number(userValue)
        } else if (variable.datatype == 'string') {
            userValue = String(userValue)
        } else if (variable.datatype == 'boolean') {
            userValue = Boolean(userValue)
        }
    }
    FunctionMap.apiSet(localFormula, xas, yas, 0, userValue, context.values);
};
/**
 * Generic default values, formatter transformers
 * TODO: introduce data-masks to keep these checks quick
 * - every variable has one mask, this one includes display and data types.
 */
ValueFacade.fetchSolutionPropertyValue = function(context, row, col, xas, yas) {
    const colType = col || 'value';
    if (colType === 'entered') {
        //kinda copy-paste, find way to refactor. there is no real enteredValue formula.
        //retrieve the 'value' formula, check if there is an entered value
        const variable = fetchSolutionNode(row, 'value');
        const localFormula = findFormula(variable);
        if (localFormula === undefined) {
            return false;
        }
        const id = localFormula.id || localFormula.index;
        const hash = xas.hash + yas.hash + 0;
        return context.values[id][hash] != null;
    } else if (colType === 'original') {
        const variable = fetchSolutionNode(row, 'value');
        const localFormula = findFormula(variable);
        return localFormula.original;
    }
    const variable = fetchSolutionNode(row, colType);
    const localFormula = findFormula(variable);
    var returnValue;
    if (localFormula === undefined) {
        returnValue = context.propertyDefaults[colType];
    }
    else {
        if (variable.frequency == 'document') {
            xas = xas.doc
        }
        returnValue = FunctionMap.apiGet(localFormula, xas, yas, 0, context.values);
    }
    if (variable) {
        if (colType === 'value') {
            if (variable.displayAs == 'radio' || variable.displayAs == 'select') {
                if (returnValue != null) {
                    const choices = ValueFacade.fetchSolutionPropertyValue(context, row, 'choices');
                    returnValue = returnValue === true ? "1" : returnValue === false ? "0" : returnValue
                    const choicesLookup = choices.lookup('name', String(returnValue));
                    returnValue = choicesLookup ? choicesLookup.value : returnValue;
                }
            } else {
                if (variable.decimals !== undefined) {
                    if (variable.datatype == 'matrix') {
                        for (var i = 0; i < returnValue.length; i++) {
                            var innerx = returnValue[i];
                            if (!isNaN(innerx)) {
                                var level = Math.pow(10, variable.decimals);
                                returnValue[i] = (Math.round(innerx * level) / level)
                            }
                            for (var y = 0; y < returnValue[i].length; y++) {
                                var innery = returnValue[i][y];
                                if (!isNaN(innery)) {
                                    var level = Math.pow(10, variable.decimals);
                                    returnValue[i][y] = (Math.round(innery * level) / level)
                                }
                            }
                        }
                    }
                    else if (!isNaN(returnValue)) {
                        var level = Math.pow(10, variable.decimals);
                        returnValue = (Math.round(returnValue * level) / level)
                    }
                }
                if (variable.datatype == 'number') {
                    returnValue = OnNA(returnValue, 0)
                }
                if (variable.displayAs == 'piechart') {
                    returnValue = PIECHART(returnValue)
                }
            }
            if (variable.displayAs == 'date') {
                returnValue = new Date(returnValue)
            }
        } else if (colType == 'locked') {
            return Boolean(returnValue)
        } else if (colType == 'visible') {
            return Boolean(returnValue)
        }

    }
    return returnValue;
}
ValueFacade.fetchRootSolutionProperty = PropertiesAssembler.getRootProperty;
ValueFacade.fetchSolutionNode = fetchSolutionNode;
ValueFacade.apiGetValue = FunctionMap.apiGet;
ValueFacade.getAllValues = function(docValues) {
    return this.getValuesFromFormulaIds(Object.keys(docValues), docValues);
}
ValueFacade.getValuesFromFormulaIds = function(keys, docValues) {
    //we cannot just return everything here, Because for now all formula's have a user-entered value cache.
    //Also Functions themSelves are bound to this object.
    //So we have to strip them out here.
    //should be part of the apiGet, to query all *_value functions. or *_validation etc.
    var values = [];
    for (var i = 0; i < keys.length; i++) {
        var formulaId = keys[i];
        var cachevalues = docValues[formulaId];
        if (cachevalues) {
            var formula = FormulaService.findFormulaByIndex(formulaId);
            var formulaName = formula === undefined ? formulaId : formula.name;
            for (var cachedValue in cachevalues)
                values.push({
                    varName: formulaName,
                    colId: cachedValue,
                    value: cachevalues[cachedValue]
                });
        }
    }
    return values;
}
//when new formula's arrive, we have to update the user-entered map so we don't get NPE
ValueFacade.updateValueMap = function(values) {
    FormulaService.visitFormulas(function(formula) {
        //later will add values['_'+key] for the cache
        //for unlocked add values[key] here will user entered values stay
        if (formula.type === 'noCacheUnlocked') {
            var id = formula.id || formula.index;
            if (!values[id]) {
                values[id] = {};
            }
        }
    });
};
ValueFacade.visit = PropertiesAssembler.visitProperty;
ValueFacade.visitChildren = PropertiesAssembler.visitChildren;
ValueFacade.findAllInSolution = PropertiesAssembler.findAllInSolution;
module.exports = ValueFacade;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\src\\ValueFacade.js","/lme-core\\src",undefined)
},{"./FormulaService":22,"./FunctionMap":23,"./PropertiesAssembler":26,"_process":38,"buffer":36,"log6":35}],31:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var importData = {"formulasets":[{"formulasetId":0,"name":"notrend"},{"formulasetId":1,"name":"trend"},{"formulasetId":2,"name":"user"},{"formulasetId":3,"name":"sector"},{"formulasetId":4,"name":"aggregation"}],"layout":{"children":[{"children":[],"name":"bkyr","size":1}],"idx":20,"name":"all","no":0,"period":[{"formulasetId":0,"hash":0,"idx":19},{"formulasetId":1,"hash":1,"idx":20}],"size":20},"navalue":1e-10,"nestedTupleMultiplier":"undefined","time":{"columnMultiplier":1,"columnSize":20,"columns":[{"index":0,"name":"jan/p1"},{"index":1,"name":"fes/p2"},{"index":2,"name":"mar/p3"}],"periodMultiplier":1,"periodSize":2,"timelineMultiplier":256,"timelineSize":1,"timelines":[{"index":0,"name":"Not_USED"}]},"tupleMultiplier":32768};
var log = require('log6');
var headers = {
    columns: {
        title: 'timeline'
    },
    period: {
        title: 'period'
    },
    matrix: {
        title: 'matrix'
    },
    none: {
        title: 'none'
    },
    doc: {
        title: 'document'
    }
}

function calculateCalculationDocument(data) {
    // console.time('initialize_xAxis');
    this.tContext = data;
    var formulasets = data.formulasets;
    var viewmodes = {};
    var NA = data.navalue;
    var indexed = [];// holds a indexed reference for quicked lookup for real-column-contexts/ can be used for the
                     // column variable
    var templateindexed = [];// holds a indexed reference for quicked lookup for contexts/ its only for the templates
    // and will only be used during build time
    this.viewmodes = viewmodes;
    // make an array storing the formulaset for all columnentrees, used for quicker lookup later
    var formulasetLookup = [];// used to lookup the
    // we assume they ordered, looping trough the entrees, using the currentPeriod as being used until index had been
    // reached
    var periods = data.layout.period;
    var currentperiod = periods[0];
    var aggregationformulaset = formulasets[formulasets.length - 1];
    currentperiod.formulaset = formulasets[currentperiod.formulasetId];
    for (var i = 0; i < data.layout.idx; i++) {
        if (i >= currentperiod.idx) {
            currentperiod = periods[currentperiod.formulasetId + 1];
            // assign the formulaset, it was stored as reference
            currentperiod.formulaset = formulasets[currentperiod.formulasetId];
        }
        formulasetLookup[i] = currentperiod;
    }
    currentperiod.last = data.layout.idx;
    /*    this.column = function (variable, vars, hIndex, fIndex)
     {
     // var fi = (fIndex * formulasetsCount) + this.f;
     // should pass trough formula to the variable deocorator..
     // he can still swap flipflop T
     // i can pass trough the scope.. // return variable.evaluated[fIndex].call(this, variable, vars, hIndex, this);
     // i will pass trouhg the engine as scope..
     return variable.evaluated[(formulasetsCount * fIndex) + this.f](variable, vars, hIndex, this);
     }*/
    var infinitColumn = {
        hash: 0,
        dummy: true
    };
    infinitColumn.f = 0;
    infinitColumn.prev = infinitColumn;
    var timelineSize = data.time.timelineSize;
    var columnMultiplier = data.time.columnMultiplier;
    // find out all viewtypes in the document
    var layout = data.layout;

    while (layout != undefined) {
        viewmodes[layout.name] = {
            //these will be reduced to fixednumber and columns, they all share the same algorithms
            doc: [[{
                hash: 1,
                f: 1,
                header: headers.doc,
                lastall: {hash: 1},
                firstall: {hash: 1},
                firstnotrend: {hash: 1},
                lastnotrend: {hash: 1},
                firsttrend: {hash: 1, lastbkyr: {hash: 0}},
                lasttrend: {hash: 1}
            }]],
            period: [[{hash: 1, f: 1, header: headers.period}, {
                hash: 2,
                header: headers.period
            }]],
            none: [[]],
            columns: [],
            matrix: [[{hash: 1, f: 1, header: headers.matrix}, {
                hash: 2,
                header: headers.matrix
            }, {
                hash: 3,
                header: headers.matrix
            }, {
                hash: 4,
                header: headers.matrix
            }, {hash: 5, header: headers.matrix}
            ]],
            cols: []
        };
        layout = layout.children[0];
    }

    // tricky recursion here, just debug it.. too many to explain
    function nestRecursive(parent, object, offset, func) {
        object.forEach(function(child) {
            child.parent = parent;
            var tempincrease = child.size;
            var no = 0;
            child.parent.sibling = [];
            while (tempincrease <= (parent.size - 1)) {
                child.idx = (offset + tempincrease);
                child.no = no;
                tempincrease += child.size;
                child.parent.sibling.push((offset + (child.size * (no + 1))));
                nestRecursive(child, child.children, offset + (child.size * (no)), func)
                no++;
            }
        });
        func(parent);
    }

    function extractBaseChildren(child, array) {
        child.sibling.forEach(function(innerchild) {
            var foundChild = templateindexed[innerchild];
            if (foundChild.sibling == undefined) {
                array.push(innerchild);
            }
            else {
                extractBaseChildren(foundChild, array);
            }
        });
    }

    // extract data from recursion
    // make new column objects
    // be aware the values from child in here are temporally from transitive nature. U cannot keep references since
    // they will change in future. Presumably to the last one...
    nestRecursive(data.layout, data.layout.children, 0, function(child) {
        // actual element
        var newElement = {
            // type : child.name,
            parenttypes: [],
            hash: child.idx
        };
        // find out all parents and top
        var parent = child.parent;
        while (parent != undefined) {
            // register aggregation type
            // register all types to the new columnIndex object
            var previdx = child.idx - parent.size;
            newElement.parenttypes.push({
                idx: parent.idx,
                type: parent.name,
                prevme: previdx > 0 ? previdx : undefined
            });
            // if the next is undefined, we found top.
            newElement.top = parent.idx;
            parent = parent.parent;
        }
        // could be top, of so, we don't need this information
        if (child.parent != undefined) {
            newElement.agg = child.parent.idx;
            newElement.period = formulasetLookup[child.idx];
        }
        // could be aggregated, we want to know what siblings it had
        if (child.sibling != undefined) {
            newElement.sibling = child.sibling.slice();
            var children = newElement.sibling;
            var tarr = [];
            // add the base children aswell for quicker and eaier lookup later
            extractBaseChildren(child, tarr);
            newElement.allchildren = tarr;
        }
        else {
            // this is smallest we get
            var period = formulasetLookup[child.idx];
            if (period.first == undefined) {
                period.first = child.idx;
            }
            formulasetLookup[child.idx].last = child.idx;
        }
        // add elements to the base cols
        viewmodes[child.name].cols.push(newElement);
        templateindexed[newElement.hash] = newElement;
    });

    // convert template column index into real index
    function calculateIndex(timelineId, columnId) {
        var columnId = (columnId * columnMultiplier);
        // add offset,0 for the titleValue, 1 for dummy cache,we starting from 1 so +1
        columnId++;
        return columnId;
    }

    // convert meta data in real column object..
    // don't make references. The values are re-used over timelines
    for (var vmode in this.viewmodes) {
        // this loop will be used for all viewmodes when wisely declared.
        for (var tId = 0; tId < timelineSize; tId++) {
            // create new array for the timeline
            this.viewmodes[vmode].columns[tId] = [];
        }
    }
    // creat all real objects for all timeslines first, we use the indexes created to lookup the elements while
    // loooking for references
    for (var tId = 0; tId < timelineSize; tId++) {
        for (var vmode in this.viewmodes) {
            // times multiplier
            // jsut for quick reference place the array in here;
            var currentviewmode = viewmodes[vmode];
            var currentviewmodecolumns = currentviewmode.cols;
            for (var cId = 0; cId < currentviewmodecolumns.length; cId++) {
                var columnEntries = currentviewmode.columns;
                var columnEntriesForTimeline = currentviewmode.columns[tId];
                var metadata = currentviewmode.cols[cId];
                var columnId = calculateIndex(tId, metadata.hash);
                var previousColumn = (cId == 0 ? infinitColumn : columnEntriesForTimeline[columnEntriesForTimeline.length - 1]);
                var columnElement = {
                    header: headers.columns,
                    hash: columnId,
                    prev: previousColumn
                };
                indexed[columnId] = columnElement;
                // add to the stack
                columnEntriesForTimeline.push(columnElement);
                // we know the first column from this, while being the first we can references it from here
                columnElement.first = columnEntriesForTimeline[0];
                // we don't knwow the last.. since it could be in the future, we have to add it later
            }
        }
        // now all entree are filled, for its timeline we can reference the last
        // be aware that the the viewmodes walked top,bkyr,half,qurt,detl. No reference can be made for the real column
        // objects,from top->detl. It would require a new loop so u can ask from a detl about a parent type children,
        // but not about information about those children, since they are not determined yet, they exist, but the
        // references are not u can however obtain information about the children from the template. And ofc there
        // should not be a need to ask these kind of information
        for (var vmode in this.viewmodes) {
            // times multiplier
            // jsut for quick reference place the array in here;
            var currentviewmode = viewmodes[vmode];
            var currentviewmodecolumns = currentviewmode.cols;
            var columnslength = currentviewmodecolumns.length;
            for (var cId = 0; cId < columnslength; cId++) {
                // here all references are made
                // bky,doc,period,formula,aggregation, top, children.. all
                var columnEntries = currentviewmode.columns;
                var columnEntriesForTimeline = columnEntries[tId];
                var entree = currentviewmode.columns[tId][cId];
                entree.last = columnEntriesForTimeline[columnEntriesForTimeline.length - 1];
                entree.first = columnEntriesForTimeline[0];
                entree.next = (cId == (columnslength - 1)) ? infinitColumn : columnEntriesForTimeline[cId + 1];
                var metadata = currentviewmode.cols[cId];
                entree.formula = metadata.period;
                if (metadata.agg != undefined) {
                    var aggColumnId = calculateIndex(tId, metadata.agg);
                    entree.agg = indexed[aggColumnId];
                }
                if (metadata.sibling != undefined) {
                    entree.f = aggregationformulaset.formulasetId;
                    entree.header = {
                        title: 'timelineAgg'
                    };
                    entree.aggcols = [];
                    metadata.sibling.forEach(function(childid) {
                        var childColId = calculateIndex(tId, childid);
                        entree.aggcols.push(indexed[childColId]);
                    });
                    entree.firstchild = indexed[calculateIndex(tId, metadata.allchildren[0])];
                    entree.lastchild = indexed[calculateIndex(tId, metadata.allchildren[metadata.allchildren.length - 1])];
                }
                else {
                    entree.f = formulasetLookup[metadata.hash].formulasetId;
                }
                // this will allow document values per timeline, if referring to timeline[0] there will only be one
                // possible..
                entree.doc = columnEntriesForTimeline[0];// there only is one and one only, always correct behavior
                // entree.period = (cId == 0) ? columnEntriesForTimeline[0] : columnEntriesForTimeline[1];// detail
                // should refer to corresponding period add all period information
                if (metadata.period != undefined) {
                    // now it will be able to aggregate
                    // can't do firstchild in this type.
                    entree.period = columnEntriesForTimeline[metadata.period.hash];
                    entree.header = {
                        title: 'timeline ' + metadata.period.formulaset.name
                    };
                    entree.firstinperiod = indexed[calculateIndex(tId, metadata.period.first)];
                    entree.lastinperiod = indexed[calculateIndex(tId, metadata.period.last)];
                    for (var pi = 0; pi < periods.length; pi++) {
                        var period = periods[pi];
                        var tFirst = indexed[calculateIndex(tId, period.first)];
                        var formulaname = period.formulaset.name;
                        entree['first' + formulaname] = tFirst;
                        var tLast = indexed[calculateIndex(tId, period.last)];
                        entree['last' + formulaname] = tLast;
                        entree['isfirst' + formulaname] = (tFirst.hash == entree.hash);
                        entree['islast' + formulaname] = (tLast.hash == entree.hash);
                        entree['is' + formulaname] = (period.formulasetId == formulasetLookup[metadata.hash].formulasetId);
                        entree['isprev' + formulaname] = entree.prev.hash == 0 ? false : entree.prev['is' + formulaname];
                    }
                    entree.isfirstinperiod = (entree.firstinperiod.hash == entree.hash);
                    entree.islastinperiod = (entree.lastinperiod.hash == entree.hash);
                }
                entree.aggregated = (metadata.sibling != undefined);
                entree.tsy = (metadata.sibling == undefined) ? 1 : metadata.allchildren.length;
                entree.texceedtsy = metadata.hash > entree.tsy;// should be infirstbkyr
                // add all information about aggregation types;bkyr,all are available if not top..
                // there is no need yet to give aggregated columns information about bookyear etc.. yet
                if (metadata.sibling == undefined) {
                    for (var aggi = 0; aggi < metadata.parenttypes.length; aggi++) {
                        var agg = metadata.parenttypes[aggi];
                        var aggtype = agg.type;
                        var template = templateindexed[agg.idx];
                        var tempatechilds = template.allchildren;
                        var aggentree = indexed[calculateIndex(tId, template.hash)];
                        entree[aggtype] = aggentree;
                        entree['prev' + aggtype] = aggentree.prev == undefined ? infinitColumn : aggentree.prev;
                        entree['previn' + aggtype] = agg.prevme == undefined ? infinitColumn : indexed[calculateIndex(tId, agg.prevme)];
                        entree['isinfirst' + aggtype] = agg.prevme == undefined;
                        var prevagg = aggentree.prev;
                        entree['lastinprev' + aggtype] = (prevagg.hash == 0) ? infinitColumn : prevagg.lastchild;
                        entree['firstinprev' + aggtype] = (prevagg.hash == 0) ? infinitColumn : prevagg.firstchild;
                        entree['lastin' + aggtype] = prevagg;
                        var firstEntree = indexed[calculateIndex(tId, tempatechilds[0])];
                        entree['first' + aggtype] = firstEntree;
                        entree['isfirst' + aggtype] = (firstEntree.hash == entree.hash);
                        var lastEntree = indexed[calculateIndex(tId, tempatechilds[tempatechilds.length - 1])];
                        entree['last' + aggtype] = lastEntree;
                        entree['islast' + aggtype] = (lastEntree.hash == entree.hash);
                    }
                    entree.mutcalc = entree.infirstbkyr ? 1 : NA;// information not available in aggcolumns,yet...
                }
                // when period or doc variable refer to Detail Variable, which is kind of strange..
                entree.detail = (cId == 0) ? columnEntriesForTimeline[0] : columnEntriesForTimeline[1];// period should
                                                                                                       // refer to
                                                                                                       // first detail
                                                                                                       // from own
                                                                                                       // period
            }
        }
    }
    this.indexed = indexed;
    templateindexed = undefined;
    if (log.DEBUG) log.debug('Created Xaxis for ' + data.time.columnSize + ' columns on ' + timelineSize + ' timelines ');
    /**
     * Assign references to the infinit column
     */
    infinitColumn.doc = entree.doc;
    return viewmodes;
}

function CalculationDocument() {
}

CalculationDocument.prototype = calculateCalculationDocument(importData);

module.exports = CalculationDocument.prototype;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\src\\XAxis.js","/lme-core\\src",undefined)
},{"_process":38,"buffer":36,"log6":35}],32:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
/**
 * TUPLES
 *
 * In mathematics a tuple is a finite ordered list (sequence) of elements.
 * An n-tuple is a sequence (or ordered list) of n elements, where n is a non-negative integer.
 * There is only one 0-tuple, an empty sequence.
 * An n-tuple is defined inductively using the construction of an ordered pair.
 * Mathematicians usually write tuples by listing the elements within parentheses and separated by commas; for example,(2, 7, 4, 1, 7) denotes a 5-tuple.
 * Sometimes other symbols are used to surround the elements, such as square brackets "[ ]" or angle brackets "< >". Braces "{ }" are only used in defining arrays in some programming languages such as Java and Visual Basic,
 * but not in mathematical expressions, as they are the standard notation for sets. The term tuplecan often occur when discussing other mathematical objects, such as vectors.
 * In computer science, tuples come in many forms. In dynamically typed languages, such as Lisp,
 * lists are commonly used as tuples.[citation needed] Most typed functional programming languages implement tuples directly as product types, tightly associated with algebraic data types,
 * pattern matching, and destructuring assignment.[2] Many programming languages offer an alternative to tuples, known as record types, featuring unordered elements accessed by label.
 * A few programming languages combine ordered tuple product types and unordered record types into a single construct, as in C structs and Haskell records.
 * Relational databases may formally identify their rows (records) as tuples.
 * Tuples also occur in relational algebra; when programming the semantic web with the Resource Description Framework (RDF); in linguistics; and in philosophy.
 *
 * Bit shifting is only possible for 32bit 2complement int in JavaScript
 * Other trailing indexes are used for Time dimension.
 *   10bit 512cols /20 = aprox 25bookyear
 *
 * We always start on level 0.0.0.0.* meaning we are always living in a TupleContext. The first TupleInstance of the First Tuple Definition node
 *  Tuple instances and Definitions have ONLY! td/tp relations towards the existing Tree-structure based FFL, not regular tree-nodes
 *  In abstract creating a TupleInstance of the First Tuple Definition within the model uses the same stateless object yet another TupleDefinition should use.
 *  So don't confuse these concepts with existing parent-child relations in FFL nodes.
 */

/**
 * Gedachten bij het implementeren van tuples:
 * Van tuple naar tuple *binnen eigen tupleDefinition* word de TupleLocatie gebruikt om berekeningen te doen
 * Van Niet tuple naar tuple worden alle values van alle tupleinstanties terug gegeven
 * van tuple naar niet tuple word de tuple naar 0 gezet (mits anders aangeven) (FirstTuple,LastTuple,MaxTuple,FirstTupleIn....)
 * Formules worden geparsed, daarin is de target(referenceFormula) een propertyReferentie.
 * Dit betekend dat er vantui deze manier gedacht moet worden met het parsen
 * De TargetProperty kan een tuple/niet tuple zijn, en daar moet rekening mee gehouden worden.
 * De YAxis word meegeven van de formule, als er naar een tuple variable referenced word, kan de geparsde formula vanuit een tuple
 * een andere uitwerking hebben dan vanuit een niet-tuple
 *
 * tuple    A: 1
 * tuple    X: A+1 -> a(x,y,z) + 1 = 2
 * variable L: A+1 -> a(x,y,z) + 1 = [1] + 1
 *
 * Een wrapper om de uitvragende Property?
 * TSUM herstellen en de logica verplaatsen naar de uitvragende formule
 * TSUM(tupleNaam) => TSUM(tupleDefinitionCount,propertyNaam,x,y,z)
 *
 * Bij het inlezen van een FFL model, tuple markeren als TupleDefinition
 * Alle kinderen daaronder totaan nieuwe tuple markeren als TupleProperty
 *
 * Bij het uitvragen van een TupleDefinition itereren over alle instanties
 */
const assert = require('assert')
const log = require('log6')
const INSTANCES_PER_TUPLE = 32;
const BITS_PER_TUPLE = 6;
const FIRST__TUPLE_START_BIT = 10;
const SECOND_TUPLE_START_BIT = FIRST__TUPLE_START_BIT + (1 * BITS_PER_TUPLE);
const THIRD__TUPLE_START_BIT = FIRST__TUPLE_START_BIT + (2 * BITS_PER_TUPLE);

const FIRST__LEVEL_TUPLE = 1 << FIRST__TUPLE_START_BIT;
const SECOND_LEVEL_TUPLE = 1 << SECOND_TUPLE_START_BIT;
const THIRD__LEVEL_TUPLE = 1 << THIRD__TUPLE_START_BIT;

/*
 * These bitmasks are used to extract the bits for a given n-Tuple (0011***)
 * e.g.
 *  0011000 & 001001 = 001000
 * after extracted 001000 bitshift result with corresponding tuple bit offset 001000 >> 3 = (BIN)001 = (HEX) 1
 *
 * so: (0011000 & 011001) >> 3 = (HEX)3
 */
const FIRST__LEVEL_BITMASK = parseInt("0000000000001111110000000000", 2);    //000129024
assert(parseInt("0000000000001111110000000000", 2) == 64512)
const SECOND_LEVEL_BITMASK = parseInt("0000001111110000000000000000", 2);    //008257536
assert(parseInt("0000001111110000000000000000", 2) == 4128768)
const THIRD__LEVEL_BITMASK = parseInt("1111110000000000000000000000", 2);    //528482304
assert(parseInt("1111110000000000000000000000", 2) == 264241152)
const FOURTH_LEVEL_BITMASK = parseInt("1111110000000000000000000000000000", 2);    //528482304
//assert(parseInt("1111110000000000000000000000000000", 2) == 264241152)

const indexes = []
for (var first = 0; first < INSTANCES_PER_TUPLE; first++) {
    indexes[first] = []
    for (var second = 0; second < INSTANCES_PER_TUPLE; second++) {
        indexes[first][second] = []
        for (var third = 0; third < INSTANCES_PER_TUPLE; third++) {
            indexes[first][second][third] = (FIRST__LEVEL_TUPLE * first) + (SECOND_LEVEL_TUPLE * second) + (THIRD__LEVEL_TUPLE * third)
        }
    }
}
/*
 * Check if values are valid
 */
for (var i = 0; i < INSTANCES_PER_TUPLE; i++) {
    for (var j = 0; j < INSTANCES_PER_TUPLE; j++) {
        for (var k = 0; k < INSTANCES_PER_TUPLE; k++) {
            const index = indexes[i][j][k];
            // log.info(((index & FIRST__LEVEL_BITMASK) >> FIRST__TUPLE_START_BIT) + ',' + ((index & SECOND_LEVEL_BITMASK) >> SECOND_TUPLE_START_BIT) + ',' + (index >> THIRD__TUPLE_START_BIT))
            assert.equal((index >> SECOND_TUPLE_START_BIT >> BITS_PER_TUPLE), (index >> THIRD__TUPLE_START_BIT))
            assert.equal((index >> SECOND_TUPLE_START_BIT >> BITS_PER_TUPLE), index >> FIRST__TUPLE_START_BIT >> BITS_PER_TUPLE >> BITS_PER_TUPLE)
        }
    }
}
//Nu de check voor corresponderende context. (matching bits.)
/*
 * bits that are used to check if a value is in there.
 * These are the bit masks used by the tuples 11-17,17-23,23-29 bits from the number
 *
 * So:(index)   00001000001101 belongs to
 *               0  1    *****
 *   (bitmask)  00001000000000
 *
 * So:(index)   01001000032321 does not belong to
 *               1  1    *****
 *   (bitmask)  00001000000000
 *
 * om te achterhalen of een index op interessant is voor een bepaalde tuple
 * voor 0,0,1 is matching 1,1,0 nodig. omdat  0,0,0 niet werkt met de & operator, dus inverse van zichzelf
 */
const matchings = []
const MAX_INVERSE_INT32 = ((1 << 20) - 1) << FIRST__TUPLE_START_BIT;//2147481600 , 111111111111111111100000000000
assert(parseInt("111111111111111111110000000000", 2) == ((1 << 20) - 1) << FIRST__TUPLE_START_BIT)

for (var first = 0; first < INSTANCES_PER_TUPLE; first++) {
    matchings[first] = []
    for (var second = 0; second < INSTANCES_PER_TUPLE; second++) {
        matchings[first][second] = []
        for (var third = 0; third < INSTANCES_PER_TUPLE; third++) {
            matchings[first][second][third] = MAX_INVERSE_INT32 - indexes[first][second][third]
        }
    }
}
/*
 * Test if the inverse masks result in 0.
 *0010 : 2
 *1101 :13
 *maar zou 121311xxx,
*/
for (var i = 0; i < INSTANCES_PER_TUPLE; i++) {
    for (var j = 0; j < INSTANCES_PER_TUPLE; j++) {
        for (var k = 0; k < INSTANCES_PER_TUPLE; k++) {
            const index = indexes[i][j][k];
            const m = matchings[i][j][k];
            assert.equal((index + Math.round(Math.random() * 100)) & MAX_INVERSE_INT32, index, 'index: ' + index.toString(2) + ' does not match ' + m.toString(2) + '::' + [i, j, k].toString())
        }
    }
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const start = {
    bitmask: FIRST__LEVEL_BITMASK,
    start_bit: FIRST__TUPLE_START_BIT,
    hash: 0,
    bin: (matchings[0][0][0]).toString(2),
    f: parseInt('11111111111110000000000000000', 2),
    f_bin: '111111111111110000000000000000',
    m: parseInt('0000000000000000000000000000000000', 2),
    m_bin: '0000000000000000000000000000000000',
    index: 0,
    uihash: pad(0, 3),
    display: '0000',
    depth: 0,
    deeper: []
}
start.base = start;
//p is the Jump from Tuple to Tuple
start.p = [start, start, start];

for (var first = 0; first < INSTANCES_PER_TUPLE; first++) {
    start.deeper[first] = {
        bitmask: SECOND_LEVEL_BITMASK,
        start_bit: SECOND_TUPLE_START_BIT,
        f: parseInt('11111110000001111110000000000', 2),
        m: parseInt('0000000000000000000000000000000000', 2) + parseInt('00000000000000000000000010000000000', 2) * first,
        bin: (matchings[first][0][0]).toString(2).substring(0, (matchings[first][0][0]).toString(2).length - 10),
        display: first + '000',
        base: start,
        depth: 1,
        index: first,
        uihash: pad(first, 3),
        hash: (FIRST__LEVEL_TUPLE * first),
        deeper: [],
        parent: start
    }
    //p is the Jump from Tuple to Tuple
    start.deeper[first].p = [start, start.deeper[first], start.deeper[first], start.deeper[first]];
    if (first > 0) start.deeper[first].previous = start.deeper[first - 1]
    if (first > 0) start.deeper[first - 1].next = start.deeper[first]

    for (var second = 0; second < INSTANCES_PER_TUPLE; second++) {
        start.deeper[first].deeper[second] = {
            base: start,
            f: (parseInt('0000001111111111110000000000', 2)),
            m: (parseInt('0000000000010000000000000000', 2) * second) + (parseInt('0000000000000000000010000000000', 2) * first),
            bin: (matchings[first][second][0]).toString(2),
            bitmask: THIRD__LEVEL_BITMASK,
            display: first + '' + second + '00',
            start_bit: THIRD__TUPLE_START_BIT,
            index: second,
            uihash: pad(second, 3),
            depth: 2,
            hash: (first * FIRST__LEVEL_TUPLE) + (SECOND_LEVEL_TUPLE * second),
            deeper: [],
            parent: start.deeper[first]
        }
        //p is the Jump from Tuple to Tuple
        start.deeper[first].deeper[second].p = [start, start.deeper[first], start.deeper[first].deeper[second], start.deeper[first].deeper[second]];
        if (second > 0) start.deeper[first].deeper[second].previous = start.deeper[first].deeper[second - 1]
        if (second > 0) start.deeper[first].deeper[second - 1].next = start.deeper[first].deeper[second]

        //this level is only used to set values, not to resolve them,
        for (var third = 0; third < INSTANCES_PER_TUPLE; third++) {
            start.deeper[first].deeper[second].deeper[third] = {
                base: start,
                /* f: (parseInt('0001111111111111111110000000000', 2)),*/
                /*  m: (parseInt('00000000000000000010000000000000000', 2) * second) + (parseInt('00000000000000000000000010000000000', 2) * first),
               bin: (matchings[first][second][third]).toString(2),*/
                bitmask: FOURTH_LEVEL_BITMASK,
                display: first + '' + second + '' + third + '0',
                start_bit: THIRD__TUPLE_START_BIT,
                index: third,
                depth: 3,
                uihash: pad(third, 3),
                hash: (first * FIRST__LEVEL_TUPLE) + (SECOND_LEVEL_TUPLE * second) + (THIRD__LEVEL_TUPLE * third),
                deeper: [],
                parent: start.deeper[first].deeper[second]
            }
            //p is the Jump from Tuple to Tuple
            start.deeper[first].deeper[second].deeper[third].p = [start, start.deeper[first], start.deeper[first].deeper[second], start.deeper[first].deeper[second].deeper[third]];

            if (third > 0) start.deeper[first].deeper[second].deeper[third].previous = start.deeper[first].deeper[second].deeper[third - 1]
            if (third > 0) start.deeper[first].deeper[second].deeper[third - 1].next = start.deeper[first].deeper[second].deeper[third]
        }
    }
}

/**
 *
 * return start values in given tuple
 * It would be nice to use the null-tuple(0instance) T(0,{*,}) as base
 * Since else we could only query 0,..* in this method.
 */
TVALUES = function(fIds, func, fId, x, y, z, v, m) {
    var current = y, returnValue = [];
    var tinstancecount = TINSTANCECOUNT(fIds, v, y);
    for (var i = 0; i <= tinstancecount; i++) {
        returnValue.push(func(fId, x, y.deeper[i], z, v, m));
    }
    /*   while (current && tinstancecount >= current.index) {
           var tempValue = func(fId, x, current, z, v);
           returnValue.push(tempValue);
           current = current.next;
       }*/
    return returnValue;
}
/**
 * TINSTANCECOUNT is 0 based. TCOUNT is the friendly 1based version
 */
TCOUNT = function(fIds, func, fId, x, y, z, v) {
    return TINSTANCECOUNT(fIds, v, y) + 1;
}
REVERSEYAXIS = function(index, y) {
    return (y.bitmask & index) >> y.start_bit
}

function indexToArray(index, y) {
    const repre = [(index & THIRD__LEVEL_BITMASK) >> THIRD__TUPLE_START_BIT, (index & SECOND_LEVEL_BITMASK) >> SECOND_TUPLE_START_BIT, (index & FIRST__LEVEL_BITMASK) >> FIRST__TUPLE_START_BIT];
    const match = [(y.m & THIRD__LEVEL_BITMASK) >> THIRD__TUPLE_START_BIT, (y.m & SECOND_LEVEL_BITMASK) >> SECOND_TUPLE_START_BIT, (y.m & FIRST__LEVEL_BITMASK) >> FIRST__TUPLE_START_BIT];
    log.info('input:' + repre + ' filter with : ' + (y.f >> 10).toString(2) + ' {' + match + "(" + y.depth + ',' + y.index + ")}" + ' gives:' + ((y.bitmask & index) >> y.start_bit))
}

//return tuplecount, get max tuple index given a (y) context.
//Conceptually, if a value exists in a given range. There is an Tuple-Instance
//Nested tuples start hash 0,0,0  So there is a Tuple instance on start three dimensions when a value is entered in the deepest level.
TINSTANCECOUNT = function(fIds, v, y) {
    var max = -1;
    //consider transforming into a bin-tree
    //Since the dimensions are Infinite, indexing becomes complex.
    for (var fid = 0; fid < fIds.length; fid++) {
        var fId = fIds[fid];
        const tempkeys = []
        var keys = Object.keys(v[fId]);
        //quick-fix remove NULL values..
        //when looking for the instance-count with Y provided we also have to filter keys that are in other contexts.
        //TODO: step1 ake key filter, with the bit-mask on y. context. rest keys are not interesting.
        //TODO: start make unit testIndex, testing this function only.
        //The Tuple-Dimension is 0based, All values are placed within the first Tulpe (or non-exsistant)
        //Meaning that Any value in the Tuple Instance implies a Tuple-Instance is created.
        //index: 0000001 makes TupleCount=0
        //no index: makes TupleCount=-1
        //index: 0100001: makes TupleCount=1
        //this y.root is too cheap. It is possible to have a nested tuple instance abc2 but not have abc0
        //So 0 is allowed when a Key has this prefix.
        //the .root affix is strange there just should be a value on the corresponding tuple range to confirm its existence

        for (var i = 0; i < keys.length; i++) {
            var obj = keys[i];
            const userKey = parseInt(obj);
            // the found value should have a meaning, should have a value in the tuple-range and should match parent mask
            //Why should it have a value in the Tuple-Range?
            //Is this the same as living in the Parent-Context..
            /*
             *   00000009
             *   00001101
             *   Oke inverse bitmask van me parent.
             *   ~0000 maakt 1111 die & ik met me eigen hash. Als die niet null opleverd. Dan hoort hij er niet thuis
             *
             */
            //this should match any tuple bits and validate it with the hash,
            //most important mistake is to math with the HASH, since it should match parent.hash
            //011        001
            //010 match  010 no match
            //first level just matching everything that does not have 2-tuple or 3-tuple keys
            //second level match everything on 1-tuple index. But should not have anything on the 3-tuple
            if ((v[fId][obj] != null) && (userKey & y.f) == y.m) {
                if (log.DEBUG) indexToArray(userKey, y)
                tempkeys.push(userKey)
            }
        }

        if (tempkeys.length == 0) {
            continue;
        }
        else if (tempkeys.length == 1) {
            max = Math.max(max, (y.bitmask & tempkeys[0]) >> y.start_bit);
        } else {
            max = Math.max(max, tempkeys.reduce(function(a1, b1) {
                //filter bits  y.start_bit find highest tuple count identified with y.bitmask
                //look for start values and obtain tuple instance value
                //we don't have to y.bitmask? its just >> y.start_bit
                return Math.max((y.bitmask & a1) >> y.start_bit, (y.bitmask & b1) >> y.start_bit);
            }))
        }
    }
    return max;
}
/*
 * Conceptually checks:
 * From here we will build the concept
 * 1-(2-tuple)
 * 2-(1-tuple)
 * 3-(0-tuple)
 * 4-(column10)
 * 5-(column01)
 * [1][2][3][4][5]
 *
 * The filter means the ** wildcard
 * The match means the tuple context
 */
//er is geen wens om 1*1 te testen, er word nooit gevraagd van hoeveeel tuples bijvoorbeeld 3tuples hebben.
const combine = [{
    reg: '000**', match: '00000', filter: '11100',
    fit: ['00010', '00011', '00001', '00000'],
    nofit: ['00110', '01110', '11110', '10110', '10010']
}, {
    reg: '001**', match: '00100', filter: '11100',
    fit: ['00110', '00111'],
    nofit: ['00010', '01010', '11010', '11110']
}, {
    reg: '011**', match: '01100', filter: '11100',
    fit: ['01100', '01101'], nofit: ['10100', '11100', '00100', '11000']
}, {
    reg: '010**', match: '01000', filter: '11100',
    fit: ['01010'],
    nofit: ['00010', '00000']
}, {
    reg: '11***', match: '11000', filter: '11000',
    fit: ['11000', '11100'],
    nofit: ['01100', '00000', '01100']
}, {//the first check, how many instances on root?
    reg: '00***', match: '00000', filter: '11000',
    fit: ['00000', '00001'],
    nofit: ['01100', '10000', '01100']
}, {
    reg: '01***', match: '01000', filter: '11000',
    fit: ['01000'], nofit: ['00000']
}, {
    reg: '1****', match: '10000', filter: '10000',
    fit: ['10101'], nofit: ['01000']
}]
for (var testIndex = 0; testIndex < combine.length; testIndex++) {
    const test = combine[testIndex];
    for (var i = 0; i < test.fit.length; i++) assert(((parseInt(test.fit[i], 2) & parseInt(test.filter, 2)) == parseInt(test.match, 2)))
    for (var i = 0; i < test.nofit.length; i++) assert(((parseInt(test.nofit[i], 2) & parseInt(test.filter, 2)) != parseInt(test.match, 2)))
}
/*
 * oke hoe maak ik nou zo'n object?
 * de sterretjes betekenen op beide filter als match een 0
 * de 0/1 betekend in match een kopie
 * de 0/1 betekend in filter een 1
 * De reg betekend T(0,0,0)
 *
 * De vragen die worden gesteld zijn: wat is YCount, gegeven index[] en Y
 * dus: Y heeft
 * t(R) = f(t*<R?1:0)
 * dus uit [t1,t2,t3] = filter: t1(R)+t2(R)+t3(R)+,00  e.g. hoeveel t2 in [1,0,*]? 110,00
 * dus uit [t1,t2,t3] =  match: t1t2t3+,00             e.g.               [1,0,*]? 100,00
 * uit gegeven [*,*,*] moet ik die twee dingen halen.
 *
 * Dus als ik wil weten hoeveel Y in [a,b,c]
 * Dan '1'.repeat(bits), voor 0,0,0 wil ik  111 filter en match 000, maar die bestaat dus niet
 * Dan '1'.repeat(bits), voor 0,1,0 wil ik  110 filter en match 110
 *
 * filter: 111111,111111,111111,0000000000 voor 0,0,0
 *  match: 000000,000000,000000,0000000000 voor 0,0,0 (word niet gebruikt, impliceert 0,0,0,*)
 * filter: 111111,111111,111111,0000000000 voor 0,0,1
 *  match: 000000,111111,000001,0000000000 voor 0,0,1 (word niet gebruikt, impliceert 0,0,0,*)
 * filter: 111111,111111,000000,0000000000 voor 0,0,*
 *  match: 000000,000000,000000,0000000000 voor 0,0,*
 * filter: 111111,000000,111111,0000000000 voor 0,*,1
 *  match: 000000,000000,000001,0000000000 voor 0,*,1
 *
 *  Filter geeft alleen aan in welke sector de max-waarde gezocht word. dat kan slot1,slot2,of slot3 zijn
 *  De Match geeft aan in welke context de vraag moet passen.
 *  011 & f(0,*,1) = m(0,1,1)
 *  001 & f(0,*,1) = m(0,1,1)
 *
 *  filter kan op het moment alleen *,*,* of *,0,* of 0,*,* zijn.
 *
 *  filter op level 0 = **. = 110
 *  filter op level 1 = *.* = 101
 *  filter op level 2 = .** = 011
 *
 *  Dus dat gaan we toevoegen aan het geheel
 */

//columns we need aprox 512 10bit
//53 total bits to use, 43bit for tuples, 8*8*8*8 (32bit) 8bit represent 128 instances. 4dimensions 128 instances. takes 32 bit
/*
 * It can grow into 5dimensions having 128instances each using 40bit, leaving 10bits for columns. We have to figure out operations without binair operators
 * A binair operator in javascript works until 32bits (4*8) So we have to calculate the index in a different way when exceeding these limits.
*/
module.exports = start.deeper;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-core\\src\\YAxis.js","/lme-core\\src",undefined)
},{"_process":38,"assert":33,"buffer":36,"log6":35}],33:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
'use strict';

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = require('util/');
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-model-api\\node_modules\\assert\\assert.js","/lme-model-api\\node_modules\\assert",undefined)
},{"_process":38,"buffer":36,"util/":41}],34:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-model-api\\node_modules\\base64-js\\index.js","/lme-model-api\\node_modules\\base64-js",undefined)
},{"_process":38,"buffer":36}],35:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-model-api\\node_modules\\browserify\\lib\\_empty.js","/lme-model-api\\node_modules\\browserify\\lib",undefined)
},{"_process":38,"buffer":36}],36:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('Invalid typed array length')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (isArrayBuffer(value)) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  return fromObject(value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj) {
    if (isArrayBufferView(obj) || 'length' in obj) {
      if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
        return createBuffer(0)
      }
      return fromArrayLike(obj)
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (isArrayBufferView(string) || isArrayBuffer(string)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : new Buffer(val, encoding)
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffers from another context (i.e. an iframe) do not pass the `instanceof` check
// but they should be treated as valid. See: https://github.com/feross/buffer/issues/166
function isArrayBuffer (obj) {
  return obj instanceof ArrayBuffer ||
    (obj != null && obj.constructor != null && obj.constructor.name === 'ArrayBuffer' &&
      typeof obj.byteLength === 'number')
}

// Node 0.10 supports `ArrayBuffer` but lacks `ArrayBuffer.isView`
function isArrayBufferView (obj) {
  return (typeof ArrayBuffer.isView === 'function') && ArrayBuffer.isView(obj)
}

function numberIsNaN (obj) {
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-model-api\\node_modules\\buffer\\index.js","/lme-model-api\\node_modules\\buffer",undefined)
},{"_process":38,"base64-js":34,"buffer":36,"ieee754":37}],37:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-model-api\\node_modules\\ieee754\\index.js","/lme-model-api\\node_modules\\ieee754",undefined)
},{"_process":38,"buffer":36}],38:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-model-api\\node_modules\\process\\browser.js","/lme-model-api\\node_modules\\process",undefined)
},{"_process":38,"buffer":36}],39:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-model-api\\node_modules\\util\\node_modules\\inherits\\inherits_browser.js","/lme-model-api\\node_modules\\util\\node_modules\\inherits",undefined)
},{"_process":38,"buffer":36}],40:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-model-api\\node_modules\\util\\support\\isBufferBrowser.js","/lme-model-api\\node_modules\\util\\support",undefined)
},{"_process":38,"buffer":36}],41:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-model-api\\node_modules\\util\\util.js","/lme-model-api\\node_modules\\util",undefined)
},{"./support/isBuffer":40,"_process":38,"buffer":36,"inherits":39}],42:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
Error.prototype.stack = Error.prototype.stack || "";

require('../../lme-core/exchange_modules/lme/lmeparser');
require('../../formulajs-connect');
require('../../lme-core/exchange_modules/jsonvalues/jsonvalues');
require('../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator');
require('../../math');
const CustomTimeModel = require('../../lme-core/src/TimeAxis');
const DEFAULT_MODELNAME = "SCORECARDTESTMODEL";
const CalculationFacade = require('../../lme-core').CalculationFacade;
CalculationFacade.addFunctions(require("../../formulajs-connect").formulajs);

function LmeAPI(TimeModel, Ctx, interval) {
    const Context = require('../../lme-core/src/Context');
    const WorkBook = require('../../lme-core/src/JSWorkBook');

    //TODO: the TimeModel is probably part of the Context object.
    this.lme = new WorkBook(Ctx || new Context(), TimeModel ? new CustomTimeModel(TimeModel) : require('../../lme-core/src/XAxis'), interval);
    this.modelName = undefined;
    this.urlPrefix = '';
}

LmeAPI.prototype.hasChanges = function() {
    return this.lme.context.hasChanges();
}
LmeAPI.prototype.getTimeViews = function() {
    return this.lme.getTimeViews();
}
LmeAPI.prototype.addFunctions = CalculationFacade.addFunctions;
LmeAPI.prototype.exportLME = function() {
    return this.lme.export('lme')
}
LmeAPI.prototype.importLME = function(json) {
    this.lme.importSolution(json, 'lme')
}
LmeAPI.prototype.exportJavaScript = function() {
    return this.lme.export('js')
}
/**
 * Not used in Client UI input rendering
 */
LmeAPI.prototype.importFFL = function(ffl) {
    this.lme.importSolution(ffl, 'ffl')
}
LmeAPI.prototype.setColumnOffset = function(delta) {
    this.lme.setColumnOffset(delta)
}
LmeAPI.prototype.exportFFL = function() {
    return this.lme.export('ffl')
}
LmeAPI.prototype.exportPresentation = function() {
    return this.lme.export('presentation')
}
LmeAPI.prototype.exportWebModel = function(rootNode) {
    return this.lme.export('webexport', rootNode)
}
LmeAPI.prototype.importWebModel = function(webDesign) {
    return this.lme.importSolution(webDesign, 'webexport')
}
LmeAPI.prototype.exportData = function() {
    return this.lme.export('jsonvalues')
}
LmeAPI.prototype.exportScreenDefinition = function(nodeId) {
    const rootNode = this.lme.getRootSolutionProperty()
    return this.lme.export('screendefinition', rootNode)
}
LmeAPI.prototype.importData = function(valueAsJSON) {
    this.lme.importSolution(valueAsJSON, 'jsonvalues')
}
/**
 * use modelName from this.lme.modelName
 * use token form this.lme.context.uuid
 */
LmeAPI.prototype.loadData = function(callBack, id) {
    var self = this;
    var params = window.location.href.split('#')
    if (params.length == 1) window.location.href = '#' + DEFAULT_MODELNAME + '&DEMO'
    var params = window.location.href.split('#')[1].split('&')
    self.modelName = params[0] || DEFAULT_MODELNAME;
    var userID = (params[1] || 'DEMO')

    self.lme.context.saveToken = userID;
    var http = new XMLHttpRequest();
    var url = self.urlPrefix + 'data/' + (id || userID);
    http.open("GET", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            var returnData = JSON.parse(http.responseText);
            self.lme.context.saveToken = returnData.id.indexOf(',') > 0 ? userID : returnData.id;
            self.importData(returnData)
            window.location.href = '#' + self.modelName + '&' + self.lme.context.saveToken
        }
    }
    http.onload = function() {
        self.lme.context.audit = []
        self.lme.context.calc_count++;
        callBack(http.responseText)
    };
    http.send();
    return http;
}

LmeAPI.prototype.persistData = function(callBack) {
    const self = this;
    //send data to server to store
    var params = window.location.href.split('#')
    if (params.length == 1) window.location.href = '#' + DEFAULT_MODELNAME + '&DEMO'
    var params = window.location.href.split('#')[1].split('&')
    self.modelName = params[0] || DEFAULT_MODELNAME;
    var userID = params[1] || 'DEMO'
    self.lme.context.saveToken = userID;
    var http = new XMLHttpRequest();
    http.open("POST", 'saveUserData/' + self.lme.context.saveToken, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.onreadystatechange = function() {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            const returnData = JSON.parse(http.responseText);
            self.lme.context.saveToken = returnData.saveToken;
            window.location.href = '#' + self.modelName + '&' + self.lme.context.saveToken
        }
    };
    http.onload = function() {
        self.lme.context.audit = []
        self.lme.context.calc_count++;
        callBack(http.responseText)
    };

    http.send(JSON.stringify({
        data: self.exportData()
    }));
    return http;
}
module.exports = LmeAPI;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-model-api\\src\\lme.js","/lme-model-api\\src",undefined)
},{"../../formulajs-connect":3,"../../lme-core":17,"../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator":11,"../../lme-core/exchange_modules/jsonvalues/jsonvalues":14,"../../lme-core/exchange_modules/lme/lmeparser":15,"../../lme-core/src/Context":20,"../../lme-core/src/JSWorkBook":24,"../../lme-core/src/TimeAxis":29,"../../lme-core/src/XAxis":31,"../../math":44,"_process":38,"buffer":36}],43:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var model = require('./lme')
log = {}
LMEMETA = new model()
LMEMETA.importLME(JSON_MODEL);//JSON_MODEL is injected by browserify
LME = LMEMETA.exportWebModel();
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lme-model-api\\src\\lmeAPIWrapper.js","/lme-model-api\\src",{"formulas":[{"type":"noCacheUnlocked","refs":{"LGD_root_value":true,"LGD_root_valid":true},"formulaDependencys":[{"name":"LGD_root_valid","association":"refs","refId":1002}],"deps":{},"original":"NA","index":1001,"name":"LGD_root_value","parsed":"NA","id":1001,"fflname":"root_value"},{"type":"noCacheLocked","refs":{"LGD_root_valid":true},"formulaDependencys":[{"name":"LGD_root_value","association":"deps","refId":1001}],"deps":{"LGD_root_value":true},"original":"If(!isNaN(OnNA(root,null)),'','Enter valid input.')","index":1002,"name":"LGD_root_valid","parsed":"!isNaN(OnNA(m[1001]('1001',x.doc,y.base,z,v,m),null))?'':'Enter valid input.'","id":1002,"fflname":"root_valid"},{"type":"noCacheUnlocked","refs":{"LGD_Q_variable root_value":true},"formulaDependencys":[],"deps":{},"original":"NA","index":1003,"name":"LGD_Q_variable root_value","parsed":"NA","id":1003,"fflname":"LGD_Q_variable root_value"},{"type":"noCacheLocked","refs":{"LGD_Q_variable root_valid":true},"formulaDependencys":[],"deps":{},"original":"'If(!isNaN(OnNA(Q_variable root,null)),\"\",\"Enter valid input.\")'","index":1004,"name":"LGD_Q_variable root_valid","parsed":"'If(!isNaN(OnNA(Q_variable root,null)),\"\",\"Enter valid input.\")'","id":1004,"fflname":"LGD_Q_variable root_valid"},{"type":"noCacheUnlocked","refs":{"LGD_LGDCalculationInputContainer_value":true},"formulaDependencys":[],"deps":{},"original":"''","index":1005,"name":"LGD_LGDCalculationInputContainer_value","parsed":"''","id":1005,"fflname":"LGDCalculationInputContainer_value"},{"type":"noCacheUnlocked","refs":{"LGD_LGDCalculationInputContainer_title":true},"formulaDependencys":[],"deps":{},"original":"'LGDCalculationInputContaine1r'","index":1006,"name":"LGD_LGDCalculationInputContainer_title","parsed":"'LGDCalculationInputContaine1r'","id":1006,"fflname":"LGDCalculationInputContainer_title"},{"type":"noCacheUnlocked","refs":{"LGD_FacilityInputContainer_value":true},"formulaDependencys":[],"deps":{},"original":"''","index":1007,"name":"LGD_FacilityInputContainer_value","parsed":"''","id":1007,"fflname":"FacilityInputContainer_value"},{"type":"noCacheUnlocked","refs":{"LGD_FacilityInputContainer_title":true},"formulaDependencys":[],"deps":{},"original":"'FacilityInputContainer'","index":1008,"name":"LGD_FacilityInputContainer_title","parsed":"'FacilityInputContainer'","id":1008,"fflname":"FacilityInputContainer_title"},{"type":"noCacheUnlocked","refs":{"LGD_RecoveryValue_value":true,"LGD_RecoveryValue_valid":true,"LGD_FacilityCoverageField_value":true,"LGD_DownturnLGDIncludingMOCField_value":true,"LGD_LGDIncludingMOCField_value":true,"LGD_BestEstimatedLGD_value":true},"formulaDependencys":[{"name":"LGD_CollateralECValue_value","association":"deps","refId":1018},{"name":"LGD_AllocationValue_value","association":"deps","refId":1013},{"name":"LGD_RecoveryValue_valid","association":"refs","refId":1010},{"name":"LGD_FacilityCoverageField_value","association":"refs","refId":1120},{"name":"LGD_DownturnLGDIncludingMOCField_value","association":"refs","refId":1125},{"name":"LGD_LGDIncludingMOCField_value","association":"refs","refId":1128},{"name":"LGD_BestEstimatedLGD_value","association":"refs","refId":1131}],"deps":{"LGD_CollateralECValue_value":true,"LGD_AllocationValue_value":true},"original":"TSUM(CollateralECValue)*AllocationValue","index":1009,"name":"LGD_RecoveryValue_value","parsed":"SUM(TVALUES([1018,1018,1022,1050],m[1018],'1018',x.doc,y.p[1],z,v,m))*m[1013]('1013',x.doc,y.base,z,v,m)","id":1009,"fflname":"RecoveryValue_value"},{"type":"noCacheLocked","refs":{"LGD_RecoveryValue_valid":true},"formulaDependencys":[{"name":"LGD_RecoveryValue_value","association":"deps","refId":1009}],"deps":{"LGD_RecoveryValue_value":true},"original":"If(!isNaN(OnNA(RecoveryValue,null)),'','Enter valid input.')","index":1010,"name":"LGD_RecoveryValue_valid","parsed":"!isNaN(OnNA(m[1009]('1009',x.doc,y.base,z,v,m),null))?'':'Enter valid input.'","id":1010,"fflname":"RecoveryValue_valid"},{"type":"noCacheUnlocked","refs":{"LGD_RecoveryValue_title":true},"formulaDependencys":[],"deps":{},"original":"'RecoveryValue'","index":1011,"name":"LGD_RecoveryValue_title","parsed":"'RecoveryValue'","id":1011,"fflname":"RecoveryValue_title"},{"type":"noCacheLocked","refs":{"LGD_RecoveryValue_locked":true},"formulaDependencys":[],"deps":{},"original":"1","index":1012,"name":"LGD_RecoveryValue_locked","parsed":"1","id":1012,"fflname":"RecoveryValue_locked"},{"type":"noCacheUnlocked","refs":{"LGD_AllocationValue_value":true,"LGD_RecoveryValue_value":true,"LGD_AllocationValue_valid":true},"formulaDependencys":[{"name":"LGD_RecoveryValue_value","association":"refs","refId":1009},{"name":"LGD_AllocationValue_valid","association":"refs","refId":1014}],"deps":{},"original":"1","index":1013,"name":"LGD_AllocationValue_value","parsed":"1","id":1013,"fflname":"AllocationValue_value"},{"type":"noCacheLocked","refs":{"LGD_AllocationValue_valid":true},"formulaDependencys":[{"name":"LGD_AllocationValue_value","association":"deps","refId":1013}],"deps":{"LGD_AllocationValue_value":true},"original":"If(!isNaN(OnNA(AllocationValue,null)),'','Enter valid input.')","index":1014,"name":"LGD_AllocationValue_valid","parsed":"!isNaN(OnNA(m[1013]('1013',x.doc,y.base,z,v,m),null))?'':'Enter valid input.'","id":1014,"fflname":"AllocationValue_valid"},{"type":"noCacheUnlocked","refs":{"LGD_AllocationValue_title":true},"formulaDependencys":[],"deps":{},"original":"'AllocationValue'","index":1015,"name":"LGD_AllocationValue_title","parsed":"'AllocationValue'","id":1015,"fflname":"AllocationValue_title"},{"type":"noCacheUnlocked","refs":{"LGD_CollateralAgreementContainer_value":true},"formulaDependencys":[],"deps":{},"original":"''","index":1016,"name":"LGD_CollateralAgreementContainer_value","parsed":"''","id":1016,"fflname":"CollateralAgreementContainer_value"},{"type":"noCacheUnlocked","refs":{"LGD_CollateralAgreementContainer_title":true},"formulaDependencys":[],"deps":{},"original":"'CollateralAgreementContainer'","index":1017,"name":"LGD_CollateralAgreementContainer_title","parsed":"'CollateralAgreementContainer'","id":1017,"fflname":"CollateralAgreementContainer_title"},{"type":"noCacheUnlocked","refs":{"LGD_CollateralECValue_value":true,"LGD_RecoveryValue_value":true,"LGD_CollateralECValue_valid":true},"formulaDependencys":[{"name":"LGD_RecoveryValue_value","association":"refs","refId":1009},{"name":"LGD_CollateralObjectECValue_value","association":"deps","refId":1046},{"name":"LGD_SecuredAmount_value","association":"deps","refId":1058},{"name":"LGD_CollateralECValue_valid","association":"refs","refId":1019}],"deps":{"LGD_CollateralObjectECValue_value":true,"LGD_SecuredAmount_value":true},"original":"MIN(SecuredAmount,TSUM(CollateralObjectECValue))","index":1018,"name":"LGD_CollateralECValue_value","parsed":"Math.min(m[1058]('1058',x.doc,y.p[1],z,v,m),SUM(TVALUES([1046,1024,1046],m[1046],'1046',x.doc,y.p[2],z,v,m)))","id":1018,"fflname":"CollateralECValue_value"},{"type":"noCacheLocked","refs":{"LGD_CollateralECValue_valid":true},"formulaDependencys":[{"name":"LGD_CollateralECValue_value","association":"deps","refId":1018}],"deps":{"LGD_CollateralECValue_value":true},"original":"If(!isNaN(OnNA(CollateralECValue,null)),'','Enter valid input.')","index":1019,"name":"LGD_CollateralECValue_valid","parsed":"!isNaN(OnNA(m[1018]('1018',x.doc,y.p[1],z,v,m),null))?'':'Enter valid input.'","id":1019,"fflname":"CollateralECValue_valid"},{"type":"noCacheUnlocked","refs":{"LGD_CollateralECValue_title":true},"formulaDependencys":[],"deps":{},"original":"'Collateral EC Value'","index":1020,"name":"LGD_CollateralECValue_title","parsed":"'Collateral EC Value'","id":1020,"fflname":"CollateralECValue_title"},{"type":"noCacheLocked","refs":{"LGD_CollateralECValue_locked":true},"formulaDependencys":[],"deps":{},"original":"1","index":1021,"name":"LGD_CollateralECValue_locked","parsed":"1","id":1021,"fflname":"CollateralECValue_locked"},{"type":"noCacheUnlocked","refs":{"LGD_RegistrationContainer_value":true},"formulaDependencys":[],"deps":{},"original":"''","index":1022,"name":"LGD_RegistrationContainer_value","parsed":"''","id":1022,"fflname":"RegistrationContainer_value"},{"type":"noCacheUnlocked","refs":{"LGD_RegistrationContainer_title":true},"formulaDependencys":[],"deps":{},"original":"'RegistrationContainer'","index":1023,"name":"LGD_RegistrationContainer_title","parsed":"'RegistrationContainer'","id":1023,"fflname":"RegistrationContainer_title"},{"type":"noCacheUnlocked","refs":{"LGD_CollateralObject_value":true},"formulaDependencys":[],"deps":{},"original":"''","index":1024,"name":"LGD_CollateralObject_value","parsed":"''","id":1024,"fflname":"CollateralObject_value"},{"type":"noCacheUnlocked","refs":{"LGD_CollateralObject_title":true},"formulaDependencys":[],"deps":{},"original":"'CollateralObject'","index":1025,"name":"LGD_CollateralObject_title","parsed":"'CollateralObject'","id":1025,"fflname":"CollateralObject_title"},{"type":"noCacheUnlocked","refs":{"LGD_CollateralObjectReferenceNumber_value":true,"LGD_CollateralObjectReferenceNumber_valid":true},"formulaDependencys":[{"name":"LGD_CollateralObjectReferenceNumber_valid","association":"refs","refId":1027}],"deps":{},"original":"''","index":1026,"name":"LGD_CollateralObjectReferenceNumber_value","parsed":"''","id":1026,"fflname":"CollateralObjectReferenceNumber_value"},{"type":"noCacheLocked","refs":{"LGD_CollateralObjectReferenceNumber_valid":true},"formulaDependencys":[{"name":"LGD_CollateralObjectReferenceNumber_value","association":"deps","refId":1026}],"deps":{"LGD_CollateralObjectReferenceNumber_value":true},"original":"If(CollateralObjectReferenceNumber<=128,'','Enter valid input.')","index":1027,"name":"LGD_CollateralObjectReferenceNumber_valid","parsed":"m[1026]('1026',x.doc,y.p[2],z,v,m)<=128?'':'Enter valid input.'","id":1027,"fflname":"CollateralObjectReferenceNumber_valid"},{"type":"noCacheUnlocked","refs":{"LGD_CollateralObjectReferenceNumber_title":true},"formulaDependencys":[],"deps":{},"original":"'CollateralObjectReferenceNumber'","index":1028,"name":"LGD_CollateralObjectReferenceNumber_title","parsed":"'CollateralObjectReferenceNumber'","id":1028,"fflname":"CollateralObjectReferenceNumber_title"},{"type":"noCacheUnlocked","refs":{"LGD_DefinitionCode_value":true,"LGD_DefinitionCode_valid":true},"formulaDependencys":[{"name":"LGD_DefinitionCode_valid","association":"refs","refId":1030}],"deps":{},"original":"''","index":1029,"name":"LGD_DefinitionCode_value","parsed":"''","id":1029,"fflname":"DefinitionCode_value"},{"type":"noCacheLocked","refs":{"LGD_DefinitionCode_valid":true},"formulaDependencys":[{"name":"LGD_DefinitionCode_value","association":"deps","refId":1029}],"deps":{"LGD_DefinitionCode_value":true},"original":"If(DefinitionCode<=255,'','Enter valid input.')","index":1030,"name":"LGD_DefinitionCode_valid","parsed":"m[1029]('1029',x.doc,y.p[2],z,v,m)<=255?'':'Enter valid input.'","id":1030,"fflname":"DefinitionCode_valid"},{"type":"noCacheUnlocked","refs":{"LGD_DefinitionCode_title":true},"formulaDependencys":[],"deps":{},"original":"'DefinitionCode'","index":1031,"name":"LGD_DefinitionCode_title","parsed":"'DefinitionCode'","id":1031,"fflname":"DefinitionCode_title"},{"type":"noCacheUnlocked","refs":{"LGD_MarketValue_value":true,"LGD_CollateralObjectECValue_value":true},"formulaDependencys":[{"name":"LGD_CollateralObjectECValue_value","association":"refs","refId":1046}],"deps":{},"original":"''","index":1032,"name":"LGD_MarketValue_value","parsed":"''","id":1032,"fflname":"MarketValue_value"},{"type":"noCacheUnlocked","refs":{"LGD_MarketValue_title":true},"formulaDependencys":[],"deps":{},"original":"'MarketValue'","index":1033,"name":"LGD_MarketValue_title","parsed":"'MarketValue'","id":1033,"fflname":"MarketValue_title"},{"type":"noCacheUnlocked","refs":{"LGD_Currency_value":true,"LGD_Currency_valid":true},"formulaDependencys":[{"name":"LGD_Currency_valid","association":"refs","refId":1035}],"deps":{},"original":"''","index":1034,"name":"LGD_Currency_value","parsed":"''","id":1034,"fflname":"Currency_value"},{"type":"noCacheLocked","refs":{"LGD_Currency_valid":true},"formulaDependencys":[{"name":"LGD_Currency_value","association":"deps","refId":1034}],"deps":{"LGD_Currency_value":true},"original":"If(Currency<=10,'','Enter valid input.')","index":1035,"name":"LGD_Currency_valid","parsed":"m[1034]('1034',x.doc,y.p[2],z,v,m)<=10?'':'Enter valid input.'","id":1035,"fflname":"Currency_valid"},{"type":"noCacheUnlocked","refs":{"LGD_Currency_title":true},"formulaDependencys":[],"deps":{},"original":"'Currency'","index":1036,"name":"LGD_Currency_title","parsed":"'Currency'","id":1036,"fflname":"Currency_title"},{"type":"noCacheUnlocked","refs":{"LGD_Amount_value":true,"LGD_Amount_valid":true},"formulaDependencys":[{"name":"LGD_Amount_valid","association":"refs","refId":1038}],"deps":{},"original":"NA","index":1037,"name":"LGD_Amount_value","parsed":"NA","id":1037,"fflname":"Amount_value"},{"type":"noCacheLocked","refs":{"LGD_Amount_valid":true},"formulaDependencys":[{"name":"LGD_Amount_value","association":"deps","refId":1037}],"deps":{"LGD_Amount_value":true},"original":"If(!isNaN(OnNA(Amount,null)),'','Enter valid input.')","index":1038,"name":"LGD_Amount_valid","parsed":"!isNaN(OnNA(m[1037]('1037',x.doc,y.p[2],z,v,m),null))?'':'Enter valid input.'","id":1038,"fflname":"Amount_valid"},{"type":"noCacheUnlocked","refs":{"LGD_Amount_title":true},"formulaDependencys":[],"deps":{},"original":"'Amount'","index":1039,"name":"LGD_Amount_title","parsed":"'Amount'","id":1039,"fflname":"Amount_title"},{"type":"noCacheUnlocked","refs":{"LGD_OtherRank_value":true,"LGD_OtherRank_valid":true,"LGD_CollateralObjectECValue_value":true},"formulaDependencys":[{"name":"LGD_OtherRank_valid","association":"refs","refId":1041},{"name":"LGD_CollateralObjectECValue_value","association":"refs","refId":1046}],"deps":{},"original":"NA","index":1040,"name":"LGD_OtherRank_value","parsed":"NA","id":1040,"fflname":"OtherRank_value"},{"type":"noCacheLocked","refs":{"LGD_OtherRank_valid":true},"formulaDependencys":[{"name":"LGD_OtherRank_value","association":"deps","refId":1040}],"deps":{"LGD_OtherRank_value":true},"original":"If(!isNaN(OnNA(OtherRank,null)),'','Enter valid input.')","index":1041,"name":"LGD_OtherRank_valid","parsed":"!isNaN(OnNA(m[1040]('1040',x.doc,y.p[2],z,v,m),null))?'':'Enter valid input.'","id":1041,"fflname":"OtherRank_valid"},{"type":"noCacheUnlocked","refs":{"LGD_OtherRank_title":true},"formulaDependencys":[],"deps":{},"original":"'OtherRank'","index":1042,"name":"LGD_OtherRank_title","parsed":"'OtherRank'","id":1042,"fflname":"OtherRank_title"},{"type":"noCacheUnlocked","refs":{"LGD_Discount_value":true,"LGD_Discount_valid":true,"LGD_CollateralObjectECValue_value":true},"formulaDependencys":[{"name":"LGD_Discount_valid","association":"refs","refId":1044},{"name":"LGD_CollateralObjectECValue_value","association":"refs","refId":1046}],"deps":{},"original":"NA","index":1043,"name":"LGD_Discount_value","parsed":"NA","id":1043,"fflname":"Discount_value"},{"type":"noCacheLocked","refs":{"LGD_Discount_valid":true},"formulaDependencys":[{"name":"LGD_Discount_value","association":"deps","refId":1043}],"deps":{"LGD_Discount_value":true},"original":"If(!isNaN(OnNA(Discount,null)),'','Enter valid input.')","index":1044,"name":"LGD_Discount_valid","parsed":"!isNaN(OnNA(m[1043]('1043',x.doc,y.p[2],z,v,m),null))?'':'Enter valid input.'","id":1044,"fflname":"Discount_valid"},{"type":"noCacheUnlocked","refs":{"LGD_Discount_title":true},"formulaDependencys":[],"deps":{},"original":"'Discount'","index":1045,"name":"LGD_Discount_title","parsed":"'Discount'","id":1045,"fflname":"Discount_title"},{"type":"noCacheUnlocked","refs":{"LGD_CollateralObjectECValue_value":true,"LGD_CollateralECValue_value":true,"LGD_CollateralObjectECValue_valid":true},"formulaDependencys":[{"name":"LGD_CollateralECValue_value","association":"refs","refId":1018},{"name":"LGD_MarketValue_value","association":"deps","refId":1032},{"name":"LGD_OtherRank_value","association":"deps","refId":1040},{"name":"LGD_Discount_value","association":"deps","refId":1043},{"name":"LGD_CollateralObjectECValue_valid","association":"refs","refId":1047}],"deps":{"LGD_MarketValue_value":true,"LGD_OtherRank_value":true,"LGD_Discount_value":true},"original":"MarketValue*.9-If(OtherRank>NA,NA,Discount)","index":1046,"name":"LGD_CollateralObjectECValue_value","parsed":"m[1032]('1032',x.doc,y.p[2],z,v,m)*.9-(m[1040]('1040',x.doc,y.p[2],z,v,m)>NA?NA:m[1043]('1043',x.doc,y.p[2],z,v,m))","id":1046,"fflname":"CollateralObjectECValue_value"},{"type":"noCacheLocked","refs":{"LGD_CollateralObjectECValue_valid":true},"formulaDependencys":[{"name":"LGD_CollateralObjectECValue_value","association":"deps","refId":1046}],"deps":{"LGD_CollateralObjectECValue_value":true},"original":"If(!isNaN(OnNA(CollateralObjectECValue,null)),'','Enter valid input.')","index":1047,"name":"LGD_CollateralObjectECValue_valid","parsed":"!isNaN(OnNA(m[1046]('1046',x.doc,y.p[2],z,v,m),null))?'':'Enter valid input.'","id":1047,"fflname":"CollateralObjectECValue_valid"},{"type":"noCacheUnlocked","refs":{"LGD_CollateralObjectECValue_title":true},"formulaDependencys":[],"deps":{},"original":"'CollateralObjectECValue'","index":1048,"name":"LGD_CollateralObjectECValue_title","parsed":"'CollateralObjectECValue'","id":1048,"fflname":"CollateralObjectECValue_title"},{"type":"noCacheLocked","refs":{"LGD_CollateralObjectECValue_locked":true},"formulaDependencys":[],"deps":{},"original":"1","index":1049,"name":"LGD_CollateralObjectECValue_locked","parsed":"1","id":1049,"fflname":"CollateralObjectECValue_locked"},{"type":"noCacheUnlocked","refs":{"LGD_CollateralAgreement_value":true,"LGD_LGDCalculationOutputContainer_value":true},"formulaDependencys":[{"name":"LGD_LGDCalculationOutputContainer_value","association":"refs","refId":1108}],"deps":{},"original":"''","index":1050,"name":"LGD_CollateralAgreement_value","parsed":"''","id":1050,"fflname":"CollateralAgreement_value"},{"type":"noCacheUnlocked","refs":{"LGD_CollateralAgreement_title":true},"formulaDependencys":[],"deps":{},"original":"'CollateralAgreement'","index":1051,"name":"LGD_CollateralAgreement_title","parsed":"'CollateralAgreement'","id":1051,"fflname":"CollateralAgreement_title"},{"type":"noCacheUnlocked","refs":{"LGD_CollateralAgreementReferenceNumber_value":true,"LGD_CollateralAgreementReferenceNumber_valid":true},"formulaDependencys":[{"name":"LGD_CollateralAgreementReferenceNumber_valid","association":"refs","refId":1053}],"deps":{},"original":"''","index":1052,"name":"LGD_CollateralAgreementReferenceNumber_value","parsed":"''","id":1052,"fflname":"CollateralAgreementReferenceNumber_value"},{"type":"noCacheLocked","refs":{"LGD_CollateralAgreementReferenceNumber_valid":true},"formulaDependencys":[{"name":"LGD_CollateralAgreementReferenceNumber_value","association":"deps","refId":1052}],"deps":{"LGD_CollateralAgreementReferenceNumber_value":true},"original":"If(CollateralAgreementReferenceNumber<=128,'','Enter valid input.')","index":1053,"name":"LGD_CollateralAgreementReferenceNumber_valid","parsed":"m[1052]('1052',x.doc,y.p[1],z,v,m)<=128?'':'Enter valid input.'","id":1053,"fflname":"CollateralAgreementReferenceNumber_valid"},{"type":"noCacheUnlocked","refs":{"LGD_CollateralAgreementReferenceNumber_title":true},"formulaDependencys":[],"deps":{},"original":"'CollateralAgreementReferenceNumber'","index":1054,"name":"LGD_CollateralAgreementReferenceNumber_title","parsed":"'CollateralAgreementReferenceNumber'","id":1054,"fflname":"CollateralAgreementReferenceNumber_title"},{"type":"noCacheUnlocked","refs":{"LGD_CollateralAgreementDefinitionCode_value":true,"LGD_CollateralAgreementDefinitionCode_valid":true},"formulaDependencys":[{"name":"LGD_CollateralAgreementDefinitionCode_valid","association":"refs","refId":1056}],"deps":{},"original":"''","index":1055,"name":"LGD_CollateralAgreementDefinitionCode_value","parsed":"''","id":1055,"fflname":"CollateralAgreementDefinitionCode_value"},{"type":"noCacheLocked","refs":{"LGD_CollateralAgreementDefinitionCode_valid":true},"formulaDependencys":[{"name":"LGD_CollateralAgreementDefinitionCode_value","association":"deps","refId":1055}],"deps":{"LGD_CollateralAgreementDefinitionCode_value":true},"original":"If(CollateralAgreementDefinitionCode<=255,'','Enter valid input.')","index":1056,"name":"LGD_CollateralAgreementDefinitionCode_valid","parsed":"m[1055]('1055',x.doc,y.p[1],z,v,m)<=255?'':'Enter valid input.'","id":1056,"fflname":"CollateralAgreementDefinitionCode_valid"},{"type":"noCacheUnlocked","refs":{"LGD_CollateralAgreementDefinitionCode_title":true},"formulaDependencys":[],"deps":{},"original":"'CollateralAgreementDefinitionCode'","index":1057,"name":"LGD_CollateralAgreementDefinitionCode_title","parsed":"'CollateralAgreementDefinitionCode'","id":1057,"fflname":"CollateralAgreementDefinitionCode_title"},{"type":"noCacheUnlocked","refs":{"LGD_SecuredAmount_value":true,"LGD_CollateralECValue_value":true},"formulaDependencys":[{"name":"LGD_CollateralECValue_value","association":"refs","refId":1018}],"deps":{},"original":"''","index":1058,"name":"LGD_SecuredAmount_value","parsed":"''","id":1058,"fflname":"SecuredAmount_value"},{"type":"noCacheUnlocked","refs":{"LGD_SecuredAmount_title":true},"formulaDependencys":[],"deps":{},"original":"'SecuredAmount'","index":1059,"name":"LGD_SecuredAmount_title","parsed":"'SecuredAmount'","id":1059,"fflname":"SecuredAmount_title"},{"type":"noCacheUnlocked","refs":{"LGD_SecuredAmountCurrency_value":true,"LGD_SecuredAmountCurrency_valid":true},"formulaDependencys":[{"name":"LGD_SecuredAmountCurrency_valid","association":"refs","refId":1061}],"deps":{},"original":"''","index":1060,"name":"LGD_SecuredAmountCurrency_value","parsed":"''","id":1060,"fflname":"SecuredAmountCurrency_value"},{"type":"noCacheLocked","refs":{"LGD_SecuredAmountCurrency_valid":true},"formulaDependencys":[{"name":"LGD_SecuredAmountCurrency_value","association":"deps","refId":1060}],"deps":{"LGD_SecuredAmountCurrency_value":true},"original":"If(SecuredAmountCurrency<=10,'','Enter valid input.')","index":1061,"name":"LGD_SecuredAmountCurrency_valid","parsed":"m[1060]('1060',x.doc,y.p[1],z,v,m)<=10?'':'Enter valid input.'","id":1061,"fflname":"SecuredAmountCurrency_valid"},{"type":"noCacheUnlocked","refs":{"LGD_SecuredAmountCurrency_title":true},"formulaDependencys":[],"deps":{},"original":"'SecuredAmountCurrency'","index":1062,"name":"LGD_SecuredAmountCurrency_title","parsed":"'SecuredAmountCurrency'","id":1062,"fflname":"SecuredAmountCurrency_title"},{"type":"noCacheUnlocked","refs":{"LGD_CollateralAgreementAmount_value":true,"LGD_CollateralAgreementAmount_valid":true},"formulaDependencys":[{"name":"LGD_CollateralAgreementAmount_valid","association":"refs","refId":1064}],"deps":{},"original":"NA","index":1063,"name":"LGD_CollateralAgreementAmount_value","parsed":"NA","id":1063,"fflname":"CollateralAgreementAmount_value"},{"type":"noCacheLocked","refs":{"LGD_CollateralAgreementAmount_valid":true},"formulaDependencys":[{"name":"LGD_CollateralAgreementAmount_value","association":"deps","refId":1063}],"deps":{"LGD_CollateralAgreementAmount_value":true},"original":"If(!isNaN(OnNA(CollateralAgreementAmount,null)),'','Enter valid input.')","index":1064,"name":"LGD_CollateralAgreementAmount_valid","parsed":"!isNaN(OnNA(m[1063]('1063',x.doc,y.p[1],z,v,m),null))?'':'Enter valid input.'","id":1064,"fflname":"CollateralAgreementAmount_valid"},{"type":"noCacheUnlocked","refs":{"LGD_CollateralAgreementAmount_title":true},"formulaDependencys":[],"deps":{},"original":"'CollateralAgreementAmount'","index":1065,"name":"LGD_CollateralAgreementAmount_title","parsed":"'CollateralAgreementAmount'","id":1065,"fflname":"CollateralAgreementAmount_title"},{"type":"noCacheUnlocked","refs":{"LGD_FacilityDetails_value":true},"formulaDependencys":[],"deps":{},"original":"''","index":1066,"name":"LGD_FacilityDetails_value","parsed":"''","id":1066,"fflname":"FacilityDetails_value"},{"type":"noCacheUnlocked","refs":{"LGD_FacilityDetails_title":true},"formulaDependencys":[],"deps":{},"original":"'FacilityDetails'","index":1067,"name":"LGD_FacilityDetails_title","parsed":"'FacilityDetails'","id":1067,"fflname":"FacilityDetails_title"},{"type":"noCacheUnlocked","refs":{"LGD_FacilityIdentification_value":true},"formulaDependencys":[],"deps":{},"original":"''","index":1068,"name":"LGD_FacilityIdentification_value","parsed":"''","id":1068,"fflname":"FacilityIdentification_value"},{"type":"noCacheUnlocked","refs":{"LGD_FacilityIdentification_title":true},"formulaDependencys":[],"deps":{},"original":"'FacilityIdentification'","index":1069,"name":"LGD_FacilityIdentification_title","parsed":"'FacilityIdentification'","id":1069,"fflname":"FacilityIdentification_title"},{"type":"noCacheUnlocked","refs":{"LGD_ReferenceId_value":true,"LGD_ReferenceId_valid":true},"formulaDependencys":[{"name":"LGD_ReferenceId_valid","association":"refs","refId":1071}],"deps":{},"original":"''","index":1070,"name":"LGD_ReferenceId_value","parsed":"''","id":1070,"fflname":"ReferenceId_value"},{"type":"noCacheLocked","refs":{"LGD_ReferenceId_valid":true},"formulaDependencys":[{"name":"LGD_ReferenceId_value","association":"deps","refId":1070}],"deps":{"LGD_ReferenceId_value":true},"original":"If(ReferenceId<=128,'','Enter valid input.')","index":1071,"name":"LGD_ReferenceId_valid","parsed":"m[1070]('1070',x.doc,y.base,z,v,m)<=128?'':'Enter valid input.'","id":1071,"fflname":"ReferenceId_valid"},{"type":"noCacheUnlocked","refs":{"LGD_ReferenceId_title":true},"formulaDependencys":[],"deps":{},"original":"'ReferenceId'","index":1072,"name":"LGD_ReferenceId_title","parsed":"'ReferenceId'","id":1072,"fflname":"ReferenceId_title"},{"type":"noCacheUnlocked","refs":{"LGD_DisplayId_value":true,"LGD_DisplayId_valid":true},"formulaDependencys":[{"name":"LGD_DisplayId_valid","association":"refs","refId":1074}],"deps":{},"original":"''","index":1073,"name":"LGD_DisplayId_value","parsed":"''","id":1073,"fflname":"DisplayId_value"},{"type":"noCacheLocked","refs":{"LGD_DisplayId_valid":true},"formulaDependencys":[{"name":"LGD_DisplayId_value","association":"deps","refId":1073}],"deps":{"LGD_DisplayId_value":true},"original":"If(DisplayId<=128,'','Enter valid input.')","index":1074,"name":"LGD_DisplayId_valid","parsed":"m[1073]('1073',x.doc,y.base,z,v,m)<=128?'':'Enter valid input.'","id":1074,"fflname":"DisplayId_valid"},{"type":"noCacheUnlocked","refs":{"LGD_DisplayId_title":true},"formulaDependencys":[],"deps":{},"original":"'DisplayId'","index":1075,"name":"LGD_DisplayId_title","parsed":"'DisplayId'","id":1075,"fflname":"DisplayId_title"},{"type":"noCacheUnlocked","refs":{"LGD_FacilityDefinitionCode_value":true,"LGD_FacilityDefinitionCode_valid":true},"formulaDependencys":[{"name":"LGD_FacilityDefinitionCode_valid","association":"refs","refId":1077}],"deps":{},"original":"''","index":1076,"name":"LGD_FacilityDefinitionCode_value","parsed":"''","id":1076,"fflname":"FacilityDefinitionCode_value"},{"type":"noCacheLocked","refs":{"LGD_FacilityDefinitionCode_valid":true},"formulaDependencys":[{"name":"LGD_FacilityDefinitionCode_value","association":"deps","refId":1076}],"deps":{"LGD_FacilityDefinitionCode_value":true},"original":"If(FacilityDefinitionCode<=255,'','Enter valid input.')","index":1077,"name":"LGD_FacilityDefinitionCode_valid","parsed":"m[1076]('1076',x.doc,y.base,z,v,m)<=255?'':'Enter valid input.'","id":1077,"fflname":"FacilityDefinitionCode_valid"},{"type":"noCacheUnlocked","refs":{"LGD_FacilityDefinitionCode_title":true},"formulaDependencys":[],"deps":{},"original":"'FacilityDefinitionCode'","index":1078,"name":"LGD_FacilityDefinitionCode_title","parsed":"'FacilityDefinitionCode'","id":1078,"fflname":"FacilityDefinitionCode_title"},{"type":"noCacheUnlocked","refs":{"LGD_LimitDetails_value":true},"formulaDependencys":[],"deps":{},"original":"''","index":1079,"name":"LGD_LimitDetails_value","parsed":"''","id":1079,"fflname":"LimitDetails_value"},{"type":"noCacheUnlocked","refs":{"LGD_LimitDetails_title":true},"formulaDependencys":[],"deps":{},"original":"'LimitDetails'","index":1080,"name":"LGD_LimitDetails_title","parsed":"'LimitDetails'","id":1080,"fflname":"LimitDetails_title"},{"type":"noCacheUnlocked","refs":{"LGD_Limiet_value":true,"LGD_Limiet_valid":true,"LGD_ExposureAtDefault_value":true},"formulaDependencys":[{"name":"LGD_Limiet_valid","association":"refs","refId":1082},{"name":"LGD_ExposureAtDefault_value","association":"refs","refId":1084}],"deps":{},"original":"NA","index":1081,"name":"LGD_Limiet_value","parsed":"NA","id":1081,"fflname":"Limiet_value"},{"type":"noCacheLocked","refs":{"LGD_Limiet_valid":true},"formulaDependencys":[{"name":"LGD_Limiet_value","association":"deps","refId":1081}],"deps":{"LGD_Limiet_value":true},"original":"If(!isNaN(OnNA(Limiet,null)),'','Enter valid input.')","index":1082,"name":"LGD_Limiet_valid","parsed":"!isNaN(OnNA(m[1081]('1081',x.doc,y.base,z,v,m),null))?'':'Enter valid input.'","id":1082,"fflname":"Limiet_valid"},{"type":"noCacheUnlocked","refs":{"LGD_Limiet_title":true},"formulaDependencys":[],"deps":{},"original":"'Limiet'","index":1083,"name":"LGD_Limiet_title","parsed":"'Limiet'","id":1083,"fflname":"Limiet_title"},{"type":"noCacheUnlocked","refs":{"LGD_ExposureAtDefault_value":true,"LGD_ExposureAtDefault_valid":true},"formulaDependencys":[{"name":"LGD_Limiet_value","association":"deps","refId":1081},{"name":"LGD_ExpectedLimitUsage_value","association":"deps","refId":1087},{"name":"LGD_ExposureAtDefault_valid","association":"refs","refId":1085}],"deps":{"LGD_Limiet_value":true,"LGD_ExpectedLimitUsage_value":true},"original":"Limiet*ExpectedLimitUsage","index":1084,"name":"LGD_ExposureAtDefault_value","parsed":"m[1081]('1081',x.doc,y.base,z,v,m)*m[1087]('1087',x.doc,y.base,z,v,m)","id":1084,"fflname":"ExposureAtDefault_value"},{"type":"noCacheLocked","refs":{"LGD_ExposureAtDefault_valid":true},"formulaDependencys":[{"name":"LGD_ExposureAtDefault_value","association":"deps","refId":1084}],"deps":{"LGD_ExposureAtDefault_value":true},"original":"If(!isNaN(OnNA(ExposureAtDefault,null)),'','Enter valid input.')","index":1085,"name":"LGD_ExposureAtDefault_valid","parsed":"!isNaN(OnNA(m[1084]('1084',x.doc,y.base,z,v,m),null))?'':'Enter valid input.'","id":1085,"fflname":"ExposureAtDefault_valid"},{"type":"noCacheUnlocked","refs":{"LGD_ExposureAtDefault_title":true},"formulaDependencys":[],"deps":{},"original":"'Limiet * percentage'","index":1086,"name":"LGD_ExposureAtDefault_title","parsed":"'Limiet * percentage'","id":1086,"fflname":"ExposureAtDefault_title"},{"type":"noCacheUnlocked","refs":{"LGD_ExpectedLimitUsage_value":true,"LGD_ExposureAtDefault_value":true,"LGD_ExpectedLimitUsage_valid":true},"formulaDependencys":[{"name":"LGD_ExposureAtDefault_value","association":"refs","refId":1084},{"name":"LGD_ExpectedLimitUsage_valid","association":"refs","refId":1088}],"deps":{},"original":".6","index":1087,"name":"LGD_ExpectedLimitUsage_value","parsed":".6","id":1087,"fflname":"ExpectedLimitUsage_value"},{"type":"noCacheLocked","refs":{"LGD_ExpectedLimitUsage_valid":true},"formulaDependencys":[{"name":"LGD_ExpectedLimitUsage_value","association":"deps","refId":1087}],"deps":{"LGD_ExpectedLimitUsage_value":true},"original":"If(!isNaN(OnNA(ExpectedLimitUsage,null)),'','Enter valid input.')","index":1088,"name":"LGD_ExpectedLimitUsage_valid","parsed":"!isNaN(OnNA(m[1087]('1087',x.doc,y.base,z,v,m),null))?'':'Enter valid input.'","id":1088,"fflname":"ExpectedLimitUsage_valid"},{"type":"noCacheUnlocked","refs":{"LGD_ExpectedLimitUsage_title":true},"formulaDependencys":[],"deps":{},"original":"'ExpectedLimitUsage'","index":1089,"name":"LGD_ExpectedLimitUsage_title","parsed":"'ExpectedLimitUsage'","id":1089,"fflname":"ExpectedLimitUsage_title"},{"type":"noCacheUnlocked","refs":{"LGD_AllocatedGuarantee_value":true},"formulaDependencys":[],"deps":{},"original":"''","index":1090,"name":"LGD_AllocatedGuarantee_value","parsed":"''","id":1090,"fflname":"AllocatedGuarantee_value"},{"type":"noCacheUnlocked","refs":{"LGD_AllocatedGuarantee_title":true},"formulaDependencys":[],"deps":{},"original":"'AllocatedGuarantee'","index":1091,"name":"LGD_AllocatedGuarantee_title","parsed":"'AllocatedGuarantee'","id":1091,"fflname":"AllocatedGuarantee_title"},{"type":"noCacheUnlocked","refs":{"LGD_AllocatedGuaranteeReferenceNumber_value":true,"LGD_AllocatedGuaranteeReferenceNumber_valid":true},"formulaDependencys":[{"name":"LGD_AllocatedGuaranteeReferenceNumber_valid","association":"refs","refId":1093}],"deps":{},"original":"''","index":1092,"name":"LGD_AllocatedGuaranteeReferenceNumber_value","parsed":"''","id":1092,"fflname":"AllocatedGuaranteeReferenceNumber_value"},{"type":"noCacheLocked","refs":{"LGD_AllocatedGuaranteeReferenceNumber_valid":true},"formulaDependencys":[{"name":"LGD_AllocatedGuaranteeReferenceNumber_value","association":"deps","refId":1092}],"deps":{"LGD_AllocatedGuaranteeReferenceNumber_value":true},"original":"If(AllocatedGuaranteeReferenceNumber<=128,'','Enter valid input.')","index":1093,"name":"LGD_AllocatedGuaranteeReferenceNumber_valid","parsed":"m[1092]('1092',x.doc,y.p[1],z,v,m)<=128?'':'Enter valid input.'","id":1093,"fflname":"AllocatedGuaranteeReferenceNumber_valid"},{"type":"noCacheUnlocked","refs":{"LGD_AllocatedGuaranteeReferenceNumber_title":true},"formulaDependencys":[],"deps":{},"original":"'AllocatedGuaranteeReferenceNumber'","index":1094,"name":"LGD_AllocatedGuaranteeReferenceNumber_title","parsed":"'AllocatedGuaranteeReferenceNumber'","id":1094,"fflname":"AllocatedGuaranteeReferenceNumber_title"},{"type":"noCacheUnlocked","refs":{"LGD_GuaranteeAgreement_value":true},"formulaDependencys":[],"deps":{},"original":"''","index":1095,"name":"LGD_GuaranteeAgreement_value","parsed":"''","id":1095,"fflname":"GuaranteeAgreement_value"},{"type":"noCacheUnlocked","refs":{"LGD_GuaranteeAgreement_title":true},"formulaDependencys":[],"deps":{},"original":"'GuaranteeAgreement'","index":1096,"name":"LGD_GuaranteeAgreement_title","parsed":"'GuaranteeAgreement'","id":1096,"fflname":"GuaranteeAgreement_title"},{"type":"noCacheUnlocked","refs":{"LGD_GuaranteeAgreementReferenceNumber_value":true,"LGD_GuaranteeAgreementReferenceNumber_valid":true},"formulaDependencys":[{"name":"LGD_GuaranteeAgreementReferenceNumber_valid","association":"refs","refId":1098}],"deps":{},"original":"''","index":1097,"name":"LGD_GuaranteeAgreementReferenceNumber_value","parsed":"''","id":1097,"fflname":"GuaranteeAgreementReferenceNumber_value"},{"type":"noCacheLocked","refs":{"LGD_GuaranteeAgreementReferenceNumber_valid":true},"formulaDependencys":[{"name":"LGD_GuaranteeAgreementReferenceNumber_value","association":"deps","refId":1097}],"deps":{"LGD_GuaranteeAgreementReferenceNumber_value":true},"original":"If(GuaranteeAgreementReferenceNumber<=128,'','Enter valid input.')","index":1098,"name":"LGD_GuaranteeAgreementReferenceNumber_valid","parsed":"m[1097]('1097',x.doc,y.p[2],z,v,m)<=128?'':'Enter valid input.'","id":1098,"fflname":"GuaranteeAgreementReferenceNumber_valid"},{"type":"noCacheUnlocked","refs":{"LGD_GuaranteeAgreementReferenceNumber_title":true},"formulaDependencys":[],"deps":{},"original":"'GuaranteeAgreementReferenceNumber'","index":1099,"name":"LGD_GuaranteeAgreementReferenceNumber_title","parsed":"'GuaranteeAgreementReferenceNumber'","id":1099,"fflname":"GuaranteeAgreementReferenceNumber_title"},{"type":"noCacheUnlocked","refs":{"LGD_GuaranteeAgreementDefinitionCode_value":true,"LGD_GuaranteeAgreementDefinitionCode_valid":true},"formulaDependencys":[{"name":"LGD_GuaranteeAgreementDefinitionCode_valid","association":"refs","refId":1101}],"deps":{},"original":"''","index":1100,"name":"LGD_GuaranteeAgreementDefinitionCode_value","parsed":"''","id":1100,"fflname":"GuaranteeAgreementDefinitionCode_value"},{"type":"noCacheLocked","refs":{"LGD_GuaranteeAgreementDefinitionCode_valid":true},"formulaDependencys":[{"name":"LGD_GuaranteeAgreementDefinitionCode_value","association":"deps","refId":1100}],"deps":{"LGD_GuaranteeAgreementDefinitionCode_value":true},"original":"If(GuaranteeAgreementDefinitionCode<=255,'','Enter valid input.')","index":1101,"name":"LGD_GuaranteeAgreementDefinitionCode_valid","parsed":"m[1100]('1100',x.doc,y.p[2],z,v,m)<=255?'':'Enter valid input.'","id":1101,"fflname":"GuaranteeAgreementDefinitionCode_valid"},{"type":"noCacheUnlocked","refs":{"LGD_GuaranteeAgreementDefinitionCode_title":true},"formulaDependencys":[],"deps":{},"original":"'GuaranteeAgreementDefinitionCode'","index":1102,"name":"LGD_GuaranteeAgreementDefinitionCode_title","parsed":"'GuaranteeAgreementDefinitionCode'","id":1102,"fflname":"GuaranteeAgreementDefinitionCode_title"},{"type":"noCacheUnlocked","refs":{"LGD_AllocatedCollateral_value":true},"formulaDependencys":[],"deps":{},"original":"''","index":1103,"name":"LGD_AllocatedCollateral_value","parsed":"''","id":1103,"fflname":"AllocatedCollateral_value"},{"type":"noCacheUnlocked","refs":{"LGD_AllocatedCollateral_title":true},"formulaDependencys":[],"deps":{},"original":"'AllocatedCollateral'","index":1104,"name":"LGD_AllocatedCollateral_title","parsed":"'AllocatedCollateral'","id":1104,"fflname":"AllocatedCollateral_title"},{"type":"noCacheUnlocked","refs":{"LGD_AllocatedCollateralReferenceNumber_value":true,"LGD_AllocatedCollateralReferenceNumber_valid":true},"formulaDependencys":[{"name":"LGD_AllocatedCollateralReferenceNumber_valid","association":"refs","refId":1106}],"deps":{},"original":"NA","index":1105,"name":"LGD_AllocatedCollateralReferenceNumber_value","parsed":"NA","id":1105,"fflname":"AllocatedCollateralReferenceNumber_value"},{"type":"noCacheLocked","refs":{"LGD_AllocatedCollateralReferenceNumber_valid":true},"formulaDependencys":[{"name":"LGD_AllocatedCollateralReferenceNumber_value","association":"deps","refId":1105}],"deps":{"LGD_AllocatedCollateralReferenceNumber_value":true},"original":"If(AllocatedCollateralReferenceNumber<=128&&!isNaN(OnNA(AllocatedCollateralReferenceNumber,null)),'','Enter valid input.')","index":1106,"name":"LGD_AllocatedCollateralReferenceNumber_valid","parsed":"m[1105]('1105',x.doc,y.p[1],z,v,m)<=128&&!isNaN(OnNA(m[1105]('1105',x.doc,y.p[1],z,v,m),null))?'':'Enter valid input.'","id":1106,"fflname":"AllocatedCollateralReferenceNumber_valid"},{"type":"noCacheUnlocked","refs":{"LGD_AllocatedCollateralReferenceNumber_title":true},"formulaDependencys":[],"deps":{},"original":"'AllocatedCollateralReferenceNumber'","index":1107,"name":"LGD_AllocatedCollateralReferenceNumber_title","parsed":"'AllocatedCollateralReferenceNumber'","id":1107,"fflname":"AllocatedCollateralReferenceNumber_title"},{"type":"noCacheUnlocked","refs":{"LGD_LGDCalculationOutputContainer_value":true},"formulaDependencys":[{"name":"LGD_CollateralAgreement_value","association":"deps","refId":1050}],"deps":{"LGD_CollateralAgreement_value":true},"original":"TCOUNT(CollateralAgreement)","index":1108,"name":"LGD_LGDCalculationOutputContainer_value","parsed":"PROXY(TCOUNT([1050,1018,1022,1050],m[1050],'1050',x.doc,y.p[1],z,v,m))","id":1108,"fflname":"LGDCalculationOutputContainer_value"},{"type":"noCacheUnlocked","refs":{"LGD_LGDCalculationOutputContainer_title":true},"formulaDependencys":[],"deps":{},"original":"'LGDCalculationOutputContainer'","index":1109,"name":"LGD_LGDCalculationOutputContainer_title","parsed":"'LGDCalculationOutputContainer'","id":1109,"fflname":"LGDCalculationOutputContainer_title"},{"type":"noCacheUnlocked","refs":{"LGD_CounterParty_value":true,"LGD_CounterParty_valid":true},"formulaDependencys":[{"name":"LGD_CounterParty_valid","association":"refs","refId":1111}],"deps":{},"original":"NA","index":1110,"name":"LGD_CounterParty_value","parsed":"NA","id":1110,"fflname":"CounterParty_value"},{"type":"noCacheLocked","refs":{"LGD_CounterParty_valid":true},"formulaDependencys":[{"name":"LGD_CounterParty_value","association":"deps","refId":1110}],"deps":{"LGD_CounterParty_value":true},"original":"If(!isNaN(OnNA(CounterParty,null)),'','Enter valid input.')","index":1111,"name":"LGD_CounterParty_valid","parsed":"!isNaN(OnNA(m[1110]('1110',x.doc,y.base,z,v,m),null))?'':'Enter valid input.'","id":1111,"fflname":"CounterParty_valid"},{"type":"noCacheUnlocked","refs":{"LGD_CounterParty_title":true},"formulaDependencys":[],"deps":{},"original":"'CounterParty'","index":1112,"name":"LGD_CounterParty_title","parsed":"'CounterParty'","id":1112,"fflname":"CounterParty_title"},{"type":"noCacheUnlocked","refs":{"LGD_FacilityResultContainer_value":true},"formulaDependencys":[],"deps":{},"original":"1","index":1113,"name":"LGD_FacilityResultContainer_value","parsed":"1","id":1113,"fflname":"FacilityResultContainer_value"},{"type":"noCacheUnlocked","refs":{"LGD_FacilityResultContainer_title":true},"formulaDependencys":[],"deps":{},"original":"'FacilityResultContainer'","index":1114,"name":"LGD_FacilityResultContainer_title","parsed":"'FacilityResultContainer'","id":1114,"fflname":"FacilityResultContainer_title"},{"type":"noCacheUnlocked","refs":{"LGD_FacilityReferenceNumber_value":true,"LGD_FacilityReferenceNumber_valid":true},"formulaDependencys":[{"name":"LGD_FacilityReferenceNumber_valid","association":"refs","refId":1116}],"deps":{},"original":"'CAS-210-01'","index":1115,"name":"LGD_FacilityReferenceNumber_value","parsed":"'CAS-210-01'","id":1115,"fflname":"FacilityReferenceNumber_value"},{"type":"noCacheLocked","refs":{"LGD_FacilityReferenceNumber_valid":true},"formulaDependencys":[{"name":"LGD_FacilityReferenceNumber_value","association":"deps","refId":1115}],"deps":{"LGD_FacilityReferenceNumber_value":true},"original":"If(FacilityReferenceNumber<=255,'','Enter valid input.')","index":1116,"name":"LGD_FacilityReferenceNumber_valid","parsed":"m[1115]('1115',x.doc,y.base,z,v,m)<=255?'':'Enter valid input.'","id":1116,"fflname":"FacilityReferenceNumber_valid"},{"type":"noCacheUnlocked","refs":{"LGD_FacilityReferenceNumber_title":true},"formulaDependencys":[],"deps":{},"original":"'FacilityReferenceNumber'","index":1117,"name":"LGD_FacilityReferenceNumber_title","parsed":"'FacilityReferenceNumber'","id":1117,"fflname":"FacilityReferenceNumber_title"},{"type":"noCacheUnlocked","refs":{"LGD_LGD_value":true},"formulaDependencys":[],"deps":{},"original":"''","index":1118,"name":"LGD_LGD_value","parsed":"''","id":1118,"fflname":"LGD_value"},{"type":"noCacheUnlocked","refs":{"LGD_LGD_title":true},"formulaDependencys":[],"deps":{},"original":"'LGD'","index":1119,"name":"LGD_LGD_title","parsed":"'LGD'","id":1119,"fflname":"LGD_title"},{"type":"noCacheUnlocked","refs":{"LGD_FacilityCoverageField_value":true,"LGD_FacilityCoverageField_valid":true},"formulaDependencys":[{"name":"LGD_RecoveryValue_value","association":"deps","refId":1009},{"name":"LGD_FacilityCoverageField_valid","association":"refs","refId":1121}],"deps":{"LGD_RecoveryValue_value":true},"original":"OnZero(RecoveryValue,1.2)","index":1120,"name":"LGD_FacilityCoverageField_value","parsed":"OnZero(m[1009]('1009',x.doc,y.base,z,v,m),1.2)","id":1120,"fflname":"FacilityCoverageField_value"},{"type":"noCacheLocked","refs":{"LGD_FacilityCoverageField_valid":true},"formulaDependencys":[{"name":"LGD_FacilityCoverageField_value","association":"deps","refId":1120}],"deps":{"LGD_FacilityCoverageField_value":true},"original":"If(!isNaN(OnNA(FacilityCoverageField,null)),'','Enter valid input.')","index":1121,"name":"LGD_FacilityCoverageField_valid","parsed":"!isNaN(OnNA(m[1120]('1120',x.doc,y.base,z,v,m),null))?'':'Enter valid input.'","id":1121,"fflname":"FacilityCoverageField_valid"},{"type":"noCacheUnlocked","refs":{"LGD_FacilityCoverageField_title":true},"formulaDependencys":[],"deps":{},"original":"'FacilityCoverageField'","index":1122,"name":"LGD_FacilityCoverageField_title","parsed":"'FacilityCoverageField'","id":1122,"fflname":"FacilityCoverageField_title"},{"type":"noCacheUnlocked","refs":{"LGD_LGDClass_value":true},"formulaDependencys":[],"deps":{},"original":"'LCRMNL06'","index":1123,"name":"LGD_LGDClass_value","parsed":"'LCRMNL06'","id":1123,"fflname":"LGDClass_value"},{"type":"noCacheUnlocked","refs":{"LGD_LGDClass_title":true},"formulaDependencys":[],"deps":{},"original":"'LGDClass'","index":1124,"name":"LGD_LGDClass_title","parsed":"'LGDClass'","id":1124,"fflname":"LGDClass_title"},{"type":"noCacheUnlocked","refs":{"LGD_DownturnLGDIncludingMOCField_value":true,"LGD_DownturnLGDIncludingMOCField_valid":true},"formulaDependencys":[{"name":"LGD_RecoveryValue_value","association":"deps","refId":1009},{"name":"LGD_DownturnLGDIncludingMOCField_valid","association":"refs","refId":1126}],"deps":{"LGD_RecoveryValue_value":true},"original":"OnZero(RecoveryValue,2.1)","index":1125,"name":"LGD_DownturnLGDIncludingMOCField_value","parsed":"OnZero(m[1009]('1009',x.doc,y.base,z,v,m),2.1)","id":1125,"fflname":"DownturnLGDIncludingMOCField_value"},{"type":"noCacheLocked","refs":{"LGD_DownturnLGDIncludingMOCField_valid":true},"formulaDependencys":[{"name":"LGD_DownturnLGDIncludingMOCField_value","association":"deps","refId":1125}],"deps":{"LGD_DownturnLGDIncludingMOCField_value":true},"original":"If(!isNaN(OnNA(DownturnLGDIncludingMOCField,null)),'','Enter valid input.')","index":1126,"name":"LGD_DownturnLGDIncludingMOCField_valid","parsed":"!isNaN(OnNA(m[1125]('1125',x.doc,y.base,z,v,m),null))?'':'Enter valid input.'","id":1126,"fflname":"DownturnLGDIncludingMOCField_valid"},{"type":"noCacheUnlocked","refs":{"LGD_DownturnLGDIncludingMOCField_title":true},"formulaDependencys":[],"deps":{},"original":"'DownturnLGDIncludingMOCField'","index":1127,"name":"LGD_DownturnLGDIncludingMOCField_title","parsed":"'DownturnLGDIncludingMOCField'","id":1127,"fflname":"DownturnLGDIncludingMOCField_title"},{"type":"noCacheUnlocked","refs":{"LGD_LGDIncludingMOCField_value":true,"LGD_LGDIncludingMOCField_valid":true},"formulaDependencys":[{"name":"LGD_RecoveryValue_value","association":"deps","refId":1009},{"name":"LGD_LGDIncludingMOCField_valid","association":"refs","refId":1129}],"deps":{"LGD_RecoveryValue_value":true},"original":"OnZero(RecoveryValue,2.1)","index":1128,"name":"LGD_LGDIncludingMOCField_value","parsed":"OnZero(m[1009]('1009',x.doc,y.base,z,v,m),2.1)","id":1128,"fflname":"LGDIncludingMOCField_value"},{"type":"noCacheLocked","refs":{"LGD_LGDIncludingMOCField_valid":true},"formulaDependencys":[{"name":"LGD_LGDIncludingMOCField_value","association":"deps","refId":1128}],"deps":{"LGD_LGDIncludingMOCField_value":true},"original":"If(!isNaN(OnNA(LGDIncludingMOCField,null)),'','Enter valid input.')","index":1129,"name":"LGD_LGDIncludingMOCField_valid","parsed":"!isNaN(OnNA(m[1128]('1128',x.doc,y.base,z,v,m),null))?'':'Enter valid input.'","id":1129,"fflname":"LGDIncludingMOCField_valid"},{"type":"noCacheUnlocked","refs":{"LGD_LGDIncludingMOCField_title":true},"formulaDependencys":[],"deps":{},"original":"'lGDIncludingMOCField'","index":1130,"name":"LGD_LGDIncludingMOCField_title","parsed":"'lGDIncludingMOCField'","id":1130,"fflname":"LGDIncludingMOCField_title"},{"type":"noCacheUnlocked","refs":{"LGD_BestEstimatedLGD_value":true,"LGD_BestEstimatedLGD_valid":true},"formulaDependencys":[{"name":"LGD_RecoveryValue_value","association":"deps","refId":1009},{"name":"LGD_BestEstimatedLGD_valid","association":"refs","refId":1132}],"deps":{"LGD_RecoveryValue_value":true},"original":"OnZero(RecoveryValue,1.4)","index":1131,"name":"LGD_BestEstimatedLGD_value","parsed":"OnZero(m[1009]('1009',x.doc,y.base,z,v,m),1.4)","id":1131,"fflname":"BestEstimatedLGD_value"},{"type":"noCacheLocked","refs":{"LGD_BestEstimatedLGD_valid":true},"formulaDependencys":[{"name":"LGD_BestEstimatedLGD_value","association":"deps","refId":1131}],"deps":{"LGD_BestEstimatedLGD_value":true},"original":"If(!isNaN(OnNA(BestEstimatedLGD,null)),'','Enter valid input.')","index":1132,"name":"LGD_BestEstimatedLGD_valid","parsed":"!isNaN(OnNA(m[1131]('1131',x.doc,y.base,z,v,m),null))?'':'Enter valid input.'","id":1132,"fflname":"BestEstimatedLGD_valid"},{"type":"noCacheUnlocked","refs":{"LGD_BestEstimatedLGD_title":true},"formulaDependencys":[],"deps":{},"original":"'BestEstimatedLGD'","index":1133,"name":"LGD_BestEstimatedLGD_title","parsed":"'BestEstimatedLGD'","id":1133,"fflname":"BestEstimatedLGD_title"}],"variables":[{"name":"MATRIX_VALUES","expression":{"ABC":{"name":"ABC","table":{},"bounds":{"xStart":7,"yStart":6},"yasNames":{"1":{"sheetName":"Opvangtoeslag","address":"G6","row":6,"col":7},"null":{"sheetName":"Opvangtoeslag","address":"G16","row":16,"col":7}},"xasValues":{"1":{"0":1,"1":null,"2":null,"3":null,"4":null,"5":null,"6":null,"7":null},"null":{"0":null,"1":null,"2":null,"3":null,"4":null,"5":null,"6":null,"7":null}}},"MaxCoverageChildCare":{"name":"MaxCoverageChildCare","table":{},"bounds":{"xStart":2,"yStart":3},"yasNames":{"Name":{"sheetName":"Sheet3","address":"B3","row":3,"col":2},"null":{"sheetName":"Sheet3","address":"B4","row":4,"col":2},"ChildCentrum":{"sheetName":"Sheet3","address":"B5","row":5,"col":2},"GuestParent":{"sheetName":"Sheet3","address":"B6","row":6,"col":2}},"xasValues":{"Name":{"0":"Name","1":"MaxCoverageChildCare","2":null},"null":{"0":null,"1":"Daycare","2":"OutOfSchoolCare"},"ChildCentrum":{"0":"ChildCentrum","1":7.18,"2":6.69},"GuestParent":{"0":"GuestParent","1":5.75,"2":5.75}}},"PremiumOutOfSchoolCare":{"name":"PremiumOutOfSchoolCare","table":{},"bounds":{"xStart":2,"yStart":4},"yasNames":{"0":{"sheetName":"Opvangtoeslag","address":"B9","row":9,"col":2},"18486":{"sheetName":"Opvangtoeslag","address":"B10","row":10,"col":2},"19717":{"sheetName":"Opvangtoeslag","address":"B11","row":11,"col":2},"20946":{"sheetName":"Opvangtoeslag","address":"B12","row":12,"col":2},"22178":{"sheetName":"Opvangtoeslag","address":"B13","row":13,"col":2},"23409":{"sheetName":"Opvangtoeslag","address":"B14","row":14,"col":2},"24639":{"sheetName":"Opvangtoeslag","address":"B15","row":15,"col":2},"25870":{"sheetName":"Opvangtoeslag","address":"B16","row":16,"col":2},"27097":{"sheetName":"Opvangtoeslag","address":"B17","row":17,"col":2},"28422":{"sheetName":"Opvangtoeslag","address":"B18","row":18,"col":2},"29744":{"sheetName":"Opvangtoeslag","address":"B19","row":19,"col":2},"31068":{"sheetName":"Opvangtoeslag","address":"B20","row":20,"col":2},"32391":{"sheetName":"Opvangtoeslag","address":"B21","row":21,"col":2},"33717":{"sheetName":"Opvangtoeslag","address":"B22","row":22,"col":2},"35040":{"sheetName":"Opvangtoeslag","address":"B23","row":23,"col":2},"36395":{"sheetName":"Opvangtoeslag","address":"B24","row":24,"col":2},"37753":{"sheetName":"Opvangtoeslag","address":"B25","row":25,"col":2},"39110":{"sheetName":"Opvangtoeslag","address":"B26","row":26,"col":2},"40466":{"sheetName":"Opvangtoeslag","address":"B27","row":27,"col":2},"41825":{"sheetName":"Opvangtoeslag","address":"B28","row":28,"col":2},"43183":{"sheetName":"Opvangtoeslag","address":"B29","row":29,"col":2},"44539":{"sheetName":"Opvangtoeslag","address":"B30","row":30,"col":2},"45896":{"sheetName":"Opvangtoeslag","address":"B31","row":31,"col":2},"47379":{"sheetName":"Opvangtoeslag","address":"B32","row":32,"col":2},"50287":{"sheetName":"Opvangtoeslag","address":"B33","row":33,"col":2},"53194":{"sheetName":"Opvangtoeslag","address":"B34","row":34,"col":2},"56104":{"sheetName":"Opvangtoeslag","address":"B35","row":35,"col":2},"59013":{"sheetName":"Opvangtoeslag","address":"B36","row":36,"col":2},"61920":{"sheetName":"Opvangtoeslag","address":"B37","row":37,"col":2},"64830":{"sheetName":"Opvangtoeslag","address":"B38","row":38,"col":2},"67737":{"sheetName":"Opvangtoeslag","address":"B39","row":39,"col":2},"70646":{"sheetName":"Opvangtoeslag","address":"B40","row":40,"col":2},"73557":{"sheetName":"Opvangtoeslag","address":"B41","row":41,"col":2},"76463":{"sheetName":"Opvangtoeslag","address":"B42","row":42,"col":2},"79374":{"sheetName":"Opvangtoeslag","address":"B43","row":43,"col":2},"82282":{"sheetName":"Opvangtoeslag","address":"B44","row":44,"col":2},"85188":{"sheetName":"Opvangtoeslag","address":"B45","row":45,"col":2},"88097":{"sheetName":"Opvangtoeslag","address":"B46","row":46,"col":2},"91063":{"sheetName":"Opvangtoeslag","address":"B47","row":47,"col":2},"94043":{"sheetName":"Opvangtoeslag","address":"B48","row":48,"col":2},"97021":{"sheetName":"Opvangtoeslag","address":"B49","row":49,"col":2},"99999":{"sheetName":"Opvangtoeslag","address":"B50","row":50,"col":2},"102977":{"sheetName":"Opvangtoeslag","address":"B51","row":51,"col":2},"105956":{"sheetName":"Opvangtoeslag","address":"B52","row":52,"col":2},"108936":{"sheetName":"Opvangtoeslag","address":"B53","row":53,"col":2},"111914":{"sheetName":"Opvangtoeslag","address":"B54","row":54,"col":2},"114891":{"sheetName":"Opvangtoeslag","address":"B55","row":55,"col":2},"117870":{"sheetName":"Opvangtoeslag","address":"B56","row":56,"col":2},"120849":{"sheetName":"Opvangtoeslag","address":"B57","row":57,"col":2},"123827":{"sheetName":"Opvangtoeslag","address":"B58","row":58,"col":2},"126806":{"sheetName":"Opvangtoeslag","address":"B59","row":59,"col":2},"129783":{"sheetName":"Opvangtoeslag","address":"B60","row":60,"col":2},"132762":{"sheetName":"Opvangtoeslag","address":"B61","row":61,"col":2},"135743":{"sheetName":"Opvangtoeslag","address":"B62","row":62,"col":2},"138720":{"sheetName":"Opvangtoeslag","address":"B63","row":63,"col":2},"141699":{"sheetName":"Opvangtoeslag","address":"B64","row":64,"col":2},"144676":{"sheetName":"Opvangtoeslag","address":"B65","row":65,"col":2},"147656":{"sheetName":"Opvangtoeslag","address":"B66","row":66,"col":2},"150635":{"sheetName":"Opvangtoeslag","address":"B67","row":67,"col":2},"153613":{"sheetName":"Opvangtoeslag","address":"B68","row":68,"col":2},"156591":{"sheetName":"Opvangtoeslag","address":"B69","row":69,"col":2},"159568":{"sheetName":"Opvangtoeslag","address":"B70","row":70,"col":2},"162548":{"sheetName":"Opvangtoeslag","address":"B71","row":71,"col":2},"165526":{"sheetName":"Opvangtoeslag","address":"B72","row":72,"col":2},"168505":{"sheetName":"Opvangtoeslag","address":"B73","row":73,"col":2},"171484":{"sheetName":"Opvangtoeslag","address":"B74","row":74,"col":2},"174462":{"sheetName":"Opvangtoeslag","address":"B75","row":75,"col":2},"177441":{"sheetName":"Opvangtoeslag","address":"B76","row":76,"col":2},"180419":{"sheetName":"Opvangtoeslag","address":"B77","row":77,"col":2},"Name":{"sheetName":"Opvangtoeslag","address":"B4","row":4,"col":2},"SearchOption":{"sheetName":"Opvangtoeslag","address":"B5","row":5,"col":2},"RowIndex":{"sheetName":"Opvangtoeslag","address":"B6","row":6,"col":2},"NoMatch":{"sheetName":"Opvangtoeslag","address":"B7","row":7,"col":2},"NA":{"sheetName":"Opvangtoeslag","address":"B8","row":8,"col":2}},"xasValues":{"0":{"0":0,"1":0.94,"2":0.95},"18486":{"0":18486,"1":0.94,"2":0.95},"19717":{"0":19717,"1":0.94,"2":0.95},"20946":{"0":20946,"1":0.94,"2":0.95},"22178":{"0":22178,"1":0.94,"2":0.95},"23409":{"0":23409,"1":0.938,"2":0.949},"24639":{"0":24639,"1":0.928,"2":0.948},"25870":{"0":25870,"1":0.92,"2":0.947},"27097":{"0":27097,"1":0.912,"2":0.946},"28422":{"0":28422,"1":0.904,"2":0.944},"29744":{"0":29744,"1":0.893,"2":0.942},"31068":{"0":31068,"1":0.887,"2":0.94},"32391":{"0":32391,"1":0.877,"2":0.94},"33717":{"0":33717,"1":0.868,"2":0.94},"35040":{"0":35040,"1":0.86,"2":0.94},"36395":{"0":36395,"1":0.851,"2":0.94},"37753":{"0":37753,"1":0.843,"2":0.94},"39110":{"0":39110,"1":0.834,"2":0.94},"40466":{"0":40466,"1":0.823,"2":0.94},"41825":{"0":41825,"1":0.818,"2":0.94},"43183":{"0":43183,"1":0.808,"2":0.94},"44539":{"0":44539,"1":0.801,"2":0.94},"45896":{"0":45896,"1":0.79,"2":0.94},"47379":{"0":47379,"1":0.772,"2":0.94},"50287":{"0":50287,"1":0.763,"2":0.935},"53194":{"0":53194,"1":0.749,"2":0.929},"56104":{"0":56104,"1":0.723,"2":0.924},"59013":{"0":59013,"1":0.696,"2":0.921},"61920":{"0":61920,"1":0.669,"2":0.913},"64830":{"0":64830,"1":0.641,"2":0.908},"67737":{"0":67737,"1":0.613,"2":0.902},"70646":{"0":70646,"1":0.587,"2":0.894},"73557":{"0":73557,"1":0.56,"2":0.889},"76463":{"0":76463,"1":0.533,"2":0.884},"79374":{"0":79374,"1":0.504,"2":0.881},"82282":{"0":82282,"1":0.477,"2":0.873},"85188":{"0":85188,"1":0.451,"2":0.869},"88097":{"0":88097,"1":0.423,"2":0.863},"91063":{"0":91063,"1":0.398,"2":0.855},"94043":{"0":94043,"1":0.374,"2":0.85},"97021":{"0":97021,"1":0.348,"2":0.846},"99999":{"0":99999,"1":0.333,"2":0.842},"102977":{"0":102977,"1":0.333,"2":0.834},"105956":{"0":105956,"1":0.333,"2":0.828},"108936":{"0":108936,"1":0.333,"2":0.823},"111914":{"0":111914,"1":0.333,"2":0.817},"114891":{"0":114891,"1":0.333,"2":0.813},"117870":{"0":117870,"1":0.333,"2":0.805},"120849":{"0":120849,"1":0.333,"2":0.799},"123827":{"0":123827,"1":0.333,"2":0.788},"126806":{"0":126806,"1":0.333,"2":0.784},"129783":{"0":129783,"1":0.333,"2":0.776},"132762":{"0":132762,"1":0.333,"2":0.765},"135743":{"0":135743,"1":0.333,"2":0.759},"138720":{"0":138720,"1":0.333,"2":0.749},"141699":{"0":141699,"1":0.333,"2":0.743},"144676":{"0":144676,"1":0.333,"2":0.735},"147656":{"0":147656,"1":0.333,"2":0.728},"150635":{"0":150635,"1":0.333,"2":0.72},"153613":{"0":153613,"1":0.333,"2":0.709},"156591":{"0":156591,"1":0.333,"2":0.703},"159568":{"0":159568,"1":0.333,"2":0.695},"162548":{"0":162548,"1":0.333,"2":0.687},"165526":{"0":165526,"1":0.333,"2":0.679},"168505":{"0":168505,"1":0.333,"2":0.672},"171484":{"0":171484,"1":0.333,"2":0.664},"174462":{"0":174462,"1":0.333,"2":0.656},"177441":{"0":177441,"1":0.333,"2":0.65},"180419":{"0":180419,"1":0.333,"2":0.64},"Name":{"0":"Name","1":"PremiumOutOfSchoolCare","2":null},"SearchOption":{"0":"SearchOption","1":"ExactOrPrevious","2":null},"RowIndex":{"0":"RowIndex","1":1,"2":2},"NoMatch":{"0":"NoMatch","1":"niets","2":null},"NA":{"0":"NA","1":"niets","2":null}}},"Version":{"name":"Version","table":{},"bounds":{"xStart":2,"yStart":2},"yasNames":{"1":{"sheetName":"Sheet1","address":"B7","row":7,"col":2},"Name":{"sheetName":"Sheet1","address":"B2","row":2,"col":2},"Search Option":{"sheetName":"Sheet1","address":"B3","row":3,"col":2},"RowIndex":{"sheetName":"Sheet1","address":"B4","row":4,"col":2},"NoMatch":{"sheetName":"Sheet1","address":"B5","row":5,"col":2},"NA":{"sheetName":"Sheet1","address":"B6","row":6,"col":2}},"xasValues":{"1":{"0":1,"1":"1-1-2012","2":"12:00","3":"1.1"},"Name":{"0":"Name","1":"Version","2":null,"3":null},"Search Option":{"0":"Search Option","1":"Exact","2":null,"3":null},"RowIndex":{"0":"RowIndex","1":1,"2":2,"3":3},"NoMatch":{"0":"NoMatch","1":null,"2":null,"3":null},"NA":{"0":"NA","1":null,"2":null,"3":null}}},"YearlyChildCosts":{"name":"YearlyChildCosts","table":{},"bounds":{"xStart":2,"yStart":82},"yasNames":{"Name":{"sheetName":"Opvangtoeslag","address":"B82","row":82,"col":2},"Search Option":{"sheetName":"Opvangtoeslag","address":"B83","row":83,"col":2},"RowIndex":{"sheetName":"Opvangtoeslag","address":"B84","row":84,"col":2},"NoMatch":{"sheetName":"Opvangtoeslag","address":"B85","row":85,"col":2},"NA":{"sheetName":"Opvangtoeslag","address":"B86","row":86,"col":2},"Diapers":{"sheetName":"Opvangtoeslag","address":"B87","row":87,"col":2},"FoodCostsGirl":{"sheetName":"Opvangtoeslag","address":"B88","row":88,"col":2},"FoodCostsBoy":{"sheetName":"Opvangtoeslag","address":"B89","row":89,"col":2},"ClothingCosts":{"sheetName":"Opvangtoeslag","address":"B90","row":90,"col":2},"PersonalCare":{"sheetName":"Opvangtoeslag","address":"B91","row":91,"col":2},"Hairdresser":{"sheetName":"Opvangtoeslag","address":"B92","row":92,"col":2},"Inventory":{"sheetName":"Opvangtoeslag","address":"B93","row":93,"col":2},"Allowance":{"sheetName":"Opvangtoeslag","address":"B94","row":94,"col":2},"Contributions":{"sheetName":"Opvangtoeslag","address":"B95","row":95,"col":2},"Transport":{"sheetName":"Opvangtoeslag","address":"B96","row":96,"col":2},"MobilePhone":{"sheetName":"Opvangtoeslag","address":"B97","row":97,"col":2},"DrivingLicense":{"sheetName":"Opvangtoeslag","address":"B98","row":98,"col":2},"ChildBenefits":{"sheetName":"Opvangtoeslag","address":"B99","row":99,"col":2}},"xasValues":{"Name":{"0":"Name","1":"YearlyChildCosts","2":null,"3":null,"4":null,"5":null,"6":null,"7":null,"8":null,"9":null,"10":null,"11":null,"12":null,"13":null,"14":null,"15":null,"16":null,"17":null,"18":null},"Search Option":{"0":"Search Option","1":"Exact","2":null,"3":null,"4":null,"5":null,"6":null,"7":null,"8":null,"9":null,"10":null,"11":null,"12":null,"13":null,"14":null,"15":null,"16":null,"17":null,"18":null},"RowIndex":{"0":"RowIndex","1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18},"NoMatch":{"0":"NoMatch","1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0},"NA":{"0":"NA","1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0},"Diapers":{"0":"Diapers","1":300,"2":300,"3":300,"4":150,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0},"FoodCostsGirl":{"0":"FoodCostsGirl","1":967.25,"2":967.25,"3":967.25,"4":967.25,"5":1423.5,"6":1423.5,"7":1423.5,"8":1423.5,"9":1423.5,"10":1814.05,"11":1814.05,"12":1814.05,"13":1814.05,"14":1814.05,"15":2153.5,"16":2153.5,"17":2153.5,"18":2153.5},"FoodCostsBoy":{"0":"FoodCostsBoy","1":967.25,"2":967.25,"3":967.25,"4":967.25,"5":1423.5,"6":1423.5,"7":1423.5,"8":1423.5,"9":1423.5,"10":1814.05,"11":1814.05,"12":1814.05,"13":1814.05,"14":1814.05,"15":2365.2000000000003,"16":2365.2000000000003,"17":2365.2000000000003,"18":2365.2000000000003},"ClothingCosts":{"0":"ClothingCosts","1":360,"2":360,"3":360,"4":360,"5":360,"6":360,"7":360,"8":360,"9":360,"10":360,"11":360,"12":360,"13":648,"14":648,"15":648,"16":648,"17":648,"18":648},"PersonalCare":{"0":"PersonalCare","1":150,"2":150,"3":150,"4":150,"5":150,"6":150,"7":150,"8":150,"9":150,"10":150,"11":150,"12":150,"13":198,"14":198,"15":198,"16":198,"17":198,"18":198},"Hairdresser":{"0":"Hairdresser","1":0,"2":0,"3":70,"4":105,"5":210,"6":210,"7":210,"8":210,"9":210,"10":210,"11":210,"12":210,"13":252,"14":252,"15":252,"16":252,"17":252,"18":252},"Inventory":{"0":"Inventory","1":120,"2":120,"3":120,"4":120,"5":120,"6":120,"7":120,"8":120,"9":120,"10":120,"11":120,"12":120,"13":120,"14":120,"15":120,"16":120,"17":120,"18":120},"Allowance":{"0":"Allowance","1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":104,"8":104,"9":104,"10":104,"11":104,"12":130,"13":239.2,"14":239.2,"15":257.40000000000003,"16":299,"17":309.40000000000003,"18":358.8},"Contributions":{"0":"Contributions","1":0,"2":0,"3":0,"4":0,"5":180,"6":180,"7":180,"8":180,"9":180,"10":180,"11":180,"12":180,"13":180,"14":180,"15":180,"16":180,"17":180,"18":180},"Transport":{"0":"Transport","1":0,"2":0,"3":0,"4":0,"5":60,"6":60,"7":60,"8":60,"9":60,"10":60,"11":60,"12":60,"13":60,"14":60,"15":60,"16":60,"17":60,"18":60},"MobilePhone":{"0":"MobilePhone","1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":120,"12":120,"13":120,"14":156,"15":180,"16":192,"17":204,"18":240},"DrivingLicense":{"0":"DrivingLicense","1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":500,"18":2000},"ChildBenefits":{"0":"ChildBenefits","1":793.52,"2":793.52,"3":793.52,"4":793.52,"5":793.52,"6":793.52,"7":963.56,"8":963.56,"9":963.56,"10":963.56,"11":963.56,"12":963.56,"13":1133.6,"14":1133.6,"15":1133.6,"16":1133.6,"17":1133.6,"18":1133.6}}},"ZoekenAlfanumeriek":{"name":"ZoekenAlfanumeriek","table":{},"bounds":{"xStart":2,"yStart":30},"yasNames":{"Name":{"sheetName":"Sheet1","address":"B30","row":30,"col":2},"Search Option":{"sheetName":"Sheet1","address":"B31","row":31,"col":2},"RowIndex":{"sheetName":"Sheet1","address":"B32","row":32,"col":2},"NoMatch":{"sheetName":"Sheet1","address":"B33","row":33,"col":2},"NA":{"sheetName":"Sheet1","address":"B34","row":34,"col":2},"één":{"sheetName":"Sheet1","address":"B35","row":35,"col":2},"twee":{"sheetName":"Sheet1","address":"B36","row":36,"col":2},"drie":{"sheetName":"Sheet1","address":"B37","row":37,"col":2},"vier":{"sheetName":"Sheet1","address":"B38","row":38,"col":2},"vijf":{"sheetName":"Sheet1","address":"B39","row":39,"col":2}},"xasValues":{"Name":{"0":"Name","1":"ZoekenAlfanumeriek"},"Search Option":{"0":"Search Option","1":"Exact"},"RowIndex":{"0":"RowIndex","1":1},"NoMatch":{"0":"NoMatch","1":"niets"},"NA":{"0":"NA","1":"niets"},"één":{"0":"één","1":1},"twee":{"0":"twee","1":2},"drie":{"0":"drie","1":3},"vier":{"0":"vier","1":4},"vijf":{"0":"vijf","1":5}}},"ZoekenNumeriek":{"name":"ZoekenNumeriek","table":{},"bounds":{"xStart":2,"yStart":18},"yasNames":{"1":{"sheetName":"Sheet1","address":"B23","row":23,"col":2},"2":{"sheetName":"Sheet1","address":"B24","row":24,"col":2},"3":{"sheetName":"Sheet1","address":"B25","row":25,"col":2},"4":{"sheetName":"Sheet1","address":"B26","row":26,"col":2},"5":{"sheetName":"Sheet1","address":"B27","row":27,"col":2},"Name":{"sheetName":"Sheet1","address":"B18","row":18,"col":2},"Search Option":{"sheetName":"Sheet1","address":"B19","row":19,"col":2},"RowIndex":{"sheetName":"Sheet1","address":"B20","row":20,"col":2},"NoMatch":{"sheetName":"Sheet1","address":"B21","row":21,"col":2},"NA":{"sheetName":"Sheet1","address":"B22","row":22,"col":2}},"xasValues":{"1":{"0":1,"1":"één"},"2":{"0":2,"1":"twee"},"3":{"0":3,"1":"drie"},"4":{"0":4,"1":"vier"},"5":{"0":5,"1":"vijf"},"Name":{"0":"Name","1":"ZoekenNumeriek"},"Search Option":{"0":"Search Option","1":"Exact"},"RowIndex":{"0":"RowIndex","1":1},"NoMatch":{"0":"NoMatch","1":"niets"},"NA":{"0":"NA","1":"niets"}}}}}],"data":{},"nodes":[{"name":"LGD_root_value","rowId":"root","colId":"value","solutionName":"LGD","frequency":"document","displayAs":"SectionAnswerType","nodes":[{"name":"LGD_Q_variable root_value","rowId":"Q_variable root","colId":"value","identifier":"LGD_root_value"}],"displaytype":"number","ref":1001,"formulaName":"LGD_root_value","refId":1001,"datatype":"number"},{"rowId":"root","solutionName":"LGD","colId":"valid","name":"LGD_root_valid","nodes":[],"ref":1002,"formulaName":"LGD_root_valid","refId":1002,"displayAs":"string"},{"rowId":"Q_variable root","solutionName":"LGD","colId":"value","name":"LGD_Q_variable root_value","nodes":[{"name":"LGD_LGDCalculationInputContainer_value","rowId":"LGDCalculationInputContainer","colId":"value","identifier":"LGD_Q_variable root_value"},{"name":"LGD_LGDCalculationOutputContainer_value","rowId":"LGDCalculationOutputContainer","colId":"value","identifier":"LGD_Q_variable root_value"}],"displaytype":"number","ref":1003,"formulaName":"LGD_Q_variable root_value","refId":1003,"displayAs":"number","display_options":"scorecard","frequency":"column","datatype":"number","parentName":"root_value"},{"rowId":"Q_variable root","solutionName":"LGD","colId":"valid","name":"LGD_Q_variable root_valid","nodes":[],"ref":1004,"formulaName":"LGD_Q_variable root_valid","refId":1004,"displayAs":"string"},{"rowId":"LGDCalculationInputContainer","solutionName":"LGD","colId":"value","name":"LGD_LGDCalculationInputContainer_value","nodes":[{"name":"LGD_FacilityInputContainer_value","rowId":"FacilityInputContainer","colId":"value","identifier":"LGD_LGDCalculationInputContainer_value"}],"displaytype":"Input","ref":1005,"formulaName":"LGD_LGDCalculationInputContainer_value","refId":1005,"displayAs":"Input","frequency":"document","datatype":"string","parentName":"Q_variable root_value"},{"rowId":"LGDCalculationInputContainer","solutionName":"LGD","colId":"title","name":"LGD_LGDCalculationInputContainer_title","nodes":[],"ref":1006,"formulaName":"LGD_LGDCalculationInputContainer_title","refId":1006,"displayAs":"string"},{"rowId":"FacilityInputContainer","solutionName":"LGD","colId":"value","name":"LGD_FacilityInputContainer_value","nodes":[{"name":"LGD_RecoveryValue_value","rowId":"RecoveryValue","colId":"value","identifier":"LGD_FacilityInputContainer_value"},{"name":"LGD_AllocationValue_value","rowId":"AllocationValue","colId":"value","identifier":"LGD_FacilityInputContainer_value"},{"name":"LGD_CollateralAgreementContainer_value","rowId":"CollateralAgreementContainer","colId":"value","identifier":"LGD_FacilityInputContainer_value"},{"name":"LGD_FacilityDetails_value","rowId":"FacilityDetails","colId":"value","identifier":"LGD_FacilityInputContainer_value"},{"name":"LGD_LimitDetails_value","rowId":"LimitDetails","colId":"value","identifier":"LGD_FacilityInputContainer_value"},{"name":"LGD_AllocatedGuarantee_value","rowId":"AllocatedGuarantee","colId":"value","identifier":"LGD_FacilityInputContainer_value"},{"name":"LGD_AllocatedCollateral_value","rowId":"AllocatedCollateral","colId":"value","identifier":"LGD_FacilityInputContainer_value"}],"displaytype":"paragraph","ref":1007,"formulaName":"LGD_FacilityInputContainer_value","refId":1007,"displayAs":"paragraph","frequency":"none","datatype":"string","parentName":"LGDCalculationInputContainer_value"},{"rowId":"FacilityInputContainer","solutionName":"LGD","colId":"title","name":"LGD_FacilityInputContainer_title","nodes":[],"ref":1008,"formulaName":"LGD_FacilityInputContainer_title","refId":1008,"displayAs":"string"},{"rowId":"RecoveryValue","solutionName":"LGD","colId":"value","name":"LGD_RecoveryValue_value","nodes":[],"displaytype":"number","ref":1009,"formulaName":"LGD_RecoveryValue_value","refId":1009,"displayAs":"number","decimals":2,"frequency":"document","datatype":"number","parentName":"FacilityInputContainer_value"},{"rowId":"RecoveryValue","solutionName":"LGD","colId":"valid","name":"LGD_RecoveryValue_valid","nodes":[],"ref":1010,"formulaName":"LGD_RecoveryValue_valid","refId":1010,"displayAs":"string"},{"rowId":"RecoveryValue","solutionName":"LGD","colId":"title","name":"LGD_RecoveryValue_title","nodes":[],"ref":1011,"formulaName":"LGD_RecoveryValue_title","refId":1011,"displayAs":"string"},{"rowId":"RecoveryValue","solutionName":"LGD","colId":"locked","name":"LGD_RecoveryValue_locked","nodes":[],"ref":1012,"formulaName":"LGD_RecoveryValue_locked","refId":1012,"displayAs":"string"},{"rowId":"AllocationValue","solutionName":"LGD","colId":"value","name":"LGD_AllocationValue_value","nodes":[],"displaytype":"number","ref":1013,"formulaName":"LGD_AllocationValue_value","refId":1013,"displayAs":"number","frequency":"document","datatype":"number","parentName":"FacilityInputContainer_value"},{"rowId":"AllocationValue","solutionName":"LGD","colId":"valid","name":"LGD_AllocationValue_valid","nodes":[],"ref":1014,"formulaName":"LGD_AllocationValue_valid","refId":1014,"displayAs":"string"},{"rowId":"AllocationValue","solutionName":"LGD","colId":"title","name":"LGD_AllocationValue_title","nodes":[],"ref":1015,"formulaName":"LGD_AllocationValue_title","refId":1015,"displayAs":"string"},{"rowId":"CollateralAgreementContainer","solutionName":"LGD","colId":"value","name":"LGD_CollateralAgreementContainer_value","nodes":[{"name":"LGD_CollateralECValue_value","rowId":"CollateralECValue","colId":"value","identifier":"LGD_CollateralAgreementContainer_value"},{"name":"LGD_RegistrationContainer_value","rowId":"RegistrationContainer","colId":"value","identifier":"LGD_CollateralAgreementContainer_value"},{"name":"LGD_CollateralAgreement_value","rowId":"CollateralAgreement","colId":"value","identifier":"LGD_CollateralAgreementContainer_value"}],"displaytype":"paragraph","ref":1016,"formulaName":"LGD_CollateralAgreementContainer_value","refId":1016,"displayAs":"paragraph","frequency":"none","tuple":true,"nestedTupleDepth":0,"tupleDefinition":true,"datatype":"string","parentName":"FacilityInputContainer_value"},{"rowId":"CollateralAgreementContainer","solutionName":"LGD","colId":"title","name":"LGD_CollateralAgreementContainer_title","nodes":[],"ref":1017,"formulaName":"LGD_CollateralAgreementContainer_title","refId":1017,"displayAs":"string"},{"rowId":"CollateralECValue","solutionName":"LGD","colId":"value","name":"LGD_CollateralECValue_value","nodes":[],"displaytype":"number","ref":1018,"formulaName":"LGD_CollateralECValue_value","refId":1018,"displayAs":"number","frequency":"document","tuple":true,"nestedTupleDepth":1,"tupleDefinitionName":"CollateralAgreementContainer","tupleProperty":true,"datatype":"number","parentName":"CollateralAgreementContainer_value"},{"rowId":"CollateralECValue","solutionName":"LGD","colId":"valid","name":"LGD_CollateralECValue_valid","nodes":[],"ref":1019,"formulaName":"LGD_CollateralECValue_valid","refId":1019,"displayAs":"string"},{"rowId":"CollateralECValue","solutionName":"LGD","colId":"title","name":"LGD_CollateralECValue_title","nodes":[],"ref":1020,"formulaName":"LGD_CollateralECValue_title","refId":1020,"displayAs":"string"},{"rowId":"CollateralECValue","solutionName":"LGD","colId":"locked","name":"LGD_CollateralECValue_locked","nodes":[],"ref":1021,"formulaName":"LGD_CollateralECValue_locked","refId":1021,"displayAs":"string"},{"rowId":"RegistrationContainer","solutionName":"LGD","colId":"value","name":"LGD_RegistrationContainer_value","nodes":[{"name":"LGD_CollateralObject_value","rowId":"CollateralObject","colId":"value","identifier":"LGD_RegistrationContainer_value"},{"name":"LGD_CollateralObjectECValue_value","rowId":"CollateralObjectECValue","colId":"value","identifier":"LGD_RegistrationContainer_value"}],"displaytype":"paragraph","ref":1022,"formulaName":"LGD_RegistrationContainer_value","refId":1022,"displayAs":"paragraph","frequency":"none","tuple":true,"nestedTupleDepth":1,"tupleDefinition":true,"datatype":"string","tupleDefinitionName":"CollateralAgreementContainer","tupleProperty":true,"parentName":"CollateralAgreementContainer_value"},{"rowId":"RegistrationContainer","solutionName":"LGD","colId":"title","name":"LGD_RegistrationContainer_title","nodes":[],"ref":1023,"formulaName":"LGD_RegistrationContainer_title","refId":1023,"displayAs":"string"},{"rowId":"CollateralObject","solutionName":"LGD","colId":"value","name":"LGD_CollateralObject_value","nodes":[{"name":"LGD_CollateralObjectReferenceNumber_value","rowId":"CollateralObjectReferenceNumber","colId":"value","identifier":"LGD_CollateralObject_value"},{"name":"LGD_DefinitionCode_value","rowId":"DefinitionCode","colId":"value","identifier":"LGD_CollateralObject_value"},{"name":"LGD_MarketValue_value","rowId":"MarketValue","colId":"value","identifier":"LGD_CollateralObject_value"},{"name":"LGD_OtherRank_value","rowId":"OtherRank","colId":"value","identifier":"LGD_CollateralObject_value"},{"name":"LGD_Discount_value","rowId":"Discount","colId":"value","identifier":"LGD_CollateralObject_value"}],"displaytype":"none","ref":1024,"formulaName":"LGD_CollateralObject_value","refId":1024,"displayAs":"none","frequency":"document","tuple":true,"nestedTupleDepth":2,"tupleDefinitionName":"RegistrationContainer","tupleProperty":true,"datatype":"string","parentName":"RegistrationContainer_value"},{"rowId":"CollateralObject","solutionName":"LGD","colId":"title","name":"LGD_CollateralObject_title","nodes":[],"ref":1025,"formulaName":"LGD_CollateralObject_title","refId":1025,"displayAs":"string"},{"rowId":"CollateralObjectReferenceNumber","solutionName":"LGD","colId":"value","name":"LGD_CollateralObjectReferenceNumber_value","nodes":[],"displaytype":"string","ref":1026,"formulaName":"LGD_CollateralObjectReferenceNumber_value","refId":1026,"displayAs":"string","frequency":"document","tuple":true,"nestedTupleDepth":2,"tupleDefinitionName":"RegistrationContainer","tupleProperty":true,"datatype":"string","parentName":"CollateralObject_value"},{"rowId":"CollateralObjectReferenceNumber","solutionName":"LGD","colId":"valid","name":"LGD_CollateralObjectReferenceNumber_valid","nodes":[],"ref":1027,"formulaName":"LGD_CollateralObjectReferenceNumber_valid","refId":1027,"displayAs":"string"},{"rowId":"CollateralObjectReferenceNumber","solutionName":"LGD","colId":"title","name":"LGD_CollateralObjectReferenceNumber_title","nodes":[],"ref":1028,"formulaName":"LGD_CollateralObjectReferenceNumber_title","refId":1028,"displayAs":"string"},{"rowId":"DefinitionCode","solutionName":"LGD","colId":"value","name":"LGD_DefinitionCode_value","nodes":[],"displaytype":"string","ref":1029,"formulaName":"LGD_DefinitionCode_value","refId":1029,"displayAs":"string","frequency":"document","tuple":true,"nestedTupleDepth":2,"tupleDefinitionName":"RegistrationContainer","tupleProperty":true,"datatype":"string","parentName":"CollateralObject_value"},{"rowId":"DefinitionCode","solutionName":"LGD","colId":"valid","name":"LGD_DefinitionCode_valid","nodes":[],"ref":1030,"formulaName":"LGD_DefinitionCode_valid","refId":1030,"displayAs":"string"},{"rowId":"DefinitionCode","solutionName":"LGD","colId":"title","name":"LGD_DefinitionCode_title","nodes":[],"ref":1031,"formulaName":"LGD_DefinitionCode_title","refId":1031,"displayAs":"string"},{"rowId":"MarketValue","solutionName":"LGD","colId":"value","name":"LGD_MarketValue_value","nodes":[{"name":"LGD_Currency_value","rowId":"Currency","colId":"value","identifier":"LGD_MarketValue_value"},{"name":"LGD_Amount_value","rowId":"Amount","colId":"value","identifier":"LGD_MarketValue_value"}],"displaytype":"none","ref":1032,"formulaName":"LGD_MarketValue_value","refId":1032,"displayAs":"none","frequency":"document","tuple":true,"nestedTupleDepth":2,"tupleDefinitionName":"RegistrationContainer","tupleProperty":true,"datatype":"string","parentName":"CollateralObject_value"},{"rowId":"MarketValue","solutionName":"LGD","colId":"title","name":"LGD_MarketValue_title","nodes":[],"ref":1033,"formulaName":"LGD_MarketValue_title","refId":1033,"displayAs":"string"},{"rowId":"Currency","solutionName":"LGD","colId":"value","name":"LGD_Currency_value","nodes":[],"displaytype":"string","ref":1034,"formulaName":"LGD_Currency_value","refId":1034,"displayAs":"string","frequency":"document","tuple":true,"nestedTupleDepth":2,"tupleDefinitionName":"RegistrationContainer","tupleProperty":true,"datatype":"string","parentName":"MarketValue_value"},{"rowId":"Currency","solutionName":"LGD","colId":"valid","name":"LGD_Currency_valid","nodes":[],"ref":1035,"formulaName":"LGD_Currency_valid","refId":1035,"displayAs":"string"},{"rowId":"Currency","solutionName":"LGD","colId":"title","name":"LGD_Currency_title","nodes":[],"ref":1036,"formulaName":"LGD_Currency_title","refId":1036,"displayAs":"string"},{"rowId":"Amount","solutionName":"LGD","colId":"value","name":"LGD_Amount_value","nodes":[],"displaytype":"number","ref":1037,"formulaName":"LGD_Amount_value","refId":1037,"displayAs":"number","frequency":"document","tuple":true,"nestedTupleDepth":2,"tupleDefinitionName":"RegistrationContainer","tupleProperty":true,"datatype":"number","parentName":"MarketValue_value"},{"rowId":"Amount","solutionName":"LGD","colId":"valid","name":"LGD_Amount_valid","nodes":[],"ref":1038,"formulaName":"LGD_Amount_valid","refId":1038,"displayAs":"string"},{"rowId":"Amount","solutionName":"LGD","colId":"title","name":"LGD_Amount_title","nodes":[],"ref":1039,"formulaName":"LGD_Amount_title","refId":1039,"displayAs":"string"},{"rowId":"OtherRank","solutionName":"LGD","colId":"value","name":"LGD_OtherRank_value","nodes":[],"displaytype":"number","ref":1040,"formulaName":"LGD_OtherRank_value","refId":1040,"displayAs":"number","frequency":"document","tuple":true,"nestedTupleDepth":2,"tupleDefinitionName":"RegistrationContainer","tupleProperty":true,"datatype":"number","parentName":"CollateralObject_value"},{"rowId":"OtherRank","solutionName":"LGD","colId":"valid","name":"LGD_OtherRank_valid","nodes":[],"ref":1041,"formulaName":"LGD_OtherRank_valid","refId":1041,"displayAs":"string"},{"rowId":"OtherRank","solutionName":"LGD","colId":"title","name":"LGD_OtherRank_title","nodes":[],"ref":1042,"formulaName":"LGD_OtherRank_title","refId":1042,"displayAs":"string"},{"rowId":"Discount","solutionName":"LGD","colId":"value","name":"LGD_Discount_value","nodes":[],"displaytype":"number","ref":1043,"formulaName":"LGD_Discount_value","refId":1043,"displayAs":"number","frequency":"document","tuple":true,"nestedTupleDepth":2,"tupleDefinitionName":"RegistrationContainer","tupleProperty":true,"datatype":"number","parentName":"CollateralObject_value"},{"rowId":"Discount","solutionName":"LGD","colId":"valid","name":"LGD_Discount_valid","nodes":[],"ref":1044,"formulaName":"LGD_Discount_valid","refId":1044,"displayAs":"string"},{"rowId":"Discount","solutionName":"LGD","colId":"title","name":"LGD_Discount_title","nodes":[],"ref":1045,"formulaName":"LGD_Discount_title","refId":1045,"displayAs":"string"},{"rowId":"CollateralObjectECValue","solutionName":"LGD","colId":"value","name":"LGD_CollateralObjectECValue_value","nodes":[],"displaytype":"number","ref":1046,"formulaName":"LGD_CollateralObjectECValue_value","refId":1046,"displayAs":"number","decimals":2,"frequency":"document","tuple":true,"nestedTupleDepth":2,"tupleDefinitionName":"RegistrationContainer","tupleProperty":true,"datatype":"number","parentName":"RegistrationContainer_value"},{"rowId":"CollateralObjectECValue","solutionName":"LGD","colId":"valid","name":"LGD_CollateralObjectECValue_valid","nodes":[],"ref":1047,"formulaName":"LGD_CollateralObjectECValue_valid","refId":1047,"displayAs":"string"},{"rowId":"CollateralObjectECValue","solutionName":"LGD","colId":"title","name":"LGD_CollateralObjectECValue_title","nodes":[],"ref":1048,"formulaName":"LGD_CollateralObjectECValue_title","refId":1048,"displayAs":"string"},{"rowId":"CollateralObjectECValue","solutionName":"LGD","colId":"locked","name":"LGD_CollateralObjectECValue_locked","nodes":[],"ref":1049,"formulaName":"LGD_CollateralObjectECValue_locked","refId":1049,"displayAs":"string"},{"rowId":"CollateralAgreement","solutionName":"LGD","colId":"value","name":"LGD_CollateralAgreement_value","nodes":[{"name":"LGD_CollateralAgreementReferenceNumber_value","rowId":"CollateralAgreementReferenceNumber","colId":"value","identifier":"LGD_CollateralAgreement_value"},{"name":"LGD_CollateralAgreementDefinitionCode_value","rowId":"CollateralAgreementDefinitionCode","colId":"value","identifier":"LGD_CollateralAgreement_value"},{"name":"LGD_SecuredAmount_value","rowId":"SecuredAmount","colId":"value","identifier":"LGD_CollateralAgreement_value"}],"displaytype":"none","ref":1050,"formulaName":"LGD_CollateralAgreement_value","refId":1050,"displayAs":"none","frequency":"document","tuple":true,"nestedTupleDepth":1,"tupleDefinitionName":"CollateralAgreementContainer","tupleProperty":true,"datatype":"string","parentName":"CollateralAgreementContainer_value"},{"rowId":"CollateralAgreement","solutionName":"LGD","colId":"title","name":"LGD_CollateralAgreement_title","nodes":[],"ref":1051,"formulaName":"LGD_CollateralAgreement_title","refId":1051,"displayAs":"string"},{"rowId":"CollateralAgreementReferenceNumber","solutionName":"LGD","colId":"value","name":"LGD_CollateralAgreementReferenceNumber_value","nodes":[],"displaytype":"string","ref":1052,"formulaName":"LGD_CollateralAgreementReferenceNumber_value","refId":1052,"displayAs":"string","frequency":"document","tuple":true,"nestedTupleDepth":1,"tupleDefinitionName":"CollateralAgreementContainer","tupleProperty":true,"datatype":"string","parentName":"CollateralAgreement_value"},{"rowId":"CollateralAgreementReferenceNumber","solutionName":"LGD","colId":"valid","name":"LGD_CollateralAgreementReferenceNumber_valid","nodes":[],"ref":1053,"formulaName":"LGD_CollateralAgreementReferenceNumber_valid","refId":1053,"displayAs":"string"},{"rowId":"CollateralAgreementReferenceNumber","solutionName":"LGD","colId":"title","name":"LGD_CollateralAgreementReferenceNumber_title","nodes":[],"ref":1054,"formulaName":"LGD_CollateralAgreementReferenceNumber_title","refId":1054,"displayAs":"string"},{"rowId":"CollateralAgreementDefinitionCode","solutionName":"LGD","colId":"value","name":"LGD_CollateralAgreementDefinitionCode_value","nodes":[],"displaytype":"string","ref":1055,"formulaName":"LGD_CollateralAgreementDefinitionCode_value","refId":1055,"displayAs":"string","frequency":"document","tuple":true,"nestedTupleDepth":1,"tupleDefinitionName":"CollateralAgreementContainer","tupleProperty":true,"datatype":"string","parentName":"CollateralAgreement_value"},{"rowId":"CollateralAgreementDefinitionCode","solutionName":"LGD","colId":"valid","name":"LGD_CollateralAgreementDefinitionCode_valid","nodes":[],"ref":1056,"formulaName":"LGD_CollateralAgreementDefinitionCode_valid","refId":1056,"displayAs":"string"},{"rowId":"CollateralAgreementDefinitionCode","solutionName":"LGD","colId":"title","name":"LGD_CollateralAgreementDefinitionCode_title","nodes":[],"ref":1057,"formulaName":"LGD_CollateralAgreementDefinitionCode_title","refId":1057,"displayAs":"string"},{"rowId":"SecuredAmount","solutionName":"LGD","colId":"value","name":"LGD_SecuredAmount_value","nodes":[{"name":"LGD_SecuredAmountCurrency_value","rowId":"SecuredAmountCurrency","colId":"value","identifier":"LGD_SecuredAmount_value"},{"name":"LGD_CollateralAgreementAmount_value","rowId":"CollateralAgreementAmount","colId":"value","identifier":"LGD_SecuredAmount_value"}],"displaytype":"none","ref":1058,"formulaName":"LGD_SecuredAmount_value","refId":1058,"displayAs":"none","frequency":"document","tuple":true,"nestedTupleDepth":1,"tupleDefinitionName":"CollateralAgreementContainer","tupleProperty":true,"datatype":"string","parentName":"CollateralAgreement_value"},{"rowId":"SecuredAmount","solutionName":"LGD","colId":"title","name":"LGD_SecuredAmount_title","nodes":[],"ref":1059,"formulaName":"LGD_SecuredAmount_title","refId":1059,"displayAs":"string"},{"rowId":"SecuredAmountCurrency","solutionName":"LGD","colId":"value","name":"LGD_SecuredAmountCurrency_value","nodes":[],"displaytype":"string","ref":1060,"formulaName":"LGD_SecuredAmountCurrency_value","refId":1060,"displayAs":"string","frequency":"document","tuple":true,"nestedTupleDepth":1,"tupleDefinitionName":"CollateralAgreementContainer","tupleProperty":true,"datatype":"string","parentName":"SecuredAmount_value"},{"rowId":"SecuredAmountCurrency","solutionName":"LGD","colId":"valid","name":"LGD_SecuredAmountCurrency_valid","nodes":[],"ref":1061,"formulaName":"LGD_SecuredAmountCurrency_valid","refId":1061,"displayAs":"string"},{"rowId":"SecuredAmountCurrency","solutionName":"LGD","colId":"title","name":"LGD_SecuredAmountCurrency_title","nodes":[],"ref":1062,"formulaName":"LGD_SecuredAmountCurrency_title","refId":1062,"displayAs":"string"},{"rowId":"CollateralAgreementAmount","solutionName":"LGD","colId":"value","name":"LGD_CollateralAgreementAmount_value","nodes":[],"displaytype":"number","ref":1063,"formulaName":"LGD_CollateralAgreementAmount_value","refId":1063,"displayAs":"number","frequency":"document","tuple":true,"nestedTupleDepth":1,"tupleDefinitionName":"CollateralAgreementContainer","tupleProperty":true,"datatype":"number","parentName":"SecuredAmount_value"},{"rowId":"CollateralAgreementAmount","solutionName":"LGD","colId":"valid","name":"LGD_CollateralAgreementAmount_valid","nodes":[],"ref":1064,"formulaName":"LGD_CollateralAgreementAmount_valid","refId":1064,"displayAs":"string"},{"rowId":"CollateralAgreementAmount","solutionName":"LGD","colId":"title","name":"LGD_CollateralAgreementAmount_title","nodes":[],"ref":1065,"formulaName":"LGD_CollateralAgreementAmount_title","refId":1065,"displayAs":"string"},{"rowId":"FacilityDetails","solutionName":"LGD","colId":"value","name":"LGD_FacilityDetails_value","nodes":[{"name":"LGD_FacilityIdentification_value","rowId":"FacilityIdentification","colId":"value","identifier":"LGD_FacilityDetails_value"},{"name":"LGD_FacilityDefinitionCode_value","rowId":"FacilityDefinitionCode","colId":"value","identifier":"LGD_FacilityDetails_value"}],"displaytype":"none","ref":1066,"formulaName":"LGD_FacilityDetails_value","refId":1066,"displayAs":"none","frequency":"document","datatype":"string","parentName":"FacilityInputContainer_value"},{"rowId":"FacilityDetails","solutionName":"LGD","colId":"title","name":"LGD_FacilityDetails_title","nodes":[],"ref":1067,"formulaName":"LGD_FacilityDetails_title","refId":1067,"displayAs":"string"},{"rowId":"FacilityIdentification","solutionName":"LGD","colId":"value","name":"LGD_FacilityIdentification_value","nodes":[{"name":"LGD_ReferenceId_value","rowId":"ReferenceId","colId":"value","identifier":"LGD_FacilityIdentification_value"},{"name":"LGD_DisplayId_value","rowId":"DisplayId","colId":"value","identifier":"LGD_FacilityIdentification_value"}],"displaytype":"none","ref":1068,"formulaName":"LGD_FacilityIdentification_value","refId":1068,"displayAs":"none","frequency":"document","datatype":"string","parentName":"FacilityDetails_value"},{"rowId":"FacilityIdentification","solutionName":"LGD","colId":"title","name":"LGD_FacilityIdentification_title","nodes":[],"ref":1069,"formulaName":"LGD_FacilityIdentification_title","refId":1069,"displayAs":"string"},{"rowId":"ReferenceId","solutionName":"LGD","colId":"value","name":"LGD_ReferenceId_value","nodes":[],"displaytype":"string","ref":1070,"formulaName":"LGD_ReferenceId_value","refId":1070,"displayAs":"string","frequency":"document","datatype":"string","parentName":"FacilityIdentification_value"},{"rowId":"ReferenceId","solutionName":"LGD","colId":"valid","name":"LGD_ReferenceId_valid","nodes":[],"ref":1071,"formulaName":"LGD_ReferenceId_valid","refId":1071,"displayAs":"string"},{"rowId":"ReferenceId","solutionName":"LGD","colId":"title","name":"LGD_ReferenceId_title","nodes":[],"ref":1072,"formulaName":"LGD_ReferenceId_title","refId":1072,"displayAs":"string"},{"rowId":"DisplayId","solutionName":"LGD","colId":"value","name":"LGD_DisplayId_value","nodes":[],"displaytype":"string","ref":1073,"formulaName":"LGD_DisplayId_value","refId":1073,"displayAs":"string","frequency":"document","datatype":"string","parentName":"FacilityIdentification_value"},{"rowId":"DisplayId","solutionName":"LGD","colId":"valid","name":"LGD_DisplayId_valid","nodes":[],"ref":1074,"formulaName":"LGD_DisplayId_valid","refId":1074,"displayAs":"string"},{"rowId":"DisplayId","solutionName":"LGD","colId":"title","name":"LGD_DisplayId_title","nodes":[],"ref":1075,"formulaName":"LGD_DisplayId_title","refId":1075,"displayAs":"string"},{"rowId":"FacilityDefinitionCode","solutionName":"LGD","colId":"value","name":"LGD_FacilityDefinitionCode_value","nodes":[],"displaytype":"string","ref":1076,"formulaName":"LGD_FacilityDefinitionCode_value","refId":1076,"displayAs":"string","frequency":"document","datatype":"string","parentName":"FacilityDetails_value"},{"rowId":"FacilityDefinitionCode","solutionName":"LGD","colId":"valid","name":"LGD_FacilityDefinitionCode_valid","nodes":[],"ref":1077,"formulaName":"LGD_FacilityDefinitionCode_valid","refId":1077,"displayAs":"string"},{"rowId":"FacilityDefinitionCode","solutionName":"LGD","colId":"title","name":"LGD_FacilityDefinitionCode_title","nodes":[],"ref":1078,"formulaName":"LGD_FacilityDefinitionCode_title","refId":1078,"displayAs":"string"},{"rowId":"LimitDetails","solutionName":"LGD","colId":"value","name":"LGD_LimitDetails_value","nodes":[{"name":"LGD_Limiet_value","rowId":"Limiet","colId":"value","identifier":"LGD_LimitDetails_value"},{"name":"LGD_ExposureAtDefault_value","rowId":"ExposureAtDefault","colId":"value","identifier":"LGD_LimitDetails_value"},{"name":"LGD_ExpectedLimitUsage_value","rowId":"ExpectedLimitUsage","colId":"value","identifier":"LGD_LimitDetails_value"}],"displaytype":"none","ref":1079,"formulaName":"LGD_LimitDetails_value","refId":1079,"displayAs":"none","frequency":"document","datatype":"string","parentName":"FacilityInputContainer_value"},{"rowId":"LimitDetails","solutionName":"LGD","colId":"title","name":"LGD_LimitDetails_title","nodes":[],"ref":1080,"formulaName":"LGD_LimitDetails_title","refId":1080,"displayAs":"string"},{"rowId":"Limiet","solutionName":"LGD","colId":"value","name":"LGD_Limiet_value","nodes":[],"displaytype":"number","ref":1081,"formulaName":"LGD_Limiet_value","refId":1081,"displayAs":"number","frequency":"document","datatype":"number","parentName":"LimitDetails_value"},{"rowId":"Limiet","solutionName":"LGD","colId":"valid","name":"LGD_Limiet_valid","nodes":[],"ref":1082,"formulaName":"LGD_Limiet_valid","refId":1082,"displayAs":"string"},{"rowId":"Limiet","solutionName":"LGD","colId":"title","name":"LGD_Limiet_title","nodes":[],"ref":1083,"formulaName":"LGD_Limiet_title","refId":1083,"displayAs":"string"},{"rowId":"ExposureAtDefault","solutionName":"LGD","colId":"value","name":"LGD_ExposureAtDefault_value","nodes":[],"displaytype":"number","ref":1084,"formulaName":"LGD_ExposureAtDefault_value","refId":1084,"displayAs":"number","frequency":"document","datatype":"number","parentName":"LimitDetails_value"},{"rowId":"ExposureAtDefault","solutionName":"LGD","colId":"valid","name":"LGD_ExposureAtDefault_valid","nodes":[],"ref":1085,"formulaName":"LGD_ExposureAtDefault_valid","refId":1085,"displayAs":"string"},{"rowId":"ExposureAtDefault","solutionName":"LGD","colId":"title","name":"LGD_ExposureAtDefault_title","nodes":[],"ref":1086,"formulaName":"LGD_ExposureAtDefault_title","refId":1086,"displayAs":"string"},{"rowId":"ExpectedLimitUsage","solutionName":"LGD","colId":"value","name":"LGD_ExpectedLimitUsage_value","nodes":[],"displaytype":"percentage","ref":1087,"formulaName":"LGD_ExpectedLimitUsage_value","refId":1087,"displayAs":"percentage","frequency":"document","datatype":"number","parentName":"LimitDetails_value"},{"rowId":"ExpectedLimitUsage","solutionName":"LGD","colId":"valid","name":"LGD_ExpectedLimitUsage_valid","nodes":[],"ref":1088,"formulaName":"LGD_ExpectedLimitUsage_valid","refId":1088,"displayAs":"string"},{"rowId":"ExpectedLimitUsage","solutionName":"LGD","colId":"title","name":"LGD_ExpectedLimitUsage_title","nodes":[],"ref":1089,"formulaName":"LGD_ExpectedLimitUsage_title","refId":1089,"displayAs":"string"},{"rowId":"AllocatedGuarantee","solutionName":"LGD","colId":"value","name":"LGD_AllocatedGuarantee_value","nodes":[{"name":"LGD_AllocatedGuaranteeReferenceNumber_value","rowId":"AllocatedGuaranteeReferenceNumber","colId":"value","identifier":"LGD_AllocatedGuarantee_value"},{"name":"LGD_GuaranteeAgreement_value","rowId":"GuaranteeAgreement","colId":"value","identifier":"LGD_AllocatedGuarantee_value"}],"displaytype":"paragraph","ref":1090,"formulaName":"LGD_AllocatedGuarantee_value","refId":1090,"displayAs":"paragraph","frequency":"none","tuple":true,"nestedTupleDepth":0,"tupleDefinition":true,"datatype":"string","parentName":"FacilityInputContainer_value"},{"rowId":"AllocatedGuarantee","solutionName":"LGD","colId":"title","name":"LGD_AllocatedGuarantee_title","nodes":[],"ref":1091,"formulaName":"LGD_AllocatedGuarantee_title","refId":1091,"displayAs":"string"},{"rowId":"AllocatedGuaranteeReferenceNumber","solutionName":"LGD","colId":"value","name":"LGD_AllocatedGuaranteeReferenceNumber_value","nodes":[],"displaytype":"string","ref":1092,"formulaName":"LGD_AllocatedGuaranteeReferenceNumber_value","refId":1092,"displayAs":"string","frequency":"document","tuple":true,"nestedTupleDepth":1,"tupleDefinitionName":"AllocatedGuarantee","tupleProperty":true,"datatype":"string","parentName":"AllocatedGuarantee_value"},{"rowId":"AllocatedGuaranteeReferenceNumber","solutionName":"LGD","colId":"valid","name":"LGD_AllocatedGuaranteeReferenceNumber_valid","nodes":[],"ref":1093,"formulaName":"LGD_AllocatedGuaranteeReferenceNumber_valid","refId":1093,"displayAs":"string"},{"rowId":"AllocatedGuaranteeReferenceNumber","solutionName":"LGD","colId":"title","name":"LGD_AllocatedGuaranteeReferenceNumber_title","nodes":[],"ref":1094,"formulaName":"LGD_AllocatedGuaranteeReferenceNumber_title","refId":1094,"displayAs":"string"},{"rowId":"GuaranteeAgreement","solutionName":"LGD","colId":"value","name":"LGD_GuaranteeAgreement_value","nodes":[{"name":"LGD_GuaranteeAgreementReferenceNumber_value","rowId":"GuaranteeAgreementReferenceNumber","colId":"value","identifier":"LGD_GuaranteeAgreement_value"},{"name":"LGD_GuaranteeAgreementDefinitionCode_value","rowId":"GuaranteeAgreementDefinitionCode","colId":"value","identifier":"LGD_GuaranteeAgreement_value"}],"displaytype":"paragraph","ref":1095,"formulaName":"LGD_GuaranteeAgreement_value","refId":1095,"displayAs":"paragraph","frequency":"none","tuple":true,"nestedTupleDepth":1,"tupleDefinition":true,"datatype":"string","tupleDefinitionName":"AllocatedGuarantee","tupleProperty":true,"parentName":"AllocatedGuarantee_value"},{"rowId":"GuaranteeAgreement","solutionName":"LGD","colId":"title","name":"LGD_GuaranteeAgreement_title","nodes":[],"ref":1096,"formulaName":"LGD_GuaranteeAgreement_title","refId":1096,"displayAs":"string"},{"rowId":"GuaranteeAgreementReferenceNumber","solutionName":"LGD","colId":"value","name":"LGD_GuaranteeAgreementReferenceNumber_value","nodes":[],"displaytype":"string","ref":1097,"formulaName":"LGD_GuaranteeAgreementReferenceNumber_value","refId":1097,"displayAs":"string","frequency":"document","tuple":true,"nestedTupleDepth":2,"tupleDefinitionName":"GuaranteeAgreement","tupleProperty":true,"datatype":"string","parentName":"GuaranteeAgreement_value"},{"rowId":"GuaranteeAgreementReferenceNumber","solutionName":"LGD","colId":"valid","name":"LGD_GuaranteeAgreementReferenceNumber_valid","nodes":[],"ref":1098,"formulaName":"LGD_GuaranteeAgreementReferenceNumber_valid","refId":1098,"displayAs":"string"},{"rowId":"GuaranteeAgreementReferenceNumber","solutionName":"LGD","colId":"title","name":"LGD_GuaranteeAgreementReferenceNumber_title","nodes":[],"ref":1099,"formulaName":"LGD_GuaranteeAgreementReferenceNumber_title","refId":1099,"displayAs":"string"},{"rowId":"GuaranteeAgreementDefinitionCode","solutionName":"LGD","colId":"value","name":"LGD_GuaranteeAgreementDefinitionCode_value","nodes":[],"displaytype":"string","ref":1100,"formulaName":"LGD_GuaranteeAgreementDefinitionCode_value","refId":1100,"displayAs":"string","frequency":"document","tuple":true,"nestedTupleDepth":2,"tupleDefinitionName":"GuaranteeAgreement","tupleProperty":true,"datatype":"string","parentName":"GuaranteeAgreement_value"},{"rowId":"GuaranteeAgreementDefinitionCode","solutionName":"LGD","colId":"valid","name":"LGD_GuaranteeAgreementDefinitionCode_valid","nodes":[],"ref":1101,"formulaName":"LGD_GuaranteeAgreementDefinitionCode_valid","refId":1101,"displayAs":"string"},{"rowId":"GuaranteeAgreementDefinitionCode","solutionName":"LGD","colId":"title","name":"LGD_GuaranteeAgreementDefinitionCode_title","nodes":[],"ref":1102,"formulaName":"LGD_GuaranteeAgreementDefinitionCode_title","refId":1102,"displayAs":"string"},{"rowId":"AllocatedCollateral","solutionName":"LGD","colId":"value","name":"LGD_AllocatedCollateral_value","nodes":[{"name":"LGD_AllocatedCollateralReferenceNumber_value","rowId":"AllocatedCollateralReferenceNumber","colId":"value","identifier":"LGD_AllocatedCollateral_value"}],"displaytype":"paragraph","ref":1103,"formulaName":"LGD_AllocatedCollateral_value","refId":1103,"displayAs":"paragraph","frequency":"none","tuple":true,"nestedTupleDepth":0,"tupleDefinition":true,"datatype":"string","parentName":"FacilityInputContainer_value"},{"rowId":"AllocatedCollateral","solutionName":"LGD","colId":"title","name":"LGD_AllocatedCollateral_title","nodes":[],"ref":1104,"formulaName":"LGD_AllocatedCollateral_title","refId":1104,"displayAs":"string"},{"rowId":"AllocatedCollateralReferenceNumber","solutionName":"LGD","colId":"value","name":"LGD_AllocatedCollateralReferenceNumber_value","nodes":[],"displaytype":"number","ref":1105,"formulaName":"LGD_AllocatedCollateralReferenceNumber_value","refId":1105,"displayAs":"number","frequency":"document","tuple":true,"nestedTupleDepth":1,"tupleDefinitionName":"AllocatedCollateral","tupleProperty":true,"datatype":"number","parentName":"AllocatedCollateral_value"},{"rowId":"AllocatedCollateralReferenceNumber","solutionName":"LGD","colId":"valid","name":"LGD_AllocatedCollateralReferenceNumber_valid","nodes":[],"ref":1106,"formulaName":"LGD_AllocatedCollateralReferenceNumber_valid","refId":1106,"displayAs":"string"},{"rowId":"AllocatedCollateralReferenceNumber","solutionName":"LGD","colId":"title","name":"LGD_AllocatedCollateralReferenceNumber_title","nodes":[],"ref":1107,"formulaName":"LGD_AllocatedCollateralReferenceNumber_title","refId":1107,"displayAs":"string"},{"rowId":"LGDCalculationOutputContainer","solutionName":"LGD","colId":"value","name":"LGD_LGDCalculationOutputContainer_value","nodes":[{"name":"LGD_CounterParty_value","rowId":"CounterParty","colId":"value","identifier":"LGD_LGDCalculationOutputContainer_value"},{"name":"LGD_FacilityResultContainer_value","rowId":"FacilityResultContainer","colId":"value","identifier":"LGD_LGDCalculationOutputContainer_value"},{"name":"LGD_FacilityReferenceNumber_value","rowId":"FacilityReferenceNumber","colId":"value","identifier":"LGD_LGDCalculationOutputContainer_value"},{"name":"LGD_LGD_value","rowId":"LGD","colId":"value","identifier":"LGD_LGDCalculationOutputContainer_value"},{"name":"LGD_FacilityCoverageField_value","rowId":"FacilityCoverageField","colId":"value","identifier":"LGD_LGDCalculationOutputContainer_value"},{"name":"LGD_LGDClass_value","rowId":"LGDClass","colId":"value","identifier":"LGD_LGDCalculationOutputContainer_value"},{"name":"LGD_DownturnLGDIncludingMOCField_value","rowId":"DownturnLGDIncludingMOCField","colId":"value","identifier":"LGD_LGDCalculationOutputContainer_value"},{"name":"LGD_LGDIncludingMOCField_value","rowId":"LGDIncludingMOCField","colId":"value","identifier":"LGD_LGDCalculationOutputContainer_value"},{"name":"LGD_BestEstimatedLGD_value","rowId":"BestEstimatedLGD","colId":"value","identifier":"LGD_LGDCalculationOutputContainer_value"}],"displaytype":"Output","ref":1108,"formulaName":"LGD_LGDCalculationOutputContainer_value","refId":1108,"displayAs":"Output","frequency":"document","datatype":"string","parentName":"Q_variable root_value"},{"rowId":"LGDCalculationOutputContainer","solutionName":"LGD","colId":"title","name":"LGD_LGDCalculationOutputContainer_title","nodes":[],"ref":1109,"formulaName":"LGD_LGDCalculationOutputContainer_title","refId":1109,"displayAs":"string"},{"rowId":"CounterParty","solutionName":"LGD","colId":"value","name":"LGD_CounterParty_value","nodes":[],"displaytype":"number","ref":1110,"formulaName":"LGD_CounterParty_value","refId":1110,"displayAs":"number","frequency":"document","datatype":"number","parentName":"LGDCalculationOutputContainer_value"},{"rowId":"CounterParty","solutionName":"LGD","colId":"valid","name":"LGD_CounterParty_valid","nodes":[],"ref":1111,"formulaName":"LGD_CounterParty_valid","refId":1111,"displayAs":"string"},{"rowId":"CounterParty","solutionName":"LGD","colId":"title","name":"LGD_CounterParty_title","nodes":[],"ref":1112,"formulaName":"LGD_CounterParty_title","refId":1112,"displayAs":"string"},{"rowId":"FacilityResultContainer","solutionName":"LGD","colId":"value","name":"LGD_FacilityResultContainer_value","nodes":[],"displaytype":"none","ref":1113,"formulaName":"LGD_FacilityResultContainer_value","refId":1113,"displayAs":"none","frequency":"document","datatype":"string","parentName":"LGDCalculationOutputContainer_value"},{"rowId":"FacilityResultContainer","solutionName":"LGD","colId":"title","name":"LGD_FacilityResultContainer_title","nodes":[],"ref":1114,"formulaName":"LGD_FacilityResultContainer_title","refId":1114,"displayAs":"string"},{"rowId":"FacilityReferenceNumber","solutionName":"LGD","colId":"value","name":"LGD_FacilityReferenceNumber_value","nodes":[],"displaytype":"string","ref":1115,"formulaName":"LGD_FacilityReferenceNumber_value","refId":1115,"displayAs":"string","frequency":"document","datatype":"string","parentName":"LGDCalculationOutputContainer_value"},{"rowId":"FacilityReferenceNumber","solutionName":"LGD","colId":"valid","name":"LGD_FacilityReferenceNumber_valid","nodes":[],"ref":1116,"formulaName":"LGD_FacilityReferenceNumber_valid","refId":1116,"displayAs":"string"},{"rowId":"FacilityReferenceNumber","solutionName":"LGD","colId":"title","name":"LGD_FacilityReferenceNumber_title","nodes":[],"ref":1117,"formulaName":"LGD_FacilityReferenceNumber_title","refId":1117,"displayAs":"string"},{"rowId":"LGD","solutionName":"LGD","colId":"value","name":"LGD_LGD_value","nodes":[],"displaytype":"paragraph","ref":1118,"formulaName":"LGD_LGD_value","refId":1118,"displayAs":"paragraph","frequency":"none","datatype":"string","parentName":"LGDCalculationOutputContainer_value"},{"rowId":"LGD","solutionName":"LGD","colId":"title","name":"LGD_LGD_title","nodes":[],"ref":1119,"formulaName":"LGD_LGD_title","refId":1119,"displayAs":"string"},{"rowId":"FacilityCoverageField","solutionName":"LGD","colId":"value","name":"LGD_FacilityCoverageField_value","nodes":[],"displaytype":"number","ref":1120,"formulaName":"LGD_FacilityCoverageField_value","refId":1120,"displayAs":"number","frequency":"document","datatype":"number","parentName":"LGDCalculationOutputContainer_value"},{"rowId":"FacilityCoverageField","solutionName":"LGD","colId":"valid","name":"LGD_FacilityCoverageField_valid","nodes":[],"ref":1121,"formulaName":"LGD_FacilityCoverageField_valid","refId":1121,"displayAs":"string"},{"rowId":"FacilityCoverageField","solutionName":"LGD","colId":"title","name":"LGD_FacilityCoverageField_title","nodes":[],"ref":1122,"formulaName":"LGD_FacilityCoverageField_title","refId":1122,"displayAs":"string"},{"rowId":"LGDClass","solutionName":"LGD","colId":"value","name":"LGD_LGDClass_value","nodes":[],"displaytype":"number","ref":1123,"formulaName":"LGD_LGDClass_value","refId":1123,"displayAs":"number","frequency":"document","datatype":"string","parentName":"LGDCalculationOutputContainer_value"},{"rowId":"LGDClass","solutionName":"LGD","colId":"title","name":"LGD_LGDClass_title","nodes":[],"ref":1124,"formulaName":"LGD_LGDClass_title","refId":1124,"displayAs":"string"},{"rowId":"DownturnLGDIncludingMOCField","solutionName":"LGD","colId":"value","name":"LGD_DownturnLGDIncludingMOCField_value","nodes":[],"displaytype":"number","ref":1125,"formulaName":"LGD_DownturnLGDIncludingMOCField_value","refId":1125,"displayAs":"number","frequency":"document","datatype":"number","parentName":"LGDCalculationOutputContainer_value"},{"rowId":"DownturnLGDIncludingMOCField","solutionName":"LGD","colId":"valid","name":"LGD_DownturnLGDIncludingMOCField_valid","nodes":[],"ref":1126,"formulaName":"LGD_DownturnLGDIncludingMOCField_valid","refId":1126,"displayAs":"string"},{"rowId":"DownturnLGDIncludingMOCField","solutionName":"LGD","colId":"title","name":"LGD_DownturnLGDIncludingMOCField_title","nodes":[],"ref":1127,"formulaName":"LGD_DownturnLGDIncludingMOCField_title","refId":1127,"displayAs":"string"},{"rowId":"LGDIncludingMOCField","solutionName":"LGD","colId":"value","name":"LGD_LGDIncludingMOCField_value","nodes":[],"displaytype":"number","ref":1128,"formulaName":"LGD_LGDIncludingMOCField_value","refId":1128,"displayAs":"number","frequency":"document","datatype":"number","parentName":"LGDCalculationOutputContainer_value"},{"rowId":"LGDIncludingMOCField","solutionName":"LGD","colId":"valid","name":"LGD_LGDIncludingMOCField_valid","nodes":[],"ref":1129,"formulaName":"LGD_LGDIncludingMOCField_valid","refId":1129,"displayAs":"string"},{"rowId":"LGDIncludingMOCField","solutionName":"LGD","colId":"title","name":"LGD_LGDIncludingMOCField_title","nodes":[],"ref":1130,"formulaName":"LGD_LGDIncludingMOCField_title","refId":1130,"displayAs":"string"},{"rowId":"BestEstimatedLGD","solutionName":"LGD","colId":"value","name":"LGD_BestEstimatedLGD_value","nodes":[],"displaytype":"number","ref":1131,"formulaName":"LGD_BestEstimatedLGD_value","refId":1131,"displayAs":"number","frequency":"document","datatype":"number","parentName":"LGDCalculationOutputContainer_value"},{"rowId":"BestEstimatedLGD","solutionName":"LGD","colId":"valid","name":"LGD_BestEstimatedLGD_valid","nodes":[],"ref":1132,"formulaName":"LGD_BestEstimatedLGD_valid","refId":1132,"displayAs":"string"},{"rowId":"BestEstimatedLGD","solutionName":"LGD","colId":"title","name":"LGD_BestEstimatedLGD_title","nodes":[],"ref":1133,"formulaName":"LGD_BestEstimatedLGD_title","refId":1133,"displayAs":"string"}],"meta":{"view":{"columns":[{"width":50,"name":"name","dataTypeName":"text","fieldName":"name","position":0,"renderTypeName":"text"},{"width":50,"name":"title","dataTypeName":"text","fieldName":"title","position":1,"renderTypeName":"text"},{"width":50,"name":"value","dataTypeName":"text","fieldName":"value","position":2,"renderTypeName":"text"},{"width":50,"name":"notrend","dataTypeName":"text","fieldName":"notrend","position":3,"renderTypeName":"text"},{"width":50,"name":"trend","dataTypeName":"text","fieldName":"trend","position":4,"renderTypeName":"text"},{"name":"visible","dataTypeName":"text","fieldName":"visible","position":5,"renderTypeName":"text"},{"name":"locked","dataTypeName":"text","fieldName":"locked","position":6,"renderTypeName":"text"},{"width":50,"name":"choices","dataTypeName":"text","fieldName":"choices","position":7,"renderTypeName":"text"},{"width":50,"name":"hint","dataTypeName":"text","fieldName":"hint","position":8,"renderTypeName":"text"},{"width":50,"name":"valid","dataTypeName":"text","fieldName":"valid","position":9,"renderTypeName":"text"}]}},"name":"LGD"})
},{"./lme":42,"_process":38,"buffer":36}],44:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
const logger = require('log6')
const jsMath = {"Length":{"args":"v1","body":"return String(v1).length"},"OnER":{"args":"v,onerrv","body":"return isNaN(v) ? onerrv : v"},"Oner":{"args":"v,onerrv","body":"return isNaN(v) ? onerrv : v"},"OnEr":{"args":"v,onerrv","body":"return isNaN(v) ? onerrv : v"},"OnZero":{"args":"v,onzerov","body":"return v > 0 ? v : onzerov"},"SUM":{"args":"values","body":"var returnValue = 0; for (var i = 0; i < values.length; i++) { returnValue += values[i]; } return returnValue;"},"OnNeg":{"args":"arg0,arg1","body":"if (arg0 < 0) { return arg1; } return arg0"},"OnZeroOrNA":{"args":"arg0,arg1","body":"return (arg0 == undefined || isNaN(arg0)) ? arg1 : arg0"},"OnZeroOrNa":{"args":"v,arg1","body":"return (v == undefined || isNaN(v)) ? arg1 : v"},"Exp":{"args":"v","body":"return Math.pow(v, 2)"},"OnERorNA":{"args":"v,onerrornav","body":"if (v == undefined || isNaN(v)) { return onerrornav; } return v"},"Round":{"args":"v,decimals","body":"var pow = Math.pow(10, decimals); return Math.round(v * pow) / pow"},"AVG":{"args":"vs","body":"EJS.AVERAGE(vs)"},"MATCH":{"args":"v,p","body":"return v === undefined? false : v.match(p);"},"ZeroOnNaN":{"args":"v","body":"return parseFloat(isNaN(v) ? 0 : v)"},"VALIDDATE":{"args":"d","body":"if (Object.prototype.toString.call(d) === '[object Date]' ) {if ( isNaN( d.getTime() ) ) {  return false; } else { return true; } }else { return false; }"},"GET":{"args":"url,name","body":"{ $.getJSON( 'js/data.json', function( data ) { CACHE[name] = data; }); }"},"EvaluateAsString":{"args":"value","body":"return String(value)"},"FirstUC":{"args":"value","body":"{ return value }"},"AddMonth":{"args":"value,ammount","body":"{ return 1 }"},"ForAll":{"args":"elements","body":"{ for (var i = 0; i < elements.length; i++) { if (elements[i] ){ return 1 } } return 0; }"},"PROXY":{"args":"proxy","body":"{ return proxy }"},"Pos":{"args":"one,two","body":"{ return (two==null) ? -1 : two.indexOf(one); }"},"Count":{"args":"elements","body":"{ var counter = 0; for (var i = 0; i < elements.length; i++) { if (elements[i] ){ counter++ } } return counter; }"},"ValueT":{"args":"one","body":"{ var retrunValue = 1; while(one.prev.hash){ retrunValue++;one=one.prev } return retrunValue }"},"FirstValueT":{"args":"x,values,first,last","body":"{ return x }"},"LastValueT":{"args":"one","body":"{ return 1 }"},"DMYtoDate":{"args":"d,m,y","body":"{ return new Date(d,m,y).toLocaleString(); }"},"FirstDateInT":{"args":"one","body":"{ return 1 }"},"TableLookup":{"args":"row,col","body":"{ return row + col }"},"GetFrac":{"args":"one","body":"{ return 1 }"},"VSum":{"args":"one","body":"{ return 1 }"},"FormulasetInT":{"args":"one","body":"{ return 1 }"},"RelMut":{"args":"one","body":"{ return 1 }"},"YearInT":{"args":"one","body":"{ return 1 }"},"YearToT":{"args":"one","body":"{ return 1 }"},"GetT":{"args":"one","body":"{ return 1 }"},"FirstTInYear":{"args":"one","body":"{ return 1 }"},"FirstTinYear":{"args":"one","body":"{ return 1 }"},"FirstTinformulaset":{"args":"one","body":"{ return 1 }"},"PeriodInT":{"args":"one","body":"{ return 1 }"},"LastDateInT":{"args":"one","body":"return 2016"},"FirstTinFormulaset":{"args":"one","body":"return 1"},"FesExpression":{"args":"one","body":"return one"},"RoundUp":{"args":"num,precision","body":"return Math.ceil(num * precision) / precision"},"Mut":{"args":"one","body":"return 1"},"VSUM":{"args":"one","body":"{ return 1 }"},"GetPoint":{"args":"one","body":"return 1"},"Exists":{"args":"one","body":"return 1"},"DateToMonth":{"args":"one","body":"return one"},"HAvg":{"args":"one","body":"return 1"},"HOVR":{"args":"one","body":"return 1"},"BaseCurrencyValue":{"args":"one","body":"return 1"},"LastTinFormulaset":{"args":"one","body":"return one"},"FirstLC":{"args":"one","body":"return 1"},"ExpandFraction":{"args":"one","body":"return 1"},"ExpandLevel":{"args":"one","body":"return 1"},"MaxValueT":{"args":"one","body":"return 1"},"ValueOfT":{"args":"one","body":"return 1"},"GuessTerm":{"args":"one","body":"return 1"},"ExpandOriginalValue":{"args":"one","body":"return 1"},"Datetot":{"args":"one","body":"return x"},"DateToT":{"args":"x","body":"return x"},"Not":{"args":"one","body":"return !one"},"not":{"args":"one","body":"return !one"},"Str":{"args":"one","body":"return String(one)"},"DateToYear":{"args":"one","body":"return new Date(one)"},"DateToDay":{"args":"one","body":"return 1"},"CumNormal":{"args":"one","body":"return 1"},"SubStr":{"args":"value,from,to","body":"return String(value).substring(from,to)"},"Val":{"args":"input","body":"return isNaN(input) ? Number(input) : NA"},"SumFor":{"args":"one,two,three,fours","body":"return 1"},"MinMax":{"args":"value,min,max,fallback","body":"return isNaN(value) ? fallback : value < min ? min : value > max ? max : value"},"LN":{"args":"one","body":"return 1"},"BivarNormal":{"args":"one","body":"return 1"},"GoalSeek":{"args":"one","body":"return 1"},"OnNEG":{"args":"a,b","body":"return a < 0 ? a : b"},"OnError":{"args":"a,b","body":"return isNaN(a) ? b : a"},"DateStr":{"args":"date","body":"return new Date(date).toString()"},"DateToYearNum":{"args":"string","body":"return string"},"VAL":{"args":"input","body":"return isNaN(input) ? Number(input) : NA"},"BeforeStr":{"args":"input,before","body":"return String(input).substring(0,String(input).indexOf(String(before)))"},"AfterStr":{"args":"input,after","body":"return String(input).substring(String(input).indexOf(String(after)))"},"MutCalc":1,"CalculatedInBaseCurrency":1,"ScaleFactor":1,"NoTrend":1,"Trend":1,"ApplicationStartDateTime":1,"Values":1,"X":1,"MaxT":1,"NumberOfyears":17,"NA":1e-10,"On":1,"No":0,"Off":0,"Self":1,"True":1,"False":0,"ViewScaleFactor":1,"Backward":1,"Decimals":2}
const Solver = require('js-solver')
const entries = {};
if (!global.MatrixLookup) {
    MatrixLookup = function() {
        return 1;
    }
}
if (!global.MATRIX_VALUES) {
    global.MATRIX_VALUES = {}
}
//add functions found in the jsMath to the global scope
function initJSMath(jsMath) {
    for (var func in jsMath) {
        var mathfunc = jsMath[func];
        if (global[func] === undefined) {
            //functions
            if (typeof mathfunc === 'object') {
                if (logger.TRACE) logger.trace('Added function[%s] arguments[%s] body: [%s]', func, mathfunc.args, mathfunc.body)
                global[func] = new Function(mathfunc.args, mathfunc.body);
            }
            else {
                //variables
                global[func] = mathfunc;
            }
        }
        else {
            if (logger.DEBUG) logger.debug('Function [' + func + '] is already defined.');
        }
    }
}

//TODO: add these functions as internal functions
SOLVER = function(args) {
    return new Solver(args || arguments)
}
AMMOUNT = function() {
    var total = 0;
    for (var key in arguments) {
        if (arguments[key]) total++
    }
    return total;
}
OnNA = function(v, nav) {
    if (v == null || isNaN(v) || (v !== 0 && v < 0.00001 && v > -0.00001)) {
        return nav;
    }
    return v;
}

MatrixLookup = function(xlsfileName, tableName, row, col) {
    if (!MATRIX_VALUES) return NA
    var table = MATRIX_VALUES[tableName];
    if (table && table.xasValues && table.xasValues[row] && table.xasValues[row][col] !== undefined) {
        return table.xasValues[row][col];
    } else if (table && table.xasValues) {
        var lastidx = null;
        for (var key in table.xasValues) {
            if (key <= row) {
                lastidx = key;
            } else {
                break;
            }
        }
        if (lastidx) return table.xasValues[lastidx][col];
    }
    return NA;
}

FILLEDIN = function(required, entered) {
    console.info(required)
    console.info(entered)
    return true;
}
//should be:  arguments => { name: $1, y: $2 }
PIECHART = function(points) {
    var result = [];
    for (var i = 0; i < arguments.length; i++) {
        var points = arguments[i];
        for (var index = 0; index < points.length; index++) {
            var point = points[index];
            result.push({
                name: point[0],
                y: point[1]
            })
        }
    }
    return result;
}
HSUM = function(values, start, end) {
    var returnValue = 0;
    if (start.hash) start = start.hash
    if (end.hash) end = end.hash
    for (var i = (start || 0); i <= (end || values.length); i++) {
        returnValue += values[i];
    }
    return returnValue;
}
HVALUES = function(values, start, end) {
    var returnValue = [];
    if (start.hash) start = start.hash
    if (end.hash) end = end.hash
    for (var i = (start || 0); i <= (end || values.length); i++) {
        returnValue.push(values[i]);
    }
    return returnValue;
}
VALUES = function(func, fId, x, y, z, v, m) {
    var result = []
    for (var i = 0; i < x.aggcols.length; i++) {
        if (!x.aggcols[i].aggregated)//TODO: aggregation is serveral levels
            result.push(func(fId, x.aggcols[i], y, z, v, m))
    }
    return result;
}
Aggregate = function(f, x) {
    return 1;
}
GetValue = function(variable, x, y, z, v, amm) {
    // throw Error(Did not implement GetValue)
    return 1;//variable('123', x, y, z, v)
}
//'^[0-9]+$'
REGEXPMATCH = function(pattern, value) {
    return new RegExp(pattern).test(value) ? true : false;
}
ValueT = function(one) {
    var retrunValue = 0;
    while (one && !one.dummy) {
        retrunValue++;
        one = one.prev
    }
    return retrunValue
}
initJSMath(jsMath);
exports.mathJs = {
    name: 'ff-math',
    entries: entries
}
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/math\\ff-math.js","/math",undefined)
},{"_process":38,"buffer":36,"js-solver":45,"log6":35}],45:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var Solver = (function () {

    function Solver(equations) {
        this.params = Object.keys(equations)
        this.equations = this.parseEquations(equations)
    }
    
    Solver.prototype.parseEquations = function(equations){
        var replacements = {
            power : {
                re: /([\w.]+)\^([\w.]+)/g,
                res: 'Math.pow($1,$2)'
            },
            powerPython : {
                re: /([\w.]+)\*\*([\w.]+)/g,
                res: 'Math.pow($1,$2)'
            },
        }
        for(var key in equations){
            var eq = equations[key]
            for(var re in replacements){
                var repl = replacements[re]
                eq = eq.replace(repl.re, repl.res)
            }
            equations[key] = eq
        }
        return equations;
    }

    Solver.prototype.solve = function solve(obj) {
        var out = {},
            nullCount = Object.keys(this.equations).length,
            lastNull = 0;

        for (var key = 0; key < this.params.length; key++) {
            eval(this.params[key] + '=undefined')
        }

        for (var key in obj) {
            if (this.params.indexOf(key) != -1 && (obj[key]==0 || obj[key])) {
                eval(key + '=' + obj[key]),
                out[key] = obj[key]
            }
        }
        var equations = JSON.parse(JSON.stringify(this.equations))
        while (lastNull !== nullCount) {
            lastNull = nullCount;
            for (var eq in equations) {
                with(Math)
                    var result = eval(equations[eq]);
                if (result) {
                    out[eq] = result;
                    equations[eq] = undefined;
                }
            }
            nullCount = Object.keys(equations).length;
        }
        return out;
    }

    return Solver;

}());

if (typeof module !== 'undefined') module.exports = Solver;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/math\\node_modules\\js-solver\\js-solver.js","/math\\node_modules\\js-solver",undefined)
},{"_process":38,"buffer":36}],46:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
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
var StringBuffer = function() {
    this.buffer = [];
    this.index = 0;
};

StringBuffer.prototype = {
    append: function(s) {
        this.buffer[this.index] = s;
        this.index += 1;
        return this;
    },

    toString: function() {
        return this.buffer.join("");
    }
}
exports.StringBuffer = StringBuffer
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/model-tests\\StringUtils.js","/model-tests",undefined)
},{"_process":38,"buffer":36}]},{},[16,43]);
