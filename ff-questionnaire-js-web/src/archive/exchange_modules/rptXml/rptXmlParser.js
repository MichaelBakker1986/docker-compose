var uimodel = require('../../clientscorecard/uimodel.js')
var Solution = require('../../fesjs/Solution.js');
var GenericModelFile = require('../../fesjs/GenericModelFile.js');

var rptXmlParser = {
    name: 'rptXml',
    status: 'red',
    headername: '.finance Reporting',
    parse: function (json)
    {
        return new Solution('V05');
        //should call the parser

    },
    deParse: function ()
    {
        return uimodel.create();
    }
};
GenericModelFile.addParser(rptXmlParser)