var formulabootstrap = require('./formula-bootstrap.js')
// Helper function..... to Objectify a variable
function object(o)
{
    function F()
    {
    }

    F.prototype = o;
    return new F();
}
var fprops = {};
/**
 * TODO: |Because adding incremental behavior, visible,locked etc on a generic interface
 * There are a lot of specific checks
 * Therefore engine should be rewritten in the end
 * @type {{apiget: Function, apiset: Function}}
 */
var FunctionMap = {
    apiget: function (request, variable, y, x, z)
    {
        // here we could add some checks if the request is valid, for not they are omitted
        for (var prop in request)
        {
            var fprop = fprops[prop];
            var formulaIndex = variable.formula[fprop][x.f];
            //for now while building up we narrow down all results
            request[prop] = this[formulaIndex](variable.hash, y, x, z);
        }
        // is not mandatiory but preserve oneliners.
        return request;
    },
    // we can only set the value for a variable, rest is restricted
    apiset: function (variable, y, x, z, value)
    {
        // calculate the hash, hexdecimal hash for now
        console.info('api set ' + variable + ' y;' + y.hash + ' x;' + x.hash + ' z;' + z.hash + ' value=' + value);
        var hash = y.hash + x.hash + z.hash;

        var formulaIndex = variable.formula[fprops['value']][x.f];

        if (value.length == 0)
        {
            delete this['__' + variable.hash][hash];
        }
        else
        {
            this['__' + variable.hash][hash] = value;
        }
        //return all dependencies, that might have changed
        return this[formulaIndex].dependencies;
    }
}
/**
 * TODO: this function for now only builds a JavaScript function
 * TODO: make formula-bootstrap work for all known functions.
 * Formula-BootStrap was designed for Variable based formula's and dependencies were resolved accordingly
 * Now, dependencies are via Formula's and the internal logic of the formula's will be more specific. not referring to
 * the Variable.value but Variable.formulaset.value formula,
 * If it is a runtime dependency (e.g. x.NextBookYear) the function will include this[baseIndex+x.NextBookYear.f]
 * The Dependencies for this type will include all of them(all FormulaSet formula) possible.
 *
 * @param formula
 * @param index
 */
function wrapInitializer(formula, index)
{
    FunctionMap[index] = function (f, y, x, z)
    {
        var formulaAsString = formula.formula;
        // check if it was already evaluated.
        // for now we just direcly convert string to function how javascript would interpret it.
        // the .bind is required to bind it to the FunctionMap, javascript normally bind it to Global.
        // it will become more complex here to find dependencies, to bind identifiers etc..
        /*console.info('[evaluating] : ' + formulaAsString)*/

        var generated = formulabootstrap(formula);
        //modelFunction = Function('f, y, x, z', 'return ' + formulaAsString).bind(this);
        var modelFunction = Function('f, y, x, z', 'return ' + generated).bind(this);

        // console.info(formula.type)
        this[index] = wrappingtypes[formula.type](modelFunction, index);
        this[index].dependencies = [21, 22];
        return this[index](f, y, x, z);
    };
}
/**
 * Here are two types to wrap the ModelFunctions, one just no cache at all. It would the equivalent of locked=1, and a
 * simple function<br> keeping a cache that only contains 1's for all possibilities would just cause overhead <br>
 * <br>
 * The cache does check the possible inherited calculation cache. If the Function would been locked. the uvalues cache
 * and values cache are the same instance<br>
 */
var wrappingtypes = {
    nocachelocked: function (wrapFunction, index)
    {
        return function (f, y, x, z)
        {
            return wrapFunction(f, y, x, z);
        }
    },
    nocacheunlocked: function (wrapFunction, index)
    {
        // for debug purposed we also wrap this function to do some logging
        return function (f, y, x, z)
        {
            // build the hash
            var hash = y.hash + x.hash + z.hash;
            var returnvalue = this['__' + f][hash];
            if (returnvalue === undefined)
            {
                returnvalue = wrapFunction(f, y, x, z);
            }
            return returnvalue;
        }
    },
    cachelocked: function (wrapFunction, index)
    {
        var uf = '_' + index;
        /**
         * Boiler plate for user-entered and calculation-caching functions these functions are always called from
         * the FunctionMap context, so "this" will reference the FunctionMap
         */
        return function (f, y, x, z)
        {
            // build the hash
            var hash = y.hash + x.hash + z.hash;
            // check uservalue cache, calculation cache
            var returnvalue = this['__' + f][hash];
            if (returnvalue === undefined)
            {
                // To prevent circular calls, this['values' + f][hash] = 0; should be NA/ or formula default value,
                // have to be added here this will be pre-optimized with and only be applied for functions that have
                // this problem
                // console.info("Calculation(cached)");
                // call real function
                returnvalue = wrapFunction(f, y, x, z);
                // save the value
                this[uf][hash] = returnvalue;
            }
            return returnvalue;
        }
    },
    cacheunlocked: undefined,
    locked: {
        cacheunlocked: false,
        cachelocked: true,
        nocacheunlocked: false,
        nocachelocked: true
    },
    cache: {
        cacheunlocked: true,
        cachelocked: true,
        nocacheunlocked: false,
        nocachelocked: false
    }
}
wrappingtypes.cacheunlocked = wrappingtypes.cachelocked;
module.exports = function (modelFunctions, formulaproperties)
{
    console.time('bootstrap document');
    fprops = formulaproperties;
    var document = FunctionMap;
    for (var index = 0; index < modelFunctions.length; index++)
    {
        var modelFunction = modelFunctions[index];
        wrapInitializer(modelFunction, index);
        //values and User-Entered values are not the same.
        //User-Entered values should be assigned by VariableHash...
        //There should not be any variable -awareness here.
        //also extending it presumably not the best solution. when u want to check if a value is entered, we still need
        // to "base user-entered values only"
        /**
         * TODO: This part could be smarter.. and more obvious
         * Rewrite it.
         */
        var cache = wrappingtypes.cache[modelFunction.type] == true;
        if (cache)
        {
            document['_' + index] = {};
        }
    }
    for (var index = 0; index < 1000; index++)
    {
        document['__' + index] = [];
    }
    console.info('bootstrapped ' + modelFunctions.length + ' modelfunctions');
    console.timeEnd('bootstrap document');
    return document;
};