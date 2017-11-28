var SolutionFacade = require('../../src/SolutionFacade.js')
var FormulaService = require('../../src/FormulaService.js')
var PropertiesAssembler = require('../../src/PropertiesAssembler.js')

function FormulaInfo(data, schema, modelName) {
    this.formulas = [];
    var self = this;
    var data = [];
    this.data = data;
    this.nodes = [];
    var forms = {};
    FormulaService.visitFormulas(function(formula) {
        formula.id = formula.id || formula.index;
        forms[formula.name] = formula;
        self.addFormula(formula)
    });
    var names = {};
    var modelNamePrefix = modelName + '_';
    this.formulas.forEach(function(formula) {
        var name = correctFileName(formula.name);
        if (names[name] === undefined) {
            names[name] = true;
            var title = forms[modelNamePrefix + name + '_title'] || {original: null};
            var visible = forms[modelNamePrefix + name + '_visible'] || {original: false};
            var value = forms[modelNamePrefix + name + '_value'] || {original: ''};
            var formula_trend = forms[modelNamePrefix + name + '_trend'] || {original: ''};
            var formula_notrend = forms[modelNamePrefix + name + '_notrend'] || {original: ''};
            var locked = forms[modelNamePrefix + name + '_locked'] || {original: false};
            var choices = forms[modelNamePrefix + name + '_choices'] || {original: null};
            data.push([name, title.original, value.original, formula_trend.original, formula_notrend.original, visible.original, locked.original, choices.original])
        }
    })
    var types = ['name', 'title', 'value', 'notrend', 'trend', 'visible', 'locked', 'choices'];
    //this.formulas = undefined;
    this.meta = {
        view: {
            columns: []
        }
    }
    var counter = 0;
    types.forEach(function(type) {
        self.meta.view.columns.push({
            "width": ['locked', 'visible', 'entered'].indexOf(type) == -1 ? 50 : undefined,
            "name": type,
            "dataTypeName": "text",
            "fieldName": type,
            "position": counter++,
            "renderTypeName": "text",
        })
    })
}

FormulaInfo.prototype.setSchema = function(schema) {
    this.schema = schema;
}
FormulaInfo.prototype.addFormula = function(formula) {
    this.formulas.push(formula);
}

function correctFileName(name) {
    return name.replace(/^[^_]+_([\w]*)_\w+$/gmi, '$1');
}

function JavaScriptParser() {
}

JavaScriptParser.prototype.name = 'js'
JavaScriptParser.prototype.status = 'green';
JavaScriptParser.prototype.headername = '.js';
JavaScriptParser.prototype.parseData = function(data, workbook) {
    throw Error();
}
var unwantedKeys = {
    delegate: true,
    ast: true,
    body: true
}
JavaScriptParser.prototype.deParse = function(rowId, workbook) {
    var modelName = workbook.getSolutionName();
    var formulaInfo = {};
    let info = new FormulaInfo(formulaInfo, {}, modelName);
    info.name = modelName;
    PropertiesAssembler.findAllInSolution(modelName, function(property) {
        info.nodes.push(property)
    })
    return info;
    /*return JSON.stringify(info, function(key, value) {
        return unwantedKeys[key] ? undefined : value;
    }, 2);*/
}
SolutionFacade.addParser(JavaScriptParser.prototype);