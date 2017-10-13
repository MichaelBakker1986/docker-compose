var SolutionFacade = require('../../fesjs/SolutionFacade.js')
var FormulaService = require('../../fesjs/FormulaService.js')
var PropertiesAssembler = require('../../fesjs/PropertiesAssembler.js')
var FunctionMap = require('../../fesjs/FunctionMap.js')
var log = require('ff-log');

function FormulaInfo(data, schema) {
    this.formulas = [];
    this.data = [];
    this.nodes = [];
    var forms = {};
    FormulaService.visitFormulas((formula) => {
        formula.id = formula.id || formula.index;
        forms[formula.name] = formula;
        this.addFormula(formula)
    });
    var names = {};
    var modelName = 'V05_';
    this.formulas.forEach((formula) => {
        var name = correctFileName(formula.name);
        if (names[name] === undefined) {
            names[name] = true;
            var title = forms[modelName + name + '_title'] || {original: null};
            var visible = forms[modelName + name + '_visible'] || {original: false};
            var value = forms[modelName + name + '_value'] || {original: ''};
            var formula_trend = forms[modelName + name + '_trend'] || {original: ''};
            var formula_notrend = forms[modelName + name + '_notrend'] || {original: ''};
            var locked = forms[modelName + name + '_locked'] || {original: false};
            var choices = forms[modelName + name + '_choices'] || {original: null};
            this.data.push([name, title.original, value.original, formula_trend.original, formula_notrend.original, visible.original, locked.original, choices.original])
        }
    })
    var types = ['name', 'title', 'visible', 'value', 'notrend', 'trend', 'locked', 'choices'];
    //this.formulas = undefined;
    this.meta = {
        view: {
            columns: []
        }
    }
    var counter = 0;
    types.forEach((type) => {
        this.meta.view.columns.push({
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

function LMEParser() {
}

LMEParser.prototype.name = 'lme'
LMEParser.prototype.status = 'green';
LMEParser.prototype.headername = '.finance lme';
LMEParser.prototype.parseData = function(data, workbook) {
    let solution = SolutionFacade.createSolution(data.name);

    solution.nodes = data.nodes;
    PropertiesAssembler.bulkInsert(solution);
    FormulaService.bulkInsertFormula(data.formulas)
    data.formulas.forEach(function(formula) {
        FunctionMap.initializeFormula(formula);
    })
    log.info('Done import ' + data.name)
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
    let info = new FormulaInfo(formulaInfo, {});
    info.name = modelName;
    PropertiesAssembler.findAllInSolution(modelName, function(property) {
        info.nodes.push(property)
    })
    return JSON.stringify(info, function(key, value) {
        return unwantedKeys[key] ? undefined : value;
    }, 2);
}
SolutionFacade.addParser(LMEParser.prototype);