dist.js
UIService.js
De applicatie always has one "Solution"  state.
While Solutions are Dynamic, when there is a need to show from multiple Solution, wrap a Solution around it.
A Solution is a collection of UINodes, Because your Solution was for a reason Combine multiple Solutions into one.
A Solution is a thin layer of Pointers to formula's
Build unit test around uimodel, its most unstable part of the APP

BracketParser.js
     1) converts FFL into generic JSON
     2) does regular expressions on the file to convert it into javascript/FesJS functions

The regular expression are very complex and when changing it, add a unit test to the bracketParserTest.js

-FunctionMap, the data structure (like an huge array)
-Node,   (kinda like a variable)
-Tree    (wrapper around the rootnode,and functions to modify children)
-UiModel (kinda like variables, collection of properties and pointers to functions)
-GenericModelFile (Instance Context, hold all state, converters,formulas,rows,x-axis information)
-FormulaBootStrap (function parser ,genericmodel to javascript functions)
-Presentation (