import { error }                        from 'log6'
import excelPlugin                      from '../../excel-connect'
import { entries }                      from '../../formulajs-connect'
import { Context, LMEFacade, WorkBook } from '../../lme-core'
import { equal }                        from 'assert'
import 'ffl-math'
import '../../lme-core/exchange_modules/ffl/RegisterPlainFFLDecorator'

LMEFacade.addFunctions(entries)
LMEFacade.addFunctions(excelPlugin)
excelPlugin.loadExcelFile('KSP').then(() => {
	const wb = new WorkBook(new Context())
	wb.importSolution(require('fs').readFileSync(`${__dirname}/KSP.ffl`, 'utf8'), 'ffl')
	wb.set('IncomeParent01', 25000)
	equal(wb.get('IncomeParent01'), 25000)
//same response from restApi
	const fesGetValue = LMEFacade.getValue({
		columns   : 3,
		properties: { value: true, title: true },
		values    : wb.context.getValues()
	}, 'KSP_IncomeParent01')
	equal(fesGetValue[0].value, 25000)
	const valueResponse = LMEFacade.getValue({
		columns   : 3,
		properties: { value: true, title: true },
		values    : wb.context._values
	}, 'KSP_Q_FINAL_REPORT_VISIBLE', 0, 'Ja')
	equal(valueResponse.length, 0, 'Choose to return empty array when setting value')
}).catch((err) => {
	error(err)
	process.exit(1)
})