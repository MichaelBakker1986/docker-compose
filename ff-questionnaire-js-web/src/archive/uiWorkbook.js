var JSWorkBook = require('../../../ff-fes/fesjs/JSWorkBook')
var FESFacade = require('../../../ff-fes/fesjs/FESFacade')
var FESContext = require('../../../ff-fes/fesjs/FESContext')
var fesApi = require('../../../ff-fes/ff-fes').fesjs
require('../../../ff-fes/exchange_modules/presentation/presentation')
require('../../../ff-fes/exchange_modules/ffl/fflparser')
require('../../../ff-math/ff-math')
MatrixLookup = function () {
    return NA;
}
var updateAll = {
    validation: true,
    title: true,
    value: true,
    required: true,
    visible: true,
    locked: true,
    choices: true
}
var jsWorkBook = new JSWorkBook(new FESContext());
jsWorkBook.getCurrentModelName = function () {
    return this.modelName;
}
jsWorkBook.updateAll = updateAll;
jsWorkBook.docValues = jsWorkBook.context.values;
jsWorkBook.getParsers = FESFacade.getParsers
jsWorkBook.find = jsWorkBook.getStatelessVariable
jsWorkBook.getNode = jsWorkBook.getStatelessVariable
jsWorkBook.settings = {
    defaultoutput: 'ffl'
}
module.exports = jsWorkBook;
