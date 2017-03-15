/**
 * Bridge between Formulas and UiModel
 * all functions should be moved to either formula-bootstrap.js or uitmodel.js,because this concept doesn't really exist
 *
 * Just look at it Very Generic Dynamic Service
 *
 * if has static members
 *  bootstrap,docValues
 *  FunctionMap
 *  formulas
 *
 * if two actual
 * There is so much wrong with this class, its and STATE and GenericService
 * For now we dont care.
 *
 * So this is where the business logic is.
 * Encapsulate abstraction with Business case
 *
 * So far this Giant is a:
 * UiModelService, ParserService, ValueService, FormulaService, SolutionService
 */
var logger = require('ff-log');
var AST = require('./AST.js');
var jsMath = require('./jsMath.json')
var escodegen = require('escodegen')
var esprima = require('esprima')
var assert = require('assert')
var time = require('./XAxis.js')
var detailColumns = new time().detl.columns;
//for now now just years.. keep it simple
var contextState = detailColumns[0][0];
//converter between display type and fesjs value
var converters = {
    dummy: function (value) {
        return value;
    }
};
/*
 Class Parser
 {
 name: String,
 headerName: String,
 parse: Function(Context) : Solution
 deParse: Function() : Export
 }
 */
var parsers = {};
var UIModel = require('./uimodel.js');
var bootstrap = require('./formula-bootstrap.js');
var FunctionMap = require('./FunctionMap.js');
var docValues = [];
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
var formulas = [];
formulas[100000] = null;

var cache = {};//move to formula-bootstrap.js
Array.prototype.clean = function () {
    var newArray = [];
    var skipped = [];
    for (var i = 0; i < this.length; i++) {
        if (this[i] !== null && this[i] !== undefined) {
            newArray.push(this[i]);
        }
        else if (i > 100000) {
            skipped.push(i);
        }

    }
    return newArray;
};
/**
 * For small arrays, lets say until 1000, elements. There is no need to map by name.
 * Just iterate the shabang and test the property
 */
Array.prototype.lookup = function (property, name) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][property] === name) {
            return this[i];
        }
    }
    return undefined;
}
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}
String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
//private
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
};
function findFormula(uiModel) {
    if (uiModel === undefined) {
        return undefined;
    }
    var id = uiModel.formulaId === undefined ? uiModel.ref : uiModel.formulaId;
    return formulas[uiModel.ref];
}
function getUI(row, col) {
    return UIModel.getUI(row, col || 'value');
}
function getFormulaByUI(uielem) {
    return findFormula(uielem);
}
function getFormula(row, col) {
    return findFormula(getUI(row, col));
};
//public
//when new formula's arrive, we have to update the user-entered map so we don't get NPE
//just a quick-fix..
function updateValueMap(values) {
    var cleaned = formulas.clean();
    cleaned.forEach(function (formula) {
        //later will add values['_'+key] for the cache
        //for unlocked add values[key] here will user entered values stay
        if (formula.type === 'noCacheUnlocked') {
            var id = formula.id === undefined ? formula.index : formula.id;
            if (!values[id]) {
                values[id] = [];
            }
        }
    })
}
//public
function addLink(row, col, locked, body) {
    var ui = UIModel.getUI(row, col);

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
        addAssociation(formula.index, ui, 'refs');
    }
    if (formula === undefined) {
        return undefined;
    }
    return formula.id === undefined ? formula.index : formula.id;
};
//private
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
//copy paste of the one below, its time to integrate Solution
function gatherFormulas(solution) {
    var solutionFormulas = [];
    solution.nodes.forEach(function (uiModel) {
        var formula = findFormula(uiModel);
        if (formula !== undefined && formula !== null) {
            var id = formula.id === undefined ? formula.index : formula.id;
            solutionFormulas[id] = formula;
        }
    })
    solution.formulas = solutionFormulas.clean(null);
}
function produceSolution() {
    var solutionFormulas = [];
    var solution = UIModel.findAll();
    gatherFormulas(solution);
    return solution;
}
//assert(formula.name);
//assert(formula.id);
function bulkInsertFormula(formulasArg) {
    formulasArg.forEach(function (formula) {
        formulas[formula.id] = formula;
    });
};
//public
function getFormulas() {
    return formulas.clean(null);
}

//private

