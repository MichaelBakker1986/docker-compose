require('../../lme-core/exchange_modules/presentation/webexport_with_template');
const excelPlugin = require('../../excel-connect').xlsxLookup;
const LME = require('../../lme-model-api/src/lme');
const SolutionFacade = require('../../lme-core/src/SolutionFacade');
const MVO = new LME();
const log = require('ff-log')
MVO.addFunctions(excelPlugin);
excelPlugin.initComplete().then(function() {
    try {
        const mvoFLLFile = require('fs').readFileSync(__dirname + '/TESTMODEL.ffl', 'utf8');
        // require('../EconomicEditorView').EconomicEditorView.parse(mvoFLLFile)
        MVO.importFFL(mvoFLLFile)
        const functions = SolutionFacade.getFunctions();
        const exportWebModel = MVO.exportWebModel();
        log.info(exportWebModel.nodes.TestContainerChild.value)
        log.info(functions)
    } catch (err) {
        log.error(err)
    }
}).catch((err) => {
    log.error(err)
    process.exit(1);
})