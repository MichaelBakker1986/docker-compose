'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
//app scope context

var ApplicationContext = {
	parsers: [], //holds all injected parsers
	ma: [], //holds all loaded model-functions.
	audittrail: {}
	/*	audittrail: new AuditTrail()  //trailer*/
};
var propertyDefaults = {
	'visible': true,
	'value': 1e-10,
	'required': false,
	'locked': false,
	'choices': undefined,
	'valid': true,
	'validation': false

	//request scope context
};function Context(opts) {
	//reference to the ApplicationContext context
	this.applicationContext = ApplicationContext;
	this._values = {};
	this.ma = ApplicationContext.ma;
	this.audittrail = ApplicationContext.audittrail;
	this.audit = [];
	this.calc_count = 0;
	this.columnSize = 6;
	this.columns = ['title', 'value', 'visible', 'entered', 'locked', 'required', 'hint', 'choices', 'original', 'valid'];
	this.saveToken = undefined; //commit hash
	Object.assign(this, opts);
	this._values.absolute_start_year = this.absolute_start_year || new Date().getFullYear();
}

Context.prototype.propertyDefaults = propertyDefaults;
Context.prototype.getValues = function () {
	return this._values;
};
Context.prototype.clear = function () {
	for (var key in this.values) {
		if (!isNaN(key)) this.values[key] = {};
	}this.audit.length = 0;
};
Context.prototype.hasChanges = function () {
	return this.audit.length > 0;
};
exports.Context = Context;