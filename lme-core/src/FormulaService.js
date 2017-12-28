const log = require('log6');
const AST = require('../../ast-node-utils').ast;
const assert = require('assert')
const escodegen = require('escodegen')
/**
 * * FormulaId '0' is not a valid ID!
 */
const variables = []
//the array index is used to be next formulaId
const formulas = [];
//make 100.000 entries, we start counting here for temporally formula's
formulas[1000] = null;
/**
 * Todo: add formula.frequency into the cache key?
 * the cache is a String based to Formula object cache,
 * One a formula is created, its stored in cache.
 * When another formula with the same modelFormula String is presented its checked with cache
 */
const cache = {};

function FormulaService() {
}

FormulaService.prototype.visitFormulas = function(visitFunctionArg) {
    for (var i = 0; i < formulas.length; i++) {
        var formula = formulas[i];
        if (formula !== null && formula !== undefined) {
            visitFunctionArg(formula);

        }
        else if (i > 1000) {
            visitFunctionArg(formula);
        }
    }
}
FormulaService.prototype.addFormulaDependency = function(formulaInfo, referenceFormulaIndex, referenceName) {
    //we want do know if we can all the value straight away or we have to invoke a function for it
    //in future we want to check here if its a dynamic formula, or plain value.
    //also inherited functions are nice to play around with.
    //if type is not static, we add it as dependency
    var referenceFormulaInfo = formulas[referenceFormulaIndex];
    //ok so we going to allow default values, this could because this formula was the default.
    //there was once an idea to create static formula types
    //we could now reference to the index instead...
    var refName = referenceName;
    var refId;
    if (referenceFormulaInfo === undefined) {
        log.trace('failed to lookup:[' + referenceName + '] but it was in the model, could be in another model. OR it just have default value formula')
        log.trace(formulaInfo.original);
    }
    else {
        refName = referenceFormulaInfo.name;
        refId = referenceFormulaInfo.id || referenceFormulaInfo.index;

        if (referenceFormulaInfo.refs[formulaInfo.name] === undefined) {
            referenceFormulaInfo.refs[formulaInfo.name] = true;
            referenceFormulaInfo.formulaDependencys.push({
                name: formulaInfo.name,
                association: 'refs',
                refId: formulaInfo.id || formulaInfo.index
            });
        }
    }
    if (formulaInfo.deps[refName] === undefined) {
        formulaInfo.deps[refName] = true;
        formulaInfo.formulaDependencys.push({
            name: refName,
            association: 'deps',
            refId: refId
        });
    }
    return referenceFormulaInfo;
}

/**
 */
function addAssociation(index, property, associationType) {
    var formula = formulas[index];
    var otherFormula = formulas[property.ref];
    if (otherFormula.name !== formula.name && formula.refs[otherFormula.name] === undefined) {
        formula.formulaDependencys.push({
            name: otherFormula.name,
            association: associationType
        });
    }
    formula[associationType][property.name] = true;
}

/**
 * called to parse modelString formula and add to current state
 * if formulaString already parsed, its returned from cache
 */
FormulaService.prototype.addModelFormula = function(property, groupName, row, col, locked, body, frequency) {
    assert(frequency,'A formula must have a frequency')
    assert(body !== undefined, 'refactored, this function return undefined when body is undefined');
    var formula;
    var key = escodegen.generate(AST.EXPRESSION(body));
    //if not locked and the formula isn't already cached, we can reuse it
    //if not locked, its not possible to re-use since the user to override the value of the formula
    //when running in DEBUG-MODUS, we cannot re-use Formula's since they will result in incorrect method calls
    if (locked && cache[frequency + "_" + key] !== undefined) {
        formula = cache[frequency + "_" + key];
    }
    else {
        //else we have to create a new formula
        formula = newFormula(locked, AST.EXPRESSION(body), formulas.length, property.name);
        cache[key] = formula;
    }
    property.ref = formula.index;
    property.formulaName = formula.name;

    //add the formula Association, so formula 1 knows C12_value uses it.
    addAssociation(formula.index, property, 'refs');
    return formula.id || formula.index;
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
function newFormula(locked, body, index, propertyName) {
    var original = AST.PROGRAM(body);
    var formula = {
        type: locked ? 'noCacheLocked' : 'noCacheUnlocked',//there are some types, for nor only locked and unlocked are interesting
        refs: {},//map of references
        formulaDependencys: [],//array of associations (deps and refs)
        deps: {},//map of dependencies
        body: original,//AST
        original: original,
        index: index,//index used in formula array
        name: propertyName//default formula name.
    };
    formulas.push(formula);
    return formula;
}

FormulaService.prototype.findFormulaByIndex = function(index) {
    return formulas[index];
}
/**
 * used with javascript models, they are pre-parsed
 */
FormulaService.prototype.bulkInsertFormula = function(formulasArg) {
    for (var i = 0; i < formulasArg.length; i++) {
        var formula = formulasArg[i];
        formulas[formula.id] = formula;
    }
};
FormulaService.prototype.moveFormula = function(old, newFormula) {
    if (old.index !== newFormula.id) {
        formulas[newFormula.id] = formulas[old.index];
        formulas[newFormula.id].id = newFormula.id;
        delete formulas[newFormula.id].index;
        //we can make the ID final.
        delete formulas[old.index];
    }
}
FormulaService.prototype.addVariables = function(variablesArg) {
    for (var i = 0; i < variablesArg.length; i++) {
        var variable = variablesArg[i];
        if (variables[variable.name] !== undefined) {
            throw Error('already declared variable [' + variable.name + ']')
        }
        variables.push({
            name: variable.name,
            expression: variable.expression
        })
    }
}
FormulaService.prototype.getVariables = function(visit) {
    for (var i = 0; i < variables.length; i++) {
        visit(variables[i]);
    }
}
FormulaService.prototype.initVariables = function(variables) {
    for (var i = 0; i < variables.length; i++) {
        const variable = variables[i];
        global[variable.name] = variable.expression;
    }
}
module.exports = FormulaService.prototype;