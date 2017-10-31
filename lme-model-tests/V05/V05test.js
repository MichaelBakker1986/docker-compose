const [assert, importModel, LME, log, readFileSync, writeFileSync] = require('../PRICING/ModelFacade')
let V05ffl = readFileSync(__dirname + '/../V05/V05.FFL');

//some case-bugfixes
V05ffl = V05ffl.replace(/amount/gmi, 'Amount')
V05ffl = V05ffl.replace(/GoodWill/gmi, 'GoodWill')

LME.importFFL(V05ffl);
var model = LME.exportWebModel();
var [HiddenVars] = [model.nodes.HiddenVars];
HiddenVars.visible;
HiddenVars.value;

LME.lme.fixProblemsInImportedSolution()

