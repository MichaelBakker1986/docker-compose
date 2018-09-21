/**
 * This is how we will inject the EXCEL sheets and custom methods.
 * The function will be
 *  - impossible to set, so LOCKED=true
 *  - Able to re-use
 *  - Will have custom-made parameters.
 */
import {
	AuditTrail,
	Context,
	DOCUMENT,
	FUNCTION_TYPE,
	NUMBER,
	OBJECT_TYPE,
	VALUE,
	WorkBook
}                from '../../lme-core/index'
import { equal } from 'assert'

global.IDE_DEBUGMODUS = true
const wb = new WorkBook(new Context({ audittrail: new AuditTrail }), null, null, { modelName: 'SELFTEST' })

wb.createFormula('three+ (one+two==2?this.DC:this.ABC)', 'MatrixSeetest123', FUNCTION_TYPE, false, DOCUMENT, OBJECT_TYPE, JSON.stringify({
	params: 'one,two,three',
	body  : {
		ABC: 100000,
		DC : 2000
	}
}))
wb.createFormula('100', 'JUST_A_NUMBER', VALUE, false, DOCUMENT, NUMBER)
wb.createFormula('MatrixSeetest123(1,2,JUST_A_NUMBER)', 'LOOKME', 'test123', false, DOCUMENT, NUMBER)
equal(wb.get('LOOKME', 'test123'), 100100)