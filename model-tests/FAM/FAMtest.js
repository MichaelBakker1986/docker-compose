const [assert, importModel, LME, log, readFileSync, writeFileSync] = require('../ModelFacade')
let FAMffl = readFileSync(__dirname + '/FAM.ffl');
FAMffl = FAMffl.replace(/PDepreciationOfAssets/gmi, 'PDepreciationOfAssets')
LME.importFFL(FAMffl);
var model = LME.exportWebModel();

var [AcquiredGoodwill] = [model.no.AcquiredGoodwill];
model.no.Q_MAP
AcquiredGoodwill.visible;
AcquiredGoodwill.value;

let fixProblemsInImportedSolution = LME.lme.fixProblemsInImportedSolution();
log.info(fixProblemsInImportedSolution)
