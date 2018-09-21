'use strict';

var Register = require('./Register').Register;
var AuditTrail = function AuditTrail() {
    var register = new Register(['category', 'level', 'name', 'property', 'yax', 'xas', 'value', 'message', 'formula', 'refId', 'parsed']);
    register.auditcols = [10, 10, 30, 10, 10, 10, 20, 20, 100, 10, 860];
    return register;
};
Register.prototype.doAudit = function () {
    this.clean();
};
Register.prototype.getErrors = function () {
    return this.distinctArr(this.find('level', 'ERROR', this.mark), ['name', 'property']);
};
Register.prototype.printErrors = function () {
    var errors = this.getErrors();
    if (errors.length > 0) console.info(this.printArr(errors, this.auditcols).join('\n'));
};
Register.prototype.printAuditTrailDelta = function () {
    var result = this.print(this.auditcols, this.mark).join('\n');
    this.markNow();
    return result;
};
Register.prototype.printAuditTrail = function () {
    return this.print(this.auditcols).join('\n');
};
module.exports = AuditTrail;