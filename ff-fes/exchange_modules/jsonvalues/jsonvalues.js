/*
 First, most basic export of values

 Just calling getAllValues() internally to export
 */
var GenericModelFile = require('../../fesjs/GenericModelFile');
var UIModel = require('../../fesjs/uimodel');
var jsonValues = {
    name: 'jsonvalues',
    extension: 'json',
    headername: 'JSON Values',
    parse: function (values)
    {
        GenericModelFile.updateValues(JSON.parse(values), GenericModelFile.docValues);
        return UIModel.create();
    },
    deParse: function ()
    {
        return JSON.stringify(GenericModelFile.getAllValues(GenericModelFile.docValues), null, 2);
    }
};
GenericModelFile.addParser(jsonValues)