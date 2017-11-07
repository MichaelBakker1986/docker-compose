/**
 * Convert generated tuples into tuples.
 */
const figureName = 'V05';
const [assert, importModel, LME, log, readFileSync, writeFileSync] = require('../ModelFacade')

var linecounter = 0;
var simtuples = []
var bracketOpen = false;
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(__dirname + '/' + figureName + '.FFL')
});
var outputFFL = "";
let bracketcounter = 0;
lineReader.on('line', function(line) {
    linecounter++;
    if (line.match(/(variable|tuple) (\-|\+|\=){0,1}\w+_ti([0-9]{2}[2-9]{1}|[0-9]{1}1[0-9]{1})/gmi)) {
        bracketOpen = true;
        simtuples.push({
            ln: linecounter
        })
    }
    else if (bracketOpen && line.match(/^\s*{\s*$/gmi)) {
        bracketcounter++;
    }
    else if (bracketOpen && line.match(/^\s*}\s*$/gmi)) {
        bracketcounter--;
        if (bracketcounter == 0) {
            bracketOpen = false;
        }
        simtuples[simtuples.length - 1].lnend = linecounter
    }
    else if (!bracketOpen) {
        outputFFL += line + '\n';
    }
});
lineReader.on('close', function() {
    //var linesAsArray = data.split('\n').slice(1).join('\n');
    log.info(simtuples)
    outputFFL = outputFFL.replace(/_ti[0-9]{3}/gmi, '')//just remove Tuple completely
    writeFileSync(__dirname + '/' + figureName + '_realtuple.ffl', outputFFL)
    defaultCase();
});

function defaultCase() {
    let V05ffl = readFileSync(__dirname + '/' + figureName + '_realtuple.ffl');
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
    log.info(fixProblemsInImportedSolution)
}
