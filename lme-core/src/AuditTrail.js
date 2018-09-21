/**
 * Audit-trail
 *  - key - value store
 *  - easy lookup
 *
 * extends Register.js and add functionality
 * @type {Register}
 */
import { Register } from './Register'
import { VALUE }    from './Constants'

const AuditTrail = function() {
	const schemaDefaults = [['category', 10], ['level', 10], ['name', 30], ['property', 10], ['yax', 10], ['xas', 10], [VALUE, 20], ['message', 20], ['formula', 100], ['refId', 10], ['parsed', 860], ['data-type', 100]]
	const register = new Register(schemaDefaults.map(([schemaDefault_name]) => schemaDefault_name))
	register.auditcols = schemaDefaults.map(([schemaDefault_name, schemaDefault_column_size]) => schemaDefault_column_size)
	return register
}
Register.prototype.doAudit = function() { this.clean()}

Register.prototype.getErrors = function() {
	return this.distinctArr(this.find('level', 'ERROR', this.mark), ['name', 'property'])
}
Register.prototype.printErrors = function() {
	const errors = this.getErrors()
	if (errors.length > 0) console.info(this.printArr(errors, this.auditcols).join('\n'))
}
Register.prototype.printAuditTrailDelta = function() {
	const result = this.print(this.auditcols, this.mark).join('\n')
	this.markNow()
	return result
}
Register.prototype.printAuditTrail = function() {
	return this.print(this.auditcols).join('\n')
}
export { AuditTrail }