const [assert, importModel, LME, log, readFileSync, writeFileSync] = require('../ModelFacade')
var PropertiesAssembler = require('../../lme-core/src/PropertiesAssembler')
var FormulaService = require('../../lme-core/src/FormulaService')
var jslrs = require("js-longest-repeated-substring");
let PRICINGffl = readFileSync(__dirname + '/PRICING.ffl');
var escodegen = require('escodegen')
var esprima = require('esprima')
var walk = require('esprima-walk')
var n = require("ast-types").namedTypes;
//some case-bugfixes
PRICINGffl = PRICINGffl.replace(/amount/gmi, 'Amount')

LME.importFFL(PRICINGffl);

LME.lme.fixProblemsInImportedSolution()
let LMEExport = LME.exportLME();
writeFileSync(__dirname + '/PRICING.json', LMEExport);
var subFunctions = {};
let PRICINGMETA = JSON.parse(LMEExport);

function addSubFunction(node) {
    var readableFormula = escodegen.generate(node);
    subFunctions[readableFormula] = (subFunctions[readableFormula] || {
        count: 0,
        argumentValues: {}
    })
    var subFunction = subFunctions[readableFormula];
    subFunction.count = subFunction.count + 1
    return subFunction;
}

var varnames = [
    "Borrower_tpClientRaRoRaC",
    "Borrower_tpClientEconomicProfit",
    "Borrower_tpClientRegulatoryProfit",
    "Borrower_tpClientReturnOnEquity",
    "Borrower_tpRaRoRaC",
    "Borrower_tpEconomicProfit",
    "Borrower_tpRegulatoryProfit",
    "Borrower_tpReturnOnEquity",
    "Facility",
    "Facility_tpID",
    "Facility_tpRequiredCustomerSpread",
    "Facility_tpRequiredLiquiditySpread",
    "Facility_tpRequiredMarketSpread",
    "Facility_tpEconomicProfit",
    "Facility_tpRegulatoryProfit",
    "Facility_tpReturnOnEquity",
    "Facility_tpRiskAdjustedReturn",
    "Facility_tpEconomicCapital",
    "Facility_tpRaRoRaC"
];
var dependencies = "";
var allVariables = {};
var usedvars = {};

function parseDeps(formula) {
    let formulaName = formula.name.replace(/AABPRICING_(.*)_value/, '$1');
    if (usedvars[formulaName]) {
        return;
    }
    usedvars[formulaName] = true;
    dependencies = dependencies + formulaName + '\n';
    for (var dep in formula.deps) {
        let fetch = PropertiesAssembler.fetch(dep);
        let findFormulaByIndex = FormulaService.findFormulaByIndex(fetch.ref);
        parseDeps(findFormulaByIndex);
    }
}

LME.visitFormulas((formula) => {
    if (formula.name.endsWith('_value')) {
        allVariables[formula.name.replace(/AABPRICING_(.*)_value/, '$1')] = true
    }
    for (var i = 0; i < varnames.length; i++) {
        var varname = varnames[i];
        if (varname == formula.name.replace(/AABPRICING_(.*)_value/, '$1')) {
            parseDeps(formula)
        }
    }
})
writeFileSync(__dirname + '/pricingoutputUsedVariables.txt', dependencies);
var output = "";
for (var key in allVariables) {
    if (usedvars[key]) {
    } else {
        output = output + key + '\n'
    }
}
writeFileSync(__dirname + '/pricingoutputunUsedVariables.txt', output);


LME.visitFormulas((formula) => {
    let ast = esprima.parse(formula.original);
    walk(ast, function(node) {
        if (node.type === 'CallExpression') {

            addSubFunction(node)
            let oldArgument;
            walk(node, function(childNode) {
                if (childNode.type === 'CallExpression') {
                    //SHOULD be all of the sub functions.
                    for (var i = 0; i < node.arguments.length; i++) {
                        oldArgument = node.arguments[i];
                        node.arguments[i] = {'type': 'Literal', 'value': '*'}

                        const isubFunction = addSubFunction(node)
                        //save argument to list
                        isubFunction.argumentValues[escodegen.generate(oldArgument)] = true;
                        node.arguments[i] = oldArgument;
                    }
                }
            })
        }
    })
})
for (subf in subFunctions) {
    if (subFunctions[subf].count === 1 || subf.length < 20) {
        delete subFunctions[subf];
    }
}
var winst = 0;
var extractedFunction = []
writeFileSync('./subfunctions.ffl', JSON.stringify(subFunctions, function(key, value) {
    /*if (!isNaN(value)) {
        if (value > 1) {
            winst += (key.length * (value - 1))
            extractedFunction.push({
                body: key,
                id: extractedFunction.length
            })
            return value;
        }
        return undefined;
    }*/
    return value;
}, 2))
var maxdeps = Object.keys(LME.maxDependencies().deps).length

var tempOutput = "";
PRICINGMETA.formulas.forEach((formula) => {
    var orig = formula.original;
    extractedFunction.forEach((elem) => {
        orig = orig.replace(elem.body, 'EXTRACT' + elem.id + '()')
    })
    tempOutput += formula.fflname + '=' + orig + ';\n';
})
extractedFunction.forEach((elem) => {
    tempOutput += 'EXTRACT' + elem.id + '=' + elem.body + '\n';
    //orig = orig.replace(elem.body, 'EXTRACT' + elem.id + '()')
})
writeFileSync(__dirname + '/plainFFLformulas.js', tempOutput);
var longestRepeat = jslrs.lrs(tempOutput);
log.debug(tempOutput.length)