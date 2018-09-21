'use strict';

var _lmeCore = require('lme-core');

var _log = require('log6');

function DebugManager(register, audit_trail) {
	this.stack = [];
	this.audittrail = audit_trail;
	this.register = register;
	this.steps = [];
	this.active = false;
	this.stepIndex = 0;
	this.vars = {};
}

DebugManager.prototype.splitName = function (name) {
	var split = name.split('_');
	return { row: split.slice(1, -1).join('_'), col: split[split.length - 1] };
};

DebugManager.prototype.addStep = function (name) {
	this.active = true;
	this.steps.push(this.splitName(name));
};
DebugManager.prototype.initVariables = function (fflModel) {
	var lines = fflModel.split('\n');
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];
		var trim = line.trim();
		if (trim.includes('variable')) {
			var _name = trim.substring(9).trim().split(' ')[0];
			this.vars[_name] = i;
		}
	}
};

DebugManager.prototype.fixForReferenceError = function (variableName, wb, error, e, formula_id) {
	return function () {
		try {
			(0, _log.info)(variableName + ' : Fix for [' + variableName + '] in solution: ' + wb.getSolutionName() + ' : ' + error);

			wb.createFormula('1', variableName, 'value', false, 'document');

			_lmeCore.SolutionFacade.initFormulaBootstrap([formula_id], true, wb.context.ma, wb.context.audittrail);
			var formula = _lmeCore.SolutionFacade.fetchFormulaByIndex(formula_id);

			for (var i = 0; i < formula.formulaDependencys.length; i++) {
				var dependency = formula.formulaDependencys[i];
				if (_log.DEBUG) (0, _log.info)(dependency);
			}
		} catch (err) {
			error('Fatal error in variable [' + variableName + ']', err);
		}
	};
};
DebugManager.prototype.validateImportedSolution = function (modelName) {
	var start = this.audittrail.i.length;
	var names = this.register.getNames();
	var context = new _lmeCore.Context();
	var wb = new _lmeCore.WorkBook(context, null, null, { modelName: modelName });
	wb.updateValues();
	var validateResponse = {
		succes: [],
		error: []
	};
	for (var _name2 in names) {
		try {
			for (var _property in context.propertyDefaults) {
				wb.get(_name2, _property, 0, wb.resolveY(0));
				validateResponse.succes.push(_name2);
			}
		} catch (err) {
			(0, _log.error)('Error while trying:' + _name2 + '.' + property + ' in model ' + modelName, err);
		}
	}
	var errors = this.audittrail.distinctArr(this.audittrail.find('level', 'ERROR', start), ['name', 'property']);
	if (errors.length > 0) {
		(0, _log.info)('Trying to fix : \n' + this.audittrail.printArr(errors, [6, 30, 10, 10, 10, 10, 40, 140, 8]).join('\n'));
	}
	for (var i = 0; i < errors.length; i++) {
		var _error = errors[i];
		var message = _error[this.audittrail.schemaIndexes.message];
		var error_type = _error[this.audittrail.schemaIndexes.message].split(':')[0];
		var formula_id = _error[this.audittrail.schemaIndexes.refId];
		var fix = {};
		if (error_type === 'ReferenceError') {
			var referenceName = message.split(' ')[1];
			fix = {
				canFix: true,
				variableName: referenceName,
				fixMessage: 'Add',
				fix: this.fixForReferenceError(referenceName, wb, _error, _error, formula_id)
			};
		}
		fix.formulaName = name;
		fix.reason = message;
		validateResponse.error.push(fix);
	}

	validateResponse.valid = validateResponse.error.length === 0;
	return validateResponse;
};

DebugManager.prototype.monteCarlo = function (modelName) {
	var attempt = 0;
	var debug_manager = this;
	var feedback = this.validateImportedSolution(modelName);

	while (!feedback.valid && attempt < 4) {
		feedback.error.forEach(function (item) {
			if (item.canFix) item.fix();
		});
		feedback = debug_manager.validateImportedSolution(modelName);
		attempt++;
	}
	return feedback;
};
DebugManager.prototype.nextStep = function () {
	this.stepIndex++;
	if (this.steps.length <= this.stepIndex) {
		this.active = false;
	}
};
exports.DebugManager = DebugManager;