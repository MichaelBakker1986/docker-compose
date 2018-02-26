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
 * map = model
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
/**
 * TODO: support for variable types.
 *  - primitive and objects
 *  - also function types that don't need to be executed.
 *  100 + m[10002]   when m[10002] = 1(but can be entered.)
 *  100 + 1          when m[10002] = 1(and locked.)
 */
fm.prototype.initializeFormula = function(newFormula, map, audittrail) {
    const id = newFormula.id || newFormula.index;
    const stringFunction = "return " + newFormula.parsed + " /*  \n" + newFormula.name + ":" + newFormula.original + "  */ ";

    //we going to use .bind for function-scope variable binding. First of all we going to bind all CHOICES!
    //In the choice we can use this.options[]....

    var modelFunction = Function(newFormula.params || 'f, x, y, z, v, m', stringFunction);
    if (newFormula.self != null) modelFunction = modelFunction.bind(newFormula.self)

    const javaScriptFunction = formulaDecorators[newFormula.type](modelFunction, id, newFormula.name);

    if (global.IDE_DEBUGMODUS) map[id] = debugwrapper(javaScriptFunction, id, newFormula, audittrail)
    else map[id] = javaScriptFunction;
}
/**
 * The debugwrapper is used by unit-tests and IDE
 * It supports engine audit-trail
 * Inject source FFL into the parsed functions
 * @param javaScriptFunction
 * @returns {Function}
 */
const debugwrapper = function(javaScriptFunction, id, newFormula, audittrailArg) {

    const audittrail = audittrailArg;
    const original = newFormula.original;
    const variableName = newFormula.name.split('_').slice(1, -1).join('_')
    const property = newFormula.name.split('_').pop()
    const ff = javaScriptFunction;

    audittrail.addRow(['MODEL', 'INFO', variableName, property, '', '', '', 'Ok', newFormula.original, id, newFormula.parsed])
    return function() {
        var value
        var state = 'INFO'
        var message = '';

        try {
            value = ff.apply(this, arguments);
        } catch (err) {
            state = 'ERROR'
            message = err.toString()
            value = NA
        }
        //*growing too fast for V05*//
        //*For static functions args[1] and args[2] can be anythng*//
        audittrail.addRow(['DATA', state, variableName, property, (arguments[2].display || arguments[2]), (arguments[1].hash || arguments[1]), value, message, original, id])
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