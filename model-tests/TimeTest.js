import { Context, DOCUMENT, VALUE, WorkBook } from '../lme-core/index'
import { equal }                              from 'assert'
import '../math/ffl-math'
import '../ffl/index'

const wb = new WorkBook(new Context)
wb.modelName = 'TIMETEST'
wb.updateValues()

wb.createFormula('\'JAN\'', 'ClientName', VALUE, false, DOCUMENT, 'string')
wb.createFormula('ClientName', 'FormulaClientNameReference', 'value', false, 'column', 'string')

equal(wb.get('ClientName'), 'JAN')
equal(wb.get('ClientName', 'value', 0), 'JAN')
equal(wb.get('ClientName', 'value', 1), 'JAN')
equal(wb.get('ClientName', 'value', 2), 'JAN')
equal(wb.get('FormulaClientNameReference', 'value', 0), 'JAN')
equal(wb.get('FormulaClientNameReference', 'value', 1), 'JAN')
equal(wb.get('FormulaClientNameReference', 'value', 2), 'JAN')
wb.set('ClientName', 'PIET')
equal(wb.get('FormulaClientNameReference', 'value', 2), 'PIET')
wb.set('ClientName', 'KLAAS', 'value', 1)
equal(wb.get('FormulaClientNameReference', 'value', 2), 'KLAAS')

wb.createFormula('2017', 'YearNumber', 'value', false, 'column', 'number')
wb.createFormula('YearNumber', 'YearNumberReference', 'value', false, 'column', 'number')

equal(wb.get('YearNumberReference'), 2017)
wb.set('YearNumber', 2080, 'value', 5)
equal(wb.get('YearNumberReference'), 2017)
equal(wb.get('YearNumberReference', 'value', 5), 2080)

//will always reference to the document value
wb.createFormula('YearNumber[doc]', 'YearNumberReferenceDoc', 'value', false, 'document', 'number')
equal(wb.get('YearNumberReferenceDoc', 'value', 5), 2017)

/*TODO: will be implemented later//will always reference all values from giving variable
 wb.createFormula('YearNumber[all]', 'YearNumberReferenceAll', 'value', false, 'document', 'number')
 equal(wb.get('YearNumberReferenceAll'), 2017);*/

//Test HSUM function
wb.createFormula('HSUM(YearNumber,0,18)', 'YearNumberReferenceHSUM', 'value', false, 'document', 'number')
equal(wb.get('YearNumberReferenceHSUM'), 38386)




