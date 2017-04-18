var log = require('ff-log')
/**
 * The map that contains all model-functions and values
 */
//internal data structure
//var fm = {};
function fm() {
}
//some api functions
//dont use this method, use JSWorkBook instead.
fm.prototype.apiGet = function (formula, x, y, z, v) {
    // console.info('API call for formula: ' + formula.name);
    //temp fix fallback for ID, index is the Virtual ID, not persisted in the database
    //should be checked outside this function call
    var id = formula.id === undefined ? formula.index : formula.id;
    return global['a' + id](id, x, y, z, v);
}
//public
//v = entered values
fm.prototype.apiSet = function (formula, x, y, z, value, v) {
    var id = formula.id === undefined ? formula.index : formula.id;
    if (v[id] !== undefined) {
        var hash = x.hash + y + z;
        var newValue = value;
        if (value === '' || value === null) {
            newValue = undefined;
        }
        v[id][hash] = newValue;
    }
    else {
        log.debug('[%s] does not exist', id);
    }
}

//TODO: reparse all dependencies/references WHEN index changes!
//disableFormulaCache means it will remove the parsed member from given formula's
//caches are within the given formula's
//public
fm.prototype.initFormulaBootstrap = function (formulaParser, formulas, disableFormulaCache) {
    formulas.forEach(function (newFormula) {
        var id = newFormula.id === undefined ? newFormula.index : newFormula.id;
        //technical depth, we only want to this when user explicitly entered it or something. They have these Objects!
        //we can do it there, for now we just have this parameter.
        if (disableFormulaCache) {
            newFormula.parsed = undefined;//explicitly reset parsed. (The formula-bootstrap) will skip parsed formulas.
        }
        var javaScriptfunction = formulaParser(newFormula);
        log.debug("Added function %s\n\t\t\t\t\t\t\t\t\t  %s : %s : [%s]", newFormula.original, newFormula.name, newFormula.type, javaScriptfunction)
        var modelFunction = Function('f, x, y, z, v', 'return ' + javaScriptfunction).bind(global);
        global['a' + id] = formulaDecorators[newFormula.type](modelFunction, id, newFormula.name);
    });
};
//private
//we do need this functions to be here, so the FormulaBootstrap can directly call the function on its map instead of
//for now we just use static functions and user enterable function that will not cache.
// the ApiGet. we don't need the CacheLocked and the NoCacheUnlocked they are just for further optimalizations.
var formulaDecorators = {
    //nothing to to, just return the inner function
    noCacheLocked: function (innerFunction, formulaName) {
        return innerFunction;
    },
    //Unlocked formula's can be user entered.
    //Encapsulates that part.
    noCacheUnlocked: function (innerFunction, formulaName, varName) {
        //add a user value cache
        //f = formulaId
        //y,x,z dimensions Tuple,Column,Layer
        //v = enteredValues
        return function (f, x, y, z, v) {
            //console.info('calling formula ;' + formulaName)
            var hash = x.hash + y + z;
            //check if user entered a value
            if (v[f][hash] === undefined) {
                var valueOfFunction = innerFunction(f, x, y, z, v);
                //return function value;
                //console.info('called:[' + varName + '][' + valueOfFunction + ']')
                return valueOfFunction;
            }
            //return entered value
            return v[f][hash];
        };
    }
    //will need more types e.g. cacheLocked and cacheUnlocked.
}
fm.prototype.moveFormula = function (oldFormula, newFormula) {
    if (oldFormula.index !== newFormula.id) {
        if (global['a' + newFormula.id]) {
            log.warn('Formula already taken[' + newFormula.id + ']');
        }
        else {
            global['a' + newFormula.id] = newFormula;
            global['a' + oldFormula.index] = null;
        }
    }
};
module.exports = fm.prototype;