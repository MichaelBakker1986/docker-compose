const [assert, importModel, LME, log, readFileSync, writeFileSync] = require('../PRICING/ModelFacade')

var linecounter = 0;
var simtuples = []
var bracketOpen = false;
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(__dirname + '/../V05/V05.FFL')
});

/*var LineReader = require('linereader');
var lineReader = new LineReader(__dirname + '/../V05/V05.FFL');*/

lineReader.on('line', function(line) {
    linecounter++;

    if (line.match(/(variable|tuple) (\-|\+|\=){0,1}\w+_ti[0-9]{2}[2-9]{1}/gmi)) {
        bracketOpen = true;
        simtuples.push({
            ln: linecounter
        })
        //  console.log('Line from file:', line);
    }
    else if (bracketOpen && line.match(/^\s*}\s*$/gmi)) {
        bracketOpen = false;
        simtuples[simtuples.length - 1].lnend = linecounter
        //   console.log('Line from file:', line);
    }
});
lineReader.on('close', function() {
    console.info(simtuples)
});

function defaultCase() {
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

}
