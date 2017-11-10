require('../archive/fin/finparser.js');//just let it inject into the FESFacade
require('../archive/exchange_modules/screendefinition/screendefparser.js');//just let it inject into the FESFacade
var WorkBook = require('../archive/fesjs/JSWorkBook.js');
var JUNIT = require('./JUNIT.js');
var FESFacade = require('../archive/fesjs/FESFacade');
var bootstrap = require('../archive/fesjs/formula-bootstrap.js');
var uimodel = require('../archive/clientscorecard/uimodel.js');
var assert = require('assert');
var logger = require('tracer').console({level: global.loglevel || 'debug'})
var skip = false;
var info = JUNIT.print;
if (!skip) {
    var data = JUNIT.getFile('concepts.fin');
    var wb = new WorkBook();
    wb.importSolution(data, 'fin');
    var validate = wb.validateImportedSolution();
    var feedback = validate.fixProblemsInImportedSolution()
    assert.ok(wb.validateImportedSolution().valid);

//this is how the original FIN file looks like /resources/concepts.fin
    /*
     PPP      X     0               "Scorecard Test Model v#CompactModelVersion#"                       \Root
     PPP     1N C   1               Scorecard Test Model                                                \X_ROOT
     C Dit is een model om de scorecard applicatie te testen.
     PPP     1N C   2               $>Map 100<$                                                         \X_MAP01
     C HintText ABC
     XPP     1A   1 3               $>Warning voor map 1<$                                              \X_MAP01_WARNING
     XPP     1A   1 3               $>Warning voor map 1<$                                              \X_MAP01_HINT
     XPP     1A   1 3               $>Warning voor map 1<$                                              \X_MAP01_Verplicht
     PPP     1A   1 3               $>Warning voor X_MAP01_Vraag04<$                                    \X_MAP01_Vraag04
     PPP     1N     3               $>Paragraaf2<$                                                      \X_MAP01_Paragraaf02
     PPP     1N     3               $>X_MAP01_Verplicht 2<$                                             \X_STATUS_FINAL_ON
     */
//extracting a simular tree
    var expectedFinTree = {
        "variableName": "Root",
        "children": [
            {
                "variableName": "X_ROOT",
                "displaytype": "choice",
                "hint": "Dit is een model om de scorecard applicatie te testen.",
                "children": [
                    {
                        "variableName": "X_MAP01",
                        "hint": "HintText ABC",
                        //"hint": "Dit is de hinttekst van ' Map 1' (DEZE REGEL WORDT NIET MEER GEBRUIKT!)",<== later
                        "displaytype": "choice",
                        "children": [
                            {
                                "variableName": "X_MAP01_WARNING",
                                "title": "Warning voor map 1",
                                "hidden": true
                            },
                            {
                                "variableName": "X_MAP01_HINT",
                                "hidden": true
                            },
                            {
                                "variableName": "X_MAP01_Verplicht",
                                "hidden": true
                            },
                            {
                                "variableName": "X_MAP01_Vraag04",
                                "required": true
                            },
                            {
                                "variableName": "X_MAP01_Paragraaf02"
                            },
                            {
                                "variableName": "X_STATUS_FINAL_ON"
                            }
                        ]
                    }
                ]
            }
        ]
    };
//so we can make a structure test.0
    var actual = JSON.parse(wb.export('screendefinition'));
    JUNIT.validateTree(expectedFinTree, actual.children[0], 'children', 'children', function (expected, actual) {
        if (expected.hidden) {
            assert.ok(!wb.get(expected.variableName, 'visible'));
        }
        if (expected.hint) {
            var trim = wb.get(expected.variableName, 'hint').trim();
            assert.ok(trim === expected.hint);
        }
        if (expected.title) {
            var trim = wb.get(expected.variableName, 'title').trim();
            assert.ok(trim === expected.title);
        }
        if (expected.required) {
            var trim = wb.get(expected.variableName, 'required');
            assert.ok(trim === expected.required);
        }
        return expected.variableName == actual.name;
    })

//TODO: move to uimodelTest
//Make structural test here
    var node = wb.getNode('X_MAP01');
    assert.equal(node.displayAs, 'select');

    assert.equal(wb.get('X_ROOT', 'choices').length, 2);
    var finExport = wb.export('fin');
    info(finExport)
    var xmap01Verplicht = wb.get('X_MAP01_Verplicht');
    var xmap01Verplichtformula = wb.getFormula('X_MAP01_Verplicht')
    var X_MAP01_HINT = wb.get('X_MAP01_HINT')
    var X_CASE_CHECK = wb.getFormula('X_CASE_TEST')
    var X_TEST_FORMUAL = wb.getFormula('X_TEST_FORMUAL')
    info(xmap01Verplicht)
}
function lookupFormula(context, id) {
    var formula = FESFacade.findFormulaByIndex(id)
    if (Cyclic[context.path[context.path.length - 1]] !== formula.name) {
        return formula;
    }
    return undefined;
}
function recursiveLookup(context, root) {
    for (var i = 0; i < root.formulaDependencys.length; i++) {
        var formulaDependency = root.formulaDependencys[i];
        assert.ok(formulaDependency.name.trim().length > 10, formulaDependency.name);

        if (formulaDependency.association == 'refs') {
            if (formulaDependency.refId !== undefined) {
                context.ids['id' + formulaDependency.refId] = formulaDependency.refId;
            }
            //always available
            context.path.push(formulaDependency.name);

            if (context.names[formulaDependency.name] || context.self === formulaDependency.name) {
                throw Error('Cyclic dependency found [' + formulaDependency.name + ']');
            }
            else if (formulaDependency.refId !== undefined) {
                var formula = lookupFormula(context, formulaDependency.refId);
                if (formula !== undefined) {
                    context.names[formulaDependency.name] = formula.original;
                    recursiveLookup(context, formula);
                }
            }
            if (formulaDependency.refId !== undefined) {
                delete context.ids['id' + formulaDependency.refId];
                //delete context.names[formulaDependency.name];
                // delete context.ids['id' + formulaDependency.refId];
            }
            delete context.names[formulaDependency.name];
            context.path.pop();
        }
    }
}

