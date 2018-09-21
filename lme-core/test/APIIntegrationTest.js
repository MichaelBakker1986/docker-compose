//FYNDOO_PRESCAN
//Vragenlijstje authorizatie met API-KEY voor accountants
//Vragenlijstje gebaseerd op de Rol
//JWT token

import api, { COLUMN, Context, VALUE, WorkBook } from '../index'
import { equal }                                 from 'assert'

const modelName = 'PRESCAN_API'
const wb = new WorkBook(new Context(), null, null, { modelName })
wb.createFormula('1+1', 'TimeTest', VALUE, true, COLUMN)
equal(wb.get('TimeTest'), 2)
wb.set('TimeTest', 10)
equal(wb.get('TimeTest'), 10)
wb.set('TimeTest', 20, VALUE, 1)
equal(wb.get('TimeTest'), 10)
equal(wb.get('TimeTest', VALUE, 1), 20)
wb.set('TimeTest', 30, VALUE, 2, 1)
equal(wb.get('TimeTest', VALUE, 2, 1), 30)
const [timeTestValues] = api.getValue({
	properties: { value: true },
	values    : wb.context.getValues()
}, `${modelName}_TimeTest`)
const [one_, two_, three_] = timeTestValues
equal(one_.value, 10)
equal(two_.value, 20)
equal(three_.value, 2)
api.getValue({ properties: { value: true }, values: wb.context.getValues() }, `${modelName}_TimeTest`, 3, 1100)