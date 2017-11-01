const [assert, importModel, LME, log, readFileSync, writeFileSync] = require('../PRICING/ModelFacade')
let V05ffl = readFileSync(__dirname + '/../V05/V05.FFL');

//some case-bugfixes
V05ffl = V05ffl.replace(/amount/gmi, 'Amount')
V05ffl = V05ffl.replace(/Bookvalue/gmi, 'BookValue')
V05ffl = V05ffl.replace(/GoodWill/gmi, 'GoodWill')
V05ffl = V05ffl.replace(/DiscountRateTaxShieldBasis/gmi, 'DiscountRateTaxShieldBasis')
V05ffl = V05ffl.replace(/krWirtschaftlichesEigenKapitalRating/gmi, 'krWirtschaftlichesEigenKapitalRating')
V05ffl = V05ffl.replace(/OtherTransitionalAssets/gmi, 'OtherTransitionalAssets')
V05ffl = V05ffl.replace(/LiquidVATonCashExpenses/gmi, 'LiquidVATOnCashExpenses')

LME.importFFL(V05ffl);
var model = LME.exportWebModel();
var [HiddenVars] = [model.nodes.HiddenVars];
HiddenVars.visible;
HiddenVars.value;

let fixProblemsInImportedSolution = LME.lme.fixProblemsInImportedSolution();
console.info(fixProblemsInImportedSolution)
