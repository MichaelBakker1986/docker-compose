//we have to add the DB tests asap, they are already failing.
//There is no way to clear State, every doImport will contribute to static state
//By design all imports should be put into the same stack, they transparently can inter exchange
//UnloadSolution could be a response
process.alltest = true;
process.loglevel = 'debug'
console.time('performance')
var tests = [
    './createFunctionTest.js',
    './brackParsingTest.js',
    './fflexportTest.js',//.FFL Language
    './fflImportTest.js',//.FFL Language
    './finanXMLTest.js',//FinanXML
    './screendefinitionTest.js',//.screen definition
    './uimodelTest.js',//internal logic test, uimodel.js is somewhat unstable, since developed mainly for UI
    './NodeTest.js',
    './presentationTest.js'
];
//require('./dbApiTest.js');
//require('./DocumentValueTst.js');
for (var i = 0; i < tests.length; i++)
{
    try
    {
        require(tests[i]);
    }
    catch (e)
    {
        console.log(e.stack);
        console.error(e);
    }
}
console.timeEnd('performance')