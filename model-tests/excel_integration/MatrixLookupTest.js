import { error }                  from '../../log/log'
import { equal }                  from 'assert'
import api, { Context, WorkBook } from '../../lme-core/index'
import * as fflMath               from '../../math/ffl-math'
import ExcelApi                   from '../excel-api'

api.addFunctions(fflMath)

ExcelApi.loadExcelFile('KSP').then(async () => {
	const wb = new WorkBook(new Context)
	wb.createFormula(`MatrixLookup('','YearlyChildCosts','Diapers',1)`, 'MatrixLookupTest')
	wb.createFormula(`MatrixLookup('','PremiumOutOfSchoolCare',18486,1)`, 'MatrixLookupPremiumOutOfSchoolCare')
	wb.createFormula(`MatrixLookup('','PremiumOutOfSchoolCare',23872,1)`, 'MatrixLookupPremiumOutOfSchoolCare2')
	wb.createFormula(`MatrixLookup('','YearlyChildCosts','Allowance',1)`, 'YearlyChildCosts')
	equal(wb.get('MatrixLookupTest'), 300)
	equal(wb.get('MatrixLookupPremiumOutOfSchoolCare'), 0.94)
	equal(wb.get('MatrixLookupPremiumOutOfSchoolCare2'), 0.938)
	equal(wb.get('YearlyChildCosts'), 0)
}).catch((err) => error(err.stack))