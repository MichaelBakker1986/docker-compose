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

//don't directly use this method, use JSWorkBook instead.
fm.prototype.apiGet = function(formula, x, y, z, v, map) {
    //temp fix fallback for ID, index is the Virtual ID, not persisted in the database
    //should be checked outside this function call
    const id = formula.id || formula.index;
    return map[id](id, x, y, z, v, map);
}
fm.prototype.apiSet = function(formula, x, y, z, value, v) {
    const id = formula.id || formula.index;
    if (v[id] !== undefined) {
        var hash = x.hash + y.hash + z;
        var newValue = value;
        v[id][hash] = newValue;
    }
    else if (log.DEBUG) log.debug('[%s] does not exist in the model.', id);
}
fm.prototype.initializeFormula = function(newFormula, map, audittrail) {
    const id = newFormula.id || newFormula.index;
    const stringFunction = "return " + newFormula.parsed + " /*  \n" + newFormula.name + ":" + newFormula.original + "  */ ";// : "return " + newFormula.parsed
    const modelFunction = Function(newFormula.params || 'f, x, y, z, v, m', stringFunction);
    const javaScriptFunction = formulaDecorators[newFormula.type](modelFunction, id, newFormula.name);

    if (global.DEBUGMODUS) (map || m)[id] = debugwrapper(javaScriptFunction, id, newFormula, audittrail)
    else map[id] = javaScriptFunction;
}
/**
 * The debugwrapper is used by unit-tests and IDE
 * It supports engine audit-trail
 * Inject source FFL into the parsed functions
 * @param javaScriptFunction
 * @returns {Function}
 */
const debugwrapper = function(javaScriptFunction, id, newFormula, audittrail) {
    if (log.TRACE) audittrail.push(["Added function %s\n\t\t\t\t\t\t\t\t\t  [%s] %s : %s : [%s]", +id, newFormula.original, newFormula.name, newFormula.type, newFormula.parsed])
    const idxMap = [30, 10, 10, 10, 10, 240]

    const variableName = newFormula.name.split('_').slice(1, -1).join('_')
    const property = newFormula.name.split('_').pop()

    return function(f, x, y, z, v, m) {

        const value = javaScriptFunction(f, x, y, z, v, m);
        const el = [variableName, property, y.display, x.hash, value, newFormula.original]
        const tout = el.map(function(innerEl, idx) {
            const prefix = [];
            prefix.length = Math.max(idxMap[idx] - String(innerEl).length, 0);
            return String(innerEl).slice(0, idxMap[idx] - 1) + prefix.join(' ')
        }).join("|")
        audittrail.push([tout])
        return value;
    }
}
//we do need this functions to be here, so the FormulaBootstrap can directly call the function on its map instead of
//for now we just use static functions and user enterable function that will not cache.
// the ApiGet. we don't need the CacheLocked and the NoCacheUnlocked they are just for further optimalizations.
const formulaDecorators = {
    //nothing to to, just return the inner function
    noCacheLocked  : function(innerFunction, formulaName) {
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
            const hash = x.hash + y.hash + z;
            //check if user entered a value
            if (v[f][hash] == null) return innerFunction(f, x, y, z, v, m);
            return v[f][hash]; //return entered value
        };
    }
}
module.exports = fm.prototype;