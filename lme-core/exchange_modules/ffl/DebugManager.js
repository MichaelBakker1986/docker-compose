/**
 * features breakpoints from FFL file, let them be replayed
 */

const SolutionFacade = require('../../src/SolutionFacade');
const PropertiesAssembler = require('../../src/PropertiesAssembler');
const ValueFacade = require('../../src/ValueFacade');
const WorkBook = require('../../src/JSWorkBook');
const Context = require('../../src/Context');
const log = require('log6')

function DebugManager(register, audittrail) {
    this.stack = []
    this.audittrail = audittrail
    this.register = register
    this.steps = []
    this.active = false
    this.stepIndex = 0
    this.vars = {}
}

function splitName(name) {
    const split = name.split('_');
    return { row: split.slice(1, -1).join('_'), col: split[split.length - 1] }
}

DebugManager.prototype.addStep = function(name) {
    this.active = true;
    const varcol = splitName(name);
    this.steps.push(varcol)
}
DebugManager.prototype.initVariables = function(fflModel) {
    const lines = fflModel.split('\n')
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        const trim = line.trim();
        if (trim.indexOf('variable') >= 0) {
            var name = trim.substring(9).trim().split(" ")[0];
            this.vars[name] = i
        }
    }
}

DebugManager.prototype.fixForReferenceError = function(variableName, wb, error, e, formula_id) {
    const self = this;
    return function() {
        try {
            log.info(variableName + " : " + 'Fix for [' + variableName + '] in solution: ' + wb.getSolutionName() + " : " + error)
            //So we fix the ReferenceError
            wb.createFormula("1", variableName, 'value', false, 'document');
            //re-init the formula
            SolutionFacade.initFormulaBootstrap([formula_id], true, wb.context.ma, wb.context.audittrail);
            const formula = SolutionFacade.fetchFormulaByIndex(formula_id)
            //All dependencies should be updated
            for (var i = 0; i < formula.formulaDependencys.length; i++) {
                var dependency = formula.formulaDependencys[i];
                if (log.DEBUG) log.info(dependency)
            }
        } catch (err) {
            log.error('Fatal error in variable [' + variableName + ']', err);
        }
    }
}
DebugManager.prototype.validateImportedSolution = function(modelName) {
    //var feedback = model.lme.fixProblemsInImportedSolution();
    //  const audittrail = model.lme.context.audittrail;
    const start = this.audittrail.i.length
    const names = this.register.getNames()
    const context = new Context();
    const wb = new WorkBook(context, null, null, { modelName: modelName })
    wb.updateValues()
    const validateResponse = {
        succes: [],
        error : []
    };

    for (var name in names) {
        try {
            //iterate all formula-sets to test 100% Trend,NoTrend
            for (var property in context.propertyDefaults) {
                wb.get(name, property, 0, wb.resolveY(0))
                validateResponse.succes.push(name)
            }
        } catch (err) {
            log.error(err)
        }
    }
    const errors = this.audittrail.distinctArr(this.audittrail.find('level', 'ERROR', start), ['name', 'property'])
    if (errors.length > 0) {
        log.info('Trying to fix : \n' + this.audittrail.printArr(errors, [6, 30, 10, 10, 10, 10, 40, 140, 8]).join('\n'));
    }
    for (var i = 0; i < errors.length; i++) {
        const error = errors[i];
        const message = error[this.audittrail.schemaIndexes.message]
        const error_type = error[this.audittrail.schemaIndexes.message].split(':')[0]
        const formula_id = error[this.audittrail.schemaIndexes.refId]
        var fix = {}
        if (error_type === 'ReferenceError') {
            const referenceName = message.split(' ')[1];
            fix = {
                canFix      : true,
                variableName: referenceName,
                fixMessage  : 'Add',
                fix         : this.fixForReferenceError(referenceName, wb, error, error, formula_id)
            };
        }
        fix.formulaName = name;
        fix.reason = message;
        validateResponse.error.push(fix);
    }
    //console.info(this.audittrail.print([6, 30, 10, 10, 10, 10, 40, 140, 8]).join('\n'))
    //if (!feedback.valid) succes = false
    //console.info(this.audittrail.printArr(this.audittrail.find('level', 'ERROR'), [6, 30, 10, 10, 10, 10, 40, 140, 8]).join('\n'))
    // console.info(this.audittrail.find('LEVEL', 'ERROR'))
    validateResponse.valid = validateResponse.error.length === 0;
    return validateResponse;
}
/**
 * Try to do: Monte-Carlos simulation
 * https://nl.wikipedia.org/wiki/Monte-Carlosimulatie
 * if it is possible to fix missing functions
 * TRY fix infinite loops in the solution, breaking down chains.
 */
DebugManager.prototype.monteCarlo = function(modelName) {
    var attempt = 0;
    const debugmanager = this;
    var feedback = this.validateImportedSolution(modelName);
    //four time retry, so one formula, can have a max of 4 errors.
    while (!feedback.valid && attempt < 4) {
        feedback.error.forEach(function(item) {
            if (item.canFix) item.fix();
        });
        feedback = debugmanager.validateImportedSolution(modelName);
        attempt++;
    }
    return feedback;
}
DebugManager.prototype.nextStep = function() {
    this.stepIndex++;
    if (this.steps.length <= this.stepIndex) {
        this.active = false;
    }
}
DebugManager.prototype.getCurrentLine = function() {
    return this.vars[this.steps[this.stepIndex].row]
}
exports.DebugManager = DebugManager