var visitor = require('../../fesjs/JSVisitor');
var GenericModelFile = require('../../fesjs/GenericModelFile');
var uimodel = require('../../fesjs/uimodel');
var Solution = require('../../fesjs/Solution');
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
    deParse: function ()
    {
        var allValues = GenericModelFile.getAllValues(GenericModelFile.docValues);
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
GenericModelFile.addParser(parser);