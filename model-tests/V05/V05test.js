const [assert, importModel, LME, log, readFileSync, writeFileSync] = require('../ModelFacade')
let V05ffl = readFileSync(__dirname + '/../../git-connect/resources/V05.ffl');

//some case-bugfixes
V05ffl = V05ffl.replace(/amount/gmi, 'Amount')
V05ffl = V05ffl.replace(/Bookvalue/gmi, 'BookValue')
V05ffl = V05ffl.replace(/GoodWill/gmi, 'GoodWill')
V05ffl = V05ffl.replace(/DiscountRateTaxShieldBasis/gmi, 'DiscountRateTaxShieldBasis')
V05ffl = V05ffl.replace(/krWirtschaftlichesEigenKapitalRating/gmi, 'krWirtschaftlichesEigenKapitalRating')
V05ffl = V05ffl.replace(/OtherTransitionalAssets/gmi, 'OtherTransitionalAssets')
V05ffl = V05ffl.replace(/LiquidVATonCashExpenses/gmi, 'LiquidVATOnCashExpenses')

const FF2Parser = require('../../lme-core/exchange_modules/ffl2/FFL2Parser').FFL2Parser



LME.importFFL(V05ffl);
var model = LME.exportWebModel();
var [HiddenVars] = [model.nodes.HiddenVars];
HiddenVars.visible;
HiddenVars.value;

let fixProblemsInImportedSolution = LME.lme.fixProblemsInImportedSolution();
