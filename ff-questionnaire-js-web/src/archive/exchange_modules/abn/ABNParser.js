var FESFacade = require('../../fesjs/FESFacade');
var Solution = require('../../fesjs/Solution.js');
var uimodel = require('../../clientscorecard/uimodel.js');
var abnModelParser = require('./Components.js');
var parser = {
    name: 'ABN',
    extension: 'xml',
    notexporting: true,
    headername: 'ABN',
    parse: function (xmlBlob)
    {
        var data = JSON.parse(xmlBlob);
        var modelName = data.modelCode.toUpperCase();
        var ABNSolution = uimodel.create(modelName);
        abnModelParser.parseUIModel(ABNSolution, data.modelQuestionnaire, FESFacade);
        return ABNSolution;
    },
    deParse: function ()
    {
        return uimodel.create().stringify();
    }
}
FESFacade.addParser(parser);
module.exports = parser;