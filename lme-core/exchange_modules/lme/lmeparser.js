const SolutionFacade = require('../../src/SolutionFacade')
const FormulaService = require('../../src/FormulaService')
const PropertiesAssembler = require('../../src/PropertiesAssembler')
const FunctionMap = require('../../src/FunctionMap')
const Solution = require('../../src/Solution')

const log = require('log6');

function FormulaInfo(dataArg, schema, modelName) {
    this.name = modelName
    this.formulas = [];
    this.variables = []
    const self = this;
    this.data = dataArg;
    const data = [];
    this.nodes = [];
    const forms = {};
    FormulaService.visitFormulas(function(formula) {
        formula.id = formula.id || formula.index;
        forms[formula.name] = formula;
        self.addFormula(formula)
    });
    const names = {};

    const modelNamePrefix = modelName + '_';
    for (var i = 0; i < this.formulas.length; i++) {
        var formula = this.formulas[i];
        const name = correctFileName(formula.name);
        if (names[name] === undefined) {
            names[name] = true;
            const title = forms[modelNamePrefix + name + '_title'] || { original: null };
            const hint = forms[modelNamePrefix + name + '_hint'] || { original: '' };
            const visible = forms[modelNamePrefix + name + '_visible'] || { original: false };
            const valid = forms[modelNamePrefix + name + '_valid'] || { original: false };
            const value = forms[modelNamePrefix + name + '_value'] || { original: '' };
            const formula_trend = forms[modelNamePrefix + name + '_trend'] || { original: '' };
            const formula_notrend = forms[modelNamePrefix + name + '_notrend'] || { original: '' };
            const locked = forms[modelNamePrefix + name + '_locked'] || { original: false };
            const choices = forms[modelNamePrefix + name + '_choices'] || { original: null };
            //looks a lot like the Register.js functionality
            data.push([name, title.original, value.original, formula_trend.original, formula_notrend.original, visible.original, locked.original, choices.original, hint.original, valid.original])
        }
    }
    const types = ['name', 'title', 'value', 'notrend', 'trend', 'visible', 'locked', 'choices', 'hint', 'valid'];
    //this.formulas = undefined;
    this.meta = {
        view: {
            columns: []
        }
    }
    var counter = 0;
    for (var i = 0; i < types.length; i++) {
        var type = types[i];
        self.meta.view.columns.push({
            "width"         : ['locked', 'visible', 'entered'].indexOf(type) == -1 ? 50 : undefined,
            "name"          : type,
            "dataTypeName"  : "text",
            "fieldName"     : type,
            "position"      : counter++,
            "renderTypeName": "text",
        })
    }
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
LMEParser.prototype.headername = '.finance lme';
LMEParser.prototype.parseData = function(data, workbook) {
    const solution = SolutionFacade.createSolution(data.name);
    solution.nodes = data.nodes;
    if (data.variables) FormulaService.initVariables(data.variables)
    PropertiesAssembler.bulkInsert(solution);
    //Probably for formula-information
    FormulaService.bulkInsertFormula(data.formulas)
    for (var i = 0; i < data.formulas.length; i++) FunctionMap.initializeFormula(data.formulas[i], workbook.context.ma, workbook.context.audittrail);
    if (log.DEBUG) log.info('Done import ' + data.name)
    return solution;
}
const unwantedKeys = {
    delegate: true,
    ast     : true,
    body    : true
}
LMEParser.prototype.deParse = function(rowId, workbook) {
    const modelName = workbook.getSolutionName();
    const info = new FormulaInfo({}, {}, modelName);
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