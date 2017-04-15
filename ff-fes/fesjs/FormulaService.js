var logger = require('ff-log');
var AST = require('ast-node-utils').ast;
var assert = require('assert')
var escodegen = require('escodegen')

//the array index is used to be next formulaId
var formulas = [];
formulas[100000] = null;
/**
 * Todo: add formula.frequency into the cache key?
 * the cache is a String based to Formula object cache,
 * One a formula is created, its stored in cache.
 * When another formula with the same modelFormula String is presented its checked with cache
 */
var cache = {};
function FormulaService() {
}
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
function addAssociation(index, ui, associationType) {
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
/**
 * called to parse modelString formula and add to current state
 * if formulaString already parsed, its returned from cache
 */
FormulaService.prototype.addModelFormula = function (ui, groupName, row, col, locked, body) {
    assert(body !== undefined, 'refactored, this function return undefined when body is undefined');
    var formula;
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

    //add the formula Association, so formula 1 knows C12_value uses it.
    addAssociation(formula.index, ui, 'refs');
    return formula.id === undefined ? formula.index : formula.id;
}
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
FormulaService.prototype.findFormulaByIndex = function (index) {
    return formulas[index];
}
/**
 * used with javascript models, they are pre-parsed
 */
FormulaService.prototype.bulkInsertFormula = function (formulasArg) {
    for (var i = 0; i < formulasArg.length; i++) {
        var formula = formulasArg[i];
        formulas[formula.id] = formula;
    }
};
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