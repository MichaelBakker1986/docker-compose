const log = require('log6')

/**
 * The map that contains parsed model-functions
 * * FormulaId '0' is not a valid ID!
 *
 * x = time object
 * y = tuple object
 * z = timeline object
 * value = new value
 * v = entered values
 * m = model
 */
function fm() {
}

const m = []
//don't directly use this method, use JSWorkBook instead.
fm.prototype.apiGet = function(formula, x, y, z, v) {
    //temp fix fallback for ID, index is the Virtual ID, not persisted in the database
    //should be checked outside this function call
    var id = formula.id || formula.index;
    return m[id](id, x, y, z, v, m);
}
fm.prototype.apiSet = function(formula, x, y, z, value, v) {
    var id = formula.id || formula.index;
    if (v[id] !== undefined) {
        var hash = x.hash + y.hash + z;
        var newValue = value;
        v[id][hash] = newValue;
    }
    else if (log.DEBUG) log.debug('[%s] does not exist', id);
}
if (!global.DEBUGMODUS) {
    global.DEBUGMODUS = false
}
fm.prototype.initializeFormula = function(newFormula) {
    const id = newFormula.id || newFormula.index;
    //"debug('" + newFormula.name + "');
    if (log.TRACE) log.trace("Added function %s\n\t\t\t\t\t\t\t\t\t  [%s] %s : %s : [%s]", +id, newFormula.original, newFormula.name, newFormula.type, newFormula.parsed)
    var stringFunction;

    if (global.DEBUGMODUS) stringFunction = "const debugv =  (" + newFormula.parsed + ") ;console.info(' variable[%s] value[%s] tuple:[%s] column[%s]','" + newFormula.name + "',debugv,y.display,x.hash);return debugv;/*  \n" + newFormula.name + ":" + newFormula.original + "  */ ";// : "return " + newFormula.parsed
    else stringFunction = "return " + newFormula.parsed + " /*  \n" + newFormula.name + ":" + newFormula.original + "  */ ";// : "return " + newFormula.parsed

    const modelFunction = Function(newFormula.params || 'f, x, y, z, v, m', stringFunction).bind(global);
    m[id] = formulaDecorators[newFormula.type](modelFunction, id, newFormula.name);
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
        return function(f, x, y, z, v, m) {
            if (x.dummy) return NA;
            var hash = x.hash + y.hash + z;
            //check if user entered a value
            if (v[f][hash] == null) {
                return innerFunction(f, x, y, z, v, m);
            }
            return v[f][hash]; //return entered value
        };
    }
}
module.exports = fm.prototype;