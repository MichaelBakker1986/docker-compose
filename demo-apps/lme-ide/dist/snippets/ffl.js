ace.define("ace/snippets/ffl", ["require", "exports", "module"], function(require, exports, module) {
    "use strict";
    exports.snippetText = "# Some useful Unicode entities\n\
snippet matrixlookup\n\
	MatrixLookup(null, \"${1:table_name}\", ${2:rowId}, ${3:ValueT(T)})\n\
snippet max\n\
	MAX(${1:number_one}, ${2:number_two})\n\
snippet min\n\
    MIN(${1:number_one}, ${2:number_two})\n\
snippet variable\n\
	variable ${1}\n\
	{\n\
	 title: \"${1}\";\n\
	 formula: 1;\n\
	}\n\
snippet onna\n\
	OnNA(${1:value}, ${2:na_value})\n\
snippet formula/*adds a formula to a variable*/\n\
	formula: ${1:test};\n\
snippet choices\n\
	choices: ${1:\"0:No|1:Yes\"};\n\
snippet title\n\
	title: ${1:\"variable_title\"};\n\
snippet locked\n\
	locked: ${1:On};\n\
snippet visible\n\
	visible: ${1:invisible};\n\
";
    exports.scope = "ffl";

});