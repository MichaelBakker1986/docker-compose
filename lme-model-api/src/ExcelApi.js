import Connect                 from '../../excel-connect/excel-connect'
import api, { SolutionFacade } from '../../lme-core/index'

/*
 Helper class for test-purposes
 */
class ExcelApi {
	constructor() {throw Error('Singleton')}

	static async loadExcelFile(excelFileName, fullPath) {
		const expression = await Connect.loadExcelFile(excelFileName, fullPath)
		SolutionFacade.initVariables([{ name: 'MATRIX_VALUES', expression }])
		return expression
	}
}

api.addFunctions(Connect)
export default ExcelApi