var visitor = require('../../clientscorecard/JSVisitor.js');
var FESFacade = require('../../fesjs/FESFacade');
var uimodel = require('../../clientscorecard/uimodel.js');
var Solution = require('../../fesjs/Solution.js');
var Stringify = require("jsonml-stringify/stringify")
var stringify = Stringify([
    require("jsonml-stringify/plugins/loose")
])

var parser = {
    name: 'finanXML',
    extension: 'xml',
    headername: 'FinanXML',
    parse: function (data)
    {
        var solution = uimodel.create('V05');
        return solution;
    },
    deParse: function (workbook)
    {
        var allValues = workbook.getAllValues();
        var valuesML = [];
        allValues.forEach(function (el)
        {
            valuesML.push(['' + el.varName || el.formulaId, '' + el.value]);
        });
        var output = ["FINANXML", [["accounts", valuesML]]]
        var html = stringify(output);
        return html;
    }
};
FESFacade.addParser(parser);