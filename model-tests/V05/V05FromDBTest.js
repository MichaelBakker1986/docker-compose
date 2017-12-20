require('../../lme-core/exchange_modules/ffl2/RegisterToLMEParser')
const Register = require('../../lme-core/exchange_modules/ffl2/Register')
require('../../lme-core/exchange_modules/presentation/webexport_with_template')
require('../../math')
const excelplugin = require('../../excel-connect').xlsxLookup;
const assembler = require('../../git-connect/ModelAssembler');
const JSWorkbook = require('../../lme-core/src/JSWorkBook')
const Context = require('../../lme-core/src/Context')
const log = require('ff-log')
const LME = require('../../lme-model-api/src/lme');
const lmeModel = new LME()
lmeModel.addFunctions(excelplugin)
Promise.all([assembler.started, excelplugin.initComplete]).then(function() {
    var modelName = "V05"
    assembler.getModel(modelName).then(function(modelData) {
        const register = new Register()
        //the problem to solve here is to map DB data columns to the Register columns.
        //register.setSchema(...)
        //register.addRows([...])
        /*   lmeModel.lme.modelName = modelName;
           lmeModel.importFFL2(modelData)
           var nodes = lmeModel.exportWebModel()
           console.info(Object.keys(nodes.nodes).length)
           let fixProblemsInImportedSolution = lmeModel.lme.fixProblemsInImportedSolution();
           console.info(fixProblemsInImportedSolution)*/

    }).catch((err) => {
        log.error(err)
        process.exit(1);
    })
});

