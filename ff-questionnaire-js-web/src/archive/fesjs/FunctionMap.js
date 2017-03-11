/**
 * The map that contains all model-functions and values
 */
//internal data structure
var FunctionMap = {};
//some api functions
//dont use this method, use JSWorkBook instead.
function apiGet(formula, x, y, z, v)
{
    // console.info('API call for formula: ' + formula.name);
    //temp fix fallback for ID, index is the Virtual ID, not persisted in the database
    //should be checked outside this function call
    var id = formula.id === undefined ? formula.index : formula.id;
    return global['a' + id](id, x, y, z, v);
}
//public
//v = entered values
function apiSet(formula, x, y, z, value, v)
{
    var id = formula.id === undefined ? formula.index : formula.id;
    if (v[id] !== undefined)
    {
        var hash = x.hash + y + z;
        var newValue = value;
        if (value === '' || value === null)
        {
            newValue = undefined;
        }
        v[id][hash] = newValue;
    }
    else
    {
        console.info(id + ' does not exist');
    }
}

//TODO: reparse all dependencies/references WHEN index changes!
//disableFormulaCache means it will remove the parsed member from given formula's
//caches are within the given formula's
//public
function init(formulaParser, formulas, disableFormulaCache)
{
    formulas.forEach(function (newFormula)
    {
        var id = newFormula.id === undefined ? newFormula.index : newFormula.id;
        //technical depth, we only want to this when user explicitly entered it or something. They have these Objects!
        //we can do it there, for now we just have this parameter.
        if (disableFormulaCache)
        {
            newFormula.parsed = undefined;//explicitly reset parsed. (The formula-bootstrap) will skip parsed formulas.
        }
        var modelFunction = Function('f, x, y, z, v', 'return ' + formulaParser(newFormula)).bind(global);
        global['a' + id] = formulaDecorators[newFormula.type](modelFunction, id);
    });
};
//private
//we do need this functions to be here, so the FormulaBootstrap can directly call the function on its map instead of
//for now we just use static functions and user enterable function that will not cache.
// the ApiGet. we don't need the CacheLocked and the NoCacheUnlocked they are just for further optimalizations.
var formulaDecorators = {
    //nothing to to, just return the inner function
    noCacheLocked: function (innerFunction, formulaName)
    {
        return innerFunction;
    },
    //Unlocked formula's can be user entered.
    //Encapsulates that part.
    noCacheUnlocked: function (innerFunction, formulaName)
    {
        //add a user value cache
        //f = formulaId
        //y,x,z dimensions Tuple,Column,Layer
        //v = enteredValues
        return function (f, x, y, z, v)
        {
            var hash = x.hash + y + z;
            //check if user entered a value
            if (v[f][hash] === undefined)
            {
                //return function value;
                return innerFunction(f, x, y, z, v);
            }
            //return entered value
            return v[f][hash];
        };
    }
    //will need more types e.g. cacheLocked and cacheUnlocked.
}
function moveFormula(oldFormula, newFormula)
{
    if (oldFormula.index !== newFormula.id)
    {
        if (FunctionMap['a' + newFormula.id])
        {
            console.warn('Formula already taken[' + newFormula.id + ']');
        }
        else
        {
            FunctionMap['a' + newFormula.id] = newFormula;
            FunctionMap['a' + oldFormula.index] = null;
        }
    }
};
module.exports = {
    apiGet: apiGet,
    apiSet: apiSet,
    init: init,
    moveFormula: moveFormula//bullshit function. just solves a problem what should be solved here
}