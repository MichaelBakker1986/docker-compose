//we have to add the DB tests asap, they are already failing.
//There is no way to clear State, every doImport will contribute to static state
//By design all imports should be put into the same stack, they transparently can inter exchange
//UnloadSolution could be a response
process.alltest = true;
process.loglevel = 'info'
console.time('performance')
var tests = [
    './finanXMLTest.js',//FinanXML
    './rptXmlExportTest.js',
    './screendefinitionTest.js',//.screen definition
    './finImportTest.js',//.fin Language
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