function findFormulaByIndex(index) {
    return formulas[index];
}
function updateValues(values, docValues) {
    for (var i = 0; i < values.length; i++) {
        var obj = values[i];
        if (!docValues[obj.formulaId]) {
            docValues[obj.formulaId] = [];
        }
        docValues[obj.formulaId][obj.colId] = obj.value;
    }
}
//public
function getAllValues(docValues) {
    //we cannot just return everything here, Because for now all formula's have a user-entered value cache.
    //Also Functions themSelves are bound to this object.
    //So we have to strip them out here.
    //should be part of the apiGet, to query all *_value functions. or *_validation etc.
    var values = [];
    for (var formulaId = 0; formulaId < docValues.length; formulaId++) {
        var cachevalues = docValues[formulaId];
        if (cachevalues) {
            var formula = findFormulaByIndex(formulaId);
            var formulaName = formula === undefined ? formulaId : formula.name;
            for (var i = 0; i < cachevalues.length; i++) {
                if (cachevalues[i] !== undefined) {
                    values.push({
                        varName: formulaName,
                        colId: i,
                        value: cachevalues[i],
                        formulaId: formulaId
                    });
                }
            }
        }
    }
    return values;
}

function findParser(parserName) {
    return parsers[parserName];
}

function addParser(parser) {
    parsers[parser.name] = parser;
}
//looks a lot like JSWorkBook.doImport, only does not support the ABN way
//this method only recieves GenericModels so we dont have to check Type
function switchModel(solution, docValues) {
    UIModel.bulkInsert(solution);
    bulkInsertFormula(solution.formulas);
    FunctionMap.init(bootstrap.parseAsFormula, solution.formulas, false);
    updateValueMap(docValues);
}
function getParsers() {
    var result = [];
    for (var key in parsers) {
        result.push(parsers[key]);
    }
    return result;
}
function mergeFormulas(formulas) {
    //so for all refs in the formula, we will switch the formulaIndex
    var changed = [];
    formulas.forEach(function (formula) {
        //not sure where to put this logic
        //get local formula
        //var id = formula.id === undefined ? formula.index : formula.id;
        var localFormula = findFormulaByIndex(formula.index);
        if (localFormula !== undefined && localFormula !== null) {
            changed.push(localFormula);
            //of course this should not live here, its just a bug fix.
            if (localFormula.index !== formula.id) {
                //move formula
                moveFormula(localFormula, formula);
            }
        }
    });
    //rebuild the formulas
    FunctionMap.init(bootstrap.parseAsFormula, changed, true);
}
function moveFormula(old, newFormula) {
    if (old.index !== newFormula.id) {
        formulas[newFormula.id] = formulas[old.index];
        formulas[newFormula.id].id = newFormula.id;
        delete formulas[newFormula.id].index;
        //we can make the ID final.
        delete formulas[old.index];
    }
    FunctionMap.moveFormula(old, newFormula);
    //update references
    for (var ref in old.refs) {
        var uiModel = UIModel.fetch(ref);
        uiModel.ref = newFormula.id;
        uiModel.formulaId = newFormula.id;
    }
}
var propertyDefaults = {
    'visible': true,
    'value': 1e-10,
    'required': false,
    'locked': false,
    'choices': undefined,
    'valid': true,
    'validation': false
}

