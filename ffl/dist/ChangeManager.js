'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ChangeManager = undefined;

var _FFLToRegister = require('./FFLToRegister');

var _RegisterToFFL = require('./RegisterToFFL');

function ChangeManager(register) {
	this.register = register;
	this.currentVariable = [];
	this.currentVariableName = null;
	this.error = null;
	this.warnings = [];
	this.changed = true;
	this.lines = [];
}

ChangeManager.prototype.setModelChanged = function () {
	this.changed = true;
};

ChangeManager.prototype.extractName = function (line) {
	return line.replace(/(?:variable |tuple |function )?\s*(?:\+?-?=?)+(\w+).*/i, '$1');
};
ChangeManager.prototype.isVariableLine = function (line) {
	return (/^(?:variable |tuple |function )?\s*(?:\+?-?=?)+(\w+)\s*(?:Refers to \w+|Implies \w+)?\s*\n\s*{/igm.test(line)
	);
};
ChangeManager.prototype.syntaxCheck = function (ffl) {
	try {
		this.register.clean();
		var formatter = new _FFLToRegister.FFLToRegister(this.register, ffl);
		formatter.parseProperties();
		this.error = null;
	} catch (err) {
		this.error = err.toString();
		console.error('Error while checking syntax', err);
	}
};

ChangeManager.prototype.validCurrentLine = function (line, next_line) {
	var trimmed = String(line).replace(/\s+/gmi, ' ').trim();
	var trimmedNextLine = String(next_line).replace(/\s+/gmi, ' ').trim();
	return trimmed.endsWith(';') || this.isVariableLine(trimmed + '\n' + trimmedNextLine);
};

ChangeManager.prototype.updateCursor = function (ffl, cursor) {
	this.warnings.length = 0;

	if (this.changed) {
		this.syntaxCheck(ffl, cursor);
		this.lines = ffl.split('\n');
		this.namedIndex = this.register.getIndex('name');
		var idIndex = this.register.getIndex('i');
		var names = this.register.getAll('name');
		var doubles = {};
		for (var i = 0; i < names.length; i++) {
			if (doubles[names[i]]) {
				this.warnings.push({
					pos: doubles[names[i]],
					message: 'duplicate variablename' + names[i]
				});
				doubles[names[i]].push(i);
			}
			doubles[names[i]] = [i];
		}
	}

	var currentVariable = void 0;
	for (var _i = cursor.row; _i > 0; _i--) {
		if ((this.lines[_i] || '').match(/(variable |tuple |root|model )/)) {
			currentVariable = this.extractName(this.lines[_i].trim());
			break;
		}
	}
	var changedCurrentVariable = this.currentVariableName !== currentVariable;
	if ((this.changed || changedCurrentVariable) && currentVariable && this.namedIndex[currentVariable]) {
		this.currentVariableName = currentVariable;
		this.currentVariable = this.register.createInformationObject(this.currentVariableName, new _RegisterToFFL.RegisterToFFL(this.register).hiddenProperties);
	}
	this.changed = false;
};
exports.ChangeManager = ChangeManager;