//we going to exclude these paths
var Cyclic =
    {
        //start                                                        towards
        FINANPROGNOSEMODEL_Product_tpSales_value: 'FINANPROGNOSEMODEL_Product_tpGrowth_value',
        FINANPROGNOSEMODEL_Product_tpGrowth_value: 'FINANPROGNOSEMODEL_Product_tpSales_value',
        FINANPROGNOSEMODEL_OperationalCash_value: 'FINANPROGNOSEMODEL_OperationalCashTotalPercentage_value',
        FINANPROGNOSEMODEL_DividendPayableForecast_value: 'FINANPROGNOSEMODEL_DividendPayable_value',
        FINANPROGNOSEMODEL_DividendPayable_value: 'FINANPROGNOSEMODEL_DividendPayableForecast_value',
        FINANPROGNOSEMODEL_OperationalCashTotalPercentage_value: 'FINANPROGNOSEMODEL_OperationalCash_value',
        FINANPROGNOSEMODEL_AuxiliarySuppliesProductionCashExpenses_value: 'FINANPROGNOSEMODEL_AuxiliarySuppliesProductionExpensesAccruedExclVAT_value'
    }
/*console.info9*/
//TODO: move this technique into the Importing Module,
//Just filter out all Cyclic Dependencies Before performing Monte Carlo
//We its quicker and gives more detail

var tests = ['V05_org.fin', 'ING_KBM/REVISIE/FIN/Revisie.FIN', 'SCORECARDTESTMODEL.fin'];//, 'V05_org', 'SCORECARDTESTMODEL'];
for (var i = 0; i < tests.length; i++) {
    var obj = tests[i];
    console.info('Testing Solution: [' + obj + ']')
    var data = JUNIT.getFile(obj);

    var wb = new WorkBook();
    wb.importSolution(data, 'fin');
    var allDeps = [];
    break;
    FESFacade.visitFormulas(function (outerFormula) {
        var totaldeps = {
            self: outerFormula.name,
            ids: {},//its changed to Object, else creating GIANT arrays
            names: [],
            path: []
        };
        try {
            recursiveLookup(totaldeps, outerFormula);
        }
        catch (e) {
            logger.warn(e);
            //  console.info(totaldeps)
            for (var key in  totaldeps.ids) {
                if (key.startsWith('id')) {
                    var index = totaldeps.ids[key];
                    var findFormulaByIndex = FESFacade.findFormulaByIndex(index);
                    if (findFormulaByIndex === undefined) {
                        logger.warn(key + ": Theoretical bound, probaly a default formula, But something we never seen before.");
                    }
                    else {
                        logger.info(findFormulaByIndex.name + ":" + findFormulaByIndex.parsed);
                    }
                }
            }
            Cyclic[totaldeps.path[totaldeps.path.length - 1]] = totaldeps.path[totaldeps.path.length - 2];
            Cyclic[totaldeps.path[totaldeps.path.length - 2]] = totaldeps.path[totaldeps.path.length - 1];
        }

        allDeps.push({
            name: outerFormula.name,
            keys: Object.keys(totaldeps.ids).length,
            size: Object.keys(totaldeps.names).length,
            deps: Object.keys(totaldeps.names)
        })
    });
    allDeps.sort(function (a, b) {
        return a.size > b.size ? 1 : (a.size === b.size ? 0 : -1);
    });
    allDeps = allDeps.filter(function (obj) {
        return obj.size > 5
    });

}
console.info('Fin import success')

