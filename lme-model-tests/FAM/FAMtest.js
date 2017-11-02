const [assert, importModel, LME, log, readFileSync, writeFileSync] = require('../PRICING/ModelFacade')
let FAMffl = readFileSync(__dirname + '/FAM.ffl');
FAMffl = FAMffl.replace(/PDepreciationOfAssets/gmi, 'PDepreciationOfAssets')
LME.importFFL(FAMffl);
var model = LME.exportWebModel();

var [AcquiredGoodwill] = [model.nodes.AcquiredGoodwill];
AcquiredGoodwill.visible;
AcquiredGoodwill.value;

let fixProblemsInImportedSolution = LME.lme.fixProblemsInImportedSolution();
console.info(fixProblemsInImportedSolution)
