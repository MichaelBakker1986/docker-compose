'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AuditTrail = undefined;

var _Register = require('./Register');

var AuditTrail = function AuditTrail() {
	var register = new _Register.Register(['category', 'level', 'name', 'property', 'yax', 'xas', 'value', 'message', 'formula', 'refId', 'parsed']);
	register.auditcols = [10, 10, 30, 10, 10, 10, 20, 20, 100, 10, 860];
	return register;
}; /**
    * Audit-trail
    *  - key - value store
    *  - easy lookup
    *
    * extends Register.js and add functionality
    * @type {Register}
    */

_Register.Register.prototype.doAudit = function () {
	this.clean();
};
_Register.Register.prototype.getErrors = function () {
	return this.distinctArr(this.find('level', 'ERROR', this.mark), ['name', 'property']);
};
_Register.Register.prototype.printErrors = function () {
	var errors = this.getErrors();
	if (errors.length > 0) console.info(this.printArr(errors, this.auditcols).join('\n'));
};
_Register.Register.prototype.printAuditTrailDelta = function () {
	var result = this.print(this.auditcols, this.mark).join('\n');
	this.markNow();
	return result;
};
_Register.Register.prototype.printAuditTrail = function () {
	return this.print(this.auditcols).join('\n');
};
exports.AuditTrail = AuditTrail;