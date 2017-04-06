var logger = require('ff-log');
var AST = require('./AST');
var escodegen = require('escodegen')
var formulas = [];
formulas[100000] = null;
var cache = {};//move to formula-bootstrap.js
/*
 Class Formula
 {
 ast: String, AST AsString
 body: Object, AST
 deps: Object, containing dependend elements
 formulaDependencys: [],
 index: Number, Temporally ID
 name: String, name of the function
 original: String, User entered String value of given formula
 parsed: String, String body of the function
 refs: Object, revered Dependencies of the Formula. These are used to reset caches from the dependent formulas when this value changes
 type: String, Formula decorator type. e.x. If formula can be user entered, it will wrap lookup in the docValues around it
 }
 */
function FormulaService() {
}
//private
FormulaService.prototype.visitFormulas = function (visitFunction) {
    for (var i = 0; i < formulas.length; i++) {
        var formula = formulas[i];
        if (formula !== null && formula !== undefined) {
            visitFunction(formula);
            continue;
        }
        else if (i > 100000) {
            visitFunction(formula);
        }
    }
}
FormulaService.prototype.addAssociation = function (index, ui, associationType) {
    var formula = formulas[index];
    var otherFormula = formulas[ui.ref];
    if (otherFormula.name !== formula.name && formula.refs[otherFormula.name] === undefined) {
        formula.formulaDependencys.push({
            name: otherFormula.name,
            association: associationType
        });
    }
    formula[associationType][ui.name] = true;
}
FormulaService.prototype.addFormulaLink = function (ui, groupName, row, col, locked, body) {

    //just make sure the row exists
    var formula;
    if (body !== undefined) {
        var key = escodegen.generate(AST.EXPRESSION(body));
        //if not locked and the formula isn't already cached, we can reuse it
        if (locked && cache[key] !== undefined) {
            formula = cache[key];
        }
        else {
            //else we have to create a new formula
            formula = newFormula(locked, AST.EXPRESSION(body), formulas.length, ui.name);
            cache[key] = formula;
        }
        ui.ref = formula.index;
        ui.formulaName = formula.name;
        //ui.formula = {name: formula.name};
        //add the formula Association, so formula 1 knows C12_value uses it.
        FormulaService.prototype.addAssociation(formula.index, ui, 'refs');
    }
    if (formula === undefined) {
        return undefined;
    }
    return formula.id === undefined ? formula.index : formula.id;
}
//create a new Formula
//initiate a new Object, add it to the Array
function newFormula(locked, body, index, uiModelName) {
    var original = AST.PROGRAM(body);
    var formula = {
        type: locked ? 'noCacheLocked' : 'noCacheUnlocked',//there are some types, for nor only locked and unlocked are interesting
        refs: {},//map of references
        formulaDependencys: [],//array of associations (deps and refs)
        deps: {},//map of dependencies
        body: original,//AST
        original: original,
        index: index,//index used in formula array
        name: uiModelName//default formula name.
    };
    formulas.push(formula);
    return formula;
}
//private
FormulaService.prototype.findFormulaByIndex = function (index) {
    return formulas[index];
}
FormulaService.prototype.bulkInsertFormula = function (formulasArg) {
    for (var i = 0; i < formulasArg.length; i++) {
        var formula = formulasArg[i];
        formulas[formula.id] = formula;

    }
};
FormulaService.prototype.getFormulas = function () {
    var returnValue = [];
    FormulaService.prototype.visitFormulas(function (formula) {
        returnValue.push(formula)
    })
    return returnValue;
}
FormulaService.prototype.moveFormula = function (old, newFormula) {
    if (old.index !== newFormula.id) {
        formulas[newFormula.id] = formulas[old.index];
        formulas[newFormula.id].id = newFormula.id;
        delete formulas[newFormula.id].index;
        //we can make the ID final.
        delete formulas[old.index];
    }
}
module.exports = FormulaService.prototype;