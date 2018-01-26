require('../../lme-core/exchange_modules/presentation/webexport');
const excelPlugin = require('../../excel-connect').xlsxLookup;
const LME = require('../../lme-model-api/src/lme');
const SolutionFacade = require('../../lme-core/src/SolutionFacade');
const MVO = new LME();
const log = require('log6')
MVO.addFunctions(excelPlugin);
excelPlugin.initComplete().then(function() {
    const mvoFLLFile = require('fs').readFileSync(__dirname + '/TESTMODEL.ffl', 'utf8');
    MVO.importFFL(mvoFLLFile)
    const functions = SolutionFacade.getFunctions();
    const exportWebModel = MVO.exportWebModel();
    log.debug(exportWebModel.no.TestContainerChild.value)
    log.debug(functions)
}).catch((err) => {
    log.error(err)
    process.exit(1);
})