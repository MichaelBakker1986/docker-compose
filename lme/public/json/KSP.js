(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function STRING(r){return{type:"Literal",value:r}}function IDENTIFIER(r){return{type:"Identifier",name:r}}function fallBackToString(r){return"object"==typeof r?r:STRING(r)}function fallBackToIdentifier(r){return"object"==typeof r?r:IDENTIFIER(r)}function FUNCTION(r,arguments){return{type:"CallExpression",callee:fallBackToIdentifier(r),arguments:arguments}}function EQUALS(r,t){return{type:"BinaryExpression",operator:"===",left:fallBackToIdentifier(r),right:fallBackToIdentifier(t)}}function IF(r,t,n){return{type:"ConditionalExpression",test:r,consequent:fallBackToString(t),alternate:fallBackToString(n)}}function PROPERTY(r,t){return{type:"Property",key:STRING(r),computed:!1,value:fallBackToString(t),kind:"init",method:!1,shorthand:!1}}function cloneAST(r,t,n){if(null===r||"object"!=typeof r)return r;var e=Array.isArray(r)?[]:{};for(var o in r)if(r[o]===t)e[o]=n;else{var i=cloneAST(r[o],t,n);"function"!=typeof i&&(e[o]=i)}return e}var AST={fallBackToIdentifier:fallBackToIdentifier,FUNCTION:FUNCTION,GTE:function(r,t){return{type:"BinaryExpression",operator:">=",left:r,right:t}},GT:function(r,t){return{type:"BinaryExpression",operator:">",left:r,right:t}},LT:function(r,t){return{type:"BinaryExpression",operator:"<",left:r,right:t}},TRUE:function(){return IDENTIFIER(!0)},FALSE:function(){return IDENTIFIER(!1)},LTE:function(r,t){return{type:"BinaryExpression",operator:"<=",left:r,right:t}},NONAN:function(r){return{type:"ConditionalExpression",test:FUNCTION("isNaN",[IDENTIFIER(r)]),consequent:STRING(0),alternate:IDENTIFIER(r)}},ZEROONNAN:function(r){return FUNCTION("ZeroOnNaN",[IDENTIFIER(r)])},IDENTIFIER:IDENTIFIER,EQUALS:EQUALS,NOTEQUAL:function(r,t){return{type:"BinaryExpression",operator:"!==",left:fallBackToIdentifier(r),right:fallBackToIdentifier(t)}},ISNAN:function(r){return FUNCTION("isNaN",[r])},NOT:function(r){return{type:"UnaryExpression",operator:"!",argument:r,prefix:!0}},AND:function(r,t){return{type:"LogicalExpression",operator:"&&",left:r,right:t}},PARSEFLOAT:function(r){return FUNCTION("parseFloat",[fallBackToString(r)])},OR:function(r,t){return{type:"LogicalExpression",operator:"||",left:r,right:t}},EXPRESSION:function(r){return{type:"ExpressionStatement",expression:fallBackToIdentifier(r)}},ADD:function(r,t){return{type:"BinaryExpression",operator:"+",left:fallBackToString(r),right:fallBackToString(t)}},MIN:function(r,t){return{type:"BinaryExpression",operator:"-",left:fallBackToString(r),right:fallBackToString(t)}},MULTIPLY:function(r,t){return{type:"BinaryExpression",operator:"*",left:fallBackToString(r),right:fallBackToString(t)}},IF:IF,MEMBER:function(r,t){return{type:"MemberExpression",computed:!1,object:r,property:IDENTIFIER(t)}},STRING:function(r){return STRING(r)},UNDEFINED:function(){return IDENTIFIER("undefined")},PROPERTY:PROPERTY,CHOICE:function(r,t){return{type:"ObjectExpression",properties:[PROPERTY("name",r),PROPERTY("value",t)]}},ARRAY:function(){return{type:"ArrayExpression",elements:[]}},PROGRAM:function(r){return{type:"Program",body:[r],sourceType:"script"}},cloneAST:cloneAST};module.exports=AST;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ast-node-utils\\AST.js","/..\\ast-node-utils",undefined)
},{"_process":79,"buffer":76}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function walkAst(r,a,t,e){r(a,e);for(var f in e)if(e[f]){var l=e[f];if("object"==typeof l)if(Array.isArray(l))for(var o=0,s=l.length;o<s;o++)walkAst(r,a,e,l[o]);else walkAst(r,a,e,l)}}module.exports=walkAst;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ast-node-utils\\ASTVisitor.js","/..\\ast-node-utils",undefined)
},{"_process":79,"buffer":76}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
exports.ast=require("./AST"),exports.astWalk=require("./ASTVisitor");

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ast-node-utils\\index.js","/..\\ast-node-utils",undefined)
},{"./AST":1,"./ASTVisitor":2,"_process":79,"buffer":76}],4:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function FflToJsonConverter(){}function parseRegex(e){var r=e.replace(/,\s*\n/gm,",");return r=r.replace(/;\s*\/\/.*\n?$/gm,";"),r=FinFormula.fixCasing(r),r=r.replace(/^(\s+)((?:variable|tuple)\s+[\w\-\=\+]+)\s+refers to\s+([\w\-\+\=]+)\s*\{/gim,"$1$2$1{$1  refer: $3;"),r=r.replace(/^(\s+)((?:variable|tuple)\s*)?([\-\=\+]{1})\s*([\w]+)\s*\{'/gim).replace("$1$2$4$1{$1  modifier: $3;"),r=r.replace(/\t/gm,"").replace(/^\s*root\s*$/gim," Root ;").replace(/([^;])[\r?\n]+/gm,"$1").replace(/\r?\n|\r/gm,";").replace(/\s\s+/gm," ").replace(/'/gm,"@").replace(/"/gm,"'")}function validate(e,r){if(e[r])throw Error("invalid ffl, duplicate property ["+r+"] in ["+e._name+"]")}var assert=require("assert"),FinFormula=require("./FinFormula"),Stack=require("stack-adt"),visitor=require("../../fesjs/JSVisitor"),log=require("ff-log"),deparsers=[{regex:/"/g,replace:""},{regex:/children\:.*\[.*\n/g,replace:""},{regex:/^\s*]\s*\n/gim,replace:""},{regex:/\s*},\s*\{s*/g,replace:""},{regex:/(\s+)(.*):\s*\{/g,replace:"$1$2\r$1{"},{regex:/^(.*),\S*$/gm,replace:"$1"},{regex:/^(.*:.*)$/gm,replace:"$1;"}];FflToJsonConverter.prototype.parseFFL=function(e){var r=new Stack,a=parseRegex(e),t={_start:0,_end:a.length,_data:"",_name:"",_temp:""};r.push(t);for(var s="",i=0;i<a.length;i++){var l=a.charAt(i);switch(l){case"{":var o={_start:i,_data:"",_name:s.trim(),_temp:""};r.peek()._temp="",r.peek()[s.trim()]=o,r.push(o);break;case";":s=r.peek()._temp,r.peek()._data+=l,r.peek()._temp="";break;case'"':break;case"}":s=r.peek()._temp,r.peek()._temp="",r.pop()._end=i;break;default:r.peek()._data+=l,r.peek()._temp+=l,s+=l}}assert.equal(0,r.peek()._start,"there are more open or close brackets in file"),assert.equal(1,r.size());var n={formula:!0,formula_trend:!0,formula_notrend:!0,visible:!0,title:!0,entered:!0,locked:!0,flipflop_notrend:!0,inputRequired:!0,hint:!0,afterinput:!0};return visitor.travelOne(r.peek(),null,function(e,r,a){if(void 0!==r._data)for(var t=r._data.trim().split(";"),s=0;s<t.length;s++){var i=t[s],l=i.split(":"),o=l[0].trim();if(void 0!=l[1]){l[1].trim();if(o.startsWith("choices"))validate(r,o),r[o]=FinFormula.finChoice(i.substring(i.indexOf(":")+1,i.length));else if(2==l.length){var p=l[1].trim();"title"===o?(validate(r,o),r[o]=FinFormula.parseFormula(p)):void 0!==n[o]?(validate(r,o),r[o]=FinFormula.parseFormula(p)):(validate(r,o),r[o]=p)}else validate(r,o),r[o]=FinFormula.parseFormula(i.substring(i.indexOf(":")+1)),log.DEBUG&&log.debug("Found Case(..,[*:*]); change : to , in [%s] result [%s]",i,FinFormula.parseFormula(i.substring(i.indexOf(":")+1)))}}}),r.peek()},FflToJsonConverter.prototype.deparseRegex=function(e){for(var r=0;r<deparsers.length;r++){var a=deparsers[r];e=e.replace(a.regex,a.replace)}return e},FflToJsonConverter.prototype.parseRegex=FinFormula.parseFormula,module.exports=FflToJsonConverter.prototype;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\exchange_modules\\ffl\\FflToJsonConverter.js","/..\\ff-fes\\exchange_modules\\ffl",undefined)
},{"../../fesjs/JSVisitor":15,"./FinFormula":5,"_process":79,"assert":73,"buffer":76,"ff-log":37,"stack-adt":38}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function finFormulaGeneric(e){return e=(e=e.replace(/:/gm,", ")).replace(/(\$p|@|#|%|\.\.)/gim,""),e=e.replace(/\[\<\=/gm,"["),e=e.replace(/\[\</gm,"["),e=e.replace(/\|\</gm,"|"),e=e.replace(/\[\=/gm,"["),e=e.replace(/\|\<\=/gm,"|"),e=e.replace(/\|\=/gm,"|"),e=e.replace(/\|\>\=/gm,"|"),e=e.replace(/\|\>/gm,"|"),e=e.replace(/EvaluateAsString/gim,"String"),e=e.replace(/Matrixlookup/gim,"MatrixLookup"),e=e.replace(/Startdate/gm,"StartDate"),e=e.replace(/\[1]/gm,"[doc]"),e=e.replace(/\[T]/gm,""),e=e.replace(/\[GetT\(T,-1\)]/gm,"[prev]"),e=e.replace(/\[LastT\]/gm,""),e=e.replace(/ValueT\(1\)/gm,"x.firstdetail"),e=e.replace(/GetT\(T,-TsY,0,TsY\)/gm,"x.prevbkyr"),e=e.replace(/GetT\(T,-1\)/gm,"x.prev"),e=e.replace(/GetT(T,-1,1,1)/gm,"x.prev"),e=e.replace(/FirstTInFormulaset\(Trend\)/gm,"x.firsttrend"),e=e.replace(/\[0\]/gm,".title "),e=e.replace(/(=|,|\()\s{0,4}\&/gm," $1 "),e=e.replace(/\(\s*not /gim,"(!"),e=e.replace(/^\s*&/gm,""),e=e.replace(/&/gim,"+"),e=e.replace(/ And /gim,"&&"),e=e.replace(/\)\s*and\s*\(/gim,")&&("),e=e.replace(/\s*&&not\s*/gim,"&& !"),e=e.replace(/\||\s+or /gim," || "),e=e.replace(/ Or /gim," || "),e=e.replace(/\)\s*or\s*\(/gim,")||("),e=e.replace(/=/gm,"=="),e=e.replace(/<==/gm,"<="),e=e.replace(/>==/gm,">="),e=e.replace(/<>/gm,"!="),e=e.replace(/<->/gm,"!="),e=e.replace(/ Implies /g,"&&")}function javaScriptToFinGeneric(e){return e=(e=e.replace(/!=/gm,"<>")).replace(/==/gm,"="),e=e.replace(/\|\|/gim," | "),e=e.replace(/&&/gim," & ")}function finChoice(e){if(e=e.replace(/\\''$/g,"'"),/^[a-z0-9_ ]+$/i.test(e))return e+".choices";if(e.indexOf("|")<0&&e.indexOf(":")<0)return'[{ "name" : "'+e+'", "value" : "'+e+'" }]';if(e.indexOf(":")<0){var r=e.split("|");r[r.length-1]=r[r.length-1].slice(0,-1),r[0]=r[0].substr(r[0].indexOf("'")+1);for(var a='{ "name" : "'+r[0]+'", "value" : "'+r[0]+'" } ',i=1;i<r.length;i++){var l=r[i];a+=', { "name" : "'+l+'", "value" : "'+l+'" }'}return"["+a+"]"}return a=(a=e.replace(/'/gim,"")).replace(/:/gim,'" , "value" : "'),'[{ "name" : "'+(a=a.replace(/\|/gim,'"} , { "name" :"'))+'" }]'}function FinFormula(){}FinFormula.prototype.toJavascriptChoice=function(e){for(var r=JSON.parse(e.replace(/'/gim,'"')),a="",i=0;i<r.length;i++){var l=r[i];0!==i&&(a+="|"),a+=l.name+"|"+l.value}return a},FinFormula.prototype.finFormulaGeneric=finFormulaGeneric,FinFormula.prototype.javaScriptToFinGeneric=javaScriptToFinGeneric,FinFormula.prototype.parseFormula=finFormulaGeneric,FinFormula.prototype.finChoice=finChoice,FinFormula.prototype.fixCasing=function(e){return e.replace(/[^\w]{1}(Q_\w*)/gim,function(e){return e.toUpperCase()})},module.exports=FinFormula.prototype;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\exchange_modules\\ffl\\FinFormula.js","/..\\ff-fes\\exchange_modules\\ffl",undefined)
},{"_process":79,"buffer":76}],6:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function FFLParser(){}function findSolutionNameFromFFLFile(e){for(var r in e)if(r.toLowerCase().startsWith("model "))return r.split(" ")[1].toUpperCase()}function stripVariableOrtuple(e,r){if(e&&(e.indexOf("+")>-1?(e=e.replace(/(\+|-|\=)\s*/gm,""),r.modifier="+"):e.indexOf("-")>-1?(e=e.replace(/(\+|-|\=)\s*/gm,""),r.modifier="-"):e.indexOf("=")>-1&&(e=e.replace(/(\+|-|\=)\s*/gm,""),r.modifier="="),!(e.split(" ").length<2))){var i=e.split(" ")[1].replace(/\W/g,"");if(""!==i)return i}}function StartWithVariableOrTuplePredicate(e){return!(void 0===e||!e._parentKey)&&(e._parentKey.startsWith("variable")||e._parentKey.startsWith("tuple"))}function addnode(e,r,i,t,a,o,n,l,s){if(e.variables.push(i),void 0===i||""===i.trim())return void log.error("Invalid FFL file detected while parsing. No name declared for node ["+t+"]");var u=displayAsMapping[t.displaytype];"select"==u&&(t.choices?2==JSON.parse(t.choices).length?u="radio":log.DEBUG&&log.debug("["+i+"] "+t.choices):log.DEBUG&&log.warn("Row ["+i+"] is type [select], but does not have choices")),a&&a.match(/Q_MAP[0-9]{2}/),r.addDisplayType(u);var d=t.formula_trend;let p=t.formula_notrend||t.formula;void 0!==d&&p!==d&&(p="x.istrend ? "+d+":"+p);var c=SolutionFacade.createUIFormulaLink(r,i,"value",p?parseFFLFormula(p,"none",i):AST.UNDEFINED(),u);if(c.displayAs=u,!supportedFrequencies[t.frequency||"document"])throw Error("Invalid frequency ["+t+"]");c.frequency=t.frequency,r.setDelegate(c,t),r.setParentName(c,a),(o||n)&&(c.tuple=!0,c.nestedTupleDepth=s,c.tupleDefinitionName=l),o?(log.debug("Found tupleDefinition [%s]",i),c.tupleDefinition=!0):n&&(log.debug("Found tupleProperty [%s]",i),c.tupleProperty=!0),t.visible&&a&&(defaultValue.visible[t.visible]?t.visible=a+".visible":t.visible=a+".visible && "+t.visible);for(var f in formulaMapping)if(void 0!==t[f]){if(defaultValue[f]&&defaultValue[f][t[f]]){log.DEBUG&&log.debug("Default [%s.%s]-formula. Skipping formula:[%s]",i,f,t[f]);continue}SolutionFacade.createUIFormulaLink(r,i,formulaMapping[f],parseFFLFormula(t[f],f,i))}}function parseFFLFormula(e,r,i){var t="undefined";try{void 0!==e&&(t=esprima.parse(e).body[0].expression)}catch(a){log.debug("unable to parse ["+e+"] returning it as String value ["+r+"] : "+i,a),t=AST.STRING(e)}return t}var JSVisitor=require("../../fesjs/JSVisitor"),SolutionFacade=require("../../fesjs/SolutionFacade.js"),AST=require("../../../ast-node-utils/index").ast,FflToJsonConverter=require("./FflToJsonConverter"),FinFormula=require("./FinFormula.js"),esprima=require("esprima"),log=require("ff-log");FFLParser.prototype.name="ffl",FFLParser.prototype.status="green",FFLParser.prototype.headername=".finance ffl",FFLParser.prototype.parseData=function(e,r){var i={variables:[]},t=FflToJsonConverter.parseFFL(e),a=findSolutionNameFromFFLFile(t),o=SolutionFacade.createSolution(a);return JSVisitor.travelOne(t,null,function(e,r,t){if(null===e);else{var a=e.startsWith("tuple ");if(e.startsWith("variable ")||a){r.refer;var n=stripVariableOrtuple(e,r),l=JSVisitor.findPredicate(r,StartWithVariableOrTuplePredicate),s=void 0===l?void 0:stripVariableOrtuple(l._name,l);a&&t.nestTupleDepth++,t.tupleDefinition&&log.TRACE&&log.trace("tuple def for [%s].[%s] is [%s]",n,t.nestTupleDepth,t.tupleDefinition),addnode(i,o,n,r,s,a,!a&&t.tupleDefinition,t.tupleDefinition,t.nestTupleDepth),a&&(t.tupleDefinition=n)}}},{nestTupleDepth:0}),log.TRACE&&log.trace("Add variables ["+i.variables+"]"),o},FFLParser.prototype.deParse=function(e,r){var i=SolutionFacade.createSolution(r.getSolutionName());return r.visitProperties(r.getNode(e||"root"),function(e){var t={},a={},o=SolutionFacade.gatherFormulaProperties(r.getSolutionName(),r.properties,e.rowId);for(var n in o){var l,s=o[n];"undefined"!=(l="choices"===n?FinFormula.toJavascriptChoice(s):FinFormula.javaScriptToFinGeneric(s))&&(log.debug("["+l+"]"),a[reversedFormulaMapping[n]]=l),reversedFormulaMapping[n]}a.displaytype=displayAsMapping[e.displayAs],t["variable "+e.rowId]=a,i.addNode(e.rowId,t),i.restoreDelegateProperties(a,e),i.setPreparser(FflToJsonConverter.deparseRegex),i.addNodeToCorrespondingPlaceInHierarchie(e.parentrowId,e.rowId,t)}),i.stringify()};var displayAsMapping={default:"string",select:"select",radio:"select",undefined:"string",currency:"currency",date:"date",percentage:"percentage",memo:"memo",string:"string",chart:"chart",line:"line"},formulaMapping={title:"title",hint:"hint",locked:"locked",visible:"visible",inputRequired:"required",choices:"choices"},reversedFormulaMapping={title:"title",hint:"hint",locked:"locked",visible:"visible",required:"inputRequired",choices:"choices",value:"formula",notrend:"formula_notrend",trend:"formula_trend",displayAs:"displaytype"},defaultValue={visible:{"1.0":!0,1:!0,true:!0,On:!0},locked:{"0.0":!0,0:!0,false:!0,Off:!0,No:!0},required:{"0.0":!0,0:!0,false:!0,No:!0,Off:!0}};const supportedFrequencies={document:!0,column:!0,none:!0,timeline:!0};SolutionFacade.addParser(FFLParser.prototype);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\exchange_modules\\ffl\\fflparser.js","/..\\ff-fes\\exchange_modules\\ffl",undefined)
},{"../../../ast-node-utils/index":3,"../../fesjs/JSVisitor":15,"../../fesjs/SolutionFacade.js":20,"./FflToJsonConverter":4,"./FinFormula.js":5,"_process":79,"buffer":76,"esprima":75,"ff-log":37}],7:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function correctPropertyName(e){return e.replace(/^[^_]+_([\w]*_\w+)$/gim,"$1")}function correctFileName(e){return e.replace(/^[^_]+_([\w]*)_\w+$/gim,"$1")}function updateValues(e,a){for(var r=0;r<e.length;r++){var o=e[r];a[o.formulaId]||(a[o.formulaId]=[]),a[o.formulaId][o.colId]=o.value}}var SolutionFacade=require("../../fesjs/SolutionFacade"),jsonValues={name:"jsonvalues",extension:"json",headername:"JSON Values",parseData:function(e,a){return e&&updateValues(e,a.context.values),SolutionFacade.createSolution(a.getSolutionName())},deParse:function(e,a){let r=a.getAllValues();return r.forEach(function(e){e.varName.endsWith("_title")?e.varName=correctPropertyName(e.varName):e.varName=correctFileName(e.varName)}),r}};SolutionFacade.addParser(jsonValues);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\exchange_modules\\jsonvalues\\jsonvalues.js","/..\\ff-fes\\exchange_modules\\jsonvalues",undefined)
},{"../../fesjs/SolutionFacade":20,"_process":79,"buffer":76}],8:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function FormulaInfo(e,r,o){this.formulas=[];var i=this,e=[];this.data=e,this.nodes=[];var a={};FormulaService.visitFormulas(function(e){e.id=e.id||e.index,a[e.name]=e,i.addFormula(e)});var n={},t=o+"_";this.formulas.forEach(function(r){var o=correctFileName(r.name);if(void 0===n[o]){n[o]=!0;var i=a[t+o+"_title"]||{original:null},l=a[t+o+"_hint"]||{original:""},s=a[t+o+"_visible"]||{original:!1},u=a[t+o+"_value"]||{original:""},m=a[t+o+"_trend"]||{original:""},c=a[t+o+"_notrend"]||{original:""},d=a[t+o+"_locked"]||{original:!1},f=a[t+o+"_choices"]||{original:null};e.push([o,i.original,u.original,m.original,c.original,s.original,d.original,f.original,l.original])}});this.meta={view:{columns:[]}};var l=0;["name","title","value","notrend","trend","visible","locked","choices","hint"].forEach(function(e){i.meta.view.columns.push({width:-1==["locked","visible","entered"].indexOf(e)?50:void 0,name:e,dataTypeName:"text",fieldName:e,position:l++,renderTypeName:"text"})})}function correctFileName(e){return e.replace(/^[^_]+_([\w]*)_\w+$/gim,"$1")}function variableName(e){return e.replace(/^[^_]+_([\w]*_\w+)$/gim,"$1")}function LMEParser(){}var SolutionFacade=require("../../fesjs/SolutionFacade.js"),FormulaService=require("../../fesjs/FormulaService.js"),PropertiesAssembler=require("../../fesjs/PropertiesAssembler.js"),FunctionMap=require("../../fesjs/FunctionMap.js"),log=require("ff-log");FormulaInfo.prototype.setSchema=function(e){this.schema=e},FormulaInfo.prototype.addFormula=function(e){e.fflname=variableName(e.name),this.formulas.push(e)},LMEParser.prototype.name="lme",LMEParser.prototype.status="green",LMEParser.prototype.headername=".finance lme",LMEParser.prototype.parseData=function(e,r){const o=SolutionFacade.createSolution(e.name);return o.nodes=e.nodes,PropertiesAssembler.bulkInsert(o),FormulaService.bulkInsertFormula(e.formulas),e.formulas.forEach(function(e){FunctionMap.initializeFormula(e)}),log.DEBUG&&log.debug("Done import "+e.name),o};var unwantedKeys={delegate:!0,ast:!0,body:!0};LMEParser.prototype.deParse=function(e,r){var o=r.getSolutionName();let i=new FormulaInfo({},{},o);return i.name=o,PropertiesAssembler.findAllInSolution(o,function(e){i.nodes.push(e)}),JSON.stringify(i,function(e,r){return unwantedKeys[e]?void 0:r},2)},SolutionFacade.addParser(LMEParser.prototype),exports.LMEParser=LMEParser.prototype;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\exchange_modules\\lme\\lmeparser.js","/..\\ff-fes\\exchange_modules\\lme",undefined)
},{"../../fesjs/FormulaService.js":13,"../../fesjs/FunctionMap.js":14,"../../fesjs/PropertiesAssembler.js":18,"../../fesjs/SolutionFacade.js":20,"_process":79,"buffer":76,"ff-log":37}],9:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function WebExport(){this.exportAsObject=!0,this.hide=!0,this.name="webexport",this.headername="Native Object Web Presentation"}function LMETree(e,r){this.name=e,this.workbook=r,this.nodes={}}function noChange(e,r,t,n){let o,i=-1;return{get:function(){return counter!==i&&i<0&&(i=counter,o=e.get(r,t,n,0)),o}}}function changeAble(e,r,t,n){let o,i=-1;return{get:function(){return counter!==i&&(i=counter,o=e.get(r,t,n,0)),o}}}function changeAndCache(e,r,t,n){let o,i=-1;return{get:function(){return counter!==i&&(i=counter,o=e.get(r,t,n,0)),o},set:function(o){counter++;var i=null===o?o:isNaN(o)?o:parseFloat(o);e.set(r,i,t,n,0)}}}var SolutionFacade=require("../../fesjs/SolutionFacade"),columns=["title","value","visible","entered","locked","required","hint","choices"];WebExport.prototype.parse=function(e){throw new Error("Not yet supported")};var counter=0,properties={title:{change:!0,prox:changeAndCache},value:{change:!0,prox:changeAndCache},visible:{prox:changeAble},entered:{prox:changeAble},locked:{prox:changeAble},required:{prox:changeAble},hint:{cache:!0,prox:noChange},choices:{cache:!0,prox:noChange}},repeats={undefined:[3,1],none:[1,3],column:[3,1],document:[1,3],timeline:[1,3]};LMETree.prototype.addNode=function(e,r){for(var t=this.workbook,n=e.rowId,o=(repeats[e.frequency],repeats[e.frequency][0]),i=repeats[e.frequency][1],c={id:n,type:e.displayAs,path:r.join("."),ammount:o,colspan:i,cols:[],children:[]},u=0;u<o;u++){var p={value:null,visible:null,entered:null,required:null,locked:null};c.cols[u]=p,Object.defineProperty(p,"value",properties.value.prox(t,n,"value",u)),Object.defineProperty(p,"visible",properties.visible.prox(t,n,"visible",u)),Object.defineProperty(p,"entered",properties.entered.prox(t,n,"entered",u)),Object.defineProperty(p,"required",properties.required.prox(t,n,"required",u)),Object.defineProperty(p,"locked",properties.locked.prox(t,n,"locked",u))}columns.forEach(function(e){c[e]=null,Object.defineProperty(c,e,properties[e].prox(t,n,e,0))});const a=this.nodes[r[r.length-1]];a&&a.children.push(c),this.nodes[n]=c},WebExport.prototype.deParse=function(e,r){var t=r.getSolutionName(),n=r.getRootSolutionProperty(t),o=new LMETree(t,r),i=[],c=-1;return r.visitProperties(n,function(e,r,t){e!==n&&(t>c?(i.push(e.parentrowId),c=t):t<c&&(i.length=t,c=t),o.addNode(e,i))}),o},SolutionFacade.addParser(new WebExport);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\exchange_modules\\presentation\\webexport.js","/..\\ff-fes\\exchange_modules\\presentation",undefined)
},{"../../fesjs/SolutionFacade":20,"_process":79,"buffer":76}],10:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var assert=require("assert"),log=require("ff-log"),AST=require("../../ast-node-utils/index").ast,escodegen=require("escodegen"),caseCount=0,simplified={ExpandLevel:function(e,i){i.arguments=[{type:"Identifier",name:"1.1",raw:"1.1"}]},Min:function(e,i){i.callee.name="Math.min"},EvaluateAsString:function(e,i){i.callee.name="String"},Max:function(e,i){i.callee.name="Math.max"},Abs:function(e,i){i.callee.name="Math.abs"},InvNormal:function(e,i){i.callee.name="NORMSINV"},Case:function(e,i){assert.ok(2===i.arguments.length,"Only expecting 2 arguments for now");var n=i.arguments[1];assert.ok("ArrayExpression"===n.type,"Second argument has to be ArrayExpression for now");var t="__c0s"+caseCount++;i.type="SequenceExpression";var s=n.elements;i.expressions=[{type:"AssignmentExpression",operator:"=",left:{type:"Identifier",name:t},right:i.arguments[0]}],1===s.length&&s.unshift(AST.IDENTIFIER(!0)),s[0]={right:s[0]};var a=s[s.length-1];s[s.length-1]={type:"ConditionalExpression",test:AST.IDENTIFIER(t+" === "+s[s.length-2].right.value),consequent:a,alternate:AST.IDENTIFIER("NA")};for(var r=s.length-2;r>0;r--){var l=s[r];l.type="ConditionalExpression",l.test=AST.IDENTIFIER(t+" === "+s[r-1].right.value),l.consequent=l.left,l.alternate=s[r+1],l.operator=void 0,l.right=void 0,l.left=void 0}i.expressions.push(s[1]),i.callee=void 0,i.arguments=void 0,log.DEBUG&&log.debug("[%s] CASE parsed into: [%s]",e.name,escodegen.generate(i))},If:function(e,i){2===i.arguments.length&&(log.debug("Strange formuala setup IF(q,a,b) without b) Using NA as b. ["+e.original+"]"),i.arguments.push(AST.IDENTIFIER("NA"))),assert.equal(i.arguments.length,3,e.original),i.type="ConditionalExpression",i.test=i.arguments[0],i.consequent=i.arguments[1],i.alternate=i.arguments[2],i.arguments.length=0,i.arguments=void 0,i.callee=void 0},Hsum:function(e,i){},MaxValueT:function(e,i){i.arguments=[{type:"Identifier",name:"1",raw:"1"}]},ExpandFraction:function(e,i){i.arguments=[{type:"Identifier",name:"1",raw:"1"},{type:"Identifier",name:"2"}]},ExpandOriginalValue:function(e,i){i.arguments=[{type:"Identifier",name:"1"}]},FirstValueT:function(e,i){i.arguments.unshift({type:"Identifier",name:"x"})},DateToT:function(e,i){i.arguments.unshift({type:"Identifier",name:"x"})},Visible:function(e,i){i.type="MemberExpression",i.computed=!1,i.object=AST.IDENTIFIER(i.arguments[0].name),i.property=AST.IDENTIFIER("visible"),delete i.arguments,delete i.callee},Count:function(e,i){i.arguments.splice(0,1),i.arguments[0].arguments.push(i.arguments[1]),i.arguments.splice(1,1)},Self:function(e,i){i.arguments=[{type:"Identifier",name:"1"}]},Mut:function(e,i){i.arguments=[{type:"Identifier",name:"1"}]}};simplified.ForAll=simplified.Count,simplified.Exists=simplified.ForAll,simplified.TupleSum=simplified.TSUM,simplified.IF=simplified.If,simplified.if=simplified.If,simplified.MAX=simplified.Max,simplified.MIN=simplified.Min,simplified.min=simplified.Min,simplified.max=simplified.Max,simplified.ABS=simplified.Abs,module.exports=simplified;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\fesjs\\ASTPreparser.js","/..\\ff-fes\\fesjs",undefined)
},{"../../ast-node-utils/index":3,"_process":79,"assert":73,"buffer":76,"escodegen":75,"ff-log":37}],11:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function findFormula(e){if(void 0!==e)return FormulaService.findFormulaByIndex(e.ref)}function fetchSolutionNode(e,r){return PropertiesAssembler.fetch(e+"_"+r)}var logger=require("ff-log"),FESFacade={},PropertiesAssembler=require("./PropertiesAssembler"),FunctionMap=require("./FunctionMap"),FormulaService=require("./FormulaService");Array.prototype.lookup=function(e,r){for(var t=0;t<this.length;t++)if(this[t][e]===r)return this[t]},String.prototype.startsWith||(String.prototype.startsWith=function(e,r){return r=r||0,this.substr(r,e.length)===e}),String.prototype.endsWith||(String.prototype.endsWith=function(e){return-1!==this.indexOf(e,this.length-e.length)}),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),FESFacade.putSolutionPropertyValue=function(e,r,t,o,i,a){var n=r+"_"+(o||"value"),u=findFormula(PropertiesAssembler.fetch(n));if(void 0===u)throw Error("Cannot find variable");logger.debug("Set value row:[%s] x:[%s] y:[%s] value:[%s]",n,i.hash,a.hash,t),FunctionMap.apiSet(u,i,a,0,t,e.values)},FESFacade.fetchSolutionPropertyValue=function(e,r,t,o,i){var a=t||"value";if("entered"===a){if(void 0===(d=findFormula(s=fetchSolutionNode(r,"value"))))return!1;var n=d.id||d.index,u=o.hash+i.hash+0;return e.values[n][u]}var l,s=fetchSolutionNode(r,a),d=findFormula(s);if(l=void 0===d?e.propertyDefaults[a]:FunctionMap.apiGet(d,o,i,0,e.values),s)if("value"===a){if(s.delegate&&s.delegate.fixed_decimals&&!isNaN(l)){var f=Math.pow(10,parseInt(s.delegate.fixed_decimals));l=Math.round(l*f)/f}}else if("locked"==a)return Boolean(l);return l},FESFacade.fetchRootSolutionProperty=PropertiesAssembler.getRootProperty,FESFacade.fetchSolutionNode=fetchSolutionNode,FESFacade.apiGetValue=FunctionMap.apiGet,FESFacade.getAllValues=function(e){var r=[];for(var t in e){var o=e[t];if(o){var i=FormulaService.findFormulaByIndex(t),a=void 0===i?t:i.name;for(var n in o)r.push({varName:a,colId:n,value:o[n],formulaId:t})}}return r},FESFacade.updateValueMap=function(e){FormulaService.visitFormulas(function(r){if("noCacheUnlocked"===r.type){var t=r.id||r.index;e[t]||(e[t]={})}})},FESFacade.visit=PropertiesAssembler.visitProperty,FESFacade.findAllInSolution=PropertiesAssembler.findAllInSolution,module.exports=FESFacade;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\fesjs\\FESFacade.js","/..\\ff-fes\\fesjs",undefined)
},{"./FormulaService":13,"./FunctionMap":14,"./PropertiesAssembler":18,"_process":79,"buffer":76,"ff-log":37}],12:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function FormulaBootstrap(){}function buildFunc(e,r,n,t,a,i){a=a||"";var o="y";delete(t=addFormulaDependency(e,t.name,propertiesArr[n])).refn;var s=t.ref;if(t.tuple||(o+=".base"),i)if(t){var l=e.name.split("_")[0],p=getOrCreateProperty(l,t.tupleDefinitionName,propertiesArr[0]),u=[];t.ref&&u.push(""+t.ref);for(var d=0;d<p.nodes.length;d++){var m=p.nodes[d],c=getOrCreateProperty(l,m.rowId,propertiesArr[0]).ref;c&&u.push(""+c)}var f="["+u.join(",")+"]";r.name=i+"("+f+",a"+s+",'"+s+"',x"+a+","+o+",z,v)"}else r.name="["+defaultValues[propertiesArr[n]]+"]";else void 0===t.ref?r.name=defaultValues[propertiesArr[n]]:r.name="a"+s+"('"+s+"',x"+a+","+o+",z,v)"}function buildFormula(e,r,n){if("CallExpression"===n.type){if(log.TRACE&&log.trace("Use function ["+n.callee.name+"]"),simplified[n.callee.name])simplified[n.callee.name](e,n);else if(void 0==global[n.callee.name.split(".")[0]])throw Error("invalid call ["+n.callee.name+"]")}else n.type===IDENTIFIER&&("T"===n.name&&(n.name="x"),"MainPeriod"===n.name&&(n.name="z"),"MaxT"===n.name&&(n.name="x"),"TsY"===n.name&&(n.name="x"),"Trend"===n.name&&(n.name="x"),"NoTrend"===n.name&&(n.name="x"),"LastHistYear"===n.name&&(n.name="x"),"LastHistYear"===n.name?n.name="x":"t"===n.name&&(log.warn("invalid t parsing [%s]",e),n.name="hash"));for(var t in n)if(n[t]){var a=n[t];if("object"==typeof a)if(Array.isArray(a))for(var i=0,o=a.length;i<o;i++)buildFormula(e,n,a[i]);else buildFormula(e,n,a)}traverseTypes[n.type]||log.error("ERROR: [%s] not registered AST expression [%s]",n.type,n.name),traverseTypes[n.type](e,r,n)}function regenerate(e){return escodegen.generate(e,escodegenOptions)}var variables,getOrCreateProperty,addFormulaDependency,properties,log=require("ff-log"),assert=require("assert"),AST=require("../../ast-node-utils/index").ast,esprima=require("esprima"),escodegen=require("escodegen"),simplified=require("./ASTPreparser"),propertiesArr=["value","visible","required","locked","entered","validation","title","validateInput","choices","g","h"],IDENTIFIER="Identifier",ARRAYEXPRESSION="ArrayExpression";simplified.DataAvailable=function(e,r){var n=addFormulaDependency(e,r.arguments[0].name,"value");if(void 0===n.ref)return log.warn("Can't find a variableReference for "+regenerate(r)),e.name,void e.original;r.type="Identifier",r.name="v["+n.ref+"][x.hash + y.hash + z]!==undefined",delete r.refn,delete r.arguments,delete r.callee},simplified.DataEntered=simplified.DataAvailable,simplified.SelectDescendants=function(e,r){r.type=ARRAYEXPRESSION;var n,t=e.name.split("_")[0],a=getOrCreateProperty(t,r.arguments[0].name,propertiesArr[0]);3===r.arguments.length&&(n=r.arguments[2],r.arguments.length=2);var i;void 0===n?(n=r.arguments[1],r.arguments.length=1):i=getOrCreateProperty(t,r.arguments[1].name,propertiesArr[0]),r.elements=[];var o=a.nodes;n=AST.cloneAST(n,null,null);for(var s=0;s<o.length&&(void 0===i||i.rowId!==o[s].rowId);s++)r.elements.push(AST.cloneAST(n,"X",o[s].rowId));delete r.arguments,delete r.callee},simplified.InputRequired=function(e,r){r.type="MemberExpression",r.computed=!1,r.object=AST.IDENTIFIER(r.arguments[0].name),r.property=AST.IDENTIFIER(propertiesArr[2]),delete r.arguments,delete r.callee,delete r.refn},simplified.GetTitle=function(e,r){r.type="MemberExpression",r.computed=!1,r.object=AST.IDENTIFIER(r.arguments[0].name),r.property=AST.IDENTIFIER(propertiesArr[6]),delete r.arguments,delete r.callee,delete r.refn},simplified.TSUM=function(e,r){r.callee.name="SUM",buildFunc(e,r.arguments[0],0,r.arguments[0],r.property?"."+r.property.name:"","TVALUES")},simplified.TCOUNT=function(e,r){r.callee.name="PROXY",buildFunc(e,r.arguments[0],0,r.arguments[0],r.property?"."+r.property.name:"","TCOUNT")};var escodegenOptions={format:{renumber:!0,hexadecimal:!0,escapeless:!0,compact:!0,semicolons:!1,parentheses:!1}},varproperties={},defaultValues={required:!1,visible:!0,locked:!1,entered:!1,valid:!0},dummy=function(e,r,n){},expression=function(e,r,n){var t=n.left;t.refn&&buildFunc(e,t,0,t);var a=n.right;a.refn&&buildFunc(e,a,0,a)},traverseTypes={Identifier:function(e,r,n){variables(n.name)?n.refn=n.name:void 0!=varproperties[n.name]&&(n.legacy=n.name.replace(/_/g,"."),n.name=n.legacy)},AssignmentExpression:function(e,r,n){n.right.refn&&buildFunc(e,n.right,0,n.right)},ThisExpression:dummy,SequenceExpression:dummy,ObjectExpression:dummy,Property:dummy,Program:dummy,Literal:dummy,ArrayExpression:function(e,r,n){n.elements.forEach(function(r){r.refn&&buildFunc(e,r,0,{name:r.refn})})},BinaryExpression:expression,LogicalExpression:expression,ExpressionStatement:function(e,r,n){var t=n.expression;t.refn&&buildFunc(e,t,0,t)},UnaryExpression:function(e,r,n){var t=n.argument;t.refn&&buildFunc(e,t,0,t)},CallExpression:function(e,r,n){for(var t=0,a=n.arguments.length;t<a;t++){var i=n.arguments[t];i.refn&&buildFunc(e,i,0,i)}},SequenceExpression:function(e,r,n){},ConditionalExpression:function(e,r,n){n.test.refn&&buildFunc(e,n.test,0,n.test),n.alternate.refn&&buildFunc(e,n.alternate,0,n.alternate),n.consequent.refn&&buildFunc(e,n.consequent,0,n.consequent)},MemberExpression:function(e,r,n){var t=n.object;if(t.refn){var a=n.property;if("Identifier"===a.type)if(n.computed){if("MemberExpression"===r.type)throw new Error("Not Supported Yet");n.type="Identifier",buildFunc(e,n,0,t,"."+n.property.name),delete n.object,delete t.refn,delete n.callee,delete n.property,delete n.computed}else n.type=IDENTIFIER,n.property.name,buildFunc(e,n,varproperties[n.property.name].f,n.object),delete n.property,delete n.object,delete n.computed;else"SequenceExpression"===a.type?(n.type=IDENTIFIER,buildFunc(e,n,0,n.object),delete n.arguments,delete n.object,delete n.property,delete n.computed):(n.type=IDENTIFIER,e.tempnaaam===n.object.name?(n.name="1",log.trace("found self reference [%s]",n.object.name)):buildFunc(e,n,0,n.object),delete n.object,delete n.property,delete n.computed)}}};global.ExpandGrowth=function(){return 0},global.FormulaSetInT=function(){return 0},global.Onzero=function(){return 0},global.Hm=function(){return 0},FormulaBootstrap.prototype.parseAsFormula=function(e){assert(void 0===e.parsed);var r;"object"==typeof e.body?(e.original=regenerate(e.body),r=e.body):(e.original=e.body,r=esprima.parse(e.body)),buildFormula(e,null,r);var n=regenerate(r);e.ast=JSON.stringify(r),e.parsed=n,e.tempnaaam=void 0},FormulaBootstrap.prototype.initStateBootstrap=function(e){variables=e.contains,properties=e.properties,getOrCreateProperty=e.getOrCreateProperty,addFormulaDependency=e.addFormulaDependency;for(var r in properties)varproperties[r]={f:properties[r],t:{type:"Identifier",name:properties[r]}}},module.exports=FormulaBootstrap.prototype;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\fesjs\\FormulaBootstrap.js","/..\\ff-fes\\fesjs",undefined)
},{"../../ast-node-utils/index":3,"./ASTPreparser":10,"_process":79,"assert":73,"buffer":76,"escodegen":75,"esprima":75,"ff-log":37}],13:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function FormulaService(){}function addAssociation(e,o,r){var a=formulas[e],n=formulas[o.ref];n.name!==a.name&&void 0===a.refs[n.name]&&a.formulaDependencys.push({name:n.name,association:r}),a[r][o.name]=!0}function newFormula(e,o,r,a){var n=AST.PROGRAM(o),i={type:e?"noCacheLocked":"noCacheUnlocked",refs:{},formulaDependencys:[],deps:{},body:n,original:n,index:r,name:a};return formulas.push(i),i}var log=require("ff-log"),AST=require("../../ast-node-utils/index").ast,assert=require("assert"),escodegen=require("escodegen"),formulas=[];formulas[1e5]=null;var cache={};FormulaService.prototype.visitFormulas=function(e){for(var o=0;o<formulas.length;o++){var r=formulas[o];null!==r&&void 0!==r?e(r):o>1e5&&e(r)}},FormulaService.prototype.addFormulaDependency=function(e,o,r){var a,n=formulas[o],i=r;return void 0===n?(log.trace("failed to lookup:["+r+"] but it was in the model, could be in another model. OR it just have default value formula"),log.trace(e.original)):(i=n.name,a=n.id||n.index,void 0===n.refs[e.name]&&(n.refs[e.name]=!0,n.formulaDependencys.push({name:e.name,association:"refs",refId:e.id||e.index}))),void 0===e.deps[i]&&(e.deps[i]=!0,e.formulaDependencys.push({name:i,association:"deps",refId:a})),n},FormulaService.prototype.addModelFormula=function(e,o,r,a,n,i){assert(void 0!==i,"refactored, this function return undefined when body is undefined");var u,d=escodegen.generate(AST.EXPRESSION(i));return n&&void 0!==cache[d]?u=cache[d]:(u=newFormula(n,AST.EXPRESSION(i),formulas.length,e.name),cache[d]=u),e.ref=u.index,e.formulaName=u.name,addAssociation(u.index,e,"refs"),u.id||u.index},FormulaService.prototype.findFormulaByIndex=function(e){return formulas[e]},FormulaService.prototype.bulkInsertFormula=function(e){for(var o=0;o<e.length;o++){var r=e[o];formulas[r.id]=r}},FormulaService.prototype.moveFormula=function(e,o){e.index!==o.id&&(formulas[o.id]=formulas[e.index],formulas[o.id].id=o.id,delete formulas[o.id].index,delete formulas[e.index])},module.exports=FormulaService.prototype;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\fesjs\\FormulaService.js","/..\\ff-fes\\fesjs",undefined)
},{"../../ast-node-utils/index":3,"_process":79,"assert":73,"buffer":76,"escodegen":75,"ff-log":37}],14:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function fm(){}var log=require("ff-log");fm.prototype.apiGet=function(o,e,t,n,a){var r=o.id||o.index;return global["a"+r](r,e,t,n,a)},fm.prototype.apiSet=function(o,e,t,n,a,r){var i=o.id||o.index;if(void 0!==r[i]){var l=e.hash+t.hash+n,d=a;""===a||null===a?(d=void 0,delete r[i][l]):r[i][l]=d}else log.debug("[%s] does not exist",i)},fm.prototype.initializeFormula=function(o){var e=o.id||o.index;log.DEBUG&&log.debug("Added function %s\n\t\t\t\t\t\t\t\t\t  [%s] %s : %s : [%s]","a"+e,o.original,o.name,o.type,o.parsed);var t=Function("f, x, y, z, v","return "+o.parsed).bind(global);global["a"+e]=formulaDecorators[o.type](t,e,o.name)};var formulaDecorators={noCacheLocked:function(o,e){return o},noCacheUnlocked:function(o,e,t){return function(e,t,n,a,r){if(t.dummy)return NA;var i=t.hash+n.hash+a;return void 0===r[e][i]?o(e,t,n,a,r):r[e][i]}}};fm.prototype.moveFunction=function(o,e){o.index!==e.id&&(global["a"+e.id]?log.warn("Formula already taken["+e.id+"]"):(global["a"+e.id]=e,global["a"+o.index]=null))},module.exports=fm.prototype;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\fesjs\\FunctionMap.js","/..\\ff-fes\\fesjs",undefined)
},{"_process":79,"buffer":76,"ff-log":37}],15:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function JSVisitor(){}function visit(e,r,t){for(var i in e)if(void 0!=e[i]&&"_parent"!==i&&"_parentKey"!==i){var n=e[i];if("object"==typeof n)if(Array.isArray(n))for(var a=0,o=n.length;a<o;a++){var v=n[a];v._parent=e,v._parentKey=r,visit(v,i,t),v._parentKey=void 0,v._parent=void 0}else n._parent=e,n._parentKey=r,visit(n,i,t),n._parentKey=void 0,n._parent=void 0;else void 0!=t[i]&&t[i](e)}if(void 0!=t[r])t[r](e)}function visitTopDown(e,r,t){if(void 0==t[r]||!t[r](e))for(var i in e)if(void 0!=e[i]&&"_parent"!==i&&"_parentKey"!==i){var n=e[i];if("object"==typeof n)if(Array.isArray(n))for(var a=0,o=n.length;a<o;a++){var v=n[a];v._parent=e,v._parentKey=r,visitTopDown(v,i,t),v._parentKey=void 0,v._parent=void 0}else n._parent=e,n.parentKey=r,visitTopDown(n,i,t),n._parentKey=void 0,n._parent=void 0;else void 0!=t[i]&&t[i](e)}}function travel(e,r,t){var i=t(r,e);if(!i)for(var n in e)if(void 0!=e[n]){var a=e[n];if("object"==typeof a)if(Array.isArray(a)){if(i=t(n,a))return;for(var o=0,v=a.length;o<v;o++)travel(a[o],n,t)}else travel(a,n,t);else t(n,e)}}function context(){}function travelOne(e,r,t,i){i=i||{};var n=new context;n.__proto__=i,t(r,e,n);for(var a in e)if(void 0!=e[a]&&"_parent"!==a&&"_parentKey"!==a){var o=e[a];if("object"==typeof o)if(Array.isArray(o))for(var v=0,f=o.length;v<f;v++){var p=o[v];p._parent=e,p._parentKey=r,travelOne(p,a,t,n),p._parentKey=void 0,p._parent=void 0}else o._parent=e,o._parentKey=r,travelOne(o,a,t,n),o._parentKey=void 0,o._parent=void 0}}function find(e,r,t){return findPredicate(e,StringPredicate(r,t))}function StringPredicate(e,r){return function(t){return t[e]===r}}function findPredicate(e,r){for(var t=e;t;){if(r(t))return t._parent;t=t._parent}return t}module.exports={visitTopDown:visitTopDown,travelOne:travelOne,visit:visit,travel:travel,find:find,findPredicate:findPredicate};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\fesjs\\JSVisitor.js","/..\\ff-fes\\fesjs",undefined)
},{"_process":79,"buffer":76}],16:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function JSWorkBook(o){this.context=o,this.modelName="NEW",this.yaxis=YAxis,this.xaxis=XAxis.bkyr.columns[0]}function fixAll(){for(var o=0,e=this,t=e.validateImportedSolution();!t.valid&&o<20;)t.error.forEach(function(o){o.canFix&&o.fix()}),t=e.validateImportedSolution(),o++;return t}function validateImportedSolution(){var o={succes:[],error:[]},e=this.context,t=this;return this.visitSolutionFormulas(function(r){var a=SolutionFacade.fetchFormulaByIndex(r);try{FESFacade.apiGetValue(a,resolveX(t,0),resolveY(t,0),0,e.getValues()),o.succes.push(a.name)}catch(u){var i;if("ReferenceError"===u.name){var n=u.message.split(" ")[0];i=o.error.lookup("variableName",n)?{hide:!0}:{canFix:!0,variableName:n,fixMessage:"Add",fix:function(){try{log.debug(a.name+" : Fix for ["+n+"] in solution: "+t.getSolutionName()+" : "+a.original+" message:["+u+"]"),t.createFormula(1,n)}catch(o){log.error("Fatal error",o)}}}}else"RangeError"===u.name?i={canFix:!0,fixMessage:"Remove formula",fix:function(){var o=Object.keys(a.deps),i=Object.keys(a.refs);a.formulaDependencys.forEach(function(o){const r=SolutionFacade.fetchFormulaByIndex(o.refId);try{FESFacade.apiGetValue(r,resolveX(t,0),resolveY(t,0),0,e.getValues())}catch(o){mostcommon[a.name]=isNaN(mostcommon[a.name])?1:mostcommon[a.name]+1}}),log.debug("Loop detected for ["+a.name+"], Making string formula "+a.original+"\nDEPS["+o.length+"]["+o+"]\nREFS["+i.length+"]:["+i+"]"),a.parsed=void 0,a.body=AST.STRING(a.original),SolutionFacade.initFormulaBootstrap([r],!1),t.updateValues()}}:(a.formulaDependencys.forEach(function(o){if("deps"===o.association){const r=SolutionFacade.fetchFormulaByIndex(o.refId);try{FESFacade.apiGetValue(r,resolveX(t,0),resolveY(t,0),0,e.getValues())}catch(o){log.error(o)}}}),log.error(u),log.warn("unable to fix problem in "+a.original+" fail:"+u),log.warn(a),i={canFix:!1});i.hide||(i.formulaName=a.name,i.reason=u.message,o.error.push(i))}}),o.valid=0===o.error.length,o.fixProblemsInImportedSolution=fixAll,o.more=mostcommon,o}function resolveX(o,e){return e?o.xaxis[e]:o.xaxis[0]}function resolveY(o,e){var t=e||0;return isNaN(t)?t:o.yaxis[t]}function maxTupleCountForRow(o,e){if(!e.tuple)return 0;var t=e.tupleDefinition?e:o.getSolutionNode(e.solutionName+"_"+e.tupleDefinitionName),r=[];t.ref&&r.push(""+t.ref);for(var a=0;a<t.nodes.length;a++){var i=t.nodes[a],n=o.getSolutionNode(e.solutionName+"_"+i.rowId).ref;n&&r.push(""+n)}return TINSTANCECOUNT(r,o.context.values)}var SolutionFacade=require("./SolutionFacade"),FESFacade=require("./FESFacade"),AST=require("../../ast-node-utils/index").ast,log=require("ff-log"),XAxis=require("./XAxis"),YAxis=require("./YAxis");JSWorkBook.prototype.importSolution=function(o,e){var t=SolutionFacade.importSolutionData(o,e,this);this.solution=t,this.modelName=t.getName(),this.updateValues()},JSWorkBook.prototype.getSolutionName=function(){return this.modelName};var mostcommon={};JSWorkBook.prototype.visitSolutionFormulas=function(o){return this.solution.formulas.forEach(o)},JSWorkBook.prototype.export=function(o,e){return SolutionFacade.exportSolution(o,e,this)},JSWorkBook.prototype.getNode=function(o){return this.getSolutionNode(this.getSolutionName()+"_"+o)},JSWorkBook.prototype.getSolutionNode=function(o){return FESFacade.fetchSolutionNode(o,"value")},JSWorkBook.prototype.fetchSolutionNode=FESFacade.fetchSolutionNode,JSWorkBook.prototype.get=function(o,e,t,r){return this.getSolutionPropertyValue(this.getSolutionName()+"_"+o,e,t,r)},JSWorkBook.prototype.getSolutionPropertyValue=function(o,e,t,r){var a=resolveX(this,t),i=resolveY(this,r);return FESFacade.fetchSolutionPropertyValue(this.context,o,e,a,i)},JSWorkBook.prototype.set=function(o,e,t,r,a){return this.setSolutionPropertyValue(this.getSolutionName()+"_"+o,e,t,r,a)},JSWorkBook.prototype.setSolutionPropertyValue=function(o,e,t,r,a){var i=resolveX(this,r),n=resolveY(this,a);return FESFacade.putSolutionPropertyValue(this.context,o,e,t,i,n)},JSWorkBook.prototype.updateValues=function(){FESFacade.updateValueMap(this.context.values)},JSWorkBook.prototype.fixProblemsInImportedSolution=fixAll,JSWorkBook.prototype.getRootSolutionProperty=function(){return FESFacade.fetchRootSolutionProperty(this.getSolutionName())},JSWorkBook.prototype.tupleIndexForName=function(o,e){var t=this;if(!o.tuple)return 0;var r=o.tupleDefinition?o:t.getSolutionNode(o.tupleDefinitionName);return FESFacade.visit(r,function(o,e){o.tuple&&(maxTupleCount=Math.max(maxTupleCount,TINSTANCECOUNT(t.context.values,o.ref)))}),maxTupleCount},JSWorkBook.prototype.visitProperties=function(o,e,t){resolveY(this,t);var r=this;FESFacade.visit(o,function(o,t){for(var a=maxTupleCountForRow(r,o),i=0;i<=a;i++)e(o,resolveY(r,i),t)})},JSWorkBook.prototype.validateImportedSolution=validateImportedSolution,JSWorkBook.prototype.createFormula=function(o,e,t,r,a){SolutionFacade.createFormulaAndStructure(this.getSolutionName(),o,e,t||"value");var i=SolutionFacade.getOrCreateProperty(this.getSolutionName(),e,t||"value");i.tuple=r,i.frequency=a,this.updateValues()},JSWorkBook.prototype.properties=SolutionFacade.properties,JSWorkBook.prototype.getAllValues=function(){return FESFacade.getAllValues(this.context.values)},module.exports=JSWorkBook;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\fesjs\\JSWorkBook.js","/..\\ff-fes\\fesjs",undefined)
},{"../../ast-node-utils/index":3,"./FESFacade":11,"./SolutionFacade":20,"./XAxis":22,"./YAxis":23,"_process":79,"buffer":76,"ff-log":37}],17:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function ParserService(){}var parsers={};ParserService.prototype.addParser=function(r){parsers[r.name]=r},ParserService.prototype.visitParsers=function(r){for(var e in parsers)r(parsers[e])},ParserService.prototype.findParser=function(r){return parsers[r]},module.exports=ParserService.prototype;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\fesjs\\ParserService.js","/..\\ff-fes\\fesjs",undefined)
},{"_process":79,"buffer":76}],18:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function PropertiesAssembler(){}function createRootnode(e){var o=e.toUpperCase(),r=o+"_root_value";return rootNodes[o]||(PropertiesModel[r]={name:r,rowId:"root",colId:"value",solutionName:o,frequency:"document",displayAs:"SectionAnswerType",nodes:[]},rootNodes[o]=PropertiesModel[r]),rootNodes[o]}function getOrCreateProperty(e,o,r){var t=e+"_"+o+"_"+r,n=PropertiesModel[t];return void 0==n&&(n={rowId:o,solutionName:e,colId:r,name:t,nodes:[]},PropertiesModel[t]=n,rows.add(o)),n}function hasChild(e,o){for(var r=0;r<e.nodes.length;r++)if(e.nodes[r].name===o)return!0;return!1}function addProperty(e,o,r,t,n){var s=getOrCreateProperty(e,o,r);for(key in t)void 0!==s[key]||"delegate"!==key&&"object"==typeof t[key]||(s[key]=t[key]);if(void 0!==n){var i=PropertiesModel[e+"_"+n];hasChild(i,s.name)||i.nodes.push({name:s.name,rowId:s.rowId,colId:s.colId,identifier:e+"_"+n})}}function getRootNode(e){return rootNodes[e]}function visitInternal(e,o,r){if(o(e,r),e.nodes)for(var t=0;t<e.nodes.length;t++){var n=PropertiesModel[e.nodes[t].name];n.parentrowId=e.rowId,visitInternal(n,o,r+1)}}var PropertiesModel={NEW_root_value:{rowId:"root",solutionName:"NEW"}},rootNodes={NEW:PropertiesModel.NEW_root_value},rows=new Set;PropertiesAssembler.prototype.contains=function(e){return rows.has(e)},PropertiesAssembler.prototype.createRootNode=createRootnode,PropertiesAssembler.prototype.bulkInsert=function(e){var o=e.getName();rootNodes[o]||createRootnode(o);for(var r=e.nodes,t=[],n=0;n<8;){for(var s=0;s<r.length;s++){var i=r[s];!i.parentName||PropertiesModel[o+"_"+i.parentName]?(i.ref=i.formulaId||i.ref,addProperty(o,i.rowId,i.colId,i,null===i.parentName?void 0:i.parentName)):t.push(i)}if(0==t.length){r=t;break}r=t,t=[],n++}if(0!==r.length)throw Error("after "+n+" still items left, maybe too deeply nested or resursive.")},PropertiesAssembler.prototype.findAllInSolution=function(e,o){for(var r in PropertiesModel){var t=PropertiesModel[r];t.solutionName===e&&o(t)}},PropertiesAssembler.prototype.fetch=function(e){return PropertiesModel[e]},PropertiesAssembler.prototype.visitProperty=function(e,o){var r=e||getRootNode("NEW");void 0!==r&&visitInternal(r,o,0,void 0)},PropertiesAssembler.prototype.getRootProperty=getRootNode,PropertiesAssembler.prototype.getOrCreateProperty=getOrCreateProperty,module.exports=PropertiesAssembler.prototype;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\fesjs\\PropertiesAssembler.js","/..\\ff-fes\\fesjs",undefined)
},{"_process":79,"buffer":76}],19:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function Solution(o){this.name=o,this.displayTypes={},this.type=o,this.properties={},this.nodes=[],this.addedRowIds=new Set,this.formulas=new Set,this.root={}}Solution.prototype.preparser=function(o){return o},Solution.prototype.getFormulas=function(o){return this.formulas.forEach(o)},Solution.prototype.hasNode=function(o){var t=this.addedRowIds.has(o);return this.addedRowIds.add(o),t},Solution.prototype.setParentName=function(o,t){o.parentName=void 0===t?"root_value":t+"_value"},Solution.prototype.setDelegate=function(o,t){var e={};for(var i in t){var r=t[i];"object"!=typeof r&&"_"!==i.charAt(0)&&(this.properties[i]=this.properties[i]||{},this.properties[i][r]=this.properties[i][r]||0,this.properties[i][r]+=1,e[i]=r)}t.originalproperties=e,o.delegate=t},Solution.prototype.getName=function(){return this.name},Solution.prototype.createNode=function(o,t,e,i){var r={name:this.name+"_"+o+"_"+t,rowId:o,colId:t,refId:e,displayAs:i||"PropertyType"};return void 0!==e&&(r.ref=e,this.formulas.add(e)),this.nodes.push(r),r},Solution.prototype.addDisplayType=function(o){if(void 0===o)throw new Error("undefined displaytype, make sure to use valid displayTypes");this.displayTypes[o]=!0},Solution.prototype.getDisplayTypes=function(o){return this.displayTypes},Solution.prototype.stringify=function(){return this.preparser(JSON.stringify(this.root,function(o,t){if("originalproperties"!==o)return t},2))},Solution.prototype.addNode=function(o,t){this.nodes[o]=t},Solution.prototype.setPreparser=function(o){this.preparser=o},Solution.prototype.restoreDelegateProperties=function(o,t){var e=t.delegate;if(void 0!==e&&void 0!==e.originalproperties)for(var i in e.originalproperties)void 0!==o[i]&&null!==o[i]||void 0!==e.originalproperties[i]&&null!==e.originalproperties[i]&&""!==e.originalproperties[i]&&(o[i]=e.originalproperties[i])},Solution.prototype.addNodeToCorrespondingPlaceInHierarchie=function(o,t,e){if(void 0===o)this.root=e;else{var i=this.nodes[o];void 0===i.children&&(i.children=[]),i.children.push(e)}},Solution.prototype.size=function(){return this.nodes.length},module.exports=Solution;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\fesjs\\Solution.js","/..\\ff-fes\\fesjs",undefined)
},{"_process":79,"buffer":76}],20:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function SolutionFacade(){}function initFormulaBootstrap(e,r){e.forEach(function(e){var o=FormulaService.findFormulaByIndex(e);r&&(o.parsed=void 0),void 0!==o.parsed&&null!==o.parsed||FormulaBootstrap.parseAsFormula(o),FunctionMap.initializeFormula(o)})}function modifyFormula(e,r){FormulaService.moveFormula(e,r),FunctionMap.moveFunction(e,r);for(var o in e.refs){var t=PropertiesAssembler.fetch(o);t.ref=r.id,t.formulaId=r.id}}var log=require("ff-log"),Solution=require("./Solution"),PropertiesAssembler=require("./PropertiesAssembler"),FunctionMap=require("./FunctionMap"),FormulaService=require("./FormulaService"),ParserService=require("./ParserService"),FormulaBootstrap=require("./FormulaBootstrap"),esprima=require("esprima");SolutionFacade.prototype.createSolution=function(e){return new Solution(PropertiesAssembler.createRootNode(e).solutionName)},SolutionFacade.prototype.importSolutionData=function(e,r,o){var t=ParserService.findParser(r).parseData(e,o);return PropertiesAssembler.bulkInsert(t),initFormulaBootstrap(t.formulas,!1),t},SolutionFacade.prototype.exportSolution=function(e,r,o){var t=ParserService.findParser(e);if(void 0===t)throw Error("No such parser found:["+e+"]");return t.deParse(r,o)},SolutionFacade.prototype.initFormulaBootstrap=initFormulaBootstrap,SolutionFacade.prototype.gatherFormulaProperties=function(e,r,o){var t={};for(var a in r){var i=FormulaService.findFormulaByIndex(PropertiesAssembler.getOrCreateProperty(e,o,a).ref);void 0!==i&&void 0!==i.original&&null!==i.original&&""!==i.original&&(t[a]=i.original)}return t},SolutionFacade.prototype.createFormulaAndStructure=function(e,r,o,t){var a=esprima.parse(r),i=this.createSolution(e);this.createUIFormulaLink(i,o,t,a.body[0].expression,void 0),this.initFormulaBootstrap(i.formulas)},SolutionFacade.prototype.createUIFormulaLink=function(e,r,o,t,a){var i=PropertiesAssembler.getOrCreateProperty(e.name,r,o),n=FormulaService.addModelFormula(i,e.name,r,o,-1==["value","title"].indexOf(o),t);return e.createNode(r,o,n,a)},SolutionFacade.prototype.mergeFormulas=function(e){var r=[];e.forEach(function(e){var o=FormulaService.findFormulaByIndex(e.index);void 0!==o&&null!==o&&(r.push(o.id||o.index),o.index!==e.id&&modify(o,e))}),this.initFormulaBootstrap(r,!0)},SolutionFacade.prototype.addFormulaDependency=function(e,r,o){var t=PropertiesAssembler.getOrCreateProperty(e.name.split("_")[0],r,o||"value");return FormulaService.addFormulaDependency(e,t.ref,t.name),t},SolutionFacade.prototype.visitParsers=ParserService.visitParsers,SolutionFacade.prototype.addParser=ParserService.addParser,SolutionFacade.prototype.getOrCreateProperty=PropertiesAssembler.getOrCreateProperty,SolutionFacade.prototype.contains=PropertiesAssembler.contains,SolutionFacade.prototype.properties={value:0,visible:1,required:2,locked:3,entered:4,validation:5,title:6,validateInput:7,choices:8,_testg:9,_testh:10},SolutionFacade.prototype.fetchFormulaByIndex=FormulaService.findFormulaByIndex,FormulaBootstrap.initStateBootstrap(SolutionFacade.prototype),module.exports=SolutionFacade.prototype;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\fesjs\\SolutionFacade.js","/..\\ff-fes\\fesjs",undefined)
},{"./FormulaBootstrap":12,"./FormulaService":13,"./FunctionMap":14,"./ParserService":17,"./PropertiesAssembler":18,"./Solution":19,"_process":79,"buffer":76,"esprima":75,"ff-log":37}],21:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function TupleIndexConverter(){}TupleIndexConverter.prototype.getIndexNumber=function(e,t,n){var r=n||"NOCATEGORY";e.tupleIndexList=e.tupleIndexList||{};var p=e.tupleIndexList[r]=e.tupleIndexList[r]||{};return parseInt(p[t]||(p[t]=""+Object.keys(p).length))},module.exports=TupleIndexConverter.prototype;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\fesjs\\TupleIndexConverter.js","/..\\ff-fes\\fesjs",undefined)
},{"_process":79,"buffer":76}],22:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function calculateCalculationDocument(e){function i(e,a,r,t){a.forEach(function(a){a.parent=e;var s=a.size,l=0;for(a.parent.sibling=[];s<=e.size-1;)a.idx=r+s,a.no=l,s+=a.size,a.parent.sibling.push(r+a.size*(l+1)),i(a,a.children,r+a.size*l,t),l++}),t(e)}function a(e,i){e.sibling.forEach(function(e){var r=h[e];void 0==r.sibling?i.push(e):a(r,i)})}function r(e,i){var i=i*g;return i++,i+=e*v}this.tContext=e;var t=e.formulasets,s=(e.formulasets.length,{}),l=e.navalue,n=[],h=[];this.viewmodes=s;var o=[],d=e.layout.period,m=d[0],u=t[t.length-1];m.formulaset=t[m.formulasetId];for(var f=0;f<e.layout.idx;f++)f>=m.idx&&((m=d[m.formulasetId+1]).formulaset=t[m.formulasetId]),o[f]=m;m.last=e.layout.idx;var p={hash:0,prevTl:void 0,dummy:!0};p.f=0,p.prev=p;for(var c=e.time.timelineSize,v=e.time.timelineMultiplier,g=e.time.columnMultiplier,x=e.layout;void 0!=x;)s[x.name]={doc:[[{hash:0,f:0,header:headers.title},{hash:1,f:1,header:headers.doc,lastall:{hash:1},firstall:{hash:1},firstnotrend:{hash:1},lastnotrend:{hash:1},firsttrend:{hash:1,lastbkyr:{hash:0}},lasttrend:{hash:1}}]],period:[[{hash:0,f:0,header:headers.title},{hash:1,f:1,header:headers.period},{hash:2,header:headers.period}]],none:[[{hash:0,f:0,header:headers.title}]],columns:[],matrix:[[{hash:0,f:0,header:headers.title},{hash:1,f:1,header:headers.matrix},{hash:2,header:headers.matrix},{hash:3,header:headers.matrix},{hash:4,header:headers.matrix},{hash:5,header:headers.matrix}]],cols:[]},x=x.children[0];i(e.layout,e.layout.children,0,function(e){for(var i={parenttypes:[],hash:e.idx},r=e.parent;void 0!=r;){var t=e.idx-r.size;i.parenttypes.push({idx:r.idx,type:r.name,prevme:t>0?t:void 0}),i.top=r.idx,r=r.parent}if(void 0!=e.parent&&(i.agg=e.parent.idx,i.period=o[e.idx]),void 0!=e.sibling){i.sibling=e.sibling.slice();i.sibling;var l=[];a(e,l),i.allchildren=l}else{var n=o[e.idx];void 0==n.first&&(n.first=e.idx),o[e.idx].last=e.idx}s[e.name].cols.push(i),h[i.hash]=i});for(var y in this.viewmodes)for(b=0;b<c;b++)this.viewmodes[y].columns[b]=[];for(var b=0;b<c;b++){for(var y in this.viewmodes)for(var z=(T=s[y]).cols,I=0;I<z.length;I++){var C=T.columns,D=T.columns[b],M=T.cols[I],k=r(b,M.hash),w=0==I?p:D[D.length-1],S=0==b?void 0:C[b-1][D.length],E={header:headers.columns,hash:k,prevTl:S,prev:w};n[k]=E,D.push(E),E.first=D[0]}for(var y in this.viewmodes)for(var T=s[y],q=(z=T.cols).length,I=0;I<q;I++){var D=(C=T.columns)[b],j=T.columns[b][I];j.last=D[D.length-1],j.first=D[0],j.next=I==q-1?p:D[I+1];M=T.cols[I];if(j.formula=M.period,void 0!=M.agg){var A=r(b,M.agg);j.agg=n[A]}if(void 0!=M.sibling?(j.f=u.formulasetId,j.header={title:"timelineAgg"},j.aggcols=[],M.sibling.forEach(function(e){var i=r(b,e);j.aggcols.push(n[i])}),j.firstchild=n[r(b,M.allchildren[0])],j.lastchild=n[r(b,M.allchildren[M.allchildren.length-1])]):j.f=o[M.hash].formulasetId,j.doc=D[0],void 0!=M.period){j.period=D[M.period.hash],j.header={title:"timeline "+M.period.formulaset.name},j.firstinperiod=n[r(b,M.period.first)],j.lastinperiod=n[r(b,M.period.last)];for(var O=0;O<d.length;O++){var X=d[O],B=n[r(b,X.first)],F=X.formulaset.name;j["first"+F]=B;var G=n[r(b,X.last)];j["last"+F]=G,j["isfirst"+F]=B.hash==j.hash,j["islast"+F]=G.hash==j.hash,j["is"+F]=X.formulasetId==o[M.hash].formulasetId,j["isprev"+F]=0!=j.prev.hash&&j.prev["is"+F]}j.isfirstinperiod=j.firstinperiod.hash==j.hash,j.islastinperiod=j.lastinperiod.hash==j.hash}if(j.aggregated=void 0!=M.sibling,j.tsy=void 0==M.sibling?1:M.allchildren.length,j.texceedtsy=M.hash>j.tsy,void 0==M.sibling){for(var H=0;H<M.parenttypes.length;H++){var J=M.parenttypes[H],K=J.type,L=h[J.idx],N=L.allchildren,P=n[r(b,L.hash)];j[K]=P,j["prev"+K]=void 0==P.prev?p:P.prev,j["previn"+K]=void 0==J.prevme?p:n[r(b,J.prevme)],j["isinfirst"+K]=void 0==J.prevme;var Q=P.prev;j["lastinprev"+K]=0==Q.hash?p:Q.lastchild,j["firstinprev"+K]=0==Q.hash?p:Q.firstchild,j["lastin"+K]=Q;var R=n[r(b,N[0])];j["first"+K]=R,j["isfirst"+K]=R.hash==j.hash;var U=n[r(b,N[N.length-1])];j["last"+K]=U,j["islast"+K]=U.hash==j.hash}j.mutcalc=j.infirstbkyr?1:l}j.detail=0==I?D[0]:D[1]}}return this.indexed=n,h=void 0,tracer.debug("Created Xaxis for "+e.time.columnSize+" columns on "+c+" timelines "),p.doc=j.doc,s}function CalculationDocument(){}var importData={formulasets:[{formulasetId:0,name:"notrend"},{formulasetId:1,name:"trend"},{formulasetId:2,name:"user"},{formulasetId:3,name:"sector"},{formulasetId:4,name:"title"},{formulasetId:5,name:"aggregation"}],layout:{childrenmonth:[{children:[{children:[{children:[{children:[],name:"detl",size:1}],name:"qurt",size:4}],name:"half",size:9}],name:"bkyr",size:19}],children:[{children:[],name:"bkyr",size:1}],children13period:[{children:[{children:[],name:"detl",size:1}],name:"bkyr",size:13}],idx:40,name:"all",no:0,period:[{formulasetId:0,hash:0,idx:19},{formulasetId:1,hash:1,idx:40}],size:40},navalue:1e-10,nestedTupleMultiplier:"undefined",time:{columnMultiplier:1,columnSize:40,columns:[{index:0,name:"jan/p1"},{index:1,name:"fes/p2"},{index:2,name:"mar/p3"}],periodMultiplier:1,periodSize:2,timelineMultiplier:256,timelineSize:1,timelines:[{index:0,name:"ExpertOptie-level5"}]},tupleMultiplier:32768},tracer=require("ff-log"),headers={title:{title:"title"},columns:{title:"timeline"},period:{title:"period"},matrix:{title:"matrix"},none:{title:"none"},doc:{title:"document"}};CalculationDocument.prototype=calculateCalculationDocument(importData),module.exports=CalculationDocument.prototype;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\fesjs\\XAxis.js","/..\\ff-fes\\fesjs",undefined)
},{"_process":79,"buffer":76,"ff-log":37}],23:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var first={index:0,hash:0},all=[first];first.base=first;for(var i=1;i<40;i++){var newYas={index:i,hash:32768*i,previous:all[i-1],base:first};all[i-1].next=newYas,all.push(newYas)}TVALUES=function(r,a,n,e,t,i,s){for(var T=t,N=[],f=TINSTANCECOUNT(r,s);T&&f>=T.index;){var l=a(n,e,T,i,s);N.push(l),T=T.next}return N},TCOUNT=function(r,a,n,e,t,i,s){return TINSTANCECOUNT(r,s)},TINSTANCECOUNT=function(r,a){for(var n=-1,e=0;e<r.length;e++){var t=r[e],i=Object.keys(a[t]);0!=i.length&&(n=1==i.length?Math.max(n,(2064384&parseInt(i[0]))>>15):Math.max(n,i.reduce(function(r,a){return Math.max((2064384&parseInt(r))>>15,(2064384&parseInt(a))>>15)})))}return n},TINSTANCEBYNAME=function(r,a,n,e){for(var t=TINSTANCECOUNT(r,a),i=0;i<t;i++)r[a][n]},module.exports=all;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\fesjs\\YAxis.js","/..\\ff-fes\\fesjs",undefined)
},{"_process":79,"buffer":76}],24:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function MockValues(){}function Context(){this.applicationContext=ApplicationContext,this.values={}}var ApplicationContext={parsers:[]},propertyDefaults={visible:!0,value:1e-10,required:!1,locked:!1,choices:void 0,valid:!0,validation:!1};Context.prototype.propertyDefaults=propertyDefaults,Context.prototype.getValues=function(){return this.values},module.exports=Context;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\fesjs\\fescontext.js","/..\\ff-fes\\fesjs",undefined)
},{"_process":79,"buffer":76}],25:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function FESApi(){}function getEntry(e,o,t,r){var n=[],i=t,u=e.columns,l=e.getSolutionNode(o,"value");l&&"document"===l.frequency&&(u=i);for(var s=i;s<=u;s++){var a={};n.push(a);for(var p in e.properties)a[p]=e.getSolutionPropertyValue(o,p,s,r),(i!==u||i>0)&&(a.column=s),a.variable=l.rowId,l.tuple&&(a.tupleIndex=r.index),a.hash=r.hash+s+0}return i==u&&(n=n[0]),n}require("./exchange_modules/ffl/fflparser");var log=require("ff-log"),WorkBook=require("./fesjs/JSWorkBook"),FESContext=require("./fesjs/fescontext"),TupleIndexConverter=require("./fesjs/TupleIndexConverter");FESApi.prototype.init=function(e){var o=new WorkBook(new FESContext);o.importSolution(e,"ffl");o.validateImportedSolution();o.fixProblemsInImportedSolution();var t=o.validateImportedSolution();if(!t.valid)throw log.error(t),Error("unable to initialize");return log.debug("Initialized model ["+o.getSolutionName()+"]"),o.getRootSolutionProperty().solutionName},FESApi.prototype.addFunctions=function(e){var o=[];for(var t in e.entries)o.push(t),global[t]=e.entries[t];log.debug("Added fes-plugin [%s] functions [%s]",e.name,o)},FESApi.prototype.fesGetValue=function(e,o,t,r,n){t=t||0,void 0!==n&&(n=TupleIndexConverter.getIndexNumber(e,n));var i=new FESContext;i.values=e.values;var u=new WorkBook(i);if(u.columns=e.columns||2,u.properties=e.properties||u.properties,u.updateValues(),void 0!==r){if(u.fetchSolutionNode(o,"choices")){var l=u.getSolutionPropertyValue(o,"choices"),s=l.lookup("value",r);void 0===s?log.debug("Could not find [%s] choice [%s] in %s. using [%s] to be value",o,r,JSON.stringify(l),r):r=isNaN(s.name)?s.name:parseInt(s.name)}u.setSolutionPropertyValue(o,r,"value",t,n);var a=[],p=u.getSolutionNode(o);return u.visitProperties(p,function(e,o,r){a=a.concat(getEntry(u,e.solutionName+"_"+e.rowId,t,o))},0),a}a=[];return(p=u.getSolutionNode(o))?u.visitProperties(p,function(e,o){a.push(getEntry(u,e.solutionName+"_"+e.rowId,t,o))}):a.push({variable:o}),a},exports.JSWorkbook=WorkBook,exports.LMEContext=WorkBook,exports.fesjs=FESApi.prototype;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\ff-fes.js","/..\\ff-fes",undefined)
},{"./exchange_modules/ffl/fflparser":6,"./fesjs/JSWorkBook":16,"./fesjs/TupleIndexConverter":21,"./fesjs/fescontext":24,"_process":79,"buffer":76,"ff-log":37}],26:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function build(r){var e=function r(){return applyStyle.apply(r,arguments)};return e._styles=r,e.__proto__=proto,e}function applyStyle(){var r=arguments,e=r.length,o=0!==e&&String(arguments[0]);if(e>1)for(var s=1;s<e;s++)o+=" "+r[s];if(!colors.enabled||!o)return o;for(var t=this._styles,n=t.length;n--;){var l=ansiStyles[t[n]];o=l.open+o.replace(l.closeRe,l.open)+l.close}return o}function applyTheme(r){for(var e in r)!function(e){colors[e]=function(o){if("object"==typeof r[e]){var s=o;for(var t in r[e])s=colors[r[e][t]](s);return s}return colors[r[e]](o)}}(e)}function init(){var r={};return Object.keys(styles).forEach(function(e){r[e]={get:function(){return build([e])}}}),r}var colors={};module.exports=colors,colors.themes={};var ansiStyles=colors.styles=require("./styles"),defineProps=Object.defineProperties;colors.supportsColor=require("./system/supports-colors"),void 0===colors.enabled&&(colors.enabled=colors.supportsColor),colors.stripColors=colors.strip=function(r){return(""+r).replace(/\x1B\[\d+m/g,"")};var stylize=colors.stylize=function(r,e){return colors.enabled?ansiStyles[e].open+r+ansiStyles[e].close:r+""},matchOperatorsRe=/[|\\{}()[\]^$+*?.]/g,escapeStringRegexp=function(r){if("string"!=typeof r)throw new TypeError("Expected a string");return r.replace(matchOperatorsRe,"\\$&")},styles=function(){var r={};return ansiStyles.grey=ansiStyles.gray,Object.keys(ansiStyles).forEach(function(e){ansiStyles[e].closeRe=new RegExp(escapeStringRegexp(ansiStyles[e].close),"g"),r[e]={get:function(){return build(this._styles.concat(e))}}}),r}(),proto=defineProps(function(){},styles);colors.setTheme=function(r){if("string"==typeof r)try{return colors.themes[r]=require(r),applyTheme(colors.themes[r]),colors.themes[r]}catch(r){return console.log(r),r}else applyTheme(r)};var sequencer=function(r,e){var o=e.split("");return(o=o.map(r)).join("")};colors.trap=require("./custom/trap"),colors.zalgo=require("./custom/zalgo"),colors.maps={},colors.maps.america=require("./maps/america"),colors.maps.zebra=require("./maps/zebra"),colors.maps.rainbow=require("./maps/rainbow"),colors.maps.random=require("./maps/random");for(var map in colors.maps)!function(r){colors[r]=function(e){return sequencer(colors.maps[r],e)}}(map);defineProps(colors,init());

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\node_modules\\colors\\lib\\colors.js","/..\\ff-fes\\node_modules\\colors\\lib",undefined)
},{"./custom/trap":27,"./custom/zalgo":28,"./maps/america":29,"./maps/rainbow":30,"./maps/random":31,"./maps/zebra":32,"./styles":33,"./system/supports-colors":34,"_process":79,"buffer":76}],27:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
module.exports=function(o,t){var r="",a={a:["@","Ą","Ⱥ","Ʌ","Δ","Λ","Д"],b:["ß","Ɓ","Ƀ","ɮ","β","฿"],c:["©","Ȼ","Ͼ"],d:["Ð","Ɗ","Ԁ","ԁ","Ԃ","ԃ"],e:["Ë","ĕ","Ǝ","ɘ","Σ","ξ","Ҽ","੬"],f:["Ӻ"],g:["ɢ"],h:["Ħ","ƕ","Ң","Һ","Ӈ","Ԋ"],i:["༏"],j:["Ĵ"],k:["ĸ","Ҡ","Ӄ","Ԟ"],l:["Ĺ"],m:["ʍ","Ӎ","ӎ","Ԡ","ԡ","൩"],n:["Ñ","ŋ","Ɲ","Ͷ","Π","Ҋ"],o:["Ø","õ","ø","Ǿ","ʘ","Ѻ","ם","۝","๏"],p:["Ƿ","Ҏ"],q:["্"],r:["®","Ʀ","Ȑ","Ɍ","ʀ","Я"],s:["§","Ϟ","ϟ","Ϩ"],t:["Ł","Ŧ","ͳ"],u:["Ʊ","Ս"],v:["ט"],w:["Ш","Ѡ","Ѽ","൰"],x:["Ҳ","Ӿ","Ӽ","ӽ"],y:["¥","Ұ","Ӌ"],z:["Ƶ","ɀ"]};return(o=(o=o||"Run the trap, drop the bass").split("")).forEach(function(o){o=o.toLowerCase();var t=a[o]||[" "],e=Math.floor(Math.random()*t.length);r+=void 0!==a[o]?a[o][e]:o}),r};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\node_modules\\colors\\lib\\custom\\trap.js","/..\\ff-fes\\node_modules\\colors\\lib\\custom",undefined)
},{"_process":79,"buffer":76}],28:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
module.exports=function(i,n){function o(i){return Math.floor(Math.random()*i)}function d(i){var n=!1;return u.filter(function(o){n=o===i}),n}i=i||"   he is here   ";var r={up:["̍","̎","̄","̅","̿","̑","̆","̐","͒","͗","͑","̇","̈","̊","͂","̓","̈","͊","͋","͌","̃","̂","̌","͐","̀","́","̋","̏","̒","̓","̔","̽","̉","ͣ","ͤ","ͥ","ͦ","ͧ","ͨ","ͩ","ͪ","ͫ","ͬ","ͭ","ͮ","ͯ","̾","͛","͆","̚"],down:["̖","̗","̘","̙","̜","̝","̞","̟","̠","̤","̥","̦","̩","̪","̫","̬","̭","̮","̯","̰","̱","̲","̳","̹","̺","̻","̼","ͅ","͇","͈","͉","͍","͎","͓","͔","͕","͖","͙","͚","̣"],mid:["̕","̛","̀","́","͘","̡","̢","̧","̨","̴","̵","̶","͜","͝","͞","͟","͠","͢","̸","̷","͡"," ҉"]},u=[].concat(r.up,r.down,r.mid);return function(i,n){var u,e,t="";(n=n||{}).up=void 0===n.up||n.up,n.mid=void 0===n.mid||n.mid,n.down=void 0===n.down||n.down,n.size=void 0!==n.size?n.size:"maxi",i=i.split("");for(e in i)if(!d(e)){switch(t+=i[e],u={up:0,down:0,mid:0},n.size){case"mini":u.up=o(8),u.mid=o(2),u.down=o(8);break;case"maxi":u.up=o(16)+3,u.mid=o(4)+1,u.down=o(64)+3;break;default:u.up=o(8)+1,u.mid=o(6)/2,u.down=o(8)+1}var a=["up","mid","down"];for(var m in a)for(var f=a[m],p=0;p<=u[f];p++)n[f]&&(t+=r[f][o(r[f].length)])}return t}(i,n)};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\node_modules\\colors\\lib\\custom\\zalgo.js","/..\\ff-fes\\node_modules\\colors\\lib\\custom",undefined)
},{"_process":79,"buffer":76}],29:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var colors=require("../colors");module.exports=function(r,e,o){if(" "===r)return r;switch(e%3){case 0:return colors.red(r);case 1:return colors.white(r);case 2:return colors.blue(r)}};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\node_modules\\colors\\lib\\maps\\america.js","/..\\ff-fes\\node_modules\\colors\\lib\\maps",undefined)
},{"../colors":26,"_process":79,"buffer":76}],30:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var colors=require("../colors");module.exports=function(){var r=["red","yellow","green","blue","magenta"];return function(e,o,n){return" "===e?e:colors[r[o++%r.length]](e)}}();

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\node_modules\\colors\\lib\\maps\\rainbow.js","/..\\ff-fes\\node_modules\\colors\\lib\\maps",undefined)
},{"../colors":26,"_process":79,"buffer":76}],31:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var colors=require("../colors");module.exports=function(){var e=["underline","inverse","grey","yellow","red","green","blue","white","cyan","magenta"];return function(r,n,o){return" "===r?r:colors[e[Math.round(Math.random()*(e.length-1))]](r)}}();

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\node_modules\\colors\\lib\\maps\\random.js","/..\\ff-fes\\node_modules\\colors\\lib\\maps",undefined)
},{"../colors":26,"_process":79,"buffer":76}],32:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var colors=require("../colors");module.exports=function(r,o,e){return o%2==0?r:colors.inverse(r)};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\node_modules\\colors\\lib\\maps\\zebra.js","/..\\ff-fes\\node_modules\\colors\\lib\\maps",undefined)
},{"../colors":26,"_process":79,"buffer":76}],33:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var styles={};module.exports=styles;var codes={reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29],black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],gray:[90,39],grey:[90,39],bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],blackBG:[40,49],redBG:[41,49],greenBG:[42,49],yellowBG:[43,49],blueBG:[44,49],magentaBG:[45,49],cyanBG:[46,49],whiteBG:[47,49]};Object.keys(codes).forEach(function(e){var l=codes[e],a=styles[e]=[];a.open="["+l[0]+"m",a.close="["+l[1]+"m"});

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\node_modules\\colors\\lib\\styles.js","/..\\ff-fes\\node_modules\\colors\\lib",undefined)
},{"_process":79,"buffer":76}],34:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var argv=process.argv;module.exports=-1===argv.indexOf("--no-color")&&-1===argv.indexOf("--color=false")&&(-1!==argv.indexOf("--color")||-1!==argv.indexOf("--color=true")||-1!==argv.indexOf("--color=always")||!(process.stdout&&!process.stdout.isTTY)&&("win32"===process.platform||("COLORTERM"in process.env||"dumb"!==process.env.TERM&&!!/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM))));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\node_modules\\colors\\lib\\system\\supports-colors.js","/..\\ff-fes\\node_modules\\colors\\lib\\system",undefined)
},{"_process":79,"buffer":76}],35:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var colors=require("./lib/colors");module.exports=colors;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\node_modules\\colors\\safe.js","/..\\ff-fes\\node_modules\\colors",undefined)
},{"./lib/colors":26,"_process":79,"buffer":76}],36:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
!function(e){"use strict";function t(e,t){for(e=String(e),t=t||2;e.length<t;)e="0"+e;return e}function a(e){var t=new Date(e.getFullYear(),e.getMonth(),e.getDate());t.setDate(t.getDate()-(t.getDay()+6)%7+3);var a=new Date(t.getFullYear(),0,4);a.setDate(a.getDate()-(a.getDay()+6)%7+3);var n=t.getTimezoneOffset()-a.getTimezoneOffset();t.setHours(t.getHours()-n);var r=(t-a)/6048e5;return 1+Math.floor(r)}function n(e){var t=e.getDay();return 0===t&&(t=7),t}function r(e){return null===e?"null":void 0===e?"undefined":"object"!=typeof e?typeof e:Array.isArray(e)?"array":{}.toString.call(e).slice(8,-1).toLowerCase()}var d=function(){var e=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|'[^']*'|'[^']*'/g,s=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,y=/[^-+\dA-Z]/g;return function(m,i,o,u){if(1!==arguments.length||"string"!==r(m)||/\d/.test(m)||(i=m,m=void 0),(m=m||new Date)instanceof Date||(m=new Date(m)),isNaN(m))throw TypeError("Invalid date");var l=(i=String(d.masks[i]||i||d.masks.default)).slice(0,4);"UTC:"!==l&&"GMT:"!==l||(i=i.slice(4),o=!0,"GMT:"===l&&(u=!0));var M=o?"getUTC":"get",T=m[M+"Date"](),c=m[M+"Day"](),f=m[M+"Month"](),g=m[M+"FullYear"](),h=m[M+"Hours"](),D=m[M+"Minutes"](),p=m[M+"Seconds"](),H=m[M+"Milliseconds"](),S=o?0:m.getTimezoneOffset(),v=a(m),b=n(m),N={d:T,dd:t(T),ddd:d.i18n.dayNames[c],dddd:d.i18n.dayNames[c+7],m:f+1,mm:t(f+1),mmm:d.i18n.monthNames[f],mmmm:d.i18n.monthNames[f+12],yy:String(g).slice(2),yyyy:g,h:h%12||12,hh:t(h%12||12),H:h,HH:t(h),M:D,MM:t(D),s:p,ss:t(p),l:t(H,3),L:t(Math.round(H/10)),t:h<12?"a":"p",tt:h<12?"am":"pm",T:h<12?"A":"P",TT:h<12?"AM":"PM",Z:u?"GMT":o?"UTC":(String(m).match(s)||[""]).pop().replace(y,""),o:(S>0?"-":"+")+t(100*Math.floor(Math.abs(S)/60)+Math.abs(S)%60,4),S:["th","st","nd","rd"][T%10>3?0:(T%100-T%10!=10)*T%10],W:v,N:b};return i.replace(e,function(e){return e in N?N[e]:e.slice(1,e.length-1)})}}();d.masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:sso",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"},d.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]},"function"==typeof define&&define.amd?define(function(){return d}):"object"==typeof exports?module.exports=d:e.dateFormat=d}(this);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\node_modules\\dateformat\\lib\\dateformat.js","/..\\ff-fes\\node_modules\\dateformat\\lib",undefined)
},{"_process":79,"buffer":76}],37:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var tracer=require("tracer"),format="HH.MM.ssl",logLevel=process.env.ENV||"info",levels={debug:{DEBUG:!0,TRACE:!0,INFO:!1},info:{DEBUG:!1,TRACE:!1,INFO:!0},error:{DEBUG:!1,TRACE:!1,INFO:!1,WARN:!1},trace:{DEBUG:!0,TRACE:!0,INFO:!0}},console=tracer.colorConsole({format:"{{timestamp}} ({{file}}:{{line}}) \t- {{message}}",dateformat:format,level:logLevel});console.DEBUG=levels[logLevel].DEBUG,console.INFO=levels[logLevel].INFO,console.TRACE=levels[logLevel].TRACE,module.exports=console,exports=console;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\node_modules\\ff-log\\ff-log.js","/..\\ff-fes\\node_modules\\ff-log",undefined)
},{"_process":79,"buffer":76,"tracer":44}],38:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
!function(){"use strict";var n=function(n){function t(){return 0===e()}function e(){return o.length}var r=n||1/0,o=[];return{push:function(n){if(e()===r)throw new Error("push(): Stack is full.");return o.push(n)},pop:function(){if(t())throw new Error("pop(): Stack is empty.");return o.pop()},peek:function(){if(t())throw new Error("peek(): Stack is empty.");return o[o.length-1]},isEmpty:t,size:e,empty:function(){for(;o.length;)o.pop()},iterator:new function(){function n(){return o.length!==t}var t=0;return{hasNext:n,next:function(){if(!n())throw new Error("next(): No such element.");return o[o.length-1-t++]}}}}};"function"==typeof define&&define.amd?define(function(){return n}):"undefined"!=typeof module&&module.exports?module.exports=n:window.Stack=n}();

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\node_modules\\stack-adt\\dist\\stack-adt.js","/..\\ff-fes\\node_modules\\stack-adt\\dist",undefined)
},{"_process":79,"buffer":76}],39:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
module.exports=require("./tinytim");var cache={};module.exports.clearCache=function(){cache={}},module.exports.render=module.exports.tim,module.exports.renderFile=function(e,r,t){var c=require("fs"),o=e+":string",u=t?cache[o]||(cache[o]=c.readFileSync(e,"utf8")):c.readFileSync(e,"utf8");return module.exports.render(u,r)};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\node_modules\\tinytim\\lib\\index.js","/..\\ff-fes\\node_modules\\tinytim\\lib",undefined)
},{"./tinytim":40,"_process":79,"buffer":76,"fs":75}],40:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var start=exports.start="{{",end=exports.end="}}",tim=exports.tim=function(){"use strict";return function(t,r){var e=new RegExp(exports.start+"\\s*([a-z0-9_][\\.a-z0-9_]*)\\s*"+exports.end,"gi");return t.replace(e,function(t,e){for(var n=e.split("."),o=n.length,i=r,s=0;s<o;s++){if(void 0===(i=i[n[s]]))throw new Error("tim: '"+n[s]+"' not found in "+t);if(s===o-1)return i}})}}();

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\node_modules\\tinytim\\lib\\tinytim.js","/..\\ff-fes\\node_modules\\tinytim\\lib",undefined)
},{"_process":79,"buffer":76}],41:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
"use strict";var colors=require("colors/safe");module.exports=function(r){return require("./console")({filters:{trace:colors.magenta,debug:colors.cyan,info:colors.green,warn:colors.yellow,error:colors.red.bold}},r)};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\node_modules\\tracer\\lib\\color_console.js","/..\\ff-fes\\node_modules\\tracer\\lib",undefined)
},{"./console":42,"_process":79,"buffer":76,"colors/safe":35}],42:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
"use strict";function logMain(t,e,r,a,i,o,s){var n=settings.level;if("string"==typeof n&&(n=t.methods.indexOf(n)),!(e<n)){var l={timestamp:dateFormat(new Date,t.dateformat),message:"",title:r,level:e,args:s};if(l.method=l.path=l.line=l.pos=l.file="",o){var f=(new Error).stack.split("\n").slice(3),p=f[t.stackIndex]||f[0],u=stackReg.exec(p)||stackReg2.exec(p);u&&5===u.length&&(l.method=u[1],l.path=u[2],l.line=u[3],l.pos=u[4],l.file=path.basename(l.path),l.stack=f.join("\n"))}t.preprocess(l);var m=utils.format.apply(t,l.args);l.message=m,l.output=tinytim.tim(a,l);for(var c=i.length,d=0;d<c;d+=1)if(l.output=fwrap(i[d])(l.output),!l.output)return l;return t.transport.forEach(function(t){t(l)}),l}}var tinytim=require("tinytim"),dateFormat=require("dateformat"),utils=require("./utils"),path=require("path"),settings=require("./settings").settings,noop=function(){},fwrap=function(t){return function(e){return t(e)}},stackReg=/at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i,stackReg2=/at\s+()(.*):(\d*):(\d*)/i;module.exports=function(){var t={format:"{{timestamp}} <{{title}}> {{file}}:{{line}} ({{method}}) {{message}}",dateformat:"isoDateTime",preprocess:function(t){},transport:function(t){t.level>=4?console.error(t.output):console.log(t.output)},filters:[],level:"log",methods:["log","trace","debug","info","warn","error","fatal"],stackIndex:0,inspectOpt:{showHidden:!1,depth:2}},e={};(t=utils.union(t,arguments)).format=Array.isArray(t.format)?t.format:[t.format],t.filters=Array.isArray(t.filters)?t.filters:[t.filters],t.transport=Array.isArray(t.transport)?t.transport:[t.transport];var r,a=t.filters.length;return a>0&&"[object Function]"!=Object.prototype.toString.call(t.filters[--a])&&(r=t.filters[a],t.filters=t.filters.slice(0,a)),"string"==typeof t.level&&(t.level=t.methods.indexOf(t.level)),t.methods.forEach(function(a,i){if(i<t.level)e[a]=noop;else{var o=t.format[0];2===t.format.length&&t.format[1][a]&&(o=t.format[1][a]);var s,n=/{{(method|path|line|pos|file|stack)}}/i.test(o);s=r&&r[a]?Array.isArray(r[a])?r[a]:[r[a]]:t.filters,e[a]=function(){return logMain(t,i,a,o,s,n,arguments)}}}),e};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\node_modules\\tracer\\lib\\console.js","/..\\ff-fes\\node_modules\\tracer\\lib",undefined)
},{"./settings":45,"./utils":46,"_process":79,"buffer":76,"dateformat":36,"path":78,"tinytim":39}],43:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
"use strict";var fs=require("fs"),dateFormat=require("dateformat"),tinytim=require("tinytim"),utils=require("./utils"),spawn=require("child_process").spawn,spawnSync=require("child_process").spawnSync,path=require("path");module.exports=function(t){function e(t,e){this.date=e,this.path=tinytim.tim(o.logPathFormat,{root:o.root,prefix:t,date:e}),spawnSync("mkdir",["-p",o.root]),this.stream=fs.createWriteStream(this.path,{flags:"a",encoding:"utf8",mode:parseInt("0644",8)})}function r(t,r){if(o.allLogsFileName){var a=i.allLogFile,s=dateFormat(new Date,o.splitFormat);a&&a.date!=s&&(a.destroy(),a=null),a||(a=i.allLogFile=new e(o.allLogsFileName,s),spawn("find",["./","-type","f","-name","*.log","-mtime","+"+o.maxLogFiles,"-exec","rm","{}",";"])),a.write(t)}else{var n=i[r],s=dateFormat(new Date,o.splitFormat);n&&n.date!=s&&(n.destroy(),n=null),n||(n=i[r]=new e(r,s),spawn("find",[o.root,"-type","f","-name","*.log","-mtime","+"+o.maxLogFiles,"-exec","rm","{}",";"])),n.write(t)}}function a(t){r(t.output,t.title)}var o={root:".",logPathFormat:"{{root}}/{{prefix}}.{{date}}.log",splitFormat:"yyyymmdd",allLogsFileName:!1,maxLogFiles:10};o=utils.union(o,[t]),e.prototype.write=function(t){this.stream.write(t+"\n")},e.prototype.destroy=function(){this.stream&&(this.stream.end(),this.stream.destroySoon(),this.stream=null)};var i={};return t.transport?(t.transport=Array.isArray(t.transport)?t.transport:[t.transport],t.transport.push(a)):t.transport=[a],require("./console")(t)};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\node_modules\\tracer\\lib\\dailyfile.js","/..\\ff-fes\\node_modules\\tracer\\lib",undefined)
},{"./console":42,"./utils":46,"_process":79,"buffer":76,"child_process":75,"dateformat":36,"fs":75,"path":78,"tinytim":39}],44:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
"use strict";exports.console=require("./console"),exports.colorConsole=require("./color_console"),exports.dailyfile=require("./dailyfile");var settings=require("./settings");exports.close=settings.close,exports.setLevel=settings.setLevel,exports.getLevel=settings.getLevel;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\node_modules\\tracer\\lib\\index.js","/..\\ff-fes\\node_modules\\tracer\\lib",undefined)
},{"./color_console":41,"./console":42,"./dailyfile":43,"./settings":45,"_process":79,"buffer":76}],45:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
"use strict";var settings={level:void 0},close=function(){settings.level=Number.MAX_VALUE},setLevel=function(e){settings.level=e},getLevel=function(){return settings.level};exports.settings=settings,exports.close=close,exports.setLevel=setLevel,exports.getLevel=getLevel;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\node_modules\\tracer\\lib\\settings.js","/..\\ff-fes\\node_modules\\tracer\\lib",undefined)
},{"_process":79,"buffer":76}],46:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
"use strict";exports.union=function(r,t){for(var e=0,n=t.length;e<n;e+=1){var i=t[e];for(var u in i)r[u]=i[u]}return r};var formatRegExp=/%[sdjt]/g,util=require("util");exports.format=function(r){var t=this.inspectOpt,e=arguments,n=0;if("string"!=typeof r){for(var i=[];n<e.length;n++)i.push(util.inspect(e[n],t));return i.join(" ")}n=1;for(var u=String(r).replace(formatRegExp,function(r){switch(r){case"%s":return String(e[n++]);case"%d":return Number(e[n++]);case"%j":try{return e[n]instanceof Error?JSON.stringify(e[n++],["message","stack","type","name"]):JSON.stringify(e[n++])}catch(r){return"[Circular]"}case"%t":return util.inspect(e[n++],t);default:return r}}),s=e.length,a=e[n];n<s;a=e[++n])u+=null===a||"object"!=typeof a?" "+a:" "+util.inspect(a,t);return u};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-fes\\node_modules\\tracer\\lib\\utils.js","/..\\ff-fes\\node_modules\\tracer\\lib",undefined)
},{"_process":79,"buffer":76,"util":82}],47:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var logger=require("ff-log"),formulaJs=require("formulajs"),entries={};for(functionName in formulaJs)void 0===global[functionName]?entries[functionName]=formulaJs[functionName]:logger.debug("global function already used : ["+functionName+"]");exports.formulajs={name:"formulaJs",entries:entries};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-formulajs\\ff-formulajs.js","/..\\ff-formulajs",undefined)
},{"_process":79,"buffer":76,"ff-log":52,"formulajs":48}],48:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
!function(r,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("numeric"),require("numeral"),require("jStat")):"function"==typeof define&&define.amd?define(["numeric","numeral","jStat"],e):"object"==typeof exports?exports.formulajs=e(require("numeric"),require("numeral"),require("jStat")):r.formulajs=e(r.numeric,r.numeral,r.jStat)}(this,function(__WEBPACK_EXTERNAL_MODULE_3__,__WEBPACK_EXTERNAL_MODULE_8__,__WEBPACK_EXTERNAL_MODULE_9__){return function(r){function e(n){if(t[n])return t[n].exports;var a=t[n]={exports:{},id:n,loaded:!1};return r[n].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var t={};return e.m=r,e.c=t,e.p="",e(0)}([function(r,e,t){var n=[t(1),t(15),t(12),t(16),t(2),t(7),t(14),t(17),t(11),t(18),t(6),t(10)];for(var a in n){var u=n[a];for(var s in u)e[s]=e[s]||u[s]}},function(r,e,t){function n(r,e){if(e)for(var t in e)r[t]=e[t];return r}var a=t(2),u=t(6),s=t(12),i=t(14);e.BETADIST=u.BETA.DIST,e.BETAINV=u.BETA.INV,e.BINOMDIST=u.BINOM.DIST,e.CEILING=e.ISOCEILING=n(a.CEILING.MATH,a.CEILING),e.CEILINGMATH=a.CEILING.MATH,e.CEILINGPRECISE=a.CEILING.PRECISE,e.CHIDIST=u.CHISQ.DIST,e.CHIDISTRT=u.CHISQ.DIST.RT,e.CHIINV=u.CHISQ.INV,e.CHIINVRT=u.CHISQ.INV.RT,e.CHITEST=u.CHISQ.TEST,e.CONFIDENCE=n(u.CONFIDENCE.NORM,u.CONFIDENCE),e.COVAR=u.COVARIANCE.P,e.COVARIANCEP=u.COVARIANCE.P,e.COVARIANCES=u.COVARIANCE.S,e.CRITBINOM=u.BINOM.INV,e.EXPONDIST=u.EXPON.DIST,e.ERFCPRECISE=s.ERFC.PRECISE,e.ERFPRECISE=s.ERF.PRECISE,e.FDIST=u.F.DIST,e.FDISTRT=u.F.DIST.RT,e.FINVRT=u.F.INV.RT,e.FINV=u.F.INV,e.FLOOR=n(a.FLOOR.MATH,a.FLOOR),e.FLOORMATH=a.FLOOR.MATH,e.FLOORPRECISE=a.FLOOR.PRECISE,e.FTEST=u.F.TEST,e.GAMMADIST=u.GAMMA.DIST,e.GAMMAINV=u.GAMMA.INV,e.GAMMALNPRECISE=u.GAMMALN.PRECISE,e.HYPGEOMDIST=u.HYPGEOM.DIST,e.LOGINV=u.LOGNORM.INV,e.LOGNORMINV=u.LOGNORM.INV,e.LOGNORMDIST=u.LOGNORM.DIST,e.MODE=n(u.MODE.SNGL,u.MODE),e.MODEMULT=u.MODE.MULT,e.MODESNGL=u.MODE.SNGL,e.NEGBINOMDIST=u.NEGBINOM.DIST,e.NETWORKDAYSINTL=i.NETWORKDAYS.INTL,e.NORMDIST=u.NORM.DIST,e.NORMINV=u.NORM.INV,e.NORMSDIST=u.NORM.S.DIST,e.NORMSINV=u.NORM.S.INV,e.PERCENTILE=n(u.PERCENTILE.EXC,u.PERCENTILE),e.PERCENTILEEXC=u.PERCENTILE.EXC,e.PERCENTILEINC=u.PERCENTILE.INC,e.PERCENTRANK=n(u.PERCENTRANK.INC,u.PERCENTRANK),e.PERCENTRANKEXC=u.PERCENTRANK.EXC,e.PERCENTRANKINC=u.PERCENTRANK.INC,e.POISSON=n(u.POISSON.DIST,u.POISSON),e.POISSONDIST=u.POISSON.DIST,e.QUARTILE=n(u.QUARTILE.INC,u.QUARTILE),e.QUARTILEEXC=u.QUARTILE.EXC,e.QUARTILEINC=u.QUARTILE.INC,e.RANK=n(u.RANK.EQ,u.RANK),e.RANKAVG=u.RANK.AVG,e.RANKEQ=u.RANK.EQ,e.SKEWP=u.SKEW.P,e.STDEV=n(u.STDEV.S,u.STDEV),e.STDEVP=u.STDEV.P,e.STDEVS=u.STDEV.S,e.TDIST=u.T.DIST,e.TDISTRT=u.T.DIST.RT,e.TINV=u.T.INV,e.TTEST=u.T.TEST,e.VAR=n(u.VAR.S,u.VAR),e.VARP=u.VAR.P,e.VARS=u.VAR.S,e.WEIBULL=n(u.WEIBULL.DIST,u.WEIBULL),e.WEIBULLDIST=u.WEIBULL.DIST,e.WORKDAYINTL=i.WORKDAY.INTL,e.ZTEST=u.Z.TEST},function(module,exports,__webpack_require__){var numeric=__webpack_require__(3),utils=__webpack_require__(4),error=__webpack_require__(5),statistical=__webpack_require__(6),information=__webpack_require__(11);exports.ABS=function(r){return(r=utils.parseNumber(r))instanceof Error?r:Math.abs(utils.parseNumber(r))},exports.ACOS=function(r){return(r=utils.parseNumber(r))instanceof Error?r:Math.acos(r)},exports.ACOSH=function(r){return(r=utils.parseNumber(r))instanceof Error?r:Math.log(r+Math.sqrt(r*r-1))},exports.ACOT=function(r){return(r=utils.parseNumber(r))instanceof Error?r:Math.atan(1/r)},exports.ACOTH=function(r){return(r=utils.parseNumber(r))instanceof Error?r:.5*Math.log((r+1)/(r-1))},exports.AGGREGATE=function(r,e,t,n){if(r=utils.parseNumber(r),e=utils.parseNumber(r),utils.anyIsError(r,e))return error.value;switch(r){case 1:return statistical.AVERAGE(t);case 2:return statistical.COUNT(t);case 3:return statistical.COUNTA(t);case 4:return statistical.MAX(t);case 5:return statistical.MIN(t);case 6:return exports.PRODUCT(t);case 7:return statistical.STDEV.S(t);case 8:return statistical.STDEV.P(t);case 9:return exports.SUM(t);case 10:return statistical.VAR.S(t);case 11:return statistical.VAR.P(t);case 12:return statistical.MEDIAN(t);case 13:return statistical.MODE.SNGL(t);case 14:return statistical.LARGE(t,n);case 15:return statistical.SMALL(t,n);case 16:return statistical.PERCENTILE.INC(t,n);case 17:return statistical.QUARTILE.INC(t,n);case 18:return statistical.PERCENTILE.EXC(t,n);case 19:return statistical.QUARTILE.EXC(t,n)}},exports.ARABIC=function(r){if(!/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/.test(r))return error.value;var e=0;return r.replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g,function(r){e+={M:1e3,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1}[r]}),e},exports.ASIN=function(r){return(r=utils.parseNumber(r))instanceof Error?r:Math.asin(r)},exports.ASINH=function(r){return(r=utils.parseNumber(r))instanceof Error?r:Math.log(r+Math.sqrt(r*r+1))},exports.ATAN=function(r){return(r=utils.parseNumber(r))instanceof Error?r:Math.atan(r)},exports.ATAN2=function(r,e){return r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:Math.atan2(r,e)},exports.ATANH=function(r){return(r=utils.parseNumber(r))instanceof Error?r:Math.log((1+r)/(1-r))/2},exports.BASE=function(r,e,t){if(t=t||0,r=utils.parseNumber(r),e=utils.parseNumber(e),t=utils.parseNumber(t),utils.anyIsError(r,e,t))return error.value;t=void 0===t?0:t;var n=r.toString(e);return new Array(Math.max(t+1-n.length,0)).join("0")+n},exports.CEILING=function(r,e,t){if(e=void 0===e?1:Math.abs(e),t=t||0,r=utils.parseNumber(r),e=utils.parseNumber(e),t=utils.parseNumber(t),utils.anyIsError(r,e,t))return error.value;if(0===e)return 0;var n=-Math.floor(Math.log(e)/Math.log(10));return r>=0?exports.ROUND(Math.ceil(r/e)*e,n):0===t?-exports.ROUND(Math.floor(Math.abs(r)/e)*e,n):-exports.ROUND(Math.ceil(Math.abs(r)/e)*e,n)},exports.CEILING.MATH=exports.CEILING,exports.CEILING.PRECISE=exports.CEILING,exports.COMBIN=function(r,e){return r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:exports.FACT(r)/(exports.FACT(e)*exports.FACT(r-e))},exports.COMBINA=function(r,e){return r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:0===r&&0===e?1:exports.COMBIN(r+e-1,r-1)},exports.COS=function(r){return(r=utils.parseNumber(r))instanceof Error?r:Math.cos(r)},exports.COSH=function(r){return(r=utils.parseNumber(r))instanceof Error?r:(Math.exp(r)+Math.exp(-r))/2},exports.COT=function(r){return(r=utils.parseNumber(r))instanceof Error?r:1/Math.tan(r)},exports.COTH=function(r){if((r=utils.parseNumber(r))instanceof Error)return r;var e=Math.exp(2*r);return(e+1)/(e-1)},exports.CSC=function(r){return(r=utils.parseNumber(r))instanceof Error?r:1/Math.sin(r)},exports.CSCH=function(r){return(r=utils.parseNumber(r))instanceof Error?r:2/(Math.exp(r)-Math.exp(-r))},exports.DECIMAL=function(r,e){return arguments.length<1?error.value:parseInt(r,e)},exports.DEGREES=function(r){return(r=utils.parseNumber(r))instanceof Error?r:180*r/Math.PI},exports.EVEN=function(r){return(r=utils.parseNumber(r))instanceof Error?r:exports.CEILING(r,-2,-1)},exports.EXP=Math.exp;var MEMOIZED_FACT=[];exports.FACT=function(r){if((r=utils.parseNumber(r))instanceof Error)return r;var e=Math.floor(r);return 0===e||1===e?1:MEMOIZED_FACT[e]>0?MEMOIZED_FACT[e]:(MEMOIZED_FACT[e]=exports.FACT(e-1)*e,MEMOIZED_FACT[e])},exports.FACTDOUBLE=function(r){if((r=utils.parseNumber(r))instanceof Error)return r;var e=Math.floor(r);return e<=0?1:e*exports.FACTDOUBLE(e-2)},exports.FLOOR=function(r,e){if(r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e))return error.value;if(0===e)return 0;if(!(r>0&&e>0||r<0&&e<0))return error.num;e=Math.abs(e);var t=-Math.floor(Math.log(e)/Math.log(10));return r>=0?exports.ROUND(Math.floor(r/e)*e,t):-exports.ROUND(Math.ceil(Math.abs(r)/e),t)},exports.FLOOR.MATH=function(r,e,t){if(e=void 0===e?1:e,t=void 0===t?0:t,r=utils.parseNumber(r),e=utils.parseNumber(e),t=utils.parseNumber(t),utils.anyIsError(r,e,t))return error.value;if(0===e)return 0;e=e?Math.abs(e):1;var n=-Math.floor(Math.log(e)/Math.log(10));return r>=0?exports.ROUND(Math.floor(r/e)*e,n):0===t||void 0===t?-exports.ROUND(Math.ceil(Math.abs(r)/e)*e,n):-exports.ROUND(Math.floor(Math.abs(r)/e)*e,n)},exports.FLOOR.PRECISE=exports.FLOOR.MATH,exports.GCD=function(){var r=utils.parseNumberArray(utils.flatten(arguments));if(r instanceof Error)return r;for(var e=r.length,t=r[0],n=t<0?-t:t,a=1;a<e;a++){for(var u=r[a],s=u<0?-u:u;n&&s;)n>s?n%=s:s%=n;n+=s}return n},exports.INT=function(r){return(r=utils.parseNumber(r))instanceof Error?r:Math.floor(r)},exports.ISO={CEILING:exports.CEILING},exports.LCM=function(){var r=utils.parseNumberArray(utils.flatten(arguments));if(r instanceof Error)return r;for(var e,t,n,a,u=1;void 0!==(n=r.pop());)for(;n>1;){if(n%2){for(e=3,t=Math.floor(Math.sqrt(n));e<=t&&n%e;e+=2);a=e<=t?e:n}else a=2;for(n/=a,u*=a,e=r.length;e;r[--e]%a==0&&1==(r[e]/=a)&&r.splice(e,1));}return u},exports.LN=function(r){return(r=utils.parseNumber(r))instanceof Error?r:Math.log(r)},exports.LOG=function(r,e){return r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:(e=void 0===e?10:e,Math.log(r)/Math.log(e))},exports.LOG10=function(r){return(r=utils.parseNumber(r))instanceof Error?r:Math.log(r)/Math.log(10)},exports.MDETERM=function(r){return(r=utils.parseMatrix(r))instanceof Error?r:numeric.det(r)},exports.MINVERSE=function(r){return(r=utils.parseMatrix(r))instanceof Error?r:numeric.inv(r)},exports.MMULT=function(r,e){return r=utils.parseMatrix(r),e=utils.parseMatrix(e),utils.anyIsError(r,e)?error.value:numeric.dot(r,e)},exports.MOD=function(r,e){if(r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e))return error.value;if(0===e)return error.div0;var t=Math.abs(r%e);return e>0?t:-t},exports.MROUND=function(r,e){return r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:r*e<0?error.num:Math.round(r/e)*e},exports.MULTINOMIAL=function(){var r=utils.parseNumberArray(utils.flatten(arguments));if(r instanceof Error)return r;for(var e=0,t=1,n=0;n<r.length;n++)e+=r[n],t*=exports.FACT(r[n]);return exports.FACT(e)/t},exports.MUNIT=function(r){return(r=utils.parseNumber(r))instanceof Error?r:numeric.identity(r)},exports.ODD=function(r){if((r=utils.parseNumber(r))instanceof Error)return r;var e=Math.ceil(Math.abs(r));return e=1&e?e:e+1,r>0?e:-e},exports.PI=function(){return Math.PI},exports.POWER=function(r,e){if(r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e))return error.value;var t=Math.pow(r,e);return isNaN(t)?error.num:t},exports.PRODUCT=function(){var r=utils.parseNumberArray(utils.flatten(arguments));if(r instanceof Error)return r;for(var e=1,t=0;t<r.length;t++)e*=r[t];return e},exports.QUOTIENT=function(r,e){return r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:parseInt(r/e,10)},exports.RADIANS=function(r){return(r=utils.parseNumber(r))instanceof Error?r:r*Math.PI/180},exports.RAND=function(){return Math.random()},exports.RANDBETWEEN=function(r,e){return r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:r+Math.ceil((e-r+1)*Math.random())-1},exports.ROMAN=function(r){if((r=utils.parseNumber(r))instanceof Error)return r;for(var e=String(r).split(""),t=["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM","","X","XX","XXX","XL","L","LX","LXX","LXXX","XC","","I","II","III","IV","V","VI","VII","VIII","IX"],n="",a=3;a--;)n=(t[+e.pop()+10*a]||"")+n;return new Array(+e.join("")+1).join("M")+n},exports.ROUND=function(r,e){return r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:Math.round(r*Math.pow(10,e))/Math.pow(10,e)},exports.ROUNDDOWN=function(r,e){return r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:(r>0?1:-1)*Math.floor(Math.abs(r)*Math.pow(10,e))/Math.pow(10,e)},exports.ROUNDUP=function(r,e){return r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:(r>0?1:-1)*Math.ceil(Math.abs(r)*Math.pow(10,e))/Math.pow(10,e)},exports.SEC=function(r){return(r=utils.parseNumber(r))instanceof Error?r:1/Math.cos(r)},exports.SECH=function(r){return(r=utils.parseNumber(r))instanceof Error?r:2/(Math.exp(r)+Math.exp(-r))},exports.SERIESSUM=function(r,e,t,n){if(r=utils.parseNumber(r),e=utils.parseNumber(e),t=utils.parseNumber(t),n=utils.parseNumberArray(n),utils.anyIsError(r,e,t,n))return error.value;for(var a=n[0]*Math.pow(r,e),u=1;u<n.length;u++)a+=n[u]*Math.pow(r,e+u*t);return a},exports.SIGN=function(r){return(r=utils.parseNumber(r))instanceof Error?r:r<0?-1:0===r?0:1},exports.SIN=function(r){return(r=utils.parseNumber(r))instanceof Error?r:Math.sin(r)},exports.SINH=function(r){return(r=utils.parseNumber(r))instanceof Error?r:(Math.exp(r)-Math.exp(-r))/2},exports.SQRT=function(r){return(r=utils.parseNumber(r))instanceof Error?r:r<0?error.num:Math.sqrt(r)},exports.SQRTPI=function(r){return(r=utils.parseNumber(r))instanceof Error?r:Math.sqrt(r*Math.PI)},exports.SUBTOTAL=function(r,e){if((r=utils.parseNumber(r))instanceof Error)return r;switch(r){case 1:return statistical.AVERAGE(e);case 2:return statistical.COUNT(e);case 3:return statistical.COUNTA(e);case 4:return statistical.MAX(e);case 5:return statistical.MIN(e);case 6:return exports.PRODUCT(e);case 7:return statistical.STDEV.S(e);case 8:return statistical.STDEV.P(e);case 9:return exports.SUM(e);case 10:return statistical.VAR.S(e);case 11:return statistical.VAR.P(e);case 101:return statistical.AVERAGE(e);case 102:return statistical.COUNT(e);case 103:return statistical.COUNTA(e);case 104:return statistical.MAX(e);case 105:return statistical.MIN(e);case 106:return exports.PRODUCT(e);case 107:return statistical.STDEV.S(e);case 108:return statistical.STDEV.P(e);case 109:return exports.SUM(e);case 110:return statistical.VAR.S(e);case 111:return statistical.VAR.P(e)}},exports.ADD=function(r,e){return 2!==arguments.length?error.na:(r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:r+e)},exports.MINUS=function(r,e){return 2!==arguments.length?error.na:(r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:r-e)},exports.DIVIDE=function(r,e){return 2!==arguments.length?error.na:(r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:0===e?error.div0:r/e)},exports.MULTIPLY=function(r,e){return 2!==arguments.length?error.na:(r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:r*e)},exports.GTE=function(r,e){return 2!==arguments.length?error.na:(r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.error:r>=e)},exports.LT=function(r,e){return 2!==arguments.length?error.na:(r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.error:r<e)},exports.LTE=function(r,e){return 2!==arguments.length?error.na:(r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.error:r<=e)},exports.EQ=function(r,e){return 2!==arguments.length?error.na:r===e},exports.NE=function(r,e){return 2!==arguments.length?error.na:r!==e},exports.POW=function(r,e){return 2!==arguments.length?error.na:(r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.error:exports.POWER(r,e))},exports.SUM=function(){for(var r=0,e=Object.keys(arguments),t=0;t<e.length;++t){var n=arguments[e[t]];if("number"==typeof n)r+=n;else if("string"==typeof n){var a=parseFloat(n);!isNaN(a)&&(r+=a)}else Array.isArray(n)&&(r+=exports.SUM.apply(null,n))}return r},exports.SUMIF=function(range,criteria){if((range=utils.parseNumberArray(utils.flatten(range)))instanceof Error)return range;for(var result=0,i=0;i<range.length;i++)result+=eval(range[i]+criteria)?range[i]:0;return result},exports.SUMIFS=function(){var args=utils.argsToArray(arguments),range=utils.parseNumberArray(utils.flatten(args.shift()));if(range instanceof Error)return range;for(var criteria=args,n_range_elements=range.length,n_criterias=criteria.length,result=0,i=0;i<n_range_elements;i++){for(var el=range[i],condition="",c=0;c<n_criterias;c++)condition+=el+criteria[c],c!==n_criterias-1&&(condition+="&&");eval(condition)&&(result+=el)}return result},exports.SUMPRODUCT=function(){if(!arguments||0===arguments.length)return error.value;for(var r,e,t,n,a=arguments.length+1,u=0,s=0;s<arguments[0].length;s++)if(arguments[0][s]instanceof Array)for(var i=0;i<arguments[0][s].length;i++){for(r=1,e=1;e<a;e++){if((n=utils.parseNumber(arguments[e-1][s][i]))instanceof Error)return n;r*=n}u+=r}else{for(r=1,e=1;e<a;e++){if((t=utils.parseNumber(arguments[e-1][s]))instanceof Error)return t;r*=t}u+=r}return u},exports.SUMSQ=function(){var r=utils.parseNumberArray(utils.flatten(arguments));if(r instanceof Error)return r;for(var e=0,t=r.length,n=0;n<t;n++)e+=information.ISNUMBER(r[n])?r[n]*r[n]:0;return e},exports.SUMX2MY2=function(r,e){if(r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumberArray(utils.flatten(e)),utils.anyIsError(r,e))return error.value;for(var t=0,n=0;n<r.length;n++)t+=r[n]*r[n]-e[n]*e[n];return t},exports.SUMX2PY2=function(r,e){if(r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumberArray(utils.flatten(e)),utils.anyIsError(r,e))return error.value;var t=0;r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumberArray(utils.flatten(e));for(var n=0;n<r.length;n++)t+=r[n]*r[n]+e[n]*e[n];return t},exports.SUMXMY2=function(r,e){if(r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumberArray(utils.flatten(e)),utils.anyIsError(r,e))return error.value;var t=0;r=utils.flatten(r),e=utils.flatten(e);for(var n=0;n<r.length;n++)t+=Math.pow(r[n]-e[n],2);return t},exports.TAN=function(r){return(r=utils.parseNumber(r))instanceof Error?r:Math.tan(r)},exports.TANH=function(r){if((r=utils.parseNumber(r))instanceof Error)return r;var e=Math.exp(2*r);return(e-1)/(e+1)},exports.TRUNC=function(r,e){return e=void 0===e?0:e,r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:(r>0?1:-1)*Math.floor(Math.abs(r)*Math.pow(10,e))/Math.pow(10,e)}},function(r,e){r.exports=__WEBPACK_EXTERNAL_MODULE_3__},function(r,e,t){function n(r){return r&&r.reduce?r.reduce(function(r,e){var t=Array.isArray(r),n=Array.isArray(e);return t&&n?r.concat(e):t?(r.push(e),r):n?[r].concat(e):[r,e]}):r}function a(r){if(!r)return!1;for(var e=0;e<r.length;++e)if(Array.isArray(r[e]))return!1;return!0}var u=t(5);e.flatten=function(){for(var r=e.argsToArray.apply(null,arguments);!a(r);)r=n(r);return r},e.argsToArray=function(r){return Array.prototype.slice.call(r,0)},e.numbers=function(){return this.flatten.apply(null,arguments).filter(function(r){return"number"==typeof r})},e.cleanFloat=function(r){return Math.round(1e14*r)/1e14},e.parseBool=function(r){if("boolean"==typeof r)return r;if(r instanceof Error)return r;if("number"==typeof r)return 0!==r;if("string"==typeof r){var e=r.toUpperCase();if("TRUE"===e)return!0;if("FALSE"===e)return!1}return r instanceof Date&&!isNaN(r)||u.value},e.parseNumber=function(r){return void 0===r||""===r?u.value:isNaN(r)?u.value:parseFloat(r)},e.parseNumberArray=function(r){var t;if(!r||0===(t=r.length))return u.value;for(var n;t--;){if((n=e.parseNumber(r[t]))===u.value)return n;r[t]=n}return r},e.parseMatrix=function(r){if(!r||0===r.length)return u.value;for(var t,n=0;n<r.length;n++)if(t=e.parseNumberArray(r[n]),r[n]=t,t instanceof Error)return t;return r};var s=new Date(1900,0,1);e.parseDate=function(r){if(!isNaN(r)){if(r instanceof Date)return new Date(r);var e=parseInt(r,10);return e<0?u.num:e<=60?new Date(s.getTime()+864e5*(e-1)):new Date(s.getTime()+864e5*(e-2))}return"string"!=typeof r||(r=new Date(r),isNaN(r))?u.value:r},e.parseDateArray=function(r){for(var e,t=r.length;t--;){if((e=this.parseDate(r[t]))===u.value)return e;r[t]=e}return r},e.anyIsError=function(){for(var r=arguments.length;r--;)if(arguments[r]instanceof Error)return!0;return!1},e.arrayValuesToNumbers=function(r){for(var e,t=r.length;t--;)if("number"!=typeof(e=r[t]))if(!0!==e)if(!1!==e){if("string"==typeof e){var n=this.parseNumber(e);n instanceof Error?r[t]=0:r[t]=n}}else r[t]=0;else r[t]=1;return r},e.rest=function(r,e){return e=e||1,r&&"function"==typeof r.slice?r.slice(e):r},e.initial=function(r,e){return e=e||1,r&&"function"==typeof r.slice?r.slice(0,r.length-e):r}},function(r,e){e.nil=new Error("#NULL!"),e.div0=new Error("#DIV/0!"),e.value=new Error("#VALUE?"),e.ref=new Error("#REF!"),e.name=new Error("#NAME?"),e.num=new Error("#NUM!"),e.na=new Error("#N/A"),e.error=new Error("#ERROR!"),e.data=new Error("#GETTING_DATA")},function(module,exports,__webpack_require__){var mathTrig=__webpack_require__(2),text=__webpack_require__(7),jStat=__webpack_require__(9).jStat,utils=__webpack_require__(4),error=__webpack_require__(5),misc=__webpack_require__(10),SQRT2PI=2.5066282746310002;exports.AVEDEV=function(){var r=utils.parseNumberArray(utils.flatten(arguments));return r instanceof Error?r:jStat.sum(jStat(r).subtract(jStat.mean(r)).abs()[0])/r.length},exports.AVERAGE=function(){for(var r=utils.numbers(utils.flatten(arguments)),e=r.length,t=0,n=0,a=0;a<e;a++)t+=r[a],n+=1;return t/n},exports.AVERAGEA=function(){for(var r=utils.flatten(arguments),e=r.length,t=0,n=0,a=0;a<e;a++){var u=r[a];"number"==typeof u&&(t+=u),!0===u&&t++,null!==u&&n++}return t/n},exports.AVERAGEIF=function(range,criteria,average_range){if(average_range=average_range||range,range=utils.flatten(range),(average_range=utils.parseNumberArray(utils.flatten(average_range)))instanceof Error)return average_range;for(var average_count=0,result=0,i=0;i<range.length;i++)eval(range[i]+criteria)&&(result+=average_range[i],average_count++);return result/average_count},exports.AVERAGEIFS=function(){for(var args=utils.argsToArray(arguments),criteria=(args.length-1)/2,range=utils.flatten(args[0]),count=0,result=0,i=0;i<range.length;i++){for(var condition="",j=0;j<criteria;j++)condition+=args[2*j+1][i]+args[2*j+2],j!==criteria-1&&(condition+="&&");eval(condition)&&(result+=range[i],count++)}var average=result/count;return isNaN(average)?0:average},exports.BETA={},exports.BETA.DIST=function(r,e,t,n,a,u){return arguments.length<4?error.value:(a=void 0===a?0:a,u=void 0===u?1:u,r=utils.parseNumber(r),e=utils.parseNumber(e),t=utils.parseNumber(t),a=utils.parseNumber(a),u=utils.parseNumber(u),utils.anyIsError(r,e,t,a,u)?error.value:(r=(r-a)/(u-a),n?jStat.beta.cdf(r,e,t):jStat.beta.pdf(r,e,t)))},exports.BETA.INV=function(r,e,t,n,a){return n=void 0===n?0:n,a=void 0===a?1:a,r=utils.parseNumber(r),e=utils.parseNumber(e),t=utils.parseNumber(t),n=utils.parseNumber(n),a=utils.parseNumber(a),utils.anyIsError(r,e,t,n,a)?error.value:jStat.beta.inv(r,e,t)*(a-n)+n},exports.BINOM={},exports.BINOM.DIST=function(r,e,t,n){return r=utils.parseNumber(r),e=utils.parseNumber(e),t=utils.parseNumber(t),n=utils.parseNumber(n),utils.anyIsError(r,e,t,n)?error.value:n?jStat.binomial.cdf(r,e,t):jStat.binomial.pdf(r,e,t)},exports.BINOM.DIST.RANGE=function(r,e,t,n){if(n=void 0===n?t:n,r=utils.parseNumber(r),e=utils.parseNumber(e),t=utils.parseNumber(t),n=utils.parseNumber(n),utils.anyIsError(r,e,t,n))return error.value;for(var a=0,u=t;u<=n;u++)a+=mathTrig.COMBIN(r,u)*Math.pow(e,u)*Math.pow(1-e,r-u);return a},exports.BINOM.INV=function(r,e,t){if(r=utils.parseNumber(r),e=utils.parseNumber(e),t=utils.parseNumber(t),utils.anyIsError(r,e,t))return error.value;for(var n=0;n<=r;){if(jStat.binomial.cdf(n,r,e)>=t)return n;n++}},exports.CHISQ={},exports.CHISQ.DIST=function(r,e,t){return r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:t?jStat.chisquare.cdf(r,e):jStat.chisquare.pdf(r,e)},exports.CHISQ.DIST.RT=function(r,e){return!r|!e?error.na:r<1||e>Math.pow(10,10)?error.num:"number"!=typeof r||"number"!=typeof e?error.value:1-jStat.chisquare.cdf(r,e)},exports.CHISQ.INV=function(r,e){return r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:jStat.chisquare.inv(r,e)},exports.CHISQ.INV.RT=function(r,e){return!r|!e?error.na:r<0||r>1||e<1||e>Math.pow(10,10)?error.num:"number"!=typeof r||"number"!=typeof e?error.value:jStat.chisquare.inv(1-r,e)},exports.CHISQ.TEST=function(r,e){if(2!==arguments.length)return error.na;if(!(r instanceof Array&&e instanceof Array))return error.value;if(r.length!==e.length)return error.value;if(r[0]&&e[0]&&r[0].length!==e[0].length)return error.value;var t,n,a,u=r.length;for(n=0;n<u;n++)r[n]instanceof Array||(t=r[n],r[n]=[],r[n].push(t)),e[n]instanceof Array||(t=e[n],e[n]=[],e[n].push(t));var s=r[0].length,i=1===s?u-1:(u-1)*(s-1),o=0,l=Math.PI;for(n=0;n<u;n++)for(a=0;a<s;a++)o+=Math.pow(r[n][a]-e[n][a],2)/e[n][a];return Math.round(1e6*function(r,e){var t=Math.exp(-.5*r);e%2==1&&(t*=Math.sqrt(2*r/l));for(var n=e;n>=2;)t=t*r/n,n-=2;for(var a=t,u=e;a>1e-10*t;)t+=a=a*r/(u+=2);return 1-t}(o,i))/1e6},exports.COLUMN=function(r,e){if(2!==arguments.length)return error.na;if(e<0)return error.num;if(!(r instanceof Array)||"number"!=typeof e)return error.value;if(0!==r.length)return jStat.col(r,e)},exports.COLUMNS=function(r){return 1!==arguments.length?error.na:r instanceof Array?0===r.length?0:jStat.cols(r):error.value},exports.CONFIDENCE={},exports.CONFIDENCE.NORM=function(r,e,t){return r=utils.parseNumber(r),e=utils.parseNumber(e),t=utils.parseNumber(t),utils.anyIsError(r,e,t)?error.value:jStat.normalci(1,r,e,t)[1]-1},exports.CONFIDENCE.T=function(r,e,t){return r=utils.parseNumber(r),e=utils.parseNumber(e),t=utils.parseNumber(t),utils.anyIsError(r,e,t)?error.value:jStat.tci(1,r,e,t)[1]-1},exports.CORREL=function(r,e){return r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumberArray(utils.flatten(e)),utils.anyIsError(r,e)?error.value:jStat.corrcoeff(r,e)},exports.COUNT=function(){return utils.numbers(utils.flatten(arguments)).length},exports.COUNTA=function(){var r=utils.flatten(arguments);return r.length-exports.COUNTBLANK(r)},exports.COUNTIN=function(r,e){for(var t=0,n=0;n<r.length;n++)r[n]===e&&t++;return t},exports.COUNTBLANK=function(){for(var r,e=utils.flatten(arguments),t=0,n=0;n<e.length;n++)null!==(r=e[n])&&""!==r||t++;return t},exports.COUNTIF=function(range,criteria){range=utils.flatten(range),/[<>=!]/.test(criteria)||(criteria='=="'+criteria+'"');for(var matches=0,i=0;i<range.length;i++)"string"!=typeof range[i]?eval(range[i]+criteria)&&matches++:eval('"'+range[i]+'"'+criteria)&&matches++;return matches},exports.COUNTIFS=function(){for(var args=utils.argsToArray(arguments),results=new Array(utils.flatten(args[0]).length),i=0;i<results.length;i++)results[i]=!0;for(i=0;i<args.length;i+=2){var range=utils.flatten(args[i]),criteria=args[i+1];/[<>=!]/.test(criteria)||(criteria='=="'+criteria+'"');for(var j=0;j<range.length;j++)"string"!=typeof range[j]?results[j]=results[j]&&eval(range[j]+criteria):results[j]=results[j]&&eval('"'+range[j]+'"'+criteria)}var result=0;for(i=0;i<results.length;i++)results[i]&&result++;return result},exports.COUNTUNIQUE=function(){return misc.UNIQUE.apply(null,utils.flatten(arguments)).length},exports.COVARIANCE={},exports.COVARIANCE.P=function(r,e){if(r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumberArray(utils.flatten(e)),utils.anyIsError(r,e))return error.value;for(var t=jStat.mean(r),n=jStat.mean(e),a=0,u=r.length,s=0;s<u;s++)a+=(r[s]-t)*(e[s]-n);return a/u},exports.COVARIANCE.S=function(r,e){return r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumberArray(utils.flatten(e)),utils.anyIsError(r,e)?error.value:jStat.covariance(r,e)},exports.DEVSQ=function(){var r=utils.parseNumberArray(utils.flatten(arguments));if(r instanceof Error)return r;for(var e=jStat.mean(r),t=0,n=0;n<r.length;n++)t+=Math.pow(r[n]-e,2);return t},exports.EXPON={},exports.EXPON.DIST=function(r,e,t){return r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:t?jStat.exponential.cdf(r,e):jStat.exponential.pdf(r,e)},exports.F={},exports.F.DIST=function(r,e,t,n){return r=utils.parseNumber(r),e=utils.parseNumber(e),t=utils.parseNumber(t),utils.anyIsError(r,e,t)?error.value:n?jStat.centralF.cdf(r,e,t):jStat.centralF.pdf(r,e,t)},exports.F.DIST.RT=function(r,e,t){return 3!==arguments.length?error.na:r<0||e<1||t<1?error.num:"number"!=typeof r||"number"!=typeof e||"number"!=typeof t?error.value:1-jStat.centralF.cdf(r,e,t)},exports.F.INV=function(r,e,t){return r=utils.parseNumber(r),e=utils.parseNumber(e),t=utils.parseNumber(t),utils.anyIsError(r,e,t)?error.value:r<=0||r>1?error.num:jStat.centralF.inv(r,e,t)},exports.F.INV.RT=function(r,e,t){return 3!==arguments.length?error.na:r<0||r>1||e<1||e>Math.pow(10,10)||t<1||t>Math.pow(10,10)?error.num:"number"!=typeof r||"number"!=typeof e||"number"!=typeof t?error.value:jStat.centralF.inv(1-r,e,t)},exports.F.TEST=function(r,e){if(!r||!e)return error.na;if(!(r instanceof Array&&e instanceof Array))return error.na;if(r.length<2||e.length<2)return error.div0;var t=function(r,e){for(var t=0,n=0;n<r.length;n++)t+=Math.pow(r[n]-e,2);return t},n=mathTrig.SUM(r)/r.length,a=mathTrig.SUM(e)/e.length;return t(r,n)/(r.length-1)/(t(e,a)/(e.length-1))},exports.FISHER=function(r){return(r=utils.parseNumber(r))instanceof Error?r:Math.log((1+r)/(1-r))/2},exports.FISHERINV=function(r){if((r=utils.parseNumber(r))instanceof Error)return r;var e=Math.exp(2*r);return(e-1)/(e+1)},exports.FORECAST=function(r,e,t){if(r=utils.parseNumber(r),e=utils.parseNumberArray(utils.flatten(e)),t=utils.parseNumberArray(utils.flatten(t)),utils.anyIsError(r,e,t))return error.value;for(var n=jStat.mean(t),a=jStat.mean(e),u=t.length,s=0,i=0,o=0;o<u;o++)s+=(t[o]-n)*(e[o]-a),i+=Math.pow(t[o]-n,2);var l=s/i;return a-l*n+l*r},exports.FREQUENCY=function(r,e){if(r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumberArray(utils.flatten(e)),utils.anyIsError(r,e))return error.value;for(var t=r.length,n=e.length,a=[],u=0;u<=n;u++){a[u]=0;for(var s=0;s<t;s++)0===u?r[s]<=e[0]&&(a[0]+=1):u<n?r[s]>e[u-1]&&r[s]<=e[u]&&(a[u]+=1):u===n&&r[s]>e[n-1]&&(a[n]+=1)}return a},exports.GAMMA=function(r){return(r=utils.parseNumber(r))instanceof Error?r:0===r?error.num:parseInt(r,10)===r&&r<0?error.num:jStat.gammafn(r)},exports.GAMMA.DIST=function(r,e,t,n){return 4!==arguments.length?error.na:r<0||e<=0||t<=0?error.value:"number"!=typeof r||"number"!=typeof e||"number"!=typeof t?error.value:n?jStat.gamma.cdf(r,e,t,!0):jStat.gamma.pdf(r,e,t,!1)},exports.GAMMA.INV=function(r,e,t){return 3!==arguments.length?error.na:r<0||r>1||e<=0||t<=0?error.num:"number"!=typeof r||"number"!=typeof e||"number"!=typeof t?error.value:jStat.gamma.inv(r,e,t)},exports.GAMMALN=function(r){return(r=utils.parseNumber(r))instanceof Error?r:jStat.gammaln(r)},exports.GAMMALN.PRECISE=function(r){return 1!==arguments.length?error.na:r<=0?error.num:"number"!=typeof r?error.value:jStat.gammaln(r)},exports.GAUSS=function(r){return(r=utils.parseNumber(r))instanceof Error?r:jStat.normal.cdf(r,0,1)-.5},exports.GEOMEAN=function(){var r=utils.parseNumberArray(utils.flatten(arguments));return r instanceof Error?r:jStat.geomean(r)},exports.GROWTH=function(r,e,t,n){if((r=utils.parseNumberArray(r))instanceof Error)return r;var a;if(void 0===e)for(e=[],a=1;a<=r.length;a++)e.push(a);if(void 0===t)for(t=[],a=1;a<=r.length;a++)t.push(a);if(e=utils.parseNumberArray(e),t=utils.parseNumberArray(t),utils.anyIsError(e,t))return error.value;void 0===n&&(n=!0);var u=r.length,s=0,i=0,o=0,l=0;for(a=0;a<u;a++){var f=e[a],p=Math.log(r[a]);s+=f,i+=p,o+=f*p,l+=f*f}s/=u,i/=u,o/=u,l/=u;var c,N;n?N=i-(c=(o-s*i)/(l-s*s))*s:(c=o/l,N=0);var E=[];for(a=0;a<t.length;a++)E.push(Math.exp(N+c*t[a]));return E},exports.HARMEAN=function(){var r=utils.parseNumberArray(utils.flatten(arguments));if(r instanceof Error)return r;for(var e=r.length,t=0,n=0;n<e;n++)t+=1/r[n];return e/t},exports.HYPGEOM={},exports.HYPGEOM.DIST=function(r,e,t,n,a){function u(r,e,t,n){return mathTrig.COMBIN(t,r)*mathTrig.COMBIN(n-t,e-r)/mathTrig.COMBIN(n,e)}return r=utils.parseNumber(r),e=utils.parseNumber(e),t=utils.parseNumber(t),n=utils.parseNumber(n),utils.anyIsError(r,e,t,n)?error.value:a?function(r,e,t,n){for(var a=0,s=0;s<=r;s++)a+=u(s,e,t,n);return a}(r,e,t,n):u(r,e,t,n)},exports.INTERCEPT=function(r,e){return r=utils.parseNumberArray(r),e=utils.parseNumberArray(e),utils.anyIsError(r,e)?error.value:r.length!==e.length?error.na:exports.FORECAST(0,r,e)},exports.KURT=function(){var r=utils.parseNumberArray(utils.flatten(arguments));if(r instanceof Error)return r;for(var e=jStat.mean(r),t=r.length,n=0,a=0;a<t;a++)n+=Math.pow(r[a]-e,4);return n/=Math.pow(jStat.stdev(r,!0),4),t*(t+1)/((t-1)*(t-2)*(t-3))*n-3*(t-1)*(t-1)/((t-2)*(t-3))},exports.LARGE=function(r,e){return r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumber(e),utils.anyIsError(r,e)?r:r.sort(function(r,e){return e-r})[e-1]},exports.LINEST=function(r,e){if(r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumberArray(utils.flatten(e)),utils.anyIsError(r,e))return error.value;for(var t=jStat.mean(r),n=jStat.mean(e),a=e.length,u=0,s=0,i=0;i<a;i++)u+=(e[i]-n)*(r[i]-t),s+=Math.pow(e[i]-n,2);var o=u/s;return[o,t-o*n]},exports.LOGEST=function(r,e){if(r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumberArray(utils.flatten(e)),utils.anyIsError(r,e))return error.value;for(var t=0;t<r.length;t++)r[t]=Math.log(r[t]);var n=exports.LINEST(r,e);return n[0]=Math.round(1e6*Math.exp(n[0]))/1e6,n[1]=Math.round(1e6*Math.exp(n[1]))/1e6,n},exports.LOGNORM={},exports.LOGNORM.DIST=function(r,e,t,n){return r=utils.parseNumber(r),e=utils.parseNumber(e),t=utils.parseNumber(t),utils.anyIsError(r,e,t)?error.value:n?jStat.lognormal.cdf(r,e,t):jStat.lognormal.pdf(r,e,t)},exports.LOGNORM.INV=function(r,e,t){return r=utils.parseNumber(r),e=utils.parseNumber(e),t=utils.parseNumber(t),utils.anyIsError(r,e,t)?error.value:jStat.lognormal.inv(r,e,t)},exports.MAX=function(){var r=utils.numbers(utils.flatten(arguments));return 0===r.length?0:Math.max.apply(Math,r)},exports.MAXA=function(){var r=utils.arrayValuesToNumbers(utils.flatten(arguments));return 0===r.length?0:Math.max.apply(Math,r)},exports.MEDIAN=function(){var r=utils.arrayValuesToNumbers(utils.flatten(arguments));return jStat.median(r)},exports.MIN=function(){var r=utils.numbers(utils.flatten(arguments));return 0===r.length?0:Math.min.apply(Math,r)},exports.MINA=function(){var r=utils.arrayValuesToNumbers(utils.flatten(arguments));return 0===r.length?0:Math.min.apply(Math,r)},exports.MODE={},exports.MODE.MULT=function(){var r=utils.parseNumberArray(utils.flatten(arguments));if(r instanceof Error)return r;for(var e,t=r.length,n={},a=[],u=0,s=0;s<t;s++)n[e=r[s]]=n[e]?n[e]+1:1,n[e]>u&&(u=n[e],a=[]),n[e]===u&&(a[a.length]=e);return a},exports.MODE.SNGL=function(){var r=utils.parseNumberArray(utils.flatten(arguments));return r instanceof Error?r:exports.MODE.MULT(r).sort(function(r,e){return r-e})[0]},exports.NEGBINOM={},exports.NEGBINOM.DIST=function(r,e,t,n){return r=utils.parseNumber(r),e=utils.parseNumber(e),t=utils.parseNumber(t),utils.anyIsError(r,e,t)?error.value:n?jStat.negbin.cdf(r,e,t):jStat.negbin.pdf(r,e,t)},exports.NORM={},exports.NORM.DIST=function(r,e,t,n){return r=utils.parseNumber(r),e=utils.parseNumber(e),t=utils.parseNumber(t),utils.anyIsError(r,e,t)?error.value:t<=0?error.num:n?jStat.normal.cdf(r,e,t):jStat.normal.pdf(r,e,t)},exports.NORM.INV=function(r,e,t){return r=utils.parseNumber(r),e=utils.parseNumber(e),t=utils.parseNumber(t),utils.anyIsError(r,e,t)?error.value:jStat.normal.inv(r,e,t)},exports.NORM.S={},exports.NORM.S.DIST=function(r,e){return(r=utils.parseNumber(r))instanceof Error?error.value:e?jStat.normal.cdf(r,0,1):jStat.normal.pdf(r,0,1)},exports.NORM.S.INV=function(r){return(r=utils.parseNumber(r))instanceof Error?error.value:jStat.normal.inv(r,0,1)},exports.PEARSON=function(r,e){if(e=utils.parseNumberArray(utils.flatten(e)),r=utils.parseNumberArray(utils.flatten(r)),utils.anyIsError(e,r))return error.value;for(var t=jStat.mean(r),n=jStat.mean(e),a=r.length,u=0,s=0,i=0,o=0;o<a;o++)u+=(r[o]-t)*(e[o]-n),s+=Math.pow(r[o]-t,2),i+=Math.pow(e[o]-n,2);return u/Math.sqrt(s*i)},exports.PERCENTILE={},exports.PERCENTILE.EXC=function(r,e){if(r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumber(e),utils.anyIsError(r,e))return error.value;var t=(r=r.sort(function(r,e){return r-e})).length;if(e<1/(t+1)||e>1-1/(t+1))return error.num;var n=e*(t+1)-1,a=Math.floor(n);return utils.cleanFloat(n===a?r[n]:r[a]+(n-a)*(r[a+1]-r[a]))},exports.PERCENTILE.INC=function(r,e){if(r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumber(e),utils.anyIsError(r,e))return error.value;var t=e*((r=r.sort(function(r,e){return r-e})).length-1),n=Math.floor(t);return utils.cleanFloat(t===n?r[t]:r[n]+(t-n)*(r[n+1]-r[n]))},exports.PERCENTRANK={},exports.PERCENTRANK.EXC=function(r,e,t){if(t=void 0===t?3:t,r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumber(e),t=utils.parseNumber(t),utils.anyIsError(r,e,t))return error.value;r=r.sort(function(r,e){return r-e});for(var n=misc.UNIQUE.apply(null,r),a=r.length,u=n.length,s=Math.pow(10,t),i=0,o=!1,l=0;!o&&l<u;)e===n[l]?(i=(r.indexOf(n[l])+1)/(a+1),o=!0):e>=n[l]&&(e<n[l+1]||l===u-1)&&(i=(r.indexOf(n[l])+1+(e-n[l])/(n[l+1]-n[l]))/(a+1),o=!0),l++;return Math.floor(i*s)/s},exports.PERCENTRANK.INC=function(r,e,t){if(t=void 0===t?3:t,r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumber(e),t=utils.parseNumber(t),utils.anyIsError(r,e,t))return error.value;r=r.sort(function(r,e){return r-e});for(var n=misc.UNIQUE.apply(null,r),a=r.length,u=n.length,s=Math.pow(10,t),i=0,o=!1,l=0;!o&&l<u;)e===n[l]?(i=r.indexOf(n[l])/(a-1),o=!0):e>=n[l]&&(e<n[l+1]||l===u-1)&&(i=(r.indexOf(n[l])+(e-n[l])/(n[l+1]-n[l]))/(a-1),o=!0),l++;return Math.floor(i*s)/s},exports.PERMUT=function(r,e){return r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:mathTrig.FACT(r)/mathTrig.FACT(r-e)},exports.PERMUTATIONA=function(r,e){return r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:Math.pow(r,e)},exports.PHI=function(r){return(r=utils.parseNumber(r))instanceof Error?error.value:Math.exp(-.5*r*r)/SQRT2PI},exports.POISSON={},exports.POISSON.DIST=function(r,e,t){return r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:t?jStat.poisson.cdf(r,e):jStat.poisson.pdf(r,e)},exports.PROB=function(r,e,t,n){if(void 0===t)return 0;if(n=void 0===n?t:n,r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumberArray(utils.flatten(e)),t=utils.parseNumber(t),n=utils.parseNumber(n),utils.anyIsError(r,e,t,n))return error.value;if(t===n)return r.indexOf(t)>=0?e[r.indexOf(t)]:0;for(var a=r.sort(function(r,e){return r-e}),u=a.length,s=0,i=0;i<u;i++)a[i]>=t&&a[i]<=n&&(s+=e[r.indexOf(a[i])]);return s},exports.QUARTILE={},exports.QUARTILE.EXC=function(r,e){if(r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumber(e),utils.anyIsError(r,e))return error.value;switch(e){case 1:return exports.PERCENTILE.EXC(r,.25);case 2:return exports.PERCENTILE.EXC(r,.5);case 3:return exports.PERCENTILE.EXC(r,.75);default:return error.num}},exports.QUARTILE.INC=function(r,e){if(r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumber(e),utils.anyIsError(r,e))return error.value;switch(e){case 1:return exports.PERCENTILE.INC(r,.25);case 2:return exports.PERCENTILE.INC(r,.5);case 3:return exports.PERCENTILE.INC(r,.75);default:return error.num}},exports.RANK={},exports.RANK.AVG=function(r,e,t){if(r=utils.parseNumber(r),e=utils.parseNumberArray(utils.flatten(e)),utils.anyIsError(r,e))return error.value;e=utils.flatten(e);for(var n=(t=t||!1)?function(r,e){return r-e}:function(r,e){return e-r},a=(e=e.sort(n)).length,u=0,s=0;s<a;s++)e[s]===r&&u++;return u>1?(2*e.indexOf(r)+u+1)/2:e.indexOf(r)+1},exports.RANK.EQ=function(r,e,t){if(r=utils.parseNumber(r),e=utils.parseNumberArray(utils.flatten(e)),utils.anyIsError(r,e))return error.value;var n=(t=t||!1)?function(r,e){return r-e}:function(r,e){return e-r};return(e=e.sort(n)).indexOf(r)+1},exports.ROW=function(r,e){if(2!==arguments.length)return error.na;if(e<0)return error.num;if(!(r instanceof Array)||"number"!=typeof e)return error.value;if(0!==r.length)return jStat.row(r,e)},exports.ROWS=function(r){return 1!==arguments.length?error.na:r instanceof Array?0===r.length?0:jStat.rows(r):error.value},exports.RSQ=function(r,e){return r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumberArray(utils.flatten(e)),utils.anyIsError(r,e)?error.value:Math.pow(exports.PEARSON(r,e),2)},exports.SKEW=function(){var r=utils.parseNumberArray(utils.flatten(arguments));if(r instanceof Error)return r;for(var e=jStat.mean(r),t=r.length,n=0,a=0;a<t;a++)n+=Math.pow(r[a]-e,3);return t*n/((t-1)*(t-2)*Math.pow(jStat.stdev(r,!0),3))},exports.SKEW.P=function(){var r=utils.parseNumberArray(utils.flatten(arguments));if(r instanceof Error)return r;for(var e=jStat.mean(r),t=r.length,n=0,a=0,u=0;u<t;u++)a+=Math.pow(r[u]-e,3),n+=Math.pow(r[u]-e,2);return a/=t,n/=t,a/Math.pow(n,1.5)},exports.SLOPE=function(r,e){if(r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumberArray(utils.flatten(e)),utils.anyIsError(r,e))return error.value;for(var t=jStat.mean(e),n=jStat.mean(r),a=e.length,u=0,s=0,i=0;i<a;i++)u+=(e[i]-t)*(r[i]-n),s+=Math.pow(e[i]-t,2);return u/s},exports.SMALL=function(r,e){return r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumber(e),utils.anyIsError(r,e)?r:r.sort(function(r,e){return r-e})[e-1]},exports.STANDARDIZE=function(r,e,t){return r=utils.parseNumber(r),e=utils.parseNumber(e),t=utils.parseNumber(t),utils.anyIsError(r,e,t)?error.value:(r-e)/t},exports.STDEV={},exports.STDEV.P=function(){var r=exports.VAR.P.apply(this,arguments);return Math.sqrt(r)},exports.STDEV.S=function(){var r=exports.VAR.S.apply(this,arguments);return Math.sqrt(r)},exports.STDEVA=function(){var r=exports.VARA.apply(this,arguments);return Math.sqrt(r)},exports.STDEVPA=function(){var r=exports.VARPA.apply(this,arguments);return Math.sqrt(r)},exports.STEYX=function(r,e){if(r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumberArray(utils.flatten(e)),utils.anyIsError(r,e))return error.value;for(var t=jStat.mean(e),n=jStat.mean(r),a=e.length,u=0,s=0,i=0,o=0;o<a;o++)u+=Math.pow(r[o]-n,2),s+=(e[o]-t)*(r[o]-n),i+=Math.pow(e[o]-t,2);return Math.sqrt((u-s*s/i)/(a-2))},exports.TRANSPOSE=function(r){return r?jStat.transpose(r):error.na},exports.T=text.T,exports.T.DIST=function(r,e,t){return r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:t?jStat.studentt.cdf(r,e):jStat.studentt.pdf(r,e)},exports.T.DIST["2T"]=function(r,e){return 2!==arguments.length?error.na:r<0||e<1?error.num:"number"!=typeof r||"number"!=typeof e?error.value:2*(1-jStat.studentt.cdf(r,e))},exports.T.DIST.RT=function(r,e){return 2!==arguments.length?error.na:r<0||e<1?error.num:"number"!=typeof r||"number"!=typeof e?error.value:1-jStat.studentt.cdf(r,e)},exports.T.INV=function(r,e){return r=utils.parseNumber(r),e=utils.parseNumber(e),utils.anyIsError(r,e)?error.value:jStat.studentt.inv(r,e)},exports.T.INV["2T"]=function(r,e){return r=utils.parseNumber(r),e=utils.parseNumber(e),r<=0||r>1||e<1?error.num:utils.anyIsError(r,e)?error.value:Math.abs(jStat.studentt.inv(r/2,e))},exports.T.TEST=function(r,e){if(r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumberArray(utils.flatten(e)),utils.anyIsError(r,e))return error.value;var t,n=jStat.mean(r),a=jStat.mean(e),u=0,s=0;for(t=0;t<r.length;t++)u+=Math.pow(r[t]-n,2);for(t=0;t<e.length;t++)s+=Math.pow(e[t]-a,2);u/=r.length-1,s/=e.length-1;var i=Math.abs(n-a)/Math.sqrt(u/r.length+s/e.length);return exports.T.DIST["2T"](i,r.length+e.length-2)},exports.TREND=function(r,e,t){if(r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumberArray(utils.flatten(e)),t=utils.parseNumberArray(utils.flatten(t)),utils.anyIsError(r,e,t))return error.value;var n=exports.LINEST(r,e),a=n[0],u=n[1],s=[];return t.forEach(function(r){s.push(a*r+u)}),s},exports.TRIMMEAN=function(r,e){if(r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumber(e),utils.anyIsError(r,e))return error.value;var t=mathTrig.FLOOR(r.length*e,2)/2;return jStat.mean(utils.initial(utils.rest(r.sort(function(r,e){return r-e}),t),t))},exports.VAR={},exports.VAR.P=function(){for(var r=utils.numbers(utils.flatten(arguments)),e=r.length,t=0,n=exports.AVERAGE(r),a=0;a<e;a++)t+=Math.pow(r[a]-n,2);return t/e},exports.VAR.S=function(){for(var r=utils.numbers(utils.flatten(arguments)),e=r.length,t=0,n=exports.AVERAGE(r),a=0;a<e;a++)t+=Math.pow(r[a]-n,2);return t/(e-1)},exports.VARA=function(){for(var r=utils.flatten(arguments),e=r.length,t=0,n=0,a=exports.AVERAGEA(r),u=0;u<e;u++){var s=r[u];t+="number"==typeof s?Math.pow(s-a,2):!0===s?Math.pow(1-a,2):Math.pow(0-a,2),null!==s&&n++}return t/(n-1)},exports.VARPA=function(){for(var r=utils.flatten(arguments),e=r.length,t=0,n=0,a=exports.AVERAGEA(r),u=0;u<e;u++){var s=r[u];t+="number"==typeof s?Math.pow(s-a,2):!0===s?Math.pow(1-a,2):Math.pow(0-a,2),null!==s&&n++}return t/n},exports.WEIBULL={},exports.WEIBULL.DIST=function(r,e,t,n){return r=utils.parseNumber(r),e=utils.parseNumber(e),t=utils.parseNumber(t),utils.anyIsError(r,e,t)?error.value:n?1-Math.exp(-Math.pow(r/t,e)):Math.pow(r,e-1)*Math.exp(-Math.pow(r/t,e))*e/Math.pow(t,e)},exports.Z={},exports.Z.TEST=function(r,e,t){if(r=utils.parseNumberArray(utils.flatten(r)),e=utils.parseNumber(e),utils.anyIsError(r,e))return error.value;t=t||exports.STDEV.S(r);var n=r.length;return 1-exports.NORM.S.DIST((exports.AVERAGE(r)-e)/(t/Math.sqrt(n)),!0)}},function(r,e,t){var n=t(4),a=t(5),u=t(8);e.ASC=function(){throw new Error("ASC is not implemented")},e.BAHTTEXT=function(){throw new Error("BAHTTEXT is not implemented")},e.CHAR=function(r){return(r=n.parseNumber(r))instanceof Error?r:String.fromCharCode(r)},e.CLEAN=function(r){return(r=r||"").replace(/[\0-\x1F]/g,"")},e.CODE=function(r){return(r=r||"").charCodeAt(0)},e.CONCATENATE=function(){for(var r=n.flatten(arguments),e=0;(e=r.indexOf(!0))>-1;)r[e]="TRUE";for(var t=0;(t=r.indexOf(!1))>-1;)r[t]="FALSE";return r.join("")},e.DBCS=function(){throw new Error("DBCS is not implemented")},e.DOLLAR=function(r,e){if(e=void 0===e?2:e,r=n.parseNumber(r),e=n.parseNumber(e),n.anyIsError(r,e))return a.value;var t="";return e<=0?(r=Math.round(r*Math.pow(10,e))/Math.pow(10,e),t="($0,0)"):e>0&&(t="($0,0."+new Array(e+1).join("0")+")"),u(r).format(t)},e.EXACT=function(r,e){return r===e},e.FIND=function(r,e,t){return t=void 0===t?0:t,e?e.indexOf(r,t-1)+1:null},e.FIXED=function(r,e,t){if(e=void 0===e?2:e,t=void 0!==t&&t,r=n.parseNumber(r),e=n.parseNumber(e),n.anyIsError(r,e))return a.value;var s=t?"0":"0,0";return e<=0?r=Math.round(r*Math.pow(10,e))/Math.pow(10,e):e>0&&(s+="."+new Array(e+1).join("0")),u(r).format(s)},e.HTML2TEXT=function(r){var e="";return r&&(r instanceof Array?r.forEach(function(r){""!==e&&(e+="\n"),e+=r.replace(/<(?:.|\n)*?>/gm,"")}):e=r.replace(/<(?:.|\n)*?>/gm,"")),e},e.LEFT=function(r,e){return e=void 0===e?1:e,(e=n.parseNumber(e))instanceof Error||"string"!=typeof r?a.value:r?r.substring(0,e):null},e.LEN=function(r){return 0===arguments.length?a.error:"string"==typeof r?r?r.length:0:r.length?r.length:a.value},e.LOWER=function(r){return"string"!=typeof r?a.value:r?r.toLowerCase():r},e.MID=function(r,e,t){if(e=n.parseNumber(e),t=n.parseNumber(t),n.anyIsError(e,t)||"string"!=typeof r)return t;var a=e-1,u=a+t;return r.substring(a,u)},e.NUMBERVALUE=function(r,e,t){return e=void 0===e?".":e,t=void 0===t?",":t,Number(r.replace(e,".").replace(t,""))},e.PRONETIC=function(){throw new Error("PRONETIC is not implemented")},e.PROPER=function(r){return void 0===r||0===r.length?a.value:(!0===r&&(r="TRUE"),!1===r&&(r="FALSE"),isNaN(r)&&"number"==typeof r?a.value:("number"==typeof r&&(r=""+r),r.replace(/\w\S*/g,function(r){return r.charAt(0).toUpperCase()+r.substr(1).toLowerCase()})))},e.REGEXEXTRACT=function(r,e){var t=r.match(new RegExp(e));return t?t[t.length>1?t.length-1:0]:null},e.REGEXMATCH=function(r,e,t){var n=r.match(new RegExp(e));return t?n:!!n},e.REGEXREPLACE=function(r,e,t){return r.replace(new RegExp(e),t)},e.REPLACE=function(r,e,t,u){return e=n.parseNumber(e),t=n.parseNumber(t),n.anyIsError(e,t)||"string"!=typeof r||"string"!=typeof u?a.value:r.substr(0,e-1)+u+r.substr(e-1+t)},e.REPT=function(r,e){return(e=n.parseNumber(e))instanceof Error?e:new Array(e+1).join(r)},e.RIGHT=function(r,e){return e=void 0===e?1:e,(e=n.parseNumber(e))instanceof Error?e:r?r.substring(r.length-e):null},e.SEARCH=function(r,e,t){var n;return"string"!=typeof r||"string"!=typeof e?a.value:(t=void 0===t?0:t,0===(n=e.toLowerCase().indexOf(r.toLowerCase(),t-1)+1)?a.value:n)},e.SPLIT=function(r,e){return r.split(e)},e.SUBSTITUTE=function(r,e,t,n){if(!(r&&e&&t))return r;if(void 0===n)return r.replace(new RegExp(e,"g"),t);for(var a=0,u=0;r.indexOf(e,a)>0;)if(a=r.indexOf(e,a+1),++u===n)return r.substring(0,a)+t+r.substring(a+e.length)},e.T=function(r){return"string"==typeof r?r:""},e.TEXT=function(r,e){return r=n.parseNumber(r),n.anyIsError(r)?a.na:u(r).format(e)},e.TRIM=function(r){return"string"!=typeof r?a.value:r.replace(/ +/g," ").trim()},e.UNICHAR=this.CHAR,e.UNICODE=this.CODE,e.UPPER=function(r){return"string"!=typeof r?a.value:r.toUpperCase()},e.VALUE=function(r){return"string"!=typeof r?a.value:u().unformat(r)}},function(r,e){r.exports=__WEBPACK_EXTERNAL_MODULE_8__},function(r,e){r.exports=__WEBPACK_EXTERNAL_MODULE_9__},function(r,e,t){var n=t(4),a=t(8);e.UNIQUE=function(){for(var r=[],e=0;e<arguments.length;++e){for(var t=!1,n=arguments[e],a=0;a<r.length&&!(t=r[a]===n);++a);t||r.push(n)}return r},e.FLATTEN=n.flatten,e.ARGS2ARRAY=function(){return Array.prototype.slice.call(arguments,0)},e.REFERENCE=function(r,e){try{for(var t=e.split("."),n=r,a=0;a<t.length;++a){var u=t[a];if("]"===u[u.length-1]){var s=u.indexOf("["),i=u.substring(s+1,u.length-1);n=n[u.substring(0,s)][i]}else n=n[u]}return n}catch(r){}},e.JOIN=function(r,e){return r.join(e)},e.NUMBERS=function(){return n.flatten(arguments).filter(function(r){return"number"==typeof r})},e.NUMERAL=function(r,e){return a(r).format(e)}},function(r,e,t){var n=t(5);e.CELL=function(){throw new Error("CELL is not implemented")},e.ERROR={},e.ERROR.TYPE=function(r){switch(r){case n.nil:return 1;case n.div0:return 2;case n.value:return 3;case n.ref:return 4;case n.name:return 5;case n.num:return 6;case n.na:return 7;case n.data:return 8}return n.na},e.INFO=function(){throw new Error("INFO is not implemented")},e.ISBLANK=function(r){return null===r},e.ISBINARY=function(r){return/^[01]{1,10}$/.test(r)},e.ISERR=function(r){return[n.value,n.ref,n.div0,n.num,n.name,n.nil].indexOf(r)>=0||"number"==typeof r&&(isNaN(r)||!isFinite(r))},e.ISERROR=function(r){return e.ISERR(r)||r===n.na},e.ISEVEN=function(r){return!(1&Math.floor(Math.abs(r)))},e.ISFORMULA=function(){throw new Error("ISFORMULA is not implemented")},e.ISLOGICAL=function(r){return!0===r||!1===r},e.ISNA=function(r){return r===n.na},e.ISNONTEXT=function(r){return"string"!=typeof r},e.ISNUMBER=function(r){return"number"==typeof r&&!isNaN(r)&&isFinite(r)},e.ISODD=function(r){return!!(1&Math.floor(Math.abs(r)))},e.ISREF=function(){throw new Error("ISREF is not implemented")},e.ISTEXT=function(r){return"string"==typeof r},e.N=function(r){return this.ISNUMBER(r)?r:r instanceof Date?r.getTime():!0===r?1:!1===r?0:this.ISERROR(r)?r:0},e.NA=function(){return n.na},e.SHEET=function(){throw new Error("SHEET is not implemented")},e.SHEETS=function(){throw new Error("SHEETS is not implemented")},e.TYPE=function(r){return this.ISNUMBER(r)?1:this.ISTEXT(r)?2:this.ISLOGICAL(r)?4:this.ISERROR(r)?16:Array.isArray(r)?64:void 0}},function(r,e,t){function n(r){return/^[01]{1,10}$/.test(r)}var a=t(5),u=t(9).jStat,s=t(7),i=t(4),o=t(13);e.BESSELI=function(r,e){return r=i.parseNumber(r),e=i.parseNumber(e),i.anyIsError(r,e)?a.value:o.besseli(r,e)},e.BESSELJ=function(r,e){return r=i.parseNumber(r),e=i.parseNumber(e),i.anyIsError(r,e)?a.value:o.besselj(r,e)},e.BESSELK=function(r,e){return r=i.parseNumber(r),e=i.parseNumber(e),i.anyIsError(r,e)?a.value:o.besselk(r,e)},e.BESSELY=function(r,e){return r=i.parseNumber(r),e=i.parseNumber(e),i.anyIsError(r,e)?a.value:o.bessely(r,e)},e.BIN2DEC=function(r){if(!n(r))return a.num;var e=parseInt(r,2),t=r.toString();return 10===t.length&&"1"===t.substring(0,1)?parseInt(t.substring(1),2)-512:e},e.BIN2HEX=function(r,e){if(!n(r))return a.num;var t=r.toString();if(10===t.length&&"1"===t.substring(0,1))return(0xfffffffe00+parseInt(t.substring(1),2)).toString(16);var u=parseInt(r,2).toString(16);return void 0===e?u:isNaN(e)?a.value:e<0?a.num:(e=Math.floor(e))>=u.length?s.REPT("0",e-u.length)+u:a.num},e.BIN2OCT=function(r,e){if(!n(r))return a.num;var t=r.toString();if(10===t.length&&"1"===t.substring(0,1))return(1073741312+parseInt(t.substring(1),2)).toString(8);var u=parseInt(r,2).toString(8);return void 0===e?u:isNaN(e)?a.value:e<0?a.num:(e=Math.floor(e))>=u.length?s.REPT("0",e-u.length)+u:a.num},e.BITAND=function(r,e){return r=i.parseNumber(r),e=i.parseNumber(e),i.anyIsError(r,e)?a.value:r<0||e<0?a.num:Math.floor(r)!==r||Math.floor(e)!==e?a.num:r>0xffffffffffff||e>0xffffffffffff?a.num:r&e},e.BITLSHIFT=function(r,e){return r=i.parseNumber(r),e=i.parseNumber(e),i.anyIsError(r,e)?a.value:r<0?a.num:Math.floor(r)!==r?a.num:r>0xffffffffffff?a.num:Math.abs(e)>53?a.num:e>=0?r<<e:r>>-e},e.BITOR=function(r,e){return r=i.parseNumber(r),e=i.parseNumber(e),i.anyIsError(r,e)?a.value:r<0||e<0?a.num:Math.floor(r)!==r||Math.floor(e)!==e?a.num:r>0xffffffffffff||e>0xffffffffffff?a.num:r|e},e.BITRSHIFT=function(r,e){return r=i.parseNumber(r),e=i.parseNumber(e),i.anyIsError(r,e)?a.value:r<0?a.num:Math.floor(r)!==r?a.num:r>0xffffffffffff?a.num:Math.abs(e)>53?a.num:e>=0?r>>e:r<<-e},e.BITXOR=function(r,e){return r=i.parseNumber(r),e=i.parseNumber(e),i.anyIsError(r,e)?a.value:r<0||e<0?a.num:Math.floor(r)!==r||Math.floor(e)!==e?a.num:r>0xffffffffffff||e>0xffffffffffff?a.num:r^e},e.COMPLEX=function(r,e,t){if(r=i.parseNumber(r),e=i.parseNumber(e),i.anyIsError(r,e))return r;if("i"!==(t=void 0===t?"i":t)&&"j"!==t)return a.value;if(0===r&&0===e)return 0;if(0===r)return 1===e?t:e.toString()+t;if(0===e)return r.toString();var n=e>0?"+":"";return r.toString()+n+(1===e?t:e.toString()+t)},e.CONVERT=function(r,e,t){if((r=i.parseNumber(r))instanceof Error)return r;for(var n,u=[["a.u. of action","?",null,"action",!1,!1,1.05457168181818e-34],["a.u. of charge","e",null,"electric_charge",!1,!1,1.60217653141414e-19],["a.u. of energy","Eh",null,"energy",!1,!1,4.35974417757576e-18],["a.u. of length","a?",null,"length",!1,!1,5.29177210818182e-11],["a.u. of mass","m?",null,"mass",!1,!1,9.10938261616162e-31],["a.u. of time","?/Eh",null,"time",!1,!1,2.41888432650516e-17],["admiralty knot","admkn",null,"speed",!1,!0,.514773333],["ampere","A",null,"electric_current",!0,!1,1],["ampere per meter","A/m",null,"magnetic_field_intensity",!0,!1,1],["ångström","Å",["ang"],"length",!1,!0,1e-10],["are","ar",null,"area",!1,!0,100],["astronomical unit","ua",null,"length",!1,!1,1.49597870691667e-11],["bar","bar",null,"pressure",!1,!1,1e5],["barn","b",null,"area",!1,!1,1e-28],["becquerel","Bq",null,"radioactivity",!0,!1,1],["bit","bit",["b"],"information",!1,!0,1],["btu","BTU",["btu"],"energy",!1,!0,1055.05585262],["byte","byte",null,"information",!1,!0,8],["candela","cd",null,"luminous_intensity",!0,!1,1],["candela per square metre","cd/m?",null,"luminance",!0,!1,1],["coulomb","C",null,"electric_charge",!0,!1,1],["cubic ångström","ang3",["ang^3"],"volume",!1,!0,1e-30],["cubic foot","ft3",["ft^3"],"volume",!1,!0,.028316846592],["cubic inch","in3",["in^3"],"volume",!1,!0,16387064e-12],["cubic light-year","ly3",["ly^3"],"volume",!1,!0,8.46786664623715e-47],["cubic metre","m?",null,"volume",!0,!0,1],["cubic mile","mi3",["mi^3"],"volume",!1,!0,4168181825.44058],["cubic nautical mile","Nmi3",["Nmi^3"],"volume",!1,!0,6352182208],["cubic Pica","Pica3",["Picapt3","Pica^3","Picapt^3"],"volume",!1,!0,7.58660370370369e-8],["cubic yard","yd3",["yd^3"],"volume",!1,!0,.764554857984],["cup","cup",null,"volume",!1,!0,.0002365882365],["dalton","Da",["u"],"mass",!1,!1,1.66053886282828e-27],["day","d",["day"],"time",!1,!0,86400],["degree","°",null,"angle",!1,!1,.0174532925199433],["degrees Rankine","Rank",null,"temperature",!1,!0,.555555555555556],["dyne","dyn",["dy"],"force",!1,!0,1e-5],["electronvolt","eV",["ev"],"energy",!1,!0,1.60217656514141],["ell","ell",null,"length",!1,!0,1.143],["erg","erg",["e"],"energy",!1,!0,1e-7],["farad","F",null,"electric_capacitance",!0,!1,1],["fluid ounce","oz",null,"volume",!1,!0,295735295625e-16],["foot","ft",null,"length",!1,!0,.3048],["foot-pound","flb",null,"energy",!1,!0,1.3558179483314],["gal","Gal",null,"acceleration",!1,!1,.01],["gallon","gal",null,"volume",!1,!0,.003785411784],["gauss","G",["ga"],"magnetic_flux_density",!1,!0,1],["grain","grain",null,"mass",!1,!0,647989e-10],["gram","g",null,"mass",!1,!0,.001],["gray","Gy",null,"absorbed_dose",!0,!1,1],["gross registered ton","GRT",["regton"],"volume",!1,!0,2.8316846592],["hectare","ha",null,"area",!1,!0,1e4],["henry","H",null,"inductance",!0,!1,1],["hertz","Hz",null,"frequency",!0,!1,1],["horsepower","HP",["h"],"power",!1,!0,745.69987158227],["horsepower-hour","HPh",["hh","hph"],"energy",!1,!0,2684519.538],["hour","h",["hr"],"time",!1,!0,3600],["imperial gallon (U.K.)","uk_gal",null,"volume",!1,!0,.00454609],["imperial hundredweight","lcwt",["uk_cwt","hweight"],"mass",!1,!0,50.802345],["imperial quart (U.K)","uk_qt",null,"volume",!1,!0,.0011365225],["imperial ton","brton",["uk_ton","LTON"],"mass",!1,!0,1016.046909],["inch","in",null,"length",!1,!0,.0254],["international acre","uk_acre",null,"area",!1,!0,4046.8564224],["IT calorie","cal",null,"energy",!1,!0,4.1868],["joule","J",null,"energy",!0,!0,1],["katal","kat",null,"catalytic_activity",!0,!1,1],["kelvin","K",["kel"],"temperature",!0,!0,1],["kilogram","kg",null,"mass",!0,!0,1],["knot","kn",null,"speed",!1,!0,.514444444444444],["light-year","ly",null,"length",!1,!0,9460730472580800],["litre","L",["l","lt"],"volume",!1,!0,.001],["lumen","lm",null,"luminous_flux",!0,!1,1],["lux","lx",null,"illuminance",!0,!1,1],["maxwell","Mx",null,"magnetic_flux",!1,!1,1e-18],["measurement ton","MTON",null,"volume",!1,!0,1.13267386368],["meter per hour","m/h",["m/hr"],"speed",!1,!0,.00027777777777778],["meter per second","m/s",["m/sec"],"speed",!0,!0,1],["meter per second squared","m?s??",null,"acceleration",!0,!1,1],["parsec","pc",["parsec"],"length",!1,!0,0x6da012f958ee1c],["meter squared per second","m?/s",null,"kinematic_viscosity",!0,!1,1],["metre","m",null,"length",!0,!0,1],["miles per hour","mph",null,"speed",!1,!0,.44704],["millimetre of mercury","mmHg",null,"pressure",!1,!1,133.322],["minute","?",null,"angle",!1,!1,.000290888208665722],["minute","min",["mn"],"time",!1,!0,60],["modern teaspoon","tspm",null,"volume",!1,!0,5e-6],["mole","mol",null,"amount_of_substance",!0,!1,1],["morgen","Morgen",null,"area",!1,!0,2500],["n.u. of action","?",null,"action",!1,!1,1.05457168181818e-34],["n.u. of mass","m?",null,"mass",!1,!1,9.10938261616162e-31],["n.u. of speed","c?",null,"speed",!1,!1,299792458],["n.u. of time","?/(me?c??)",null,"time",!1,!1,1.28808866778687e-21],["nautical mile","M",["Nmi"],"length",!1,!0,1852],["newton","N",null,"force",!0,!0,1],["œrsted","Oe ",null,"magnetic_field_intensity",!1,!1,79.5774715459477],["ohm","Ω",null,"electric_resistance",!0,!1,1],["ounce mass","ozm",null,"mass",!1,!0,.028349523125],["pascal","Pa",null,"pressure",!0,!1,1],["pascal second","Pa?s",null,"dynamic_viscosity",!0,!1,1],["pferdestärke","PS",null,"power",!1,!0,735.49875],["phot","ph",null,"illuminance",!1,!1,1e-4],["pica (1/6 inch)","pica",null,"length",!1,!0,.00035277777777778],["pica (1/72 inch)","Pica",["Picapt"],"length",!1,!0,.00423333333333333],["poise","P",null,"dynamic_viscosity",!1,!1,.1],["pond","pond",null,"force",!1,!0,.00980665],["pound force","lbf",null,"force",!1,!0,4.4482216152605],["pound mass","lbm",null,"mass",!1,!0,.45359237],["quart","qt",null,"volume",!1,!0,.000946352946],["radian","rad",null,"angle",!0,!1,1],["second","?",null,"angle",!1,!1,484813681109536e-20],["second","s",["sec"],"time",!0,!0,1],["short hundredweight","cwt",["shweight"],"mass",!1,!0,45.359237],["siemens","S",null,"electrical_conductance",!0,!1,1],["sievert","Sv",null,"equivalent_dose",!0,!1,1],["slug","sg",null,"mass",!1,!0,14.59390294],["square ångström","ang2",["ang^2"],"area",!1,!0,1e-20],["square foot","ft2",["ft^2"],"area",!1,!0,.09290304],["square inch","in2",["in^2"],"area",!1,!0,64516e-8],["square light-year","ly2",["ly^2"],"area",!1,!0,8.95054210748189e31],["square meter","m?",null,"area",!0,!0,1],["square mile","mi2",["mi^2"],"area",!1,!0,2589988.110336],["square nautical mile","Nmi2",["Nmi^2"],"area",!1,!0,3429904],["square Pica","Pica2",["Picapt2","Pica^2","Picapt^2"],"area",!1,!0,1792111111111e-17],["square yard","yd2",["yd^2"],"area",!1,!0,.83612736],["statute mile","mi",null,"length",!1,!0,1609.344],["steradian","sr",null,"solid_angle",!0,!1,1],["stilb","sb",null,"luminance",!1,!1,1e-4],["stokes","St",null,"kinematic_viscosity",!1,!1,1e-4],["stone","stone",null,"mass",!1,!0,6.35029318],["tablespoon","tbs",null,"volume",!1,!0,147868e-10],["teaspoon","tsp",null,"volume",!1,!0,492892e-11],["tesla","T",null,"magnetic_flux_density",!0,!0,1],["thermodynamic calorie","c",null,"energy",!1,!0,4.184],["ton","ton",null,"mass",!1,!0,907.18474],["tonne","t",null,"mass",!1,!1,1e3],["U.K. pint","uk_pt",null,"volume",!1,!0,.00056826125],["U.S. bushel","bushel",null,"volume",!1,!0,.03523907],["U.S. oil barrel","barrel",null,"volume",!1,!0,.158987295],["U.S. pint","pt",["us_pt"],"volume",!1,!0,.000473176473],["U.S. survey mile","survey_mi",null,"length",!1,!0,1609.347219],["U.S. survey/statute acre","us_acre",null,"area",!1,!0,4046.87261],["volt","V",null,"voltage",!0,!1,1],["watt","W",null,"power",!0,!0,1],["watt-hour","Wh",["wh"],"energy",!1,!0,3600],["weber","Wb",null,"magnetic_flux",!0,!1,1],["yard","yd",null,"length",!1,!0,.9144],["year","yr",null,"time",!1,!0,31557600]],s={Yi:["yobi",80,1.2089258196146292e24,"Yi","yotta"],Zi:["zebi",70,0x400000000000000000,"Zi","zetta"],Ei:["exbi",60,0x1000000000000000,"Ei","exa"],Pi:["pebi",50,0x4000000000000,"Pi","peta"],Ti:["tebi",40,1099511627776,"Ti","tera"],Gi:["gibi",30,1073741824,"Gi","giga"],Mi:["mebi",20,1048576,"Mi","mega"],ki:["kibi",10,1024,"ki","kilo"]},o={Y:["yotta",1e24,"Y"],Z:["zetta",1e21,"Z"],E:["exa",1e18,"E"],P:["peta",1e15,"P"],T:["tera",1e12,"T"],G:["giga",1e9,"G"],M:["mega",1e6,"M"],k:["kilo",1e3,"k"],h:["hecto",100,"h"],e:["dekao",10,"e"],d:["deci",.1,"d"],c:["centi",.01,"c"],m:["milli",.001,"m"],u:["micro",1e-6,"u"],n:["nano",1e-9,"n"],p:["pico",1e-12,"p"],f:["femto",1e-15,"f"],a:["atto",1e-18,"a"],z:["zepto",1e-21,"z"],y:["yocto",1e-24,"y"]},l=null,f=null,p=e,c=t,N=1,E=1,m=0;m<u.length;m++)n=null===u[m][2]?[]:u[m][2],(u[m][1]===p||n.indexOf(p)>=0)&&(l=u[m]),(u[m][1]===c||n.indexOf(c)>=0)&&(f=u[m]);if(null===l){var I=s[e.substring(0,2)],h=o[e.substring(0,1)];"da"===e.substring(0,2)&&(h=["dekao",10,"da"]),I?(N=I[2],p=e.substring(2)):h&&(N=h[1],p=e.substring(h[2].length));for(var v=0;v<u.length;v++)n=null===u[v][2]?[]:u[v][2],(u[v][1]===p||n.indexOf(p)>=0)&&(l=u[v])}if(null===f){var g=s[t.substring(0,2)],M=o[t.substring(0,1)];"da"===t.substring(0,2)&&(M=["dekao",10,"da"]),g?(E=g[2],c=t.substring(2)):M&&(E=M[1],c=t.substring(M[2].length));for(var b=0;b<u.length;b++)n=null===u[b][2]?[]:u[b][2],(u[b][1]===c||n.indexOf(c)>=0)&&(f=u[b])}return null===l||null===f?a.na:l[3]!==f[3]?a.na:r*l[6]*N/(f[6]*E)},e.DEC2BIN=function(r,e){if((r=i.parseNumber(r))instanceof Error)return r;if(!/^-?[0-9]{1,3}$/.test(r)||r<-512||r>511)return a.num;if(r<0)return"1"+s.REPT("0",9-(512+r).toString(2).length)+(512+r).toString(2);var t=parseInt(r,10).toString(2);return void 0===e?t:isNaN(e)?a.value:e<0?a.num:(e=Math.floor(e))>=t.length?s.REPT("0",e-t.length)+t:a.num},e.DEC2HEX=function(r,e){if((r=i.parseNumber(r))instanceof Error)return r;if(!/^-?[0-9]{1,12}$/.test(r)||r<-549755813888||r>549755813887)return a.num;if(r<0)return(1099511627776+r).toString(16);var t=parseInt(r,10).toString(16);return void 0===e?t:isNaN(e)?a.value:e<0?a.num:(e=Math.floor(e))>=t.length?s.REPT("0",e-t.length)+t:a.num},e.DEC2OCT=function(r,e){if((r=i.parseNumber(r))instanceof Error)return r;if(!/^-?[0-9]{1,9}$/.test(r)||r<-536870912||r>536870911)return a.num;if(r<0)return(1073741824+r).toString(8);var t=parseInt(r,10).toString(8);return void 0===e?t:isNaN(e)?a.value:e<0?a.num:(e=Math.floor(e))>=t.length?s.REPT("0",e-t.length)+t:a.num},e.DELTA=function(r,e){return e=void 0===e?0:e,r=i.parseNumber(r),e=i.parseNumber(e),i.anyIsError(r,e)?a.value:r===e?1:0},e.ERF=function(r,e){return e=void 0===e?0:e,r=i.parseNumber(r),e=i.parseNumber(e),i.anyIsError(r,e)?a.value:u.erf(r)},e.ERF.PRECISE=function(){throw new Error("ERF.PRECISE is not implemented")},e.ERFC=function(r){return isNaN(r)?a.value:u.erfc(r)},e.ERFC.PRECISE=function(){throw new Error("ERFC.PRECISE is not implemented")},e.GESTEP=function(r,e){return e=e||0,r=i.parseNumber(r),i.anyIsError(e,r)?r:r>=e?1:0},e.HEX2BIN=function(r,e){if(!/^[0-9A-Fa-f]{1,10}$/.test(r))return a.num;var t=10===r.length&&"f"===r.substring(0,1).toLowerCase(),n=t?parseInt(r,16)-1099511627776:parseInt(r,16);if(n<-512||n>511)return a.num;if(t)return"1"+s.REPT("0",9-(512+n).toString(2).length)+(512+n).toString(2);var u=n.toString(2);return void 0===e?u:isNaN(e)?a.value:e<0?a.num:(e=Math.floor(e))>=u.length?s.REPT("0",e-u.length)+u:a.num},e.HEX2DEC=function(r){if(!/^[0-9A-Fa-f]{1,10}$/.test(r))return a.num;var e=parseInt(r,16);return e>=549755813888?e-1099511627776:e},e.HEX2OCT=function(r,e){if(!/^[0-9A-Fa-f]{1,10}$/.test(r))return a.num;var t=parseInt(r,16);if(t>536870911&&t<0xffe0000000)return a.num;if(t>=0xffe0000000)return(t-0xffc0000000).toString(8);var n=t.toString(8);return void 0===e?n:isNaN(e)?a.value:e<0?a.num:(e=Math.floor(e))>=n.length?s.REPT("0",e-n.length)+n:a.num},e.IMABS=function(r){var t=e.IMREAL(r),n=e.IMAGINARY(r);return i.anyIsError(t,n)?a.value:Math.sqrt(Math.pow(t,2)+Math.pow(n,2))},e.IMAGINARY=function(r){if(void 0===r||!0===r||!1===r)return a.value;if(0===r||"0"===r)return 0;if(["i","j"].indexOf(r)>=0)return 1;var e=(r=r.replace("+i","+1i").replace("-i","-1i").replace("+j","+1j").replace("-j","-1j")).indexOf("+"),t=r.indexOf("-");0===e&&(e=r.indexOf("+",1)),0===t&&(t=r.indexOf("-",1));var n=r.substring(r.length-1,r.length),u="i"===n||"j"===n;return e>=0||t>=0?u?e>=0?isNaN(r.substring(0,e))||isNaN(r.substring(e+1,r.length-1))?a.num:Number(r.substring(e+1,r.length-1)):isNaN(r.substring(0,t))||isNaN(r.substring(t+1,r.length-1))?a.num:-Number(r.substring(t+1,r.length-1)):a.num:u?isNaN(r.substring(0,r.length-1))?a.num:r.substring(0,r.length-1):isNaN(r)?a.num:0},e.IMARGUMENT=function(r){var t=e.IMREAL(r),n=e.IMAGINARY(r);return i.anyIsError(t,n)?a.value:0===t&&0===n?a.div0:0===t&&n>0?Math.PI/2:0===t&&n<0?-Math.PI/2:0===n&&t>0?0:0===n&&t<0?-Math.PI:t>0?Math.atan(n/t):t<0&&n>=0?Math.atan(n/t)+Math.PI:Math.atan(n/t)-Math.PI},e.IMCONJUGATE=function(r){var t=e.IMREAL(r),n=e.IMAGINARY(r);if(i.anyIsError(t,n))return a.value;var u=r.substring(r.length-1);return u="i"===u||"j"===u?u:"i",0!==n?e.COMPLEX(t,-n,u):r},e.IMCOS=function(r){var t=e.IMREAL(r),n=e.IMAGINARY(r);if(i.anyIsError(t,n))return a.value;var u=r.substring(r.length-1);return u="i"===u||"j"===u?u:"i",e.COMPLEX(Math.cos(t)*(Math.exp(n)+Math.exp(-n))/2,-Math.sin(t)*(Math.exp(n)-Math.exp(-n))/2,u)},e.IMCOSH=function(r){var t=e.IMREAL(r),n=e.IMAGINARY(r);if(i.anyIsError(t,n))return a.value;var u=r.substring(r.length-1);return u="i"===u||"j"===u?u:"i",e.COMPLEX(Math.cos(n)*(Math.exp(t)+Math.exp(-t))/2,Math.sin(n)*(Math.exp(t)-Math.exp(-t))/2,u)},e.IMCOT=function(r){var t=e.IMREAL(r),n=e.IMAGINARY(r);return i.anyIsError(t,n)?a.value:e.IMDIV(e.IMCOS(r),e.IMSIN(r))},e.IMDIV=function(r,t){var n=e.IMREAL(r),u=e.IMAGINARY(r),s=e.IMREAL(t),o=e.IMAGINARY(t);if(i.anyIsError(n,u,s,o))return a.value;var l=r.substring(r.length-1),f=t.substring(t.length-1),p="i";if("j"===l?p="j":"j"===f&&(p="j"),0===s&&0===o)return a.num;var c=s*s+o*o;return e.COMPLEX((n*s+u*o)/c,(u*s-n*o)/c,p)},e.IMEXP=function(r){var t=e.IMREAL(r),n=e.IMAGINARY(r);if(i.anyIsError(t,n))return a.value;var u=r.substring(r.length-1);u="i"===u||"j"===u?u:"i";var s=Math.exp(t);return e.COMPLEX(s*Math.cos(n),s*Math.sin(n),u)},e.IMLN=function(r){var t=e.IMREAL(r),n=e.IMAGINARY(r);if(i.anyIsError(t,n))return a.value;var u=r.substring(r.length-1);return u="i"===u||"j"===u?u:"i",e.COMPLEX(Math.log(Math.sqrt(t*t+n*n)),Math.atan(n/t),u)},e.IMLOG10=function(r){var t=e.IMREAL(r),n=e.IMAGINARY(r);if(i.anyIsError(t,n))return a.value;var u=r.substring(r.length-1);return u="i"===u||"j"===u?u:"i",e.COMPLEX(Math.log(Math.sqrt(t*t+n*n))/Math.log(10),Math.atan(n/t)/Math.log(10),u)},e.IMLOG2=function(r){var t=e.IMREAL(r),n=e.IMAGINARY(r);if(i.anyIsError(t,n))return a.value;var u=r.substring(r.length-1);return u="i"===u||"j"===u?u:"i",e.COMPLEX(Math.log(Math.sqrt(t*t+n*n))/Math.log(2),Math.atan(n/t)/Math.log(2),u)},e.IMPOWER=function(r,t){t=i.parseNumber(t);var n=e.IMREAL(r),u=e.IMAGINARY(r);if(i.anyIsError(t,n,u))return a.value;var s=r.substring(r.length-1);s="i"===s||"j"===s?s:"i";var o=Math.pow(e.IMABS(r),t),l=e.IMARGUMENT(r);return e.COMPLEX(o*Math.cos(t*l),o*Math.sin(t*l),s)},e.IMPRODUCT=function(){for(var r=arguments[0],t=1;t<arguments.length;t++){var n=e.IMREAL(r),u=e.IMAGINARY(r),s=e.IMREAL(arguments[t]),o=e.IMAGINARY(arguments[t]);if(i.anyIsError(n,u,s,o))return a.value;r=e.COMPLEX(n*s-u*o,n*o+u*s)}return r},e.IMREAL=function(r){if(void 0===r||!0===r||!1===r)return a.value;if(0===r||"0"===r)return 0;if(["i","+i","1i","+1i","-i","-1i","j","+j","1j","+1j","-j","-1j"].indexOf(r)>=0)return 0;var e=r.indexOf("+"),t=r.indexOf("-");0===e&&(e=r.indexOf("+",1)),0===t&&(t=r.indexOf("-",1));var n=r.substring(r.length-1,r.length),u="i"===n||"j"===n;return e>=0||t>=0?u?e>=0?isNaN(r.substring(0,e))||isNaN(r.substring(e+1,r.length-1))?a.num:Number(r.substring(0,e)):isNaN(r.substring(0,t))||isNaN(r.substring(t+1,r.length-1))?a.num:Number(r.substring(0,t)):a.num:u?isNaN(r.substring(0,r.length-1))?a.num:0:isNaN(r)?a.num:r},e.IMSEC=function(r){if(!0===r||!1===r)return a.value;var t=e.IMREAL(r),n=e.IMAGINARY(r);return i.anyIsError(t,n)?a.value:e.IMDIV("1",e.IMCOS(r))},e.IMSECH=function(r){var t=e.IMREAL(r),n=e.IMAGINARY(r);return i.anyIsError(t,n)?a.value:e.IMDIV("1",e.IMCOSH(r))},e.IMSIN=function(r){var t=e.IMREAL(r),n=e.IMAGINARY(r);if(i.anyIsError(t,n))return a.value;var u=r.substring(r.length-1);return u="i"===u||"j"===u?u:"i",e.COMPLEX(Math.sin(t)*(Math.exp(n)+Math.exp(-n))/2,Math.cos(t)*(Math.exp(n)-Math.exp(-n))/2,u)},e.IMSINH=function(r){var t=e.IMREAL(r),n=e.IMAGINARY(r);if(i.anyIsError(t,n))return a.value;var u=r.substring(r.length-1);return u="i"===u||"j"===u?u:"i",e.COMPLEX(Math.cos(n)*(Math.exp(t)-Math.exp(-t))/2,Math.sin(n)*(Math.exp(t)+Math.exp(-t))/2,u)},e.IMSQRT=function(r){var t=e.IMREAL(r),n=e.IMAGINARY(r);if(i.anyIsError(t,n))return a.value;var u=r.substring(r.length-1);u="i"===u||"j"===u?u:"i";var s=Math.sqrt(e.IMABS(r)),o=e.IMARGUMENT(r);return e.COMPLEX(s*Math.cos(o/2),s*Math.sin(o/2),u)},e.IMCSC=function(r){if(!0===r||!1===r)return a.value;var t=e.IMREAL(r),n=e.IMAGINARY(r);return i.anyIsError(t,n)?a.num:e.IMDIV("1",e.IMSIN(r))},e.IMCSCH=function(r){if(!0===r||!1===r)return a.value;var t=e.IMREAL(r),n=e.IMAGINARY(r);return i.anyIsError(t,n)?a.num:e.IMDIV("1",e.IMSINH(r))},e.IMSUB=function(r,e){var t=this.IMREAL(r),n=this.IMAGINARY(r),u=this.IMREAL(e),s=this.IMAGINARY(e);if(i.anyIsError(t,n,u,s))return a.value;var o=r.substring(r.length-1),l=e.substring(e.length-1),f="i";return"j"===o?f="j":"j"===l&&(f="j"),this.COMPLEX(t-u,n-s,f)},e.IMSUM=function(){for(var r=i.flatten(arguments),e=r[0],t=1;t<r.length;t++){var n=this.IMREAL(e),u=this.IMAGINARY(e),s=this.IMREAL(r[t]),o=this.IMAGINARY(r[t]);if(i.anyIsError(n,u,s,o))return a.value;e=this.COMPLEX(n+s,u+o)}return e},e.IMTAN=function(r){if(!0===r||!1===r)return a.value;var t=e.IMREAL(r),n=e.IMAGINARY(r);return i.anyIsError(t,n)?a.value:this.IMDIV(this.IMSIN(r),this.IMCOS(r))},e.OCT2BIN=function(r,e){if(!/^[0-7]{1,10}$/.test(r))return a.num;var t=10===r.length&&"7"===r.substring(0,1),n=t?parseInt(r,8)-1073741824:parseInt(r,8);if(n<-512||n>511)return a.num;if(t)return"1"+s.REPT("0",9-(512+n).toString(2).length)+(512+n).toString(2);var u=n.toString(2);return void 0===e?u:isNaN(e)?a.value:e<0?a.num:(e=Math.floor(e))>=u.length?s.REPT("0",e-u.length)+u:a.num},e.OCT2DEC=function(r){if(!/^[0-7]{1,10}$/.test(r))return a.num;var e=parseInt(r,8);return e>=536870912?e-1073741824:e},e.OCT2HEX=function(r,e){if(!/^[0-7]{1,10}$/.test(r))return a.num;var t=parseInt(r,8);if(t>=536870912)return"ff"+(t+3221225472).toString(16);var n=t.toString(16);return void 0===e?n:isNaN(e)?a.value:e<0?a.num:(e=Math.floor(e))>=n.length?s.REPT("0",e-n.length)+n:a.num}},function(r,e,t){function n(r,e){return r.reduce(function(r,t){return e*r+t},0)}function a(r,e,t,n,a){a||(a=-1);var u,s=2/r;if(0===e)return t;if(1===e)return n;for(var i=1;i!=e;++i)u=n*i*s+a*t,t=n,n=u;return n}function u(r,e,t,n,u){return function(s,i){if(0===i)return r(s);if(1===i)return e(s);if(i<0)throw t+": Order ("+i+") must be nonnegative";if(1==n&&0===s)throw t+": Undefined when x == 0";if(2==n&&s<=0)throw t+": Undefined when x <= 0";return a(s,i,r(s),e(s),u)}}var s=Math,i=function(){function r(r){var e,a,f,p=r*r,c=s.abs(r)-.785398164;return s.abs(r)<8?e=(a=n(t,p))/(f=n(u,p)):(a=n(i,p=64/p),f=n(o,p),e=s.sqrt(l/s.abs(r))*(s.cos(c)*a-s.sin(c)*f*8/s.abs(r))),e}function e(r){var e,t,a,u=r*r,i=s.abs(r)-2.356194491;return Math.abs(r)<8?e=(t=r*n(f,u))/(a=n(p,u)):(t=n(c,u=64/u),a=n(N,u),e=s.sqrt(l/s.abs(r))*(s.cos(i)*t-s.sin(i)*a*8/s.abs(r)),r<0&&(e=-e)),e}var t=[57568490574,-13362590354,651619640.7,-11214424.18,77392.33017,-184.9052456].reverse(),u=[57568490411,1029532985,9494680.718,59272.64853,267.8532712,1].reverse(),i=[1,-.001098628627,2734510407e-14,-2073370639e-15,2.093887211e-7].reverse(),o=[-.01562499995,.0001430488765,-6911147651e-15,7.621095161e-7,-9.34935152e-8].reverse(),l=.636619772,f=[72362614232,-7895059235,242396853.1,-2972611.439,15704.4826,-30.16036606].reverse(),p=[144725228442,2300535178,18583304.74,99447.43394,376.9991397,1].reverse(),c=[1,.00183105,-3516396496e-14,2457520174e-15,-2.40337019e-7].reverse(),N=[.04687499995,-.0002002690873,8449199096e-15,-8.8228987e-7,1.05787412e-7].reverse();return function(t,n){if(0===(n=Math.round(n)))return r(s.abs(t));if(1===n)return e(s.abs(t));if(n<0)throw"BESSELJ: Order ("+n+") must be nonnegative";if(0===s.abs(t))return 0;var u,i,o,l,f,p,c,N=2/s.abs(t);if(s.abs(t)>n)u=a(t,n,r(s.abs(t)),e(s.abs(t)),-1);else{for(o=0,f=u=l=0,p=1,i=2*s.floor((n+s.floor(s.sqrt(40*n)))/2);i>0;i--)c=i*N*p-f,f=p,p=c,s.abs(p)>1e10&&(p*=1e-10,f*=1e-10,u*=1e-10,l*=1e-10),o&&(l+=p),o=!o,i==n&&(u=f);u/=l=2*l-p}return t<0&&n%2?-u:u}}(),o=function(){var r=[-2957821389,7062834065,-512359803.6,10879881.29,-86327.92757,228.4622733].reverse(),e=[40076544269,745249964.8,7189466.438,47447.2647,226.1030244,1].reverse(),t=[1,-.001098628627,2734510407e-14,-2073370639e-15,2.093887211e-7].reverse(),a=[-.01562499995,.0001430488765,-6911147651e-15,7.621095161e-7,-9.34945152e-8].reverse(),o=.636619772,l=[-4900604943e3,127527439e4,-51534381390,734926455.1,-4237922.726,8511.937935].reverse(),f=[249958057e5,424441966400,3733650367,22459040.02,102042.605,354.9632885,1].reverse(),p=[1,.00183105,-3516396496e-14,2457520174e-15,-2.40337019e-7].reverse(),c=[.04687499995,-.0002002690873,8449199096e-15,-8.8228987e-7,1.05787412e-7].reverse();return u(function(u){var l,f,p,c=u*u,N=u-.785398164;return u<8?l=(f=n(r,c))/(p=n(e,c))+o*i(u,0)*s.log(u):(f=n(t,c=64/c),p=n(a,c),l=s.sqrt(o/u)*(s.sin(N)*f+s.cos(N)*p*8/u)),l},function(r){var e,t,a,u=r*r,N=r-2.356194491;return r<8?e=(t=r*n(l,u))/(a=n(f,u))+o*(i(r,1)*s.log(r)-1/r):(t=n(p,u=64/u),a=n(c,u),e=s.sqrt(o/r)*(s.sin(N)*t+s.cos(N)*a*8/r)),e},"BESSELY",1,-1)}(),l=function(){function r(r){return r<=3.75?n(t,r*r/14.0625):s.exp(s.abs(r))/s.sqrt(s.abs(r))*n(a,3.75/s.abs(r))}function e(r){return r<3.75?r*n(u,r*r/14.0625):(r<0?-1:1)*s.exp(s.abs(r))/s.sqrt(s.abs(r))*n(i,3.75/s.abs(r))}var t=[1,3.5156229,3.0899424,1.2067492,.2659732,.0360768,.0045813].reverse(),a=[.39894228,.01328592,.00225319,-.00157565,.00916281,-.02057706,.02635537,-.01647633,.00392377].reverse(),u=[.5,.87890594,.51498869,.15084934,.02658733,.00301532,32411e-8].reverse(),i=[.39894228,-.03988024,-.00362018,.00163801,-.01031555,.02282967,-.02895312,.01787654,-.00420059].reverse();return function t(n,a){if(0===(a=Math.round(a)))return r(n);if(1==a)return e(n);if(a<0)throw"BESSELI Order ("+a+") must be nonnegative";if(0===s.abs(n))return 0;var u,i,o,l,f,p=2/s.abs(n);for(o=u=0,l=1,i=2*s.round((a+s.round(s.sqrt(40*a)))/2);i>0;i--)f=i*p*l+o,o=l,l=f,s.abs(l)>1e10&&(l*=1e-10,o*=1e-10,u*=1e-10),i==a&&(u=o);return u*=t(n,0)/l,n<0&&a%2?-u:u}}(),f=function(){var r=[-.57721566,.4227842,.23069756,.0348859,.00262698,1075e-7,74e-7].reverse(),e=[1.25331414,-.07832358,.02189568,-.01062446,.00587872,-.0025154,53208e-8].reverse(),t=[1,.15443144,-.67278579,-.18156897,-.01919402,-.00110404,-4686e-8].reverse(),a=[1.25331414,.23498619,-.0365562,.01504268,-.00780353,.00325614,-68245e-8].reverse();return u(function(t){return t<=2?-s.log(t/2)*l(t,0)+n(r,t*t/4):s.exp(-t)/s.sqrt(t)*n(e,2/t)},function(r){return r<=2?s.log(r/2)*l(r,1)+1/r*n(t,r*r/4):s.exp(-r)/s.sqrt(r)*n(a,2/r)},"BESSELK",2,1)}();e.besselj=i,e.bessely=o,e.besseli=l,e.besselk=f},function(r,e,t){function n(r){return 1===new Date(r,1,29).getMonth()}function a(r,e){return Math.ceil((e-r)/1e3/60/60/24)}function u(r){return(r-o)/864e5+(r>-22038912e5?2:1)}var s=t(5),i=t(4),o=new Date(1900,0,1),l=[void 0,0,1,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,1,2,3,4,5,6,0],f=[[],[1,2,3,4,5,6,7],[7,1,2,3,4,5,6],[6,0,1,2,3,4,5],[],[],[],[],[],[],[],[7,1,2,3,4,5,6],[6,7,1,2,3,4,5],[5,6,7,1,2,3,4],[4,5,6,7,1,2,3],[3,4,5,6,7,1,2],[2,3,4,5,6,7,1],[1,2,3,4,5,6,7]],p=[[],[6,0],[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],void 0,void 0,void 0,[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6]];e.DATE=function(r,e,t){return r=i.parseNumber(r),e=i.parseNumber(e),t=i.parseNumber(t),i.anyIsError(r,e,t)?s.value:r<0||e<0||t<0?s.num:new Date(r,e-1,t)},e.DATEVALUE=function(r){if("string"!=typeof r)return s.value;var e=Date.parse(r);return isNaN(e)?s.value:e<=-22038912e5?(e-o)/864e5+1:(e-o)/864e5+2},e.DAY=function(r){var e=i.parseDate(r);return e instanceof Error?e:e.getDate()},e.DAYS=function(r,e){return r=i.parseDate(r),e=i.parseDate(e),r instanceof Error?r:e instanceof Error?e:u(r)-u(e)},e.DAYS360=function(r,e,t){if(t=i.parseBool(t),r=i.parseDate(r),e=i.parseDate(e),r instanceof Error)return r;if(e instanceof Error)return e;if(t instanceof Error)return t;var n,a,u=r.getMonth(),s=e.getMonth();if(t)n=31===r.getDate()?30:r.getDate(),a=31===e.getDate()?30:e.getDate();else{var o=new Date(r.getFullYear(),u+1,0).getDate(),l=new Date(e.getFullYear(),s+1,0).getDate();n=r.getDate()===o?30:r.getDate(),e.getDate()===l?n<30?(s++,a=1):a=30:a=e.getDate()}return 360*(e.getFullYear()-r.getFullYear())+30*(s-u)+(a-n)},e.EDATE=function(r,e){return(r=i.parseDate(r))instanceof Error?r:isNaN(e)?s.value:(e=parseInt(e,10),r.setMonth(r.getMonth()+e),u(r))},e.EOMONTH=function(r,e){return(r=i.parseDate(r))instanceof Error?r:isNaN(e)?s.value:(e=parseInt(e,10),u(new Date(r.getFullYear(),r.getMonth()+e+1,0)))},e.HOUR=function(r){return(r=i.parseDate(r))instanceof Error?r:r.getHours()},e.INTERVAL=function(r){if("number"!=typeof r&&"string"!=typeof r)return s.value;r=parseInt(r,10);var e=Math.floor(r/94608e4);r%=94608e4;var t=Math.floor(r/2592e3);r%=2592e3;var n=Math.floor(r/86400);r%=86400;var a=Math.floor(r/3600);r%=3600;var u=Math.floor(r/60),i=r%=60;return e=e>0?e+"Y":"",t=t>0?t+"M":"",n=n>0?n+"D":"",a=a>0?a+"H":"",u=u>0?u+"M":"",i=i>0?i+"S":"","P"+e+t+n+"T"+a+u+i},e.ISOWEEKNUM=function(r){if((r=i.parseDate(r))instanceof Error)return r;r.setHours(0,0,0),r.setDate(r.getDate()+4-(r.getDay()||7));var e=new Date(r.getFullYear(),0,1);return Math.ceil(((r-e)/864e5+1)/7)},e.MINUTE=function(r){return(r=i.parseDate(r))instanceof Error?r:r.getMinutes()},e.MONTH=function(r){return(r=i.parseDate(r))instanceof Error?r:r.getMonth()+1},e.NETWORKDAYS=function(r,e,t){return this.NETWORKDAYS.INTL(r,e,1,t)},e.NETWORKDAYS.INTL=function(r,e,t,n){if((r=i.parseDate(r))instanceof Error)return r;if((e=i.parseDate(e))instanceof Error)return e;if(!((t=void 0===t?p[1]:p[t])instanceof Array))return s.value;void 0===n?n=[]:n instanceof Array||(n=[n]);for(var a=0;a<n.length;a++){var u=i.parseDate(n[a]);if(u instanceof Error)return u;n[a]=u}var o=(e-r)/864e5+1,l=o,f=r;for(a=0;a<o;a++){var c=(new Date).getTimezoneOffset()>0?f.getUTCDay():f.getDay(),N=!1;c!==t[0]&&c!==t[1]||(N=!0);for(var E=0;E<n.length;E++){var m=n[E];if(m.getDate()===f.getDate()&&m.getMonth()===f.getMonth()&&m.getFullYear()===f.getFullYear()){N=!0;break}}N&&l--,f.setDate(f.getDate()+1)}return l},e.NOW=function(){return new Date},e.SECOND=function(r){return(r=i.parseDate(r))instanceof Error?r:r.getSeconds()},e.TIME=function(r,e,t){return r=i.parseNumber(r),e=i.parseNumber(e),t=i.parseNumber(t),i.anyIsError(r,e,t)?s.value:r<0||e<0||t<0?s.num:(3600*r+60*e+t)/86400},e.TIMEVALUE=function(r){return(r=i.parseDate(r))instanceof Error?r:(3600*r.getHours()+60*r.getMinutes()+r.getSeconds())/86400},e.TODAY=function(){return new Date},e.WEEKDAY=function(r,e){if((r=i.parseDate(r))instanceof Error)return r;void 0===e&&(e=1);var t=r.getDay();return f[e][t]},e.WEEKNUM=function(r,e){if((r=i.parseDate(r))instanceof Error)return r;if(void 0===e&&(e=1),21===e)return this.ISOWEEKNUM(r);var t=l[e],n=new Date(r.getFullYear(),0,1),a=n.getDay()<t?1:0;return n-=24*Math.abs(n.getDay()-t)*60*60*1e3,Math.floor((r-n)/864e5/7+1)+a},e.WORKDAY=function(r,e,t){return this.WORKDAY.INTL(r,e,1,t)},e.WORKDAY.INTL=function(r,e,t,n){if((r=i.parseDate(r))instanceof Error)return r;if((e=i.parseNumber(e))instanceof Error)return e;if(e<0)return s.num;if(!((t=void 0===t?p[1]:p[t])instanceof Array))return s.value;void 0===n?n=[]:n instanceof Array||(n=[n]);for(var a=0;a<n.length;a++){var u=i.parseDate(n[a]);if(u instanceof Error)return u;n[a]=u}for(var o=0;o<e;){r.setDate(r.getDate()+1);var l=r.getDay();if(l!==t[0]&&l!==t[1]){for(var f=0;f<n.length;f++){var c=n[f];if(c.getDate()===r.getDate()&&c.getMonth()===r.getMonth()&&c.getFullYear()===r.getFullYear()){o--;break}}o++}}return r},e.YEAR=function(r){return(r=i.parseDate(r))instanceof Error?r:r.getFullYear()},e.YEARFRAC=function(r,e,t){if((r=i.parseDate(r))instanceof Error)return r;if((e=i.parseDate(e))instanceof Error)return e;t=t||0;var u=r.getDate(),s=r.getMonth()+1,o=r.getFullYear(),l=e.getDate(),f=e.getMonth()+1,p=e.getFullYear();switch(t){case 0:return 31===u&&31===l?(u=30,l=30):31===u?u=30:30===u&&31===l&&(l=30),(l+30*f+360*p-(u+30*s+360*o))/360;case 1:var c=function(r,e){var t=r.getFullYear(),a=new Date(t,2,1);if(n(t)&&r<a&&e>=a)return!0;var u=e.getFullYear(),s=new Date(u,2,1);return n(u)&&e>=s&&r<s},N=365;if(o===p||o+1===p&&(s>f||s===f&&u>=l))return(o===p&&n(o)||c(r,e)||1===f&&29===l)&&(N=366),a(r,e)/N;var E=p-o+1,m=(new Date(p+1,0,1)-new Date(o,0,1))/1e3/60/60/24/E;return a(r,e)/m;case 2:return a(r,e)/360;case 3:return a(r,e)/365;case 4:return(l+30*f+360*p-(u+30*s+360*o))/360}}},function(module,exports,__webpack_require__){function compact(r){if(!r)return r;for(var e=[],t=0;t<r.length;++t)r[t]&&e.push(r[t]);return e}function findResultIndex(database,criterias){for(var matches={},i=1;i<database[0].length;++i)matches[i]=!0;var maxCriteriaLength=criterias[0].length;for(i=1;i<criterias.length;++i)criterias[i].length>maxCriteriaLength&&(maxCriteriaLength=criterias[i].length);for(var k=1;k<database.length;++k)for(var l=1;l<database[k].length;++l){for(var currentCriteriaResult=!1,hasMatchingCriteria=!1,j=0;j<criterias.length;++j){var criteria=criterias[j];if(!(criteria.length<maxCriteriaLength)){var criteriaField=criteria[0];if(database[k][0]===criteriaField){hasMatchingCriteria=!0;for(var p=1;p<criteria.length;++p)currentCriteriaResult=currentCriteriaResult||eval(database[k][l]+criteria[p])}}}hasMatchingCriteria&&(matches[l]=matches[l]&&currentCriteriaResult)}for(var result=[],n=0;n<database[0].length;++n)matches[n]&&result.push(n-1);return result}var error=__webpack_require__(5),stats=__webpack_require__(6),maths=__webpack_require__(2),utils=__webpack_require__(4);exports.FINDFIELD=function(r,e){for(var t=null,n=0;n<r.length;n++)if(r[n][0]===e){t=n;break}return null==t?error.value:t},exports.DAVERAGE=function(r,e,t){if(isNaN(e)&&"string"!=typeof e)return error.value;var n=findResultIndex(r,t),a=[];if("string"==typeof e){var u=exports.FINDFIELD(r,e);a=utils.rest(r[u])}else a=utils.rest(r[e]);for(var s=0,i=0;i<n.length;i++)s+=a[n[i]];return 0===n.length?error.div0:s/n.length},exports.DCOUNT=function(r,e,t){if(isNaN(e)&&"string"!=typeof e)return error.value;var n=findResultIndex(r,t),a=[];if("string"==typeof e){var u=exports.FINDFIELD(r,e);a=utils.rest(r[u])}else a=utils.rest(r[e]);for(var s=[],i=0;i<n.length;i++)s[i]=a[n[i]];return stats.COUNT(s)},exports.DCOUNTA=function(r,e,t){if(isNaN(e)&&"string"!=typeof e)return error.value;var n=findResultIndex(r,t),a=[];if("string"==typeof e){var u=exports.FINDFIELD(r,e);a=utils.rest(r[u])}else a=utils.rest(r[e]);for(var s=[],i=0;i<n.length;i++)s[i]=a[n[i]];return stats.COUNTA(s)},exports.DGET=function(r,e,t){if(isNaN(e)&&"string"!=typeof e)return error.value;var n=findResultIndex(r,t),a=[];if("string"==typeof e){var u=exports.FINDFIELD(r,e);a=utils.rest(r[u])}else a=utils.rest(r[e]);return 0===n.length?error.value:n.length>1?error.num:a[n[0]]},exports.DMAX=function(r,e,t){if(isNaN(e)&&"string"!=typeof e)return error.value;var n=findResultIndex(r,t),a=[];if("string"==typeof e){var u=exports.FINDFIELD(r,e);a=utils.rest(r[u])}else a=utils.rest(r[e]);for(var s=a[n[0]],i=1;i<n.length;i++)s<a[n[i]]&&(s=a[n[i]]);return s},exports.DMIN=function(r,e,t){if(isNaN(e)&&"string"!=typeof e)return error.value;var n=findResultIndex(r,t),a=[];if("string"==typeof e){var u=exports.FINDFIELD(r,e);a=utils.rest(r[u])}else a=utils.rest(r[e]);for(var s=a[n[0]],i=1;i<n.length;i++)s>a[n[i]]&&(s=a[n[i]]);return s},exports.DPRODUCT=function(r,e,t){if(isNaN(e)&&"string"!=typeof e)return error.value;var n=findResultIndex(r,t),a=[];if("string"==typeof e){var u=exports.FINDFIELD(r,e);a=utils.rest(r[u])}else a=utils.rest(r[e]);for(var s=[],i=0;i<n.length;i++)s[i]=a[n[i]];s=compact(s);var o=1;for(i=0;i<s.length;i++)o*=s[i];return o},exports.DSTDEV=function(r,e,t){if(isNaN(e)&&"string"!=typeof e)return error.value;var n=findResultIndex(r,t),a=[];if("string"==typeof e){var u=exports.FINDFIELD(r,e);a=utils.rest(r[u])}else a=utils.rest(r[e]);for(var s=[],i=0;i<n.length;i++)s[i]=a[n[i]];return s=compact(s),stats.STDEV.S(s)},exports.DSTDEVP=function(r,e,t){if(isNaN(e)&&"string"!=typeof e)return error.value;var n=findResultIndex(r,t),a=[];if("string"==typeof e){var u=exports.FINDFIELD(r,e);a=utils.rest(r[u])}else a=utils.rest(r[e]);for(var s=[],i=0;i<n.length;i++)s[i]=a[n[i]];return s=compact(s),stats.STDEV.P(s)},exports.DSUM=function(r,e,t){if(isNaN(e)&&"string"!=typeof e)return error.value;var n=findResultIndex(r,t),a=[];if("string"==typeof e){var u=exports.FINDFIELD(r,e);a=utils.rest(r[u])}else a=utils.rest(r[e]);for(var s=[],i=0;i<n.length;i++)s[i]=a[n[i]];return maths.SUM(s)},exports.DVAR=function(r,e,t){if(isNaN(e)&&"string"!=typeof e)return error.value;var n=findResultIndex(r,t),a=[];if("string"==typeof e){var u=exports.FINDFIELD(r,e);a=utils.rest(r[u])}else a=utils.rest(r[e]);for(var s=[],i=0;i<n.length;i++)s[i]=a[n[i]];return stats.VAR.S(s)},exports.DVARP=function(r,e,t){if(isNaN(e)&&"string"!=typeof e)return error.value;var n=findResultIndex(r,t),a=[];if("string"==typeof e){var u=exports.FINDFIELD(r,e);a=utils.rest(r[u])}else a=utils.rest(r[e]);for(var s=[],i=0;i<n.length;i++)s[i]=a[n[i]];return stats.VAR.P(s)}},function(r,e,t){var n=t(5),a=t(4),u=t(11);e.AND=function(){for(var r=a.flatten(arguments),e=!0,t=0;t<r.length;t++)r[t]||(e=!1);return e},e.CHOOSE=function(){if(arguments.length<2)return n.na;var r=arguments[0];return r<1||r>254?n.value:arguments.length<r+1?n.value:arguments[r]},e.FALSE=function(){return!1},e.IF=function(r,e,t){return r?e:t},e.IFERROR=function(r,e){return u.ISERROR(r)?e:r},e.IFNA=function(r,e){return r===n.na?e:r},e.NOT=function(r){return!r},e.OR=function(){for(var r=a.flatten(arguments),e=!1,t=0;t<r.length;t++)r[t]&&(e=!0);return e},e.TRUE=function(){return!0},e.XOR=function(){for(var r=a.flatten(arguments),e=0,t=0;t<r.length;t++)r[t]&&e++;return!!(1&Math.floor(Math.abs(e)))},e.SWITCH=function(){var r;if(arguments.length>0){var e=arguments[0],t=arguments.length-1,n=Math.floor(t/2),a=!1,u=t%2==0?null:arguments[arguments.length-1];if(n)for(var s=0;s<n;s++)if(e===arguments[2*s+1]){r=arguments[2*s+2],a=!0;break}!a&&u&&(r=u)}return r}},function(r,e,t){function n(r){return r&&r.getTime&&!isNaN(r.getTime())}function a(r){return r instanceof Date?r:new Date(r)}var u=t(5),s=t(14),i=t(4);e.ACCRINT=function(r,e,t,u,i,o,l){return r=a(r),e=a(e),t=a(t),n(r)&&n(e)&&n(t)?u<=0||i<=0?"#NUM!":-1===[1,2,4].indexOf(o)?"#NUM!":-1===[0,1,2,3,4].indexOf(l)?"#NUM!":t<=r?"#NUM!":(i=i||0,l=l||0,i*u*s.YEARFRAC(r,t,l)):"#VALUE!"},e.ACCRINTM=function(){throw new Error("ACCRINTM is not implemented")},e.AMORDEGRC=function(){throw new Error("AMORDEGRC is not implemented")},e.AMORLINC=function(){throw new Error("AMORLINC is not implemented")},e.COUPDAYBS=function(){throw new Error("COUPDAYBS is not implemented")},e.COUPDAYS=function(){throw new Error("COUPDAYS is not implemented")},e.COUPDAYSNC=function(){throw new Error("COUPDAYSNC is not implemented")},e.COUPNCD=function(){throw new Error("COUPNCD is not implemented")},e.COUPNUM=function(){throw new Error("COUPNUM is not implemented")},e.COUPPCD=function(){throw new Error("COUPPCD is not implemented")},e.CUMIPMT=function(r,t,n,a,s,o){if(r=i.parseNumber(r),t=i.parseNumber(t),n=i.parseNumber(n),i.anyIsError(r,t,n))return u.value;if(r<=0||t<=0||n<=0)return u.num;if(a<1||s<1||a>s)return u.num;if(0!==o&&1!==o)return u.num;var l=e.PMT(r,t,n,0,o),f=0;1===a&&0===o&&(f=-n,a++);for(var p=a;p<=s;p++)f+=1===o?e.FV(r,p-2,l,n,1)-l:e.FV(r,p-1,l,n,0);return f*=r},e.CUMPRINC=function(r,t,n,a,s,o){if(r=i.parseNumber(r),t=i.parseNumber(t),n=i.parseNumber(n),i.anyIsError(r,t,n))return u.value;if(r<=0||t<=0||n<=0)return u.num;if(a<1||s<1||a>s)return u.num;if(0!==o&&1!==o)return u.num;var l=e.PMT(r,t,n,0,o),f=0;1===a&&(f=0===o?l+n*r:l,a++);for(var p=a;p<=s;p++)f+=o>0?l-(e.FV(r,p-2,l,n,1)-l)*r:l-e.FV(r,p-1,l,n,0)*r;return f},e.DB=function(r,e,t,n,a){if(a=void 0===a?12:a,r=i.parseNumber(r),e=i.parseNumber(e),t=i.parseNumber(t),n=i.parseNumber(n),a=i.parseNumber(a),i.anyIsError(r,e,t,n,a))return u.value;if(r<0||e<0||t<0||n<0)return u.num;if(-1===[1,2,3,4,5,6,7,8,9,10,11,12].indexOf(a))return u.num;if(n>t)return u.num;if(e>=r)return 0;for(var s=(1-Math.pow(e/r,1/t)).toFixed(3),o=r*s*a/12,l=o,f=0,p=n===t?t-1:n,c=2;c<=p;c++)l+=f=(r-l)*s;return 1===n?o:n===t?(r-l)*s:f},e.DDB=function(r,e,t,n,a){if(a=void 0===a?2:a,r=i.parseNumber(r),e=i.parseNumber(e),t=i.parseNumber(t),n=i.parseNumber(n),a=i.parseNumber(a),i.anyIsError(r,e,t,n,a))return u.value;if(r<0||e<0||t<0||n<0||a<=0)return u.num;if(n>t)return u.num;if(e>=r)return 0;for(var s=0,o=0,l=1;l<=n;l++)s+=o=Math.min(a/t*(r-s),r-e-s);return o},e.DISC=function(){throw new Error("DISC is not implemented")},e.DOLLARDE=function(r,e){if(r=i.parseNumber(r),e=i.parseNumber(e),i.anyIsError(r,e))return u.value;if(e<0)return u.num;if(e>=0&&e<1)return u.div0;e=parseInt(e,10);var t=parseInt(r,10);t+=r%1*Math.pow(10,Math.ceil(Math.log(e)/Math.LN10))/e;var n=Math.pow(10,Math.ceil(Math.log(e)/Math.LN2)+1);return t=Math.round(t*n)/n},e.DOLLARFR=function(r,e){if(r=i.parseNumber(r),e=i.parseNumber(e),i.anyIsError(r,e))return u.value;if(e<0)return u.num;if(e>=0&&e<1)return u.div0;e=parseInt(e,10);var t=parseInt(r,10);return t+=r%1*Math.pow(10,-Math.ceil(Math.log(e)/Math.LN10))*e},e.DURATION=function(){throw new Error("DURATION is not implemented")},e.EFFECT=function(r,e){return r=i.parseNumber(r),e=i.parseNumber(e),i.anyIsError(r,e)?u.value:r<=0||e<1?u.num:(e=parseInt(e,10),Math.pow(1+r/e,e)-1)},e.FV=function(r,e,t,n,a){if(n=n||0,a=a||0,r=i.parseNumber(r),e=i.parseNumber(e),t=i.parseNumber(t),n=i.parseNumber(n),a=i.parseNumber(a),i.anyIsError(r,e,t,n,a))return u.value;var s;if(0===r)s=n+t*e;else{var o=Math.pow(1+r,e);s=1===a?n*o+t*(1+r)*(o-1)/r:n*o+t*(o-1)/r}return-s},e.FVSCHEDULE=function(r,e){if(r=i.parseNumber(r),e=i.parseNumberArray(i.flatten(e)),i.anyIsError(r,e))return u.value;for(var t=e.length,n=r,a=0;a<t;a++)n*=1+e[a];return n},e.INTRATE=function(){throw new Error("INTRATE is not implemented")},e.IPMT=function(r,t,n,a,s,o){if(s=s||0,o=o||0,r=i.parseNumber(r),t=i.parseNumber(t),n=i.parseNumber(n),a=i.parseNumber(a),s=i.parseNumber(s),o=i.parseNumber(o),i.anyIsError(r,t,n,a,s,o))return u.value;var l=e.PMT(r,n,a,s,o);return(1===t?1===o?0:-a:1===o?e.FV(r,t-2,l,a,1)-l:e.FV(r,t-1,l,a,0))*r},e.IRR=function(r,e){if(e=e||0,r=i.parseNumberArray(i.flatten(r)),e=i.parseNumber(e),i.anyIsError(r,e))return u.value;for(var t=[],n=!1,a=!1,s=0;s<r.length;s++)t[s]=0===s?0:t[s-1]+365,r[s]>0&&(n=!0),r[s]<0&&(a=!0);if(!n||!a)return u.num;var o,l,f,p=e=void 0===e?.1:e,c=!0;do{o=p-(f=function(r,e,t){for(var n=t+1,a=r[0],u=1;u<r.length;u++)a+=r[u]/Math.pow(n,(e[u]-e[0])/365);return a}(r,t,p))/function(r,e,t){for(var n=t+1,a=0,u=1;u<r.length;u++){var s=(e[u]-e[0])/365;a-=s*r[u]/Math.pow(n,s+1)}return a}(r,t,p),l=Math.abs(o-p),p=o,c=l>1e-10&&Math.abs(f)>1e-10}while(c);return p},e.ISPMT=function(r,e,t,n){return r=i.parseNumber(r),e=i.parseNumber(e),t=i.parseNumber(t),n=i.parseNumber(n),i.anyIsError(r,e,t,n)?u.value:n*r*(e/t-1)},e.MDURATION=function(){throw new Error("MDURATION is not implemented")},e.MIRR=function(r,t,n){if(r=i.parseNumberArray(i.flatten(r)),t=i.parseNumber(t),n=i.parseNumber(n),i.anyIsError(r,t,n))return u.value;for(var a=r.length,s=[],o=[],l=0;l<a;l++)r[l]<0?s.push(r[l]):o.push(r[l]);var f=-e.NPV(n,o)*Math.pow(1+n,a-1),p=e.NPV(t,s)*(1+t);return Math.pow(f/p,1/(a-1))-1},e.NOMINAL=function(r,e){return r=i.parseNumber(r),e=i.parseNumber(e),i.anyIsError(r,e)?u.value:r<=0||e<1?u.num:(e=parseInt(e,10),(Math.pow(r+1,1/e)-1)*e)},e.NPER=function(r,e,t,n,a){if(a=void 0===a?0:a,n=void 0===n?0:n,r=i.parseNumber(r),e=i.parseNumber(e),t=i.parseNumber(t),n=i.parseNumber(n),a=i.parseNumber(a),i.anyIsError(r,e,t,n,a))return u.value;var s=e*(1+r*a)-n*r,o=t*r+e*(1+r*a);return Math.log(s/o)/Math.log(1+r)},e.NPV=function(){var r=i.parseNumberArray(i.flatten(arguments));if(r instanceof Error)return r;for(var e=r[0],t=0,n=1;n<r.length;n++)t+=r[n]/Math.pow(1+e,n);return t},e.ODDFPRICE=function(){throw new Error("ODDFPRICE is not implemented")},e.ODDFYIELD=function(){throw new Error("ODDFYIELD is not implemented")},e.ODDLPRICE=function(){throw new Error("ODDLPRICE is not implemented")},e.ODDLYIELD=function(){throw new Error("ODDLYIELD is not implemented")},e.PDURATION=function(r,e,t){return r=i.parseNumber(r),e=i.parseNumber(e),t=i.parseNumber(t),i.anyIsError(r,e,t)?u.value:r<=0?u.num:(Math.log(t)-Math.log(e))/Math.log(1+r)},e.PMT=function(r,e,t,n,a){if(n=n||0,a=a||0,r=i.parseNumber(r),e=i.parseNumber(e),t=i.parseNumber(t),n=i.parseNumber(n),a=i.parseNumber(a),i.anyIsError(r,e,t,n,a))return u.value;var s;if(0===r)s=(t+n)/e;else{var o=Math.pow(1+r,e);s=1===a?(n*r/(o-1)+t*r/(1-1/o))/(1+r):n*r/(o-1)+t*r/(1-1/o)}return-s},e.PPMT=function(r,t,n,a,s,o){return s=s||0,o=o||0,r=i.parseNumber(r),n=i.parseNumber(n),a=i.parseNumber(a),s=i.parseNumber(s),o=i.parseNumber(o),i.anyIsError(r,n,a,s,o)?u.value:e.PMT(r,n,a,s,o)-e.IPMT(r,t,n,a,s,o)},e.PRICE=function(){throw new Error("PRICE is not implemented")},e.PRICEDISC=function(){throw new Error("PRICEDISC is not implemented")},e.PRICEMAT=function(){throw new Error("PRICEMAT is not implemented")},e.PV=function(r,e,t,n,a){return n=n||0,a=a||0,r=i.parseNumber(r),e=i.parseNumber(e),t=i.parseNumber(t),n=i.parseNumber(n),a=i.parseNumber(a),i.anyIsError(r,e,t,n,a)?u.value:0===r?-t*e-n:((1-Math.pow(1+r,e))/r*t*(1+r*a)-n)/Math.pow(1+r,e)},e.RATE=function(r,e,t,n,a,s){if(s=void 0===s?.01:s,n=void 0===n?0:n,a=void 0===a?0:a,r=i.parseNumber(r),e=i.parseNumber(e),t=i.parseNumber(t),n=i.parseNumber(n),a=i.parseNumber(a),s=i.parseNumber(s),i.anyIsError(r,e,t,n,a,s))return u.value;for(var o=0,l=!1,f=s;o<100&&!l;){var p=Math.pow(f+1,r),c=Math.pow(f+1,r-1),N=f-(n+p*t+e*(p-1)*(f*a+1)/f)/(r*c*t-e*(p-1)*(f*a+1)/Math.pow(f,2)+(r*e*c*(f*a+1)/f+e*(p-1)*a/f));Math.abs(N-f)<1e-6&&(l=!0),o++,f=N}return l?f:Number.NaN+f},e.RECEIVED=function(){throw new Error("RECEIVED is not implemented")},e.RRI=function(r,e,t){return r=i.parseNumber(r),e=i.parseNumber(e),t=i.parseNumber(t),i.anyIsError(r,e,t)?u.value:0===r||0===e?u.num:Math.pow(t/e,1/r)-1},e.SLN=function(r,e,t){return r=i.parseNumber(r),e=i.parseNumber(e),t=i.parseNumber(t),i.anyIsError(r,e,t)?u.value:0===t?u.num:(r-e)/t},e.SYD=function(r,e,t,n){return r=i.parseNumber(r),e=i.parseNumber(e),t=i.parseNumber(t),n=i.parseNumber(n),i.anyIsError(r,e,t,n)?u.value:0===t?u.num:n<1||n>t?u.num:(n=parseInt(n,10),(r-e)*(t-n+1)*2/(t*(t+1)))},e.TBILLEQ=function(r,e,t){return r=i.parseDate(r),e=i.parseDate(e),t=i.parseNumber(t),i.anyIsError(r,e,t)?u.value:t<=0?u.num:r>e?u.num:e-r>31536e6?u.num:365*t/(360-t*s.DAYS360(r,e,!1))},e.TBILLPRICE=function(r,e,t){return r=i.parseDate(r),e=i.parseDate(e),t=i.parseNumber(t),i.anyIsError(r,e,t)?u.value:t<=0?u.num:r>e?u.num:e-r>31536e6?u.num:100*(1-t*s.DAYS360(r,e,!1)/360)},e.TBILLYIELD=function(r,e,t){return r=i.parseDate(r),e=i.parseDate(e),t=i.parseNumber(t),i.anyIsError(r,e,t)?u.value:t<=0?u.num:r>e?u.num:e-r>31536e6?u.num:360*(100-t)/(t*s.DAYS360(r,e,!1))},e.VDB=function(){throw new Error("VDB is not implemented")},e.XIRR=function(r,e,t){if(r=i.parseNumberArray(i.flatten(r)),e=i.parseDateArray(i.flatten(e)),t=i.parseNumber(t),i.anyIsError(r,e,t))return u.value;for(var n=!1,a=!1,o=0;o<r.length;o++)r[o]>0&&(n=!0),r[o]<0&&(a=!0);if(!n||!a)return u.num;var l,f,p,c=t=t||.1,N=!0;do{l=c-(p=function(r,e,t){for(var n=t+1,a=r[0],u=1;u<r.length;u++)a+=r[u]/Math.pow(n,s.DAYS(e[u],e[0])/365);return a}(r,e,c))/function(r,e,t){for(var n=t+1,a=0,u=1;u<r.length;u++){var i=s.DAYS(e[u],e[0])/365;a-=i*r[u]/Math.pow(n,i+1)}return a}(r,e,c),f=Math.abs(l-c),c=l,N=f>1e-10&&Math.abs(p)>1e-10}while(N);return c},e.XNPV=function(r,e,t){if(r=i.parseNumber(r),e=i.parseNumberArray(i.flatten(e)),t=i.parseDateArray(i.flatten(t)),i.anyIsError(r,e,t))return u.value;for(var n=0,a=0;a<e.length;a++)n+=e[a]/Math.pow(1+r,s.DAYS(t[a],t[0])/365);return n},e.YIELD=function(){throw new Error("YIELD is not implemented")},e.YIELDDISC=function(){throw new Error("YIELDDISC is not implemented")},e.YIELDMAT=function(){throw new Error("YIELDMAT is not implemented")}},function(r,e,t){var n=t(5);e.MATCH=function(r,e,t){if(!r&&!e)return n.na;if(2===arguments.length&&(t=1),!(e instanceof Array))return n.na;if(-1!==t&&0!==t&&1!==t)return n.na;for(var a,u,s=0;s<e.length;s++)if(1===t){if(e[s]===r)return s+1;e[s]<r&&(u?e[s]>u&&(a=s+1,u=e[s]):(a=s+1,u=e[s]))}else if(0===t){if("string"==typeof r){if(r=r.replace(/\?/g,"."),e[s].toLowerCase().match(r.toLowerCase()))return s+1}else if(e[s]===r)return s+1}else if(-1===t){if(e[s]===r)return s+1;e[s]>r&&(u?e[s]<u&&(a=s+1,u=e[s]):(a=s+1,u=e[s]))}return a||n.na}}])});

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-formulajs\\node_modules\\formulajs\\dist\\formula.js","/..\\ff-formulajs\\node_modules\\formulajs\\dist",undefined)
},{"_process":79,"buffer":76,"jStat":49,"numeral":50,"numeric":51}],49:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
this.j$=this.jStat=function(n,t){function r(t,r){var e=t>r?t:r;return n.pow(10,17-~~(n.log(e>0?e:-e)*n.LOG10E))}function e(n){return"[object Function]"===s.call(n)}function o(n){return"number"==typeof n&&n==n}function i(){return new i._init(arguments)}function u(){return 0}function a(){return 1}function f(n,t){return n===t?1:0}var c=Array.prototype.concat,l=Array.prototype.slice,s=Object.prototype.toString,m=Array.isArray||function(n){return"[object Array]"===s.call(n)};i.fn=i.prototype,i._init=function(n){var t;if(m(n[0]))if(m(n[0][0])){for(e(n[1])&&(n[0]=i.map(n[0],n[1])),t=0;t<n[0].length;t++)this[t]=n[0][t];this.length=n[0].length}else this[0]=e(n[1])?i.map(n[0],n[1]):n[0],this.length=1;else if(o(n[0]))this[0]=i.seq.apply(null,n),this.length=1;else{if(n[0]instanceof i)return i(n[0].toArray());this[0]=[],this.length=1}return this},i._init.prototype=i.prototype,i._init.constructor=i,i.utils={calcRdx:r,isArray:m,isFunction:e,isNumber:o,toVector:function(n){return c.apply([],n)}},i.extend=function(n){var t,r;if(1===arguments.length){for(r in n)i[r]=n[r];return this}for(t=1;t<arguments.length;t++)for(r in arguments[t])n[r]=arguments[t][r];return n},i.rows=function(n){return n.length||1},i.cols=function(n){return n[0].length||1},i.dimensions=function(n){return{rows:i.rows(n),cols:i.cols(n)}},i.row=function(n,t){return n[t]},i.col=function(n,t){for(var r=new Array(n.length),e=0;e<n.length;e++)r[e]=[n[e][t]];return r},i.diag=function(n){for(var t=i.rows(n),r=new Array(t),e=0;e<t;e++)r[e]=[n[e][e]];return r},i.antidiag=function(n){for(var t=i.rows(n)-1,r=new Array(t),e=0;t>=0;t--,e++)r[e]=[n[e][t]];return r},i.transpose=function(n){var t,r,e,o,i,u=[];for(m(n[0])||(n=[n]),r=n.length,e=n[0].length,i=0;i<e;i++){for(t=new Array(r),o=0;o<r;o++)t[o]=n[o][i];u.push(t)}return 1===u.length?u[0]:u},i.map=function(n,t,r){var e,o,i,u,a;for(m(n[0])||(n=[n]),o=n.length,i=n[0].length,u=r?n:new Array(o),e=0;e<o;e++)for(u[e]||(u[e]=new Array(i)),a=0;a<i;a++)u[e][a]=t(n[e][a],e,a);return 1===u.length?u[0]:u},i.alter=function(n,t){return i.map(n,t,!0)},i.create=function(n,t,r){var o,i,u=new Array(n);for(e(t)&&(r=t,t=n),o=0;o<n;o++)for(u[o]=new Array(t),i=0;i<t;i++)u[o][i]=r(o,i);return u},i.zeros=function(n,t){return o(t)||(t=n),i.create(n,t,u)},i.ones=function(n,t){return o(t)||(t=n),i.create(n,t,a)},i.rand=function(t,r){return o(r)||(r=t),i.create(t,r,n.random)},i.identity=function(n,t){return o(t)||(t=n),i.create(n,t,f)},i.symmetric=function(n){var t,r,e=n.length;if(n.length!==n[0].length)return!1;for(t=0;t<e;t++)for(r=0;r<e;r++)if(n[r][t]!==n[t][r])return!1;return!0},i.clear=function(n){return i.alter(n,u)},i.seq=function(n,t,o,i){e(i)||(i=!1);var u,a=[],f=r(n,t),c=(t*f-n*f)/((o-1)*f),l=n;for(u=0;l<=t;u++,l=(n*f+c*f*u)/f)a.push(i?i(l,u):l);return a};var p=i.prototype;return p.length=0,p.push=Array.prototype.push,p.sort=Array.prototype.sort,p.splice=Array.prototype.splice,p.slice=Array.prototype.slice,p.toArray=function(){return this.length>1?l.call(this):l.call(this)[0]},p.map=function(n,t){return i(i.map(this,n,t))},p.alter=function(n){return i.alter(this,n),this},function(n){for(var t=0;t<n.length;t++)!function(n){p[n]=function(t){var r,e=this;return t?(setTimeout(function(){t.call(e,p[n].call(e))}),this):(r=i[n](this),m(r)?i(r):r)}}(n[t])}("transpose clear symmetric rows cols dimensions diag antidiag".split(" ")),function(n){for(var t=0;t<n.length;t++)!function(n){p[n]=function(t,r){var e=this;return r?(setTimeout(function(){r.call(e,p[n].call(e,t))}),this):i(i[n](this,t))}}(n[t])}("row col".split(" ")),function(n){for(var t=0;t<n.length;t++)!function(n){p[n]=new Function("return jStat(jStat."+n+".apply(null, arguments));")}(n[t])}("create zeros ones rand identity".split(" ")),i}(Math),function(n,t){function r(n,t){return n-t}function e(n,r,e){return t.max(r,t.min(n,e))}var o=n.utils.isFunction;n.sum=function(n){for(var t=0,r=n.length;--r>=0;)t+=n[r];return t},n.sumsqrd=function(n){for(var t=0,r=n.length;--r>=0;)t+=n[r]*n[r];return t},n.sumsqerr=function(t){for(var r,e=n.mean(t),o=0,i=t.length;--i>=0;)o+=(r=t[i]-e)*r;return o},n.product=function(n){for(var t=1,r=n.length;--r>=0;)t*=n[r];return t},n.min=function(n){for(var t=n[0],r=0;++r<n.length;)n[r]<t&&(t=n[r]);return t},n.max=function(n){for(var t=n[0],r=0;++r<n.length;)n[r]>t&&(t=n[r]);return t},n.mean=function(t){return n.sum(t)/t.length},n.meansqerr=function(t){return n.sumsqerr(t)/t.length},n.geomean=function(r){return t.pow(n.product(r),1/r.length)},n.median=function(n){var t=n.length,e=n.slice().sort(r);return 1&t?e[t/2|0]:(e[t/2-1]+e[t/2])/2},n.cumsum=function(n){var t,r=n.length,e=new Array(r);for(e[0]=n[0],t=1;t<r;t++)e[t]=e[t-1]+n[t];return e},n.diff=function(n){var t,r=[],e=n.length;for(t=1;t<e;t++)r.push(n[t]-n[t-1]);return r},n.mode=function(n){var t,e=n.length,o=n.slice().sort(r),i=1,u=0,a=0,f=[];for(t=0;t<e;t++)o[t]===o[t+1]?i++:(i>u?(f=[o[t]],u=i,a=0):i===u&&(f.push(o[t]),a++),i=1);return 0===a?f[0]:f},n.range=function(t){return n.max(t)-n.min(t)},n.variance=function(t,r){return n.sumsqerr(t)/(t.length-(r?1:0))},n.stdev=function(r,e){return t.sqrt(n.variance(r,e))},n.meandev=function(r){var e,o=0,i=n.mean(r);for(e=r.length-1;e>=0;e--)o+=t.abs(r[e]-i);return o/r.length},n.meddev=function(r){var e,o=0,i=n.median(r);for(e=r.length-1;e>=0;e--)o+=t.abs(r[e]-i);return o/r.length},n.coeffvar=function(t){return n.stdev(t)/n.mean(t)},n.quartiles=function(n){var e=n.length,o=n.slice().sort(r);return[o[t.round(e/4)-1],o[t.round(e/2)-1],o[t.round(3*e/4)-1]]},n.quantiles=function(n,o,i,u){var a,f,c,l,s,m=n.slice().sort(r),p=[o.length],g=n.length;for(void 0===i&&(i=3/8),void 0===u&&(u=3/8),a=0;a<o.length;a++)s=e((c=g*(f=o[a])+(i+f*(1-i-u)))-(l=t.floor(e(c,1,g-1))),0,1),p[a]=(1-s)*m[l-1]+s*m[l];return p},n.percentileOfScore=function(n,t,r){var e,o,i=0,u=n.length,a=!1;for("strict"===r&&(a=!0),o=0;o<u;o++)e=n[o],(a&&e<t||!a&&e<=t)&&i++;return i/u},n.covariance=function(t,r){var e,o=n.mean(t),i=n.mean(r),u=t.length,a=new Array(u);for(e=0;e<u;e++)a[e]=(t[e]-o)*(r[e]-i);return n.sum(a)/(u-1)},n.corrcoeff=function(t,r){return n.covariance(t,r)/n.stdev(t,1)/n.stdev(r,1)};var i=n.prototype;i.cumsum=function(t,r){var e=[],u=0,a=this;if(o(t)&&(r=t,t=!1),r)return setTimeout(function(){r.call(a,i.cumsum.call(a,t))}),this;if(this.length>1){for(a=!0===t?this:this.transpose();u<a.length;u++)e[u]=n.cumsum(a[u]);return e}return n.cumsum(this[0],t)},function(t){for(var r=0;r<t.length;r++)!function(t){i[t]=function(r,e){var u=[],a=0,f=this;if(o(r)&&(e=r,r=!1),e)return setTimeout(function(){e.call(f,i[t].call(f,r))}),this;if(this.length>1){for(f=!0===r?this:this.transpose();a<f.length;a++)u[a]=n[t](f[a]);return!0===r?n[t](n.utils.toVector(u)):u}return n[t](this[0],r)}}(t[r])}("sum sumsqrd sumsqerr product min max mean meansqerr geomean median diff mode range variance stdev meandev meddev coeffvar quartiles".split(" ")),function(t){for(var r=0;r<t.length;r++)!function(t){i[t]=function(){var r=[],e=0,u=this,a=Array.prototype.slice.call(arguments);if(o(a[a.length-1])){var f=a[a.length-1],c=a.slice(0,a.length-1);return setTimeout(function(){f.call(u,i[t].apply(u,c))}),this}var f=void 0,l=function(r){return n[t].apply(u,[r].concat(a))};if(this.length>1){for(u=u.transpose();e<u.length;e++)r[e]=l(u[e]);return r}return l(this[0])}}(t[r])}("quantiles percentileOfScore".split(" "))}(this.jStat,Math),function(n,t){n.gammaln=function(n){var r,e,o,i=0,u=[76.18009172947146,-86.50532032941678,24.01409824083091,-1.231739572450155,.001208650973866179,-5395239384953e-18],a=1.000000000190015;for(o=(e=r=n)+5.5,o-=(r+.5)*t.log(o);i<6;i++)a+=u[i]/++e;return t.log(2.5066282746310007*a/r)-o},n.gammafn=function(n){var r,e,o,i,u=[-1.716185138865495,24.76565080557592,-379.80425647094563,629.3311553128184,866.9662027904133,-31451.272968848367,-36144.413418691176,66456.14382024054],a=[-30.8402300119739,315.35062697960416,-1015.1563674902192,-3107.771671572311,22538.11842098015,4755.846277527881,-134659.9598649693,-115132.2596755535],f=!1,c=0,l=0,s=0,m=n;if(m<=0){if(!(i=m%1+3.6e-16))return 1/0;f=(1&m?-1:1)*t.PI/t.sin(t.PI*i),m=1-m}for(o=m,e=m<1?m++:(m-=c=(0|m)-1)-1,r=0;r<8;++r)s=(s+u[r])*e,l=l*e+a[r];if(i=s/l+1,o<m)i/=o;else if(o>m)for(r=0;r<c;++r)i*=m,m++;return f&&(i=f/i),i},n.gammap=function(r,e){var o,i=n.gammaln(r),u=r,a=1/r,f=a,c=e+1-r,l=1/1e-30,s=1/c,m=s,p=1,g=-~(8.5*t.log(r>=1?r:1/r)+.4*r+17);if(e<0||r<=0)return NaN;if(e<r+1){for(;p<=g;p++)a+=f*=e/++u;return a*t.exp(-e+r*t.log(e)-i)}for(;p<=g;p++)m*=(s=1/(s=(o=-p*(p-r))*s+(c+=2)))*(l=c+o/l);return 1-m*t.exp(-e+r*t.log(e)-i)},n.factorialln=function(t){return t<0?NaN:n.gammaln(t+1)},n.factorial=function(t){return t<0?NaN:n.gammafn(t+1)},n.combination=function(r,e){return r>170||e>170?t.exp(n.combinationln(r,e)):n.factorial(r)/n.factorial(e)/n.factorial(r-e)},n.combinationln=function(t,r){return n.factorialln(t)-n.factorialln(r)-n.factorialln(t-r)},n.permutation=function(t,r){return n.factorial(t)/n.factorial(t-r)},n.betafn=function(r,e){if(!(r<=0||e<=0))return r+e>170?t.exp(n.betaln(r,e)):n.gammafn(r)*n.gammafn(e)/n.gammafn(r+e)},n.betaln=function(t,r){return n.gammaln(t)+n.gammaln(r)-n.gammaln(t+r)},n.betacf=function(n,r,e){var o,i,u,a,f=1,c=r+e,l=r+1,s=r-1,m=1,p=1-c*n/l;for(t.abs(p)<1e-30&&(p=1e-30),a=p=1/p;f<=100&&(o=2*f,i=f*(e-f)*n/((s+o)*(r+o)),p=1+i*p,t.abs(p)<1e-30&&(p=1e-30),m=1+i/m,t.abs(m)<1e-30&&(m=1e-30),p=1/p,a*=p*m,i=-(r+f)*(c+f)*n/((r+o)*(l+o)),p=1+i*p,t.abs(p)<1e-30&&(p=1e-30),m=1+i/m,t.abs(m)<1e-30&&(m=1e-30),p=1/p,u=p*m,a*=u,!(t.abs(u-1)<3e-7));f++);return a},n.gammapinv=function(r,e){var o,i,u,a,f,c,l,s=0,m=e-1,p=n.gammaln(e);if(r>=1)return t.max(100,e+100*t.sqrt(e));if(r<=0)return 0;for(e>1?(c=t.log(m),l=t.exp(m*(c-1)-p),f=r<.5?r:1-r,o=(2.30753+.27061*(u=t.sqrt(-2*t.log(f))))/(1+u*(.99229+.04481*u))-u,r<.5&&(o=-o),o=t.max(.001,e*t.pow(1-1/(9*e)-o/(3*t.sqrt(e)),3))):o=r<(u=1-e*(.253+.12*e))?t.pow(r/u,1/e):1-t.log(1-(r-u)/(1-u));s<12;s++){if(o<=0)return 0;if(i=n.gammap(e,o)-r,u=e>1?l*t.exp(-(o-m)+m*(t.log(o)-c)):t.exp(-o+m*t.log(o)-p),a=i/u,(o-=u=a/(1-.5*t.min(1,a*((e-1)/o-1))))<=0&&(o=.5*(o+u)),t.abs(u)<1e-8*o)break}return o},n.erf=function(n){var r,e,o,i,u=[-1.3026537197817094,.6419697923564902,.019476473204185836,-.00956151478680863,-.000946595344482036,.000366839497852761,42523324806907e-18,-20278578112534e-18,-1624290004647e-18,130365583558e-17,1.5626441722e-8,-8.5238095915e-8,6.529054439e-9,5.059343495e-9,-9.91364156e-10,-2.27365122e-10,9.6467911e-11,2.394038e-12,-6.886027e-12,8.94487e-13,3.13092e-13,-1.12708e-13,3.81e-16,7.106e-15,-1.523e-15,-9.4e-17,1.21e-16,-2.8e-17],a=u.length-1,f=!1,c=0,l=0;for(n<0&&(n=-n,f=!0),e=4*(r=2/(2+n))-2;a>0;a--)o=c,c=e*c-l+u[a],l=o;return i=r*t.exp(-n*n+.5*(u[0]+e*c)-l),f?i-1:1-i},n.erfc=function(t){return 1-n.erf(t)},n.erfcinv=function(r){var e,o,i,u,a=0;if(r>=2)return-100;if(r<=0)return 100;for(u=r<1?r:2-r,e=-.70711*((2.30753+.27061*(i=t.sqrt(-2*t.log(u/2))))/(1+i*(.99229+.04481*i))-i);a<2;a++)e+=(o=n.erfc(e)-u)/(1.1283791670955126*t.exp(-e*e)-e*o);return r<1?e:-e},n.ibetainv=function(r,e,o){var i,u,a,f,c,l,s,m,p,g,d,h=e-1,v=o-1,y=0;if(r<=0)return 0;if(r>=1)return 1;for(e>=1&&o>=1?(a=r<.5?r:1-r,s=(2.30753+.27061*(f=t.sqrt(-2*t.log(a))))/(1+f*(.99229+.04481*f))-f,r<.5&&(s=-s),m=(s*s-3)/6,p=2/(1/(2*e-1)+1/(2*o-1)),g=s*t.sqrt(m+p)/p-(1/(2*o-1)-1/(2*e-1))*(m+5/6-2/(3*p)),s=e/(e+o*t.exp(2*g))):(i=t.log(e/(e+o)),u=t.log(o/(e+o)),s=r<(f=t.exp(e*i)/e)/(g=f+(c=t.exp(o*u)/o))?t.pow(e*g*r,1/e):1-t.pow(o*g*(1-r),1/o)),d=-n.gammaln(e)-n.gammaln(o)+n.gammaln(e+o);y<10;y++){if(0===s||1===s)return s;if(l=n.ibeta(s,e,o)-r,f=t.exp(h*t.log(s)+v*t.log(1-s)+d),c=l/f,(s-=f=c/(1-.5*t.min(1,c*(h/s-v/(1-s)))))<=0&&(s=.5*(s+f)),s>=1&&(s=.5*(s+f+1)),t.abs(f)<1e-8*s&&y>0)break}return s},n.ibeta=function(r,e,o){var i=0===r||1===r?0:t.exp(n.gammaln(e+o)-n.gammaln(e)-n.gammaln(o)+e*t.log(r)+o*t.log(1-r));return!(r<0||r>1)&&(r<(e+1)/(e+o+2)?i*n.betacf(r,e,o)/e:1-i*n.betacf(1-r,o,e)/o)},n.randn=function(r,e){var o,i,u,a,f;if(e||(e=r),r)return n.create(r,e,function(){return n.randn()});do{o=t.random(),i=1.7156*(t.random()-.5),f=(u=o-.449871)*u+(a=t.abs(i)+.386595)*(.196*a-.25472*u)}while(f>.27597&&(f>.27846||i*i>-4*t.log(o)*o*o));return i/o},n.randg=function(r,e,o){var i,u,a,f,c,l,s=r;if(o||(o=e),r||(r=1),e)return(l=n.zeros(e,o)).alter(function(){return n.randg(r)}),l;r<1&&(r+=1),i=r-1/3,u=1/t.sqrt(9*i);do{do{f=1+u*(c=n.randn())}while(f<=0);f*=f*f,a=t.random()}while(a>1-.331*t.pow(c,4)&&t.log(a)>.5*c*c+i*(1-f+t.log(f)));if(r==s)return i*f;do{a=t.random()}while(0===a);return t.pow(a,1/s)*i*f},function(t){for(var r=0;r<t.length;r++)!function(t){n.fn[t]=function(){return n(n.map(this,function(r){return n[t](r)}))}}(t[r])}("gammaln gammafn factorial factorialln".split(" ")),function(t){for(var r=0;r<t.length;r++)!function(t){n.fn[t]=function(){return n(n[t].apply(null,arguments))}}(t[r])}("randn".split(" "))}(this.jStat,Math),function(n,t){!function(t){for(var r=0;r<t.length;r++)!function(t){n[t]=function(n,t,r){return this instanceof arguments.callee?(this._a=n,this._b=t,this._c=r,this):new arguments.callee(n,t,r)},n.fn[t]=function(r,e,o){var i=n[t](r,e,o);return i.data=this,i},n[t].prototype.sample=function(r){var e=this._a,o=this._b,i=this._c;return r?n.alter(r,function(){return n[t].sample(e,o,i)}):n[t].sample(e,o,i)},function(r){for(var e=0;e<r.length;e++)!function(r){n[t].prototype[r]=function(e){var o=this._a,i=this._b,u=this._c;return e||0===e||(e=this.data),"number"!=typeof e?n.fn.map.call(e,function(e){return n[t][r](e,o,i,u)}):n[t][r](e,o,i,u)}}(r[e])}("pdf cdf inv".split(" ")),function(r){for(var e=0;e<r.length;e++)!function(r){n[t].prototype[r]=function(){return n[t][r](this._a,this._b,this._c)}}(r[e])}("mean median mode variance".split(" "))}(t[r])}("beta centralF cauchy chisquare exponential gamma invgamma kumaraswamy lognormal normal pareto studentt weibull uniform  binomial negbin hypgeom poisson triangular".split(" ")),n.extend(n.beta,{pdf:function(r,e,o){return r>1||r<0?0:1==e&&1==o?1:e<512||o<512?t.pow(r,e-1)*t.pow(1-r,o-1)/n.betafn(e,o):t.exp((e-1)*t.log(r)+(o-1)*t.log(1-r)-n.betaln(e,o))},cdf:function(t,r,e){return t>1||t<0?1*(t>1):n.ibeta(t,r,e)},inv:function(t,r,e){return n.ibetainv(t,r,e)},mean:function(n,t){return n/(n+t)},median:function(n,t){throw new Error("median not yet implemented")},mode:function(n,r){return n*r/(t.pow(n+r,2)*(n+r+1))},sample:function(t,r){var e=n.randg(t);return e/(e+n.randg(r))},variance:function(n,r){return n*r/(t.pow(n+r,2)*(n+r+1))}}),n.extend(n.centralF,{pdf:function(r,e,o){if(!(r<0))return t.sqrt(t.pow(e*r,e)*t.pow(o,o)/t.pow(e*r+o,e+o))/(r*n.betafn(e/2,o/2))},cdf:function(t,r,e){return n.ibeta(r*t/(r*t+e),r/2,e/2)},inv:function(t,r,e){return e/(r*(1/n.ibetainv(t,r/2,e/2)-1))},mean:function(n,t){return t>2?t/(t-2):void 0},mode:function(n,t){return n>2?t*(n-2)/(n*(t+2)):void 0},sample:function(t,r){return 2*n.randg(t/2)/t/(2*n.randg(r/2)/r)},variance:function(n,t){if(!(t<=4))return 2*t*t*(n+t-2)/(n*(t-2)*(t-2)*(t-4))}}),n.extend(n.cauchy,{pdf:function(n,r,e){return e/(t.pow(n-r,2)+t.pow(e,2))/t.PI},cdf:function(n,r,e){return t.atan((n-r)/e)/t.PI+.5},inv:function(n,r,e){return r+e*t.tan(t.PI*(n-.5))},median:function(n,t){return n},mode:function(n,t){return n},sample:function(r,e){return n.randn()*t.sqrt(1/(2*n.randg(.5)))*e+r}}),n.extend(n.chisquare,{pdf:function(r,e){return t.exp((e/2-1)*t.log(r)-r/2-e/2*t.log(2)-n.gammaln(e/2))},cdf:function(t,r){return n.gammap(r/2,t/2)},inv:function(t,r){return 2*n.gammapinv(t,.5*r)},mean:function(n){return n},median:function(n){return n*t.pow(1-2/(9*n),3)},mode:function(n){return n-2>0?n-2:0},sample:function(t){return 2*n.randg(t/2)},variance:function(n){return 2*n}}),n.extend(n.exponential,{pdf:function(n,r){return n<0?0:r*t.exp(-r*n)},cdf:function(n,r){return n<0?0:1-t.exp(-r*n)},inv:function(n,r){return-t.log(1-n)/r},mean:function(n){return 1/n},median:function(n){return 1/n*t.log(2)},mode:function(n){return 0},sample:function(n){return-1/n*t.log(t.random())},variance:function(n){return t.pow(n,-2)}}),n.extend(n.gamma,{pdf:function(r,e,o){return t.exp((e-1)*t.log(r)-r/o-n.gammaln(e)-e*t.log(o))},cdf:function(t,r,e){return n.gammap(r,t/e)},inv:function(t,r,e){return n.gammapinv(t,r)*e},mean:function(n,t){return n*t},mode:function(n,t){if(n>1)return(n-1)*t},sample:function(t,r){return n.randg(t)*r},variance:function(n,t){return n*t*t}}),n.extend(n.invgamma,{pdf:function(r,e,o){return t.exp(-(e+1)*t.log(r)-o/r-n.gammaln(e)+e*t.log(o))},cdf:function(t,r,e){return 1-n.gammap(r,e/t)},inv:function(t,r,e){return e/n.gammapinv(1-t,r)},mean:function(n,t){return n>1?t/(n-1):void 0},mode:function(n,t){return t/(n+1)},sample:function(t,r){return r/n.randg(t)},variance:function(n,t){if(!(n<=2))return t*t/((n-1)*(n-1)*(n-2))}}),n.extend(n.kumaraswamy,{pdf:function(n,r,e){return t.exp(t.log(r)+t.log(e)+(r-1)*t.log(n)+(e-1)*t.log(1-t.pow(n,r)))},cdf:function(n,r,e){return 1-t.pow(1-t.pow(n,r),e)},mean:function(t,r){return r*n.gammafn(1+1/t)*n.gammafn(r)/n.gammafn(1+1/t+r)},median:function(n,r){return t.pow(1-t.pow(2,-1/r),1/n)},mode:function(n,r){if(n>=1&&r>=1&&1!==n&&1!==r)return t.pow((n-1)/(n*r-1),1/n)},variance:function(n,t){throw new Error("variance not yet implemented")}}),n.extend(n.lognormal,{pdf:function(n,r,e){return t.exp(-t.log(n)-.5*t.log(2*t.PI)-t.log(e)-t.pow(t.log(n)-r,2)/(2*e*e))},cdf:function(r,e,o){return.5+.5*n.erf((t.log(r)-e)/t.sqrt(2*o*o))},inv:function(r,e,o){return t.exp(-1.4142135623730951*o*n.erfcinv(2*r)+e)},mean:function(n,r){return t.exp(n+r*r/2)},median:function(n,r){return t.exp(n)},mode:function(n,r){return t.exp(n-r*r)},sample:function(r,e){return t.exp(n.randn()*e+r)},variance:function(n,r){return(t.exp(r*r)-1)*t.exp(2*n+r*r)}}),n.extend(n.normal,{pdf:function(n,r,e){return t.exp(-.5*t.log(2*t.PI)-t.log(e)-t.pow(n-r,2)/(2*e*e))},cdf:function(r,e,o){return.5*(1+n.erf((r-e)/t.sqrt(2*o*o)))},inv:function(t,r,e){return-1.4142135623730951*e*n.erfcinv(2*t)+r},mean:function(n,t){return n},median:function(n,t){return n},mode:function(n,t){return n},sample:function(t,r){return n.randn()*r+t},variance:function(n,t){return t*t}}),n.extend(n.pareto,{pdf:function(n,r,e){if(!(n<=r))return e*t.pow(r,e)/t.pow(n,e+1)},cdf:function(n,r,e){return 1-t.pow(r/n,e)},mean:function(n,r){if(!(r<=1))return r*t.pow(n,r)/(r-1)},median:function(n,r){return n*(r*t.SQRT2)},mode:function(n,t){return n},variance:function(n,r){if(!(r<=2))return n*n*r/(t.pow(r-1,2)*(r-2))}}),n.extend(n.studentt,{pdf:function(r,e){return n.gammafn((e+1)/2)/(t.sqrt(e*t.PI)*n.gammafn(e/2))*t.pow(1+r*r/e,-(e+1)/2)},cdf:function(r,e){var o=e/2;return n.ibeta((r+t.sqrt(r*r+e))/(2*t.sqrt(r*r+e)),o,o)},inv:function(r,e){var o=n.ibetainv(2*t.min(r,1-r),.5*e,.5);return o=t.sqrt(e*(1-o)/o),r>.5?o:-o},mean:function(n){return n>1?0:void 0},median:function(n){return 0},mode:function(n){return 0},sample:function(r){return n.randn()*t.sqrt(r/(2*n.randg(r/2)))},variance:function(n){return n>2?n/(n-2):n>1?1/0:void 0}}),n.extend(n.weibull,{pdf:function(n,r,e){return n<0?0:e/r*t.pow(n/r,e-1)*t.exp(-t.pow(n/r,e))},cdf:function(n,r,e){return n<0?0:1-t.exp(-t.pow(n/r,e))},inv:function(n,r,e){return r*t.pow(-t.log(1-n),1/e)},mean:function(t,r){return t*n.gammafn(1+1/r)},median:function(n,r){return n*t.pow(t.log(2),1/r)},mode:function(n,r){if(!(r<=1))return n*t.pow((r-1)/r,1/r)},sample:function(n,r){return n*t.pow(-t.log(t.random()),1/r)},variance:function(r,e){return r*r*n.gammafn(1+2/e)-t.pow(this.mean(r,e),2)}}),n.extend(n.uniform,{pdf:function(n,t,r){return n<t||n>r?0:1/(r-t)},cdf:function(n,t,r){return n<t?0:n<r?(n-t)/(r-t):1},mean:function(n,t){return.5*(n+t)},median:function(t,r){return n.mean(t,r)},mode:function(n,t){throw new Error("mode is not yet implemented")},sample:function(n,r){return n/2+r/2+(r/2-n/2)*(2*t.random()-1)},variance:function(n,r){return t.pow(r-n,2)/12}}),n.extend(n.binomial,{pdf:function(r,e,o){return 0===o||1===o?e*o===r?1:0:n.combination(e,r)*t.pow(o,r)*t.pow(1-o,e-r)},cdf:function(t,r,e){var o=[],i=0;if(t<0)return 0;if(t<r){for(;i<=t;i++)o[i]=n.binomial.pdf(i,r,e);return n.sum(o)}return 1}}),n.extend(n.negbin,{pdf:function(r,e,o){return!(r!=r|0)&&(r<0?0:n.combination(r+e-1,e-1)*t.pow(1-o,r)*t.pow(o,e))},cdf:function(t,r,e){var o=0,i=0;if(t<0)return 0;for(;i<=t;i++)o+=n.negbin.pdf(i,r,e);return o}}),n.extend(n.hypgeom,{pdf:function(r,e,o,i){if(r!=r|0)return!1;if(r<0||r<o-(e-i))return 0;if(r>i||r>o)return 0;if(2*o>e)return 2*i>e?n.hypgeom.pdf(e-o-i+r,e,e-o,e-i):n.hypgeom.pdf(i-r,e,e-o,i);if(2*i>e)return n.hypgeom.pdf(o-r,e,o,e-i);if(o<i)return n.hypgeom.pdf(r,e,i,o);for(var u=1,a=0,f=0;f<r;f++){for(;u>1&&a<i;)u*=1-o/(e-a),a++;u*=(i-f)*(o-f)/((f+1)*(e-o-i+f+1))}for(;a<i;a++)u*=1-o/(e-a);return t.min(1,t.max(0,u))},cdf:function(r,e,o,i){if(r<0||r<o-(e-i))return 0;if(r>=i||r>=o)return 1;if(2*o>e)return 2*i>e?n.hypgeom.cdf(e-o-i+r,e,e-o,e-i):1-n.hypgeom.cdf(i-r-1,e,e-o,i);if(2*i>e)return 1-n.hypgeom.cdf(o-r-1,e,o,e-i);if(o<i)return n.hypgeom.cdf(r,e,i,o);for(var u=1,a=1,f=0,c=0;c<r;c++){for(;u>1&&f<i;){var l=1-o/(e-f);a*=l,u*=l,f++}u+=a*=(i-c)*(o-c)/((c+1)*(e-o-i+c+1))}for(;f<i;f++)u*=1-o/(e-f);return t.min(1,t.max(0,u))}}),n.extend(n.poisson,{pdf:function(r,e){return t.pow(e,r)*t.exp(-e)/n.factorial(r)},cdf:function(t,r){var e=[],o=0;if(t<0)return 0;for(;o<=t;o++)e.push(n.poisson.pdf(o,r));return n.sum(e)},mean:function(n){return n},variance:function(n){return n},sample:function(n){var r=1,e=0,o=t.exp(-n);do{e++,r*=t.random()}while(r>o);return e-1}}),n.extend(n.triangular,{pdf:function(n,t,r,e){return r<=t||e<t||e>r?void 0:n<t||n>r?0:n<=e?2*(n-t)/((r-t)*(e-t)):2*(r-n)/((r-t)*(r-e))},cdf:function(n,r,e,o){if(!(e<=r||o<r||o>e))return n<r?0:n<=o?t.pow(n-r,2)/((e-r)*(o-r)):1-t.pow(e-n,2)/((e-r)*(e-o))},mean:function(n,t,r){return(n+t+r)/3},median:function(n,r,e){return e<=(n+r)/2?r-t.sqrt((r-n)*(r-e))/t.sqrt(2):e>(n+r)/2?n+t.sqrt((r-n)*(e-n))/t.sqrt(2):void 0},mode:function(n,t,r){return r},sample:function(n,r,e){var o=t.random();return o<(e-n)/(r-n)?n+t.sqrt(o*(r-n)*(e-n)):r-t.sqrt((1-o)*(r-n)*(r-e))},variance:function(n,t,r){return(n*n+t*t+r*r-n*t-n*r-t*r)/18}})}(this.jStat,Math),function(n,t){var r=Array.prototype.push,e=n.utils.isArray;n.extend({add:function(t,r){return e(r)?(e(r[0])||(r=[r]),n.map(t,function(n,t,e){return n+r[t][e]})):n.map(t,function(n){return n+r})},subtract:function(t,r){return e(r)?(e(r[0])||(r=[r]),n.map(t,function(n,t,e){return n-r[t][e]||0})):n.map(t,function(n){return n-r})},divide:function(t,r){return e(r)?(e(r[0])||(r=[r]),n.multiply(t,n.inv(r))):n.map(t,function(n){return n/r})},multiply:function(t,r){var o,i,u,a,f=t.length,c=t[0].length,l=n.zeros(f,u=e(r)?r[0].length:c),s=0;if(e(r)){for(;s<u;s++)for(o=0;o<f;o++){for(a=0,i=0;i<c;i++)a+=t[o][i]*r[i][s];l[o][s]=a}return 1===f&&1===s?l[0][0]:l}return n.map(t,function(n){return n*r})},dot:function(t,r){e(t[0])||(t=[t]),e(r[0])||(r=[r]);for(var o,i,u=1===t[0].length&&1!==t.length?n.transpose(t):t,a=1===r[0].length&&1!==r.length?n.transpose(r):r,f=[],c=0,l=u.length,s=u[0].length;c<l;c++){for(f[c]=[],o=0,i=0;i<s;i++)o+=u[c][i]*a[c][i];f[c]=o}return 1===f.length?f[0]:f},pow:function(r,e){return n.map(r,function(n){return t.pow(n,e)})},abs:function(r){return n.map(r,function(n){return t.abs(n)})},norm:function(n,r){var o=0,i=0;for(isNaN(r)&&(r=2),e(n[0])&&(n=n[0]);i<n.length;i++)o+=t.pow(t.abs(n[i]),r);return t.pow(o,1/r)},angle:function(r,e){return t.acos(n.dot(r,e)/(n.norm(r)*n.norm(e)))},aug:function(n,t){for(var e=n.slice(),o=0;o<e.length;o++)r.apply(e[o],t[o]);return e},inv:function(t){for(var r,e=t.length,o=t[0].length,i=n.identity(e,o),u=n.gauss_jordan(t,i),a=[],f=0;f<e;f++)for(a[f]=[],r=o-1;r<u[0].length;r++)a[f][r-o]=u[f][r];return a},det:function(n){var t,r=n.length,e=2*r,o=new Array(e),i=r-1,u=e-1,a=i-r+1,f=u,c=0,l=0;if(2===r)return n[0][0]*n[1][1]-n[0][1]*n[1][0];for(;c<e;c++)o[c]=1;for(c=0;c<r;c++){for(t=0;t<r;t++)o[a<0?a+r:a]*=n[c][t],o[f<r?f+r:f]*=n[c][t],a++,f--;a=--i-r+1,f=--u}for(c=0;c<r;c++)l+=o[c];for(;c<e;c++)l-=o[c];return l},gauss_elimination:function(r,e){var o,i,u,a,f=0,c=0,l=r.length,s=r[0].length,m=1,p=0,g=[];for(o=(r=n.aug(r,e))[0].length;f<l;f++){for(i=r[f][f],c=f,a=f+1;a<s;a++)i<t.abs(r[a][f])&&(i=r[a][f],c=a);if(c!=f)for(a=0;a<o;a++)u=r[f][a],r[f][a]=r[c][a],r[c][a]=u;for(c=f+1;c<l;c++)for(m=r[c][f]/r[f][f],a=f;a<o;a++)r[c][a]=r[c][a]-m*r[f][a]}for(f=l-1;f>=0;f--){for(p=0,c=f+1;c<=l-1;c++)p=g[c]*r[f][c];g[f]=(r[f][o-1]-p)/r[f][f]}return g},gauss_jordan:function(r,e){for(var o=n.aug(r,e),i=o.length,u=o[0].length,a=0;a<i;a++){for(var f=a,l=a+1;l<i;l++)t.abs(o[l][a])>t.abs(o[f][a])&&(f=l);var s=o[a];o[a]=o[f],o[f]=s;for(l=a+1;l<i;l++){c=o[l][a]/o[a][a];for(m=a;m<u;m++)o[l][m]-=o[a][m]*c}}for(a=i-1;a>=0;a--){c=o[a][a];for(l=0;l<a;l++)for(m=u-1;m>a-1;m--)o[l][m]-=o[a][m]*o[l][a]/c;o[a][a]/=c;for(var m=i;m<u;m++)o[a][m]/=c}return o},lu:function(n,t){throw new Error("lu not yet implemented")},cholesky:function(n,t){throw new Error("cholesky not yet implemented")},gauss_jacobi:function(r,e,o,i){for(var u,a,f,c,l=0,s=0,m=r.length,p=[],g=[],d=[];l<m;l++)for(p[l]=[],g[l]=[],d[l]=[],s=0;s<m;s++)l>s?(p[l][s]=r[l][s],g[l][s]=d[l][s]=0):l<s?(g[l][s]=r[l][s],p[l][s]=d[l][s]=0):(d[l][s]=r[l][s],p[l][s]=g[l][s]=0);for(f=n.multiply(n.multiply(n.inv(d),n.add(p,g)),-1),a=n.multiply(n.inv(d),e),u=o,c=n.add(n.multiply(f,o),a),l=2;t.abs(n.norm(n.subtract(c,u)))>i;)u=c,c=n.add(n.multiply(f,u),a),l++;return c},gauss_seidel:function(r,e,o,i){for(var u,a,f,c,l,s=0,m=r.length,p=[],g=[],d=[];s<m;s++)for(p[s]=[],g[s]=[],d[s]=[],u=0;u<m;u++)s>u?(p[s][u]=r[s][u],g[s][u]=d[s][u]=0):s<u?(g[s][u]=r[s][u],p[s][u]=d[s][u]=0):(d[s][u]=r[s][u],p[s][u]=g[s][u]=0);for(c=n.multiply(n.multiply(n.inv(n.add(d,p)),g),-1),f=n.multiply(n.inv(n.add(d,p)),e),a=o,l=n.add(n.multiply(c,o),f),s=2;t.abs(n.norm(n.subtract(l,a)))>i;)a=l,l=n.add(n.multiply(c,a),f),s+=1;return l},SOR:function(r,e,o,i,u){for(var a,f,c,l,s,m=0,p=r.length,g=[],d=[],h=[];m<p;m++)for(g[m]=[],d[m]=[],h[m]=[],a=0;a<p;a++)m>a?(g[m][a]=r[m][a],d[m][a]=h[m][a]=0):m<a?(d[m][a]=r[m][a],g[m][a]=h[m][a]=0):(h[m][a]=r[m][a],g[m][a]=d[m][a]=0);for(l=n.multiply(n.inv(n.add(h,n.multiply(g,u))),n.subtract(n.multiply(h,1-u),n.multiply(d,u))),c=n.multiply(n.multiply(n.inv(n.add(h,n.multiply(g,u))),e),u),f=o,s=n.add(n.multiply(l,o),c),m=2;t.abs(n.norm(n.subtract(s,f)))>i;)f=s,s=n.add(n.multiply(l,f),c),m++;return s},householder:function(r){for(var e,o,i,u,a=r.length,f=r[0].length,c=0,l=[],s=[];c<a-1;c++){for(e=0,u=c+1;u<f;u++)e+=r[u][c]*r[u][c];for(e=(r[c+1][c]>0?-1:1)*t.sqrt(e),o=t.sqrt((e*e-r[c+1][c]*e)/2),(l=n.zeros(a,1))[c+1][0]=(r[c+1][c]-e)/(2*o),i=c+2;i<a;i++)l[i][0]=r[i][c]/(2*o);s=n.subtract(n.identity(a,f),n.multiply(n.multiply(l,n.transpose(l)),2)),r=n.multiply(s,n.multiply(r,s))}return r},QR:function(r,e){for(var o,i,u,a,f=r.length,c=r[0].length,l=0,s=[],m=[],p=[];l<f-1;l++){for(i=0,o=l+1;o<c;o++)i+=r[o][l]*r[o][l];for(i=(r[l+1][l]>0?-1:1)*t.sqrt(i),u=t.sqrt((i*i-r[l+1][l]*i)/2),(s=n.zeros(f,1))[l+1][0]=(r[l+1][l]-i)/(2*u),a=l+2;a<f;a++)s[a][0]=r[a][l]/(2*u);m=n.subtract(n.identity(f,c),n.multiply(n.multiply(s,n.transpose(s)),2)),r=n.multiply(m,r),e=n.multiply(m,e)}for(l=f-1;l>=0;l--){for(0,o=l+1;o<=c-1;o++)p[o]*r[l][o];p[l]=e[l][0]/r[l][l]}return p},jacobi:function(r){for(var e,o,i,u,a,f,c,l=1,s=r.length,m=n.identity(s,s),p=[];1===l;){for(0,a=r[0][1],i=0,u=1,e=0;e<s;e++)for(o=0;o<s;o++)e!=o&&a<t.abs(r[e][o])&&(a=t.abs(r[e][o]),i=e,u=o);for(f=r[i][i]===r[u][u]?r[i][u]>0?t.PI/4:-t.PI/4:t.atan(2*r[i][u]/(r[i][i]-r[u][u]))/2,(c=n.identity(s,s))[i][i]=t.cos(f),c[i][u]=-t.sin(f),c[u][i]=t.sin(f),c[u][u]=t.cos(f),m=n.multiply(m,c),r=n.multiply(n.multiply(n.inv(c),r),c),l=0,e=1;e<s;e++)for(o=1;o<s;o++)e!=o&&t.abs(r[e][o])>.001&&(l=1)}for(e=0;e<s;e++)p.push(r[e][e]);return[m,p]},rungekutta:function(n,t,r,e,o,i){var u,a,f;if(2===i)for(;e<=r;)o=o+((u=t*n(e,o))+(a=t*n(e+t,o+u)))/2,e+=t;if(4===i)for(;e<=r;)o=o+((u=t*n(e,o))+2*(a=t*n(e+t/2,o+u/2))+2*(f=t*n(e+t/2,o+a/2))+t*n(e+t,o+f))/6,e+=t;return o},romberg:function(n,r,e,o){for(var i,u,a,f,c,l=0,s=(e-r)/2,m=[],p=[],g=[];l<o/2;){for(c=n(r),a=r,f=0;a<=e;a+=s,f++)m[f]=a;for(i=m.length,a=1;a<i-1;a++)c+=(a%2!=0?4:2)*n(m[a]);c=s/3*(c+n(e)),g[l]=c,s/=2,l++}for(u=g.length,i=1;1!==u;){for(a=0;a<u-1;a++)p[a]=(t.pow(4,i)*g[a+1]-g[a])/(t.pow(4,i)-1);u=p.length,g=p,p=[],i++}return g},richardson:function(n,r,e,o){function i(n,t){for(var r,e=0,o=n.length;e<o;e++)n[e]===t&&(r=e);return r}n.length;for(var u,a,f,c,l,s=t.abs(e-n[i(n,e)+1]),m=0,p=[],g=[];o>=s;)u=i(n,e+o),a=i(n,e),p[m]=(r[u]-2*r[a]+r[2*a-u])/(o*o),o/=2,m++;for(c=p.length,f=1;1!=c;){for(l=0;l<c-1;l++)g[l]=(t.pow(4,f)*p[l+1]-p[l])/(t.pow(4,f)-1);c=g.length,p=g,g=[],f++}return p},simpson:function(n,t,r,e){for(var o,i=(r-t)/e,u=n(t),a=[],f=t,c=0,l=1;f<=r;f+=i,c++)a[c]=f;for(o=a.length;l<o-1;l++)u+=(l%2!=0?4:2)*n(a[l]);return i/3*(u+n(r))},hermite:function(n,t,r,e){for(var o,i=n.length,u=0,a=0,f=[],c=[],l=[],s=[];a<i;a++){for(f[a]=1,o=0;o<i;o++)a!=o&&(f[a]*=(e-n[o])/(n[a]-n[o]));for(c[a]=0,o=0;o<i;o++)a!=o&&(c[a]+=1/(n[a]-n[o]));l[a]=(1-2*(e-n[a])*c[a])*(f[a]*f[a]),s[a]=(e-n[a])*(f[a]*f[a]),u+=l[a]*t[a]+s[a]*r[a]}return u},lagrange:function(n,t,r){for(var e,o,i=0,u=0,a=n.length;u<a;u++){for(o=t[u],e=0;e<a;e++)u!=e&&(o*=(r-n[e])/(n[u]-n[e]));i+=o}return i},cubic_spline:function(t,r,e){for(var o,i=t.length,u=0,a=[],f=[],c=[],l=[],s=[],m=[],p=[];u<i-1;u++)s[u]=t[u+1]-t[u];for(c[0]=0,u=1;u<i-1;u++)c[u]=3/s[u]*(r[u+1]-r[u])-3/s[u-1]*(r[u]-r[u-1]);for(u=1;u<i-1;u++)a[u]=[],f[u]=[],a[u][u-1]=s[u-1],a[u][u]=2*(s[u-1]+s[u]),a[u][u+1]=s[u],f[u][0]=c[u];for(l=n.multiply(n.inv(a),f),o=0;o<i-1;o++)m[o]=(r[o+1]-r[o])/s[o]-s[o]*(l[o+1][0]+2*l[o][0])/3,p[o]=(l[o+1][0]-l[o][0])/(3*s[o]);for(o=0;o<i&&!(t[o]>e);o++);return o-=1,r[o]+(e-t[o])*m[o]+n.sq(e-t[o])*l[o]+(e-t[o])*n.sq(e-t[o])*p[o]},gauss_quadrature:function(){throw new Error("gauss_quadrature not yet implemented")},PCA:function(t){var r,e,o=t.length,i=t[0].length,u=0,a=[],f=[],c=[],l=[],s=[],m=[],p=[],g=[],d=[],h=[];for(u=0;u<o;u++)a[u]=n.sum(t[u])/i;for(u=0;u<i;u++)for(p[u]=[],r=0;r<o;r++)p[u][r]=t[r][u]-a[r];for(p=n.transpose(p),u=0;u<o;u++)for(g[u]=[],r=0;r<o;r++)g[u][r]=n.dot([p[u]],[p[r]])/(i-1);for(d=(c=n.jacobi(g))[0],f=c[1],h=n.transpose(d),u=0;u<f.length;u++)for(r=u;r<f.length;r++)f[u]<f[r]&&(e=f[u],f[u]=f[r],f[r]=e,l=h[u],h[u]=h[r],h[r]=l);for(m=n.transpose(p),u=0;u<o;u++)for(s[u]=[],r=0;r<m.length;r++)s[u][r]=n.dot([h[u]],[m[r]]);return[t,f,h,s]}}),function(t){for(var r=0;r<t.length;r++)!function(t){n.fn[t]=function(r,e){var o=this;return e?(setTimeout(function(){e.call(o,n.fn[t].call(o,r))},15),this):"number"==typeof n[t](this,r)?n[t](this,r):n(n[t](this,r))}}(t[r])}("add divide multiply subtract dot pow abs norm angle".split(" "))}(this.jStat,Math),function(n,t){var r=[].slice,e=n.utils.isNumber;n.extend({zscore:function(){var t=r.call(arguments);return e(t[1])?(t[0]-t[1])/t[2]:(t[0]-n.mean(t[1]))/n.stdev(t[1],t[2])},ztest:function(){var o=r.call(arguments);if(4===o.length){if(e(o[1])){i=n.zscore(o[0],o[1],o[2]);return 1===o[3]?n.normal.cdf(-t.abs(i),0,1):2*n.normal.cdf(-t.abs(i),0,1)}i=o[0];return 1===o[2]?n.normal.cdf(-t.abs(i),0,1):2*n.normal.cdf(-t.abs(i),0,1)}var i=n.zscore(o[0],o[1],o[3]);return 1===o[1]?n.normal.cdf(-t.abs(i),0,1):2*n.normal.cdf(-t.abs(i),0,1)}}),n.extend(n.fn,{zscore:function(n,t){return(n-this.mean())/this.stdev(t)},ztest:function(r,e,o){var i=t.abs(this.zscore(r,o));return 1===e?n.normal.cdf(-i,0,1):2*n.normal.cdf(-i,0,1)}}),n.extend({tscore:function(){var e=r.call(arguments);return 4===e.length?(e[0]-e[1])/(e[2]/t.sqrt(e[3])):(e[0]-n.mean(e[1]))/(n.stdev(e[1],!0)/t.sqrt(e[1].length))},ttest:function(){var o,i=r.call(arguments);return 5===i.length?(o=t.abs(n.tscore(i[0],i[1],i[2],i[3])),1===i[4]?n.studentt.cdf(-o,i[3]-1):2*n.studentt.cdf(-o,i[3]-1)):e(i[1])?(o=t.abs(i[0]),1==i[2]?n.studentt.cdf(-o,i[1]-1):2*n.studentt.cdf(-o,i[1]-1)):(o=t.abs(n.tscore(i[0],i[1])),1==i[2]?n.studentt.cdf(-o,i[1].length-1):2*n.studentt.cdf(-o,i[1].length-1))}}),n.extend(n.fn,{tscore:function(n){return(n-this.mean())/(this.stdev(!0)/t.sqrt(this.cols()))},ttest:function(r,e){return 1===e?1-n.studentt.cdf(t.abs(this.tscore(r)),this.cols()-1):2*n.studentt.cdf(-t.abs(this.tscore(r)),this.cols()-1)}}),n.extend({anovafscore:function(){var e,o,i,u,a,f,c,l,s=r.call(arguments);if(1===s.length){for(a=new Array(s[0].length),c=0;c<s[0].length;c++)a[c]=s[0][c];s=a}if(2===s.length)return n.variance(s[0])/n.variance(s[1]);for(o=new Array,c=0;c<s.length;c++)o=o.concat(s[c]);for(i=n.mean(o),e=0,c=0;c<s.length;c++)e+=s[c].length*t.pow(n.mean(s[c])-i,2);for(e/=s.length-1,f=0,c=0;c<s.length;c++)for(u=n.mean(s[c]),l=0;l<s[c].length;l++)f+=t.pow(s[c][l]-u,2);return f/=o.length-s.length,e/f},anovaftest:function(){var t,o,i,u,a=r.call(arguments);if(e(a[0]))return 1-n.centralF.cdf(a[0],a[1],a[2]);for(anovafscore=n.anovafscore(a),t=a.length-1,i=0,u=0;u<a.length;u++)i+=a[u].length;return o=i-t-1,1-n.centralF.cdf(anovafscore,t,o)},ftest:function(t,r,e){return 1-n.centralF.cdf(t,r,e)}}),n.extend(n.fn,{anovafscore:function(){return n.anovafscore(this.toArray())},anovaftes:function(){var t,r=0;for(t=0;t<this.length;t++)r+=this[t].length;return n.ftest(this.anovafscore(),this.length-1,r-this.length)}}),n.extend({normalci:function(){var e,o=r.call(arguments),i=new Array(2);return e=4===o.length?t.abs(n.normal.inv(o[1]/2,0,1)*o[2]/t.sqrt(o[3])):t.abs(n.normal.inv(o[1]/2,0,1)*n.stdev(o[2])/t.sqrt(o[2].length)),i[0]=o[0]-e,i[1]=o[0]+e,i},tci:function(){var e,o=r.call(arguments),i=new Array(2);return e=4===o.length?t.abs(n.studentt.inv(o[1]/2,o[3]-1)*o[2]/t.sqrt(o[3])):t.abs(n.studentt.inv(o[1]/2,o[2].length-1)*n.stdev(o[2],!0)/t.sqrt(o[2].length)),i[0]=o[0]-e,i[1]=o[0]+e,i},significant:function(n,t){return n<t}}),n.extend(n.fn,{normalci:function(t,r){return n.normalci(t,r,this.toArray())},tci:function(t,r){return n.tci(t,r,this.toArray())}})}(this.jStat,Math);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-formulajs\\node_modules\\jStat\\dist\\jstat.js","/..\\ff-formulajs\\node_modules\\jStat\\dist",undefined)
},{"_process":79,"buffer":76}],50:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
(function(){function e(e){this._value=e}function n(e,n,t,r){var i,a,u=Math.pow(10,n);return a=(t(e*u)/u).toFixed(n),r&&(i=new RegExp("0{1,"+r+"}$"),a=a.replace(i,"")),a}function t(e,n,t){return n.indexOf("$")>-1?i(e,n,t):n.indexOf("%")>-1?a(e,n,t):n.indexOf(":")>-1?u(e):o(e._value,n,t)}function r(e,n){var t,r,i,a,u,o=n,c=["KB","MB","GB","TB","PB","EB","ZB","YB"],f=!1;if(n.indexOf(":")>-1)e._value=l(n);else if(n===v)e._value=0;else{for("."!==d[p].delimiters.decimal&&(n=n.replace(/\./g,"").replace(d[p].delimiters.decimal,".")),t=new RegExp("[^a-zA-Z]"+d[p].abbreviations.thousand+"(?:\\)|(\\"+d[p].currency.symbol+")?(?:\\))?)?$"),r=new RegExp("[^a-zA-Z]"+d[p].abbreviations.million+"(?:\\)|(\\"+d[p].currency.symbol+")?(?:\\))?)?$"),i=new RegExp("[^a-zA-Z]"+d[p].abbreviations.billion+"(?:\\)|(\\"+d[p].currency.symbol+")?(?:\\))?)?$"),a=new RegExp("[^a-zA-Z]"+d[p].abbreviations.trillion+"(?:\\)|(\\"+d[p].currency.symbol+")?(?:\\))?)?$"),u=0;u<=c.length&&!(f=n.indexOf(c[u])>-1&&Math.pow(1024,u+1));u++);e._value=(f||1)*(o.match(t)?Math.pow(10,3):1)*(o.match(r)?Math.pow(10,6):1)*(o.match(i)?Math.pow(10,9):1)*(o.match(a)?Math.pow(10,12):1)*(n.indexOf("%")>-1?.01:1)*((n.split("-").length+Math.min(n.split("(").length-1,n.split(")").length-1))%2?1:-1)*Number(n.replace(/[^0-9\.]+/g,"")),e._value=f?Math.ceil(e._value):e._value}return e._value}function i(e,n,t){var r,i,a=n.indexOf("$"),u=n.indexOf("("),l=n.indexOf("-"),c="";return n.indexOf(" $")>-1?(c=" ",n=n.replace(" $","")):n.indexOf("$ ")>-1?(c=" ",n=n.replace("$ ","")):n=n.replace("$",""),i=o(e._value,n,t),a<=1?i.indexOf("(")>-1||i.indexOf("-")>-1?(i=i.split(""),r=1,(a<u||a<l)&&(r=0),i.splice(r,0,d[p].currency.symbol+c),i=i.join("")):i=d[p].currency.symbol+c+i:i.indexOf(")")>-1?((i=i.split("")).splice(-1,0,c+d[p].currency.symbol),i=i.join("")):i=i+c+d[p].currency.symbol,i}function a(e,n,t){var r,i="",a=100*e._value;return n.indexOf(" %")>-1?(i=" ",n=n.replace(" %","")):n=n.replace("%",""),(r=o(a,n,t)).indexOf(")")>-1?((r=r.split("")).splice(-1,0,i+"%"),r=r.join("")):r=r+i+"%",r}function u(e){var n=Math.floor(e._value/60/60),t=Math.floor((e._value-60*n*60)/60),r=Math.round(e._value-60*n*60-60*t);return n+":"+(t<10?"0"+t:t)+":"+(r<10?"0"+r:r)}function l(e){var n=e.split(":"),t=0;return 3===n.length?(t+=60*Number(n[0])*60,t+=60*Number(n[1]),t+=Number(n[2])):2===n.length&&(t+=60*Number(n[0]),t+=Number(n[1])),Number(t)}function o(e,t,r){var i,a,u,l,o,c,f=!1,s=!1,h=!1,b="",m=!1,y=!1,g=!1,x=!1,w=!1,O="",M="",_=Math.abs(e),B=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],N="",$=!1;if(0===e&&null!==v)return v;if(t.indexOf("(")>-1?(f=!0,t=t.slice(1,-1)):t.indexOf("+")>-1&&(s=!0,t=t.replace(/\+/g,"")),t.indexOf("a")>-1&&(m=t.indexOf("aK")>=0,y=t.indexOf("aM")>=0,g=t.indexOf("aB")>=0,x=t.indexOf("aT")>=0,w=m||y||g||x,t.indexOf(" a")>-1?(b=" ",t=t.replace(" a","")):t=t.replace("a",""),_>=Math.pow(10,12)&&!w||x?(b+=d[p].abbreviations.trillion,e/=Math.pow(10,12)):_<Math.pow(10,12)&&_>=Math.pow(10,9)&&!w||g?(b+=d[p].abbreviations.billion,e/=Math.pow(10,9)):_<Math.pow(10,9)&&_>=Math.pow(10,6)&&!w||y?(b+=d[p].abbreviations.million,e/=Math.pow(10,6)):(_<Math.pow(10,6)&&_>=Math.pow(10,3)&&!w||m)&&(b+=d[p].abbreviations.thousand,e/=Math.pow(10,3))),t.indexOf("b")>-1)for(t.indexOf(" b")>-1?(O=" ",t=t.replace(" b","")):t=t.replace("b",""),u=0;u<=B.length;u++)if(i=Math.pow(1024,u),a=Math.pow(1024,u+1),e>=i&&e<a){O+=B[u],i>0&&(e/=i);break}return t.indexOf("o")>-1&&(t.indexOf(" o")>-1?(M=" ",t=t.replace(" o","")):t=t.replace("o",""),M+=d[p].ordinal(e)),t.indexOf("[.]")>-1&&(h=!0,t=t.replace("[.]",".")),l=e.toString().split(".")[0],o=t.split(".")[1],c=t.indexOf(","),o?(l=(N=o.indexOf("[")>-1?n(e,(o=(o=o.replace("]","")).split("["))[0].length+o[1].length,r,o[1].length):n(e,o.length,r)).split(".")[0],N=N.split(".")[1].length?d[p].delimiters.decimal+N.split(".")[1]:"",h&&0===Number(N.slice(1))&&(N="")):l=n(e,null,r),l.indexOf("-")>-1&&(l=l.slice(1),$=!0),c>-1&&(l=l.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+d[p].delimiters.thousands)),0===t.indexOf(".")&&(l=""),(f&&$?"(":"")+(!f&&$?"-":"")+(!$&&s?"+":"")+l+N+(M||"")+(b||"")+(O||"")+(f&&$?")":"")}function c(e,n){d[e]=n}function f(e){var n=e.toString().split(".");return n.length<2?1:Math.pow(10,n[1].length)}function s(){return Array.prototype.slice.call(arguments).reduce(function(e,n){var t=f(e),r=f(n);return t>r?t:r},-1/0)}var h,d={},p="en",v=null,b="0,0",m="undefined"!=typeof module&&module.exports;(h=function(n){return h.isNumeral(n)?n=n.value():0===n||void 0===n?n=0:Number(n)||(n=h.fn.unformat(n)),new e(Number(n))}).version="1.5.3",h.isNumeral=function(n){return n instanceof e},h.language=function(e,n){if(!e)return p;if(e&&!n){if(!d[e])throw new Error("Unknown language : "+e);p=e}return!n&&d[e]||c(e,n),h},h.languageData=function(e){if(!e)return d[p];if(!d[e])throw new Error("Unknown language : "+e);return d[e]},h.language("en",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(e){var n=e%10;return 1==~~(e%100/10)?"th":1===n?"st":2===n?"nd":3===n?"rd":"th"},currency:{symbol:"$"}}),h.zeroFormat=function(e){v="string"==typeof e?e:null},h.defaultFormat=function(e){b="string"==typeof e?e:"0.0"},"function"!=typeof Array.prototype.reduce&&(Array.prototype.reduce=function(e,n){"use strict";if(null===this||void 0===this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!=typeof e)throw new TypeError(e+" is not a function");var t,r,i=this.length>>>0,a=!1;for(1<arguments.length&&(r=n,a=!0),t=0;i>t;++t)this.hasOwnProperty(t)&&(a?r=e(r,this[t],t,this):(r=this[t],a=!0));if(!a)throw new TypeError("Reduce of empty array with no initial value");return r}),h.fn=e.prototype={clone:function(){return h(this)},format:function(e,n){return t(this,e||b,void 0!==n?n:Math.round)},unformat:function(e){return"[object Number]"===Object.prototype.toString.call(e)?e:r(this,e||b)},value:function(){return this._value},valueOf:function(){return this._value},set:function(e){return this._value=Number(e),this},add:function(e){var n=s.call(null,this._value,e);return this._value=[this._value,e].reduce(function(e,t,r,i){return e+n*t},0)/n,this},subtract:function(e){var n=s.call(null,this._value,e);return this._value=[e].reduce(function(e,t,r,i){return e-n*t},this._value*n)/n,this},multiply:function(e){return this._value=[this._value,e].reduce(function(e,n,t,r){var i=s(e,n);return e*i*(n*i)/(i*i)},1),this},divide:function(e){return this._value=[this._value,e].reduce(function(e,n,t,r){var i=s(e,n);return e*i/(n*i)}),this},difference:function(e){return Math.abs(h(this._value).subtract(e).value())}},m&&(module.exports=h),"undefined"==typeof ender&&(this.numeral=h),"function"==typeof define&&define.amd&&define([],function(){return h})}).call(this);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-formulajs\\node_modules\\numeral\\numeral.js","/..\\ff-formulajs\\node_modules\\numeral",undefined)
},{"_process":79,"buffer":76}],51:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
"use strict";var numeric="undefined"==typeof exports?function(){}:exports;"undefined"!=typeof global&&(global.numeric=numeric),numeric.version="1.2.6",numeric.bench=function(r,n){var e,i,t,u;for(void 0===n&&(n=15),t=.5,e=new Date;;){for(u=t*=2;u>3;u-=4)r(),r(),r(),r();for(;u>0;)r(),u--;if((i=new Date)-e>n)break}for(u=t;u>3;u-=4)r(),r(),r(),r();for(;u>0;)r(),u--;return i=new Date,1e3*(3*t-1)/(i-e)},numeric._myIndexOf=function(r){var n,e=this.length;for(n=0;n<e;++n)if(this[n]===r)return n;return-1},numeric.myIndexOf=Array.prototype.indexOf?Array.prototype.indexOf:numeric._myIndexOf,numeric.Function=Function,numeric.precision=4,numeric.largeArray=50,numeric.prettyPrint=function(r){function n(r){if(0===r)return"0";if(isNaN(r))return"NaN";if(r<0)return"-"+n(-r);if(isFinite(r)){var e=Math.floor(Math.log(r)/Math.log(10)),i=r/Math.pow(10,e),t=i.toPrecision(numeric.precision);return 10===parseFloat(t)&&(e++,t=(i=1).toPrecision(numeric.precision)),parseFloat(t).toString()+"e"+e.toString()}return"Infinity"}function e(r){var t;if(void 0===r)return i.push(Array(numeric.precision+8).join(" ")),!1;if("string"==typeof r)return i.push('"'+r+'"'),!1;if("boolean"==typeof r)return i.push(r.toString()),!1;if("number"==typeof r){var u=n(r),o=r.toPrecision(numeric.precision),c=parseFloat(r.toString()).toString(),a=[u,o,c,parseFloat(o).toString(),parseFloat(c).toString()];for(t=1;t<a.length;t++)a[t].length<u.length&&(u=a[t]);return i.push(Array(numeric.precision+8-u.length).join(" ")+u),!1}if(null===r)return i.push("null"),!1;if("function"==typeof r){i.push(r.toString());f=!1;for(t in r)r.hasOwnProperty(t)&&(f?i.push(",\n"):i.push("\n{"),f=!0,i.push(t),i.push(": \n"),e(r[t]));return f&&i.push("}\n"),!0}if(r instanceof Array){if(r.length>numeric.largeArray)return i.push("...Large Array..."),!0;f=!1;for(i.push("["),t=0;t<r.length;t++)t>0&&(i.push(","),f&&i.push("\n ")),f=e(r[t]);return i.push("]"),!0}i.push("{");var f=!1;for(t in r)r.hasOwnProperty(t)&&(f&&i.push(",\n"),f=!0,i.push(t),i.push(": \n"),e(r[t]));return i.push("}"),!0}var i=[];return e(r),i.join("")},numeric.parseDate=function(r){function n(r){if("string"==typeof r)return Date.parse(r.replace(/-/g,"/"));if(!(r instanceof Array))throw new Error("parseDate: parameter must be arrays of strings");var e,i=[];for(e=0;e<r.length;e++)i[e]=n(r[e]);return i}return n(r)},numeric.parseFloat=function(r){function n(r){if("string"==typeof r)return parseFloat(r);if(!(r instanceof Array))throw new Error("parseFloat: parameter must be arrays of strings");var e,i=[];for(e=0;e<r.length;e++)i[e]=n(r[e]);return i}return n(r)},numeric.parseCSV=function(r){var n,e,i=r.split("\n"),t=[],u=/(([^'",]*)|('[^']*')|("[^"]*")),/g,o=/^\s*(([+-]?[0-9]+(\.[0-9]*)?(e[+-]?[0-9]+)?)|([+-]?[0-9]*(\.[0-9]+)?(e[+-]?[0-9]+)?))\s*$/,c=0;for(e=0;e<i.length;e++){var a,f=(i[e]+",").match(u);if(f.length>0){for(t[c]=[],n=0;n<f.length;n++)a=function(r){return r.substr(0,r.length-1)}(f[n]),o.test(a)?t[c][n]=parseFloat(a):t[c][n]=a;c++}}return t},numeric.toCSV=function(r){var n,e,i,t,u,o=numeric.dim(r);for(i=o[0],o[1],u=[],n=0;n<i;n++){for(t=[],e=0;e<i;e++)t[e]=r[n][e].toString();u[n]=t.join(", ")}return u.join("\n")+"\n"},numeric.getURL=function(r){var n=new XMLHttpRequest;return n.open("GET",r,!1),n.send(),n},numeric.imageURL=function(r){function n(r,n,e){void 0===n&&(n=0),void 0===e&&(e=r.length);var i,t=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,936918e3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],u=-1;r.length;for(i=n;i<e;i++)u=u>>>8^t[255&(u^r[i])];return-1^u}var e,i,t,u,o,c,a,f,m,s,h=r[0].length,l=r[0][0].length,p=[137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,l>>24&255,l>>16&255,l>>8&255,255&l,h>>24&255,h>>16&255,h>>8&255,255&h,8,2,0,0,0,-1,-2,-3,-4,-5,-6,-7,-8,73,68,65,84,8,29];for(s=n(p,12,29),p[29]=s>>24&255,p[30]=s>>16&255,p[31]=s>>8&255,p[32]=255&s,e=1,i=0,a=0;a<h;a++){for(a<h-1?p.push(0):p.push(1),o=3*l+1+(0===a)&255,c=3*l+1+(0===a)>>8&255,p.push(o),p.push(c),p.push(255&~o),p.push(255&~c),0===a&&p.push(0),f=0;f<l;f++)for(t=0;t<3;t++)i=(i+(e=(e+(o=(o=r[t][a][f])>255?255:o<0?0:Math.round(o)))%65521))%65521,p.push(o);p.push(0)}return m=(i<<16)+e,p.push(m>>24&255),p.push(m>>16&255),p.push(m>>8&255),p.push(255&m),u=p.length-41,p[33]=u>>24&255,p[34]=u>>16&255,p[35]=u>>8&255,p[36]=255&u,s=n(p,37),p.push(s>>24&255),p.push(s>>16&255),p.push(s>>8&255),p.push(255&s),p.push(0),p.push(0),p.push(0),p.push(0),p.push(73),p.push(69),p.push(78),p.push(68),p.push(174),p.push(66),p.push(96),p.push(130),"data:image/png;base64,"+function(r){var n,e,i,t,u,o,c,a,f=r.length,m="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",s="";for(n=0;n<f;n+=3)u=(e=r[n])>>2,o=((3&e)<<4)+((i=r[n+1])>>4),c=((15&i)<<2)+((t=r[n+2])>>6),a=63&t,n+1>=f?c=a=64:n+2>=f&&(a=64),s+=m.charAt(u)+m.charAt(o)+m.charAt(c)+m.charAt(a);return s}(p)},numeric._dim=function(r){for(var n=[];"object"==typeof r;)n.push(r.length),r=r[0];return n},numeric.dim=function(r){var n;return"object"==typeof r?"object"==typeof(n=r[0])?"object"==typeof n[0]?numeric._dim(r):[r.length,n.length]:[r.length]:[]},numeric.mapreduce=function(r,n){return Function("x","accum","_s","_k",'if(typeof accum === "undefined") accum = '+n+';\nif(typeof x === "number") { var xi = x; '+r+'; return accum; }\nif(typeof _s === "undefined") _s = numeric.dim(x);\nif(typeof _k === "undefined") _k = 0;\nvar _n = _s[_k];\nvar i,xi;\nif(_k < _s.length-1) {\n    for(i=_n-1;i>=0;i--) {\n        accum = arguments.callee(x[i],accum,_s,_k+1);\n    }    return accum;\n}\nfor(i=_n-1;i>=1;i-=2) { \n    xi = x[i];\n    '+r+";\n    xi = x[i-1];\n    "+r+";\n}\nif(i === 0) {\n    xi = x[i];\n    "+r+"\n}\nreturn accum;")},numeric.mapreduce2=function(r,n){return Function("x","var n = x.length;\nvar i,xi;\n"+n+";\nfor(i=n-1;i!==-1;--i) { \n    xi = x[i];\n    "+r+";\n}\nreturn accum;")},numeric.same=function r(n,e){var i,t;if(!(n instanceof Array&&e instanceof Array))return!1;if((t=n.length)!==e.length)return!1;for(i=0;i<t;i++)if(n[i]!==e[i]){if("object"!=typeof n[i])return!1;if(!r(n[i],e[i]))return!1}return!0},numeric.rep=function(r,n,e){void 0===e&&(e=0);var i,t=r[e],u=Array(t);if(e===r.length-1){for(i=t-2;i>=0;i-=2)u[i+1]=n,u[i]=n;return-1===i&&(u[0]=n),u}for(i=t-1;i>=0;i--)u[i]=numeric.rep(r,n,e+1);return u},numeric.dotMMsmall=function(r,n){var e,i,t,u,o,c,a,f,m,s,h;for(u=r.length,o=n.length,c=n[0].length,a=Array(u),e=u-1;e>=0;e--){for(f=Array(c),m=r[e],t=c-1;t>=0;t--){for(s=m[o-1]*n[o-1][t],i=o-2;i>=1;i-=2)h=i-1,s+=m[i]*n[i][t]+m[h]*n[h][t];0===i&&(s+=m[0]*n[0][t]),f[t]=s}a[e]=f}return a},numeric._getCol=function(r,n,e){var i;for(i=r.length-1;i>0;--i)e[i]=r[i][n],e[--i]=r[i][n];0===i&&(e[0]=r[0][n])},numeric.dotMMbig=function(r,n){var e,i,t,u=numeric._getCol,o=n.length,c=Array(o),a=r.length,f=n[0].length,m=new Array(a),s=numeric.dotVV;for(--o,i=--a;-1!==i;--i)m[i]=Array(f);for(i=--f;-1!==i;--i)for(u(n,i,c),t=a;-1!==t;--t)0,e=r[t],m[t][i]=s(e,c);return m},numeric.dotMV=function(r,n){var e,i=r.length,t=(n.length,Array(i)),u=numeric.dotVV;for(e=i-1;e>=0;e--)t[e]=u(r[e],n);return t},numeric.dotVM=function(r,n){var e,i,t,u,o,c,a;for(t=r.length,u=n[0].length,o=Array(u),i=u-1;i>=0;i--){for(c=r[t-1]*n[t-1][i],e=t-2;e>=1;e-=2)a=e-1,c+=r[e]*n[e][i]+r[a]*n[a][i];0===e&&(c+=r[0]*n[0][i]),o[i]=c}return o},numeric.dotVV=function(r,n){var e,i,t=r.length,u=r[t-1]*n[t-1];for(e=t-2;e>=1;e-=2)i=e-1,u+=r[e]*n[e]+r[i]*n[i];return 0===e&&(u+=r[0]*n[0]),u},numeric.dot=function(r,n){var e=numeric.dim;switch(1e3*e(r).length+e(n).length){case 2002:return n.length<10?numeric.dotMMsmall(r,n):numeric.dotMMbig(r,n);case 2001:return numeric.dotMV(r,n);case 1002:return numeric.dotVM(r,n);case 1001:return numeric.dotVV(r,n);case 1e3:return numeric.mulVS(r,n);case 1:return numeric.mulSV(r,n);case 0:return r*n;default:throw new Error("numeric.dot only works on vectors and matrices")}},numeric.diag=function(r){var n,e,i,t,u=r.length,o=Array(u);for(n=u-1;n>=0;n--){for(t=Array(u),e=n+2,i=u-1;i>=e;i-=2)t[i]=0,t[i-1]=0;for(i>n&&(t[i]=0),t[n]=r[n],i=n-1;i>=1;i-=2)t[i]=0,t[i-1]=0;0===i&&(t[0]=0),o[n]=t}return o},numeric.getDiag=function(r){var n,e=Math.min(r.length,r[0].length),i=Array(e);for(n=e-1;n>=1;--n)i[n]=r[n][n],i[--n]=r[n][n];return 0===n&&(i[0]=r[0][0]),i},numeric.identity=function(r){return numeric.diag(numeric.rep([r],1))},numeric.pointwise=function(r,n,e){void 0===e&&(e="");var i,t,u=[],o=/\[i\]$/,c="",a=!1;for(i=0;i<r.length;i++)o.test(r[i])?c=t=r[i].substring(0,r[i].length-3):t=r[i],"ret"===t&&(a=!0),u.push(t);return u[r.length]="_s",u[r.length+1]="_k",u[r.length+2]='if(typeof _s === "undefined") _s = numeric.dim('+c+');\nif(typeof _k === "undefined") _k = 0;\nvar _n = _s[_k];\nvar i'+(a?"":", ret = Array(_n)")+";\nif(_k < _s.length-1) {\n    for(i=_n-1;i>=0;i--) ret[i] = arguments.callee("+r.join(",")+",_s,_k+1);\n    return ret;\n}\n"+e+"\nfor(i=_n-1;i!==-1;--i) {\n    "+n+"\n}\nreturn ret;",Function.apply(null,u)},numeric.pointwise2=function(r,n,e){void 0===e&&(e="");var i,t,u=[],o=/\[i\]$/,c="",a=!1;for(i=0;i<r.length;i++)o.test(r[i])?c=t=r[i].substring(0,r[i].length-3):t=r[i],"ret"===t&&(a=!0),u.push(t);return u[r.length]="var _n = "+c+".length;\nvar i"+(a?"":", ret = Array(_n)")+";\n"+e+"\nfor(i=_n-1;i!==-1;--i) {\n"+n+"\n}\nreturn ret;",Function.apply(null,u)},numeric._biforeach=function r(n,e,i,t,u){if(t!==i.length-1){var o;for(o=i[t]-1;o>=0;o--)r("object"==typeof n?n[o]:n,"object"==typeof e?e[o]:e,i,t+1,u)}else u(n,e)},numeric._biforeach2=function r(n,e,i,t,u){if(t===i.length-1)return u(n,e);var o,c=i[t],a=Array(c);for(o=c-1;o>=0;--o)a[o]=r("object"==typeof n?n[o]:n,"object"==typeof e?e[o]:e,i,t+1,u);return a},numeric._foreach=function r(n,e,i,t){if(i!==e.length-1){var u;for(u=e[i]-1;u>=0;u--)r(n[u],e,i+1,t)}else t(n)},numeric._foreach2=function r(n,e,i,t){if(i===e.length-1)return t(n);var u,o=e[i],c=Array(o);for(u=o-1;u>=0;u--)c[u]=r(n[u],e,i+1,t);return c},numeric.ops2={add:"+",sub:"-",mul:"*",div:"/",mod:"%",and:"&&",or:"||",eq:"===",neq:"!==",lt:"<",gt:">",leq:"<=",geq:">=",band:"&",bor:"|",bxor:"^",lshift:"<<",rshift:">>",rrshift:">>>"},numeric.opseq={addeq:"+=",subeq:"-=",muleq:"*=",diveq:"/=",modeq:"%=",lshifteq:"<<=",rshifteq:">>=",rrshifteq:">>>=",bandeq:"&=",boreq:"|=",bxoreq:"^="},numeric.mathfuns=["abs","acos","asin","atan","ceil","cos","exp","floor","log","round","sin","sqrt","tan","isNaN","isFinite"],numeric.mathfuns2=["atan2","pow","max","min"],numeric.ops1={neg:"-",not:"!",bnot:"~",clone:""},numeric.mapreducers={any:["if(xi) return true;","var accum = false;"],all:["if(!xi) return false;","var accum = true;"],sum:["accum += xi;","var accum = 0;"],prod:["accum *= xi;","var accum = 1;"],norm2Squared:["accum += xi*xi;","var accum = 0;"],norminf:["accum = max(accum,abs(xi));","var accum = 0, max = Math.max, abs = Math.abs;"],norm1:["accum += abs(xi)","var accum = 0, abs = Math.abs;"],sup:["accum = max(accum,xi);","var accum = -Infinity, max = Math.max;"],inf:["accum = min(accum,xi);","var accum = Infinity, min = Math.min;"]},function(){var r,n;for(r=0;r<numeric.mathfuns2.length;++r)n=numeric.mathfuns2[r],numeric.ops2[n]=n;for(r in numeric.ops2)if(numeric.ops2.hasOwnProperty(r)){n=numeric.ops2[r];var e,i,t="";-1!==numeric.myIndexOf.call(numeric.mathfuns2,r)?(t="var "+n+" = Math."+n+";\n",e=function(r,e,i){return r+" = "+n+"("+e+","+i+")"},i=function(r,e){return r+" = "+n+"("+r+","+e+")"}):(e=function(r,e,i){return r+" = "+e+" "+n+" "+i},i=numeric.opseq.hasOwnProperty(r+"eq")?function(r,e){return r+" "+n+"= "+e}:function(r,e){return r+" = "+r+" "+n+" "+e}),numeric[r+"VV"]=numeric.pointwise2(["x[i]","y[i]"],e("ret[i]","x[i]","y[i]"),t),numeric[r+"SV"]=numeric.pointwise2(["x","y[i]"],e("ret[i]","x","y[i]"),t),numeric[r+"VS"]=numeric.pointwise2(["x[i]","y"],e("ret[i]","x[i]","y"),t),numeric[r]=Function("var n = arguments.length, i, x = arguments[0], y;\nvar VV = numeric."+r+"VV, VS = numeric."+r+"VS, SV = numeric."+r+'SV;\nvar dim = numeric.dim;\nfor(i=1;i!==n;++i) { \n  y = arguments[i];\n  if(typeof x === "object") {\n      if(typeof y === "object") x = numeric._biforeach2(x,y,dim(x),0,VV);\n      else x = numeric._biforeach2(x,y,dim(x),0,VS);\n  } else if(typeof y === "object") x = numeric._biforeach2(x,y,dim(y),0,SV);\n  else '+i("x","y")+"\n}\nreturn x;\n"),numeric[n]=numeric[r],numeric[r+"eqV"]=numeric.pointwise2(["ret[i]","x[i]"],i("ret[i]","x[i]"),t),numeric[r+"eqS"]=numeric.pointwise2(["ret[i]","x"],i("ret[i]","x"),t),numeric[r+"eq"]=Function("var n = arguments.length, i, x = arguments[0], y;\nvar V = numeric."+r+"eqV, S = numeric."+r+'eqS\nvar s = numeric.dim(x);\nfor(i=1;i!==n;++i) { \n  y = arguments[i];\n  if(typeof y === "object") numeric._biforeach(x,y,s,0,V);\n  else numeric._biforeach(x,y,s,0,S);\n}\nreturn x;\n')}for(r=0;r<numeric.mathfuns2.length;++r)n=numeric.mathfuns2[r],delete numeric.ops2[n];for(r=0;r<numeric.mathfuns.length;++r)n=numeric.mathfuns[r],numeric.ops1[n]=n;for(r in numeric.ops1)numeric.ops1.hasOwnProperty(r)&&(t="",n=numeric.ops1[r],-1!==numeric.myIndexOf.call(numeric.mathfuns,r)&&Math.hasOwnProperty(n)&&(t="var "+n+" = Math."+n+";\n"),numeric[r+"eqV"]=numeric.pointwise2(["ret[i]"],"ret[i] = "+n+"(ret[i]);",t),numeric[r+"eq"]=Function("x",'if(typeof x !== "object") return '+n+"x\nvar i;\nvar V = numeric."+r+"eqV;\nvar s = numeric.dim(x);\nnumeric._foreach(x,s,0,V);\nreturn x;\n"),numeric[r+"V"]=numeric.pointwise2(["x[i]"],"ret[i] = "+n+"(x[i]);",t),numeric[r]=Function("x",'if(typeof x !== "object") return '+n+"(x)\nvar i;\nvar V = numeric."+r+"V;\nvar s = numeric.dim(x);\nreturn numeric._foreach2(x,s,0,V);\n"));for(r=0;r<numeric.mathfuns.length;++r)n=numeric.mathfuns[r],delete numeric.ops1[n];for(r in numeric.mapreducers)numeric.mapreducers.hasOwnProperty(r)&&(n=numeric.mapreducers[r],numeric[r+"V"]=numeric.mapreduce2(n[0],n[1]),numeric[r]=Function("x","s","k",n[1]+'if(typeof x !== "object") {    xi = x;\n'+n[0]+';\n    return accum;\n}if(typeof s === "undefined") s = numeric.dim(x);\nif(typeof k === "undefined") k = 0;\nif(k === s.length-1) return numeric.'+r+"V(x);\nvar xi;\nvar n = x.length, i;\nfor(i=n-1;i!==-1;--i) {\n   xi = arguments.callee(x[i]);\n"+n[0]+";\n}\nreturn accum;\n"))}(),numeric.truncVV=numeric.pointwise(["x[i]","y[i]"],"ret[i] = round(x[i]/y[i])*y[i];","var round = Math.round;"),numeric.truncVS=numeric.pointwise(["x[i]","y"],"ret[i] = round(x[i]/y)*y;","var round = Math.round;"),numeric.truncSV=numeric.pointwise(["x","y[i]"],"ret[i] = round(x/y[i])*y[i];","var round = Math.round;"),numeric.trunc=function(r,n){return"object"==typeof r?"object"==typeof n?numeric.truncVV(r,n):numeric.truncVS(r,n):"object"==typeof n?numeric.truncSV(r,n):Math.round(r/n)*n},numeric.inv=function(r){var n,e,i,t,u,o,c,r,a=numeric.dim(r),f=Math.abs,m=a[0],s=a[1],h=numeric.clone(r),l=numeric.identity(m);for(o=0;o<s;++o){var p=-1,y=-1;for(u=o;u!==m;++u)(c=f(h[u][o]))>y&&(p=u,y=c);for(e=h[p],h[p]=h[o],h[o]=e,t=l[p],l[p]=l[o],l[o]=t,r=e[o],c=o;c!==s;++c)e[c]/=r;for(c=s-1;-1!==c;--c)t[c]/=r;for(u=m-1;-1!==u;--u)if(u!==o){for(n=h[u],i=l[u],r=n[o],c=o+1;c!==s;++c)n[c]-=e[c]*r;for(c=s-1;c>0;--c)i[c]-=t[c]*r,i[--c]-=t[c]*r;0===c&&(i[0]-=t[0]*r)}}return l},numeric.det=function(r){var n=numeric.dim(r);if(2!==n.length||n[0]!==n[1])throw new Error("numeric: det() only works on square matrices");var e,i,t,u,o,c,a,f,m=n[0],s=1,h=numeric.clone(r);for(i=0;i<m-1;i++){for(t=i,e=i+1;e<m;e++)Math.abs(h[e][i])>Math.abs(h[t][i])&&(t=e);for(t!==i&&(a=h[t],h[t]=h[i],h[i]=a,s*=-1),u=h[i],e=i+1;e<m;e++){for(c=(o=h[e])[i]/u[i],t=i+1;t<m-1;t+=2)f=t+1,o[t]-=u[t]*c,o[f]-=u[f]*c;t!==m&&(o[t]-=u[t]*c)}if(0===u[i])return 0;s*=u[i]}return s*h[i][i]},numeric.transpose=function(r){var n,e,i,t,u,o=r.length,c=r[0].length,a=Array(c);for(e=0;e<c;e++)a[e]=Array(o);for(n=o-1;n>=1;n-=2){for(t=r[n],i=r[n-1],e=c-1;e>=1;--e)(u=a[e])[n]=t[e],u[n-1]=i[e],(u=a[--e])[n]=t[e],u[n-1]=i[e];0===e&&((u=a[0])[n]=t[0],u[n-1]=i[0])}if(0===n){for(i=r[0],e=c-1;e>=1;--e)a[e][0]=i[e],a[--e][0]=i[e];0===e&&(a[0][0]=i[0])}return a},numeric.negtranspose=function(r){var n,e,i,t,u,o=r.length,c=r[0].length,a=Array(c);for(e=0;e<c;e++)a[e]=Array(o);for(n=o-1;n>=1;n-=2){for(t=r[n],i=r[n-1],e=c-1;e>=1;--e)(u=a[e])[n]=-t[e],u[n-1]=-i[e],(u=a[--e])[n]=-t[e],u[n-1]=-i[e];0===e&&((u=a[0])[n]=-t[0],u[n-1]=-i[0])}if(0===n){for(i=r[0],e=c-1;e>=1;--e)a[e][0]=-i[e],a[--e][0]=-i[e];0===e&&(a[0][0]=-i[0])}return a},numeric._random=function r(n,e){var i,t,u=n[e],o=Array(u);if(e===n.length-1){for(t=Math.random,i=u-1;i>=1;i-=2)o[i]=t(),o[i-1]=t();return 0===i&&(o[0]=t()),o}for(i=u-1;i>=0;i--)o[i]=r(n,e+1);return o},numeric.random=function(r){return numeric._random(r,0)},numeric.norm2=function(r){return Math.sqrt(numeric.norm2Squared(r))},numeric.linspace=function(r,n,e){if(void 0===e&&(e=Math.max(Math.round(n-r)+1,1)),e<2)return 1===e?[r]:[];var i,t=Array(e);for(i=--e;i>=0;i--)t[i]=(i*n+(e-i)*r)/e;return t},numeric.getBlock=function(r,n,e){function i(r,u){var o,c=n[u],a=e[u]-c,f=Array(a);if(u===t.length-1){for(o=a;o>=0;o--)f[o]=r[o+c];return f}for(o=a;o>=0;o--)f[o]=i(r[o+c],u+1);return f}var t=numeric.dim(r);return i(r,0)},numeric.setBlock=function(r,n,e,i){function t(r,i,o){var c,a=n[o],f=e[o]-a;if(o===u.length-1)for(c=f;c>=0;c--)r[c+a]=i[c];for(c=f;c>=0;c--)t(r[c+a],i[c],o+1)}var u=numeric.dim(r);return t(r,i,0),r},numeric.getRange=function(r,n,e){var i,t,u,o,c=n.length,a=e.length,f=Array(c);for(i=c-1;-1!==i;--i)for(f[i]=Array(a),u=f[i],o=r[n[i]],t=a-1;-1!==t;--t)u[t]=o[e[t]];return f},numeric.blockMatrix=function(r){var n=numeric.dim(r);if(n.length<4)return numeric.blockMatrix([r]);var e,i,t,u,o,c=n[0],a=n[1];for(e=0,i=0,t=0;t<c;++t)e+=r[t][0].length;for(u=0;u<a;++u)i+=r[0][u][0].length;var f=Array(e);for(t=0;t<e;++t)f[t]=Array(i);var m,s,h,l,p,y=0;for(t=0;t<c;++t){for(m=i,u=a-1;-1!==u;--u)for(m-=(o=r[t][u])[0].length,h=o.length-1;-1!==h;--h)for(p=o[h],s=f[y+h],l=p.length-1;-1!==l;--l)s[m+l]=p[l];y+=r[t][0].length}return f},numeric.tensor=function(r,n){if("number"==typeof r||"number"==typeof n)return numeric.mul(r,n);var e=numeric.dim(r),i=numeric.dim(n);if(1!==e.length||1!==i.length)throw new Error("numeric: tensor product is only defined for vectors");var t,u,o,c,a=e[0],f=i[0],m=Array(a);for(u=a-1;u>=0;u--){for(t=Array(f),c=r[u],o=f-1;o>=3;--o)t[o]=c*n[o],t[--o]=c*n[o],t[--o]=c*n[o],t[--o]=c*n[o];for(;o>=0;)t[o]=c*n[o],--o;m[u]=t}return m},numeric.T=function(r,n){this.x=r,this.y=n},numeric.t=function(r,n){return new numeric.T(r,n)},numeric.Tbinop=function(r,n,e,i,t){numeric.indexOf;if("string"!=typeof t){var u;t="";for(u in numeric)numeric.hasOwnProperty(u)&&(r.indexOf(u)>=0||n.indexOf(u)>=0||e.indexOf(u)>=0||i.indexOf(u)>=0)&&u.length>1&&(t+="var "+u+" = numeric."+u+";\n")}return Function(["y"],"var x = this;\nif(!(y instanceof numeric.T)) { y = new numeric.T(y); }\n"+t+"\nif(x.y) {  if(y.y) {    return new numeric.T("+i+");\n  }\n  return new numeric.T("+e+");\n}\nif(y.y) {\n  return new numeric.T("+n+");\n}\nreturn new numeric.T("+r+");\n")},numeric.T.prototype.add=numeric.Tbinop("add(x.x,y.x)","add(x.x,y.x),y.y","add(x.x,y.x),x.y","add(x.x,y.x),add(x.y,y.y)"),numeric.T.prototype.sub=numeric.Tbinop("sub(x.x,y.x)","sub(x.x,y.x),neg(y.y)","sub(x.x,y.x),x.y","sub(x.x,y.x),sub(x.y,y.y)"),numeric.T.prototype.mul=numeric.Tbinop("mul(x.x,y.x)","mul(x.x,y.x),mul(x.x,y.y)","mul(x.x,y.x),mul(x.y,y.x)","sub(mul(x.x,y.x),mul(x.y,y.y)),add(mul(x.x,y.y),mul(x.y,y.x))"),numeric.T.prototype.reciprocal=function(){var r=numeric.mul,n=numeric.div;if(this.y){var e=numeric.add(r(this.x,this.x),r(this.y,this.y));return new numeric.T(n(this.x,e),n(numeric.neg(this.y),e))}return new T(n(1,this.x))},numeric.T.prototype.div=function(r){if(r instanceof numeric.T||(r=new numeric.T(r)),r.y)return this.mul(r.reciprocal());var n=numeric.div;return this.y?new numeric.T(n(this.x,r.x),n(this.y,r.x)):new numeric.T(n(this.x,r.x))},numeric.T.prototype.dot=numeric.Tbinop("dot(x.x,y.x)","dot(x.x,y.x),dot(x.x,y.y)","dot(x.x,y.x),dot(x.y,y.x)","sub(dot(x.x,y.x),dot(x.y,y.y)),add(dot(x.x,y.y),dot(x.y,y.x))"),numeric.T.prototype.transpose=function(){var r=numeric.transpose,n=this.x,e=this.y;return e?new numeric.T(r(n),r(e)):new numeric.T(r(n))},numeric.T.prototype.transjugate=function(){var r=numeric.transpose,n=this.x,e=this.y;return e?new numeric.T(r(n),numeric.negtranspose(e)):new numeric.T(r(n))},numeric.Tunop=function(r,n,e){return"string"!=typeof e&&(e=""),Function("var x = this;\n"+e+"\nif(x.y) {  "+n+";\n}\n"+r+";\n")},numeric.T.prototype.exp=numeric.Tunop("return new numeric.T(ex)","return new numeric.T(mul(cos(x.y),ex),mul(sin(x.y),ex))","var ex = numeric.exp(x.x), cos = numeric.cos, sin = numeric.sin, mul = numeric.mul;"),numeric.T.prototype.conj=numeric.Tunop("return new numeric.T(x.x);","return new numeric.T(x.x,numeric.neg(x.y));"),numeric.T.prototype.neg=numeric.Tunop("return new numeric.T(neg(x.x));","return new numeric.T(neg(x.x),neg(x.y));","var neg = numeric.neg;"),numeric.T.prototype.sin=numeric.Tunop("return new numeric.T(numeric.sin(x.x))","return x.exp().sub(x.neg().exp()).div(new numeric.T(0,2));"),numeric.T.prototype.cos=numeric.Tunop("return new numeric.T(numeric.cos(x.x))","return x.exp().add(x.neg().exp()).div(2);"),numeric.T.prototype.abs=numeric.Tunop("return new numeric.T(numeric.abs(x.x));","return new numeric.T(numeric.sqrt(numeric.add(mul(x.x,x.x),mul(x.y,x.y))));","var mul = numeric.mul;"),numeric.T.prototype.log=numeric.Tunop("return new numeric.T(numeric.log(x.x));","var theta = new numeric.T(numeric.atan2(x.y,x.x)), r = x.abs();\nreturn new numeric.T(numeric.log(r.x),theta.x);"),numeric.T.prototype.norm2=numeric.Tunop("return numeric.norm2(x.x);","var f = numeric.norm2Squared;\nreturn Math.sqrt(f(x.x)+f(x.y));"),numeric.T.prototype.inv=function(){var r=this;if(void 0===r.y)return new numeric.T(numeric.inv(r.x));var n,e,i,t,u,o,c,a,f,m,s,h,l,p,y,g,v,d,x=r.x.length,b=numeric.identity(x),w=numeric.rep([x,x],0),M=numeric.clone(r.x),k=numeric.clone(r.y);for(f=0;f<x;f++){for(h=(p=M[f][f])*p+(y=k[f][f])*y,s=f,m=f+1;m<x;m++)(l=(p=M[m][f])*p+(y=k[m][f])*y)>h&&(s=m,h=l);for(s!==f&&(d=M[f],M[f]=M[s],M[s]=d,d=k[f],k[f]=k[s],k[s]=d,d=b[f],b[f]=b[s],b[s]=d,d=w[f],w[f]=w[s],w[s]=d),n=M[f],e=k[f],u=b[f],o=w[f],p=n[f],y=e[f],m=f+1;m<x;m++)g=n[m],v=e[m],n[m]=(g*p+v*y)/h,e[m]=(v*p-g*y)/h;for(m=0;m<x;m++)g=u[m],v=o[m],u[m]=(g*p+v*y)/h,o[m]=(v*p-g*y)/h;for(m=f+1;m<x;m++){for(i=M[m],t=k[m],c=b[m],a=w[m],p=i[f],y=t[f],s=f+1;s<x;s++)g=n[s],v=e[s],i[s]-=g*p-v*y,t[s]-=v*p+g*y;for(s=0;s<x;s++)g=u[s],v=o[s],c[s]-=g*p-v*y,a[s]-=v*p+g*y}}for(f=x-1;f>0;f--)for(u=b[f],o=w[f],m=f-1;m>=0;m--)for(c=b[m],a=w[m],p=M[m][f],y=k[m][f],s=x-1;s>=0;s--)g=u[s],v=o[s],c[s]-=p*g-y*v,a[s]-=p*v+y*g;return new numeric.T(b,w)},numeric.T.prototype.get=function(r){var n,e=this.x,i=this.y,t=0,u=r.length;if(i){for(;t<u;)e=e[n=r[t]],i=i[n],t++;return new numeric.T(e,i)}for(;t<u;)e=e[n=r[t]],t++;return new numeric.T(e)},numeric.T.prototype.set=function(r,n){var e,i=this.x,t=this.y,u=0,o=r.length,c=n.x,a=n.y;if(0===o)return a?this.y=a:t&&(this.y=void 0),this.x=i,this;if(a){for(t||(t=numeric.rep(numeric.dim(i),0),this.y=t);u<o-1;)i=i[e=r[u]],t=t[e],u++;return e=r[u],i[e]=c,t[e]=a,this}if(t){for(;u<o-1;)i=i[e=r[u]],t=t[e],u++;return e=r[u],i[e]=c,c instanceof Array?t[e]=numeric.rep(numeric.dim(c),0):t[e]=0,this}for(;u<o-1;)i=i[e=r[u]],u++;return e=r[u],i[e]=c,this},numeric.T.prototype.getRows=function(r,n){var e,i,t=n-r+1,u=Array(t),o=this.x,c=this.y;for(e=r;e<=n;e++)u[e-r]=o[e];if(c){for(i=Array(t),e=r;e<=n;e++)i[e-r]=c[e];return new numeric.T(u,i)}return new numeric.T(u)},numeric.T.prototype.setRows=function(r,n,e){var i,t=this.x,u=this.y,o=e.x,c=e.y;for(i=r;i<=n;i++)t[i]=o[i-r];if(c)for(u||(u=numeric.rep(numeric.dim(t),0),this.y=u),i=r;i<=n;i++)u[i]=c[i-r];else if(u)for(i=r;i<=n;i++)u[i]=numeric.rep([o[i-r].length],0);return this},numeric.T.prototype.getRow=function(r){var n=this.x,e=this.y;return e?new numeric.T(n[r],e[r]):new numeric.T(n[r])},numeric.T.prototype.setRow=function(r,n){var e=this.x,i=this.y,t=n.x,u=n.y;return e[r]=t,u?(i||(i=numeric.rep(numeric.dim(e),0),this.y=i),i[r]=u):i&&(i=numeric.rep([t.length],0)),this},numeric.T.prototype.getBlock=function(r,n){var e=this.x,i=this.y,t=numeric.getBlock;return i?new numeric.T(t(e,r,n),t(i,r,n)):new numeric.T(t(e,r,n))},numeric.T.prototype.setBlock=function(r,n,e){e instanceof numeric.T||(e=new numeric.T(e));var i=this.x,t=this.y,u=numeric.setBlock,o=e.x,c=e.y;if(c)return t||(this.y=numeric.rep(numeric.dim(this),0),t=this.y),u(i,r,n,o),u(t,r,n,c),this;u(i,r,n,o),t&&u(t,r,n,numeric.rep(numeric.dim(o),0))},numeric.T.rep=function(r,n){var e=numeric.T;n instanceof e||(n=new e(n));var i=n.x,t=n.y,u=numeric.rep;return t?new e(u(r,i),u(r,t)):new e(u(r,i))},numeric.T.diag=function(r){r instanceof numeric.T||(r=new numeric.T(r));var n=r.x,e=r.y,i=numeric.diag;return e?new numeric.T(i(n),i(e)):new numeric.T(i(n))},numeric.T.eig=function(){if(this.y)throw new Error("eig: not implemented for complex matrices.");return numeric.eig(this.x)},numeric.T.identity=function(r){return new numeric.T(numeric.identity(r))},numeric.T.prototype.getDiag=function(){var r=numeric,n=this.x,e=this.y;return e?new r.T(r.getDiag(n),r.getDiag(e)):new r.T(r.getDiag(n))},numeric.house=function(r){var n=numeric.clone(r),e=(r[0]>=0?1:-1)*numeric.norm2(r);n[0]+=e;var i=numeric.norm2(n);if(0===i)throw new Error("eig: internal error");return numeric.div(n,i)},numeric.toUpperHessenberg=function(r){var n=numeric.dim(r);if(2!==n.length||n[0]!==n[1])throw new Error("numeric: toUpperHessenberg() only works on square matrices");var e,i,t,u,o,c,a,f,m,s,h=n[0],l=numeric.clone(r),p=numeric.identity(h);for(i=0;i<h-2;i++){for(u=Array(h-i-1),e=i+1;e<h;e++)u[e-i-1]=l[e][i];if(numeric.norm2(u)>0){for(o=numeric.house(u),c=numeric.getBlock(l,[i+1,i],[h-1,h-1]),a=numeric.tensor(o,numeric.dot(o,c)),e=i+1;e<h;e++)for(f=l[e],m=a[e-i-1],t=i;t<h;t++)f[t]-=2*m[t-i];for(c=numeric.getBlock(l,[0,i+1],[h-1,h-1]),a=numeric.tensor(numeric.dot(c,o),o),e=0;e<h;e++)for(f=l[e],m=a[e],t=i+1;t<h;t++)f[t]-=2*m[t-i-1];for(c=Array(h-i-1),e=i+1;e<h;e++)c[e-i-1]=p[e];for(a=numeric.tensor(o,numeric.dot(o,c)),e=i+1;e<h;e++)for(s=p[e],m=a[e-i-1],t=0;t<h;t++)s[t]-=2*m[t]}}return{H:l,Q:p}},numeric.epsilon=2.220446049250313e-16,numeric.QRFrancis=function(r,n){void 0===n&&(n=1e4),r=numeric.clone(r);numeric.clone(r);var e,i,t,u,o,c,a,f,m,s,h,l,p,y,g,v,d,x,b=numeric.dim(r)[0],w=numeric.identity(b);if(b<3)return{Q:w,B:[[0,b-1]]};var M=numeric.epsilon;for(x=0;x<n;x++){for(v=0;v<b-1;v++)if(Math.abs(r[v+1][v])<M*(Math.abs(r[v][v])+Math.abs(r[v+1][v+1]))){var k=numeric.QRFrancis(numeric.getBlock(r,[0,0],[v,v]),n),A=numeric.QRFrancis(numeric.getBlock(r,[v+1,v+1],[b-1,b-1]),n);for(l=Array(v+1),g=0;g<=v;g++)l[g]=w[g];for(p=numeric.dot(k.Q,l),g=0;g<=v;g++)w[g]=p[g];for(l=Array(b-v-1),g=v+1;g<b;g++)l[g-v-1]=w[g];for(p=numeric.dot(A.Q,l),g=v+1;g<b;g++)w[g]=p[g-v-1];return{Q:w,B:k.B.concat(numeric.add(A.B,v+1))}}if(t=r[b-2][b-2],u=r[b-2][b-1],o=r[b-1][b-2],c=r[b-1][b-1],f=t+c,a=t*c-u*o,m=numeric.getBlock(r,[0,0],[2,2]),f*f>=4*a){var T,j;T=.5*(f+Math.sqrt(f*f-4*a)),j=.5*(f-Math.sqrt(f*f-4*a)),m=numeric.add(numeric.sub(numeric.dot(m,m),numeric.mul(m,T+j)),numeric.diag(numeric.rep([3],T*j)))}else m=numeric.add(numeric.sub(numeric.dot(m,m),numeric.mul(m,f)),numeric.diag(numeric.rep([3],a)));for(e=[m[0][0],m[1][0],m[2][0]],i=numeric.house(e),l=[r[0],r[1],r[2]],p=numeric.tensor(i,numeric.dot(i,l)),g=0;g<3;g++)for(h=r[g],y=p[g],d=0;d<b;d++)h[d]-=2*y[d];for(l=numeric.getBlock(r,[0,0],[b-1,2]),p=numeric.tensor(numeric.dot(l,i),i),g=0;g<b;g++)for(h=r[g],y=p[g],d=0;d<3;d++)h[d]-=2*y[d];for(l=[w[0],w[1],w[2]],p=numeric.tensor(i,numeric.dot(i,l)),g=0;g<3;g++)for(s=w[g],y=p[g],d=0;d<b;d++)s[d]-=2*y[d];var S;for(v=0;v<b-2;v++){for(d=v;d<=v+1;d++)if(Math.abs(r[d+1][d])<M*(Math.abs(r[d][d])+Math.abs(r[d+1][d+1]))){var k=numeric.QRFrancis(numeric.getBlock(r,[0,0],[d,d]),n),A=numeric.QRFrancis(numeric.getBlock(r,[d+1,d+1],[b-1,b-1]),n);for(l=Array(d+1),g=0;g<=d;g++)l[g]=w[g];for(p=numeric.dot(k.Q,l),g=0;g<=d;g++)w[g]=p[g];for(l=Array(b-d-1),g=d+1;g<b;g++)l[g-d-1]=w[g];for(p=numeric.dot(A.Q,l),g=d+1;g<b;g++)w[g]=p[g-d-1];return{Q:w,B:k.B.concat(numeric.add(A.B,d+1))}}for(S=Math.min(b-1,v+3),e=Array(S-v),g=v+1;g<=S;g++)e[g-v-1]=r[g][v];for(i=numeric.house(e),l=numeric.getBlock(r,[v+1,v],[S,b-1]),p=numeric.tensor(i,numeric.dot(i,l)),g=v+1;g<=S;g++)for(h=r[g],y=p[g-v-1],d=v;d<b;d++)h[d]-=2*y[d-v];for(l=numeric.getBlock(r,[0,v+1],[b-1,S]),p=numeric.tensor(numeric.dot(l,i),i),g=0;g<b;g++)for(h=r[g],y=p[g],d=v+1;d<=S;d++)h[d]-=2*y[d-v-1];for(l=Array(S-v),g=v+1;g<=S;g++)l[g-v-1]=w[g];for(p=numeric.tensor(i,numeric.dot(i,l)),g=v+1;g<=S;g++)for(s=w[g],y=p[g-v-1],d=0;d<b;d++)s[d]-=2*y[d]}}throw new Error("numeric: eigenvalue iteration does not converge -- increase maxiter?")},numeric.eig=function(r,n){var e,i,t,u,o,c,a,f,m,s,h,l,p,y,g,v,d=numeric.toUpperHessenberg(r),x=numeric.QRFrancis(d.H,n),b=numeric.T,w=r.length,M=x.B,k=numeric.dot(x.Q,numeric.dot(d.H,numeric.transpose(x.Q))),A=new b(numeric.dot(x.Q,d.Q)),T=M.length,j=Math.sqrt;for(i=0;i<T;i++)if((e=M[i][0])===M[i][1]);else{if(u=e+1,o=k[e][e],c=k[e][u],a=k[u][e],f=k[u][u],0===c&&0===a)continue;(s=(m=-o-f)*m-4*(o*f-c*a))>=0?((g=(o-(h=m<0?-.5*(m-j(s)):-.5*(m+j(s))))*(o-h)+c*c)>(v=a*a+(f-h)*(f-h))?(p=(o-h)/(g=j(g)),y=c/g):(p=a/(v=j(v)),y=(f-h)/v),t=new b([[y,-p],[p,y]]),A.setRows(e,u,t.dot(A.getRows(e,u)))):(h=-.5*m,l=.5*j(-s),(g=(o-h)*(o-h)+c*c)>(v=a*a+(f-h)*(f-h))?(p=(o-h)/(g=j(g+l*l)),y=c/g,h=0,l/=g):(p=a/(v=j(v+l*l)),y=(f-h)/v,h=l/v,l=0),t=new b([[y,-p],[p,y]],[[h,l],[l,-h]]),A.setRows(e,u,t.dot(A.getRows(e,u))))}var S=A.dot(r).dot(A.transjugate()),w=r.length,_=numeric.T.identity(w);for(u=0;u<w;u++)if(u>0)for(i=u-1;i>=0;i--){var V=S.get([i,i]),P=S.get([u,u]);numeric.neq(V.x,P.x)||numeric.neq(V.y,P.y)?(h=S.getRow(i).getBlock([i],[u-1]),l=_.getRow(u).getBlock([i],[u-1]),_.set([u,i],S.get([i,u]).neg().sub(h.dot(l)).div(V.sub(P)))):_.setRow(u,_.getRow(i))}for(u=0;u<w;u++)h=_.getRow(u),_.setRow(u,h.div(h.norm2()));return _=_.transpose(),_=A.transjugate().dot(_),{lambda:S.getDiag(),E:_}},numeric.ccsSparse=function(r){var n,e,i,t=r.length,u=[];for(e=t-1;-1!==e;--e){n=r[e];for(i in n){for(i=parseInt(i);i>=u.length;)u[u.length]=0;0!==n[i]&&u[i]++}}var o=u.length,c=Array(o+1);for(c[0]=0,e=0;e<o;++e)c[e+1]=c[e]+u[e];var a=Array(c[o]),f=Array(c[o]);for(e=t-1;-1!==e;--e){n=r[e];for(i in n)0!==n[i]&&(u[i]--,a[c[i]+u[i]]=e,f[c[i]+u[i]]=n[i])}return[c,a,f]},numeric.ccsFull=function(r){var n,e,i,t,u=r[0],o=r[1],c=r[2],a=numeric.ccsDim(r),f=a[0],m=a[1],s=numeric.rep([f,m],0);for(n=0;n<m;n++)for(i=u[n],t=u[n+1],e=i;e<t;++e)s[o[e]][n]=c[e];return s},numeric.ccsTSolve=function(r,n,e,i,t){function u(r){var n;if(0===e[r]){for(e[r]=1,n=o[r];n<o[r+1];++n)u(c[n]);t[s]=r,++s}}var o=r[0],c=r[1],a=r[2],f=o.length-1,m=Math.max,s=0;void 0===i&&(e=numeric.rep([f],0)),void 0===i&&(i=numeric.linspace(0,e.length-1)),void 0===t&&(t=[]);var h,l,p,y,g,v,d;for(h=i.length-1;-1!==h;--h)u(i[h]);for(t.length=s,h=t.length-1;-1!==h;--h)e[t[h]]=0;for(h=i.length-1;-1!==h;--h)l=i[h],e[l]=n[l];for(h=t.length-1;-1!==h;--h){for(l=t[h],p=o[l],y=m(o[l+1],p),g=p;g!==y;++g)if(c[g]===l){e[l]/=a[g];break}for(d=e[l],g=p;g!==y;++g)(v=c[g])!==l&&(e[v]-=d*a[g])}return e},numeric.ccsDFS=function(r){this.k=Array(r),this.k1=Array(r),this.j=Array(r)},numeric.ccsDFS.prototype.dfs=function(r,n,e,i,t,u){var o,c,a,f=0,m=t.length,s=this.k,h=this.k1,l=this.j;if(0===i[r])for(i[r]=1,l[0]=r,s[0]=c=n[r],h[0]=a=n[r+1];;)if(c>=a){if(t[m]=l[f],0===f)return;++m,c=s[--f],a=h[f]}else 0===i[o=u[e[c]]]?(i[o]=1,s[f]=c,l[++f]=o,c=n[o],h[f]=a=n[o+1]):++c},numeric.ccsLPSolve=function(r,n,e,i,t,u,o){var c,a,f,m,s,h,l,p,y,g=r[0],v=r[1],d=r[2],x=(g.length,n[0]),b=n[1],w=n[2];for(a=x[t],f=x[t+1],i.length=0,c=a;c<f;++c)o.dfs(u[b[c]],g,v,e,i,u);for(c=i.length-1;-1!==c;--c)e[i[c]]=0;for(c=a;c!==f;++c)e[m=u[b[c]]]=w[c];for(c=i.length-1;-1!==c;--c){for(s=g[m=i[c]],h=g[m+1],l=s;l<h;++l)if(u[v[l]]===m){e[m]/=d[l];break}for(y=e[m],l=s;l<h;++l)(p=u[v[l]])!==m&&(e[p]-=y*d[l])}return e},numeric.ccsLUP1=function(r,n){var e,i,t,u,o,c,a,f=r[0].length-1,m=[numeric.rep([f+1],0),[],[]],s=[numeric.rep([f+1],0),[],[]],h=m[0],l=m[1],p=m[2],y=s[0],g=s[1],v=s[2],d=numeric.rep([f],0),x=numeric.rep([f],0),b=numeric.ccsLPSolve,w=(Math.max,Math.abs),M=numeric.linspace(0,f-1),k=numeric.linspace(0,f-1),A=new numeric.ccsDFS(f);for(void 0===n&&(n=1),e=0;e<f;++e){for(b(m,r,d,x,e,k,A),u=-1,o=-1,i=x.length-1;-1!==i;--i)(t=x[i])<=e||(c=w(d[t]))>u&&(o=t,u=c);for(w(d[e])<n*u&&(i=M[e],u=M[o],M[e]=u,k[u]=e,M[o]=i,k[i]=o,u=d[e],d[e]=d[o],d[o]=u),u=h[e],o=y[e],a=d[e],l[u]=M[e],p[u]=1,++u,i=x.length-1;-1!==i;--i)c=d[t=x[i]],x[i]=0,d[t]=0,t<=e?(g[o]=t,v[o]=c,++o):(l[u]=M[t],p[u]=c/a,++u);h[e+1]=u,y[e+1]=o}for(i=l.length-1;-1!==i;--i)l[i]=k[l[i]];return{L:m,U:s,P:M,Pinv:k}},numeric.ccsDFS0=function(r){this.k=Array(r),this.k1=Array(r),this.j=Array(r)},numeric.ccsDFS0.prototype.dfs=function(r,n,e,i,t,u,o){var c,a,f,m=0,s=t.length,h=this.k,l=this.k1,p=this.j;if(0===i[r])for(i[r]=1,p[0]=r,h[0]=a=n[u[r]],l[0]=f=n[u[r]+1];;){if(isNaN(a))throw new Error("Ow!");if(a>=f){if(t[s]=u[p[m]],0===m)return;++s,a=h[--m],f=l[m]}else 0===i[c=e[a]]?(i[c]=1,h[m]=a,p[++m]=c,a=n[c=u[c]],l[m]=f=n[c+1]):++a}},numeric.ccsLPSolve0=function(r,n,e,i,t,u,o,c){var a,f,m,s,h,l,p,y,g,v=r[0],d=r[1],x=r[2],b=(v.length,n[0]),w=n[1],M=n[2];for(f=b[t],m=b[t+1],i.length=0,a=f;a<m;++a)c.dfs(w[a],v,d,e,i,u,o);for(a=i.length-1;-1!==a;--a)e[o[s=i[a]]]=0;for(a=f;a!==m;++a)e[s=w[a]]=M[a];for(a=i.length-1;-1!==a;--a){for(y=o[s=i[a]],h=v[s],l=v[s+1],p=h;p<l;++p)if(d[p]===y){e[y]/=x[p];break}for(g=e[y],p=h;p<l;++p)e[d[p]]-=g*x[p];e[y]=g}},numeric.ccsLUP0=function(r,n){var e,i,t,u,o,c,a,f=r[0].length-1,m=[numeric.rep([f+1],0),[],[]],s=[numeric.rep([f+1],0),[],[]],h=m[0],l=m[1],p=m[2],y=s[0],g=s[1],v=s[2],d=numeric.rep([f],0),x=numeric.rep([f],0),b=numeric.ccsLPSolve0,w=(Math.max,Math.abs),M=numeric.linspace(0,f-1),k=numeric.linspace(0,f-1),A=new numeric.ccsDFS0(f);for(void 0===n&&(n=1),e=0;e<f;++e){for(b(m,r,d,x,e,k,M,A),u=-1,o=-1,i=x.length-1;-1!==i;--i)(t=x[i])<=e||(c=w(d[M[t]]))>u&&(o=t,u=c);for(w(d[M[e]])<n*u&&(i=M[e],u=M[o],M[e]=u,k[u]=e,M[o]=i,k[i]=o),u=h[e],o=y[e],a=d[M[e]],l[u]=M[e],p[u]=1,++u,i=x.length-1;-1!==i;--i)c=d[M[t=x[i]]],x[i]=0,d[M[t]]=0,t<=e?(g[o]=t,v[o]=c,++o):(l[u]=M[t],p[u]=c/a,++u);h[e+1]=u,y[e+1]=o}for(i=l.length-1;-1!==i;--i)l[i]=k[l[i]];return{L:m,U:s,P:M,Pinv:k}},numeric.ccsLUP=numeric.ccsLUP0,numeric.ccsDim=function(r){return[numeric.sup(r[1])+1,r[0].length-1]},numeric.ccsGetBlock=function(r,n,e){var i=numeric.ccsDim(r),t=i[0],u=i[1];void 0===n?n=numeric.linspace(0,t-1):"number"==typeof n&&(n=[n]),void 0===e?e=numeric.linspace(0,u-1):"number"==typeof e&&(e=[e]);var o,c,a,f,m=n.length,s=e.length,h=numeric.rep([u],0),l=[],p=[],y=[h,l,p],g=r[0],v=r[1],d=r[2],x=numeric.rep([t],0),b=0,w=numeric.rep([t],0);for(c=0;c<s;++c){var M=g[f=e[c]],k=g[f+1];for(o=M;o<k;++o)w[a=v[o]]=1,x[a]=d[o];for(o=0;o<m;++o)w[n[o]]&&(l[b]=o,p[b]=x[n[o]],++b);for(o=M;o<k;++o)w[a=v[o]]=0;h[c+1]=b}return y},numeric.ccsDot=function(r,n){var e,i,t,u,o,c,a,f,m,s,h,l=r[0],p=r[1],y=r[2],g=n[0],v=n[1],d=n[2],x=numeric.ccsDim(r),b=numeric.ccsDim(n),w=x[0],M=(x[1],b[1]),k=numeric.rep([w],0),A=numeric.rep([w],0),T=Array(w),j=numeric.rep([M],0),S=[],_=[],V=[j,S,_];for(t=0;t!==M;++t){for(u=g[t],o=g[t+1],m=0,i=u;i<o;++i)for(s=v[i],h=d[i],c=l[s],a=l[s+1],e=c;e<a;++e)0===A[f=p[e]]&&(T[m]=f,A[f]=1,m+=1),k[f]=k[f]+y[e]*h;for(o=(u=j[t])+m,j[t+1]=o,i=m-1;-1!==i;--i)h=u+i,e=T[i],S[h]=e,_[h]=k[e],A[e]=0,k[e]=0;j[t+1]=j[t]+m}return V},numeric.ccsLUPSolve=function(r,n){var e=r.L,i=r.U,t=(r.P,n[0]),u=!1;"object"!=typeof t&&(t=(n=[[0,n.length],numeric.linspace(0,n.length-1),n])[0],u=!0);var o,c,a,f,m,s,h=n[1],l=n[2],p=e[0].length-1,y=t.length-1,g=numeric.rep([p],0),v=Array(p),d=numeric.rep([p],0),x=Array(p),b=numeric.rep([y+1],0),w=[],M=[],k=numeric.ccsTSolve,A=0;for(o=0;o<y;++o){for(m=0,a=t[o],f=t[o+1],c=a;c<f;++c)s=r.Pinv[h[c]],x[m]=s,d[s]=l[c],++m;for(x.length=m,k(e,d,g,x,v),c=x.length-1;-1!==c;--c)d[x[c]]=0;if(k(i,g,d,v,x),u)return d;for(c=v.length-1;-1!==c;--c)g[v[c]]=0;for(c=x.length-1;-1!==c;--c)s=x[c],w[A]=s,M[A]=d[s],d[s]=0,++A;b[o+1]=A}return[b,w,M]},numeric.ccsbinop=function(r,n){return void 0===n&&(n=""),Function("X","Y","var Xi = X[0], Xj = X[1], Xv = X[2];\nvar Yi = Y[0], Yj = Y[1], Yv = Y[2];\nvar n = Xi.length-1,m = Math.max(numeric.sup(Xj),numeric.sup(Yj))+1;\nvar Zi = numeric.rep([n+1],0), Zj = [], Zv = [];\nvar x = numeric.rep([m],0),y = numeric.rep([m],0);\nvar xk,yk,zk;\nvar i,j,j0,j1,k,p=0;\n"+n+"for(i=0;i<n;++i) {\n  j0 = Xi[i]; j1 = Xi[i+1];\n  for(j=j0;j!==j1;++j) {\n    k = Xj[j];\n    x[k] = 1;\n    Zj[p] = k;\n    ++p;\n  }\n  j0 = Yi[i]; j1 = Yi[i+1];\n  for(j=j0;j!==j1;++j) {\n    k = Yj[j];\n    y[k] = Yv[j];\n    if(x[k] === 0) {\n      Zj[p] = k;\n      ++p;\n    }\n  }\n  Zi[i+1] = p;\n  j0 = Xi[i]; j1 = Xi[i+1];\n  for(j=j0;j!==j1;++j) x[Xj[j]] = Xv[j];\n  j0 = Zi[i]; j1 = Zi[i+1];\n  for(j=j0;j!==j1;++j) {\n    k = Zj[j];\n    xk = x[k];\n    yk = y[k];\n"+r+"\n    Zv[j] = zk;\n  }\n  j0 = Xi[i]; j1 = Xi[i+1];\n  for(j=j0;j!==j1;++j) x[Xj[j]] = 0;\n  j0 = Yi[i]; j1 = Yi[i+1];\n  for(j=j0;j!==j1;++j) y[Yj[j]] = 0;\n}\nreturn [Zi,Zj,Zv];")},function(){var k,A,B,C;for(k in numeric.ops2)A=isFinite(eval("1"+numeric.ops2[k]+"0"))?"[Y[0],Y[1],numeric."+k+"(X,Y[2])]":"NaN",B=isFinite(eval("0"+numeric.ops2[k]+"1"))?"[X[0],X[1],numeric."+k+"(X[2],Y)]":"NaN",C=isFinite(eval("1"+numeric.ops2[k]+"0"))&&isFinite(eval("0"+numeric.ops2[k]+"1"))?"numeric.ccs"+k+"MM(X,Y)":"NaN",numeric["ccs"+k+"MM"]=numeric.ccsbinop("zk = xk "+numeric.ops2[k]+"yk;"),numeric["ccs"+k]=Function("X","Y",'if(typeof X === "number") return '+A+';\nif(typeof Y === "number") return '+B+";\nreturn "+C+";\n")}(),numeric.ccsScatter=function(r){var n,e=r[0],i=r[1],t=r[2],u=numeric.sup(i)+1,o=e.length,c=numeric.rep([u],0),a=Array(o),f=Array(o),m=numeric.rep([u],0);for(n=0;n<o;++n)m[i[n]]++;for(n=0;n<u;++n)c[n+1]=c[n]+m[n];var s,h,l=c.slice(0);for(n=0;n<o;++n)a[s=l[h=i[n]]]=e[n],f[s]=t[n],l[h]=l[h]+1;return[c,a,f]},numeric.ccsGather=function(r){var n,e,i,t,u,o=r[0],c=r[1],a=r[2],f=o.length-1,m=c.length,s=Array(m),h=Array(m),l=Array(m);for(u=0,n=0;n<f;++n)for(i=o[n],t=o[n+1],e=i;e!==t;++e)h[u]=n,s[u]=c[e],l[u]=a[e],++u;return[s,h,l]},numeric.sdim=function r(n,e,i){if(void 0===e&&(e=[]),"object"!=typeof n)return e;void 0===i&&(i=0),i in e||(e[i]=0),n.length>e[i]&&(e[i]=n.length);var t;for(t in n)n.hasOwnProperty(t)&&r(n[t],e,i+1);return e},numeric.sclone=function r(n,e,i){void 0===e&&(e=0),void 0===i&&(i=numeric.sdim(n).length);var t,u=Array(n.length);if(e===i-1){for(t in n)n.hasOwnProperty(t)&&(u[t]=n[t]);return u}for(t in n)n.hasOwnProperty(t)&&(u[t]=r(n[t],e+1,i));return u},numeric.sdiag=function(r){var n,e,i=r.length,t=Array(i);for(n=i-1;n>=1;n-=2)e=n-1,t[n]=[],t[n][n]=r[n],t[e]=[],t[e][e]=r[e];return 0===n&&(t[0]=[],t[0][0]=r[n]),t},numeric.sidentity=function(r){return numeric.sdiag(numeric.rep([r],1))},numeric.stranspose=function(r){var n,e,i,t=[];r.length;for(n in r)if(r.hasOwnProperty(n)){i=r[n];for(e in i)i.hasOwnProperty(e)&&("object"!=typeof t[e]&&(t[e]=[]),t[e][n]=i[e])}return t},numeric.sLUP=function(r,n){throw new Error("The function numeric.sLUP had a bug in it and has been removed. Please use the new numeric.ccsLUP function instead.")},numeric.sdotMM=function(r,n){var e,i,t,u,o,c,a,f=r.length,m=(n.length,numeric.stranspose(n)),s=m.length,h=Array(f);for(t=f-1;t>=0;t--){for(a=[],e=r[t],o=s-1;o>=0;o--){c=0,i=m[o];for(u in e)e.hasOwnProperty(u)&&u in i&&(c+=e[u]*i[u]);c&&(a[o]=c)}h[t]=a}return h},numeric.sdotMV=function(r,n){var e,i,t,u,o=r.length,c=Array(o);for(i=o-1;i>=0;i--){e=r[i],u=0;for(t in e)e.hasOwnProperty(t)&&n[t]&&(u+=e[t]*n[t]);u&&(c[i]=u)}return c},numeric.sdotVM=function(r,n){var e,i,t,u,o=[];for(e in r)if(r.hasOwnProperty(e)){t=n[e],u=r[e];for(i in t)t.hasOwnProperty(i)&&(o[i]||(o[i]=0),o[i]+=u*t[i])}return o},numeric.sdotVV=function(r,n){var e,i=0;for(e in r)r[e]&&n[e]&&(i+=r[e]*n[e]);return i},numeric.sdot=function(r,n){var e=numeric.sdim(r).length,i=numeric.sdim(n).length;switch(1e3*e+i){case 0:return r*n;case 1001:return numeric.sdotVV(r,n);case 2001:return numeric.sdotMV(r,n);case 1002:return numeric.sdotVM(r,n);case 2002:return numeric.sdotMM(r,n);default:throw new Error("numeric.sdot not implemented for tensors of order "+e+" and "+i)}},numeric.sscatter=function(r){var n,e,i,t,u=r[0].length,o=r.length,c=[];for(e=u-1;e>=0;--e)if(r[o-1][e]){for(t=c,i=0;i<o-2;i++)t[n=r[i][e]]||(t[n]=[]),t=t[n];t[r[i][e]]=r[i+1][e]}return c},numeric.sgather=function r(n,e,i){void 0===e&&(e=[]),void 0===i&&(i=[]);var t,u,o;t=i.length;for(u in n)if(n.hasOwnProperty(u))if(i[t]=parseInt(u),"number"==typeof(o=n[u])){if(o){if(0===e.length)for(u=t+1;u>=0;--u)e[u]=[];for(u=t;u>=0;--u)e[u].push(i[u]);e[t+1].push(o)}}else r(o,e,i);return i.length>t&&i.pop(),e},numeric.cLU=function(r){var n,e,i,t,u,o,c=r[0],a=r[1],f=r[2],m=c.length,s=0;for(n=0;n<m;n++)c[n]>s&&(s=c[n]);s++;var h,l=Array(s),p=Array(s),y=numeric.rep([s],1/0),g=numeric.rep([s],-1/0);for(i=0;i<m;i++)n=c[i],(e=a[i])<y[n]&&(y[n]=e),e>g[n]&&(g[n]=e);for(n=0;n<s-1;n++)g[n]>g[n+1]&&(g[n+1]=g[n]);for(n=s-1;n>=1;n--)y[n]<y[n-1]&&(y[n-1]=y[n]);var v=0;for(n=0;n<s;n++)p[n]=numeric.rep([g[n]-y[n]+1],0),l[n]=numeric.rep([n-y[n]],0),n-y[n]+1,v+=g[n]-n+1;for(i=0;i<m;i++)p[n=c[i]][a[i]-y[n]]=f[i];for(n=0;n<s-1;n++)for(t=n-y[n],b=p[n],e=n+1;y[e]<=n&&e<s;e++)if(u=n-y[e],o=g[n]-n,w=p[e],h=w[u]/b[t]){for(i=1;i<=o;i++)w[i+u]-=h*b[i+t];l[e][n-y[e]]=h}var d,x,b=[],w=[],M=[],k=[],A=[],T=[];for(m=0,d=0,n=0;n<s;n++){for(t=y[n],u=g[n],x=p[n],e=n;e<=u;e++)x[e-t]&&(b[m]=n,w[m]=e,M[m]=x[e-t],m++);for(x=l[n],e=t;e<n;e++)x[e-t]&&(k[d]=n,A[d]=e,T[d]=x[e-t],d++);k[d]=n,A[d]=n,T[d]=1,d++}return{U:[b,w,M],L:[k,A,T]}},numeric.cLUsolve=function(r,n){var e,i,t=r.L,u=r.U,o=numeric.clone(n),c=t[0],a=t[1],f=t[2],m=u[0],s=u[1],h=u[2],l=m.length,p=(c.length,o.length);for(i=0,e=0;e<p;e++){for(;a[i]<e;)o[e]-=f[i]*o[a[i]],i++;i++}for(i=l-1,e=p-1;e>=0;e--){for(;s[i]>e;)o[e]-=h[i]*o[s[i]],i--;o[e]/=h[i],i--}return o},numeric.cgrid=function(r,n){"number"==typeof r&&(r=[r,r]);var e,i,t,u=numeric.rep(r,-1);if("function"!=typeof n)switch(n){case"L":n=function(n,e){return n>=r[0]/2||e<r[1]/2};break;default:n=function(r,n){return!0}}for(t=0,e=1;e<r[0]-1;e++)for(i=1;i<r[1]-1;i++)n(e,i)&&(u[e][i]=t,t++);return u},numeric.cdelsq=function(r){var n,e,i,t,u,o=[[-1,0],[0,-1],[0,1],[1,0]],c=numeric.dim(r),a=c[0],f=c[1],m=[],s=[],h=[];for(n=1;n<a-1;n++)for(e=1;e<f-1;e++)if(!(r[n][e]<0)){for(i=0;i<4;i++)t=n+o[i][0],u=e+o[i][1],r[t][u]<0||(m.push(r[n][e]),s.push(r[t][u]),h.push(-1));m.push(r[n][e]),s.push(r[n][e]),h.push(4)}return[m,s,h]},numeric.cdotMV=function(r,n){var e,i,t,u=r[0],o=r[1],c=r[2],a=u.length;for(t=0,i=0;i<a;i++)u[i]>t&&(t=u[i]);for(t++,e=numeric.rep([t],0),i=0;i<a;i++)e[u[i]]+=c[i]*n[o[i]];return e},numeric.Spline=function(r,n,e,i,t){this.x=r,this.yl=n,this.yr=e,this.kl=i,this.kr=t},numeric.Spline.prototype._at=function(r,n){var r,e,i,t,u=this.x,o=this.yl,c=this.yr,a=this.kl,f=this.kr,m=numeric.add,s=numeric.sub,h=numeric.mul;e=s(h(a[n],u[n+1]-u[n]),s(c[n+1],o[n])),i=m(h(f[n+1],u[n]-u[n+1]),s(c[n+1],o[n]));var l=(t=(r-u[n])/(u[n+1]-u[n]))*(1-t);return m(m(m(h(1-t,o[n]),h(t,c[n+1])),h(e,l*(1-t))),h(i,l*t))},numeric.Spline.prototype.at=function(r){if("number"==typeof r){var n,e,i,t=this.x,u=t.length,o=Math.floor;for(n=0,e=u-1;e-n>1;)t[i=o((n+e)/2)]<=r?n=i:e=i;return this._at(r,n)}var c,u=r.length,a=Array(u);for(c=u-1;-1!==c;--c)a[c]=this.at(r[c]);return a},numeric.Spline.prototype.diff=function(){var r,n,e,i=this.x,t=this.yl,u=this.yr,o=this.kl,c=this.kr,a=t.length,f=o,m=c,s=Array(a),h=Array(a),l=numeric.add,p=numeric.mul,y=numeric.div,g=numeric.sub;for(r=a-1;-1!==r;--r)n=i[r+1]-i[r],e=g(u[r+1],t[r]),s[r]=y(l(p(e,6),p(o[r],-4*n),p(c[r+1],-2*n)),n*n),h[r+1]=y(l(p(e,-6),p(o[r],2*n),p(c[r+1],4*n)),n*n);return new numeric.Spline(i,f,m,s,h)},numeric.Spline.prototype.roots=function(){var r=[],n=this.x,e=this.yl,i=this.yr,t=this.kl,u=this.kr;"number"==typeof e[0]&&(e=[e],i=[i],t=[t],u=[u]);var o,c,a,f,m,s,h,l,p,y,g,v,d,x,b,w,M,k,A,T,j,S,_,V=e.length,P=n.length-1,r=Array(V),q=Math.sqrt;for(o=0;o!==V;++o){for(f=e[o],m=i[o],s=t[o],h=u[o],l=[],c=0;c!==P;c++){for(c>0&&m[c]*f[c]<0&&l.push(n[c]),w=n[c+1]-n[c],n[c],g=f[c],v=m[c+1],p=s[c]/w,d=(y=h[c+1]/w)+3*g+2*p-3*v,x=3*(y+p+2*(g-v)),(b=function(r){return r*r}(p-y+3*(g-v))+12*y*g)<=0?M=(k=d/x)>n[c]&&k<n[c+1]?[n[c],k,n[c+1]]:[n[c],n[c+1]]:(k=(d-q(b))/x,A=(d+q(b))/x,M=[n[c]],k>n[c]&&k<n[c+1]&&M.push(k),A>n[c]&&A<n[c+1]&&M.push(A),M.push(n[c+1])),j=M[0],k=this._at(j,c),a=0;a<M.length-1;a++)if(S=M[a+1],A=this._at(S,c),0!==k)if(0===A||k*A>0)j=S,k=A;else{for(var F=0;;){if((_=(k*S-A*j)/(k-A))<=j||_>=S)break;if((T=this._at(_,c))*A>0)S=_,A=T,-1===F&&(k*=.5),F=-1;else{if(!(T*k>0))break;j=_,k=T,1===F&&(A*=.5),F=1}}l.push(_),j=M[a+1],k=this._at(j,c)}else l.push(j),j=S,k=A;0===A&&l.push(S)}r[o]=l}return"number"==typeof this.yl[0]?r[0]:r},numeric.spline=function(r,n,e,i){var t,u=r.length,o=[],c=[],a=[],f=numeric.sub,m=numeric.mul,s=numeric.add;for(t=u-2;t>=0;t--)c[t]=r[t+1]-r[t],a[t]=f(n[t+1],n[t]);"string"!=typeof e&&"string"!=typeof i||(e=i="periodic");var h=[[],[],[]];switch(typeof e){case"undefined":o[0]=m(3/(c[0]*c[0]),a[0]),h[0].push(0,0),h[1].push(0,1),h[2].push(2/c[0],1/c[0]);break;case"string":o[0]=s(m(3/(c[u-2]*c[u-2]),a[u-2]),m(3/(c[0]*c[0]),a[0])),h[0].push(0,0,0),h[1].push(u-2,0,1),h[2].push(1/c[u-2],2/c[u-2]+2/c[0],1/c[0]);break;default:o[0]=e,h[0].push(0),h[1].push(0),h[2].push(1)}for(t=1;t<u-1;t++)o[t]=s(m(3/(c[t-1]*c[t-1]),a[t-1]),m(3/(c[t]*c[t]),a[t])),h[0].push(t,t,t),h[1].push(t-1,t,t+1),h[2].push(1/c[t-1],2/c[t-1]+2/c[t],1/c[t]);switch(typeof i){case"undefined":o[u-1]=m(3/(c[u-2]*c[u-2]),a[u-2]),h[0].push(u-1,u-1),h[1].push(u-2,u-1),h[2].push(1/c[u-2],2/c[u-2]);break;case"string":h[1][h[1].length-1]=0;break;default:o[u-1]=i,h[0].push(u-1),h[1].push(u-1),h[2].push(1)}o="number"!=typeof o[0]?numeric.transpose(o):[o];var l=Array(o.length);if("string"==typeof e)for(t=l.length-1;-1!==t;--t)l[t]=numeric.ccsLUPSolve(numeric.ccsLUP(numeric.ccsScatter(h)),o[t]),l[t][u-1]=l[t][0];else for(t=l.length-1;-1!==t;--t)l[t]=numeric.cLUsolve(numeric.cLU(h),o[t]);return l="number"==typeof n[0]?l[0]:numeric.transpose(l),new numeric.Spline(r,n,n,l,l)},numeric.fftpow2=function r(n,e){var i=n.length;if(1!==i){var t,u,o=Math.cos,c=Math.sin,a=Array(i/2),f=Array(i/2),m=Array(i/2),s=Array(i/2);for(u=i/2,t=i-1;-1!==t;--t)m[--u]=n[t],s[u]=e[t],--t,a[u]=n[t],f[u]=e[t];r(a,f),r(m,s),u=i/2;var h,l,p,y=-6.283185307179586/i;for(t=i-1;-1!==t;--t)-1===--u&&(u=i/2-1),l=o(h=y*t),p=c(h),n[t]=a[u]+l*m[u]-p*s[u],e[t]=f[u]+l*s[u]+p*m[u]}},numeric._ifftpow2=function r(n,e){var i=n.length;if(1!==i){var t,u,o=Math.cos,c=Math.sin,a=Array(i/2),f=Array(i/2),m=Array(i/2),s=Array(i/2);for(u=i/2,t=i-1;-1!==t;--t)m[--u]=n[t],s[u]=e[t],--t,a[u]=n[t],f[u]=e[t];r(a,f),r(m,s),u=i/2;var h,l,p,y=6.283185307179586/i;for(t=i-1;-1!==t;--t)-1===--u&&(u=i/2-1),l=o(h=y*t),p=c(h),n[t]=a[u]+l*m[u]-p*s[u],e[t]=f[u]+l*s[u]+p*m[u]}},numeric.ifftpow2=function(r,n){numeric._ifftpow2(r,n),numeric.diveq(r,r.length),numeric.diveq(n,n.length)},numeric.convpow2=function(r,n,e,i){numeric.fftpow2(r,n),numeric.fftpow2(e,i);var t,u,o,c,a;for(t=r.length-1;-1!==t;--t)u=r[t],c=n[t],o=e[t],a=i[t],r[t]=u*o-c*a,n[t]=u*a+c*o;numeric.ifftpow2(r,n)},numeric.T.prototype.fft=function(){var r,n,e=this.x,i=this.y,t=e.length,u=Math.log,o=u(2),c=Math.ceil(u(2*t-1)/o),a=Math.pow(2,c),f=numeric.rep([a],0),m=numeric.rep([a],0),s=Math.cos,h=Math.sin,l=-3.141592653589793/t,p=numeric.rep([a],0),y=numeric.rep([a],0);Math.floor(t/2);for(r=0;r<t;r++)p[r]=e[r];if(void 0!==i)for(r=0;r<t;r++)y[r]=i[r];for(f[0]=1,r=1;r<=a/2;r++)n=l*r*r,f[r]=s(n),m[r]=h(n),f[a-r]=s(n),m[a-r]=h(n);var g=new numeric.T(p,y),v=new numeric.T(f,m);return g=g.mul(v),numeric.convpow2(g.x,g.y,numeric.clone(v.x),numeric.neg(v.y)),g=g.mul(v),g.x.length=t,g.y.length=t,g},numeric.T.prototype.ifft=function(){var r,n,e=this.x,i=this.y,t=e.length,u=Math.log,o=u(2),c=Math.ceil(u(2*t-1)/o),a=Math.pow(2,c),f=numeric.rep([a],0),m=numeric.rep([a],0),s=Math.cos,h=Math.sin,l=3.141592653589793/t,p=numeric.rep([a],0),y=numeric.rep([a],0);Math.floor(t/2);for(r=0;r<t;r++)p[r]=e[r];if(void 0!==i)for(r=0;r<t;r++)y[r]=i[r];for(f[0]=1,r=1;r<=a/2;r++)n=l*r*r,f[r]=s(n),m[r]=h(n),f[a-r]=s(n),m[a-r]=h(n);var g=new numeric.T(p,y),v=new numeric.T(f,m);return g=g.mul(v),numeric.convpow2(g.x,g.y,numeric.clone(v.x),numeric.neg(v.y)),g=g.mul(v),g.x.length=t,g.y.length=t,g.div(t)},numeric.gradient=function(r,n){var e=n.length,i=r(n);if(isNaN(i))throw new Error("gradient: f(x) is a NaN!");var t,u,o,c,a,f,m,s,h,l=Math.max,p=numeric.clone(n),y=Array(e),l=(numeric.div,numeric.sub,Math.max),g=Math.abs,v=Math.min,d=0;for(t=0;t<e;t++)for(var x=l(1e-6*i,1e-8);;){if(++d>20)throw new Error("Numerical gradient fails");if(p[t]=n[t]+x,u=r(p),p[t]=n[t]-x,o=r(p),p[t]=n[t],isNaN(u)||isNaN(o))x/=16;else{if(y[t]=(u-o)/(2*x),c=n[t]-x,a=n[t],f=n[t]+x,m=(u-i)/x,s=(i-o)/x,h=l(g(y[t]),g(i),g(u),g(o),g(c),g(a),g(f),1e-8),!(v(l(g(m-y[t]),g(s-y[t]),g(m-s))/h,x/h)>.001))break;x/=16}}return y},numeric.uncmin=function(r,n,e,i,t,u,o){var c=numeric.gradient;void 0===o&&(o={}),void 0===e&&(e=1e-8),void 0===i&&(i=function(n){return c(r,n)}),void 0===t&&(t=1e3);var a,f,m=(n=numeric.clone(n)).length,s=r(n);if(isNaN(s))throw new Error("uncmin: f(x0) is a NaN!");var h=Math.max,l=numeric.norm2;e=h(e,numeric.epsilon);var p,y,g,v,d,x,b,w,M,k,A=o.Hinv||numeric.identity(m),T=numeric.dot,j=(numeric.inv,numeric.sub),S=numeric.add,_=numeric.tensor,V=numeric.div,P=numeric.mul,q=numeric.all,F=numeric.isFinite,L=numeric.neg,N=0,O="";for(y=i(n);N<t;){if("function"==typeof u&&u(N,n,s,y,A)){O="Callback returned true";break}if(!q(F(y))){O="Gradient has Infinity or NaN";break}if(p=L(T(A,y)),!q(F(p))){O="Search direction has Infinity or NaN";break}if((k=l(p))<e){O="Newton step smaller than tol";break}for(M=1,f=T(y,p),d=n;N<t&&!(M*k<e)&&(d=S(n,v=P(p,M)),(a=r(d))-s>=.1*M*f||isNaN(a));)M*=.5,++N;if(M*k<e){O="Line search step size smaller than tol";break}if(N===t){O="maxit reached during line search";break}A=j(S(A,P(((w=T(x=j(g=i(d),y),v))+T(x,b=T(A,x)))/(w*w),_(v,v))),V(S(_(b,v),_(v,b)),w)),n=d,s=a,y=g,++N}return{solution:n,f:s,gradient:y,invHessian:A,iterations:N,message:O}},numeric.Dopri=function(r,n,e,i,t,u,o){this.x=r,this.y=n,this.f=e,this.ymid=i,this.iterations=t,this.events=o,this.message=u},numeric.Dopri.prototype._at=function(r,n){function e(r){return r*r}var i,t,u,o,c,a,r,f,m,s,h,l=this,p=l.x,y=l.y,g=l.f,v=l.ymid,d=(p.length,Math.floor,numeric.add),x=numeric.mul,b=numeric.sub;return i=p[n],t=p[n+1],o=y[n],c=y[n+1],f=t-i,u=i+.5*f,a=v[n],m=b(g[n],x(o,1/(i-u)+2/(i-t))),s=b(g[n+1],x(c,1/(t-u)+2/(t-i))),h=[e(r-t)*(r-u)/e(i-t)/(i-u),e(r-i)*e(r-t)/e(i-u)/e(t-u),e(r-i)*(r-u)/e(t-i)/(t-u),(r-i)*e(r-t)*(r-u)/e(i-t)/(i-u),(r-t)*e(r-i)*(r-u)/e(i-t)/(t-u)],d(d(d(d(x(o,h[0]),x(a,h[1])),x(c,h[2])),x(m,h[3])),x(s,h[4]))},numeric.Dopri.prototype.at=function(r){var n,e,i,t=Math.floor;if("number"!=typeof r){var u=r.length,o=Array(u);for(n=u-1;-1!==n;--n)o[n]=this.at(r[n]);return o}var c=this.x;for(n=0,e=c.length-1;e-n>1;)c[i=t(.5*(n+e))]<=r?n=i:e=i;return this._at(r,n)},numeric.dopri=function(r,n,e,i,t,u,o){void 0===t&&(t=1e-6),void 0===u&&(u=1e3);var c,a,f,m,s,h,l,p,y,g,v,d,x,b=[r],w=[e],M=[i(r,e)],k=[],A=[.075,.225],T=[44/45,-56/15,32/9],j=[19372/6561,-25360/2187,64448/6561,-212/729],S=[9017/3168,-355/33,46732/5247,49/176,-5103/18656],_=[35/384,0,500/1113,125/192,-2187/6784,11/84],V=[.10013431883002395,0,.3918321794184259,-.02982460176594817,.05893268337240795,-.04497888809104361,.023904308236133973],P=[.2,.3,.8,8/9,1,1],q=[-71/57600,0,71/16695,-71/1920,17253/339200,-22/525,.025],F=0,L=(n-r)/10,N=0,O=numeric.add,U=numeric.mul,D=(Math.max,Math.min),B=Math.abs,R=numeric.norminf,X=Math.pow,E=numeric.any,Y=numeric.lt,I=numeric.and,Q=(numeric.sub,new numeric.Dopri(b,w,M,k,-1,""));for("function"==typeof o&&(v=o(r,e));r<n&&N<u;)if(++N,r+L>n&&(L=n-r),c=i(r+P[0]*L,O(e,U(.2*L,M[F]))),a=i(r+P[1]*L,O(O(e,U(A[0]*L,M[F])),U(A[1]*L,c))),f=i(r+P[2]*L,O(O(O(e,U(T[0]*L,M[F])),U(T[1]*L,c)),U(T[2]*L,a))),m=i(r+P[3]*L,O(O(O(O(e,U(j[0]*L,M[F])),U(j[1]*L,c)),U(j[2]*L,a)),U(j[3]*L,f))),s=i(r+P[4]*L,O(O(O(O(O(e,U(S[0]*L,M[F])),U(S[1]*L,c)),U(S[2]*L,a)),U(S[3]*L,f)),U(S[4]*L,m))),y=O(O(O(O(O(e,U(M[F],L*_[0])),U(a,L*_[2])),U(f,L*_[3])),U(m,L*_[4])),U(s,L*_[5])),h=i(r+L,y),l=O(O(O(O(O(U(M[F],L*q[0]),U(a,L*q[2])),U(f,L*q[3])),U(m,L*q[4])),U(s,L*q[5])),U(h,L*q[6])),(g="number"==typeof l?B(l):R(l))>t){if(L=.2*L*X(t/g,.25),r+L===r){Q.msg="Step size became too small";break}}else{if(k[F]=O(O(O(O(O(O(e,U(M[F],L*V[0])),U(a,L*V[2])),U(f,L*V[3])),U(m,L*V[4])),U(s,L*V[5])),U(h,L*V[6])),++F,b[F]=r+L,w[F]=y,M[F]=h,"function"==typeof o){var C,Z,H=r,z=r+.5*L;if(d=o(z,k[F-1]),x=I(Y(v,0),Y(0,d)),E(x)||(H=z,v=d,d=o(z=r+L,y),x=I(Y(v,0),Y(0,d))),E(x)){for(var G,$,W=0,J=1,K=1;;){if("number"==typeof v)Z=(K*d*H-J*v*z)/(K*d-J*v);else for(Z=z,p=v.length-1;-1!==p;--p)v[p]<0&&d[p]>0&&(Z=D(Z,(K*d[p]*H-J*v[p]*z)/(K*d[p]-J*v[p])));if(Z<=H||Z>=z)break;$=o(Z,C=Q._at(Z,F-1)),E(G=I(Y(v,0),Y(0,$)))?(z=Z,d=$,x=G,K=1,-1===W?J*=.5:J=1,W=-1):(H=Z,v=$,J=1,1===W?K*=.5:K=1,W=1)}return y=Q._at(.5*(r+Z),F-1),Q.f[F]=i(Z,C),Q.x[F]=Z,Q.y[F]=C,Q.ymid[F-1]=y,Q.events=x,Q.iterations=N,Q}}r+=L,e=y,v=d,L=D(.8*L*X(t/g,.25),4*L)}return Q.iterations=N,Q},numeric.LU=function(r,n){n=n||!1;var e,i,t,u,o,c,a,f,m,s=Math.abs,h=r.length,l=h-1,p=new Array(h);for(n||(r=numeric.clone(r)),t=0;t<h;++t){for(a=t,m=s((c=r[t])[t]),i=t+1;i<h;++i)m<(u=s(r[i][t]))&&(m=u,a=i);for(p[t]=a,a!=t&&(r[t]=r[a],r[a]=c,c=r[t]),o=c[t],e=t+1;e<h;++e)r[e][t]/=o;for(e=t+1;e<h;++e){for(f=r[e],i=t+1;i<l;++i)f[i]-=f[t]*c[i],f[++i]-=f[t]*c[i];i===l&&(f[i]-=f[t]*c[i])}}return{LU:r,P:p}},numeric.LUsolve=function(r,n){var e,i,t,u,o,c=r.LU,a=c.length,f=numeric.clone(n),m=r.P;for(e=a-1;-1!==e;--e)f[e]=n[e];for(e=0;e<a;++e)for(t=m[e],m[e]!==e&&(o=f[e],f[e]=f[t],f[t]=o),u=c[e],i=0;i<e;++i)f[e]-=f[i]*u[i];for(e=a-1;e>=0;--e){for(u=c[e],i=e+1;i<a;++i)f[e]-=f[i]*u[i];f[e]/=u[e]}return f},numeric.solve=function(r,n,e){return numeric.LUsolve(numeric.LU(r,e),n)},numeric.echelonize=function(r){var n,e,i,t,u,o,c,a,f=numeric.dim(r),m=f[0],s=f[1],h=numeric.identity(m),l=Array(m),p=Math.abs,y=numeric.diveq;for(r=numeric.clone(r),n=0;n<m;++n){for(i=0,u=r[n],o=h[n],e=1;e<s;++e)p(u[i])<p(u[e])&&(i=e);for(l[n]=i,y(o,u[i]),y(u,u[i]),e=0;e<m;++e)if(e!==n){for(a=(c=r[e])[i],t=s-1;-1!==t;--t)c[t]-=u[t]*a;for(c=h[e],t=m-1;-1!==t;--t)c[t]-=o[t]*a}}return{I:h,A:r,P:l}},numeric.__solveLP=function(r,n,e,i,t,u,o){var c,a,f,m,s=numeric.sum,h=(numeric.log,numeric.mul),l=numeric.sub,p=numeric.dot,y=numeric.div,g=numeric.add,v=r.length,d=e.length,x=!1,b=1,w=(numeric.transpose(n),numeric.svd,numeric.transpose),M=(numeric.leq,Math.sqrt),k=Math.abs,A=(numeric.muleq,numeric.norminf,numeric.any,Math.min),T=numeric.all,j=numeric.gt,S=Array(v),_=Array(d),V=(numeric.rep([d],1),numeric.solve),P=l(e,p(n,u)),q=p(r,r);for(f=0;f<t;++f){var F,L;for(F=d-1;-1!==F;--F)_[F]=y(n[F],P[F]);var N=w(_);for(F=v-1;-1!==F;--F)S[F]=s(N[F]);b=.25*k(q/p(r,S));var O=100*M(q/p(S,S));for((!isFinite(b)||b>O)&&(b=O),m=g(r,h(b,S)),a=p(N,_),F=v-1;-1!==F;--F)a[F][F]+=1;var U=y(P,p(n,L=V(a,y(m,b),!0))),D=1;for(F=d-1;-1!==F;--F)U[F]<0&&(D=A(D,-.999*U[F]));if(c=l(u,h(L,D)),P=l(e,p(n,c)),!T(j(P,0)))return{solution:u,message:"",iterations:f};if(u=c,b<i)return{solution:c,message:"",iterations:f};if(o){var B=p(r,m),R=p(n,m);for(x=!0,F=d-1;-1!==F;--F)if(B*R[F]<0){x=!1;break}}else x=!(u[v-1]>=0);if(x)return{solution:c,message:"Unbounded",iterations:f}}return{solution:u,message:"maximum iteration count exceeded",iterations:f}},numeric._solveLP=function(r,n,e,i,t){var u=r.length,o=e.length,c=(numeric.sum,numeric.log,numeric.mul,numeric.sub),a=numeric.dot,f=(numeric.div,numeric.add,numeric.rep([u],0).concat([1])),m=numeric.rep([o,1],-1),s=numeric.blockMatrix([[n,m]]),h=e,l=numeric.rep([u],0).concat(Math.max(0,numeric.sup(numeric.neg(e)))+1),p=numeric.__solveLP(f,s,h,i,t,l,!1),y=numeric.clone(p.solution);if(y.length=u,numeric.inf(c(e,a(n,y)))<0)return{solution:NaN,message:"Infeasible",iterations:p.iterations};var g=numeric.__solveLP(r,n,e,i,t-p.iterations,y,!0);return g.iterations+=p.iterations,g},numeric.solveLP=function(r,n,e,i,t,u,o){if(void 0===o&&(o=1e3),void 0===u&&(u=numeric.epsilon),void 0===i)return numeric._solveLP(r,n,e,u,o);var c,a=i.length,f=i[0].length,m=n.length,s=numeric.echelonize(i),h=numeric.rep([f],0),l=s.P,p=[];for(c=l.length-1;-1!==c;--c)h[l[c]]=1;for(c=f-1;-1!==c;--c)0===h[c]&&p.push(c);var y=numeric.getRange,g=numeric.linspace(0,a-1),v=numeric.linspace(0,m-1),d=y(i,g,p),x=y(n,v,l),b=y(n,v,p),w=numeric.dot,M=numeric.sub,k=w(x,s.I),A=M(b,w(k,d)),T=M(e,w(k,t)),j=Array(l.length),S=Array(p.length);for(c=l.length-1;-1!==c;--c)j[c]=r[l[c]];for(c=p.length-1;-1!==c;--c)S[c]=r[p[c]];var _=M(S,w(j,w(s.I,d))),V=numeric._solveLP(_,A,T,u,o),P=V.solution;if(P!=P)return V;var q=w(s.I,M(t,w(d,P))),F=Array(r.length);for(c=l.length-1;-1!==c;--c)F[l[c]]=q[c];for(c=p.length-1;-1!==c;--c)F[p[c]]=P[c];return{solution:F,message:V.message,iterations:V.iterations}},numeric.MPStoLP=function(r){function n(n){throw new Error("MPStoLP: "+n+"\nLine "+e+": "+r[e]+"\nCurrent state: "+c[o]+"\n")}r instanceof String&&r.split("\n");var e,i,t,u,o=0,c=["Initial state","NAME","ROWS","COLUMNS","RHS","BOUNDS","ENDATA"],a=r.length,f=0,m={},s=[],h=0,l={},p=0,y=[],g=[],v=[];for(e=0;e<a;++e){var d=(t=r[e]).match(/\S*/g),x=[];for(i=0;i<d.length;++i)""!==d[i]&&x.push(d[i]);if(0!==x.length){for(i=0;i<c.length&&t.substr(0,c[i].length)!==c[i];++i);if(i<c.length){if(o=i,1===i&&(u=x[1]),6===i)return{name:u,c:y,A:numeric.transpose(g),b:v,rows:m,vars:l}}else switch(o){case 0:case 1:n("Unexpected line");case 2:switch(x[0]){case"N":0===f?f=x[1]:n("Two or more N rows");break;case"L":m[x[1]]=h,s[h]=1,v[h]=0,++h;break;case"G":m[x[1]]=h,s[h]=-1,v[h]=0,++h;break;case"E":m[x[1]]=h,s[h]=0,v[h]=0,++h;break;default:n("Parse error "+numeric.prettyPrint(x))}break;case 3:l.hasOwnProperty(x[0])||(l[x[0]]=p,y[p]=0,g[p]=numeric.rep([h],0),++p);var b=l[x[0]];for(i=1;i<x.length;i+=2)if(x[i]!==f){var w=m[x[i]];g[b][w]=(s[w]<0?-1:1)*parseFloat(x[i+1])}else y[b]=parseFloat(x[i+1]);break;case 4:for(i=1;i<x.length;i+=2)v[m[x[i]]]=(s[m[x[i]]]<0?-1:1)*parseFloat(x[i+1]);break;case 5:break;case 6:n("Internal error")}}}n("Reached end of file without ENDATA")},numeric.seedrandom={pow:Math.pow,random:Math.random},function(r,n,e,i,t,u,o){function c(r){var n,i,t=this,u=r.length,o=0,c=t.i=t.j=t.m=0;for(t.S=[],t.c=[],u||(r=[u++]);o<e;)t.S[o]=o++;for(o=0;o<e;o++)c=m(c+(n=t.S[o])+r[o%u]),i=t.S[c],t.S[o]=i,t.S[c]=n;t.g=function(r){var n=t.S,i=m(t.i+1),u=n[i],o=m(t.j+u),c=n[o];n[i]=c,n[o]=u;for(var a=n[m(u+c)];--r;)c=n[o=m(o+(u=n[i=m(i+1)]))],n[i]=c,n[o]=u,a=a*e+n[m(u+c)];return t.i=i,t.j=o,a},t.g(e)}function a(r,n,e,i,t){if(e=[],t=typeof r,n&&"object"==t)for(i in r)if(i.indexOf("S")<5)try{e.push(a(r[i],n-1))}catch(r){}return e.length?e:r+("string"!=t?"\0":"")}function f(r,n,e,i){for(r+="",e=0,i=0;i<r.length;i++)n[m(i)]=m((e^=19*n[m(i)])+r.charCodeAt(i));r="";for(i in n)r+=String.fromCharCode(n[i]);return r}function m(r){return r&e-1}n.seedrandom=function(i,m){var s,h=[];return i=f(a(m?[i,r]:arguments.length?i:[(new Date).getTime(),r,window],3),h),s=new c(h),f(s.S,r),n.random=function(){for(var r=s.g(6),n=o,i=0;r<t;)r=(r+i)*e,n*=e,i=s.g(1);for(;r>=u;)r/=2,n/=2,i>>>=1;return(r+i)/n},i},o=n.pow(e,6),t=n.pow(2,t),u=2*t,f(n.random(),r)}([],numeric.seedrandom,256,0,52),function(r){function n(r){if("object"!=typeof r)return r;var e,i=[],t=r.length;for(e=0;e<t;e++)i[e+1]=n(r[e]);return i}function e(r){if("object"!=typeof r)return r;var n,i=[],t=r.length;for(n=1;n<t;n++)i[n-1]=e(r[n]);return i}function i(r,n,e){var i,t,u,o,c;for(u=1;u<=e;u+=1){for(r[u][u]=1/r[u][u],c=-r[u][u],i=1;i<u;i+=1)r[i][u]=c*r[i][u];if(o=u+1,e<o)break;for(t=o;t<=e;t+=1)for(c=r[u][t],r[u][t]=0,i=1;i<=u;i+=1)r[i][t]=r[i][t]+c*r[i][u]}}function t(r,n,e,i){var t,u,o,c;for(u=1;u<=e;u+=1){for(c=0,t=1;t<u;t+=1)c+=r[t][u]*i[t];i[u]=(i[u]-c)/r[u][u]}for(o=1;o<=e;o+=1)for(i[u=e+1-o]=i[u]/r[u][u],c=-i[u],t=1;t<u;t+=1)i[t]=i[t]+c*r[t][u]}function u(r,n,e,i){var t,u,o,c,a,f;for(u=1;u<=e;u+=1){if(i[1]=u,f=0,(o=u-1)<1){if((f=r[u][u]-f)<=0)break;r[u][u]=Math.sqrt(f)}else{for(c=1;c<=o;c+=1){for(a=r[c][u],t=1;t<c;t+=1)a-=r[t][u]*r[t][c];a/=r[c][c],r[c][u]=a,f+=a*a}if((f=r[u][u]-f)<=0)break;r[u][u]=Math.sqrt(f)}i[1]=0}}function o(r,n,e,o,c,a,f,m,s,h,l,p,y,g,v,d){function x(){return v[P+y]=v[P+y+1],v[P+y+1]=0,p[y]=0,y-=1,g[2]=g[2]+1,0}var b,w,M,k,A,T,j,S,_,V,P,q,F,L,N,O,U,D,B,R,X,E,Y,I,Q,C,Z;F=Math.min(o,h),M=2*o+F*(F+5)/2+2*h+1,I=1e-60;do{Q=1+.1*(I+=I),C=1+.2*I}while(Q<=1||C<=1);for(b=1;b<=o;b+=1)v[b]=n[b];for(b=o+1;b<=M;b+=1)v[b]=0;for(b=1;b<=h;b+=1)p[b]=0;if(A=[],0===d[1]){if(u(r,e,o,A),0!==A[1])return void(d[1]=2);t(r,e,o,n),i(r,e,o)}else{for(w=1;w<=o;w+=1)for(c[w]=0,b=1;b<=w;b+=1)c[w]=c[w]+r[b][w]*n[b];for(w=1;w<=o;w+=1)for(n[w]=0,b=w;b<=o;b+=1)n[w]=n[w]+r[w][b]*c[b]}for(a[1]=0,w=1;w<=o;w+=1)for(c[w]=n[w],a[1]=a[1]+v[w]*c[w],v[w]=0,b=w+1;b<=o;b+=1)r[b][w]=0;for(a[1]=-a[1]/2,d[1]=0,L=(V=(_=(P=(S=(j=o)+o)+F)+F+1)+F*(F+1)/2)+h,b=1;b<=h;b+=1){for(O=0,w=1;w<=o;w+=1)O+=f[w][b]*f[w][b];v[L+b]=Math.sqrt(O)}for(y=0,g[1]=0,g[2]=0,Z=0;;){if(999===(Z=function(){for(g[1]=g[1]+1,M=V,b=1;b<=h;b+=1){for(M+=1,O=-m[b],w=1;w<=o;w+=1)O+=f[w][b]*c[w];if(Math.abs(O)<I&&(O=0),b>l)v[M]=O;else if(v[M]=-Math.abs(O),O>0){for(w=1;w<=o;w+=1)f[w][b]=-f[w][b];m[b]=-m[b]}}for(b=1;b<=y;b+=1)v[V+p[b]]=0;for(q=0,N=0,b=1;b<=h;b+=1)v[V+b]<N*v[L+b]&&(q=b,N=v[V+b]/v[L+b]);return 0===q?999:0}()))return;for(;;){if(0===(Z=function(){for(b=1;b<=o;b+=1){for(O=0,w=1;w<=o;w+=1)O+=r[w][b]*f[w][q];v[b]=O}for(k=j,b=1;b<=o;b+=1)v[k+b]=0;for(w=y+1;w<=o;w+=1)for(b=1;b<=o;b+=1)v[k+b]=v[k+b]+r[b][w]*v[w];for(E=!0,b=y;b>=1;b-=1){for(O=v[b],k=(M=_+b*(b+3)/2)-b,w=b+1;w<=y;w+=1)O-=v[M]*v[S+w],M+=w;if(O/=v[k],v[S+b]=O,p[b]<l)break;if(O<0)break;E=!1,T=b}if(!E)for(U=v[P+T]/v[S+T],b=1;b<=y&&!(p[b]<l)&&!(v[S+b]<0);b+=1)(N=v[P+b]/v[S+b])<U&&(U=N,T=b);for(O=0,b=j+1;b<=j+o;b+=1)O+=v[b]*v[b];if(Math.abs(O)<=I){if(E)return d[1]=1,999;for(b=1;b<=y;b+=1)v[P+b]=v[P+b]-U*v[S+b];return v[P+y+1]=v[P+y+1]+U,700}for(O=0,b=1;b<=o;b+=1)O+=v[j+b]*f[b][q];for(D=-v[V+q]/O,Y=!0,E||U<D&&(D=U,Y=!1),b=1;b<=o;b+=1)c[b]=c[b]+D*v[j+b],Math.abs(c[b])<I&&(c[b]=0);for(a[1]=a[1]+D*O*(D/2+v[P+y+1]),b=1;b<=y;b+=1)v[P+b]=v[P+b]-D*v[S+b];if(v[P+y+1]=v[P+y+1]+D,!Y){for(O=-m[q],w=1;w<=o;w+=1)O+=c[w]*f[w][q];if(q>l)v[V+q]=O;else if(v[V+q]=-Math.abs(O),O>0){for(w=1;w<=o;w+=1)f[w][q]=-f[w][q];m[q]=-m[q]}return 700}for(p[y+=1]=q,M=_+(y-1)*y/2+1,b=1;b<=y-1;b+=1)v[M]=v[b],M+=1;if(y===o)v[M]=v[o];else{for(b=o;b>=y+1&&0!==v[b]&&(B=Math.max(Math.abs(v[b-1]),Math.abs(v[b])),R=Math.min(Math.abs(v[b-1]),Math.abs(v[b])),N=v[b-1]>=0?Math.abs(B*Math.sqrt(1+R*R/(B*B))):-Math.abs(B*Math.sqrt(1+R*R/(B*B))),B=v[b-1]/N,R=v[b]/N,1!==B);b-=1)if(0===B)for(v[b-1]=R*N,w=1;w<=o;w+=1)N=r[w][b-1],r[w][b-1]=r[w][b],r[w][b]=N;else for(v[b-1]=N,X=R/(1+B),w=1;w<=o;w+=1)N=B*r[w][b-1]+R*r[w][b],r[w][b]=X*(r[w][b-1]+N)-r[w][b],r[w][b-1]=N;v[M]=v[y]}return 0}()))break;if(999===Z)return;if(700===Z)if(T===y)x();else{for(;;)if(function(){if(M=_+T*(T+1)/2+1,k=M+T,0===v[k])return 798;if(B=Math.max(Math.abs(v[k-1]),Math.abs(v[k])),R=Math.min(Math.abs(v[k-1]),Math.abs(v[k])),N=v[k-1]>=0?Math.abs(B*Math.sqrt(1+R*R/(B*B))):-Math.abs(B*Math.sqrt(1+R*R/(B*B))),B=v[k-1]/N,R=v[k]/N,1===B)return 798;if(0===B){for(b=T+1;b<=y;b+=1)N=v[k-1],v[k-1]=v[k],v[k]=N,k+=b;for(b=1;b<=o;b+=1)N=r[b][T],r[b][T]=r[b][T+1],r[b][T+1]=N}else{for(X=R/(1+B),b=T+1;b<=y;b+=1)N=B*v[k-1]+R*v[k],v[k]=X*(v[k-1]+N)-v[k],v[k-1]=N,k+=b;for(b=1;b<=o;b+=1)N=B*r[b][T]+R*r[b][T+1],r[b][T+1]=X*(r[b][T]+N)-r[b][T+1],r[b][T]=N}}(),797!==(Z=function(){for(k=M-T,b=1;b<=T;b+=1)v[k]=v[M],M+=1,k+=1;return v[P+T]=v[P+T+1],p[T]=p[T+1],(T+=1)<y?797:0}()))break;x()}}}}numeric.solveQP=function(r,i,t,u,c,a){r=n(r),i=n(i),t=n(t);var f,m,s,h,l,p=[],y=[],g=[],v=[],d=[];if(c=c||0,a=a?n(a):[void 0,0],u=u?n(u):[],m=r.length-1,s=t[1].length-1,!u)for(f=1;f<=s;f+=1)u[f]=0;for(f=1;f<=s;f+=1)y[f]=0;for(h=Math.min(m,s),f=1;f<=m;f+=1)g[f]=0;for(p[1]=0,f=1;f<=2*m+h*(h+5)/2+2*s+1;f+=1)v[f]=0;for(f=1;f<=2;f+=1)d[f]=0;return o(r,i,m,m,g,p,t,u,m,s,c,y,0,d,v,a),l="",1===a[1]&&(l="constraints are inconsistent, no solution!"),2===a[1]&&(l="matrix D in quadratic function is not positive definite!"),{solution:e(g),value:e(p),unconstrained_solution:e(i),iterations:e(d),iact:e(y),message:l}}}(),numeric.svd=function(r){function n(r,n){return r=Math.abs(r),n=Math.abs(n),r>n?r*Math.sqrt(1+n*n/r/r):0==n?r:n*Math.sqrt(1+r*r/n/n)}var e,i=numeric.epsilon,t=1e-64/i,u=0,o=0,c=0,a=0,f=0,m=numeric.clone(r),s=m.length,h=m[0].length;if(s<h)throw"Need more rows than columns";var l=new Array(h),p=new Array(h);for(o=0;o<h;o++)l[o]=p[o]=0;var y=numeric.rep([h,h],0),g=0,v=0,d=0,x=0,b=0,w=0,M=0;for(o=0;o<h;o++){for(l[o]=v,M=0,f=o+1,c=o;c<s;c++)M+=m[c][o]*m[c][o];if(M<=t)v=0;else for(g=m[o][o],v=Math.sqrt(M),g>=0&&(v=-v),d=g*v-M,m[o][o]=g-v,c=f;c<h;c++){for(M=0,a=o;a<s;a++)M+=m[a][o]*m[a][c];for(g=M/d,a=o;a<s;a++)m[a][c]+=g*m[a][o]}for(p[o]=v,M=0,c=f;c<h;c++)M+=m[o][c]*m[o][c];if(M<=t)v=0;else{for(g=m[o][o+1],v=Math.sqrt(M),g>=0&&(v=-v),d=g*v-M,m[o][o+1]=g-v,c=f;c<h;c++)l[c]=m[o][c]/d;for(c=f;c<s;c++){for(M=0,a=f;a<h;a++)M+=m[c][a]*m[o][a];for(a=f;a<h;a++)m[c][a]+=M*l[a]}}(b=Math.abs(p[o])+Math.abs(l[o]))>x&&(x=b)}for(o=h-1;-1!=o;o+=-1){if(0!=v){for(d=v*m[o][o+1],c=f;c<h;c++)y[c][o]=m[o][c]/d;for(c=f;c<h;c++){for(M=0,a=f;a<h;a++)M+=m[o][a]*y[a][c];for(a=f;a<h;a++)y[a][c]+=M*y[a][o]}}for(c=f;c<h;c++)y[o][c]=0,y[c][o]=0;y[o][o]=1,v=l[o],f=o}for(o=h-1;-1!=o;o+=-1){for(f=o+1,v=p[o],c=f;c<h;c++)m[o][c]=0;if(0!=v){for(d=m[o][o]*v,c=f;c<h;c++){for(M=0,a=f;a<s;a++)M+=m[a][o]*m[a][c];for(g=M/d,a=o;a<s;a++)m[a][c]+=g*m[a][o]}for(c=o;c<s;c++)m[c][o]=m[c][o]/v}else for(c=o;c<s;c++)m[c][o]=0;m[o][o]+=1}for(i*=x,a=h-1;-1!=a;a+=-1)for(var k=0;k<50;k++){var A=!1;for(f=a;-1!=f;f+=-1){if(Math.abs(l[f])<=i){A=!0;break}if(Math.abs(p[f-1])<=i)break}if(!A){u=0,M=1;var T=f-1;for(o=f;o<a+1&&(g=M*l[o],l[o]=u*l[o],!(Math.abs(g)<=i));o++)for(d=n(g,v=p[o]),p[o]=d,u=v/d,M=-g/d,c=0;c<s;c++)b=m[c][T],w=m[c][o],m[c][T]=b*u+w*M,m[c][o]=-b*M+w*u}if(w=p[a],f==a){if(w<0)for(p[a]=-w,c=0;c<h;c++)y[c][a]=-y[c][a];break}if(k>=49)throw"Error: no convergence.";for(x=p[f],v=n(g=(((b=p[a-1])-w)*(b+w)+((v=l[a-1])-(d=l[a]))*(v+d))/(2*d*b),1),g=g<0?((x-w)*(x+w)+d*(b/(g-v)-d))/x:((x-w)*(x+w)+d*(b/(g+v)-d))/x,u=1,M=1,o=f+1;o<a+1;o++){for(v=l[o],b=p[o],d=M*v,v*=u,w=n(g,d),l[o-1]=w,g=x*(u=g/w)+v*(M=d/w),v=-x*M+v*u,d=b*M,b*=u,c=0;c<h;c++)x=y[c][o-1],w=y[c][o],y[c][o-1]=x*u+w*M,y[c][o]=-x*M+w*u;for(w=n(g,d),p[o-1]=w,g=(u=g/w)*v+(M=d/w)*b,x=-M*v+u*b,c=0;c<s;c++)b=m[c][o-1],w=m[c][o],m[c][o-1]=b*u+w*M,m[c][o]=-b*M+w*u}l[f]=0,l[a]=g,p[a]=x}for(o=0;o<p.length;o++)p[o]<i&&(p[o]=0);for(o=0;o<h;o++)for(c=o-1;c>=0;c--)if(p[c]<p[o]){for(u=p[c],p[c]=p[o],p[o]=u,a=0;a<m.length;a++)e=m[a][o],m[a][o]=m[a][c],m[a][c]=e;for(a=0;a<y.length;a++)e=y[a][o],y[a][o]=y[a][c],y[a][c]=e;o=c}return{U:m,S:p,V:y}};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-formulajs\\node_modules\\numeric\\numeric-1.2.6.js","/..\\ff-formulajs\\node_modules\\numeric",undefined)
},{"_process":79,"buffer":76}],52:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var tracer=require("tracer"),format="HH.MM.ssl",logLevel=process.env.ENV||"info",levels={debug:{DEBUG:!0,TRACE:!0,INFO:!1},info:{DEBUG:!1,TRACE:!1,INFO:!0},error:{DEBUG:!1,TRACE:!1,INFO:!1,WARN:!1},trace:{DEBUG:!0,TRACE:!0,INFO:!0}},console=tracer.colorConsole({format:"{{timestamp}} ({{file}}:{{line}}) \t- {{message}}",dateformat:format,level:logLevel});console.DEBUG=levels[logLevel].DEBUG,console.INFO=levels[logLevel].INFO,console.TRACE=levels[logLevel].TRACE,module.exports=console,exports=console;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-formulajs\\node_modules\\ff-log\\ff-log.js","/..\\ff-formulajs\\node_modules\\ff-log",undefined)
},{"_process":79,"buffer":76,"tracer":69}],53:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function build(r){var e=function r(){return applyStyle.apply(r,arguments)};return e._styles=r,e.__proto__=proto,e}function applyStyle(){var r=arguments,e=r.length,o=0!==e&&String(arguments[0]);if(e>1)for(var s=1;s<e;s++)o+=" "+r[s];if(!colors.enabled||!o)return o;for(var t=this._styles,n=t.length;n--;){var l=ansiStyles[t[n]];o=l.open+o.replace(l.closeRe,l.open)+l.close}return o}function applyTheme(r){for(var e in r)!function(e){colors[e]=function(o){if("object"==typeof r[e]){var s=o;for(var t in r[e])s=colors[r[e][t]](s);return s}return colors[r[e]](o)}}(e)}function init(){var r={};return Object.keys(styles).forEach(function(e){r[e]={get:function(){return build([e])}}}),r}var colors={};module.exports=colors,colors.themes={};var ansiStyles=colors.styles=require("./styles"),defineProps=Object.defineProperties;colors.supportsColor=require("./system/supports-colors"),void 0===colors.enabled&&(colors.enabled=colors.supportsColor),colors.stripColors=colors.strip=function(r){return(""+r).replace(/\x1B\[\d+m/g,"")};var stylize=colors.stylize=function(r,e){return colors.enabled?ansiStyles[e].open+r+ansiStyles[e].close:r+""},matchOperatorsRe=/[|\\{}()[\]^$+*?.]/g,escapeStringRegexp=function(r){if("string"!=typeof r)throw new TypeError("Expected a string");return r.replace(matchOperatorsRe,"\\$&")},styles=function(){var r={};return ansiStyles.grey=ansiStyles.gray,Object.keys(ansiStyles).forEach(function(e){ansiStyles[e].closeRe=new RegExp(escapeStringRegexp(ansiStyles[e].close),"g"),r[e]={get:function(){return build(this._styles.concat(e))}}}),r}(),proto=defineProps(function(){},styles);colors.setTheme=function(r){if("string"==typeof r)try{return colors.themes[r]=require(r),applyTheme(colors.themes[r]),colors.themes[r]}catch(r){return console.log(r),r}else applyTheme(r)};var sequencer=function(r,e){var o=e.split("");return(o=o.map(r)).join("")};colors.trap=require("./custom/trap"),colors.zalgo=require("./custom/zalgo"),colors.maps={},colors.maps.america=require("./maps/america"),colors.maps.zebra=require("./maps/zebra"),colors.maps.rainbow=require("./maps/rainbow"),colors.maps.random=require("./maps/random");for(var map in colors.maps)!function(r){colors[r]=function(e){return sequencer(colors.maps[r],e)}}(map);defineProps(colors,init());

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-log\\node_modules\\colors\\lib\\colors.js","/..\\ff-log\\node_modules\\colors\\lib",undefined)
},{"./custom/trap":54,"./custom/zalgo":55,"./maps/america":56,"./maps/rainbow":57,"./maps/random":58,"./maps/zebra":59,"./styles":60,"./system/supports-colors":61,"_process":79,"buffer":76}],54:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
module.exports=function(o,t){var r="",a={a:["@","Ą","Ⱥ","Ʌ","Δ","Λ","Д"],b:["ß","Ɓ","Ƀ","ɮ","β","฿"],c:["©","Ȼ","Ͼ"],d:["Ð","Ɗ","Ԁ","ԁ","Ԃ","ԃ"],e:["Ë","ĕ","Ǝ","ɘ","Σ","ξ","Ҽ","੬"],f:["Ӻ"],g:["ɢ"],h:["Ħ","ƕ","Ң","Һ","Ӈ","Ԋ"],i:["༏"],j:["Ĵ"],k:["ĸ","Ҡ","Ӄ","Ԟ"],l:["Ĺ"],m:["ʍ","Ӎ","ӎ","Ԡ","ԡ","൩"],n:["Ñ","ŋ","Ɲ","Ͷ","Π","Ҋ"],o:["Ø","õ","ø","Ǿ","ʘ","Ѻ","ם","۝","๏"],p:["Ƿ","Ҏ"],q:["্"],r:["®","Ʀ","Ȑ","Ɍ","ʀ","Я"],s:["§","Ϟ","ϟ","Ϩ"],t:["Ł","Ŧ","ͳ"],u:["Ʊ","Ս"],v:["ט"],w:["Ш","Ѡ","Ѽ","൰"],x:["Ҳ","Ӿ","Ӽ","ӽ"],y:["¥","Ұ","Ӌ"],z:["Ƶ","ɀ"]};return(o=(o=o||"Run the trap, drop the bass").split("")).forEach(function(o){o=o.toLowerCase();var t=a[o]||[" "],e=Math.floor(Math.random()*t.length);r+=void 0!==a[o]?a[o][e]:o}),r};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-log\\node_modules\\colors\\lib\\custom\\trap.js","/..\\ff-log\\node_modules\\colors\\lib\\custom",undefined)
},{"_process":79,"buffer":76}],55:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
module.exports=function(i,n){function o(i){return Math.floor(Math.random()*i)}function d(i){var n=!1;return u.filter(function(o){n=o===i}),n}i=i||"   he is here   ";var r={up:["̍","̎","̄","̅","̿","̑","̆","̐","͒","͗","͑","̇","̈","̊","͂","̓","̈","͊","͋","͌","̃","̂","̌","͐","̀","́","̋","̏","̒","̓","̔","̽","̉","ͣ","ͤ","ͥ","ͦ","ͧ","ͨ","ͩ","ͪ","ͫ","ͬ","ͭ","ͮ","ͯ","̾","͛","͆","̚"],down:["̖","̗","̘","̙","̜","̝","̞","̟","̠","̤","̥","̦","̩","̪","̫","̬","̭","̮","̯","̰","̱","̲","̳","̹","̺","̻","̼","ͅ","͇","͈","͉","͍","͎","͓","͔","͕","͖","͙","͚","̣"],mid:["̕","̛","̀","́","͘","̡","̢","̧","̨","̴","̵","̶","͜","͝","͞","͟","͠","͢","̸","̷","͡"," ҉"]},u=[].concat(r.up,r.down,r.mid);return function(i,n){var u,e,t="";(n=n||{}).up=void 0===n.up||n.up,n.mid=void 0===n.mid||n.mid,n.down=void 0===n.down||n.down,n.size=void 0!==n.size?n.size:"maxi",i=i.split("");for(e in i)if(!d(e)){switch(t+=i[e],u={up:0,down:0,mid:0},n.size){case"mini":u.up=o(8),u.mid=o(2),u.down=o(8);break;case"maxi":u.up=o(16)+3,u.mid=o(4)+1,u.down=o(64)+3;break;default:u.up=o(8)+1,u.mid=o(6)/2,u.down=o(8)+1}var a=["up","mid","down"];for(var m in a)for(var f=a[m],p=0;p<=u[f];p++)n[f]&&(t+=r[f][o(r[f].length)])}return t}(i,n)};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-log\\node_modules\\colors\\lib\\custom\\zalgo.js","/..\\ff-log\\node_modules\\colors\\lib\\custom",undefined)
},{"_process":79,"buffer":76}],56:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var colors=require("../colors");module.exports=function(r,e,o){if(" "===r)return r;switch(e%3){case 0:return colors.red(r);case 1:return colors.white(r);case 2:return colors.blue(r)}};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-log\\node_modules\\colors\\lib\\maps\\america.js","/..\\ff-log\\node_modules\\colors\\lib\\maps",undefined)
},{"../colors":53,"_process":79,"buffer":76}],57:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var colors=require("../colors");module.exports=function(){var r=["red","yellow","green","blue","magenta"];return function(e,o,n){return" "===e?e:colors[r[o++%r.length]](e)}}();

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-log\\node_modules\\colors\\lib\\maps\\rainbow.js","/..\\ff-log\\node_modules\\colors\\lib\\maps",undefined)
},{"../colors":53,"_process":79,"buffer":76}],58:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var colors=require("../colors");module.exports=function(){var e=["underline","inverse","grey","yellow","red","green","blue","white","cyan","magenta"];return function(r,n,o){return" "===r?r:colors[e[Math.round(Math.random()*(e.length-1))]](r)}}();

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-log\\node_modules\\colors\\lib\\maps\\random.js","/..\\ff-log\\node_modules\\colors\\lib\\maps",undefined)
},{"../colors":53,"_process":79,"buffer":76}],59:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var colors=require("../colors");module.exports=function(r,o,e){return o%2==0?r:colors.inverse(r)};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-log\\node_modules\\colors\\lib\\maps\\zebra.js","/..\\ff-log\\node_modules\\colors\\lib\\maps",undefined)
},{"../colors":53,"_process":79,"buffer":76}],60:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var styles={};module.exports=styles;var codes={reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29],black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],gray:[90,39],grey:[90,39],bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],blackBG:[40,49],redBG:[41,49],greenBG:[42,49],yellowBG:[43,49],blueBG:[44,49],magentaBG:[45,49],cyanBG:[46,49],whiteBG:[47,49]};Object.keys(codes).forEach(function(e){var l=codes[e],a=styles[e]=[];a.open="["+l[0]+"m",a.close="["+l[1]+"m"});

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-log\\node_modules\\colors\\lib\\styles.js","/..\\ff-log\\node_modules\\colors\\lib",undefined)
},{"_process":79,"buffer":76}],61:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var argv=process.argv;module.exports=-1===argv.indexOf("--no-color")&&-1===argv.indexOf("--color=false")&&(-1!==argv.indexOf("--color")||-1!==argv.indexOf("--color=true")||-1!==argv.indexOf("--color=always")||!(process.stdout&&!process.stdout.isTTY)&&("win32"===process.platform||("COLORTERM"in process.env||"dumb"!==process.env.TERM&&!!/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM))));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-log\\node_modules\\colors\\lib\\system\\supports-colors.js","/..\\ff-log\\node_modules\\colors\\lib\\system",undefined)
},{"_process":79,"buffer":76}],62:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var colors=require("./lib/colors");module.exports=colors;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-log\\node_modules\\colors\\safe.js","/..\\ff-log\\node_modules\\colors",undefined)
},{"./lib/colors":53,"_process":79,"buffer":76}],63:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
!function(e){"use strict";function t(e,t){for(e=String(e),t=t||2;e.length<t;)e="0"+e;return e}function a(e){var t=new Date(e.getFullYear(),e.getMonth(),e.getDate());t.setDate(t.getDate()-(t.getDay()+6)%7+3);var a=new Date(t.getFullYear(),0,4);a.setDate(a.getDate()-(a.getDay()+6)%7+3);var n=t.getTimezoneOffset()-a.getTimezoneOffset();t.setHours(t.getHours()-n);var r=(t-a)/6048e5;return 1+Math.floor(r)}function n(e){var t=e.getDay();return 0===t&&(t=7),t}function r(e){return null===e?"null":void 0===e?"undefined":"object"!=typeof e?typeof e:Array.isArray(e)?"array":{}.toString.call(e).slice(8,-1).toLowerCase()}var d=function(){var e=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|'[^']*'|'[^']*'/g,s=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,y=/[^-+\dA-Z]/g;return function(m,i,o,u){if(1!==arguments.length||"string"!==r(m)||/\d/.test(m)||(i=m,m=void 0),(m=m||new Date)instanceof Date||(m=new Date(m)),isNaN(m))throw TypeError("Invalid date");var l=(i=String(d.masks[i]||i||d.masks.default)).slice(0,4);"UTC:"!==l&&"GMT:"!==l||(i=i.slice(4),o=!0,"GMT:"===l&&(u=!0));var M=o?"getUTC":"get",T=m[M+"Date"](),c=m[M+"Day"](),f=m[M+"Month"](),g=m[M+"FullYear"](),h=m[M+"Hours"](),D=m[M+"Minutes"](),p=m[M+"Seconds"](),H=m[M+"Milliseconds"](),S=o?0:m.getTimezoneOffset(),v=a(m),b=n(m),N={d:T,dd:t(T),ddd:d.i18n.dayNames[c],dddd:d.i18n.dayNames[c+7],m:f+1,mm:t(f+1),mmm:d.i18n.monthNames[f],mmmm:d.i18n.monthNames[f+12],yy:String(g).slice(2),yyyy:g,h:h%12||12,hh:t(h%12||12),H:h,HH:t(h),M:D,MM:t(D),s:p,ss:t(p),l:t(H,3),L:t(Math.round(H/10)),t:h<12?"a":"p",tt:h<12?"am":"pm",T:h<12?"A":"P",TT:h<12?"AM":"PM",Z:u?"GMT":o?"UTC":(String(m).match(s)||[""]).pop().replace(y,""),o:(S>0?"-":"+")+t(100*Math.floor(Math.abs(S)/60)+Math.abs(S)%60,4),S:["th","st","nd","rd"][T%10>3?0:(T%100-T%10!=10)*T%10],W:v,N:b};return i.replace(e,function(e){return e in N?N[e]:e.slice(1,e.length-1)})}}();d.masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:sso",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"},d.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]},"function"==typeof define&&define.amd?define(function(){return d}):"object"==typeof exports?module.exports=d:e.dateFormat=d}(this);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-log\\node_modules\\dateformat\\lib\\dateformat.js","/..\\ff-log\\node_modules\\dateformat\\lib",undefined)
},{"_process":79,"buffer":76}],64:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
module.exports=require("./tinytim");var cache={};module.exports.clearCache=function(){cache={}},module.exports.render=module.exports.tim,module.exports.renderFile=function(e,r,t){var c=require("fs"),o=e+":string",u=t?cache[o]||(cache[o]=c.readFileSync(e,"utf8")):c.readFileSync(e,"utf8");return module.exports.render(u,r)};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-log\\node_modules\\tinytim\\lib\\index.js","/..\\ff-log\\node_modules\\tinytim\\lib",undefined)
},{"./tinytim":65,"_process":79,"buffer":76,"fs":75}],65:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
var start=exports.start="{{",end=exports.end="}}",tim=exports.tim=function(){"use strict";return function(t,r){var e=new RegExp(exports.start+"\\s*([a-z0-9_][\\.a-z0-9_]*)\\s*"+exports.end,"gi");return t.replace(e,function(t,e){for(var n=e.split("."),o=n.length,i=r,s=0;s<o;s++){if(void 0===(i=i[n[s]]))throw new Error("tim: '"+n[s]+"' not found in "+t);if(s===o-1)return i}})}}();

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-log\\node_modules\\tinytim\\lib\\tinytim.js","/..\\ff-log\\node_modules\\tinytim\\lib",undefined)
},{"_process":79,"buffer":76}],66:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
"use strict";var colors=require("colors/safe");module.exports=function(r){return require("./console")({filters:{trace:colors.magenta,debug:colors.cyan,info:colors.green,warn:colors.yellow,error:colors.red.bold}},r)};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-log\\node_modules\\tracer\\lib\\color_console.js","/..\\ff-log\\node_modules\\tracer\\lib",undefined)
},{"./console":67,"_process":79,"buffer":76,"colors/safe":62}],67:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
"use strict";function logMain(t,e,r,a,i,o,s){var n=settings.level;if("string"==typeof n&&(n=t.methods.indexOf(n)),!(e<n)){var l={timestamp:dateFormat(new Date,t.dateformat),message:"",title:r,level:e,args:s};if(l.method=l.path=l.line=l.pos=l.file="",o){var f=(new Error).stack.split("\n").slice(3),p=f[t.stackIndex]||f[0],u=stackReg.exec(p)||stackReg2.exec(p);u&&5===u.length&&(l.method=u[1],l.path=u[2],l.line=u[3],l.pos=u[4],l.file=path.basename(l.path),l.stack=f.join("\n"))}t.preprocess(l);var m=utils.format.apply(t,l.args);l.message=m,l.output=tinytim.tim(a,l);for(var c=i.length,d=0;d<c;d+=1)if(l.output=fwrap(i[d])(l.output),!l.output)return l;return t.transport.forEach(function(t){t(l)}),l}}var tinytim=require("tinytim"),dateFormat=require("dateformat"),utils=require("./utils"),path=require("path"),settings=require("./settings").settings,noop=function(){},fwrap=function(t){return function(e){return t(e)}},stackReg=/at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i,stackReg2=/at\s+()(.*):(\d*):(\d*)/i;module.exports=function(){var t={format:"{{timestamp}} <{{title}}> {{file}}:{{line}} ({{method}}) {{message}}",dateformat:"isoDateTime",preprocess:function(t){},transport:function(t){t.level>=4?console.error(t.output):console.log(t.output)},filters:[],level:"log",methods:["log","trace","debug","info","warn","error","fatal"],stackIndex:0,inspectOpt:{showHidden:!1,depth:2}},e={};(t=utils.union(t,arguments)).format=Array.isArray(t.format)?t.format:[t.format],t.filters=Array.isArray(t.filters)?t.filters:[t.filters],t.transport=Array.isArray(t.transport)?t.transport:[t.transport];var r,a=t.filters.length;return a>0&&"[object Function]"!=Object.prototype.toString.call(t.filters[--a])&&(r=t.filters[a],t.filters=t.filters.slice(0,a)),"string"==typeof t.level&&(t.level=t.methods.indexOf(t.level)),t.methods.forEach(function(a,i){if(i<t.level)e[a]=noop;else{var o=t.format[0];2===t.format.length&&t.format[1][a]&&(o=t.format[1][a]);var s,n=/{{(method|path|line|pos|file|stack)}}/i.test(o);s=r&&r[a]?Array.isArray(r[a])?r[a]:[r[a]]:t.filters,e[a]=function(){return logMain(t,i,a,o,s,n,arguments)}}}),e};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-log\\node_modules\\tracer\\lib\\console.js","/..\\ff-log\\node_modules\\tracer\\lib",undefined)
},{"./settings":70,"./utils":71,"_process":79,"buffer":76,"dateformat":63,"path":78,"tinytim":64}],68:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
"use strict";var fs=require("fs"),dateFormat=require("dateformat"),tinytim=require("tinytim"),utils=require("./utils"),spawn=require("child_process").spawn,spawnSync=require("child_process").spawnSync,path=require("path");module.exports=function(t){function e(t,e){this.date=e,this.path=tinytim.tim(o.logPathFormat,{root:o.root,prefix:t,date:e}),spawnSync("mkdir",["-p",o.root]),this.stream=fs.createWriteStream(this.path,{flags:"a",encoding:"utf8",mode:parseInt("0644",8)})}function r(t,r){if(o.allLogsFileName){var a=i.allLogFile,s=dateFormat(new Date,o.splitFormat);a&&a.date!=s&&(a.destroy(),a=null),a||(a=i.allLogFile=new e(o.allLogsFileName,s),spawn("find",["./","-type","f","-name","*.log","-mtime","+"+o.maxLogFiles,"-exec","rm","{}",";"])),a.write(t)}else{var n=i[r],s=dateFormat(new Date,o.splitFormat);n&&n.date!=s&&(n.destroy(),n=null),n||(n=i[r]=new e(r,s),spawn("find",[o.root,"-type","f","-name","*.log","-mtime","+"+o.maxLogFiles,"-exec","rm","{}",";"])),n.write(t)}}function a(t){r(t.output,t.title)}var o={root:".",logPathFormat:"{{root}}/{{prefix}}.{{date}}.log",splitFormat:"yyyymmdd",allLogsFileName:!1,maxLogFiles:10};o=utils.union(o,[t]),e.prototype.write=function(t){this.stream.write(t+"\n")},e.prototype.destroy=function(){this.stream&&(this.stream.end(),this.stream.destroySoon(),this.stream=null)};var i={};return t.transport?(t.transport=Array.isArray(t.transport)?t.transport:[t.transport],t.transport.push(a)):t.transport=[a],require("./console")(t)};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-log\\node_modules\\tracer\\lib\\dailyfile.js","/..\\ff-log\\node_modules\\tracer\\lib",undefined)
},{"./console":67,"./utils":71,"_process":79,"buffer":76,"child_process":75,"dateformat":63,"fs":75,"path":78,"tinytim":64}],69:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
"use strict";exports.console=require("./console"),exports.colorConsole=require("./color_console"),exports.dailyfile=require("./dailyfile");var settings=require("./settings");exports.close=settings.close,exports.setLevel=settings.setLevel,exports.getLevel=settings.getLevel;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-log\\node_modules\\tracer\\lib\\index.js","/..\\ff-log\\node_modules\\tracer\\lib",undefined)
},{"./color_console":66,"./console":67,"./dailyfile":68,"./settings":70,"_process":79,"buffer":76}],70:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
"use strict";var settings={level:void 0},close=function(){settings.level=Number.MAX_VALUE},setLevel=function(e){settings.level=e},getLevel=function(){return settings.level};exports.settings=settings,exports.close=close,exports.setLevel=setLevel,exports.getLevel=getLevel;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-log\\node_modules\\tracer\\lib\\settings.js","/..\\ff-log\\node_modules\\tracer\\lib",undefined)
},{"_process":79,"buffer":76}],71:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
"use strict";exports.union=function(r,t){for(var e=0,n=t.length;e<n;e+=1){var i=t[e];for(var u in i)r[u]=i[u]}return r};var formatRegExp=/%[sdjt]/g,util=require("util");exports.format=function(r){var t=this.inspectOpt,e=arguments,n=0;if("string"!=typeof r){for(var i=[];n<e.length;n++)i.push(util.inspect(e[n],t));return i.join(" ")}n=1;for(var u=String(r).replace(formatRegExp,function(r){switch(r){case"%s":return String(e[n++]);case"%d":return Number(e[n++]);case"%j":try{return e[n]instanceof Error?JSON.stringify(e[n++],["message","stack","type","name"]):JSON.stringify(e[n++])}catch(r){return"[Circular]"}case"%t":return util.inspect(e[n++],t);default:return r}}),s=e.length,a=e[n];n<s;a=e[++n])u+=null===a||"object"!=typeof a?" "+a:" "+util.inspect(a,t);return u};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-log\\node_modules\\tracer\\lib\\utils.js","/..\\ff-log\\node_modules\\tracer\\lib",undefined)
},{"_process":79,"buffer":76,"util":82}],72:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function initJSMath(r){for(var e in r){var n=r[e];void 0===global[e]?"object"==typeof n?(logger.debug("Added function[%s] arguments[%s] body: [%s]",e,n.args,n.body),global[e]=new Function(n.args,n.body)):global[e]=n:logger.debug("Function ["+e+"] is already defined.")}}var logger=require("../ff-log"),jsMath={Length:{args:"v1",body:"return String(v1).length"},OnER:{args:"v,onerrv",body:"{ if (isNaN(v)) { return onerrv; } return v; }"},OnEr:{args:"v,onerrv",body:"{ if (isNaN(v)) { return onerrv; } return v; }"},OnZero:{args:"v,onzerov",body:"{ if (v <= 0) { return onzerov; } return v;}"},If:{args:"o,v1,v2",body:"{ if (o) { return v1; } else { return v2; }}"},OnNA:{args:"v,onnav",body:"{ if (v == undefined || isNaN(v)) { return onnav; } return v;}"},SUM:{args:"values",body:"{ var returnValue = 0; for (var i = 0; i < values.length; i++) { returnValue += values[i]; } return returnValue; }"},OnNeg:{args:"arg0,arg1",body:"{ if (arg0 < 0) { return arg1; } return arg0;}"},OnZeroOrNA:{args:"arg0,arg1",body:"{ if (arg0 == undefined || isNaN(arg0)) { return arg1; } return arg0;}"},OnZeroOrNa:{args:"v,arg1",body:"{ if (v == undefined || isNaN(v)) { return arg1; } return v;}"},Exp:{args:"v",body:"{ return Math.pow(v, 2);}"},OnERorNA:{args:"v,onerrornav",body:"{ if (v == undefined || isNaN(v)) { return onerrornav; } return v;}"},Round:{args:"v,decimals",body:"{ var pow = Math.pow(10, decimals); return Math.round(v * pow) / pow;}"},AVG:{args:"vs",body:"EJS.AVERAGE(vs)"},MATCH:{args:"v,p",body:"{ return v === undefined? false : v.match(p); }"},ZeroOnNaN:{args:"v",body:"{ return parseFloat(isNaN(v) ? 0 : v); }"},VALIDDATE:{args:"d",body:"{ if (Object.prototype.toString.call(d) === '[object Date]' ) {if ( isNaN( d.getTime() ) ) {  return false; } else { return true; } }else { return false; } }"},LOOKUP:{args:"key",body:"{ return CACHE[key]; }"},GET:{args:"url,name",body:"{ $.getJSON( 'js/data.json', function( data ) { CACHE[name] = data; }); }"},TupleCount:{args:"x",body:"{ return 1; }"},TupleSum:{args:"value",body:"{ return value; }"},EvaluateAsString:{args:"value",body:"{ return String(value) }"},FirstUC:{args:"value",body:"{ return value }"},AddMonth:{args:"value,ammount",body:"{ return 1 }"},Visible:{args:"variableOrValue",body:"{ return 1 }"},ForAll:{args:"elements",body:"{ for (var i = 0; i < elements.length; i++) { if (elements[i] ){ return 1 } } return 0; }"},PROXY:{args:"proxy",body:"{ return proxy }"},GetTitle:{args:"one",body:"{ return 'tst' }"},Pos:{args:"one,two",body:"{ if (two===undefined){return -1};return two.indexOf(one) }"},Count:{args:"elements",body:"{ var counter = 0; for (var i = 0; i < elements.length; i++) { if (elements[i] ){ counter++ } } return counter; }"},TupleMin:{args:"one",body:"{ return 1 }"},TupleMax:{args:"one",body:"{ return 1 }"},ValueT:{args:"one",body:"{ var retrunValue = 1; while(one.prev.hash){ retrunValue++;one=one.prev } return retrunValue }"},FirstValueT:{args:"x,values,first,last",body:"{ return x }"},LastValueT:{args:"one",body:"{ return 1 }"},DMYtoDate:{args:"d,m,y",body:"{ return new Date(d,m,y).toLocaleString(); }"},DataEntered:{args:"one",body:"{ return one }"},LastTInFormulaSet:{args:"x,x2",body:"{ return x }"},LastTinFormulaSet:{args:"x,x2",body:"{ return x }"},FirstTinFormulaSet:{args:"x,x2",body:"{ return x }"},FirstTInFormulaset:{args:"x,x2",body:"{ return x }"},FirstTInFormulaSet:{args:"x,x2",body:"{ return x }"},FirstTinPeriod:{args:"x,x2",body:"{ return x }"},LastTinPeriod:{args:"x,x2",body:"{ return x }"},LastTinYear:{args:"x",body:"{ return x }"},FirstDateInT:{args:"one",body:"{ return 1 }"},FirstT:{args:"one",body:"{ return 1 }"},LastT:{args:"one",body:"{ return 1 }"},TableLookup:{args:"row,col",body:"{ return row + col }"},HINT:{args:"one",body:"{ return 1 }"},GetFrac:{args:"one",body:"{ return 1 }"},VSum:{args:"one",body:"{ return 1 }"},FormulasetInT:{args:"one",body:"{ return 1 }"},RelMut:{args:"one",body:"{ return 1 }"},YearInT:{args:"one",body:"{ return 1 }"},YearToT:{args:"one",body:"{ return 1 }"},PMT:{args:"one",body:"{ return 1 }"},NPV2:{args:"one",body:"{ return 1 }"},GetT:{args:"one",body:"{ return 1 }"},FirstTInYear:{args:"one",body:"{ return 1 }"},FirstTinYear:{args:"one",body:"{ return 1 }"},TsY:{args:"one",body:"{ return 1 }"},FirstTinformulaset:{args:"one",body:"{ return 1 }"},PeriodInT:{args:"one",body:"{ return 1 }"},LastDateInT:{args:"one",body:"return 2016"},FirstTinFormulaset:{args:"one",body:"{ return 1 }"},GetValue:{args:"one",body:"{ return 1 }"},FesExpression:{args:"one",body:"{ return one }"},RoundUp:{args:"num,precision",body:"return Math.ceil(num * precision) / precision"},Mut:{args:"one",body:"{ return 1 }"},HSum:{args:"one",body:"{ return 1 }"},HSUM:{args:"one",body:"{ return 1 }"},VSUM:{args:"one",body:"{ return 1 }"},GetPoint:{args:"one",body:"return 1"},Exists:{args:"one",body:"return 1"},DateToMonth:{args:"one",body:"return one"},HAvg:{args:"one",body:"return 1"},HOVR:{args:"one",body:"return 1"},BaseCurrencyValue:{args:"one",body:"return 1"},TitleEntered:{args:"one",body:"return 1"},LastTinFormulaset:{args:"one",body:"return one"},FirstLC:{args:"one",body:"return 1"},ExpandFraction:{args:"one",body:"return 1"},ExpandLevel:{args:"one",body:"return 1"},MaxValueT:{args:"one",body:"return 1"},ValueOfT:{args:"one",body:"return 1"},GuessTerm:{args:"one",body:"return 1"},ExpandOriginalValue:{args:"one",body:"return 1"},Datetot:{args:"one",body:"return x"},DateToT:{args:"x",body:"return x"},Not:{args:"one",body:"return !one"},not:{args:"one",body:"return !one"},Str:{args:"one",body:"return ''+one;"},DateToYear:{args:"one",body:"return new Date(one)"},DateToDay:{args:"one",body:"return 1"},CumNormal:{args:"one",body:"return 1"},SubStr:{args:"value,from,to",body:"return String(value).substring(from,to)"},Val:{args:"one",body:"return 1"},SumFor:{args:"one,two,three,fours",body:"return 1"},MinMax:{args:"value,min,max,fallback",body:"return value < min ? fallback : value > max ? fallback : value"},PPMT:{args:"one",body:"return 1"},IRR:{args:"one",body:"return 1"},LN:{args:"one",body:"return 1"},BivarNormal:{args:"one",body:"return 1"},GoalSeek:{args:"one",body:"return 1"},TupleInstanceIndex:{args:"",body:"return 1"},OnNEG:{args:"a,b",body:"{ if (a < 0) { return a; } return b;}"},OnError:{args:"a,b",body:"{ if (isNaN(a)) { return b; } return a;}"},DateStr:{args:"string",body:"{ return string }"},DateToYearNum:{args:"string",body:"{ return string }"},VAL:{args:"string",body:"{ return string }"},BeforeStr:{args:"string",body:"{ return string }"},AfterStr:{args:"string",body:"{ return string }"},MutCalc:1,CalculatedInBaseCurrency:1,PeriodinT:1,TimeAggregated:!1,Bookyear:1,ScaleFactor:1,Self:1,Notrend:1,NoTrend:1,Trend:1,ApplicationStartDateTime:1,Values:1,MainPeriod:3,X:1,MaxT:1,FAM:1,Now:1,NA:1e-10,On:1,No:0,Off:0,True:1,False:0,SETTINGS:{LANGUAGE:"en"},ViewScaleFactor:1,Backward:1,Decimals:2,CACHE:{}},entries={};HSUM=function(r,e,n,o,a,t,u,s){for(var d=0,g=u||o.first.index;g<s||o.last.index;g++)d+=e(r,o[g],a,t,n);return d},initJSMath(jsMath),exports.mathJs={name:"ff-math",entries:entries};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\ff-math\\ff-math.js","/..\\ff-math",undefined)
},{"../ff-log":52,"_process":79,"buffer":76}],73:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
"use strict";function compare(e,t){if(e===t)return 0;for(var r=e.length,n=t.length,i=0,a=Math.min(r,n);i<a;++i)if(e[i]!==t[i]){r=e[i],n=t[i];break}return r<n?-1:n<r?1:0}function isBuffer(e){return global.Buffer&&"function"==typeof global.Buffer.isBuffer?global.Buffer.isBuffer(e):!(null==e||!e._isBuffer)}function pToString(e){return Object.prototype.toString.call(e)}function isView(e){return!isBuffer(e)&&("function"==typeof global.ArrayBuffer&&("function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(e):!!e&&(e instanceof DataView||!!(e.buffer&&e.buffer instanceof ArrayBuffer))))}function getName(e){if(util.isFunction(e)){if(functionsHaveNames)return e.name;var t=e.toString().match(regex);return t&&t[1]}}function truncate(e,t){return"string"==typeof e?e.length<t?e:e.slice(0,t):e}function inspect(e){if(functionsHaveNames||!util.isFunction(e))return util.inspect(e);var t=getName(e);return"[Function"+(t?": "+t:"")+"]"}function getMessage(e){return truncate(inspect(e.actual),128)+" "+e.operator+" "+truncate(inspect(e.expected),128)}function fail(e,t,r,n,i){throw new assert.AssertionError({message:r,actual:e,expected:t,operator:n,stackStartFunction:i})}function ok(e,t){e||fail(e,!0,t,"==",assert.ok)}function _deepEqual(e,t,r,n){if(e===t)return!0;if(isBuffer(e)&&isBuffer(t))return 0===compare(e,t);if(util.isDate(e)&&util.isDate(t))return e.getTime()===t.getTime();if(util.isRegExp(e)&&util.isRegExp(t))return e.source===t.source&&e.global===t.global&&e.multiline===t.multiline&&e.lastIndex===t.lastIndex&&e.ignoreCase===t.ignoreCase;if(null!==e&&"object"==typeof e||null!==t&&"object"==typeof t){if(isView(e)&&isView(t)&&pToString(e)===pToString(t)&&!(e instanceof Float32Array||e instanceof Float64Array))return 0===compare(new Uint8Array(e.buffer),new Uint8Array(t.buffer));if(isBuffer(e)!==isBuffer(t))return!1;var i=(n=n||{actual:[],expected:[]}).actual.indexOf(e);return-1!==i&&i===n.expected.indexOf(t)||(n.actual.push(e),n.expected.push(t),objEquiv(e,t,r,n))}return r?e===t:e==t}function isArguments(e){return"[object Arguments]"==Object.prototype.toString.call(e)}function objEquiv(e,t,r,n){if(null===e||void 0===e||null===t||void 0===t)return!1;if(util.isPrimitive(e)||util.isPrimitive(t))return e===t;if(r&&Object.getPrototypeOf(e)!==Object.getPrototypeOf(t))return!1;var i=isArguments(e),a=isArguments(t);if(i&&!a||!i&&a)return!1;if(i)return e=pSlice.call(e),t=pSlice.call(t),_deepEqual(e,t,r);var s,o,u=objectKeys(e),f=objectKeys(t);if(u.length!==f.length)return!1;for(u.sort(),f.sort(),o=u.length-1;o>=0;o--)if(u[o]!==f[o])return!1;for(o=u.length-1;o>=0;o--)if(s=u[o],!_deepEqual(e[s],t[s],r,n))return!1;return!0}function notDeepStrictEqual(e,t,r){_deepEqual(e,t,!0)&&fail(e,t,r,"notDeepStrictEqual",notDeepStrictEqual)}function expectedException(e,t){if(!e||!t)return!1;if("[object RegExp]"==Object.prototype.toString.call(t))return t.test(e);try{if(e instanceof t)return!0}catch(e){}return!Error.isPrototypeOf(t)&&!0===t.call({},e)}function _tryBlock(e){var t;try{e()}catch(e){t=e}return t}function _throws(e,t,r,n){var i;if("function"!=typeof t)throw new TypeError('"block" argument must be a function');"string"==typeof r&&(n=r,r=null),i=_tryBlock(t),n=(r&&r.name?" ("+r.name+").":".")+(n?" "+n:"."),e&&!i&&fail(i,r,"Missing expected exception"+n);var a="string"==typeof n,s=!e&&util.isError(i),o=!e&&i&&!r;if((s&&a&&expectedException(i,r)||o)&&fail(i,r,"Got unwanted exception"+n),e&&i&&r&&!expectedException(i,r)||!e&&i)throw i}var util=require("util/"),hasOwn=Object.prototype.hasOwnProperty,pSlice=Array.prototype.slice,functionsHaveNames="foo"===function(){}.name,assert=module.exports=ok,regex=/\s*function\s+([^\(\s]*)\s*/;assert.AssertionError=function(e){this.name="AssertionError",this.actual=e.actual,this.expected=e.expected,this.operator=e.operator,e.message?(this.message=e.message,this.generatedMessage=!1):(this.message=getMessage(this),this.generatedMessage=!0);var t=e.stackStartFunction||fail;if(Error.captureStackTrace)Error.captureStackTrace(this,t);else{var r=new Error;if(r.stack){var n=r.stack,i=getName(t),a=n.indexOf("\n"+i);if(a>=0){var s=n.indexOf("\n",a+1);n=n.substring(s+1)}this.stack=n}}},util.inherits(assert.AssertionError,Error),assert.fail=fail,assert.ok=ok,assert.equal=function(e,t,r){e!=t&&fail(e,t,r,"==",assert.equal)},assert.notEqual=function(e,t,r){e==t&&fail(e,t,r,"!=",assert.notEqual)},assert.deepEqual=function(e,t,r){_deepEqual(e,t,!1)||fail(e,t,r,"deepEqual",assert.deepEqual)},assert.deepStrictEqual=function(e,t,r){_deepEqual(e,t,!0)||fail(e,t,r,"deepStrictEqual",assert.deepStrictEqual)},assert.notDeepEqual=function(e,t,r){_deepEqual(e,t,!1)&&fail(e,t,r,"notDeepEqual",assert.notDeepEqual)},assert.notDeepStrictEqual=notDeepStrictEqual,assert.strictEqual=function(e,t,r){e!==t&&fail(e,t,r,"===",assert.strictEqual)},assert.notStrictEqual=function(e,t,r){e===t&&fail(e,t,r,"!==",assert.notStrictEqual)},assert.throws=function(e,t,r){_throws(!0,e,t,r)},assert.doesNotThrow=function(e,t,r){_throws(!1,e,t,r)},assert.ifError=function(e){if(e)throw e};var objectKeys=Object.keys||function(e){var t=[];for(var r in e)hasOwn.call(e,r)&&t.push(r);return t};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\assert\\assert.js","/node_modules\\assert",undefined)
},{"_process":79,"buffer":76,"util/":82}],74:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
"use strict";function placeHoldersCount(o){var r=o.length;if(r%4>0)throw new Error("Invalid string. Length must be a multiple of 4");return"="===o[r-2]?2:"="===o[r-1]?1:0}function byteLength(o){return 3*o.length/4-placeHoldersCount(o)}function toByteArray(o){var r,e,t,u,n,p=o.length;u=placeHoldersCount(o),n=new Arr(3*p/4-u),e=u>0?p-4:p;var a=0;for(r=0;r<e;r+=4)t=revLookup[o.charCodeAt(r)]<<18|revLookup[o.charCodeAt(r+1)]<<12|revLookup[o.charCodeAt(r+2)]<<6|revLookup[o.charCodeAt(r+3)],n[a++]=t>>16&255,n[a++]=t>>8&255,n[a++]=255&t;return 2===u?(t=revLookup[o.charCodeAt(r)]<<2|revLookup[o.charCodeAt(r+1)]>>4,n[a++]=255&t):1===u&&(t=revLookup[o.charCodeAt(r)]<<10|revLookup[o.charCodeAt(r+1)]<<4|revLookup[o.charCodeAt(r+2)]>>2,n[a++]=t>>8&255,n[a++]=255&t),n}function tripletToBase64(o){return lookup[o>>18&63]+lookup[o>>12&63]+lookup[o>>6&63]+lookup[63&o]}function encodeChunk(o,r,e){for(var t,u=[],n=r;n<e;n+=3)t=(o[n]<<16)+(o[n+1]<<8)+o[n+2],u.push(tripletToBase64(t));return u.join("")}function fromByteArray(o){for(var r,e=o.length,t=e%3,u="",n=[],p=0,a=e-t;p<a;p+=16383)n.push(encodeChunk(o,p,p+16383>a?a:p+16383));return 1===t?(r=o[e-1],u+=lookup[r>>2],u+=lookup[r<<4&63],u+="=="):2===t&&(r=(o[e-2]<<8)+o[e-1],u+=lookup[r>>10],u+=lookup[r>>4&63],u+=lookup[r<<2&63],u+="="),n.push(u),n.join("")}exports.byteLength=byteLength,exports.toByteArray=toByteArray,exports.fromByteArray=fromByteArray;for(var lookup=[],revLookup=[],Arr="undefined"!=typeof Uint8Array?Uint8Array:Array,code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i=0,len=code.length;i<len;++i)lookup[i]=code[i],revLookup[code.charCodeAt(i)]=i;revLookup["-".charCodeAt(0)]=62,revLookup["_".charCodeAt(0)]=63;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\base64-js\\index.js","/node_modules\\base64-js",undefined)
},{"_process":79,"buffer":76}],75:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\browserify\\lib\\_empty.js","/node_modules\\browserify\\lib",undefined)
},{"_process":79,"buffer":76}],76:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
"use strict";function typedArraySupport(){try{var e=new Uint8Array(1);return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()}catch(e){return!1}}function createBuffer(e){if(e>K_MAX_LENGTH)throw new RangeError("Invalid typed array length");var t=new Uint8Array(e);return t.__proto__=Buffer.prototype,t}function Buffer(e,t,r){if("number"==typeof e){if("string"==typeof t)throw new Error("If encoding is specified then the first argument must be a string");return allocUnsafe(e)}return from(e,t,r)}function from(e,t,r){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');return isArrayBuffer(e)?fromArrayBuffer(e,t,r):"string"==typeof e?fromString(e,t):fromObject(e)}function assertSize(e){if("number"!=typeof e)throw new TypeError('"size" argument must be a number');if(e<0)throw new RangeError('"size" argument must not be negative')}function alloc(e,t,r){return assertSize(e),e<=0?createBuffer(e):void 0!==t?"string"==typeof r?createBuffer(e).fill(t,r):createBuffer(e).fill(t):createBuffer(e)}function allocUnsafe(e){return assertSize(e),createBuffer(e<0?0:0|checked(e))}function fromString(e,t){if("string"==typeof t&&""!==t||(t="utf8"),!Buffer.isEncoding(t))throw new TypeError('"encoding" must be a valid string encoding');var r=0|byteLength(e,t),n=createBuffer(r),f=n.write(e,t);return f!==r&&(n=n.slice(0,f)),n}function fromArrayLike(e){for(var t=e.length<0?0:0|checked(e.length),r=createBuffer(t),n=0;n<t;n+=1)r[n]=255&e[n];return r}function fromArrayBuffer(e,t,r){if(t<0||e.byteLength<t)throw new RangeError("'offset' is out of bounds");if(e.byteLength<t+(r||0))throw new RangeError("'length' is out of bounds");var n;return n=void 0===t&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,t):new Uint8Array(e,t,r),n.__proto__=Buffer.prototype,n}function fromObject(e){if(Buffer.isBuffer(e)){var t=0|checked(e.length),r=createBuffer(t);return 0===r.length?r:(e.copy(r,0,0,t),r)}if(e){if(isArrayBufferView(e)||"length"in e)return"number"!=typeof e.length||numberIsNaN(e.length)?createBuffer(0):fromArrayLike(e);if("Buffer"===e.type&&Array.isArray(e.data))return fromArrayLike(e.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function checked(e){if(e>=K_MAX_LENGTH)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+K_MAX_LENGTH.toString(16)+" bytes");return 0|e}function SlowBuffer(e){return+e!=e&&(e=0),Buffer.alloc(+e)}function byteLength(e,t){if(Buffer.isBuffer(e))return e.length;if(isArrayBufferView(e)||isArrayBuffer(e))return e.byteLength;"string"!=typeof e&&(e=""+e);var r=e.length;if(0===r)return 0;for(var n=!1;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":case void 0:return utf8ToBytes(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return base64ToBytes(e).length;default:if(n)return utf8ToBytes(e).length;t=(""+t).toLowerCase(),n=!0}}function slowToString(e,t,r){var n=!1;if((void 0===t||t<0)&&(t=0),t>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if(r>>>=0,t>>>=0,r<=t)return"";for(e||(e="utf8");;)switch(e){case"hex":return hexSlice(this,t,r);case"utf8":case"utf-8":return utf8Slice(this,t,r);case"ascii":return asciiSlice(this,t,r);case"latin1":case"binary":return latin1Slice(this,t,r);case"base64":return base64Slice(this,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return utf16leSlice(this,t,r);default:if(n)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),n=!0}}function swap(e,t,r){var n=e[t];e[t]=e[r],e[r]=n}function bidirectionalIndexOf(e,t,r,n,f){if(0===e.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),r=+r,numberIsNaN(r)&&(r=f?0:e.length-1),r<0&&(r=e.length+r),r>=e.length){if(f)return-1;r=e.length-1}else if(r<0){if(!f)return-1;r=0}if("string"==typeof t&&(t=Buffer.from(t,n)),Buffer.isBuffer(t))return 0===t.length?-1:arrayIndexOf(e,t,r,n,f);if("number"==typeof t)return t&=255,"function"==typeof Uint8Array.prototype.indexOf?f?Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):arrayIndexOf(e,[t],r,n,f);throw new TypeError("val must be string, number or Buffer")}function arrayIndexOf(e,t,r,n,f){function i(e,t){return 1===o?e[t]:e.readUInt16BE(t*o)}var o=1,u=e.length,s=t.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(e.length<2||t.length<2)return-1;o=2,u/=2,s/=2,r/=2}var a;if(f){var h=-1;for(a=r;a<u;a++)if(i(e,a)===i(t,-1===h?0:a-h)){if(-1===h&&(h=a),a-h+1===s)return h*o}else-1!==h&&(a-=a-h),h=-1}else for(r+s>u&&(r=u-s),a=r;a>=0;a--){for(var c=!0,l=0;l<s;l++)if(i(e,a+l)!==i(t,l)){c=!1;break}if(c)return a}return-1}function hexWrite(e,t,r,n){r=Number(r)||0;var f=e.length-r;n?(n=Number(n))>f&&(n=f):n=f;var i=t.length;if(i%2!=0)throw new TypeError("Invalid hex string");n>i/2&&(n=i/2);for(var o=0;o<n;++o){var u=parseInt(t.substr(2*o,2),16);if(numberIsNaN(u))return o;e[r+o]=u}return o}function utf8Write(e,t,r,n){return blitBuffer(utf8ToBytes(t,e.length-r),e,r,n)}function asciiWrite(e,t,r,n){return blitBuffer(asciiToBytes(t),e,r,n)}function latin1Write(e,t,r,n){return asciiWrite(e,t,r,n)}function base64Write(e,t,r,n){return blitBuffer(base64ToBytes(t),e,r,n)}function ucs2Write(e,t,r,n){return blitBuffer(utf16leToBytes(t,e.length-r),e,r,n)}function base64Slice(e,t,r){return 0===t&&r===e.length?base64.fromByteArray(e):base64.fromByteArray(e.slice(t,r))}function utf8Slice(e,t,r){r=Math.min(e.length,r);for(var n=[],f=t;f<r;){var i=e[f],o=null,u=i>239?4:i>223?3:i>191?2:1;if(f+u<=r){var s,a,h,c;switch(u){case 1:i<128&&(o=i);break;case 2:128==(192&(s=e[f+1]))&&(c=(31&i)<<6|63&s)>127&&(o=c);break;case 3:s=e[f+1],a=e[f+2],128==(192&s)&&128==(192&a)&&(c=(15&i)<<12|(63&s)<<6|63&a)>2047&&(c<55296||c>57343)&&(o=c);break;case 4:s=e[f+1],a=e[f+2],h=e[f+3],128==(192&s)&&128==(192&a)&&128==(192&h)&&(c=(15&i)<<18|(63&s)<<12|(63&a)<<6|63&h)>65535&&c<1114112&&(o=c)}}null===o?(o=65533,u=1):o>65535&&(o-=65536,n.push(o>>>10&1023|55296),o=56320|1023&o),n.push(o),f+=u}return decodeCodePointsArray(n)}function decodeCodePointsArray(e){var t=e.length;if(t<=MAX_ARGUMENTS_LENGTH)return String.fromCharCode.apply(String,e);for(var r="",n=0;n<t;)r+=String.fromCharCode.apply(String,e.slice(n,n+=MAX_ARGUMENTS_LENGTH));return r}function asciiSlice(e,t,r){var n="";r=Math.min(e.length,r);for(var f=t;f<r;++f)n+=String.fromCharCode(127&e[f]);return n}function latin1Slice(e,t,r){var n="";r=Math.min(e.length,r);for(var f=t;f<r;++f)n+=String.fromCharCode(e[f]);return n}function hexSlice(e,t,r){var n=e.length;(!t||t<0)&&(t=0),(!r||r<0||r>n)&&(r=n);for(var f="",i=t;i<r;++i)f+=toHex(e[i]);return f}function utf16leSlice(e,t,r){for(var n=e.slice(t,r),f="",i=0;i<n.length;i+=2)f+=String.fromCharCode(n[i]+256*n[i+1]);return f}function checkOffset(e,t,r){if(e%1!=0||e<0)throw new RangeError("offset is not uint");if(e+t>r)throw new RangeError("Trying to access beyond buffer length")}function checkInt(e,t,r,n,f,i){if(!Buffer.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>f||t<i)throw new RangeError('"value" argument is out of bounds');if(r+n>e.length)throw new RangeError("Index out of range")}function checkIEEE754(e,t,r,n,f,i){if(r+n>e.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function writeFloat(e,t,r,n,f){return t=+t,r>>>=0,f||checkIEEE754(e,t,r,4,3.4028234663852886e38,-3.4028234663852886e38),ieee754.write(e,t,r,n,23,4),r+4}function writeDouble(e,t,r,n,f){return t=+t,r>>>=0,f||checkIEEE754(e,t,r,8,1.7976931348623157e308,-1.7976931348623157e308),ieee754.write(e,t,r,n,52,8),r+8}function base64clean(e){if((e=e.trim().replace(INVALID_BASE64_RE,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}function toHex(e){return e<16?"0"+e.toString(16):e.toString(16)}function utf8ToBytes(e,t){t=t||1/0;for(var r,n=e.length,f=null,i=[],o=0;o<n;++o){if((r=e.charCodeAt(o))>55295&&r<57344){if(!f){if(r>56319){(t-=3)>-1&&i.push(239,191,189);continue}if(o+1===n){(t-=3)>-1&&i.push(239,191,189);continue}f=r;continue}if(r<56320){(t-=3)>-1&&i.push(239,191,189),f=r;continue}r=65536+(f-55296<<10|r-56320)}else f&&(t-=3)>-1&&i.push(239,191,189);if(f=null,r<128){if((t-=1)<0)break;i.push(r)}else if(r<2048){if((t-=2)<0)break;i.push(r>>6|192,63&r|128)}else if(r<65536){if((t-=3)<0)break;i.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return i}function asciiToBytes(e){for(var t=[],r=0;r<e.length;++r)t.push(255&e.charCodeAt(r));return t}function utf16leToBytes(e,t){for(var r,n,f,i=[],o=0;o<e.length&&!((t-=2)<0);++o)n=(r=e.charCodeAt(o))>>8,f=r%256,i.push(f),i.push(n);return i}function base64ToBytes(e){return base64.toByteArray(base64clean(e))}function blitBuffer(e,t,r,n){for(var f=0;f<n&&!(f+r>=t.length||f>=e.length);++f)t[f+r]=e[f];return f}function isArrayBuffer(e){return e instanceof ArrayBuffer||null!=e&&null!=e.constructor&&"ArrayBuffer"===e.constructor.name&&"number"==typeof e.byteLength}function isArrayBufferView(e){return"function"==typeof ArrayBuffer.isView&&ArrayBuffer.isView(e)}function numberIsNaN(e){return e!=e}var base64=require("base64-js"),ieee754=require("ieee754");exports.Buffer=Buffer,exports.SlowBuffer=SlowBuffer,exports.INSPECT_MAX_BYTES=50;var K_MAX_LENGTH=2147483647;exports.kMaxLength=K_MAX_LENGTH,Buffer.TYPED_ARRAY_SUPPORT=typedArraySupport(),Buffer.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),"undefined"!=typeof Symbol&&Symbol.species&&Buffer[Symbol.species]===Buffer&&Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1}),Buffer.poolSize=8192,Buffer.from=function(e,t,r){return from(e,t,r)},Buffer.prototype.__proto__=Uint8Array.prototype,Buffer.__proto__=Uint8Array,Buffer.alloc=function(e,t,r){return alloc(e,t,r)},Buffer.allocUnsafe=function(e){return allocUnsafe(e)},Buffer.allocUnsafeSlow=function(e){return allocUnsafe(e)},Buffer.isBuffer=function(e){return null!=e&&!0===e._isBuffer},Buffer.compare=function(e,t){if(!Buffer.isBuffer(e)||!Buffer.isBuffer(t))throw new TypeError("Arguments must be Buffers");if(e===t)return 0;for(var r=e.length,n=t.length,f=0,i=Math.min(r,n);f<i;++f)if(e[f]!==t[f]){r=e[f],n=t[f];break}return r<n?-1:n<r?1:0},Buffer.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},Buffer.concat=function(e,t){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return Buffer.alloc(0);var r;if(void 0===t)for(t=0,r=0;r<e.length;++r)t+=e[r].length;var n=Buffer.allocUnsafe(t),f=0;for(r=0;r<e.length;++r){var i=e[r];if(!Buffer.isBuffer(i))throw new TypeError('"list" argument must be an Array of Buffers');i.copy(n,f),f+=i.length}return n},Buffer.byteLength=byteLength,Buffer.prototype._isBuffer=!0,Buffer.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)swap(this,t,t+1);return this},Buffer.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)swap(this,t,t+3),swap(this,t+1,t+2);return this},Buffer.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)swap(this,t,t+7),swap(this,t+1,t+6),swap(this,t+2,t+5),swap(this,t+3,t+4);return this},Buffer.prototype.toString=function(){var e=this.length;return 0===e?"":0===arguments.length?utf8Slice(this,0,e):slowToString.apply(this,arguments)},Buffer.prototype.equals=function(e){if(!Buffer.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===Buffer.compare(this,e)},Buffer.prototype.inspect=function(){var e="",t=exports.INSPECT_MAX_BYTES;return this.length>0&&(e=this.toString("hex",0,t).match(/.{2}/g).join(" "),this.length>t&&(e+=" ... ")),"<Buffer "+e+">"},Buffer.prototype.compare=function(e,t,r,n,f){if(!Buffer.isBuffer(e))throw new TypeError("Argument must be a Buffer");if(void 0===t&&(t=0),void 0===r&&(r=e?e.length:0),void 0===n&&(n=0),void 0===f&&(f=this.length),t<0||r>e.length||n<0||f>this.length)throw new RangeError("out of range index");if(n>=f&&t>=r)return 0;if(n>=f)return-1;if(t>=r)return 1;if(t>>>=0,r>>>=0,n>>>=0,f>>>=0,this===e)return 0;for(var i=f-n,o=r-t,u=Math.min(i,o),s=this.slice(n,f),a=e.slice(t,r),h=0;h<u;++h)if(s[h]!==a[h]){i=s[h],o=a[h];break}return i<o?-1:o<i?1:0},Buffer.prototype.includes=function(e,t,r){return-1!==this.indexOf(e,t,r)},Buffer.prototype.indexOf=function(e,t,r){return bidirectionalIndexOf(this,e,t,r,!0)},Buffer.prototype.lastIndexOf=function(e,t,r){return bidirectionalIndexOf(this,e,t,r,!1)},Buffer.prototype.write=function(e,t,r,n){if(void 0===t)n="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)n=t,r=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}var f=this.length-t;if((void 0===r||r>f)&&(r=f),e.length>0&&(r<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var i=!1;;)switch(n){case"hex":return hexWrite(this,e,t,r);case"utf8":case"utf-8":return utf8Write(this,e,t,r);case"ascii":return asciiWrite(this,e,t,r);case"latin1":case"binary":return latin1Write(this,e,t,r);case"base64":return base64Write(this,e,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ucs2Write(this,e,t,r);default:if(i)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),i=!0}},Buffer.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var MAX_ARGUMENTS_LENGTH=4096;Buffer.prototype.slice=function(e,t){var r=this.length;e=~~e,t=void 0===t?r:~~t,e<0?(e+=r)<0&&(e=0):e>r&&(e=r),t<0?(t+=r)<0&&(t=0):t>r&&(t=r),t<e&&(t=e);var n=this.subarray(e,t);return n.__proto__=Buffer.prototype,n},Buffer.prototype.readUIntLE=function(e,t,r){e>>>=0,t>>>=0,r||checkOffset(e,t,this.length);for(var n=this[e],f=1,i=0;++i<t&&(f*=256);)n+=this[e+i]*f;return n},Buffer.prototype.readUIntBE=function(e,t,r){e>>>=0,t>>>=0,r||checkOffset(e,t,this.length);for(var n=this[e+--t],f=1;t>0&&(f*=256);)n+=this[e+--t]*f;return n},Buffer.prototype.readUInt8=function(e,t){return e>>>=0,t||checkOffset(e,1,this.length),this[e]},Buffer.prototype.readUInt16LE=function(e,t){return e>>>=0,t||checkOffset(e,2,this.length),this[e]|this[e+1]<<8},Buffer.prototype.readUInt16BE=function(e,t){return e>>>=0,t||checkOffset(e,2,this.length),this[e]<<8|this[e+1]},Buffer.prototype.readUInt32LE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},Buffer.prototype.readUInt32BE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},Buffer.prototype.readIntLE=function(e,t,r){e>>>=0,t>>>=0,r||checkOffset(e,t,this.length);for(var n=this[e],f=1,i=0;++i<t&&(f*=256);)n+=this[e+i]*f;return f*=128,n>=f&&(n-=Math.pow(2,8*t)),n},Buffer.prototype.readIntBE=function(e,t,r){e>>>=0,t>>>=0,r||checkOffset(e,t,this.length);for(var n=t,f=1,i=this[e+--n];n>0&&(f*=256);)i+=this[e+--n]*f;return f*=128,i>=f&&(i-=Math.pow(2,8*t)),i},Buffer.prototype.readInt8=function(e,t){return e>>>=0,t||checkOffset(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},Buffer.prototype.readInt16LE=function(e,t){e>>>=0,t||checkOffset(e,2,this.length);var r=this[e]|this[e+1]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt16BE=function(e,t){e>>>=0,t||checkOffset(e,2,this.length);var r=this[e+1]|this[e]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt32LE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},Buffer.prototype.readInt32BE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},Buffer.prototype.readFloatLE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),ieee754.read(this,e,!0,23,4)},Buffer.prototype.readFloatBE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),ieee754.read(this,e,!1,23,4)},Buffer.prototype.readDoubleLE=function(e,t){return e>>>=0,t||checkOffset(e,8,this.length),ieee754.read(this,e,!0,52,8)},Buffer.prototype.readDoubleBE=function(e,t){return e>>>=0,t||checkOffset(e,8,this.length),ieee754.read(this,e,!1,52,8)},Buffer.prototype.writeUIntLE=function(e,t,r,n){e=+e,t>>>=0,r>>>=0,n||checkInt(this,e,t,r,Math.pow(2,8*r)-1,0);var f=1,i=0;for(this[t]=255&e;++i<r&&(f*=256);)this[t+i]=e/f&255;return t+r},Buffer.prototype.writeUIntBE=function(e,t,r,n){e=+e,t>>>=0,r>>>=0,n||checkInt(this,e,t,r,Math.pow(2,8*r)-1,0);var f=r-1,i=1;for(this[t+f]=255&e;--f>=0&&(i*=256);)this[t+f]=e/i&255;return t+r},Buffer.prototype.writeUInt8=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,1,255,0),this[t]=255&e,t+1},Buffer.prototype.writeUInt16LE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,2,65535,0),this[t]=255&e,this[t+1]=e>>>8,t+2},Buffer.prototype.writeUInt16BE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=255&e,t+2},Buffer.prototype.writeUInt32LE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e,t+4},Buffer.prototype.writeUInt32BE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},Buffer.prototype.writeIntLE=function(e,t,r,n){if(e=+e,t>>>=0,!n){var f=Math.pow(2,8*r-1);checkInt(this,e,t,r,f-1,-f)}var i=0,o=1,u=0;for(this[t]=255&e;++i<r&&(o*=256);)e<0&&0===u&&0!==this[t+i-1]&&(u=1),this[t+i]=(e/o>>0)-u&255;return t+r},Buffer.prototype.writeIntBE=function(e,t,r,n){if(e=+e,t>>>=0,!n){var f=Math.pow(2,8*r-1);checkInt(this,e,t,r,f-1,-f)}var i=r-1,o=1,u=0;for(this[t+i]=255&e;--i>=0&&(o*=256);)e<0&&0===u&&0!==this[t+i+1]&&(u=1),this[t+i]=(e/o>>0)-u&255;return t+r},Buffer.prototype.writeInt8=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=255&e,t+1},Buffer.prototype.writeInt16LE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,2,32767,-32768),this[t]=255&e,this[t+1]=e>>>8,t+2},Buffer.prototype.writeInt16BE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=255&e,t+2},Buffer.prototype.writeInt32LE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,4,2147483647,-2147483648),this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},Buffer.prototype.writeInt32BE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},Buffer.prototype.writeFloatLE=function(e,t,r){return writeFloat(this,e,t,!0,r)},Buffer.prototype.writeFloatBE=function(e,t,r){return writeFloat(this,e,t,!1,r)},Buffer.prototype.writeDoubleLE=function(e,t,r){return writeDouble(this,e,t,!0,r)},Buffer.prototype.writeDoubleBE=function(e,t,r){return writeDouble(this,e,t,!1,r)},Buffer.prototype.copy=function(e,t,r,n){if(r||(r=0),n||0===n||(n=this.length),t>=e.length&&(t=e.length),t||(t=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===e.length||0===this.length)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),e.length-t<n-r&&(n=e.length-t+r);var f,i=n-r;if(this===e&&r<t&&t<n)for(f=i-1;f>=0;--f)e[f+t]=this[f+r];else if(i<1e3)for(f=0;f<i;++f)e[f+t]=this[f+r];else Uint8Array.prototype.set.call(e,this.subarray(r,r+i),t);return i},Buffer.prototype.fill=function(e,t,r,n){if("string"==typeof e){if("string"==typeof t?(n=t,t=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),1===e.length){var f=e.charCodeAt(0);f<256&&(e=f)}if(void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!Buffer.isEncoding(n))throw new TypeError("Unknown encoding: "+n)}else"number"==typeof e&&(e&=255);if(t<0||this.length<t||this.length<r)throw new RangeError("Out of range index");if(r<=t)return this;t>>>=0,r=void 0===r?this.length:r>>>0,e||(e=0);var i;if("number"==typeof e)for(i=t;i<r;++i)this[i]=e;else{var o=Buffer.isBuffer(e)?e:new Buffer(e,n),u=o.length;for(i=0;i<r-t;++i)this[i+t]=o[i%u]}return this};var INVALID_BASE64_RE=/[^+/0-9A-Za-z-_]/g;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\buffer\\index.js","/node_modules\\buffer",undefined)
},{"_process":79,"base64-js":74,"buffer":76,"ieee754":77}],77:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
exports.read=function(a,o,t,r,h){var M,p,w=8*h-r-1,f=(1<<w)-1,e=f>>1,i=-7,N=t?h-1:0,n=t?-1:1,s=a[o+N];for(N+=n,M=s&(1<<-i)-1,s>>=-i,i+=w;i>0;M=256*M+a[o+N],N+=n,i-=8);for(p=M&(1<<-i)-1,M>>=-i,i+=r;i>0;p=256*p+a[o+N],N+=n,i-=8);if(0===M)M=1-e;else{if(M===f)return p?NaN:1/0*(s?-1:1);p+=Math.pow(2,r),M-=e}return(s?-1:1)*p*Math.pow(2,M-r)},exports.write=function(a,o,t,r,h,M){var p,w,f,e=8*M-h-1,i=(1<<e)-1,N=i>>1,n=23===h?Math.pow(2,-24)-Math.pow(2,-77):0,s=r?0:M-1,u=r?1:-1,l=o<0||0===o&&1/o<0?1:0;for(o=Math.abs(o),isNaN(o)||o===1/0?(w=isNaN(o)?1:0,p=i):(p=Math.floor(Math.log(o)/Math.LN2),o*(f=Math.pow(2,-p))<1&&(p--,f*=2),(o+=p+N>=1?n/f:n*Math.pow(2,1-N))*f>=2&&(p++,f/=2),p+N>=i?(w=0,p=i):p+N>=1?(w=(o*f-1)*Math.pow(2,h),p+=N):(w=o*Math.pow(2,N-1)*Math.pow(2,h),p=0));h>=8;a[t+s]=255&w,s+=u,w/=256,h-=8);for(p=p<<h|w,e+=h;e>0;a[t+s]=255&p,s+=u,p/=256,e-=8);a[t+s-u]|=128*l};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\ieee754\\index.js","/node_modules\\ieee754",undefined)
},{"_process":79,"buffer":76}],78:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function normalizeArray(r,t){for(var e=0,n=r.length-1;n>=0;n--){var s=r[n];"."===s?r.splice(n,1):".."===s?(r.splice(n,1),e++):e&&(r.splice(n,1),e--)}if(t)for(;e--;e)r.unshift("..");return r}function filter(r,t){if(r.filter)return r.filter(t);for(var e=[],n=0;n<r.length;n++)t(r[n],n,r)&&e.push(r[n]);return e}var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,splitPath=function(r){return splitPathRe.exec(r).slice(1)};exports.resolve=function(){for(var r="",t=!1,e=arguments.length-1;e>=-1&&!t;e--){var n=e>=0?arguments[e]:process.cwd();if("string"!=typeof n)throw new TypeError("Arguments to path.resolve must be strings");n&&(r=n+"/"+r,t="/"===n.charAt(0))}return r=normalizeArray(filter(r.split("/"),function(r){return!!r}),!t).join("/"),(t?"/":"")+r||"."},exports.normalize=function(r){var t=exports.isAbsolute(r),e="/"===substr(r,-1);return(r=normalizeArray(filter(r.split("/"),function(r){return!!r}),!t).join("/"))||t||(r="."),r&&e&&(r+="/"),(t?"/":"")+r},exports.isAbsolute=function(r){return"/"===r.charAt(0)},exports.join=function(){var r=Array.prototype.slice.call(arguments,0);return exports.normalize(filter(r,function(r,t){if("string"!=typeof r)throw new TypeError("Arguments to path.join must be strings");return r}).join("/"))},exports.relative=function(r,t){function e(r){for(var t=0;t<r.length&&""===r[t];t++);for(var e=r.length-1;e>=0&&""===r[e];e--);return t>e?[]:r.slice(t,e-t+1)}r=exports.resolve(r).substr(1),t=exports.resolve(t).substr(1);for(var n=e(r.split("/")),s=e(t.split("/")),i=Math.min(n.length,s.length),o=i,u=0;u<i;u++)if(n[u]!==s[u]){o=u;break}for(var l=[],u=o;u<n.length;u++)l.push("..");return(l=l.concat(s.slice(o))).join("/")},exports.sep="/",exports.delimiter=":",exports.dirname=function(r){var t=splitPath(r),e=t[0],n=t[1];return e||n?(n&&(n=n.substr(0,n.length-1)),e+n):"."},exports.basename=function(r,t){var e=splitPath(r)[2];return t&&e.substr(-1*t.length)===t&&(e=e.substr(0,e.length-t.length)),e},exports.extname=function(r){return splitPath(r)[3]};var substr="b"==="ab".substr(-1)?function(r,t,e){return r.substr(t,e)}:function(r,t,e){return t<0&&(t=r.length+t),r.substr(t,e)};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\path-browserify\\index.js","/node_modules\\path-browserify",undefined)
},{"_process":79,"buffer":76}],79:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}function runTimeout(e){if(cachedSetTimeout===setTimeout)return setTimeout(e,0);if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout)return cachedSetTimeout=setTimeout,setTimeout(e,0);try{return cachedSetTimeout(e,0)}catch(t){try{return cachedSetTimeout.call(null,e,0)}catch(t){return cachedSetTimeout.call(this,e,0)}}}function runClearTimeout(e){if(cachedClearTimeout===clearTimeout)return clearTimeout(e);if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout)return cachedClearTimeout=clearTimeout,clearTimeout(e);try{return cachedClearTimeout(e)}catch(t){try{return cachedClearTimeout.call(null,e)}catch(t){return cachedClearTimeout.call(this,e)}}}function cleanUpNextTick(){draining&&currentQueue&&(draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue())}function drainQueue(){if(!draining){var e=runTimeout(cleanUpNextTick);draining=!0;for(var t=queue.length;t;){for(currentQueue=queue,queue=[];++queueIndex<t;)currentQueue&&currentQueue[queueIndex].run();queueIndex=-1,t=queue.length}currentQueue=null,draining=!1,runClearTimeout(e)}}function Item(e,t){this.fun=e,this.array=t}function noop(){}var cachedSetTimeout,cachedClearTimeout,process=module.exports={};!function(){try{cachedSetTimeout="function"==typeof setTimeout?setTimeout:defaultSetTimout}catch(e){cachedSetTimeout=defaultSetTimout}try{cachedClearTimeout="function"==typeof clearTimeout?clearTimeout:defaultClearTimeout}catch(e){cachedClearTimeout=defaultClearTimeout}}();var currentQueue,queue=[],draining=!1,queueIndex=-1;process.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];queue.push(new Item(e,t)),1!==queue.length||draining||runTimeout(drainQueue)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.prependListener=noop,process.prependOnceListener=noop,process.listeners=function(e){return[]},process.binding=function(e){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(e){throw new Error("process.chdir is not supported")},process.umask=function(){return 0};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\process\\browser.js","/node_modules\\process",undefined)
},{"_process":79,"buffer":76}],80:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
"function"==typeof Object.create?module.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:module.exports=function(t,e){t.super_=e;var o=function(){};o.prototype=e.prototype,t.prototype=new o,t.prototype.constructor=t};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\util\\node_modules\\inherits\\inherits_browser.js","/node_modules\\util\\node_modules\\inherits",undefined)
},{"_process":79,"buffer":76}],81:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
module.exports=function(o){return o&&"object"==typeof o&&"function"==typeof o.copy&&"function"==typeof o.fill&&"function"==typeof o.readUInt8};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\util\\support\\isBufferBrowser.js","/node_modules\\util\\support",undefined)
},{"_process":79,"buffer":76}],82:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function inspect(e,r){var t={seen:[],stylize:stylizeNoColor};return arguments.length>=3&&(t.depth=arguments[2]),arguments.length>=4&&(t.colors=arguments[3]),isBoolean(r)?t.showHidden=r:r&&exports._extend(t,r),isUndefined(t.showHidden)&&(t.showHidden=!1),isUndefined(t.depth)&&(t.depth=2),isUndefined(t.colors)&&(t.colors=!1),isUndefined(t.customInspect)&&(t.customInspect=!0),t.colors&&(t.stylize=stylizeWithColor),formatValue(t,e,t.depth)}function stylizeWithColor(e,r){var t=inspect.styles[r];return t?"["+inspect.colors[t][0]+"m"+e+"["+inspect.colors[t][1]+"m":e}function stylizeNoColor(e,r){return e}function arrayToHash(e){var r={};return e.forEach(function(e,t){r[e]=!0}),r}function formatValue(e,r,t){if(e.customInspect&&r&&isFunction(r.inspect)&&r.inspect!==exports.inspect&&(!r.constructor||r.constructor.prototype!==r)){var n=r.inspect(t,e);return isString(n)||(n=formatValue(e,n,t)),n}var i=formatPrimitive(e,r);if(i)return i;var o=Object.keys(r),s=arrayToHash(o);if(e.showHidden&&(o=Object.getOwnPropertyNames(r)),isError(r)&&(o.indexOf("message")>=0||o.indexOf("description")>=0))return formatError(r);if(0===o.length){if(isFunction(r)){var u=r.name?": "+r.name:"";return e.stylize("[Function"+u+"]","special")}if(isRegExp(r))return e.stylize(RegExp.prototype.toString.call(r),"regexp");if(isDate(r))return e.stylize(Date.prototype.toString.call(r),"date");if(isError(r))return formatError(r)}var c="",a=!1,l=["{","}"];if(isArray(r)&&(a=!0,l=["[","]"]),isFunction(r)&&(c=" [Function"+(r.name?": "+r.name:"")+"]"),isRegExp(r)&&(c=" "+RegExp.prototype.toString.call(r)),isDate(r)&&(c=" "+Date.prototype.toUTCString.call(r)),isError(r)&&(c=" "+formatError(r)),0===o.length&&(!a||0==r.length))return l[0]+c+l[1];if(t<0)return isRegExp(r)?e.stylize(RegExp.prototype.toString.call(r),"regexp"):e.stylize("[Object]","special");e.seen.push(r);var p;return p=a?formatArray(e,r,t,s,o):o.map(function(n){return formatProperty(e,r,t,s,n,a)}),e.seen.pop(),reduceToSingleString(p,c,l)}function formatPrimitive(e,r){if(isUndefined(r))return e.stylize("undefined","undefined");if(isString(r)){var t="'"+JSON.stringify(r).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(t,"string")}return isNumber(r)?e.stylize(""+r,"number"):isBoolean(r)?e.stylize(""+r,"boolean"):isNull(r)?e.stylize("null","null"):void 0}function formatError(e){return"["+Error.prototype.toString.call(e)+"]"}function formatArray(e,r,t,n,i){for(var o=[],s=0,u=r.length;s<u;++s)hasOwnProperty(r,String(s))?o.push(formatProperty(e,r,t,n,String(s),!0)):o.push("");return i.forEach(function(i){i.match(/^\d+$/)||o.push(formatProperty(e,r,t,n,i,!0))}),o}function formatProperty(e,r,t,n,i,o){var s,u,c;if((c=Object.getOwnPropertyDescriptor(r,i)||{value:r[i]}).get?u=c.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):c.set&&(u=e.stylize("[Setter]","special")),hasOwnProperty(n,i)||(s="["+i+"]"),u||(e.seen.indexOf(c.value)<0?(u=isNull(t)?formatValue(e,c.value,null):formatValue(e,c.value,t-1)).indexOf("\n")>-1&&(u=o?u.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+u.split("\n").map(function(e){return"   "+e}).join("\n")):u=e.stylize("[Circular]","special")),isUndefined(s)){if(o&&i.match(/^\d+$/))return u;(s=JSON.stringify(""+i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=e.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=e.stylize(s,"string"))}return s+": "+u}function reduceToSingleString(e,r,t){var n=0;return e.reduce(function(e,r){return n++,r.indexOf("\n")>=0&&n++,e+r.replace(/\u001b\[\d\d?m/g,"").length+1},0)>60?t[0]+(""===r?"":r+"\n ")+" "+e.join(",\n  ")+" "+t[1]:t[0]+r+" "+e.join(", ")+" "+t[1]}function isArray(e){return Array.isArray(e)}function isBoolean(e){return"boolean"==typeof e}function isNull(e){return null===e}function isNullOrUndefined(e){return null==e}function isNumber(e){return"number"==typeof e}function isString(e){return"string"==typeof e}function isSymbol(e){return"symbol"==typeof e}function isUndefined(e){return void 0===e}function isRegExp(e){return isObject(e)&&"[object RegExp]"===objectToString(e)}function isObject(e){return"object"==typeof e&&null!==e}function isDate(e){return isObject(e)&&"[object Date]"===objectToString(e)}function isError(e){return isObject(e)&&("[object Error]"===objectToString(e)||e instanceof Error)}function isFunction(e){return"function"==typeof e}function isPrimitive(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||void 0===e}function objectToString(e){return Object.prototype.toString.call(e)}function pad(e){return e<10?"0"+e.toString(10):e.toString(10)}function timestamp(){var e=new Date,r=[pad(e.getHours()),pad(e.getMinutes()),pad(e.getSeconds())].join(":");return[e.getDate(),months[e.getMonth()],r].join(" ")}function hasOwnProperty(e,r){return Object.prototype.hasOwnProperty.call(e,r)}var formatRegExp=/%[sdj%]/g;exports.format=function(e){if(!isString(e)){for(var r=[],t=0;t<arguments.length;t++)r.push(inspect(arguments[t]));return r.join(" ")}for(var t=1,n=arguments,i=n.length,o=String(e).replace(formatRegExp,function(e){if("%%"===e)return"%";if(t>=i)return e;switch(e){case"%s":return String(n[t++]);case"%d":return Number(n[t++]);case"%j":try{return JSON.stringify(n[t++])}catch(e){return"[Circular]"}default:return e}}),s=n[t];t<i;s=n[++t])isNull(s)||!isObject(s)?o+=" "+s:o+=" "+inspect(s);return o},exports.deprecate=function(e,r){if(isUndefined(global.process))return function(){return exports.deprecate(e,r).apply(this,arguments)};if(!0===process.noDeprecation)return e;var t=!1;return function(){if(!t){if(process.throwDeprecation)throw new Error(r);process.traceDeprecation?console.trace(r):console.error(r),t=!0}return e.apply(this,arguments)}};var debugEnviron,debugs={};exports.debuglog=function(e){if(isUndefined(debugEnviron)&&(debugEnviron=process.env.NODE_DEBUG||""),e=e.toUpperCase(),!debugs[e])if(new RegExp("\\b"+e+"\\b","i").test(debugEnviron)){var r=process.pid;debugs[e]=function(){var t=exports.format.apply(exports,arguments);console.error("%s %d: %s",e,r,t)}}else debugs[e]=function(){};return debugs[e]},exports.inspect=inspect,inspect.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},inspect.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},exports.isArray=isArray,exports.isBoolean=isBoolean,exports.isNull=isNull,exports.isNullOrUndefined=isNullOrUndefined,exports.isNumber=isNumber,exports.isString=isString,exports.isSymbol=isSymbol,exports.isUndefined=isUndefined,exports.isRegExp=isRegExp,exports.isObject=isObject,exports.isDate=isDate,exports.isError=isError,exports.isFunction=isFunction,exports.isPrimitive=isPrimitive,exports.isBuffer=require("./support/isBuffer");var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];exports.log=function(){console.log("%s - %s",timestamp(),exports.format.apply(exports,arguments))},exports.inherits=require("inherits"),exports._extend=function(e,r){if(!r||!isObject(r))return e;for(var t=Object.keys(r),n=t.length;n--;)e[t[n]]=r[t[n]];return e};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules\\util\\util.js","/node_modules\\util",undefined)
},{"./support/isBuffer":81,"_process":79,"buffer":76,"inherits":80}],83:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
function LME(){let e=require("../../ff-fes/fesjs/fescontext"),t=require("../../ff-fes/fesjs/JSWorkBook");this.lme=new t(new e)}Error.prototype.stack=Error.prototype.stack||"",MatrixLookup=function(){return 1},require("../../ff-fes/exchange_modules/lme/lmeparser"),require("../../ff-fes/exchange_modules/jsonvalues/jsonvalues"),require("../../ff-math");var fesjsApi=require("../../ff-fes").fesjs;fesjsApi.addFunctions(require("../../ff-formulajs/ff-formulajs").formulajs),LME.prototype.addFunctions=fesjsApi.addFunctions,LME.prototype.exportLME=function(){return this.lme.export("lme")},LME.prototype.importLME=function(e){this.lme.importSolution(e,"lme")},LME.prototype.exportJavaScript=function(){return this.lme.export("js")},LME.prototype.importFFL=function(e){this.lme.importSolution(e,"ffl")},LME.prototype.exportFFL=function(){return this.lme.export("ffl")},LME.prototype.exportPresentation=function(){return this.lme.export("presentation")},LME.prototype.exportWebModel=function(){return this.lme.export("webexport")},LME.prototype.exportData=function(){return this.lme.export("jsonvalues")},LME.prototype.importData=function(e){this.lme.importSolution(e,"jsonvalues")},module.exports=LME;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/src\\lme.js","/src",undefined)
},{"../../ff-fes":25,"../../ff-fes/exchange_modules/jsonvalues/jsonvalues":7,"../../ff-fes/exchange_modules/lme/lmeparser":8,"../../ff-fes/fesjs/JSWorkBook":16,"../../ff-fes/fesjs/fescontext":24,"../../ff-formulajs/ff-formulajs":47,"../../ff-math":72,"_process":79,"buffer":76}],84:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname,JSON_MODEL){
require("../../ff-fes/exchange_modules/presentation/webexport");var model=require("./lme");LMEMETA=new model,LMEMETA.importLME(JSON_MODEL),LME=LMEMETA.exportWebModel().nodes;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/src\\output.js","/src",{
  "formulas": [
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_RootSub1_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100001,
      "name": "KSP_RootSub1_value",
      "parsed": "undefined",
      "id": 100001,
      "fflname": "RootSub1_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_RootSub1_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'General variables for webclient'",
      "index": 100002,
      "name": "KSP_RootSub1_title",
      "parsed": "'General variables for webclient'",
      "id": 100002,
      "fflname": "RootSub1_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_RootSub1_locked": true,
        "KSP_FES_LAYOUTNR_locked": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "1",
      "index": 100003,
      "name": "KSP_RootSub1_locked",
      "parsed": "1",
      "id": 100003,
      "fflname": "RootSub1_locked"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_RootSub1_visible": true,
        "KSP_RootSub2_visible": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "0",
      "index": 100004,
      "name": "KSP_RootSub1_visible",
      "parsed": "0",
      "id": 100004,
      "fflname": "RootSub1_visible"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_LAYOUTNR_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_FES_LAYOUT_value",
          "association": "deps",
          "refId": 100010
        }
      ],
      "deps": {
        "KSP_FES_LAYOUT_value": true
      },
      "original": "If(Pos('IFRS-EU',FES_LAYOUT[doc])>0,1,If(Pos('IFRS-PL',FES_LAYOUT[doc])>0,48,If(Pos('IFRS-Intl',FES_LAYOUT[doc])>0,2,0)))",
      "index": 100005,
      "name": "KSP_FES_LAYOUTNR_value",
      "parsed": "Pos('IFRS-EU',a100010('100010',x.doc,y.base,z,v))>0?1:Pos('IFRS-PL',a100010('100010',x.doc,y.base,z,v))>0?48:Pos('IFRS-Intl',a100010('100010',x.doc,y.base,z,v))>0?2:0",
      "id": 100005,
      "fflname": "FES_LAYOUTNR_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_LAYOUTNR_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Layout'",
      "index": 100006,
      "name": "KSP_FES_LAYOUTNR_title",
      "parsed": "'Layout'",
      "id": 100006,
      "fflname": "FES_LAYOUTNR_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_FES_LAYOUTNR_choices": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "[{'name':' 0','value':' NA'},{'name':'1','value':' IFRS-EU'},{'name':'2','value':' IFRS'},{'name':'48','value':' Polish'}]",
      "index": 100007,
      "name": "KSP_FES_LAYOUTNR_choices",
      "parsed": "[{'name':' 0','value':' NA'},{'name':'1','value':' IFRS-EU'},{'name':'2','value':' IFRS'},{'name':'48','value':' Polish'}]",
      "id": 100007,
      "fflname": "FES_LAYOUTNR_choices"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_EXCHANGE_RATES_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100008,
      "name": "KSP_FES_EXCHANGE_RATES_value",
      "parsed": "undefined",
      "id": 100008,
      "fflname": "FES_EXCHANGE_RATES_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_EXCHANGE_RATES_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Exchange Rates'",
      "index": 100009,
      "name": "KSP_FES_EXCHANGE_RATES_title",
      "parsed": "'Exchange Rates'",
      "id": 100009,
      "fflname": "FES_EXCHANGE_RATES_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_LAYOUT_value": true,
        "KSP_FES_LAYOUTNR_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_FES_LAYOUTNR_value",
          "association": "refs",
          "refId": 100005
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100010,
      "name": "KSP_FES_LAYOUT_value",
      "parsed": "undefined",
      "id": 100010,
      "fflname": "FES_LAYOUT_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_LAYOUT_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Layout name'",
      "index": 100011,
      "name": "KSP_FES_LAYOUT_title",
      "parsed": "'Layout name'",
      "id": 100011,
      "fflname": "FES_LAYOUT_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_FLATINPUT_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100012,
      "name": "KSP_FES_FLATINPUT_value",
      "parsed": "undefined",
      "id": 100012,
      "fflname": "FES_FLATINPUT_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_FLATINPUT_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Is flat input used (1==yes)'",
      "index": 100013,
      "name": "KSP_FES_FLATINPUT_title",
      "parsed": "'Is flat input used (1==yes)'",
      "id": 100013,
      "fflname": "FES_FLATINPUT_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_PROJECTION_PROFILE_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100014,
      "name": "KSP_FES_PROJECTION_PROFILE_value",
      "parsed": "undefined",
      "id": 100014,
      "fflname": "FES_PROJECTION_PROFILE_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_PROJECTION_PROFILE_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Projection Profile'",
      "index": 100015,
      "name": "KSP_FES_PROJECTION_PROFILE_title",
      "parsed": "'Projection Profile'",
      "id": 100015,
      "fflname": "FES_PROJECTION_PROFILE_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_COLUMN_ORDER_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100016,
      "name": "KSP_FES_COLUMN_ORDER_value",
      "parsed": "undefined",
      "id": 100016,
      "fflname": "FES_COLUMN_ORDER_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_COLUMN_ORDER_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Column order'",
      "index": 100017,
      "name": "KSP_FES_COLUMN_ORDER_title",
      "parsed": "'Column order'",
      "id": 100017,
      "fflname": "FES_COLUMN_ORDER_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_COLUMN_VISIBLE_value": true,
        "KSP_RootSub2_locked": true,
        "KSP_Q_ROOT_locked": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "1",
      "index": 100018,
      "name": "KSP_FES_COLUMN_VISIBLE_value",
      "parsed": "1",
      "id": 100018,
      "fflname": "FES_COLUMN_VISIBLE_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_COLUMN_VISIBLE_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Column visible'",
      "index": 100019,
      "name": "KSP_FES_COLUMN_VISIBLE_title",
      "parsed": "'Column visible'",
      "id": 100019,
      "fflname": "FES_COLUMN_VISIBLE_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_STARTDATEPERIOD_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100020,
      "name": "KSP_FES_STARTDATEPERIOD_value",
      "parsed": "undefined",
      "id": 100020,
      "fflname": "FES_STARTDATEPERIOD_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_STARTDATEPERIOD_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Start Date Period'",
      "index": 100021,
      "name": "KSP_FES_STARTDATEPERIOD_title",
      "parsed": "'Start Date Period'",
      "id": 100021,
      "fflname": "FES_STARTDATEPERIOD_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_ENDDATEPERIOD_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100022,
      "name": "KSP_FES_ENDDATEPERIOD_value",
      "parsed": "undefined",
      "id": 100022,
      "fflname": "FES_ENDDATEPERIOD_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_ENDDATEPERIOD_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'End Date Period'",
      "index": 100023,
      "name": "KSP_FES_ENDDATEPERIOD_title",
      "parsed": "'End Date Period'",
      "id": 100023,
      "fflname": "FES_ENDDATEPERIOD_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_BASECURRENCYPERIOD_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100024,
      "name": "KSP_FES_BASECURRENCYPERIOD_value",
      "parsed": "undefined",
      "id": 100024,
      "fflname": "FES_BASECURRENCYPERIOD_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_BASECURRENCYPERIOD_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Base Currency Period'",
      "index": 100025,
      "name": "KSP_FES_BASECURRENCYPERIOD_title",
      "parsed": "'Base Currency Period'",
      "id": 100025,
      "fflname": "FES_BASECURRENCYPERIOD_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_VIEWCURRENCYPERIOD_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100026,
      "name": "KSP_FES_VIEWCURRENCYPERIOD_value",
      "parsed": "undefined",
      "id": 100026,
      "fflname": "FES_VIEWCURRENCYPERIOD_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_VIEWCURRENCYPERIOD_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'View Currency Period'",
      "index": 100027,
      "name": "KSP_FES_VIEWCURRENCYPERIOD_title",
      "parsed": "'View Currency Period'",
      "id": 100027,
      "fflname": "FES_VIEWCURRENCYPERIOD_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_COLUMNTYPE_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100028,
      "name": "KSP_FES_COLUMNTYPE_value",
      "parsed": "undefined",
      "id": 100028,
      "fflname": "FES_COLUMNTYPE_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FES_COLUMNTYPE_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Column Type'",
      "index": 100029,
      "name": "KSP_FES_COLUMNTYPE_title",
      "parsed": "'Column Type'",
      "id": 100029,
      "fflname": "FES_COLUMNTYPE_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_FES_COLUMNTYPE_choices": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "[{'name':' 0','value':'History'},{'name':'1','value':'Projection'}]",
      "index": 100030,
      "name": "KSP_FES_COLUMNTYPE_choices",
      "parsed": "[{'name':' 0','value':'History'},{'name':'1','value':'Projection'}]",
      "id": 100030,
      "fflname": "FES_COLUMNTYPE_choices"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_RootSub2_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100031,
      "name": "KSP_RootSub2_value",
      "parsed": "undefined",
      "id": 100031,
      "fflname": "RootSub2_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_RootSub2_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'General variables for FPS database'",
      "index": 100032,
      "name": "KSP_RootSub2_title",
      "parsed": "'General variables for FPS database'",
      "id": 100032,
      "fflname": "RootSub2_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Naam_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100033,
      "name": "KSP_FPS_VAR_Naam_value",
      "parsed": "undefined",
      "id": 100033,
      "fflname": "FPS_VAR_Naam_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Naam_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'NAME'",
      "index": 100034,
      "name": "KSP_FPS_VAR_Naam_title",
      "parsed": "'NAME'",
      "id": 100034,
      "fflname": "FPS_VAR_Naam_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Relatienummer_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100035,
      "name": "KSP_FPS_VAR_Relatienummer_value",
      "parsed": "undefined",
      "id": 100035,
      "fflname": "FPS_VAR_Relatienummer_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Relatienummer_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'CUSTOMERNUMBER'",
      "index": 100036,
      "name": "KSP_FPS_VAR_Relatienummer_title",
      "parsed": "'CUSTOMERNUMBER'",
      "id": 100036,
      "fflname": "FPS_VAR_Relatienummer_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_KVKnr_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100037,
      "name": "KSP_FPS_VAR_KVKnr_value",
      "parsed": "undefined",
      "id": 100037,
      "fflname": "FPS_VAR_KVKnr_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_KVKnr_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'CHAMBEROFCOMMERCENUMBER'",
      "index": 100038,
      "name": "KSP_FPS_VAR_KVKnr_title",
      "parsed": "'CHAMBEROFCOMMERCENUMBER'",
      "id": 100038,
      "fflname": "FPS_VAR_KVKnr_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Rechtsvorm_nr_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100039,
      "name": "KSP_FPS_VAR_Rechtsvorm_nr_value",
      "parsed": "undefined",
      "id": 100039,
      "fflname": "FPS_VAR_Rechtsvorm_nr_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Rechtsvorm_nr_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'LEGALSTATUSCODE'",
      "index": 100040,
      "name": "KSP_FPS_VAR_Rechtsvorm_nr_title",
      "parsed": "'LEGALSTATUSCODE'",
      "id": 100040,
      "fflname": "FPS_VAR_Rechtsvorm_nr_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Rechtsvorm_omschr_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100041,
      "name": "KSP_FPS_VAR_Rechtsvorm_omschr_value",
      "parsed": "undefined",
      "id": 100041,
      "fflname": "FPS_VAR_Rechtsvorm_omschr_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Rechtsvorm_omschr_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'LEGALSTATUSDESCRIPTION'",
      "index": 100042,
      "name": "KSP_FPS_VAR_Rechtsvorm_omschr_title",
      "parsed": "'LEGALSTATUSDESCRIPTION'",
      "id": 100042,
      "fflname": "FPS_VAR_Rechtsvorm_omschr_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_BIK_CODE_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100043,
      "name": "KSP_FPS_VAR_BIK_CODE_value",
      "parsed": "undefined",
      "id": 100043,
      "fflname": "FPS_VAR_BIK_CODE_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_BIK_CODE_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'SECTOROFINDUSTRYCODE'",
      "index": 100044,
      "name": "KSP_FPS_VAR_BIK_CODE_title",
      "parsed": "'SECTOROFINDUSTRYCODE'",
      "id": 100044,
      "fflname": "FPS_VAR_BIK_CODE_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_BIK_Omschr_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100045,
      "name": "KSP_FPS_VAR_BIK_Omschr_value",
      "parsed": "undefined",
      "id": 100045,
      "fflname": "FPS_VAR_BIK_Omschr_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_BIK_Omschr_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'SECTOROFINDUSTRYDESCRIPTION'",
      "index": 100046,
      "name": "KSP_FPS_VAR_BIK_Omschr_title",
      "parsed": "'SECTOROFINDUSTRYDESCRIPTION'",
      "id": 100046,
      "fflname": "FPS_VAR_BIK_Omschr_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_GridId_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100047,
      "name": "KSP_FPS_VAR_GridId_value",
      "parsed": "undefined",
      "id": 100047,
      "fflname": "FPS_VAR_GridId_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_GridId_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'GRIDID'",
      "index": 100048,
      "name": "KSP_FPS_VAR_GridId_title",
      "parsed": "'GRIDID'",
      "id": 100048,
      "fflname": "FPS_VAR_GridId_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Accountmanager_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100049,
      "name": "KSP_FPS_VAR_Accountmanager_value",
      "parsed": "undefined",
      "id": 100049,
      "fflname": "FPS_VAR_Accountmanager_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Accountmanager_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'ACCOUNTMANAGER'",
      "index": 100050,
      "name": "KSP_FPS_VAR_Accountmanager_title",
      "parsed": "'ACCOUNTMANAGER'",
      "id": 100050,
      "fflname": "FPS_VAR_Accountmanager_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Kantoor_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100051,
      "name": "KSP_FPS_VAR_Kantoor_value",
      "parsed": "undefined",
      "id": 100051,
      "fflname": "FPS_VAR_Kantoor_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Kantoor_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'OFFICENUMBER'",
      "index": 100052,
      "name": "KSP_FPS_VAR_Kantoor_title",
      "parsed": "'OFFICENUMBER'",
      "id": 100052,
      "fflname": "FPS_VAR_Kantoor_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Straat_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100053,
      "name": "KSP_FPS_VAR_Straat_value",
      "parsed": "undefined",
      "id": 100053,
      "fflname": "FPS_VAR_Straat_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Straat_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'STREET'",
      "index": 100054,
      "name": "KSP_FPS_VAR_Straat_title",
      "parsed": "'STREET'",
      "id": 100054,
      "fflname": "FPS_VAR_Straat_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Housenumber_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100055,
      "name": "KSP_FPS_VAR_Housenumber_value",
      "parsed": "undefined",
      "id": 100055,
      "fflname": "FPS_VAR_Housenumber_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Housenumber_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'HOUSENUMBER'",
      "index": 100056,
      "name": "KSP_FPS_VAR_Housenumber_title",
      "parsed": "'HOUSENUMBER'",
      "id": 100056,
      "fflname": "FPS_VAR_Housenumber_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Postcode_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100057,
      "name": "KSP_FPS_VAR_Postcode_value",
      "parsed": "undefined",
      "id": 100057,
      "fflname": "FPS_VAR_Postcode_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Postcode_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'ZIPCODE'",
      "index": 100058,
      "name": "KSP_FPS_VAR_Postcode_title",
      "parsed": "'ZIPCODE'",
      "id": 100058,
      "fflname": "FPS_VAR_Postcode_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Woonplaats_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100059,
      "name": "KSP_FPS_VAR_Woonplaats_value",
      "parsed": "undefined",
      "id": 100059,
      "fflname": "FPS_VAR_Woonplaats_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Woonplaats_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'CITY'",
      "index": 100060,
      "name": "KSP_FPS_VAR_Woonplaats_title",
      "parsed": "'CITY'",
      "id": 100060,
      "fflname": "FPS_VAR_Woonplaats_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Provincie_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100061,
      "name": "KSP_FPS_VAR_Provincie_value",
      "parsed": "undefined",
      "id": 100061,
      "fflname": "FPS_VAR_Provincie_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Provincie_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'STATEORPROVINCE'",
      "index": 100062,
      "name": "KSP_FPS_VAR_Provincie_title",
      "parsed": "'STATEORPROVINCE'",
      "id": 100062,
      "fflname": "FPS_VAR_Provincie_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Land_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100063,
      "name": "KSP_FPS_VAR_Land_value",
      "parsed": "undefined",
      "id": 100063,
      "fflname": "FPS_VAR_Land_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Land_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'COUNTRY'",
      "index": 100064,
      "name": "KSP_FPS_VAR_Land_title",
      "parsed": "'COUNTRY'",
      "id": 100064,
      "fflname": "FPS_VAR_Land_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_BvDID_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100065,
      "name": "KSP_FPS_VAR_BvDID_value",
      "parsed": "undefined",
      "id": 100065,
      "fflname": "FPS_VAR_BvDID_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_BvDID_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Bureau van Dijk ID'",
      "index": 100066,
      "name": "KSP_FPS_VAR_BvDID_title",
      "parsed": "'Bureau van Dijk ID'",
      "id": 100066,
      "fflname": "FPS_VAR_BvDID_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Telefoon_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100067,
      "name": "KSP_FPS_VAR_Telefoon_value",
      "parsed": "undefined",
      "id": 100067,
      "fflname": "FPS_VAR_Telefoon_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Telefoon_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Telefoonnummer'",
      "index": 100068,
      "name": "KSP_FPS_VAR_Telefoon_title",
      "parsed": "'Telefoonnummer'",
      "id": 100068,
      "fflname": "FPS_VAR_Telefoon_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Emailadres_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100069,
      "name": "KSP_FPS_VAR_Emailadres_value",
      "parsed": "undefined",
      "id": 100069,
      "fflname": "FPS_VAR_Emailadres_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_VAR_Emailadres_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Emailadres'",
      "index": 100070,
      "name": "KSP_FPS_VAR_Emailadres_title",
      "parsed": "'Emailadres'",
      "id": 100070,
      "fflname": "FPS_VAR_Emailadres_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_FINAN_USER_ROLES_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100071,
      "name": "KSP_FPS_FINAN_USER_ROLES_value",
      "parsed": "undefined",
      "id": 100071,
      "fflname": "FPS_FINAN_USER_ROLES_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_FINAN_USER_ROLES_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'FPS_FINAN_USER_ROLES'",
      "index": 100072,
      "name": "KSP_FPS_FINAN_USER_ROLES_title",
      "parsed": "'FPS_FINAN_USER_ROLES'",
      "id": 100072,
      "fflname": "FPS_FINAN_USER_ROLES_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_FINAN_USER_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100073,
      "name": "KSP_FPS_FINAN_USER_value",
      "parsed": "undefined",
      "id": 100073,
      "fflname": "FPS_FINAN_USER_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FPS_FINAN_USER_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'FPS_FINAN_USER'",
      "index": 100074,
      "name": "KSP_FPS_FINAN_USER_title",
      "parsed": "'FPS_FINAN_USER'",
      "id": 100074,
      "fflname": "FPS_FINAN_USER_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_ROOT_value": true,
        "KSP_Q_MAP06_visible": true,
        "KSP_Q_RESULT_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP01_value",
          "association": "deps",
          "refId": 100095
        },
        {
          "name": "KSP_Q_WARNING_GLOBALTXT_value",
          "association": "deps",
          "refId": 100441
        },
        {
          "name": "KSP_Q_MAP06_visible",
          "association": "refs",
          "refId": 100299
        },
        {
          "name": "KSP_Q_RESULT_value",
          "association": "refs",
          "refId": 100396
        }
      ],
      "deps": {
        "KSP_Q_MAP01_value": true,
        "KSP_Q_WARNING_GLOBALTXT_value": true
      },
      "original": "If(Q_MAP01[doc]==1||Length(Q_WARNING_GLOBALTXT[doc])>0,1,0)",
      "index": 100075,
      "name": "KSP_Q_ROOT_value",
      "parsed": "a100095('100095',x.doc,y.base,z,v)==1||Length(a100441('100441',x.doc,y.base,z,v))>0?1:0",
      "id": 100075,
      "fflname": "Q_ROOT_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_ROOT_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Costs of child raising (v1.27)'",
      "index": 100076,
      "name": "KSP_Q_ROOT_title",
      "parsed": "'Costs of child raising (v1.27)'",
      "id": 100076,
      "fflname": "Q_ROOT_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_Q_ROOT_hint": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'This module enables you to gain insight in the costs involved for raising a child'",
      "index": 100077,
      "name": "KSP_Q_ROOT_hint",
      "parsed": "'This module enables you to gain insight in the costs involved for raising a child'",
      "id": 100077,
      "fflname": "Q_ROOT_hint"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_Q_ROOT_choices": true,
        "KSP_Q_MAP01_choices": true,
        "KSP_Q_MAP02_choices": true,
        "KSP_Q_MAP06_choices": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "[{'name':' 0','value':'Complete'},{'name':'1','value':'Incomplete'}]",
      "index": 100078,
      "name": "KSP_Q_ROOT_choices",
      "parsed": "[{'name':' 0','value':'Complete'},{'name':'1','value':'Incomplete'}]",
      "id": 100078,
      "fflname": "Q_ROOT_choices"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP00_value": true,
        "KSP_Q_MAP00_locked": true,
        "KSP_Q_MAP00_WARNING_locked": true,
        "KSP_Q_MAP00_TEST_locked": true,
        "KSP_Q_MAP00_INFO_locked": true,
        "KSP_Q_MAP00_VALIDATION_locked": true,
        "KSP_Q_MAP00_HINT_locked": true,
        "KSP_Q_MAP00_INTRO_locked": true,
        "KSP_Q_MAP00_INTROMEMO_locked": true,
        "KSP_Q_MAP01_locked": true,
        "KSP_Q_MAP01_WARNING_locked": true,
        "KSP_Q_MAP01_INFO_locked": true,
        "KSP_Q_MAP01_VALIDATION_locked": true,
        "KSP_Q_MAP01_HINT_locked": true,
        "KSP_Situation_locked": true,
        "KSP_IncomeSection_locked": true,
        "KSP_IncomeParent01_required": true,
        "KSP_IncomeParent02_required": true,
        "KSP_WorkingHoursWeeklyParent01_required": true,
        "KSP_WorkingHoursWeeklyParent02_required": true,
        "KSP_WorkingHoursWeeklyOfLeastWorkingParent_required": true,
        "KSP_Child_locked": true,
        "KSP_ChildGender_required": true,
        "KSP_NrOfDaysChildcareWeek_required": true,
        "KSP_NrOfDaysChildcareMonth_locked": true,
        "KSP_NrOfDaysOutOfSchoolCareWeek_required": true,
        "KSP_NrOfDaysOutOfSchoolCareMonth_locked": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "1",
      "index": 100079,
      "name": "KSP_Q_MAP00_value",
      "parsed": "1",
      "id": 100079,
      "fflname": "Q_MAP00_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP00_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Intro'",
      "index": 100080,
      "name": "KSP_Q_MAP00_title",
      "parsed": "'Intro'",
      "id": 100080,
      "fflname": "Q_MAP00_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP00_WARNING_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100081,
      "name": "KSP_Q_MAP00_WARNING_value",
      "parsed": "undefined",
      "id": 100081,
      "fflname": "Q_MAP00_WARNING_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP00_WARNING_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Warning voor map 1'",
      "index": 100082,
      "name": "KSP_Q_MAP00_WARNING_title",
      "parsed": "'Warning voor map 1'",
      "id": 100082,
      "fflname": "Q_MAP00_WARNING_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP00_TEST_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100083,
      "name": "KSP_Q_MAP00_TEST_value",
      "parsed": "undefined",
      "id": 100083,
      "fflname": "Q_MAP00_TEST_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP00_TEST_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Warning voor map 1'",
      "index": 100084,
      "name": "KSP_Q_MAP00_TEST_title",
      "parsed": "'Warning voor map 1'",
      "id": 100084,
      "fflname": "Q_MAP00_TEST_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP00_INFO_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100085,
      "name": "KSP_Q_MAP00_INFO_value",
      "parsed": "undefined",
      "id": 100085,
      "fflname": "Q_MAP00_INFO_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP00_INFO_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Info bij stap 1'",
      "index": 100086,
      "name": "KSP_Q_MAP00_INFO_title",
      "parsed": "'Info bij stap 1'",
      "id": 100086,
      "fflname": "Q_MAP00_INFO_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP00_VALIDATION_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100087,
      "name": "KSP_Q_MAP00_VALIDATION_value",
      "parsed": "undefined",
      "id": 100087,
      "fflname": "Q_MAP00_VALIDATION_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP00_VALIDATION_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Validatie stap 1'",
      "index": 100088,
      "name": "KSP_Q_MAP00_VALIDATION_title",
      "parsed": "'Validatie stap 1'",
      "id": 100088,
      "fflname": "Q_MAP00_VALIDATION_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP00_HINT_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100089,
      "name": "KSP_Q_MAP00_HINT_value",
      "parsed": "undefined",
      "id": 100089,
      "fflname": "Q_MAP00_HINT_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP00_HINT_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Hinttekst stap 1'",
      "index": 100090,
      "name": "KSP_Q_MAP00_HINT_title",
      "parsed": "'Hinttekst stap 1'",
      "id": 100090,
      "fflname": "Q_MAP00_HINT_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP00_INTRO_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100091,
      "name": "KSP_Q_MAP00_INTRO_value",
      "parsed": "undefined",
      "id": 100091,
      "fflname": "Q_MAP00_INTRO_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP00_INTRO_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Intro'",
      "index": 100092,
      "name": "KSP_Q_MAP00_INTRO_title",
      "parsed": "'Intro'",
      "id": 100092,
      "fflname": "Q_MAP00_INTRO_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP00_INTROMEMO_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Why do we use it\\r\\n\\r\\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages&&web page editors now use Lorem Ipsum as their default model text,&&a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour&&the like).\\r\\n\\r\\n\\r\\nWhy do we use it\\r\\n\\r\\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages&&web page editors now use Lorem Ipsum as their default model text,&&a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour&&the like).'",
      "index": 100093,
      "name": "KSP_Q_MAP00_INTROMEMO_value",
      "parsed": "'Why do we use it\\r\\n\\r\\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages&&web page editors now use Lorem Ipsum as their default model text,&&a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour&&the like).\\r\\n\\r\\n\\r\\nWhy do we use it\\r\\n\\r\\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages&&web page editors now use Lorem Ipsum as their default model text,&&a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour&&the like).'",
      "id": 100093,
      "fflname": "Q_MAP00_INTROMEMO_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP00_INTROMEMO_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'[b]Intro[/b]'",
      "index": 100094,
      "name": "KSP_Q_MAP00_INTROMEMO_title",
      "parsed": "'[b]Intro[/b]'",
      "id": 100094,
      "fflname": "Q_MAP00_INTROMEMO_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_value": true,
        "KSP_Q_ROOT_value": true,
        "KSP_Q_MAP01_INFO_value": true,
        "KSP_Q_MAP01_VALIDATION_value": true,
        "KSP_Q_MAP01_STATUS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_ROOT_value",
          "association": "refs",
          "refId": 100075
        },
        {
          "name": "KSP_Q_MAP01_ENTEREDREQUIREDVARS_value",
          "association": "deps",
          "refId": 100171
        },
        {
          "name": "KSP_Q_MAP01_REQUIREDVARS_value",
          "association": "deps",
          "refId": 100169
        },
        {
          "name": "KSP_Q_MAP01_INFO_value",
          "association": "refs",
          "refId": 100099
        },
        {
          "name": "KSP_Q_MAP01_VALIDATION_value",
          "association": "refs",
          "refId": 100101
        },
        {
          "name": "KSP_Q_MAP01_STATUS_value",
          "association": "refs",
          "refId": 100153
        }
      ],
      "deps": {
        "KSP_Q_MAP01_ENTEREDREQUIREDVARS_value": true,
        "KSP_Q_MAP01_REQUIREDVARS_value": true
      },
      "original": "Q_MAP01_ENTEREDREQUIREDVARS==Q_MAP01_REQUIREDVARS",
      "index": 100095,
      "name": "KSP_Q_MAP01_value",
      "parsed": "a100171('100171',x,y.base,z,v)==a100169('100169',x,y.base,z,v)",
      "id": 100095,
      "fflname": "Q_MAP01_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Basic Information'",
      "index": 100096,
      "name": "KSP_Q_MAP01_title",
      "parsed": "'Basic Information'",
      "id": 100096,
      "fflname": "Q_MAP01_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_WARNING_value": true,
        "KSP_Q_MAP01_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_RESTRICTIES_value",
          "association": "deps",
          "refId": 100443
        },
        {
          "name": "KSP_Q_WARNING_GLOBAL_value",
          "association": "deps",
          "refId": 100437
        },
        {
          "name": "KSP_Q_MAP01_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100171
        }
      ],
      "deps": {
        "KSP_Q_RESTRICTIES_value": true,
        "KSP_Q_WARNING_GLOBAL_value": true
      },
      "original": "String(Q_RESTRICTIES[doc]+Q_WARNING_GLOBAL[doc])",
      "index": 100097,
      "name": "KSP_Q_MAP01_WARNING_value",
      "parsed": "String(a100443('100443',x.doc,y.base,z,v)+a100437('100437',x.doc,y.base,z,v))",
      "id": 100097,
      "fflname": "Q_MAP01_WARNING_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_WARNING_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Warning voor map 1'",
      "index": 100098,
      "name": "KSP_Q_MAP01_WARNING_title",
      "parsed": "'Warning voor map 1'",
      "id": 100098,
      "fflname": "Q_MAP01_WARNING_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_INFO_value": true,
        "KSP_Q_MAP01_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP01_value",
          "association": "deps",
          "refId": 100095
        },
        {
          "name": "KSP_Q_MAP01_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100171
        }
      ],
      "deps": {
        "KSP_Q_MAP01_value": true
      },
      "original": "String(If(Q_MAP01[doc]==0,'Nog niet alle verplichte vragen zijn ingevuld.',''))",
      "index": 100099,
      "name": "KSP_Q_MAP01_INFO_value",
      "parsed": "String(a100095('100095',x.doc,y.base,z,v)==0?'Nog niet alle verplichte vragen zijn ingevuld.':'')",
      "id": 100099,
      "fflname": "Q_MAP01_INFO_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_INFO_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Info bij stap 1'",
      "index": 100100,
      "name": "KSP_Q_MAP01_INFO_title",
      "parsed": "'Info bij stap 1'",
      "id": 100100,
      "fflname": "Q_MAP01_INFO_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_VALIDATION_value": true,
        "KSP_Q_MAP01_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP01_value",
          "association": "deps",
          "refId": 100095
        },
        {
          "name": "KSP_Q_MAP01_ENTEREDREQUIREDVARS_value",
          "association": "deps",
          "refId": 100171
        },
        {
          "name": "KSP_Q_MAP01_REQUIREDVARS_value",
          "association": "deps",
          "refId": 100169
        },
        {
          "name": "KSP_Q_MAP01_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100171
        }
      ],
      "deps": {
        "KSP_Q_MAP01_value": true,
        "KSP_Q_MAP01_ENTEREDREQUIREDVARS_value": true,
        "KSP_Q_MAP01_REQUIREDVARS_value": true
      },
      "original": "String(If(Q_MAP01[doc]==0,'Er zijn '+Str(Q_MAP01_ENTEREDREQUIREDVARS,0,0)+' van de '+Str(Q_MAP01_REQUIREDVARS,0,0)+' verplichte vragen in deze stap ingevuld.',''))",
      "index": 100101,
      "name": "KSP_Q_MAP01_VALIDATION_value",
      "parsed": "String(a100095('100095',x.doc,y.base,z,v)==0?'Er zijn '+Str(a100171('100171',x,y.base,z,v),0,0)+' van de '+Str(a100169('100169',x,y.base,z,v),0,0)+' verplichte vragen in deze stap ingevuld.':'')",
      "id": 100101,
      "fflname": "Q_MAP01_VALIDATION_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_VALIDATION_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Validatie stap 1'",
      "index": 100102,
      "name": "KSP_Q_MAP01_VALIDATION_title",
      "parsed": "'Validatie stap 1'",
      "id": 100102,
      "fflname": "Q_MAP01_VALIDATION_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_HINT_value": true,
        "KSP_Q_MAP01_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP01_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100171
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100103,
      "name": "KSP_Q_MAP01_HINT_value",
      "parsed": "undefined",
      "id": 100103,
      "fflname": "Q_MAP01_HINT_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_HINT_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Hinttekst stap 1'",
      "index": 100104,
      "name": "KSP_Q_MAP01_HINT_title",
      "parsed": "'Hinttekst stap 1'",
      "id": 100104,
      "fflname": "Q_MAP01_HINT_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_Q_MAP01_HINT_hint": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Dit is de hinttekst van de variable Q_MAP01_HINT (DEZE REGEL WORDT NIET GEBRUIKT!)'",
      "index": 100105,
      "name": "KSP_Q_MAP01_HINT_hint",
      "parsed": "'Dit is de hinttekst van de variable Q_MAP01_HINT (DEZE REGEL WORDT NIET GEBRUIKT!)'",
      "id": 100105,
      "fflname": "Q_MAP01_HINT_hint"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Situation_value": true,
        "KSP_Q_MAP01_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP01_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100171
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100106,
      "name": "KSP_Situation_value",
      "parsed": "undefined",
      "id": 100106,
      "fflname": "Situation_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Situation_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Situation'",
      "index": 100107,
      "name": "KSP_Situation_title",
      "parsed": "'Situation'",
      "id": 100107,
      "fflname": "Situation_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_IncomeSection_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100108,
      "name": "KSP_IncomeSection_value",
      "parsed": "undefined",
      "id": 100108,
      "fflname": "IncomeSection_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_IncomeSection_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'[b]Income[/b]'",
      "index": 100109,
      "name": "KSP_IncomeSection_title",
      "parsed": "'[b]Income[/b]'",
      "id": 100109,
      "fflname": "IncomeSection_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_IncomeParent01_value": true,
        "KSP_TotalIncome_value": true,
        "KSP_CombinationDiscountLowestIncome_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalIncome_value",
          "association": "refs",
          "refId": 100244
        },
        {
          "name": "KSP_CombinationDiscountLowestIncome_value",
          "association": "refs",
          "refId": 100273
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100110,
      "name": "KSP_IncomeParent01_value",
      "parsed": "undefined",
      "id": 100110,
      "fflname": "IncomeParent01_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_IncomeParent01_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Gross Income Parent 1'",
      "index": 100111,
      "name": "KSP_IncomeParent01_title",
      "parsed": "'Gross Income Parent 1'",
      "id": 100111,
      "fflname": "IncomeParent01_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_IncomeParent02_value": true,
        "KSP_TotalIncome_value": true,
        "KSP_CombinationDiscountLowestIncome_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalIncome_value",
          "association": "refs",
          "refId": 100244
        },
        {
          "name": "KSP_CombinationDiscountLowestIncome_value",
          "association": "refs",
          "refId": 100273
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100112,
      "name": "KSP_IncomeParent02_value",
      "parsed": "undefined",
      "id": 100112,
      "fflname": "IncomeParent02_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_IncomeParent02_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Gross Income Parent 2'",
      "index": 100113,
      "name": "KSP_IncomeParent02_title",
      "parsed": "'Gross Income Parent 2'",
      "id": 100113,
      "fflname": "IncomeParent02_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_WorkingHoursWeeklyParent01_value": true,
        "KSP_WorkingHoursWeeklyOfLeastWorkingParent_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_WorkingHoursWeeklyOfLeastWorkingParent_value",
          "association": "refs",
          "refId": 100118
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100114,
      "name": "KSP_WorkingHoursWeeklyParent01_value",
      "parsed": "undefined",
      "id": 100114,
      "fflname": "WorkingHoursWeeklyParent01_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_WorkingHoursWeeklyParent01_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Working hours parent 1'",
      "index": 100115,
      "name": "KSP_WorkingHoursWeeklyParent01_title",
      "parsed": "'Working hours parent 1'",
      "id": 100115,
      "fflname": "WorkingHoursWeeklyParent01_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_WorkingHoursWeeklyParent02_value": true,
        "KSP_WorkingHoursWeeklyOfLeastWorkingParent_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_WorkingHoursWeeklyOfLeastWorkingParent_value",
          "association": "refs",
          "refId": 100118
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100116,
      "name": "KSP_WorkingHoursWeeklyParent02_value",
      "parsed": "undefined",
      "id": 100116,
      "fflname": "WorkingHoursWeeklyParent02_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_WorkingHoursWeeklyParent02_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Working hours parent 2'",
      "index": 100117,
      "name": "KSP_WorkingHoursWeeklyParent02_title",
      "parsed": "'Working hours parent 2'",
      "id": 100117,
      "fflname": "WorkingHoursWeeklyParent02_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_WorkingHoursWeeklyOfLeastWorkingParent_value": true,
        "KSP_MaxNrCompensatedHoursChildcare_value": true,
        "KSP_MaxNrCompensatedHoursOutofSchoolCare_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_WorkingHoursWeeklyParent01_value",
          "association": "deps",
          "refId": 100114
        },
        {
          "name": "KSP_WorkingHoursWeeklyParent02_value",
          "association": "deps",
          "refId": 100116
        },
        {
          "name": "KSP_MaxNrCompensatedHoursChildcare_value",
          "association": "refs",
          "refId": 100229
        },
        {
          "name": "KSP_MaxNrCompensatedHoursOutofSchoolCare_value",
          "association": "refs",
          "refId": 100231
        }
      ],
      "deps": {
        "KSP_WorkingHoursWeeklyParent01_value": true,
        "KSP_WorkingHoursWeeklyParent02_value": true
      },
      "original": "Min(WorkingHoursWeeklyParent01,WorkingHoursWeeklyParent02)",
      "index": 100118,
      "name": "KSP_WorkingHoursWeeklyOfLeastWorkingParent_value",
      "parsed": "Math.min(a100114('100114',x,y.base,z,v),a100116('100116',x,y.base,z,v))",
      "id": 100118,
      "fflname": "WorkingHoursWeeklyOfLeastWorkingParent_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_WorkingHoursWeeklyOfLeastWorkingParent_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Working hours (weekly) of least working Parent'",
      "index": 100119,
      "name": "KSP_WorkingHoursWeeklyOfLeastWorkingParent_title",
      "parsed": "'Working hours (weekly) of least working Parent'",
      "id": 100119,
      "fflname": "WorkingHoursWeeklyOfLeastWorkingParent_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_WorkingHoursWeeklyOfLeastWorkingParent_hint": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Here, you have to enter the number of hours (on weekly basis) of the parent who has the smallest employment contract. This data is required to determine the maximum nr. of hours per month for childcare for which a public contribution can be claimed'",
      "index": 100120,
      "name": "KSP_WorkingHoursWeeklyOfLeastWorkingParent_hint",
      "parsed": "'Here, you have to enter the number of hours (on weekly basis) of the parent who has the smallest employment contract. This data is required to determine the maximum nr. of hours per month for childcare for which a public contribution can be claimed'",
      "id": 100120,
      "fflname": "WorkingHoursWeeklyOfLeastWorkingParent_hint"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Child_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100121,
      "name": "KSP_Child_value",
      "parsed": "undefined",
      "id": 100121,
      "fflname": "Child_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Child_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Child'",
      "index": 100122,
      "name": "KSP_Child_title",
      "parsed": "'Child'",
      "id": 100122,
      "fflname": "Child_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildGender_value": true,
        "KSP_ActualFood_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_ActualFood_value",
          "association": "refs",
          "refId": 100325
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100123,
      "name": "KSP_ChildGender_value",
      "parsed": "undefined",
      "id": 100123,
      "fflname": "ChildGender_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildGender_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Gender'",
      "index": 100124,
      "name": "KSP_ChildGender_title",
      "parsed": "'Gender'",
      "id": 100124,
      "fflname": "ChildGender_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_ChildGender_choices": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "[{'name':' 0','value':'Boy'},{'name':'1','value':'Girl'}]",
      "index": 100125,
      "name": "KSP_ChildGender_choices",
      "parsed": "[{'name':' 0','value':'Boy'},{'name':'1','value':'Girl'}]",
      "id": 100125,
      "fflname": "ChildGender_choices"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_NrOfDaysChildcareWeek_value": true,
        "KSP_NrOfDaysChildcareMonth_value": true,
        "KSP_TupleSumTest_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_NrOfDaysChildcareMonth_value",
          "association": "refs",
          "refId": 100128
        },
        {
          "name": "KSP_TupleSumTest_value",
          "association": "refs",
          "refId": 100147
        }
      ],
      "deps": {},
      "original": "NA",
      "index": 100126,
      "name": "KSP_NrOfDaysChildcareWeek_value",
      "parsed": "NA",
      "id": 100126,
      "fflname": "NrOfDaysChildcareWeek_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_NrOfDaysChildcareWeek_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Nr. of days childcare per week'",
      "index": 100127,
      "name": "KSP_NrOfDaysChildcareWeek_title",
      "parsed": "'Nr. of days childcare per week'",
      "id": 100127,
      "fflname": "NrOfDaysChildcareWeek_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_NrOfDaysChildcareMonth_value": true,
        "KSP_NrCompensatedHoursChildcare_value": true,
        "KSP_ChildCareCosts_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_NrOfDaysChildcareWeek_value",
          "association": "deps",
          "refId": 100126
        },
        {
          "name": "KSP_NrCompensatedHoursChildcare_value",
          "association": "refs",
          "refId": 100234
        },
        {
          "name": "KSP_ChildCareCosts_value",
          "association": "refs",
          "refId": 100372
        }
      ],
      "deps": {
        "KSP_NrOfDaysChildcareWeek_value": true
      },
      "original": "OnER(10.5*NrOfDaysChildcareWeek[doc]*4,NA)",
      "index": 100128,
      "name": "KSP_NrOfDaysChildcareMonth_value",
      "parsed": "OnER(10.5*a100126('100126',x.doc,y,z,v)*4,NA)",
      "id": 100128,
      "fflname": "NrOfDaysChildcareMonth_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_NrOfDaysChildcareMonth_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Nr. of hours childcare per month'",
      "index": 100129,
      "name": "KSP_NrOfDaysChildcareMonth_title",
      "parsed": "'Nr. of hours childcare per month'",
      "id": 100129,
      "fflname": "NrOfDaysChildcareMonth_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_NrOfDaysOutOfSchoolCareWeek_value": true,
        "KSP_NrOfDaysOutOfSchoolCareMonth_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_NrOfDaysOutOfSchoolCareMonth_value",
          "association": "refs",
          "refId": 100132
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100130,
      "name": "KSP_NrOfDaysOutOfSchoolCareWeek_value",
      "parsed": "undefined",
      "id": 100130,
      "fflname": "NrOfDaysOutOfSchoolCareWeek_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_NrOfDaysOutOfSchoolCareWeek_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Nr. of days out-of-school care per week'",
      "index": 100131,
      "name": "KSP_NrOfDaysOutOfSchoolCareWeek_title",
      "parsed": "'Nr. of days out-of-school care per week'",
      "id": 100131,
      "fflname": "NrOfDaysOutOfSchoolCareWeek_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_NrOfDaysOutOfSchoolCareMonth_value": true,
        "KSP_NrCompensatedHoursOutofSchoolCare_value": true,
        "KSP_CostsForOutOfSchoolCare_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_NrOfDaysOutOfSchoolCareWeek_value",
          "association": "deps",
          "refId": 100130
        },
        {
          "name": "KSP_NrCompensatedHoursOutofSchoolCare_value",
          "association": "refs",
          "refId": 100236
        },
        {
          "name": "KSP_CostsForOutOfSchoolCare_value",
          "association": "refs",
          "refId": 100345
        }
      ],
      "deps": {
        "KSP_NrOfDaysOutOfSchoolCareWeek_value": true
      },
      "original": "OnER(4*NrOfDaysOutOfSchoolCareWeek*4.5,NA)",
      "index": 100132,
      "name": "KSP_NrOfDaysOutOfSchoolCareMonth_value",
      "parsed": "OnER(4*a100130('100130',x,y,z,v)*4.5,NA)",
      "id": 100132,
      "fflname": "NrOfDaysOutOfSchoolCareMonth_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_NrOfDaysOutOfSchoolCareMonth_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Nr. of hours out-of-school care per month'",
      "index": 100133,
      "name": "KSP_NrOfDaysOutOfSchoolCareMonth_title",
      "parsed": "'Nr. of hours out-of-school care per month'",
      "id": 100133,
      "fflname": "NrOfDaysOutOfSchoolCareMonth_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_HourlyFeeChildCare_value": true,
        "KSP_MaxCompensatedAmountChildcare_value": true,
        "KSP_ChildCareCosts_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_MaxCompensatedAmountChildcare_value",
          "association": "refs",
          "refId": 100239
        },
        {
          "name": "KSP_ChildCareCosts_value",
          "association": "refs",
          "refId": 100372
        }
      ],
      "deps": {},
      "original": "6.8",
      "index": 100134,
      "name": "KSP_HourlyFeeChildCare_value",
      "parsed": "6.8",
      "id": 100134,
      "fflname": "HourlyFeeChildCare_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_HourlyFeeChildCare_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Hourly fee childcare'",
      "index": 100135,
      "name": "KSP_HourlyFeeChildCare_title",
      "parsed": "'Hourly fee childcare'",
      "id": 100135,
      "fflname": "HourlyFeeChildCare_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_HourlyFeeOutOfSchoolCare_value": true,
        "KSP_MaxCompensatedAmountOutofSchoolCare_value": true,
        "KSP_CostsForOutOfSchoolCare_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_MaxCompensatedAmountOutofSchoolCare_value",
          "association": "refs",
          "refId": 100241
        },
        {
          "name": "KSP_CostsForOutOfSchoolCare_value",
          "association": "refs",
          "refId": 100345
        }
      ],
      "deps": {},
      "original": "6.8",
      "index": 100136,
      "name": "KSP_HourlyFeeOutOfSchoolCare_value",
      "parsed": "6.8",
      "id": 100136,
      "fflname": "HourlyFeeOutOfSchoolCare_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_HourlyFeeOutOfSchoolCare_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Hourly fee out-of-school care'",
      "index": 100137,
      "name": "KSP_HourlyFeeOutOfSchoolCare_title",
      "parsed": "'Hourly fee out-of-school care'",
      "id": 100137,
      "fflname": "HourlyFeeOutOfSchoolCare_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ParentalContributionPrimaryEducation_value": true,
        "KSP_CostsForPrimaryEducation_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_CostsForPrimaryEducation_value",
          "association": "refs",
          "refId": 100347
        }
      ],
      "deps": {},
      "original": "80",
      "index": 100138,
      "name": "KSP_ParentalContributionPrimaryEducation_value",
      "parsed": "80",
      "id": 100138,
      "fflname": "ParentalContributionPrimaryEducation_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ParentalContributionPrimaryEducation_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Parental contribution primary education'",
      "index": 100139,
      "name": "KSP_ParentalContributionPrimaryEducation_title",
      "parsed": "'Parental contribution primary education'",
      "id": 100139,
      "fflname": "ParentalContributionPrimaryEducation_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CostsUnspecified_value": true,
        "KSP_CostsUnspecifiedOverview_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_CostsUnspecifiedOverview_value",
          "association": "refs",
          "refId": 100351
        }
      ],
      "deps": {},
      "original": "180",
      "index": 100140,
      "name": "KSP_CostsUnspecified_value",
      "parsed": "180",
      "id": 100140,
      "fflname": "CostsUnspecified_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CostsUnspecified_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Costs unspecified per month'",
      "index": 100141,
      "name": "KSP_CostsUnspecified_title",
      "parsed": "'Costs unspecified per month'",
      "id": 100141,
      "fflname": "CostsUnspecified_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_SecondaryEducationProfile_value": true,
        "KSP_SecondaryEducationProfile_required": true,
        "KSP_TotalyYearlyCostsChild_locked": true,
        "KSP_Q_MAP01_PARAGRAAF09_locked": true,
        "KSP_Q_MAP01_STATUS_locked": true,
        "KSP_Q_MAP01_PARAGRAAF09SUB2_locked": true,
        "KSP_Q_MAP01_PARAGRAAF09SUB3_locked": true,
        "KSP_Q_MAP01_PARAGRAAF09SUB4_locked": true,
        "KSP_Q_MAP01_PARAGRAAF09SUB5_locked": true,
        "KSP_Q_MAP01_PARAGRAAF09SUB6_locked": true,
        "KSP_Q_MAP01_HULPVARIABELEN_locked": true,
        "KSP_Q_MAP01_REQUIREDVARS_locked": true,
        "KSP_Q_MAP01_ENTEREDREQUIREDVARS_locked": true,
        "KSP_DEBUG_locked": true,
        "KSP_Q_MAP02_locked": true,
        "KSP_Q_MAP02_WARNING_locked": true,
        "KSP_Q_MAP02_INFO_locked": true,
        "KSP_Q_MAP02_VALIDATION_locked": true,
        "KSP_Q_MAP02_HINT_locked": true,
        "KSP_FiscalParameters_locked": true,
        "KSP_ChildcareContribution_locked": true,
        "KSP_MaximumNrOfHoursOfChildcareAllowancePerMonth_locked": true,
        "KSP_MultiplierDaycare_locked": true,
        "KSP_MultiplierOutOfSchoolCare_locked": true,
        "KSP_MaxHourlyRateChildcare_locked": true,
        "KSP_MaxHourlyRateOutOfSchoolCare_locked": true,
        "KSP_MaxHourlyRateGuestParent_locked": true,
        "KSP_MaxHourlyRateGuestParentOutOfSchoolCare_locked": true,
        "KSP_CombinationDiscount_locked": true,
        "KSP_LowerBoundaryIncome_locked": true,
        "KSP_Base_locked": true,
        "KSP_CombinationDiscountPercentage_locked": true,
        "KSP_MaximumDiscount_locked": true,
        "KSP_ChildRelatedBudget_locked": true,
        "KSP_MaxBudgetOneToTwelveYears_locked": true,
        "KSP_MaxBudgetTwelveToFifteenYears_locked": true,
        "KSP_MaxBudgetSixteenToSeventeenYears_locked": true,
        "KSP_UpperBoundaryIncome_locked": true,
        "KSP_DecreasingPercentage_locked": true,
        "KSP_Fees_locked": true,
        "KSP_MaxNrCompensatedHoursChildcare_locked": true,
        "KSP_MaxNrCompensatedHoursOutofSchoolCare_locked": true,
        "KSP_FeesSub3_locked": true,
        "KSP_NrCompensatedHoursChildcare_locked": true,
        "KSP_NrCompensatedHoursOutofSchoolCare_locked": true,
        "KSP_FeesSub6_locked": true,
        "KSP_MaxCompensatedAmountChildcare_locked": true,
        "KSP_MaxCompensatedAmountOutofSchoolCare_locked": true,
        "KSP_FeesSub9_locked": true,
        "KSP_TotalIncome_locked": true,
        "KSP_PercentagePremiumFirstChild_locked": true,
        "KSP_FeesSub12_locked": true,
        "KSP_PremiumForChildcare_locked": true,
        "KSP_PremiumForOutofSchoolCare_locked": true,
        "KSP_CostsSecondaryEducation_locked": true,
        "KSP_CostsYearOneFour_locked": true,
        "KSP_CostsYearFiveSixSeven_locked": true,
        "KSP_Q_MAP02SUB10_locked": true,
        "KSP_Q_MAP02SUB10SUB1_locked": true,
        "KSP_ChildRelatedBudgetDecrease_locked": true,
        "KSP_ChildRelatedBudgetUpToTwelve_locked": true,
        "KSP_ChildRelatedBudgetTwelveUpToAndInclFifteen_locked": true,
        "KSP_ChildRelatedBudgetSixteenUpToAndIncSeventeen_locked": true,
        "KSP_Q_MAP02SUB11_locked": true,
        "KSP_CombinationDiscountLowestIncome_locked": true,
        "KSP_CombinationDiscountTotal_locked": true,
        "KSP_Q_MAP02_PARAGRAAF09_locked": true,
        "KSP_Q_MAP02_STATUS_locked": true,
        "KSP_Q_MAP02_PARAGRAAF09SUB2_locked": true,
        "KSP_Q_MAP02_PARAGRAAF09SUB3_locked": true,
        "KSP_Q_MAP02_PARAGRAAF09SUB4_locked": true,
        "KSP_Q_MAP02_PARAGRAAF09SUB5_locked": true,
        "KSP_Q_MAP02_PARAGRAAF09SUB6_locked": true,
        "KSP_Q_MAP02_HULPVARIABELEN_locked": true,
        "KSP_Q_MAP02_REQUIREDVARS_locked": true,
        "KSP_Q_MAP02_ENTEREDREQUIREDVARS_locked": true,
        "KSP_Q_MAP06_locked": true,
        "KSP_Q_MAP06_WARNING_locked": true,
        "KSP_Q_MAP06_INFO_locked": true,
        "KSP_Q_MAP06_VALIDATION_locked": true,
        "KSP_Q_MAP06_HINT_locked": true,
        "KSP_Q_MAP06SUB5_locked": true,
        "KSP_GraphResRek1_locked": true,
        "KSP_Q_MAP06SUB5SUB2_locked": true,
        "KSP_Age_locked": true,
        "KSP_PeriodeInFormulaset_locked": true,
        "KSP_Furniture_locked": true,
        "KSP_ActualChildCareCosts_locked": true,
        "KSP_CostsUnspecifiedOverview_locked": true,
        "KSP_TotalYearlyCosts_locked": true,
        "KSP_Q_MAP06SUB5SUB3_locked": true,
        "KSP_ChildBenefits_locked": true,
        "KSP_ChildCarePremiumOverview_locked": true,
        "KSP_ChildcareBudgetOverview_locked": true,
        "KSP_CombinationDiscountOverview_locked": true,
        "KSP_TotalYearlyIncome_locked": true,
        "KSP_TotalYearlyBalance_locked": true,
        "KSP_TotalMonthlyBalanceAverage_locked": true,
        "KSP_Q_MAP06_PARAGRAAF09_locked": true,
        "KSP_Q_MAP06_STATUS_locked": true,
        "KSP_Q_MAP06_PARAGRAAF09SUB2_locked": true,
        "KSP_Q_MAP06_PARAGRAAF09SUB3_locked": true,
        "KSP_Q_MAP06_PARAGRAAF09SUB4_locked": true,
        "KSP_Q_MAP06_PARAGRAAF09SUB5_locked": true,
        "KSP_Q_MAP06_PARAGRAAF09SUB6_locked": true,
        "KSP_Q_MAP06_HULPVARIABELEN_locked": true,
        "KSP_Q_MAP06_REQUIREDVARS_locked": true,
        "KSP_Q_MAP06_ENTEREDREQUIREDVARS_locked": true,
        "KSP_Q_RESULT_locked": true,
        "KSP_Q_RESULTSUB1_locked": true,
        "KSP_ModelVersion_locked": true,
        "KSP_ModelType_locked": true,
        "KSP_CostsYearOneFour_value": true,
        "KSP_CostsYearFiveSixSeven_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_CostsYearOneFour_value",
          "association": "refs",
          "refId": 100255
        },
        {
          "name": "KSP_CostsYearFiveSixSeven_value",
          "association": "refs",
          "refId": 100257
        }
      ],
      "deps": {},
      "original": "1",
      "index": 100142,
      "name": "KSP_SecondaryEducationProfile_value",
      "parsed": "1",
      "id": 100142,
      "fflname": "SecondaryEducationProfile_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_SecondaryEducationProfile_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'secondary education (profile)'",
      "index": 100143,
      "name": "KSP_SecondaryEducationProfile_title",
      "parsed": "'secondary education (profile)'",
      "id": 100143,
      "fflname": "SecondaryEducationProfile_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_SecondaryEducationProfile_choices": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "[{'name':' 0','value':'VWO'},{'name':'1','value':'VMBO-MBO'},{'name':'2','value':'VMBO-HAVO'},{'name':'3','value':'HAVO'}]",
      "index": 100144,
      "name": "KSP_SecondaryEducationProfile_choices",
      "parsed": "[{'name':' 0','value':'VWO'},{'name':'1','value':'VMBO-MBO'},{'name':'2','value':'VMBO-HAVO'},{'name':'3','value':'HAVO'}]",
      "id": 100144,
      "fflname": "SecondaryEducationProfile_choices"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_TotalyYearlyCostsChild_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Furniture_value",
          "association": "deps",
          "refId": 100319
        },
        {
          "name": "KSP_ActualChildCareCosts_value",
          "association": "deps",
          "refId": 100321
        },
        {
          "name": "KSP_ActualDiapers_value",
          "association": "deps",
          "refId": 100323
        },
        {
          "name": "KSP_ActualFood_value",
          "association": "deps",
          "refId": 100325
        },
        {
          "name": "KSP_ActualClothingCosts_value",
          "association": "deps",
          "refId": 100327
        },
        {
          "name": "KSP_ActualPersonalCareCosts_value",
          "association": "deps",
          "refId": 100329
        },
        {
          "name": "KSP_Hairdresser_value",
          "association": "deps",
          "refId": 100331
        },
        {
          "name": "KSP_Inventory_value",
          "association": "deps",
          "refId": 100333
        },
        {
          "name": "KSP_Allowance_value",
          "association": "deps",
          "refId": 100335
        },
        {
          "name": "KSP_Contributions_value",
          "association": "deps",
          "refId": 100337
        },
        {
          "name": "KSP_Transport_value",
          "association": "deps",
          "refId": 100339
        },
        {
          "name": "KSP_MobilePhone_value",
          "association": "deps",
          "refId": 100341
        },
        {
          "name": "KSP_DrivingLicense_value",
          "association": "deps",
          "refId": 100343
        },
        {
          "name": "KSP_CostsForOutOfSchoolCare_value",
          "association": "deps",
          "refId": 100345
        },
        {
          "name": "KSP_CostsForPrimaryEducation_value",
          "association": "deps",
          "refId": 100347
        },
        {
          "name": "KSP_CostsForSecondaryEducation_value",
          "association": "deps",
          "refId": 100349
        },
        {
          "name": "KSP_CostsUnspecifiedOverview_value",
          "association": "deps",
          "refId": 100351
        }
      ],
      "deps": {
        "KSP_Furniture_value": true,
        "KSP_ActualChildCareCosts_value": true,
        "KSP_ActualDiapers_value": true,
        "KSP_ActualFood_value": true,
        "KSP_ActualClothingCosts_value": true,
        "KSP_ActualPersonalCareCosts_value": true,
        "KSP_Hairdresser_value": true,
        "KSP_Inventory_value": true,
        "KSP_Allowance_value": true,
        "KSP_Contributions_value": true,
        "KSP_Transport_value": true,
        "KSP_MobilePhone_value": true,
        "KSP_DrivingLicense_value": true,
        "KSP_CostsForOutOfSchoolCare_value": true,
        "KSP_CostsForPrimaryEducation_value": true,
        "KSP_CostsForSecondaryEducation_value": true,
        "KSP_CostsUnspecifiedOverview_value": true
      },
      "original": "Furniture+ActualChildCareCosts+ActualDiapers+ActualFood+ActualClothingCosts+ActualPersonalCareCosts+Hairdresser+Inventory+Allowance+Contributions+Transport+MobilePhone+DrivingLicense+CostsForOutOfSchoolCare+CostsForPrimaryEducation+CostsForSecondaryEducation+CostsUnspecifiedOverview",
      "index": 100145,
      "name": "KSP_TotalyYearlyCostsChild_value",
      "parsed": "a100319('100319',x,y.base,z,v)+a100321('100321',x,y.base,z,v)+a100323('100323',x,y.base,z,v)+a100325('100325',x,y.base,z,v)+a100327('100327',x,y.base,z,v)+a100329('100329',x,y.base,z,v)+a100331('100331',x,y.base,z,v)+a100333('100333',x,y.base,z,v)+a100335('100335',x,y.base,z,v)+a100337('100337',x,y.base,z,v)+a100339('100339',x,y.base,z,v)+a100341('100341',x,y.base,z,v)+a100343('100343',x,y.base,z,v)+a100345('100345',x,y.base,z,v)+a100347('100347',x,y.base,z,v)+a100349('100349',x,y.base,z,v)+a100351('100351',x,y.base,z,v)",
      "id": 100145,
      "fflname": "TotalyYearlyCostsChild_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_TotalyYearlyCostsChild_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Total (yearly) costs regarding child'",
      "index": 100146,
      "name": "KSP_TotalyYearlyCostsChild_title",
      "parsed": "'Total (yearly) costs regarding child'",
      "id": 100146,
      "fflname": "TotalyYearlyCostsChild_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_TupleSumTest_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_NrOfDaysChildcareWeek_value",
          "association": "deps",
          "refId": 100126
        }
      ],
      "deps": {
        "KSP_NrOfDaysChildcareWeek_value": true
      },
      "original": "TSUM(NrOfDaysChildcareWeek)",
      "index": 100147,
      "name": "KSP_TupleSumTest_value",
      "parsed": "SUM(TVALUES([100126,100123,100126,100128,100130,100132,100134,100136,100138,100140,100142,100145],a100126,'100126',x,y,z,v))",
      "id": 100147,
      "fflname": "TupleSumTest_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Memo1_value": true,
        "KSP_DEBUG_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_DEBUG_value",
          "association": "refs",
          "refId": 100173
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100148,
      "name": "KSP_Memo1_value",
      "parsed": "undefined",
      "id": 100148,
      "fflname": "Memo1_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Memo1_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Toelichting'",
      "index": 100149,
      "name": "KSP_Memo1_title",
      "parsed": "'Toelichting'",
      "id": 100149,
      "fflname": "Memo1_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_PARAGRAAF09_value": true,
        "KSP_Q_MAP01_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP01_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100171
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100150,
      "name": "KSP_Q_MAP01_PARAGRAAF09_value",
      "parsed": "undefined",
      "id": 100150,
      "fflname": "Q_MAP01_PARAGRAAF09_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_PARAGRAAF09_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Eigenschappen van de stap'",
      "index": 100151,
      "name": "KSP_Q_MAP01_PARAGRAAF09_title",
      "parsed": "'Eigenschappen van de stap'",
      "id": 100151,
      "fflname": "Q_MAP01_PARAGRAAF09_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_Q_MAP01_PARAGRAAF09_visible": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP01_visible",
          "association": "deps"
        },
        {
          "name": "KSP_DEBUG_value",
          "association": "deps",
          "refId": 100173
        }
      ],
      "deps": {
        "KSP_Q_MAP01_visible": true,
        "KSP_DEBUG_value": true
      },
      "original": "Q_MAP01.visible&&DEBUG==1",
      "index": 100152,
      "name": "KSP_Q_MAP01_PARAGRAAF09_visible",
      "parsed": "true&&a100173('100173',x,y.base,z,v)==1",
      "id": 100152,
      "fflname": "Q_MAP01_PARAGRAAF09_visible"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_STATUS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP01_value",
          "association": "deps",
          "refId": 100095
        }
      ],
      "deps": {
        "KSP_Q_MAP01_value": true
      },
      "original": "Q_MAP01",
      "index": 100153,
      "name": "KSP_Q_MAP01_STATUS_value",
      "parsed": "a100095('100095',x,y.base,z,v)",
      "id": 100153,
      "fflname": "Q_MAP01_STATUS_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_STATUS_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Status van de stap'",
      "index": 100154,
      "name": "KSP_Q_MAP01_STATUS_title",
      "parsed": "'Status van de stap'",
      "id": 100154,
      "fflname": "Q_MAP01_STATUS_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_Q_MAP01_STATUS_choices": true,
        "KSP_Q_MAP02_STATUS_choices": true,
        "KSP_Q_MAP06_STATUS_choices": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "[{'name':' 0','value':'Deze stap is volledig ingevuld (vinkje aanwezig)'},{'name':'1','value':'Deze stap is NIET volledig ingevuld (geen vinkje aanwezig)'}]",
      "index": 100155,
      "name": "KSP_Q_MAP01_STATUS_choices",
      "parsed": "[{'name':' 0','value':'Deze stap is volledig ingevuld (vinkje aanwezig)'},{'name':'1','value':'Deze stap is NIET volledig ingevuld (geen vinkje aanwezig)'}]",
      "id": 100155,
      "fflname": "Q_MAP01_STATUS_choices"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_PARAGRAAF09SUB2_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100156,
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB2_value",
      "parsed": "undefined",
      "id": 100156,
      "fflname": "Q_MAP01_PARAGRAAF09SUB2_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_PARAGRAAF09SUB2_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Warning voor map 1'",
      "index": 100157,
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB2_title",
      "parsed": "'Warning voor map 1'",
      "id": 100157,
      "fflname": "Q_MAP01_PARAGRAAF09SUB2_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_PARAGRAAF09SUB3_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100158,
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB3_value",
      "parsed": "undefined",
      "id": 100158,
      "fflname": "Q_MAP01_PARAGRAAF09SUB3_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_PARAGRAAF09SUB3_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Info bij stap 1'",
      "index": 100159,
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB3_title",
      "parsed": "'Info bij stap 1'",
      "id": 100159,
      "fflname": "Q_MAP01_PARAGRAAF09SUB3_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_PARAGRAAF09SUB4_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100160,
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB4_value",
      "parsed": "undefined",
      "id": 100160,
      "fflname": "Q_MAP01_PARAGRAAF09SUB4_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_PARAGRAAF09SUB4_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Validatie stap 1'",
      "index": 100161,
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB4_title",
      "parsed": "'Validatie stap 1'",
      "id": 100161,
      "fflname": "Q_MAP01_PARAGRAAF09SUB4_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_PARAGRAAF09SUB5_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100162,
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB5_value",
      "parsed": "undefined",
      "id": 100162,
      "fflname": "Q_MAP01_PARAGRAAF09SUB5_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_PARAGRAAF09SUB5_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Aantal verplichte velden (1)'",
      "index": 100163,
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB5_title",
      "parsed": "'Aantal verplichte velden (1)'",
      "id": 100163,
      "fflname": "Q_MAP01_PARAGRAAF09SUB5_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_PARAGRAAF09SUB6_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100164,
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB6_value",
      "parsed": "undefined",
      "id": 100164,
      "fflname": "Q_MAP01_PARAGRAAF09SUB6_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_PARAGRAAF09SUB6_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Aantal ingevulde verplichte velden (1)'",
      "index": 100165,
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB6_title",
      "parsed": "'Aantal ingevulde verplichte velden (1)'",
      "id": 100165,
      "fflname": "Q_MAP01_PARAGRAAF09SUB6_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_HULPVARIABELEN_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100166,
      "name": "KSP_Q_MAP01_HULPVARIABELEN_value",
      "parsed": "undefined",
      "id": 100166,
      "fflname": "Q_MAP01_HULPVARIABELEN_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_HULPVARIABELEN_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Hulpvariabelen'",
      "index": 100167,
      "name": "KSP_Q_MAP01_HULPVARIABELEN_title",
      "parsed": "'Hulpvariabelen'",
      "id": 100167,
      "fflname": "Q_MAP01_HULPVARIABELEN_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_Q_MAP01_HULPVARIABELEN_visible": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP01_visible",
          "association": "deps"
        }
      ],
      "deps": {
        "KSP_Q_MAP01_visible": true
      },
      "original": "Q_MAP01.visible&&0",
      "index": 100168,
      "name": "KSP_Q_MAP01_HULPVARIABELEN_visible",
      "parsed": "true&&0",
      "id": 100168,
      "fflname": "Q_MAP01_HULPVARIABELEN_visible"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_REQUIREDVARS_value": true,
        "KSP_Q_MAP01_value": true,
        "KSP_Q_MAP01_VALIDATION_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP01_value",
          "association": "refs",
          "refId": 100095
        },
        {
          "name": "KSP_Q_MAP01_VALIDATION_value",
          "association": "refs",
          "refId": 100101
        },
        {
          "name": "KSP_Q_MAP01_WARNING_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP01_INFO_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP01_VALIDATION_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP01_HINT_required",
          "association": "deps"
        },
        {
          "name": "KSP_Situation_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP01_PARAGRAAF09_required",
          "association": "deps"
        }
      ],
      "deps": {
        "KSP_Q_MAP01_WARNING_required": true,
        "KSP_Q_MAP01_INFO_required": true,
        "KSP_Q_MAP01_VALIDATION_required": true,
        "KSP_Q_MAP01_HINT_required": true,
        "KSP_Situation_required": true,
        "KSP_Q_MAP01_PARAGRAAF09_required": true
      },
      "original": "Count(X,SelectDescendants(Q_MAP01,Q_MAP01_HULPVARIABELEN),InputRequired(X))",
      "index": 100169,
      "name": "KSP_Q_MAP01_REQUIREDVARS_value",
      "parsed": "Count([false,false,false,false,false,false])",
      "id": 100169,
      "fflname": "Q_MAP01_REQUIREDVARS_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_REQUIREDVARS_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Aantal verplichte velden (1)'",
      "index": 100170,
      "name": "KSP_Q_MAP01_REQUIREDVARS_title",
      "parsed": "'Aantal verplichte velden (1)'",
      "id": 100170,
      "fflname": "Q_MAP01_REQUIREDVARS_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_ENTEREDREQUIREDVARS_value": true,
        "KSP_Q_MAP01_value": true,
        "KSP_Q_MAP01_VALIDATION_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP01_value",
          "association": "refs",
          "refId": 100095
        },
        {
          "name": "KSP_Q_MAP01_VALIDATION_value",
          "association": "refs",
          "refId": 100101
        },
        {
          "name": "KSP_Q_MAP01_WARNING_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP01_WARNING_value",
          "association": "deps",
          "refId": 100097
        },
        {
          "name": "KSP_Q_MAP01_INFO_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP01_INFO_value",
          "association": "deps",
          "refId": 100099
        },
        {
          "name": "KSP_Q_MAP01_VALIDATION_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP01_VALIDATION_value",
          "association": "deps",
          "refId": 100101
        },
        {
          "name": "KSP_Q_MAP01_HINT_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP01_HINT_value",
          "association": "deps",
          "refId": 100103
        },
        {
          "name": "KSP_Situation_required",
          "association": "deps"
        },
        {
          "name": "KSP_Situation_value",
          "association": "deps",
          "refId": 100106
        },
        {
          "name": "KSP_Q_MAP01_PARAGRAAF09_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP01_PARAGRAAF09_value",
          "association": "deps",
          "refId": 100150
        }
      ],
      "deps": {
        "KSP_Q_MAP01_WARNING_required": true,
        "KSP_Q_MAP01_WARNING_value": true,
        "KSP_Q_MAP01_INFO_required": true,
        "KSP_Q_MAP01_INFO_value": true,
        "KSP_Q_MAP01_VALIDATION_required": true,
        "KSP_Q_MAP01_VALIDATION_value": true,
        "KSP_Q_MAP01_HINT_required": true,
        "KSP_Q_MAP01_HINT_value": true,
        "KSP_Situation_required": true,
        "KSP_Situation_value": true,
        "KSP_Q_MAP01_PARAGRAAF09_required": true,
        "KSP_Q_MAP01_PARAGRAAF09_value": true
      },
      "original": "Count(X,SelectDescendants(Q_MAP01,Q_MAP01_HULPVARIABELEN),InputRequired(X)&&DataAvailable(X))",
      "index": 100171,
      "name": "KSP_Q_MAP01_ENTEREDREQUIREDVARS_value",
      "parsed": "Count([false&&v[100097][x.hash + y.hash + z]!==undefined,false&&v[100099][x.hash + y.hash + z]!==undefined,false&&v[100101][x.hash + y.hash + z]!==undefined,false&&v[100103][x.hash + y.hash + z]!==undefined,false&&v[100106][x.hash + y.hash + z]!==undefined,false&&v[100150][x.hash + y.hash + z]!==undefined])",
      "id": 100171,
      "fflname": "Q_MAP01_ENTEREDREQUIREDVARS_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP01_ENTEREDREQUIREDVARS_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Aantal ingevulde verplichte velden (1)'",
      "index": 100172,
      "name": "KSP_Q_MAP01_ENTEREDREQUIREDVARS_title",
      "parsed": "'Aantal ingevulde verplichte velden (1)'",
      "id": 100172,
      "fflname": "Q_MAP01_ENTEREDREQUIREDVARS_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_DEBUG_value": true,
        "KSP_Q_MAP01_PARAGRAAF09_visible": true,
        "KSP_Q_MAP02_visible": true,
        "KSP_Q_MAP06_PARAGRAAF09_visible": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP01_PARAGRAAF09_visible",
          "association": "refs",
          "refId": 100152
        },
        {
          "name": "KSP_Memo1_value",
          "association": "deps",
          "refId": 100148
        },
        {
          "name": "KSP_Q_MAP02_visible",
          "association": "refs",
          "refId": 100177
        },
        {
          "name": "KSP_Q_MAP06_PARAGRAAF09_visible",
          "association": "refs",
          "refId": 100376
        }
      ],
      "deps": {
        "KSP_Memo1_value": true
      },
      "original": "If(Pos('Negro',Memo1[doc])>0,1,0)",
      "index": 100173,
      "name": "KSP_DEBUG_value",
      "parsed": "Pos('Negro',a100148('100148',x.doc,y.base,z,v))>0?1:0",
      "id": 100173,
      "fflname": "DEBUG_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_DEBUG_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Debug'",
      "index": 100174,
      "name": "KSP_DEBUG_title",
      "parsed": "'Debug'",
      "id": 100174,
      "fflname": "DEBUG_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_value": true,
        "KSP_Q_MAP02_INFO_value": true,
        "KSP_Q_MAP02_STATUS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value",
          "association": "deps",
          "refId": 100295
        },
        {
          "name": "KSP_Q_MAP02_REQUIREDVARS_value",
          "association": "deps",
          "refId": 100293
        },
        {
          "name": "KSP_Q_MAP02_INFO_value",
          "association": "refs",
          "refId": 100180
        },
        {
          "name": "KSP_Q_MAP02_STATUS_value",
          "association": "refs",
          "refId": 100279
        }
      ],
      "deps": {
        "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value": true,
        "KSP_Q_MAP02_REQUIREDVARS_value": true
      },
      "original": "Q_MAP02_ENTEREDREQUIREDVARS==Q_MAP02_REQUIREDVARS",
      "index": 100175,
      "name": "KSP_Q_MAP02_value",
      "parsed": "a100295('100295',x,y.base,z,v)==a100293('100293',x,y.base,z,v)",
      "id": 100175,
      "fflname": "Q_MAP02_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Calculations Care'",
      "index": 100176,
      "name": "KSP_Q_MAP02_title",
      "parsed": "'Calculations Care'",
      "id": 100176,
      "fflname": "Q_MAP02_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_Q_MAP02_visible": true,
        "KSP_Q_MAP02_HULPVARIABELEN_visible": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_ROOT_visible",
          "association": "deps"
        },
        {
          "name": "KSP_DEBUG_value",
          "association": "deps",
          "refId": 100173
        },
        {
          "name": "KSP_Q_MAP02_HULPVARIABELEN_visible",
          "association": "refs",
          "refId": 100292
        }
      ],
      "deps": {
        "KSP_Q_ROOT_visible": true,
        "KSP_DEBUG_value": true
      },
      "original": "Q_ROOT.visible&&DEBUG==1",
      "index": 100177,
      "name": "KSP_Q_MAP02_visible",
      "parsed": "true&&a100173('100173',x,y.base,z,v)==1",
      "id": 100177,
      "fflname": "Q_MAP02_visible"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_WARNING_value": true,
        "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_RESTRICTIES_value",
          "association": "deps",
          "refId": 100443
        },
        {
          "name": "KSP_Q_WARNING_GLOBAL_value",
          "association": "deps",
          "refId": 100437
        },
        {
          "name": "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100295
        }
      ],
      "deps": {
        "KSP_Q_RESTRICTIES_value": true,
        "KSP_Q_WARNING_GLOBAL_value": true
      },
      "original": "String(Q_RESTRICTIES[doc]+Q_WARNING_GLOBAL[doc])",
      "index": 100178,
      "name": "KSP_Q_MAP02_WARNING_value",
      "parsed": "String(a100443('100443',x.doc,y.base,z,v)+a100437('100437',x.doc,y.base,z,v))",
      "id": 100178,
      "fflname": "Q_MAP02_WARNING_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_WARNING_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Warning voor map 2'",
      "index": 100179,
      "name": "KSP_Q_MAP02_WARNING_title",
      "parsed": "'Warning voor map 2'",
      "id": 100179,
      "fflname": "Q_MAP02_WARNING_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_INFO_value": true,
        "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP02_value",
          "association": "deps",
          "refId": 100175
        },
        {
          "name": "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100295
        }
      ],
      "deps": {
        "KSP_Q_MAP02_value": true
      },
      "original": "String(If(Q_MAP02[doc]==0,'Nog niet alle verplichte vragen zijn ingevuld.',''))",
      "index": 100180,
      "name": "KSP_Q_MAP02_INFO_value",
      "parsed": "String(a100175('100175',x.doc,y.base,z,v)==0?'Nog niet alle verplichte vragen zijn ingevuld.':'')",
      "id": 100180,
      "fflname": "Q_MAP02_INFO_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_INFO_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Info bij stap 2'",
      "index": 100181,
      "name": "KSP_Q_MAP02_INFO_title",
      "parsed": "'Info bij stap 2'",
      "id": 100181,
      "fflname": "Q_MAP02_INFO_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_VALIDATION_value": true,
        "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100295
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100182,
      "name": "KSP_Q_MAP02_VALIDATION_value",
      "parsed": "undefined",
      "id": 100182,
      "fflname": "Q_MAP02_VALIDATION_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_VALIDATION_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Validatie stap 2'",
      "index": 100183,
      "name": "KSP_Q_MAP02_VALIDATION_title",
      "parsed": "'Validatie stap 2'",
      "id": 100183,
      "fflname": "Q_MAP02_VALIDATION_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_HINT_value": true,
        "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100295
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100184,
      "name": "KSP_Q_MAP02_HINT_value",
      "parsed": "undefined",
      "id": 100184,
      "fflname": "Q_MAP02_HINT_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_HINT_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Hinttekst stap 2'",
      "index": 100185,
      "name": "KSP_Q_MAP02_HINT_title",
      "parsed": "'Hinttekst stap 2'",
      "id": 100185,
      "fflname": "Q_MAP02_HINT_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_Q_MAP02_HINT_hint": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Dit is de hinttekst van de variable Q_MAP02_HINT (DEZE REGEL WORDT NIET GEBRUIKT!)'",
      "index": 100186,
      "name": "KSP_Q_MAP02_HINT_hint",
      "parsed": "'Dit is de hinttekst van de variable Q_MAP02_HINT (DEZE REGEL WORDT NIET GEBRUIKT!)'",
      "id": 100186,
      "fflname": "Q_MAP02_HINT_hint"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FiscalParameters_value": true,
        "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100295
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100187,
      "name": "KSP_FiscalParameters_value",
      "parsed": "undefined",
      "id": 100187,
      "fflname": "FiscalParameters_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FiscalParameters_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Fiscal parameters'",
      "index": 100188,
      "name": "KSP_FiscalParameters_title",
      "parsed": "'Fiscal parameters'",
      "id": 100188,
      "fflname": "FiscalParameters_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildcareContribution_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100189,
      "name": "KSP_ChildcareContribution_value",
      "parsed": "undefined",
      "id": 100189,
      "fflname": "ChildcareContribution_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildcareContribution_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Childcare Contribution'",
      "index": 100190,
      "name": "KSP_ChildcareContribution_title",
      "parsed": "'Childcare Contribution'",
      "id": 100190,
      "fflname": "ChildcareContribution_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaximumNrOfHoursOfChildcareAllowancePerMonth_value": true,
        "KSP_MaxNrCompensatedHoursChildcare_value": true,
        "KSP_MaxNrCompensatedHoursOutofSchoolCare_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_MaxNrCompensatedHoursChildcare_value",
          "association": "refs",
          "refId": 100229
        },
        {
          "name": "KSP_MaxNrCompensatedHoursOutofSchoolCare_value",
          "association": "refs",
          "refId": 100231
        }
      ],
      "deps": {},
      "original": "230",
      "index": 100191,
      "name": "KSP_MaximumNrOfHoursOfChildcareAllowancePerMonth_value",
      "parsed": "230",
      "id": 100191,
      "fflname": "MaximumNrOfHoursOfChildcareAllowancePerMonth_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaximumNrOfHoursOfChildcareAllowancePerMonth_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Maximum nr of hours of childcare allowance per month'",
      "index": 100192,
      "name": "KSP_MaximumNrOfHoursOfChildcareAllowancePerMonth_title",
      "parsed": "'Maximum nr of hours of childcare allowance per month'",
      "id": 100192,
      "fflname": "MaximumNrOfHoursOfChildcareAllowancePerMonth_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MultiplierDaycare_value": true,
        "KSP_MaxNrCompensatedHoursChildcare_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_MaxNrCompensatedHoursChildcare_value",
          "association": "refs",
          "refId": 100229
        }
      ],
      "deps": {},
      "original": "1.4",
      "index": 100193,
      "name": "KSP_MultiplierDaycare_value",
      "parsed": "1.4",
      "id": 100193,
      "fflname": "MultiplierDaycare_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MultiplierDaycare_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Multiplier daycare'",
      "index": 100194,
      "name": "KSP_MultiplierDaycare_title",
      "parsed": "'Multiplier daycare'",
      "id": 100194,
      "fflname": "MultiplierDaycare_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MultiplierOutOfSchoolCare_value": true,
        "KSP_MaxNrCompensatedHoursOutofSchoolCare_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_MaxNrCompensatedHoursOutofSchoolCare_value",
          "association": "refs",
          "refId": 100231
        }
      ],
      "deps": {},
      "original": ".7",
      "index": 100195,
      "name": "KSP_MultiplierOutOfSchoolCare_value",
      "parsed": ".7",
      "id": 100195,
      "fflname": "MultiplierOutOfSchoolCare_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MultiplierOutOfSchoolCare_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Multiplier out-of-school care'",
      "index": 100196,
      "name": "KSP_MultiplierOutOfSchoolCare_title",
      "parsed": "'Multiplier out-of-school care'",
      "id": 100196,
      "fflname": "MultiplierOutOfSchoolCare_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxHourlyRateChildcare_value": true,
        "KSP_MaxCompensatedAmountChildcare_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_MaxCompensatedAmountChildcare_value",
          "association": "refs",
          "refId": 100239
        }
      ],
      "deps": {},
      "original": "7.18",
      "index": 100197,
      "name": "KSP_MaxHourlyRateChildcare_value",
      "parsed": "7.18",
      "id": 100197,
      "fflname": "MaxHourlyRateChildcare_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxHourlyRateChildcare_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Max. hourly rate childcare'",
      "index": 100198,
      "name": "KSP_MaxHourlyRateChildcare_title",
      "parsed": "'Max. hourly rate childcare'",
      "id": 100198,
      "fflname": "MaxHourlyRateChildcare_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxHourlyRateOutOfSchoolCare_value": true,
        "KSP_MaxCompensatedAmountOutofSchoolCare_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_MaxCompensatedAmountOutofSchoolCare_value",
          "association": "refs",
          "refId": 100241
        }
      ],
      "deps": {},
      "original": "6.69",
      "index": 100199,
      "name": "KSP_MaxHourlyRateOutOfSchoolCare_value",
      "parsed": "6.69",
      "id": 100199,
      "fflname": "MaxHourlyRateOutOfSchoolCare_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxHourlyRateOutOfSchoolCare_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Max. hourly rate out-of-school care'",
      "index": 100200,
      "name": "KSP_MaxHourlyRateOutOfSchoolCare_title",
      "parsed": "'Max. hourly rate out-of-school care'",
      "id": 100200,
      "fflname": "MaxHourlyRateOutOfSchoolCare_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxHourlyRateGuestParent_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "5.75",
      "index": 100201,
      "name": "KSP_MaxHourlyRateGuestParent_value",
      "parsed": "5.75",
      "id": 100201,
      "fflname": "MaxHourlyRateGuestParent_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxHourlyRateGuestParent_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Max. hourly rate guest parent'",
      "index": 100202,
      "name": "KSP_MaxHourlyRateGuestParent_title",
      "parsed": "'Max. hourly rate guest parent'",
      "id": 100202,
      "fflname": "MaxHourlyRateGuestParent_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxHourlyRateGuestParentOutOfSchoolCare_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "5.75",
      "index": 100203,
      "name": "KSP_MaxHourlyRateGuestParentOutOfSchoolCare_value",
      "parsed": "5.75",
      "id": 100203,
      "fflname": "MaxHourlyRateGuestParentOutOfSchoolCare_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxHourlyRateGuestParentOutOfSchoolCare_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Max. hourly rate guest parent out-of-school care'",
      "index": 100204,
      "name": "KSP_MaxHourlyRateGuestParentOutOfSchoolCare_title",
      "parsed": "'Max. hourly rate guest parent out-of-school care'",
      "id": 100204,
      "fflname": "MaxHourlyRateGuestParentOutOfSchoolCare_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CombinationDiscount_value": true,
        "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100295
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100205,
      "name": "KSP_CombinationDiscount_value",
      "parsed": "undefined",
      "id": 100205,
      "fflname": "CombinationDiscount_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CombinationDiscount_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Combination Discount'",
      "index": 100206,
      "name": "KSP_CombinationDiscount_title",
      "parsed": "'Combination Discount'",
      "id": 100206,
      "fflname": "CombinationDiscount_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_LowerBoundaryIncome_value": true,
        "KSP_CombinationDiscountTotal_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_CombinationDiscountTotal_value",
          "association": "refs",
          "refId": 100275
        }
      ],
      "deps": {},
      "original": "4895",
      "index": 100207,
      "name": "KSP_LowerBoundaryIncome_value",
      "parsed": "4895",
      "id": 100207,
      "fflname": "LowerBoundaryIncome_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_LowerBoundaryIncome_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Lower boundary Income'",
      "index": 100208,
      "name": "KSP_LowerBoundaryIncome_title",
      "parsed": "'Lower boundary Income'",
      "id": 100208,
      "fflname": "LowerBoundaryIncome_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Base_value": true,
        "KSP_CombinationDiscountTotal_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_CombinationDiscountTotal_value",
          "association": "refs",
          "refId": 100275
        }
      ],
      "deps": {},
      "original": "1043",
      "index": 100209,
      "name": "KSP_Base_value",
      "parsed": "1043",
      "id": 100209,
      "fflname": "Base_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Base_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Base'",
      "index": 100210,
      "name": "KSP_Base_title",
      "parsed": "'Base'",
      "id": 100210,
      "fflname": "Base_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CombinationDiscountPercentage_value": true,
        "KSP_CombinationDiscountTotal_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_CombinationDiscountTotal_value",
          "association": "refs",
          "refId": 100275
        }
      ],
      "deps": {},
      "original": ".06159",
      "index": 100211,
      "name": "KSP_CombinationDiscountPercentage_value",
      "parsed": ".06159",
      "id": 100211,
      "fflname": "CombinationDiscountPercentage_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CombinationDiscountPercentage_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Combination Discount Percentage'",
      "index": 100212,
      "name": "KSP_CombinationDiscountPercentage_title",
      "parsed": "'Combination Discount Percentage'",
      "id": 100212,
      "fflname": "CombinationDiscountPercentage_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaximumDiscount_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "2778",
      "index": 100213,
      "name": "KSP_MaximumDiscount_value",
      "parsed": "2778",
      "id": 100213,
      "fflname": "MaximumDiscount_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaximumDiscount_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Maximum Discount'",
      "index": 100214,
      "name": "KSP_MaximumDiscount_title",
      "parsed": "'Maximum Discount'",
      "id": 100214,
      "fflname": "MaximumDiscount_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildRelatedBudget_value": true,
        "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100295
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100215,
      "name": "KSP_ChildRelatedBudget_value",
      "parsed": "undefined",
      "id": 100215,
      "fflname": "ChildRelatedBudget_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildRelatedBudget_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Child-related budget'",
      "index": 100216,
      "name": "KSP_ChildRelatedBudget_title",
      "parsed": "'Child-related budget'",
      "id": 100216,
      "fflname": "ChildRelatedBudget_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxBudgetOneToTwelveYears_value": true,
        "KSP_ChildRelatedBudgetUpToTwelve_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_ChildRelatedBudgetUpToTwelve_value",
          "association": "refs",
          "refId": 100265
        }
      ],
      "deps": {},
      "original": "1142",
      "index": 100217,
      "name": "KSP_MaxBudgetOneToTwelveYears_value",
      "parsed": "1142",
      "id": 100217,
      "fflname": "MaxBudgetOneToTwelveYears_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxBudgetOneToTwelveYears_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Max Budget (1 - 12 yrs)'",
      "index": 100218,
      "name": "KSP_MaxBudgetOneToTwelveYears_title",
      "parsed": "'Max Budget (1 - 12 yrs)'",
      "id": 100218,
      "fflname": "MaxBudgetOneToTwelveYears_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxBudgetTwelveToFifteenYears_value": true,
        "KSP_ChildRelatedBudgetTwelveUpToAndInclFifteen_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_ChildRelatedBudgetTwelveUpToAndInclFifteen_value",
          "association": "refs",
          "refId": 100267
        }
      ],
      "deps": {},
      "original": "1376",
      "index": 100219,
      "name": "KSP_MaxBudgetTwelveToFifteenYears_value",
      "parsed": "1376",
      "id": 100219,
      "fflname": "MaxBudgetTwelveToFifteenYears_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxBudgetTwelveToFifteenYears_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Max Budget (12 - 15 yrs)'",
      "index": 100220,
      "name": "KSP_MaxBudgetTwelveToFifteenYears_title",
      "parsed": "'Max Budget (12 - 15 yrs)'",
      "id": 100220,
      "fflname": "MaxBudgetTwelveToFifteenYears_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxBudgetSixteenToSeventeenYears_value": true,
        "KSP_ChildRelatedBudgetSixteenUpToAndIncSeventeen_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_ChildRelatedBudgetSixteenUpToAndIncSeventeen_value",
          "association": "refs",
          "refId": 100269
        }
      ],
      "deps": {},
      "original": "1559",
      "index": 100221,
      "name": "KSP_MaxBudgetSixteenToSeventeenYears_value",
      "parsed": "1559",
      "id": 100221,
      "fflname": "MaxBudgetSixteenToSeventeenYears_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxBudgetSixteenToSeventeenYears_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Max Budget (16 - 17 yrs)'",
      "index": 100222,
      "name": "KSP_MaxBudgetSixteenToSeventeenYears_title",
      "parsed": "'Max Budget (16 - 17 yrs)'",
      "id": 100222,
      "fflname": "MaxBudgetSixteenToSeventeenYears_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_UpperBoundaryIncome_value": true,
        "KSP_ChildRelatedBudgetDecrease_value": true,
        "KSP_CombinationDiscountTotal_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_ChildRelatedBudgetDecrease_value",
          "association": "refs",
          "refId": 100263
        },
        {
          "name": "KSP_CombinationDiscountTotal_value",
          "association": "refs",
          "refId": 100275
        }
      ],
      "deps": {},
      "original": "20109",
      "index": 100223,
      "name": "KSP_UpperBoundaryIncome_value",
      "parsed": "20109",
      "id": 100223,
      "fflname": "UpperBoundaryIncome_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_UpperBoundaryIncome_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Upper boundary Income'",
      "index": 100224,
      "name": "KSP_UpperBoundaryIncome_title",
      "parsed": "'Upper boundary Income'",
      "id": 100224,
      "fflname": "UpperBoundaryIncome_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_DecreasingPercentage_value": true,
        "KSP_ChildRelatedBudgetDecrease_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_ChildRelatedBudgetDecrease_value",
          "association": "refs",
          "refId": 100263
        }
      ],
      "deps": {},
      "original": ".0675",
      "index": 100225,
      "name": "KSP_DecreasingPercentage_value",
      "parsed": ".0675",
      "id": 100225,
      "fflname": "DecreasingPercentage_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_DecreasingPercentage_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Decreasing Percentage'",
      "index": 100226,
      "name": "KSP_DecreasingPercentage_title",
      "parsed": "'Decreasing Percentage'",
      "id": 100226,
      "fflname": "DecreasingPercentage_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Fees_value": true,
        "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100295
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100227,
      "name": "KSP_Fees_value",
      "parsed": "undefined",
      "id": 100227,
      "fflname": "Fees_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Fees_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Fees'",
      "index": 100228,
      "name": "KSP_Fees_title",
      "parsed": "'Fees'",
      "id": 100228,
      "fflname": "Fees_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxNrCompensatedHoursChildcare_value": true,
        "KSP_NrCompensatedHoursChildcare_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_WorkingHoursWeeklyOfLeastWorkingParent_value",
          "association": "deps",
          "refId": 100118
        },
        {
          "name": "KSP_MultiplierDaycare_value",
          "association": "deps",
          "refId": 100193
        },
        {
          "name": "KSP_MaximumNrOfHoursOfChildcareAllowancePerMonth_value",
          "association": "deps",
          "refId": 100191
        },
        {
          "name": "KSP_NrCompensatedHoursChildcare_value",
          "association": "refs",
          "refId": 100234
        }
      ],
      "deps": {
        "KSP_WorkingHoursWeeklyOfLeastWorkingParent_value": true,
        "KSP_MultiplierDaycare_value": true,
        "KSP_MaximumNrOfHoursOfChildcareAllowancePerMonth_value": true
      },
      "original": "OnER(Min(Round(WorkingHoursWeeklyOfLeastWorkingParent*MultiplierDaycare*(52/12),0),MaximumNrOfHoursOfChildcareAllowancePerMonth),NA)",
      "index": 100229,
      "name": "KSP_MaxNrCompensatedHoursChildcare_value",
      "parsed": "OnER(Math.min(Round(a100118('100118',x,y.base,z,v)*a100193('100193',x,y.base,z,v)*(52/12),0),a100191('100191',x,y.base,z,v)),NA)",
      "id": 100229,
      "fflname": "MaxNrCompensatedHoursChildcare_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxNrCompensatedHoursChildcare_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Max. nr of compensated hours childcare '",
      "index": 100230,
      "name": "KSP_MaxNrCompensatedHoursChildcare_title",
      "parsed": "'Max. nr of compensated hours childcare '",
      "id": 100230,
      "fflname": "MaxNrCompensatedHoursChildcare_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxNrCompensatedHoursOutofSchoolCare_value": true,
        "KSP_NrCompensatedHoursOutofSchoolCare_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_WorkingHoursWeeklyOfLeastWorkingParent_value",
          "association": "deps",
          "refId": 100118
        },
        {
          "name": "KSP_MultiplierOutOfSchoolCare_value",
          "association": "deps",
          "refId": 100195
        },
        {
          "name": "KSP_MaximumNrOfHoursOfChildcareAllowancePerMonth_value",
          "association": "deps",
          "refId": 100191
        },
        {
          "name": "KSP_NrCompensatedHoursOutofSchoolCare_value",
          "association": "refs",
          "refId": 100236
        }
      ],
      "deps": {
        "KSP_WorkingHoursWeeklyOfLeastWorkingParent_value": true,
        "KSP_MultiplierOutOfSchoolCare_value": true,
        "KSP_MaximumNrOfHoursOfChildcareAllowancePerMonth_value": true
      },
      "original": "OnER(Min(Round(WorkingHoursWeeklyOfLeastWorkingParent*MultiplierOutOfSchoolCare*(52/12),0),MaximumNrOfHoursOfChildcareAllowancePerMonth),NA)",
      "index": 100231,
      "name": "KSP_MaxNrCompensatedHoursOutofSchoolCare_value",
      "parsed": "OnER(Math.min(Round(a100118('100118',x,y.base,z,v)*a100195('100195',x,y.base,z,v)*(52/12),0),a100191('100191',x,y.base,z,v)),NA)",
      "id": 100231,
      "fflname": "MaxNrCompensatedHoursOutofSchoolCare_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxNrCompensatedHoursOutofSchoolCare_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Max. nr of compensated hours out-of-school care '",
      "index": 100232,
      "name": "KSP_MaxNrCompensatedHoursOutofSchoolCare_title",
      "parsed": "'Max. nr of compensated hours out-of-school care '",
      "id": 100232,
      "fflname": "MaxNrCompensatedHoursOutofSchoolCare_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FeesSub3_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100233,
      "name": "KSP_FeesSub3_value",
      "parsed": "undefined",
      "id": 100233,
      "fflname": "FeesSub3_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_NrCompensatedHoursChildcare_value": true,
        "KSP_PremiumForChildcare_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_NrOfDaysChildcareMonth_value",
          "association": "deps",
          "refId": 100128
        },
        {
          "name": "KSP_MaxNrCompensatedHoursChildcare_value",
          "association": "deps",
          "refId": 100229
        },
        {
          "name": "KSP_PremiumForChildcare_value",
          "association": "refs",
          "refId": 100249
        }
      ],
      "deps": {
        "KSP_NrOfDaysChildcareMonth_value": true,
        "KSP_MaxNrCompensatedHoursChildcare_value": true
      },
      "original": "OnER(Min(NrOfDaysChildcareMonth,MaxNrCompensatedHoursChildcare),NA)",
      "index": 100234,
      "name": "KSP_NrCompensatedHoursChildcare_value",
      "parsed": "OnER(Math.min(a100128('100128',x,y,z,v),a100229('100229',x,y.base,z,v)),NA)",
      "id": 100234,
      "fflname": "NrCompensatedHoursChildcare_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_NrCompensatedHoursChildcare_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Nr. of compensated hours childcare '",
      "index": 100235,
      "name": "KSP_NrCompensatedHoursChildcare_title",
      "parsed": "'Nr. of compensated hours childcare '",
      "id": 100235,
      "fflname": "NrCompensatedHoursChildcare_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_NrCompensatedHoursOutofSchoolCare_value": true,
        "KSP_PremiumForOutofSchoolCare_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_NrOfDaysOutOfSchoolCareMonth_value",
          "association": "deps",
          "refId": 100132
        },
        {
          "name": "KSP_MaxNrCompensatedHoursOutofSchoolCare_value",
          "association": "deps",
          "refId": 100231
        },
        {
          "name": "KSP_PremiumForOutofSchoolCare_value",
          "association": "refs",
          "refId": 100251
        }
      ],
      "deps": {
        "KSP_NrOfDaysOutOfSchoolCareMonth_value": true,
        "KSP_MaxNrCompensatedHoursOutofSchoolCare_value": true
      },
      "original": "OnER(Min(NrOfDaysOutOfSchoolCareMonth,MaxNrCompensatedHoursOutofSchoolCare),NA)",
      "index": 100236,
      "name": "KSP_NrCompensatedHoursOutofSchoolCare_value",
      "parsed": "OnER(Math.min(a100132('100132',x,y,z,v),a100231('100231',x,y.base,z,v)),NA)",
      "id": 100236,
      "fflname": "NrCompensatedHoursOutofSchoolCare_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_NrCompensatedHoursOutofSchoolCare_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Nr. of compensated hours out-of-school care '",
      "index": 100237,
      "name": "KSP_NrCompensatedHoursOutofSchoolCare_title",
      "parsed": "'Nr. of compensated hours out-of-school care '",
      "id": 100237,
      "fflname": "NrCompensatedHoursOutofSchoolCare_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FeesSub6_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100238,
      "name": "KSP_FeesSub6_value",
      "parsed": "undefined",
      "id": 100238,
      "fflname": "FeesSub6_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxCompensatedAmountChildcare_value": true,
        "KSP_PremiumForChildcare_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_HourlyFeeChildCare_value",
          "association": "deps",
          "refId": 100134
        },
        {
          "name": "KSP_MaxHourlyRateChildcare_value",
          "association": "deps",
          "refId": 100197
        },
        {
          "name": "KSP_PremiumForChildcare_value",
          "association": "refs",
          "refId": 100249
        }
      ],
      "deps": {
        "KSP_HourlyFeeChildCare_value": true,
        "KSP_MaxHourlyRateChildcare_value": true
      },
      "original": "OnER(Min(HourlyFeeChildCare,MaxHourlyRateChildcare),NA)",
      "index": 100239,
      "name": "KSP_MaxCompensatedAmountChildcare_value",
      "parsed": "OnER(Math.min(a100134('100134',x,y,z,v),a100197('100197',x,y.base,z,v)),NA)",
      "id": 100239,
      "fflname": "MaxCompensatedAmountChildcare_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxCompensatedAmountChildcare_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Max. compensated amount childcare'",
      "index": 100240,
      "name": "KSP_MaxCompensatedAmountChildcare_title",
      "parsed": "'Max. compensated amount childcare'",
      "id": 100240,
      "fflname": "MaxCompensatedAmountChildcare_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxCompensatedAmountOutofSchoolCare_value": true,
        "KSP_PremiumForOutofSchoolCare_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_HourlyFeeOutOfSchoolCare_value",
          "association": "deps",
          "refId": 100136
        },
        {
          "name": "KSP_MaxHourlyRateOutOfSchoolCare_value",
          "association": "deps",
          "refId": 100199
        },
        {
          "name": "KSP_PremiumForOutofSchoolCare_value",
          "association": "refs",
          "refId": 100251
        }
      ],
      "deps": {
        "KSP_HourlyFeeOutOfSchoolCare_value": true,
        "KSP_MaxHourlyRateOutOfSchoolCare_value": true
      },
      "original": "OnER(Min(HourlyFeeOutOfSchoolCare,MaxHourlyRateOutOfSchoolCare),NA)",
      "index": 100241,
      "name": "KSP_MaxCompensatedAmountOutofSchoolCare_value",
      "parsed": "OnER(Math.min(a100136('100136',x,y,z,v),a100199('100199',x,y.base,z,v)),NA)",
      "id": 100241,
      "fflname": "MaxCompensatedAmountOutofSchoolCare_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MaxCompensatedAmountOutofSchoolCare_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Max. compensated amount out-of-school care '",
      "index": 100242,
      "name": "KSP_MaxCompensatedAmountOutofSchoolCare_title",
      "parsed": "'Max. compensated amount out-of-school care '",
      "id": 100242,
      "fflname": "MaxCompensatedAmountOutofSchoolCare_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FeesSub9_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100243,
      "name": "KSP_FeesSub9_value",
      "parsed": "undefined",
      "id": 100243,
      "fflname": "FeesSub9_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_TotalIncome_value": true,
        "KSP_PercentagePremiumFirstChild_value": true,
        "KSP_ChildRelatedBudgetDecrease_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_IncomeParent01_value",
          "association": "deps",
          "refId": 100110
        },
        {
          "name": "KSP_IncomeParent02_value",
          "association": "deps",
          "refId": 100112
        },
        {
          "name": "KSP_PercentagePremiumFirstChild_value",
          "association": "refs",
          "refId": 100246
        },
        {
          "name": "KSP_ChildRelatedBudgetDecrease_value",
          "association": "refs",
          "refId": 100263
        }
      ],
      "deps": {
        "KSP_IncomeParent01_value": true,
        "KSP_IncomeParent02_value": true
      },
      "original": "OnER(IncomeParent01+IncomeParent02,NA)",
      "index": 100244,
      "name": "KSP_TotalIncome_value",
      "parsed": "OnER(a100110('100110',x,y.base,z,v)+a100112('100112',x,y.base,z,v),NA)",
      "id": 100244,
      "fflname": "TotalIncome_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_TotalIncome_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Total Income'",
      "index": 100245,
      "name": "KSP_TotalIncome_title",
      "parsed": "'Total Income'",
      "id": 100245,
      "fflname": "TotalIncome_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_PercentagePremiumFirstChild_value": true,
        "KSP_PremiumForChildcare_value": true,
        "KSP_PremiumForOutofSchoolCare_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalIncome_value",
          "association": "deps",
          "refId": 100244
        },
        {
          "name": "KSP_PremiumForChildcare_value",
          "association": "refs",
          "refId": 100249
        },
        {
          "name": "KSP_PremiumForOutofSchoolCare_value",
          "association": "refs",
          "refId": 100251
        }
      ],
      "deps": {
        "KSP_TotalIncome_value": true
      },
      "original": "MatrixLookup('ScorecardKSP.xls','Opvangtoeslaginkomenstabel',TotalIncome,1)",
      "index": 100246,
      "name": "KSP_PercentagePremiumFirstChild_value",
      "parsed": "MatrixLookup('ScorecardKSP.xls','Opvangtoeslaginkomenstabel',a100244('100244',x,y.base,z,v),1)",
      "id": 100246,
      "fflname": "PercentagePremiumFirstChild_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_PercentagePremiumFirstChild_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Percentage premium first child '",
      "index": 100247,
      "name": "KSP_PercentagePremiumFirstChild_title",
      "parsed": "'Percentage premium first child '",
      "id": 100247,
      "fflname": "PercentagePremiumFirstChild_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_FeesSub12_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100248,
      "name": "KSP_FeesSub12_value",
      "parsed": "undefined",
      "id": 100248,
      "fflname": "FeesSub12_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_PremiumForChildcare_value": true,
        "KSP_ChildCarePremiumOverview_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_NrCompensatedHoursChildcare_value",
          "association": "deps",
          "refId": 100234
        },
        {
          "name": "KSP_MaxCompensatedAmountChildcare_value",
          "association": "deps",
          "refId": 100239
        },
        {
          "name": "KSP_PercentagePremiumFirstChild_value",
          "association": "deps",
          "refId": 100246
        },
        {
          "name": "KSP_ChildCarePremiumOverview_value",
          "association": "refs",
          "refId": 100360
        }
      ],
      "deps": {
        "KSP_NrCompensatedHoursChildcare_value": true,
        "KSP_MaxCompensatedAmountChildcare_value": true,
        "KSP_PercentagePremiumFirstChild_value": true
      },
      "original": "NrCompensatedHoursChildcare*MaxCompensatedAmountChildcare*PercentagePremiumFirstChild",
      "index": 100249,
      "name": "KSP_PremiumForChildcare_value",
      "parsed": "a100234('100234',x,y.base,z,v)*a100239('100239',x,y.base,z,v)*a100246('100246',x,y.base,z,v)",
      "id": 100249,
      "fflname": "PremiumForChildcare_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_PremiumForChildcare_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Premium for childcare'",
      "index": 100250,
      "name": "KSP_PremiumForChildcare_title",
      "parsed": "'Premium for childcare'",
      "id": 100250,
      "fflname": "PremiumForChildcare_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_PremiumForOutofSchoolCare_value": true,
        "KSP_ChildCarePremiumOverview_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_NrCompensatedHoursOutofSchoolCare_value",
          "association": "deps",
          "refId": 100236
        },
        {
          "name": "KSP_MaxCompensatedAmountOutofSchoolCare_value",
          "association": "deps",
          "refId": 100241
        },
        {
          "name": "KSP_PercentagePremiumFirstChild_value",
          "association": "deps",
          "refId": 100246
        },
        {
          "name": "KSP_ChildCarePremiumOverview_value",
          "association": "refs",
          "refId": 100360
        }
      ],
      "deps": {
        "KSP_NrCompensatedHoursOutofSchoolCare_value": true,
        "KSP_MaxCompensatedAmountOutofSchoolCare_value": true,
        "KSP_PercentagePremiumFirstChild_value": true
      },
      "original": "NrCompensatedHoursOutofSchoolCare*MaxCompensatedAmountOutofSchoolCare*PercentagePremiumFirstChild",
      "index": 100251,
      "name": "KSP_PremiumForOutofSchoolCare_value",
      "parsed": "a100236('100236',x,y.base,z,v)*a100241('100241',x,y.base,z,v)*a100246('100246',x,y.base,z,v)",
      "id": 100251,
      "fflname": "PremiumForOutofSchoolCare_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_PremiumForOutofSchoolCare_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Premium for out-of-school care'",
      "index": 100252,
      "name": "KSP_PremiumForOutofSchoolCare_title",
      "parsed": "'Premium for out-of-school care'",
      "id": 100252,
      "fflname": "PremiumForOutofSchoolCare_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CostsSecondaryEducation_value": true,
        "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100295
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100253,
      "name": "KSP_CostsSecondaryEducation_value",
      "parsed": "undefined",
      "id": 100253,
      "fflname": "CostsSecondaryEducation_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CostsSecondaryEducation_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Costs (Secondary Education)'",
      "index": 100254,
      "name": "KSP_CostsSecondaryEducation_title",
      "parsed": "'Costs (Secondary Education)'",
      "id": 100254,
      "fflname": "CostsSecondaryEducation_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CostsYearOneFour_value": true,
        "KSP_CostsForSecondaryEducation_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_SecondaryEducationProfile_value",
          "association": "deps",
          "refId": 100142
        },
        {
          "name": "KSP_CostsForSecondaryEducation_value",
          "association": "refs",
          "refId": 100349
        }
      ],
      "deps": {
        "KSP_SecondaryEducationProfile_value": true
      },
      "original": "Case(SecondaryEducationProfile,[0,576||1,906||2,535||3,535])",
      "index": 100255,
      "name": "KSP_CostsYearOneFour_value",
      "parsed": "__c0s0=a100142('100142',x,y,z,v),__c0s0 === 0?576:__c0s0 === 1?906:__c0s0 === 2?535:__c0s0 === 3?535:NA",
      "id": 100255,
      "fflname": "CostsYearOneFour_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CostsYearOneFour_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Costs year 1 - 4'",
      "index": 100256,
      "name": "KSP_CostsYearOneFour_title",
      "parsed": "'Costs year 1 - 4'",
      "id": 100256,
      "fflname": "CostsYearOneFour_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CostsYearFiveSixSeven_value": true,
        "KSP_CostsForSecondaryEducation_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_SecondaryEducationProfile_value",
          "association": "deps",
          "refId": 100142
        },
        {
          "name": "KSP_CostsForSecondaryEducation_value",
          "association": "refs",
          "refId": 100349
        }
      ],
      "deps": {
        "KSP_SecondaryEducationProfile_value": true
      },
      "original": "Case(SecondaryEducationProfile,[0,576||1,906||2,535||3,535])",
      "index": 100257,
      "name": "KSP_CostsYearFiveSixSeven_value",
      "parsed": "__c0s1=a100142('100142',x,y,z,v),__c0s1 === 0?576:__c0s1 === 1?906:__c0s1 === 2?535:__c0s1 === 3?535:NA",
      "id": 100257,
      "fflname": "CostsYearFiveSixSeven_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CostsYearFiveSixSeven_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Costs year 5, 6, 7'",
      "index": 100258,
      "name": "KSP_CostsYearFiveSixSeven_title",
      "parsed": "'Costs year 5, 6, 7'",
      "id": 100258,
      "fflname": "CostsYearFiveSixSeven_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02SUB10_value": true,
        "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100295
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100259,
      "name": "KSP_Q_MAP02SUB10_value",
      "parsed": "undefined",
      "id": 100259,
      "fflname": "Q_MAP02SUB10_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02SUB10_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Budget'",
      "index": 100260,
      "name": "KSP_Q_MAP02SUB10_title",
      "parsed": "'Budget'",
      "id": 100260,
      "fflname": "Q_MAP02SUB10_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02SUB10SUB1_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100261,
      "name": "KSP_Q_MAP02SUB10SUB1_value",
      "parsed": "undefined",
      "id": 100261,
      "fflname": "Q_MAP02SUB10SUB1_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02SUB10SUB1_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Income'",
      "index": 100262,
      "name": "KSP_Q_MAP02SUB10SUB1_title",
      "parsed": "'Income'",
      "id": 100262,
      "fflname": "Q_MAP02SUB10SUB1_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildRelatedBudgetDecrease_value": true,
        "KSP_ChildRelatedBudgetUpToTwelve_value": true,
        "KSP_ChildRelatedBudgetTwelveUpToAndInclFifteen_value": true,
        "KSP_ChildRelatedBudgetSixteenUpToAndIncSeventeen_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalIncome_value",
          "association": "deps",
          "refId": 100244
        },
        {
          "name": "KSP_UpperBoundaryIncome_value",
          "association": "deps",
          "refId": 100223
        },
        {
          "name": "KSP_DecreasingPercentage_value",
          "association": "deps",
          "refId": 100225
        },
        {
          "name": "KSP_ChildRelatedBudgetUpToTwelve_value",
          "association": "refs",
          "refId": 100265
        },
        {
          "name": "KSP_ChildRelatedBudgetTwelveUpToAndInclFifteen_value",
          "association": "refs",
          "refId": 100267
        },
        {
          "name": "KSP_ChildRelatedBudgetSixteenUpToAndIncSeventeen_value",
          "association": "refs",
          "refId": 100269
        }
      ],
      "deps": {
        "KSP_TotalIncome_value": true,
        "KSP_UpperBoundaryIncome_value": true,
        "KSP_DecreasingPercentage_value": true
      },
      "original": "Max(0,DecreasingPercentage*(TotalIncome-UpperBoundaryIncome))",
      "index": 100263,
      "name": "KSP_ChildRelatedBudgetDecrease_value",
      "parsed": "Math.max(0,a100225('100225',x,y.base,z,v)*(a100244('100244',x,y.base,z,v)-a100223('100223',x,y.base,z,v)))",
      "id": 100263,
      "fflname": "ChildRelatedBudgetDecrease_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildRelatedBudgetDecrease_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Decrease'",
      "index": 100264,
      "name": "KSP_ChildRelatedBudgetDecrease_title",
      "parsed": "'Decrease'",
      "id": 100264,
      "fflname": "ChildRelatedBudgetDecrease_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildRelatedBudgetUpToTwelve_value": true,
        "KSP_ChildcareBudgetOverview_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_MaxBudgetOneToTwelveYears_value",
          "association": "deps",
          "refId": 100217
        },
        {
          "name": "KSP_ChildRelatedBudgetDecrease_value",
          "association": "deps",
          "refId": 100263
        },
        {
          "name": "KSP_ChildcareBudgetOverview_value",
          "association": "refs",
          "refId": 100362
        }
      ],
      "deps": {
        "KSP_MaxBudgetOneToTwelveYears_value": true,
        "KSP_ChildRelatedBudgetDecrease_value": true
      },
      "original": "Max(0,MaxBudgetOneToTwelveYears-ChildRelatedBudgetDecrease)/12",
      "index": 100265,
      "name": "KSP_ChildRelatedBudgetUpToTwelve_value",
      "parsed": "Math.max(0,a100217('100217',x,y.base,z,v)-a100263('100263',x,y.base,z,v))/12",
      "id": 100265,
      "fflname": "ChildRelatedBudgetUpToTwelve_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildRelatedBudgetUpToTwelve_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Childrelated budget (per month, up to yr 12)'",
      "index": 100266,
      "name": "KSP_ChildRelatedBudgetUpToTwelve_title",
      "parsed": "'Childrelated budget (per month, up to yr 12)'",
      "id": 100266,
      "fflname": "ChildRelatedBudgetUpToTwelve_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildRelatedBudgetTwelveUpToAndInclFifteen_value": true,
        "KSP_ChildcareBudgetOverview_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_MaxBudgetTwelveToFifteenYears_value",
          "association": "deps",
          "refId": 100219
        },
        {
          "name": "KSP_ChildRelatedBudgetDecrease_value",
          "association": "deps",
          "refId": 100263
        },
        {
          "name": "KSP_ChildcareBudgetOverview_value",
          "association": "refs",
          "refId": 100362
        }
      ],
      "deps": {
        "KSP_MaxBudgetTwelveToFifteenYears_value": true,
        "KSP_ChildRelatedBudgetDecrease_value": true
      },
      "original": "Max(0,MaxBudgetTwelveToFifteenYears-ChildRelatedBudgetDecrease)/12",
      "index": 100267,
      "name": "KSP_ChildRelatedBudgetTwelveUpToAndInclFifteen_value",
      "parsed": "Math.max(0,a100219('100219',x,y.base,z,v)-a100263('100263',x,y.base,z,v))/12",
      "id": 100267,
      "fflname": "ChildRelatedBudgetTwelveUpToAndInclFifteen_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildRelatedBudgetTwelveUpToAndInclFifteen_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Childrelated budget (per month, 12 up to&&incl yr 15)'",
      "index": 100268,
      "name": "KSP_ChildRelatedBudgetTwelveUpToAndInclFifteen_title",
      "parsed": "'Childrelated budget (per month, 12 up to&&incl yr 15)'",
      "id": 100268,
      "fflname": "ChildRelatedBudgetTwelveUpToAndInclFifteen_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildRelatedBudgetSixteenUpToAndIncSeventeen_value": true,
        "KSP_ChildcareBudgetOverview_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_MaxBudgetSixteenToSeventeenYears_value",
          "association": "deps",
          "refId": 100221
        },
        {
          "name": "KSP_ChildRelatedBudgetDecrease_value",
          "association": "deps",
          "refId": 100263
        },
        {
          "name": "KSP_ChildcareBudgetOverview_value",
          "association": "refs",
          "refId": 100362
        }
      ],
      "deps": {
        "KSP_MaxBudgetSixteenToSeventeenYears_value": true,
        "KSP_ChildRelatedBudgetDecrease_value": true
      },
      "original": "Max(0,MaxBudgetSixteenToSeventeenYears-ChildRelatedBudgetDecrease)/12",
      "index": 100269,
      "name": "KSP_ChildRelatedBudgetSixteenUpToAndIncSeventeen_value",
      "parsed": "Math.max(0,a100221('100221',x,y.base,z,v)-a100263('100263',x,y.base,z,v))/12",
      "id": 100269,
      "fflname": "ChildRelatedBudgetSixteenUpToAndIncSeventeen_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildRelatedBudgetSixteenUpToAndIncSeventeen_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Childrelated budget (per month, 16 up to&&incl yr 17)'",
      "index": 100270,
      "name": "KSP_ChildRelatedBudgetSixteenUpToAndIncSeventeen_title",
      "parsed": "'Childrelated budget (per month, 16 up to&&incl yr 17)'",
      "id": 100270,
      "fflname": "ChildRelatedBudgetSixteenUpToAndIncSeventeen_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02SUB11_value": true,
        "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100295
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100271,
      "name": "KSP_Q_MAP02SUB11_value",
      "parsed": "undefined",
      "id": 100271,
      "fflname": "Q_MAP02SUB11_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02SUB11_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Combination Discount'",
      "index": 100272,
      "name": "KSP_Q_MAP02SUB11_title",
      "parsed": "'Combination Discount'",
      "id": 100272,
      "fflname": "Q_MAP02SUB11_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CombinationDiscountLowestIncome_value": true,
        "KSP_CombinationDiscountTotal_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_IncomeParent01_value",
          "association": "deps",
          "refId": 100110
        },
        {
          "name": "KSP_IncomeParent02_value",
          "association": "deps",
          "refId": 100112
        },
        {
          "name": "KSP_CombinationDiscountTotal_value",
          "association": "refs",
          "refId": 100275
        }
      ],
      "deps": {
        "KSP_IncomeParent01_value": true,
        "KSP_IncomeParent02_value": true
      },
      "original": "Min(IncomeParent01,IncomeParent02)",
      "index": 100273,
      "name": "KSP_CombinationDiscountLowestIncome_value",
      "parsed": "Math.min(a100110('100110',x,y.base,z,v),a100112('100112',x,y.base,z,v))",
      "id": 100273,
      "fflname": "CombinationDiscountLowestIncome_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CombinationDiscountLowestIncome_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'LowestIncome'",
      "index": 100274,
      "name": "KSP_CombinationDiscountLowestIncome_title",
      "parsed": "'LowestIncome'",
      "id": 100274,
      "fflname": "CombinationDiscountLowestIncome_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CombinationDiscountTotal_value": true,
        "KSP_CombinationDiscountOverview_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_CombinationDiscountLowestIncome_value",
          "association": "deps",
          "refId": 100273
        },
        {
          "name": "KSP_LowerBoundaryIncome_value",
          "association": "deps",
          "refId": 100207
        },
        {
          "name": "KSP_CombinationDiscountPercentage_value",
          "association": "deps",
          "refId": 100211
        },
        {
          "name": "KSP_Base_value",
          "association": "deps",
          "refId": 100209
        },
        {
          "name": "KSP_UpperBoundaryIncome_value",
          "association": "deps",
          "refId": 100223
        },
        {
          "name": "KSP_CombinationDiscountOverview_value",
          "association": "refs",
          "refId": 100364
        }
      ],
      "deps": {
        "KSP_CombinationDiscountLowestIncome_value": true,
        "KSP_LowerBoundaryIncome_value": true,
        "KSP_CombinationDiscountPercentage_value": true,
        "KSP_Base_value": true,
        "KSP_UpperBoundaryIncome_value": true
      },
      "original": "If(CombinationDiscountLowestIncome>=LowerBoundaryIncome,Min(UpperBoundaryIncome,Base+CombinationDiscountPercentage*(CombinationDiscountLowestIncome-LowerBoundaryIncome)),0)",
      "index": 100275,
      "name": "KSP_CombinationDiscountTotal_value",
      "parsed": "a100273('100273',x,y.base,z,v)>=a100207('100207',x,y.base,z,v)?Math.min(a100223('100223',x,y.base,z,v),a100209('100209',x,y.base,z,v)+a100211('100211',x,y.base,z,v)*(a100273('100273',x,y.base,z,v)-a100207('100207',x,y.base,z,v))):0",
      "id": 100275,
      "fflname": "CombinationDiscountTotal_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CombinationDiscountTotal_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'CombinationDiscountTotal'",
      "index": 100276,
      "name": "KSP_CombinationDiscountTotal_title",
      "parsed": "'CombinationDiscountTotal'",
      "id": 100276,
      "fflname": "CombinationDiscountTotal_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_PARAGRAAF09_value": true,
        "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100295
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100277,
      "name": "KSP_Q_MAP02_PARAGRAAF09_value",
      "parsed": "undefined",
      "id": 100277,
      "fflname": "Q_MAP02_PARAGRAAF09_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_PARAGRAAF09_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Eigenschappen van de stap'",
      "index": 100278,
      "name": "KSP_Q_MAP02_PARAGRAAF09_title",
      "parsed": "'Eigenschappen van de stap'",
      "id": 100278,
      "fflname": "Q_MAP02_PARAGRAAF09_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_STATUS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP02_value",
          "association": "deps",
          "refId": 100175
        }
      ],
      "deps": {
        "KSP_Q_MAP02_value": true
      },
      "original": "Q_MAP02",
      "index": 100279,
      "name": "KSP_Q_MAP02_STATUS_value",
      "parsed": "a100175('100175',x,y.base,z,v)",
      "id": 100279,
      "fflname": "Q_MAP02_STATUS_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_STATUS_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Status van de stap'",
      "index": 100280,
      "name": "KSP_Q_MAP02_STATUS_title",
      "parsed": "'Status van de stap'",
      "id": 100280,
      "fflname": "Q_MAP02_STATUS_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_PARAGRAAF09SUB2_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100281,
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB2_value",
      "parsed": "undefined",
      "id": 100281,
      "fflname": "Q_MAP02_PARAGRAAF09SUB2_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_PARAGRAAF09SUB2_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Warning voor map 2'",
      "index": 100282,
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB2_title",
      "parsed": "'Warning voor map 2'",
      "id": 100282,
      "fflname": "Q_MAP02_PARAGRAAF09SUB2_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_PARAGRAAF09SUB3_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100283,
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB3_value",
      "parsed": "undefined",
      "id": 100283,
      "fflname": "Q_MAP02_PARAGRAAF09SUB3_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_PARAGRAAF09SUB4_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100284,
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB4_value",
      "parsed": "undefined",
      "id": 100284,
      "fflname": "Q_MAP02_PARAGRAAF09SUB4_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_PARAGRAAF09SUB4_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Validatie stap 2'",
      "index": 100285,
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB4_title",
      "parsed": "'Validatie stap 2'",
      "id": 100285,
      "fflname": "Q_MAP02_PARAGRAAF09SUB4_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_PARAGRAAF09SUB5_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100286,
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB5_value",
      "parsed": "undefined",
      "id": 100286,
      "fflname": "Q_MAP02_PARAGRAAF09SUB5_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_PARAGRAAF09SUB5_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Aantal verplichte velden (1)'",
      "index": 100287,
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB5_title",
      "parsed": "'Aantal verplichte velden (1)'",
      "id": 100287,
      "fflname": "Q_MAP02_PARAGRAAF09SUB5_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_PARAGRAAF09SUB6_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100288,
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB6_value",
      "parsed": "undefined",
      "id": 100288,
      "fflname": "Q_MAP02_PARAGRAAF09SUB6_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_PARAGRAAF09SUB6_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Aantal ingevulde verplichte velden (1)'",
      "index": 100289,
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB6_title",
      "parsed": "'Aantal ingevulde verplichte velden (1)'",
      "id": 100289,
      "fflname": "Q_MAP02_PARAGRAAF09SUB6_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_HULPVARIABELEN_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100290,
      "name": "KSP_Q_MAP02_HULPVARIABELEN_value",
      "parsed": "undefined",
      "id": 100290,
      "fflname": "Q_MAP02_HULPVARIABELEN_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_HULPVARIABELEN_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Hulpvariabelen'",
      "index": 100291,
      "name": "KSP_Q_MAP02_HULPVARIABELEN_title",
      "parsed": "'Hulpvariabelen'",
      "id": 100291,
      "fflname": "Q_MAP02_HULPVARIABELEN_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_Q_MAP02_HULPVARIABELEN_visible": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP02_visible",
          "association": "deps",
          "refId": 100177
        }
      ],
      "deps": {
        "KSP_Q_MAP02_visible": true
      },
      "original": "Q_MAP02.visible&&0",
      "index": 100292,
      "name": "KSP_Q_MAP02_HULPVARIABELEN_visible",
      "parsed": "a100177('100177',x,y.base,z,v)&&0",
      "id": 100292,
      "fflname": "Q_MAP02_HULPVARIABELEN_visible"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_REQUIREDVARS_value": true,
        "KSP_Q_MAP02_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP02_value",
          "association": "refs",
          "refId": 100175
        },
        {
          "name": "KSP_Q_MAP02_WARNING_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP02_INFO_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP02_VALIDATION_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP02_HINT_required",
          "association": "deps"
        },
        {
          "name": "KSP_FiscalParameters_required",
          "association": "deps"
        },
        {
          "name": "KSP_CombinationDiscount_required",
          "association": "deps"
        },
        {
          "name": "KSP_ChildRelatedBudget_required",
          "association": "deps"
        },
        {
          "name": "KSP_Fees_required",
          "association": "deps"
        },
        {
          "name": "KSP_CostsSecondaryEducation_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP02SUB10_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP02SUB11_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP02_PARAGRAAF09_required",
          "association": "deps"
        }
      ],
      "deps": {
        "KSP_Q_MAP02_WARNING_required": true,
        "KSP_Q_MAP02_INFO_required": true,
        "KSP_Q_MAP02_VALIDATION_required": true,
        "KSP_Q_MAP02_HINT_required": true,
        "KSP_FiscalParameters_required": true,
        "KSP_CombinationDiscount_required": true,
        "KSP_ChildRelatedBudget_required": true,
        "KSP_Fees_required": true,
        "KSP_CostsSecondaryEducation_required": true,
        "KSP_Q_MAP02SUB10_required": true,
        "KSP_Q_MAP02SUB11_required": true,
        "KSP_Q_MAP02_PARAGRAAF09_required": true
      },
      "original": "Count(X,SelectDescendants(Q_MAP02,Q_MAP02_HULPVARIABELEN),InputRequired(X))",
      "index": 100293,
      "name": "KSP_Q_MAP02_REQUIREDVARS_value",
      "parsed": "Count([false,false,false,false,false,false,false,false,false,false,false,false])",
      "id": 100293,
      "fflname": "Q_MAP02_REQUIREDVARS_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_REQUIREDVARS_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Aantal verplichte velden (1)'",
      "index": 100294,
      "name": "KSP_Q_MAP02_REQUIREDVARS_title",
      "parsed": "'Aantal verplichte velden (1)'",
      "id": 100294,
      "fflname": "Q_MAP02_REQUIREDVARS_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value": true,
        "KSP_Q_MAP02_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP02_value",
          "association": "refs",
          "refId": 100175
        },
        {
          "name": "KSP_Q_MAP02_WARNING_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP02_WARNING_value",
          "association": "deps",
          "refId": 100178
        },
        {
          "name": "KSP_Q_MAP02_INFO_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP02_INFO_value",
          "association": "deps",
          "refId": 100180
        },
        {
          "name": "KSP_Q_MAP02_VALIDATION_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP02_VALIDATION_value",
          "association": "deps",
          "refId": 100182
        },
        {
          "name": "KSP_Q_MAP02_HINT_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP02_HINT_value",
          "association": "deps",
          "refId": 100184
        },
        {
          "name": "KSP_FiscalParameters_required",
          "association": "deps"
        },
        {
          "name": "KSP_FiscalParameters_value",
          "association": "deps",
          "refId": 100187
        },
        {
          "name": "KSP_CombinationDiscount_required",
          "association": "deps"
        },
        {
          "name": "KSP_CombinationDiscount_value",
          "association": "deps",
          "refId": 100205
        },
        {
          "name": "KSP_ChildRelatedBudget_required",
          "association": "deps"
        },
        {
          "name": "KSP_ChildRelatedBudget_value",
          "association": "deps",
          "refId": 100215
        },
        {
          "name": "KSP_Fees_required",
          "association": "deps"
        },
        {
          "name": "KSP_Fees_value",
          "association": "deps",
          "refId": 100227
        },
        {
          "name": "KSP_CostsSecondaryEducation_required",
          "association": "deps"
        },
        {
          "name": "KSP_CostsSecondaryEducation_value",
          "association": "deps",
          "refId": 100253
        },
        {
          "name": "KSP_Q_MAP02SUB10_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP02SUB10_value",
          "association": "deps",
          "refId": 100259
        },
        {
          "name": "KSP_Q_MAP02SUB11_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP02SUB11_value",
          "association": "deps",
          "refId": 100271
        },
        {
          "name": "KSP_Q_MAP02_PARAGRAAF09_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP02_PARAGRAAF09_value",
          "association": "deps",
          "refId": 100277
        }
      ],
      "deps": {
        "KSP_Q_MAP02_WARNING_required": true,
        "KSP_Q_MAP02_WARNING_value": true,
        "KSP_Q_MAP02_INFO_required": true,
        "KSP_Q_MAP02_INFO_value": true,
        "KSP_Q_MAP02_VALIDATION_required": true,
        "KSP_Q_MAP02_VALIDATION_value": true,
        "KSP_Q_MAP02_HINT_required": true,
        "KSP_Q_MAP02_HINT_value": true,
        "KSP_FiscalParameters_required": true,
        "KSP_FiscalParameters_value": true,
        "KSP_CombinationDiscount_required": true,
        "KSP_CombinationDiscount_value": true,
        "KSP_ChildRelatedBudget_required": true,
        "KSP_ChildRelatedBudget_value": true,
        "KSP_Fees_required": true,
        "KSP_Fees_value": true,
        "KSP_CostsSecondaryEducation_required": true,
        "KSP_CostsSecondaryEducation_value": true,
        "KSP_Q_MAP02SUB10_required": true,
        "KSP_Q_MAP02SUB10_value": true,
        "KSP_Q_MAP02SUB11_required": true,
        "KSP_Q_MAP02SUB11_value": true,
        "KSP_Q_MAP02_PARAGRAAF09_required": true,
        "KSP_Q_MAP02_PARAGRAAF09_value": true
      },
      "original": "Count(X,SelectDescendants(Q_MAP02,Q_MAP02_HULPVARIABELEN),InputRequired(X)&&DataAvailable(X))",
      "index": 100295,
      "name": "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value",
      "parsed": "Count([false&&v[100178][x.hash + y.hash + z]!==undefined,false&&v[100180][x.hash + y.hash + z]!==undefined,false&&v[100182][x.hash + y.hash + z]!==undefined,false&&v[100184][x.hash + y.hash + z]!==undefined,false&&v[100187][x.hash + y.hash + z]!==undefined,false&&v[100205][x.hash + y.hash + z]!==undefined,false&&v[100215][x.hash + y.hash + z]!==undefined,false&&v[100227][x.hash + y.hash + z]!==undefined,false&&v[100253][x.hash + y.hash + z]!==undefined,false&&v[100259][x.hash + y.hash + z]!==undefined,false&&v[100271][x.hash + y.hash + z]!==undefined,false&&v[100277][x.hash + y.hash + z]!==undefined])",
      "id": 100295,
      "fflname": "Q_MAP02_ENTEREDREQUIREDVARS_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP02_ENTEREDREQUIREDVARS_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Aantal ingevulde verplichte velden (1)'",
      "index": 100296,
      "name": "KSP_Q_MAP02_ENTEREDREQUIREDVARS_title",
      "parsed": "'Aantal ingevulde verplichte velden (1)'",
      "id": 100296,
      "fflname": "Q_MAP02_ENTEREDREQUIREDVARS_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_value": true,
        "KSP_Q_MAP06_INFO_value": true,
        "KSP_Q_MAP06_STATUS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP06_ENTEREDREQUIREDVARS_value",
          "association": "deps",
          "refId": 100394
        },
        {
          "name": "KSP_Q_MAP06_REQUIREDVARS_value",
          "association": "deps",
          "refId": 100392
        },
        {
          "name": "KSP_Q_MAP06_INFO_value",
          "association": "refs",
          "refId": 100302
        },
        {
          "name": "KSP_Q_MAP06_STATUS_value",
          "association": "refs",
          "refId": 100377
        }
      ],
      "deps": {
        "KSP_Q_MAP06_ENTEREDREQUIREDVARS_value": true,
        "KSP_Q_MAP06_REQUIREDVARS_value": true
      },
      "original": "Q_MAP06_ENTEREDREQUIREDVARS==Q_MAP06_REQUIREDVARS",
      "index": 100297,
      "name": "KSP_Q_MAP06_value",
      "parsed": "a100394('100394',x,y.base,z,v)==a100392('100392',x,y.base,z,v)",
      "id": 100297,
      "fflname": "Q_MAP06_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Your Personal situation'",
      "index": 100298,
      "name": "KSP_Q_MAP06_title",
      "parsed": "'Your Personal situation'",
      "id": 100298,
      "fflname": "Q_MAP06_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_Q_MAP06_visible": true,
        "KSP_Q_MAP06_PARAGRAAF09_visible": true,
        "KSP_Q_MAP06_HULPVARIABELEN_visible": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_ROOT_visible",
          "association": "deps"
        },
        {
          "name": "KSP_Q_ROOT_value",
          "association": "deps",
          "refId": 100075
        },
        {
          "name": "KSP_Q_MAP06_PARAGRAAF09_visible",
          "association": "refs",
          "refId": 100376
        },
        {
          "name": "KSP_Q_MAP06_HULPVARIABELEN_visible",
          "association": "refs",
          "refId": 100391
        }
      ],
      "deps": {
        "KSP_Q_ROOT_visible": true,
        "KSP_Q_ROOT_value": true
      },
      "original": "Q_ROOT.visible&&Q_ROOT==1",
      "index": 100299,
      "name": "KSP_Q_MAP06_visible",
      "parsed": "true&&a100075('100075',x,y.base,z,v)==1",
      "id": 100299,
      "fflname": "Q_MAP06_visible"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_WARNING_value": true,
        "KSP_Q_MAP06_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_RESTRICTIES_value",
          "association": "deps",
          "refId": 100443
        },
        {
          "name": "KSP_Q_WARNING_GLOBAL_value",
          "association": "deps",
          "refId": 100437
        },
        {
          "name": "KSP_Q_MAP06_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100394
        }
      ],
      "deps": {
        "KSP_Q_RESTRICTIES_value": true,
        "KSP_Q_WARNING_GLOBAL_value": true
      },
      "original": "String(Q_RESTRICTIES[doc]+Q_WARNING_GLOBAL[doc])",
      "index": 100300,
      "name": "KSP_Q_MAP06_WARNING_value",
      "parsed": "String(a100443('100443',x.doc,y.base,z,v)+a100437('100437',x.doc,y.base,z,v))",
      "id": 100300,
      "fflname": "Q_MAP06_WARNING_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_WARNING_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Warning voor map 6'",
      "index": 100301,
      "name": "KSP_Q_MAP06_WARNING_title",
      "parsed": "'Warning voor map 6'",
      "id": 100301,
      "fflname": "Q_MAP06_WARNING_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_INFO_value": true,
        "KSP_Q_MAP06_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP06_value",
          "association": "deps",
          "refId": 100297
        },
        {
          "name": "KSP_Q_MAP06_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100394
        }
      ],
      "deps": {
        "KSP_Q_MAP06_value": true
      },
      "original": "String(If(Q_MAP06[doc]==0,'Nog niet alle verplichte vragen zijn ingevuld.',''))",
      "index": 100302,
      "name": "KSP_Q_MAP06_INFO_value",
      "parsed": "String(a100297('100297',x.doc,y.base,z,v)==0?'Nog niet alle verplichte vragen zijn ingevuld.':'')",
      "id": 100302,
      "fflname": "Q_MAP06_INFO_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_INFO_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Info bij stap 6'",
      "index": 100303,
      "name": "KSP_Q_MAP06_INFO_title",
      "parsed": "'Info bij stap 6'",
      "id": 100303,
      "fflname": "Q_MAP06_INFO_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_VALIDATION_value": true,
        "KSP_Q_MAP06_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP06_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100394
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100304,
      "name": "KSP_Q_MAP06_VALIDATION_value",
      "parsed": "undefined",
      "id": 100304,
      "fflname": "Q_MAP06_VALIDATION_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_VALIDATION_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Validatie stap 6'",
      "index": 100305,
      "name": "KSP_Q_MAP06_VALIDATION_title",
      "parsed": "'Validatie stap 6'",
      "id": 100305,
      "fflname": "Q_MAP06_VALIDATION_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_HINT_value": true,
        "KSP_Q_MAP06_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP06_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100394
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100306,
      "name": "KSP_Q_MAP06_HINT_value",
      "parsed": "undefined",
      "id": 100306,
      "fflname": "Q_MAP06_HINT_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_HINT_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Hinttekst stap 6'",
      "index": 100307,
      "name": "KSP_Q_MAP06_HINT_title",
      "parsed": "'Hinttekst stap 6'",
      "id": 100307,
      "fflname": "Q_MAP06_HINT_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_Q_MAP06_HINT_hint": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Dit is de hinttekst van de variable Q_MAP06_HINT (DEZE REGEL WORDT NIET GEBRUIKT!)'",
      "index": 100308,
      "name": "KSP_Q_MAP06_HINT_hint",
      "parsed": "'Dit is de hinttekst van de variable Q_MAP06_HINT (DEZE REGEL WORDT NIET GEBRUIKT!)'",
      "id": 100308,
      "fflname": "Q_MAP06_HINT_hint"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06SUB5_value": true,
        "KSP_Q_MAP06_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP06_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100394
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100309,
      "name": "KSP_Q_MAP06SUB5_value",
      "parsed": "undefined",
      "id": 100309,
      "fflname": "Q_MAP06SUB5_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06SUB5_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Your Personal Situation'",
      "index": 100310,
      "name": "KSP_Q_MAP06SUB5_title",
      "parsed": "'Your Personal Situation'",
      "id": 100310,
      "fflname": "Q_MAP06SUB5_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_GraphResRek1_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalYearlyBalance_value",
          "association": "deps",
          "refId": 100368
        }
      ],
      "deps": {
        "KSP_TotalYearlyBalance_value": true
      },
      "original": "TotalYearlyBalance",
      "index": 100311,
      "name": "KSP_GraphResRek1_value",
      "parsed": "a100368('100368',x,y.base,z,v)",
      "id": 100311,
      "fflname": "GraphResRek1_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_GraphResRek1_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Total Net Costs (-)'",
      "index": 100312,
      "name": "KSP_GraphResRek1_title",
      "parsed": "'Total Net Costs (-)'",
      "id": 100312,
      "fflname": "GraphResRek1_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06SUB5SUB2_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100313,
      "name": "KSP_Q_MAP06SUB5SUB2_value",
      "parsed": "undefined",
      "id": 100313,
      "fflname": "Q_MAP06SUB5SUB2_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06SUB5SUB2_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Total (yearly) costs'",
      "index": 100314,
      "name": "KSP_Q_MAP06SUB5SUB2_title",
      "parsed": "'Total (yearly) costs'",
      "id": 100314,
      "fflname": "Q_MAP06SUB5SUB2_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Age_value": true,
        "KSP_CostsForOutOfSchoolCare_value": true,
        "KSP_CostsForPrimaryEducation_value": true,
        "KSP_CostsForSecondaryEducation_value": true,
        "KSP_ChildCarePremiumOverview_value": true,
        "KSP_ChildcareBudgetOverview_value": true,
        "KSP_CombinationDiscountOverview_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_CostsForOutOfSchoolCare_value",
          "association": "refs",
          "refId": 100345
        },
        {
          "name": "KSP_CostsForPrimaryEducation_value",
          "association": "refs",
          "refId": 100347
        },
        {
          "name": "KSP_CostsForSecondaryEducation_value",
          "association": "refs",
          "refId": 100349
        },
        {
          "name": "KSP_ChildCarePremiumOverview_value",
          "association": "refs",
          "refId": 100360
        },
        {
          "name": "KSP_ChildcareBudgetOverview_value",
          "association": "refs",
          "refId": 100362
        },
        {
          "name": "KSP_CombinationDiscountOverview_value",
          "association": "refs",
          "refId": 100364
        }
      ],
      "deps": {},
      "original": "ValueT(T)-1",
      "index": 100315,
      "name": "KSP_Age_value",
      "parsed": "ValueT(x)-1",
      "id": 100315,
      "fflname": "Age_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Age_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Age'",
      "index": 100316,
      "name": "KSP_Age_title",
      "parsed": "'Age'",
      "id": 100316,
      "fflname": "Age_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_PeriodeInFormulaset_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "ValueT(T)",
      "index": 100317,
      "name": "KSP_PeriodeInFormulaset_value",
      "parsed": "ValueT(x)",
      "id": 100317,
      "fflname": "PeriodeInFormulaset_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_PeriodeInFormulaset_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'PeriodeInFormulaset'",
      "index": 100318,
      "name": "KSP_PeriodeInFormulaset_title",
      "parsed": "'PeriodeInFormulaset'",
      "id": 100318,
      "fflname": "PeriodeInFormulaset_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Furniture_value": true,
        "KSP_TotalyYearlyCostsChild_value": true,
        "KSP_TotalYearlyCosts_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalyYearlyCostsChild_value",
          "association": "refs",
          "refId": 100145
        },
        {
          "name": "KSP_TotalYearlyCosts_value",
          "association": "refs",
          "refId": 100353
        }
      ],
      "deps": {},
      "original": "If(ValueT(T)==1,1800,0)",
      "index": 100319,
      "name": "KSP_Furniture_value",
      "parsed": "ValueT(x)==1?1800:0",
      "id": 100319,
      "fflname": "Furniture_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Furniture_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Furniture'",
      "index": 100320,
      "name": "KSP_Furniture_title",
      "parsed": "'Furniture'",
      "id": 100320,
      "fflname": "Furniture_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ActualChildCareCosts_value": true,
        "KSP_TotalyYearlyCostsChild_value": true,
        "KSP_TotalYearlyCosts_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalyYearlyCostsChild_value",
          "association": "refs",
          "refId": 100145
        },
        {
          "name": "KSP_TotalYearlyCosts_value",
          "association": "refs",
          "refId": 100353
        }
      ],
      "deps": {},
      "original": "If(ValueT(T)<=4,1,0)",
      "index": 100321,
      "name": "KSP_ActualChildCareCosts_value",
      "parsed": "ValueT(x)<=4?1:0",
      "id": 100321,
      "fflname": "ActualChildCareCosts_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ActualChildCareCosts_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Childcare costs'",
      "index": 100322,
      "name": "KSP_ActualChildCareCosts_title",
      "parsed": "'Childcare costs'",
      "id": 100322,
      "fflname": "ActualChildCareCosts_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ActualDiapers_value": true,
        "KSP_TotalyYearlyCostsChild_value": true,
        "KSP_TotalYearlyCosts_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalyYearlyCostsChild_value",
          "association": "refs",
          "refId": 100145
        },
        {
          "name": "KSP_TotalYearlyCosts_value",
          "association": "refs",
          "refId": 100353
        }
      ],
      "deps": {},
      "original": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','Diapers',ValueT(T))",
      "index": 100323,
      "name": "KSP_ActualDiapers_value",
      "parsed": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','Diapers',ValueT(x))",
      "id": 100323,
      "fflname": "ActualDiapers_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ActualDiapers_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Diapers'",
      "index": 100324,
      "name": "KSP_ActualDiapers_title",
      "parsed": "'Diapers'",
      "id": 100324,
      "fflname": "ActualDiapers_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ActualFood_value": true,
        "KSP_TotalyYearlyCostsChild_value": true,
        "KSP_TotalYearlyCosts_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalyYearlyCostsChild_value",
          "association": "refs",
          "refId": 100145
        },
        {
          "name": "KSP_ChildGender_value",
          "association": "deps",
          "refId": 100123
        },
        {
          "name": "KSP_TotalYearlyCosts_value",
          "association": "refs",
          "refId": 100353
        }
      ],
      "deps": {
        "KSP_ChildGender_value": true
      },
      "original": "If(ChildGender==0,MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','FoodCostsBoy',ValueT(T)),MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','FoodCostsGirl',ValueT(T)))",
      "index": 100325,
      "name": "KSP_ActualFood_value",
      "parsed": "a100123('100123',x,y,z,v)==0?MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','FoodCostsBoy',ValueT(x)):MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','FoodCostsGirl',ValueT(x))",
      "id": 100325,
      "fflname": "ActualFood_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ActualFood_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Food'",
      "index": 100326,
      "name": "KSP_ActualFood_title",
      "parsed": "'Food'",
      "id": 100326,
      "fflname": "ActualFood_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ActualClothingCosts_value": true,
        "KSP_TotalyYearlyCostsChild_value": true,
        "KSP_TotalYearlyCosts_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalyYearlyCostsChild_value",
          "association": "refs",
          "refId": 100145
        },
        {
          "name": "KSP_TotalYearlyCosts_value",
          "association": "refs",
          "refId": 100353
        }
      ],
      "deps": {},
      "original": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','ClothingCosts',ValueT(T))",
      "index": 100327,
      "name": "KSP_ActualClothingCosts_value",
      "parsed": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','ClothingCosts',ValueT(x))",
      "id": 100327,
      "fflname": "ActualClothingCosts_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ActualClothingCosts_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Clothing'",
      "index": 100328,
      "name": "KSP_ActualClothingCosts_title",
      "parsed": "'Clothing'",
      "id": 100328,
      "fflname": "ActualClothingCosts_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ActualPersonalCareCosts_value": true,
        "KSP_TotalyYearlyCostsChild_value": true,
        "KSP_TotalYearlyCosts_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalyYearlyCostsChild_value",
          "association": "refs",
          "refId": 100145
        },
        {
          "name": "KSP_TotalYearlyCosts_value",
          "association": "refs",
          "refId": 100353
        }
      ],
      "deps": {},
      "original": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','PersonalCare',ValueT(T))",
      "index": 100329,
      "name": "KSP_ActualPersonalCareCosts_value",
      "parsed": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','PersonalCare',ValueT(x))",
      "id": 100329,
      "fflname": "ActualPersonalCareCosts_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ActualPersonalCareCosts_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Personal care'",
      "index": 100330,
      "name": "KSP_ActualPersonalCareCosts_title",
      "parsed": "'Personal care'",
      "id": 100330,
      "fflname": "ActualPersonalCareCosts_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Hairdresser_value": true,
        "KSP_TotalyYearlyCostsChild_value": true,
        "KSP_TotalYearlyCosts_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalyYearlyCostsChild_value",
          "association": "refs",
          "refId": 100145
        },
        {
          "name": "KSP_TotalYearlyCosts_value",
          "association": "refs",
          "refId": 100353
        }
      ],
      "deps": {},
      "original": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','Hairdresser',ValueT(T))",
      "index": 100331,
      "name": "KSP_Hairdresser_value",
      "parsed": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','Hairdresser',ValueT(x))",
      "id": 100331,
      "fflname": "Hairdresser_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Hairdresser_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Hairdresser'",
      "index": 100332,
      "name": "KSP_Hairdresser_title",
      "parsed": "'Hairdresser'",
      "id": 100332,
      "fflname": "Hairdresser_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Inventory_value": true,
        "KSP_TotalyYearlyCostsChild_value": true,
        "KSP_TotalYearlyCosts_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalyYearlyCostsChild_value",
          "association": "refs",
          "refId": 100145
        },
        {
          "name": "KSP_TotalYearlyCosts_value",
          "association": "refs",
          "refId": 100353
        }
      ],
      "deps": {},
      "original": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','Inventory',ValueT(T))",
      "index": 100333,
      "name": "KSP_Inventory_value",
      "parsed": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','Inventory',ValueT(x))",
      "id": 100333,
      "fflname": "Inventory_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Inventory_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Inventory'",
      "index": 100334,
      "name": "KSP_Inventory_title",
      "parsed": "'Inventory'",
      "id": 100334,
      "fflname": "Inventory_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Allowance_value": true,
        "KSP_TotalyYearlyCostsChild_value": true,
        "KSP_TotalYearlyCosts_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalyYearlyCostsChild_value",
          "association": "refs",
          "refId": 100145
        },
        {
          "name": "KSP_TotalYearlyCosts_value",
          "association": "refs",
          "refId": 100353
        }
      ],
      "deps": {},
      "original": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','Allowance',ValueT(T))",
      "index": 100335,
      "name": "KSP_Allowance_value",
      "parsed": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','Allowance',ValueT(x))",
      "id": 100335,
      "fflname": "Allowance_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Allowance_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Allowance'",
      "index": 100336,
      "name": "KSP_Allowance_title",
      "parsed": "'Allowance'",
      "id": 100336,
      "fflname": "Allowance_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Contributions_value": true,
        "KSP_TotalyYearlyCostsChild_value": true,
        "KSP_TotalYearlyCosts_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalyYearlyCostsChild_value",
          "association": "refs",
          "refId": 100145
        },
        {
          "name": "KSP_TotalYearlyCosts_value",
          "association": "refs",
          "refId": 100353
        }
      ],
      "deps": {},
      "original": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','Contributions',ValueT(T))",
      "index": 100337,
      "name": "KSP_Contributions_value",
      "parsed": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','Contributions',ValueT(x))",
      "id": 100337,
      "fflname": "Contributions_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Contributions_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Contributions'",
      "index": 100338,
      "name": "KSP_Contributions_title",
      "parsed": "'Contributions'",
      "id": 100338,
      "fflname": "Contributions_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Transport_value": true,
        "KSP_TotalyYearlyCostsChild_value": true,
        "KSP_TotalYearlyCosts_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalyYearlyCostsChild_value",
          "association": "refs",
          "refId": 100145
        },
        {
          "name": "KSP_TotalYearlyCosts_value",
          "association": "refs",
          "refId": 100353
        }
      ],
      "deps": {},
      "original": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','Transport',ValueT(T))",
      "index": 100339,
      "name": "KSP_Transport_value",
      "parsed": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','Transport',ValueT(x))",
      "id": 100339,
      "fflname": "Transport_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Transport_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Transport'",
      "index": 100340,
      "name": "KSP_Transport_title",
      "parsed": "'Transport'",
      "id": 100340,
      "fflname": "Transport_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MobilePhone_value": true,
        "KSP_TotalyYearlyCostsChild_value": true,
        "KSP_TotalYearlyCosts_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalyYearlyCostsChild_value",
          "association": "refs",
          "refId": 100145
        },
        {
          "name": "KSP_TotalYearlyCosts_value",
          "association": "refs",
          "refId": 100353
        }
      ],
      "deps": {},
      "original": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','MobilePhone',ValueT(T))",
      "index": 100341,
      "name": "KSP_MobilePhone_value",
      "parsed": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','MobilePhone',ValueT(x))",
      "id": 100341,
      "fflname": "MobilePhone_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MobilePhone_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'MobilePhone'",
      "index": 100342,
      "name": "KSP_MobilePhone_title",
      "parsed": "'MobilePhone'",
      "id": 100342,
      "fflname": "MobilePhone_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_DrivingLicense_value": true,
        "KSP_TotalyYearlyCostsChild_value": true,
        "KSP_TotalYearlyCosts_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalyYearlyCostsChild_value",
          "association": "refs",
          "refId": 100145
        },
        {
          "name": "KSP_TotalYearlyCosts_value",
          "association": "refs",
          "refId": 100353
        }
      ],
      "deps": {},
      "original": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','DrivingLicense',ValueT(T))",
      "index": 100343,
      "name": "KSP_DrivingLicense_value",
      "parsed": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','DrivingLicense',ValueT(x))",
      "id": 100343,
      "fflname": "DrivingLicense_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_DrivingLicense_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'DrivingLicense'",
      "index": 100344,
      "name": "KSP_DrivingLicense_title",
      "parsed": "'DrivingLicense'",
      "id": 100344,
      "fflname": "DrivingLicense_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CostsForOutOfSchoolCare_value": true,
        "KSP_TotalyYearlyCostsChild_value": true,
        "KSP_TotalYearlyCosts_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalyYearlyCostsChild_value",
          "association": "refs",
          "refId": 100145
        },
        {
          "name": "KSP_Age_value",
          "association": "deps",
          "refId": 100315
        },
        {
          "name": "KSP_HourlyFeeOutOfSchoolCare_value",
          "association": "deps",
          "refId": 100136
        },
        {
          "name": "KSP_NrOfDaysOutOfSchoolCareMonth_value",
          "association": "deps",
          "refId": 100132
        },
        {
          "name": "KSP_TotalYearlyCosts_value",
          "association": "refs",
          "refId": 100353
        }
      ],
      "deps": {
        "KSP_Age_value": true,
        "KSP_HourlyFeeOutOfSchoolCare_value": true,
        "KSP_NrOfDaysOutOfSchoolCareMonth_value": true
      },
      "original": "If(Age>=4&&Age<11,HourlyFeeOutOfSchoolCare*NrOfDaysOutOfSchoolCareMonth*12,NA)",
      "index": 100345,
      "name": "KSP_CostsForOutOfSchoolCare_value",
      "parsed": "a100315('100315',x,y.base,z,v)>=4&&a100315('100315',x,y.base,z,v)<11?a100136('100136',x,y,z,v)*a100132('100132',x,y,z,v)*12:NA",
      "id": 100345,
      "fflname": "CostsForOutOfSchoolCare_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CostsForOutOfSchoolCare_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Kosten BSO'",
      "index": 100346,
      "name": "KSP_CostsForOutOfSchoolCare_title",
      "parsed": "'Kosten BSO'",
      "id": 100346,
      "fflname": "CostsForOutOfSchoolCare_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CostsForPrimaryEducation_value": true,
        "KSP_TotalyYearlyCostsChild_value": true,
        "KSP_TotalYearlyCosts_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalyYearlyCostsChild_value",
          "association": "refs",
          "refId": 100145
        },
        {
          "name": "KSP_Age_value",
          "association": "deps",
          "refId": 100315
        },
        {
          "name": "KSP_ParentalContributionPrimaryEducation_value",
          "association": "deps",
          "refId": 100138
        },
        {
          "name": "KSP_TotalYearlyCosts_value",
          "association": "refs",
          "refId": 100353
        }
      ],
      "deps": {
        "KSP_Age_value": true,
        "KSP_ParentalContributionPrimaryEducation_value": true
      },
      "original": "If(Age>=4&&Age<=11,ParentalContributionPrimaryEducation,0)",
      "index": 100347,
      "name": "KSP_CostsForPrimaryEducation_value",
      "parsed": "a100315('100315',x,y.base,z,v)>=4&&a100315('100315',x,y.base,z,v)<=11?a100138('100138',x,y,z,v):0",
      "id": 100347,
      "fflname": "CostsForPrimaryEducation_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CostsForPrimaryEducation_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Costs for Primary Education'",
      "index": 100348,
      "name": "KSP_CostsForPrimaryEducation_title",
      "parsed": "'Costs for Primary Education'",
      "id": 100348,
      "fflname": "CostsForPrimaryEducation_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CostsForSecondaryEducation_value": true,
        "KSP_TotalyYearlyCostsChild_value": true,
        "KSP_TotalYearlyCosts_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalyYearlyCostsChild_value",
          "association": "refs",
          "refId": 100145
        },
        {
          "name": "KSP_Age_value",
          "association": "deps",
          "refId": 100315
        },
        {
          "name": "KSP_CostsYearFiveSixSeven_value",
          "association": "deps",
          "refId": 100257
        },
        {
          "name": "KSP_CostsYearOneFour_value",
          "association": "deps",
          "refId": 100255
        },
        {
          "name": "KSP_TotalYearlyCosts_value",
          "association": "refs",
          "refId": 100353
        }
      ],
      "deps": {
        "KSP_Age_value": true,
        "KSP_CostsYearFiveSixSeven_value": true,
        "KSP_CostsYearOneFour_value": true
      },
      "original": "If(Age>=12&&Age<16,CostsYearOneFour,If(Age>=16,CostsYearFiveSixSeven,0))",
      "index": 100349,
      "name": "KSP_CostsForSecondaryEducation_value",
      "parsed": "a100315('100315',x,y.base,z,v)>=12&&a100315('100315',x,y.base,z,v)<16?a100255('100255',x,y.base,z,v):a100315('100315',x,y.base,z,v)>=16?a100257('100257',x,y.base,z,v):0",
      "id": 100349,
      "fflname": "CostsForSecondaryEducation_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CostsForSecondaryEducation_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Costs for Secondary Education'",
      "index": 100350,
      "name": "KSP_CostsForSecondaryEducation_title",
      "parsed": "'Costs for Secondary Education'",
      "id": 100350,
      "fflname": "CostsForSecondaryEducation_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CostsUnspecifiedOverview_value": true,
        "KSP_TotalyYearlyCostsChild_value": true,
        "KSP_TotalYearlyCosts_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalyYearlyCostsChild_value",
          "association": "refs",
          "refId": 100145
        },
        {
          "name": "KSP_CostsUnspecified_value",
          "association": "deps",
          "refId": 100140
        },
        {
          "name": "KSP_TotalYearlyCosts_value",
          "association": "refs",
          "refId": 100353
        }
      ],
      "deps": {
        "KSP_CostsUnspecified_value": true
      },
      "original": "CostsUnspecified*12",
      "index": 100351,
      "name": "KSP_CostsUnspecifiedOverview_value",
      "parsed": "a100140('100140',x,y,z,v)*12",
      "id": 100351,
      "fflname": "CostsUnspecifiedOverview_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CostsUnspecifiedOverview_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Costs unspecified'",
      "index": 100352,
      "name": "KSP_CostsUnspecifiedOverview_title",
      "parsed": "'Costs unspecified'",
      "id": 100352,
      "fflname": "CostsUnspecifiedOverview_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_TotalYearlyCosts_value": true,
        "KSP_TotalYearlyCostTSUM_value": true,
        "KSP_TotalYearlyBalance_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Furniture_value",
          "association": "deps",
          "refId": 100319
        },
        {
          "name": "KSP_ActualChildCareCosts_value",
          "association": "deps",
          "refId": 100321
        },
        {
          "name": "KSP_ActualDiapers_value",
          "association": "deps",
          "refId": 100323
        },
        {
          "name": "KSP_ActualFood_value",
          "association": "deps",
          "refId": 100325
        },
        {
          "name": "KSP_ActualClothingCosts_value",
          "association": "deps",
          "refId": 100327
        },
        {
          "name": "KSP_ActualPersonalCareCosts_value",
          "association": "deps",
          "refId": 100329
        },
        {
          "name": "KSP_Hairdresser_value",
          "association": "deps",
          "refId": 100331
        },
        {
          "name": "KSP_Inventory_value",
          "association": "deps",
          "refId": 100333
        },
        {
          "name": "KSP_Allowance_value",
          "association": "deps",
          "refId": 100335
        },
        {
          "name": "KSP_Contributions_value",
          "association": "deps",
          "refId": 100337
        },
        {
          "name": "KSP_Transport_value",
          "association": "deps",
          "refId": 100339
        },
        {
          "name": "KSP_MobilePhone_value",
          "association": "deps",
          "refId": 100341
        },
        {
          "name": "KSP_DrivingLicense_value",
          "association": "deps",
          "refId": 100343
        },
        {
          "name": "KSP_CostsForOutOfSchoolCare_value",
          "association": "deps",
          "refId": 100345
        },
        {
          "name": "KSP_CostsForPrimaryEducation_value",
          "association": "deps",
          "refId": 100347
        },
        {
          "name": "KSP_CostsForSecondaryEducation_value",
          "association": "deps",
          "refId": 100349
        },
        {
          "name": "KSP_CostsUnspecifiedOverview_value",
          "association": "deps",
          "refId": 100351
        },
        {
          "name": "KSP_TotalYearlyCostTSUM_value",
          "association": "refs",
          "refId": 100355
        },
        {
          "name": "KSP_TotalYearlyBalance_value",
          "association": "refs",
          "refId": 100368
        }
      ],
      "deps": {
        "KSP_Furniture_value": true,
        "KSP_ActualChildCareCosts_value": true,
        "KSP_ActualDiapers_value": true,
        "KSP_ActualFood_value": true,
        "KSP_ActualClothingCosts_value": true,
        "KSP_ActualPersonalCareCosts_value": true,
        "KSP_Hairdresser_value": true,
        "KSP_Inventory_value": true,
        "KSP_Allowance_value": true,
        "KSP_Contributions_value": true,
        "KSP_Transport_value": true,
        "KSP_MobilePhone_value": true,
        "KSP_DrivingLicense_value": true,
        "KSP_CostsForOutOfSchoolCare_value": true,
        "KSP_CostsForPrimaryEducation_value": true,
        "KSP_CostsForSecondaryEducation_value": true,
        "KSP_CostsUnspecifiedOverview_value": true
      },
      "original": "Furniture+ActualChildCareCosts+ActualDiapers+ActualFood+ActualClothingCosts+ActualPersonalCareCosts+Hairdresser+Inventory+Allowance+Contributions+Transport+MobilePhone+DrivingLicense+CostsForOutOfSchoolCare+CostsForPrimaryEducation+CostsForSecondaryEducation+CostsUnspecifiedOverview",
      "index": 100353,
      "name": "KSP_TotalYearlyCosts_value",
      "parsed": "a100319('100319',x,y.base,z,v)+a100321('100321',x,y.base,z,v)+a100323('100323',x,y.base,z,v)+a100325('100325',x,y.base,z,v)+a100327('100327',x,y.base,z,v)+a100329('100329',x,y.base,z,v)+a100331('100331',x,y.base,z,v)+a100333('100333',x,y.base,z,v)+a100335('100335',x,y.base,z,v)+a100337('100337',x,y.base,z,v)+a100339('100339',x,y.base,z,v)+a100341('100341',x,y.base,z,v)+a100343('100343',x,y.base,z,v)+a100345('100345',x,y.base,z,v)+a100347('100347',x,y.base,z,v)+a100349('100349',x,y.base,z,v)+a100351('100351',x,y.base,z,v)",
      "id": 100353,
      "fflname": "TotalYearlyCosts_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_TotalYearlyCosts_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Total (yearly) costs'",
      "index": 100354,
      "name": "KSP_TotalYearlyCosts_title",
      "parsed": "'Total (yearly) costs'",
      "id": 100354,
      "fflname": "TotalYearlyCosts_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_TotalYearlyCostTSUM_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalYearlyCosts_value",
          "association": "deps",
          "refId": 100353
        }
      ],
      "deps": {
        "KSP_TotalYearlyCosts_value": true
      },
      "original": "TSUM(TotalYearlyCosts)",
      "index": 100355,
      "name": "KSP_TotalYearlyCostTSUM_value",
      "parsed": "SUM(TVALUES([100353],a100353,'100353',x,y.base,z,v))",
      "id": 100355,
      "fflname": "TotalYearlyCostTSUM_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06SUB5SUB3_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100356,
      "name": "KSP_Q_MAP06SUB5SUB3_value",
      "parsed": "undefined",
      "id": 100356,
      "fflname": "Q_MAP06SUB5SUB3_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06SUB5SUB3_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'[b]Child-related Income[/b]'",
      "index": 100357,
      "name": "KSP_Q_MAP06SUB5SUB3_title",
      "parsed": "'[b]Child-related Income[/b]'",
      "id": 100357,
      "fflname": "Q_MAP06SUB5SUB3_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildBenefits_value": true,
        "KSP_TotalYearlyIncome_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalYearlyIncome_value",
          "association": "refs",
          "refId": 100366
        }
      ],
      "deps": {},
      "original": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','ChildBenefits',ValueT(T))",
      "index": 100358,
      "name": "KSP_ChildBenefits_value",
      "parsed": "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','ChildBenefits',ValueT(x))",
      "id": 100358,
      "fflname": "ChildBenefits_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildBenefits_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Child benefits'",
      "index": 100359,
      "name": "KSP_ChildBenefits_title",
      "parsed": "'Child benefits'",
      "id": 100359,
      "fflname": "ChildBenefits_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildCarePremiumOverview_value": true,
        "KSP_TotalYearlyIncome_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Age_value",
          "association": "deps",
          "refId": 100315
        },
        {
          "name": "KSP_PremiumForChildcare_value",
          "association": "deps",
          "refId": 100249
        },
        {
          "name": "KSP_PremiumForOutofSchoolCare_value",
          "association": "deps",
          "refId": 100251
        },
        {
          "name": "KSP_TotalYearlyIncome_value",
          "association": "refs",
          "refId": 100366
        }
      ],
      "deps": {
        "KSP_Age_value": true,
        "KSP_PremiumForChildcare_value": true,
        "KSP_PremiumForOutofSchoolCare_value": true
      },
      "original": "If(Age<4,PremiumForChildcare*12,If(Age<11,PremiumForOutofSchoolCare*12,0))",
      "index": 100360,
      "name": "KSP_ChildCarePremiumOverview_value",
      "parsed": "a100315('100315',x,y.base,z,v)<4?a100249('100249',x,y.base,z,v)*12:a100315('100315',x,y.base,z,v)<11?a100251('100251',x,y.base,z,v)*12:0",
      "id": 100360,
      "fflname": "ChildCarePremiumOverview_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildCarePremiumOverview_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Childcare premium'",
      "index": 100361,
      "name": "KSP_ChildCarePremiumOverview_title",
      "parsed": "'Childcare premium'",
      "id": 100361,
      "fflname": "ChildCarePremiumOverview_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildcareBudgetOverview_value": true,
        "KSP_TotalYearlyIncome_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Age_value",
          "association": "deps",
          "refId": 100315
        },
        {
          "name": "KSP_ChildRelatedBudgetUpToTwelve_value",
          "association": "deps",
          "refId": 100265
        },
        {
          "name": "KSP_ChildRelatedBudgetTwelveUpToAndInclFifteen_value",
          "association": "deps",
          "refId": 100267
        },
        {
          "name": "KSP_ChildRelatedBudgetSixteenUpToAndIncSeventeen_value",
          "association": "deps",
          "refId": 100269
        },
        {
          "name": "KSP_TotalYearlyIncome_value",
          "association": "refs",
          "refId": 100366
        }
      ],
      "deps": {
        "KSP_Age_value": true,
        "KSP_ChildRelatedBudgetUpToTwelve_value": true,
        "KSP_ChildRelatedBudgetTwelveUpToAndInclFifteen_value": true,
        "KSP_ChildRelatedBudgetSixteenUpToAndIncSeventeen_value": true
      },
      "original": "If(Age<12,ChildRelatedBudgetUpToTwelve*12,If(Age<16,ChildRelatedBudgetTwelveUpToAndInclFifteen*12,If(Age<18,ChildRelatedBudgetSixteenUpToAndIncSeventeen*12,0)))",
      "index": 100362,
      "name": "KSP_ChildcareBudgetOverview_value",
      "parsed": "a100315('100315',x,y.base,z,v)<12?a100265('100265',x,y.base,z,v)*12:a100315('100315',x,y.base,z,v)<16?a100267('100267',x,y.base,z,v)*12:a100315('100315',x,y.base,z,v)<18?a100269('100269',x,y.base,z,v)*12:0",
      "id": 100362,
      "fflname": "ChildcareBudgetOverview_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildcareBudgetOverview_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Childcare budget'",
      "index": 100363,
      "name": "KSP_ChildcareBudgetOverview_title",
      "parsed": "'Childcare budget'",
      "id": 100363,
      "fflname": "ChildcareBudgetOverview_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CombinationDiscountOverview_value": true,
        "KSP_TotalYearlyIncome_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Age_value",
          "association": "deps",
          "refId": 100315
        },
        {
          "name": "KSP_CombinationDiscountTotal_value",
          "association": "deps",
          "refId": 100275
        },
        {
          "name": "KSP_TotalYearlyIncome_value",
          "association": "refs",
          "refId": 100366
        }
      ],
      "deps": {
        "KSP_Age_value": true,
        "KSP_CombinationDiscountTotal_value": true
      },
      "original": "If(Age<12,CombinationDiscountTotal,0)",
      "index": 100364,
      "name": "KSP_CombinationDiscountOverview_value",
      "parsed": "a100315('100315',x,y.base,z,v)<12?a100275('100275',x,y.base,z,v):0",
      "id": 100364,
      "fflname": "CombinationDiscountOverview_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_CombinationDiscountOverview_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Combination Discount'",
      "index": 100365,
      "name": "KSP_CombinationDiscountOverview_title",
      "parsed": "'Combination Discount'",
      "id": 100365,
      "fflname": "CombinationDiscountOverview_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_TotalYearlyIncome_value": true,
        "KSP_TotalYearlyBalance_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_ChildBenefits_value",
          "association": "deps",
          "refId": 100358
        },
        {
          "name": "KSP_ChildCarePremiumOverview_value",
          "association": "deps",
          "refId": 100360
        },
        {
          "name": "KSP_ChildcareBudgetOverview_value",
          "association": "deps",
          "refId": 100362
        },
        {
          "name": "KSP_CombinationDiscountOverview_value",
          "association": "deps",
          "refId": 100364
        },
        {
          "name": "KSP_TotalYearlyBalance_value",
          "association": "refs",
          "refId": 100368
        }
      ],
      "deps": {
        "KSP_ChildBenefits_value": true,
        "KSP_ChildCarePremiumOverview_value": true,
        "KSP_ChildcareBudgetOverview_value": true,
        "KSP_CombinationDiscountOverview_value": true
      },
      "original": "ChildBenefits+ChildCarePremiumOverview+ChildcareBudgetOverview+CombinationDiscountOverview",
      "index": 100366,
      "name": "KSP_TotalYearlyIncome_value",
      "parsed": "a100358('100358',x,y.base,z,v)+a100360('100360',x,y.base,z,v)+a100362('100362',x,y.base,z,v)+a100364('100364',x,y.base,z,v)",
      "id": 100366,
      "fflname": "TotalYearlyIncome_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_TotalYearlyIncome_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Total (yearly) Income'",
      "index": 100367,
      "name": "KSP_TotalYearlyIncome_title",
      "parsed": "'Total (yearly) Income'",
      "id": 100367,
      "fflname": "TotalYearlyIncome_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_TotalYearlyBalance_value": true,
        "KSP_GraphResRek1_value": true,
        "KSP_TotalMonthlyBalanceAverage_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_GraphResRek1_value",
          "association": "refs",
          "refId": 100311
        },
        {
          "name": "KSP_TotalYearlyCosts_value",
          "association": "deps",
          "refId": 100353
        },
        {
          "name": "KSP_TotalYearlyIncome_value",
          "association": "deps",
          "refId": 100366
        },
        {
          "name": "KSP_TotalMonthlyBalanceAverage_value",
          "association": "refs",
          "refId": 100370
        }
      ],
      "deps": {
        "KSP_TotalYearlyCosts_value": true,
        "KSP_TotalYearlyIncome_value": true
      },
      "original": "TotalYearlyCosts-TotalYearlyIncome",
      "index": 100368,
      "name": "KSP_TotalYearlyBalance_value",
      "parsed": "a100353('100353',x,y.base,z,v)-a100366('100366',x,y.base,z,v)",
      "id": 100368,
      "fflname": "TotalYearlyBalance_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_TotalYearlyBalance_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Total Net Costs (-)'",
      "index": 100369,
      "name": "KSP_TotalYearlyBalance_title",
      "parsed": "'Total Net Costs (-)'",
      "id": 100369,
      "fflname": "TotalYearlyBalance_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_TotalMonthlyBalanceAverage_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_TotalYearlyBalance_value",
          "association": "deps",
          "refId": 100368
        }
      ],
      "deps": {
        "KSP_TotalYearlyBalance_value": true
      },
      "original": "TotalYearlyBalance/12",
      "index": 100370,
      "name": "KSP_TotalMonthlyBalanceAverage_value",
      "parsed": "a100368('100368',x,y.base,z,v)/12",
      "id": 100370,
      "fflname": "TotalMonthlyBalanceAverage_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_TotalMonthlyBalanceAverage_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Total monthly Net Costs, monthly()'",
      "index": 100371,
      "name": "KSP_TotalMonthlyBalanceAverage_title",
      "parsed": "'Total monthly Net Costs, monthly()'",
      "id": 100371,
      "fflname": "TotalMonthlyBalanceAverage_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildCareCosts_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_NrOfDaysChildcareMonth_value",
          "association": "deps",
          "refId": 100128
        },
        {
          "name": "KSP_HourlyFeeChildCare_value",
          "association": "deps",
          "refId": 100134
        }
      ],
      "deps": {
        "KSP_NrOfDaysChildcareMonth_value": true,
        "KSP_HourlyFeeChildCare_value": true
      },
      "original": "NrOfDaysChildcareMonth*HourlyFeeChildCare*12",
      "index": 100372,
      "name": "KSP_ChildCareCosts_value",
      "parsed": "a100128('100128',x,y,z,v)*a100134('100134',x,y,z,v)*12",
      "id": 100372,
      "fflname": "ChildCareCosts_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ChildCareCosts_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Childcare costs'",
      "index": 100373,
      "name": "KSP_ChildCareCosts_title",
      "parsed": "'Childcare costs'",
      "id": 100373,
      "fflname": "ChildCareCosts_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_PARAGRAAF09_value": true,
        "KSP_Q_MAP06_ENTEREDREQUIREDVARS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP06_ENTEREDREQUIREDVARS_value",
          "association": "refs",
          "refId": 100394
        }
      ],
      "deps": {},
      "original": "undefined",
      "index": 100374,
      "name": "KSP_Q_MAP06_PARAGRAAF09_value",
      "parsed": "undefined",
      "id": 100374,
      "fflname": "Q_MAP06_PARAGRAAF09_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_PARAGRAAF09_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Eigenschappen van de stap'",
      "index": 100375,
      "name": "KSP_Q_MAP06_PARAGRAAF09_title",
      "parsed": "'Eigenschappen van de stap'",
      "id": 100375,
      "fflname": "Q_MAP06_PARAGRAAF09_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_Q_MAP06_PARAGRAAF09_visible": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP06_visible",
          "association": "deps",
          "refId": 100299
        },
        {
          "name": "KSP_DEBUG_value",
          "association": "deps",
          "refId": 100173
        }
      ],
      "deps": {
        "KSP_Q_MAP06_visible": true,
        "KSP_DEBUG_value": true
      },
      "original": "Q_MAP06.visible&&DEBUG==1",
      "index": 100376,
      "name": "KSP_Q_MAP06_PARAGRAAF09_visible",
      "parsed": "a100299('100299',x,y.base,z,v)&&a100173('100173',x,y.base,z,v)==1",
      "id": 100376,
      "fflname": "Q_MAP06_PARAGRAAF09_visible"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_STATUS_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP06_value",
          "association": "deps",
          "refId": 100297
        }
      ],
      "deps": {
        "KSP_Q_MAP06_value": true
      },
      "original": "Q_MAP06",
      "index": 100377,
      "name": "KSP_Q_MAP06_STATUS_value",
      "parsed": "a100297('100297',x,y.base,z,v)",
      "id": 100377,
      "fflname": "Q_MAP06_STATUS_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_STATUS_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Status van de stap'",
      "index": 100378,
      "name": "KSP_Q_MAP06_STATUS_title",
      "parsed": "'Status van de stap'",
      "id": 100378,
      "fflname": "Q_MAP06_STATUS_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_PARAGRAAF09SUB2_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100379,
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB2_value",
      "parsed": "undefined",
      "id": 100379,
      "fflname": "Q_MAP06_PARAGRAAF09SUB2_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_PARAGRAAF09SUB2_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Warning voor map 6'",
      "index": 100380,
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB2_title",
      "parsed": "'Warning voor map 6'",
      "id": 100380,
      "fflname": "Q_MAP06_PARAGRAAF09SUB2_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_PARAGRAAF09SUB3_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100381,
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB3_value",
      "parsed": "undefined",
      "id": 100381,
      "fflname": "Q_MAP06_PARAGRAAF09SUB3_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_PARAGRAAF09SUB3_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Info bij stap 6'",
      "index": 100382,
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB3_title",
      "parsed": "'Info bij stap 6'",
      "id": 100382,
      "fflname": "Q_MAP06_PARAGRAAF09SUB3_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_PARAGRAAF09SUB4_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100383,
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB4_value",
      "parsed": "undefined",
      "id": 100383,
      "fflname": "Q_MAP06_PARAGRAAF09SUB4_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_PARAGRAAF09SUB4_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Validatie stap 6'",
      "index": 100384,
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB4_title",
      "parsed": "'Validatie stap 6'",
      "id": 100384,
      "fflname": "Q_MAP06_PARAGRAAF09SUB4_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_PARAGRAAF09SUB5_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100385,
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB5_value",
      "parsed": "undefined",
      "id": 100385,
      "fflname": "Q_MAP06_PARAGRAAF09SUB5_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_PARAGRAAF09SUB5_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Aantal verplichte velden (1)'",
      "index": 100386,
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB5_title",
      "parsed": "'Aantal verplichte velden (1)'",
      "id": 100386,
      "fflname": "Q_MAP06_PARAGRAAF09SUB5_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_PARAGRAAF09SUB6_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100387,
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB6_value",
      "parsed": "undefined",
      "id": 100387,
      "fflname": "Q_MAP06_PARAGRAAF09SUB6_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_PARAGRAAF09SUB6_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Aantal ingevulde verplichte velden (1)'",
      "index": 100388,
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB6_title",
      "parsed": "'Aantal ingevulde verplichte velden (1)'",
      "id": 100388,
      "fflname": "Q_MAP06_PARAGRAAF09SUB6_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_HULPVARIABELEN_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100389,
      "name": "KSP_Q_MAP06_HULPVARIABELEN_value",
      "parsed": "undefined",
      "id": 100389,
      "fflname": "Q_MAP06_HULPVARIABELEN_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_HULPVARIABELEN_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Hulpvariabelen'",
      "index": 100390,
      "name": "KSP_Q_MAP06_HULPVARIABELEN_title",
      "parsed": "'Hulpvariabelen'",
      "id": 100390,
      "fflname": "Q_MAP06_HULPVARIABELEN_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_Q_MAP06_HULPVARIABELEN_visible": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP06_visible",
          "association": "deps",
          "refId": 100299
        }
      ],
      "deps": {
        "KSP_Q_MAP06_visible": true
      },
      "original": "Q_MAP06.visible&&0",
      "index": 100391,
      "name": "KSP_Q_MAP06_HULPVARIABELEN_visible",
      "parsed": "a100299('100299',x,y.base,z,v)&&0",
      "id": 100391,
      "fflname": "Q_MAP06_HULPVARIABELEN_visible"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_REQUIREDVARS_value": true,
        "KSP_Q_MAP06_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP06_value",
          "association": "refs",
          "refId": 100297
        },
        {
          "name": "KSP_Q_MAP06_WARNING_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP06_INFO_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP06_VALIDATION_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP06_HINT_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP06SUB5_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP06_PARAGRAAF09_required",
          "association": "deps"
        }
      ],
      "deps": {
        "KSP_Q_MAP06_WARNING_required": true,
        "KSP_Q_MAP06_INFO_required": true,
        "KSP_Q_MAP06_VALIDATION_required": true,
        "KSP_Q_MAP06_HINT_required": true,
        "KSP_Q_MAP06SUB5_required": true,
        "KSP_Q_MAP06_PARAGRAAF09_required": true
      },
      "original": "Count(X,SelectDescendants(Q_MAP06,Q_MAP06_HULPVARIABELEN),InputRequired(X))",
      "index": 100392,
      "name": "KSP_Q_MAP06_REQUIREDVARS_value",
      "parsed": "Count([false,false,false,false,false,false])",
      "id": 100392,
      "fflname": "Q_MAP06_REQUIREDVARS_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_REQUIREDVARS_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Aantal verplichte velden (1)'",
      "index": 100393,
      "name": "KSP_Q_MAP06_REQUIREDVARS_title",
      "parsed": "'Aantal verplichte velden (1)'",
      "id": 100393,
      "fflname": "Q_MAP06_REQUIREDVARS_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_ENTEREDREQUIREDVARS_value": true,
        "KSP_Q_MAP06_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP06_value",
          "association": "refs",
          "refId": 100297
        },
        {
          "name": "KSP_Q_MAP06_WARNING_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP06_WARNING_value",
          "association": "deps",
          "refId": 100300
        },
        {
          "name": "KSP_Q_MAP06_INFO_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP06_INFO_value",
          "association": "deps",
          "refId": 100302
        },
        {
          "name": "KSP_Q_MAP06_VALIDATION_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP06_VALIDATION_value",
          "association": "deps",
          "refId": 100304
        },
        {
          "name": "KSP_Q_MAP06_HINT_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP06_HINT_value",
          "association": "deps",
          "refId": 100306
        },
        {
          "name": "KSP_Q_MAP06SUB5_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP06SUB5_value",
          "association": "deps",
          "refId": 100309
        },
        {
          "name": "KSP_Q_MAP06_PARAGRAAF09_required",
          "association": "deps"
        },
        {
          "name": "KSP_Q_MAP06_PARAGRAAF09_value",
          "association": "deps",
          "refId": 100374
        }
      ],
      "deps": {
        "KSP_Q_MAP06_WARNING_required": true,
        "KSP_Q_MAP06_WARNING_value": true,
        "KSP_Q_MAP06_INFO_required": true,
        "KSP_Q_MAP06_INFO_value": true,
        "KSP_Q_MAP06_VALIDATION_required": true,
        "KSP_Q_MAP06_VALIDATION_value": true,
        "KSP_Q_MAP06_HINT_required": true,
        "KSP_Q_MAP06_HINT_value": true,
        "KSP_Q_MAP06SUB5_required": true,
        "KSP_Q_MAP06SUB5_value": true,
        "KSP_Q_MAP06_PARAGRAAF09_required": true,
        "KSP_Q_MAP06_PARAGRAAF09_value": true
      },
      "original": "Count(X,SelectDescendants(Q_MAP06,Q_MAP06_HULPVARIABELEN),InputRequired(X)&&DataAvailable(X))",
      "index": 100394,
      "name": "KSP_Q_MAP06_ENTEREDREQUIREDVARS_value",
      "parsed": "Count([false&&v[100300][x.hash + y.hash + z]!==undefined,false&&v[100302][x.hash + y.hash + z]!==undefined,false&&v[100304][x.hash + y.hash + z]!==undefined,false&&v[100306][x.hash + y.hash + z]!==undefined,false&&v[100309][x.hash + y.hash + z]!==undefined,false&&v[100374][x.hash + y.hash + z]!==undefined])",
      "id": 100394,
      "fflname": "Q_MAP06_ENTEREDREQUIREDVARS_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAP06_ENTEREDREQUIREDVARS_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Aantal ingevulde verplichte velden (1)'",
      "index": 100395,
      "name": "KSP_Q_MAP06_ENTEREDREQUIREDVARS_title",
      "parsed": "'Aantal ingevulde verplichte velden (1)'",
      "id": 100395,
      "fflname": "Q_MAP06_ENTEREDREQUIREDVARS_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_RESULT_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_ROOT_value",
          "association": "deps",
          "refId": 100075
        },
        {
          "name": "KSP_Q_RESTRICTIES_value",
          "association": "deps",
          "refId": 100443
        },
        {
          "name": "KSP_Q_WARNING_GLOBAL_value",
          "association": "deps",
          "refId": 100437
        }
      ],
      "deps": {
        "KSP_Q_ROOT_value": true,
        "KSP_Q_RESTRICTIES_value": true,
        "KSP_Q_WARNING_GLOBAL_value": true
      },
      "original": "String(If(Q_ROOT[doc]==0,'Nog niet alle vragen zijn ingevuld.[br][/br]','Deze vragenlijst is definitief gemaakt.[br][/br]')+Q_RESTRICTIES[doc]+Q_WARNING_GLOBAL[doc])",
      "index": 100396,
      "name": "KSP_Q_RESULT_value",
      "parsed": "String((a100075('100075',x.doc,y.base,z,v)==0?'Nog niet alle vragen zijn ingevuld.[br][/br]':'Deze vragenlijst is definitief gemaakt.[br][/br]')+a100443('100443',x.doc,y.base,z,v)+a100437('100437',x.doc,y.base,z,v))",
      "id": 100396,
      "fflname": "Q_RESULT_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_RESULT_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Resultaat'",
      "index": 100397,
      "name": "KSP_Q_RESULT_title",
      "parsed": "'Resultaat'",
      "id": 100397,
      "fflname": "Q_RESULT_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_RESULTSUB1_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100398,
      "name": "KSP_Q_RESULTSUB1_value",
      "parsed": "undefined",
      "id": 100398,
      "fflname": "Q_RESULTSUB1_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_RESULTSUB1_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Resultaat'",
      "index": 100399,
      "name": "KSP_Q_RESULTSUB1_title",
      "parsed": "'Resultaat'",
      "id": 100399,
      "fflname": "Q_RESULTSUB1_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_STATUS_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "0",
      "index": 100400,
      "name": "KSP_Q_STATUS_value",
      "parsed": "0",
      "id": 100400,
      "fflname": "Q_STATUS_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_STATUS_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Status'",
      "index": 100401,
      "name": "KSP_Q_STATUS_title",
      "parsed": "'Status'",
      "id": 100401,
      "fflname": "Q_STATUS_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_Q_STATUS_choices": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "[{'name':' 0','value':'Actief'},{'name':'1','value':'Defintief'}]",
      "index": 100402,
      "name": "KSP_Q_STATUS_choices",
      "parsed": "[{'name':' 0','value':'Actief'},{'name':'1','value':'Defintief'}]",
      "id": 100402,
      "fflname": "Q_STATUS_choices"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_STATUS_FINAL_ON_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100403,
      "name": "KSP_Q_STATUS_FINAL_ON_value",
      "parsed": "undefined",
      "id": 100403,
      "fflname": "Q_STATUS_FINAL_ON_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_STATUS_FINAL_ON_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Definitief gemaakt op'",
      "index": 100404,
      "name": "KSP_Q_STATUS_FINAL_ON_title",
      "parsed": "'Definitief gemaakt op'",
      "id": 100404,
      "fflname": "Q_STATUS_FINAL_ON_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_STATUS_FINAL_BY_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100405,
      "name": "KSP_Q_STATUS_FINAL_BY_value",
      "parsed": "undefined",
      "id": 100405,
      "fflname": "Q_STATUS_FINAL_BY_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_STATUS_FINAL_BY_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Definitief gemaakt door (gebruikersnaam)'",
      "index": 100406,
      "name": "KSP_Q_STATUS_FINAL_BY_title",
      "parsed": "'Definitief gemaakt door (gebruikersnaam)'",
      "id": 100406,
      "fflname": "Q_STATUS_FINAL_BY_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_STATUS_FINAL_BY_NAME_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100407,
      "name": "KSP_Q_STATUS_FINAL_BY_NAME_value",
      "parsed": "undefined",
      "id": 100407,
      "fflname": "Q_STATUS_FINAL_BY_NAME_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_STATUS_FINAL_BY_NAME_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Definitief gemaakt door (volledige naam)'",
      "index": 100408,
      "name": "KSP_Q_STATUS_FINAL_BY_NAME_title",
      "parsed": "'Definitief gemaakt door (volledige naam)'",
      "id": 100408,
      "fflname": "Q_STATUS_FINAL_BY_NAME_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_STATUS_STARTED_ON_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100409,
      "name": "KSP_Q_STATUS_STARTED_ON_value",
      "parsed": "undefined",
      "id": 100409,
      "fflname": "Q_STATUS_STARTED_ON_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_STATUS_STARTED_ON_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Aangemaakt op'",
      "index": 100410,
      "name": "KSP_Q_STATUS_STARTED_ON_title",
      "parsed": "'Aangemaakt op'",
      "id": 100410,
      "fflname": "Q_STATUS_STARTED_ON_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_STATUS_STARTED_BY_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100411,
      "name": "KSP_Q_STATUS_STARTED_BY_value",
      "parsed": "undefined",
      "id": 100411,
      "fflname": "Q_STATUS_STARTED_BY_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_STATUS_STARTED_BY_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Aangemaakt door (gebruikersnaam)'",
      "index": 100412,
      "name": "KSP_Q_STATUS_STARTED_BY_title",
      "parsed": "'Aangemaakt door (gebruikersnaam)'",
      "id": 100412,
      "fflname": "Q_STATUS_STARTED_BY_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_STATUS_STARTED_BY_NAME_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100413,
      "name": "KSP_Q_STATUS_STARTED_BY_NAME_value",
      "parsed": "undefined",
      "id": 100413,
      "fflname": "Q_STATUS_STARTED_BY_NAME_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_STATUS_STARTED_BY_NAME_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Aangemaakt door (volledige naam)'",
      "index": 100414,
      "name": "KSP_Q_STATUS_STARTED_BY_NAME_title",
      "parsed": "'Aangemaakt door (volledige naam)'",
      "id": 100414,
      "fflname": "Q_STATUS_STARTED_BY_NAME_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ModelVersion_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'01.27.000.000'",
      "index": 100415,
      "name": "KSP_ModelVersion_value",
      "parsed": "'01.27.000.000'",
      "id": 100415,
      "fflname": "ModelVersion_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ModelVersion_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Modelversie'",
      "index": 100416,
      "name": "KSP_ModelVersion_title",
      "parsed": "'Modelversie'",
      "id": 100416,
      "fflname": "ModelVersion_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ModelType_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'TEST'",
      "index": 100417,
      "name": "KSP_ModelType_value",
      "parsed": "'TEST'",
      "id": 100417,
      "fflname": "ModelType_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_ModelType_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Modeltype'",
      "index": 100418,
      "name": "KSP_ModelType_title",
      "parsed": "'Modeltype'",
      "id": 100418,
      "fflname": "ModelType_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MatrixVersion_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'None'",
      "index": 100419,
      "name": "KSP_MatrixVersion_value",
      "parsed": "'None'",
      "id": 100419,
      "fflname": "MatrixVersion_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_MatrixVersion_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Parametersversie'",
      "index": 100420,
      "name": "KSP_MatrixVersion_title",
      "parsed": "'Parametersversie'",
      "id": 100420,
      "fflname": "MatrixVersion_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_MatrixVersion_hint": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Bij het definitief maken wordt de waarde vastgezet.'",
      "index": 100421,
      "name": "KSP_MatrixVersion_hint",
      "parsed": "'Bij het definitief maken wordt de waarde vastgezet.'",
      "id": 100421,
      "fflname": "MatrixVersion_hint"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_PREVIOUS_BUTTON_VISIBLE_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "2",
      "index": 100422,
      "name": "KSP_Q_PREVIOUS_BUTTON_VISIBLE_value",
      "parsed": "2",
      "id": 100422,
      "fflname": "Q_PREVIOUS_BUTTON_VISIBLE_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_PREVIOUS_BUTTON_VISIBLE_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Vorige'",
      "index": 100423,
      "name": "KSP_Q_PREVIOUS_BUTTON_VISIBLE_title",
      "parsed": "'Vorige'",
      "id": 100423,
      "fflname": "Q_PREVIOUS_BUTTON_VISIBLE_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_Q_PREVIOUS_BUTTON_VISIBLE_choices": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "[{'name':' 0','value':'Nooit'},{'name':'2','value':'Altijd'}]",
      "index": 100424,
      "name": "KSP_Q_PREVIOUS_BUTTON_VISIBLE_choices",
      "parsed": "[{'name':' 0','value':'Nooit'},{'name':'2','value':'Altijd'}]",
      "id": 100424,
      "fflname": "Q_PREVIOUS_BUTTON_VISIBLE_choices"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_NEXT_BUTTON_VISIBLE_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "2",
      "index": 100425,
      "name": "KSP_Q_NEXT_BUTTON_VISIBLE_value",
      "parsed": "2",
      "id": 100425,
      "fflname": "Q_NEXT_BUTTON_VISIBLE_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_NEXT_BUTTON_VISIBLE_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Volgende'",
      "index": 100426,
      "name": "KSP_Q_NEXT_BUTTON_VISIBLE_title",
      "parsed": "'Volgende'",
      "id": 100426,
      "fflname": "Q_NEXT_BUTTON_VISIBLE_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_Q_NEXT_BUTTON_VISIBLE_choices": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "[{'name':' 0','value':'Nooit'},{'name':'1','value':'Alleen wanneer stap volledig is'},{'name':'2','value':'Altijd'}]",
      "index": 100427,
      "name": "KSP_Q_NEXT_BUTTON_VISIBLE_choices",
      "parsed": "[{'name':' 0','value':'Nooit'},{'name':'1','value':'Alleen wanneer stap volledig is'},{'name':'2','value':'Altijd'}]",
      "id": 100427,
      "fflname": "Q_NEXT_BUTTON_VISIBLE_choices"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_CONCEPT_REPORT_VISIBLE_value": true,
        "KSP_HULPVARS_locked": true,
        "KSP_Q_WARNING_GLOBAL_locked": true,
        "KSP_Q_WARNING_01_locked": true,
        "KSP_Q_WARNING_GLOBALTXT_locked": true,
        "KSP_Q_RESTRICTIES_locked": true,
        "KSP_Q_RESTRICTIES_01_locked": true,
        "KSP_Q_RESTRICTIES_02_locked": true,
        "KSP_Q_RESTRICTIESTXT_locked": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "1",
      "index": 100428,
      "name": "KSP_Q_CONCEPT_REPORT_VISIBLE_value",
      "parsed": "1",
      "id": 100428,
      "fflname": "Q_CONCEPT_REPORT_VISIBLE_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_CONCEPT_REPORT_VISIBLE_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Concept rapport'",
      "index": 100429,
      "name": "KSP_Q_CONCEPT_REPORT_VISIBLE_title",
      "parsed": "'Concept rapport'",
      "id": 100429,
      "fflname": "Q_CONCEPT_REPORT_VISIBLE_title"
    },
    {
      "type": "noCacheLocked",
      "refs": {
        "KSP_Q_CONCEPT_REPORT_VISIBLE_choices": true,
        "KSP_Q_MAKE_FINAL_VISIBLE_choices": true,
        "KSP_Q_FINAL_REPORT_VISIBLE_choices": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "[{'name':' 0','value':'Nee'},{'name':'1','value':'Ja'}]",
      "index": 100430,
      "name": "KSP_Q_CONCEPT_REPORT_VISIBLE_choices",
      "parsed": "[{'name':' 0','value':'Nee'},{'name':'1','value':'Ja'}]",
      "id": 100430,
      "fflname": "Q_CONCEPT_REPORT_VISIBLE_choices"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAKE_FINAL_VISIBLE_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "0",
      "index": 100431,
      "name": "KSP_Q_MAKE_FINAL_VISIBLE_value",
      "parsed": "0",
      "id": 100431,
      "fflname": "Q_MAKE_FINAL_VISIBLE_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_MAKE_FINAL_VISIBLE_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Definitief maken'",
      "index": 100432,
      "name": "KSP_Q_MAKE_FINAL_VISIBLE_title",
      "parsed": "'Definitief maken'",
      "id": 100432,
      "fflname": "Q_MAKE_FINAL_VISIBLE_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_FINAL_REPORT_VISIBLE_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "0",
      "index": 100433,
      "name": "KSP_Q_FINAL_REPORT_VISIBLE_value",
      "parsed": "0",
      "id": 100433,
      "fflname": "Q_FINAL_REPORT_VISIBLE_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_FINAL_REPORT_VISIBLE_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Definitief rapport'",
      "index": 100434,
      "name": "KSP_Q_FINAL_REPORT_VISIBLE_title",
      "parsed": "'Definitief rapport'",
      "id": 100434,
      "fflname": "Q_FINAL_REPORT_VISIBLE_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_HULPVARS_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100435,
      "name": "KSP_HULPVARS_value",
      "parsed": "undefined",
      "id": 100435,
      "fflname": "HULPVARS_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_HULPVARS_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Hulpvariabelen'",
      "index": 100436,
      "name": "KSP_HULPVARS_title",
      "parsed": "'Hulpvariabelen'",
      "id": 100436,
      "fflname": "HULPVARS_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_WARNING_GLOBAL_value": true,
        "KSP_Q_MAP01_WARNING_value": true,
        "KSP_Q_MAP02_WARNING_value": true,
        "KSP_Q_MAP06_WARNING_value": true,
        "KSP_Q_RESULT_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP01_WARNING_value",
          "association": "refs",
          "refId": 100097
        },
        {
          "name": "KSP_Q_MAP02_WARNING_value",
          "association": "refs",
          "refId": 100178
        },
        {
          "name": "KSP_Q_MAP06_WARNING_value",
          "association": "refs",
          "refId": 100300
        },
        {
          "name": "KSP_Q_RESULT_value",
          "association": "refs",
          "refId": 100396
        },
        {
          "name": "KSP_Q_WARNING_GLOBALTXT_value",
          "association": "deps",
          "refId": 100441
        }
      ],
      "deps": {
        "KSP_Q_WARNING_GLOBALTXT_value": true
      },
      "original": "String(If(Length(Q_WARNING_GLOBALTXT[doc])>0,'[br][/br]Er zijn knockouts van toepassing'+Q_WARNING_GLOBALTXT,''))",
      "index": 100437,
      "name": "KSP_Q_WARNING_GLOBAL_value",
      "parsed": "String(Length(a100441('100441',x.doc,y.base,z,v))>0?'[br][/br]Er zijn knockouts van toepassing'+a100441('100441',x,y.base,z,v):'')",
      "id": 100437,
      "fflname": "Q_WARNING_GLOBAL_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_WARNING_GLOBAL_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Knock-out(s)'",
      "index": 100438,
      "name": "KSP_Q_WARNING_GLOBAL_title",
      "parsed": "'Knock-out(s)'",
      "id": 100438,
      "fflname": "Q_WARNING_GLOBAL_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_WARNING_01_value": true,
        "KSP_Q_WARNING_GLOBALTXT_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_WARNING_GLOBALTXT_value",
          "association": "refs",
          "refId": 100441
        }
      ],
      "deps": {},
      "original": "String('')",
      "index": 100439,
      "name": "KSP_Q_WARNING_01_value",
      "parsed": "String('')",
      "id": 100439,
      "fflname": "Q_WARNING_01_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_WARNING_01_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Map6 - Vraag 6'",
      "index": 100440,
      "name": "KSP_Q_WARNING_01_title",
      "parsed": "'Map6 - Vraag 6'",
      "id": 100440,
      "fflname": "Q_WARNING_01_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_WARNING_GLOBALTXT_value": true,
        "KSP_Q_ROOT_value": true,
        "KSP_Q_WARNING_GLOBAL_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_ROOT_value",
          "association": "refs",
          "refId": 100075
        },
        {
          "name": "KSP_Q_WARNING_GLOBAL_value",
          "association": "refs",
          "refId": 100437
        },
        {
          "name": "KSP_Q_WARNING_01_value",
          "association": "deps",
          "refId": 100439
        }
      ],
      "deps": {
        "KSP_Q_WARNING_01_value": true
      },
      "original": "String(If(Length(Q_WARNING_01[doc])>0,'[br][/br]'+Q_WARNING_01[doc],''))",
      "index": 100441,
      "name": "KSP_Q_WARNING_GLOBALTXT_value",
      "parsed": "String(Length(a100439('100439',x.doc,y.base,z,v))>0?'[br][/br]'+a100439('100439',x.doc,y.base,z,v):'')",
      "id": 100441,
      "fflname": "Q_WARNING_GLOBALTXT_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_WARNING_GLOBALTXT_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Knock-out tekst'",
      "index": 100442,
      "name": "KSP_Q_WARNING_GLOBALTXT_title",
      "parsed": "'Knock-out tekst'",
      "id": 100442,
      "fflname": "Q_WARNING_GLOBALTXT_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_RESTRICTIES_value": true,
        "KSP_Q_MAP01_WARNING_value": true,
        "KSP_Q_MAP02_WARNING_value": true,
        "KSP_Q_MAP06_WARNING_value": true,
        "KSP_Q_RESULT_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_MAP01_WARNING_value",
          "association": "refs",
          "refId": 100097
        },
        {
          "name": "KSP_Q_MAP02_WARNING_value",
          "association": "refs",
          "refId": 100178
        },
        {
          "name": "KSP_Q_MAP06_WARNING_value",
          "association": "refs",
          "refId": 100300
        },
        {
          "name": "KSP_Q_RESULT_value",
          "association": "refs",
          "refId": 100396
        },
        {
          "name": "KSP_Q_RESTRICTIESTXT_value",
          "association": "deps",
          "refId": 100447
        }
      ],
      "deps": {
        "KSP_Q_RESTRICTIESTXT_value": true
      },
      "original": "String(If(Length(Q_RESTRICTIESTXT[doc])>0,'[br][/br]De volgende variabelen zijn niet correct gevuld'+Q_RESTRICTIESTXT,''))",
      "index": 100443,
      "name": "KSP_Q_RESTRICTIES_value",
      "parsed": "String(Length(a100447('100447',x.doc,y.base,z,v))>0?'[br][/br]De volgende variabelen zijn niet correct gevuld'+a100447('100447',x,y.base,z,v):'')",
      "id": 100443,
      "fflname": "Q_RESTRICTIES_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_RESTRICTIES_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Restricties'",
      "index": 100444,
      "name": "KSP_Q_RESTRICTIES_title",
      "parsed": "'Restricties'",
      "id": 100444,
      "fflname": "Q_RESTRICTIES_title"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_RESTRICTIES_01_value": true,
        "KSP_Q_RESTRICTIESTXT_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_RESTRICTIESTXT_value",
          "association": "refs",
          "refId": 100447
        }
      ],
      "deps": {},
      "original": "String('')",
      "index": 100445,
      "name": "KSP_Q_RESTRICTIES_01_value",
      "parsed": "String('')",
      "id": 100445,
      "fflname": "Q_RESTRICTIES_01_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_RESTRICTIES_02_value": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "undefined",
      "index": 100446,
      "name": "KSP_Q_RESTRICTIES_02_value",
      "parsed": "undefined",
      "id": 100446,
      "fflname": "Q_RESTRICTIES_02_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_RESTRICTIESTXT_value": true,
        "KSP_Q_RESTRICTIES_value": true
      },
      "formulaDependencys": [
        {
          "name": "KSP_Q_RESTRICTIES_value",
          "association": "refs",
          "refId": 100443
        },
        {
          "name": "KSP_Q_RESTRICTIES_01_value",
          "association": "deps",
          "refId": 100445
        }
      ],
      "deps": {
        "KSP_Q_RESTRICTIES_01_value": true
      },
      "original": "String(If(Length(Q_RESTRICTIES_01[doc])>0,'[br][/br]'+Q_RESTRICTIES_01[doc],''))",
      "index": 100447,
      "name": "KSP_Q_RESTRICTIESTXT_value",
      "parsed": "String(Length(a100445('100445',x.doc,y.base,z,v))>0?'[br][/br]'+a100445('100445',x.doc,y.base,z,v):'')",
      "id": 100447,
      "fflname": "Q_RESTRICTIESTXT_value"
    },
    {
      "type": "noCacheUnlocked",
      "refs": {
        "KSP_Q_RESTRICTIESTXT_title": true
      },
      "formulaDependencys": [],
      "deps": {},
      "original": "'Restricties tekst'",
      "index": 100448,
      "name": "KSP_Q_RESTRICTIESTXT_title",
      "parsed": "'Restricties tekst'",
      "id": 100448,
      "fflname": "Q_RESTRICTIESTXT_title"
    }
  ],
  "data": [
    [
      "RootSub1",
      "'General variables for webclient'",
      "undefined",
      "",
      "",
      "0",
      "1",
      null,
      ""
    ],
    [
      "FES_LAYOUTNR",
      "'Layout'",
      "If(Pos('IFRS-EU',FES_LAYOUT[doc])>0,1,If(Pos('IFRS-PL',FES_LAYOUT[doc])>0,48,If(Pos('IFRS-Intl',FES_LAYOUT[doc])>0,2,0)))",
      "",
      "",
      false,
      false,
      "[{'name':' 0','value':' NA'},{'name':'1','value':' IFRS-EU'},{'name':'2','value':' IFRS'},{'name':'48','value':' Polish'}]",
      ""
    ],
    [
      "FES_EXCHANGE_RATES",
      "'Exchange Rates'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FES_LAYOUT",
      "'Layout name'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FES_FLATINPUT",
      "'Is flat input used (1==yes)'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FES_PROJECTION_PROFILE",
      "'Projection Profile'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FES_COLUMN_ORDER",
      "'Column order'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FES_COLUMN_VISIBLE",
      "'Column visible'",
      "1",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FES_STARTDATEPERIOD",
      "'Start Date Period'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FES_ENDDATEPERIOD",
      "'End Date Period'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FES_BASECURRENCYPERIOD",
      "'Base Currency Period'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FES_VIEWCURRENCYPERIOD",
      "'View Currency Period'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FES_COLUMNTYPE",
      "'Column Type'",
      "undefined",
      "",
      "",
      false,
      false,
      "[{'name':' 0','value':'History'},{'name':'1','value':'Projection'}]",
      ""
    ],
    [
      "RootSub2",
      "'General variables for FPS database'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FPS_VAR_Naam",
      "'NAME'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FPS_VAR_Relatienummer",
      "'CUSTOMERNUMBER'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FPS_VAR_KVKnr",
      "'CHAMBEROFCOMMERCENUMBER'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FPS_VAR_Rechtsvorm_nr",
      "'LEGALSTATUSCODE'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FPS_VAR_Rechtsvorm_omschr",
      "'LEGALSTATUSDESCRIPTION'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FPS_VAR_BIK_CODE",
      "'SECTOROFINDUSTRYCODE'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FPS_VAR_BIK_Omschr",
      "'SECTOROFINDUSTRYDESCRIPTION'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FPS_VAR_GridId",
      "'GRIDID'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FPS_VAR_Accountmanager",
      "'ACCOUNTMANAGER'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FPS_VAR_Kantoor",
      "'OFFICENUMBER'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FPS_VAR_Straat",
      "'STREET'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FPS_VAR_Housenumber",
      "'HOUSENUMBER'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FPS_VAR_Postcode",
      "'ZIPCODE'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FPS_VAR_Woonplaats",
      "'CITY'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FPS_VAR_Provincie",
      "'STATEORPROVINCE'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FPS_VAR_Land",
      "'COUNTRY'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FPS_VAR_BvDID",
      "'Bureau van Dijk ID'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FPS_VAR_Telefoon",
      "'Telefoonnummer'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FPS_VAR_Emailadres",
      "'Emailadres'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FPS_FINAN_USER_ROLES",
      "'FPS_FINAN_USER_ROLES'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FPS_FINAN_USER",
      "'FPS_FINAN_USER'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_ROOT",
      "'Costs of child raising (v1.27)'",
      "If(Q_MAP01[doc]==1||Length(Q_WARNING_GLOBALTXT[doc])>0,1,0)",
      "",
      "",
      false,
      false,
      "[{'name':' 0','value':'Complete'},{'name':'1','value':'Incomplete'}]",
      "'This module enables you to gain insight in the costs involved for raising a child'"
    ],
    [
      "Q_MAP00",
      "'Intro'",
      "1",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP00_WARNING",
      "'Warning voor map 1'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP00_TEST",
      "'Warning voor map 1'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP00_INFO",
      "'Info bij stap 1'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP00_VALIDATION",
      "'Validatie stap 1'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP00_HINT",
      "'Hinttekst stap 1'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP00_INTRO",
      "'Intro'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP00_INTROMEMO",
      "'[b]Intro[/b]'",
      "'Why do we use it\\r\\n\\r\\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages&&web page editors now use Lorem Ipsum as their default model text,&&a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour&&the like).\\r\\n\\r\\n\\r\\nWhy do we use it\\r\\n\\r\\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages&&web page editors now use Lorem Ipsum as their default model text,&&a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour&&the like).'",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP01",
      "'Basic Information'",
      "Q_MAP01_ENTEREDREQUIREDVARS==Q_MAP01_REQUIREDVARS",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP01_WARNING",
      "'Warning voor map 1'",
      "String(Q_RESTRICTIES[doc]+Q_WARNING_GLOBAL[doc])",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP01_INFO",
      "'Info bij stap 1'",
      "String(If(Q_MAP01[doc]==0,'Nog niet alle verplichte vragen zijn ingevuld.',''))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP01_VALIDATION",
      "'Validatie stap 1'",
      "String(If(Q_MAP01[doc]==0,'Er zijn '+Str(Q_MAP01_ENTEREDREQUIREDVARS,0,0)+' van de '+Str(Q_MAP01_REQUIREDVARS,0,0)+' verplichte vragen in deze stap ingevuld.',''))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP01_HINT",
      "'Hinttekst stap 1'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      "'Dit is de hinttekst van de variable Q_MAP01_HINT (DEZE REGEL WORDT NIET GEBRUIKT!)'"
    ],
    [
      "Situation",
      "'Situation'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "IncomeSection",
      "'[b]Income[/b]'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "IncomeParent01",
      "'Gross Income Parent 1'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "IncomeParent02",
      "'Gross Income Parent 2'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "WorkingHoursWeeklyParent01",
      "'Working hours parent 1'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "WorkingHoursWeeklyParent02",
      "'Working hours parent 2'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "WorkingHoursWeeklyOfLeastWorkingParent",
      "'Working hours (weekly) of least working Parent'",
      "Min(WorkingHoursWeeklyParent01,WorkingHoursWeeklyParent02)",
      "",
      "",
      false,
      false,
      null,
      "'Here, you have to enter the number of hours (on weekly basis) of the parent who has the smallest employment contract. This data is required to determine the maximum nr. of hours per month for childcare for which a public contribution can be claimed'"
    ],
    [
      "Child",
      "'Child'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "ChildGender",
      "'Gender'",
      "undefined",
      "",
      "",
      false,
      false,
      "[{'name':' 0','value':'Boy'},{'name':'1','value':'Girl'}]",
      ""
    ],
    [
      "NrOfDaysChildcareWeek",
      "'Nr. of days childcare per week'",
      "NA",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "NrOfDaysChildcareMonth",
      "'Nr. of hours childcare per month'",
      "OnER(10.5*NrOfDaysChildcareWeek[doc]*4,NA)",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "NrOfDaysOutOfSchoolCareWeek",
      "'Nr. of days out-of-school care per week'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "NrOfDaysOutOfSchoolCareMonth",
      "'Nr. of hours out-of-school care per month'",
      "OnER(4*NrOfDaysOutOfSchoolCareWeek*4.5,NA)",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "HourlyFeeChildCare",
      "'Hourly fee childcare'",
      "6.8",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "HourlyFeeOutOfSchoolCare",
      "'Hourly fee out-of-school care'",
      "6.8",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "ParentalContributionPrimaryEducation",
      "'Parental contribution primary education'",
      "80",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "CostsUnspecified",
      "'Costs unspecified per month'",
      "180",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "SecondaryEducationProfile",
      "'secondary education (profile)'",
      "1",
      "",
      "",
      false,
      false,
      "[{'name':' 0','value':'VWO'},{'name':'1','value':'VMBO-MBO'},{'name':'2','value':'VMBO-HAVO'},{'name':'3','value':'HAVO'}]",
      ""
    ],
    [
      "TotalyYearlyCostsChild",
      "'Total (yearly) costs regarding child'",
      "Furniture+ActualChildCareCosts+ActualDiapers+ActualFood+ActualClothingCosts+ActualPersonalCareCosts+Hairdresser+Inventory+Allowance+Contributions+Transport+MobilePhone+DrivingLicense+CostsForOutOfSchoolCare+CostsForPrimaryEducation+CostsForSecondaryEducation+CostsUnspecifiedOverview",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "TupleSumTest",
      null,
      "TSUM(NrOfDaysChildcareWeek)",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Memo1",
      "'Toelichting'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP01_PARAGRAAF09",
      "'Eigenschappen van de stap'",
      "undefined",
      "",
      "",
      "Q_MAP01.visible&&DEBUG==1",
      false,
      null,
      ""
    ],
    [
      "Q_MAP01_STATUS",
      "'Status van de stap'",
      "Q_MAP01",
      "",
      "",
      false,
      false,
      "[{'name':' 0','value':'Deze stap is volledig ingevuld (vinkje aanwezig)'},{'name':'1','value':'Deze stap is NIET volledig ingevuld (geen vinkje aanwezig)'}]",
      ""
    ],
    [
      "Q_MAP01_PARAGRAAF09SUB2",
      "'Warning voor map 1'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP01_PARAGRAAF09SUB3",
      "'Info bij stap 1'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP01_PARAGRAAF09SUB4",
      "'Validatie stap 1'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP01_PARAGRAAF09SUB5",
      "'Aantal verplichte velden (1)'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP01_PARAGRAAF09SUB6",
      "'Aantal ingevulde verplichte velden (1)'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP01_HULPVARIABELEN",
      "'Hulpvariabelen'",
      "undefined",
      "",
      "",
      "Q_MAP01.visible&&0",
      false,
      null,
      ""
    ],
    [
      "Q_MAP01_REQUIREDVARS",
      "'Aantal verplichte velden (1)'",
      "Count(X,SelectDescendants(Q_MAP01,Q_MAP01_HULPVARIABELEN),InputRequired(X))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP01_ENTEREDREQUIREDVARS",
      "'Aantal ingevulde verplichte velden (1)'",
      "Count(X,SelectDescendants(Q_MAP01,Q_MAP01_HULPVARIABELEN),InputRequired(X)&&DataAvailable(X))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "DEBUG",
      "'Debug'",
      "If(Pos('Negro',Memo1[doc])>0,1,0)",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP02",
      "'Calculations Care'",
      "Q_MAP02_ENTEREDREQUIREDVARS==Q_MAP02_REQUIREDVARS",
      "",
      "",
      "Q_ROOT.visible&&DEBUG==1",
      false,
      null,
      ""
    ],
    [
      "Q_MAP02_WARNING",
      "'Warning voor map 2'",
      "String(Q_RESTRICTIES[doc]+Q_WARNING_GLOBAL[doc])",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP02_INFO",
      "'Info bij stap 2'",
      "String(If(Q_MAP02[doc]==0,'Nog niet alle verplichte vragen zijn ingevuld.',''))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP02_VALIDATION",
      "'Validatie stap 2'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP02_HINT",
      "'Hinttekst stap 2'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      "'Dit is de hinttekst van de variable Q_MAP02_HINT (DEZE REGEL WORDT NIET GEBRUIKT!)'"
    ],
    [
      "FiscalParameters",
      "'Fiscal parameters'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "ChildcareContribution",
      "'Childcare Contribution'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "MaximumNrOfHoursOfChildcareAllowancePerMonth",
      "'Maximum nr of hours of childcare allowance per month'",
      "230",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "MultiplierDaycare",
      "'Multiplier daycare'",
      "1.4",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "MultiplierOutOfSchoolCare",
      "'Multiplier out-of-school care'",
      ".7",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "MaxHourlyRateChildcare",
      "'Max. hourly rate childcare'",
      "7.18",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "MaxHourlyRateOutOfSchoolCare",
      "'Max. hourly rate out-of-school care'",
      "6.69",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "MaxHourlyRateGuestParent",
      "'Max. hourly rate guest parent'",
      "5.75",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "MaxHourlyRateGuestParentOutOfSchoolCare",
      "'Max. hourly rate guest parent out-of-school care'",
      "5.75",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "CombinationDiscount",
      "'Combination Discount'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "LowerBoundaryIncome",
      "'Lower boundary Income'",
      "4895",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Base",
      "'Base'",
      "1043",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "CombinationDiscountPercentage",
      "'Combination Discount Percentage'",
      ".06159",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "MaximumDiscount",
      "'Maximum Discount'",
      "2778",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "ChildRelatedBudget",
      "'Child-related budget'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "MaxBudgetOneToTwelveYears",
      "'Max Budget (1 - 12 yrs)'",
      "1142",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "MaxBudgetTwelveToFifteenYears",
      "'Max Budget (12 - 15 yrs)'",
      "1376",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "MaxBudgetSixteenToSeventeenYears",
      "'Max Budget (16 - 17 yrs)'",
      "1559",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "UpperBoundaryIncome",
      "'Upper boundary Income'",
      "20109",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "DecreasingPercentage",
      "'Decreasing Percentage'",
      ".0675",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Fees",
      "'Fees'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "MaxNrCompensatedHoursChildcare",
      "'Max. nr of compensated hours childcare '",
      "OnER(Min(Round(WorkingHoursWeeklyOfLeastWorkingParent*MultiplierDaycare*(52/12),0),MaximumNrOfHoursOfChildcareAllowancePerMonth),NA)",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "MaxNrCompensatedHoursOutofSchoolCare",
      "'Max. nr of compensated hours out-of-school care '",
      "OnER(Min(Round(WorkingHoursWeeklyOfLeastWorkingParent*MultiplierOutOfSchoolCare*(52/12),0),MaximumNrOfHoursOfChildcareAllowancePerMonth),NA)",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FeesSub3",
      null,
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "NrCompensatedHoursChildcare",
      "'Nr. of compensated hours childcare '",
      "OnER(Min(NrOfDaysChildcareMonth,MaxNrCompensatedHoursChildcare),NA)",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "NrCompensatedHoursOutofSchoolCare",
      "'Nr. of compensated hours out-of-school care '",
      "OnER(Min(NrOfDaysOutOfSchoolCareMonth,MaxNrCompensatedHoursOutofSchoolCare),NA)",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FeesSub6",
      null,
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "MaxCompensatedAmountChildcare",
      "'Max. compensated amount childcare'",
      "OnER(Min(HourlyFeeChildCare,MaxHourlyRateChildcare),NA)",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "MaxCompensatedAmountOutofSchoolCare",
      "'Max. compensated amount out-of-school care '",
      "OnER(Min(HourlyFeeOutOfSchoolCare,MaxHourlyRateOutOfSchoolCare),NA)",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FeesSub9",
      null,
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "TotalIncome",
      "'Total Income'",
      "OnER(IncomeParent01+IncomeParent02,NA)",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "PercentagePremiumFirstChild",
      "'Percentage premium first child '",
      "MatrixLookup('ScorecardKSP.xls','Opvangtoeslaginkomenstabel',TotalIncome,1)",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "FeesSub12",
      null,
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "PremiumForChildcare",
      "'Premium for childcare'",
      "NrCompensatedHoursChildcare*MaxCompensatedAmountChildcare*PercentagePremiumFirstChild",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "PremiumForOutofSchoolCare",
      "'Premium for out-of-school care'",
      "NrCompensatedHoursOutofSchoolCare*MaxCompensatedAmountOutofSchoolCare*PercentagePremiumFirstChild",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "CostsSecondaryEducation",
      "'Costs (Secondary Education)'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "CostsYearOneFour",
      "'Costs year 1 - 4'",
      "Case(SecondaryEducationProfile,[0,576||1,906||2,535||3,535])",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "CostsYearFiveSixSeven",
      "'Costs year 5, 6, 7'",
      "Case(SecondaryEducationProfile,[0,576||1,906||2,535||3,535])",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP02SUB10",
      "'Budget'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP02SUB10SUB1",
      "'Income'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "ChildRelatedBudgetDecrease",
      "'Decrease'",
      "Max(0,DecreasingPercentage*(TotalIncome-UpperBoundaryIncome))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "ChildRelatedBudgetUpToTwelve",
      "'Childrelated budget (per month, up to yr 12)'",
      "Max(0,MaxBudgetOneToTwelveYears-ChildRelatedBudgetDecrease)/12",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "ChildRelatedBudgetTwelveUpToAndInclFifteen",
      "'Childrelated budget (per month, 12 up to&&incl yr 15)'",
      "Max(0,MaxBudgetTwelveToFifteenYears-ChildRelatedBudgetDecrease)/12",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "ChildRelatedBudgetSixteenUpToAndIncSeventeen",
      "'Childrelated budget (per month, 16 up to&&incl yr 17)'",
      "Max(0,MaxBudgetSixteenToSeventeenYears-ChildRelatedBudgetDecrease)/12",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP02SUB11",
      "'Combination Discount'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "CombinationDiscountLowestIncome",
      "'LowestIncome'",
      "Min(IncomeParent01,IncomeParent02)",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "CombinationDiscountTotal",
      "'CombinationDiscountTotal'",
      "If(CombinationDiscountLowestIncome>=LowerBoundaryIncome,Min(UpperBoundaryIncome,Base+CombinationDiscountPercentage*(CombinationDiscountLowestIncome-LowerBoundaryIncome)),0)",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP02_PARAGRAAF09",
      "'Eigenschappen van de stap'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP02_STATUS",
      "'Status van de stap'",
      "Q_MAP02",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP02_PARAGRAAF09SUB2",
      "'Warning voor map 2'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP02_PARAGRAAF09SUB3",
      null,
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP02_PARAGRAAF09SUB4",
      "'Validatie stap 2'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP02_PARAGRAAF09SUB5",
      "'Aantal verplichte velden (1)'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP02_PARAGRAAF09SUB6",
      "'Aantal ingevulde verplichte velden (1)'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP02_HULPVARIABELEN",
      "'Hulpvariabelen'",
      "undefined",
      "",
      "",
      "Q_MAP02.visible&&0",
      false,
      null,
      ""
    ],
    [
      "Q_MAP02_REQUIREDVARS",
      "'Aantal verplichte velden (1)'",
      "Count(X,SelectDescendants(Q_MAP02,Q_MAP02_HULPVARIABELEN),InputRequired(X))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP02_ENTEREDREQUIREDVARS",
      "'Aantal ingevulde verplichte velden (1)'",
      "Count(X,SelectDescendants(Q_MAP02,Q_MAP02_HULPVARIABELEN),InputRequired(X)&&DataAvailable(X))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP06",
      "'Your Personal situation'",
      "Q_MAP06_ENTEREDREQUIREDVARS==Q_MAP06_REQUIREDVARS",
      "",
      "",
      "Q_ROOT.visible&&Q_ROOT==1",
      false,
      null,
      ""
    ],
    [
      "Q_MAP06_WARNING",
      "'Warning voor map 6'",
      "String(Q_RESTRICTIES[doc]+Q_WARNING_GLOBAL[doc])",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP06_INFO",
      "'Info bij stap 6'",
      "String(If(Q_MAP06[doc]==0,'Nog niet alle verplichte vragen zijn ingevuld.',''))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP06_VALIDATION",
      "'Validatie stap 6'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP06_HINT",
      "'Hinttekst stap 6'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      "'Dit is de hinttekst van de variable Q_MAP06_HINT (DEZE REGEL WORDT NIET GEBRUIKT!)'"
    ],
    [
      "Q_MAP06SUB5",
      "'Your Personal Situation'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "GraphResRek1",
      "'Total Net Costs (-)'",
      "TotalYearlyBalance",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP06SUB5SUB2",
      "'Total (yearly) costs'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Age",
      "'Age'",
      "ValueT(T)-1",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "PeriodeInFormulaset",
      "'PeriodeInFormulaset'",
      "ValueT(T)",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Furniture",
      "'Furniture'",
      "If(ValueT(T)==1,1800,0)",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "ActualChildCareCosts",
      "'Childcare costs'",
      "If(ValueT(T)<=4,1,0)",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "ActualDiapers",
      "'Diapers'",
      "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','Diapers',ValueT(T))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "ActualFood",
      "'Food'",
      "If(ChildGender==0,MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','FoodCostsBoy',ValueT(T)),MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','FoodCostsGirl',ValueT(T)))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "ActualClothingCosts",
      "'Clothing'",
      "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','ClothingCosts',ValueT(T))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "ActualPersonalCareCosts",
      "'Personal care'",
      "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','PersonalCare',ValueT(T))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Hairdresser",
      "'Hairdresser'",
      "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','Hairdresser',ValueT(T))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Inventory",
      "'Inventory'",
      "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','Inventory',ValueT(T))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Allowance",
      "'Allowance'",
      "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','Allowance',ValueT(T))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Contributions",
      "'Contributions'",
      "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','Contributions',ValueT(T))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Transport",
      "'Transport'",
      "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','Transport',ValueT(T))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "MobilePhone",
      "'MobilePhone'",
      "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','MobilePhone',ValueT(T))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "DrivingLicense",
      "'DrivingLicense'",
      "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','DrivingLicense',ValueT(T))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "CostsForOutOfSchoolCare",
      "'Kosten BSO'",
      "If(Age>=4&&Age<11,HourlyFeeOutOfSchoolCare*NrOfDaysOutOfSchoolCareMonth*12,NA)",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "CostsForPrimaryEducation",
      "'Costs for Primary Education'",
      "If(Age>=4&&Age<=11,ParentalContributionPrimaryEducation,0)",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "CostsForSecondaryEducation",
      "'Costs for Secondary Education'",
      "If(Age>=12&&Age<16,CostsYearOneFour,If(Age>=16,CostsYearFiveSixSeven,0))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "CostsUnspecifiedOverview",
      "'Costs unspecified'",
      "CostsUnspecified*12",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "TotalYearlyCosts",
      "'Total (yearly) costs'",
      "Furniture+ActualChildCareCosts+ActualDiapers+ActualFood+ActualClothingCosts+ActualPersonalCareCosts+Hairdresser+Inventory+Allowance+Contributions+Transport+MobilePhone+DrivingLicense+CostsForOutOfSchoolCare+CostsForPrimaryEducation+CostsForSecondaryEducation+CostsUnspecifiedOverview",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "TotalYearlyCostTSUM",
      null,
      "TSUM(TotalYearlyCosts)",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP06SUB5SUB3",
      "'[b]Child-related Income[/b]'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "ChildBenefits",
      "'Child benefits'",
      "MatrixLookup('ScorecardKSP.xls','LeeftijdGeslachtGebondenKosten','ChildBenefits',ValueT(T))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "ChildCarePremiumOverview",
      "'Childcare premium'",
      "If(Age<4,PremiumForChildcare*12,If(Age<11,PremiumForOutofSchoolCare*12,0))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "ChildcareBudgetOverview",
      "'Childcare budget'",
      "If(Age<12,ChildRelatedBudgetUpToTwelve*12,If(Age<16,ChildRelatedBudgetTwelveUpToAndInclFifteen*12,If(Age<18,ChildRelatedBudgetSixteenUpToAndIncSeventeen*12,0)))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "CombinationDiscountOverview",
      "'Combination Discount'",
      "If(Age<12,CombinationDiscountTotal,0)",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "TotalYearlyIncome",
      "'Total (yearly) Income'",
      "ChildBenefits+ChildCarePremiumOverview+ChildcareBudgetOverview+CombinationDiscountOverview",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "TotalYearlyBalance",
      "'Total Net Costs (-)'",
      "TotalYearlyCosts-TotalYearlyIncome",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "TotalMonthlyBalanceAverage",
      "'Total monthly Net Costs, monthly()'",
      "TotalYearlyBalance/12",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "ChildCareCosts",
      "'Childcare costs'",
      "NrOfDaysChildcareMonth*HourlyFeeChildCare*12",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP06_PARAGRAAF09",
      "'Eigenschappen van de stap'",
      "undefined",
      "",
      "",
      "Q_MAP06.visible&&DEBUG==1",
      false,
      null,
      ""
    ],
    [
      "Q_MAP06_STATUS",
      "'Status van de stap'",
      "Q_MAP06",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP06_PARAGRAAF09SUB2",
      "'Warning voor map 6'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP06_PARAGRAAF09SUB3",
      "'Info bij stap 6'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP06_PARAGRAAF09SUB4",
      "'Validatie stap 6'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP06_PARAGRAAF09SUB5",
      "'Aantal verplichte velden (1)'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP06_PARAGRAAF09SUB6",
      "'Aantal ingevulde verplichte velden (1)'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP06_HULPVARIABELEN",
      "'Hulpvariabelen'",
      "undefined",
      "",
      "",
      "Q_MAP06.visible&&0",
      false,
      null,
      ""
    ],
    [
      "Q_MAP06_REQUIREDVARS",
      "'Aantal verplichte velden (1)'",
      "Count(X,SelectDescendants(Q_MAP06,Q_MAP06_HULPVARIABELEN),InputRequired(X))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_MAP06_ENTEREDREQUIREDVARS",
      "'Aantal ingevulde verplichte velden (1)'",
      "Count(X,SelectDescendants(Q_MAP06,Q_MAP06_HULPVARIABELEN),InputRequired(X)&&DataAvailable(X))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_RESULT",
      "'Resultaat'",
      "String(If(Q_ROOT[doc]==0,'Nog niet alle vragen zijn ingevuld.[br][/br]','Deze vragenlijst is definitief gemaakt.[br][/br]')+Q_RESTRICTIES[doc]+Q_WARNING_GLOBAL[doc])",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_RESULTSUB1",
      "'Resultaat'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_STATUS",
      "'Status'",
      "0",
      "",
      "",
      false,
      false,
      "[{'name':' 0','value':'Actief'},{'name':'1','value':'Defintief'}]",
      ""
    ],
    [
      "Q_STATUS_FINAL_ON",
      "'Definitief gemaakt op'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_STATUS_FINAL_BY",
      "'Definitief gemaakt door (gebruikersnaam)'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_STATUS_FINAL_BY_NAME",
      "'Definitief gemaakt door (volledige naam)'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_STATUS_STARTED_ON",
      "'Aangemaakt op'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_STATUS_STARTED_BY",
      "'Aangemaakt door (gebruikersnaam)'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_STATUS_STARTED_BY_NAME",
      "'Aangemaakt door (volledige naam)'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "ModelVersion",
      "'Modelversie'",
      "'01.27.000.000'",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "ModelType",
      "'Modeltype'",
      "'TEST'",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "MatrixVersion",
      "'Parametersversie'",
      "'None'",
      "",
      "",
      false,
      false,
      null,
      "'Bij het definitief maken wordt de waarde vastgezet.'"
    ],
    [
      "Q_PREVIOUS_BUTTON_VISIBLE",
      "'Vorige'",
      "2",
      "",
      "",
      false,
      false,
      "[{'name':' 0','value':'Nooit'},{'name':'2','value':'Altijd'}]",
      ""
    ],
    [
      "Q_NEXT_BUTTON_VISIBLE",
      "'Volgende'",
      "2",
      "",
      "",
      false,
      false,
      "[{'name':' 0','value':'Nooit'},{'name':'1','value':'Alleen wanneer stap volledig is'},{'name':'2','value':'Altijd'}]",
      ""
    ],
    [
      "Q_CONCEPT_REPORT_VISIBLE",
      "'Concept rapport'",
      "1",
      "",
      "",
      false,
      false,
      "[{'name':' 0','value':'Nee'},{'name':'1','value':'Ja'}]",
      ""
    ],
    [
      "Q_MAKE_FINAL_VISIBLE",
      "'Definitief maken'",
      "0",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_FINAL_REPORT_VISIBLE",
      "'Definitief rapport'",
      "0",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "HULPVARS",
      "'Hulpvariabelen'",
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_WARNING_GLOBAL",
      "'Knock-out(s)'",
      "String(If(Length(Q_WARNING_GLOBALTXT[doc])>0,'[br][/br]Er zijn knockouts van toepassing'+Q_WARNING_GLOBALTXT,''))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_WARNING_01",
      "'Map6 - Vraag 6'",
      "String('')",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_WARNING_GLOBALTXT",
      "'Knock-out tekst'",
      "String(If(Length(Q_WARNING_01[doc])>0,'[br][/br]'+Q_WARNING_01[doc],''))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_RESTRICTIES",
      "'Restricties'",
      "String(If(Length(Q_RESTRICTIESTXT[doc])>0,'[br][/br]De volgende variabelen zijn niet correct gevuld'+Q_RESTRICTIESTXT,''))",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_RESTRICTIES_01",
      null,
      "String('')",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_RESTRICTIES_02",
      null,
      "undefined",
      "",
      "",
      false,
      false,
      null,
      ""
    ],
    [
      "Q_RESTRICTIESTXT",
      "'Restricties tekst'",
      "String(If(Length(Q_RESTRICTIES_01[doc])>0,'[br][/br]'+Q_RESTRICTIES_01[doc],''))",
      "",
      "",
      false,
      false,
      null,
      ""
    ]
  ],
  "nodes": [
    {
      "name": "KSP_root_value",
      "rowId": "root",
      "colId": "value",
      "solutionName": "KSP",
      "frequency": "document",
      "displayAs": "SectionAnswerType",
      "nodes": [
        {
          "name": "KSP_RootSub1_value",
          "rowId": "RootSub1",
          "colId": "value",
          "identifier": "KSP_root_value"
        },
        {
          "name": "KSP_RootSub2_value",
          "rowId": "RootSub2",
          "colId": "value",
          "identifier": "KSP_root_value"
        },
        {
          "name": "KSP_Q_ROOT_value",
          "rowId": "Q_ROOT",
          "colId": "value",
          "identifier": "KSP_root_value"
        },
        {
          "name": "KSP_HULPVARS_value",
          "rowId": "HULPVARS",
          "colId": "value",
          "identifier": "KSP_root_value"
        }
      ]
    },
    {
      "rowId": "RootSub1",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_RootSub1_value",
      "nodes": [
        {
          "name": "KSP_FES_LAYOUTNR_value",
          "rowId": "FES_LAYOUTNR",
          "colId": "value",
          "identifier": "KSP_RootSub1_value"
        },
        {
          "name": "KSP_FES_EXCHANGE_RATES_value",
          "rowId": "FES_EXCHANGE_RATES",
          "colId": "value",
          "identifier": "KSP_RootSub1_value"
        },
        {
          "name": "KSP_FES_LAYOUT_value",
          "rowId": "FES_LAYOUT",
          "colId": "value",
          "identifier": "KSP_RootSub1_value"
        },
        {
          "name": "KSP_FES_FLATINPUT_value",
          "rowId": "FES_FLATINPUT",
          "colId": "value",
          "identifier": "KSP_RootSub1_value"
        },
        {
          "name": "KSP_FES_PROJECTION_PROFILE_value",
          "rowId": "FES_PROJECTION_PROFILE",
          "colId": "value",
          "identifier": "KSP_RootSub1_value"
        },
        {
          "name": "KSP_FES_COLUMN_ORDER_value",
          "rowId": "FES_COLUMN_ORDER",
          "colId": "value",
          "identifier": "KSP_RootSub1_value"
        },
        {
          "name": "KSP_FES_COLUMN_VISIBLE_value",
          "rowId": "FES_COLUMN_VISIBLE",
          "colId": "value",
          "identifier": "KSP_RootSub1_value"
        },
        {
          "name": "KSP_FES_STARTDATEPERIOD_value",
          "rowId": "FES_STARTDATEPERIOD",
          "colId": "value",
          "identifier": "KSP_RootSub1_value"
        },
        {
          "name": "KSP_FES_ENDDATEPERIOD_value",
          "rowId": "FES_ENDDATEPERIOD",
          "colId": "value",
          "identifier": "KSP_RootSub1_value"
        },
        {
          "name": "KSP_FES_BASECURRENCYPERIOD_value",
          "rowId": "FES_BASECURRENCYPERIOD",
          "colId": "value",
          "identifier": "KSP_RootSub1_value"
        },
        {
          "name": "KSP_FES_VIEWCURRENCYPERIOD_value",
          "rowId": "FES_VIEWCURRENCYPERIOD",
          "colId": "value",
          "identifier": "KSP_RootSub1_value"
        },
        {
          "name": "KSP_FES_COLUMNTYPE_value",
          "rowId": "FES_COLUMNTYPE",
          "colId": "value",
          "identifier": "KSP_RootSub1_value"
        }
      ],
      "ref": 100001,
      "formulaName": "KSP_RootSub1_value",
      "refId": 100001,
      "displayAs": "string",
      "parentName": "root_value"
    },
    {
      "rowId": "RootSub1",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_RootSub1_title",
      "nodes": [],
      "ref": 100002,
      "formulaName": "KSP_RootSub1_title",
      "refId": 100002,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "RootSub1",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_RootSub1_locked",
      "nodes": [],
      "ref": 100003,
      "formulaName": "KSP_RootSub1_locked",
      "refId": 100003,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "RootSub1",
      "solutionName": "KSP",
      "colId": "visible",
      "name": "KSP_RootSub1_visible",
      "nodes": [],
      "ref": 100004,
      "formulaName": "KSP_RootSub1_visible",
      "refId": 100004,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FES_LAYOUTNR",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FES_LAYOUTNR_value",
      "nodes": [],
      "ref": 100005,
      "formulaName": "KSP_FES_LAYOUTNR_value",
      "refId": 100005,
      "displayAs": "select",
      "frequency": "document",
      "parentName": "RootSub1_value"
    },
    {
      "rowId": "FES_LAYOUTNR",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FES_LAYOUTNR_title",
      "nodes": [],
      "ref": 100006,
      "formulaName": "KSP_FES_LAYOUTNR_title",
      "refId": 100006,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FES_LAYOUTNR",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_FES_LAYOUTNR_locked",
      "nodes": [],
      "ref": 100003,
      "formulaName": "KSP_RootSub1_locked",
      "refId": 100003,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FES_LAYOUTNR",
      "solutionName": "KSP",
      "colId": "choices",
      "name": "KSP_FES_LAYOUTNR_choices",
      "nodes": [],
      "ref": 100007,
      "formulaName": "KSP_FES_LAYOUTNR_choices",
      "refId": 100007,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FES_EXCHANGE_RATES",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FES_EXCHANGE_RATES_value",
      "nodes": [],
      "ref": 100008,
      "formulaName": "KSP_FES_EXCHANGE_RATES_value",
      "refId": 100008,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "RootSub1_value"
    },
    {
      "rowId": "FES_EXCHANGE_RATES",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FES_EXCHANGE_RATES_title",
      "nodes": [],
      "ref": 100009,
      "formulaName": "KSP_FES_EXCHANGE_RATES_title",
      "refId": 100009,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FES_LAYOUT",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FES_LAYOUT_value",
      "nodes": [],
      "ref": 100010,
      "formulaName": "KSP_FES_LAYOUT_value",
      "refId": 100010,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub1_value"
    },
    {
      "rowId": "FES_LAYOUT",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FES_LAYOUT_title",
      "nodes": [],
      "ref": 100011,
      "formulaName": "KSP_FES_LAYOUT_title",
      "refId": 100011,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FES_FLATINPUT",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FES_FLATINPUT_value",
      "nodes": [],
      "ref": 100012,
      "formulaName": "KSP_FES_FLATINPUT_value",
      "refId": 100012,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub1_value"
    },
    {
      "rowId": "FES_FLATINPUT",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FES_FLATINPUT_title",
      "nodes": [],
      "ref": 100013,
      "formulaName": "KSP_FES_FLATINPUT_title",
      "refId": 100013,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FES_PROJECTION_PROFILE",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FES_PROJECTION_PROFILE_value",
      "nodes": [],
      "ref": 100014,
      "formulaName": "KSP_FES_PROJECTION_PROFILE_value",
      "refId": 100014,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub1_value"
    },
    {
      "rowId": "FES_PROJECTION_PROFILE",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FES_PROJECTION_PROFILE_title",
      "nodes": [],
      "ref": 100015,
      "formulaName": "KSP_FES_PROJECTION_PROFILE_title",
      "refId": 100015,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FES_COLUMN_ORDER",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FES_COLUMN_ORDER_value",
      "nodes": [],
      "ref": 100016,
      "formulaName": "KSP_FES_COLUMN_ORDER_value",
      "refId": 100016,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub1_value"
    },
    {
      "rowId": "FES_COLUMN_ORDER",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FES_COLUMN_ORDER_title",
      "nodes": [],
      "ref": 100017,
      "formulaName": "KSP_FES_COLUMN_ORDER_title",
      "refId": 100017,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FES_COLUMN_VISIBLE",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FES_COLUMN_VISIBLE_value",
      "nodes": [],
      "ref": 100018,
      "formulaName": "KSP_FES_COLUMN_VISIBLE_value",
      "refId": 100018,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "RootSub1_value"
    },
    {
      "rowId": "FES_COLUMN_VISIBLE",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FES_COLUMN_VISIBLE_title",
      "nodes": [],
      "ref": 100019,
      "formulaName": "KSP_FES_COLUMN_VISIBLE_title",
      "refId": 100019,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FES_STARTDATEPERIOD",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FES_STARTDATEPERIOD_value",
      "nodes": [],
      "ref": 100020,
      "formulaName": "KSP_FES_STARTDATEPERIOD_value",
      "refId": 100020,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "RootSub1_value"
    },
    {
      "rowId": "FES_STARTDATEPERIOD",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FES_STARTDATEPERIOD_title",
      "nodes": [],
      "ref": 100021,
      "formulaName": "KSP_FES_STARTDATEPERIOD_title",
      "refId": 100021,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FES_ENDDATEPERIOD",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FES_ENDDATEPERIOD_value",
      "nodes": [],
      "ref": 100022,
      "formulaName": "KSP_FES_ENDDATEPERIOD_value",
      "refId": 100022,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "RootSub1_value"
    },
    {
      "rowId": "FES_ENDDATEPERIOD",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FES_ENDDATEPERIOD_title",
      "nodes": [],
      "ref": 100023,
      "formulaName": "KSP_FES_ENDDATEPERIOD_title",
      "refId": 100023,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FES_BASECURRENCYPERIOD",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FES_BASECURRENCYPERIOD_value",
      "nodes": [],
      "ref": 100024,
      "formulaName": "KSP_FES_BASECURRENCYPERIOD_value",
      "refId": 100024,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "RootSub1_value"
    },
    {
      "rowId": "FES_BASECURRENCYPERIOD",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FES_BASECURRENCYPERIOD_title",
      "nodes": [],
      "ref": 100025,
      "formulaName": "KSP_FES_BASECURRENCYPERIOD_title",
      "refId": 100025,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FES_VIEWCURRENCYPERIOD",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FES_VIEWCURRENCYPERIOD_value",
      "nodes": [],
      "ref": 100026,
      "formulaName": "KSP_FES_VIEWCURRENCYPERIOD_value",
      "refId": 100026,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "RootSub1_value"
    },
    {
      "rowId": "FES_VIEWCURRENCYPERIOD",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FES_VIEWCURRENCYPERIOD_title",
      "nodes": [],
      "ref": 100027,
      "formulaName": "KSP_FES_VIEWCURRENCYPERIOD_title",
      "refId": 100027,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FES_COLUMNTYPE",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FES_COLUMNTYPE_value",
      "nodes": [],
      "ref": 100028,
      "formulaName": "KSP_FES_COLUMNTYPE_value",
      "refId": 100028,
      "displayAs": "radio",
      "frequency": "column",
      "parentName": "RootSub1_value"
    },
    {
      "rowId": "FES_COLUMNTYPE",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FES_COLUMNTYPE_title",
      "nodes": [],
      "ref": 100029,
      "formulaName": "KSP_FES_COLUMNTYPE_title",
      "refId": 100029,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FES_COLUMNTYPE",
      "solutionName": "KSP",
      "colId": "choices",
      "name": "KSP_FES_COLUMNTYPE_choices",
      "nodes": [],
      "ref": 100030,
      "formulaName": "KSP_FES_COLUMNTYPE_choices",
      "refId": 100030,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "RootSub2",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_RootSub2_value",
      "nodes": [
        {
          "name": "KSP_FPS_VAR_Naam_value",
          "rowId": "FPS_VAR_Naam",
          "colId": "value",
          "identifier": "KSP_RootSub2_value"
        },
        {
          "name": "KSP_FPS_VAR_Relatienummer_value",
          "rowId": "FPS_VAR_Relatienummer",
          "colId": "value",
          "identifier": "KSP_RootSub2_value"
        },
        {
          "name": "KSP_FPS_VAR_KVKnr_value",
          "rowId": "FPS_VAR_KVKnr",
          "colId": "value",
          "identifier": "KSP_RootSub2_value"
        },
        {
          "name": "KSP_FPS_VAR_Rechtsvorm_nr_value",
          "rowId": "FPS_VAR_Rechtsvorm_nr",
          "colId": "value",
          "identifier": "KSP_RootSub2_value"
        },
        {
          "name": "KSP_FPS_VAR_Rechtsvorm_omschr_value",
          "rowId": "FPS_VAR_Rechtsvorm_omschr",
          "colId": "value",
          "identifier": "KSP_RootSub2_value"
        },
        {
          "name": "KSP_FPS_VAR_BIK_CODE_value",
          "rowId": "FPS_VAR_BIK_CODE",
          "colId": "value",
          "identifier": "KSP_RootSub2_value"
        },
        {
          "name": "KSP_FPS_VAR_BIK_Omschr_value",
          "rowId": "FPS_VAR_BIK_Omschr",
          "colId": "value",
          "identifier": "KSP_RootSub2_value"
        },
        {
          "name": "KSP_FPS_VAR_GridId_value",
          "rowId": "FPS_VAR_GridId",
          "colId": "value",
          "identifier": "KSP_RootSub2_value"
        },
        {
          "name": "KSP_FPS_VAR_Accountmanager_value",
          "rowId": "FPS_VAR_Accountmanager",
          "colId": "value",
          "identifier": "KSP_RootSub2_value"
        },
        {
          "name": "KSP_FPS_VAR_Kantoor_value",
          "rowId": "FPS_VAR_Kantoor",
          "colId": "value",
          "identifier": "KSP_RootSub2_value"
        },
        {
          "name": "KSP_FPS_VAR_Straat_value",
          "rowId": "FPS_VAR_Straat",
          "colId": "value",
          "identifier": "KSP_RootSub2_value"
        },
        {
          "name": "KSP_FPS_VAR_Housenumber_value",
          "rowId": "FPS_VAR_Housenumber",
          "colId": "value",
          "identifier": "KSP_RootSub2_value"
        },
        {
          "name": "KSP_FPS_VAR_Postcode_value",
          "rowId": "FPS_VAR_Postcode",
          "colId": "value",
          "identifier": "KSP_RootSub2_value"
        },
        {
          "name": "KSP_FPS_VAR_Woonplaats_value",
          "rowId": "FPS_VAR_Woonplaats",
          "colId": "value",
          "identifier": "KSP_RootSub2_value"
        },
        {
          "name": "KSP_FPS_VAR_Provincie_value",
          "rowId": "FPS_VAR_Provincie",
          "colId": "value",
          "identifier": "KSP_RootSub2_value"
        },
        {
          "name": "KSP_FPS_VAR_Land_value",
          "rowId": "FPS_VAR_Land",
          "colId": "value",
          "identifier": "KSP_RootSub2_value"
        },
        {
          "name": "KSP_FPS_VAR_BvDID_value",
          "rowId": "FPS_VAR_BvDID",
          "colId": "value",
          "identifier": "KSP_RootSub2_value"
        },
        {
          "name": "KSP_FPS_VAR_Telefoon_value",
          "rowId": "FPS_VAR_Telefoon",
          "colId": "value",
          "identifier": "KSP_RootSub2_value"
        },
        {
          "name": "KSP_FPS_VAR_Emailadres_value",
          "rowId": "FPS_VAR_Emailadres",
          "colId": "value",
          "identifier": "KSP_RootSub2_value"
        }
      ],
      "ref": 100031,
      "formulaName": "KSP_RootSub2_value",
      "refId": 100031,
      "displayAs": "string",
      "parentName": "root_value"
    },
    {
      "rowId": "RootSub2",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_RootSub2_title",
      "nodes": [],
      "ref": 100032,
      "formulaName": "KSP_RootSub2_title",
      "refId": 100032,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "RootSub2",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_RootSub2_locked",
      "nodes": [],
      "ref": 100018,
      "formulaName": "KSP_FES_COLUMN_VISIBLE_value",
      "refId": 100018,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "RootSub2",
      "solutionName": "KSP",
      "colId": "visible",
      "name": "KSP_RootSub2_visible",
      "nodes": [],
      "ref": 100004,
      "formulaName": "KSP_RootSub1_visible",
      "refId": 100004,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FPS_VAR_Naam",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FPS_VAR_Naam_value",
      "nodes": [],
      "ref": 100033,
      "formulaName": "KSP_FPS_VAR_Naam_value",
      "refId": 100033,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub2_value"
    },
    {
      "rowId": "FPS_VAR_Naam",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FPS_VAR_Naam_title",
      "nodes": [],
      "ref": 100034,
      "formulaName": "KSP_FPS_VAR_Naam_title",
      "refId": 100034,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FPS_VAR_Relatienummer",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FPS_VAR_Relatienummer_value",
      "nodes": [],
      "ref": 100035,
      "formulaName": "KSP_FPS_VAR_Relatienummer_value",
      "refId": 100035,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub2_value"
    },
    {
      "rowId": "FPS_VAR_Relatienummer",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FPS_VAR_Relatienummer_title",
      "nodes": [],
      "ref": 100036,
      "formulaName": "KSP_FPS_VAR_Relatienummer_title",
      "refId": 100036,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FPS_VAR_KVKnr",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FPS_VAR_KVKnr_value",
      "nodes": [],
      "ref": 100037,
      "formulaName": "KSP_FPS_VAR_KVKnr_value",
      "refId": 100037,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub2_value"
    },
    {
      "rowId": "FPS_VAR_KVKnr",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FPS_VAR_KVKnr_title",
      "nodes": [],
      "ref": 100038,
      "formulaName": "KSP_FPS_VAR_KVKnr_title",
      "refId": 100038,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FPS_VAR_Rechtsvorm_nr",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FPS_VAR_Rechtsvorm_nr_value",
      "nodes": [],
      "ref": 100039,
      "formulaName": "KSP_FPS_VAR_Rechtsvorm_nr_value",
      "refId": 100039,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub2_value"
    },
    {
      "rowId": "FPS_VAR_Rechtsvorm_nr",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FPS_VAR_Rechtsvorm_nr_title",
      "nodes": [],
      "ref": 100040,
      "formulaName": "KSP_FPS_VAR_Rechtsvorm_nr_title",
      "refId": 100040,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FPS_VAR_Rechtsvorm_omschr",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FPS_VAR_Rechtsvorm_omschr_value",
      "nodes": [],
      "ref": 100041,
      "formulaName": "KSP_FPS_VAR_Rechtsvorm_omschr_value",
      "refId": 100041,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub2_value"
    },
    {
      "rowId": "FPS_VAR_Rechtsvorm_omschr",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FPS_VAR_Rechtsvorm_omschr_title",
      "nodes": [],
      "ref": 100042,
      "formulaName": "KSP_FPS_VAR_Rechtsvorm_omschr_title",
      "refId": 100042,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FPS_VAR_BIK_CODE",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FPS_VAR_BIK_CODE_value",
      "nodes": [],
      "ref": 100043,
      "formulaName": "KSP_FPS_VAR_BIK_CODE_value",
      "refId": 100043,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub2_value"
    },
    {
      "rowId": "FPS_VAR_BIK_CODE",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FPS_VAR_BIK_CODE_title",
      "nodes": [],
      "ref": 100044,
      "formulaName": "KSP_FPS_VAR_BIK_CODE_title",
      "refId": 100044,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FPS_VAR_BIK_Omschr",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FPS_VAR_BIK_Omschr_value",
      "nodes": [],
      "ref": 100045,
      "formulaName": "KSP_FPS_VAR_BIK_Omschr_value",
      "refId": 100045,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub2_value"
    },
    {
      "rowId": "FPS_VAR_BIK_Omschr",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FPS_VAR_BIK_Omschr_title",
      "nodes": [],
      "ref": 100046,
      "formulaName": "KSP_FPS_VAR_BIK_Omschr_title",
      "refId": 100046,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FPS_VAR_GridId",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FPS_VAR_GridId_value",
      "nodes": [],
      "ref": 100047,
      "formulaName": "KSP_FPS_VAR_GridId_value",
      "refId": 100047,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub2_value"
    },
    {
      "rowId": "FPS_VAR_GridId",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FPS_VAR_GridId_title",
      "nodes": [],
      "ref": 100048,
      "formulaName": "KSP_FPS_VAR_GridId_title",
      "refId": 100048,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FPS_VAR_Accountmanager",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FPS_VAR_Accountmanager_value",
      "nodes": [],
      "ref": 100049,
      "formulaName": "KSP_FPS_VAR_Accountmanager_value",
      "refId": 100049,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub2_value"
    },
    {
      "rowId": "FPS_VAR_Accountmanager",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FPS_VAR_Accountmanager_title",
      "nodes": [],
      "ref": 100050,
      "formulaName": "KSP_FPS_VAR_Accountmanager_title",
      "refId": 100050,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FPS_VAR_Kantoor",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FPS_VAR_Kantoor_value",
      "nodes": [],
      "ref": 100051,
      "formulaName": "KSP_FPS_VAR_Kantoor_value",
      "refId": 100051,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub2_value"
    },
    {
      "rowId": "FPS_VAR_Kantoor",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FPS_VAR_Kantoor_title",
      "nodes": [],
      "ref": 100052,
      "formulaName": "KSP_FPS_VAR_Kantoor_title",
      "refId": 100052,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FPS_VAR_Straat",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FPS_VAR_Straat_value",
      "nodes": [],
      "ref": 100053,
      "formulaName": "KSP_FPS_VAR_Straat_value",
      "refId": 100053,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub2_value"
    },
    {
      "rowId": "FPS_VAR_Straat",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FPS_VAR_Straat_title",
      "nodes": [],
      "ref": 100054,
      "formulaName": "KSP_FPS_VAR_Straat_title",
      "refId": 100054,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FPS_VAR_Housenumber",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FPS_VAR_Housenumber_value",
      "nodes": [],
      "ref": 100055,
      "formulaName": "KSP_FPS_VAR_Housenumber_value",
      "refId": 100055,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub2_value"
    },
    {
      "rowId": "FPS_VAR_Housenumber",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FPS_VAR_Housenumber_title",
      "nodes": [],
      "ref": 100056,
      "formulaName": "KSP_FPS_VAR_Housenumber_title",
      "refId": 100056,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FPS_VAR_Postcode",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FPS_VAR_Postcode_value",
      "nodes": [],
      "ref": 100057,
      "formulaName": "KSP_FPS_VAR_Postcode_value",
      "refId": 100057,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub2_value"
    },
    {
      "rowId": "FPS_VAR_Postcode",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FPS_VAR_Postcode_title",
      "nodes": [],
      "ref": 100058,
      "formulaName": "KSP_FPS_VAR_Postcode_title",
      "refId": 100058,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FPS_VAR_Woonplaats",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FPS_VAR_Woonplaats_value",
      "nodes": [],
      "ref": 100059,
      "formulaName": "KSP_FPS_VAR_Woonplaats_value",
      "refId": 100059,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub2_value"
    },
    {
      "rowId": "FPS_VAR_Woonplaats",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FPS_VAR_Woonplaats_title",
      "nodes": [],
      "ref": 100060,
      "formulaName": "KSP_FPS_VAR_Woonplaats_title",
      "refId": 100060,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FPS_VAR_Provincie",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FPS_VAR_Provincie_value",
      "nodes": [],
      "ref": 100061,
      "formulaName": "KSP_FPS_VAR_Provincie_value",
      "refId": 100061,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub2_value"
    },
    {
      "rowId": "FPS_VAR_Provincie",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FPS_VAR_Provincie_title",
      "nodes": [],
      "ref": 100062,
      "formulaName": "KSP_FPS_VAR_Provincie_title",
      "refId": 100062,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FPS_VAR_Land",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FPS_VAR_Land_value",
      "nodes": [],
      "ref": 100063,
      "formulaName": "KSP_FPS_VAR_Land_value",
      "refId": 100063,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub2_value"
    },
    {
      "rowId": "FPS_VAR_Land",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FPS_VAR_Land_title",
      "nodes": [],
      "ref": 100064,
      "formulaName": "KSP_FPS_VAR_Land_title",
      "refId": 100064,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FPS_VAR_BvDID",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FPS_VAR_BvDID_value",
      "nodes": [],
      "ref": 100065,
      "formulaName": "KSP_FPS_VAR_BvDID_value",
      "refId": 100065,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub2_value"
    },
    {
      "rowId": "FPS_VAR_BvDID",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FPS_VAR_BvDID_title",
      "nodes": [],
      "ref": 100066,
      "formulaName": "KSP_FPS_VAR_BvDID_title",
      "refId": 100066,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FPS_VAR_Telefoon",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FPS_VAR_Telefoon_value",
      "nodes": [],
      "ref": 100067,
      "formulaName": "KSP_FPS_VAR_Telefoon_value",
      "refId": 100067,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub2_value"
    },
    {
      "rowId": "FPS_VAR_Telefoon",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FPS_VAR_Telefoon_title",
      "nodes": [],
      "ref": 100068,
      "formulaName": "KSP_FPS_VAR_Telefoon_title",
      "refId": 100068,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FPS_VAR_Emailadres",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FPS_VAR_Emailadres_value",
      "nodes": [
        {
          "name": "KSP_FPS_FINAN_USER_ROLES_value",
          "rowId": "FPS_FINAN_USER_ROLES",
          "colId": "value",
          "identifier": "KSP_FPS_VAR_Emailadres_value"
        },
        {
          "name": "KSP_FPS_FINAN_USER_value",
          "rowId": "FPS_FINAN_USER",
          "colId": "value",
          "identifier": "KSP_FPS_VAR_Emailadres_value"
        }
      ],
      "ref": 100069,
      "formulaName": "KSP_FPS_VAR_Emailadres_value",
      "refId": 100069,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "RootSub2_value"
    },
    {
      "rowId": "FPS_VAR_Emailadres",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FPS_VAR_Emailadres_title",
      "nodes": [],
      "ref": 100070,
      "formulaName": "KSP_FPS_VAR_Emailadres_title",
      "refId": 100070,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FPS_FINAN_USER_ROLES",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FPS_FINAN_USER_ROLES_value",
      "nodes": [],
      "ref": 100071,
      "formulaName": "KSP_FPS_FINAN_USER_ROLES_value",
      "refId": 100071,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "FPS_VAR_Emailadres_value"
    },
    {
      "rowId": "FPS_FINAN_USER_ROLES",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FPS_FINAN_USER_ROLES_title",
      "nodes": [],
      "ref": 100072,
      "formulaName": "KSP_FPS_FINAN_USER_ROLES_title",
      "refId": 100072,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FPS_FINAN_USER",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FPS_FINAN_USER_value",
      "nodes": [],
      "ref": 100073,
      "formulaName": "KSP_FPS_FINAN_USER_value",
      "refId": 100073,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "FPS_VAR_Emailadres_value"
    },
    {
      "rowId": "FPS_FINAN_USER",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FPS_FINAN_USER_title",
      "nodes": [],
      "ref": 100074,
      "formulaName": "KSP_FPS_FINAN_USER_title",
      "refId": 100074,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_ROOT",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_ROOT_value",
      "nodes": [
        {
          "name": "KSP_Q_MAP00_value",
          "rowId": "Q_MAP00",
          "colId": "value",
          "identifier": "KSP_Q_ROOT_value"
        },
        {
          "name": "KSP_Q_MAP01_value",
          "rowId": "Q_MAP01",
          "colId": "value",
          "identifier": "KSP_Q_ROOT_value"
        },
        {
          "name": "KSP_Q_MAP02_value",
          "rowId": "Q_MAP02",
          "colId": "value",
          "identifier": "KSP_Q_ROOT_value"
        },
        {
          "name": "KSP_Q_MAP06_value",
          "rowId": "Q_MAP06",
          "colId": "value",
          "identifier": "KSP_Q_ROOT_value"
        },
        {
          "name": "KSP_Q_RESULT_value",
          "rowId": "Q_RESULT",
          "colId": "value",
          "identifier": "KSP_Q_ROOT_value"
        },
        {
          "name": "KSP_Q_STATUS_value",
          "rowId": "Q_STATUS",
          "colId": "value",
          "identifier": "KSP_Q_ROOT_value"
        },
        {
          "name": "KSP_Q_STATUS_FINAL_ON_value",
          "rowId": "Q_STATUS_FINAL_ON",
          "colId": "value",
          "identifier": "KSP_Q_ROOT_value"
        },
        {
          "name": "KSP_Q_STATUS_FINAL_BY_value",
          "rowId": "Q_STATUS_FINAL_BY",
          "colId": "value",
          "identifier": "KSP_Q_ROOT_value"
        },
        {
          "name": "KSP_Q_STATUS_FINAL_BY_NAME_value",
          "rowId": "Q_STATUS_FINAL_BY_NAME",
          "colId": "value",
          "identifier": "KSP_Q_ROOT_value"
        },
        {
          "name": "KSP_Q_STATUS_STARTED_ON_value",
          "rowId": "Q_STATUS_STARTED_ON",
          "colId": "value",
          "identifier": "KSP_Q_ROOT_value"
        },
        {
          "name": "KSP_Q_STATUS_STARTED_BY_value",
          "rowId": "Q_STATUS_STARTED_BY",
          "colId": "value",
          "identifier": "KSP_Q_ROOT_value"
        },
        {
          "name": "KSP_Q_STATUS_STARTED_BY_NAME_value",
          "rowId": "Q_STATUS_STARTED_BY_NAME",
          "colId": "value",
          "identifier": "KSP_Q_ROOT_value"
        },
        {
          "name": "KSP_ModelVersion_value",
          "rowId": "ModelVersion",
          "colId": "value",
          "identifier": "KSP_Q_ROOT_value"
        },
        {
          "name": "KSP_ModelType_value",
          "rowId": "ModelType",
          "colId": "value",
          "identifier": "KSP_Q_ROOT_value"
        },
        {
          "name": "KSP_MatrixVersion_value",
          "rowId": "MatrixVersion",
          "colId": "value",
          "identifier": "KSP_Q_ROOT_value"
        },
        {
          "name": "KSP_Q_PREVIOUS_BUTTON_VISIBLE_value",
          "rowId": "Q_PREVIOUS_BUTTON_VISIBLE",
          "colId": "value",
          "identifier": "KSP_Q_ROOT_value"
        },
        {
          "name": "KSP_Q_NEXT_BUTTON_VISIBLE_value",
          "rowId": "Q_NEXT_BUTTON_VISIBLE",
          "colId": "value",
          "identifier": "KSP_Q_ROOT_value"
        },
        {
          "name": "KSP_Q_CONCEPT_REPORT_VISIBLE_value",
          "rowId": "Q_CONCEPT_REPORT_VISIBLE",
          "colId": "value",
          "identifier": "KSP_Q_ROOT_value"
        },
        {
          "name": "KSP_Q_MAKE_FINAL_VISIBLE_value",
          "rowId": "Q_MAKE_FINAL_VISIBLE",
          "colId": "value",
          "identifier": "KSP_Q_ROOT_value"
        },
        {
          "name": "KSP_Q_FINAL_REPORT_VISIBLE_value",
          "rowId": "Q_FINAL_REPORT_VISIBLE",
          "colId": "value",
          "identifier": "KSP_Q_ROOT_value"
        }
      ],
      "ref": 100075,
      "formulaName": "KSP_Q_ROOT_value",
      "refId": 100075,
      "displayAs": "radio",
      "frequency": "document",
      "parentName": "root_value"
    },
    {
      "rowId": "Q_ROOT",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_ROOT_title",
      "nodes": [],
      "ref": 100076,
      "formulaName": "KSP_Q_ROOT_title",
      "refId": 100076,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_ROOT",
      "solutionName": "KSP",
      "colId": "hint",
      "name": "KSP_Q_ROOT_hint",
      "nodes": [],
      "ref": 100077,
      "formulaName": "KSP_Q_ROOT_hint",
      "refId": 100077,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_ROOT",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_ROOT_locked",
      "nodes": [],
      "ref": 100018,
      "formulaName": "KSP_FES_COLUMN_VISIBLE_value",
      "refId": 100018,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_ROOT",
      "solutionName": "KSP",
      "colId": "choices",
      "name": "KSP_Q_ROOT_choices",
      "nodes": [],
      "ref": 100078,
      "formulaName": "KSP_Q_ROOT_choices",
      "refId": 100078,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP00",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP00_value",
      "nodes": [
        {
          "name": "KSP_Q_MAP00_WARNING_value",
          "rowId": "Q_MAP00_WARNING",
          "colId": "value",
          "identifier": "KSP_Q_MAP00_value"
        },
        {
          "name": "KSP_Q_MAP00_TEST_value",
          "rowId": "Q_MAP00_TEST",
          "colId": "value",
          "identifier": "KSP_Q_MAP00_value"
        },
        {
          "name": "KSP_Q_MAP00_INFO_value",
          "rowId": "Q_MAP00_INFO",
          "colId": "value",
          "identifier": "KSP_Q_MAP00_value"
        },
        {
          "name": "KSP_Q_MAP00_VALIDATION_value",
          "rowId": "Q_MAP00_VALIDATION",
          "colId": "value",
          "identifier": "KSP_Q_MAP00_value"
        },
        {
          "name": "KSP_Q_MAP00_HINT_value",
          "rowId": "Q_MAP00_HINT",
          "colId": "value",
          "identifier": "KSP_Q_MAP00_value"
        },
        {
          "name": "KSP_Q_MAP00_INTRO_value",
          "rowId": "Q_MAP00_INTRO",
          "colId": "value",
          "identifier": "KSP_Q_MAP00_value"
        }
      ],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Q_ROOT_value"
    },
    {
      "rowId": "Q_MAP00",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP00_title",
      "nodes": [],
      "ref": 100080,
      "formulaName": "KSP_Q_MAP00_title",
      "refId": 100080,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP00",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP00_locked",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP00_WARNING",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP00_WARNING_value",
      "nodes": [],
      "ref": 100081,
      "formulaName": "KSP_Q_MAP00_WARNING_value",
      "refId": 100081,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP00_value"
    },
    {
      "rowId": "Q_MAP00_WARNING",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP00_WARNING_title",
      "nodes": [],
      "ref": 100082,
      "formulaName": "KSP_Q_MAP00_WARNING_title",
      "refId": 100082,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP00_WARNING",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP00_WARNING_locked",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP00_TEST",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP00_TEST_value",
      "nodes": [],
      "ref": 100083,
      "formulaName": "KSP_Q_MAP00_TEST_value",
      "refId": 100083,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP00_value"
    },
    {
      "rowId": "Q_MAP00_TEST",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP00_TEST_title",
      "nodes": [],
      "ref": 100084,
      "formulaName": "KSP_Q_MAP00_TEST_title",
      "refId": 100084,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP00_TEST",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP00_TEST_locked",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP00_INFO",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP00_INFO_value",
      "nodes": [],
      "ref": 100085,
      "formulaName": "KSP_Q_MAP00_INFO_value",
      "refId": 100085,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP00_value"
    },
    {
      "rowId": "Q_MAP00_INFO",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP00_INFO_title",
      "nodes": [],
      "ref": 100086,
      "formulaName": "KSP_Q_MAP00_INFO_title",
      "refId": 100086,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP00_INFO",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP00_INFO_locked",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP00_VALIDATION",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP00_VALIDATION_value",
      "nodes": [],
      "ref": 100087,
      "formulaName": "KSP_Q_MAP00_VALIDATION_value",
      "refId": 100087,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP00_value"
    },
    {
      "rowId": "Q_MAP00_VALIDATION",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP00_VALIDATION_title",
      "nodes": [],
      "ref": 100088,
      "formulaName": "KSP_Q_MAP00_VALIDATION_title",
      "refId": 100088,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP00_VALIDATION",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP00_VALIDATION_locked",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP00_HINT",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP00_HINT_value",
      "nodes": [],
      "ref": 100089,
      "formulaName": "KSP_Q_MAP00_HINT_value",
      "refId": 100089,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP00_value"
    },
    {
      "rowId": "Q_MAP00_HINT",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP00_HINT_title",
      "nodes": [],
      "ref": 100090,
      "formulaName": "KSP_Q_MAP00_HINT_title",
      "refId": 100090,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP00_HINT",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP00_HINT_locked",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP00_INTRO",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP00_INTRO_value",
      "nodes": [
        {
          "name": "KSP_Q_MAP00_INTROMEMO_value",
          "rowId": "Q_MAP00_INTROMEMO",
          "colId": "value",
          "identifier": "KSP_Q_MAP00_INTRO_value"
        }
      ],
      "ref": 100091,
      "formulaName": "KSP_Q_MAP00_INTRO_value",
      "refId": 100091,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Q_MAP00_value"
    },
    {
      "rowId": "Q_MAP00_INTRO",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP00_INTRO_title",
      "nodes": [],
      "ref": 100092,
      "formulaName": "KSP_Q_MAP00_INTRO_title",
      "refId": 100092,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP00_INTRO",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP00_INTRO_locked",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP00_INTROMEMO",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP00_INTROMEMO_value",
      "nodes": [],
      "ref": 100093,
      "formulaName": "KSP_Q_MAP00_INTROMEMO_value",
      "refId": 100093,
      "displayAs": "memo",
      "frequency": "document",
      "parentName": "Q_MAP00_INTRO_value"
    },
    {
      "rowId": "Q_MAP00_INTROMEMO",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP00_INTROMEMO_title",
      "nodes": [],
      "ref": 100094,
      "formulaName": "KSP_Q_MAP00_INTROMEMO_title",
      "refId": 100094,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP00_INTROMEMO",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP00_INTROMEMO_locked",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP01_value",
      "nodes": [
        {
          "name": "KSP_Q_MAP01_WARNING_value",
          "rowId": "Q_MAP01_WARNING",
          "colId": "value",
          "identifier": "KSP_Q_MAP01_value"
        },
        {
          "name": "KSP_Q_MAP01_INFO_value",
          "rowId": "Q_MAP01_INFO",
          "colId": "value",
          "identifier": "KSP_Q_MAP01_value"
        },
        {
          "name": "KSP_Q_MAP01_VALIDATION_value",
          "rowId": "Q_MAP01_VALIDATION",
          "colId": "value",
          "identifier": "KSP_Q_MAP01_value"
        },
        {
          "name": "KSP_Q_MAP01_HINT_value",
          "rowId": "Q_MAP01_HINT",
          "colId": "value",
          "identifier": "KSP_Q_MAP01_value"
        },
        {
          "name": "KSP_Situation_value",
          "rowId": "Situation",
          "colId": "value",
          "identifier": "KSP_Q_MAP01_value"
        },
        {
          "name": "KSP_Q_MAP01_PARAGRAAF09_value",
          "rowId": "Q_MAP01_PARAGRAAF09",
          "colId": "value",
          "identifier": "KSP_Q_MAP01_value"
        },
        {
          "name": "KSP_Q_MAP01_HULPVARIABELEN_value",
          "rowId": "Q_MAP01_HULPVARIABELEN",
          "colId": "value",
          "identifier": "KSP_Q_MAP01_value"
        }
      ],
      "ref": 100095,
      "formulaName": "KSP_Q_MAP01_value",
      "refId": 100095,
      "displayAs": "radio",
      "frequency": "document",
      "parentName": "Q_ROOT_value"
    },
    {
      "rowId": "Q_MAP01",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP01_title",
      "nodes": [],
      "ref": 100096,
      "formulaName": "KSP_Q_MAP01_title",
      "refId": 100096,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP01_locked",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01",
      "solutionName": "KSP",
      "colId": "choices",
      "name": "KSP_Q_MAP01_choices",
      "nodes": [],
      "ref": 100078,
      "formulaName": "KSP_Q_ROOT_choices",
      "refId": 100078,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_WARNING",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP01_WARNING_value",
      "nodes": [],
      "ref": 100097,
      "formulaName": "KSP_Q_MAP01_WARNING_value",
      "refId": 100097,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP01_value"
    },
    {
      "rowId": "Q_MAP01_WARNING",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP01_WARNING_title",
      "nodes": [],
      "ref": 100098,
      "formulaName": "KSP_Q_MAP01_WARNING_title",
      "refId": 100098,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_WARNING",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP01_WARNING_locked",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_INFO",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP01_INFO_value",
      "nodes": [],
      "ref": 100099,
      "formulaName": "KSP_Q_MAP01_INFO_value",
      "refId": 100099,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP01_value"
    },
    {
      "rowId": "Q_MAP01_INFO",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP01_INFO_title",
      "nodes": [],
      "ref": 100100,
      "formulaName": "KSP_Q_MAP01_INFO_title",
      "refId": 100100,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_INFO",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP01_INFO_locked",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_VALIDATION",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP01_VALIDATION_value",
      "nodes": [],
      "ref": 100101,
      "formulaName": "KSP_Q_MAP01_VALIDATION_value",
      "refId": 100101,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP01_value"
    },
    {
      "rowId": "Q_MAP01_VALIDATION",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP01_VALIDATION_title",
      "nodes": [],
      "ref": 100102,
      "formulaName": "KSP_Q_MAP01_VALIDATION_title",
      "refId": 100102,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_VALIDATION",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP01_VALIDATION_locked",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_HINT",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP01_HINT_value",
      "nodes": [],
      "ref": 100103,
      "formulaName": "KSP_Q_MAP01_HINT_value",
      "refId": 100103,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP01_value"
    },
    {
      "rowId": "Q_MAP01_HINT",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP01_HINT_title",
      "nodes": [],
      "ref": 100104,
      "formulaName": "KSP_Q_MAP01_HINT_title",
      "refId": 100104,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_HINT",
      "solutionName": "KSP",
      "colId": "hint",
      "name": "KSP_Q_MAP01_HINT_hint",
      "nodes": [],
      "ref": 100105,
      "formulaName": "KSP_Q_MAP01_HINT_hint",
      "refId": 100105,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_HINT",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP01_HINT_locked",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Situation",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Situation_value",
      "nodes": [
        {
          "name": "KSP_IncomeSection_value",
          "rowId": "IncomeSection",
          "colId": "value",
          "identifier": "KSP_Situation_value"
        },
        {
          "name": "KSP_IncomeParent01_value",
          "rowId": "IncomeParent01",
          "colId": "value",
          "identifier": "KSP_Situation_value"
        },
        {
          "name": "KSP_IncomeParent02_value",
          "rowId": "IncomeParent02",
          "colId": "value",
          "identifier": "KSP_Situation_value"
        },
        {
          "name": "KSP_WorkingHoursWeeklyParent01_value",
          "rowId": "WorkingHoursWeeklyParent01",
          "colId": "value",
          "identifier": "KSP_Situation_value"
        },
        {
          "name": "KSP_WorkingHoursWeeklyParent02_value",
          "rowId": "WorkingHoursWeeklyParent02",
          "colId": "value",
          "identifier": "KSP_Situation_value"
        },
        {
          "name": "KSP_WorkingHoursWeeklyOfLeastWorkingParent_value",
          "rowId": "WorkingHoursWeeklyOfLeastWorkingParent",
          "colId": "value",
          "identifier": "KSP_Situation_value"
        },
        {
          "name": "KSP_Child_value",
          "rowId": "Child",
          "colId": "value",
          "identifier": "KSP_Situation_value"
        },
        {
          "name": "KSP_TupleSumTest_value",
          "rowId": "TupleSumTest",
          "colId": "value",
          "identifier": "KSP_Situation_value"
        },
        {
          "name": "KSP_Memo1_value",
          "rowId": "Memo1",
          "colId": "value",
          "identifier": "KSP_Situation_value"
        }
      ],
      "ref": 100106,
      "formulaName": "KSP_Situation_value",
      "refId": 100106,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Q_MAP01_value"
    },
    {
      "rowId": "Situation",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Situation_title",
      "nodes": [],
      "ref": 100107,
      "formulaName": "KSP_Situation_title",
      "refId": 100107,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Situation",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Situation_locked",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "IncomeSection",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_IncomeSection_value",
      "nodes": [],
      "ref": 100108,
      "formulaName": "KSP_IncomeSection_value",
      "refId": 100108,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Situation_value"
    },
    {
      "rowId": "IncomeSection",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_IncomeSection_title",
      "nodes": [],
      "ref": 100109,
      "formulaName": "KSP_IncomeSection_title",
      "refId": 100109,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "IncomeSection",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_IncomeSection_locked",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "IncomeParent01",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_IncomeParent01_value",
      "nodes": [],
      "ref": 100110,
      "formulaName": "KSP_IncomeParent01_value",
      "refId": 100110,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Situation_value"
    },
    {
      "rowId": "IncomeParent01",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_IncomeParent01_title",
      "nodes": [],
      "ref": 100111,
      "formulaName": "KSP_IncomeParent01_title",
      "refId": 100111,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "IncomeParent01",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_IncomeParent01_required",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "IncomeParent02",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_IncomeParent02_value",
      "nodes": [],
      "ref": 100112,
      "formulaName": "KSP_IncomeParent02_value",
      "refId": 100112,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Situation_value"
    },
    {
      "rowId": "IncomeParent02",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_IncomeParent02_title",
      "nodes": [],
      "ref": 100113,
      "formulaName": "KSP_IncomeParent02_title",
      "refId": 100113,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "IncomeParent02",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_IncomeParent02_required",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "WorkingHoursWeeklyParent01",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_WorkingHoursWeeklyParent01_value",
      "nodes": [],
      "ref": 100114,
      "formulaName": "KSP_WorkingHoursWeeklyParent01_value",
      "refId": 100114,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Situation_value"
    },
    {
      "rowId": "WorkingHoursWeeklyParent01",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_WorkingHoursWeeklyParent01_title",
      "nodes": [],
      "ref": 100115,
      "formulaName": "KSP_WorkingHoursWeeklyParent01_title",
      "refId": 100115,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "WorkingHoursWeeklyParent01",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_WorkingHoursWeeklyParent01_required",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "WorkingHoursWeeklyParent02",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_WorkingHoursWeeklyParent02_value",
      "nodes": [],
      "ref": 100116,
      "formulaName": "KSP_WorkingHoursWeeklyParent02_value",
      "refId": 100116,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Situation_value"
    },
    {
      "rowId": "WorkingHoursWeeklyParent02",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_WorkingHoursWeeklyParent02_title",
      "nodes": [],
      "ref": 100117,
      "formulaName": "KSP_WorkingHoursWeeklyParent02_title",
      "refId": 100117,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "WorkingHoursWeeklyParent02",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_WorkingHoursWeeklyParent02_required",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "WorkingHoursWeeklyOfLeastWorkingParent",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_WorkingHoursWeeklyOfLeastWorkingParent_value",
      "nodes": [],
      "ref": 100118,
      "formulaName": "KSP_WorkingHoursWeeklyOfLeastWorkingParent_value",
      "refId": 100118,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Situation_value"
    },
    {
      "rowId": "WorkingHoursWeeklyOfLeastWorkingParent",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_WorkingHoursWeeklyOfLeastWorkingParent_title",
      "nodes": [],
      "ref": 100119,
      "formulaName": "KSP_WorkingHoursWeeklyOfLeastWorkingParent_title",
      "refId": 100119,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "WorkingHoursWeeklyOfLeastWorkingParent",
      "solutionName": "KSP",
      "colId": "hint",
      "name": "KSP_WorkingHoursWeeklyOfLeastWorkingParent_hint",
      "nodes": [],
      "ref": 100120,
      "formulaName": "KSP_WorkingHoursWeeklyOfLeastWorkingParent_hint",
      "refId": 100120,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "WorkingHoursWeeklyOfLeastWorkingParent",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_WorkingHoursWeeklyOfLeastWorkingParent_required",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Child",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Child_value",
      "nodes": [
        {
          "name": "KSP_ChildGender_value",
          "rowId": "ChildGender",
          "colId": "value",
          "identifier": "KSP_Child_value"
        },
        {
          "name": "KSP_NrOfDaysChildcareWeek_value",
          "rowId": "NrOfDaysChildcareWeek",
          "colId": "value",
          "identifier": "KSP_Child_value"
        },
        {
          "name": "KSP_NrOfDaysChildcareMonth_value",
          "rowId": "NrOfDaysChildcareMonth",
          "colId": "value",
          "identifier": "KSP_Child_value"
        },
        {
          "name": "KSP_NrOfDaysOutOfSchoolCareWeek_value",
          "rowId": "NrOfDaysOutOfSchoolCareWeek",
          "colId": "value",
          "identifier": "KSP_Child_value"
        },
        {
          "name": "KSP_NrOfDaysOutOfSchoolCareMonth_value",
          "rowId": "NrOfDaysOutOfSchoolCareMonth",
          "colId": "value",
          "identifier": "KSP_Child_value"
        },
        {
          "name": "KSP_HourlyFeeChildCare_value",
          "rowId": "HourlyFeeChildCare",
          "colId": "value",
          "identifier": "KSP_Child_value"
        },
        {
          "name": "KSP_HourlyFeeOutOfSchoolCare_value",
          "rowId": "HourlyFeeOutOfSchoolCare",
          "colId": "value",
          "identifier": "KSP_Child_value"
        },
        {
          "name": "KSP_ParentalContributionPrimaryEducation_value",
          "rowId": "ParentalContributionPrimaryEducation",
          "colId": "value",
          "identifier": "KSP_Child_value"
        },
        {
          "name": "KSP_CostsUnspecified_value",
          "rowId": "CostsUnspecified",
          "colId": "value",
          "identifier": "KSP_Child_value"
        },
        {
          "name": "KSP_SecondaryEducationProfile_value",
          "rowId": "SecondaryEducationProfile",
          "colId": "value",
          "identifier": "KSP_Child_value"
        },
        {
          "name": "KSP_TotalyYearlyCostsChild_value",
          "rowId": "TotalyYearlyCostsChild",
          "colId": "value",
          "identifier": "KSP_Child_value"
        }
      ],
      "ref": 100121,
      "formulaName": "KSP_Child_value",
      "refId": 100121,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Situation_value",
      "tuple": true,
      "nestedTupleDepth": 1,
      "tupleDefinition": true
    },
    {
      "rowId": "Child",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Child_title",
      "nodes": [],
      "ref": 100122,
      "formulaName": "KSP_Child_title",
      "refId": 100122,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Child",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Child_locked",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildGender",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_ChildGender_value",
      "nodes": [],
      "ref": 100123,
      "formulaName": "KSP_ChildGender_value",
      "refId": 100123,
      "displayAs": "radio",
      "frequency": "document",
      "parentName": "Child_value",
      "tuple": true,
      "nestedTupleDepth": 1,
      "tupleDefinitionName": "Child",
      "tupleProperty": true
    },
    {
      "rowId": "ChildGender",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_ChildGender_title",
      "nodes": [],
      "ref": 100124,
      "formulaName": "KSP_ChildGender_title",
      "refId": 100124,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildGender",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_ChildGender_required",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildGender",
      "solutionName": "KSP",
      "colId": "choices",
      "name": "KSP_ChildGender_choices",
      "nodes": [],
      "ref": 100125,
      "formulaName": "KSP_ChildGender_choices",
      "refId": 100125,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "NrOfDaysChildcareWeek",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_NrOfDaysChildcareWeek_value",
      "nodes": [],
      "ref": 100126,
      "formulaName": "KSP_NrOfDaysChildcareWeek_value",
      "refId": 100126,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Child_value",
      "tuple": true,
      "nestedTupleDepth": 1,
      "tupleDefinitionName": "Child",
      "tupleProperty": true
    },
    {
      "rowId": "NrOfDaysChildcareWeek",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_NrOfDaysChildcareWeek_title",
      "nodes": [],
      "ref": 100127,
      "formulaName": "KSP_NrOfDaysChildcareWeek_title",
      "refId": 100127,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "NrOfDaysChildcareWeek",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_NrOfDaysChildcareWeek_required",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "NrOfDaysChildcareMonth",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_NrOfDaysChildcareMonth_value",
      "nodes": [],
      "ref": 100128,
      "formulaName": "KSP_NrOfDaysChildcareMonth_value",
      "refId": 100128,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Child_value",
      "tuple": true,
      "nestedTupleDepth": 1,
      "tupleDefinitionName": "Child",
      "tupleProperty": true
    },
    {
      "rowId": "NrOfDaysChildcareMonth",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_NrOfDaysChildcareMonth_title",
      "nodes": [],
      "ref": 100129,
      "formulaName": "KSP_NrOfDaysChildcareMonth_title",
      "refId": 100129,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "NrOfDaysChildcareMonth",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_NrOfDaysChildcareMonth_locked",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "NrOfDaysOutOfSchoolCareWeek",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_NrOfDaysOutOfSchoolCareWeek_value",
      "nodes": [],
      "ref": 100130,
      "formulaName": "KSP_NrOfDaysOutOfSchoolCareWeek_value",
      "refId": 100130,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Child_value",
      "tuple": true,
      "nestedTupleDepth": 1,
      "tupleDefinitionName": "Child",
      "tupleProperty": true
    },
    {
      "rowId": "NrOfDaysOutOfSchoolCareWeek",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_NrOfDaysOutOfSchoolCareWeek_title",
      "nodes": [],
      "ref": 100131,
      "formulaName": "KSP_NrOfDaysOutOfSchoolCareWeek_title",
      "refId": 100131,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "NrOfDaysOutOfSchoolCareWeek",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_NrOfDaysOutOfSchoolCareWeek_required",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "NrOfDaysOutOfSchoolCareMonth",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_NrOfDaysOutOfSchoolCareMonth_value",
      "nodes": [],
      "ref": 100132,
      "formulaName": "KSP_NrOfDaysOutOfSchoolCareMonth_value",
      "refId": 100132,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Child_value",
      "tuple": true,
      "nestedTupleDepth": 1,
      "tupleDefinitionName": "Child",
      "tupleProperty": true
    },
    {
      "rowId": "NrOfDaysOutOfSchoolCareMonth",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_NrOfDaysOutOfSchoolCareMonth_title",
      "nodes": [],
      "ref": 100133,
      "formulaName": "KSP_NrOfDaysOutOfSchoolCareMonth_title",
      "refId": 100133,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "NrOfDaysOutOfSchoolCareMonth",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_NrOfDaysOutOfSchoolCareMonth_locked",
      "nodes": [],
      "ref": 100079,
      "formulaName": "KSP_Q_MAP00_value",
      "refId": 100079,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "HourlyFeeChildCare",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_HourlyFeeChildCare_value",
      "nodes": [],
      "ref": 100134,
      "formulaName": "KSP_HourlyFeeChildCare_value",
      "refId": 100134,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Child_value",
      "tuple": true,
      "nestedTupleDepth": 1,
      "tupleDefinitionName": "Child",
      "tupleProperty": true
    },
    {
      "rowId": "HourlyFeeChildCare",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_HourlyFeeChildCare_title",
      "nodes": [],
      "ref": 100135,
      "formulaName": "KSP_HourlyFeeChildCare_title",
      "refId": 100135,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "HourlyFeeOutOfSchoolCare",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_HourlyFeeOutOfSchoolCare_value",
      "nodes": [],
      "ref": 100136,
      "formulaName": "KSP_HourlyFeeOutOfSchoolCare_value",
      "refId": 100136,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Child_value",
      "tuple": true,
      "nestedTupleDepth": 1,
      "tupleDefinitionName": "Child",
      "tupleProperty": true
    },
    {
      "rowId": "HourlyFeeOutOfSchoolCare",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_HourlyFeeOutOfSchoolCare_title",
      "nodes": [],
      "ref": 100137,
      "formulaName": "KSP_HourlyFeeOutOfSchoolCare_title",
      "refId": 100137,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ParentalContributionPrimaryEducation",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_ParentalContributionPrimaryEducation_value",
      "nodes": [],
      "ref": 100138,
      "formulaName": "KSP_ParentalContributionPrimaryEducation_value",
      "refId": 100138,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Child_value",
      "tuple": true,
      "nestedTupleDepth": 1,
      "tupleDefinitionName": "Child",
      "tupleProperty": true
    },
    {
      "rowId": "ParentalContributionPrimaryEducation",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_ParentalContributionPrimaryEducation_title",
      "nodes": [],
      "ref": 100139,
      "formulaName": "KSP_ParentalContributionPrimaryEducation_title",
      "refId": 100139,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CostsUnspecified",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_CostsUnspecified_value",
      "nodes": [],
      "ref": 100140,
      "formulaName": "KSP_CostsUnspecified_value",
      "refId": 100140,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Child_value",
      "tuple": true,
      "nestedTupleDepth": 1,
      "tupleDefinitionName": "Child",
      "tupleProperty": true
    },
    {
      "rowId": "CostsUnspecified",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_CostsUnspecified_title",
      "nodes": [],
      "ref": 100141,
      "formulaName": "KSP_CostsUnspecified_title",
      "refId": 100141,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "SecondaryEducationProfile",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_SecondaryEducationProfile_value",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "select",
      "frequency": "document",
      "parentName": "Child_value",
      "tuple": true,
      "nestedTupleDepth": 1,
      "tupleDefinitionName": "Child",
      "tupleProperty": true
    },
    {
      "rowId": "SecondaryEducationProfile",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_SecondaryEducationProfile_title",
      "nodes": [],
      "ref": 100143,
      "formulaName": "KSP_SecondaryEducationProfile_title",
      "refId": 100143,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "SecondaryEducationProfile",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_SecondaryEducationProfile_required",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "SecondaryEducationProfile",
      "solutionName": "KSP",
      "colId": "choices",
      "name": "KSP_SecondaryEducationProfile_choices",
      "nodes": [],
      "ref": 100144,
      "formulaName": "KSP_SecondaryEducationProfile_choices",
      "refId": 100144,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "TotalyYearlyCostsChild",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_TotalyYearlyCostsChild_value",
      "nodes": [],
      "ref": 100145,
      "formulaName": "KSP_TotalyYearlyCostsChild_value",
      "refId": 100145,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Child_value",
      "tuple": true,
      "nestedTupleDepth": 1,
      "tupleDefinitionName": "Child",
      "tupleProperty": true
    },
    {
      "rowId": "TotalyYearlyCostsChild",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_TotalyYearlyCostsChild_title",
      "nodes": [],
      "ref": 100146,
      "formulaName": "KSP_TotalyYearlyCostsChild_title",
      "refId": 100146,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "TotalyYearlyCostsChild",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_TotalyYearlyCostsChild_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "TupleSumTest",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_TupleSumTest_value",
      "nodes": [],
      "ref": 100147,
      "formulaName": "KSP_TupleSumTest_value",
      "refId": 100147,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Situation_value"
    },
    {
      "rowId": "Memo1",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Memo1_value",
      "nodes": [],
      "ref": 100148,
      "formulaName": "KSP_Memo1_value",
      "refId": 100148,
      "displayAs": "memo",
      "frequency": "document",
      "parentName": "Situation_value"
    },
    {
      "rowId": "Memo1",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Memo1_title",
      "nodes": [],
      "ref": 100149,
      "formulaName": "KSP_Memo1_title",
      "refId": 100149,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_PARAGRAAF09",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP01_PARAGRAAF09_value",
      "nodes": [
        {
          "name": "KSP_Q_MAP01_STATUS_value",
          "rowId": "Q_MAP01_STATUS",
          "colId": "value",
          "identifier": "KSP_Q_MAP01_PARAGRAAF09_value"
        },
        {
          "name": "KSP_Q_MAP01_PARAGRAAF09SUB2_value",
          "rowId": "Q_MAP01_PARAGRAAF09SUB2",
          "colId": "value",
          "identifier": "KSP_Q_MAP01_PARAGRAAF09_value"
        },
        {
          "name": "KSP_Q_MAP01_PARAGRAAF09SUB3_value",
          "rowId": "Q_MAP01_PARAGRAAF09SUB3",
          "colId": "value",
          "identifier": "KSP_Q_MAP01_PARAGRAAF09_value"
        },
        {
          "name": "KSP_Q_MAP01_PARAGRAAF09SUB4_value",
          "rowId": "Q_MAP01_PARAGRAAF09SUB4",
          "colId": "value",
          "identifier": "KSP_Q_MAP01_PARAGRAAF09_value"
        },
        {
          "name": "KSP_Q_MAP01_PARAGRAAF09SUB5_value",
          "rowId": "Q_MAP01_PARAGRAAF09SUB5",
          "colId": "value",
          "identifier": "KSP_Q_MAP01_PARAGRAAF09_value"
        },
        {
          "name": "KSP_Q_MAP01_PARAGRAAF09SUB6_value",
          "rowId": "Q_MAP01_PARAGRAAF09SUB6",
          "colId": "value",
          "identifier": "KSP_Q_MAP01_PARAGRAAF09_value"
        }
      ],
      "ref": 100150,
      "formulaName": "KSP_Q_MAP01_PARAGRAAF09_value",
      "refId": 100150,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Q_MAP01_value"
    },
    {
      "rowId": "Q_MAP01_PARAGRAAF09",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP01_PARAGRAAF09_title",
      "nodes": [],
      "ref": 100151,
      "formulaName": "KSP_Q_MAP01_PARAGRAAF09_title",
      "refId": 100151,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_PARAGRAAF09",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP01_PARAGRAAF09_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_PARAGRAAF09",
      "solutionName": "KSP",
      "colId": "visible",
      "name": "KSP_Q_MAP01_PARAGRAAF09_visible",
      "nodes": [],
      "ref": 100152,
      "formulaName": "KSP_Q_MAP01_PARAGRAAF09_visible",
      "refId": 100152,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_STATUS",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP01_STATUS_value",
      "nodes": [],
      "ref": 100153,
      "formulaName": "KSP_Q_MAP01_STATUS_value",
      "refId": 100153,
      "displayAs": "radio",
      "frequency": "document",
      "parentName": "Q_MAP01_PARAGRAAF09_value"
    },
    {
      "rowId": "Q_MAP01_STATUS",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP01_STATUS_title",
      "nodes": [],
      "ref": 100154,
      "formulaName": "KSP_Q_MAP01_STATUS_title",
      "refId": 100154,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_STATUS",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP01_STATUS_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_STATUS",
      "solutionName": "KSP",
      "colId": "choices",
      "name": "KSP_Q_MAP01_STATUS_choices",
      "nodes": [],
      "ref": 100155,
      "formulaName": "KSP_Q_MAP01_STATUS_choices",
      "refId": 100155,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_PARAGRAAF09SUB2",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB2_value",
      "nodes": [],
      "ref": 100156,
      "formulaName": "KSP_Q_MAP01_PARAGRAAF09SUB2_value",
      "refId": 100156,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP01_PARAGRAAF09_value"
    },
    {
      "rowId": "Q_MAP01_PARAGRAAF09SUB2",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB2_title",
      "nodes": [],
      "ref": 100157,
      "formulaName": "KSP_Q_MAP01_PARAGRAAF09SUB2_title",
      "refId": 100157,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_PARAGRAAF09SUB2",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB2_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_PARAGRAAF09SUB3",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB3_value",
      "nodes": [],
      "ref": 100158,
      "formulaName": "KSP_Q_MAP01_PARAGRAAF09SUB3_value",
      "refId": 100158,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP01_PARAGRAAF09_value"
    },
    {
      "rowId": "Q_MAP01_PARAGRAAF09SUB3",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB3_title",
      "nodes": [],
      "ref": 100159,
      "formulaName": "KSP_Q_MAP01_PARAGRAAF09SUB3_title",
      "refId": 100159,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_PARAGRAAF09SUB3",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB3_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_PARAGRAAF09SUB4",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB4_value",
      "nodes": [],
      "ref": 100160,
      "formulaName": "KSP_Q_MAP01_PARAGRAAF09SUB4_value",
      "refId": 100160,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP01_PARAGRAAF09_value"
    },
    {
      "rowId": "Q_MAP01_PARAGRAAF09SUB4",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB4_title",
      "nodes": [],
      "ref": 100161,
      "formulaName": "KSP_Q_MAP01_PARAGRAAF09SUB4_title",
      "refId": 100161,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_PARAGRAAF09SUB4",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB4_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_PARAGRAAF09SUB5",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB5_value",
      "nodes": [],
      "ref": 100162,
      "formulaName": "KSP_Q_MAP01_PARAGRAAF09SUB5_value",
      "refId": 100162,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP01_PARAGRAAF09_value"
    },
    {
      "rowId": "Q_MAP01_PARAGRAAF09SUB5",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB5_title",
      "nodes": [],
      "ref": 100163,
      "formulaName": "KSP_Q_MAP01_PARAGRAAF09SUB5_title",
      "refId": 100163,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_PARAGRAAF09SUB5",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB5_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_PARAGRAAF09SUB6",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB6_value",
      "nodes": [],
      "ref": 100164,
      "formulaName": "KSP_Q_MAP01_PARAGRAAF09SUB6_value",
      "refId": 100164,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP01_PARAGRAAF09_value"
    },
    {
      "rowId": "Q_MAP01_PARAGRAAF09SUB6",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB6_title",
      "nodes": [],
      "ref": 100165,
      "formulaName": "KSP_Q_MAP01_PARAGRAAF09SUB6_title",
      "refId": 100165,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_PARAGRAAF09SUB6",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP01_PARAGRAAF09SUB6_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_HULPVARIABELEN",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP01_HULPVARIABELEN_value",
      "nodes": [
        {
          "name": "KSP_Q_MAP01_REQUIREDVARS_value",
          "rowId": "Q_MAP01_REQUIREDVARS",
          "colId": "value",
          "identifier": "KSP_Q_MAP01_HULPVARIABELEN_value"
        },
        {
          "name": "KSP_Q_MAP01_ENTEREDREQUIREDVARS_value",
          "rowId": "Q_MAP01_ENTEREDREQUIREDVARS",
          "colId": "value",
          "identifier": "KSP_Q_MAP01_HULPVARIABELEN_value"
        },
        {
          "name": "KSP_DEBUG_value",
          "rowId": "DEBUG",
          "colId": "value",
          "identifier": "KSP_Q_MAP01_HULPVARIABELEN_value"
        }
      ],
      "ref": 100166,
      "formulaName": "KSP_Q_MAP01_HULPVARIABELEN_value",
      "refId": 100166,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Q_MAP01_value"
    },
    {
      "rowId": "Q_MAP01_HULPVARIABELEN",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP01_HULPVARIABELEN_title",
      "nodes": [],
      "ref": 100167,
      "formulaName": "KSP_Q_MAP01_HULPVARIABELEN_title",
      "refId": 100167,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_HULPVARIABELEN",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP01_HULPVARIABELEN_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_HULPVARIABELEN",
      "solutionName": "KSP",
      "colId": "visible",
      "name": "KSP_Q_MAP01_HULPVARIABELEN_visible",
      "nodes": [],
      "ref": 100168,
      "formulaName": "KSP_Q_MAP01_HULPVARIABELEN_visible",
      "refId": 100168,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_REQUIREDVARS",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP01_REQUIREDVARS_value",
      "nodes": [],
      "ref": 100169,
      "formulaName": "KSP_Q_MAP01_REQUIREDVARS_value",
      "refId": 100169,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP01_HULPVARIABELEN_value"
    },
    {
      "rowId": "Q_MAP01_REQUIREDVARS",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP01_REQUIREDVARS_title",
      "nodes": [],
      "ref": 100170,
      "formulaName": "KSP_Q_MAP01_REQUIREDVARS_title",
      "refId": 100170,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_REQUIREDVARS",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP01_REQUIREDVARS_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_ENTEREDREQUIREDVARS",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP01_ENTEREDREQUIREDVARS_value",
      "nodes": [],
      "ref": 100171,
      "formulaName": "KSP_Q_MAP01_ENTEREDREQUIREDVARS_value",
      "refId": 100171,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP01_HULPVARIABELEN_value"
    },
    {
      "rowId": "Q_MAP01_ENTEREDREQUIREDVARS",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP01_ENTEREDREQUIREDVARS_title",
      "nodes": [],
      "ref": 100172,
      "formulaName": "KSP_Q_MAP01_ENTEREDREQUIREDVARS_title",
      "refId": 100172,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01_ENTEREDREQUIREDVARS",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP01_ENTEREDREQUIREDVARS_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "DEBUG",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_DEBUG_value",
      "nodes": [],
      "ref": 100173,
      "formulaName": "KSP_DEBUG_value",
      "refId": 100173,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP01_HULPVARIABELEN_value"
    },
    {
      "rowId": "DEBUG",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_DEBUG_title",
      "nodes": [],
      "ref": 100174,
      "formulaName": "KSP_DEBUG_title",
      "refId": 100174,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "DEBUG",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_DEBUG_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP02_value",
      "nodes": [
        {
          "name": "KSP_Q_MAP02_WARNING_value",
          "rowId": "Q_MAP02_WARNING",
          "colId": "value",
          "identifier": "KSP_Q_MAP02_value"
        },
        {
          "name": "KSP_Q_MAP02_INFO_value",
          "rowId": "Q_MAP02_INFO",
          "colId": "value",
          "identifier": "KSP_Q_MAP02_value"
        },
        {
          "name": "KSP_Q_MAP02_VALIDATION_value",
          "rowId": "Q_MAP02_VALIDATION",
          "colId": "value",
          "identifier": "KSP_Q_MAP02_value"
        },
        {
          "name": "KSP_Q_MAP02_HINT_value",
          "rowId": "Q_MAP02_HINT",
          "colId": "value",
          "identifier": "KSP_Q_MAP02_value"
        },
        {
          "name": "KSP_FiscalParameters_value",
          "rowId": "FiscalParameters",
          "colId": "value",
          "identifier": "KSP_Q_MAP02_value"
        },
        {
          "name": "KSP_CombinationDiscount_value",
          "rowId": "CombinationDiscount",
          "colId": "value",
          "identifier": "KSP_Q_MAP02_value"
        },
        {
          "name": "KSP_ChildRelatedBudget_value",
          "rowId": "ChildRelatedBudget",
          "colId": "value",
          "identifier": "KSP_Q_MAP02_value"
        },
        {
          "name": "KSP_Fees_value",
          "rowId": "Fees",
          "colId": "value",
          "identifier": "KSP_Q_MAP02_value"
        },
        {
          "name": "KSP_CostsSecondaryEducation_value",
          "rowId": "CostsSecondaryEducation",
          "colId": "value",
          "identifier": "KSP_Q_MAP02_value"
        },
        {
          "name": "KSP_Q_MAP02SUB10_value",
          "rowId": "Q_MAP02SUB10",
          "colId": "value",
          "identifier": "KSP_Q_MAP02_value"
        },
        {
          "name": "KSP_Q_MAP02SUB11_value",
          "rowId": "Q_MAP02SUB11",
          "colId": "value",
          "identifier": "KSP_Q_MAP02_value"
        },
        {
          "name": "KSP_Q_MAP02_PARAGRAAF09_value",
          "rowId": "Q_MAP02_PARAGRAAF09",
          "colId": "value",
          "identifier": "KSP_Q_MAP02_value"
        },
        {
          "name": "KSP_Q_MAP02_HULPVARIABELEN_value",
          "rowId": "Q_MAP02_HULPVARIABELEN",
          "colId": "value",
          "identifier": "KSP_Q_MAP02_value"
        }
      ],
      "ref": 100175,
      "formulaName": "KSP_Q_MAP02_value",
      "refId": 100175,
      "displayAs": "radio",
      "frequency": "document",
      "parentName": "Q_ROOT_value"
    },
    {
      "rowId": "Q_MAP02",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP02_title",
      "nodes": [],
      "ref": 100176,
      "formulaName": "KSP_Q_MAP02_title",
      "refId": 100176,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP02_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02",
      "solutionName": "KSP",
      "colId": "visible",
      "name": "KSP_Q_MAP02_visible",
      "nodes": [],
      "ref": 100177,
      "formulaName": "KSP_Q_MAP02_visible",
      "refId": 100177,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02",
      "solutionName": "KSP",
      "colId": "choices",
      "name": "KSP_Q_MAP02_choices",
      "nodes": [],
      "ref": 100078,
      "formulaName": "KSP_Q_ROOT_choices",
      "refId": 100078,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_WARNING",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP02_WARNING_value",
      "nodes": [],
      "ref": 100178,
      "formulaName": "KSP_Q_MAP02_WARNING_value",
      "refId": 100178,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP02_value"
    },
    {
      "rowId": "Q_MAP02_WARNING",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP02_WARNING_title",
      "nodes": [],
      "ref": 100179,
      "formulaName": "KSP_Q_MAP02_WARNING_title",
      "refId": 100179,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_WARNING",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP02_WARNING_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_INFO",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP02_INFO_value",
      "nodes": [],
      "ref": 100180,
      "formulaName": "KSP_Q_MAP02_INFO_value",
      "refId": 100180,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP02_value"
    },
    {
      "rowId": "Q_MAP02_INFO",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP02_INFO_title",
      "nodes": [],
      "ref": 100181,
      "formulaName": "KSP_Q_MAP02_INFO_title",
      "refId": 100181,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_INFO",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP02_INFO_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_VALIDATION",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP02_VALIDATION_value",
      "nodes": [],
      "ref": 100182,
      "formulaName": "KSP_Q_MAP02_VALIDATION_value",
      "refId": 100182,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP02_value"
    },
    {
      "rowId": "Q_MAP02_VALIDATION",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP02_VALIDATION_title",
      "nodes": [],
      "ref": 100183,
      "formulaName": "KSP_Q_MAP02_VALIDATION_title",
      "refId": 100183,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_VALIDATION",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP02_VALIDATION_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_HINT",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP02_HINT_value",
      "nodes": [],
      "ref": 100184,
      "formulaName": "KSP_Q_MAP02_HINT_value",
      "refId": 100184,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP02_value"
    },
    {
      "rowId": "Q_MAP02_HINT",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP02_HINT_title",
      "nodes": [],
      "ref": 100185,
      "formulaName": "KSP_Q_MAP02_HINT_title",
      "refId": 100185,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_HINT",
      "solutionName": "KSP",
      "colId": "hint",
      "name": "KSP_Q_MAP02_HINT_hint",
      "nodes": [],
      "ref": 100186,
      "formulaName": "KSP_Q_MAP02_HINT_hint",
      "refId": 100186,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_HINT",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP02_HINT_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FiscalParameters",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FiscalParameters_value",
      "nodes": [
        {
          "name": "KSP_ChildcareContribution_value",
          "rowId": "ChildcareContribution",
          "colId": "value",
          "identifier": "KSP_FiscalParameters_value"
        },
        {
          "name": "KSP_MaximumNrOfHoursOfChildcareAllowancePerMonth_value",
          "rowId": "MaximumNrOfHoursOfChildcareAllowancePerMonth",
          "colId": "value",
          "identifier": "KSP_FiscalParameters_value"
        },
        {
          "name": "KSP_MultiplierDaycare_value",
          "rowId": "MultiplierDaycare",
          "colId": "value",
          "identifier": "KSP_FiscalParameters_value"
        },
        {
          "name": "KSP_MultiplierOutOfSchoolCare_value",
          "rowId": "MultiplierOutOfSchoolCare",
          "colId": "value",
          "identifier": "KSP_FiscalParameters_value"
        },
        {
          "name": "KSP_MaxHourlyRateChildcare_value",
          "rowId": "MaxHourlyRateChildcare",
          "colId": "value",
          "identifier": "KSP_FiscalParameters_value"
        },
        {
          "name": "KSP_MaxHourlyRateOutOfSchoolCare_value",
          "rowId": "MaxHourlyRateOutOfSchoolCare",
          "colId": "value",
          "identifier": "KSP_FiscalParameters_value"
        },
        {
          "name": "KSP_MaxHourlyRateGuestParent_value",
          "rowId": "MaxHourlyRateGuestParent",
          "colId": "value",
          "identifier": "KSP_FiscalParameters_value"
        },
        {
          "name": "KSP_MaxHourlyRateGuestParentOutOfSchoolCare_value",
          "rowId": "MaxHourlyRateGuestParentOutOfSchoolCare",
          "colId": "value",
          "identifier": "KSP_FiscalParameters_value"
        }
      ],
      "ref": 100187,
      "formulaName": "KSP_FiscalParameters_value",
      "refId": 100187,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Q_MAP02_value"
    },
    {
      "rowId": "FiscalParameters",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_FiscalParameters_title",
      "nodes": [],
      "ref": 100188,
      "formulaName": "KSP_FiscalParameters_title",
      "refId": 100188,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FiscalParameters",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_FiscalParameters_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildcareContribution",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_ChildcareContribution_value",
      "nodes": [],
      "ref": 100189,
      "formulaName": "KSP_ChildcareContribution_value",
      "refId": 100189,
      "displayAs": "string",
      "parentName": "FiscalParameters_value"
    },
    {
      "rowId": "ChildcareContribution",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_ChildcareContribution_title",
      "nodes": [],
      "ref": 100190,
      "formulaName": "KSP_ChildcareContribution_title",
      "refId": 100190,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildcareContribution",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_ChildcareContribution_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaximumNrOfHoursOfChildcareAllowancePerMonth",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_MaximumNrOfHoursOfChildcareAllowancePerMonth_value",
      "nodes": [],
      "ref": 100191,
      "formulaName": "KSP_MaximumNrOfHoursOfChildcareAllowancePerMonth_value",
      "refId": 100191,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "FiscalParameters_value"
    },
    {
      "rowId": "MaximumNrOfHoursOfChildcareAllowancePerMonth",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_MaximumNrOfHoursOfChildcareAllowancePerMonth_title",
      "nodes": [],
      "ref": 100192,
      "formulaName": "KSP_MaximumNrOfHoursOfChildcareAllowancePerMonth_title",
      "refId": 100192,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaximumNrOfHoursOfChildcareAllowancePerMonth",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_MaximumNrOfHoursOfChildcareAllowancePerMonth_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MultiplierDaycare",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_MultiplierDaycare_value",
      "nodes": [],
      "ref": 100193,
      "formulaName": "KSP_MultiplierDaycare_value",
      "refId": 100193,
      "displayAs": "percentage",
      "frequency": "document",
      "parentName": "FiscalParameters_value"
    },
    {
      "rowId": "MultiplierDaycare",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_MultiplierDaycare_title",
      "nodes": [],
      "ref": 100194,
      "formulaName": "KSP_MultiplierDaycare_title",
      "refId": 100194,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MultiplierDaycare",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_MultiplierDaycare_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MultiplierOutOfSchoolCare",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_MultiplierOutOfSchoolCare_value",
      "nodes": [],
      "ref": 100195,
      "formulaName": "KSP_MultiplierOutOfSchoolCare_value",
      "refId": 100195,
      "displayAs": "percentage",
      "frequency": "document",
      "parentName": "FiscalParameters_value"
    },
    {
      "rowId": "MultiplierOutOfSchoolCare",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_MultiplierOutOfSchoolCare_title",
      "nodes": [],
      "ref": 100196,
      "formulaName": "KSP_MultiplierOutOfSchoolCare_title",
      "refId": 100196,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MultiplierOutOfSchoolCare",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_MultiplierOutOfSchoolCare_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxHourlyRateChildcare",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_MaxHourlyRateChildcare_value",
      "nodes": [],
      "ref": 100197,
      "formulaName": "KSP_MaxHourlyRateChildcare_value",
      "refId": 100197,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "FiscalParameters_value"
    },
    {
      "rowId": "MaxHourlyRateChildcare",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_MaxHourlyRateChildcare_title",
      "nodes": [],
      "ref": 100198,
      "formulaName": "KSP_MaxHourlyRateChildcare_title",
      "refId": 100198,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxHourlyRateChildcare",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_MaxHourlyRateChildcare_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxHourlyRateOutOfSchoolCare",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_MaxHourlyRateOutOfSchoolCare_value",
      "nodes": [],
      "ref": 100199,
      "formulaName": "KSP_MaxHourlyRateOutOfSchoolCare_value",
      "refId": 100199,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "FiscalParameters_value"
    },
    {
      "rowId": "MaxHourlyRateOutOfSchoolCare",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_MaxHourlyRateOutOfSchoolCare_title",
      "nodes": [],
      "ref": 100200,
      "formulaName": "KSP_MaxHourlyRateOutOfSchoolCare_title",
      "refId": 100200,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxHourlyRateOutOfSchoolCare",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_MaxHourlyRateOutOfSchoolCare_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxHourlyRateGuestParent",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_MaxHourlyRateGuestParent_value",
      "nodes": [],
      "ref": 100201,
      "formulaName": "KSP_MaxHourlyRateGuestParent_value",
      "refId": 100201,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "FiscalParameters_value"
    },
    {
      "rowId": "MaxHourlyRateGuestParent",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_MaxHourlyRateGuestParent_title",
      "nodes": [],
      "ref": 100202,
      "formulaName": "KSP_MaxHourlyRateGuestParent_title",
      "refId": 100202,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxHourlyRateGuestParent",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_MaxHourlyRateGuestParent_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxHourlyRateGuestParentOutOfSchoolCare",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_MaxHourlyRateGuestParentOutOfSchoolCare_value",
      "nodes": [],
      "ref": 100203,
      "formulaName": "KSP_MaxHourlyRateGuestParentOutOfSchoolCare_value",
      "refId": 100203,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "FiscalParameters_value"
    },
    {
      "rowId": "MaxHourlyRateGuestParentOutOfSchoolCare",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_MaxHourlyRateGuestParentOutOfSchoolCare_title",
      "nodes": [],
      "ref": 100204,
      "formulaName": "KSP_MaxHourlyRateGuestParentOutOfSchoolCare_title",
      "refId": 100204,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxHourlyRateGuestParentOutOfSchoolCare",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_MaxHourlyRateGuestParentOutOfSchoolCare_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CombinationDiscount",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_CombinationDiscount_value",
      "nodes": [
        {
          "name": "KSP_LowerBoundaryIncome_value",
          "rowId": "LowerBoundaryIncome",
          "colId": "value",
          "identifier": "KSP_CombinationDiscount_value"
        },
        {
          "name": "KSP_Base_value",
          "rowId": "Base",
          "colId": "value",
          "identifier": "KSP_CombinationDiscount_value"
        },
        {
          "name": "KSP_CombinationDiscountPercentage_value",
          "rowId": "CombinationDiscountPercentage",
          "colId": "value",
          "identifier": "KSP_CombinationDiscount_value"
        },
        {
          "name": "KSP_MaximumDiscount_value",
          "rowId": "MaximumDiscount",
          "colId": "value",
          "identifier": "KSP_CombinationDiscount_value"
        }
      ],
      "ref": 100205,
      "formulaName": "KSP_CombinationDiscount_value",
      "refId": 100205,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Q_MAP02_value"
    },
    {
      "rowId": "CombinationDiscount",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_CombinationDiscount_title",
      "nodes": [],
      "ref": 100206,
      "formulaName": "KSP_CombinationDiscount_title",
      "refId": 100206,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CombinationDiscount",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_CombinationDiscount_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "LowerBoundaryIncome",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_LowerBoundaryIncome_value",
      "nodes": [],
      "ref": 100207,
      "formulaName": "KSP_LowerBoundaryIncome_value",
      "refId": 100207,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "CombinationDiscount_value"
    },
    {
      "rowId": "LowerBoundaryIncome",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_LowerBoundaryIncome_title",
      "nodes": [],
      "ref": 100208,
      "formulaName": "KSP_LowerBoundaryIncome_title",
      "refId": 100208,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "LowerBoundaryIncome",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_LowerBoundaryIncome_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Base",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Base_value",
      "nodes": [],
      "ref": 100209,
      "formulaName": "KSP_Base_value",
      "refId": 100209,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "CombinationDiscount_value"
    },
    {
      "rowId": "Base",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Base_title",
      "nodes": [],
      "ref": 100210,
      "formulaName": "KSP_Base_title",
      "refId": 100210,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Base",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Base_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CombinationDiscountPercentage",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_CombinationDiscountPercentage_value",
      "nodes": [],
      "ref": 100211,
      "formulaName": "KSP_CombinationDiscountPercentage_value",
      "refId": 100211,
      "displayAs": "percentage",
      "frequency": "document",
      "parentName": "CombinationDiscount_value"
    },
    {
      "rowId": "CombinationDiscountPercentage",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_CombinationDiscountPercentage_title",
      "nodes": [],
      "ref": 100212,
      "formulaName": "KSP_CombinationDiscountPercentage_title",
      "refId": 100212,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CombinationDiscountPercentage",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_CombinationDiscountPercentage_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaximumDiscount",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_MaximumDiscount_value",
      "nodes": [],
      "ref": 100213,
      "formulaName": "KSP_MaximumDiscount_value",
      "refId": 100213,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "CombinationDiscount_value"
    },
    {
      "rowId": "MaximumDiscount",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_MaximumDiscount_title",
      "nodes": [],
      "ref": 100214,
      "formulaName": "KSP_MaximumDiscount_title",
      "refId": 100214,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaximumDiscount",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_MaximumDiscount_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildRelatedBudget",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_ChildRelatedBudget_value",
      "nodes": [
        {
          "name": "KSP_MaxBudgetOneToTwelveYears_value",
          "rowId": "MaxBudgetOneToTwelveYears",
          "colId": "value",
          "identifier": "KSP_ChildRelatedBudget_value"
        },
        {
          "name": "KSP_MaxBudgetTwelveToFifteenYears_value",
          "rowId": "MaxBudgetTwelveToFifteenYears",
          "colId": "value",
          "identifier": "KSP_ChildRelatedBudget_value"
        },
        {
          "name": "KSP_MaxBudgetSixteenToSeventeenYears_value",
          "rowId": "MaxBudgetSixteenToSeventeenYears",
          "colId": "value",
          "identifier": "KSP_ChildRelatedBudget_value"
        },
        {
          "name": "KSP_UpperBoundaryIncome_value",
          "rowId": "UpperBoundaryIncome",
          "colId": "value",
          "identifier": "KSP_ChildRelatedBudget_value"
        },
        {
          "name": "KSP_DecreasingPercentage_value",
          "rowId": "DecreasingPercentage",
          "colId": "value",
          "identifier": "KSP_ChildRelatedBudget_value"
        }
      ],
      "ref": 100215,
      "formulaName": "KSP_ChildRelatedBudget_value",
      "refId": 100215,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Q_MAP02_value"
    },
    {
      "rowId": "ChildRelatedBudget",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_ChildRelatedBudget_title",
      "nodes": [],
      "ref": 100216,
      "formulaName": "KSP_ChildRelatedBudget_title",
      "refId": 100216,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildRelatedBudget",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_ChildRelatedBudget_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxBudgetOneToTwelveYears",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_MaxBudgetOneToTwelveYears_value",
      "nodes": [],
      "ref": 100217,
      "formulaName": "KSP_MaxBudgetOneToTwelveYears_value",
      "refId": 100217,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "ChildRelatedBudget_value"
    },
    {
      "rowId": "MaxBudgetOneToTwelveYears",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_MaxBudgetOneToTwelveYears_title",
      "nodes": [],
      "ref": 100218,
      "formulaName": "KSP_MaxBudgetOneToTwelveYears_title",
      "refId": 100218,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxBudgetOneToTwelveYears",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_MaxBudgetOneToTwelveYears_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxBudgetTwelveToFifteenYears",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_MaxBudgetTwelveToFifteenYears_value",
      "nodes": [],
      "ref": 100219,
      "formulaName": "KSP_MaxBudgetTwelveToFifteenYears_value",
      "refId": 100219,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "ChildRelatedBudget_value"
    },
    {
      "rowId": "MaxBudgetTwelveToFifteenYears",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_MaxBudgetTwelveToFifteenYears_title",
      "nodes": [],
      "ref": 100220,
      "formulaName": "KSP_MaxBudgetTwelveToFifteenYears_title",
      "refId": 100220,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxBudgetTwelveToFifteenYears",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_MaxBudgetTwelveToFifteenYears_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxBudgetSixteenToSeventeenYears",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_MaxBudgetSixteenToSeventeenYears_value",
      "nodes": [],
      "ref": 100221,
      "formulaName": "KSP_MaxBudgetSixteenToSeventeenYears_value",
      "refId": 100221,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "ChildRelatedBudget_value"
    },
    {
      "rowId": "MaxBudgetSixteenToSeventeenYears",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_MaxBudgetSixteenToSeventeenYears_title",
      "nodes": [],
      "ref": 100222,
      "formulaName": "KSP_MaxBudgetSixteenToSeventeenYears_title",
      "refId": 100222,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxBudgetSixteenToSeventeenYears",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_MaxBudgetSixteenToSeventeenYears_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "UpperBoundaryIncome",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_UpperBoundaryIncome_value",
      "nodes": [],
      "ref": 100223,
      "formulaName": "KSP_UpperBoundaryIncome_value",
      "refId": 100223,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "ChildRelatedBudget_value"
    },
    {
      "rowId": "UpperBoundaryIncome",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_UpperBoundaryIncome_title",
      "nodes": [],
      "ref": 100224,
      "formulaName": "KSP_UpperBoundaryIncome_title",
      "refId": 100224,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "UpperBoundaryIncome",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_UpperBoundaryIncome_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "DecreasingPercentage",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_DecreasingPercentage_value",
      "nodes": [],
      "ref": 100225,
      "formulaName": "KSP_DecreasingPercentage_value",
      "refId": 100225,
      "displayAs": "percentage",
      "frequency": "document",
      "parentName": "ChildRelatedBudget_value"
    },
    {
      "rowId": "DecreasingPercentage",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_DecreasingPercentage_title",
      "nodes": [],
      "ref": 100226,
      "formulaName": "KSP_DecreasingPercentage_title",
      "refId": 100226,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "DecreasingPercentage",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_DecreasingPercentage_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Fees",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Fees_value",
      "nodes": [
        {
          "name": "KSP_MaxNrCompensatedHoursChildcare_value",
          "rowId": "MaxNrCompensatedHoursChildcare",
          "colId": "value",
          "identifier": "KSP_Fees_value"
        },
        {
          "name": "KSP_MaxNrCompensatedHoursOutofSchoolCare_value",
          "rowId": "MaxNrCompensatedHoursOutofSchoolCare",
          "colId": "value",
          "identifier": "KSP_Fees_value"
        },
        {
          "name": "KSP_FeesSub3_value",
          "rowId": "FeesSub3",
          "colId": "value",
          "identifier": "KSP_Fees_value"
        },
        {
          "name": "KSP_NrCompensatedHoursChildcare_value",
          "rowId": "NrCompensatedHoursChildcare",
          "colId": "value",
          "identifier": "KSP_Fees_value"
        },
        {
          "name": "KSP_NrCompensatedHoursOutofSchoolCare_value",
          "rowId": "NrCompensatedHoursOutofSchoolCare",
          "colId": "value",
          "identifier": "KSP_Fees_value"
        },
        {
          "name": "KSP_FeesSub6_value",
          "rowId": "FeesSub6",
          "colId": "value",
          "identifier": "KSP_Fees_value"
        },
        {
          "name": "KSP_MaxCompensatedAmountChildcare_value",
          "rowId": "MaxCompensatedAmountChildcare",
          "colId": "value",
          "identifier": "KSP_Fees_value"
        },
        {
          "name": "KSP_MaxCompensatedAmountOutofSchoolCare_value",
          "rowId": "MaxCompensatedAmountOutofSchoolCare",
          "colId": "value",
          "identifier": "KSP_Fees_value"
        },
        {
          "name": "KSP_FeesSub9_value",
          "rowId": "FeesSub9",
          "colId": "value",
          "identifier": "KSP_Fees_value"
        },
        {
          "name": "KSP_TotalIncome_value",
          "rowId": "TotalIncome",
          "colId": "value",
          "identifier": "KSP_Fees_value"
        },
        {
          "name": "KSP_PercentagePremiumFirstChild_value",
          "rowId": "PercentagePremiumFirstChild",
          "colId": "value",
          "identifier": "KSP_Fees_value"
        },
        {
          "name": "KSP_FeesSub12_value",
          "rowId": "FeesSub12",
          "colId": "value",
          "identifier": "KSP_Fees_value"
        },
        {
          "name": "KSP_PremiumForChildcare_value",
          "rowId": "PremiumForChildcare",
          "colId": "value",
          "identifier": "KSP_Fees_value"
        },
        {
          "name": "KSP_PremiumForOutofSchoolCare_value",
          "rowId": "PremiumForOutofSchoolCare",
          "colId": "value",
          "identifier": "KSP_Fees_value"
        }
      ],
      "ref": 100227,
      "formulaName": "KSP_Fees_value",
      "refId": 100227,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Q_MAP02_value"
    },
    {
      "rowId": "Fees",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Fees_title",
      "nodes": [],
      "ref": 100228,
      "formulaName": "KSP_Fees_title",
      "refId": 100228,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Fees",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Fees_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxNrCompensatedHoursChildcare",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_MaxNrCompensatedHoursChildcare_value",
      "nodes": [],
      "ref": 100229,
      "formulaName": "KSP_MaxNrCompensatedHoursChildcare_value",
      "refId": 100229,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Fees_value"
    },
    {
      "rowId": "MaxNrCompensatedHoursChildcare",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_MaxNrCompensatedHoursChildcare_title",
      "nodes": [],
      "ref": 100230,
      "formulaName": "KSP_MaxNrCompensatedHoursChildcare_title",
      "refId": 100230,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxNrCompensatedHoursChildcare",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_MaxNrCompensatedHoursChildcare_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxNrCompensatedHoursOutofSchoolCare",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_MaxNrCompensatedHoursOutofSchoolCare_value",
      "nodes": [],
      "ref": 100231,
      "formulaName": "KSP_MaxNrCompensatedHoursOutofSchoolCare_value",
      "refId": 100231,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Fees_value"
    },
    {
      "rowId": "MaxNrCompensatedHoursOutofSchoolCare",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_MaxNrCompensatedHoursOutofSchoolCare_title",
      "nodes": [],
      "ref": 100232,
      "formulaName": "KSP_MaxNrCompensatedHoursOutofSchoolCare_title",
      "refId": 100232,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxNrCompensatedHoursOutofSchoolCare",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_MaxNrCompensatedHoursOutofSchoolCare_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FeesSub3",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FeesSub3_value",
      "nodes": [],
      "ref": 100233,
      "formulaName": "KSP_FeesSub3_value",
      "refId": 100233,
      "displayAs": "string",
      "parentName": "Fees_value"
    },
    {
      "rowId": "FeesSub3",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_FeesSub3_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "NrCompensatedHoursChildcare",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_NrCompensatedHoursChildcare_value",
      "nodes": [],
      "ref": 100234,
      "formulaName": "KSP_NrCompensatedHoursChildcare_value",
      "refId": 100234,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Fees_value"
    },
    {
      "rowId": "NrCompensatedHoursChildcare",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_NrCompensatedHoursChildcare_title",
      "nodes": [],
      "ref": 100235,
      "formulaName": "KSP_NrCompensatedHoursChildcare_title",
      "refId": 100235,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "NrCompensatedHoursChildcare",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_NrCompensatedHoursChildcare_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "NrCompensatedHoursOutofSchoolCare",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_NrCompensatedHoursOutofSchoolCare_value",
      "nodes": [],
      "ref": 100236,
      "formulaName": "KSP_NrCompensatedHoursOutofSchoolCare_value",
      "refId": 100236,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Fees_value"
    },
    {
      "rowId": "NrCompensatedHoursOutofSchoolCare",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_NrCompensatedHoursOutofSchoolCare_title",
      "nodes": [],
      "ref": 100237,
      "formulaName": "KSP_NrCompensatedHoursOutofSchoolCare_title",
      "refId": 100237,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "NrCompensatedHoursOutofSchoolCare",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_NrCompensatedHoursOutofSchoolCare_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FeesSub6",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FeesSub6_value",
      "nodes": [],
      "ref": 100238,
      "formulaName": "KSP_FeesSub6_value",
      "refId": 100238,
      "displayAs": "string",
      "parentName": "Fees_value"
    },
    {
      "rowId": "FeesSub6",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_FeesSub6_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxCompensatedAmountChildcare",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_MaxCompensatedAmountChildcare_value",
      "nodes": [],
      "ref": 100239,
      "formulaName": "KSP_MaxCompensatedAmountChildcare_value",
      "refId": 100239,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Fees_value"
    },
    {
      "rowId": "MaxCompensatedAmountChildcare",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_MaxCompensatedAmountChildcare_title",
      "nodes": [],
      "ref": 100240,
      "formulaName": "KSP_MaxCompensatedAmountChildcare_title",
      "refId": 100240,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxCompensatedAmountChildcare",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_MaxCompensatedAmountChildcare_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxCompensatedAmountOutofSchoolCare",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_MaxCompensatedAmountOutofSchoolCare_value",
      "nodes": [],
      "ref": 100241,
      "formulaName": "KSP_MaxCompensatedAmountOutofSchoolCare_value",
      "refId": 100241,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Fees_value"
    },
    {
      "rowId": "MaxCompensatedAmountOutofSchoolCare",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_MaxCompensatedAmountOutofSchoolCare_title",
      "nodes": [],
      "ref": 100242,
      "formulaName": "KSP_MaxCompensatedAmountOutofSchoolCare_title",
      "refId": 100242,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MaxCompensatedAmountOutofSchoolCare",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_MaxCompensatedAmountOutofSchoolCare_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FeesSub9",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FeesSub9_value",
      "nodes": [],
      "ref": 100243,
      "formulaName": "KSP_FeesSub9_value",
      "refId": 100243,
      "displayAs": "string",
      "parentName": "Fees_value"
    },
    {
      "rowId": "FeesSub9",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_FeesSub9_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "TotalIncome",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_TotalIncome_value",
      "nodes": [],
      "ref": 100244,
      "formulaName": "KSP_TotalIncome_value",
      "refId": 100244,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Fees_value"
    },
    {
      "rowId": "TotalIncome",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_TotalIncome_title",
      "nodes": [],
      "ref": 100245,
      "formulaName": "KSP_TotalIncome_title",
      "refId": 100245,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "TotalIncome",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_TotalIncome_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "PercentagePremiumFirstChild",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_PercentagePremiumFirstChild_value",
      "nodes": [],
      "ref": 100246,
      "formulaName": "KSP_PercentagePremiumFirstChild_value",
      "refId": 100246,
      "displayAs": "percentage",
      "frequency": "document",
      "parentName": "Fees_value"
    },
    {
      "rowId": "PercentagePremiumFirstChild",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_PercentagePremiumFirstChild_title",
      "nodes": [],
      "ref": 100247,
      "formulaName": "KSP_PercentagePremiumFirstChild_title",
      "refId": 100247,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "PercentagePremiumFirstChild",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_PercentagePremiumFirstChild_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "FeesSub12",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_FeesSub12_value",
      "nodes": [],
      "ref": 100248,
      "formulaName": "KSP_FeesSub12_value",
      "refId": 100248,
      "displayAs": "string",
      "parentName": "Fees_value"
    },
    {
      "rowId": "FeesSub12",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_FeesSub12_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "PremiumForChildcare",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_PremiumForChildcare_value",
      "nodes": [],
      "ref": 100249,
      "formulaName": "KSP_PremiumForChildcare_value",
      "refId": 100249,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Fees_value"
    },
    {
      "rowId": "PremiumForChildcare",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_PremiumForChildcare_title",
      "nodes": [],
      "ref": 100250,
      "formulaName": "KSP_PremiumForChildcare_title",
      "refId": 100250,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "PremiumForChildcare",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_PremiumForChildcare_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "PremiumForOutofSchoolCare",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_PremiumForOutofSchoolCare_value",
      "nodes": [],
      "ref": 100251,
      "formulaName": "KSP_PremiumForOutofSchoolCare_value",
      "refId": 100251,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Fees_value"
    },
    {
      "rowId": "PremiumForOutofSchoolCare",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_PremiumForOutofSchoolCare_title",
      "nodes": [],
      "ref": 100252,
      "formulaName": "KSP_PremiumForOutofSchoolCare_title",
      "refId": 100252,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "PremiumForOutofSchoolCare",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_PremiumForOutofSchoolCare_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CostsSecondaryEducation",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_CostsSecondaryEducation_value",
      "nodes": [
        {
          "name": "KSP_CostsYearOneFour_value",
          "rowId": "CostsYearOneFour",
          "colId": "value",
          "identifier": "KSP_CostsSecondaryEducation_value"
        },
        {
          "name": "KSP_CostsYearFiveSixSeven_value",
          "rowId": "CostsYearFiveSixSeven",
          "colId": "value",
          "identifier": "KSP_CostsSecondaryEducation_value"
        }
      ],
      "ref": 100253,
      "formulaName": "KSP_CostsSecondaryEducation_value",
      "refId": 100253,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Q_MAP02_value"
    },
    {
      "rowId": "CostsSecondaryEducation",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_CostsSecondaryEducation_title",
      "nodes": [],
      "ref": 100254,
      "formulaName": "KSP_CostsSecondaryEducation_title",
      "refId": 100254,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CostsSecondaryEducation",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_CostsSecondaryEducation_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CostsYearOneFour",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_CostsYearOneFour_value",
      "nodes": [],
      "ref": 100255,
      "formulaName": "KSP_CostsYearOneFour_value",
      "refId": 100255,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "CostsSecondaryEducation_value"
    },
    {
      "rowId": "CostsYearOneFour",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_CostsYearOneFour_title",
      "nodes": [],
      "ref": 100256,
      "formulaName": "KSP_CostsYearOneFour_title",
      "refId": 100256,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CostsYearOneFour",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_CostsYearOneFour_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CostsYearFiveSixSeven",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_CostsYearFiveSixSeven_value",
      "nodes": [],
      "ref": 100257,
      "formulaName": "KSP_CostsYearFiveSixSeven_value",
      "refId": 100257,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "CostsSecondaryEducation_value"
    },
    {
      "rowId": "CostsYearFiveSixSeven",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_CostsYearFiveSixSeven_title",
      "nodes": [],
      "ref": 100258,
      "formulaName": "KSP_CostsYearFiveSixSeven_title",
      "refId": 100258,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CostsYearFiveSixSeven",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_CostsYearFiveSixSeven_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02SUB10",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP02SUB10_value",
      "nodes": [
        {
          "name": "KSP_Q_MAP02SUB10SUB1_value",
          "rowId": "Q_MAP02SUB10SUB1",
          "colId": "value",
          "identifier": "KSP_Q_MAP02SUB10_value"
        },
        {
          "name": "KSP_ChildRelatedBudgetDecrease_value",
          "rowId": "ChildRelatedBudgetDecrease",
          "colId": "value",
          "identifier": "KSP_Q_MAP02SUB10_value"
        },
        {
          "name": "KSP_ChildRelatedBudgetUpToTwelve_value",
          "rowId": "ChildRelatedBudgetUpToTwelve",
          "colId": "value",
          "identifier": "KSP_Q_MAP02SUB10_value"
        },
        {
          "name": "KSP_ChildRelatedBudgetTwelveUpToAndInclFifteen_value",
          "rowId": "ChildRelatedBudgetTwelveUpToAndInclFifteen",
          "colId": "value",
          "identifier": "KSP_Q_MAP02SUB10_value"
        },
        {
          "name": "KSP_ChildRelatedBudgetSixteenUpToAndIncSeventeen_value",
          "rowId": "ChildRelatedBudgetSixteenUpToAndIncSeventeen",
          "colId": "value",
          "identifier": "KSP_Q_MAP02SUB10_value"
        }
      ],
      "ref": 100259,
      "formulaName": "KSP_Q_MAP02SUB10_value",
      "refId": 100259,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Q_MAP02_value"
    },
    {
      "rowId": "Q_MAP02SUB10",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP02SUB10_title",
      "nodes": [],
      "ref": 100260,
      "formulaName": "KSP_Q_MAP02SUB10_title",
      "refId": 100260,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02SUB10",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP02SUB10_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02SUB10SUB1",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP02SUB10SUB1_value",
      "nodes": [],
      "ref": 100261,
      "formulaName": "KSP_Q_MAP02SUB10SUB1_value",
      "refId": 100261,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Q_MAP02SUB10_value"
    },
    {
      "rowId": "Q_MAP02SUB10SUB1",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP02SUB10SUB1_title",
      "nodes": [],
      "ref": 100262,
      "formulaName": "KSP_Q_MAP02SUB10SUB1_title",
      "refId": 100262,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02SUB10SUB1",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP02SUB10SUB1_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildRelatedBudgetDecrease",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_ChildRelatedBudgetDecrease_value",
      "nodes": [],
      "ref": 100263,
      "formulaName": "KSP_ChildRelatedBudgetDecrease_value",
      "refId": 100263,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Q_MAP02SUB10_value"
    },
    {
      "rowId": "ChildRelatedBudgetDecrease",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_ChildRelatedBudgetDecrease_title",
      "nodes": [],
      "ref": 100264,
      "formulaName": "KSP_ChildRelatedBudgetDecrease_title",
      "refId": 100264,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildRelatedBudgetDecrease",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_ChildRelatedBudgetDecrease_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildRelatedBudgetUpToTwelve",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_ChildRelatedBudgetUpToTwelve_value",
      "nodes": [],
      "ref": 100265,
      "formulaName": "KSP_ChildRelatedBudgetUpToTwelve_value",
      "refId": 100265,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP02SUB10_value"
    },
    {
      "rowId": "ChildRelatedBudgetUpToTwelve",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_ChildRelatedBudgetUpToTwelve_title",
      "nodes": [],
      "ref": 100266,
      "formulaName": "KSP_ChildRelatedBudgetUpToTwelve_title",
      "refId": 100266,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildRelatedBudgetUpToTwelve",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_ChildRelatedBudgetUpToTwelve_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildRelatedBudgetTwelveUpToAndInclFifteen",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_ChildRelatedBudgetTwelveUpToAndInclFifteen_value",
      "nodes": [],
      "ref": 100267,
      "formulaName": "KSP_ChildRelatedBudgetTwelveUpToAndInclFifteen_value",
      "refId": 100267,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP02SUB10_value"
    },
    {
      "rowId": "ChildRelatedBudgetTwelveUpToAndInclFifteen",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_ChildRelatedBudgetTwelveUpToAndInclFifteen_title",
      "nodes": [],
      "ref": 100268,
      "formulaName": "KSP_ChildRelatedBudgetTwelveUpToAndInclFifteen_title",
      "refId": 100268,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildRelatedBudgetTwelveUpToAndInclFifteen",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_ChildRelatedBudgetTwelveUpToAndInclFifteen_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildRelatedBudgetSixteenUpToAndIncSeventeen",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_ChildRelatedBudgetSixteenUpToAndIncSeventeen_value",
      "nodes": [],
      "ref": 100269,
      "formulaName": "KSP_ChildRelatedBudgetSixteenUpToAndIncSeventeen_value",
      "refId": 100269,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP02SUB10_value"
    },
    {
      "rowId": "ChildRelatedBudgetSixteenUpToAndIncSeventeen",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_ChildRelatedBudgetSixteenUpToAndIncSeventeen_title",
      "nodes": [],
      "ref": 100270,
      "formulaName": "KSP_ChildRelatedBudgetSixteenUpToAndIncSeventeen_title",
      "refId": 100270,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildRelatedBudgetSixteenUpToAndIncSeventeen",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_ChildRelatedBudgetSixteenUpToAndIncSeventeen_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02SUB11",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP02SUB11_value",
      "nodes": [
        {
          "name": "KSP_CombinationDiscountLowestIncome_value",
          "rowId": "CombinationDiscountLowestIncome",
          "colId": "value",
          "identifier": "KSP_Q_MAP02SUB11_value"
        },
        {
          "name": "KSP_CombinationDiscountTotal_value",
          "rowId": "CombinationDiscountTotal",
          "colId": "value",
          "identifier": "KSP_Q_MAP02SUB11_value"
        }
      ],
      "ref": 100271,
      "formulaName": "KSP_Q_MAP02SUB11_value",
      "refId": 100271,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Q_MAP02_value"
    },
    {
      "rowId": "Q_MAP02SUB11",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP02SUB11_title",
      "nodes": [],
      "ref": 100272,
      "formulaName": "KSP_Q_MAP02SUB11_title",
      "refId": 100272,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02SUB11",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP02SUB11_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CombinationDiscountLowestIncome",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_CombinationDiscountLowestIncome_value",
      "nodes": [],
      "ref": 100273,
      "formulaName": "KSP_CombinationDiscountLowestIncome_value",
      "refId": 100273,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP02SUB11_value"
    },
    {
      "rowId": "CombinationDiscountLowestIncome",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_CombinationDiscountLowestIncome_title",
      "nodes": [],
      "ref": 100274,
      "formulaName": "KSP_CombinationDiscountLowestIncome_title",
      "refId": 100274,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CombinationDiscountLowestIncome",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_CombinationDiscountLowestIncome_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CombinationDiscountTotal",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_CombinationDiscountTotal_value",
      "nodes": [],
      "ref": 100275,
      "formulaName": "KSP_CombinationDiscountTotal_value",
      "refId": 100275,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP02SUB11_value"
    },
    {
      "rowId": "CombinationDiscountTotal",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_CombinationDiscountTotal_title",
      "nodes": [],
      "ref": 100276,
      "formulaName": "KSP_CombinationDiscountTotal_title",
      "refId": 100276,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CombinationDiscountTotal",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_CombinationDiscountTotal_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_PARAGRAAF09",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP02_PARAGRAAF09_value",
      "nodes": [
        {
          "name": "KSP_Q_MAP02_STATUS_value",
          "rowId": "Q_MAP02_STATUS",
          "colId": "value",
          "identifier": "KSP_Q_MAP02_PARAGRAAF09_value"
        },
        {
          "name": "KSP_Q_MAP02_PARAGRAAF09SUB2_value",
          "rowId": "Q_MAP02_PARAGRAAF09SUB2",
          "colId": "value",
          "identifier": "KSP_Q_MAP02_PARAGRAAF09_value"
        },
        {
          "name": "KSP_Q_MAP02_PARAGRAAF09SUB3_value",
          "rowId": "Q_MAP02_PARAGRAAF09SUB3",
          "colId": "value",
          "identifier": "KSP_Q_MAP02_PARAGRAAF09_value"
        },
        {
          "name": "KSP_Q_MAP02_PARAGRAAF09SUB4_value",
          "rowId": "Q_MAP02_PARAGRAAF09SUB4",
          "colId": "value",
          "identifier": "KSP_Q_MAP02_PARAGRAAF09_value"
        },
        {
          "name": "KSP_Q_MAP02_PARAGRAAF09SUB5_value",
          "rowId": "Q_MAP02_PARAGRAAF09SUB5",
          "colId": "value",
          "identifier": "KSP_Q_MAP02_PARAGRAAF09_value"
        },
        {
          "name": "KSP_Q_MAP02_PARAGRAAF09SUB6_value",
          "rowId": "Q_MAP02_PARAGRAAF09SUB6",
          "colId": "value",
          "identifier": "KSP_Q_MAP02_PARAGRAAF09_value"
        }
      ],
      "ref": 100277,
      "formulaName": "KSP_Q_MAP02_PARAGRAAF09_value",
      "refId": 100277,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Q_MAP02_value"
    },
    {
      "rowId": "Q_MAP02_PARAGRAAF09",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP02_PARAGRAAF09_title",
      "nodes": [],
      "ref": 100278,
      "formulaName": "KSP_Q_MAP02_PARAGRAAF09_title",
      "refId": 100278,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_PARAGRAAF09",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP02_PARAGRAAF09_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_STATUS",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP02_STATUS_value",
      "nodes": [],
      "ref": 100279,
      "formulaName": "KSP_Q_MAP02_STATUS_value",
      "refId": 100279,
      "displayAs": "radio",
      "frequency": "document",
      "parentName": "Q_MAP02_PARAGRAAF09_value"
    },
    {
      "rowId": "Q_MAP02_STATUS",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP02_STATUS_title",
      "nodes": [],
      "ref": 100280,
      "formulaName": "KSP_Q_MAP02_STATUS_title",
      "refId": 100280,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_STATUS",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP02_STATUS_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_STATUS",
      "solutionName": "KSP",
      "colId": "choices",
      "name": "KSP_Q_MAP02_STATUS_choices",
      "nodes": [],
      "ref": 100155,
      "formulaName": "KSP_Q_MAP01_STATUS_choices",
      "refId": 100155,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_PARAGRAAF09SUB2",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB2_value",
      "nodes": [],
      "ref": 100281,
      "formulaName": "KSP_Q_MAP02_PARAGRAAF09SUB2_value",
      "refId": 100281,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP02_PARAGRAAF09_value"
    },
    {
      "rowId": "Q_MAP02_PARAGRAAF09SUB2",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB2_title",
      "nodes": [],
      "ref": 100282,
      "formulaName": "KSP_Q_MAP02_PARAGRAAF09SUB2_title",
      "refId": 100282,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_PARAGRAAF09SUB2",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB2_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_PARAGRAAF09SUB3",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB3_value",
      "nodes": [],
      "ref": 100283,
      "formulaName": "KSP_Q_MAP02_PARAGRAAF09SUB3_value",
      "refId": 100283,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP02_PARAGRAAF09_value"
    },
    {
      "rowId": "Q_MAP02_PARAGRAAF09SUB3",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB3_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_PARAGRAAF09SUB4",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB4_value",
      "nodes": [],
      "ref": 100284,
      "formulaName": "KSP_Q_MAP02_PARAGRAAF09SUB4_value",
      "refId": 100284,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP02_PARAGRAAF09_value"
    },
    {
      "rowId": "Q_MAP02_PARAGRAAF09SUB4",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB4_title",
      "nodes": [],
      "ref": 100285,
      "formulaName": "KSP_Q_MAP02_PARAGRAAF09SUB4_title",
      "refId": 100285,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_PARAGRAAF09SUB4",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB4_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_PARAGRAAF09SUB5",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB5_value",
      "nodes": [],
      "ref": 100286,
      "formulaName": "KSP_Q_MAP02_PARAGRAAF09SUB5_value",
      "refId": 100286,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP02_PARAGRAAF09_value"
    },
    {
      "rowId": "Q_MAP02_PARAGRAAF09SUB5",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB5_title",
      "nodes": [],
      "ref": 100287,
      "formulaName": "KSP_Q_MAP02_PARAGRAAF09SUB5_title",
      "refId": 100287,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_PARAGRAAF09SUB5",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB5_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_PARAGRAAF09SUB6",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB6_value",
      "nodes": [],
      "ref": 100288,
      "formulaName": "KSP_Q_MAP02_PARAGRAAF09SUB6_value",
      "refId": 100288,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP02_PARAGRAAF09_value"
    },
    {
      "rowId": "Q_MAP02_PARAGRAAF09SUB6",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB6_title",
      "nodes": [],
      "ref": 100289,
      "formulaName": "KSP_Q_MAP02_PARAGRAAF09SUB6_title",
      "refId": 100289,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_PARAGRAAF09SUB6",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP02_PARAGRAAF09SUB6_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_HULPVARIABELEN",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP02_HULPVARIABELEN_value",
      "nodes": [
        {
          "name": "KSP_Q_MAP02_REQUIREDVARS_value",
          "rowId": "Q_MAP02_REQUIREDVARS",
          "colId": "value",
          "identifier": "KSP_Q_MAP02_HULPVARIABELEN_value"
        },
        {
          "name": "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value",
          "rowId": "Q_MAP02_ENTEREDREQUIREDVARS",
          "colId": "value",
          "identifier": "KSP_Q_MAP02_HULPVARIABELEN_value"
        }
      ],
      "ref": 100290,
      "formulaName": "KSP_Q_MAP02_HULPVARIABELEN_value",
      "refId": 100290,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Q_MAP02_value"
    },
    {
      "rowId": "Q_MAP02_HULPVARIABELEN",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP02_HULPVARIABELEN_title",
      "nodes": [],
      "ref": 100291,
      "formulaName": "KSP_Q_MAP02_HULPVARIABELEN_title",
      "refId": 100291,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_HULPVARIABELEN",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP02_HULPVARIABELEN_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_HULPVARIABELEN",
      "solutionName": "KSP",
      "colId": "visible",
      "name": "KSP_Q_MAP02_HULPVARIABELEN_visible",
      "nodes": [],
      "ref": 100292,
      "formulaName": "KSP_Q_MAP02_HULPVARIABELEN_visible",
      "refId": 100292,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_REQUIREDVARS",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP02_REQUIREDVARS_value",
      "nodes": [],
      "ref": 100293,
      "formulaName": "KSP_Q_MAP02_REQUIREDVARS_value",
      "refId": 100293,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP02_HULPVARIABELEN_value"
    },
    {
      "rowId": "Q_MAP02_REQUIREDVARS",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP02_REQUIREDVARS_title",
      "nodes": [],
      "ref": 100294,
      "formulaName": "KSP_Q_MAP02_REQUIREDVARS_title",
      "refId": 100294,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_REQUIREDVARS",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP02_REQUIREDVARS_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_ENTEREDREQUIREDVARS",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value",
      "nodes": [],
      "ref": 100295,
      "formulaName": "KSP_Q_MAP02_ENTEREDREQUIREDVARS_value",
      "refId": 100295,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP02_HULPVARIABELEN_value"
    },
    {
      "rowId": "Q_MAP02_ENTEREDREQUIREDVARS",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP02_ENTEREDREQUIREDVARS_title",
      "nodes": [],
      "ref": 100296,
      "formulaName": "KSP_Q_MAP02_ENTEREDREQUIREDVARS_title",
      "refId": 100296,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP02_ENTEREDREQUIREDVARS",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP02_ENTEREDREQUIREDVARS_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP06_value",
      "nodes": [
        {
          "name": "KSP_Q_MAP06_WARNING_value",
          "rowId": "Q_MAP06_WARNING",
          "colId": "value",
          "identifier": "KSP_Q_MAP06_value"
        },
        {
          "name": "KSP_Q_MAP06_INFO_value",
          "rowId": "Q_MAP06_INFO",
          "colId": "value",
          "identifier": "KSP_Q_MAP06_value"
        },
        {
          "name": "KSP_Q_MAP06_VALIDATION_value",
          "rowId": "Q_MAP06_VALIDATION",
          "colId": "value",
          "identifier": "KSP_Q_MAP06_value"
        },
        {
          "name": "KSP_Q_MAP06_HINT_value",
          "rowId": "Q_MAP06_HINT",
          "colId": "value",
          "identifier": "KSP_Q_MAP06_value"
        },
        {
          "name": "KSP_Q_MAP06SUB5_value",
          "rowId": "Q_MAP06SUB5",
          "colId": "value",
          "identifier": "KSP_Q_MAP06_value"
        },
        {
          "name": "KSP_Q_MAP06_PARAGRAAF09_value",
          "rowId": "Q_MAP06_PARAGRAAF09",
          "colId": "value",
          "identifier": "KSP_Q_MAP06_value"
        },
        {
          "name": "KSP_Q_MAP06_HULPVARIABELEN_value",
          "rowId": "Q_MAP06_HULPVARIABELEN",
          "colId": "value",
          "identifier": "KSP_Q_MAP06_value"
        }
      ],
      "ref": 100297,
      "formulaName": "KSP_Q_MAP06_value",
      "refId": 100297,
      "displayAs": "radio",
      "frequency": "document",
      "parentName": "Q_ROOT_value"
    },
    {
      "rowId": "Q_MAP06",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP06_title",
      "nodes": [],
      "ref": 100298,
      "formulaName": "KSP_Q_MAP06_title",
      "refId": 100298,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP06_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06",
      "solutionName": "KSP",
      "colId": "visible",
      "name": "KSP_Q_MAP06_visible",
      "nodes": [],
      "ref": 100299,
      "formulaName": "KSP_Q_MAP06_visible",
      "refId": 100299,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06",
      "solutionName": "KSP",
      "colId": "choices",
      "name": "KSP_Q_MAP06_choices",
      "nodes": [],
      "ref": 100078,
      "formulaName": "KSP_Q_ROOT_choices",
      "refId": 100078,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_WARNING",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP06_WARNING_value",
      "nodes": [],
      "ref": 100300,
      "formulaName": "KSP_Q_MAP06_WARNING_value",
      "refId": 100300,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP06_value"
    },
    {
      "rowId": "Q_MAP06_WARNING",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP06_WARNING_title",
      "nodes": [],
      "ref": 100301,
      "formulaName": "KSP_Q_MAP06_WARNING_title",
      "refId": 100301,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_WARNING",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP06_WARNING_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_INFO",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP06_INFO_value",
      "nodes": [],
      "ref": 100302,
      "formulaName": "KSP_Q_MAP06_INFO_value",
      "refId": 100302,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP06_value"
    },
    {
      "rowId": "Q_MAP06_INFO",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP06_INFO_title",
      "nodes": [],
      "ref": 100303,
      "formulaName": "KSP_Q_MAP06_INFO_title",
      "refId": 100303,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_INFO",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP06_INFO_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_VALIDATION",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP06_VALIDATION_value",
      "nodes": [],
      "ref": 100304,
      "formulaName": "KSP_Q_MAP06_VALIDATION_value",
      "refId": 100304,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP06_value"
    },
    {
      "rowId": "Q_MAP06_VALIDATION",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP06_VALIDATION_title",
      "nodes": [],
      "ref": 100305,
      "formulaName": "KSP_Q_MAP06_VALIDATION_title",
      "refId": 100305,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_VALIDATION",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP06_VALIDATION_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_HINT",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP06_HINT_value",
      "nodes": [],
      "ref": 100306,
      "formulaName": "KSP_Q_MAP06_HINT_value",
      "refId": 100306,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP06_value"
    },
    {
      "rowId": "Q_MAP06_HINT",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP06_HINT_title",
      "nodes": [],
      "ref": 100307,
      "formulaName": "KSP_Q_MAP06_HINT_title",
      "refId": 100307,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_HINT",
      "solutionName": "KSP",
      "colId": "hint",
      "name": "KSP_Q_MAP06_HINT_hint",
      "nodes": [],
      "ref": 100308,
      "formulaName": "KSP_Q_MAP06_HINT_hint",
      "refId": 100308,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_HINT",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP06_HINT_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06SUB5",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP06SUB5_value",
      "nodes": [
        {
          "name": "KSP_GraphResRek1_value",
          "rowId": "GraphResRek1",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5_value"
        },
        {
          "name": "KSP_Q_MAP06SUB5SUB2_value",
          "rowId": "Q_MAP06SUB5SUB2",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5_value"
        },
        {
          "name": "KSP_Q_MAP06SUB5SUB3_value",
          "rowId": "Q_MAP06SUB5SUB3",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5_value"
        },
        {
          "name": "KSP_TotalYearlyBalance_value",
          "rowId": "TotalYearlyBalance",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5_value"
        },
        {
          "name": "KSP_ChildCareCosts_value",
          "rowId": "ChildCareCosts",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5_value"
        }
      ],
      "ref": 100309,
      "formulaName": "KSP_Q_MAP06SUB5_value",
      "refId": 100309,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Q_MAP06_value"
    },
    {
      "rowId": "Q_MAP06SUB5",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP06SUB5_title",
      "nodes": [],
      "ref": 100310,
      "formulaName": "KSP_Q_MAP06SUB5_title",
      "refId": 100310,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06SUB5",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP06SUB5_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "GraphResRek1",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_GraphResRek1_value",
      "nodes": [],
      "ref": 100311,
      "formulaName": "KSP_GraphResRek1_value",
      "refId": 100311,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5_value"
    },
    {
      "rowId": "GraphResRek1",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_GraphResRek1_title",
      "nodes": [],
      "ref": 100312,
      "formulaName": "KSP_GraphResRek1_title",
      "refId": 100312,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "GraphResRek1",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_GraphResRek1_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06SUB5SUB2",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP06SUB5SUB2_value",
      "nodes": [
        {
          "name": "KSP_Age_value",
          "rowId": "Age",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB2_value"
        },
        {
          "name": "KSP_Furniture_value",
          "rowId": "Furniture",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB2_value"
        },
        {
          "name": "KSP_ActualChildCareCosts_value",
          "rowId": "ActualChildCareCosts",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB2_value"
        },
        {
          "name": "KSP_ActualDiapers_value",
          "rowId": "ActualDiapers",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB2_value"
        },
        {
          "name": "KSP_ActualFood_value",
          "rowId": "ActualFood",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB2_value"
        },
        {
          "name": "KSP_ActualClothingCosts_value",
          "rowId": "ActualClothingCosts",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB2_value"
        },
        {
          "name": "KSP_ActualPersonalCareCosts_value",
          "rowId": "ActualPersonalCareCosts",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB2_value"
        },
        {
          "name": "KSP_Hairdresser_value",
          "rowId": "Hairdresser",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB2_value"
        },
        {
          "name": "KSP_Inventory_value",
          "rowId": "Inventory",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB2_value"
        },
        {
          "name": "KSP_Allowance_value",
          "rowId": "Allowance",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB2_value"
        },
        {
          "name": "KSP_Contributions_value",
          "rowId": "Contributions",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB2_value"
        },
        {
          "name": "KSP_Transport_value",
          "rowId": "Transport",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB2_value"
        },
        {
          "name": "KSP_MobilePhone_value",
          "rowId": "MobilePhone",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB2_value"
        },
        {
          "name": "KSP_DrivingLicense_value",
          "rowId": "DrivingLicense",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB2_value"
        },
        {
          "name": "KSP_CostsForOutOfSchoolCare_value",
          "rowId": "CostsForOutOfSchoolCare",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB2_value"
        },
        {
          "name": "KSP_CostsForPrimaryEducation_value",
          "rowId": "CostsForPrimaryEducation",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB2_value"
        },
        {
          "name": "KSP_CostsForSecondaryEducation_value",
          "rowId": "CostsForSecondaryEducation",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB2_value"
        },
        {
          "name": "KSP_CostsUnspecifiedOverview_value",
          "rowId": "CostsUnspecifiedOverview",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB2_value"
        },
        {
          "name": "KSP_TotalYearlyCosts_value",
          "rowId": "TotalYearlyCosts",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB2_value"
        },
        {
          "name": "KSP_TotalYearlyCostTSUM_value",
          "rowId": "TotalYearlyCostTSUM",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB2_value"
        }
      ],
      "ref": 100313,
      "formulaName": "KSP_Q_MAP06SUB5SUB2_value",
      "refId": 100313,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5_value"
    },
    {
      "rowId": "Q_MAP06SUB5SUB2",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP06SUB5SUB2_title",
      "nodes": [],
      "ref": 100314,
      "formulaName": "KSP_Q_MAP06SUB5SUB2_title",
      "refId": 100314,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06SUB5SUB2",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP06SUB5SUB2_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Age",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Age_value",
      "nodes": [
        {
          "name": "KSP_PeriodeInFormulaset_value",
          "rowId": "PeriodeInFormulaset",
          "colId": "value",
          "identifier": "KSP_Age_value"
        }
      ],
      "ref": 100315,
      "formulaName": "KSP_Age_value",
      "refId": 100315,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB2_value"
    },
    {
      "rowId": "Age",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Age_title",
      "nodes": [],
      "ref": 100316,
      "formulaName": "KSP_Age_title",
      "refId": 100316,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Age",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Age_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "PeriodeInFormulaset",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_PeriodeInFormulaset_value",
      "nodes": [],
      "ref": 100317,
      "formulaName": "KSP_PeriodeInFormulaset_value",
      "refId": 100317,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Age_value"
    },
    {
      "rowId": "PeriodeInFormulaset",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_PeriodeInFormulaset_title",
      "nodes": [],
      "ref": 100318,
      "formulaName": "KSP_PeriodeInFormulaset_title",
      "refId": 100318,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "PeriodeInFormulaset",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_PeriodeInFormulaset_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Furniture",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Furniture_value",
      "nodes": [],
      "ref": 100319,
      "formulaName": "KSP_Furniture_value",
      "refId": 100319,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB2_value"
    },
    {
      "rowId": "Furniture",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Furniture_title",
      "nodes": [],
      "ref": 100320,
      "formulaName": "KSP_Furniture_title",
      "refId": 100320,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Furniture",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Furniture_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ActualChildCareCosts",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_ActualChildCareCosts_value",
      "nodes": [],
      "ref": 100321,
      "formulaName": "KSP_ActualChildCareCosts_value",
      "refId": 100321,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB2_value"
    },
    {
      "rowId": "ActualChildCareCosts",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_ActualChildCareCosts_title",
      "nodes": [],
      "ref": 100322,
      "formulaName": "KSP_ActualChildCareCosts_title",
      "refId": 100322,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ActualChildCareCosts",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_ActualChildCareCosts_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ActualDiapers",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_ActualDiapers_value",
      "nodes": [],
      "ref": 100323,
      "formulaName": "KSP_ActualDiapers_value",
      "refId": 100323,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB2_value"
    },
    {
      "rowId": "ActualDiapers",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_ActualDiapers_title",
      "nodes": [],
      "ref": 100324,
      "formulaName": "KSP_ActualDiapers_title",
      "refId": 100324,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ActualFood",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_ActualFood_value",
      "nodes": [],
      "ref": 100325,
      "formulaName": "KSP_ActualFood_value",
      "refId": 100325,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB2_value"
    },
    {
      "rowId": "ActualFood",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_ActualFood_title",
      "nodes": [],
      "ref": 100326,
      "formulaName": "KSP_ActualFood_title",
      "refId": 100326,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ActualClothingCosts",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_ActualClothingCosts_value",
      "nodes": [],
      "ref": 100327,
      "formulaName": "KSP_ActualClothingCosts_value",
      "refId": 100327,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB2_value"
    },
    {
      "rowId": "ActualClothingCosts",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_ActualClothingCosts_title",
      "nodes": [],
      "ref": 100328,
      "formulaName": "KSP_ActualClothingCosts_title",
      "refId": 100328,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ActualPersonalCareCosts",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_ActualPersonalCareCosts_value",
      "nodes": [],
      "ref": 100329,
      "formulaName": "KSP_ActualPersonalCareCosts_value",
      "refId": 100329,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB2_value"
    },
    {
      "rowId": "ActualPersonalCareCosts",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_ActualPersonalCareCosts_title",
      "nodes": [],
      "ref": 100330,
      "formulaName": "KSP_ActualPersonalCareCosts_title",
      "refId": 100330,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Hairdresser",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Hairdresser_value",
      "nodes": [],
      "ref": 100331,
      "formulaName": "KSP_Hairdresser_value",
      "refId": 100331,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB2_value"
    },
    {
      "rowId": "Hairdresser",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Hairdresser_title",
      "nodes": [],
      "ref": 100332,
      "formulaName": "KSP_Hairdresser_title",
      "refId": 100332,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Inventory",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Inventory_value",
      "nodes": [],
      "ref": 100333,
      "formulaName": "KSP_Inventory_value",
      "refId": 100333,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB2_value"
    },
    {
      "rowId": "Inventory",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Inventory_title",
      "nodes": [],
      "ref": 100334,
      "formulaName": "KSP_Inventory_title",
      "refId": 100334,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Allowance",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Allowance_value",
      "nodes": [],
      "ref": 100335,
      "formulaName": "KSP_Allowance_value",
      "refId": 100335,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB2_value"
    },
    {
      "rowId": "Allowance",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Allowance_title",
      "nodes": [],
      "ref": 100336,
      "formulaName": "KSP_Allowance_title",
      "refId": 100336,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Contributions",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Contributions_value",
      "nodes": [],
      "ref": 100337,
      "formulaName": "KSP_Contributions_value",
      "refId": 100337,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB2_value"
    },
    {
      "rowId": "Contributions",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Contributions_title",
      "nodes": [],
      "ref": 100338,
      "formulaName": "KSP_Contributions_title",
      "refId": 100338,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Transport",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Transport_value",
      "nodes": [],
      "ref": 100339,
      "formulaName": "KSP_Transport_value",
      "refId": 100339,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB2_value"
    },
    {
      "rowId": "Transport",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Transport_title",
      "nodes": [],
      "ref": 100340,
      "formulaName": "KSP_Transport_title",
      "refId": 100340,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MobilePhone",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_MobilePhone_value",
      "nodes": [],
      "ref": 100341,
      "formulaName": "KSP_MobilePhone_value",
      "refId": 100341,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB2_value"
    },
    {
      "rowId": "MobilePhone",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_MobilePhone_title",
      "nodes": [],
      "ref": 100342,
      "formulaName": "KSP_MobilePhone_title",
      "refId": 100342,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "DrivingLicense",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_DrivingLicense_value",
      "nodes": [],
      "ref": 100343,
      "formulaName": "KSP_DrivingLicense_value",
      "refId": 100343,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB2_value"
    },
    {
      "rowId": "DrivingLicense",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_DrivingLicense_title",
      "nodes": [],
      "ref": 100344,
      "formulaName": "KSP_DrivingLicense_title",
      "refId": 100344,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CostsForOutOfSchoolCare",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_CostsForOutOfSchoolCare_value",
      "nodes": [],
      "ref": 100345,
      "formulaName": "KSP_CostsForOutOfSchoolCare_value",
      "refId": 100345,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB2_value"
    },
    {
      "rowId": "CostsForOutOfSchoolCare",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_CostsForOutOfSchoolCare_title",
      "nodes": [],
      "ref": 100346,
      "formulaName": "KSP_CostsForOutOfSchoolCare_title",
      "refId": 100346,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CostsForPrimaryEducation",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_CostsForPrimaryEducation_value",
      "nodes": [],
      "ref": 100347,
      "formulaName": "KSP_CostsForPrimaryEducation_value",
      "refId": 100347,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB2_value"
    },
    {
      "rowId": "CostsForPrimaryEducation",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_CostsForPrimaryEducation_title",
      "nodes": [],
      "ref": 100348,
      "formulaName": "KSP_CostsForPrimaryEducation_title",
      "refId": 100348,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CostsForSecondaryEducation",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_CostsForSecondaryEducation_value",
      "nodes": [],
      "ref": 100349,
      "formulaName": "KSP_CostsForSecondaryEducation_value",
      "refId": 100349,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB2_value"
    },
    {
      "rowId": "CostsForSecondaryEducation",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_CostsForSecondaryEducation_title",
      "nodes": [],
      "ref": 100350,
      "formulaName": "KSP_CostsForSecondaryEducation_title",
      "refId": 100350,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CostsUnspecifiedOverview",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_CostsUnspecifiedOverview_value",
      "nodes": [],
      "ref": 100351,
      "formulaName": "KSP_CostsUnspecifiedOverview_value",
      "refId": 100351,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB2_value"
    },
    {
      "rowId": "CostsUnspecifiedOverview",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_CostsUnspecifiedOverview_title",
      "nodes": [],
      "ref": 100352,
      "formulaName": "KSP_CostsUnspecifiedOverview_title",
      "refId": 100352,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CostsUnspecifiedOverview",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_CostsUnspecifiedOverview_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "TotalYearlyCosts",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_TotalYearlyCosts_value",
      "nodes": [],
      "ref": 100353,
      "formulaName": "KSP_TotalYearlyCosts_value",
      "refId": 100353,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB2_value"
    },
    {
      "rowId": "TotalYearlyCosts",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_TotalYearlyCosts_title",
      "nodes": [],
      "ref": 100354,
      "formulaName": "KSP_TotalYearlyCosts_title",
      "refId": 100354,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "TotalYearlyCosts",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_TotalYearlyCosts_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "TotalYearlyCostTSUM",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_TotalYearlyCostTSUM_value",
      "nodes": [],
      "ref": 100355,
      "formulaName": "KSP_TotalYearlyCostTSUM_value",
      "refId": 100355,
      "displayAs": "string",
      "parentName": "Q_MAP06SUB5SUB2_value"
    },
    {
      "rowId": "Q_MAP06SUB5SUB3",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP06SUB5SUB3_value",
      "nodes": [
        {
          "name": "KSP_ChildBenefits_value",
          "rowId": "ChildBenefits",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB3_value"
        },
        {
          "name": "KSP_ChildCarePremiumOverview_value",
          "rowId": "ChildCarePremiumOverview",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB3_value"
        },
        {
          "name": "KSP_ChildcareBudgetOverview_value",
          "rowId": "ChildcareBudgetOverview",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB3_value"
        },
        {
          "name": "KSP_CombinationDiscountOverview_value",
          "rowId": "CombinationDiscountOverview",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB3_value"
        },
        {
          "name": "KSP_TotalYearlyIncome_value",
          "rowId": "TotalYearlyIncome",
          "colId": "value",
          "identifier": "KSP_Q_MAP06SUB5SUB3_value"
        }
      ],
      "ref": 100356,
      "formulaName": "KSP_Q_MAP06SUB5SUB3_value",
      "refId": 100356,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5_value"
    },
    {
      "rowId": "Q_MAP06SUB5SUB3",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP06SUB5SUB3_title",
      "nodes": [],
      "ref": 100357,
      "formulaName": "KSP_Q_MAP06SUB5SUB3_title",
      "refId": 100357,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06SUB5SUB3",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP06SUB5SUB3_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildBenefits",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_ChildBenefits_value",
      "nodes": [],
      "ref": 100358,
      "formulaName": "KSP_ChildBenefits_value",
      "refId": 100358,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB3_value"
    },
    {
      "rowId": "ChildBenefits",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_ChildBenefits_title",
      "nodes": [],
      "ref": 100359,
      "formulaName": "KSP_ChildBenefits_title",
      "refId": 100359,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildBenefits",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_ChildBenefits_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildCarePremiumOverview",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_ChildCarePremiumOverview_value",
      "nodes": [],
      "ref": 100360,
      "formulaName": "KSP_ChildCarePremiumOverview_value",
      "refId": 100360,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB3_value"
    },
    {
      "rowId": "ChildCarePremiumOverview",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_ChildCarePremiumOverview_title",
      "nodes": [],
      "ref": 100361,
      "formulaName": "KSP_ChildCarePremiumOverview_title",
      "refId": 100361,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildCarePremiumOverview",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_ChildCarePremiumOverview_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildcareBudgetOverview",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_ChildcareBudgetOverview_value",
      "nodes": [],
      "ref": 100362,
      "formulaName": "KSP_ChildcareBudgetOverview_value",
      "refId": 100362,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB3_value"
    },
    {
      "rowId": "ChildcareBudgetOverview",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_ChildcareBudgetOverview_title",
      "nodes": [],
      "ref": 100363,
      "formulaName": "KSP_ChildcareBudgetOverview_title",
      "refId": 100363,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildcareBudgetOverview",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_ChildcareBudgetOverview_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CombinationDiscountOverview",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_CombinationDiscountOverview_value",
      "nodes": [],
      "ref": 100364,
      "formulaName": "KSP_CombinationDiscountOverview_value",
      "refId": 100364,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB3_value"
    },
    {
      "rowId": "CombinationDiscountOverview",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_CombinationDiscountOverview_title",
      "nodes": [],
      "ref": 100365,
      "formulaName": "KSP_CombinationDiscountOverview_title",
      "refId": 100365,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "CombinationDiscountOverview",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_CombinationDiscountOverview_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "TotalYearlyIncome",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_TotalYearlyIncome_value",
      "nodes": [],
      "ref": 100366,
      "formulaName": "KSP_TotalYearlyIncome_value",
      "refId": 100366,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5SUB3_value"
    },
    {
      "rowId": "TotalYearlyIncome",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_TotalYearlyIncome_title",
      "nodes": [],
      "ref": 100367,
      "formulaName": "KSP_TotalYearlyIncome_title",
      "refId": 100367,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "TotalYearlyIncome",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_TotalYearlyIncome_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "TotalYearlyBalance",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_TotalYearlyBalance_value",
      "nodes": [
        {
          "name": "KSP_TotalMonthlyBalanceAverage_value",
          "rowId": "TotalMonthlyBalanceAverage",
          "colId": "value",
          "identifier": "KSP_TotalYearlyBalance_value"
        }
      ],
      "ref": 100368,
      "formulaName": "KSP_TotalYearlyBalance_value",
      "refId": 100368,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5_value"
    },
    {
      "rowId": "TotalYearlyBalance",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_TotalYearlyBalance_title",
      "nodes": [],
      "ref": 100369,
      "formulaName": "KSP_TotalYearlyBalance_title",
      "refId": 100369,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "TotalYearlyBalance",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_TotalYearlyBalance_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "TotalMonthlyBalanceAverage",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_TotalMonthlyBalanceAverage_value",
      "nodes": [],
      "ref": 100370,
      "formulaName": "KSP_TotalMonthlyBalanceAverage_value",
      "refId": 100370,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "TotalYearlyBalance_value"
    },
    {
      "rowId": "TotalMonthlyBalanceAverage",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_TotalMonthlyBalanceAverage_title",
      "nodes": [],
      "ref": 100371,
      "formulaName": "KSP_TotalMonthlyBalanceAverage_title",
      "refId": 100371,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "TotalMonthlyBalanceAverage",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_TotalMonthlyBalanceAverage_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ChildCareCosts",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_ChildCareCosts_value",
      "nodes": [],
      "ref": 100372,
      "formulaName": "KSP_ChildCareCosts_value",
      "refId": 100372,
      "displayAs": "string",
      "frequency": "column",
      "parentName": "Q_MAP06SUB5_value"
    },
    {
      "rowId": "ChildCareCosts",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_ChildCareCosts_title",
      "nodes": [],
      "ref": 100373,
      "formulaName": "KSP_ChildCareCosts_title",
      "refId": 100373,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_PARAGRAAF09",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP06_PARAGRAAF09_value",
      "nodes": [
        {
          "name": "KSP_Q_MAP06_STATUS_value",
          "rowId": "Q_MAP06_STATUS",
          "colId": "value",
          "identifier": "KSP_Q_MAP06_PARAGRAAF09_value"
        },
        {
          "name": "KSP_Q_MAP06_PARAGRAAF09SUB2_value",
          "rowId": "Q_MAP06_PARAGRAAF09SUB2",
          "colId": "value",
          "identifier": "KSP_Q_MAP06_PARAGRAAF09_value"
        },
        {
          "name": "KSP_Q_MAP06_PARAGRAAF09SUB3_value",
          "rowId": "Q_MAP06_PARAGRAAF09SUB3",
          "colId": "value",
          "identifier": "KSP_Q_MAP06_PARAGRAAF09_value"
        },
        {
          "name": "KSP_Q_MAP06_PARAGRAAF09SUB4_value",
          "rowId": "Q_MAP06_PARAGRAAF09SUB4",
          "colId": "value",
          "identifier": "KSP_Q_MAP06_PARAGRAAF09_value"
        },
        {
          "name": "KSP_Q_MAP06_PARAGRAAF09SUB5_value",
          "rowId": "Q_MAP06_PARAGRAAF09SUB5",
          "colId": "value",
          "identifier": "KSP_Q_MAP06_PARAGRAAF09_value"
        },
        {
          "name": "KSP_Q_MAP06_PARAGRAAF09SUB6_value",
          "rowId": "Q_MAP06_PARAGRAAF09SUB6",
          "colId": "value",
          "identifier": "KSP_Q_MAP06_PARAGRAAF09_value"
        }
      ],
      "ref": 100374,
      "formulaName": "KSP_Q_MAP06_PARAGRAAF09_value",
      "refId": 100374,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Q_MAP06_value"
    },
    {
      "rowId": "Q_MAP06_PARAGRAAF09",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP06_PARAGRAAF09_title",
      "nodes": [],
      "ref": 100375,
      "formulaName": "KSP_Q_MAP06_PARAGRAAF09_title",
      "refId": 100375,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_PARAGRAAF09",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP06_PARAGRAAF09_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_PARAGRAAF09",
      "solutionName": "KSP",
      "colId": "visible",
      "name": "KSP_Q_MAP06_PARAGRAAF09_visible",
      "nodes": [],
      "ref": 100376,
      "formulaName": "KSP_Q_MAP06_PARAGRAAF09_visible",
      "refId": 100376,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_STATUS",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP06_STATUS_value",
      "nodes": [],
      "ref": 100377,
      "formulaName": "KSP_Q_MAP06_STATUS_value",
      "refId": 100377,
      "displayAs": "radio",
      "frequency": "document",
      "parentName": "Q_MAP06_PARAGRAAF09_value"
    },
    {
      "rowId": "Q_MAP06_STATUS",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP06_STATUS_title",
      "nodes": [],
      "ref": 100378,
      "formulaName": "KSP_Q_MAP06_STATUS_title",
      "refId": 100378,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_STATUS",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP06_STATUS_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_STATUS",
      "solutionName": "KSP",
      "colId": "choices",
      "name": "KSP_Q_MAP06_STATUS_choices",
      "nodes": [],
      "ref": 100155,
      "formulaName": "KSP_Q_MAP01_STATUS_choices",
      "refId": 100155,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_PARAGRAAF09SUB2",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB2_value",
      "nodes": [],
      "ref": 100379,
      "formulaName": "KSP_Q_MAP06_PARAGRAAF09SUB2_value",
      "refId": 100379,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP06_PARAGRAAF09_value"
    },
    {
      "rowId": "Q_MAP06_PARAGRAAF09SUB2",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB2_title",
      "nodes": [],
      "ref": 100380,
      "formulaName": "KSP_Q_MAP06_PARAGRAAF09SUB2_title",
      "refId": 100380,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_PARAGRAAF09SUB2",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB2_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_PARAGRAAF09SUB3",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB3_value",
      "nodes": [],
      "ref": 100381,
      "formulaName": "KSP_Q_MAP06_PARAGRAAF09SUB3_value",
      "refId": 100381,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP06_PARAGRAAF09_value"
    },
    {
      "rowId": "Q_MAP06_PARAGRAAF09SUB3",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB3_title",
      "nodes": [],
      "ref": 100382,
      "formulaName": "KSP_Q_MAP06_PARAGRAAF09SUB3_title",
      "refId": 100382,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_PARAGRAAF09SUB3",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB3_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_PARAGRAAF09SUB4",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB4_value",
      "nodes": [],
      "ref": 100383,
      "formulaName": "KSP_Q_MAP06_PARAGRAAF09SUB4_value",
      "refId": 100383,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP06_PARAGRAAF09_value"
    },
    {
      "rowId": "Q_MAP06_PARAGRAAF09SUB4",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB4_title",
      "nodes": [],
      "ref": 100384,
      "formulaName": "KSP_Q_MAP06_PARAGRAAF09SUB4_title",
      "refId": 100384,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_PARAGRAAF09SUB4",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB4_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_PARAGRAAF09SUB5",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB5_value",
      "nodes": [],
      "ref": 100385,
      "formulaName": "KSP_Q_MAP06_PARAGRAAF09SUB5_value",
      "refId": 100385,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP06_PARAGRAAF09_value"
    },
    {
      "rowId": "Q_MAP06_PARAGRAAF09SUB5",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB5_title",
      "nodes": [],
      "ref": 100386,
      "formulaName": "KSP_Q_MAP06_PARAGRAAF09SUB5_title",
      "refId": 100386,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_PARAGRAAF09SUB5",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB5_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_PARAGRAAF09SUB6",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB6_value",
      "nodes": [],
      "ref": 100387,
      "formulaName": "KSP_Q_MAP06_PARAGRAAF09SUB6_value",
      "refId": 100387,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP06_PARAGRAAF09_value"
    },
    {
      "rowId": "Q_MAP06_PARAGRAAF09SUB6",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB6_title",
      "nodes": [],
      "ref": 100388,
      "formulaName": "KSP_Q_MAP06_PARAGRAAF09SUB6_title",
      "refId": 100388,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_PARAGRAAF09SUB6",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP06_PARAGRAAF09SUB6_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_HULPVARIABELEN",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP06_HULPVARIABELEN_value",
      "nodes": [
        {
          "name": "KSP_Q_MAP06_REQUIREDVARS_value",
          "rowId": "Q_MAP06_REQUIREDVARS",
          "colId": "value",
          "identifier": "KSP_Q_MAP06_HULPVARIABELEN_value"
        },
        {
          "name": "KSP_Q_MAP06_ENTEREDREQUIREDVARS_value",
          "rowId": "Q_MAP06_ENTEREDREQUIREDVARS",
          "colId": "value",
          "identifier": "KSP_Q_MAP06_HULPVARIABELEN_value"
        }
      ],
      "ref": 100389,
      "formulaName": "KSP_Q_MAP06_HULPVARIABELEN_value",
      "refId": 100389,
      "displayAs": "currency",
      "frequency": "document",
      "parentName": "Q_MAP06_value"
    },
    {
      "rowId": "Q_MAP06_HULPVARIABELEN",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP06_HULPVARIABELEN_title",
      "nodes": [],
      "ref": 100390,
      "formulaName": "KSP_Q_MAP06_HULPVARIABELEN_title",
      "refId": 100390,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_HULPVARIABELEN",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP06_HULPVARIABELEN_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_HULPVARIABELEN",
      "solutionName": "KSP",
      "colId": "visible",
      "name": "KSP_Q_MAP06_HULPVARIABELEN_visible",
      "nodes": [],
      "ref": 100391,
      "formulaName": "KSP_Q_MAP06_HULPVARIABELEN_visible",
      "refId": 100391,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_REQUIREDVARS",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP06_REQUIREDVARS_value",
      "nodes": [],
      "ref": 100392,
      "formulaName": "KSP_Q_MAP06_REQUIREDVARS_value",
      "refId": 100392,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP06_HULPVARIABELEN_value"
    },
    {
      "rowId": "Q_MAP06_REQUIREDVARS",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP06_REQUIREDVARS_title",
      "nodes": [],
      "ref": 100393,
      "formulaName": "KSP_Q_MAP06_REQUIREDVARS_title",
      "refId": 100393,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_REQUIREDVARS",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP06_REQUIREDVARS_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_ENTEREDREQUIREDVARS",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAP06_ENTEREDREQUIREDVARS_value",
      "nodes": [],
      "ref": 100394,
      "formulaName": "KSP_Q_MAP06_ENTEREDREQUIREDVARS_value",
      "refId": 100394,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_MAP06_HULPVARIABELEN_value"
    },
    {
      "rowId": "Q_MAP06_ENTEREDREQUIREDVARS",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAP06_ENTEREDREQUIREDVARS_title",
      "nodes": [],
      "ref": 100395,
      "formulaName": "KSP_Q_MAP06_ENTEREDREQUIREDVARS_title",
      "refId": 100395,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP06_ENTEREDREQUIREDVARS",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_MAP06_ENTEREDREQUIREDVARS_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_RESULT",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_RESULT_value",
      "nodes": [
        {
          "name": "KSP_Q_RESULTSUB1_value",
          "rowId": "Q_RESULTSUB1",
          "colId": "value",
          "identifier": "KSP_Q_RESULT_value"
        }
      ],
      "ref": 100396,
      "formulaName": "KSP_Q_RESULT_value",
      "refId": 100396,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_ROOT_value"
    },
    {
      "rowId": "Q_RESULT",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_RESULT_title",
      "nodes": [],
      "ref": 100397,
      "formulaName": "KSP_Q_RESULT_title",
      "refId": 100397,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_RESULT",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_RESULT_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_RESULTSUB1",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_RESULTSUB1_value",
      "nodes": [],
      "ref": 100398,
      "formulaName": "KSP_Q_RESULTSUB1_value",
      "refId": 100398,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_RESULT_value"
    },
    {
      "rowId": "Q_RESULTSUB1",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_RESULTSUB1_title",
      "nodes": [],
      "ref": 100399,
      "formulaName": "KSP_Q_RESULTSUB1_title",
      "refId": 100399,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_RESULTSUB1",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_RESULTSUB1_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_STATUS",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_STATUS_value",
      "nodes": [],
      "ref": 100400,
      "formulaName": "KSP_Q_STATUS_value",
      "refId": 100400,
      "displayAs": "radio",
      "frequency": "document",
      "parentName": "Q_ROOT_value"
    },
    {
      "rowId": "Q_STATUS",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_STATUS_title",
      "nodes": [],
      "ref": 100401,
      "formulaName": "KSP_Q_STATUS_title",
      "refId": 100401,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_STATUS",
      "solutionName": "KSP",
      "colId": "choices",
      "name": "KSP_Q_STATUS_choices",
      "nodes": [],
      "ref": 100402,
      "formulaName": "KSP_Q_STATUS_choices",
      "refId": 100402,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_STATUS_FINAL_ON",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_STATUS_FINAL_ON_value",
      "nodes": [],
      "ref": 100403,
      "formulaName": "KSP_Q_STATUS_FINAL_ON_value",
      "refId": 100403,
      "displayAs": "date",
      "frequency": "document",
      "parentName": "Q_ROOT_value"
    },
    {
      "rowId": "Q_STATUS_FINAL_ON",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_STATUS_FINAL_ON_title",
      "nodes": [],
      "ref": 100404,
      "formulaName": "KSP_Q_STATUS_FINAL_ON_title",
      "refId": 100404,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_STATUS_FINAL_BY",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_STATUS_FINAL_BY_value",
      "nodes": [],
      "ref": 100405,
      "formulaName": "KSP_Q_STATUS_FINAL_BY_value",
      "refId": 100405,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_ROOT_value"
    },
    {
      "rowId": "Q_STATUS_FINAL_BY",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_STATUS_FINAL_BY_title",
      "nodes": [],
      "ref": 100406,
      "formulaName": "KSP_Q_STATUS_FINAL_BY_title",
      "refId": 100406,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_STATUS_FINAL_BY_NAME",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_STATUS_FINAL_BY_NAME_value",
      "nodes": [],
      "ref": 100407,
      "formulaName": "KSP_Q_STATUS_FINAL_BY_NAME_value",
      "refId": 100407,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_ROOT_value"
    },
    {
      "rowId": "Q_STATUS_FINAL_BY_NAME",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_STATUS_FINAL_BY_NAME_title",
      "nodes": [],
      "ref": 100408,
      "formulaName": "KSP_Q_STATUS_FINAL_BY_NAME_title",
      "refId": 100408,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_STATUS_STARTED_ON",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_STATUS_STARTED_ON_value",
      "nodes": [],
      "ref": 100409,
      "formulaName": "KSP_Q_STATUS_STARTED_ON_value",
      "refId": 100409,
      "displayAs": "date",
      "frequency": "document",
      "parentName": "Q_ROOT_value"
    },
    {
      "rowId": "Q_STATUS_STARTED_ON",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_STATUS_STARTED_ON_title",
      "nodes": [],
      "ref": 100410,
      "formulaName": "KSP_Q_STATUS_STARTED_ON_title",
      "refId": 100410,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_STATUS_STARTED_BY",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_STATUS_STARTED_BY_value",
      "nodes": [],
      "ref": 100411,
      "formulaName": "KSP_Q_STATUS_STARTED_BY_value",
      "refId": 100411,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_ROOT_value"
    },
    {
      "rowId": "Q_STATUS_STARTED_BY",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_STATUS_STARTED_BY_title",
      "nodes": [],
      "ref": 100412,
      "formulaName": "KSP_Q_STATUS_STARTED_BY_title",
      "refId": 100412,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_STATUS_STARTED_BY_NAME",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_STATUS_STARTED_BY_NAME_value",
      "nodes": [],
      "ref": 100413,
      "formulaName": "KSP_Q_STATUS_STARTED_BY_NAME_value",
      "refId": 100413,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_ROOT_value"
    },
    {
      "rowId": "Q_STATUS_STARTED_BY_NAME",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_STATUS_STARTED_BY_NAME_title",
      "nodes": [],
      "ref": 100414,
      "formulaName": "KSP_Q_STATUS_STARTED_BY_NAME_title",
      "refId": 100414,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ModelVersion",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_ModelVersion_value",
      "nodes": [],
      "ref": 100415,
      "formulaName": "KSP_ModelVersion_value",
      "refId": 100415,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_ROOT_value"
    },
    {
      "rowId": "ModelVersion",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_ModelVersion_title",
      "nodes": [],
      "ref": 100416,
      "formulaName": "KSP_ModelVersion_title",
      "refId": 100416,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ModelVersion",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_ModelVersion_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ModelType",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_ModelType_value",
      "nodes": [],
      "ref": 100417,
      "formulaName": "KSP_ModelType_value",
      "refId": 100417,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_ROOT_value"
    },
    {
      "rowId": "ModelType",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_ModelType_title",
      "nodes": [],
      "ref": 100418,
      "formulaName": "KSP_ModelType_title",
      "refId": 100418,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "ModelType",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_ModelType_locked",
      "nodes": [],
      "ref": 100142,
      "formulaName": "KSP_SecondaryEducationProfile_value",
      "refId": 100142,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MatrixVersion",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_MatrixVersion_value",
      "nodes": [],
      "ref": 100419,
      "formulaName": "KSP_MatrixVersion_value",
      "refId": 100419,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_ROOT_value"
    },
    {
      "rowId": "MatrixVersion",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_MatrixVersion_title",
      "nodes": [],
      "ref": 100420,
      "formulaName": "KSP_MatrixVersion_title",
      "refId": 100420,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "MatrixVersion",
      "solutionName": "KSP",
      "colId": "hint",
      "name": "KSP_MatrixVersion_hint",
      "nodes": [],
      "ref": 100421,
      "formulaName": "KSP_MatrixVersion_hint",
      "refId": 100421,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_PREVIOUS_BUTTON_VISIBLE",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_PREVIOUS_BUTTON_VISIBLE_value",
      "nodes": [],
      "ref": 100422,
      "formulaName": "KSP_Q_PREVIOUS_BUTTON_VISIBLE_value",
      "refId": 100422,
      "displayAs": "radio",
      "frequency": "document",
      "parentName": "Q_ROOT_value"
    },
    {
      "rowId": "Q_PREVIOUS_BUTTON_VISIBLE",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_PREVIOUS_BUTTON_VISIBLE_title",
      "nodes": [],
      "ref": 100423,
      "formulaName": "KSP_Q_PREVIOUS_BUTTON_VISIBLE_title",
      "refId": 100423,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_PREVIOUS_BUTTON_VISIBLE",
      "solutionName": "KSP",
      "colId": "choices",
      "name": "KSP_Q_PREVIOUS_BUTTON_VISIBLE_choices",
      "nodes": [],
      "ref": 100424,
      "formulaName": "KSP_Q_PREVIOUS_BUTTON_VISIBLE_choices",
      "refId": 100424,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_NEXT_BUTTON_VISIBLE",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_NEXT_BUTTON_VISIBLE_value",
      "nodes": [],
      "ref": 100425,
      "formulaName": "KSP_Q_NEXT_BUTTON_VISIBLE_value",
      "refId": 100425,
      "displayAs": "select",
      "frequency": "document",
      "parentName": "Q_ROOT_value"
    },
    {
      "rowId": "Q_NEXT_BUTTON_VISIBLE",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_NEXT_BUTTON_VISIBLE_title",
      "nodes": [],
      "ref": 100426,
      "formulaName": "KSP_Q_NEXT_BUTTON_VISIBLE_title",
      "refId": 100426,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_NEXT_BUTTON_VISIBLE",
      "solutionName": "KSP",
      "colId": "choices",
      "name": "KSP_Q_NEXT_BUTTON_VISIBLE_choices",
      "nodes": [],
      "ref": 100427,
      "formulaName": "KSP_Q_NEXT_BUTTON_VISIBLE_choices",
      "refId": 100427,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_CONCEPT_REPORT_VISIBLE",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_CONCEPT_REPORT_VISIBLE_value",
      "nodes": [],
      "ref": 100428,
      "formulaName": "KSP_Q_CONCEPT_REPORT_VISIBLE_value",
      "refId": 100428,
      "displayAs": "radio",
      "frequency": "document",
      "parentName": "Q_ROOT_value"
    },
    {
      "rowId": "Q_CONCEPT_REPORT_VISIBLE",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_CONCEPT_REPORT_VISIBLE_title",
      "nodes": [],
      "ref": 100429,
      "formulaName": "KSP_Q_CONCEPT_REPORT_VISIBLE_title",
      "refId": 100429,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_CONCEPT_REPORT_VISIBLE",
      "solutionName": "KSP",
      "colId": "choices",
      "name": "KSP_Q_CONCEPT_REPORT_VISIBLE_choices",
      "nodes": [],
      "ref": 100430,
      "formulaName": "KSP_Q_CONCEPT_REPORT_VISIBLE_choices",
      "refId": 100430,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAKE_FINAL_VISIBLE",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_MAKE_FINAL_VISIBLE_value",
      "nodes": [],
      "ref": 100431,
      "formulaName": "KSP_Q_MAKE_FINAL_VISIBLE_value",
      "refId": 100431,
      "displayAs": "radio",
      "frequency": "document",
      "parentName": "Q_ROOT_value"
    },
    {
      "rowId": "Q_MAKE_FINAL_VISIBLE",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_MAKE_FINAL_VISIBLE_title",
      "nodes": [],
      "ref": 100432,
      "formulaName": "KSP_Q_MAKE_FINAL_VISIBLE_title",
      "refId": 100432,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAKE_FINAL_VISIBLE",
      "solutionName": "KSP",
      "colId": "choices",
      "name": "KSP_Q_MAKE_FINAL_VISIBLE_choices",
      "nodes": [],
      "ref": 100430,
      "formulaName": "KSP_Q_CONCEPT_REPORT_VISIBLE_choices",
      "refId": 100430,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_FINAL_REPORT_VISIBLE",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_FINAL_REPORT_VISIBLE_value",
      "nodes": [],
      "ref": 100433,
      "formulaName": "KSP_Q_FINAL_REPORT_VISIBLE_value",
      "refId": 100433,
      "displayAs": "radio",
      "frequency": "document",
      "parentName": "Q_ROOT_value"
    },
    {
      "rowId": "Q_FINAL_REPORT_VISIBLE",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_FINAL_REPORT_VISIBLE_title",
      "nodes": [],
      "ref": 100434,
      "formulaName": "KSP_Q_FINAL_REPORT_VISIBLE_title",
      "refId": 100434,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_FINAL_REPORT_VISIBLE",
      "solutionName": "KSP",
      "colId": "choices",
      "name": "KSP_Q_FINAL_REPORT_VISIBLE_choices",
      "nodes": [],
      "ref": 100430,
      "formulaName": "KSP_Q_CONCEPT_REPORT_VISIBLE_choices",
      "refId": 100430,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "HULPVARS",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_HULPVARS_value",
      "nodes": [
        {
          "name": "KSP_Q_WARNING_GLOBAL_value",
          "rowId": "Q_WARNING_GLOBAL",
          "colId": "value",
          "identifier": "KSP_HULPVARS_value"
        },
        {
          "name": "KSP_Q_RESTRICTIES_value",
          "rowId": "Q_RESTRICTIES",
          "colId": "value",
          "identifier": "KSP_HULPVARS_value"
        }
      ],
      "ref": 100435,
      "formulaName": "KSP_HULPVARS_value",
      "refId": 100435,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "root_value"
    },
    {
      "rowId": "HULPVARS",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_HULPVARS_title",
      "nodes": [],
      "ref": 100436,
      "formulaName": "KSP_HULPVARS_title",
      "refId": 100436,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "HULPVARS",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_HULPVARS_locked",
      "nodes": [],
      "ref": 100428,
      "formulaName": "KSP_Q_CONCEPT_REPORT_VISIBLE_value",
      "refId": 100428,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_WARNING_GLOBAL",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_WARNING_GLOBAL_value",
      "nodes": [
        {
          "name": "KSP_Q_WARNING_01_value",
          "rowId": "Q_WARNING_01",
          "colId": "value",
          "identifier": "KSP_Q_WARNING_GLOBAL_value"
        },
        {
          "name": "KSP_Q_WARNING_GLOBALTXT_value",
          "rowId": "Q_WARNING_GLOBALTXT",
          "colId": "value",
          "identifier": "KSP_Q_WARNING_GLOBAL_value"
        }
      ],
      "ref": 100437,
      "formulaName": "KSP_Q_WARNING_GLOBAL_value",
      "refId": 100437,
      "displayAs": "memo",
      "frequency": "document",
      "parentName": "HULPVARS_value"
    },
    {
      "rowId": "Q_WARNING_GLOBAL",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_WARNING_GLOBAL_title",
      "nodes": [],
      "ref": 100438,
      "formulaName": "KSP_Q_WARNING_GLOBAL_title",
      "refId": 100438,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_WARNING_GLOBAL",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_WARNING_GLOBAL_locked",
      "nodes": [],
      "ref": 100428,
      "formulaName": "KSP_Q_CONCEPT_REPORT_VISIBLE_value",
      "refId": 100428,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_WARNING_01",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_WARNING_01_value",
      "nodes": [],
      "ref": 100439,
      "formulaName": "KSP_Q_WARNING_01_value",
      "refId": 100439,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_WARNING_GLOBAL_value"
    },
    {
      "rowId": "Q_WARNING_01",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_WARNING_01_title",
      "nodes": [],
      "ref": 100440,
      "formulaName": "KSP_Q_WARNING_01_title",
      "refId": 100440,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_WARNING_01",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_WARNING_01_locked",
      "nodes": [],
      "ref": 100428,
      "formulaName": "KSP_Q_CONCEPT_REPORT_VISIBLE_value",
      "refId": 100428,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_WARNING_GLOBALTXT",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_WARNING_GLOBALTXT_value",
      "nodes": [],
      "ref": 100441,
      "formulaName": "KSP_Q_WARNING_GLOBALTXT_value",
      "refId": 100441,
      "displayAs": "memo",
      "frequency": "document",
      "parentName": "Q_WARNING_GLOBAL_value"
    },
    {
      "rowId": "Q_WARNING_GLOBALTXT",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_WARNING_GLOBALTXT_title",
      "nodes": [],
      "ref": 100442,
      "formulaName": "KSP_Q_WARNING_GLOBALTXT_title",
      "refId": 100442,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_WARNING_GLOBALTXT",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_WARNING_GLOBALTXT_locked",
      "nodes": [],
      "ref": 100428,
      "formulaName": "KSP_Q_CONCEPT_REPORT_VISIBLE_value",
      "refId": 100428,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_RESTRICTIES",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_RESTRICTIES_value",
      "nodes": [
        {
          "name": "KSP_Q_RESTRICTIES_01_value",
          "rowId": "Q_RESTRICTIES_01",
          "colId": "value",
          "identifier": "KSP_Q_RESTRICTIES_value"
        },
        {
          "name": "KSP_Q_RESTRICTIES_02_value",
          "rowId": "Q_RESTRICTIES_02",
          "colId": "value",
          "identifier": "KSP_Q_RESTRICTIES_value"
        },
        {
          "name": "KSP_Q_RESTRICTIESTXT_value",
          "rowId": "Q_RESTRICTIESTXT",
          "colId": "value",
          "identifier": "KSP_Q_RESTRICTIES_value"
        }
      ],
      "ref": 100443,
      "formulaName": "KSP_Q_RESTRICTIES_value",
      "refId": 100443,
      "displayAs": "memo",
      "frequency": "document",
      "parentName": "HULPVARS_value"
    },
    {
      "rowId": "Q_RESTRICTIES",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_RESTRICTIES_title",
      "nodes": [],
      "ref": 100444,
      "formulaName": "KSP_Q_RESTRICTIES_title",
      "refId": 100444,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_RESTRICTIES",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_RESTRICTIES_locked",
      "nodes": [],
      "ref": 100428,
      "formulaName": "KSP_Q_CONCEPT_REPORT_VISIBLE_value",
      "refId": 100428,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_RESTRICTIES_01",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_RESTRICTIES_01_value",
      "nodes": [],
      "ref": 100445,
      "formulaName": "KSP_Q_RESTRICTIES_01_value",
      "refId": 100445,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_RESTRICTIES_value"
    },
    {
      "rowId": "Q_RESTRICTIES_01",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_RESTRICTIES_01_locked",
      "nodes": [],
      "ref": 100428,
      "formulaName": "KSP_Q_CONCEPT_REPORT_VISIBLE_value",
      "refId": 100428,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_RESTRICTIES_02",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_RESTRICTIES_02_value",
      "nodes": [],
      "ref": 100446,
      "formulaName": "KSP_Q_RESTRICTIES_02_value",
      "refId": 100446,
      "displayAs": "string",
      "frequency": "document",
      "parentName": "Q_RESTRICTIES_value"
    },
    {
      "rowId": "Q_RESTRICTIES_02",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_RESTRICTIES_02_locked",
      "nodes": [],
      "ref": 100428,
      "formulaName": "KSP_Q_CONCEPT_REPORT_VISIBLE_value",
      "refId": 100428,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_RESTRICTIESTXT",
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_Q_RESTRICTIESTXT_value",
      "nodes": [],
      "ref": 100447,
      "formulaName": "KSP_Q_RESTRICTIESTXT_value",
      "refId": 100447,
      "displayAs": "memo",
      "frequency": "document",
      "parentName": "Q_RESTRICTIES_value"
    },
    {
      "rowId": "Q_RESTRICTIESTXT",
      "solutionName": "KSP",
      "colId": "title",
      "name": "KSP_Q_RESTRICTIESTXT_title",
      "nodes": [],
      "ref": 100448,
      "formulaName": "KSP_Q_RESTRICTIESTXT_title",
      "refId": 100448,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_RESTRICTIESTXT",
      "solutionName": "KSP",
      "colId": "locked",
      "name": "KSP_Q_RESTRICTIESTXT_locked",
      "nodes": [],
      "ref": 100428,
      "formulaName": "KSP_Q_CONCEPT_REPORT_VISIBLE_value",
      "refId": 100428,
      "displayAs": "PropertyType"
    },
    {
      "rowId": "Q_MAP01",
      "solutionName": "KSP",
      "colId": "visible",
      "name": "KSP_Q_MAP01_visible",
      "nodes": []
    },
    {
      "rowId": "Q_MAP01_WARNING",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_Q_MAP01_WARNING_required",
      "nodes": []
    },
    {
      "rowId": "Q_MAP01_INFO",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_Q_MAP01_INFO_required",
      "nodes": []
    },
    {
      "rowId": "Q_MAP01_VALIDATION",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_Q_MAP01_VALIDATION_required",
      "nodes": []
    },
    {
      "rowId": "Q_MAP01_HINT",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_Q_MAP01_HINT_required",
      "nodes": []
    },
    {
      "rowId": "Situation",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_Situation_required",
      "nodes": []
    },
    {
      "rowId": "Q_MAP01_PARAGRAAF09",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_Q_MAP01_PARAGRAAF09_required",
      "nodes": []
    },
    {
      "rowId": "Q_ROOT",
      "solutionName": "KSP",
      "colId": "visible",
      "name": "KSP_Q_ROOT_visible",
      "nodes": []
    },
    {
      "rowId": "Q_MAP02_WARNING",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_Q_MAP02_WARNING_required",
      "nodes": []
    },
    {
      "rowId": "Q_MAP02_INFO",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_Q_MAP02_INFO_required",
      "nodes": []
    },
    {
      "rowId": "Q_MAP02_VALIDATION",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_Q_MAP02_VALIDATION_required",
      "nodes": []
    },
    {
      "rowId": "Q_MAP02_HINT",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_Q_MAP02_HINT_required",
      "nodes": []
    },
    {
      "rowId": "FiscalParameters",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_FiscalParameters_required",
      "nodes": []
    },
    {
      "rowId": "CombinationDiscount",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_CombinationDiscount_required",
      "nodes": []
    },
    {
      "rowId": "ChildRelatedBudget",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_ChildRelatedBudget_required",
      "nodes": []
    },
    {
      "rowId": "Fees",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_Fees_required",
      "nodes": []
    },
    {
      "rowId": "CostsSecondaryEducation",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_CostsSecondaryEducation_required",
      "nodes": []
    },
    {
      "rowId": "Q_MAP02SUB10",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_Q_MAP02SUB10_required",
      "nodes": []
    },
    {
      "rowId": "Q_MAP02SUB11",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_Q_MAP02SUB11_required",
      "nodes": []
    },
    {
      "rowId": "Q_MAP02_PARAGRAAF09",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_Q_MAP02_PARAGRAAF09_required",
      "nodes": []
    },
    {
      "solutionName": "KSP",
      "colId": "value",
      "name": "KSP_undefined_value",
      "nodes": []
    },
    {
      "rowId": "Q_MAP06_WARNING",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_Q_MAP06_WARNING_required",
      "nodes": []
    },
    {
      "rowId": "Q_MAP06_INFO",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_Q_MAP06_INFO_required",
      "nodes": []
    },
    {
      "rowId": "Q_MAP06_VALIDATION",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_Q_MAP06_VALIDATION_required",
      "nodes": []
    },
    {
      "rowId": "Q_MAP06_HINT",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_Q_MAP06_HINT_required",
      "nodes": []
    },
    {
      "rowId": "Q_MAP06SUB5",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_Q_MAP06SUB5_required",
      "nodes": []
    },
    {
      "rowId": "Q_MAP06_PARAGRAAF09",
      "solutionName": "KSP",
      "colId": "required",
      "name": "KSP_Q_MAP06_PARAGRAAF09_required",
      "nodes": []
    }
  ],
  "meta": {
    "view": {
      "columns": [
        {
          "width": 50,
          "name": "name",
          "dataTypeName": "text",
          "fieldName": "name",
          "position": 0,
          "renderTypeName": "text"
        },
        {
          "width": 50,
          "name": "title",
          "dataTypeName": "text",
          "fieldName": "title",
          "position": 1,
          "renderTypeName": "text"
        },
        {
          "width": 50,
          "name": "value",
          "dataTypeName": "text",
          "fieldName": "value",
          "position": 2,
          "renderTypeName": "text"
        },
        {
          "width": 50,
          "name": "notrend",
          "dataTypeName": "text",
          "fieldName": "notrend",
          "position": 3,
          "renderTypeName": "text"
        },
        {
          "width": 50,
          "name": "trend",
          "dataTypeName": "text",
          "fieldName": "trend",
          "position": 4,
          "renderTypeName": "text"
        },
        {
          "name": "visible",
          "dataTypeName": "text",
          "fieldName": "visible",
          "position": 5,
          "renderTypeName": "text"
        },
        {
          "name": "locked",
          "dataTypeName": "text",
          "fieldName": "locked",
          "position": 6,
          "renderTypeName": "text"
        },
        {
          "width": 50,
          "name": "choices",
          "dataTypeName": "text",
          "fieldName": "choices",
          "position": 7,
          "renderTypeName": "text"
        },
        {
          "width": 50,
          "name": "hint",
          "dataTypeName": "text",
          "fieldName": "hint",
          "position": 8,
          "renderTypeName": "text"
        }
      ]
    }
  },
  "name": "KSP"
})
},{"../../ff-fes/exchange_modules/presentation/webexport":9,"./lme":83,"_process":79,"buffer":76}]},{},[84]);
