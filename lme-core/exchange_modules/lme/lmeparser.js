const SolutionFacade = require('../../src/SolutionFacade')
const FormulaService = require('../../src/FormulaService')
const PropertiesAssembler = require('../../src/PropertiesAssembler')
const FunctionMap = require('../../src/FunctionMap')
const log = require('log6');

function FormulaInfo(data, schema, modelName) {
    this.formulas = [];
    this.variables = []
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
            var hint = forms[modelNamePrefix + name + '_hint'] || {original: ''};
            var visible = forms[modelNamePrefix + name + '_visible'] || {original: false};
            var valid = forms[modelNamePrefix + name + '_valid'] || {original: false};
            var value = forms[modelNamePrefix + name + '_value'] || {original: ''};
            var formula_trend = forms[modelNamePrefix + name + '_trend'] || {original: ''};
            var formula_notrend = forms[modelNamePrefix + name + '_notrend'] || {original: ''};
            var locked = forms[modelNamePrefix + name + '_locked'] || {original: false};
            var choices = forms[modelNamePrefix + name + '_choices'] || {original: null};
            data.push([name, title.original, value.original, formula_trend.original, formula_notrend.original, visible.original, locked.original, choices.original, hint.original, valid.original])
        }
    })
    var types = ['name', 'title', 'value', 'notrend', 'trend', 'visible', 'locked', 'choices', 'hint', 'valid'];
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
    formula.fflname = variableName(formula.name)
    this.formulas.push(formula);
}

function correctFileName(name) {
    return name.replace(/^[^_]+_([\w]*)_\w+$/gmi, '$1');
}

function variableName(name) {
    return name.replace(/^[^_]+_([\w]*_\w+)$/gmi, '$1');
}

function LMEParser() {
}

LMEParser.prototype.name = 'lme'
LMEParser.prototype.status = 'green';
LMEParser.prototype.headername = '.finance lme';
LMEParser.prototype.parseData = function(data, workbook) {
    const solution = SolutionFacade.createSolution(data.name);
    solution.nodes = data.nodes;
    if (data.variables) FormulaService.initVariables(data.variables)
    PropertiesAssembler.bulkInsert(solution);
    FormulaService.bulkInsertFormula(data.formulas)
    data.formulas.forEach(function(formula) {
        FunctionMap.initializeFormula(formula);
    })
    if (log.DEBUG) log.info('Done import ' + data.name)
    return solution;
}
var unwantedKeys = {
    delegate: true,
    ast: true,
    body: true
}
LMEParser.prototype.deParse = function(rowId, workbook) {
    var modelName = workbook.getSolutionName();
    var formulaInfo = {};
    let info = new FormulaInfo(formulaInfo, {}, modelName);
    info.name = modelName;
    PropertiesAssembler.findAllInSolution(modelName, function(property) {
        info.nodes.push(property)
    })
    FormulaService.getVariables(function(variable) {
        info.variables.push(variable)
    });
    return JSON.stringify(info, function(key, value) {
        return unwantedKeys[key] ? undefined : value;
    }, 0);
}
SolutionFacade.addParser(LMEParser.prototype);
exports.LMEParser = LMEParser.prototype