function statelessGetValue(context, row, col, x) {
    var uielem = getUI(row, col);
    var localFormula = getFormulaByUI(uielem);
    var returnValue;
    if (localFormula === undefined) {
        var colType = col || 'value';
        if (col === 'value') {
            returnValue = propertyDefaults[colType];
            //throw Error('Cant return default value for value, this is invalid');
        }
        else {
            returnValue = propertyDefaults[colType];
        }
    }
    else {
        returnValue = FunctionMap.apiGet(localFormula, x || contextState, 0, 0, context.values);
    }
    return returnValue;
}
function getValue(row, col, x) {
    return statelessGetValue({values: docValues}, row, col, x);
}
function statelessSetValue(context, row, value, col, x) {
    var xas = x || contextState;
    var localFormula = getFormula(row, col || 'value');
    logger.info('Set value row:[%s] x:[%s] value:[%s]', row, xas.hash, value);
    try {
        updateValueMap(context.values);
        FunctionMap.apiSet(localFormula, xas, 0, 0, value, context.values);
    } catch (ee) {
        logger.error('error', ee)
    }
}
function setValue(row, value, col, x) {
    statelessSetValue({
        values: docValues
    }, row, value, col, x);
}
function generateDependencyMatrix(exists) {
    var data = {
        packageNames: [],
        matrix: [],
        highest: {}
        /*matrix: [[0, 1, 1], // Main depends on A and B
         [0, 0, 1], // A depends on B
         [0, 0, 0]] // B doesn't depend on A or Main*/
    };
    var formulas = getFormulas();
    var packages = new Set()
    formulas.forEach(function (f) {
        var fname = f.name.replace(/^[^_]+_([\w]*)_\w+$/gmi, '$1')
        if (exists(f.name)) {
            var packageDeps = [];
            // console.info(formulaName)
            data.highest[fname] = data.highest[fname] || 0;
            if (!packages.has(fname)) {
                packages.add(fname);
                data.packageNames.push(fname);
            }
            formulas.forEach(function (inner) {
                var innerName = inner.name.replace(/^[^_]+_([\w]*)_\w+$/gmi, '$1');
                if (exists(inner.name)) {
                    var linked = 0;
                    for (var key in inner.deps) {
                        var keyName = key.replace(/^[^_]+_([\w]*)_\w+$/gmi, '$1')
                        //console.info(inner.name + ' deps: ' + key)
                        if (keyName === fname && keyName !== innerName) {
                            linked++;
                        }
                    }
                    /*        for (var key in inner.refs)
                     {
                     //   console.info(inner.name + ' refs: ' + key)
                     if (key === f.name && key !== inner.name)
                     {
                     linked++;
                     }
                     }*/
                    packageDeps.push(linked === 0 ? 0 : 1);
                    data.highest[fname] += linked;
                }
            })
            data.matrix.push(packageDeps)
        }
    });
    //filter ones without
    return data;
}
function generateDependencyMatrix2(exists) {
    var data = {
        packageNames: [],
        matrix: [],
        highest: {}
        /*matrix: [[0, 1, 1], // Main depends on A and B
         [0, 0, 1], // A depends on B
         [0, 0, 0]] // B doesn't depend on A or Main*/
    };
    var formulas = getFormulas();
    formulas.forEach(function (f) {
        if (exists(f.name)) {
            var packageDeps = [];
            // console.info(formulaName)
            data.highest[f.name] = data.highest[f.name] || 0;
            data.packageNames.push(f.name);
            formulas.forEach(function (inner) {

                if (exists(inner.name)) {
                    var linked = 0;
                    for (var key in inner.deps) {
                        //console.info(inner.name + ' deps: ' + key)
                        if (key === f.name && key !== inner.name) {
                            linked++;
                        }
                    }
                    /*        for (var key in inner.refs)
                     {
                     //   console.info(inner.name + ' refs: ' + key)
                     if (key === f.name && key !== inner.name)
                     {
                     linked++;
                     }
                     }*/
                    packageDeps.push(linked === 0 ? 0 : 1);
                    data.highest[f.name] += linked;
                }
            })
            data.matrix.push(packageDeps)
        }
    });
    //filter ones without
    return data;
}
function addConverter(converter) {
    var nodeConverter = converter;
    converter.forDisplayType.forEach(function (displayType) {
        converters[displayType] = nodeConverter;
    });
}
function keyLength(ob) {
    return Object.keys(ob).length;
}
var GenericModelFile = {
    switchModel: switchModel,

    //ParserSerice?
    addParser: addParser,
    getParsers: getParsers,
    findParser: findParser,

    //ValueService?
    getAllValues: getAllValues,
    getValue: getValue,
    statelessSetValue: statelessSetValue,
    statelessGetValue: statelessGetValue,
    setValue: setValue,
    updateValues: updateValues,
    docValues: docValues,

    //FormulaService?
    findFormulaByIndex: findFormulaByIndex,
    bulkInsertFormula: bulkInsertFormula,
    findFormula: findFormula,
    mergeFormulas: mergeFormulas,
    getFormula: getFormula,
    getFormulas: getFormulas,
    gatherFormulas: gatherFormulas,
    createFormula: function createFormula(formulaAsString, rowId, colId) {
        var col = colId || 'value';
        //create a formula for the element
        var ast = esprima.parse(formulaAsString);
        var newFormulaId = addLink(rowId, col, col === 'value' ? false : true, ast.body[0].expression);
        //integrate formula (parse it)
        FunctionMap.init(bootstrap.parseAsFormula, [findFormulaByIndex(newFormulaId)], true);
        updateValueMap(docValues);
    },
    jsMath: jsMath,//strange part
    variableSchema: {

        title: ' ',
        "properties": {}
    },
    //SolutionService
    produceSolution: produceSolution,
    generateDependencyMatrix: generateDependencyMatrix,
    //UiModelService?
    updateValueMap: updateValueMap,
    updateModelMetaData: function (solutionMetaData) {
        var propertiesArr = Object.keys(solutionMetaData);
        propertiesArr.sort(function (a, b) {
            return (
                keyLength(solutionMetaData[a]) < keyLength(solutionMetaData[b])
            ) ? 1 : (
                    (
                        keyLength(solutionMetaData[b]) < keyLength(solutionMetaData[a])
                    ) ? -1 : 0
                );
        });
        for (var pi = 0; pi < propertiesArr.length; pi++) {
            var propertyName = propertiesArr[pi];

            var schemaItem = {
                "title": propertyName
            }
            var propertyKeys = Object.keys(solutionMetaData[propertyName]);
            var type = solutionMetaData[propertyName];

            propertyKeys.sort(function (a, b) {
                return (type[a] > type[b]) ? 1 : ((type[b] > type[a]) ? -1 : 0);
            });
            schemaItem.default = propertyKeys[0];
            if (propertyName === 'choices') {
                //expect a Array of Arrays
                var choices = []
                var relMap = {
                    name: {},
                    value: {}
                };
                for (var i = 0; i < propertyKeys.length; i++) {
                    var obj = propertyKeys[i];
                    /* console.info(propertyKeys[i])*/
                    var items = JSON.parse(propertyKeys[i]);
                    for (var j = 0; j < items.length; j++) {
                        var curr = items[j];
                        choices.push(curr)
                        var currName = "" + curr.name;
                        relMap.name[currName] = ((relMap.name[currName] || 1) + 1);
                        relMap.value[curr.value] = ((relMap.value[curr.value] || 1) + 1);
                    }
                }
                schemaItem.type = "array";
                schemaItem.uniqueItems = true;
                schemaItem.format = "table";
                schemaItem.items = {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string",
                            "enum": Object.keys(relMap.name)
                        },
                        "value": {
                            "type": "string",
                            "enum": Object.keys(relMap.value)
                        }
                    }
                };
            }
            //skip all known formula types for now
            else if (GenericModelFile.properties[propertyName] === undefined) {
                schemaItem.type = "string";
                /*  if (propertyKeys.length <= 2)
                 {
                 1
                 }
                 if (propertyKeys.length > 2)*/
                {
                    schemaItem.enum = propertyKeys
                }
            }
            if (schemaItem.type) {
                GenericModelFile.variableSchema.properties[propertyName] = schemaItem;
            }
        }
    }, /*console.info(solutionMetaData);*/
    addLink: addLink,
    //encapsulate isLocked flag
    addSimpleLink: function (solution, rowId, colId, body, displayAs) {
        //by default only value properties can be user entered
        //in simple (LOCKED = (colId !== 'value'))
        var formulaId = addLink(rowId, colId, colId === 'value' ? false : true, body);
        //most ugly part here, the Parsers themselves add Links, which should be done just before parsing Formula's
        //afterwards the Formula's are parsed,
        return solution.createNode(rowId, colId, formulaId, displayAs || 'PropertyType');
    },
    findLink: function (row, col) {
        return UIModel.getUI(row, col);
    },

    //supported properties
    properties: {
        value: 0,
        visible: 1,
        required: 2,
        locked: 3,
        entered: 4,
        validation: 5,
        title: 6,
        validateInput: 7,
        choices: 8,
        _testg: 9,
        _testh: 10
    },
    settings: {
        toggleOutput: function () {
            GenericModelFile.oppositeoutput = GenericModelFile.settings.defaultoutput;
            GenericModelFile.settings.defaultoutput = GenericModelFile.settings.defaultoutput === 'fin' ? 'ffl' : 'fin';
        },
        defaultoutput: 'ffl',
        oppositeoutput: 'fin'
    },
    setXasStart: function (year) {
        contextState = detailColumns[0][0];
    },
    present: {},//presenationModel
    x: contextState,
    addConverter: addConverter,
    converters: converters,
    updateAll: {validation: true, title: true, value: true, required: true, visible: true, locked: true, choices: true}
};
//for now we accept NON-Dynamic FesJSMath, nor Dynamic variable properties.
//properties once bound ONCE, math Functions also ONCE
bootstrap.init({
    state: GenericModelFile,
    uicontains: UIModel.contains
});
module.exports = GenericModelFile;