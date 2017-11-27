var log = require('ff-log')

/**
 * The map that contains parsed model-functions
 * * FormulaId '0' is not a valid ID!
 *
 * x = time object
 * y = tuple object
 * z = timeline object
 * value = new value
 * v = entered values
 */
function fm() {
}

//don't directly use this method, use JSWorkBook instead.
fm.prototype.apiGet = function(formula, x, y, z, v) {
    // console.info('API call for formula: ' + formula.name);
    //temp fix fallback for ID, index is the Virtual ID, not persisted in the database
    //should be checked outside this function call
    var id = formula.id || formula.index;
    return global['a' + id](id, x, y, z, v);
}
fm.prototype.apiSet = function(formula, x, y, z, value, v) {
    var id = formula.id || formula.index;

    if (v[id] !== undefined) {
        var hash = x.hash + y.hash + z;
        var newValue = value;
        v[id][hash] = newValue;
    }
    else {
        if (log.DEBUG) log.debug('[%s] does not exist', id);
    }
}
fm.prototype.initializeFormula = function(newFormula) {
    var id = newFormula.id || newFormula.index;
    if (log.TRACE) log.trace("Added function %s\n\t\t\t\t\t\t\t\t\t  [%s] %s : %s : [%s]", 'a' + id, newFormula.original, newFormula.name, newFormula.type, newFormula.parsed)
    var modelFunction = Function(newFormula.params || 'f, x, y, z, v', 'return ' + newFormula.parsed).bind(global);
    global['a' + id] = formulaDecorators[newFormula.type](modelFunction, id, newFormula.name);
};
//we do need this functions to be here, so the FormulaBootstrap can directly call the function on its map instead of
//for now we just use static functions and user enterable function that will not cache.
// the ApiGet. we don't need the CacheLocked and the NoCacheUnlocked they are just for further optimalizations.
var formulaDecorators = {
    //nothing to to, just return the inner function
    noCacheLocked: function(innerFunction, formulaName) {
        return innerFunction;
    },
    //Unlocked formula's can be user entered.
    //Encapsulates that part.
    noCacheUnlocked: function(innerFunction, formulaName, varName) {
        //add a user value cache
        //f = formulaId
        //y,x,z dimensions Tuple,Column,Layer
        //v = enteredValues
        return function(f, x, y, z, v) {
            if (x.dummy) {
                return NA;
            }
            var hash = x.hash + y.hash + z;
            //check if user entered a value
            if (v[f][hash] == null) {
                return innerFunction(f, x, y, z, v);
            }
            //return entered value
            return v[f][hash];
        };
    }
    //will need more types e.g. cacheLocked and cacheUnlocked.
}
fm.prototype.moveFunction = function(oldFormula, newFormula) {
    if (oldFormula.index !== newFormula.id) {
        if (global['a' + newFormula.id]) {
            if (log.DEBUG) log.warn('Formula already taken[' + newFormula.id + ']');
        }
        else {
            global['a' + newFormula.id] = newFormula;
            global['a' + oldFormula.index] = null;
        }
    }
};
module.exports = fm.prototype;